import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Image, FlatList, TextInput } from "react-native";
import axios from "axios";
import { styles } from "./InventarioScreen.Style";
import { APIURL } from "../../../../../config/apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Plus, History, Search } from "../../../../../Icons";
import { Picker } from "@react-native-picker/picker";
import { ImageModal } from '../../../../../components'; // Importamos el componente ImageModal
import { RadioButton } from 'react-native-paper';
import { RadioGroupInv } from '../../../../../components'; // Importamos el componente RadioGroupInv

export function InventarioScreen(props) {
  const { navigation } = props;
  
  // Estados para manejar los datos y filtros
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
  const [stockFilter, setStockFilter] = useState(1); // Estado para el filtro de stock
  const [tipocliente, setTipocliente] = useState(0); // Estado para el tipo de cliente

  // Opciones para el filtro de tipo de cliente
  const options = [
    { value: 1, label: "Con stock", icon: "check" },
    { value: 0, label: "Sin stock", icon: "times" },
  ];

  // Efecto para obtener los datos de bodegas desde AsyncStorage
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

  // Función para obtener las bodegas de la API
  const fetchBodegas = async (bodegas) => {
    try {
      const url = APIURL.getViewListadoProductosBodega();
      const response = await axios.get(url, {
        params: {
          ids: JSON.stringify(bodegas.bodegas),
        },
      });

      setBodegas(response.data);
    } catch (error) {
      console.error("Error fetching bodegas:", error);
    }
  };

  // Función para obtener los productos de la API
  const fetchData = async (page = 1, retries = 3) => {
    if (loading || (page > 1 && data.length >= totalRecords)) return;

    setLoading(true);

    try {
      const url = APIURL.getViewListadoProductos();
      const response = await axios.get(url, {
        params: {
          Bodega: selectedBodega ? selectedBodega.Bodega : 31, // Asegúrate de que la bodega esté definida
          Articulo: filtro,
          PaginaNumero: page,
          RegistrosPorPagina: limit,
          Inventario: stockFilter, // Usamos el estado `stockFilter` aquí
        },
      });

      const { data: fetchedData, total } = response.data;
      setTotalRecords(total || fetchedData.length); // Si total no está disponible, usamos la longitud de los resultados

      setData((prevData) => (page === 1 ? fetchedData : [...prevData, ...fetchedData]));
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      if (retries > 0) {
        setTimeout(() => fetchData(page, retries - 1), 1000); // Reintentos
      } else {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  // Llamada a la API cuando cambian los filtros o la página
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, selectedBodega, stockFilter]); // Aseguramos que `stockFilter` se considere

  // Llamada a la API cuando cambia el filtro de búsqueda
  useEffect(() => {
    setCurrentPage(1);
    setData([]); // Limpiar los datos cuando cambie el filtro
    fetchData(1); // Llamada a la API con el nuevo filtro
  }, [filtro]);

  // Función para manejar la carga de más productos
  const handleLoadMore = () => {
    if (!loadingMore && data.length < totalRecords) {
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Función para seleccionar una imagen
  const handleImageSelect = (item) => {
    setSelectedItem(item); // Establecer el elemento seleccionado para la vista completa
  };

  // Función para renderizar cada fila de la lista
  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleImageSelect(item)}>
      <View style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
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
      {/* Radio button para seleccionar el filtro de stock */}
      <RadioGroupInv
        value={stockFilter}
        onChange={setStockFilter} // Actualiza el estado de stockFilter
        options={options} // Pasamos las opciones como props
      />

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
              label={`${bodega.Codigo} - ${bodega.Nombre}`}
              value={bodega}
              style={styles.pickerItem}
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
      <Text style={styles.recordsFoundText}>
        {totalRecords} {totalRecords === 1 ? "registro encontrado" : "registros encontrados"}
      </Text>
      {/* FlatList para mostrar los productos */}
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
      <ImageModal isVisible={selectedItem !== null} selectedItem={selectedItem} onClose={() => setSelectedItem(null)} stock = {stockFilter} />
    </View>
  );
}
