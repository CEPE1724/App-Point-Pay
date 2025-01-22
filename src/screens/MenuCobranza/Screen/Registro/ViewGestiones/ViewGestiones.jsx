// Productos.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from "axios";
import { APIURL } from "../../../../../config/apiconfig";
import { styles } from "./ViewGestiones.Style";
import { useAuth } from '../../../../../navigation/AuthContext';
import { handleError } from '../../../../../utils/errorHandler';
import { useDb } from '../../../../../database/db'; // Importa la base de datos
import { getItemsAsyncUser } from '../../../../../database';

export const ViewGestiones = ({ route }) => {
  const { item } = route.params;
  const idCompra = item.idCompra;
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [token, setToken] = useState(null);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);  // Para saber si los datos del token ya se han cargado
  const { expireToken } = useAuth();
  const { db } = useDb();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const Item = await getItemsAsyncUser(db);
        if (Item) {
          setToken(Item[0]?.token);
        }
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
  }, [userInfoLoaded, token]);  //
  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const url = APIURL.getViewLastGestiones();
      const headers = {
        "Authorization": `Bearer ${token}`,  // Añadimos el token en los headers
        "Content-Type": "application/json",  // Tipo de contenido
      };
      const response = await axios.get(url, {
        params: { idCompra },
        headers,
      });

      const fetchedData = response.data;
      setProductos(fetchedData);
    } catch (error) {
      handleError(error, expireToken);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idCompra]);

  // Return loading message while data is being fetched
  if (loading) {
    return <Text style={styles.loadingText}>Cargando productos...</Text>;
  }

  // Render each item in a card
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text>Fecha: {new Date(item.Fecha).toLocaleString()}</Text>
        <Text>Estado: {item.Estado}/{item['Tipo Contrato']}/{item.Resultado}</Text>
        <Text>Estado de pago: {item.ESTADO_PAGO || 'No especificado'}</Text>
        <Text>Fecha de pago: {new Date(item.FechaPago).toLocaleString()}</Text>
        <Text>Notas: {item.Notas}</Text>
        <Text>Operador/Cobrador: {item.Operador_Cobrador || 'No especificado'}</Text>
        <Text>Teléfono: {item.Telefono || 'No disponible'}</Text>
        <Text>Tipo: {item.Tipo}</Text>
        <Text>Usuario: {item.Usuario}</Text>
        <Text>Valor: {item.Valor}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{item.Cliente}</Text>
      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
