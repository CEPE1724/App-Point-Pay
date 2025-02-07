import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput, ToastAndroid
} from "react-native";
import axios from "axios";
import { styles } from "./RegistroScreen.Style";
import { screen } from "../../../../../utils/screenName";
import { APIURL } from "../../../../../config/apiconfig";
import { Card } from "../../../../../components";
import { Plus, History, Search } from "../../../../../Icons";
import { useAuth } from '../../../../../navigation/AuthContext';
import { useDb } from '../../../../../database/db'; // Importa la base de datos
import { getItemsAsyncUser, getallCbo_Gestorcobranza, getTipoAccioncount } from '../../../../../database';
import Toast from 'react-native-toast-message';
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
  const [dataItem, setDataItem] = useState([]);
  const { expireToken, updateNotificationCount } = useAuth(); // Usamos el contexto de autenticación
  const { db } = useDb();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const Item = await getItemsAsyncUser(db);
        //const data = await getallCbo_Gestorcobranza(db);
        if (Item) {
          setToken(Item[0]?.token);
          setUserInfo({ ingresoCobrador: Item[0]?.ICidIngresoCobrador || "" });
          setDataItem(Item[0]);
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
      // Obtén los datos desde la base de datos en lugar de hacer la solicitud a la API
      const dataFromDb = await getallCbo_Gestorcobranza(db, filtro, page);  // Aquí usas tu función con paginación
  
      // Actualiza los datos con los datos obtenidos de la base de datos
      const total = dataFromDb.length;  // Puedes actualizar el total de registros según la cantidad de registros obtenidos de la base de datos
      setData((prevData) => (page === 1 ? dataFromDb : [...prevData, ...dataFromDb]));
      setTotalRecords(total);  // Actualiza el total de registros con el tamaño de los datos obtenidos
  
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


  const handleCardPress = async (item) => {
    const Counttipo = await getTipoAccioncount(db, "ENTRADA CLIENTE", item.idCompra);
    if (Counttipo === 0) {
      Toast.show({
        type: 'info',
        position: 'top', // Cambiar la posición a la parte superior
        text1: '¡Información!',
        text2: `${item.Cliente} no registra ENTRADA.😞`, 
        text3: 'Por favor, registre la ENTRADA del cliente antes de continuar.',
        visibilityTime: 4000,
        autoHide: true
      });
      return;
    }
    navigation.navigate(screen.registro.insertCall, { item, Tipo: 0 });
  };

  const showToast = (title, message) => {
    ToastAndroid.showWithGravityAndOffset(
      `${title}: ${message}`,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
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
              db={db}
              dataItem={dataItem}
              updateNotificationCount={updateNotificationCount}
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
