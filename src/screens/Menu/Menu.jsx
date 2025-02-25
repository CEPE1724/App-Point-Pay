import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Location, Exit, Notification, User } from '../../Icons';
import { useSocket } from '../../utils/SocketContext';
import LogoCobranza from '../../../assets/PontyDollar.png';
import LogoVentas from '../../../assets/PointVentas.png';
import logo from '../../../assets/Point.png';
import { useAuth } from '../../navigation/AuthContext';
import { useDb } from '../../database/db';
import { getItemsAsyncMenu, getItemsAsyncUser } from '../../database';
import { APIURL } from "../../config/apiconfig";
import axios from "axios";
import { screen } from "../../utils/screenName";
import { styles } from "./Menu.Style";
import { useNetworkStatus } from "../../utils/NetworkProvider";


export function Menu({ navigation }) {
  const { logout, token } = useAuth(); // Usamos el contexto de autenticación
  const { db } = useDb();
  const isConnected = useNetworkStatus(); // Estado de la conexión
  const [permisosMenu, setPermisosMenu] = useState([]);
  const [version, setVersion] = useState(''); // Iniciamos la versión como string vacío
  const [notificationCount, setNotificationCount] = useState(0); // Ejemplo de número
  const [linkVersion, setLinkVersion] = useState(''); // Enlace de la versión
  const [usuarioapp, setUsuarioapp] = useState(''); // Usuario de la app
  const socket = useSocket(); // Usa el socket

  const VersionActual = '2.4.5.5'; // Versión estática para pruebas

  useEffect(() => {
  fetchData();
  fetchDataVersion();

  // Conectar a Socket.io
  if (socket) {
    socket.on('newNotification', (newNotification) => {
      console.log('Nueva notificación:', newNotification);
      setNotificationCount(prevCount => prevCount + 1); // Incrementa el contador cuando llegue una nueva notificación
     
    });

    // Limpiar el socket cuando el componente se desmonte
    return () => {
      socket.off('newNotification'); // Desactiva el evento para evitar fugas de memoria
    };
  }
}, [socket, db]);



  // Obtener datos de menú y usuario
  const fetchData = async () => {
    try {
      setNotificationCount(0); // Reiniciar el contador de notificaciones
      const items = await getItemsAsyncMenu(db);
      const datauser = await getItemsAsyncUser(db);
      
      setUsuarioapp(datauser[0]?.Nombre);
      setPermisosMenu(items.map(item => item.Menu));
      FetchCountNotification(datauser[0]?.Nombre); // Llamamos a la función de notificaciones después de obtener el usuario
    } catch (error) {
      console.error('Error fetching data from database:', error);
    }
  };

  // Obtener la versión de la app desde la API
  const fetchDataVersion = async () => {
    try {
      const response = await axios.get(APIURL.seteoVerdion());  // Asegúrate de que la URL sea correcta
      const { appVersion, linkVersion } = response.data;

      setVersion(appVersion); // Guarda la versión en el estado
      setLinkVersion(linkVersion); // Guarda el enlace en el estado

      // Actualizar el contador de notificaciones si las versiones no coinciden
      if (appVersion !== VersionActual) {
        setNotificationCount(prevCount => prevCount + 1); // Incrementa el contador de notificaciones
      } 
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  };

  // Obtener el conteo de notificaciones del usuario
  const FetchCountNotification = async (user) => {
    try {
      const response = await axios.get(APIURL.getCountNotificaciones(), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        params: { UsuarioAPP: user },
      });

           const count = response.data.count ;

      setNotificationCount(prevCount => prevCount + count); // Se actualiza con el valor recibido
    } catch (error) {
      console.error("Error fetching notification count:", error);
    }
  };

  // Función de cierre de sesión
  const handleLogout = async () => {
    logout();
  };

  // Navegar a la pantalla de notificaciones
  const screenNotification = () => {
    navigation.navigate(screen.menu.tab, {
      screen: screen.menu.notificaciones,
      params: {
        notificationsVer: notificationCount,
        linkVersion: linkVersion,
        usuario: usuarioapp,
        version : version,
        versionActual: VersionActual,
      },
    });
  };

  
  return (
    <View style={styles.container}>
      <Image source={logo} style={[styles.image, { width: 150, height: 60, marginBottom: 20 }]} resizeMode="contain" />
      {isConnected && 
      <TouchableOpacity style={styles.notification} onPressIn={screenNotification}>
        <Notification size={30} color="#063970" />
        {notificationCount > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      }
      
      <View style={styles.cardContainer}>
        {permisosMenu.includes(1) && (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Cobranza')}>
            <Image source={LogoCobranza} style={{ width: 70, height: 50 }} />
            <Text style={styles.cardTitle}>Cobranza</Text>
          </TouchableOpacity>
        )}
        {permisosMenu.includes(2) && (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Ventas')}>
            <Image source={LogoVentas} style={{ width: 70, height: 50 }} />
            <Text style={styles.cardTitle}>Ventas</Text>
          </TouchableOpacity>
        )}
        {(!permisosMenu.includes(1) && !permisosMenu.includes(2)) && (
          <View style={styles.errorContainer}>
            <User size={50} color="#fff" />
            <Text style={styles.errorMessage}>No tienes permisos para acceder a ninguna sección.</Text>
            <Text style={styles.errorMessage}>Comuníquese con el administrador Ext. 803 - EC</Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>Cuida tus credenciales, no las compartas con nadie.</Text>
      <Text style={styles.title}>Versión: {VersionActual}</Text>

      <View style={styles.cardContainerLoc}>
        <TouchableOpacity style={styles.cardLoc}>
          <Location size={40} color="#2066a4" />
          <Text style={styles.cardTitleLoc}>Ubicanos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardLoc} onPress={handleLogout}>
          <Exit size={40} color="#2066a4" />
          <Text style={styles.cardTitleLoc}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}