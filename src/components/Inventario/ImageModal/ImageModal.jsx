import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity, Text, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { styles } from './ImageModal.Style'; // Asegúrate de tener el archivo de estilos disponible
import axios from 'axios'; // Asegúrate de tener axios instalado
import { APIURL } from "../../../config/apiconfig";

export function ImageModal({ isVisible, selectedItem, onClose, stock }) {
  if (!selectedItem || !selectedItem.Codigo) {
    return null;
  }

  const [selectedImage, setSelectedImage] = useState(`${selectedItem.Codigo}.jpg`);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bodegas, setBodegas] = useState([]); // Para almacenar los datos de la API
  const [loadingBodegas, setLoadingBodegas] = useState(false); // Para el indicador de carga de bodegas
  const [showBodegas, setShowBodegas] = useState(false); // Controla si mostrar el listado de bodegas

  // Función para cambiar la imagen seleccionada
  const handleThumbnailPress = (image) => {
    setSelectedImage(image);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const getImageUrl = (image) => {
    return `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${encodeURIComponent(image)}`;
  };

  // Función que se ejecuta cuando se presiona el botón "Visualizar"
  const handleShowBodegas = async () => {
    setLoadingBodegas(true); // Mostramos el indicador de carga
    try {
      const response = await axios.get(APIURL.getViewListadoProductosDet(), {
        params: {
          idArticulo: selectedItem.idArticulo // Enviamos el código del artículo
        },
      });
      setBodegas(response.data.data); // Guardamos los datos de bodegas
      setShowBodegas(true); // Mostramos el listado de bodegas
    } catch (error) {
      console.error('Error fetching bodegas:', error);
    } finally {
      setLoadingBodegas(false); // Ocultamos el indicador de carga
    }
  };

  // Función para cerrar el listado de bodegas
  const closeBodegas = () => {
    setShowBodegas(false);
  };

  // Renderizamos la imagen principal
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

  // Renderizamos el listado de bodegas
  const renderBodegas = () => {
    if (loadingBodegas) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
      <FlatList
        data={bodegas}
        keyExtractor={(item) => item.bodega.toString()}
        renderItem={({ item }) => (
          <View style={styles.bodegaItem}>
            <Text style={styles.bodegaText}>Bodega: {item.nombre}</Text>
            <Text style={styles.bodegaText}>Stock: {item.Stock}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }} 
      />
    );
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="slide">
      <View style={styles.modalContainer}>
        {/* Botón para cerrar modal */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>

        {/* Mostrar detalles o listado de bodegas */}
        {!showBodegas ? (
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              renderImage()
            )}

            <ScrollView horizontal contentContainerStyle={styles.thumbnailContainer}>
              {[`${selectedItem.Codigo}.jpg`, `${selectedItem.Codigo}_2.jpg`, `${selectedItem.Codigo}_3.jpg`, `${selectedItem.Codigo}_4.jpg`, `${selectedItem.Codigo}_5.jpg`].map((image, index) => (
                <TouchableOpacity key={index} onPress={() => handleThumbnailPress(image)}>
                  <Image source={{ uri: getImageUrl(image) }} style={styles.thumbnailImage} onError={handleImageError} />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.cardContainer}>
              <Text style={styles.productTitle}>{selectedItem.Articulo}</Text>
              <View style={styles.cardContent}>
                <Text style={styles.productCode}>Código: {selectedItem.Codigo}</Text>
                <Text style={styles.productCode}>Credito: ${selectedItem.Credito.toFixed(2)}</Text>
                <Text style={styles.productInstallments}>Cuotas: {selectedItem.Cuotas}</Text>

                <View style={styles.stockrows}>
                  <Text style={styles.productStock}>Stock: {selectedItem.Stock}</Text>
                  {stock === 0 && (
                    <TouchableOpacity style={styles.showButton} onPress={handleShowBodegas}>
                      <Text style={styles.showButtonText}>Visualizar</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.productStock}>Tarjeta: {selectedItem.Tarjeta}</Text>
                <Text style={styles.productPrice}>Valor Cuota: ${selectedItem.ValorCuota.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.bodegaContainer}>
            {/* Botón para cerrar el listado de bodegas */}
            <TouchableOpacity onPress={closeBodegas} style={styles.closeBodegasButton}>
              <Text style={styles.closeBodegasText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.bodegaTitle}>Bodegas disponibles</Text>
            {renderBodegas()}
          </View>
        )}
      </View>
    </Modal>
  );
}
