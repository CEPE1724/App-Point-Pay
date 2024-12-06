import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

export function MapaCustomModal  ({ visible, onClose, onLocationSelect })  {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState('');

  const fetchCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso de ubicación', 'Se requiere acceso a tu ubicación para mostrar el mapa.');
        return;
      }

      setLoading(true);
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });

      setSelectedLocation({
        latitude,
        longitude,
        address: formatAddress(address),
      });

      createMap(latitude, longitude);
    } catch (error) {
      console.error('Error al obtener la ubicación actual:', error);
      Alert.alert('Error', 'No se pudo obtener la ubicación actual.');
    } finally {
      setLoading(false);
    }
  };

  const createMap = (latitude, longitude) => {
    const mapHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Leaflet Map</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
          <style>
            body { margin: 0; padding: 0; }
            #map { width: 100%; height: 100vh; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
          <script>
            const map = L.map('map').setView([${latitude}, ${longitude}], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '© OpenStreetMap'
            }).addTo(map);
            const marker = L.marker([${latitude}, ${longitude}]).addTo(map)
              .bindPopup('Ubicación actual')
              .openPopup();

            // Deshabilitar la interacción en el mapa
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
          </script>
        </body>
      </html>
    `;
    setHtmlContent(mapHtml);
  };

  const formatAddress = (addressComponents) => {
    const { name, street, city, region, country } = addressComponents[0];
    return `${name} ${street}, ${city}, ${region}, ${country}`;
  };

  const handleLocationSelect = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      onClose();
    }
  };

  useEffect(() => {
    if (visible) {
      fetchCurrentLocation();
    }
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={styles.map}
                javaScriptEnabled={true}
                domStorageEnabled={true}
              />
              {selectedLocation && (
                <View style={styles.locationDetails}>
                  <Text>Latitud: {selectedLocation.latitude}</Text>
                  <Text>Longitud: {selectedLocation.longitude}</Text>
                  <Text>Dirección: {selectedLocation.address}</Text>
                </View>
              )}
              <TouchableOpacity onPress={handleLocationSelect} style={styles.selectButton}>
                <Text style={styles.selectButtonText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>x</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    height: '80%',
  },
  map: {
    width: '100%',
    height: '80%',
    marginBottom: 10,
    borderRadius: 10,
  },
  locationDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectButton: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 1,
    right: 2,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapaCustomModal;
