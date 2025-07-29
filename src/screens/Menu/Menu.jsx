import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Location, Exit, Notification, User } from '../../Icons';
import { useSocket } from '../../utils/SocketContext';
import LogoCobranza from '../../../assets/PontyDollar.png';
import LogoVentas from '../../../assets/PointVentas.png';
import Credito from '../../../assets/Credito.png';
import logo from '../../../assets/Point.png';
import { useAuth } from '../../navigation/AuthContext';
import { useDb } from '../../database/db';
import { getItemsAsyncMenu, getItemsAsyncUser, getItemsAsync, updatePushToken } from '../../database';
import { APIURL } from "../../config/apiconfig";
import axios from "axios";
import { screen } from "../../utils/screenName";
import { styles } from "./Menu.Style";
import { useNetworkStatus } from "../../utils/NetworkProvider";
import { usePushNotifications } from '../../../hooks/usePushNotifications';

export function Menu({ navigation }) {
  const { expoPushToken } = usePushNotifications();
  const { logout, token, userNotification } = useAuth();
  const { db } = useDb();
  const isConnected = useNetworkStatus();
  const [permisosMenu, setPermisosMenu] = useState([]);
  const [version, setVersion] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [linkVersion, setLinkVersion] = useState('');
  const [usuarioapp, setUsuarioapp] = useState('');
  const [pushToken, setPushToken] = useState('');
  const socket = useSocket();
  const [idNomina, setIdNomina] = useState(null);
  const VersionActual = '2.5.0.0';

  useEffect(() => {
    if (expoPushToken) {
      console.log("📲 Token de notificaciones:", expoPushToken);
    }
  }, [expoPushToken]);

  // ✅ Ejecutar cuando `db` y `expoPushToken` estén disponibles
  useEffect(() => {
    if (db && expoPushToken) {
      handlePushToken();
    }
  }, [db, expoPushToken]);

  useEffect(() => {
    fetchData();
    fetchDataVersion();

    if (socket) {
      socket.on('newNotification', (newNotification) => {

        setNotificationCount(prev => prev + 1);
      });

      return () => {
        socket.off('newNotification');
      };
    }
  }, [socket, db]);

  const handlePushToken = async () => {
    if (!expoPushToken || !db) {
      console.warn("⚠️ Token de notificaciones o base de datos no disponible.");
      return;
    }

    try {
      const data = await getItemsAsync(db);
      const savedToken = data[0]?.TokenPush || '';
      const KeyDispositivo = data[0]?.KeyDispositivo;

      if (savedToken !== expoPushToken) {
        console.log("🔄 Token desactualizado. Guardado:", savedToken, "Nuevo:", expoPushToken);

        const apiUpdated = await updateData(KeyDispositivo, expoPushToken);
        if (apiUpdated) {
          console.log("✅ Token actualizado en backend");
          await updatePushToken(db, expoPushToken);
          console.log("✅ Token actualizado en SQLite");
          setPushToken(expoPushToken);
        } else {
          console.warn("⚠️ No se pudo actualizar en backend. Se cancela actualización local.");
        }
      } else {
        console.log("✔️ Token ya está actualizado, sin cambios necesarios.");
      }
    } catch (error) {
      console.error("❌ Error al validar/actualizar token push:", error);
    }
  };

  // ✅ Corregida para retornar true/false
  const updateData = async (KeyDispositivo, TokenExpo) => {
    try {
      const response = await axios.patch(APIURL.updatePushToken(), {
        KeyDispositivo: KeyDispositivo,
        TokenExpo: TokenExpo,
      });

      console.log("✅ Datos actualizados correctamente:", response.data);
      return true;
    } catch (error) {
      console.error("❌ Error al actualizar los datos:", error);
      return false;
    }
  };

  const fetchData = async () => {
    try {
      setNotificationCount(0);
      const items = await getItemsAsyncMenu(db);
      const datauser = await getItemsAsyncUser(db);
      const data = await getItemsAsync(db);
      setIdNomina(data[0]?.idNomina || 0);
      console.log("🔍 Datos del menú:", items);
      console.log("🔍 Datos del usuario:", datauser);
      console.log("🔍 Datos de configuración:", data);
      setPushToken(data[0]?.TokenPush);
      setUsuarioapp(datauser[0]?.Nombre);
      setPermisosMenu(items.map(item => item.Menu));
      FetchCountNotification(datauser[0]?.Nombre);
    } catch (error) {
      console.error('Error fetching data from database:', error);
    }
  };

  const fetchDataVersion = async () => {
    try {
      const response = await axios.get(APIURL.seteoVerdion());
      const { appVersion, linkVersion } = response.data;

      setVersion(appVersion);
      setLinkVersion(linkVersion);

      if (appVersion !== VersionActual) {
        setNotificationCount(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  };

  const FetchCountNotification = async (user) => {
    try {
      if (!userNotification || userNotification.length === 0) {
        console.warn("userNotification está vacío o es null");
        setNotificationCount(0);
        return;
      }
  
      const userId = userNotification[0].idNomina || idNomina;
  
      const response = await axios.get(APIURL.getCountNotificacionesNoti(), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        params: { UserID: userId },
      });
  
      const { success, count = 0 } = response.data;
  
      if (!success) {
        console.log("No hay notificaciones pendientes.");
        setNotificationCount(0);
        return;
      }
  
      setNotificationCount(count);
  
    } catch (error) {
      console.error("Error fetching notification count EC:", error);
      setNotificationCount(0); // opcional
    }
  };
  
  

  const handleLogout = () => logout();

  const screenNotification = () => {
    console.log("🔔 Navegando a notificaciones con ec:",   {
      notificationsVer: notificationCount,
      linkVersion: linkVersion,
      usuario: usuarioapp,
      version: version,
      versionActual: VersionActual,
      UserID: idNomina 
    });
    navigation.navigate(screen.menu.tab, {
      screen: screen.menu.notificaciones,
      params: {
        notificationsVer: notificationCount,
        linkVersion: linkVersion,
        usuario: usuarioapp,
        version: version,
        versionActual: VersionActual,
        UserID: idNomina ||userNotification[0].idNomina 
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
             {/* <Text style={styles.notificationBadgeText}>{notificationCount}</Text>*/}
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
        {permisosMenu.includes(3) && (
          <TouchableOpacity style={styles.card} onPress={() => 
           navigation.navigate('CrediPoint')}>
            <Image source={Credito} style={{ width: 50, height: 50 }} />
            <Text style={styles.cardTitle}>CrediPoint</Text>
          </TouchableOpacity>
        )}
        {(!permisosMenu.includes(1) && !permisosMenu.includes(2)) && !permisosMenu.includes(3)  && (
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
