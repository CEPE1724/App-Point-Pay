import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashBoard } from "../Screen";
import { screen } from "../../../utils";
import { TouchableOpacity, Alert } from "react-native";
import { Info, Wifi, WifiOff } from "../../../Icons";
import { useNetworkStatus } from "../../../utils/NetworkProvider"; // Usamos el contexto de red

const Stack = createNativeStackNavigator();

export function CobranzaStack() {
  // Función para mostrar la alerta
  const isConnected = useNetworkStatus(); // Obtenemos el estado de la conexión

  const showAlert = () => {
    Alert.alert("Información", "Este es un mensaje de información.");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo
        headerTintColor: '#ffffff', // Color del texto
      }}
    >
      <Stack.Screen
        name={screen.drive.inicio}
        component={DashBoard}
        options={{
          title: "Inicio",
          headerRight: () => (
            <TouchableOpacity onPress={showAlert} style={{ marginRight: 10 }}>
              {isConnected ? (
                <Wifi size={20} color="white" /> // Verde brillante para conexión activa
              ) : (
                <WifiOff size={20} color="white" /> // Verde brillante para conexión activa
              )}
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
