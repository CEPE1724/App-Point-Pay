import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f8f9fa", // Fondo claro
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2, // Sombra en Android
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productInfo: {
    marginLeft: 10,
    flex: 1,
  },
  productCode: {
    fontSize: 14,
    color: "#6c757d",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  productSerial: {
    fontSize: 14,
    color: "#6c757d",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#28a745",
  },
  observationInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
    //textTransform: "uppercase",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7f0ff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  uploadButtonText: {
    marginLeft: 5,
    color: "#007bff",
  },
  containerImage: {
    marginTop: 10,
  },
  imageListImage: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 10,
    zIndex: 1, // Asegúrate de que esté en el frente
  },
});
