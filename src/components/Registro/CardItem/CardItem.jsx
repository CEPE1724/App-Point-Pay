import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { styles } from './CardItem.Style'; 
import { Cell, CalendarToday, UserBlack } from "../../../Icons"; 

export function CardItem({ item, handleViewAmortizacion, handleViewCel, handleButtonPress, handleViewGestiones }) {
  
  const formattedDate = new Date(item.Fecha_Factura).toISOString().split('T')[0];

  const getColorForValue = (valorProyectado, valorCobrado) => {
    return valorCobrado >= valorProyectado ? 'green' : 'red'; 
  };

  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>

        {/* Información Cliente */}
        <View style={styles.row}>
          <UserBlack size={24} color="#333" style={styles.icon} />
          <Text style={styles.value}> {item.Cliente}</Text>
        </View>

        {/* Cédula */}
        <View style={styles.row}>
          <Icon name="drivers-license-o" size={24} color="#333" style={styles.icon} />
          <Text style={styles.value}>{item.Cedula}</Text>
        </View>

        {/* Número Documento */}
        <View style={styles.row}>
          <Icon name="file-text-o" size={24} color="#333" style={styles.icon} />
          <Text style={styles.value}>{item.Numero_Documento}</Text>
        </View>

        {/* Teléfono y Celular */}
        <View style={styles.row}>
          <Cell size={24} color="black" style={styles.iconsearch} />
          <Text style={styles.textCell}> {item.Telefono}- {item.Celular}</Text>
        </View>

        {/* Fecha de Factura */}
        <View style={styles.row}>
          <CalendarToday size={24} color="black" style={styles.iconsearch} />
          <Text style={styles.textCell}> {formattedDate}</Text>
        </View>

        {/* Botones de Acción */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleViewAmortizacion} style={styles.buttonAmortizacion}>
              <View style={styles.rowPro}>
                <Icon name="bank" size={20} color="#fff" />
                <Text style={styles.valueProAmo}>Amortización</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleViewCel} style={styles.buttonCelular}>
              <View style={styles.rowPro}>
                <Icon name="volume-control-phone" size={20} color="#fff" />
                <Text style={styles.valueProAmo}>Contactos</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botones de Acciones Adicionales */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleViewGestiones} style={styles.buttonGestiones}>
              <View style={styles.rowPro}>
                <Icon name="file-text-o" size={20} color="#fff" />
                <Text style={styles.valueProAmo}>Gestiones</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleViewGestiones} style={styles.buttonReferencias}>
              <View style={styles.rowPro}>
                <Icon name="file-text-o" size={20} color="#fff" />
                <Text style={styles.valueProAmo}>Referencias</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón Productos */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleButtonPress} style={styles.buttonProductos}>
            <View style={styles.rowPro}>
              <Icon name="shopping-cart" size={20} color="#fff" />
              <Text style={styles.valueProAmo}>Productos</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Valores Proyectados y Cobrado */}
        <View style={styles.rowProyect}>
          <Text style={styles.textProyect}>
            ${item.Valor_Cobrar_Proyectado.toFixed(2)}
          </Text>
          <Text
            style={[
              styles.textProyect,
              {
                color: getColorForValue(item.Valor_Cobrar_Proyectado, item.Valor_Cobrado),
              },
            ]}
          >
            ${item.Valor_Cobrado.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

