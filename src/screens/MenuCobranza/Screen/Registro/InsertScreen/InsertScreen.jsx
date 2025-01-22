import React, { useEffect, useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Asegúrate de tener esta librería
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./InsertScreen.Style"; // Asegúrate de que la ruta es correcta
import { screen } from "../../../../../utils/screenName";
import { APIURL } from "../../../../../config/apiconfig";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { ComprobanteModal } from "../../../../../components"; // Asegúrate de importar el componente ComprobanteModal
import { Recojo } from "../../../../../components";
import { Telefono } from "../../../../../components";
import { AlertComponent } from "../../../../../components";
import { ConfirmationModal } from "../../../../../components";
import { LoadingIndicator } from "../../../../../components";
import { CardItem } from "../../../../../components";
import { HandleSave } from "./HandleSave"; // Asegúrate de importar la función handleGuardar
import { useAuth } from '../../../../../navigation/AuthContext';
import { handleError } from '../../../../../utils/errorHandler';
import { useDb } from '../../../../../database/db'; // Importa la base de datos
import { getItemsAsyncUser, getListadoEstadoGestion, getListadoEstadoTipoContacto, getListadoResultadoGestion, getlistacuentas } from '../../../../../database';
 
export function InsertScreen({ route, navigation }) {
  const [isModalVisibleCont, setIsModalVisibleCont] = useState(false); // Controla la visibilidad del modal
  const { item, Tipo } = route.params;
  console.log("item", Tipo);
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [contactTypes, setContactTypes] = useState([]);
  const [selectedContactType, setSelectedContactType] = useState("");
  const [resultadoGestion, setResultadoGestion] = useState([]);
  const [selectedResultado, setSelectedResultado] = useState("");
  const [number, setNumber] = useState(""); // Estado para el valor del input
  const [comprobante, setComprobante] = useState(""); // Estado para el número de comprobante
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar el modal
  const [imageUri, setImageUri] = useState(null); // Estado para la imagen seleccionada
  const [images, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para la fecha
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para mostrar el calendario
  const [bancos, setBancos] = useState([]);
  const [selectedBanco, setSelectedBanco] = useState("");
  const [modalVisibleRecojo, setModalVisibleRecojo] = useState(false);
  const [submittedDataRecojo, setSubmittedDataRecojo] = useState([]);
  const [observations, setObservations] = useState("");
  const [userInfo, setUserInfo] = useState({ ingresoCobrador: "" });
  const [optionsTipoPago, setOptionsTipoPago] = useState([]);
  const [selectedTipoPago, setSelectedTipoPago] = useState(""); // Estado para el valor seleccionado
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertIcon, setAlertIcon] = useState(""); // Estado para el ícono
  const [alertColor, setAlertColor] = useState(""); // Estado para el color del mensaje
  const [mensajeComporbante, setMensajeComporbante] = useState("");
  const [summitDataTransfer, setSummitDataTransfer] = useState({
    comprobante: "",
    images: [],
    number: 0,
    selectedBanco: null,
  });
  const formattedDate = new Date(item.Fecha_Factura).toISOString().split('T')[0];
  const [loading, setLoading] = useState(false);
  const [dataGestion, setDataGestion] = useState([]);
  const [modalVisibleOk, setModalVisibleOk] = useState(false);
  const [token, setToken] = useState(null);
  const { expireToken } = useAuth();
  const { db } = useDb();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const Item = await getItemsAsyncUser(db);
        if (Item) {
          setToken(Item[0]?.token);
          setUserInfo({
            ingresoCobrador: Item[0]?.ICidIngresoCobrador  || "",
            Usuario: Item[0]?.ICCodigo || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const TipoPago = [
    { id: 1, name: "EFECTIVO" },
    { id: 2, name: "TRANSFERENCIA" },
  ];
  const getColorForValue = (projected, collected) => {
    if (collected < projected && collected > 0) return "#e28743"; // Amarillo
    if (collected >= projected) return "green"; // Verde
    return "#a91519"; // Rojo
  };

  const handleButtonPress = () => {
    navigation.navigate(screen.registro.product, { item });
  };

  const handleViewGestiones = () => {
    navigation.navigate(screen.registro.viewGestiones, { item });
  };

  const handleViewAmortizacion = () => {
    navigation.navigate(screen.registro.TablaAmortizacion, { item });
  };

  const handleOpenModal = (cliente) => {
    setSelectedItem(cliente);
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModalCel = () => {
    setIsModalVisibleCont(false);
  };

  const handleViewCel = () => {

    setIsModalVisibleCont(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.log("Token no disponible.");
        return; // No hace la solicitud si no hay token
      }

      try {
        const dat = await getListadoEstadoGestion(db);
        
        // Si la respuesta es exitosa, actualizamos los datos
        setItems(dat); // Asumiendo que tu API devuelve un array de elementos

      } catch (error) {
        handleError(error, expireToken); // Usamos el manejador de errores global
      }
    };

    fetchData();
  }, [token]); // Asegúrate de que el efecto se ejecute cada vez que el token cambie


  const handleValueChange = async (value) => {
    setSelectedValue(value);
    setSelectedContactType(""); // Resetear el segundo Picker
    setResultadoGestion([]); // Resetear el tercer Picker

    if (value) {
      try {
        const tipoesta = await getListadoEstadoTipoContacto(db, value);
       
        setContactTypes(tipoesta); // Establece los datos para el segundo Picker
      } catch (error) {
        handleError(error, expireToken);
      }
    } else {
      setContactTypes([]); // Resetear si no hay estado seleccionado
    }
  };

  const handleContactTypeChange = async (value) => {
    setSelectedContactType(value);
    setSelectedResultado(""); // Resetear el tercer Picker

    if (value) {
      try {
        const resultado = await getListadoResultadoGestion(db, value);
        setResultadoGestion(resultado); // Establecer los datos para el tercer Picker
      } catch (error) {
        console.error("Error al obtener resultados de gestión:", error);
      }
    } else {
      setResultadoGestion([]); // Resetear si no hay tipo de contacto seleccionado
    }
  };
  const handleDateChange = (event, date) => {
    // Si no se selecciona una fecha, simplemente retorna
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    // Verifica si la fecha seleccionada es menor que la fecha actual
    const currentDate = new Date();
    if (date >= currentDate) {
      setSelectedDate(date);
    } else {
      alert("Por favor, elija una fecha igual o posterior a la fecha actual.");
    }

    setShowDatePicker(false); // Oculta el picker después de seleccionar
  };
  const handleNumberChange = (value) => {
    setNumber(value);
  };
  const handleComprobanteChange = (value) => setComprobante(value);
  const handleResultadoChange = (value) => {
    setSelectedResultado(value);
  };

  const fetchBancos = async () => {
    try {
      const getlistac = await getlistacuentas(db);
      setBancos(getlistac);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };

  useEffect(() => {
    if (selectedResultado === 60) {
      setModalVisible(false); // Cerrar otro modal
      setModalVisibleRecojo(true); // Abrir modal de recojo
    } else if (selectedResultado !== 61) {
      setModalVisibleRecojo(false); // Asegurarse de cerrar el modal si no es 60 o 61
    }
  }, [selectedResultado]);

  useEffect(() => {
    // Cerrar modal si selectedResultado es 61
    if (selectedTipoPago === 2 || selectedTipoPago === 1) {
      fetchBancos();
      setModalVisible(true);
    }
  }, [selectedTipoPago]);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && Array.isArray(result.assets)) {
      // Reemplaza las imágenes anteriores con la nueva seleccionada
      const newImages = result.assets.map((asset) => asset.uri || "");
      setImages(newImages); // Cambia a setImages(newImages) para reemplazar
    }
  };

  const removeImage = (uri) => {
    setImages(images.filter((image) => image !== uri));
  };

  // Función principal de aceptación
  const onAccept = async () => {
    // Validación común para todos los tipos de pago
    if (!comprobante || !number || images.length === 0) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Validación específica para tipo de pago 2
    if (selectedTipoPago === 2 && !selectedBanco) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Validación del comprobante de acuerdo al tipo de pago
    const tipoComprobante = selectedTipoPago === 2 ? 2 : 1;
    const banco = selectedTipoPago === 2 ? selectedBanco : 0;

    // Validar el comprobante
    const mensaje = await ValidaComprobante(comprobante, banco, tipoComprobante);
    if (mensaje.length > 0) {
      alert(mensaje);
      return;
    }

    // Preparar los datos para el envío
    const newData = {
      IdBanco: selectedTipoPago === 2 ? parseInt(selectedBanco, 10) : 0,
      NumeroDeposito: comprobante,
      Abono: parseFloat(number),
      images: images,
    };

    // Actualizar estado y cerrar modal
    setSummitDataTransfer(newData);
    setModalVisible(false);
  };

  // Función de validación del comprobante
  const ValidaComprobante = async (comprobante, selectedBanco, tipo) => {
    try {
      const url = APIURL.validaComporbante();
      const response = await axios.get(url, {
        params: { Numero: comprobante, Banco: selectedBanco, tipo }
      });
      return response.data[0].Mensaje; // Retornar el mensaje para mostrarlo en la UI
    } catch (error) {
      console.error("Error al validar el comprobante:", error);
      return "Ocurrió un error al validar el comprobante.";
    }
  };

  const handleSave = () => {
    // Función para mostrar alertas
    const showAlert = (message) => {
      setAlertMessage(message);
      setAlertVisible(true);
      setAlertIcon("warning");
      setAlertColor("red");
    };

    // Validaciones
    if (
      selectedValue === "" ||
      selectedContactType === "" ||
      selectedResultado === ""
    ) {
      showAlert("Seleccione un estado, tipo de contacto y resultado de gestión.");
      return;
    }

    if (selectedResultado === 54) {
      if (number === "") {
        showAlert("Por favor, ingrese un valor.");
        return;
      }
      if (number <= 0) {
        showAlert("El valor no puede ser menor o igual a 0.");
        return;
      }
    }

    if (selectedResultado === 61) {
      if (selectedTipoPago === "") {
        showAlert("Seleccione el Tipo de Pago.");
        return;
      }

      if (selectedTipoPago === 2) {
        if (!summitDataTransfer.IdBanco) {
          showAlert("Seleccione el banco.");
          return;
        }
      }

      if (selectedTipoPago === 1 || selectedTipoPago === 2) {

        if (!summitDataTransfer.NumeroDeposito) {
          showAlert("Ingrese el número de comprobante.");
          return;
        }
        if (!summitDataTransfer.Abono) {
          showAlert("Ingrese el monto recibido.");
          return;
        }
        if (summitDataTransfer.Abono <= 0) {
          showAlert("El monto no puede ser menor o igual a 0.");
          return;
        }
        if (summitDataTransfer.images.length === 0) {
          showAlert("Por favor, cargue al menos una imagen.");
          return;
        }
      }
    }

    if (selectedResultado === 60) {
      if (!submittedDataRecojo || submittedDataRecojo.length === 0) {
        showAlert("Por favor, complete los datos de recojo.");
        return;
      }
      if (!validateSubmittedData(submittedDataRecojo)) {
        showAlert("Por favor, complete los datos de recojo.");
        return;
      }
    }

    if (observations < 10 || observations > 500) {
      showAlert("La descripción debe tener entre 10 y 500 caracteres.");
      return;
    }

    const data = {
      idCbo_GestorDeCobranzas: parseInt(item.idCbo_GestorDeCobranzas, 10),
      idCompra: parseInt(item.idCompra, 10),
      idPersonal: parseInt(userInfo.ingresoCobrador, 10),
      Fecha: new Date().toISOString(),
      idCbo_EstadoGestion: parseInt(selectedValue, 10),
      idCbo_EstadosTipocontacto: parseInt(selectedContactType, 10),
      idCbo_ResultadoGestion: parseInt(selectedResultado, 10),
      Notas: observations,
      Telefono: "",
      Valor: parseFloat(number) || 0,
      FechaPago: selectedResultado === 54 ? selectedDate.toISOString() : "2000-01-01",
      Usuario: userInfo.Usuario,
    };

    setDataGestion(data);
    setModalVisibleOk(true); // Mostrar el modal de confirmación
    // handleConfirm(data, summitDataTransfer);
  };


  const handleConfirm = () => {

    HandleGuardar(dataGestion, summitDataTransfer); // Guardar los datos
    setModalVisibleOk(false); // Cerrar el modal
  };
  const validateSubmittedData = (data) => {
    for (const item of data) {
      const { imagenes, observaciones } = item;
      // Validar imágenes
      if (!imagenes || imagenes.length < 3) {
        setAlertMessage(
          `El artículo con ID ${item.idDetCompra} debe tener al menos 3 imágenes.`
        );
        setAlertVisible(true);
        setAlertIcon("warning"); // Establece el ícono aquí
        setAlertColor("red"); // Establece el color del mensaje aquí
        return false;
      }

      // Validar observaciones
      if (!observaciones || observaciones.length < 10) {
        setAlertMessage(
          `Las observaciones para el artículo con ID ${item.idDetCompra} deben tener al menos 10 caracteres.`
        );
        setAlertVisible(true);
        setAlertIcon("warning"); // Establece el ícono aquí
        setAlertColor("red"); // Establece el color del mensaje aquí
        return false;
      }
    }
    return true;
  };

  const HandleGuardar = async (data, summitDataTransfer) => {

    await HandleSave({
      data,
      summitDataTransfer,
      selectedResultado,
      selectedTipoPago,
      item,
      navigation,
      userInfo,
      submittedDataRecojo,
      setLoading, // Pasar setLoading como argumento
      token,
      expireToken,
      Tipo: Tipo,
    });
  };

  const handleTipoPagoChange = (itemValue) => {
    setSelectedTipoPago(itemValue); // Actualiza el estado con el valor seleccionado
    // Aquí puedes agregar lógica adicional si es necesario
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
     <CardItem 
        item={item} 
        handleViewAmortizacion={handleViewAmortizacion} 
        handleViewCel={handleViewCel} 
        handleButtonPress={handleButtonPress} 
        handleViewGestiones={handleViewGestiones} 
      />

      {/* Primer Picker para estados */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione...1" value="" />
          {items.map((item) => (
            <Picker.Item
              key={item.idEstadoGestion}
              label={item.Estado}
              value={item.idEstadoGestion}
            />
          ))}
        </Picker>
      </View>

      {/* Segundo Picker para tipos de contacto */}
      {selectedValue ? (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedContactType}
            onValueChange={handleContactTypeChange}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione...2" value="" />
            {contactTypes.map((type) => (
              <Picker.Item
                key={type.idCbo_EstadosTipocontacto}
                label={type.Estado}
                value={type.idCbo_EstadosTipocontacto}
              />
            ))}
          </Picker>
        </View>
      ) : null}

      {/* Tercer Picker para resultados de gestión */}
      {/* Tercer Picker para resultados de gestión */}
      {selectedContactType ? (
        <View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedResultado}
              onValueChange={handleResultadoChange}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione...3" value="" />
              {resultadoGestion.map((result) => (
                <Picker.Item
                  key={result.idCbo_ResultadoGestion}
                  label={result.Resultado}
                  value={result.idCbo_ResultadoGestion}
                />
              ))}
            </Picker>
          </View>

          {/* Mostrar campo de texto y calendario si el resultado seleccionado es 54 */}
          {selectedResultado === 54 && (
            <View style={styles.calendarContainer}>
              {/* Contenedor para el campo de valor */}
              <Icon name="dollar" size={24} color="#333" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={number}
                  onChangeText={handleNumberChange}
                  placeholder="Ingrese el Valor"
                />
              </View>
              {/* Contenedor para el selector de fecha */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ flexGrow: 0 }}
              >
                <View style={styles.datePickerRow}>
                  <Icon
                    name="calendar"
                    size={24}
                    color="#333"
                    style={styles.icon}
                  />
                  <Text style={styles.datePickerText}>
                    {selectedDate.toISOString().split("T")[0]}
                    {/* Mostrar la fecha seleccionada */}
                  </Text>
                </View>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
          )}

          {selectedResultado === 61 && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedTipoPago}
                onValueChange={handleTipoPagoChange}
                style={styles.picker}
              >
                <Picker.Item label="Seleccione..." value="" />
                {TipoPago.map((type) => (
                  <Picker.Item
                    key={type.id}
                    label={type.name}
                    value={type.id}
                  />
                ))}
              </Picker>
            </View>
          )}

          <ComprobanteModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            selectedBanco={selectedBanco} // Cambia esto
            setSelectedBanco={setSelectedBanco}
            comprobante={comprobante}
            handleComprobanteChange={handleComprobanteChange}
            number={number}
            handleNumberChange={handleNumberChange}
            handleImagePicker={handleImagePicker} // Define esta función
            images={images}
            removeImage={removeImage} // Define esta función
            setImages={setImages}
            onAccept={onAccept}
            bancos={bancos} // Pasa los bancos al modal
            setSelectedTipoPago={setSelectedTipoPago}
            selectedTipoPago={selectedTipoPago}
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {modalVisibleRecojo && (
              <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisibleRecojo} // Cambiado a modalVisibleRecojo
                onRequestClose={() => setModalVisibleRecojo(false)} // Asegúrate de que esta función esté correcta
              >
                <View style={{ flex: 1 }}>
                  <Recojo
                    route={{ params: { item } }}
                    setModalVisibleRecojo={setModalVisibleRecojo}
                    setSubmittedDataRecojo={setSubmittedDataRecojo}
                    setSelectedResultado={setSelectedResultado}
                  />
                </View>
              </Modal>
            )}
          </View>
        </View>
      ) : null}
      <Telefono
        isVisible={isModalVisibleCont}
        item={item}
        onClose={handleCloseModalCel}
      />
      {selectedResultado ? (
        <View>
          <TextInput
            style={styles.textArea} // Asegúrate de tener este estilo definido
            placeholder="Observaciones"
            multiline={true} // Permite múltiples líneas
            numberOfLines={4} // Número de líneas visibles
            textAlignVertical="top" // Alineación del texto en la parte superior
            value={observations}
            autoCapitalize="characters"
            onChangeText={(text) => {
              setObservations(text); // Actualiza el estado con el nuevo texto
            }}
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
          <LoadingIndicator visible={loading} />
          <ConfirmationModal
            visible={modalVisibleOk}
            onClose={() => setModalVisibleOk(false)}
            onConfirm={handleConfirm}
          />
        </View>
      ) : null}
      {alertVisible && (
        <AlertComponent
          message={alertMessage}
          color={alertColor} // Establece el color aquí
          iconName={alertIcon} // Establece el ícono aquí
          onDismiss={() => setAlertVisible(false)}
        />
      )}
    </ScrollView>

  );
}
