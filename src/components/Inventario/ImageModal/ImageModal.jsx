import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './ImageModal.Style'; // Asegúrate de tener el archivo de estilos disponible

export function ImageModal({ isVisible, selectedItem, onClose }) {
  // Verificamos que selectedItem no sea nulo o indefinido antes de intentar acceder a sus propiedades
  if (!selectedItem || !selectedItem.Codigo) {
    return null; // No renderizamos el modal si no hay un artículo válido
  }

  const [selectedImage, setSelectedImage] = useState(`${selectedItem.Codigo}.jpg`); // Imagen seleccionada
  const [imageError, setImageError] = useState(false); // Detectar si la imagen tiene un error al cargar
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  // Función para cambiar la imagen seleccionada
  const handleThumbnailPress = (image) => {
    setSelectedImage(image);
    setImageError(false); // Reseteamos el error cuando cambiamos la imagen
  };

  // Función para manejar el error de la carga de imagen
  const handleImageError = () => {
    setImageError(true); // Si ocurre un error, marcamos la imagen como errónea
  };

  // Función para manejar la carga de la imagen
  const handleImageLoad = () => {
    setIsLoading(false); // La imagen se ha cargado correctamente
  };

  // Generamos la URL de la imagen
  const getImageUrl = (image) => {
    return `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${encodeURIComponent(image)}`;
  };

  console.log(selectedItem);
  // Mostrar una imagen por defecto si ocurre un error
  const renderImage = () => {
   
    return (
      <Image
        source={{ uri: getImageUrl(selectedImage) }}
        style={styles.fullScreenImage}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    );
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="slide" >
        
      <View style={styles.modalContainer}>
        {/* Botón de cerrar sobre todo */}
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>

        {/* Cargar imagen con un indicador de carga */}
       
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderImage()
        )}

        {/* Miniaturas de las imágenes */}

        <ScrollView horizontal contentContainerStyle={styles.thumbnailContainer}>
          {[`${selectedItem.Codigo}.jpg`,
            `${selectedItem.Codigo}_2.jpg`,
            `${selectedItem.Codigo}_3.jpg`,
            `${selectedItem.Codigo}_4.jpg`,
            `${selectedItem.Codigo}_5.jpg`,].map((image, index) => (
            <TouchableOpacity key={index} onPress={() => handleThumbnailPress(image)}>
              <Image
                source={{ uri: getImageUrl(image) }}
                style={styles.thumbnailImage}
                onError={handleImageError} // Manejar el error de carga
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.cardContainer}>
          <Text style={styles.productTitle}>{selectedItem.Articulo}</Text>
          <View style={styles.cardContent}>
            <Text style={styles.productCode}>Código: {selectedItem.Codigo}</Text>
            <Text style={styles.productCode}>Credito: ${selectedItem.Credito.toFixed(2)}</Text>
            <Text style={styles.productInstallments}>Cuotas: {selectedItem.Cuotas}</Text>
            <Text style={styles.productStock}>Stock: {selectedItem.Stock}</Text>
            <Text style={styles.productStock}>Tarjeta: {selectedItem.Tarjeta}</Text>
            <Text style={styles.productPrice}>Valor Cuota: ${selectedItem.ValorCuota.toFixed(2)}</Text>
          </View>
        </View>
    </Modal>
  );
}
