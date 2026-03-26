import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HolaMundo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hola Mundo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  text: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
});
