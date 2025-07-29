import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ExitCredito} from "../Screen";
import { screen } from "../../../utils";
const Stack = createNativeStackNavigator();

export function ExitCreditoStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.menuCredito.salir} 
        component={ExitCredito} 
        options={{ title: "Cuenta" }}
      />      
    </Stack.Navigator>
  );
};
