import { styles } from "./VerificacionClienteSearch.style"; // Verifica la ruta de estilos
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image, TouchableOpacity 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RadioGroup } from "../../../../../components";
import { TextInputField } from "../../../../../components";
import * as ImagePicker from "expo-image-picker";
import { screen } from "../../../../../utils/screenName";
import { APIURL } from "../../../../../config/apiconfig";
import axios from "axios";
const Tab = createMaterialTopTabNavigator();
const options = {
  tipoclienteOptions: [
    { value: 1, label: "Cliente", icon: "home" },
    { value: 2, label: "Garante", icon: "building" },
  ],

  tipoViviendaOptions: [
    { value: 1, label: "Casa", icon: "home" },
    { value: 3, label: "Villa", icon: "tree" },
    { value: 4, label: "Mixta", icon: "building" },
    { value: 2, label: "Departamento", icon: "building" },
    { value: 5, label: "MediaAgua", icon: "leaf" },
  ],

  estadoOptions: [
    { value: 2, label: "Muy Bueno", icon: "smile-o" },
    { value: 1, label: "Bueno", icon: "meh-o" },
    { value: 3, label: "Malo", icon: "frown-o" },
  ],

  zonaOptions: [
    { value: 1, label: "Urbano", icon: "building" },
    { value: 2, label: "Rural", icon: "tree" },
  ],

  propiedadOptions: [
    { value: 1, label: "Propio", icon: "key" },
    { value: 3, label: "Familiar", icon: "users" },
    { value: 2, label: "Arrendado", icon: "money" },
  ],

  accesoOptions: [
    { value: 1, label: "Facil", icon: "key" },
    { value: 2, label: "Dificil", icon: "users" },
  ],

  coberturaSeñalOptions: [
    { value: 1, label: "Llamada Movil", icon: "phone" }, // Cambié a "phone" para más claridad
    { value: 2, label: "Whatsapp", icon: "comments" }, // Cambié a "comments" para representar mejor la app
  ],

  tipoTrabajoOptions: [
    { value: 1, label: "Dependiente", icon: "building" },
    { value: 2, label: "Independiente", icon: "briefcase" }, // Cambié a "briefcase" para representar mejor el trabajo independiente
    { value: 3, label: "Informal", icon: "user" }, // Cambié a "user" para dar un sentido más personal
  ],
};

const DomicilioTab = ({ state, setState }) => {
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
  } = state;

  const renderInfoRow = (iconName, label, value) => (
    <View style={styles.infoRow}>
      <Icon name={iconName} size={24} color="#000" />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
  
;

  const renderRadioGroupvIEW = (label, value, options) => (
    <View style={styles.infoRow}>
      <Icon name="check-circle" size={24} color="#000" />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{options.find(option => option.value === value)?.label}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Datos de Domicilio</Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {renderRadioGroupvIEW("Tipo de Cliente :", tipocliente, options.tipoclienteOptions)}
        {renderInfoRow("clock-o", "Tiempo de Vivienda (Meses):", tiempoVivienda)}
        {renderRadioGroupvIEW("Tipo de Vivienda :", tipoVivienda, options.tipoViviendaOptions)}
        {renderRadioGroupvIEW("Estado Vivienda :", estado, options.estadoOptions)}
        {renderRadioGroupvIEW("Zona de Vivienda :", zonas, options.zonaOptions)}
        {renderRadioGroupvIEW("Propiedad :", propia, options.propiedadOptions)}
        {isArrendado && (
          <TextInputField
            label="Valor Arrendado"
            placeholder="Ingrese valor arrendado"
            value={valorArrendado}
            onChange={(text) => setState({ ...state, valorArrendado: text })}
            keyboardType="decimal-pad"
          />
        )}
        {renderRadioGroupvIEW("Acceso :", acceso, options.accesoOptions)}
        {renderRadioGroupvIEW("Cobertura de Señal :", coberturaSeñal, options.coberturaSeñalOptions)}
        {renderInfoRow("map-marker", "Punto de Referencia:", puntoReferencia)}
        {renderInfoRow("user", "Persona Entrevistada:", personaEntrevistadaDomicilio)}
        {renderInfoRow("comment", "Observación:", observacion)}
        {renderInfoRow("users", "Vecino Entrevistado:", vecinoEntrevistado)}
        {renderInfoRow("users", "GPS:", refGPS)}
        {renderInfoRow("map-marker", "Latitud:", callePrincipal)}
        {renderInfoRow("map-marker", "Longitud:", calleSecundaria)}
      </ScrollView>
    </View>
  );
};

