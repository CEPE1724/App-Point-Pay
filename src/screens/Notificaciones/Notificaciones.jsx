import React, { useEffect, useState, useCallback, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { useAuth } from '../../navigation/AuthContext';
import axios from 'axios';
import { APIURL } from '../../config/apiconfig';

// Configurar cómo se muestran las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Solicitar permisos de notificaciones
async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('No se obtuvieron permisos para las notificaciones');
    return;
  }

  console.log('Permisos de notificaciones obtenidos correctamente');
  return finalStatus;
}

const Notificaciones = ({ linkVersion, versions, versionActual }) => {
  const auth = useAuth() || {};
  const { token, userNotification } = auth;
  const UserID = userNotification?.[0]?.idNomina;
  
  // Usar un estado para trackear la última notificación vista
  const [lastNotificationId, setLastNotificationId] = useState(null);
  // Usar un conjunto para almacenar IDs de notificaciones ya mostradas
  const shownNotificationsRef = useRef(new Set());
  const intervalRef = useRef();
  const isFirstRunRef = useRef(true);

  // Función para obtener las notificaciones
  const fetchNotifications = useCallback(async () => {
    // Verificar que el usuario esté autenticado y todos los datos necesarios estén disponibles
    if (!token || !UserID) {
      console.log('No hay token o UserID disponible:', { token: !!token, UserID: !!UserID });
      return;
    }

    try {
      console.log('Intentando obtener notificaciones para UserID:', UserID);

      const response = await axios.get(APIURL.getNotificacionesNoti(), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        params: { UserID: UserID },
      });

      // Verificar que la respuesta tenga la estructura esperada
      if (!response.data || !response.data.data) {
        console.log('Estructura de respuesta inesperada:', response.data);
        return;
      }

      const notificationsData = response.data.data;
      console.log('Notificaciones obtenidas:', notificationsData.length);

      // Verificar que notificationsData sea un array
      if (!Array.isArray(notificationsData)) {
        console.log('notificationsData no es un array:', notificationsData);
        return;
      }

      // Revisar si hay una versión nueva
      let allNotifications = [...notificationsData];

      if (versionActual !== versions) {
        const versionNotification = {
          idNotifications: `version_${Date.now()}`, // ID único para versión
          NotificationID: `version_${Date.now()}`,
          Title: "Nueva versión disponible",
          Message: `¡La versión ${versions} ya está disponible!`,
          CreatedAt: new Date().toISOString().split('T')[0],
          Status: "unread",
          URL: linkVersion,
          Type: "update"
        };

        // Añadir la notificación de versión
        allNotifications.push(versionNotification);
      }

      // Filtrar notificaciones no leídas
      const unreadNotifications = allNotifications.filter(notification => 
        notification.Status === 'unread'
      );

      console.log(`Notificaciones no leídas: ${unreadNotifications.length}`);

      // Si es la primera ejecución, solo guardamos las IDs sin mostrar notificaciones
      if (isFirstRunRef.current) {
        unreadNotifications.forEach(notification => {
          shownNotificationsRef.current.add(notification.idNotifications.toString());
        });
        isFirstRunRef.current = false;
        console.log('Primera ejecución: guardando IDs sin mostrar notificaciones');
        return;
      }

      // Procesar notificaciones no leídas
      for (const notification of unreadNotifications) {
        const notificationId = notification.idNotifications.toString();
        
        // Verificar si ya se ha mostrado esta notificación
        if (!shownNotificationsRef.current.has(notificationId)) {
          console.log(`Nueva notificación detectada: ${notificationId}`);
          
          // Marcar como mostrada
          shownNotificationsRef.current.add(notificationId);
          
          // Mostrar la notificación
          await sendNotification(notification);
          console.log(`Notificación mostrada: ${notification.Title}`);
        }
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);

      // Mostrar detalles más específicos del error
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
        console.error("Estado:", error.response.status);
      } else if (error.request) {
        console.error("No se recibió respuesta");
      } else {
        console.error("Error de configuración:", error.message);
      }
    }
  }, [UserID, token, versionActual, versions, linkVersion]);

  // Función para enviar notificación local
  const sendNotification = async (notification) => {
    try {
      if (!notification) {
        console.error("No se puede enviar una notificación nula");
        return;
      }

      const { Title, Message, Type } = notification;

      if (!Title || !Message) {
        console.error("La notificación no tiene título o mensaje", notification);
        return;
      }

      // Configurar el icono basado en el tipo de notificación
      let icon;
      switch (Type) {
        case 'promotion':
          icon = '🏷️';
          break;
        case 'update':
          icon = '🔄';
          break;
        case 'info':
          icon = 'ℹ️';
          break;
        case 'warning':
          icon = '⚠️';
          break;
        case 'alert':
          icon = '🔴';
          break;
        default:
          icon = '📢';
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${icon} ${Title}`,
          body: Message,
          data: { notification },
        },
        trigger: null, // Mostrar inmediatamente
      });
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
    }
  };

  useEffect(() => {
    console.log("Componente Notificaciones montado");

    // Solicitar permisos de notificaciones al cargar el componente
    registerForPushNotificationsAsync()
      .then(() => console.log("Permisos de notificaciones verificados"))
      .catch(err => console.error("Error al solicitar permisos:", err));

    // Solo configurar el intervalo si hay token y UserID
    if (token && UserID) {
      // Ejecutar inmediatamente y luego cada 30 segundos
      fetchNotifications();
      intervalRef.current = setInterval(fetchNotifications, 10000); // 10 segundos para pruebas, ajustar a 30000 en producción
      console.log("Intervalo de verificación de notificaciones configurado");
    } else {
      console.log("No hay token o UserID disponible, no se configurará el intervalo");
    }

    // Configurar el manejador de notificaciones recibidas
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificación recibida:', notification);
    });
    
    // Configurar el manejador de notificaciones cuando se hace clic en ellas
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      try {
        const notification = response.notification.request.content.data.notification;
        console.log('Notificación presionada:', notification);
        // Aquí puedes agregar lógica para abrir la URL o navegar a una pantalla específica
      } catch (error) {
        console.error("Error al procesar la notificación presionada:", error);
      }
    });

    // Limpiar intervalo y listeners al desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
      console.log("Componente Notificaciones desmontado, recursos liberados");
    };
  }, [fetchNotifications, token, UserID]); // Dependencias clave

  // Este componente no renderiza nada visible, solo maneja las notificaciones en segundo plano
  return null;
};

export default Notificaciones;