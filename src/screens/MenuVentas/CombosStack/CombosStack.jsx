import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {CombosBaratazos} from "../Screen";
import {DetalleCombos} from "../Screen";
import { screen } from "../../../utils";

const Stack = createNativeStackNavigator();

export function CombosStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.menuVentas.inicio} 
        component={CombosBaratazos} 
        options={{ title: "Promociones" }}
      />

      <Stack.Screen
        name={screen.menuVentas.detallecombos}
        component={DetalleCombos}
        options={{ title: "Detalle Combos" }}
      />
    </Stack.Navigator>
  );
};
