

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Dimensions } from 'react-native';


export default function SplashScreen() {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Image
       source={require('../../../assets/ponty.png')}
        style={[styles.image, { width, height: height * 0.4 }]}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#022b58',
  },
  image: {
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
  },
});
