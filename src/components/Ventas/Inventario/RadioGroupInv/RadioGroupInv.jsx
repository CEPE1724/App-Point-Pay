import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./RadioGroupInv.Style"; // Asegúrate de que la ruta sea correcta

export function RadioGroupInv({ label, options, value, onChange }) {
  return (
    <View style={styles.radioButtonContainer}>
      <View style={styles.radioButtonGroup}>
        {/* Iteramos sobre las opciones */}
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.radioButtonItem}
            onPress={() => onChange(option.value)} // Cambiar valor con base en opción seleccionada
          >
            <RadioButton
              value={option.value}
              status={value === option.value ? "checked" : "unchecked"}
              onPress={() => onChange(option.value)}
            />
            {option.icon && (
              <Icon
                name={option.icon}
                size={15}
                color="#228b22"
                style={styles.icon}
              />
            )}
            <Text style={styles.radioButtonText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
