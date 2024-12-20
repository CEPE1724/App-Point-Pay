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
import { styles } from "./RegistroScreen.Style"; 
import { screen } from "../../../../../utils/screenName";
import { APIURL } from "../../../../../config/apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "../../../../../components";
import { Plus, History, Search } from "../../../../../Icons";
import { useAuth } from '../../../../../navigation/AuthContext';


export function RegistroScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pressedCardIndex, setPressedCardIndex] = useState(null);
  const [userInfo, setUserInfo] = useState({ ingresoCobrador: "" });
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [token, setToken] = useState(null);
  const { expireToken } = useAuth(); // Usamos el contexto de autenticación
  // Fetch User Info from AsyncStorage
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        const token = await AsyncStorage.getItem("userToken");
        setToken(token);
        if (storedUserInfo) {
          const user = JSON.parse(storedUserInfo);
          setUserInfo({ ingresoCobrador: user.ingresoCobrador.idIngresoCobrador || "" });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setUserInfoLoaded(true);
      }
    };
    fetchUserInfo();
  }, []);

  // Fetch Data from API with retry logic
  const fetchData = async (page = 1) => {
    // Verifica que los datos del usuario y el estado de carga sean correctos antes de hacer la solicitud
    if (!userInfoLoaded || loading || (page > 1 && data.length >= totalRecords)) return;
  
    setLoading(true);
    try {
      const { ingresoCobrador } = userInfo;  // Extrae el ingresoCobrador del objeto userInfo
      const url = APIURL.getAllcliente();  // Asegúrate de que la URL sea la correcta
      console.log("URL", url);
  
      // Enviar la solicitud con los parámetros y headers
      const response = await axios.get(url, {
        params: {
          idCobrador: ingresoCobrador,
          filtro,
          page,
          limit
        },
        headers: {
          "Cache-Control": "max-age=300, must-revalidate",  // Cache por 5 minutos
          "Authorization": `Bearer ${token}`,  // Token de autorización
          "Content-Type": "application/json",  // Tipo de contenido JSON
        }
      });
  
      // Asegúrate de que la respuesta esté en el formato esperado
      const [fetchedData, total] = response.data;
      console.log("Fetched Data:", fetchedData);
      console.log("Total Records:", total);
  
      // Actualiza los datos con la respuesta obtenida
      setData((prevData) => (page === 1 ? fetchedData : [...prevData, ...fetchedData]));
      setTotalRecords(total);
  
      // Termina el proceso de carga
      setLoading(false);
      setLoadingMore(false);
  
    } catch (error) {
      handleError(error); // Ahora solo maneja el error sin reintentos
    }
  };
  
  // Handle Errors without retry logic
  const handleError = (error) => {
    if (error.response) {
      const { status } = error.response;
      // Manejando errores específicos:
      if (status === 401) {
        expireToken(); // Realiza el logout si el token es inválido
      } else if (status === 403) {
          expireToken(); // Realiza el logout si no tienes permiso
      } else {
        console.error("Error desconocido:", error.response.data);
      }
    } else if (error.request) {
      // Si no se recibió respuesta del servidor
      console.error("No response received:", error.request);
    } else {
      // Si hubo un error al configurar la solicitud
      console.error("Error setting up request:", error.message);
    }
    // Termina el proceso de carga en caso de error
    setLoading(false);
    setLoadingMore(false);
  };
  

  const handleLoadMore = () => {
    if (!loadingMore && data.length < totalRecords) {
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };


  const handleCardPress = (item) => {
    navigation.navigate(screen.registro.insertCall, { item });
  };
  useEffect(() => {
    if (userInfoLoaded) {
      fetchData(currentPage);
    }
  }, [currentPage, userInfoLoaded]);

  // Effect to reset page and fetch data when filter changes
  useEffect(() => {
    if (userInfoLoaded) {
      setCurrentPage(1);
      setData([]);
      fetchData(1);
    }
  }, [filtro]);

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

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.grid}>
          {data.map((item, index) => (
            <Card
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
            <Text style={styles.noData}>No se encontro nada</Text>
            <Text style={styles.noData}>Pruebe con una palabra clave distinta.</Text>
          </View>
        )}
        {loadingMore && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
      </ScrollView>
    </View>
  );
}
