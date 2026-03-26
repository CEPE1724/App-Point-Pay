import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { styles, C } from '../EstadoIngreso.Style';

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.movementCardRow}>
      <Text style={styles.movementCardLabel}>{label}</Text>
      <Text style={[styles.movementCardValue, { flex: 1, textAlign: 'right' }]}>{value}</Text>
    </View>
  );
}

function IngresoCard({ item }) {
  return (
    <View style={[styles.movementCard, { borderLeftColor: item.estadoColor?.bg ?? C.accent }]}>
      {/* Estado header */}
      <View style={styles.movementCardHeader}>
        <Text style={[styles.movementCardFecha, { color: C.navyDark }]}>{item.cliente}</Text>
        <View style={[styles.movementCardBadge, { backgroundColor: item.estadoColor?.bg ?? C.accentLight }]}>
          <Text style={[styles.movementCardBadgeText, { color: item.estadoColor?.text ?? C.accent }]}>
            {item.estado}
          </Text>
        </View>
      </View>
      <InfoRow label="N° Ingreso"   value={item.stockCliente} />
      <InfoRow label="Origen"       value={item.origen} />
      <InfoRow label="Fecha"        value={item.fecha} />
      <InfoRow label="RUC / CI"     value={item.ruc} />
      <InfoRow label="Técnico"      value={item.tecnico} />
      <InfoRow label="Código"       value={item.codigo} />
      <InfoRow label="Serial" value={item.serial} />
      {item.detalle && (
        <View style={styles.movementCardNotes}>
          <Text style={styles.movementCardNotesLabel}>Detalle</Text>
          <Text style={styles.movementCardNotesText}>{item.detalle}</Text>
        </View>
      )}
      {item.daño && (
        <View style={[styles.movementCardNotes, { borderLeftColor: '#DC2626', borderLeftWidth: 3, paddingLeft: 8 }]}>
          <Text style={[styles.movementCardNotesLabel, { color: '#DC2626' }]}>Daño</Text>
          <Text style={styles.movementCardNotesText}>{item.daño}</Text>
        </View>
      )}
    </View>
  );
}

export function IngresoModal({ visible, ingreso, onClose }) {
  if (!ingreso) return null;
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
            <Text style={styles.modalTitle}>📦 Detalles del ingreso</Text>
            <Text style={styles.modalSubtitle}>
              {ingreso.cliente} • {ingreso.stockCliente}
            </Text>
          </View>
          <ScrollView style={styles.modalList}>
            <IngresoCard item={ingreso} />
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
