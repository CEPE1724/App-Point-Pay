import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { APIURL } from "../../../../../config/apiconfig";

export const ViewReferencias = ({ route }) => {
    const { item } = route.params;
    const [referencias, setReferencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReferencias = async () => {
            try {
                setLoading(true);
                const url = APIURL.getReferencias();
                const response = await axios.get(url, {
                    params: { NumeroIdentificacion: item.Cedula }
                });
                
                // Verificar si hay datos y almacenarlos en el estado
                if (response.data.success && response.data.data) {
                    setReferencias(response.data.data);
                } else {
                    setError("No se encontraron referencias.");
                }
            } catch (error) {
                console.error("Error al obtener las referencias:", error);
                setError("Ocurrió un error al obtener las referencias.");
            } finally {
                setLoading(false);
            }
        };

        fetchReferencias();
    }, [item.Cedula]);

    // Renderizar el componente de cada fila de la tabla
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.Parentesco}</Text>
            <Text style={styles.cell}>{item.Nombre}</Text>
            <Text style={styles.cell}>{item.Provincia}/{item.Canton}</Text>
            <Text style={styles.cell}>{item.Celular}</Text>
        </View>
    );

    // Mostrar los datos o el mensaje de error
    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Cargando...</Text>
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <>
                    <View style={styles.headerRow}>
                        <Text style={[styles.cell, styles.headerCell]}>Parentesco</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Nombre</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Provincia/Canton</Text>
                        <Text style={[styles.cell, styles.headerCell]}>Celular</Text>
                    </View>
                    <FlatList
                        data={referencias}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.idCre_ReferenciasClientes.toString()}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#054279',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12,
        color: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 9,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 10,
    },
});
