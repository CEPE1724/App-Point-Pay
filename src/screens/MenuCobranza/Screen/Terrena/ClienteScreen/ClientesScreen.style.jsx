import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  grid: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // Ajusta el ancho para que quepan dos elementos por fila
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
    flex: 1,
    fontSize: 12, // Aumentar el tamaño de fuente para mejor legibilidad
    marginBottom: 5,
  },
  textProyect: {
    flex: 1,
    fontSize: 12,
    marginBottom: 5,
    color: "#a91519",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 1,
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
    borderRadius: 4,
  },
  containersearch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
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
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    marginBottom: 20,
  },
  circleBorder: {
    borderWidth: 10,
    borderRadius: 60,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  totalCircle: {
    borderWidth: 3,
    borderColor: "#000", // Color del borde del total
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center", // Centrar el total
  },
  circleText: {
    color: "#000",
    fontWeight: "bold",
  },
  circleTextSubtitle: {
    color: "#000",
    fontSize: 6,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});

