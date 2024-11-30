
        //backgroundColor: "#242c64",
        import { StyleSheet } from 'react-native';

        export const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: "#ffffff",
              },
              scrollViewContent: {
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              },
              image: {
                marginBottom: 10,
              },
              inputContainer: {
                width: "100%",
                alignItems: "flex-end",
                marginBottom: 10,
              },
              subtitle: {
                fontSize: 16,
                marginBottom: 8,
                color: "#fff",
                textAlign: "left",
                width: "100%",
              },
              input: {
                height: 50,
                width: "100%",
                borderColor: "#ddd",
                borderWidth: 1,
                paddingHorizontal: 15,
                borderRadius: 10,
                backgroundColor: "#fff",
                fontSize: 16,
                textTransform: "uppercase",
              },
              button: {
                width: "100%",
                backgroundColor: "#a91519",
                paddingVertical: 15,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 20,
              },
              buttonText: {
                color: "#fff",
                fontSize: 18,
                fontWeight: "bold",
              },
              passwordContainer: {
                width: "100%",
                alignItems: "flex-end",
                marginBottom: 20,
              },
              passwordInputContainer: {
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              },
              eyeIcon: {
                position: "absolute",
                right: 15,
                top: 15,
              },
              version: {
                color: "#242c64",
                marginTop: 5,
                fontSize: 10,
              },
              datePickerText: {
                fontSize: 16,
                marginLeft: 10,
                color: "#fff",
              },
              icon: {
                marginRight: 10,
              },
              imageContainer: {
                flexDirection: "column", // Asegura que los elementos estén en columna (apilados verticalmente)
                alignItems: "center",    // Centra los elementos en el eje horizontal
                justifyContent: "flex-start", // Cambia de "center" a "flex-start" para evitar el exceso de espacio en la parte superior
                marginBottom: 0,         // Elimina cualquier margen adicional debajo del contenedor
                padding: 0,              // Elimina cualquier relleno adicional que pueda estar generando espacio innecesario
              // El fondo rojo es solo para pruebas, puedes cambiarlo a cualquier color o quitarlo
              },
              
              image: {
                marginBottom: 5, // Margen inferior general de las imágenes (puedes ajustar esto según sea necesario)
                
              },
            });   