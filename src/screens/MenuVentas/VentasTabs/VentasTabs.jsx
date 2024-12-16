import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { VentasStack } from '../VentasStack';
import { ExitVentasStack } from '../ExitVentasStack';
import {CombosStack} from "../CombosStack"; // Verifica que este import esté correctamente
import { screen } from "../../../utils";
import { CircleInfoIcon, Home, Book, Terrain, CalendarToday, AccountCircle} from "../../../Icons"; // Verifica que este icono esté importado correctamente

const Tab = createBottomTabNavigator();

export function VentasTabs() {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#ffffff",
                tabBarInactiveTintColor: "#ffffff",
                tabBarStyle: {
                    display: isKeyboardVisible ? "none" : "flex", // Ocultar el tab bar si el teclado está visible
                    backgroundColor: "#1c2463",
                    borderTopWidth: 0,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    overflow: "hidden",
                },
                tabBarIcon: ({ color, size, focused }) =>
                    renderIcon(route, color, size, focused),
                tabBarLabel: ({ focused }) =>
                    focused ? <Text style={styles.label}>{renderLabel(route)}</Text> : null,
            })}
        >
            <Tab.Screen
                name={screen.menuVentas.inicio}
                component={VentasStack}
                options={{ title: "Productos" }}
            />
             <Tab.Screen
               name = {screen.menuVentas.combos}
                component = {CombosStack}
                options = {{title: "Combos"}}
            />
            <Tab.Screen
                name={screen.menuVentas.salir}
                component={ExitVentasStack}
                options={{ title: "Cuenta" }}
            />
          
        </Tab.Navigator>
    );
}

function renderIcon(route, color, size, focused) {
    let IconComponent = CircleInfoIcon; // Solo tienes un ícono en el ejemplo
    if(route.name === screen.menuVentas.salir) {
        IconComponent = AccountCircle ;
    }
    if(route.name === screen.menuVentas.tab) {
        IconComponent = Home;
    }
    if(route.name === screen.menuVentas.inicio) {
        IconComponent = Book ;
    }
    if(route.name === screen.menuVentas.combos) {
        IconComponent = CalendarToday ;
    }
  

    return (
        <View
            style={[
                styles.iconContainer,
                { backgroundColor: focused ? "#de2317" : "transparent" },
            ]}
        >
            <IconComponent
                size={size}  // Tamaño del icono
                color={focused ? "#ffffff" : color}  // Color del icono
            />
        </View>
    );
}

function renderLabel(route) {
    switch (route.name) {
        case screen.menuVentas.tab:
            return "Inicio";
        case screen.menuVentas.inicio:
            return "Productos";
        case screen.menuVentas.combos:
            return "Combos";
        case screen.menuVentas.salir:
            return "Cuenta";
        default:
            return "";
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 50,
        height: 70,
        borderRadius: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: "#ffffff",
        fontSize: 12,
    },
});
