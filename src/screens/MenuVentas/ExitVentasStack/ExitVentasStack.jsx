import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ExitVenta} from "../Screen";
import { screen } from "../../../utils";
const Stack = createNativeStackNavigator();

export function ExitVentasStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.menuVentas.salir} 
        component={ExitVenta} 
        options={{ title: "Cuenta" }}
      />      
    </Stack.Navigator>
  );
};
