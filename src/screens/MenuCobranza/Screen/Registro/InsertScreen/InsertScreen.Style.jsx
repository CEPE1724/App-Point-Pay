import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  detailsContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#ff5a5f',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  rowPro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valuePro: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 6,
  },
  valueProAmo: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 6,
  },

  rowProyect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 8,
  },
  textProyect: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
 
  pickerContainer: {
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    
  },
  pickerLabel: {
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Espacio entre los elementos
    marginVertical: 5, // Espacio general
  },
  input: {
    flex: 1, // Para que el input ocupe todo el espacio disponible
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10, // Espacio entre el input y el calendario
    fontSize: 16,
    color: '#333',
    backgroundColor: '#ffffff',
  },
  datePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#ffffff',
    flexGrow: 0, // Evita que crezca más allá de su contenido
  },
  datePickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  
  closeButton: {
    backgroundColor: '#ff5a5f',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 5, // Espacio entre ícono y texto
  },
  acceptButton: {
    backgroundColor: '#28a745', // Verde
  },
  
  cancelButton: {
    backgroundColor: '#dc3545', // Rojo
  },
  textArea: {
    height: 100, // Altura del área de texto
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#ffffff', // Fondo blanco
    marginBottom: 20, // Espacio debajo del área de texto
    textTransform: "uppercase",
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 8,
    backgroundColor: '#e7f1ff', // Fondo claro para el botón
    marginTop: 10,
    justifyContent: 'center',
  },
  
  uploadButtonText: {
    color: '#007bff',
    marginLeft: 5,
  },
  
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  containerImage: {
    paddingBottom: 5,
    padding: 5,
    backgroundColor: '#f5f5f5',
  },
  imageListImage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageImage: {
    width: '100%',  // Cambiado para que ocupe el 100% del View
    height: '100%',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row", // Esto hará que los botones se alineen horizontalmente
    justifyContent: "space-between", // Esto separa los botones a los extremos del contenedor
    alignItems: "center", // Centra los botones verticalmente en el contenedor
    marginVertical: 20, // Margen vertical entre los botones y otros componentes
    paddingHorizontal: 20, // Relleno horizontal para que no toquen los bordes
  },
});
