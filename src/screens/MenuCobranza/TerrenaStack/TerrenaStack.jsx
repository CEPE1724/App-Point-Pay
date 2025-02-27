import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientesScreen } from "../Screen";
import { VerificacionCliente } from  "../Screen";
import { VerificacionClienteSearch } from "../Screen";
import { GoogleMaps } from "../Screen";
import {HeaderRight} from '../../../components';
import { useDb } from '../../../database/db'; // Importa la base de datos
import { screen } from "../../../utils";

const Stack = createNativeStackNavigator();

export function TerrenaStack()  {
   const { db } = useDb(); // Obtén la base de datos para pasársela al HeaderRight
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
        headerRight: () => <HeaderRight db={db} />, // Usa el componente HeaderRight y pásale la base de datos
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
      <Stack.Screen
        name={screen.terreno.maps}
        component={GoogleMaps}
        options={{ title: "Google Maps" }}
      />
    
    </Stack.Navigator>
  );
};
