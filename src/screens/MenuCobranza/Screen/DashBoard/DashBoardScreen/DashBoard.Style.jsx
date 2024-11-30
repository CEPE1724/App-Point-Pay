import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
      },
      scrollViewContent: {
        paddingBottom: 80,
      },
      summaryContainer: {
        backgroundColor: "#ffffff",
        margin: 10,
        padding: 10,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      },
      summaryContainerPorc: {
        backgroundColor: "#ffffff",
        margin: 10,
        padding: 10,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#1c2463",
        textAlign: "left",
      },
      row: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 6,
        paddingVertical: 6,
        flex: 1,
        marginHorizontal: 4,
      },
      iconContainer: {
        backgroundColor: "#28a745",
        borderRadius: 5,
        padding: 8,
        marginRight: 10,
      },
      valueContainer: {
        flex: 1,
      },
      label: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#333",
      },
      summaryValue: {
        fontSize: 12,
        color: "#333",
      },
      insertButtonContainer: {
        margin: 16,
      },
      insertButton: {
        backgroundColor: "#1c2463",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
      },
      insertButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
      },
      fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        backgroundColor: "#de2317",
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
      },
      clickableCard: {
        borderColor: 'white',
        borderWidth: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
      },
      loadingContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo semi-transparente
      },
      containerCircle: {
        flexDirection: 'row', // Para colocar la barra y el círculo en una fila
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      containerCirclePorc: {
        flexDirection: 'row', // Para colocar la barra y el círculo en una fila
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      barContainer: {
        width: '80%', // Define el ancho de la barra
        height: 10,
        backgroundColor: '#ddd', // Fondo gris para la barra
        borderRadius: 5,
        marginRight: 5, // Espacio entre la barra y el círculo
        position: 'relative',
      },
      bar: {
        height: '100%',
        borderRadius: 5,
        position: 'relative', // Necesario para colocar el texto dentro de la barra
        justifyContent: 'center',
        alignItems: 'center',
      },
      barText: {
        position: 'absolute',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 8,
      },
      circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      circle: {
        width: 40,
        height: 40,
        borderRadius: 20, // Hace que el círculo sea redondo
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        backgroundColor: '#fff',
      },
      circleText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 10,
      },
    });