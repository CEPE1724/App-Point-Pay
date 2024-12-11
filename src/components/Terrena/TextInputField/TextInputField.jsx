import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from "./TextInputField.Style"; // Asegúrate de que la ruta sea correcta

export function TextInputField({
  label,
  placeholder,
  value,
  onChange,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  editable = true, // Add editable prop with default value
  pointerEvents = "auto", // Add pointerEvents prop with default value
}) {
  return (
    <View style={styles.viviendaContainer}>
      <Text style={styles.viviendaLabel}>{label}:</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? "top" : "center"}
        editable={editable} // Pass the editable prop here
        pointerEvents={pointerEvents} // Pass the pointerEvents prop here
        autoCapitalize="characters"
      />
    </View>
  );
};
