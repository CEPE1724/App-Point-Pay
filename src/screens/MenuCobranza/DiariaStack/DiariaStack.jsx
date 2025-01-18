import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Calendario} from "../Screen";
import {GestionCalendario} from "../Screen";
import { screen } from "../../../utils";

const Stack = createNativeStackNavigator();

export function DiariaStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.gestionDiaria.inicio} 
        component={Calendario} 
        options={{ title: "Inicio" }}
      />
      <Stack.Screen 
        name={screen.gestionDiaria.diaria} 
        component={GestionCalendario} 
        options={{ title: "Diaria" }}
      />
    </Stack.Navigator>
  );
};
