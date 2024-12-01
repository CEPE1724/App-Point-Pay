import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {RegistroScreen} from "../Screen";
import {InsertScreen} from "../Screen";
import { screen } from "../../../utils";
import { ViewProductos } from "../Screen";
const Stack = createNativeStackNavigator();

export function RegistroStack()  {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
      }}
    >
      <Stack.Screen 
        name={screen.registro.inicio} 
        component={RegistroScreen} 
        options={{ title: "Clientes" }}
      />
      
      <Stack.Screen
        name={screen.registro.insertCall}
        component={InsertScreen}
        options={{ title: "Gestión" }}
      />

     <Stack.Screen
        name={screen.registro.product} 
        component={ViewProductos}
        options={{ title: "Productos" }} 
      />
      
    </Stack.Navigator>
  );
};
