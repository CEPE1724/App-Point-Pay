import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {SolicitudCreditoScreen } from "../Screen";
import { screen } from "../../../utils";

const Stack = createNativeStackNavigator();

export function CreditoStack()  {

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.menuCredito.inicio} 
        component={SolicitudCreditoScreen} 
        options={{ title: "Inventario" }}
      />
    </Stack.Navigator>
  );
};
