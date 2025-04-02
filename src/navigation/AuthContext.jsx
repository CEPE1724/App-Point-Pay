import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { useDb } from '../database/db';
import { getItemsAsyncUser, UpdateItemAsyncUSer, UpdateActivoItemAsyncUSer, getItemsAsync, getdispositivosappNot } from '../database';
import axios from 'axios';

// Crear el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userNotification, setUserNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRegistered, setHasRegistered] = useState(false);  // Estado para manejo del registro
  const [notificationCount, setNotificationCount] = useState(0);
  const { db } = useDb();

 
  // Verificación del token y el estado de registro
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const fetchedItems = await getItemsAsync(db);  // Obtener los items desde la base de datos
        if (fetchedItems && fetchedItems.length > 0) {
          setHasRegistered(true);  // Si hay registros, el dispositivo está registrado
        } else {
          setHasRegistered(false);  // Si no hay registros, no está registrado
        }
      } catch (error) {
        setHasRegistered(false);  // Si hay algún error, asumimos que no está registrado
      }
    };

    checkRegistrationStatus();
  }, [db]);

  // Verificación del token al cargar la aplicación
  useEffect(() => {
    const checkToken = async () => {
      if (hasRegistered) {  // Solo hacer las consultas si 'hasRegistered' es true
        try {
          const meDataUser = await getItemsAsyncUser(db);
          const meDataNotificacion = await getdispositivosappNot(db);
          const bbToken = meDataUser[0]?.token || null;
          const usuarioActivo = meDataUser[0]?.UsuarioActivo || 0;


          // Si el token es válido y el usuario está activo, logueamos al usuario
          if (bbToken && usuarioActivo === 1) {
            if (isTokenExpired(bbToken)) {
              expireToken();  // Si el token está expirado
            } else {
              setIsLoggedIn(true);
              setToken(bbToken);
              setUserData(meDataUser[0]);
              setUserNotification(meDataNotificacion);
            }
          } else {
            logout();  // Si no está activo, cerramos sesión
          }
        } catch (error) {
          console.log('Error al obtener el token:', error);
        }
      } 
      setLoading(false);
    };

    checkToken();  // Ejecutamos la verificación del token
  }, [hasRegistered]);  // Dependencia en 'hasRegistered'

  // Función para verificar si el token ha expirado
  const isTokenExpired = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;  // Si no se puede decodificar el token, lo consideramos expirado
    }
  };
  const updateNotificationCount = (count) => {
    console.log('updateNotificationCount:', count);
    setNotificationCount(count);
  };


  // Mostrar un mensaje de error cuando estamos offline
  const showToast = (title, message) => {
    ToastAndroid.showWithGravityAndOffset(
      `${title}: ${message}`,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  // Función de login
  const login = async (stoken, suserData) => {
    try {
      // Al realizar login, marcamos al usuario como activo y cambiamos el estado de registro
      await UpdateActivoItemAsyncUSer(db, 1);  // Cambiar el estado de 'UsuarioActivo' a 1
      setIsLoggedIn(true);
      setToken(stoken);
      setUserData(suserData);
      //setHasRegistered(true);  // Establecemos que el dispositivo está registrado
    } catch (error) {
      console.error("Error al guardar el token o los datos", error);
    }
  };

  // Función de logout
  const logout = async () => {
    setIsLoggedIn(false);
    setToken(null);
    setUserData(null);
    //setHasRegistered(false);  // Limpiamos el estado de registro
    try {
      await removeSpecificItems();  // Limpiar datos del usuario
    } catch (error) {
      console.log('Error al eliminar el token o los datos:', error);
    }
  };

  // Limpiar elementos específicos de la base de datos
  const removeSpecificItems = async () => {
    try {
      await UpdateItemAsyncUSer(db, '');  // Limpiar datos del usuario
      await UpdateActivoItemAsyncUSer(db, 0);  // Desactivar el usuario
    } catch (error) {
      console.error('Error removing items from :', error);
    }
  };

  // Manejo de la expiración del token
  const expireToken = async () => {
    showToast('¡Sesión expirada!', 'Por favor, vuelve a iniciar sesión.');
    logout();
  };
console.log('userNotification:', userNotification);
  // Función para controlar el estado de registro
  const setRegistrationStatus = (status) => setHasRegistered(status); // Actualiza el estado de registro

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      token,
      userData,
      login,
      logout,
      expireToken,
      loading,
      hasRegistered, // Estado de registro
      setRegistrationStatus, // Función para actualizar el estado de registro
      notificationCount,
      updateNotificationCount,
      userNotification,
    }}>
      {loading ? <View><Text>Loading...</Text></View> : children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en cualquier parte de la aplicación
export const useAuth = () => useContext(AuthContext);
