import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import point from "../../../assets/Point.png";
import { useAuth } from "../../navigation/AuthContext";
import { styles } from './LoginPin.style';
import { APIURL } from "../../config/apiconfig";
import NetInfo from '@react-native-community/netinfo'; // Importa NetInfo
import { useDb } from '../../database/db';
import { addItemAsyncUser, addItemAsyncBodega, addItemAsyncMenu, getItemsAsync } from '../../database';
import { Wifi, WifiOff } from '../../Icons';

export default function PinInput({ navigation }) {
    const { width, height } = Dimensions.get('window');
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [items, setItems] = useState([]);
    const { db, initializeDb } = useDb();

    useEffect(() => {
        const initDb = async () => {
            await initializeDb();
        };
        initDb();
    }, [initializeDb]);

    // Obtener items desde la base de datos
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getItemsAsync(db);
                setItems(fetchedItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []); // Se ejecuta solo una vez al montar el componente

    // Revisión de conectividad
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handlePinPress = (digit) => {
        if (pin.join('').length < 6) {
            const newPin = [...pin];
            const emptyIndex = newPin.indexOf('');
            if (emptyIndex !== -1) {
                newPin[emptyIndex] = digit;
                setPin(newPin);
            }
        }
    };

    const handleDelete = () => {
        const newPin = [...pin];
        const lastFilledIndex = newPin.findLastIndex(digit => digit !== '');
        if (lastFilledIndex !== -1) {
            newPin[lastFilledIndex] = '';
        }
        setPin(newPin);
    };

    const handlePinComplete = () => {
        setIsLoading(true);

        // Si no hay conexión, usar datos locales (AsyncStorage)
        if (!isConnected) {
            printAsyncStorageNotConnected();
            return;
        }

        // Si hay conexión, proceder a validar con el servidor
        if (!items || items.length === 0) {
            Alert.alert("Error", "No se encontraron datos en el dispositivo.");
            setIsLoading(false);
            return;
        }

        printAsyncStorage();
    };

    const printAsyncStorageNotConnected = async () => {
        try {
            const keys = items[0]?.kEYdATA;
            if (keys === pin.join('')) {
                login(items[0]?.KeyDispositivo, items[0]?.usuario); // Utiliza el usuario almacenado
            } else {
                Alert.alert("Error", "Credenciales incorrectas");
            }
        } catch (error) {
            console.error('Error en printAsyncStorageNotConnected', error);
            setIsLoading(false);
        }
    };

    const printAsyncStorage = async () => {
        try {
            if (items.length === 0) {
                Alert.alert("Error", "No se encontraron datos en AsyncStorage.");
                setIsLoading(false);
                return;
            }

            const url = APIURL.senLoginPin();
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ KeyPinPass: pin.join(''), KeyDispositivo: items[0]?.KeyDispositivo }),
            });

            const data = await response.json();
            if (data.estado === "success") {
                await addItemAsyncUser(db, data, isConnected);
                await addItemAsyncBodega(db, data, isConnected);
                await addItemAsyncMenu(db, data, isConnected);
                login(data.token, data.usuario); // Almacenar el token y los datos del usuario
            } else {
                Alert.alert("Error", data.message || "Credenciales incorrectas");
            }
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
            console.error('Error al hacer login con PIN', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (pin.join('').length === 6) {
            handlePinComplete();  // Llamar a la función para completar el PIN
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
            <View style={styles.connectionStatusContainer}>
                {isConnected ? (
                    <Wifi size={20} color="black" /> // Conexión activa
                ) : (
                    <WifiOff size={20} color="black" /> // Sin conexión
                )}
            </View>
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
