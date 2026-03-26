import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {EstadoIngreso} from "../Screen";
import {GestionCalendario} from "../Screen";
import { screen } from "../../../utils";
import {HeaderRight} from '../../../components';
import { useDb } from '../../../database/db'; // Importa la base de datos

const Stack = createNativeStackNavigator();

export function ServicioTecnicoStack()  {
   const { db } = useDb(); // Obtén la base de datos para pasársela al HeaderRight
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1c2463' }, // Color de fondo verde
        headerTintColor: '#ffffff', // Color de la letra blanco
         headerRight: () => <HeaderRight db={db} />,
      }}
    >
      <Stack.Screen 
        name={screen.menuServicioTecnico.inicio}
        component={EstadoIngreso} 
        options={{ title: "Estado Ingresos" }}
      />
      <Stack.Screen 
        name={screen.menuServicioTecnico.insert}
        component={GestionCalendario} 
        options={{ title: "Diaria" }}
      />
    </Stack.Navigator>
  );
};
