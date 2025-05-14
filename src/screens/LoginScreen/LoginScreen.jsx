import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import point from "../../../assets/Point.png";
import logo from "../../../assets/PontyDollar.png";
import { APIURL } from "../../config/apiconfig";
import { styles } from "./LoginScreen.Style";
import { useAuth } from "../../navigation/AuthContext"; // Importar el contexto de autenticación
import NetInfo from '@react-native-community/netinfo'; // Importa NetInfo
import { useDb } from '../../database/db';
import {
  addItemAsyncUser, addItemAsyncBodega, addItemAsyncMenu, getItemsAsync,
  ListadoEstadoGestion, ListadoResultadoGestion, ListadoEstadoTipoContacto, ListadoCuenta
} from '../../database';
import { Wifi, WifiOff } from '../../Icons';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth(); // Accedemos a la función login desde el contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get("window");
  const [idTipoPersona, setIdTipoPersona] = useState(null);
  const [keyDispositivo, setKeyDispositivo] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [items, setItems] = useState([]);
  const { db, initializeDb } = useDb();
  // useEffect para imprimir los datos de AsyncStorage al cargar el componente

  useEffect(() => {
    const initDb = async () => {
      await initializeDb();
    };
    initDb();
  }, [initializeDb]);

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
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsButtonEnabled(text.length > 0);
    if (isEmailEntered) {
      resetPasswordFields();
    }
  };

  const resetPasswordFields = () => {
    setShowPasswordFields(false);
    setIsEmailEntered(false);
    setPassword("");
  };

  const handleButtonPress = async () => {
    if (isLoading) return;

    if (!isEmailEntered) {
      if (!email) {
        Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
        return;
      }
      setIsEmailEntered(true);
      setShowPasswordFields(true);
      animateOpacity();
    } else {
      await handlePinComplete();
    }
  };

  const handlePinComplete = () => {
    setIsLoading(true);
    if (!isConnected) {
      //printAsyncStorageNotConnected();
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
      const clave = items[0]?.Clave;
      const keys = items[0]?.kEYdATA;
      if (keys === clave) {
        login(items[0]?.KeyDispositivo, items[0]?.usuario); // Utiliza el usuario almacenado
      } else {
        Alert.alert("Error", "Credenciales incorrectas!");
      }
    } catch (error) {
      console.error('Error en printAsyncStorageNotConnected', error);
      setIsLoading(false);
    }
  };

  const printAsyncStorage = async () => {
    try {
      if (items.length === 0) {
        Alert.alert("Error", "No se encontraron datos .");
        setIsLoading(false);
        return;
      }
      const url = APIURL.senLoginV1();
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: email, clave: password, keyDispositivo: items[0]?.KeyDispositivo, KeyBuild: 1 }),
      });

      const data = await response.json();
      if (data.estado === "success") {
        await addItemAsyncUser(db, data, isConnected);
        await addItemAsyncBodega(db, data, isConnected);
        await addItemAsyncMenu(db, data, isConnected);
        await ListadoEstadoGestion(db, data, isConnected);
        await ListadoResultadoGestion(db, data, isConnected);
        await ListadoEstadoTipoContacto(db, data, isConnected);
        await ListadoCuenta(db, data, isConnected);
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

  const animateOpacity = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };




  const handleBack = () => {
    navigation.navigate("Login"); // Navegar a la pantalla de bienvenida
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          {/* Imagen 1 - point */}
          <Image
            source={point}
            style={[styles.image, { width: 150, height: 60, marginBottom: 0 }]} // La mitad del tamaño original
            resizeMode="contain"
          />
          {/* Imagen 2 - logo */}
          <Image
            source={logo}
            style={[styles.image, { width: width * 0.8, height: height * 0.3 }]} // Ajuste para el margen inferior
            resizeMode="contain"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.subtitle}>Ingresa tu usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange}
            autoCapitalize="characters"
          />
        </View>

        {showPasswordFields && (
          <Animated.View style={[styles.passwordContainer, { opacity: opacityAnim }]}>
            <View style={styles.inputContainer}>
              <Text style={styles.subtitle}>Ingresa tu contraseña</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}

        <TouchableOpacity
          style={[styles.button, { opacity: isButtonEnabled && !isLoading ? 1 : 0.5 }]}
          onPress={handleButtonPress}
          disabled={!isButtonEnabled || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isEmailEntered ? "Iniciar sesión" : "Continuar"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.buttonTextBack}>Regresar</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Versión: 2.4.5.8</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
