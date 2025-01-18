import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from './PagosTDAmortizacion.Style';

export function PagosTDAmortizacion({ visible, onClose, data, cliente, Cedula, Numero_Documento, NumeroCuota }) {
  if (!data || data.length === 0) return null;
  console.log(data);
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Icono para cerrar */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="red" />
          </TouchableOpacity>

          {/* Título y datos de cliente */}
          <Text style={styles.modalTitle}>Resumen de Cobro:</Text>
          <Text style={styles.modalTitle}>Cuota N.{NumeroCuota}</Text>
          <Text style={styles.modalTitle}>Cliente: {cliente}</Text>
          <Text style={styles.modalTitle}>Factura N. {Numero_Documento}</Text>

          {/* Tabla de datos */}
          <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderCell}>Fecha</Text>
                  <Text style={styles.tableHeaderCell}>Número</Text>
                  <Text style={styles.tableHeaderCell}>Forma de Pago</Text>
                  <Text style={styles.tableHeaderCell}>Abono Cuota</Text>
                  <Text style={styles.tableHeaderCell}>Total</Text>
                </View>
          <FlatList
            data={data} // Pasar el arreglo directamente
            keyExtractor={(item, index) => `${item.idAnticipo}-${index}`} // Combinamos el idAnticipo con el índice para asegurar que la clave sea única
            renderItem={({ item }) => (
        
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{new Date(item.Fecha).toLocaleDateString()}</Text>
                  <Text style={styles.tableCell}>{item.Secuencial}</Text>
                  <Text style={styles.tableCell}>{item.FormaPago}</Text>
                  <Text style={styles.tableCell}>{item.TotalAbonoCuota}</Text>
                  <Text style={styles.tableCell}>{item.Total}</Text>
                </View>
             
            )}
            
          />
           </View>
        </View>
      </View>
    </Modal>
  );
};
