import React from 'react';
import * as Location from 'expo-location';


export const  LocationSender = ({ onLocationChange }) => {

  // Función para obtener la ubicación y actualizar el estado
  const getLocationUpdates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permisos de ubicación no concedidos');
      return;
    }

    // Usamos getCurrentPositionAsync para obtener una ubicación única
    const newLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,  // Usamos una precisión equilibrada
    });

    const { latitude, longitude } = newLocation.coords;
    onLocationChange({ latitude, longitude });  // Llamamos a la función onLocationChange pasada como prop
  };

 
    return null
};