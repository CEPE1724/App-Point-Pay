import React from "react";
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { NetworkProvider } from './src/utils/NetworkProvider';
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator"; // Asegúrate de que la ruta sea correcta
import { AuthProvider } from './src/navigation/AuthContext'; // Importa el AuthContext

export default function App() {
  return (
    <>
      <AuthProvider>
        <NetworkProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </NetworkProvider>
      </AuthProvider>
      <Toast  />
    </>
  );
}
