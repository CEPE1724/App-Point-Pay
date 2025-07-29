import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./CardCliente.Style"; // Asegúrate de que la ruta de estilos sea correcta
import { GPS, ViewPhoto } from "../../../Icons";
import { screen } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { PhotoViewer } from '../PhotoViewer';

export function CardCliente({
  item,
  index,
  onPress,
  onPressRapida,
  pressedCardIndex,
  handleIconPress,
}) {

  const navigation = useNavigation(); // Usamos useNavigation aquí
  const [showMap, setShowMap] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false); // Estado para mostrar el modal de imagen

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
    0: { text: "Pendiente", color: "#FFA500" }, // amarillo
    1: { text: "Enviado", color: "#28A745" }, // Verde
    2: { text: "Aprobado", color: "#007BFF" }, // Azul
    3: { text: "Anulado", color: "#DC3545" }, // Rojo
  };

  const cre_tiempo = {
    0: { text: "SIN REGISTRO", color: "#6C757D" }, // Gris
    1: { text: "0-3 MESES", color: "#28A745" }, // Verde
    2: { text: "3-6 MESES", color: "#FFA500" }, // Naranja
    3: { text: "6-12 MESES", color: "#007BFF" }, // Azul
    4: { text: "MÁS DE UN AÑO", color: "#DC3545" }, // Rojo
    5: { text: "1-5 AÑOS", color: "#6F42C1" }, // Morado
    6: { text: "5-10 AÑOS", color: "#17A2B8" }, // Cian
    7: { text: "MAS DE 10 AÑOS", color: "#343A40" }, // Gris oscuro
  };



  const cre_tipovivienda = {
    0: { text: "SIN REGISTRO", color: "#6C757D" }, // Gris
    1: { text: "ARRENDADA", color: "#28A745" }, // Verde
    2: { text: "VIVE CON FAMILIARES", color: "#FFA500" }, // Naranja
    3: { text: "PROPIA NO HIPOTECADA", color: "#007BFF" }, // Azul
    4: { text: "PROPIA HIPOTECADA", color: "#DC3545" }, // Rojo
    5: { text: "PRESTADA", color: "#6F42C1" }, // Morado
    6: { text: "ANTICRESIS", color: "#17A2B8" }, // Cian
  };


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
    // Llama a la función de navegación
    >
      <View style={styles.row}>
        <Icon name="user" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>{item.Nombres}</Text>
        {(item.iEstado !== null && item.iEstado == 0 ) && (
        <TouchableOpacity
          style={styles.iconContainerReasignar}
          onPress={() => onPress && onPress(true)}
          activeOpacity={0.7}
        >
          <Icon
            name="refresh"
            size={20}
            color="#fff"
            style={[styles.icon, { marginLeft: 8 }]}
          />
        </TouchableOpacity>
        
        )}
        {(item.iEstado !== null && item.iEstado == 0 ) && (
        <TouchableOpacity
          style={styles.iconContainerRespuestaRapida}
          onPress={() => onPressRapida && onPressRapida(true)}
          activeOpacity={0.7}
        >
          <Icon
            name="reply"
            size={20}
            color="#fff"
            style={[styles.icon, { marginLeft: 8 }]}
          />
        </TouchableOpacity>
        )}
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

      {(item.JefeInmediato || item.idCre_Tiempo) && (
        <Text style={[styles.text, { fontWeight: 'bold', textAlign: 'center', flex: 1 }]}>
          Laboral
        </Text>
      )}

      <View >
        {item.JefeInmediato && (
          <View style={styles.row} >
            <Icon name="user-secret" size={20} color="black" style={styles.icon} />
            <Text style={styles.text}>{item.JefeInmediato}</Text>
          </View>
        )}
        {item.CelularInmediato && (
          <View style={styles.row}>
            <Icon name="mobile" size={20} color="black" style={styles.icon} />
            <Text style={styles.text}>{item.CelularInmediato}</Text>
          </View>
        )}
      </View>

      <View >
        {item.idCre_Tiempo && (
          <View style={styles.row}>
            <Icon name="clock-o" size={20} color="black" style={styles.icon} />
            <Text style={styles.text}> {cre_tiempo[item.idCre_Tiempo]?.text}</Text>
          </View>
        )}
      </View>
      <View >
        {item.Afiliado != null && (
          <View style={styles.row}>
            <Icon name="shield" size={20} color="black" style={styles.icon} />
            <Text style={styles.text}>Afiliado</Text>
          </View>
        )}

      </View>

      {item.idTipoVivienda != null && (
        <Text style={[styles.text, { fontWeight: 'bold', textAlign: 'center', flex: 1 }]}>
          Domicilio
        </Text>
      )}
      <View >
        {item.idTipoVivienda != null && (
          <View style={styles.row}>
            <Icon name="home" size={20} color="black" style={styles.icon} />
            <Text style={styles.text}> {cre_tipovivienda[item.idTipoVivienda]?.text}</Text>
          </View>
        )}
        {item.idCre_TiempoVivienda != null && (
          <View style={styles.row}>
            <Icon name="clock-o" size={20} color="black" style={styles.icon} />
            <Text style={styles.text}> {cre_tiempo[item.idCre_TiempoVivienda]?.text}</Text>
          </View>
        )}

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


      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <PhotoViewer
          item={item}
          showPhoto={showPhoto}
          closePhotoModal={closePhotoModal}
        />
      </View>
    </View>
  );
}

