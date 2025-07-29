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
import Icon from "react-native-vector-icons/MaterialIcons";
import point from "../../../assets/Point.png";
import logo from "../../../assets/PontyDollar.png";
import { styles } from "./Login.Style";
import { useDb } from '../../database/db';
import { getItemsAsync } from '../../database';
import NetInfo from '@react-native-community/netinfo'; // Importa NetInfo
export default function Login({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const [idTipoPersona, setIdTipoPersona] = useState(null);
    const { db, initializeDb } = useDb();
    const [dbDispositivos, setDbDispositivos] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  useEffect(() => {
    const fetchAsyncStorageData = async () => {
      try {
        // Inicializar la base de datos
        const items = await getItemsAsync(db);
        setDbDispositivos(items); // Guardar los dispositivos en el estado

      } catch (error) {
        console.error("Error al obtener datos ", error);
      }
    };

    fetchAsyncStorageData();
  }, []);

  const handleButtonPressPin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginPin" }],
    });
  };

  const handleButtonPressLogin = () => {
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
          <Text style={styles.aliasTitle}>{dbDispositivos[0]?.Alias}</Text>
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
          { parseInt(dbDispositivos[0]?.iTipoPersonal) === 1 && (
            <>
            {isConnected && (
              <TouchableOpacity
                style={[styles.cardButton, styles.button]}
                onPress={handleButtonPressLogin}
              >
                <Icon name="person" size={40} color="#fff" />
                <Text style={styles.cardButtonText}>Usuario y Contraseña</Text>
              </TouchableOpacity>
            )}

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
          {parseInt(dbDispositivos[0]?.iTipoPersonal) === 2 && (
            <TouchableOpacity
              style={[styles.cardButton, styles.button]}
              onPress={handleButtonPressPin}
            >
              <Icon name="lock" size={30} color="#fff" />
              <Text style={styles.cardButtonText}>PIN</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.version}>Versión: 2.5.0.0</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
