import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from '@env';
import { useFocusEffect } from '@react-navigation/native';

export function GoogleMaps({ route }) {
    // Accediendo a los parámetros pasados por navegación
    const { timestamp, coordinates } = route.params || {};
    // Estado de la ubicación de origen (usamos la ubicación del dispositivo)
    const [origin, setOrigin] = useState({
        latitude: 0, // Iniciamos con 0, se actualizará con la ubicación del dispositivo
        longitude: 0,
    });

    // Usamos las coordenadas pasadas como destino
    const [destination, setDestination] = useState({
        latitude: coordinates?.destination?.lat || 0, // Asegúrate de que los parámetros existan
        longitude: coordinates?.destination?.lng || 0,
    });

    // Estado de la región del mapa (para centrado)
    const [region, setRegion] = useState({
        latitude: (origin.latitude + destination.latitude) / 2,
        longitude: (origin.longitude + destination.longitude) / 2,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [mapKey, setMapKey] = useState(0);
    const [loading, setLoading] = useState(true);

    // Custom map style para un look minimalista
    const customMapStyle = [
        { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "off" }] },
        { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
        { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
        { "featureType": "transit", "stylers": [{ "visibility": "off" }] },
        { "featureType": "water", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }
    ];

    // Este hook asegura que el mapa se actualice cuando el origen y el destino cambien
    useFocusEffect(
        useCallback(() => {
            setMapKey(prevKey => prevKey + 1);  // Forzar re-render del mapa cuando se recibe foco
            setRegion({
                latitude: (origin.latitude + destination.latitude) / 2,
                longitude: (origin.longitude + destination.longitude) / 2,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            return () => {};
        }, [origin, destination])
    );

    useEffect(() => {
        // Solicitar permisos de ubicación
        const requestPermissions = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission to access location was denied');
                }
            } catch (error) {
                console.error('Error requesting location permissions:', error);
            }
        };
        requestPermissions();

        // Función para observar la ubicación del dispositivo
        const startWatchingLocation = async () => {
            const locationSubscription = await Location.watchPositionAsync(
              {
                accuracy: Location.Accuracy.High,
                distanceInterval: 500,  // Actualizar solo si hay un cambio de 500 metros
                timeInterval: 10000,    // Actualizar cada 10 segundos
              },
              (newLocation) => {
                setOrigin({
                  latitude: newLocation.coords.latitude,
                  longitude: newLocation.coords.longitude,
                });
                setRegion({
                  latitude: newLocation.coords.latitude,
                  longitude: newLocation.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              }
            );
          };
          

        startWatchingLocation();

        // Simulación de retraso para el loading
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);  // Reducido a 2 segundos para una experiencia más ágil

        return () => {
            clearTimeout(loadingTimeout);
        };
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#2563eb" />
                </View>
            ) : (
                <MapView
                    key={mapKey}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={region}
                    customMapStyle={customMapStyle}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={false}
                    showsScale={false}
                    showsBuildings={false}
                    showsTraffic={false}
                    showsIndoors={false}
                    loadingEnabled={true}
                    onRegionChangeComplete={setRegion}
                    rotateEnabled={false}
                >
                    {/* Marker para el origen (posición actual del dispositivo) */}
                    <Marker
                        coordinate={origin}
                        pinColor="#2563eb"
                        title="Origen"
                        description="Ubicación de origen"
                    />

                    {/* Marker para el destino (coordenadas pasadas por parámetro) */}
                    <Marker
                        coordinate={destination}
                        pinColor="#dc2626"
                        title="Destino"
                        description="Ubicación de destino"
                    />

                    {/* Direcciones entre el origen y destino */}
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_KEY}
                        strokeWidth={3}
                        strokeColor="#2563eb"
                        mode="DRIVING"
                        precision="high"
                        lineDashPattern={[0]}
                    />
                </MapView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    map: {
        flex: 1,
        borderRadius: 0,  // Removido para un look más minimalista
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});
