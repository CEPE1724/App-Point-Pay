import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  radioButtonContainer: {
    marginVertical: 0, // Eliminamos el margen vertical para evitar espacio extra
    paddingHorizontal: 5, // Reducido de 10 a 5
  },

  radioButtonGroup: {
    flexDirection: "row",
    justifyContent: "flex-start", // Alineamos a la izquierda
    marginTop: 0, // Eliminamos cualquier margen superior adicional
  },
  radioButtonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10, // Controlamos el espacio entre opciones
    marginTop: 0, // Eliminamos el margen superior
  },
  radioButtonText: {
    fontSize: 12,
    marginLeft: 5, // Ajustamos el margen izquierdo para no estar demasiado cerca del icono
  },
  icon: {
    marginLeft: 5, // Añadido un poco de margen para separación
  },
});
