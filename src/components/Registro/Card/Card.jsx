import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { styles } from './Card.Style'; // Asegúrate de importar correctamente los estilos
import { User, DriversLicenseO, FileText, Terrain, Bank, Cell, DoorEnter, DoorExit, Equifax } from '../../../Icons';
import { getItemsAsyncUser, addItemAsyncACUbicCliente, getTopRegsitro, getALLPendientes } from '../../../database';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';

export function Card({ item, index, onPress, onPressIn, onPressOut, pressedCardIndex, db, dataItem, updateNotificationCount, onPressGpsEquifax }) {
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el bloqueo de los botones

  const getColorForValue = (projected, collected) => {
    if (collected < projected && collected > 0) {
      return "#e28743"; // Color for collected > 0 and less than projected
    }
    if (collected >= projected) {
      return "green"; // Color for collected greater than or equal to projected
    }
    return "#a91519"; // Color for collected less than 0
  };

  const handleRegistro = async (item, index, accion) => {
    setIsLoading(true); // Activar el estado de carga (bloquear botones)

    const topRegistro = await getTopRegsitro(db, item.idCompra);


    // Si no hay registros previos, o si es una entrada y no hay registros, insertamos una entrada
    if (topRegistro.length === 0) {

      // Si es "ENTRADA CLIENTE", insertamos directamente, si es "SALIDA CLIENTE", no hacemos nada
      if (accion === "ENTRADA CLIENTE") {
        await saveLocal(accion);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: '¡Éxito!',
          text2: `Se ha registrado la ENTRADA del cliente ${item.Cedula}.`,
          visibilityTime: 6000,
          autoHide: true
        });
      } else {
        // No se puede registrar salida sin una entrada
        Toast.show({
          type: 'error',
          position: 'top',
          text1: '¡Error!',
          text2: `No se puede registrar la SALIDA del cliente ${item.Cedula} sin una ENTRADA previa.`,
          visibilityTime: 6000,
          autoHide: true
        });
      }
      setIsLoading(false); // Desactivar el estado de carga
      return; // Salir de la función
    }

    // Si hay registros previos, verificar si el tipo de acción es el esperado
    if (accion === "ENTRADA CLIENTE") {
      // Si ya se registró una entrada, mostrar un mensaje
      if (topRegistro[0].tipoAccion === "ENTRADA CLIENTE") {
 
        Toast.show({
          type: 'info',
          position: 'top',
          text1: '¡Información!',
          text2: `${item.Cedula} ya registra ENTRADA.😞`,
          text3: 'Por favor, registre la SALIDA del cliente antes de continuar.',
          visibilityTime: 6000,
          autoHide: true
        });
      } else {
        // Si no está registrada una entrada, registrar una nueva entrada

        await saveLocal("ENTRADA CLIENTE");

        Toast.show({
          type: 'success',
          position: 'top',
          text1: '¡Éxito!',
          text2: `Se ha registrado la ENTRADA del cliente ${item.Cedula}.`,
          visibilityTime: 6000,
          autoHide: true
        });
      }
    }

    // Si la acción es "SALIDA CLIENTE", verificar si ya hay un registro de entrada
    if (accion === "SALIDA CLIENTE") {
      // Verificamos si hay una entrada previa
      if (topRegistro[0].tipoAccion === "ENTRADA CLIENTE") {
 
        await saveLocal("SALIDA CLIENTE");

        Toast.show({
          type: 'success',
          position: 'top',
          text1: '¡Éxito!',
          text2: `Se ha registrado la SALIDA del cliente ${item.Cedula}.`,
          visibilityTime: 6000,
          autoHide: true
        });
      } else {
        // Si no se encuentra una entrada, no podemos registrar la salida
    
        Toast.show({
          type: 'error',
          position: 'top',
          text1: '¡Error!',
          text2: `No se puede registrar la SALIDA del cliente ${item.Cedula} sin una ENTRADA previa.`,
          visibilityTime: 6000,
          autoHide: true
        });
      }
    }


    const pendingCount = await getALLPendientes(db);
    updateNotificationCount(pendingCount);
    setIsLoading(false); // Desactivar el estado de carga (habilitar botones)
  };

  // Funciones individuales utilizando la función genérica

  const presseEntrada = async (item, index) => {
    await handleRegistro(item, index, "ENTRADA CLIENTE");
  };

  const presseSalida = async (item, index) => {
    await handleRegistro(item, index, "SALIDA CLIENTE");
  };




  const saveLocal = async (Tipo) => {
    try {
      // Solicitar permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error("Permisos de ubicación no concedidos.");
        return;
      }

      // Intentar obtener la ubicación con un timeout
      const location = await getLocationWithTimeout();

      if (!location) {
        console.error("No se pudo obtener la ubicación.");
        return;
      }

      const currentDate = new Date();
      const timestamp = currentDate.toISOString().slice(0, 19).replace('T', ' ');  // Formato 'yyyy-mm-dd hh:mm:ss'

      const { latitude, longitude } = location.coords;

      // Llamada a la función para guardar la ubicación
      await addItemAsyncACUbicCliente(
        db, Tipo,
        latitude,
        longitude,
        dataItem.ICidIngresoCobrador,
        dataItem.Empresa,
        item.idCompra,
        0,
        0,
        0,
        0,
        new Date().toISOString(),
        0,
        0,
        "",
        "",
        0,
        timestamp,
        ''

      );

    } catch (error) {
      console.error("Error al agregar ubicación en la base de datos:", error);
    }
  };

  // Función para obtener la ubicación con timeout
  const getLocationWithTimeout = async () => {
    let attempts = 0;
    const maxAttempts = 3; // Máximo número de intentos

    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    while (attempts < maxAttempts) {
      try {
        // Intentamos obtener la ubicación
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, // Usar alta precisión
          timeInterval: 5000, // Intentar obtener la ubicación en menos de 5 segundos
          distanceInterval: 10, // Minimizar el movimiento para mayor precisión
        });

        if (location && location.coords) {
          return location; // Si obtenemos la ubicación, la retornamos
        }
      } catch (error) {
        console.error("Error al obtener la ubicación en el intento " + (attempts + 1), error);
      }

      // Esperamos 3 segundos antes de intentar de nuevo
      attempts++;
      if (attempts < maxAttempts) {
        await timeout(3000); // Pausa de 3 segundos antes del siguiente intento
      }
    }

    console.error("No se pudo obtener la ubicación después de múltiples intentos.");
    return null;
  };




  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: pressedCardIndex === index ? "#e0e0e0" : "#fff", // Change color when pressed
          borderColor: pressedCardIndex === index ? "#ccc" : "#ddd", // Optional: Change border color when pressed
        },
      ]}
      onPress={() => onPress(item, index)}
      onPressIn={() => onPressIn(index)} // Set index on press
      onPressOut={() => onPressOut()} // Reset index when press ends
    >
      <View style={styles.row}>
        <User size={18} color="black" style={styles.icon} />
        <Text style={styles.text}> {item.Cliente}</Text>
      </View>
      <View style={styles.row}>
        <Bank size={18} color="black" style={styles.icon} />
        <Text style={styles.text}> {item.Banco}</Text>
        {/*
        {item.latitudEquifax && item.longitudEquifax && (
           <TouchableOpacity
           style={styles.buttonDoor}
           onPress={() => onPressGpsEquifax(item.latitudEquifax, item.longitudEquifax)}
         >
           <Equifax size={25} color="#a81c34" style={styles.icon} />
           <Text style={styles.textDoor}>Ver en Equifax</Text>
         </TouchableOpacity>
        )}
      */}
      </View>

      <View style={styles.row}>
        <DriversLicenseO size={18} color="black" style={styles.icon} />
        <Text style={styles.text}> {item.Cedula}</Text>
      </View>
      <View style={styles.row}>
        <Cell size={20} color="black" style={styles.icon} />
        <Text style={styles.textCell}> {item.Telefono}-{item.Celular}</Text>
      </View>
      <View style={styles.row}>
        <FileText size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>{item.Numero_Documento}</Text>
      </View>
      <View style={styles.rowProyect}>
        <Text style={styles.textProyect}>
          ${item.Valor_Cobrar_Proyectado.toFixed(2)}
        </Text>
        <Text
          style={[
            styles.textProyect,
            {
              color: getColorForValue(
                item.Valor_Cobrar_Proyectado,
                item.Valor_Cobrado
              ),
            },
          ]}
        >
          ${item.Valor_Cobrado.toFixed(2)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textDire}> {item.Barrio}/{item.Direccion}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textDire}> {item.Laboral}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.buttonDoor, isLoading && { opacity: 0.5 }]} // Deshabilitar el botón con opacidad
          onPress={() => presseEntrada(item, index)}
          disabled={isLoading} // Deshabilitar el botón mientras se carga
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" /> // Spinner cuando está cargando
          ) : (
            <>
              <DoorEnter size={20} color="black" style={styles.icon} />
              <Text style={styles.textDoor}>Marcar Entrada</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonDoor, isLoading && { opacity: 0.5 }]} // Deshabilitar el botón con opacidad
          onPress={() => presseSalida(item, index)}
          disabled={isLoading} // Deshabilitar el botón mientras se carga
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" /> // Spinner cuando está cargando
          ) : (
            <>
              <DoorExit size={20} color="black" style={styles.icon} />
              <Text style={styles.textDoor}>Marcar Salida</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
