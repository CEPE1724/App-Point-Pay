import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { useDb } from '../database/db';
import { getItemsAsyncUser, UpdateItemAsyncUSer, UpdateActivoItemAsyncUSer, getItemsAsync } from '../database';
import axios from 'axios';

// Crear el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRegistered, setHasRegistered] = useState(false);  // Estado para manejo del registro
  const { db } = useDb();
  console.log("hasRegistered  1", hasRegistered);

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
        console.log("Error al obtener los registros de la base de datos", error);
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
          const bbToken = meDataUser[0]?.token || null;
          const usuarioActivo = meDataUser[0]?.UsuarioActivo || 0;
          console.log("Menu almacenado:", meDataUser);
          console.log("UsuarioActivo almacenado:", usuarioActivo);

          // Si el token es válido y el usuario está activo, logueamos al usuario
          if (bbToken && usuarioActivo === 1) {
            if (isTokenExpired(bbToken)) {
              expireToken();  // Si el token está expirado
            } else {
              setIsLoggedIn(true);
              setToken(bbToken);
              setUserData(meDataUser[0]);
            }
          } else {
            logout();  // Si no está activo, cerramos sesión
          }
        } catch (error) {
          console.log('Error al obtener el token:', error);
        }
      } else {
        console.log("El dispositivo no está registrado, no se realizarán consultas a la base de datos.");
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
    console.log("Realizando logout...");
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
      console.error('Error removing items from AsyncStorage:', error);
    }
  };

  // Manejo de la expiración del token
  const expireToken = async () => {
    console.log("Token expirado. Realizando logout...");
    showToast('¡Sesión expirada!', 'Por favor, vuelve a iniciar sesión.');
    logout();
  };

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
    }}>
      {loading ? <View><Text>Loading...</Text></View> : children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en cualquier parte de la aplicación
export const useAuth = () => useContext(AuthContext);
