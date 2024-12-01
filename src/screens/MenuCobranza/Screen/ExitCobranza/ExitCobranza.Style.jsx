import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4', // Color de fondo más suave
      },
      circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4CAF50', // Fondo verde para el círculo
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      circleText: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
      },
      userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
      },
      userDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
      },
      buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
      },
      logoutButton: {
        marginBottom: 15,
        backgroundColor: '#4CAF50',
      },
      exitButton: {
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    
      // Estilos para el modal
      modal: {
        justifyContent: 'center', // Modal centrado en la pantalla
        margin: 0, // Sin márgenes para ocupar toda la pantalla
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        height: '80%', // El modal ocupa el 80% de la pantalla
      },
    
      // Primer View: Header (X)
      modalHeader: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: '100%',
        
      },
      modalCloseButton: {
        
        backgroundColor: 'transparent',
      },
    
      // Segundo View: Body (Mensaje)
      modalBody: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
      },
    
      // Tercer View: Footer (Botones)
      modalFooter: {
        flex: 3,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
      },
      modalConfirmButton: {
        backgroundColor: '#4CAF50',
      },
      modalCancelButton: {
        borderColor: '#F44336',
        borderWidth: 1,
      },
    });