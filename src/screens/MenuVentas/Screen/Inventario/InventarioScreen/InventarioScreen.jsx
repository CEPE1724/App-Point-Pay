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
import { CardInventario } from "../../../../../components";
import { Plus, History, Search } from "../../../../../Icons";
import { Picker } from "@react-native-picker/picker"; // Importamos el Picker

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
  const [Bodegas, setBodegas] = useState([]); // Lista de bodegas
  const [BodegaUser, setBodegaUser] = useState([]); // Bodega del usuario
  const [selectedBodega, setSelectedBodega] = useState(null); // Bodega seleccionada

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");

        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          console.log("Bodegas del Usuario:", parsedUserInfo.bodegas);
          setBodegaUser(parsedUserInfo.bodegas);
          fetchBodegas(parsedUserInfo);
        } else {
          console.log("No user info found in AsyncStorage");
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  const fetchBodegas = async (bodegas) => {
    try {
      console.log("Fetching bodegas:", bodegas.bodegas);
      const url = APIURL.getViewListadoProductosBodega();
      const response = await axios.get(url, {
        params: {
          ids: JSON.stringify(bodegas.bodegas), // Enviar todos los IDs de bodegas
        },
      });

      const fetchedData = response.data;
      console.log("Bodegas obtenidas:", fetchedData);
      setBodegas(fetchedData);
    } catch (error) {
      console.error("Error fetching bodegas:", error);
    }
  };

  const fetchData = async (page = 1, retries = 3) => {
    if (loading || (page > 1 && data.length >= totalRecords)) return;

    setLoading(true);
    try {
      const url = APIURL.getViewListadoProductos();
      const response = await axios.get(url, {
        params: {
          Bodega: selectedBodega ? selectedBodega.Bodega : 31, // Usar la bodega seleccionada
          Articulo: filtro,
          PaginaNumero: page,
          RegistrosPorPagina: limit,
        },
      });

      const { data: fetchedData } = response.data;
      setData((prevData) => (page === 1 ? fetchedData : [...prevData, ...fetchedData]));
      setTotalRecords(fetchedData.length);
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
  }, [currentPage, selectedBodega]);

  useEffect(() => {
    setCurrentPage(1);
    setData([]);
    fetchData(1);
  }, [filtro]);

  const handleLoadMore = () => {
    if (!loadingMore && data.length < totalRecords) {
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleCardPress = (item, index) => {
    console.log("Card pressed:", item);
  };

  return (
    <View style={styles.container}>
       <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBodega}
          onValueChange={(itemValue) => setSelectedBodega(itemValue)}
          style={styles.picker}
        >
          {Bodegas.map((bodega) => (
            <Picker.Item
              key={bodega.Bodega}
              label={` ${bodega.Codigo} - ${bodega.Nombre}`}
              value={bodega}
            />
          ))}
        </Picker>
      </View>
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
        contentContainerStyle={{ paddingBottom: 80 }}
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
    </View>
  );
}
