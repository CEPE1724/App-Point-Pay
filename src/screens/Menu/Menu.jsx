import { styles } from "./Menu.Style";
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importamos useNavigation
import { Storage, Location, Exit } from '../../Icons';
import LogoCobranza from '../../../assets/PontyDollar.png';
import LogoVentas from '../../../assets/PointVentas.png';
import logo from '../../../assets/Point.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from '../../Icons';
import { useAuth } from '../../navigation/AuthContext'; // Importamos el contexto

export function Menu({ navigation }) {
  const { logout } = useAuth(); // Usamos el contexto de autenticación
  const [permisosMenu, setPermisosMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la información del usuario desde AsyncStorage
        const userInfo = await AsyncStorage.getItem("userInfo");

        if (userInfo) {
          // Convertir la cadena JSON a un objeto JavaScript
          const parsedUserInfo = JSON.parse(userInfo);
          
          // Acceder a permisosMenu dentro del objeto parsedUserInfo
          console.log("Permisos Menu:", parsedUserInfo.permisosMenu);

          // Guardar permisosMenu en el estado
          setPermisosMenu(parsedUserInfo.permisosMenu);
        } else {
          console.log("No user info found in AsyncStorage");
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  const salir = async () => {
    //await removeSpecificItems(); // Limpiar datos del usuario en AsyncStorage
    logout(); // Ejecutamos el logout del contexto
  };

 
  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={[styles.image, { width: 150, height: 60, marginBottom: 20 }]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Versión: </Text>

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
