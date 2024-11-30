import React, { useEffect, useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import * as Location from 'expo-location';

export function LocationTracker() {
  const [locationEnabled, setLocationEnabled] = useState(false);

  // Función que comprueba si los permisos están concedidos y si los servicios de ubicación están habilitados
  const checkLocationEnabled = useCallback(async () => {
    try {
      // Verificar permisos de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationEnabled(false);
        showAlert("Permiso de ubicación no concedido", "Por favor, permite el acceso a tu ubicación.");
        return;
      }

      // Verificar si los servicios de ubicación están habilitados
      const locationStatus = await Location.hasServicesEnabledAsync();
      setLocationEnabled(locationStatus);

      if (!locationStatus) {
        showAlert("Servicios de ubicación desactivados", "Por favor, activa los servicios de ubicación para continuar.");
      }
    } catch (error) {
      console.error("Error al verificar ubicación:", error);
    }
  }, []);

  // Función para mostrar alertas
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: "Aceptar" }]
    );
  };

  // Llamada inicial para verificar el estado de la ubicación
  useEffect(() => {
    checkLocationEnabled();
  }, [checkLocationEnabled]);

  return null; // No se necesita renderizar nada aquí
}
