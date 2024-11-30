import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Importa el TabNavigator
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import { MenuTabNavigator } from "../../src/navigation/MenuTabNavigator";
import { CobranzaTabs } from "../screens/MenuCobranza/CobranzaTabs/CobranzaTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationTracker } from "../components/Location/Location";
import LocationSender from "../components/Location/LocationSender";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Define el TabNavigator

// Definir las pantallas dentro del TabNavigator
function TabNavigator() {
  return (
    <>
     <LocationSender />
     <LocationTracker />
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="MenuTabs"
        component={MenuTabNavigator}
        options={{ tabBarStyle: { display: "none" } }}
      />
      <Tab.Screen
        name="Cobranza"
        component={CobranzaTabs}
        options={{ tabBarStyle: { display: "none" } }}
      />
    </Tab.Navigator>
    </>
  );
}

export function AppNavigator() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!token); // Cambia esto según el estado real de autenticación
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsCheckingAuth(false); // Indica que la verificación ha terminado
      }
    };

    checkLoginStatus(); // Iniciar la verificación sin retraso fijo

  }, []);

  if (isCheckingAuth) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Main" component={TabNavigator} />
  </Stack.Navigator>
);
