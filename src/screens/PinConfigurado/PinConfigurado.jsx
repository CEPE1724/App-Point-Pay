import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Para los íconos
import point from "../../../assets/Point.png";
import { styles } from './PinConfigurado.Style'; // Importar estilos
import { useAuth } from "../../navigation/AuthContext"; // Importar el contexto de autenticación

export default function PinConfigurado({ navigation }) {
  const { width, height } = Dimensions.get('window');
  const { setRegistrationStatus } = useAuth(); // Accedemos a la función setRegistrationStatus desde el contexto

  // Función que maneja el inicio de sesión (y el cambio de estado de registro)
  const handleLogin = () => {
    setRegistrationStatus(true); // Establecemos el estado de registro a true cuando el usuario ha configurado el PIN
    
    // Aquí puedes redirigir al usuario después de la configuración del PIN
    // Por ejemplo, si deseas navegar a la pantalla principal, podrías hacer algo como esto:
    //navigation.navigate("Main"); // Asegúrate de que "Main" sea el nombre correcto de tu pantalla principal
  };

  return (
    <View style={styles.container}>
      <Image
        source={point}
        style={[styles.image, { 
          width: 150, // Ajuste fijo en píxeles
          height: 60, // Ajuste fijo en píxeles
          marginBottom: 0 
        }]} // La mitad del tamaño original
        resizeMode="contain"
      />
      <View style={styles.iconContainer}>
        <Icon name="fingerprint" size={60} color="#00416D" style={styles.cedulaIcon} />
      </View>

      <Text style={styles.title}>¡Todo está configurado correctamente!</Text>

      <Text style={styles.message}>
        El PIN para el acceso ha sido configurado correctamente.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
