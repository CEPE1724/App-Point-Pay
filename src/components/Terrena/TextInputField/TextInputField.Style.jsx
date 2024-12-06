import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8, // Reducido para tener menos espacio general
    backgroundColor: "#f8f9fa",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1c2463",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
    padding: 10, // Reducido para compactar el contenido
    marginBottom: 8, // Margen inferior mínimo
  },
  detailsContainer: {
    width: "100%",
    padding: 4, // Ajustado para menos espacio
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginLeft: 4, // Mínimo margen para proximidad
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1, // Muy poco espacio entre filas
  },
  rowOption: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 1, // Mínimo espacio vertical
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: "#1c2463",
    borderRadius: 4,
    padding: 4, // Compacto
  },
  radioButtonLabel: {
    marginLeft: 4, // Muy poco margen
    fontSize: 12,
  },
  viviendaContainer: {
    marginVertical: 4, // Mínimo margen vertical
  },
  viviendaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2, // Muy poco margen inferior
  },
  latitudLabel: {
    fontSize: 50,
    fontWeight: '600',
    color: 'red',
    marginBottom: 2, // Muy poco margen inferior
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 6, // Compacto
    backgroundColor: "#fff",
    textTransform: "uppercase",

  },
  submitButton: {
    backgroundColor: "#228b22",
    padding: 10, // Compacto
    borderRadius: 4,
    alignItems: "center",
    marginTop: 8, // Mínimo espacio superior
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
