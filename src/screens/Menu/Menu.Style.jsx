// Menu.Style.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 30,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 1,
  },
  cardTitleLoc: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2066a4',
    marginTop: 5, // Espacio entre el ícono y el título
  },
  image: {
    width: 100,
    height: 70,
    marginBottom: 10,
    alignSelf: 'flex-start',

  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  errorMessage: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  errorContainer: {
    backgroundColor: '#242c64',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainerLoc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: 10,
    justifyContent: 'space-around',
    width: '100%',
  },
  notification: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'green',
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notificationCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  notificationText: {
    fontSize: 14,
    color: '#063970',
    marginLeft: 10,
  },
  carousel: {
    marginTop: 10,
    maxHeight: 140, // Limita la altura del carrusel
    width: '100%',
    paddingVertical: 10, // Añade algo de espacio vertical
     backgroundColor: '#063970', // Color de fondo para distinguir el carrusel
     borderRadius: 10, // Bordes redondeados para el carrusel
     paddingHorizontal: 10, // Espacio horizontal dentro del carrusel
     paddingVertical: 20, // Espacio vertical dentro del carrusel
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 4,

   
  },
  carouselItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10, // Reducido a la mitad
    marginHorizontal: 5,
    marginRight: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    height: 100, // Agrega esto para controlar la altura (ajústalo según tu diseño)
    width: 180, // Ancho fijo para cada item del carrusel
  },


  carouselItemText: {
    fontSize: 14,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
