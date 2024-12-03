import { styles } from "./Menu.Style";
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importamos useNavigation
import { Storage, Location, Exit } from '../../Icons';
import LogoCobranza from '../../../assets/PontyDollar.png';
import LogoVentas from '../../../assets/PointVentas.png';
import logo from '../../../assets/Point.png';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Menu({ navigation }) {



const salir = () => {
  removeSpecificItems();
  navigation.replace('Login');


};

const removeSpecificItems = async () => {
  try {
    // List of keys to remove
    const keysToRemove = ["userId", "userInfo", "userName", "userToken"];
    
    // Loop through the keys and remove each item
    for (let key of keysToRemove) {
      await AsyncStorage.removeItem(key);
    }
    
    // Optionally, log the remaining keys to confirm removal
    const remainingKeys = await AsyncStorage.getAllKeys();

  } catch (error) {
    console.error('Error removing items from AsyncStorage:', error);
  }
};

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={[styles.image, { width: 150, height: 60, marginBottom: 20 }]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Version: 1.0.0.1</Text>

      <View style={styles.cardContainer}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Cobranza')}
        >
          <Image source={LogoCobranza} style={{ width: 70, height: 50 }} />
          <Text style={styles.cardTitle}>Cobranza</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Ventas')}
        >
          <Image source={LogoVentas} style={{ width: 70, height: 50 }} />
          <Text style={styles.cardTitle}>Ventas</Text>
        </TouchableOpacity>
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
          onPress={salir}

        >
          <Exit size={40} color="#2066a4" />
          <Text style={styles.cardTitleLoc}>Salir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
