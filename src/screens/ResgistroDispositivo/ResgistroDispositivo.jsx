import React, { useState, useEffect } from "react";
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
import { useDb } from '../../database/db';
import { addItemAsync, getItemsAsync, updateItemAsync } from '../../database';
import { styles } from './ResgistroDispositivo.style';
export default function FormularioRegistro({ navigation }) {
  const { width, height } = Dimensions.get('window');
  const [showForm, setShowForm] = useState(false);
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [DataStore, setDataStore] = useState([]);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinValid, setPinValid] = useState(false);
  const { db, initializeDb } = useDb();
  const [dbDispositivos, setDbDispositivos] = useState([]);

  // Inicializar la base de datos
  useEffect(() => {
    const initDb = async () => {
      await initializeDb();
    };
    initDb();
  }, [initializeDb]);

  // Función para obtener los dispositivos actualizados
  const refreshDbDispositivos = async () => {
    const items = await getItemsAsync(db);
    setDbDispositivos(items);
  };

  // Función para manejar el registro
  const handleRegister = async () => {
    if (!cedula || cedula.length < 8 || cedula.length > 15) {
      return Alert.alert("Alerta", "Por favor ingresa una cédula válida.");
    }

    if (!nombre || nombre.length < 3 || nombre.length > 10) {
      return Alert.alert("Alerta", "Por favor ingresa un alias válido.");
    }

    try {
      const url = `${APIURL.getValDispositivo()}?Cedula=${cedula}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.estado === "success") {
        await addItemAsync(db, data, nombre); // Insertar o actualizar en la base de datos
        await refreshDbDispositivos();  // Actualiza el estado de dbDispositivos
        setDataStore(data);  // Guarda en el estado local
        setCedula('');
        setNombre('');
        setPin('');
        setConfirmPin('');
        setShowForm(true);
      } else {
        Alert.alert("Error", data.message || "Usuario no encontrado o no autorizado");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al verificar los datos. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Función para validar el PIN
  const validatePin = (inputPin) => {
    const hasConsecutiveNumbers = /(\d)\1/.test(inputPin);
    const hasSequentialNumbers = /012|123|234|345|456|567|678|789/.test(inputPin);
    return !hasConsecutiveNumbers && !hasSequentialNumbers;
  }; 

  // Función para manejar el cambio en el PIN
  const handlePinChange = (inputPin) => {
    setPin(inputPin);
    setPinValid(inputPin.length === 6 && validatePin(inputPin));
  };

  // Función para manejar la confirmación del PIN
  const handleConfirmPin = (inputPin) => {
    setConfirmPin(inputPin);
  };

  // Función para crear el PIN y actualizar la base de datos
  const handleCreatePin = async () => {
    if (pin !== confirmPin) {
      return Alert.alert("Error", "Los PINs no coinciden.");
    }

    try {
      const url = APIURL.getValDispositivoImei();
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Cedula: DataStore.Cedula, KeyDispositivo: DataStore.KeyDispositivo, Pin: pin }),
      });
      const data = await response.json();

      if (data.estado === "success") {
        await updateItemAsync(db, pin);  // Actualizar el campo 'kEYdATA' en la base de datos
        navigation.reset({
          index: 0,
          routes: [{ name: 'PinConfigurado' }],
        });
      } else {
        Alert.alert("Error", data.message || "Hubo un problema al crear el PIN.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear el PIN. Inténtalo de nuevo.");
    }
  };


  /* navigation.reset({
     index: 0, // Start from the first screen in the stack
     routes: [{ name: 'PinConfigurado' }], // Navigate directly to 'Cobranza'
   });*/


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
            <Text style={styles.formSubTitle}> Versión: 2.5.0.0 </Text>
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
            <Text style={styles.formTitle}>Crear PIN {dbDispositivos[0]?.Alias}</Text>
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
