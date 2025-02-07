import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Menu } from "../screens/Menu";
import { screen } from "../utils";
import { MenuNotificacion } from "../screens/MenuNotificacion";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de que Ionicons esté disponible
import { ArrowLeft } from '../Icons'; // Asegúrate de que los iconos estén disponibles
const Stack = createNativeStackNavigator();

export function MenuTabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={screen.menu.inicio} 
        component={Menu} 
        options={{ headerShown: false }} // No mostrar header en la pantalla de inicio
      />
      <Stack.Screen 
        name={screen.menu.notificaciones} 
        component={MenuNotificacion} 
        options={({ navigation }) => ({
          title: ' Notificaciones', // Título de la pantalla
          headerLeft: () => (
            <TouchableOpacity onPressIn={() => navigation.goBack()}>
              <ArrowLeft  size={19} color="black" />
            </TouchableOpacity>
          ),
          headerShown: true, // Asegúrate de que el encabezado esté habilitado en esta pantalla
        })} 
      />
    </Stack.Navigator>
  );
};
