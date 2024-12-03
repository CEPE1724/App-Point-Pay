// Productos.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from "axios";
import { APIURL } from "../../../../../config/apiconfig";
import { styles } from "./ViewProductos.Style";
export const ViewProductos = ({ route }) => {
  const { item } = route.params;
  const [productos, setProductos] = useState([]);
  const idCompra = item.idCompra;
  const [loading, setLoading] = useState(true);
  const idMotivo = 0;

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = APIURL.getProducto();
      const response = await axios.get(url, {
        params: { idCompra, idMotivo },
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
