import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import Login from "../screens/Login/Login";
import { MenuTabNavigator } from "../../src/navigation/MenuTabNavigator";
import { CobranzaTabs } from "../screens/MenuCobranza/CobranzaTabs/CobranzaTabs";
import { VentasTabs } from "../screens/MenuVentas/VentasTabs/VentasTabs";
import { CreditoTabs } from "../screens/MenuCredito/CreditoTabs/CreditoTabs";
import { LocationTracker } from "../components/Location/Location";
import ResgistroDispositivo from "../screens/ResgistroDispositivo/ResgistroDispositivo";
import PinConfigurado from "../screens/PinConfigurado/PinConfigurado";
import LoginPin from "../screens/LoginPin/LoginPin";
import LocationSender from "../components/Location/LocationSender";
import { useAuth } from "../navigation/AuthContext"; // Usamos el hook de autenticación
import { useDb } from '../database/db';
import { getItemsAsync, getItemsAsyncUser } from '../database';
import { migrateDbIfNeeded } from '../database/migrations';
// Crear los navegadores de stack y tabs
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  console.log("TabNavigator rendered");
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

        <Tab.Screen
          name="CrediPoint"
          component={CreditoTabs}
          options={{ tabBarStyle: { display: "none" } }}
        />
      </Tab.Navigator>
    </>
  );
}

export function AppNavigator() {
  const { isLoggedIn, login, logout, hasRegistered, setRegistrationStatus } = useAuth();  // Obtener los valores del contexto


  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [items, setItems] = useState([]);
  const [itemsUser, setItemsUser] = useState([]);
  const { db } = useDb();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {

        await migrateDbIfNeeded(db); // Asegúrate de que las tablas estén creadas

  
        const fetchedItems = await getItemsAsync(db);
        const fetchedItemsUser = await getItemsAsyncUser(db);
        setItems(fetchedItems || []);
        setItemsUser(fetchedItemsUser || []);
  
        if (fetchedItems && fetchedItems.length > 0) {
          if (fetchedItems[0].KeyDispositivo && fetchedItems[0].kEYdATA) {
            setRegistrationStatus(true);
          } else {
            setRegistrationStatus(false);
          }
        } else {
          setRegistrationStatus(false);
        }
  
        const token = fetchedItemsUser[0]?.token;
        if (token) {
          login(); // Si hay token, el usuario está logueado
        } else {
          logout(); // Si no hay token, el usuario no está logueado
        }
      } catch (error) {
        console.error("Error checking login status or fetching  keys:", error);
      } finally {
        setIsCheckingAuth(false); // Asegúrate de que esto se ejecuta
      }
    };
  
    checkLoginStatus();
  }, [login, logout, setRegistrationStatus, db]);
  
  if (isCheckingAuth) {
    return <SplashScreen />;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Si el dispositivo está registrado, mostramos el flujo de login o la app */}
      {hasRegistered ? (
        isLoggedIn ? (
          // Registro de la pantalla Main, donde se debería mostrar TabNavigator
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="LoginStack" component={LoginStack} />
        )
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
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
    <Stack.Screen name="LoginCredenciales" component={LoginScreen} />
    <Stack.Screen name="LoginPin" component={LoginPin} />
  </Stack.Navigator>
);
