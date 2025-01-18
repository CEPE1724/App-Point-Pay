import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, BackHandler } from 'react-native';
import { Button, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { XCircle } from '../../../../../Icons';
import { useAuth } from '../../../../../navigation/AuthContext'; // Asegúrate de que esta ruta sea correcta
import { styles } from './ExitVenta.Style';

export function ExitVenta({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [sEmpresa, setSEmpresa] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [sCom_Rango, setSCom_Rango] = useState(null);
  const [sCom_CargosDeVentas, setSCom_CargosDeVentas] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        const storedEmpresa = await AsyncStorage.getItem("Empresa");
        const storedCom_Rango = await AsyncStorage.getItem("Com_Rango");
        const storedCom_CargosDeVentas = await AsyncStorage.getItem("Com_CargosDeVentas");

        if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
        if (storedEmpresa) setSEmpresa(JSON.parse(storedEmpresa));
        if (storedCom_Rango) setSCom_Rango(storedCom_Rango);
        if (storedCom_CargosDeVentas) setSCom_CargosDeVentas(storedCom_CargosDeVentas);
      } catch (error) {
        console.error("Error al obtener los datos de AsyncStorage", error);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = () => setIsModalVisible(true);

  const confirmLogout = () => {
    setIsLoggingOut(true);
    setIsModalVisible(false);
    removeSpecificItems();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const removeSpecificItems = async () => {
    try {
      const keysToRemove = ["userId", "userInfo", "userName", "userToken"];
      for (let key of keysToRemove) await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing items from AsyncStorage:', error);
    }
  };

  const cancelLogout = () => setIsModalVisible(false);

  const handleExit = () => {
    navigation.reset({ index: 0, routes: [{ name: 'MenuTabs' }] });
  };

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  const userName = userInfo.ingresoCobrador?.nombre || "Nombre del Usuario";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{firstLetter}</Text>
      </View>
      <Title style={styles.userTitle}>{userInfo.Nombre || ""}</Title>
      <Text style={styles.userName}>{sEmpresa === 1 ? 'POINT' : 'CREDISOLUCIONES'}</Text>
      <Text style={styles.userName}>{sCom_CargosDeVentas}/ {sCom_Rango}</Text>
      <Title style={styles.userName}>{userName}</Title>
      <Paragraph style={styles.userDescription}>
        Aquí puedes gestionar tu cuenta, cerrar sesión o ir al Menú Principal.
      </Paragraph>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleExit} style={styles.exitButton} icon="exit-to-app">
          Menú Principal
        </Button>
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={cancelLogout} onBackButtonPress={cancelLogout} style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Button mode="text" onPress={cancelLogout} style={styles.modalCloseButton}>
              <XCircle size={30} color="#333" />
            </Button>
          </View>
          <View style={styles.modalBody}>
            <Paragraph style={styles.modalTitle}>Cerrando sesión</Paragraph>
            <Paragraph>¿Estás seguro que deseas salir de tu sesión de POINTPAY?</Paragraph>
          </View>
          <View style={styles.modalFooter}>
            <Button mode="contained" onPress={confirmLogout} style={styles.modalConfirmButton} loading={isLoggingOut}>
              Cerrar sesión
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
