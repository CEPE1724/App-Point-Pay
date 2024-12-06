import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';

const MapaCustomGoogle = ({ visible, onClose, onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const initialRegion = {
    latitude: -1.831239,
    longitude: -78.183405,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  const fetchCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso de ubicación', 'Se requiere acceso a tu ubicación para mostrar el mapa.');
        return;
      }

      setLoading(true); // Start loading
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });

      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      setSelectedLocation({
        latitude,
        longitude,
        address: formatAddress(address),
      });

      setMapRegion(newRegion);
    } catch (error) {
      console.error('Error al obtener la ubicación actual:', error);
      Alert.alert('Error', 'No se pudo obtener la ubicación actual.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleMapPress = async (event) => {
    try {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });

      setSelectedLocation({
        latitude,
        longitude,
        address: formatAddress(address),
      });

      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      setMapRegion(newRegion);
    } catch (error) {
      console.error('Error al seleccionar la ubicación:', error);
      Alert.alert('Error', 'No se pudo seleccionar la ubicación.');
    }
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

  useEffect(() => {
    if (selectedLocation) {
      const newRegion = {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      setMapRegion(newRegion);
    }
  }, [selectedLocation]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {loading ? ( // Show loading indicator while fetching location
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={mapRegion || initialRegion}
               // onPress={handleMapPress} esta opción se deshabilita para que no se pueda seleccionar la ubicación
              >
                {selectedLocation && (
                  <Marker
                    coordinate={{
                      latitude: selectedLocation.latitude,
                      longitude: selectedLocation.longitude,
                    }}
                    title="Ubicación seleccionada"
                    description={selectedLocation.address}
                  />
                )}
              </MapView>
              <TouchableOpacity onPress={fetchCurrentLocation} style={styles.locationButton}>
                <Icon name="my-location" size={30} color="white" />
              </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
    marginBottom: 10,
    borderRadius: 10,
  },
  locationButton: {
    position: 'absolute',
    bottom: 150,
    right: 30,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    padding: 10,
    zIndex: 999,
  },
  locationDetails: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
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

export default MapaCustomGoogle;
