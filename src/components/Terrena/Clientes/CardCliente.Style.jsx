import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "95%", // Adjust width to fit two items per row
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  rowProyect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#FFFFFF",
  },
  rowCash: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#FFFFFF",
  },
  text: {
    flex: 1, // This will make the text take up all available space
    fontSize: 12, // Increased font size for better readability
    marginBottom: 5,
  },
  textDate: {
    flex: 1, // This will make the text take up all available space
    fontSize: 10, // Increased font size for better readability
    marginBottom: 5,
  },
  textProyect: {
    flex: 1, // This will make the text take up all available space
    fontSize: 12, // Increased font size for better readability
    marginBottom: 5,
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 1, // Adjust this value to increase/decrease the space between text and icon
    marginRight: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    alignItems: "center",
    padding: 10,
  },
  loadingText: {
    marginTop: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    borderRadius: 30,
    padding: 15,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingIndicator: {
    marginVertical: 20,
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 4, // Añadido para bordes redondeados
  },

  containersearch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    color: "red",
  },
  inputContainersearch: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  inputsearch: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 40, // Espacio para el ícono
  },
  iconsearch: {
    position: "absolute",
    left: 10,
  },
  iconNoData: {
    textAlign: "center",
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: "#291CF5",
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  iconContainerView: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  iconContainerMaps: {
    backgroundColor: "#FA6F5C",
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  iconContainerFoto: {
    backgroundColor: "#7DABFA",
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro para el modal
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  map: {
    width: 300,
    height: 300,
    borderRadius: 10, // Bordes redondeados para el mapa
    elevation: 5, // Agregar sombra para darle un efecto de elevación
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",  // Fondo oscuro semitransparente
  },
  modalContainer: {
    width: "90%",
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 300, // Ajusta el tamaño según sea necesario
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#2563eb",
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
