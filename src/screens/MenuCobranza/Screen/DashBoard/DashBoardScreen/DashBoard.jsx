import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./DashBoard.Style"; // Verifica la ruta
import { APIURL } from "../../../../../config/apiconfig";
import { Cash, People, Upload, CheckCircle, PendingActions, Done, Refresh, Assessment, PieChart } from "../../../../../Icons";
import { screen } from "../../../../../utils/screenName";

export function DashBoard(props) {
  const { navigation } = props;
  const [totalAmount, setTotalAmount] = useState(0); // Cambié el valor inicial a 0
  const [numberOfClients, setNumberOfClients] = useState(0);
  const [totalProjected, setTotalProjected] = useState(0);
  const [percentageCollected, setPercentageCollected] = useState(0);
  const [loading, setLoading] = useState(false);

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
      console.error("Error fetching data:", error);
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity onPress={handleNavigate} style={styles.summaryContainer}>
          <Text style={styles.title}>Resumen de Cobranza</Text>
          <View style={styles.row}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Cash size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Valor Cobrado</Text>
                <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <People size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Clientes</Text>
                <Text style={styles.summaryValue}>{numberOfClients}</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Assessment size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Total Proyectado</Text>
                <Text style={styles.summaryValue}>${totalProjected.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <PieChart size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>% Cobrado</Text>
                <Text style={styles.summaryValue}>{percentageCollected}%</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.summaryContainerPorc}>
          <View style={styles.containerCirclePorc}>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${getBarWidth(totalAmount, totalProjected)}%`, // Calcula el porcentaje de la barra
                    backgroundColor: getBarColor(totalAmount, totalProjected), // Establece el color según el porcentaje
                  },
                ]}
              >
                <Text style={styles.barText}>
                  {`${getBarWidth(totalAmount, totalProjected).toFixed(2)}%`}
                </Text>
              </View>
            </View>

            <View style={styles.circleContainer}>
              <View style={[styles.circle, { borderColor: getBarColor(totalAmount, totalProjected) }]} >
                <Text style={styles.circleText}>
                  {`${getBarWidth(totalAmount, totalProjected).toFixed(2)}%`}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Asignación diaria</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.card, styles.clickableCard, styles.pendientesCard]}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Upload size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Importar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, styles.clickableCard, styles.completadosCard]}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <CheckCircle size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Asignación Manual</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.summaryContainer}>
          <Text style={styles.title}>Verificación Terrena</Text>
          <View style={styles.row}>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <PendingActions size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Pendientes</Text>
                <Text style={styles.summaryValue}>10</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Done size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.label}>Completados</Text>
                <Text style={styles.summaryValue}>5</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.7}
        disabled={loading}
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
