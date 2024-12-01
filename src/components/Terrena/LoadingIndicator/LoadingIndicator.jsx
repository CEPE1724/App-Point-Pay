import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Modal } from 'react-native';

export function LoadingIndicator({ visible }) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Cargando, por favor espera...</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 248, 248, 0.7)', // Fondo semitransparente
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
