import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { styles, C } from '../EstadoIngreso.Style';

function MovementCard({ item }) {
  return (
    <View style={styles.movementCard}>
      <View style={styles.movementCardHeader}>
        <Text style={styles.movementCardFecha}>{item.fecha}</Text>
        <View style={styles.movementCardBadge}>
          <Text style={styles.movementCardBadgeText}>{item.estado}</Text>
        </View>
      </View>
      <View style={styles.movementCardRow}>
        <Text style={styles.movementCardLabel}>Hora</Text>
        <Text style={styles.movementCardValue}>{item.hora}</Text>
      </View>
      <View style={styles.movementCardRow}>
        <Text style={styles.movementCardLabel}>Bodega</Text>
        <Text style={styles.movementCardValue}>{item.bodega}</Text>
      </View>
      <View style={styles.movementCardRow}>
        <Text style={styles.movementCardLabel}>Responsable</Text>
        <Text style={styles.movementCardValue}>{item.responsable}</Text>
      </View>
      {item.notas && (
        <View style={styles.movementCardNotes}>
          <Text style={styles.movementCardNotesLabel}>Notas</Text>
          <Text style={styles.movementCardNotesText}>{item.notas}</Text>
        </View>
      )}
    </View>
  );
}

export function MovementModal({ visible, movement, selected, onClose }) {
  if (!movement) return null;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>📋 Detalles del movimiento</Text>
            <Text style={styles.modalSubtitle}>
              {selected?.cliente} • {selected?.stockCliente}
            </Text>
          </View>
          <ScrollView style={styles.modalList}>
            <MovementCard item={movement} />
          </ScrollView>
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={onClose}
            activeOpacity={0.75}
          >
            <Text style={styles.modalCloseBtnText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
