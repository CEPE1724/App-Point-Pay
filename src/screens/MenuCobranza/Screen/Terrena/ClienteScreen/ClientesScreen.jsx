import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { styles } from "./ClientesScreen.style";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../../../utils/screenName";
import { APIURL } from "../../../../../config/apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardCliente } from "../../../../../components";
import Icon from "react-native-vector-icons/FontAwesome";



export function ClientesScreen(props) {
    const { navigation } = props;
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [userInfo, setUserInfo] = useState({ ingresoCobrador: "" });
    const [userInfoLoaded, setUserInfoLoaded] = useState(false);
    const [filtro, setFiltro] = useState("");
    const [countData, setCountData] = useState([]);
  
    // Inicializa el socket
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const storedUserInfo = await AsyncStorage.getItem("userInfo");
          if (storedUserInfo) {
            const user = JSON.parse(storedUserInfo);
            setUserInfo({
              ingresoCobrador: user.ingresoCobrador.idIngresoCobrador || "",
            });
            console.log("User info loaded:", user.ingresoCobrador.idIngresoCobrador);
            setUserInfoLoaded(true);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
          setUserInfoLoaded(true);
        }
      };
  
      fetchUserInfo();
    }, []);
  
    const fetchCountData = async () => {
      try {
        const urlCount = APIURL.getClientesVerificionTerrenacountEstado();
    
        const response = await axios.get(urlCount, {
          params: { idVerificador: userInfo.ingresoCobrador },
        });
        setCountData(response.data);
      } catch (error) {
        console.error("Error fetching count data:", error);
      }
    };
  
    const fetchData = async (page = 1, retries = 3) => {
      if (!userInfoLoaded || loading || (page > 1 && data.length >= totalRecords))
        return;
  
      setLoading(true);
      try {
        const idCobrador = userInfo.ingresoCobrador;
        const url = APIURL.getAllVerificacionTerrena();
        const response = await axios.get(url, {
          params: { idVerificador: idCobrador, filtro, page },
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
  
        const fetchedData = response.data.registros || [];
        const total = response.data.total || 0;
  
        setData((prevData) =>
          page === 1 ? fetchedData : [...prevData, ...fetchedData]
        );
        setTotalRecords(total);
      } catch (error) {
        if (retries > 0) {
          console.error(
            `Retrying fetch data, attempts remaining: ${retries - 1}`
          );
          setTimeout(() => fetchData(page, retries - 1), 1000);
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
  
    useEffect(() => {
      if (userInfoLoaded) {
        fetchCountData(); // Fetch count data on user info load
        fetchData(); // Fetch initial data
  
        const intervalId = setInterval(() => {
          fetchCountData(); // Update count data periodically
          fetchData(1); // Refresh data every specified time
        }, 10000); // 10 seconds
  
        // Limpiar el socket y el intervalo al desmontar el componente
      }
    }, [userInfoLoaded]);
  
    const handleIconPress = (item, tipo) => {
   
      if (tipo == 1) {
        if ( item.idTerrenaGestionDomicilio == 0) {
          navigation.navigate(screen.terreno.insert, { item, tipo });
        }
        if ( item.idTerrenaGestionDomicilio > 0) {
          navigation.navigate(screen.terreno.search, { item, tipo });
        }
      }
      if (tipo == 2) {
        if ( item.idTerrenaGestionTrabajo == 0) {
          navigation.navigate(screen.terreno.insert, { item, tipo });
        }
        if ( item.idTerrenaGestionTrabajo > 0) {
          navigation.navigate(screen.terreno.search, { item, tipo });
        }
      }
    };
    // Calculate totals
    const totalPendiente =
      countData.find((item) => item.eSTADO === "PENDIENTE")?.Count || 0;
    const totalEnviado =
      countData.find((item) => item.eSTADO === "ENVIADO")?.Count || 0;
    const totalAnulado =
      countData.find((item) => item.eSTADO === "ANULADO")?.Count || 0;
    const total = totalPendiente + totalEnviado + totalAnulado;
  
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          {/* Render Count Data Circles */}
          <View style={styles.countContainer}>
            <View style={styles.circleBorder}>
              <Text style={styles.circleText}>{total}</Text>
              <Text style={styles.circleTextSubtitle}>TOTAL</Text>
            </View>
            {countData.map((item) => {
              let borderColor;
              switch (item.eSTADO) {
                case "PENDIENTE":
                  borderColor = "yellow"; // Color for pending
                  break;
                case "ENVIADO":
                  borderColor = "green"; // Color for sent
                  break;
                case "ANULADO":
                  borderColor = "red"; // Color for canceled
                  break;
                default:
                  borderColor = "gray"; // Default color
              }
  
              return (
                <View
                  key={item.eSTADO}
                  style={[styles.circleBorder, { borderColor }]}
                >
                  <Text style={styles.circleText}>{item.Count}</Text>
                  <Text style={styles.circleTextSubtitle}>{item.eSTADO}</Text>
                </View>
              );
            })}
          </View>
  
          {/* Render List of Clientes */}
          <View style={styles.grid}>
            {data.map((item) => (
              <CardCliente
                key={item.idClienteVerificacion}
                item={item}
                handleIconPress={handleIconPress}
              />
            ))}
          </View>
  
          {/* Loading and No Data Indicators */}
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {!loading && data.length === 0 && (
            <View>
              <Icon
                name="history"
                size={80}
                color="#fff"
                style={styles.iconNoData}
              />
              <Text style={styles.noData}>No se encontró nada</Text>
            </View>
          )}
          {loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
        </ScrollView>
  
        <TouchableOpacity
          style={[styles.floatingButton, { opacity: loadingMore ? 0.5 : 1 }]}
          onPress={() => {
            fetchData(1); // Refresh data
            fetchCountData(); // Refresh count data
          }}
          disabled={loadingMore}
        >
          <Icon name="refresh" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
  