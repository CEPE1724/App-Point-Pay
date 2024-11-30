import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Menu} from "../screens/Menu";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function MenuTabStack()  {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={screen.menu.inicio} 
        component={Menu} 
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
