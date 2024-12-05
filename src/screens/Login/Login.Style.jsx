import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  image: {
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: "#2066a4", // Color de fondo del botón
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    width: "48%", // Asegura que ambos botones tengan el mismo tamaño
    height: 120,
  },
  cardButtonText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row", // Alinea los botones horizontalmente
    justifyContent: "space-between", // Espacio entre los botones
    alignItems: "center",
    marginTop: 20,
    width: "100%", // Se asegura de que los botones ocupen todo el ancho disponible
  },
  version: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 20,
  },
});
