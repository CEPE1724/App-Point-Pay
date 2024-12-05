import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Para los íconos
import point from "../../../assets/Point.png";
export default function PinConfigurado({ navigation }) {
  const { width, height } = Dimensions.get('window');

  // Función que maneja el inicio de sesión (puedes ajustarla según tu lógica)
  const handleLogin = () => {
    // Aquí puedes realizar la lógica para iniciar sesión
    navigation.reset({
      index: 0, // Start from the first screen in the stack
      routes: [{ name: 'Login' }], // Navigate directly to 'Cobranza'
    });
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F9',
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  cedulaIcon: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#00416D',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  pinText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00416D',
  },
  button: {
    backgroundColor: '#00416D',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
