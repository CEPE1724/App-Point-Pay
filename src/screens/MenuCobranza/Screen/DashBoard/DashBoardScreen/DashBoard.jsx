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
import { styles } from "./DashBoard.Style"; // Verifica la ruta
import { APIURL } from "../../../../../config/apiconfig";
import { ConfirmDialog } from "../../../../../components";
import { screen } from "../../../../../utils/screenName";
import { Cash, People, Refresh, Assessment, PieChart, Info, Doorclose, Dooropen, Almuerzo, ExitAlmuerzo, Right } from "../../../../../Icons";
import { useAuth } from '../../../../../navigation/AuthContext'; // Importamos el contexto
import { handleError } from '../../../../../utils/errorHandler';
import { useDb } from '../../../../../database/db'; // Importa la base de datos
import { getItemsAsyncUser, addItemAsyncDSbMetr, getItemsAsyncDSbMetr, UpdateAllDSbMetr, addItemAsyncACUbic, getPendingACUbic, getTipoAccion, getALLPendientes,deletePendientes  } from '../../../../../database';
import { useNetworkStatus } from "../../../../../utils/NetworkProvider"; // Usamos el contexto de #bd252e
import * as Location from 'expo-location';
export function DashBoard(props) {
  const { navigation } = props;
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfClients, setNumberOfClients] = useState(0);
  const [totalProjected, setTotalProjected] = useState(0);
  const [percentageCollected, setPercentageCollected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sdata, setSdata] = useState([]);
  const { expireToken, updateNotificationCount  } = useAuth(); // Usamos el contexto de autenticación
  const { db } = useDb();
  const isConnected = useNetworkStatus(); // Obtenemos el estado de la conexión
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tipoAccion, setTipoAccion] = useState("Ingreso de Cobrador");
  const [isTrabajoIngreso, setIsTrabajoIngreso] = useState(0);
  const [isTrabajoSalida, setIsTrabajoSalida] = useState(0);
  const [isAlmuerzoInicio, setIsAlmuerzoInicio] = useState(0);
  const [isAlmuerzoFin, setIsAlmuerzoFin] = useState(0);
  //const dele =  deletePendientes(db);
  const handleConfirm = async () => {
    // Actualiza el estado para reflejar que la acción se ha confirmado y bloquear el botón
    if (tipoAccion === 'Ingreso al Trabajo') {
      setIsTrabajoIngreso(1); // Bloquea el botón y cambia el color a rojo
    } else if (tipoAccion === 'Salida del Trabajo') {
      setIsTrabajoSalida(1);
    } else if (tipoAccion === 'Inicio del Almuerzo') {
      setIsAlmuerzoInicio(1);
    } else if (tipoAccion === 'Fin del Almuerzo') {
      setIsAlmuerzoFin(1);
    }

    // Cierra el modal después de la confirmación
    setIsModalVisible(false);

    // Llamar a la función para registrar la acción en la base de datos
    await InsertaddItemAsyncACUbic(tipoAccion);

    // Obtener el nuevo número de pendientes

    const pendingCount = await getALLPendientes(db);
    
    // Actualizar el contador de notificaciones en el contexto global
    updateNotificationCount(pendingCount);
  };

  const handleCancel = () => {

    setIsModalVisible(false);
  };

  useEffect(() => {
    const checkAcciones = async () => {
      // Consultamos si ya existen acciones registradas en la base de datos
      const acciones = ["Ingreso al Trabajo", "Salida del Trabajo", "Inicio del Almuerzo", "Fin del Almuerzo"];
      for (let accion of acciones) {
        const Stipo = await getTipoAccion(db, accion);
        if (Stipo && Stipo.length > 0) {
          switch (accion) {
            case "Ingreso al Trabajo":
              setIsTrabajoIngreso(1);
              break;
            case "Salida del Trabajo":
              setIsTrabajoSalida(1);
              break;
            case "Inicio del Almuerzo":
              setIsAlmuerzoInicio(1);
              break;
            case "Fin del Almuerzo":
              setIsAlmuerzoFin(1);
              break;
            default:
              break;
          }
        }
      }
    };

    checkAcciones();
  }, [db, isAlmuerzoFin, isAlmuerzoInicio, isTrabajoIngreso, isTrabajoSalida]);

  // Función para consumir la API y actualizar la base de datos local
  const fetchDataFromAPI = async () => {
    setLoading(true);
    try {
      const Item = await getItemsAsyncUser(db);
      const token = Item[0]?.token;
      const url = APIURL.postAllCountGestiones();

      if (Item && Item[0]?.ICidIngresoCobrador && token) {
        setSdata(Item);
        const response = await axios.post(
          url,
          { idCobrador: Item[0]?.ICidIngresoCobrador },
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
        const percentage = formattedTotalProjected > 0 ? (formattedTotalCollected / formattedTotalProjected) * 100 : 0;

        setTotalAmount(formattedTotalCollected);
        setNumberOfClients(totalCount);
        setTotalProjected(formattedTotalProjected);
        setPercentageCollected(percentage.toFixed(2));

        // Actualizamos la base de datos local con los nuevos valores
        const itemToInsert = {
          ICidIngresoCobrador: Item[0]?.ICidIngresoCobrador,
          totalAmount: formattedTotalCollected,
          numberOfClients: totalCount,
          totalProjected: formattedTotalProjected,
          percentageCollected: percentage.toFixed(2),
        };

        // Si hay datos previos, los actualizamos
        const localData = await getItemsAsyncDSbMetr(db);
        if (localData && localData.length > 0) {
          await UpdateAllDSbMetr(db, itemToInsert); // Actualizamos la tabla local
        } else {
          await addItemAsyncDSbMetr(db, itemToInsert); // Si no hay datos previos, insertamos nuevos
        }
      }
    } catch (error) {
      handleError(error, expireToken); // Usamos el manejador de errores global
    } finally {
      setLoading(false);
    }
  };

  // Validar si hay datos locales disponibles
  const valDataLocal = async () => {
    const ItemDSbMetr = await getItemsAsyncDSbMetr(db);
    if (ItemDSbMetr && ItemDSbMetr.length > 0) {
      const { ICidIngresoCobrador, totalAmount, numberOfClients, totalProjected, percentageCollected } = ItemDSbMetr[0];
      setTotalAmount(totalAmount);
      setNumberOfClients(numberOfClients);
      setTotalProjected(totalProjected);
      setPercentageCollected(percentageCollected);
    } else {
      // Si no hay datos locales, se consume la API
      if (isConnected) {
        fetchDataFromAPI();
      } else {
        Alert.alert("Sin conexión", "No hay conexión a Internet. Mostrando datos anteriores.");
      }
    }
  };

  useEffect(() => {
    // Verifica si hay datos en la base local al inicio
    valDataLocal();
  }, [isConnected]);

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

  const showAlert = () => {
    Alert.alert("Información", "Este es un mensaje de información.");
  };


  const InsertaddItemAsyncACUbic = async (tipoAccion) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {

        return;
      }
      console.log("InsertaddItemAsyncACUbic", tipoAccion);
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const Item = await getItemsAsyncUser(db);
      if (!Item || !Item[0]?.ICidIngresoCobrador || !Item[0]?.Empresa) {
  
        return;
      }

      await addItemAsyncACUbic(
        db,
        tipoAccion,
        latitude,
        longitude,
        Item[0]?.ICidIngresoCobrador,
        Item[0]?.Empresa
      );

      sendPendingLocations();

    } catch (error) {
      console.log("Error al insertar ubicación en la base de datos Edison:", error);
    }
  };

  const sendPendingLocations = async () => {
    const pendingLocations = await getPendingACUbic(db);
    if (pendingLocations.length === 0) {
      return;
    }
  }

  const handleTipoAccion = async (tipoAccion) => {
    const Stipo = await getTipoAccion(db, tipoAccion);
    console.log("Stipo", Stipo);
    if (Stipo && Stipo.length > 0) {
      return;
    }
    setTipoAccion(tipoAccion);
    setIsModalVisible(true);
  }

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
          <TouchableOpacity onPress={handleNavigate}>
          <View style={styles.card}>
            <Text style={styles.title}>Clientes Asignados</Text>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <People size={20} color="#fff" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.summaryValue}>{numberOfClients}</Text>
              </View>
              <Right size={30} color="#b4b4b4" />
            </View>
          </View>
        </TouchableOpacity>
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
                  width: `${getBarWidth(totalAmount, totalProjected)}%`,
                  backgroundColor: getBarColor(totalAmount, totalProjected),
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

        <View style={styles.cardRowContainer}>
          <View style={styles.individualCard}>
            <View style={styles.cardContentWrapper}>
              <TouchableOpacity onPress={() => handleTipoAccion('Ingreso al Trabajo')}
                disabled={isTrabajoIngreso === 1}
              >
                <View style={styles.iconWrapper}>
                  <Dooropen size={20} color={isTrabajoIngreso === 1 ? "#bd252e" : "#fff"} />
                </View>
                <View style={styles.valueWrapper}>
                  <Text style={styles.valueText}>Ingreso al Trabajo</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.iconContainerInfo}>
                <TouchableOpacity onPress={showAlert}>
                  <Info size={5} color={isTrabajoIngreso === 1 ? "green" : "#fff"} />

                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.individualCard}>
            <View style={styles.cardContentWrapper}>
              <TouchableOpacity onPress={() => handleTipoAccion('Inicio del Almuerzo')}
                disabled={isAlmuerzoInicio === 1}
              >
                <View style={styles.iconWrapper}>
                  <Almuerzo size={20} color={isAlmuerzoInicio === 1 ? "#bd252e" : "#fff"} />
                </View>
                <View style={styles.valueWrapper}>
                  <Text style={styles.valueText}>Inicio del Almuerzo</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.iconContainerInfo}>
                <TouchableOpacity onPress={showAlert}>
                  <Info size={5} color={isAlmuerzoInicio === 1 ? "green" : "#fff"} />

                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.cardRowContainer}>
          <View style={styles.individualCard}>

            <View style={styles.cardContentWrapper}>
              <TouchableOpacity onPress={() => handleTipoAccion('Fin del Almuerzo')}
                disabled={isAlmuerzoFin === 1}
              >
                <View style={styles.iconWrapper}>
                  <ExitAlmuerzo size={20} color={isAlmuerzoFin === 1 ? "#bd252e" : "#fff"} />
                </View>
                <View style={styles.valueWrapper}>
                  <Text style={styles.valueText}>Fin del Almuerzo</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.iconContainerInfo}>
                <TouchableOpacity onPress={showAlert}>
                  <Info size={5} color={isAlmuerzoFin === 1 ? "green" : "#fff"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.individualCard}>

            <View style={styles.cardContentWrapper}>
              <TouchableOpacity onPress={() => handleTipoAccion('Salida del Trabajo')}
                disabled={isTrabajoSalida === 1}
              >
                <View style={styles.iconWrapper}>
                  <Doorclose size={20} color={isTrabajoSalida === 1 ? "#bd252e" : "#fff"} />
                </View>
                <View style={styles.valueWrapper}>
                  <Text style={styles.valueText}>Salida del Trabajo</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.iconContainerInfo}>
                <TouchableOpacity onPress={showAlert}>
                  <Info size={5} color={isTrabajoSalida === 1 ? "green" : "#fff"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botón flotante para actualizar */}
      {isConnected && (
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.7}
          disabled={loading}
          onPress={fetchDataFromAPI}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Refresh size={20} color="#fff" />
          )}
        </TouchableOpacity>
      )}

      <ConfirmDialog
        visible={isModalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        tipoAccion={tipoAccion}
      />
    </View>
  );
}
