import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import point from "../../../assets/Point.png";
import logo from "../../../assets/PontyDollar.png";
import { styles } from "./Login.Style";

export default function Login({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const [idTipoPersona, setIdTipoPersona] = useState(null);

  // useEffect para cargar y mostrar los datos de AsyncStorage al iniciar
  useEffect(() => {
    const fetchAsyncStorageData = async () => {
      try {
        // Obtener el objeto 'userData' desde AsyncStorage
        const userDataString = await AsyncStorage.getItem("userData");

        if (userDataString) {
          // Parsear el objeto 'userData'
          const userData = JSON.parse(userDataString);

          // Ahora puedes acceder a 'iTipoPersonal' de 'userData'
          const tipoPersona = userData.iTipoPersonal;
          setIdTipoPersona(tipoPersona); // Guardamos 'iTipoPersonal' en el estado
          console.log("iTipoPersonal:", tipoPersona); // Mostrar en consola

        } else {
          console.log("No se encontró 'userData' en AsyncStorage.");
        }
      } catch (error) {
        console.error("Error al obtener datos de AsyncStorage", error);
      }
    };

    fetchAsyncStorageData();
  }, []);

  const handleButtonPressPin = () => {
    console.log("Navigating to LoginPin...");
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginPin" }],
    });
  };

  const handleButtonPressLogin = () => {
    console.log("Navigating to LoginScreen...");
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginCredenciales" }],
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image
            source={point}
            style={[
              styles.image,
              {
                width: 150,
                height: 60,
                marginBottom: 0,
              },
            ]}
            resizeMode="contain"
          />
          <Image
            source={logo}
            style={[
              styles.image,
              { width: width * 0.8, height: height * 0.3 },
            ]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonContainer}>
          {/* Mostrar ambos botones si idTipoPersona es "1" */}
          {idTipoPersona === "1" && (
            <>
              <TouchableOpacity
                style={[styles.cardButton, styles.button]}
                onPress={handleButtonPressLogin}
              >
                <Icon name="person" size={40} color="#fff" />
                <Text style={styles.cardButtonText}>Usuario y Contraseña</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.cardButton, styles.button]}
                onPress={handleButtonPressPin}
              >
                <Icon name="lock" size={30} color="#fff" />
                <Text style={styles.cardButtonText}>PIN</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Mostrar solo el botón de PIN si idTipoPersona es "2" */}
          {idTipoPersona === "2" && (
            <TouchableOpacity
              style={[styles.cardButton, styles.button]}
              onPress={handleButtonPressPin}
            >
              <Icon name="lock" size={30} color="#fff" />
              <Text style={styles.cardButtonText}>PIN</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.version}>Versión: 2.3.1.0</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
