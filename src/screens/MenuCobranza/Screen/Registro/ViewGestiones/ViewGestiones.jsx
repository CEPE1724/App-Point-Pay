// Productos.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from "axios";
import { APIURL } from "../../../../../config/apiconfig";
import { styles } from "./ViewGestiones.Style";
export const ViewGestiones = ({ route }) => {
    const { item } = route.params;
    const idCompra = item.idCompra;
    const [loading, setLoading] = useState(true);
    const [productos, setProductos] = useState([]);
    console.log(item.Cliente);
    // Fetch data from the API
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = APIURL.getViewLastGestiones();
        const response = await axios.get(url, {
          params: { idCompra },
        });
  
        const fetchedData = response.data;
        setProductos(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Hubo un problema al cargar los productos.");
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
  