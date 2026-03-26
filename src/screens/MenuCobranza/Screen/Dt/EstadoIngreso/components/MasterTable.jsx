import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles, C } from '../EstadoIngreso.Style';
import { IngresoModal } from './IngresoModal';

function MasterRow({ item, index, isSelected, onPress, onOpenIngreso }) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[
        styles.tableRow,
        index % 2 !== 0 && styles.tableRowAlt,
        isSelected && styles.tableRowSelected,
      ]}
    >
      {/* Lupa */}
      <TouchableOpacity
        onPress={() => onOpenIngreso(item)}
        style={{ width: 50, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}
        activeOpacity={0.6}
        hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
      >
        <Icon name="search" size={14} color={C.accent} />
      </TouchableOpacity>
      <View style={[styles.colEstado, { paddingHorizontal: 10 }]}>
        <View style={[styles.statusPill, { backgroundColor: item.estadoColor.bg }]}>
          <Text style={[styles.statusPillText, { color: item.estadoColor.text }]}>
            {item.estado}
          </Text>
        </View>
      </View>
      <Text style={[styles.tableCell, styles.colOrigen, styles.tableCellMuted]}>{item.origen}</Text>
      <Text style={[styles.tableCell, styles.colCliente]}>{item.stockCliente}</Text>
      <Text style={[styles.tableCell, styles.colFecha, styles.tableCellMuted]}>{item.fecha}</Text>
      <Text style={[styles.tableCell, styles.colRuc, styles.tableCellMuted]}>{item.ruc}</Text>
      <Text style={[styles.tableCell, styles.colNombre]} numberOfLines={1}>{item.cliente}</Text>
      <Text style={[styles.tableCell, styles.colTecnico]} numberOfLines={1}>{item.tecnico}</Text>
      <Text style={[styles.tableCell, styles.colCodigo, styles.tableCellMuted]} numberOfLines={1}>{item.codigo}</Text>
      <Text style={[styles.tableCell, styles.colDetalle]} numberOfLines={2}>{item.detalle}</Text>
      <Text style={[styles.tableCell, styles.colSerial, styles.tableCellMuted]} numberOfLines={1}>{item.serial}</Text>
      <Text style={[styles.tableCell, styles.colDano]} numberOfLines={2}>{item.daño}</Text>
    </TouchableOpacity>
  );
}

export function MasterTable({ filtered, selected, onSelect }) {
  const [selectedIngreso, setSelectedIngreso] = useState(null);
  const [showIngresoModal, setShowIngresoModal] = useState(false);

  function handleOpenIngreso(item) {
    setSelectedIngreso(item);
    setShowIngresoModal(true);
  }

  function handleCloseIngreso() {
    setShowIngresoModal(false);
    setSelectedIngreso(null);
  }

  return (
    <>
      <Text style={styles.sectionLabel}>Lista maestra</Text>
      <View style={styles.tableWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.tableHeaderCell, { width: 50 }]}>Ver</Text>
              <Text style={[styles.tableHeaderCell, styles.colEstado]}>Estado</Text>
              <Text style={[styles.tableHeaderCell, styles.colOrigen]}>Origen</Text>
              <Text style={[styles.tableHeaderCell, styles.colCliente]}>N° Ingreso</Text>
              <Text style={[styles.tableHeaderCell, styles.colFecha]}>Fecha</Text>
              <Text style={[styles.tableHeaderCell, styles.colRuc]}>RUC / CI</Text>
              <Text style={[styles.tableHeaderCell, styles.colNombre]}>Cliente</Text>
              <Text style={[styles.tableHeaderCell, styles.colTecnico]}>Técnico</Text>
              <Text style={[styles.tableHeaderCell, styles.colCodigo]}>Código</Text>
              <Text style={[styles.tableHeaderCell, styles.colDetalle]}>Detalle</Text>
              <Text style={[styles.tableHeaderCell, styles.colSerial]}>Serial</Text>
              <Text style={[styles.tableHeaderCell, styles.colDano]}>Daño</Text>
            </View>
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <MasterRow
                  key={item.id}
                  item={item}
                  index={index}
                  isSelected={selected?.id === item.id}
                  onPress={() => onSelect(selected?.id === item.id ? null : item)}
                  onOpenIngreso={handleOpenIngreso}
                />
              ))
            ) : (
              <View style={styles.emptyDetail}>
                <Icon name="inbox" size={28} color={C.textMuted} />
                <Text style={styles.emptyDetailText}>No hay registros encontrados</Text>
                <Text style={styles.emptyDetailSub}>Realice una búsqueda para ver resultados</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <IngresoModal
        visible={showIngresoModal}
        ingreso={selectedIngreso}
        onClose={handleCloseIngreso}
      />
    </>
  );
}
