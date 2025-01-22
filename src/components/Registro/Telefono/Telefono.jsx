import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { styles } from './Telefono.Style'; // Asegúrate de tener el archivo de estilos disponible
import axios from 'axios'; // Asegúrate de tener axios instalado
import { APIURL } from "../../../config/apiconfig"; // Asegúrate de que el endpoint esté correctamente configurado
import { useAuth } from '../../../navigation/AuthContext'; // Importamos el contexto de autenticación
import { handleError } from '../../../utils/errorHandler'; // Importamos la función de manejo de errores
import { useDb } from '../../../database/db'; // Importamos la base de datos
import { getItemsAsyncUser } from '../../../database';
export function Telefono({ isVisible, item, onClose }) {
    const [contactos, setContactos] = useState([]); // Para almacenar los contactos
    const [telefono, setTelefono] = useState(''); // Para almacenar el número de teléfono
    const [descripcion, setDescripcion] = useState(''); // Para almacenar la descripción
    const [isLoading, setIsLoading] = useState(false); // Para el indicador de carga
    const [isSaving, setIsSaving] = useState(false); // Para el estado de guardado
    const { expireToken } = useAuth(); // Usamos el contexto de autenticación
    const [token, setToken] = useState(null);
    const { db } = useDb();
    useEffect(() => {
        const fetchUserInfo = async () => {
            const Item = await getItemsAsyncUser(db);
            if (Item) {
                setToken(Item[0]?.token);
            } else {
                console.error("No se encontró el token.");
            }
        };
        fetchUserInfo();
    }, []);

    // Este `useEffect` solo se ejecutará cuando el `token` y `item` estén disponibles
    useEffect(() => {
        if (token && item) {  // Verificamos que ambos estén disponibles
            fetchContactos();  // Solo llamamos a fetchContactos si ya tenemos el token y el item
        }
    }, [token, item]);  // Dependencias: solo se ejecuta cuando token y item cambian

    // Función para obtener los contactos desde la API
    const fetchContactos = async () => {
        setIsLoading(true);
        const headers = {
            "Authorization": `Bearer ${token}`,  // Añadimos el token en los headers
            "Content-Type": "application/json",  // Tipo de contenido
        };
        console.log('Headers:', token);
        try {
            const response = await axios.get(APIURL.getTelefono(), {
                params: { idCliente: item.idCliente }, // Enviamos el idCliente
                headers,
            });
            // Verificamos si la respuesta contiene un arreglo de contactos
            if (Array.isArray(response.data)) {  // Comprobamos si la respuesta es un array
                if (response.data.length > 0) {
                    setContactos(response.data); // Guardamos los datos de los contactos
                } else {
                    setContactos([]); // Si no hay contactos, mostramos un mensaje
                }
            } else {
                setContactos([]); // Si la respuesta no es un arreglo válido, vaciamos los contactos

            }
        } catch (error) {
            handleError(error, expireToken); // Usamos el manejador de errores global
            setContactos([]); // En caso de error, vaciamos los contactos
        } finally {
            setIsLoading(false); // Terminamos el estado de carga
        }
    };


    // Ejecutamos la función para cargar los contactos
    useEffect(() => {
        fetchContactos();
    }, [item]);

    // Función para guardar la información
    const handleSave = async () => {
        // Limpiamos espacios extra
        const cleanedTelefono = telefono.trim();
        const cleanedDescripcion = descripcion.trim();

        // Validamos el número de teléfono
        if (!cleanedTelefono.match(/^\d{10}$/)) {
            alert("El número de teléfono debe tener 10 dígitos.");
            return;
        }

        // Validamos si el número ya está en la tabla de contactos
        const telefonoExistente = contactos.find(contacto => contacto.Telefono.trim() === cleanedTelefono);
        if (telefonoExistente) {
            alert("Este número de teléfono ya está registrado.");
            return;
        }

        // Validamos que la descripción tenga al menos 5 caracteres
        if (cleanedDescripcion.length < 5) {
            alert("La descripción debe tener al menos 5 caracteres.");
            return;
        }

        setIsSaving(true);

        const data = {
            idCliente: item.idCliente,
            Telefono: cleanedTelefono,
            Descripcion: cleanedDescripcion,
        };

        try {
            console.log('Headers:', token);
            const headers = {
                "Authorization": `Bearer ${token}`,  // Añadimos el token en los headers
                "Content-Type": "application/json",  // Tipo de contenido
            };
            const response = await axios.post(APIURL.SaveTelefono(), data,
                { headers }
            ); // Asumiendo que esta es la URL para guardar

            // Refrescamos la lista de contactos después de guardar
            fetchContactos();
        } catch (error) {
            handleError(error, expireToken); // Usamos el manejador de errores global
        } finally {
            setIsSaving(false);
        }
    };


    // Renderizamos la tabla de contactos
    const renderContactosTable = () => {
        if (isLoading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

        if (contactos.length === 0) {
            return <Text>No hay contactos disponibles.</Text>;
        }

        return (
            <FlatList
                data={contactos}
                keyExtractor={(item) => item.idCre_GCTelefono.toString()}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.Telefono.trim()}</Text>
                        <Text style={styles.tableCell}>{item.Descripcion.trim()}</Text>
                        <Text style={styles.tableCell}>
                            {new Date(item.FechaSistema).toISOString().split('T')[0]}
                        </Text>

                    </View>
                )}
            />
        );
    };

    return (
        <Modal visible={isVisible} onRequestClose={onClose} animationType="slide">
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>


                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Número de teléfono"
                        keyboardType="numeric"
                        value={telefono}
                        onChangeText={setTelefono}
                        maxLength={10}
                    />

                    <TextInput
                        style={[styles.inputField, styles.observationInput]}
                        placeholder="Descripción"
                        value={descripcion}
                        onChangeText={setDescripcion}
                        multiline
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isSaving}>
                        <Text style={styles.saveButtonText}>{isSaving ? 'Guardando...' : 'Guardar'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contactosTableContainer}>
                    <Text style={styles.tableTitle}>Contactos</Text>
                    {renderContactosTable()}
                </View>
            </View>
        </Modal>
    );
}
