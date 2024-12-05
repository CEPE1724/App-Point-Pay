import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import { MenuTabNavigator } from "../../src/navigation/MenuTabNavigator";
import { CobranzaTabs } from "../screens/MenuCobranza/CobranzaTabs/CobranzaTabs";
import { VentasTabs } from "../screens/MenuVentas/VentasTabs/VentasTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationTracker } from "../components/Location/Location";
import ResgistroDispositivo from "../screens/ResgistroDispositivo/ResgistroDispositivo";
import PinConfigurado from "../screens/PinConfigurado/PinConfigurado";
import LoginPin from "../screens/LoginPin/LoginPin";
import Login from "../screens/Login/Login";
import LocationSender from "../components/Location/LocationSender";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Define el TabNavigator

function TabNavigator() {
  console.log("TabNavigator");
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
        <Tab.Screen
          name="Ventas"
          component={VentasTabs}
          options={{ tabBarStyle: { display: "none" } }}
        />
      </Tab.Navigator>
    </>
  );
}

export function AppNavigator() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false); // Estado para controlar el flujo de la pantalla

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const keyData = await AsyncStorage.getItem("userData");
       if (keyData) {
        const parsedKeyData = JSON.parse(keyData); // Parsear el string JSON a objeto
        // Verificar que keyDispositivo y kEYdATA existan en parsedKeyData y tengan valores válidos
        if (parsedKeyData.keyDispositivo && parsedKeyData.kEYdATA) {
          setHasRegistered(true); // Si ambos valores son válidos, marcar como registrado
        } else {
          setHasRegistered(false); // Si alguno de los dos no es válido, marcar como no registrado
        }
      } else {
        setHasRegistered(false); // Si no hay userData en el AsyncStorage, no registrado
      }
        const token = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!token); // Establecer el estado de inicio de sesión
      } catch (error) {
        console.error("Error checking login status or fetching AsyncStorage keys:", error);
      } finally {
        setIsCheckingAuth(false); // Indica que la verificación ha terminado
      }
    };
    checkLoginStatus(); // Iniciar la verificación sin retraso fijo
  }, []);

  if (isCheckingAuth) {
    return <SplashScreen />; // Mostrar pantalla de carga mientras verificamos
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : hasRegistered ? (
        <Stack.Screen name="LoginStack" component={LoginStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RegistroDispositivo" component={ResgistroDispositivo} />
    <Stack.Screen name="PinConfigurado" component={PinConfigurado} />

  </Stack.Navigator>
);

const LoginStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="LoginPin" component={LoginPin} />
    <Stack.Screen name="LoginCredenciales" component={LoginScreen} />
  </Stack.Navigator>
);
