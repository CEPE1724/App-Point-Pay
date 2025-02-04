import React from "react";
import { NetworkProvider } from './src/utils/NetworkProvider';
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { AuthProvider } from './src/navigation/AuthContext';
import { SQLiteProvider } from 'expo-sqlite'; // Asegúrate de importar SQLiteProvider
import DatabaseInitializer from './src/database/DatabaseInitializer'; // Asegúrate de importar DatabaseInitializer
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <SQLiteProvider databaseName="db.db">
      <AuthProvider>
        <NetworkProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </NetworkProvider>
      </AuthProvider>
      <DatabaseInitializer />
      <Toast />
    </SQLiteProvider>
  );
}
