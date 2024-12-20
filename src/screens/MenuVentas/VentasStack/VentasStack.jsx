import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {InventarioScreen} from "../Screen";
import { screen } from "../../../utils";

const Stack = createNativeStackNavigator();

export function VentasStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.menuVentas.inicio} 
        component={InventarioScreen} 
        options={{ title: "Inventario" }}
      />
    </Stack.Navigator>
  );
};
