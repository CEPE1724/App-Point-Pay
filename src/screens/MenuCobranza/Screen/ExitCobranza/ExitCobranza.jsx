import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, BackHandler } from 'react-native';
import { Button, Title, Paragraph } from 'react-native-paper';  // Usamos react-native-paper
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para AsyncStorage
import Modal from 'react-native-modal'; // Librería para el modal
import { XCircle } from '../../../../Icons'; // Importa los iconos necesarios
import { styles } from "./ExitCobranza.Style"; // Verifica la ruta
export function ExitCobranza({ navigation }) {
  // Estado para almacenar la información del usuario
  const [userInfo, setUserInfo] = useState(null);
  const [sEmpresa, setSEmpresa] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para mostrar el modal
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Estado para verificar si el cierre de sesión está en proceso

  // Cargar datos del AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Obtener datos del AsyncStorage
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        const storedEmpresa = await AsyncStorage.getItem("Empresa");
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo)); // Establecer los datos de usuario en el estado
        }
        if (storedEmpresa) {
          setSEmpresa(JSON.parse(storedEmpresa)); // Establecer los datos de usuario en el estado
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
      <View style={styles.circle}>
        <Text style={styles.circleText}>{firstLetter}</Text>
      </View>
      <Title style={styles.userTitle}>{userInfo.Nombre || "" }</Title>
      <Text style={styles.userName}>{sEmpresa === 1 ?'POINT': 'CREDISOLUCIONES'}</Text>
      <Title style={styles.userName}>{userName}</Title>
      <Paragraph style={styles.userDescription}>
        Aquí puedes gestionar tu cuenta, cerrar sesión o ir al Menù Principal.
      </Paragraph>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleExit}
          style={styles.logoutButton}
          icon="logout"
        >
          Menù Principal
        </Button>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={cancelLogout}
        onBackButtonPress={cancelLogout}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Button
              mode="text"
              onPress={cancelLogout}
              style={styles.modalCloseButton}
            >
              <XCircle size={30} color="#333" />
            </Button>
          </View>
          <View style={styles.modalBody}>
            <Paragraph style={styles.modalTitle}>Cerrando sesiòn</Paragraph>
            <Paragraph >
              ¿Estás seguro que deseas salir de tu sesiòn de POINTPAY?
            </Paragraph>
          </View>

          <View style={styles.modalFooter}>
            <Button
              mode="contained"
              onPress={confirmLogout}
              style={styles.modalConfirmButton}
              loading={isLoggingOut}
            >
              Cerrar sesión
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
