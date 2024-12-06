import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./CardCliente.Style"; // Asegúrate de que la ruta de estilos sea correcta
export function CardCliente({
  item,
  index,
  onPress,
  pressedCardIndex,
  handleIconPress,
}) {
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
      </View>
      <View style={styles.row}>
        <Icon name="calendar" size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>
          {new Date(item.FechaSistema).toLocaleString(undefined, options)}
        </Text>
        <Text style={[styles.textProyect, { color: estado.color }]}>
          {estado.text}
        </Text>
      </View>
      {item.DireccionDomicilio && (<View style={styles.rowProyect}>
        <Text style={styles.textProyect}>{item.DireccionDomicilio}</Text>
      </View>
      )}
      <View style={styles.rowProyect}>
      {item.DireccionTrabajo && (
         <Text style={styles.textProyect}>{item.DireccionTrabajo}</Text>
      )}
        {item.bDomicilio && item.idTerrenaGestionDomicilio == 0 && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleIconPress(item, 1)} // Pressing home icon
          >
            <Icon name="home" size={30} color="white" />
          </TouchableOpacity>
        )}
        {item.bTrabajo && item.idTerrenaGestionTrabajo == 0 && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleIconPress(item, 2)} // Pressing work icon
          >
            <Icon name="car" size={30} color="white" />
          </TouchableOpacity>
        )}
        {item.idTerrenaGestionDomicilio > 0 && (
          <TouchableOpacity
            style={styles.iconContainerView}
            onPress={() => handleIconPress(item, 1)} // Pressing home icon
          >
            <Icon name="street-view" size={30} color="white" />
          </TouchableOpacity>
        )}
        {item.idTerrenaGestionTrabajo > 0 && (
          <TouchableOpacity
            style={styles.iconContainerView}
            onPress={() => handleIconPress(item, 2)} // Pressing work icon
          >
            <Icon name="address-book" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
