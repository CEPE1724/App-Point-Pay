import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro con opacidad
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 10, // Sombra más prominente
    maxHeight: '80%', // Evita que el modal ocupe toda la pantalla
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333', // Color oscuro para el título
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd', // Borde más suave para separar las filas
    paddingVertical: 5, // Espaciado entre las filas
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 8,
    borderWidth: 1,
    borderColor: '#ddd', // Color de los bordes de las celdas
    backgroundColor: '#f9f9f9', // Color de fondo suave para las celdas
    height: 40, // Asegura una altura consistente
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1', // Fondo para el encabezado
    borderBottomWidth: 2,
    borderBottomColor: '#ccc', // Borde más grueso para separar el encabezado
    paddingVertical: 10,
  },
  tableHeaderCell: {
    textAlign: 'center',
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: '#f1f1f1', // Fondo para el encabezado
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    color: '#333', // Color de texto para el encabezado
  },
});
