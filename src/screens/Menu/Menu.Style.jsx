
//backgroundColor: "#242c64",
import { StyleSheet } from 'react-native';
// Estilos
export const styles = StyleSheet.create({
    // Estilos
    container: {
      flex: 1,
      marginTop: 50,
      padding: 30,
      backgroundColor: '#f4f4f4',
      alignItems: 'center', // Centrar todo el contenido horizontalmente
    },
    title: {
      fontSize: 12,
      color: '#333',
      textAlign: 'center',
      marginBottom: 10,
      marginTop: 1,
    },
    image: {
      marginBottom: 20, // Espacio debajo de la imagen para separar las tarjetas
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Asegura que las tarjetas se ajusten automáticamente
      justifyContent: 'space-between', // Espacio entre las tarjetas
      width: '100%', // Asegura que las tarjetas ocupen todo el espacio disponible
    },
    card: {
      width: '48%', // Cada tarjeta ocupará el 48% del ancho de la pantalla (con un pequeño margen)
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5, // Sombra para Android
      alignItems: 'center', // Centrar los íconos y texto dentro de la tarjeta
      justifyContent: 'center', // Centrar el contenido dentro de la tarjeta
    },
    cardLoc: {
      width: '48%', // Cada tarjeta ocupará el 48% del ancho de la pantalla (con un pequeño margen)
      padding: 20,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      alignItems: 'center', // Centrar los íconos y texto dentro de la tarjeta
      justifyContent: 'center', // Centrar el contenido dentro de la tarjeta
    },
    cardTitleLoc: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#2066a4',
      marginTop: 5, // Espacio entre el ícono y el título
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 10, // Espacio entre el ícono y el título
    },
    cardContainerLoc: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Asegura que las tarjetas se ajusten automáticamente
      justifyContent: 'space-between', // Espacio entre las tarjetas
      width: '100%', // Asegura que las tarjetas ocupen todo el espacio disponible
    },
  });
  