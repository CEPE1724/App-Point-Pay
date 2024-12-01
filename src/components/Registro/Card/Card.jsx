// Card.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './Card.Style'; // Asegúrate de importar correctamente los estilos
import { User, DriversLicenseO, FileText } from '../../../Icons';
export function Card  ({ item, index, onPress, onPressIn, onPressOut, pressedCardIndex })  {
  const getColorForValue = (projected, collected) => {
    if (collected < projected && collected > 0) {
      return "#e28743"; // Color for collected > 0 and less than projected
    }
    if (collected >= projected) {
      return "green"; // Color for collected greater than or equal to projected
    }
    return "#a91519"; // Color for collected less than 0
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: pressedCardIndex === index ? "#e0e0e0" : "#fff", // Change color when pressed
          borderColor: pressedCardIndex === index ? "#ccc" : "#ddd", // Optional: Change border color when pressed
        },
      ]}
      onPress={() => onPress(item, index)}
      onPressIn={() => onPressIn(index)} // Set index on press
      onPressOut={() => onPressOut()} // Reset index when press ends
    >
      <View style={styles.row}>
        <User size={18} color="black" style={styles.icon} />
        <Text style={styles.text}> {item.Cliente}</Text>
      </View>
      <View style={styles.row}>
        <DriversLicenseO size={18} color="black" style={styles.icon} />
        <Text style={styles.text}> {item.Cedula}</Text>
      </View>
      <View style={styles.row}>
        <FileText size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>{item.Numero_Documento}</Text>
      </View>
      <View style={styles.rowProyect}>
        <Text style={styles.textProyect}>
          ${item.Valor_Cobrar_Proyectado.toFixed(2)}
        </Text>
        <Text
          style={[
            styles.textProyect,
            {
              color: getColorForValue(
                item.Valor_Cobrar_Proyectado,
                item.Valor_Cobrado
              ),
            },
          ]}
        >
          ${item.Valor_Cobrado.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
