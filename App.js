import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator"; // Asegúrate de que la ruta sea correcta
import { AuthProvider } from './src/navigation/AuthContext'; // Importa el AuthContext
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
