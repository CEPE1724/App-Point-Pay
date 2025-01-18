import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CobranzaStack } from '../CobranzaStack';
import { RegistroStack } from '../RegistroStack';
import { ExitCobranzaStack } from '../ExitCobranzaStack';
import { TerrenaStack } from "../TerrenaStack";
import {DiariaStack} from "../DiariaStack";
import { screen } from "../../../utils";
import { CircleInfoIcon, Home, Book, Terrain, CalendarToday, AccountCircle} from "../../../Icons"; // Verifica que este icono esté importado correctamente

const Tab = createBottomTabNavigator();

export function CobranzaTabs() {
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
                name={screen.drive.tab}
                component={CobranzaStack}
                options={{ title: "Inicio" }}
            />
            <Tab.Screen
                name={screen.registro.tab}
                component={RegistroStack}
                options={{ title: "Registros" }}
            />
            <Tab.Screen
                name={screen.gestionDiaria.tab}
                component={DiariaStack}
                options={{ title: "Gestión Diaria" }}
            />
            <Tab.Screen
                name={screen.terreno.tab}
                component={TerrenaStack}
                options={{ title: "Terreno" }}
            />
            <Tab.Screen
                name={screen.home.tab}
                component={ExitCobranzaStack}
                options={{
                    tabBarStyle: { display: "none" },
                    title: "Cuenta",
                }}
            />
        </Tab.Navigator>
    );
}

function renderIcon(route, color, size, focused) {
    let IconComponent = CircleInfoIcon; // Solo tienes un ícono en el ejemplo
    if(route.name === screen.home.tab) {
        IconComponent = AccountCircle ;
    }
    if(route.name === screen.drive.tab) {
        IconComponent = Home;
    }
    if(route.name === screen.registro.tab) {
        IconComponent = Book ;
    }
    if(route.name === screen.terreno.tab) {
        IconComponent = Terrain;
    }
    if(route.name === screen.gestionDiaria.tab) {
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
        case screen.home.tab:
            return "Cuenta";
        case screen.drive.tab:
            return "Inicio";
        case screen.registro.tab:
            return "Registros";
        case screen.terreno.tab:
            return "Terreno";
        case screen.gestionDiaria.tab:
            return "Diaria";
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
