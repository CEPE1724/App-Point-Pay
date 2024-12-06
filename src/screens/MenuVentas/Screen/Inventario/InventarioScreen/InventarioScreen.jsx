import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Image, FlatList, TextInput } from "react-native";
import axios from "axios";
import { styles } from "./InventarioScreen.Style";
import { APIURL } from "../../../../../config/apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Plus, History, Search } from "../../../../../Icons";
import { Picker } from "@react-native-picker/picker";
import { ImageModal } from '../../../../../components'; // Importamos el componente ImageModal

export function InventarioScreen(props) {
  const { navigation } = props;
  const [data, setData] = useState([]); // Almacena la data de los productos
  const [totalRecords, setTotalRecords] = useState(0); // Número total de productos
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [limit, setLimit] = useState(10); // Límite de productos por página
  const [loading, setLoading] = useState(false); // Estado de carga inicial
  const [loadingMore, setLoadingMore] = useState(false); // Estado para cargar más
  const [filtro, setFiltro] = useState(""); // Filtro para la búsqueda
  const [Bodegas, setBodegas] = useState([]); // Lista de bodegas
  const [selectedBodega, setSelectedBodega] = useState(null); // Bodega seleccionada
  const [selectedItem, setSelectedItem] = useState(null); // Elemento seleccionado para el carrusel

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");

        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
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
      const url = APIURL.getViewListadoProductosBodega();
      const response = await axios.get(url, {
        params: {
          ids: JSON.stringify(bodegas.bodegas),
        },
      });

      const fetchedData = response.data;
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
          Bodega: selectedBodega ? selectedBodega.Bodega : 31,
          Articulo: filtro,
          PaginaNumero: page,
          RegistrosPorPagina: limit,
        },
      });

      const { data: fetchedData, total } = response.data; // Aquí se debe asegurar que "total" existe en la respuesta

      // Si la API no devuelve el total, podrías intentar calcularlo o asumir que es el tamaño de la respuesta
      if (total) {
        setTotalRecords(total); // Actualiza el número total de productos
      } else {
        setTotalRecords(fetchedData.length); // Si no hay "total", usamos el tamaño de los resultados
      }

      setData((prevData) => (page === 1 ? fetchedData : [...prevData, ...fetchedData]));
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
    fetchData(currentPage);
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

  const handleImageSelect = (item) => {
    setSelectedItem(item); // Set the selected item for the full screen view
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleImageSelect(item)}>
      <View
        style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}
      >
        {/* Imagen pequeña */}
        <Image
          source={{
            uri: `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${item.Codigo}.jpg`,
          }}
          style={styles.imageThumbnail}
        />
        <Text style={styles.tableRowText}>{item.Articulo}</Text>
        <Text style={styles.tableRowText}>{item.Codigo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Picker para seleccionar bodega */}
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

      {/* Input de búsqueda */}
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

      {/* Mostrar el total de registros encontrados */}
      {totalRecords > 0 && (
        <Text style={styles.recordsFoundText}>
          {totalRecords} productos encontrados
        </Text>
      )}

      {/* Tabla con filas desplazables (mostrar solo 3 elementos a la vez) */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}></Text>
          <Text style={styles.tableHeaderText}>Artículo</Text>
          <Text style={styles.tableHeaderText}>Código</Text>
        </View>

        {/* Limitar la altura visible a solo 3 elementos */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
          contentContainerStyle={{ padding: 0, margin: 0 }}
          // Establecer la altura máxima visible
          style={{ maxHeight: 380 }}  
        />
      </View>

      {/* Indicador de carga */}
      {loading && !loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && !loadingMore && data.length === 0 && (
        <View>
          <History size={80} color="#fffff" style={styles.iconNoData} />
          <Text style={styles.noData}>No se encontró nada</Text>
          <Text style={styles.noData}>Pruebe con una palabra clave distinta.</Text>
        </View>
      )}

      {/* Modal de imagen */}
      <ImageModal isVisible={selectedItem !== null} selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
    </View>

  );
}
