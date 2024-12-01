import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ExitCobranza} from "../Screen";
import { screen } from "../../../utils";
const Stack = createNativeStackNavigator();

export function ExitCobranzaStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.home.inicio} 
        component={ExitCobranza} 
        options={{ title: "Cuenta" }}
      />      
    </Stack.Navigator>
  );
};
