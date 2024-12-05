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
import logo from "../../../assets/PontyDollar.png";
import { APIURL } from "../../config/apiconfig";
import { styles } from "./Login.Style";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState(""); // Estado para el PIN
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); // Controla si es login por email o PIN
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get("window");



  const handleButtonPressPin = () => {
    console.log("Navigating to LoginPin...edidididi");
    navigation.reset({
        index: 0, // Start from the first screen in the stack
        routes: [{ name: 'LoginPin' }], // Navigate directly to 'Cobranza'
      });
  };

  const handleButtonPressLogin = () => {
    console.log("Navigating to LoginScreen...");
    navigation.reset({
        index: 0, // Start from the first screen in the stack
        routes: [{ name: 'LoginCredenciales' }], // Navigate directly to 'Cobranza'
      });
  }

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

        {/* Botones para elegir el método de inicio de sesión */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.cardButton,
              loginMethod === "email" && styles.activeCardButton,
            ]}
            onPress={handleButtonPressLogin}
          >
            <Icon name="person" size={30} color="#fff" />
            <Text style={styles.cardButtonText}>Usuario y Contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.cardButton,
              loginMethod === "pin" && styles.activeCardButton,
            ]}
            onPress={handleButtonPressPin  }
          >
            <Icon name="lock" size={30} color="#fff" />
            <Text style={styles.cardButtonText}>PIN </Text>
          </TouchableOpacity>
        </View>


        <Text style={styles.version}>V.1.10.1555</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

