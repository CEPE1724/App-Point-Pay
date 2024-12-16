import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F2F2F2",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 10 },
        elevation: 5,
        marginBottom: 20,
        borderWidth: 0.5,
        borderColor: "#e0e0e0",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textContainer: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 12,
    },
    itemCode: {
        fontSize: 14,
        color: "#777",
        marginBottom: 8,
    },
    itemDates: {
        fontSize: 14,
        color: "#555",
        marginBottom: 8,
    },
    itemPromo: {
        fontSize: 14,
        color: "#FF6F61",
        fontWeight: "bold",
        marginBottom: 16,
    },
    impuestoText: {
        fontSize: 20,             // Aumenta el tamaño de la fuente para hacerla más prominente
        color: "#28A745",         // Verde vibrante (puedes usar otros tonos de verde si prefieres)
        fontWeight: "bold",       // Negrita para resaltar el texto
        marginBottom: 16,         // Mantén el margen inferior
        textShadowColor: "#333",  // Color de sombra (oscuro) para que resalte más sobre fondos claros
        textShadowOffset: { width: 1, height: 1 },  // Desplazamiento ligero para crear la sombra
        textShadowRadius: 3,      // Suaviza la sombra
    }
    
    ,
    image: {
        width: 100,
        height: 150,
        borderRadius: 8,
        marginLeft: 10,
        borderColor: "red",
        borderWidth: 1,
        resizeMode: "contain",  // Esto asegura que la imagen se ajuste dentro del cuadro sin deformarse
    },
    
    paymentMethods: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 16,
    },
    paymentMethodItem: {
        padding: 10,
        backgroundColor: "#FF6F61",
        borderRadius: 5,
    },
    paymentMethodText: {
        color: "#fff",
        fontWeight: "bold",
    },
    table: {
        marginTop: 20,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 8,
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    evenRow: {
        backgroundColor: "#f7f7f7",
    },
    oddRow: {
        backgroundColor: "#ffffff",
    },
    tableHeader: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FF6F61",
        flex: 1,
        textAlign: "center",
        borderRightWidth: 1,
        borderRightColor: "#e0e0e0",
    },
    tableHeaderCode: {
        borderLeftWidth: 1,
        borderLeftColor: "#e0e0e0",
    },
    tableCell: {
        fontSize: 12,
        color: "#333",
        textAlign: "left",
        flex: 1,
    },
    tableCellData: {
        fontSize: 10,
        color: "#333",
        textAlign: "center",
        flex: 1,
    },
});
