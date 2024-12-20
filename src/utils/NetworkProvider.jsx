import React, { createContext, useState, useEffect, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';

import Toast from 'react-native-toast-message';

// Crear el contexto de red
const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true); // Estado de la conexión

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);

      // Mostrar mensaje Toast dependiendo de la conectividad
      if (state.isConnected) {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: '¡Conexión restaurada!',
          text2: 'Ahora tienes acceso a Internet.',
          visibilityTime: 4000,
          autoHide: true,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: '¡Sin conexión!',
          text2: 'No tienes acceso a Internet en este momento.',
          visibilityTime: 4000,
          autoHide: true,
        });
      }
    });

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

// Hook para usar el contexto de la red
export const useNetworkStatus = () => {
  return useContext(NetworkContext).isConnected;
};
