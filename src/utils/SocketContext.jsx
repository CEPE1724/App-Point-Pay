// src/utils/SocketContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Aquí colocamos la URL de tu servidor de socket (cambia la URL según tu configuración)
const SOCKET_URL = 'https://appservices.com.ec';
//const SOCKET_URL = 'http://192.168.2.49:3055';
const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket debe ser usado dentro de un SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Crear la conexión al servidor de socket
    const socketConnection = io(SOCKET_URL, {
      reconnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Guardar la instancia del socket
    setSocket(socketConnection);

    // Manejar eventos en el socket, por ejemplo, evento de conexión
    socketConnection.on('connect', () => {
      console.log('Conectado al servidor de Socket.io');
    });

    socketConnection.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.io');
    });

    return () => {
      // Limpiar la conexión al desconectar el componente
      socketConnection.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
