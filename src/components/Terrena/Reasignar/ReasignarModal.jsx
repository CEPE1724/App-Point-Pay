import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { APIURL } from '../../../config/apiconfig';
import Toast from 'react-native-toast-message';

export function ReasignarModal({ visible, onClose, data, onConfirm }) {
  const [supervisor, setSupervisor] = useState(null);
  const [cobradoresList, setCobradoresList] = useState([]);
  const [selectedCobradorId, setSelectedCobradorId] = useState(null);

  useEffect(() => {
    if (visible && data?.idVerificador) {
      fetchSupervisor();
    }
  }, [visible, data?.idVerificador]);

  useEffect(() => {
    if (visible && supervisor === 1) {
      fetchSupervisorCobradores();
    }
  }, [supervisor]);

  const fetchSupervisor = async () => {
    try {
      const url = new URL(APIURL.getVerificarSupervisor());
      url.searchParams.append('idVerificador', data.idVerificador);

      const response = await fetch(url);
      const result = await response.json();
      console.log('Supervisor response:', result);

      if (result?.status === true) {
        setSupervisor(result.data); // Ya es 0 o 1
      } else {
        setSupervisor(null);
      }
    } catch (error) {
      console.error('Error al obtener supervisor:', error);
      setSupervisor(null);
    }
  };

  const fetchSupervisorCobradores = async () => {
    try {
      const url = new URL(APIURL.getVerificarSupervisorCobradores());
      url.searchParams.append('idVerificador', data.idVerificador);

      const response = await fetch(url);
      const result = await response.json();
      console.log('Cobradores response:', result);

      if (result.totalRegistros > 0) {
        setCobradoresList(result.data);
      } else {
        setCobradoresList([]);
      }
    } catch (error) {
      console.error('Error al obtener cobradores:', error);
      setCobradoresList([]);
    }
  };

  const fetchActualizar = async () => {
    if (supervisor === 1 && !selectedCobradorId) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Alerta!',
        text2: 'Por favor, selecciona un cobrador antes de continuar.',
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }
      console.log('Reasignando verificación para el cliente:', data.idClienteVerificacion);
      console.log('ID del cobrador seleccionado:', selectedCobradorId);
    const idAReasignar = supervisor === 1 ? selectedCobradorId : data.idVerificador;
    console.log('ID del verificador reasignado:', idAReasignar);
    if (supervisor === 1) {

    await fetchReasignarCobrador(idAReasignar);
    }
    if (supervisor === 0) {
      await fetchReasignar(idAReasignar);
    }
  };

  const fetchReasignar = async (idVerificador) => {
    const url = APIURL.patchreasignacion();
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idVerificador,
          idClienteVerificacion: data.idClienteVerificacion,
        }),
      });

      const result = await response.json();

      if (!result.status) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Alerta!',
          text2: result.message || 'Error al reasignar',
          visibilityTime: 3000,
        });
        return;
      }

      Toast.show({
        type: 'success',
        position: 'top',
        text1: '¡Éxito!',
        text2: 'Reasignación exitosa',
        visibilityTime: 3000,
      });

      onConfirm();
    } catch (error) {
      console.error('❌ Error al reasignar:', error.message);
    }
  };

  const fetchReasignarCobrador = async (idVerificador) => {
    const url = APIURL.updatecobrador();
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idVerificador,
          idClienteVerificacion: data.idClienteVerificacion,
        }),
      });

      const result = await response.json();

      if (!result.status) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Alerta!',
          text2: result.message || 'Error al reasignar',
          visibilityTime: 3000,
        });
        return;
      }

      Toast.show({
        type: 'success',
        position: 'top',
        text1: '¡Éxito!',
        text2: 'Reasignación exitosa',
        visibilityTime: 3000,
      });

      onConfirm();
    } catch (error) {
      console.error('❌ Error al reasignar:', error.message);
    }
  };
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Confirmar reasignación</Text>
          <Text style={styles.message}>
            ¿Deseas reasignar la verificación del siguiente cliente?
          </Text>

          {supervisor === 1 && (
            <>
              <Text style={styles.message}>Selecciona un cobrador:</Text>
              <Picker
                selectedValue={selectedCobradorId}
                onValueChange={(itemValue) => setSelectedCobradorId(itemValue)}
                style={{ height: 50, width: '100%', marginBottom: 15 }}
              >
                <Picker.Item label="Seleccione un cobrador" value={null} />
                {cobradoresList.map((item) => (
                  <Picker.Item
                    key={item.idIngresoCobrador}
                    label={`${item.Nombre}`}
                    value={item.idIngresoCobrador}
                  />
                ))}
              </Picker>
            </>
          )}

          <View style={styles.infoBox}>
            <Text style={styles.clientName}>{data.Nombres}</Text>
            <Text style={styles.clientDetail}>N° Solicitud: {data.Numero}</Text>
          </View>

          <Text style={styles.warningText}>Esta acción no se puede deshacer.</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={fetchActualizar} style={styles.confirmButton}>
              <Text style={styles.confirmText}>Sí, reasignar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#f0f4f8',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#cfd8dc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  clientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00796b',
    marginBottom: 6,
  },
  clientDetail: {
    fontSize: 15,
    color: '#455a64',
  },
  warningText: {
    fontSize: 14,
    color: '#c62828',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 28,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: '#388e3c',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 10,
    minWidth: 140,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 10,
    minWidth: 140,
    alignItems: 'center',
  },
  confirmText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelText: {
    color: '#212121',
    fontWeight: '600',
    fontSize: 16,
  },
});




