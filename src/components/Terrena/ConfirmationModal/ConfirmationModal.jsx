import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Puedes cambiar el tipo de icono según tus preferencias

export function ConfirmationModal({ visible, onClose, onConfirm }) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Confirmación</Text>
          <Text style={styles.message}>¿Deseas guardar los datos?</Text>
          <Text style={styles.message}>Una vez guardados no se podrá modificar</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Icon name="times" size={20} color="#fff" />
              <Text style={styles.buttonText}> No </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSave} onPress={onConfirm}>
              <Icon name="check" size={20} color="#fff" />
              <Text style={styles.buttonText}> Sí </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    width: '85%',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    elevation: 3,
    flexDirection: 'row', // Agregado para alinear icono y texto
    justifyContent: 'center', // Centrar el contenido
  },
  buttonSave: {
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    backgroundColor: 'green',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    elevation: 3,
    flexDirection: 'row', // Agregado para alinear icono y texto
    justifyContent: 'center', // Centrar el contenido
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8, // Espaciado entre icono y texto
  },
});
