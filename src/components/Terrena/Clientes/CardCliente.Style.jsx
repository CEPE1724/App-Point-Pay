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
  rowDomicilio: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#FFFFFF",
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
    // Espacio para el ícono
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

  iconContainerReasignar: {
    backgroundColor: "#FFB300", // Un color naranja para resaltar la reasignación
    padding: 6,
    borderRadius: 8,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#FFA000", // Borde más oscuro para contraste
    shadowColor: "#FFA000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  
  iconContainerRespuestaRapida: {
    backgroundColor: "#d92327", // Un color naranja para resaltar la reasignación
    padding: 6,
    borderRadius: 8,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#FFA000", // Borde más oscuro para contraste
    shadowColor: "#FFA000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  iconReasignar: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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


  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },


  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  navigationButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  navigationButtonText: {
    color: 'white',
    fontSize: 18,
  },
  sectionTitle: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 13,
    color: '#37474F',
    marginTop: 8,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 3,
  },

  sectionContainer: {
    marginVertical: 5,
    paddingHorizontal: 4,
    paddingVertical: 6,
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },

  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#333",
  },

  iconLabel: {
    marginRight: 8,
    color: "#616161",
  },

});
