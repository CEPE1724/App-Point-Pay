import React, { useState, useRef } from "react";
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
import  logo from "../../../assets/PontyDollar.png";
import { APIURL } from "../../config/apiconfig";
import { styles } from "./LoginScreen.Style";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get("window");

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
      await loginUser();
    }
  };

  const animateOpacity = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tus credenciales.");
      return;
    }
    setIsLoading(true);

    try {
      const url = APIURL.senLogin();
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: email, clave: password }),
      });

      const data = await response.json();
      console.log("Inicio de sesión exitoso:", data);

      if (data.estado === "success") {
        await storeUserData(data);
        console.log("Navigating to TabScreens...Login screen");
        navigation.reset({
          index: 0, // Start from the first screen in the stack
          routes: [{ name: "TabScreens" }], // Navigate directly to 'TabScreens'
        });
        
      } else {
        Alert.alert("Error", data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };
  const storeUserData = async (data) => {
    try {
      // Guardamos el token y los detalles del usuario en AsyncStorage
      await AsyncStorage.setItem("userToken", data.token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(data.usuario));
      await AsyncStorage.setItem("userName", data.usuario.Nombre);
      await AsyncStorage.setItem("userId", String(data.usuario.idUsuario));
      await AsyncStorage.setItem("userBodega", JSON.stringify(data.usuario.bodegas));  // Guardamos bodegas como JSON
      await AsyncStorage.setItem("userPermiso", JSON.stringify(data.usuario.permisosMenu));  // Guardamos permisosMenu como JSON

      console.log("Datos del usuario guardados con éxito");
    } catch (error) {
      console.error("Error al guardar datos en AsyncStorage:", error);
    }
  };

  const handleBack = () => {
    console.log("Going back...");
    /// navigation.goBack(); // Solo si es posible regresar

     console.log("Navigating to Login...");
     navigation.navigate('Login'); // Si no, navega explícitamente a la pantalla de Login
  }

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
            style={[styles.image, { 
              width: 150, // Ajuste fijo en píxeles
              height: 60, // Ajuste fijo en píxeles
              marginBottom: 0 
            }]} // La mitad del tamaño original
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
        <TouchableOpacity style={styles.backButton} onPress={handleBack} >
                <Text style={styles.buttonTextBack}>Regresar</Text>
            </TouchableOpacity>

        <Text style={styles.version}>V.1.10.1</Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
