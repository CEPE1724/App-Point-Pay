import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { DashBoard } from "../Screen";
import { screen } from "../../../utils";
import { TouchableOpacity, Alert, View, Text } from "react-native";
import { Info, Wifi, WifiOff, AddDrive, CloudUp } from "../../../Icons";
import { useNetworkStatus } from "../../../utils/NetworkProvider"; // Usamos el contexto de red
import { APIURL } from "../../../config/apiconfig";
import {HeaderRight} from '../../../components';
import { useDb } from '../../../database/db'; // Importa la base de datos
import { getItemsAsyncUser, addItemAsyncCbo_Gestorcobranza, deleteCbo_Gestorcobranza, getallCbo_Gestorcobranza, getALLPendientes } from '../../../database';
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();

export function CobranzaStack() {
  const [userInfo, setUserInfo] = useState({ ingresoCobrador: "" });
  const [token, setToken] = useState(null);
  const { db } = useDb();
  const [notificationCount, setNotificationCount] = useState(0); // Ejemplo de número
  // Función para mostrar la alerta de confirmación
  const isConnected = useNetworkStatus(); // Obtenemos el estado de la conexión

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const Item = await getItemsAsyncUser(db);
        if (Item) {
          setToken(Item[0]?.token);
          setUserInfo({ ingresoCobrador: Item[0]?.ICidIngresoCobrador || "" });
        }
      }
      catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    fetchUserInfo();
  }, [db]);

  useEffect(() => {
    const fetchPendientes = async () => {
      // Obtener los pendientes desde la base de datos
      const items = await getALLPendientes(db);
      // Actualizar el contador de notificaciones basado en el tamaño de los items
      setNotificationCount(items); // Asumimos que la cantidad de items es el conteo
    };

    fetchPendientes(); // Llamamos a la función para obtener los pendientes

    const interval = setInterval(fetchPendientes, 60000); // Llamar cada minuto para actualizar el contador de notificaciones

    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  const fetchData = async () => {
    const { ingresoCobrador } = userInfo;  // Extrae el ingresoCobrador del objeto userInfo
    let icont = 0;
    if (!ingresoCobrador) return;
    try {
      const url = APIURL.getfullclienteInsert();  // Asegúrate de que la URL sea la correcta

      const response = await axios.get(url, {
        params: {
          idCobrador: ingresoCobrador
        },
        headers: {
          "Cache-Control": "max-age=300, must-revalidate",  // Cache por 5 minutos
          "Authorization": `Bearer ${token}`,  // Token de autorización
          "Content-Type": "application/json",  // Tipo de contenido JSON
        }
      });

      // Si hay datos en la respuesta, se insertan en la base de datos
      if (response.data && Array.isArray(response.data)) {
        await deleteCbo_Gestorcobranza(db, isConnected);  // Elimina los datos anteriores

        // Usamos forEach, pero con async para manejar las promesas
        await Promise.all(response.data.map(async (item) => {
          // Verifica que item es un objeto con las propiedades esperadas
          if (item && item.Banco && item.Cedula) {
            await addItemAsyncCbo_Gestorcobranza(db, item, isConnected);  // Inserta cada objeto en la base de datos
            icont++;
          } else {
            Toast.show({
              type: 'info', // Tipo de alerta: success, error, info
              position: 'top', // Cambiar la posición a la parte superior
              text1: '¡Información!', // Texto del título
              text2: `Usuario no tiene cliente asignado.`, // Mensaje de la alerta
              text3: ' ', // Texto adicional
              visibilityTime: 4000,
              autoHide: true
            });
            console.warn("Item no válido para insertar:", item);
          }
        }));

      } else {
        console.error("Error: response.data no es un arreglo válido o está vacío.");
      }
      Toast.show({
              type: 'success', // Tipo de alerta: success, error, info
              position: 'top', // Cambiar la posición a la parte superior
              text1: '¡Éxito!', // Texto del título
              text2: `${icont} clientes cargados correctamente.`, // Mensaje de la alerta
              text3: ' ', // Texto adicional
              visibilityTime: 4000,
              autoHide: true
            });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showConfirmAlert = () => {
    Alert.alert(
      "Confirmación", // Título de la alerta
      "¿Desea cargar la información?", // Mensaje de la alerta
      [
        {
          text: "Cancelar", // Botón de cancelar
          onPress: () => console.log("Acción cancelada"),
          style: "cancel", // Estilo de botón cancel
        },
        {
          text: "Aceptar", // Botón de aceptar
          onPress: async () => {
            await fetchData(); // Cargar la información cuando se presiona aceptar
          },
        },
      ],
      { cancelable: false } // La alerta no se puede cerrar tocando fuera de ella
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo
        headerTintColor: '#ffffff', // Color del texto
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            {/* Icono de Información */}
            {isConnected ? (
              <TouchableOpacity onPressIn={showConfirmAlert} style={{ marginRight: 15 }}>
                <AddDrive size={22} color="white" />
              </TouchableOpacity>
            ) : null}
            <HeaderRight db={db} />
          </View>
          
        ),
      }}
    >
      <Stack.Screen
        name={screen.drive.inicio}
        component={DashBoard}
        options={{
          title: "Inicio",
        }}
      />
    </Stack.Navigator>
  );
};
