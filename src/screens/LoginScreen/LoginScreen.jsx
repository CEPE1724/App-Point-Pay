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

  // useEffect para imprimir los datos de AsyncStorage al cargar el componente
  useEffect(() => {
    const printAsyncStorage = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();  // Obtener todas las claves de AsyncStorage
        const result = await AsyncStorage.multiGet(keys);  // Obtener los valores asociados a esas claves

        result.forEach(([key, value]) => {
          console.log(`Clave: ${key}, Valor: ${value}`);

          if (key === "userToken" || key === "userInfo" || key === "userName" || key === "userId" || key === "userBodega" || key === "userPermiso") {
            console.log(`Dato de ${key}:`, value);
          }

          // Si existe el 'userData' almacenado
          if (key === "userData" && value) {
            const parsedValue = JSON.parse(value);
            console.log("Datos completos del usuario:", parsedValue);
            // Aquí puedes acceder a las propiedades de 'userData' si las necesitas
            setIdTipoPersona(parsedValue.Empresa);
            setKeyDispositivo(parsedValue.keyDispositivo);
            console.log("keyDispositivo:", parsedValue.Empresa);
          }
        });
      } catch (error) {
        console.error("Error al obtener datos de AsyncStorage:", error);
      }
    };

    printAsyncStorage();
  }, []); // Se ejecuta una sola vez cuando se monta el componente

  // useEffect para detectar cuando el valor de idTipoPersona cambia
  useEffect(() => {
    if (idTipoPersona !== null) {
      console.log("KeyBuild:", idTipoPersona);  // Se captura el valor de idTipoPersona después de que cambia
    }
    if (keyDispositivo !== null) {
      console.log("keyDispositivo:", keyDispositivo);  // Se captura el valor de keyDispositivo después de que cambia
    }
  }, [idTipoPersona, keyDispositivo]); // Se ejecuta cada vez que idTipoPersona o keyDispositivo cambian

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
    if(!idTipoPersona || !keyDispositivo) {
      Alert.alert("Error", "No se ha podido obtener el KeyBuild o el keyDispositivo.");
      return
    }
    setIsLoading(true);

    try {
      const url = APIURL.senLoginV1();
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: email, clave: password, keyDispositivo: keyDispositivo, KeyBuild: idTipoPersona }),
      });

      const data = await response.json();
      console.log("Inicio de sesión exitoso:", data);

      if (data.estado === "success") {
        await storeUserData(data); // Guardar datos en AsyncStorage
        console.log("Datos del usuario guardados con éxito", data);
        login(); // Llamar a la función login del contexto para actualizar el estado global
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

        <Text style={styles.version}>V.1.10.1</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
