import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar si el usuario está logueado
  const [hasRegistered, setHasRegistered] = useState(false); // Estado para saber si el dispositivo está registrado

  const login = () => setIsLoggedIn(true);  // Función para cambiar el estado a logueado
  const logout = () => setIsLoggedIn(false); // Función para cambiar el estado a no logueado
  const setRegistrationStatus = (status) => setHasRegistered(status); // Función para actualizar el estado de registro
  const stlogoutEmail = () => setHasRegistered(true); 

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, hasRegistered, setRegistrationStatus, stlogoutEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en cualquier parte de la aplicación
export const useAuth = () => useContext(AuthContext);
