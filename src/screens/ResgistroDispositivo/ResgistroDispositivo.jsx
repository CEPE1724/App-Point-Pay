
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image
} from "react-native";
import point from "../../../assets/Point.png";
import Icon from "react-native-vector-icons/MaterialIcons";
import { APIURL } from "../../config/apiconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function FormularioRegistro({ navigation }) {
  const { width, height } = Dimensions.get('window');
  const [showForm, setShowForm] = useState(false); // Controla si se muestra el formulario de cédula o el formulario de PIN
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const [DataStore, setDataStore] = useState([]);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false); // Estado para mostrar u ocultar el PIN
  const [pinValid, setPinValid] = useState(false); // Estado para habilitar el botón "Crear PIN"


  // Función para manejar la validación de la cédula y guardar los datos
  const handleRegister = async () => {
    if (!cedula) {
      return Alert.alert("Alerta", "Por favor ingresa tu número de identificación.");
    }

    if (cedula.length < 8 || cedula.length > 15) {
      return Alert.alert("Alerta", "La identificación debe tener entre 8 y 15 caracteres.");
    }

    if (!nombre) {
      return Alert.alert("Alerta", "Por favor ingresa un alias.");
    }

    if (nombre.length < 3 || nombre.length > 10) {
      return Alert.alert("Alerta", "El alias debe tener entre 3 y 10 caracteres.");
    }

    try {
      const url = `${APIURL.getValDispositivo()}?Cedula=${cedula}`; // La cédula ahora se pasa como parámetro en la URL
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.estado === "success") {
        // Guardar los datos relevantes en AsyncStorage
        await AsyncStorage.setItem('KeyAlias', nombre);
        setDataStore(data);  // Guarda en el estado local de la app

        setCedula('');  // Limpiar el campo de cédula
        setNombre('');  // Limpiar el campo de alias
        setPin('');     // Limpiar el campo de PIN
        setConfirmPin('');  // Limpiar el campo de confirmación de PIN
        setShowForm(true);  // Mostrar el formulario para crear PIN
      } else {
        Alert.alert("Error", data.message || "Usuario no encontrado o no autorizado");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al verificar los datos. Inténtalo de nuevo.");
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }

    setLoading(true); // Mostrar el indicador de carga

    setTimeout(() => {
      setLoading(false); // Ocultar el indicador de carga después de 2 segundos
    }, 2000); // Simula una espera de 2 segundos antes de mostrar el mensaje de éxito
  };



  // Función para validar el PIN (validar 6 dígitos sin números consecutivos o repetidos)
  const validatePin = (inputPin) => {
    const hasConsecutiveNumbers = /(\d)\1/.test(inputPin); // Verifica si hay números repetidos consecutivos
    const hasSequentialNumbers = /012|123|234|345|456|567|678|789/.test(inputPin); // Verifica secuencias numéricas
    return !hasConsecutiveNumbers && !hasSequentialNumbers;
  };

  // Función para manejar el cambio en el PIN
  const handlePinChange = (inputPin) => {
    setPin(inputPin);
    if (inputPin.length === 6 && validatePin(inputPin)) {
      setPinValid(true); // Habilitar botón "Crear PIN" si el PIN es válido
    } else {
      setPinValid(false); // Deshabilitar el botón si el PIN no es válido
    }
  };

  // Función para manejar el cambio en la confirmación del PIN
  const handleConfirmPin = (inputPin) => {
    setConfirmPin(inputPin);
  };

  // Función para manejar la creación del PIN
  const handleCreatePin = async () => {
    if (pin !== confirmPin) {
      Alert.alert("Error", "Los PINs no coinciden.");
      return;
    }
    console.log("PIN creado:", pin);
    console.log("PIN confirmado:", confirmPin);
    console.log("Datos del usuario:", DataStore);
    console.log("Datos del usuario:", DataStore.Cedula);
    console.log("Datos del usuario:", DataStore.KeyDispositivo);
    try {
      const url = APIURL.getValDispositivoImei(); // La cédula ahora se pasa como parámetro en la URL
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Cedula: DataStore.Cedula, KeyDispositivo: DataStore.KeyDispositivo, Pin: pin }),
      });

      const data = await response.json();
      if (data.estado === "success") {
        const KeyAlias = await AsyncStorage.getItem('KeyAlias');
        const K_EBC_Y_DT = {
          token: DataStore.token,
          KeyBuild: DataStore.idNomina.toString(),
          Empresa: DataStore.Empresa.toString(),
          Cedula: DataStore.Cedula,
          keyDispositivo: DataStore.KeyDispositivo,
          kEYdATA: pin,  // Aquí guardamos el pin
          KeyAlias: KeyAlias,
          iTipoPersonal: DataStore.iTipoPersonal.toString(),
        };
        const jsonData = JSON.stringify(K_EBC_Y_DT);
        // Guardar el objeto como una cadena JSON en AsyncStorage
        await AsyncStorage.setItem('userData', jsonData);
        navigation.reset({
          index: 0, // Start from the first screen in the stack
          routes: [{ name: 'PinConfigurado' }], // Navigate directly to 'Cobranza'
        });

      } else {
        Alert.alert("Error", data.message || "Hubo un problema al crear el PIN.");
      }
    }
    catch (error) {
      Alert.alert("Error", "Hubo un problema al crear el PIN. Inténtalo de nuevo.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Image
          source={point}
          style={[styles.image, {
            width: 150, // Ajuste fijo en píxeles
            height: 60, // Ajuste fijo en píxeles
            marginBottom: 0
          }]} // La mitad del tamaño original
          resizeMode="contain"
        />
        {!showForm ? (
          <>
            <Text style={styles.formTitle}>Formulario de Registro</Text>
            <Text style={styles.formSubTitle}>
              Para el registro y acceso a la aplicación, ingresa tu número de identificación y luego selecciona "Validar".
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Cédula"
              keyboardType="numeric"
              value={cedula}
              onChangeText={setCedula}
              maxLength={10} // Limitar longitud de la cédula
            />

            <TextInput
              style={styles.input}
              placeholder="Alias (Ej: EBC)"
              value={nombre}
              onChangeText={setNombre}
            />

            {loading ? (
              <ActivityIndicator size="large" color="#00416D" style={styles.loadingIndicator} />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Validar</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <Text style={styles.formTitle}>Crear PIN</Text>
            <Text style={styles.formSubTitle}>
              Para asegurar tu cuenta, por favor ingresa un PIN de 6 dígitos y confírmalo a continuación.
            </Text>

            <View style={styles.pinContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu PIN (6 dígitos)"
                keyboardType="numeric"
                value={pin}
                onChangeText={handlePinChange}
                maxLength={6} // Limitar a 6 dígitos
                secureTextEntry={!showPin}
              />
              <TouchableOpacity onPress={() => setShowPin(!showPin)}>
                <Icon name={showPin ? "visibility-off" : "visibility"} size={24} color="#00416D" />
              </TouchableOpacity>
            </View>

            <View style={styles.pinContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirma tu PIN (6 dígitos)"
                keyboardType="numeric"
                value={confirmPin}
                onChangeText={handleConfirmPin}
                maxLength={6} // Limitar a 6 dígitos
                secureTextEntry={!showPin}
              />

            </View>

            <Text style={styles.formSubTitleOb}> Al crear tu PIN debes evitar usar:</Text>
            <Text style={styles.formSubTitleOb}> - Números consecutivos (Ej: 123456)</Text>
            <Text style={styles.formSubTitle}> - Números repetidos (Ej: 111111)</Text>

            <TouchableOpacity
              style={[styles.button, { opacity: pinValid && pin === confirmPin ? 1 : 0.6 }]}
              onPress={handleCreatePin}
              disabled={!pinValid || pin !== confirmPin}
            >
              <Text style={styles.buttonText}>Crear PIN</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setShowForm(false)} // Permite volver a la fase de cédula
        >
          <Icon name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F9",
  },
  formContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#00416D',
    marginBottom: 20,
  },
  formSubTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'left',
    marginHorizontal: 10,
  },
  formSubTitleOb: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'left',
    marginHorizontal: 10,
  },
  input: {
    width: '90%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#00416D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#00416D',
    fontSize: 16,
    marginLeft: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
