import { styles } from "./VerificacionCliente.Style"; // Verifica la ruta de estilos
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { RadioGroup } from "../../../../../components";
import { TextInputField } from "../../../../../components";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { MapaCustomModal } from "../../../../../components";
import { APIURL } from "../../../../../config/apiconfig";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../../../utils/screenName";
import { ConfirmationModal } from "../../../../../components";
import { LoadingIndicator } from "../../../../../components";
import NetInfo from "@react-native-community/netinfo";

const Tab = createMaterialTopTabNavigator();
const options = {
  tipoclienteOptions: [
    { value: 1, label: "Cliente", icon: "user" },
    { value: 2, label: "Garante", icon: "user-secret" },
  ],

  tipoViviendaOptions: [
    { value: 1, label: "Casa", icon: "home" },
    { value: 3, label: "Villa", icon: "tree" },
    { value: 4, label: "Mixta", icon: "building-o" },
    { value: 2, label: "Departamento", icon: "building" },
    { value: 5, label: "MediaAgua", icon: "cube" },
  ],

  estadoOptions: [
    { value: 2, label: "Muy Bueno", icon: "star" },
    { value: 1, label: "Bueno", icon: "thumbs-up" },
    { value: 3, label: "Malo", icon: "thumbs-down" },
  ],

  zonaOptions: [
    { value: 1, label: "Urbano", icon: "building" },
    { value: 2, label: "Rural", icon: "leaf" },
  ],

  propiedadOptions: [
    { value: 1, label: "Propio", icon: "key" },
    { value: 3, label: "Familiar", icon: "users" },
    { value: 2, label: "Arrendado", icon: "money" },
  ],

  accesoOptions: [
    { value: 1, label: "Facil", icon: "road" },
    { value: 2, label: "Dificil", icon: "exclamation-triangle" },
  ],

  coberturaSeñalOptions: [
    { value: 1, label: "Llamada Movil", icon: "phone" },
    { value: 2, label: "Whatsapp", icon: "whatsapp" },
  ],

  tipoTrabajoOptions: [
    { value: 1, label: "Dependiente", icon: "id-badge" },
    { value: 2, label: "Independiente", icon: "briefcase" },
    { value: 3, label: "Informal", icon: "user-o" },
  ],
  direccionCoincideOptions: [
    { value: 1, label: "Coincide", icon: "check-circle" },
    { value: 2, label: "No Coincide", icon: "times-circle" },
  ],
  tipoVerificacionOptions: [
    { value: 2, label: "Aprobado", icon: "check-circle" },
    { value: 1, label: "Dirección incorrecta", icon: "map-marker" },
    { value: 3, label: "Malas referencias", icon: "thumbs-down" },
    { value: 4, label: "No vive ahí", icon: "question-circle" },
    { value: 5, label: "Datos falsos", icon: "exclamation-circle" },
   // { value: 6, label: "Zona Vetada", icon: "ban" },
    { value: 7, label: "No sustenta ingresos", icon: "money" },
    { value: 10, label: "Crédito a Terceros", icon: "users" },
  ],
};

