import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./CardCliente.Style"; // Asegúrate de que la ruta de estilos sea correcta
import { GPS, ViewPhoto } from "../../../Icons";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export function CardCliente({
  item,
  index,
  onPress,
  pressedCardIndex,
  handleIconPress,
}) {
  const navigation = useNavigation(); // Usamos useNavigation aquí
  const [showMap, setShowMap] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false); // Estado para mostrar el modal de imagen

  console.log("item", item);
  // Función para manejar el clic en el ícono del GPS

  const [coordinates, setCoordinates] = useState({
    origin: {
      lat: item.Latitud,
      lng: item.Longitud
    },
    destination: {
      lat: item.Latitud,
      lng: item.Longitud
    }
  });

  const handleGPSClick = () => {
    navigation.navigate(screen.terreno.tab, {
      screen: screen.terreno.maps,
      params: {
        timestamp: new Date().getTime(),
        coordinates,
      }
    });
  };

  const handlePhotoClick = () => {
    setShowPhoto(true); // Mostrar el modal de la imagen
  };

  const closePhotoModal = () => {
    setShowPhoto(false); // Cerrar el modal
  };

  // Opciones para formatear la fecha y hora
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  // Mapeo de estados a colores
  const estadoStyles = {
    0: { text: "Pendiente", color: "#28A745" }, // Verde
    1: { text: "Enviado", color: "#FFA500" }, // Naranja
    2: { text: "Aprobado", color: "#007BFF" }, // Azul
    3: { text: "Anulado", color: "#DC3545" }, // Rojo
  };

  // Obtener estado y color
  const estado = estadoStyles[item.iEstado] || {
    text: "Estado desconocido",
    color: "#000",
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: pressedCardIndex === index ? "#e0e0e0" : "#fff",
          borderColor: pressedCardIndex === index ? "#ccc" : "#ddd",
        },
      ]}
      onPress={() => onPress(item, index)} // Llama a la función de navegación
    >
      <View style={styles.row}>
        <Icon name="user" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>{item.Nombres}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="phone" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>{item.Celular}</Text>
        <Icon name="phone" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>{item.Numero}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="id-card" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>{item.Ruc}</Text>
        <Text style={styles.textProyect}>{item.Almacen}</Text>
        <TouchableOpacity
          style={styles.iconContainerMaps}
          onPress={handleGPSClick} // Abre el mapa cuando se hace clic en el GPS
        >
          <GPS size={20} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Icon name="calendar" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>
          {new Date(item.FechaSistema).toLocaleString(undefined, options)}
        </Text>
        <Text style={[styles.textProyect, { color: estado.color }]}>
          {estado.text}
        </Text>
        <TouchableOpacity
          style={styles.iconContainerFoto}
          onPress={handlePhotoClick} // Abre el modal para ver la foto
        >
          <ViewPhoto size={20} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {item.DireccionDomicilio && (
        <View style={styles.rowProyect}>
          <Text style={styles.textProyect}>{item.DireccionDomicilio}</Text>
        </View>
      )}
      <View style={styles.rowProyect}>
        {item.DireccionTrabajo && (
          <Text style={styles.textProyect}>{item.DireccionTrabajo}</Text>
        )}
        {item.bDomicilio && item.idTerrenaGestionDomicilio === 0 && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleIconPress(item, 1)} // Presionando el ícono de casa
          >
            <Icon name="home" size={30} color="white" />
          </TouchableOpacity>
        )}
        {item.bTrabajo && item.idTerrenaGestionTrabajo === 0 && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleIconPress(item, 2)} // Presionando el ícono de trabajo
          >
            <Icon name="car" size={30} color="white" />
          </TouchableOpacity>
        )}
        {item.idTerrenaGestionDomicilio > 0 && (
          <TouchableOpacity
            style={styles.iconContainerView}
            onPress={() => handleIconPress(item, 1)} // Presionando el ícono de vista de casa
          >
            <Icon name="street-view" size={30} color="white" />
          </TouchableOpacity>
        )}
        {item.idTerrenaGestionTrabajo > 0 && (
          <TouchableOpacity
            style={styles.iconContainerView}
            onPress={() => handleIconPress(item, 2)} // Presionando el ícono de vista de trabajo
          >
            <Icon name="address-book" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Modal para ver la imagen */}
      <Modal
        visible={showPhoto} 
        transparent={true}
        animationType="fade"
        onRequestClose={closePhotoModal}  // Cerrar el modal al hacer click en el área fuera de la imagen
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closePhotoModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: item.UrlPhoto }} // URL de la imagen
              style={styles.modalImage}
              resizeMode="contain" // Ajusta la imagen dentro del modal
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

