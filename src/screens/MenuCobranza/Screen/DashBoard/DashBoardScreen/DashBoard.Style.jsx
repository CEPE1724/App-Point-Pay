import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  scrollViewContent: {
    padding: 15,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    color: '#949494',

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryContainer: {
    marginBottom: 15,
    flex: 1,
  },
  card: {
    // Eliminar padding para que no haya espacios internos
    borderRadius: 18,
    backgroundColor : '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginBottom: 1,
    flex: 1, // Asegura que los recuadros ocupen un espacio igual
    marginHorizontal: 4, // Espacio entre recuadros
    margin: 10,
    padding: 10,
    shadowOpacity: 0.2,
    elevation : 15,

  },
  iconContainer: {
    backgroundColor: "#1c2463",
    borderRadius: 50,
    padding: 10,
    marginRight: 10,   // Espacio entre el ícono y el texto
    
  },
  iconContainerInfo: {
    backgroundColor: '#b4b4b4',
    borderRadius: 50,
    padding: 5, // Menor padding para hacerlo más pequeño
    marginTop: 10, // Añade un pequeño margen para separar el icono de la parte superior
    alignSelf: 'flex-end', // Alinea el ícono a la derecha
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea el texto de valor en el centro
  },
  valueContainerInfo: {
    backgroundColor: '#4c8bf5',
    padding: 10,
    marginTop: 10,
    alignItems: 'flex-end',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: 'bold',
  },


  // Añadir un contenedor para asegurar que cada tarjeta tenga espacio adecuado
  halfContainer: {
    flex: 1,
    marginHorizontal: 5, // Margen entre los recuadros
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Ajustar para los contenedores de cada recuadro
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

  // Botón flotante
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

  // Contenedores para barra de progreso
  containerCircle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  containerCirclePorc: {
    flexDirection: 'row',
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
    position: 'relative',
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
  cardContent: {
    flexDirection: 'row', // Para alinearlo en fila horizontal
  justifyContent: 'space-between', // Alinea los elementos horizontalmente
  alignItems: 'center', // Alinea verticalmente los elementos en el centro
  flex: 1, // Ocupa todo el espacio disponible
  },
});