const DomicilioTab = ({ state, setState }) => {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState({
    GpsRef: "",
    latitud: "",
    longitud: "",
  });

  const toggleModal = () => setShowModal(!showModal);

  const handleLocationSelect = (selectedLocation) => {
    setLocation({
      latitud: selectedLocation.latitude.toString(),
      longitud: selectedLocation.longitude.toString(),
      GpsRef: selectedLocation.address,
    });
    toggleModal();
  };

  const handleSubmit = () => {
    Alert.alert("Location Submitted", JSON.stringify(location));
    // Add logic to send location to backend if needed
  };

  useEffect(() => {
    // Update callePrincipal and calleSecundaria when location changes
    if (location.latitud && location.longitud) {
      setState((prevState) => ({
        ...prevState,
        refGPS: location.GpsRef,
        callePrincipal: location.latitud,
        calleSecundaria: location.longitud,
      }));
    }
  }, [location, setState]);

  const {
    tipocliente,
    tiempoVivienda,
    tipoVivienda,
    estado,
    zonas,
    valorArrendado,
    callePrincipal,
    calleSecundaria,
    puntoReferencia,
    vecinoEntrevistado,
    personaEntrevistadaDomicilio,
    observacion,
    isArrendado,
    propia,
    acceso,
    coberturaSeñal,
    refGPS,
    callePrincipalRef,
    calleSecundariaRef,
    direccionCoincide,
    tipoVerificacion,

  } = state;
  const renderRadioGroup = (label, value, onChange, options) => (
    <RadioGroup
      label={label}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
  return (
    <View style={styles.container}>
      <Text>Datos de Domicilio</Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Tipo de cliente */}
        {renderRadioGroup(
          "Tipo de Cliente:",
          tipocliente,
          (value) => setState({ ...state, tipocliente: value }),
          options.tipoclienteOptions
        )}
        {/* Direccion coincide */}
        {renderRadioGroup(
          "Dirección coincide:",
          direccionCoincide,
          (value) => setState({ ...state, direccionCoincide: value }),
          options.direccionCoincideOptions
        )}
        {/* tiempo en meses*/}
        <TextInputField
          label={"Tiempo de Vivienda (Meses)"}
          placeholder={"Ingrese tiempo en meses"}
          value={tiempoVivienda}
          onChange={(text) => setState({ ...state, tiempoVivienda: text })}
          keyboardType="numeric"
        />
        {/* Tipo de Vivienda */}
        {renderRadioGroup(
          "Tipo de Vivienda:",
          tipoVivienda,
          (value) => setState({ ...state, tipoVivienda: value }),
          options.tipoViviendaOptions
        )}
        {/* Estado vivienda */}
        {renderRadioGroup(
          "Estado Vivienda:",
          estado,
          (value) => setState({ ...state, estado: value }),
          options.estadoOptions
        )}
        {/* Zona de Vivienda */}
        {renderRadioGroup(
          "Zona de Vivienda:",
          zonas,
          (value) => setState({ ...state, zonas: value }),
          options.zonaOptions
        )}
        {/* Propiedad */}
        {renderRadioGroup(
          "Propiedad:",
          propia,
          (value) => setState({ ...state, propia: value }),
          options.propiedadOptions
        )}
        {propia == 2 && (
          <TextInputField
            label="Valor Arrendado"
            placeholder="Ingrese valor arrendado"
            value={valorArrendado}
            onChange={(text) => setState({ ...state, valorArrendado: text })}
            keyboardType="decimal-pad"
          />
        )}
        {/* Acceso */}
        {renderRadioGroup(
          "Acceso:",
          acceso,
          (value) => setState({ ...state, acceso: value }),
          options.accesoOptions
        )}
        {/* Cobertura de Señal */}
        {renderRadioGroup(
          "Cobertura de Señal:",
          coberturaSeñal,
          (value) => setState({ ...state, coberturaSeñal: value }),
          options.coberturaSeñalOptions
        )}
        <TextInputField
          label="Punto de Referencia"
          placeholder="Ingrese punto de referencia"
          value={puntoReferencia}
          onChange={(text) => setState({ ...state, puntoReferencia: text })}
        />
        <TextInputField
          label="Persona Entrevistada"
          placeholder="Ingrese nombre"
          value={personaEntrevistadaDomicilio}
          onChange={(text) =>
            setState({ ...state, personaEntrevistadaDomicilio: text })
          }
        // keyboardType="numeric" // Teclado numérico
        //keyboardType="decimal-pad" // Teclado para números decimales
        />

        <TextInputField
          label="Observación"
          placeholder="Ingrese observación"
          value={observacion}
          onChange={(text) => setState({ ...state, observacion: text })}
          multiline // Campo de texto multilinea
          numberOfLines={3} // Número de líneas
        />

        <TextInputField
          label="Vecino Entrevistado"
          placeholder="Ingrese nombre"
          value={vecinoEntrevistado}
          onChange={(text) => setState({ ...state, vecinoEntrevistado: text })}
        />
        <TextInputField
          label="Calle Principal"
          placeholder="Ingrese Calle Principal"
          value={callePrincipalRef}
          onChange={(text) => setState({ ...state, callePrincipalRef: text })}
        />
        <TextInputField
          label="Calle Secundaria"
          placeholder="Ingrese Calle Secundaria"
          value={calleSecundariaRef}
          onChange={(text) => setState({ ...state, calleSecundariaRef: text })}
        />
        <ScrollView contentContainerStyle={styles.containerMaps}>
          <View style={styles.overlay}>
            <Icon name="map-marker" size={50} onPress={toggleModal} />
            <MapaCustomModal
              visible={showModal}
              onClose={toggleModal}
              onLocationSelect={handleLocationSelect}
            />
          </View>
        </ScrollView>
        <View style={styles.container}>
          <TextInputField
            label="GPS"
            placeholder="Ingrese GPS"
            value={refGPS}
            onChange={(text) => setState({ ...state, refGPS: text })}
            multiline // Campo de texto multilinea
            numberOfLines={4} // Número de líneas
            editable={false}
            pointerEvents="none"
          />
          <TextInputField
            label="Latitud"
            placeholder="Ingrese calle principal"
            value={callePrincipal}
            onChange={(text) => setState({ ...state, callePrincipal: text })}
            editable={false}
            pointerEvents="none"
          />
          <TextInputField
            label="Longitud"
            placeholder="Ingrese calle secundaria"
            value={calleSecundaria}
            onChange={(text) => setState({ ...state, calleSecundaria: text })}
            editable={false}
            pointerEvents="none"
          />
          {renderRadioGroup(
            "Resultado Verificación:",
            tipoVerificacion,
            (value) => setState({ ...state, tipoVerificacion: value }),
            options.tipoVerificacionOptions
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const DomicilioImagenesTab = ({ state, setState, type }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "¡Lo siento! Necesitamos permisos para acceder a tu galería de fotos."
        );
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && Array.isArray(result.assets)) {
      const newImages = result.assets.map((asset) => asset.uri || "");
      setImages((prevImages) => [...newImages, ...prevImages]);
      setState((prev) => ({
        ...prev,

        [type]: [...newImages, ...prev[type]],
      }));
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter((image) => image !== uri));
    setState((prev) => ({
      ...prev,
      [type]: prev[type].filter((image) => image !== uri),
    }));
  };
  return (
    <View>
      <TouchableOpacity style={styles.buttonImage} onPress={handleImagePicker}>
        <Icon name="camera" size={30} color="#fff" />
        <Text style={styles.buttonTextImage}>Seleccionar Imágenes</Text>
      </TouchableOpacity>

      <ScrollView style={styles.containerImage}>
        <Text style={{ marginVertical: 10 }}>
          Imágenes seleccionadas: {images.length}{" "}
          {images.length < 5 ? "(¡Selecciona al menos 5!)" : ""}
        </Text>

        <View style={styles.imageListImage}>
          {images.map((image, index) => (
            <View
              key={index}
              style={{
                position: "relative",
                marginBottom: 10,
                width: "58%",
                height: 100,
              }}
            >
              <Image source={{ uri: image }} style={styles.imageImage} />
              <TouchableOpacity
                onPress={() => removeImage(image)}
                style={{ position: "absolute", top: 5, right: 5 }}
              >
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const LaboralTab = ({ state, setState }) => {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState({
    GpsRef: "",
    latitud: "",
    longitud: "",
  });

  const toggleModal = () => setShowModal(!showModal);

  const handleLocationSelect = (selectedLocation) => {
    setLocation({
      latitud: selectedLocation.latitude.toString(),
      longitud: selectedLocation.longitude.toString(),
      GpsRef: selectedLocation.address,
    });
    toggleModal();
  };

  const handleSubmit = () => {
    Alert.alert("Location Submitted", JSON.stringify(location));
    // Add logic to send location to backend if needed
  };

  useEffect(() => {
    // Update callePrincipal and calleSecundaria when location changes
    if (location.latitud && location.longitud) {
      setState((prevState) => ({
        ...prevState,
        refGPSLab: location.GpsRef,
        callePrincipalLaboral: location.latitud,
        calleSecundariaLaboral: location.longitud,
      }));
    }
  }, [location, setState]);

  const {
    tipoTrabajo,
    tiempoTrabajo,
    tiempoTrabajoMeses,
    ingresosMensuales,
    actividadLaboral,
    telefonoLaboral,
    refGPSLab,
    callePrincipalLaboral,
    calleSecundariaLaboral,
    puntoReferenciaLaboral,
    personaEntrevistada,
    callePrincipalLaboralRef,
    calleSecundariaLaboralRef,
    direccionCoincide,
    tipoVerificacion,
    observacionLaboral,
  } = state;
  const renderRadioGroup = (label, value, onChange, options) => (
    <RadioGroup
      label={label}
      options={options}
      value={value}
      onChange={onChange}
    />
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Campos de Laboral */}
      {renderRadioGroup(
        "Tipo de Trabajo:",
        tipoTrabajo,
        (value) => setState({ ...state, tipoTrabajo: value }),
        options.tipoTrabajoOptions
      )}

      {renderRadioGroup(
        "Dirección coincide:",
        direccionCoincide,
        (value) => setState({ ...state, direccionCoincide: value }),
        options.direccionCoincideOptions
      )}
      <TextInputField
        label="Tiempo de Trabajo (Meses)"
        placeholder="Ingrese tiempo en meses"
        value={tiempoTrabajoMeses}
        onChange={(text) => setState({ ...state, tiempoTrabajoMeses: text })}
        keyboardType="numeric"
      />
      <TextInputField
        label="Tiempo de Trabajo (Años)"
        placeholder="Ingrese tiempo en años"
        value={tiempoTrabajo}
        onChange={(text) => setState({ ...state, tiempoTrabajo: text })}
        keyboardType="numeric"
      />
      <TextInputField
        label="Ingresos Mensuales"
        placeholder="Ingrese ingresos mensuales"
        value={ingresosMensuales}
        onChange={(text) => setState({ ...state, ingresosMensuales: text })}
        keyboardType="decimal-pad"
      />
      <TextInputField
        label="Actividad Laboral"
        placeholder="Ingrese actividad laboral"
        value={actividadLaboral}
        onChange={(text) => setState({ ...state, actividadLaboral: text })}
      />
      <TextInputField
        label="Teléfono Laboral"
        placeholder="Ingrese teléfono laboral"
        value={telefonoLaboral}
        onChange={(text) => setState({ ...state, telefonoLaboral: text })}
        keyboardType="phone-pad"
      />
      <TextInputField
        label="Punto de Referencia Laboral"
        placeholder="Ingrese punto de referencia"
        value={puntoReferenciaLaboral}
        onChange={(text) =>
          setState({ ...state, puntoReferenciaLaboral: text })
        }
      />
      <TextInputField
        label="Persona Entrevistada"
        placeholder="Ingrese nombre"
        value={personaEntrevistada}
        onChange={(text) => setState({ ...state, personaEntrevistada: text })}
      />
      <TextInputField
        label="Calle Principal"
        placeholder="Ingrese Calle Principal"
        value={callePrincipalLaboralRef}
        onChange={(text) => setState({ ...state, callePrincipalLaboralRef: text })}
      />
      <TextInputField
        label="Calle Secundaria"
        placeholder="Ingrese Calle Secundaria"
        value={calleSecundariaLaboralRef}
        onChange={(text) => setState({ ...state, calleSecundariaLaboralRef: text })}
      />
      <TextInputField
        label="Observación"
        placeholder="Ingrese Observación"
        value={observacionLaboral}
        onChange={(text) => setState({ ...state, observacionLaboral: text })}
      />
      <ScrollView contentContainerStyle={styles.containerMaps}>
        <View style={styles.overlay}>
          <Icon name="map-marker" size={50} onPress={toggleModal} />
          <MapaCustomModal
            visible={showModal}
            onClose={toggleModal}
            onLocationSelect={handleLocationSelect}
          />
        </View>
      </ScrollView>
      <View style={styles.container}>
        <TextInputField
          label="GPS"
          placeholder="Ingrese GPS"
          value={refGPSLab}
          onChange={(text) => setState({ ...state, refGPSLab: text })}
          multiline // Campo de texto multilinea
          numberOfLines={4} // Número de líneas
          editable={false}
          pointerEvents="none"
        />
        <TextInputField
          label="Latitud"
          placeholder="Ingrese Latitud "
          value={callePrincipalLaboral}
          onChange={(text) =>
            setState({ ...state, callePrincipalLaboral: text })
          }
          editable={false}
          pointerEvents="none"
        />
        <TextInputField
          label="Longitud"
          placeholder="Ingrese Longitud"
          value={calleSecundariaLaboral}
          onChange={(text) =>
            setState({ ...state, calleSecundariaLaboral: text })
          }
          editable={false}
          pointerEvents="none"
        />
        {renderRadioGroup(
          "Resultado Verificación:",
          tipoVerificacion,
          (value) => setState({ ...state, tipoVerificacion: value }),
          options.tipoVerificacionOptions
        )}
      </View>
    </ScrollView>
  );
};

export function VerificacionCliente({ route, navigation }) {
  const { item, tipo } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [data, setData] = useState({});
  const [activeButton, setActiveButton] = useState('detalles');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    tiempoVivienda: "",
    valorArrendado: "",
    callePrincipal: "",
    calleSecundaria: "",
    refGPS: "",
    puntoReferencia: "",
    vecinoEntrevistado: "",
    observacion: "",
    tiempoTrabajo: "",
    tiempoTrabajoMeses: "",
    ingresosMensuales: "",
    actividadLaboral: "",
    telefonoLaboral: "",
    refGPSLab: "",
    callePrincipalLaboral: "",
    calleSecundariaLaboral: "",
    puntoReferenciaLaboral: "",
    personaEntrevistada: "",
    personaEntrevistadaDomicilio: "",
    tipoVivienda: 1,
    tipocliente: 1,
    estado: 2,
    zonas: 1,
    isArrendado: false,
    propia: 1,
    acceso: 1, // Valor por defecto agregado
    coberturaSeñal: 1, // Valor por defecto agregado
    tipoTrabajo: 1,
    direccionCoincide: 1,
    tipoVerificacion: 0,
    domicilioImages: [],
    laboralImages: [],
    callePrincipalRef: "",
    calleSecundariaRef: "",
    callePrincipalLaboralRef: "",
    calleSecundariaLaboralRef: "",
    observacionLaboral: "",
  });

  const [showTabContent, setShowTabContent] = useState({
    Domicilio: false,
    Laboral: false,
  });

  const toggleTabContent = (tab) => {
    setShowTabContent((prev) => ({
      ...prev,
      [tab]: !prev[tab],
    }));
  };

  const validateFields = () => {
  
    const rules = {
      domicilio: {
        tiempoVivienda: { min: 1, max: 120, label: "Tiempo de Vivienda" },
        puntoReferencia: { min: 10, max: 249, label: "Punto de Referencia" },
        vecinoEntrevistado: { min: 1, max: 100, label: "Vecino Entrevistado" },
        callePrincipalRef: { min: 5, max: 250, label: "Calle Principal" },
        calleSecundariaRef: { min: 5, max: 250, label: "Calle Secundaria" },
        callePrincipal: { min: 1, max: 100, label: "Ubicación Domicilio" },
        calleSecundaria: { min: 1, max: 100, label: "Ubicación Domicilio" },
        refGPS: { min: 5, max: 100, label: "Ubicación Domicilio" },
        personaEntrevistadaDomicilio: {
          min: 1, max: 100, label: "Persona Entrevistada",
        },
        observacion: { min: 1, max: 500, label: "Observación" },
      },
      laboral: {
        tiempoTrabajo: { min: 1, max: 2, label: "Tiempo de Trabajo" },
        tiempoTrabajoMeses: {
          min: 1,
          max: 2,
          label: "Tiempo de Trabajo (Meses)",
        },
        ingresosMensuales: {
          min: 1,
          max: Infinity,
          label: "Ingresos Mensuales",
        },
        actividadLaboral: { min: 20, max: 100, label: "Actividad Laboral" },
        telefonoLaboral: { min: 9, max: 10, label: "Teléfono Laboral" },
        callePrincipalLaboral: {
          min: 20,
          max: 100,
          label: "Calle Principal Laboral",
        },
        calleSecundariaLaboral: {
          min: 20,
          max: 100,
          label: "Calle Secundaria Laboral",
        },
        puntoReferenciaLaboral: {
          min: 20,
          max: 100,
          label: "Punto de Referencia Laboral",
        },
        personaEntrevistada: {
          min: 1,
          max: 100,
          label: "Persona Entrevistada",
        },
        callePrincipalLaboralRef: {
          min: 5,
          max: 250,
          label: "Calle Principal Laboral",
        },
        calleSecundariaLaboralRef: {
          min: 5,
          max: 250,
          label: "Calle Secundaria Laboral",
        },
        observacionLaboral: { min: 10, max: 500, label: "Observación" },
        callePrincipalLaboral: { min: 1, max: 100, label: "Ubicación Trabajo" },
        calleSecundariaLaboral: {
          min: 1,
          max: 100,
          label: "Ubicación Trabajo",
        },
        refGPSLab: { min: 5, max: 100, label: "Ubicación Trabajo" },
      },

    };

    let missingFields = { domicilio: [], laboral: [] };
    let invalidFields = { domicilio: [], laboral: [] };

    // Validar campos de Domicilio
    if (item.bDomicilio && tipo == 1) {
      for (const [key, { min, max, label }] of Object.entries(
        rules.domicilio
      )) {
        const value = state[key] ? state[key].trim() : "";
        if (value === "") {
          missingFields.domicilio.push(label);
        } else {
          const length = value.length; // Obtener la longitud de la cadena
          if (length < min || length > max) {
            invalidFields.domicilio.push(
              `${label} (debe tener entre ${min} y ${max === Infinity ? "infinito" : max
              } letras)`
            );
          }
        }
      }
      if (state.propia === 2) {  // Verifica si la propiedad es arrendada (propia === 2)
        const valorArrendado = state.valorArrendado ? parseFloat(state.valorArrendado) : 0; // Aseguramos que sea un número

        // Si el campo valorArrendado está vacío o tiene un valor menor o igual a 0, se marca como inválido
        if (valorArrendado <= 0 || isNaN(valorArrendado)) {
          invalidFields.domicilio.push("Ingresos el valor arrendado (debe ser mayor que 0)");
        }
      }

      if (state.domicilioImages.length < 5) {
        invalidFields.domicilio.push(
          "Se requieren al menos 5 imágenes para Domicilio."
        );
      }

      if (state.tipoVerificacion == 0) {
        invalidFields.domicilio.push(
          "Se requiere seleccionar un resultado de verificación."
        );
      }
    }

    // Validar campos de Laboral
    if (item.bTrabajo && tipo == 2) {
      for (const [key, { min, max, label }] of Object.entries(rules.laboral)) {
        const value = state[key] ? state[key].trim() : "";
        if (value === "") {
          missingFields.laboral.push(label);
        } else {
          const length = value.length; // Obtener la longitud de la cadena
          if (length < min || length > max) {
            invalidFields.laboral.push(
              `${label} (debe tener entre ${min} y ${max === Infinity ? "infinito" : max
              } letras)`
            );
          }
        }
      }
      if (state.laboralImages.length < 5) {
        invalidFields.laboral.push(
          "Se requieren al menos 5 imágenes para Laboral."
        );
      }
      if (state.tipoVerificacion == 0) {
        invalidFields.domicilio.push(
          "Se requiere seleccionar un resultado de verificación."
        );
      }
    }

    // Mostrar alertas para campos faltantes o inválidos
    let alertMessage = "";

    if (missingFields.domicilio.length > 0) {
      alertMessage += `Domicilio:\n- ${missingFields.domicilio.join(
        "\n- "
      )}\n\n`;
    }

    if (invalidFields.domicilio.length > 0) {
      alertMessage += `Domicilio (inválidos):\n- ${invalidFields.domicilio.join(
        "\n- "
      )}\n\n`;
    }

    if (missingFields.laboral.length > 0) {
      alertMessage += `Laboral:\n- ${missingFields.laboral.join("\n- ")}\n\n`;
    }

    if (invalidFields.laboral.length > 0) {
      alertMessage += `Laboral (inválidos):\n- ${invalidFields.laboral.join(
        "\n- "
      )}\n\n`;
    }

    if (alertMessage) {
      Alert.alert("Problemas de Validación", alertMessage.trim());
      return false;
    }
    return true;
  };


  const saveVerificationDomicilio = async (data, tipoS) => {
    const url =
      tipoS === 1
        ? APIURL.postTerrenaGestionDomicilioSave()
        : APIURL.postTerrenaGestionTrabajoSave();
    const tipoUrl = tipoS === 1 ? "Domicilio" : "Trabajo";
    const urlGoogle = APIURL.putGoogle();
    const uploadedImageUrls = [];
    const tipoVariable = tipoS === 1 ? "domicilioImages" : "trabajoImages";

    setLoading(true); // Iniciar el indicador de carga

    // Verificar conectividad a Internet
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Alert.alert("Error", "No hay conexión a Internet.");
      setLoading(false);
      return;
    }

    try {
      for (const imagePath of data[tipoVariable]) {
        const formData = new FormData();
        formData.append("file", {
          uri: imagePath,
          name: `${Date.now()}.jpg`,
          type: "image/jpeg",
        });
        formData.append("cedula", item.Ruc); // Asegúrate de que 'cedula' esté correctamente referenciado
        formData.append("nombre_del_archivo", `${Date.now()}.jpg`);
        formData.append("tipo", tipoUrl);

        // Hacer la solicitud a la API de Google
        const responseGoogle = await fetch(urlGoogle, {
          method: "PUT",
          body: formData,
        });

        // Verificar si la respuesta es exitosa
        if (!responseGoogle.ok) {
          const errorResponse = await responseGoogle.json();
          throw new Error(`Error en la subida de la imagen: ${responseGoogle.status} - ${errorResponse.message || responseGoogle.statusText}`);
        }

        const responseGoogleData = await responseGoogle.json();

        // Capturar la URL nueva de la respuesta
        if (responseGoogleData.status !== "success") {
          throw new Error(`Error en la respuesta de Google: ${responseGoogleData.message}`);
        }

        uploadedImageUrls.push(responseGoogleData.url);
      }

      // Hacer la solicitud para guardar los datos solo si todas las imágenes fueron subidas correctamente
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, [tipoVariable]: uploadedImageUrls }),
      });

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        const errorResponse = await response.json(); // Captura el cuerpo de la respuesta
        throw new Error(`Error al guardar los datos: ${response.status} - ${errorResponse.message || response.statusText}`);
      }

      const responseData = await response.json();
      Alert.alert("Éxito", "Datos guardados exitosamente.");
      navigation.navigate(screen.terreno.tab, {
        screen: screen.terreno.inicio,
      });

    } catch (error) {
      console.error("Error al guardar los datos final:", error.message); // Solo imprimir el mensaje del error

      // Manejo de errores específicos
      if (error.message.includes("401")) {
        Alert.alert("Error", "No autorizado. Verifique sus credenciales.");
      } else if (error.message.includes("500")) {
        Alert.alert("Error", "Error interno en el servidor. Inténtelo más tarde.");
      } else {
        Alert.alert("Error", `No se pudieron guardar los datos. ${error.message}`);
      }
    } finally {
      setLoading(false); // Finalizar el indicador de carga
    }
  };

  const handleSave = () => {

    let valid = validateFields();
   
    if (valid) {
      let newData = {};
      if (tipo === 1) {
        newData = {
          idTerrenaGestionDomicilio: 0,
          idClienteVerificacion: parseInt(item.idClienteVerificacion, 10),
          idTerrenaTipoCliente: parseInt(state.tipocliente, 10),
          iTiempoVivienda: parseInt(state.tiempoVivienda, 10),
          idTerrenaTipoVivienda: parseInt(state.tipoVivienda, 10),
          idTerrenaEstadoVivienda: parseInt(state.estado, 10) || 1,
          idTerrenaZonaVivienda: parseInt(state.zonas, 10) || 1,
          idTerrenaPropiedad: parseInt(state.propia, 10) || 1,
          idTerrenaAcceso: parseInt(state.acceso, 10) || 1,
          idTerrenaCobertura: parseInt(state.coberturaSeñal, 10) || 1,
          PuntoReferencia: state.puntoReferencia || "",
          PersonaEntrevistada: state.personaEntrevistadaDomicilio || "",
          Observaciones: state.observacion || "",
          VecinoEntreVisto: state.vecinoEntrevistado || "",
          DireccionesVisitada: state.refGPS || "",
          Latitud: state.callePrincipal || "",
          Longitud: state.calleSecundaria || "",
          domicilioImages: state.domicilioImages || [],
          CallePrincipal: state.callePrincipalRef || "",
          CalleSecundaria: state.calleSecundariaRef || "",
          ValorArrendado: parseInt(state.propia, 10) === 2 ? state.valorArrendado : 0,
          direccionCoincide: state.direccionCoincide || 1,
          tipoVerificacion: state.tipoVerificacion || 1,

        };
      } else {

        newData = {
          idTerrenaGestionTrabajo: 0,
          idClienteVerificacion: item.idClienteVerificacion,
          idTerrenaTipoTrabajo: parseInt(state.tipoTrabajo, 10) || 1,
          iTiempoTrabajo: parseInt(state.tiempoTrabajoMeses, 10) || 1,
          iTiempoTrabajoYear: parseInt(state.tiempoTrabajo, 10) || 1,
          dIngresoTrabajo: state.ingresosMensuales || 0,
          ActividadTrabajo: state.actividadLaboral || "",
          TelefonoTrabajo: state.telefonoLaboral || "",
          PuntoReferencia: state.puntoReferenciaLaboral || "",
          PersonaEntrevistada: state.personaEntrevistada || "",
          DireccionesVisitada: state.refGPSLab || "",
          Latitud: state.callePrincipalLaboral || "",
          Longitud: state.calleSecundariaLaboral || "",
          trabajoImages: state.laboralImages || [],
          CallePrincipal: state.callePrincipalLaboralRef || "",
          CalleSecundaria: state.calleSecundariaLaboralRef || "",
          direccionCoincide: state.direccionCoincide || 1,
          tipoVerificacion: state.tipoVerificacion || 1,
          Observaciones: state.observacionLaboral || "",
        };
      }
   
      //return;
      setData(newData); // Guardar los datos para pasarlos al modal
      setModalVisible(true); // Mostrar el modal de confirmación
    }
  };

  const handleConfirm = () => {
    saveVerificationDomicilio(data, tipo); // Guardar los datos
    setModalVisible(false); // Cerrar el modal
  };
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  if (!item) {
    return <Text>No hay datos de cliente disponibles.</Text>;
  }
  return (
    <View style={styles.screenContainer}>
      <View style={styles.row}>
        <Icon name="user" size={20} color="#228b22" style={styles.icon} />
        <Text style={styles.cardSubtitle}>{item.Nombres}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeButton === 'detalles' && styles.activeTab]}
          onPress={() => {
            setShowImages(false);
            setActiveButton('detalles');
          }}
        >
          <Text style={[styles.buttonText, activeButton === 'detalles' && styles.activeButtonText]}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeButton === 'imagenes' && styles.activeTab]}
          onPress={() => {
            setShowImages(true);
            setActiveButton('imagenes');
          }}
        >
          <Text style={[styles.buttonText, activeButton === 'imagenes' && styles.activeButtonText]}>Imágenes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {!showImages ? (
          // Vista de detalles
          <>
            {item.bDomicilio && tipo === 1 && (
              <DomicilioTab state={state} setState={setState} />
            )}
            {item.bTrabajo && tipo === 2 && (
              <LaboralTab state={state} setState={setState} />
            )}
          </>
        ) : (
          // Vista de imágenes
          <>
            {item.bDomicilio && tipo === 1 && (
              <DomicilioImagenesTab
                state={state}
                setState={setState}
                type="domicilioImages"
              />
            )}
            {item.bTrabajo && tipo === 2 && (
              <DomicilioImagenesTab
                state={state}
                setState={setState}
                type="laboralImages"
              />
            )}
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.button} onPress={handleSave}>
          Guardar
        </Button>
        <LoadingIndicator visible={loading} />
        <ConfirmationModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleConfirm}
        />
      </View>
    </View>
  );
}
