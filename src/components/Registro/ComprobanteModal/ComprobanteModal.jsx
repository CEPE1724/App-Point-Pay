import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FileTexto, Dollar, CancelarX, Upload, CheckCircle, Trash } from '../../../Icons';
import { styles } from "./ComporbanteModal.Style"; // Asegúrate de que la ruta es correcta
export function ComprobanteModal({
  modalVisible,
  setModalVisible,
  selectedBanco,
  setSelectedBanco,
  comprobante,
  handleComprobanteChange,
  number,
  handleNumberChange,
  handleImagePicker,
  images,
  removeImage,
  setImages,
  onAccept,
  bancos, // Recibe la lista de bancos
  setSelectedTipoPago,
  selectedTipoPago
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)} // Cierra el modal
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Información de Comprobante</Text>
         {selectedTipoPago === 2 && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedBanco}
              onValueChange={(itemValue) => setSelectedBanco(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione..." value="" />
              {bancos.map((bank) => (
                <Picker.Item
                  key={bank.idCuenta}
                  label={bank.Descripcion}
                  value={bank.idCuenta}
                />
              ))}
            </Picker>
            
          </View>
          )}

          <View style={styles.row}>
            <FileTexto size={24} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={comprobante}
              onChangeText={handleComprobanteChange}
              placeholder="Número de Comprobante"
            />
          </View>

          <View style={styles.row}>
            <Dollar size={24} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={number}
              onChangeText={handleNumberChange}
              placeholder="Ingrese el Valor"
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={handleImagePicker}
              style={styles.uploadButton}
            >
              <Upload size={24} color="#007bff" />
              <Text style={styles.uploadButtonText}> Cargar Imagen</Text>
            </TouchableOpacity>

            <ScrollView style={styles.containerImage}>
              <Text style={{ marginVertical: 10 }}>
                Imágenes seleccionadas: {images.length}{" "}
                {images.length < 1 ? "(¡Selecciona al menos 1!)" : ""}
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
                      <Trash size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.acceptButton]}
              onPress={onAccept}
            >
              <CheckCircle
                size={18}
                color="#FFFFFF"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => {
                setModalVisible(false); // Cierra el modal
                setSelectedBanco(""); // Resetea el banco seleccionado si deseas
                setImages([]); // Resetea las imágenes
                setSelectedTipoPago(""); // Resetea el resultado seleccionado
              }}
            >
              <CancelarX
                size={18}
                color="#FFFFFF"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
