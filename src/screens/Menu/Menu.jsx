import { styles } from "./Menu.Style";
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {  Location, Exit } from '../../Icons';
import LogoCobranza from '../../../assets/PontyDollar.png';
import LogoVentas from '../../../assets/PointVentas.png';
import logo from '../../../assets/Point.png';
import { User } from '../../Icons';
import { useAuth } from '../../navigation/AuthContext'; // Importamos el contexto de autenticación
import { useDb } from '../../database/db';
import { getItemsAsyncMenu } from '../../database';

export function Menu({ navigation }) {
  const { logout } = useAuth(); // Usamos el contexto de autenticación
  const [permisosMenu, setPermisosMenu] = useState([]);
  const { db } = useDb();
  const [dbMenu, setDbMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la información del menú desde la base de datos
        const items = await getItemsAsyncMenu(db);
        console.log('Permisos del menú:', items);

        // Filtramos para obtener solo los valores de 'Menu' relevantes (1 para Cobranza y 2 para Ventas)
        const menuPermissions = items.map(item => item.Menu);
        setPermisosMenu(menuPermissions); // Guardar los permisos en el estado
      } catch (error) {
        console.error('Error fetching data from :', error);
      }
    };

    fetchData();
  }, [db]);

  const salir = async () => {
    // Ejecuta el logout del contexto
    logout();
  };
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={[styles.image, { width: 150, height: 60, marginBottom: 20 }]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Versión: 2.4.1.0 </Text>

      <View style={styles.cardContainer}>
        {/* Condicional para mostrar "Cobranza" si permisosMenu incluye el valor 1 */}
        {permisosMenu.includes(1) && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Cobranza')}
          >
            <Image source={LogoCobranza} style={{ width: 70, height: 50 }} />
            <Text style={styles.cardTitle}>Cobranza</Text>
          </TouchableOpacity>
        )}

        {/* Condicional para mostrar "Ventas" si permisosMenu incluye el valor 2 */}
        {permisosMenu.includes(2) && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Ventas')}
          >
            <Image source={LogoVentas} style={{ width: 70, height: 50 }} />
            <Text style={styles.cardTitle}>Ventas</Text>
          </TouchableOpacity>
        )}

        {/* Si no tiene permisos para Cobranza ni para Ventas, muestra un mensaje */}
        {(!permisosMenu.includes(1) && !permisosMenu.includes(2)) && (
          <View style={styles.errorContainer}>
            <User size={50} color="#fff" />
            <Text style={styles.errorMessage}>
              No tienes permisos para acceder a ninguna sección.
            </Text>
            <Text style={styles.errorMessage}>
              Comuníquese con el administrador Ext. 803 - EC
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.title}>Cuida tus credenciales, no las compartas con nadie.</Text>

      <View style={styles.cardContainerLoc}>
        <TouchableOpacity
          style={styles.cardLoc}
        >
          <Location size={40} color="#2066a4" />
          <Text style={styles.cardTitleLoc}>Ubicanos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardLoc}
          onPress={salir} // Ejecuta logout y redirige
        >
          <Exit size={40} color="#2066a4" />
          <Text style={styles.cardTitleLoc}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
