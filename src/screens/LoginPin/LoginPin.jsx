import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Para los íconos
import point from "../../../assets/Point.png"; // Imagen de fondo

export default function PinInput({ navigation }) {
    const { width, height } = Dimensions.get('window');
    const [pin, setPin] = useState(['', '', '', '', '', '']); // Array de 6 elementos para el PIN

    // Función para manejar el ingreso del PIN
    const handlePinPress = (digit) => {
        // Comprobar si hay menos de 6 dígitos
        if (pin.join('').length < 6) {
            const newPin = [...pin];
            const emptyIndex = newPin.indexOf('');  // Encontrar el primer espacio vacío
            if (emptyIndex !== -1) {
                newPin[emptyIndex] = digit;
                setPin(newPin);
            }
        }

        // Si el pin ya tiene 6 dígitos, ejecutar handlePinComplete
        if (pin.join('').length === 5) {
            handlePinComplete(); // Esto se ejecutará cuando se alcance el sexto dígito
        }
    };


    // Función para borrar el último número del PIN
    const handleDelete = () => {
        const newPin = [...pin];

        // Encuentra el índice del último valor ingresado (no vacío)
        const lastFilledIndex = newPin.findLastIndex(digit => digit !== ''); // Encontrar el último número ingresado

        // Si encontramos un valor lleno (no vacío)
        if (lastFilledIndex !== -1) {
            newPin[lastFilledIndex] = ''; // Borrar el último número ingresado
        }
        setPin(newPin); // Actualizar el estado con el nuevo array
    };


    // Función para manejar la finalización del PIN
    const handlePinComplete = () => {

        Alert.alert("Éxito", "¡El PIN ha sido configurado correctamente!");
        // Aquí puedes navegar a otro screen o hacer lo que sea necesario
    };

    // Función para navegar al login
    const handleBack = () => {
 
                console.log("Going back...");
               /// navigation.goBack(); // Solo si es posible regresar
   
                console.log("Navigating to Login...");
                navigation.navigate('Login'); // Si no, navega explícitamente a la pantalla de Login
    };

    return (
        <View style={styles.container}>
            <Image
                source={point}
                style={[styles.image, { width: 150, height: 60, marginBottom: 0 }]}
                resizeMode="contain"
            />

            {/* Círculos del PIN */}
            <View style={styles.pinContainer}>
                {pin.map((circle, index) => (
                    <View
                        key={index}
                        style={[
                            styles.circle,
                            { backgroundColor: circle ? '#00416D' : '#fff' }, // Cambiar color si está lleno
                        ]}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.buttonText}>Regresar</Text>
            </TouchableOpacity>
            {/* Botones numéricos */}
            <View style={styles.buttonContainer}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'x', '',].map((digit) => (
                    <TouchableOpacity
                        key={digit}
                        style={digit === 'x' ? styles.deleteButton : styles.numButton}
                        onPress={() => (digit === 'x' ? handleDelete() : handlePinPress(digit))}
                    >
                        {digit === 'x' ? (
                            <Icon name="backspace" size={24} color="#fff" />
                        ) : (
                            <Text style={styles.numButtonText}>{digit}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Botón regresar */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F9',
        paddingHorizontal: 30,
        marginBottom: 50,
    },
    image: {
        marginBottom: 30,
    },
    pinContainer: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 40,
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 20 / 2,
        margin: 5,
        borderWidth: 1,
        borderColor: '#00416D',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
        marginBottom: 30,
        justifyContent: 'space-between',
        
    },
    numButton: {
        width: '30%',
        paddingVertical: 12,  // Tamaño reducido
        backgroundColor: '#00416D',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    numButtonText: {
        color: '#fff',
        fontSize: 20,  // Tamaño de texto reducido
        fontWeight: 'bold',
    },
    deleteButton: {
        width: '30%',
        paddingVertical: 12,  // Tamaño reducido
        backgroundColor: '#FF4C4C',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    backButton: {
        backgroundColor: 'green',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
