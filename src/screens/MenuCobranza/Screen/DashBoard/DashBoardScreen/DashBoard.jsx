import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./DashBoard.Style"; // Verifica la ruta
import { APIURL } from "../../../../../config/apiconfig";
import { Cash, People,  Refresh, Assessment, PieChart, Info } from "../../../../../Icons";
import { screen } from "../../../../../utils/screenName";
import { useAuth } from '../../../../../navigation/AuthContext'; // Importamos el contexto
import { handleError } from '../../../../../utils/errorHandler';

export function DashBoard(props) {
  const { navigation } = props;
  const [totalAmount, setTotalAmount] = useState(0); // Cambié el valor inicial a 0
  const [numberOfClients, setNumberOfClients] = useState(0);
  const [totalProjected, setTotalProjected] = useState(0);
  const [percentageCollected, setPercentageCollected] = useState(0);
  const [loading, setLoading] = useState(false);
  const { expireToken } = useAuth(); // Usamos el contexto de autenticación

  const fetchData = async () => {
    setLoading(true);
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      const token = await AsyncStorage.getItem("userToken");
      const url = APIURL.postAllCountGestiones();

      if (userInfo) {
        const { ingresoCobrador } = JSON.parse(userInfo);
        const idIngresoCobrador = ingresoCobrador.idIngresoCobrador;

        const response = await axios.post(
          url,
          { idCobrador: idIngresoCobrador },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Asignación segura de valores, controlando null, cero y valores negativos
        const { totalProjected, totalCollected, count } = response.data;

        const formattedTotalCollected = totalCollected && totalCollected > 0 ? totalCollected : 0;
        const totalCount = count && count > 0 ? count : 0;

        const formattedTotalProjected = totalProjected && totalProjected > 0 ? totalProjected : 0;

        const percentage =
          formattedTotalProjected > 0 ? (formattedTotalCollected / formattedTotalProjected) * 100 : 0;

        setTotalAmount(formattedTotalCollected);
        setNumberOfClients(totalCount);
        setTotalProjected(formattedTotalProjected);
        setPercentageCollected(percentage.toFixed(2));
      }
    } catch (error) {
      handleError(error, expireToken); // Usamos el manejador de errores global
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getBarColor = (totalAmount, totalProjected) => {
    const percentage = totalProjected > 0 ? (totalAmount / totalProjected) * 100 : 0;

    if (percentage < 50) return '#ff4d4d'; // rojo para valores bajos
    if (percentage < 100) return '#ffcc00'; // amarillo para valores medios
    return '#66cc66'; // verde para valores altos
  };

  // Función para calcular el porcentaje de la barra de progreso
  const getBarWidth = (totalAmount, totalProjected) => {
    if (totalProjected > 0) {
      return Math.min((totalAmount / totalProjected) * 100, 100); // Calcula el porcentaje de la barra
    }
    return 0; // Si no hay un valor proyectado, retorna 0
  };

  const handleNavigate = () => {
    gotoRegistro();
  };

  const gotoRegistro = () => {
    navigation.navigate(screen.registro.tab, {
      screen: screen.registro.inicio,
    });
  };

  const showAlert = () => {
    Alert.alert("Información", "Este es un mensaje de información.");
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.title}>Porcentaje de avance</Text>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <PieChart size={30} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.summaryValue}>{percentageCollected}%</Text>
              </View>
            </View>
            <View style={styles.iconContainerInfo}>
            <TouchableOpacity onPress={showAlert}>
              <Info size={12} color="#fff" />
            </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Porcentaje Cobrado</Text>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Cash size={30} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.iconContainerInfo}>
              <TouchableOpacity onPress={showAlert}>
                <Info size={12} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Segunda fila de recuadros */}
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.title}>Clientes Asignados</Text>
            <View style={styles.cardContent}>

              <View style={styles.iconContainer}>
                <People size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.summaryValue}>{numberOfClients}</Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>Valor Proyectado</Text>
            <View style={styles.cardContent}>

              <View style={styles.iconContainer}>
                <Assessment size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.summaryValue}>${totalProjected.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Barra de progreso */}
        <View style={styles.summaryContainerPorc}>
          <View style={styles.containerCirclePorc}>
            <View style={styles.barContainer}>
              <View
                style={[styles.bar, {
                  width: `${getBarWidth(totalAmount, totalProjected)}%`, // Calcula el porcentaje de la barra
                  backgroundColor: getBarColor(totalAmount, totalProjected), // Establece el color según el porcentaje
                }]} >
                <Text style={styles.barText}>
                  {`${getBarWidth(totalAmount, totalProjected).toFixed(2)}%`}
                </Text>
              </View>
            </View>

            <View style={styles.circleContainer}>
              <View style={[styles.circle, { borderColor: getBarColor(totalAmount, totalProjected) }]}>
                <Text style={styles.circleText}>
                  {`${getBarWidth(totalAmount, totalProjected).toFixed(2)}%`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botón flotante para actualizar */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.7}
        disabled={loading}
        onPress={fetchData}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Refresh size={20} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
}
