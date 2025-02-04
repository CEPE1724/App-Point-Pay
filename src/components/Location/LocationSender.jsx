import React, { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import { APIURL } from '../../config/apiconfig';
import NetInfo from '@react-native-community/netinfo';
import { useDb } from '../../database/db';
import { addItemAsyncUAPP, getPendingLocations, updateItemAPP, getItemsAsyncUser } from '../../database';

const LocationSender = () => {
  const [isConnected, setIsConnected] = useState(true); // Estado de la conexión de red
  const subscriptionRef = useRef(null);  // Solo se usará para la suscripción a la ubicación
  const { db } = useDb();
  const [ICidIngresoCobrador, setICidIngresoCobrador] = useState(null);
  const [ICCodigo, setICCodigo] = useState(null);
  const [Nombre, setNombre] = useState(null);
  const [iTipoPersonal, setITipoPersonal] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const [Empresa, setEmpresa] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  // Obtener datos del usuario desde la base de datos
  useEffect(() => {
    const fetchAsyncStorageData = async () => {
      try {
        const items = await getItemsAsyncUser(db);  // Obtener datos desde la base de datos
        if (items.length > 0) {
          setICidIngresoCobrador(items[0]?.ICidIngresoCobrador);
          setICCodigo(items[0]?.ICCodigo);
          setNombre(items[0]?.Nombre);
          setITipoPersonal(items[0]?.iTipoPersonal);
          setIdUsuario(items[0]?.idUsuario);
          setEmpresa(items[0]?.Empresa);
          setTimestamp(items[0]?.timestamp);
        }
      } catch (error) {
        console.error("Error al obtener los datos de la base de datos:", error);
      }
    };

    fetchAsyncStorageData(); // Ejecutamos la función para cargar los datos
  }, []);  // Solo ejecuta una vez cuando el componente se monte

  // Función para enviar la ubicación a la API
  const sendLocationToApi = async (location) => {
    if (!ICidIngresoCobrador || idUsuario <= 0) {
      return;  // Si el usuario no está logueado, no se envía la ubicación
    }

    if (!isConnected) {
      return;  // No se hace nada si no hay conexión
    }
    try {
      const url = APIURL.postUbicacionesAPPlocation();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUser: idUsuario,
          latitude: location.latitude,
          longitude: location.longitude,
          ICidIngresoCobrador,
          ICCodigo,
          Nombre,
          iTipoPersonal,
          idUsuario,
          Empresa,
          timestamp
        }),
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      // Actualizamos el estado de la ubicación en SQLite después de enviar con éxito
      await updateItemAPP(db, location.idUbicacionesAPP); // Marcar la ubicación como enviada
    } catch (error) {
      console.error('Error enviando ubicación:', error);
    }
  };

  // Función para guardar la ubicación en SQLite
  const saveLocation = async (newLocation) => {
    if (!ICidIngresoCobrador || ICidIngresoCobrador <= 0) {
      return; // Solo guarda si el usuario está logueado
    }

    try {
      // Guardamos siempre en SQLite (independientemente de la conexión)
      await addItemAsyncUAPP(
        db,
        newLocation.coords.latitude,
        newLocation.coords.longitude,
        ICidIngresoCobrador,
        ICCodigo,
        Nombre,
        iTipoPersonal,
        idUsuario,
        Empresa
      );
    } catch (error) {
      console.error('Error guardando ubicación en SQLite:', error);
    }

    // Después de guardar, intentamos enviar las ubicaciones pendientes
    if (isConnected) {
      await sendPendingLocations();
    }
  };

  // Función para enviar ubicaciones pendientes (ubicaciones no enviadas) desde SQLite
  const sendPendingLocations = async () => {
    const pendingLocations = await getPendingLocations(db);  // Obtener las ubicaciones pendientes (sin enviar)
    if (pendingLocations.length === 0) {
      return;
    }

    // Intentamos enviar cada ubicación pendiente
    for (const location of pendingLocations) {
      await sendLocationToApi(location);
    }
  };

  // Efecto para gestionar la conexión de red y obtener la ubicación
  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected); // Actualizar estado de la conexión de red
    });

    const getLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permisos de ubicación no concedidos');
        return;
      }

      // Usamos watchPositionAsync para obtener actualizaciones de ubicación
      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,  // Usamos una precisión equilibrada
          timeInterval: 60,  // Actualización cada 60 segundos
          distanceInterval: 1,  // Actualización cada 100 metros
        },
        (newLocation) => {
          saveLocation(newLocation);  // Guardamos y luego intentamos enviar ubicaciones pendientes
        }
      );
    };

    getLocationUpdates();

    // Intentar enviar las ubicaciones pendientes al inicio si hay conexión
    if (isConnected) {
      sendPendingLocations();  // Intenta enviar las ubicaciones guardadas localmente
    }

    return () => {
      unsubscribeNetInfo();
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, [isConnected]);  // Solo vuelve a ejecutarse cuando cambia el estado de conexión

  return null; // Este componente no renderiza nada directamente
};

export default LocationSender;
