import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './CardItem.Style';
import { Cell, CalendarToday, UserBlack } from "../../../Icons";
import { useNetworkStatus } from "../../../utils/NetworkProvider";

export function CardItem({ item, handleViewAmortizacion, handleViewCel, handleButtonPress, handleViewGestiones, handleViewReferencias }) {
  const isConnected = useNetworkStatus();

  const formatDate = (dateValue) => {
    if (!dateValue) return '-';
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return '-';
    return date.toISOString().split('T')[0];
  };

  const formatCurrency = (value) => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return '$0.00';
    return `$${numberValue.toFixed(2)}`;
  };

  const formattedDate = formatDate(item.Fecha_Factura);
  const projectedValue = Number(item.Valor_Cobrar_Proyectado) || 0;
  const collectedValue = Number(item.Valor_Cobrado) || 0;

  const getColorForValue = (valorProyectado, valorCobrado) =>
    valorCobrado >= valorProyectado ? '#16A34A' : '#DC2626';

  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <View style={styles.customerBlock}>
          <Text style={styles.customerLabel}>Cliente </Text>
          <View style={styles.customerNameRow}>
            <View style={styles.customerIconWrap}>
              <UserBlack size={20} color="#0F172A" />
            </View>
            <Text style={styles.customerName}>{item.Cliente}</Text>
          </View>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{isConnected ? 'En linea' : 'Offline'}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.row}>
          <Icon name="drivers-license-o" size={18} color="#6B7280" style={styles.rowIcon} />
          <View style={styles.metaContent}>
            <Text style={styles.metaLabel}>Cedula</Text>
            <Text style={styles.value}>{item.Cedula}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Icon name="file-text-o" size={18} color="#6B7280" style={styles.rowIcon} />
          <View style={styles.metaContent}>
            <Text style={styles.metaLabel}>Documento</Text>
            <Text style={styles.value}>{item.Numero_Documento}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Cell size={18} color="#6B7280" style={styles.rowIcon} />
          <View style={styles.metaContent}>
            <Text style={styles.metaLabel}>Contacto</Text>
            <Text style={styles.textCell}>{item.Telefono} - {item.Celular}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <CalendarToday size={18} color="#6B7280" style={styles.rowIcon} />
          <View style={styles.metaContent}>
            <Text style={styles.metaLabel}>Fecha de factura</Text>
            <Text style={styles.textCell}>{formattedDate}</Text>
          </View>
        </View>
      </View>

      {isConnected && (
        <>
          <View style={styles.divider} />
          <Text style={styles.sectionTitle}>Acciones comerciales</Text>
          <View style={styles.actionsSection}>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleViewAmortizacion} style={[styles.btn, styles.btnAmortizacion]}>
                <Icon name="bank" size={15} color="#fff" />
                <Text style={styles.btnLabel}>Amortización</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleViewCel} style={[styles.btn, styles.btnCelular]}>
                <Icon name="volume-control-phone" size={15} color="#fff" />
                <Text style={styles.btnLabel}>Contactos</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleViewGestiones} style={[styles.btn, styles.btnGestiones]}>
                <Icon name="file-text-o" size={15} color="#fff" />
                <Text style={styles.btnLabel}>Gestiones</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleViewReferencias} style={[styles.btn, styles.btnReferencias]}>
                <Icon name="users" size={15} color="#fff" />
                <Text style={styles.btnLabel}>Referencias</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleButtonPress} style={[styles.btnFull, styles.btnProductos]}>
              <Icon name="shopping-cart" size={15} color="#fff" />
              <Text style={styles.btnLabel}>Productos</Text>
            </TouchableOpacity>

         
          </View>
        </>
      )}

      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Resumen financiero</Text>
        <View style={styles.rowProyect}>
          <View style={styles.metricCard}>
            <Text style={styles.labelProyect}>Proyectado</Text>
            <Text style={styles.textProyect}>{formatCurrency(projectedValue)}</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={[styles.labelProyect, styles.metricValueRight]}>Cobrado</Text>
            <Text style={[styles.textProyect, styles.metricValueRight, { color: getColorForValue(projectedValue, collectedValue) }]}>
              {formatCurrency(collectedValue)}
            </Text>
          </View>
        </View>
      </View>

    </View>
  );
}

