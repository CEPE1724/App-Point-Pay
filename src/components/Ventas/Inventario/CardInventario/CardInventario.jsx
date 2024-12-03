import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User, FileText, CreditCard, Box } from '../../../../Icons'; // Asegúrate de que los iconos sean correctos
import { styles } from './CardInventario.Style'; // Asegúrate de importar los estilos correctamente

export function CardInventario({
  item,
  index,
  onPress,
  onPressIn,
  onPressOut,
  pressedCardIndex,
}) {
  const getColorForValue = (credito, cuotas) => {
    if (credito > cuotas) {
      return "#e28743"; // Si el crédito es mayor que las cuotas, color naranja
    }
    if (credito === cuotas) {
      return "green"; // Si el crédito es igual a las cuotas, color verde
    }
    return "#a91519"; // Si el crédito es menor que las cuotas, color rojo
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: pressedCardIndex === index ? "#e0e0e0" : "#fff", // Cambia el fondo al presionar
          borderColor: pressedCardIndex === index ? "#ccc" : "#ddd", // Cambia el borde al presionar
        },
      ]}
      onPress={() => onPress(item, index)}
      onPressIn={() => onPressIn(index)} // Establecer índice cuando se presiona
      onPressOut={() => onPressOut()} // Resetear el índice cuando se suelta el toque
    >
      {/* Artículo */}
      <View style={styles.row}>
        <Text style={styles.title}>{item.Articulo}</Text>
      </View>

      {/* Código */}
      <View style={styles.row}>
        <FileText size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Código: {item.Codigo}</Text>
      </View>

      {/* Tarjeta */}
      <View style={styles.row}>
        <CreditCard size={20} color="black" style={styles.icon} />
        <Text style={styles.text}>Tarjeta: ${item.Tarjeta.toFixed(2)}</Text>
      </View>

      {/* Crédito */}
      <View style={styles.row}>
        <Text style={styles.text}>Crédito: ${item.Credito.toFixed(2)}</Text>
      </View>

      {/* Valor de la cuota */}
      <View style={styles.row}>
        <Text style={styles.text}>Valor Cuota: ${item.ValorCuota.toFixed(2)}</Text>
      </View>

      {/* Cuotas */}
      <View style={styles.row}>
        <Text style={styles.text}>Cuotas: {item.Cuotas}</Text>
      </View>

      {/* Stock */}
      <View style={styles.rowProyect}>
        <Text style={styles.textProyect}>Stock: {item.Stock}</Text>
      </View>

      {/* Color de crédito según la relación con la cuota */}
      <View style={styles.rowProyect}>
        <Text
          style={[
            styles.textProyect,
            {
              color: getColorForValue(item.Credito, item.ValorCuota),
            },
          ]}
        >
          Crédito: ${item.Credito.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
