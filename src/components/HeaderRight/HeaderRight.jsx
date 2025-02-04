import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { CloudUp, Wifi } from "../../Icons";
import { useNetworkStatus } from "../../utils/NetworkProvider";
import { useAuth } from '../../navigation/AuthContext';
import { getALLPendientes, deletePendientes, getALLDataACC, getItemsAsyncUser, getALlUodateId } from '../../database';
import { APIURL } from '../../config/apiconfig';
import axios from "axios";

export function HeaderRight({ db }) {
  const isConnected = useNetworkStatus(); // Estado de la conexión
  const { notificationCount, setNotificationCount, updateNotificationCount } = useAuth(); // Accedemos y actualizamos el contador de notificaciones
  const [token, setToken] = useState(null);
  
  const isSyncing = useRef(false); // Usar un ref para rastrear la sincronización
  const sentIds = useRef(new Set());  // Este conjunto almacenará los idAccion que ya se enviaron

  // useEffect: solo se ejecuta cuando hay conexión y no hay sincronización en curso
  useEffect(() => {
    const fetchPendientes = async () => {
      // Obtener token del usuario
      const Item = await getItemsAsyncUser(db);
      setToken(Item[0]?.token);

      // Obtener los pendientes desde la base de datos
      const items = await getALLPendientes(db);
      console.log('Pendientes:', items); // Verifica que los pendientes cambien
    };

    fetchPendientes(); // Llamar a la función para obtener los pendientes

    // Si hay conexión y no estamos sincronizando, sincronizamos
    if (isConnected && !isSyncing.current) {
      handleSync(); // Solo sincroniza si no está en proceso
    } else {
      console.log('No hay conexión a Internet, no se puede sincronizar');
    }
  }, [isConnected, db]); // Dependemos de la conexión y la base de datos

  // handleSync: sincroniza la base de datos si hay conexión
  const handleSync = async () => {
    if (isSyncing.current) return; // Si ya está en progreso, no hacer nada
    isSyncing.current = true; // Indicamos que la sincronización está en curso

    try {
      const itemsPendientes = await getALLDataACC(db); // Obtener los pendientes desde la base de datos
      console.log('Pendientes sincronizados:', itemsPendientes);

      // Guardamos cada uno de los elementos pendientes
      for (let i = 0; i < itemsPendientes.length; i++) {
        const data = itemsPendientes[i];
        await savedat(data); // Enviar los datos a la API
      }

      // Luego de guardar, obtener la lista actualizada de pendientes y actualizar el contador
      const updatedItems = await getALLPendientes(db);
      console.log('Pendientes actualizados:', updatedItems);

      // Actualizamos el contador de notificaciones basado en los pendientes restantes
      updateNotificationCount(updatedItems || 0); // Suponiendo que el contador se actualiza según la cantidad de pendientes
      await deletePendientes(db); // Eliminar los pendientes de la base de datos

    } catch (error) {
      console.error("Error al sincronizar:", error);
    } finally {
      isSyncing.current = false; // Reseteamos el estado
    }
  };

  const uploadImages = async (images, urlGoogle, idCompra,  token) => {
    let uploadedImageUrls = "";
    console.log("Subiendo imágenes:", images);
   
      const formData = new FormData();
      formData.append("file", {
        uri: images,
        name: `${Date.now()}.jpg`,
        type: "image/jpeg",
      });
      formData.append("cedula", idCompra);
      formData.append("nombre_del_archivo", `${Date.now()}.jpg`);
      formData.append("tipo", "VOUCHER");
  
      try {
        const responseGoogle = await axios.put(urlGoogle, formData, {
          headers: {
            "Authorization": `Bearer ${token}`, // Agregamos el token de autorización
            "Content-Type": "multipart/form-data", // Se establece el tipo adecuado para cargar archivos
          },
        });
  
        if (responseGoogle.status !== 200) {
          throw new Error(
            `Error en la subida de la imagen: ${responseGoogle.status} - ${responseGoogle.statusText}`
          );
        }
  
        const responseGoogleData = responseGoogle.data;
        if (responseGoogleData.status !== "success") {
          throw new Error(
            `Error en la respuesta de Google: ${responseGoogleData.message}`
          );
        }
        uploadedImageUrls = responseGoogleData.url;
      } catch (error) {
        console.error(`Error al subir la imagen ${imagePath}:`, error);
      }
  
    return uploadedImageUrls;
  };

  // Método para guardar los datos en la API
  const savedat = async (data) => {
    try {
      // Verificar si el idAccion ya fue enviado
      if (sentIds.current.has(data.idAccion)) {
        console.log("Este idAccion ya fue enviado:", data.timestamp);
        return; // Si ya fue enviado, no hacemos nada
      }
  
      // Marcar el idAccion como enviado en el Set
      sentIds.current.add(data.idAccion);
  
      // URL para Google (subida de imagen)
      const urlGoogle = APIURL.putGoogle(); 
  
      let Imagen = data.Url || '';  // Usar la URL original si no hay imagen que subir
  
      // Si TipoPago es 1 o 2, intentamos subir una imagen
      if (data.TipoPago === 1 || data.TipoPago === 2) {
        try {
          // Subir la imagen y capturar la nueva ruta
          Imagen = await uploadImages(
            data.Url,
            urlGoogle,
            data.idCompra,
            token
          );
          console.log("Imagen subida correctamente:", Imagen);  // Confirmación de la subida de imagen
          
          // Si la imagen no se subió correctamente, no continuamos
          if (!Imagen) {
            console.error("La imagen no se subió correctamente.");
            return;  // Salir sin realizar la inserción en la API
          }
        } catch (uploadError) {
          console.error("Error al subir la imagen:", uploadError);
          return;  // Salir sin realizar la inserción en la API si hubo error al subir la imagen
        }
      }
  
      // URL para la API de inserción de datos
      const url = APIURL.postInsertUbi();
      
      // Definir headers de autorización
      const headers = {
        "Authorization": `Bearer ${token}`,  // Añadimos el token en los headers
        "Content-Type": "application/json",  // Tipo de contenido
      };
  
      // Realizamos un POST con axios
      const response = await axios.post(url, {
        idAccion: data.idAccion,
        tipoAccion: data.tipoAccion,
        latitude: data.latitude,
        longitude: data.longitude,
        ICidIngresoCobrador: data.ICidIngresoCobrador,
        Empresa: data.Empresa,
        idCompra: data.idCompra || 0,
        idCombo1: data.idCombo1 || 0,
        idCombo2: data.idCombo2 || 0,
        idCombo3: data.idCombo3 || 0,
        TipoPago: data.TipoPago || 0,
        FechaPago: data.FechaPago || '2000-01-01 00:00:00',  // Fecha por defecto si no está definida
        IdBanco: data.IdBanco || 0,
        NumeroDeposito: data.NumeroDeposito || '',
        Url: Imagen,  // Usamos la imagen subida si está disponible
        Valor: data.Valor || 0,
        Offline: data.Offline || 0,
        timestamp: data.timestamp || new Date().toISOString().slice(0, 19).replace('T', ' '),  // Usa el timestamp proporcionado o genera uno actual si no está presente
        Notas: data.Notas || '',  // Notas por defecto si no están definidas
      }, {
        headers,  // Pasamos los headers de autorización
      });
  
      const fetchedData = response.data;
  
      if (fetchedData.message === 'success') {
        console.log("Datos subidos correctamente");
  
        // Si se guardó correctamente, actualizamos el estado de enviado en la base de datos
        await getALlUodateId(db, data.idAccion); // Marca el idAccion como "enviado"
      }
  
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };
  
  

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
      <View style={{ marginRight: 20 }}>
        <CloudUp size={22} color="white" />
        {notificationCount > 0 && (
          <View
            style={{
              position: 'absolute',
              top: -5,
              right: -10,
              backgroundColor: 'red',
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
              {notificationCount}
            </Text>
          </View>
        )}
      </View>
      {isConnected ? (
        <View style={{ marginRight: 15 }}>
          <Wifi size={22} color="white" />
        </View>
      ) : null}
    </View>
  );
}
