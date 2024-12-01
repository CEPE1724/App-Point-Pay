import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Button,
} from "react-native";
import axios from "axios";
import { APIURL } from "../../../config/apiconfig";
import { styles } from "./Recojo.Style";
import { User, DriversLicenseO, FileText } from '../../../Icons';
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

export function Recojo({ route, setModalVisibleRecojo, setSubmittedDataRecojo, setSelectedResultado }) {
  const { item } = route.params;
  const [productos, setProductos] = useState([]);
  const idCompra = item.idCompra;
  const [loading, setLoading] = useState(true);
  const idMotivo = 0;

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = APIURL.getProducto();
      const response = await axios.get(url, {
        params: { idCompra, idMotivo },
      });
      const fetchedData = response.data;
      setProductos(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Hubo un problema al cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idCompra]);

  const [selectedProducts, setSelectedProducts] = useState({});
  const [observations, setObservations] = useState({});
  const [images, setImages] = useState({});
  const [submittedData, setSubmittedData] = useState([]); // Nuevo estado para almacenar la información enviada

  const toggleSelection = (id) => {
    setSelectedProducts((prev) => {
      const newSelected = { ...prev, [id]: !prev[id] };

      // Si se desmarcó, limpiar observaciones e imágenes
      if (!newSelected[id]) {
        setObservations((obs) => {
          const newObs = { ...obs };
          delete newObs[id]; // Eliminar observación para el id desmarcado
          return newObs;
        });

        setImages((imgs) => {
          const newImgs = { ...imgs };
          delete newImgs[id]; // Eliminar imágenes para el id desmarcado
          return newImgs;
        });
      }

      return newSelected;
    });
  };

  const handleObservationChange = (id, text) => {
    setObservations((prev) => ({
      ...prev,
      [id]: text,
    }));
  };

  const handleImagePicker = async (id) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setImages((prevImages) => ({
        ...prevImages,
        [id]: [...(prevImages[id] || []), pickerResult.assets[0].uri],
      }));
    }
  };

  const removeImage = (id, uri) => {
    setImages((prevImages) => ({
      ...prevImages,
      [id]: prevImages[id].filter((image) => image !== uri),
    }));
  };

  const validateSelections = () => {
    for (const id of Object.keys(selectedProducts)) {
      if (selectedProducts[id]) {
        const observation = observations[id] || "";
        const imageCount = images[id]?.length || 0;

        const idNumber = parseInt(id, 10);
        const product = productos.find((item) => item.idDetCompra === idNumber);

        const codigo = product ? product.Codigo : "Código desconocido";

        if (observation.length < 10 || observation.length > 500) {
          Alert.alert(
            "Error",
            `La descripción para ${codigo} debe tener entre 10 y 500 caracteres.`
          );
          return false;
        }

        if (imageCount < 3) {
          Alert.alert(
            "Error",
            `Debes subir al menos 3 imágenes para ${codigo}.`
          );
          return false;
        }
      }
    }
    return true;
  };

  const handleClose = () => {
    setModalVisibleRecojo(false);
    setSelectedResultado("");
  };
  const handleAccept = () => {
    const hasSelectedItems = Object.values(selectedProducts).some(selected => selected);
    if (!hasSelectedItems) {
        Alert.alert("Error", "Debes seleccionar al menos un artículo antes de proceder.");
        return;
    }
    if (validateSelections()) {
        const dataToSubmit = Object.keys(selectedProducts).filter(id => selectedProducts[id]).map(id => ({
            idDetCompra: id,
            observaciones: observations[id] || "",
            imagenes: images[id] || [],
        }));
        setSubmittedData(dataToSubmit);
        setSubmittedDataRecojo(dataToSubmit);
        setModalVisibleRecojo(false);
    }
};


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => toggleSelection(item.idDetCompra)}
      >
        <View style={styles.productInfo}>
          <Text style={styles.productCode}>Código: {item.Codigo}</Text>
          <Text style={styles.productTitle}>{item.Articulo}</Text>
          {item.Serial && (
            <Text style={styles.productSerial}>Serial: {item.Serial}</Text>
          )}
          <Text style={styles.productPrice}>
            Precio: ${item.Precio.toFixed(2)}
          </Text>
        </View>
        <Icon
          name={
            selectedProducts[item.idDetCompra] ? "check-square" : "square-o"
          }
          size={20}
          color={selectedProducts[item.idDetCompra] ? "#28a745" : "#ccc"}
        />
      </TouchableOpacity>
      {selectedProducts[item.idDetCompra] && (
        <>
          <TextInput
            style={styles.observationInput}
            placeholder="Ingrese observaciones"
            value={observations[item.idDetCompra] || ""}
            onChangeText={(text) =>
              handleObservationChange(item.idDetCompra, text)
            }
          />
          <TouchableOpacity
            onPress={() => handleImagePicker(item.idDetCompra)}
            style={styles.uploadButton}
          >
            <Icon name="upload" size={24} color="#007bff" />
            <Text style={styles.uploadButtonText}> Cargar Imagen</Text>
          </TouchableOpacity>
          <Text style={{ marginVertical: 10 }}>
            Imágenes seleccionadas: {images[item.idDetCompra]?.length || 0}{" "}
            {images[item.idDetCompra]?.length < 1
              ? "(¡Selecciona al menos 1!)"
              : ""}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.containerImage}
          >
            <View style={styles.imageListImage}>
              {images[item.idDetCompra]?.map((image, index) => (
                <View
                  key={index}
                  style={{
                    position: "relative",
                    marginRight: 10,
                    width: 100,
                    height: 100,
                  }}
                >
                  <Image source={{ uri: image }} style={styles.imageImage} />
                  <TouchableOpacity
                    onPress={() => removeImage(item.idDetCompra, image)}
                    style={{ position: "absolute", top: 5, right: 5 }}
                  >
                    <Icon name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
        
       
      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDetCompra.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleClose}
          style={styles.closeButton}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAccept} style={styles.acceptButton}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