const DomicilioImagenesTab = ({ state, setState, type }) => {
  const [images, setImages] = useState(state[type] || []);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("¡Lo siento! Necesitamos permisos para acceder a tu galería de fotos.");
      }
    })();
  }, []);

  return (
    <View style={styles.containerImage}>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {state[type] && state[type].map((imgUrl, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: imgUrl }} style={styles.imageImage} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const LaboralTab = ({ state, setState }) => {
  
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
  } = state;
  const renderInfoRow = (iconName, label, value) => (
    <View style={styles.infoRow}>
      <Icon name={iconName} size={24} color="#000" accessibilityLabel={label} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
  

  const renderRadioGroupvIEW = (label, value, options) => (
    <View style={styles.infoRow}>
      <Icon name="check-circle" size={24} color="#000" />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{options.find(option => option.value === value)?.label}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      {renderRadioGroupvIEW("Tipo de Trabajo :", tipoTrabajo, options.tipoTrabajoOptions)}
      {renderInfoRow("clock-o", "Tiempo de Trabajo (Meses):", tiempoTrabajoMeses)}
      {renderInfoRow("clock-o", "Tiempo de Trabajo (Años):", tiempoTrabajo)}
      {renderInfoRow("money", "Ingresos Mensuales:", ingresosMensuales)}
      {renderInfoRow("briefcase", "Actividad Laboral:", actividadLaboral)}
      {renderInfoRow("phone", "Teléfono Laboral:", telefonoLaboral)}
      {renderInfoRow("map-marker", "Punto de Referencia Laboral:", puntoReferenciaLaboral)}
      {renderInfoRow("user", "Persona Entrevistada:", personaEntrevistada)}
      {renderInfoRow("users", "GPS:", refGPSLab)}
      {renderInfoRow("map-marker", "Latitud:", callePrincipalLaboral)}
      {renderInfoRow("map-marker", "Longitud:", calleSecundariaLaboral)}
    </ScrollView>
  );
};

export function VerificacionClienteSearch({ route, navigation }) {
  const { item, tipo } = route.params;
  const [activeTab, setActiveTab] = useState(tipo === 2 ? 'Laboral' : 'Domicilio');
  const [activeButton, setActiveButton] = useState('detalles');
  const [showImages, setShowImages] = useState(false); 
  if (!item) {
    return <Text>No hay datos de cliente disponibles.</Text>;
  }

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
    tipoVivienda: 0,
    tipocliente: 0,
    estado: 0,
    zonas: 0,
    isArrendado: false,
    propia: 0,
    acceso: 0, // Valor por defecto agregado
    coberturaSeñal: 0, // Valor por defecto agregado
    tipoTrabajo: 0,
    domicilioImages: [],
    laboralImages: [],
  });

 

  useEffect(() => {
    const fetchData = async () => {
      let urlsearch = tipo === 2 
        ? APIURL.getClientesVerificionTerrenaid(item.idTerrenaGestionTrabajo)
        : APIURL.getClientesVerificacionDomicilioid(item.idTerrenaGestionDomicilio);
     
      try {
        const response = await axios.get(urlsearch);
        const ubicacion = response.data.ubicaciones[0]; // Asumiendo que solo te interesa el primer elemento
         console.log(ubicacion);
        if (ubicacion) {
          if (tipo === 2) {
            setState((prevState) => ({
              ...prevState,
              tiempoTrabajo: ubicacion.iTiempoTrabajoYear.toString(),
              tiempoTrabajoMeses: ubicacion.iTiempoTrabajo.toString(),
              tipoTrabajo: ubicacion.idTerrenaTipoTrabajo,
              ingresosMensuales: ubicacion.dIngresoTrabajo.toString(),
              actividadLaboral: ubicacion.ActividadTrabajo,
              telefonoLaboral: ubicacion.TelefonoTrabajo,
              puntoReferenciaLaboral: ubicacion.PuntoReferencia,
              personaEntrevistada: ubicacion.PersonaEntrevistada,
              refGPSLab: ubicacion.DireccionesVisitada,
              callePrincipalLaboral: ubicacion.Latitud.toString(),
              calleSecundariaLaboral: ubicacion.Longitud.toString(),
              laboralImages: JSON.parse(ubicacion.trabajoImages),
            }));
          }else {
            setState((prevState) => ({
               
              ...prevState,
              tipocliente : ubicacion.idTerrenaTipoCliente,
              tiempoVivienda : ubicacion.iTiempoVivienda.toString(),
              tipoVivienda : ubicacion.idTerrenaTipoVivienda,
              estado : ubicacion.idTerrenaEstadoVivienda,
              zonas : ubicacion.idTerrenaZonaVivienda,
              propia : ubicacion.idTerrenaPropiedad,
              acceso : ubicacion.idTerrenaAcceso,
              coberturaSeñal : ubicacion.idTerrenaCobertura,
              puntoReferencia : ubicacion.PuntoReferencia,
              personaEntrevistadaDomicilio : ubicacion.PersonaEntrevistada,
              observacion : ubicacion.Observaciones,
              vecinoEntrevistado : ubicacion.VecinoEntreVisto,
              callePrincipal: ubicacion.Latitud.toString(),
              calleSecundaria: ubicacion.Longitud.toString(),
              refGPS: ubicacion.DireccionesVisitada,
              domicilioImages: JSON.parse(ubicacion.domicilioImages),
            }));

          }
        } else {
          Alert.alert("Error", "No se encontraron datos para el cliente.");
        }
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al obtener los datos.");
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [item, tipo]);

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
            setActiveButton('detalles'); // Cambiar el botón activo
          }}
        >
          <Text style={[styles.buttonText, activeButton === 'detalles' && styles.activeButtonText]}>Detalles</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeButton === 'imagenes' && styles.activeTab]} 
          onPress={() => {
            setShowImages(true);
            setActiveButton('imagenes'); // Cambiar el botón activo
          }}
        >
          <Text style={[styles.buttonText, activeButton === 'imagenes' && styles.activeButtonText]}>Imágenes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {showImages ? (
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
        ) : (
          <>
            {item.bDomicilio && tipo === 1 && (
              <DomicilioTab state={state} setState={setState} />
            )}
            {item.bTrabajo && tipo === 2 && (
              <LaboralTab state={state} setState={setState} />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
