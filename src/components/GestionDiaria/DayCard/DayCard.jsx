import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './DayCard.Style';
export function DayCard({ day, isCurrent, gestionado, total, onPress }) {
  const currentDate = new Date();
  const cardColor = getCardColor(day, currentDate.getDate());
  const NoGestionado = total - gestionado;
  const isTouchable = total > 0; 
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: cardColor }]} 
      onPress={isTouchable ? onPress : null} 
      disabled={!isTouchable} 
    >
      <View style={styles.cardContent}>
        <Text style={styles.dayText}>{day}</Text>
        <FontAwesome name="calendar" size={24} color="#fff" />

        <View style={styles.infoContainer}>
          <FontAwesome name="user-circle" size={16} color="#fff" />
          <Text style={styles.totalText}>{`N° Gestiones: ${total}`}</Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesome name="check-circle" size={16} color="green" />
          <Text style={styles.gestionadoText}>{`Gestionados: ${gestionado}`}</Text>
        </View>

        <View style={styles.infoContainer}>
          <FontAwesome name="exclamation-circle" size={16} color="red" />
          <Text style={styles.gestionadoText}>{`Sin Gestionar: ${NoGestionado}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getCardColor = (day, currentDay) => {
  if (day < currentDay) {
    return '#d1d1d1'; // Color for past days
  } else if (day === currentDay) {
    return '#4CAF50'; // Color for current day
  } else {
    return '#2196F3'; // Color for future days
  }
};
