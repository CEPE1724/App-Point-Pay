import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Calendario} from "../Screen";
import {GestionCalendario} from "../Screen";
import { screen } from "../../../utils";
import {HeaderRight} from '../../../components';
import { useDb } from '../../../database/db'; // Importa la base de datos

const Stack = createNativeStackNavigator();

export function DiariaStack()  {
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
