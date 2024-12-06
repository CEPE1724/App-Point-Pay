import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientesScreen } from "../Screen";
import { VerificacionCliente } from  "../Screen";
import { VerificacionClienteSearch } from "../Screen";


import { screen } from "../../../utils";

const Stack = createNativeStackNavigator();

export function TerrenaStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.terreno.inicio} 
        component={ClientesScreen} 
        options={{ title: "Inicio" }}
      />
      <Stack.Screen
        name={screen.terreno.insert}
        component={VerificacionCliente}
        options={{ title: "Verificación Cliente" }}
      />
      <Stack.Screen
        name={screen.terreno.search}
        component={VerificacionClienteSearch}
        options={{ title: "Verificación Cliente" }}
      />
    
    </Stack.Navigator>
  );
};
