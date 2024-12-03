import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, BackHandler } from 'react-native';
import { Button, Title, Paragraph } from 'react-native-paper';  // Usamos react-native-paper
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para AsyncStorage
import Modal from 'react-native-modal'; // Librería para el modal
import {XCircle} from '../../../../../Icons'; // Importa los iconos necesarios
import { styles } from "./ExitVenta.Style"; // Verifica la ruta
import { screen } from '../../../../../utils/screenName'; // Importa la configuración de las pantallas
import { refresh } from '@react-native-community/netinfo';
import { CommonActions } from '@react-navigation/native';

export function ExitVenta({ navigation }) {
  // Estado para almacenar la información del usuario
  const [userInfo, setUserInfo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para mostrar el modal
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para verificar si el cierre de sesión está en proceso

  // Cargar datos del AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Obtener datos del AsyncStorage
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo)); // Establecer los datos de usuario en el estado
        }
      } catch (error) {
        console.error("Error al obtener los datos de AsyncStorage", error);
      }
    };

    loadUserData();
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsModalVisible(true); // Mostrar el modal para confirmar el cierre de sesión
  
  };

  // Función para confirmar el cierre de sesión
  const confirmLogout = () => {
    setIsLoggingOut(true); // Indicate that the logout process is ongoing
    setIsModalVisible(false); // Hide the modal after confirming
    removeSpecificItems();


// En el componente donde quieras redirigir al usuario a Login
navigation.dispatch(
  CommonActions.reset({
    index: 0, // Asegúrate de que sea el índice correcto
    routes: [{ name: 'Login' }],
  })
);


    navigation.reset({
      index: 0, // Start from the first screen in the stack
      routes: [{ name: 'Login' }], // Navigate directly to 'Cobranza'
    });
  
  };
  
  const removeSpecificItems = async () => {
    try {
      // List of keys to remove
      const keysToRemove = ["userId", "userInfo", "userName", "userToken"];
      
      // Loop through the keys and remove each item
      for (let key of keysToRemove) {
        await AsyncStorage.removeItem(key);
      }
      
      // Optionally, log the remaining keys to confirm removal
      const remainingKeys = await AsyncStorage.getAllKeys();
  
    } catch (error) {
      console.error('Error removing items from AsyncStorage:', error);
    }
  };

  // Función para cancelar el cierre de sesión
  const cancelLogout = () => {
    setIsModalVisible(false); // Ocultar el modal si el usuario cancela
  };

  // Función para salir de la aplicación
  const handleExit = () => {
   
    navigation.reset({
      index: 0, // Start from the first screen in the stack
      routes: [{ name: 'MenuTabs' }], // Navigate directly to 'Cobranza'
    });
    // Esto cerrará la aplicación
    //if (Platform.OS === 'ios') {
    //  BackHandler.exitApp();
   // } else {
   //   BackHandler.exitApp();
   // }
  };

  // Verifica si los datos de usuario están disponibles antes de renderizar
  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  // Obtener nombre del usuario desde los datos
  const userName = userInfo.ingresoCobrador?.nombre || "Nombre del Usuario";

  // Extraer la primera letra del primer nombre
  const firstLetter = userName.charAt(0).toUpperCase(); 

  return (
    <View style={styles.container}>
      {/* Círculo con la primera letra del nombre */}
      <View style={styles.circle}>
        <Text style={styles.circleText}>{firstLetter}</Text>
      </View>

      {/* Título con el nombre del usuario */}
      <Title style={styles.userName}>{userName}</Title>

      {/* Descripción adicional */}
      <Paragraph style={styles.userDescription}>
        Aquí puedes gestionar tu cuenta, cerrar sesión o ir al Menù Principal.
      </Paragraph>

      {/* Botones con react-native-paper */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleExit}
          style={styles.logoutButton}
          icon="logout"
        >
          Menù Principal
        </Button>

        <Button
          mode="outlined"
         
          onPress={handleLogout  }
          style={styles.exitButton}
          icon="exit-to-app"
        >
          Salir
        </Button>
      </View>

      {/* Modal para confirmar cierre de sesión */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={cancelLogout} // Cerrar el modal si el usuario hace clic fuera del modal
        onBackButtonPress={cancelLogout} // Cerrar el modal si el usuario presiona el botón de retroceso
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {/* Primer View: X en la parte superior */}
          <View style={styles.modalHeader}>
            <Button
              mode="text"
              onPress={cancelLogout}
              style={styles.modalCloseButton}
            >
              <XCircle size={30} color="#333" />
            </Button>
          </View>

          {/* Segundo View: Mensaje de confirmación */}
          <View style={styles.modalBody}>
            <Paragraph style={styles.modalTitle}>Cerrando sesiòn</Paragraph>
            <Paragraph >
              ¿Estás seguro que deseas salir de tu sesiòn de POINTPAY?
            </Paragraph>
          </View>

          {/* Tercer View: Botones de confirmación y cancelación */}
          <View style={styles.modalFooter}>
            <Button
              mode="contained"
              onPress={confirmLogout}
              style={styles.modalConfirmButton}
              loading={isLoggingOut} // Mostrar cargando mientras se realiza el cierre
            >
              Cerrar sesión
            </Button>

          </View>
        </View>
      </Modal>
    </View>
  );
}
