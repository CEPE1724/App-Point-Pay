// Productos.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from "axios";
import { APIURL } from "../../../../../config/apiconfig";
import { styles } from "./ViewProductos.Style";
import { useAuth } from '../../../../../navigation/AuthContext'; // Importamos el contexto
import { handleError } from '../../../../../utils/errorHandler';
import { useDb } from '../../../../../database/db'; // Importa la base de datos
import { getItemsAsyncUser } from '../../../../../database';
import Icon from "react-native-vector-icons/FontAwesome";

export const ViewProductos = ({ route }) => {
  const { item } = route.params; 
  const [productos, setProductos] = useState([]);
  const idCompra = item.idCompra;
  const [loading, setLoading] = useState(true);
  const idMotivo = 0;
  const { expireToken } = useAuth(); // Usamos el contexto de autenticación
  const [token, setToken] = useState(null);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);  // Para saber si los datos del token ya se han cargado
   const { db } = useDb();
  useEffect(() => {
    // Función para obtener el token desde 
    const fetchUserInfo = async () => {
      try {
       const Item = await getItemsAsyncUser(db);
        setToken(Item[0]?.token);
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

  const renderHeader = () => (
    <View style={styles.headerCard}>
      <Text style={styles.headerTitle}>Productos de la compra</Text>
      <Text style={styles.headerSubtitle}>
        Revise el detalle del articulo, serial y precio unitario antes de continuar.
      </Text>
      <View style={styles.countBadge}>
        <Text style={styles.countText}>{productos.length} productos</Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyTitle}>Sin productos disponibles</Text>
      <Text style={styles.emptySubtitle}>
        No se encontraron productos para esta compra en este momento.
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.codeRow}>
        <Text style={styles.productCode}>Codigo: {item.Codigo}</Text>
        {item.Serial ? (
          <View style={styles.serialPill}>
            <Text style={styles.serialPillText}>Serial: {item.Serial}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.productTitle}>{item.Articulo}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Precio unitario</Text>
        <Text style={styles.productPrice}>${item.Precio.toFixed(2)}</Text>
      </View>
 {/*
      <TouchableOpacity style={styles.selectButton} onPress={() => Alert.alert("Producto seleccionado", item.Articulo)}>
        <Icon name="shopping-cart" size={15} color="#ffffff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Seleccionar producto</Text>
      </TouchableOpacity>
    */}
 {/*
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => Alert.alert("Servicio tecnico", item.Articulo)}
      >
        <Icon name="wrench" size={15} color="#ffffff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Servicio tecnico</Text>
      </TouchableOpacity>
      */}
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
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
    />
  );
};
