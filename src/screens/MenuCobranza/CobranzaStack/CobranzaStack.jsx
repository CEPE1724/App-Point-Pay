import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {DashBoard} from "../Screen";
import { screen } from "../../../utils";

const Stack = createNativeStackNavigator();

export function CobranzaStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.drive.inicio} 
        component={DashBoard} 
        options={{ title: "Inicio" }}
      />
    </Stack.Navigator>
  );
};
