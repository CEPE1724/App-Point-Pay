import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { styles } from './AlertComponent.Style'; // Asegúrate de que la ruta es correcta

export function AlertComponent({ message, color, iconName, duration = 3000, onDismiss }) {
    const fadeAnim = new Animated.Value(0); // Valor inicial para la animación

    useEffect(() => {
        // Animación para mostrar el alert
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        // Temporizador para desaparecer el alert
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                if (onDismiss) onDismiss(); // Llama a la función para cerrar
            });
        }, duration);

        return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }, [fadeAnim, duration, onDismiss]);

    return (
        <Animated.View style={[styles.alertContainer, { backgroundColor: color, opacity: fadeAnim }]}>
            {iconName && (
                <MaterialIcons name={iconName} size={24} color="#fff" style={styles.icon} />
            )}
            <Text style={styles.alertText}>{message}</Text>
        </Animated.View>
    );
}
