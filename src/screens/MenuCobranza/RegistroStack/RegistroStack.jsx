// RegistroStack.js
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistroScreen } from "../Screen";
import { InsertScreen } from "../Screen";
import { ViewGestiones } from "../Screen";
import { screen } from "../../../utils";
import { ViewProductos } from "../Screen";
import { TablaAmortizacion } from "../Screen";
import {ViewReferencias} from "../Screen";
import {ViewEquifax} from "../Screen";
import {HeaderRight} from '../../../components';
import { useDb } from '../../../database/db'; // Importa la base de datos

const Stack = createNativeStackNavigator();

export function RegistroStack() {
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
      <Stack.Screen
        name={screen.registro.viewGestiones}
        component={ViewGestiones}
        options={{ title: "Últimas Gestiones" }}
      />
      <Stack.Screen
        name={screen.registro.TablaAmortizacion}
        component={TablaAmortizacion}
        options={{ title: "Tabla de Amortización" }}
      />
      <Stack.Screen
        name={screen.registro.viewReferencias}
        component={ViewReferencias}
        options={{ title: "Referencias" }}
      />
      <Stack.Screen
        name={screen.registro.GpsEquifax}
        component={ViewEquifax}
        options={{ title: "Ubicación Equifax" }}
      />
    </Stack.Navigator>
  );
}
