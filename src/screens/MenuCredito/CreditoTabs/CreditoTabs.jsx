import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreditoStack } from "../CreditoStack";
import { ExitCredito } from "../Screen";
import { screen } from "../../../utils";
import { CircleInfoIcon, Home, shoppingSearch, shoppingSale, CalendarToday, AccountCircle} from "../../../Icons"; // Verifica que este icono esté importado correctamente

const Tab = createBottomTabNavigator();

export function CreditoTabs() {
    console.log("CreditoTabs rendered ebc");
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
                name={screen.menuCredito.inicio}
                component={CreditoStack}
                options={{ title: "Inventario" }}
            />
             
            <Tab.Screen
                name={screen.menuCredito.salir}
                component={ExitCredito}
                options={{ title: "Cuenta" }}
            />
          
        </Tab.Navigator>
    );
}

function renderIcon(route, color, size, focused) {
    let IconComponent = CircleInfoIcon; // Solo tienes un ícono en el ejemplo
    if(route.name === screen.menuCredito.salir) {
        IconComponent = AccountCircle ;
    }
    if(route.name === screen.menuCredito.tab) {
        IconComponent = Home;
    }
    if(route.name === screen.menuCredito.inicio) {
        IconComponent = shoppingSearch ;
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
        case screen.menuCredito.tab:
            return "Inicio";
        case screen.menuCredito.inicio:
            return "Inventario";
        case screen.menuCredito.salir:
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
