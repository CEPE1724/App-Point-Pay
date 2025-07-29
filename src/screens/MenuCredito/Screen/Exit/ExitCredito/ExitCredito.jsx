import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, Title, Paragraph } from 'react-native-paper';
import { styles } from './ExitCredito.Style'; // Verifica la ruta
import { useDb } from '../../../../../database/db'; // Importa la base de datos
import { getItemsAsyncUser } from '../../../../../database';

export function ExitCredito({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
    const [sEmpresa, setSEmpresa] = useState(null);
    const { db } = useDb();
  
    // Cargar datos del usuario desde la base de datos
    useEffect(() => {
      const loadUserData = async () => {
        try {
          const item = await getItemsAsyncUser(db);
          setUserInfo(item);
          setSEmpresa(item[0]?.Empresa || 1); // Default a 1 si no hay empresa
        } catch (error) {
          console.error('Error al obtener los datos ', error);
        }
      };
  
      loadUserData();
    }, [db]);
  
    // Función para manejar el cierre de sesión
    const handleExit = () => {
      navigation.reset({
        index: 0, // Regresar al primer screen en la pila
        routes: [{ name: 'MenuTabs' }], // Navegar al 'MenuTabs'
      });
    };
  
    // Verifica si los datos de usuario están disponibles antes de renderizar
    if (!userInfo) {
      return (
        <View style={styles.container}>
          <Text>Cargando datos...</Text>
        </View>
      );
    }
  
    // Extraer nombre del usuario y su primer letra
    const userName = userInfo[0]?.Nombre || userInfo[0]?.ICCodigo;
    const firstLetter = userName.charAt(0).toUpperCase();
  
    return (
      <View style={styles.container}>
        {/* Mostrar la inicial del usuario */}
        <View style={styles.circle}>
          <Text style={styles.circleText}>{firstLetter}</Text>
        </View>
  
        {/* Mostrar nombre completo del usuario */}
        <Title style={styles.userTitle}>{userName}</Title>
  
        {/* Mostrar empresa (dependiendo del valor de sEmpresa) */}
        <Text style={styles.userName}>{sEmpresa === 33 ? 'CREDISOLUCIONES' : 'POINT'}</Text>
        <Title style={styles.userName}>{userInfo[0]?.ICnombre || ''}</Title>
  
        {/* Descripción */}
        <Paragraph style={styles.userDescription}>
          Aquí puedes gestionar tu cuenta, cerrar sesión o ir al Menú Principal.
        </Paragraph>
  
        {/* Botón para ir al menú principal */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleExit}
            style={styles.logoutButton}
            icon="logout"
          >
            Menú Principal
          </Button>
        </View>
      </View>
    );
  }
  