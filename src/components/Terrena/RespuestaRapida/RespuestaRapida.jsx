import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { APIURL } from '../../../config/apiconfig';
import Toast from 'react-native-toast-message';
export function RespuestaRapida({ visible, onClose, onConfirm, data }) {
    const [selectedMotivoId, setSelectedMotivoId] = useState(null);
    const [nota, setNota] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const motivos = [
        { id: 8, label: "Cliente desiste de la compra" },
        { id: 9, label: "Cliente pospone verificación" },
        { id: 6, label: "Zona Vetada" },
    ];

    // Determina si es domicilio o trabajo según `data`
    const isDomicilio = data?.bDomicilio === true;
    const isTrabajo = data?.bTrabajo === true;

    // tipoVerificacion según motivo seleccionado
    const getTipoVerificacion = () => {
        if (!selectedMotivoId) return 0;
        return selectedMotivoId; // Usamos el ID del motivo directamente como tipoVerificacion
    };

    const getPayload = () => {
        const tipoVerificacion = getTipoVerificacion();

        if (isDomicilio) {
            return {
                idClienteVerificacion: data.idClienteVerificacion,
                idTerrenaTipoCliente: 2,
                iTiempoVivienda: 1,
                idTerrenaTipoVivienda: 99,
                idTerrenaEstadoVivienda: 99,
                idTerrenaZonaVivienda: 99,
                idTerrenaPropiedad: 99,
                idTerrenaAcceso: 99,
                idTerrenaCobertura: 99,
                PuntoReferencia: "Sin punto de referencia",
                PersonaEntrevistada: "No se entrevistó a nadie",
                Observaciones: nota.trim(),
                VecinoEntreVisto: "No",
                DireccionesVisitada: "No se pudo visitar la dirección",
                Latitud: -0.1807, // Quito, como centro de Ecuador
                Longitud: -78.4678,
                domicilioImages: "https://example.com/fake-image.jpg",
                CallePrincipal: "No registrada",
                CalleSecundaria: "No registrada",
                ValorArrendado: 0,
                direccionCoincide: 1,
                tipoVerificacion,
            };
        } else if (isTrabajo) {
            return {
                idTerrenaGestionTrabajo: 0,
                idClienteVerificacion: data.idClienteVerificacion,
                idTerrenaTipoTrabajo: 99,
                iTiempoTrabajo: 1,
                iTiempoTrabajoYear: 1,
                dIngresoTrabajo: 10,
                ActividadTrabajo: "No se verificó actividad laboral",
                TelefonoTrabajo: "022222222",
                PuntoReferencia: "Sin punto de referencia laboral",
                PersonaEntrevistada: "No se entrevistó a nadie",
                DireccionesVisitada: "Dirección laboral no visitada",
                Latitud: -0.1807, // Quito, como centro de Ecuador
                Longitud: -78.4678,
                trabajoImages: "https://example.com/fake-image.jpg",
                CallePrincipal: "No registrada",
                CalleSecundaria: "No registrada",
                direccionCoincide: 1,
                tipoVerificacion,
            };
        }

        return {}; // Fallback
    };

    const getUrl = () => {
        return isDomicilio
            ? APIURL.postTerrenaGestionDomicilioSave()
            : APIURL.postTerrenaGestionTrabajoSave();
    };

    useEffect(() => {
        const isValid = selectedMotivoId && nota.trim().length >= 10;
        setIsFormValid(isValid);
    }, [selectedMotivoId, nota]);

    useEffect(() => {
        if (!visible) {
            setSelectedMotivoId(null);
            setNota('');
        }
    }, [visible]);

    const handleConfirm = async () => {
        if (!isFormValid) return;

        const payload = getPayload();
        console.log("Payload a enviar:", payload);
        const url = getUrl();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.status === 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Verificación cancelada',
                    text2: 'La verificación ha sido cancelada exitosamente.',
                     
                });
                onConfirm({
                    motivoId: selectedMotivoId,
                    motivoTexto: motivos.find(m => m.id === selectedMotivoId)?.label || '',
                    nota: nota.trim(),
                    tipoVerificacion: payload.tipoVerificacion,
                    location: result.location, // si deseas guardar esa info
                });
            } else {
                console.error('Error en respuesta:', result.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al enviar payload:', error.message);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Selecciona un motivo</Text>
                    <Text style={styles.message}>¿Por qué deseas cancelar esta verificación?</Text>

                    <Picker
                        selectedValue={selectedMotivoId}
                        onValueChange={(itemValue) => setSelectedMotivoId(itemValue)}
                        style={{ height: 50, width: '100%', marginBottom: 20 }}
                    >
                        <Picker.Item label="Seleccione un motivo" value={null} />
                        {motivos.map((motivo) => (
                            <Picker.Item key={motivo.id} label={motivo.label} value={motivo.id} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Escribe una nota (mínimo 10 caracteres):</Text>
                    <TextInput
                        style={styles.input}
                        multiline
                        numberOfLines={4}
                        placeholder="Ej. Cliente no desea continuar..."
                        value={nota}
                        onChangeText={setNota}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleConfirm}
                            style={[styles.confirmButton, !isFormValid && styles.disabledButton]}
                            disabled={!isFormValid}
                        >
                            <Text style={styles.confirmText}>Confirmar</Text>
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
        fontSize: 20,
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
    label: {
        fontSize: 14,
        color: '#424242',
        marginBottom: 6,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        textAlignVertical: 'top',
        minHeight: 80,
        marginBottom: 20,
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
    disabledButton: {
        backgroundColor: '#a5d6a7',
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
