import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dcdcdc', // Gris claro para un toque sofisticado
    backgroundColor: '#fff', // Fondo blanco para mantener un aspecto limpio
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Mejorar la sombra en Android para dar profundidad
    overflow: 'hidden', // Asegura que los bordes redondeados se vean bien
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, // Más espaciado entre los elementos
  },
  rowProyect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  icon: {
    marginRight: 15, // Un espaciado amplio entre el icono y el texto
  },
  text: {
    fontSize: 16, // Tamaño de fuente ligeramente mayor para mejorar la legibilidad
    color: '#333', // Color oscuro para el texto principal
    fontFamily: 'Helvetica Neue', // Una tipografía moderna y clara
    flex: 1,
    lineHeight: 22, // Mejor espaciado entre las líneas
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold', // Negrita para los títulos
    color: '#1c1c1c', // Color más oscuro para un contraste limpio
    marginBottom: 12, // Espaciado debajo del título
  },
  textProyect: {
    fontSize: 16,
    fontWeight: '500', // Peso medio para el texto secundario
    color: '#666', // Color gris para información adicional
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600', // Resaltar los valores importantes
    color: '#e28743', // Color destacado para los valores importantes, como el crédito
  },
  pressedCard: {
    backgroundColor: '#f5f5f5', // Fondo suave cuando se presiona
    borderColor: '#ccc', // Bordes más suaves cuando está presionado
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#000', // Fondo negro para botones
    borderRadius: 30, // Bordes redondeados para el botón
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Texto blanco sobre el fondo oscuro
    fontSize: 16,
    fontWeight: 'bold', // Negrita para hacer que el texto resalte
  },
});
