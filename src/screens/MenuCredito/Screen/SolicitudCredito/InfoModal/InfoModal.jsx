import React, { useState, useEffect, useRef, token } from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    StyleSheet,
    TextInput,
    ScrollView,
} from "react-native";
import Toast from 'react-native-toast-message';
const etiquetas = {
    primerNombre: "Primer Nombre",
    segundoNombre: "Segundo Nombre",
    apellidoPaterno: "Apellido Paterno",
    apellidoMaterno: "Apellido Materno",
    cedula: "Cédula",
    celular: "Celular",
    email: "Email",
    edad: "Edad",
    fechaNacimiento: "Fecha de Nacimiento",
};

export const InfoModal = ({ visible, onClose, datos, token, idNomina }) => {
    const [digits, setDigits] = useState(["", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
    const [otpRequested, setOtpRequested] = useState(false);
    const intervalRef = useRef(null);
    const [isVerifying, setIsVerifying] = useState(false);
   const inputRefs = useRef([]);
   const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
        const updated = [...digits];
        updated[index] = value;
        setDigits(updated);
        if (value && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    }
}

    useEffect(() => {
        if (visible) {
            setDigits(["", "", "", "", ""]);
            setTimeLeft(300);

            clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setTimeLeft((t) => {
                    if (t <= 1) {
                        clearInterval(intervalRef.current);
                        onClose("timeout");
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);

            // ✅ Generar OTP solo una vez cuando se muestra el modal
            fetchGeneraOTP();
        }

        return () => clearInterval(intervalRef.current);
    }, [visible]);



   

    console.log("Datos del modal:", datos);
    const fetchGeneraOTP = async () => {
        try {
            const response = await fetch('https://backregistrocivil.appservices.com.ec/api/v1/otp/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Si no se requiere token, elimina esta línea
                },
                body: JSON.stringify({
                    phoneNumber: datos.celular,
                    email: datos.email,
                    nombreCompleto: `${datos.primerNombre} ${datos.apellidoPaterno}`,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("OTP generado:", result);
                // Aquí puedes navegar al modal o activar el input de OTP
            } else {
                console.error("Error al generar OTP:", result?.message || result);
            }

        } catch (error) {
            console.error("Error en la solicitud OTP:", error);
        }
    };



    

    const handleCancel = () => {
        clearInterval(intervalRef.current);
        setOtpRequested(false); // Reiniciar por si se vuelve a abrir
        onClose("cancel");
    };

    const handleConfirm = async () => {
        const code = digits.join("");

        if (!isCodeComplete || isVerifying) return;

        setIsVerifying(true);

        try {
            // Verificar el OTP
            const response = await fetch('https://backregistrocivil.appservices.com.ec/api/v1/otp/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    phoneNumber: datos.celular,
                    otpCode: code,
                }),
            });

            const result = await response.json();

            if (response.ok && result?.success) {
                // OTP verificado exitosamente
                clearInterval(intervalRef.current);
                //  setOtpRequested(false);

                // Construir payload para solicitud
                const solicitudPayload = {
                    NumeroSolicitud: `SOL-${Date.now()}`,
                    Bodega: datos.bodega,
                    idVendedor: idNomina,
                    idCompraEncuesta: datos.tipoConsulta,
                    Cedula: datos.cedula,
                    ApellidoPaterno: datos.apellidoPaterno,
                    ApellidoMaterno: datos.apellidoMaterno,
                    PrimerNombre: datos.primerNombre,
                    SegundoNombre: datos.segundoNombre,
                    Celular: datos.celular,
                    Email: datos.email,
                    idSituacionLaboral: datos.situacionLaboral,
                    idActEconomina: datos.actividadEconomica,
                    idCre_Tiempo: datos.tiempoTrabajo,
                    bAfiliado: datos.situacionLaboral == 1,
                    bTieneRuc: datos.situacionLaboral != 1,
                    Foto: "prueba",
                    bTerminosYCondiciones: true,
                    bPoliticas: true,
                    idProductos: datos.productoSolicitud,
                    idCre_TiempoVivienda: datos.tiempoVivienda,
                    otp_code: code,
                    idEstadoVerificacionDocumental: 1,
                    Usuario: "APP",
                };

                // Enviar solicitud
                const solicitudResponse = await fetch('https://backregistrocivil.appservices.com.ec/api/v1/cre-solicitud-web', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(solicitudPayload),
                });

                const solicitudResult = await solicitudResponse.json();

                if (solicitudResponse.ok && solicitudResult?.success !== false) {
                    Toast.show({
                        type: 'success',
                        text1: 'Solicitud registrada Exitosamente',
                        text2: 'Consulte su solicitud en CREDIPOINT DIGITAL',
                        visibilityTime: 8000,
                        autoHide: true
                    });
                    onClose(code);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error al registrar',
                        text2: solicitudResult?.message || 'No se pudo registrar la solicitud.',
                    });
                }

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Código incorrecto',
                    text2: 'Por favor, verifique el código ingresado.',
                });
            }
        } catch (error) {
            console.error("Error en el proceso:", error);
            Toast.show({
                type: 'error',
                text1: 'Error inesperado',
                text2: 'No se pudo completar la operación.',
            });
        } finally {
            setIsVerifying(false);
        }
    };



    const isCodeComplete = digits.every((d) => d !== "");
    const codeString = digits.join("");

    const minutos = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const segundos = String(timeLeft % 60).padStart(2, "0");

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.backdrop}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>🔐 Confirmar Código</Text>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {Object.entries(datos).map(([key, val]) =>
                            etiquetas[key] ? (
                                <View key={key} style={styles.row}>
                                    <Text style={styles.label}>{etiquetas[key]}:</Text>
                                    <Text style={styles.value}>{String(val)}</Text>
                                </View>
                            ) : null
                        )}

                        <Text style={styles.timer}>
                            ⏳ Tiempo restante: {minutos}:{segundos}
                        </Text>

                        <View style={styles.digitsContainer}>
                            {digits.map((digit, idx) => (
                                <TextInput
                                    ref={(ref) => (inputRefs.current[idx] = ref)}
                                    key={idx}
                                    style={styles.digitBox}
                                    value={digit}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onChangeText={(val) => handleChange(idx, val)}
                                />
                            ))}
                        </View>
                    </ScrollView>

                    <View style={styles.buttonGroup}>
                        <Pressable
                            style={[styles.cancelButton, isVerifying && styles.disabledButton]}
                            onPress={handleCancel}
                            disabled={isVerifying}
                        >
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </Pressable>


                        <Pressable
                            style={[styles.confirmButton, (!isCodeComplete || isVerifying) && styles.disabledButton]}
                            onPress={handleConfirm}
                            disabled={!isCodeComplete || isVerifying}
                        >
                            <Text style={styles.confirmText}>
                                {isVerifying ? 'Validando...' : 'Confirmar'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "85%",
        maxHeight: "90%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
    },
    scrollContent: {
        paddingBottom: 10,
    },
    row: {
        flexDirection: "row",
        marginBottom: 8,
    },
    label: {
        fontWeight: "bold",
        width: 140,
    },
    value: {
        flex: 1,
    },
    timer: {
        marginVertical: 15,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "600",
    },
    digitsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 20,
    },
    digitBox: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 8,
        fontSize: 22,
        textAlign: "center",
        backgroundColor: "#f0f0f0",
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    cancelButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#ccc",
        alignItems: "center",
    },
    cancelText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "600",
    },
    confirmButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#3478f6",
        alignItems: "center",
    },
    confirmText: {
        fontSize: 16,
        color: "white",
        fontWeight: "600",
    },
    disabledButton: {
        backgroundColor: "#aaa",
    },
});

