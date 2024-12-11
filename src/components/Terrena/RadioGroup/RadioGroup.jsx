import React from "react";
import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./RadioGroup.Style"; // Asegúrate de que la ruta sea correcta

export function RadioGroup({ label, options, value, onChange }) {
  return (
    <View style={styles.rowOption}>
      <View style={styles.borderContainer}>
        <Text style={styles.radioButtonLabel}>{label}</Text>
        <RadioButton.Group onValueChange={onChange} value={value}>
          <View style={styles.rowOption}>
            {options.map((option) => (
              <View key={option.value} style={styles.rowOption}>
                <RadioButton value={option.value} />
                <Icon
                  name={option.icon}
                  size={15}
                  color="#228b22"
                  style={styles.icon}
                />
                <Text style={styles.radioButtonLabel}>{option.label}</Text>
              </View>
            ))}
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
}
