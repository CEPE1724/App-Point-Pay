import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import point from "../../../assets/Point.png"; 
import { useAuth } from "../../navigation/AuthContext"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIURL } from "../../config/apiconfig";

export default function PinInput({ navigation }) {
    const { width, height } = Dimensions.get('window');
    const [pin, setPin] = useState(['', '', '', '', '', '']); // Array de 6 elementos para el PIN
    const { login } = useAuth(); 
    const [isLoading, setIsLoading] = useState(false);

    // Función para manejar el ingreso del PIN
    const handlePinPress = (digit) => {
        if (pin.join('').length < 6) {
            const newPin = [...pin];
            const emptyIndex = newPin.indexOf('');  // Encontrar el primer espacio vacío
            if (emptyIndex !== -1) {
                newPin[emptyIndex] = digit;
                setPin(newPin);
            }
        }
    };

    // Función para borrar el último número del PIN
    const handleDelete = () => {
        const newPin = [...pin];
        const lastFilledIndex = newPin.findLastIndex(digit => digit !== ''); 
        if (lastFilledIndex !== -1) {
            newPin[lastFilledIndex] = ''; 
        }
        setPin(newPin);
    };

    // Función para manejar el final del PIN
    const handlePinComplete = () => {
        setIsLoading(true);  // Activar el indicador de carga
        printAsyncStorage();
    };

    // Función para mostrar los datos de AsyncStorage
    const printAsyncStorage = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();  
            const result = await AsyncStorage.multiGet(keys);  
            let keyDispositivo = null;
            let keyData = null;
            result.forEach(([key, value]) => {
                if (key === 'userData' && value) {
                    const parsedValue = JSON.parse(value);
                    keyDispositivo = parsedValue.keyDispositivo;
                    keyData = parsedValue.kEYdATA;
                }
            });

            if (!keyDispositivo || !keyData) {
                Alert.alert("Error", "No se encontraron las claves necesarias en AsyncStorage.");
                return;
            }

            try {
                const url = APIURL.senLoginPin(); 
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ KeyPinPass: pin.join(''), KeyDispositivo: keyDispositivo }),
                });

                const data = await response.json();

                if (data.estado === "success") {
                    await storeUserData(data);  
                    console.log("Datos del usuario almacenados en AsyncStorage:", data);
                    console.log("Iniciando sesión...", data.token);
                    console.log("Datos del usuario:", data.usuario);
                    login(  data.token, data.usuario);  // Almacenar el token y los datos del usuario en el contexto
                    
                } else {
                    Alert.alert("Error", data.message || "Credenciales incorrectas");
                }
            } catch (error) {
                Alert.alert("Error", "Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
            } finally {
                setIsLoading(false);  
            }
        } catch (error) {
            console.error('Error fetching AsyncStorage data', error);
            setIsLoading(false);
        }
    };

    // Función para almacenar los datos del usuario en AsyncStorage
    const storeUserData = async (data) => {
        try {
            // Verificar que los datos estén definidos antes de almacenarlos
            if (!data.token || !data.usuario) {
                throw new Error("Faltan datos esenciales para el almacenamiento.");
            }
    
            console.log("Guardando datos del usuario en AsyncStorage...", data);
    
            // Verificar y almacenar solo si los valores no son null o undefined
            if (data.token) {
                await AsyncStorage.setItem("userToken", data.token);
            }
    
            if (data.usuario) {
                await AsyncStorage.setItem("userInfo", JSON.stringify(data.usuario));
                if (data.usuario.Nombre) {
                    await AsyncStorage.setItem("userName", data.usuario.Nombre);
                }
                if (data.usuario.idUsuario) {
                    await AsyncStorage.setItem("userId", String(data.usuario.idUsuario));
                }
                if (data.usuario.bodegas) {
                    await AsyncStorage.setItem("userBodega", JSON.stringify(data.usuario.bodegas));
                }
                if (data.usuario.permisosMenu) {
                    await AsyncStorage.setItem("userPermiso", JSON.stringify(data.usuario.permisosMenu));
                }
            }
        } catch (error) {
            console.error("Error al guardar datos en AsyncStorage:", error.message);
        }
    };
    

    useEffect(() => {
        if (pin.join('').length === 6) {
            handlePinComplete();  // Llamar a la función de completar el PIN
        }
    }, [pin]);

    const handleBack = () => {
        navigation.navigate('Login'); 
    };

    return (
        <View style={styles.container}>
            <Image
                source={point}
                style={[styles.image, { width: 150, height: 60, marginBottom: 0 }]}
                resizeMode="contain"
            />
            <View style={styles.pinContainer}>
                {pin.map((circle, index) => (
                    <View
                        key={index}
                        style={[styles.circle, { backgroundColor: circle ? '#00416D' : '#fff' }]} 
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.buttonText}>Regresar</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'x'].map((digit) => (
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

            {isLoading && <Text>Loading...</Text>} 
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
        paddingVertical: 12,
        backgroundColor: '#00416D',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    numButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    deleteButton: {
        width: '30%',
        paddingVertical: 12,
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