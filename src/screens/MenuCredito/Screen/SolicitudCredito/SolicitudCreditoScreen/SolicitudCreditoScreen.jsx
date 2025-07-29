import React, { useState, useEffect } from "react";
import {
    KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard,
    View,
    Text,
    TextInput,
    Button
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDb } from '../../../../../database/db';
import { getItemsAsyncBodegaALL } from '../../../../../database';
import { styles } from "./SolicitudCreditoScreen.Style";
import { APIURL } from "../../../../../config/apiconfig";
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { InfoModal } from "../InfoModal";
import { useAuth } from "../../../../../navigation/AuthContext";
import { getItemsAsync } from '../../../../../database';
export const SolicitudCreditoScreen = () => {
    const [bodegas, setBodegas] = useState([]);
    const [selectedBodega, setSelectedBodega] = useState(null);
    const [idNomina, setIdNomina] = useState(null);
    const [idPersonal, setIdPersonal] = useState(null);
    const [Cre_ActividadEconomicaByEntidad, setCre_ActividadEconomicaByEntidad] = useState([]);
    const [selectedActividadEconomica, setSelectedActividadEconomica] = useState(null);

    const [tipoConsulta, setTipoConsulta] = useState([]);
    const [selectedTipoConsulta, setSelectedTipoConsulta] = useState(null);

    const [Cre_SituacionLaboral, setCre_SituacionLaboral] = useState([]);
    const [selectedSituacionLaboral, setSelectedSituacionLaboral] = useState(null);

    const [cre_Tiempovivienda, setCre_Tiempovivienda] = useState([]);
    const [selectedTiempoVivienda, setSelectedTiempoVivienda] = useState(null);

    const [cre_TiempoTrabajo, setCre_TiempoTrabajo] = useState([]);
    const [selectedTiempoTrabajo, setSelectedTiempoTrabajo] = useState(null);

    const [Cre_ProductoSolicitud, setCre_ProductoSolicitud] = useState([]);
    const [selectedProductoSolicitud, setSelectedProductoSolicitud] = useState(null);

    const [checkTerminos, setCheckTerminos] = useState(false);
    const [checkPoliticas, setCheckPoliticas] = useState(false);

    const [cedula, setCedula] = useState("");
    const [Celular, setCelular] = useState("");
    const [email, setEmail] = useState("");

    const [primerNombre, setPrimerNombre] = useState("");
    const [segundoNombre, setSegundoNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [edad, setEdad] = useState(null);

    const [claveApp, setClaveApp] = useState("");
    const [userToken, setUserToken] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [datosSolicitud, setDatosSolicitud] = useState([]);

    const { db } = useDb();



    // ========== FETCH GENERAL ==========
    useEffect(() => {
        (async () => {
            await fetchData();
            await fetchBodegas();
            await fetchSituacionLaboral();
            await fetchTipoConsulta();
            await fetchCreTiempoVivienda();
            await fetchCreTiempoTrabajo();
            await fetchCreProductoSolicitud();
            await fetchClaveUsuario();
        })();
    }, []);

    // ========== OBTENER TOKEN SI EXISTE CLAVE ==========
    useEffect(() => {
        if (claveApp) postTokenWeb();
    }, [claveApp]);

    // ========== CONSULTA COGNO CUANDO CÉDULA ES VÁLIDA ==========
    useEffect(() => {
        resetUserInfo();
        if (cedula.length === 10 && userToken) getDataCogno();
    }, [cedula, userToken]);

    // ========== AL SELECIONAR SITUACIÓN LABORAL ==========
    useEffect(() => {
        if (selectedSituacionLaboral) {
            setCre_ActividadEconomicaByEntidad([]);
            setSelectedActividadEconomica(null);
            fetchCreActividadEconomicaByEntidad(selectedSituacionLaboral);
        }
    }, [selectedSituacionLaboral]);

    useEffect(() => {
        console.log("Cambió actividad económica:", selectedActividadEconomica);
    }, [selectedActividadEconomica]);

    // ========== LLAMARA  ALA FUNCION D ENOMINA
    useEffect(() => {
        if (idNomina) {
            fetchNominaByIdPersonal(idNomina);
        }
    }, [idNomina]);



    const resetUserInfo = () => {
        setPrimerNombre("");
        setSegundoNombre("");
        setApellidoPaterno("");
        setApellidoMaterno("");
        setFechaNacimiento("");
        setEdad(null);
    };

    const fetchData = async () => {
        try {
            const data = await getItemsAsync(db);
            setIdNomina(data[0]?.idNomina || 0);
            console.log("ID de Nómina:", data[0]?.idNomina);

        } catch (error) {
            console.error('Error fetching data from database:', error);
        }
    };

    // ========== OBTENER BODEGAS ==========
    const fetchBodegas = async () => {
        try {
            const response = await getItemsAsyncBodegaALL(db);
            if (response?.length) {
                setBodegas(response);
                setSelectedBodega(response[0]?.Bodega ?? null);
            }
        } catch (error) {
            console.error("Error al obtener bodegas:", error);
        }
    };

    // ========== OBTENER TIPO DE CONSULTA ==========
    const fetchTipoConsulta = async () => {
        try {
            const { data } = await axios.get(APIURL.getTipoConsulta(1));
            if (data?.length) {
                setTipoConsulta(data);
                setSelectedTipoConsulta(data[0]?.idCompraEncuesta ?? null);
            }
        } catch (error) {
            console.error("Error al obtener tipo de consulta:", error);
        }
    };

    const fetchSituacionLaboral = async () => {
        try {
            const { data } = await axios.get(APIURL.getSituacionLaboral(4));
            if (data?.length) {
                setCre_SituacionLaboral(data);
                setSelectedSituacionLaboral(data[0]?.idSituacionLaboral ?? null);
                // si se selecciona una situación laboral, setear la actividad económica por defecto

            }
        } catch (error) {
            console.error("Error al obtener situación laboral:", error);
        }
    };

    const fetchCreActividadEconomicaByEntidad = async (id) => {
        try {
            const { data } = await axios.get(APIURL.Cre_ActividadEconomicaByEntidad(id));

            if (data?.length) {
                setCre_ActividadEconomicaByEntidad(data);

                // Solo setear el valor si no hay uno seleccionado actualmente
                setSelectedActividadEconomica((prev) => (prev === -1 || prev === null) ? data[0]?.idActividadEconomica : prev);

            }
        } catch (error) {
            console.error("Error al obtener actividad económica:", error);
        }
    };

    // ========= OBTENER NOMINA POR ID PERSONAL ==========
    const fetchNominaByIdPersonal = async (id) => {
        try {
            const response = await axios.get(APIURL.getnominaidPersonal(id));
            const idNomina = response?.data?.data ?? null;

            setIdPersonal(idNomina);
            console.log("ID de Nómina por ID Personal:", idNomina);
        } catch (error) {
            console.error("Error al obtener nómina por ID personal:", error);
        }
    };

    // ========== OBTENER TIEMPO DE VIVIENDA ==========
    const fetchCreTiempoVivienda = async () => {
        try {
            const { data } = await axios.get(APIURL.Cre_Tiempo(1));
            if (data?.length) {
                setCre_Tiempovivienda(data);
                setSelectedTiempoVivienda(data[0]?.idCre_Tiempo ?? null);
            }
        } catch (error) {
            console.error("Error al obtener tiempo de vivienda:", error);
        }
    };
    // ========== OBTENER TIEMPO DE TRABAJO ==========
    const fetchCreTiempoTrabajo = async () => {
        try {
            const { data } = await axios.get(APIURL.Cre_Tiempo(1));
            if (data?.length) {
                setCre_TiempoTrabajo(data);
                setSelectedTiempoTrabajo(data[0]?.idCre_Tiempo ?? null);
            }
        } catch (error) {
            console.error("Error al obtener tiempo de trabajo:", error);
        }
    };

    // ========== OBTENER PRODUCTOS DE SOLICITUD ==========
    const fetchCreProductoSolicitud = async () => {
        try {
            const { data } = await axios.get(APIURL.getCre_ProductoSolicitud());


            if (data?.data?.length) {
                setCre_ProductoSolicitud(data.data);
                setSelectedProductoSolicitud(data.data[0]?.idCre_ProductoSolicitud ?? null);
            }
        } catch (error) {
            console.error("Error al obtener productos de solicitud:", error);
        }
    };


    // ========== OBTENER CLAVE USUARIO ==========
    const fetchClaveUsuario = async () => {
        try {
            const { data } = await axios.get(APIURL.getUserClave());
            if (data?.usuario) setClaveApp(data.usuario);
        } catch (error) {
            console.error("Error al obtener clave de usuario:", error);
        }
    };

    // ========== POST TOKEN ==========
    const postTokenWeb = async () => {
        try {
            const url = "https://backregistrocivil.appservices.com.ec/api/v1/auth/login";
            const { data } = await axios.post(url, {
                Clave: claveApp,
                Nombre: 'APPUSER',
            });

            if (data?.token) {
                setUserToken(data.token);

            } else {
                console.warn("Token no encontrado.");
            }
        } catch (error) {
            console.error("Error al obtener token:", error);
        }
    };

    // ========== OBTENER DATOS DE COGNO ==========
    const getDataCogno = async () => {
        try {
            const url = `https://backregistrocivil.appservices.com.ec/api/v1/cre-solicitud-web/solicitud-Cogno/${cedula}`;
            const { data } = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });

            if (data?.codigo === "OK") {
                setApellidoMaterno(data.apellidoMaterno || "");
                setApellidoPaterno(data.apellidoPaterno || "");
                setPrimerNombre(data.primerNombre || "");
                setSegundoNombre(data.segundoNombre || "");
                setFechaNacimiento(data.fechaNacimiento || "");
                setEdad(data.edad || null);
            } else {
                console.warn("Datos inválidos.");
            }
        } catch (error) {
            console.error("Error al obtener datos de Cogno:", error);
        }
    };


    // ===== Guardar Solicitud de Crédito =====

    const handleSaveSolicitud = async () => {

        if (!checkTerminos) {
            Toast.show({
                type: 'error',
                text1: 'Campo obligatorio',
                text2: 'Debe aceptar los Términos y Condiciones.',
            });
            return;
        }

        if (!checkPoliticas) {
            Toast.show({
                type: 'error',
                text1: 'Campo obligatorio',
                text2: 'Debe aceptar las Políticas de Privacidad.',
            });
            return;
        }

        if (!selectedBodega) {
            Toast.show({
                type: 'error',
                text1: 'Falta seleccionar el almacén',
                text2: 'Seleccione una bodega o almacén.',
            });
            return;
        }

        if (!selectedTipoConsulta) {
            Toast.show({
                type: 'error',
                text1: 'Falta el tipo de consulta',
                text2: 'Seleccione el tipo de consulta requerido.',
            });
            return;
        }

        if (!cedula || cedula.length !== 10) {
            Toast.show({
                type: 'error',
                text1: 'Cédula inválida',
                text2: 'Ingrese una cédula válida de 10 dígitos.',
            });
            return;
        }

        if (!primerNombre) {
            Toast.show({
                type: 'error',
                text1: 'Nombre requerido',
                text2: 'El primer nombre no puede estar vacío.',
            });
            return;
        }

        if (!apellidoPaterno) {
            Toast.show({
                type: 'error',
                text1: 'Apellido requerido',
                text2: 'El apellido paterno es obligatorio.',
            });
            return;
        }

        if (!fechaNacimiento) {
            Toast.show({
                type: 'error',
                text1: 'Fecha de nacimiento requerida',
                text2: 'Seleccione o ingrese la fecha de nacimiento.',
            });
            return;
        }

        if (!edad || isNaN(edad)) {
            Toast.show({
                type: 'error',
                text1: 'Edad requerida',
                text2: 'La edad es obligatoria y debe ser numérica.',
            });
            return;
        }

        if (!Celular || Celular.length !== 10) {
            Toast.show({
                type: 'error',
                text1: 'Celular inválido',
                text2: 'Ingrese un número celular válido de 10 dígitos.',
            });
            return;
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            Toast.show({
                type: 'error',
                text1: 'Email inválido',
                text2: 'Ingrese un email válido. Ejemplo: usuario@correo.com',
            });
            return;
        }

        if (!selectedSituacionLaboral) {
            Toast.show({
                type: 'error',
                text1: 'Situación laboral requerida',
                text2: 'Seleccione su situación laboral actual.',
            });
            return;
        }

        if (!selectedActividadEconomica) {
            Toast.show({
                type: 'error',
                text1: 'Actividad económica requerida',
                text2: 'Seleccione una actividad económica.',
            });
            return;
        }

        if (!selectedTiempoVivienda) {
            Toast.show({
                type: 'error',
                text1: 'Tiempo de vivienda requerido',
                text2: 'Seleccione cuánto tiempo lleva en su vivienda actual.',
            });
            return;
        }

        if (!selectedTiempoTrabajo) {
            Toast.show({
                type: 'error',
                text1: 'Tiempo de trabajo requerido',
                text2: 'Seleccione cuánto tiempo lleva en su trabajo actual.',
            });
            return;
        }

        if (!selectedProductoSolicitud) {
            Toast.show({
                type: 'error',
                text1: 'Producto de solicitud requerido',
                text2: 'Seleccione el producto que desea solicitar.',
            });
            return;
        }

        const solicitudData = {
            bodega: selectedBodega,
            tipoConsulta: selectedTipoConsulta,
            cedula,
            primerNombre,
            segundoNombre,
            apellidoPaterno,
            apellidoMaterno,
            fechaNacimiento,
            edad,
            celular: Celular,
            email,
            situacionLaboral: selectedSituacionLaboral,
            actividadEconomica: selectedActividadEconomica,
            tiempoVivienda: selectedTiempoVivienda,
            tiempoTrabajo: selectedTiempoTrabajo,
            productoSolicitud: selectedProductoSolicitud,
        };

        try {
            console.log('Datos de solicitud:', solicitudData);

            Toast.show({
                type: 'success',
                text1: 'Solicitud enviada',
                text2: 'Todos los datos fueron validados correctamente.',
            });

            // LLAMARA AL MODAL 
            setDatosSolicitud(solicitudData);
            setModalVisible(true);

            // Aquí podrías hacer await a una llamada a API
        } catch (error) {
            console.error('Error al guardar la solicitud:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Ocurrió un error al guardar la solicitud.',
            });
        }
    };




    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container}>

                    <Text style={styles.text}>📝 Solicitud de Crédito</Text>

                    {/* Bodega */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>📦 Almacén:</Text>
                        <Picker
                            selectedValue={selectedBodega}
                            onValueChange={setSelectedBodega}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            {bodegas.map(b => (
                                <Picker.Item
                                    key={b.Bodega}
                                    label={`${b.Codigo} - ${b.Nombre}`}
                                    value={b.Bodega}
                                />
                            ))}
                        </Picker>
                    </View>

                    {/* Tipo de Consulta */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>📋 Tipo de Consulta:</Text>
                        <Picker
                            selectedValue={selectedTipoConsulta}
                            onValueChange={setSelectedTipoConsulta}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            {tipoConsulta.map(tc => (
                                <Picker.Item
                                    key={tc.idCompraEncuesta}
                                    label={tc.Descripcion}
                                    value={tc.idCompraEncuesta}
                                />
                            ))}
                        </Picker>
                    </View>

                    {/* Cédula */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>🆔 Cédula:</Text>
                        <TextInput
                            value={cedula}
                            onChangeText={(text) => {
                                const filtered = text.replace(/[^0-9]/g, '').slice(0, 10);
                                setCedula(filtered);
                            }}
                            placeholder="Ingrese su cédula"
                            keyboardType="numeric"
                            style={styles.textCedula}
                            maxLength={10}
                        />
                        {cedula.length > 0 && cedula.length !== 10 && (
                            <Text style={styles.errorText}>
                                La cédula debe tener exactamente 10 dígitos.
                            </Text>
                        )}
                    </View>

                    {/* Información del Usuario */}
                    {(primerNombre || apellidoPaterno) && (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>👤 Información del Cliente</Text>

                            <View style={styles.cardRow}>
                                <Text style={styles.cardValue}>
                                    {`${primerNombre} ${segundoNombre} ${apellidoPaterno} ${apellidoMaterno}`.trim()}
                                </Text>
                            </View>

                            <View style={styles.cardRow}>
                                <Text style={styles.cardLabel}>🎂 Fecha de Nacimiento:</Text>
                                <Text style={styles.cardValue}>{fechaNacimiento}</Text>
                            </View>

                            <View style={styles.cardRow}>
                                <Text style={styles.cardLabel}>📅 Edad:</Text>
                                <Text style={styles.cardValue}>{edad}</Text>
                            </View>
                        </View>
                    )}

                    {/* Celular */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>📱 Celular:</Text>
                        <TextInput
                            value={Celular}
                            onChangeText={(text) => {
                                const filtered = text.replace(/[^0-9]/g, '').slice(0, 10);
                                setCelular(filtered);
                            }}
                            placeholder="Ingrese su número celular"
                            keyboardType="numeric"
                            style={styles.textCedula}
                            maxLength={10}
                        />
                        {Celular.length > 0 && Celular.length !== 10 && (
                            <Text style={styles.errorText}>
                                El número de celular debe tener exactamente 10 dígitos.
                            </Text>
                        )}
                    </View>

                    {/* Email */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>📧 Email:</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Ingrese su correo electrónico"
                            keyboardType="email-address"
                            style={styles.textCedula}
                            autoCapitalize="none"
                        />
                        {email.length > 0 && !/\S+@\S+\.\S+/.test(email) && (
                            <Text style={styles.errorText}>
                                El email ingresado no es válido.
                            </Text>
                        )}
                    </View>

                    {/* Situación Laboral */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>💼 Situación Laboral:</Text>
                        <Picker
                            selectedValue={selectedSituacionLaboral}
                            onValueChange={setSelectedSituacionLaboral}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            {Cre_SituacionLaboral.map(tc => (
                                <Picker.Item
                                    key={tc.idSituacionLaboral}
                                    label={tc.Descripcion}
                                    value={tc.idSituacionLaboral}
                                />
                            ))}
                        </Picker>
                    </View>

                    {/* Actividad Económica*/}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>💰 Actividad Económica:</Text>
                        <Picker
                            selectedValue={selectedActividadEconomica}
                            onValueChange={setSelectedActividadEconomica}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            <Picker.Item label="Seleccione una actividad" value={null} />
                            {Cre_ActividadEconomicaByEntidad.map(actividad => (
                                <Picker.Item
                                    key={actividad.idActEconomica}
                                    label={actividad.Nombre}
                                    value={actividad.idActEconomica}
                                />
                            ))}
                        </Picker>
                    </View>


                    {/* Tiempo de Vivienda */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>🏠 Tiempo de Vivienda:</Text>
                        <Picker
                            selectedValue={selectedTiempoVivienda}
                            onValueChange={setSelectedTiempoVivienda}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            {cre_Tiempovivienda.map(tv => (
                                <Picker.Item
                                    key={tv.idCre_Tiempo}
                                    label={tv.Descripcion}
                                    value={tv.idCre_Tiempo}
                                />
                            ))}
                        </Picker>
                    </View>

                    {/* Tiempo de Trabajo */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>🕒 Tiempo de Trabajo:</Text>
                        <Picker
                            selectedValue={selectedTiempoTrabajo}
                            onValueChange={setSelectedTiempoTrabajo}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            {cre_TiempoTrabajo.map(tt => (
                                <Picker.Item
                                    key={tt.idCre_Tiempo}
                                    label={tt.Descripcion}
                                    value={tt.idCre_Tiempo}
                                />
                            ))}
                        </Picker>
                    </View>

                    {/* Producto de Solicitud */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>💳 Producto de Solicitud:</Text>
                        <Picker
                            selectedValue={selectedProductoSolicitud}
                            onValueChange={setSelectedProductoSolicitud}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            {Cre_ProductoSolicitud.map(ps => (
                                <Picker.Item
                                    key={ps.idCre_ProductoSolicitud}
                                    label={ps.Producto}
                                    value={ps.idCre_ProductoSolicitud}
                                />
                            ))}
                        </Picker>
                    </View>

                    {/* Términos y Políticas */}
                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>✅ Acepto los Términos y Condiciones:</Text>
                        <Picker
                            selectedValue={checkTerminos ? "true" : "false"}
                            onValueChange={(itemValue) => setCheckTerminos(itemValue === "true")}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            <Picker.Item label="Sí" value="true" />
                            <Picker.Item label="No" value="false" />
                        </Picker>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>🔐 Acepto las Políticas de Privacidad:</Text>
                        <Picker
                            selectedValue={checkPoliticas ? "true" : "false"}
                            onValueChange={(itemValue) => setCheckPoliticas(itemValue === "true")}
                            style={styles.picker}
                            dropdownIconColor="#000"
                        >
                            <Picker.Item label="Sí" value="true" />
                            <Picker.Item label="No" value="false" />
                        </Picker>
                    </View>

                    {/* button para enviar */}
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText} onPress={() => {
                            handleSaveSolicitud();
                        }}>
                            Enviar Solicitud
                        </Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                        <InfoModal
                            visible={modalVisible}
                            datos={datosSolicitud}
                            token ={userToken}
                            idNomina={idNomina}
                            onClose={codigo => {
                                if (codigo === "timeout") {
                                    Toast.show({ type: "error", text1: "Tiempo agotado", text2: "Debe reintentar" });
                                } else {

                                    setModalVisible(false);
                                }
                            }}
                        />
                    </View>


                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
};
