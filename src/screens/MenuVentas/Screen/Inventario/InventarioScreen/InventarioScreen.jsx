import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import { styles } from "./InventarioScreen.Style";
import { screen } from "../../../../../utils/screenName";
import { APIURL } from "../../../../../config/apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardInventario } from "../../../../../components"; // Asegúrate de que la ruta esté correcta
import { Plus, History, Search } from "../../../../../Icons"; // Importa los iconos

export function InventarioScreen(props) {
  const { navigation } = props;
  const [data, setData] = useState([]); // Almacena la data de los productos
  const [totalRecords, setTotalRecords] = useState(0); // Número total de productos
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [limit, setLimit] = useState(10); // Límite de productos por página
  const [loading, setLoading] = useState(false); // Estado de carga inicial
  const [loadingMore, setLoadingMore] = useState(false); // Estado para cargar más
  const [pressedCardIndex, setPressedCardIndex] = useState(null); // Índice de la tarjeta presionada
  const [filtro, setFiltro] = useState(""); // Filtro para la búsqueda

  // Función para obtener la data de la API
  const fetchData = async (page = 1, retries = 3) => {
    if (loading || (page > 1 && data.length >= totalRecords)) return;

    setLoading(true);
    try {
      const url = `http://192.168.2.124:3035/cobranza/api/v1/point/Inventario/Productos`; // URL de la API
      const response = await axios.get(url, {
        params: {
          Bodega: 31,
          Articulo: filtro, // Filtro de búsqueda
          PaginaNumero: page,
          RegistrosPorPagina: limit,
        },
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      console.log('API Response:', response.data); // Inspecciona la respuesta de la API

      const { data: fetchedData } = response.data;
      setData((prevData) => (page === 1 ? fetchedData : [...prevData, ...fetchedData]));
      setTotalRecords(fetchedData.length); // Aquí puedes ajustar si la API envía el total de registros o no
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      if (retries > 0) {
        console.error(`Retrying fetch data, attempts remaining: ${retries - 1}`);
        setTimeout(() => fetchData(page, retries - 1), 1000);
      } else {
        console.error("Error fetching data:", error);
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    fetchData(currentPage); // Obtiene los datos al montar el componente
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Resetea la página al cambiar el filtro
    setData([]); // Limpia la data existente
    fetchData(1); // Vuelve a obtener los datos con el filtro
  }, [filtro]);

  const handleLoadMore = () => {
   /* if (!loadingMore && data.length < totalRecords) {
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }*/
      navigation.reset({
        index: 0, // Start from the first screen in the stack
        routes: [{ name: 'MenuTabs' }], // Navigate directly to 'Cobranza'
      });
  };

  const handleCardPress = (item, index) => {
    // Tu lógica para manejar la presión de la tarjeta
    navigation.navigate(screen.registro.insertCall, { item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainersearch}>
        <Search size={24} color="black" style={styles.iconsearch} />
        <TextInput
          style={styles.inputsearch}
          placeholder="Buscar"
          placeholderTextColor="#aaa"
          value={filtro}
          onChangeText={setFiltro}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }} // Para asegurar el espacio para el botón flotante
      >
        <View style={styles.grid}>
          {data.map((item, index) => (
            <CardInventario
              key={index}
              item={item}
              index={index}
              onPress={handleCardPress}
              onPressIn={() => setPressedCardIndex(index)}
              onPressOut={() => setPressedCardIndex(null)}
              pressedCardIndex={pressedCardIndex}
            />
          ))}
        </View>
        {loading && !loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading && !loadingMore && data.length === 0 && (
          <View>
            <History size={80} color="#fffff" style={styles.iconNoData} />
            <Text style={styles.noData}>No se encontró nada</Text>
            <Text style={styles.noData}>Pruebe con una palabra clave distinta.</Text>
          </View>
        )}
        {loadingMore && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
      </ScrollView>

      <TouchableOpacity
        style={[styles.floatingButton, { opacity: loadingMore ? 0.5 : 1 }]}
        onPress={handleLoadMore}
        disabled={loadingMore} // Desactiva el botón mientras carga más datos
      >
      <Text style={styles.text}>Menú</Text>
      </TouchableOpacity>
    </View>
  );
}
