import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';

export function ViewEquifax({ route }) {
    // Ubicación predeterminada
    const defaultCoordinates = {
        lat: -78.11637,
        lng: 0.330428,
    };

    // Accediendo a los parámetros pasados por navegación
    const { coordinates } = route.params || {};


    // Usamos las coordenadas pasadas como destino, sino usamos las predeterminadas
    const [destination, setDestination] = useState({
        latitude: coordinates?.destination?.lat || defaultCoordinates.lat, // Si no hay coordenadas, usamos la predeterminada
        longitude: coordinates?.destination?.lng || defaultCoordinates.lng,
    });

    // Estado de la región del mapa (para centrado)
    const [region, setRegion] = useState({
        latitude: destination.latitude, // Centrado en el destino por defecto
        longitude: destination.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [loading, setLoading] = useState(true);

    // Custom map style para un look minimalista
    const customMapStyle = [
        { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "off" }] },
        { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
        { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
        { "featureType": "transit", "stylers": [{ "visibility": "off" }] },
        { "featureType": "water", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }
    ];

    // Este hook asegura que el mapa se actualice cuando la vista recibe foco
    useFocusEffect(
        React.useCallback(() => {
            // Solo se actualiza la región cuando la vista recibe foco
            setRegion({
                latitude: destination.latitude, // Centrado en el destino
                longitude: destination.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }, [destination])
    );

    useEffect(() => {
        // Simulación de retraso para el loading
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);  // Ajustado a 2 segundos para simular un retraso

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
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={region} // Usar initialRegion para evitar re-renderización constante
                    customMapStyle={customMapStyle}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={false}
                    showsScale={false}
                    showsBuildings={false}
                    showsTraffic={false}
                    showsIndoors={false}
                    loadingEnabled={true}
                    rotateEnabled={false}
                >
                    {/* Marker para el destino (coordenadas pasadas por parámetro o las predeterminadas) */}
                    <Marker
                        coordinate={destination}
                        pinColor="#dc2626"
                        title="Destino"
                        description="Ubicación de destino"
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
