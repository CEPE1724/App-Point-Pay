// Productos.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from "axios";
import { APIURL } from "../../../../../config/apiconfig";
import { styles } from "./ViewProductos.Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../../../../../navigation/AuthContext'; // Importamos el contexto
import { handleError } from '../../../../../utils/errorHandler';
export const ViewProductos = ({ route }) => {
  const { item } = route.params;
  const [productos, setProductos] = useState([]);
  const idCompra = item.idCompra;
  const [loading, setLoading] = useState(true);
  const idMotivo = 0;
  const { expireToken } = useAuth(); // Usamos el contexto de autenticación
  const [token, setToken] = useState(null);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);  // Para saber si los datos del token ya se han cargado
  useEffect(() => {
    // Función para obtener el token desde AsyncStorage
    const fetchUserInfo = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        setToken(storedToken);
        console.log("Token:", storedToken);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setUserInfoLoaded(true);  // Marcamos que ya se cargó el token
      }
    };
 
    fetchUserInfo();
  }, []);  // Se ejecuta solo una vez cuando el componente se monta

  // Solo realiza la llamada a la API cuando el token esté disponible
  useEffect(() => {
    if (userInfoLoaded && token) {
      fetchData();  // Llamamos a fetchData cuando el token esté disponible
    }
  }, [userInfoLoaded, token]);  // Dependencias: se ejecuta cuando el token esté listo


  const fetchData = async () => {
    setLoading(true);
    try {
      const url = APIURL.getProducto();
      const headers = {
        "Authorization": `Bearer ${token}`,  // Añadimos el token en los headers
        "Content-Type": "application/json",  // Tipo de contenido
      };
      const response = await axios.get(url, {
        params: { idCompra, idMotivo },
        headers,
      });

      const fetchedData = response.data;
      setProductos(fetchedData);
    } catch (error) {
      // Manejo de errores detallado
      if (error.response) {
        // Si la respuesta contiene un error (status code)
        const { status } = error.response;
        handleError(error, expireToken); 
      } else if (error.request) {
        // Si la solicitud fue hecha pero no hubo respuesta
        console.error("Error en la solicitud: no se recibió respuesta del servidor", error.request);
        Alert.alert("Error", "No se recibió respuesta del servidor.");
      } else {
        // Si hubo un problema al configurar la solicitud
        console.error("Error en la configuración de la solicitud", error.message);
        Alert.alert("Error", "Hubo un problema en la configuración de la solicitud.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idCompra]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.productCode}>Código: {item.Codigo}</Text>
      <Text style={styles.productTitle}>{item.Articulo}</Text>
      {item.Serial && <Text style={styles.productSerial}>Serial: {item.Serial}</Text>}
      <Text style={styles.productPrice}>Precio: ${item.Precio.toFixed(2)}</Text>
      <TouchableOpacity style={styles.selectButton} onPress={() => Alert.alert("Producto seleccionado", item.Articulo)}>
        <Text style={styles.buttonText}>Seleccionar</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Cargando productos...</Text>;
  }

  return (
    <FlatList
      data={productos}
      renderItem={renderItem}
      keyExtractor={(item) => item.idDetCompra.toString()}
      contentContainerStyle={styles.container}
    />
  );
};
