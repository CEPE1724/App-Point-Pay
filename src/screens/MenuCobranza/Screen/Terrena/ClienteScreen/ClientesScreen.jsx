import React, { useState, useEffect, use } from "react";
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
import { CardCliente, ReasignarModal, RespuestaRapida } from "../../../../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../../../../../navigation/AuthContext";
import { handleError } from '../../../../../utils/errorHandler';
import { useDb } from '../../../../../database/db'; // Importa la base de datos
import { getItemsAsyncUser } from '../../../../../database';

export function ClientesScreen(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [clienteReasignacion, setClienteReasignacion] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userInfo, setUserInfo] = useState({ ingresoCobrador: "" });
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [countData, setCountData] = useState([]);
  const [token, setToken] = useState(null);
  const { expireToken } = useAuth();
  const [modalreasignar, setModalReasignar] = useState(false);
  const [modalRespuestaRapida, setModalRespuestaRapida] = useState(false);
  const { db } = useDb();
  // Fetch user info and token from 
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {

        const Item = await getItemsAsyncUser(db);

        if (Item) {
          setToken(Item[0]?.token);
          setUserInfo({ ingresoCobrador: Item[0]?.ICidIngresoCobrador || "" });
          setUserInfoLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfoLoaded(true);
      }
    };
    fetchUserInfo();
  }, []);

  // Fetch data once userInfo and token are loaded
  useEffect(() => {
    if (userInfoLoaded && token) {
      fetchData();
      fetchCountData();
    }
  }, [userInfoLoaded, token, modalreasignar, modalRespuestaRapida]);

  // Fetch data for client verification status
  const fetchCountData = async () => {
    try {
      const urlCount = APIURL.getClientesVerificionTerrenacountEstado();
      const response = await axios.get(urlCount, {
        params: { idVerificador: userInfo.ingresoCobrador },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setCountData(response.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  // Fetch list of data for client verification
  const fetchData = async (page = 1) => {
    if (loading || (page > 1 && data.length >= totalRecords)) return;
    setLoading(true);

    try {
      const idCobrador = userInfo.ingresoCobrador;
      const url = APIURL.getAllVerificacionTerrena();
      const response = await axios.get(url, {
        params: { idVerificador: idCobrador, filtro, page },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const fetchedData = response.data.registros || [];
      const total = response.data.total || 0;

      setData((prevData) =>
        page === 1 ? fetchedData : [...prevData, ...fetchedData]
      );
      setTotalRecords(total);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Handle errors from API responses
  const handleApiError = (error) => {
    if (error.response) {
      // Si existe una respuesta (aunque sea con un error)
      handleError(error, expireToken);
    } else if (error.request) {
      // Si la solicitud fue realizada, pero no hubo respuesta del servidor
      console.error("No se recibió respuesta del servidor.");
    } else {
      // Cualquier otro tipo de error (por ejemplo, configuración errónea de la solicitud)
      console.error("Error en la configuración de la solicitud:", error.message);
    }
  };

  // Handle icon press actions based on item and type
  const handleIconPress = (item, tipo) => {
    const targetScreen =
      tipo === 1
        ? item.idTerrenaGestionDomicilio === 0
          ? screen.terreno.insert
          : screen.terreno.search
        : item.idTerrenaGestionTrabajo === 0
          ? screen.terreno.insert
          : screen.terreno.search;

    navigation.navigate(targetScreen, { item, tipo });
  };

  const handleReasignar = (vista, item) => {

    setClienteReasignacion(item);
    setModalReasignar(vista);

  }

  const handleRespuestaRapida = (vista, item) => {
    setClienteReasignacion(item);
    setModalRespuestaRapida(vista);
  }
  // Calculate totals for client status
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
                borderColor = "#FFA500";
                break;
              case "ENVIADO":
                borderColor = "green";
                break;
              case "ANULADO":
                borderColor = "red";
                break;
              default:
                borderColor = "gray";
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
              onPress={() => handleReasignar(true, item)}
              onPressRapida={() => handleRespuestaRapida(true, item)}
            />
          ))}
        </View>

        {/* Loading and No Data Indicators */}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading && data.length === 0 && (
          <View>
            <Icon name="history" size={80} color="#fff" style={styles.iconNoData} />
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
      {modalreasignar && (
        <ReasignarModal
          visible={modalreasignar}
          onClose={() => setModalReasignar(false)}
          data={clienteReasignacion}
          onConfirm={() => {
            // Aquí puedes poner tu lógica de confirmación
            setModalReasignar(false);
          }}
        />
      )}
      {modalRespuestaRapida && (
        <RespuestaRapida
          visible={modalRespuestaRapida}
          onClose={() => setModalRespuestaRapida(false)}
          data={clienteReasignacion}
          onConfirm={() => {
            // Aquí puedes poner tu lógica de confirmación
            setModalRespuestaRapida(false);
          }}
        />
      )}
    </View>
  );
}



