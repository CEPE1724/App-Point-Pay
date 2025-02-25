import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Si usas Expo para los íconos

export function PhotoViewer({ item, showPhoto, closePhotoModal }) {
  const [urlArray, setUrlArray] = useState([]);

  useEffect(() => {
    // Si `item.UrlPhoto` es un string, lo convertimos en un array de URLs
    if (item.UrlPhoto) {
      try {
        // Verificamos si las URLs están en formato JSON (es decir, con corchetes [])
        if (item.UrlPhoto.startsWith('[') && item.UrlPhoto.endsWith(']')) {
          // Si es un string de JSON, lo parseamos
          const parsedUrls = JSON.parse(item.UrlPhoto);
          setUrlArray(parsedUrls);
        } else {
          // Si no es un JSON, lo tratamos como un string con URLs separadas por coma
          const parsedUrls = item.UrlPhoto.split(','); // Dividimos el string por las comas
          setUrlArray(parsedUrls);
        }
      } catch (error) {
        console.error('Error al parsear las URLs:', error);
        setUrlArray([]); // En caso de error, dejamos el array vacío
      }
    }
  }, [item.UrlPhoto]); // Usamos useEffect para asegurar que se parseen las URLs al recibir `item`


  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Archivo {index + 1}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(item)}>
          <Ionicons name="link" size={24} color="blue" /> 
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      visible={showPhoto}
      transparent={true}
      animationType="fade"
      onRequestClose={closePhotoModal}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
        

          <View style={styles.tableContainer}>
            <Text style={styles.tableTitle}>Lista de Archivos</Text> 
            {urlArray.length > 0 ? (
              <FlatList
                data={urlArray}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            ) : (
              <Text>No se encontraron enlaces disponibles</Text>
            )}
          </View>
            <TouchableOpacity onPress={closePhotoModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
  },
  tableContainer: {
    flex: 1,
    width: '100%',
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
  },
});
