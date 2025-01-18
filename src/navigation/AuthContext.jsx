import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';  // Importamos axios para manejar solicitudes HTTP
import { useDb } from '../database/db';
import { addItemAsync, getItemsAsync, updateItemAsync } from '../database';
// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar si el usuario está logueado
  const [hasRegistered, setHasRegistered] = useState(false); // Estado para saber si el dispositivo está registrado
  const [token, setToken] = useState(null); // Estado para guardar el token
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga (esperando la verificación del token)

  // Efecto para verificar si el usuario ya tiene un token guardado
  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        console.log("Token almacenado:", storedToken); // Verifica si el token está correctamente almacenado
  
        if (storedToken) {
          if (isTokenExpired(storedToken)) {
            logout();
          } else {
            setIsLoggedIn(true);
            setToken(storedToken);
  
            const storedUserData = await AsyncStorage.getItem('userInfo');
            console.log("Datos del usuario almacenados:", storedUserData); // Verifica si los datos del usuario están correctamente almacenados
            if (storedUserData) {
              setUserData(JSON.parse(storedUserData)); // Almacenar los datos del usuario
            }
          }
        }
      } catch (error) {
        console.log('Error al obtener el token:', error);
      }
      setLoading(false); // Dejar de mostrar el cargando una vez hecho el chequeo
    };
  
    checkToken(); // Ejecutar la función para verificar el token
    axios.interceptors.response.use(
      (response) => response, // Respuesta exitosa
      (error) => {
        // Si el error es por no recibir respuesta (servidor caído o timeout)
        if (!error.response) {
          // Cerrar sesión en caso de que el servidor no responda
          logout();
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error de conexión',
            text2: 'El servidor no respondió. Comunicarse con el administrador.',
            visibilityTime: 6000,
            autoHide: true,
          });
        }
        return Promise.reject(error);
      }
    );
  }, []);
  
  // Verifica si el token ha expirado
  const isTokenExpired = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token
      const currentTime = Math.floor(Date.now() / 1000); // Hora actual en segundos
      return decoded.exp < currentTime; // Verificar si la fecha de expiración es menor a la hora actual
    } catch (error) {
      return true; // Si el token no se puede decodificar, lo consideramos expirado
    }
  };

  // Función de login
  const login = async (token, userData) => {
    try {
      if (token && userData) {
        await AsyncStorage.setItem('userToken', token); // Guardar el token en AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData)); // Guardar los datos del usuario
        console.log("Token y datos del usuario guardados en AsyncStorage");
      } else {
        console.log("Token o datos del usuario no son válidos");
      }

      setIsLoggedIn(true);
      setToken(token);
      setUserData(userData);
      console.log("Token validado", token); // Verificar en consola
    } catch (error) {
      console.error("Error al guardar el token o los datos", error);
    }
  };

  // Función de logout
  const logout = async () => {
    setIsLoggedIn(false);
    setToken(null);
    setUserData(null); // Limpiar los datos del usuario

    try {
      await removeSpecificItems(); // Limpiar datos específicos del usuario en AsyncStorage
    } catch (error) {
      console.log('Error al eliminar el token o los datos:', error);
    }
  };

  // Función que maneja la expiración del token
  const expireToken = async () => {
    console.log("Token expirado. Realizando logout...");
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: '¡Sesión expirada!',
      text2: 'Por favor, vuelve a iniciar sesión.',
      visibilityTime: 4000,
      autoHide: true,
    });
    logout();
  };

  // Limpiar elementos específicos de AsyncStorage
  const removeSpecificItems = async () => {
    try {
      // List of keys to remove
      const keysToRemove = ["userId", "userInfo", "userName", "userToken"];
      for (let key of keysToRemove) {
        console.log("Removing key:", key);
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing items from AsyncStorage:', error);
    }
  };

  // Función para establecer el estado de registro
  const stlogoutEmail = () => setHasRegistered(true);
  const setRegistrationStatus = (status) => setHasRegistered(status);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      token, 
      userData, 
      login, 
      logout, 
      hasRegistered, 
      setRegistrationStatus, 
      expireToken, 
      stlogoutEmail 
    }}>
      {loading ? <View><Text>Loading...</Text></View> : children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en cualquier parte de la aplicación
export const useAuth = () => useContext(AuthContext);
