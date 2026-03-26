import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles, C } from '../EstadoIngreso.Style';

function DetailRow({ item, index, onPress }) {
  return (
    <View style={[styles.detailRow, index % 2 !== 0 && styles.detailRowAlt]}>
      <TouchableOpacity
        onPress={onPress}
        style={{ paddingHorizontal: 10, justifyContent: 'center', width: 50 }}
        activeOpacity={0.6}
      >
        <Icon name="eye" size={14} color={C.accent} />
      </TouchableOpacity>
      <Text style={[styles.detailCell, styles.dColFecha]}>{item.fecha}</Text>
      <Text style={[styles.detailCell, styles.dColFecha]}>{item.hora}</Text>
      <Text style={[styles.detailCell, styles.dColBodega]}>{item.bodega}</Text>
      <Text style={[styles.detailCell, styles.dColEstado]}>{item.estado}</Text>
      <Text style={[styles.detailCell, styles.dColResponsable]}>{item.responsable}</Text>
      <Text style={[styles.detailCell, styles.dColNotas]} numberOfLines={3}>{item.notas}</Text>
    </View>
  );
}

export function DetailPanel({ selected, movimientos, loadingDetalle, onOpenMovement }) {
  if (!selected) {
    return (
      <View style={[styles.detailContainer, { borderColor: C.border }]}>
        <View style={[styles.detailHeader, { backgroundColor: C.navy }]}>
          <Icon name="hand-o-up" size={14} color="#FFF" />
          <Text style={styles.detailHeaderTitle}>Panel de detalle</Text>
        </View>
        <View style={styles.emptyDetail}>
          <Icon name="mouse-pointer" size={22} color={C.textMuted} />
          <Text style={styles.emptyDetailText}>Seleccione un registro</Text>
          <Text style={styles.emptyDetailSub}>Toque una fila para ver sus movimientos</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <Text style={styles.sectionLabel}>Movimientos del registro</Text>
      <View style={styles.detailContainer}>
        <View style={styles.detailHeader}>
          <Icon name="list-alt" size={14} color="#FFF" />
          <Text style={styles.detailHeaderTitle}>{selected.cliente}</Text>
          <Text style={styles.detailHeaderSub}>{selected.stockCliente}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.detailTableHeaderRow}>
              <Text style={[styles.detailTableHeaderCell, { width: 50 }]}>Ver</Text>
              <Text style={[styles.detailTableHeaderCell, styles.dColFecha]}>Fecha</Text>
              <Text style={[styles.detailTableHeaderCell, styles.dColFecha]}>Hora</Text>
              <Text style={[styles.detailTableHeaderCell, styles.dColBodega]}>Bodega</Text>
              <Text style={[styles.detailTableHeaderCell, styles.dColEstado]}>Estado</Text>
              <Text style={[styles.detailTableHeaderCell, styles.dColResponsable]}>Responsable</Text>
              <Text style={[styles.detailTableHeaderCell, styles.dColNotas]}>Notas</Text>
            </View>
            {loadingDetalle ? (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <ActivityIndicator size="small" color={C.accent} />
              </View>
            ) : movimientos.length === 0 ? (
              <View style={styles.emptyDetail}>
                <Icon name="folder-open-o" size={22} color={C.textMuted} />
                <Text style={styles.emptyDetailText}>Sin movimientos registrados</Text>
                <Text style={styles.emptyDetailSub}>Este ingreso no tiene historial</Text>
              </View>
            ) : (
              movimientos.map((m, i) => (
                <DetailRow
                  key={i}
                  item={m}
                  index={i}
                  onPress={() => onOpenMovement(m)}
                />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
