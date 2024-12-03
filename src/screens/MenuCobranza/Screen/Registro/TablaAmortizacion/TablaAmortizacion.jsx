import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from "axios";
import { APIURL } from "../../../../../config/apiconfig";
import { styles } from "./TablaAmortizacion.Style";

export const TablaAmortizacion = ({ route }) => {
    const { item } = route.params;
    const [productos, setProductos] = useState([]);
    const [valores, setValores] = useState({});
    const idCompra = item.idCompra;
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const url = APIURL.getViewTablaAmortizacion();
            const response = await axios.get(url, { params: { idCompra } });
            const fetchedData = response.data;
            setProductos(fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Hubo un problema al cargar los productos.");
        } finally {
            setLoading(false);
        }
    };

    const fetchDataValores = async () => {
        setLoading(true);
        try {
            const url = APIURL.getViewTablaAmortizacionValores();
            const response = await axios.get(url, { params: { idCompra } });
            const fetchedData = response.data;
            setValores(fetchedData[0] || {});
        } catch (error) {
            console.error("Error fetching data:", error);
            Alert.alert("Error", "Hubo un problema al cargar los valores.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchDataValores();
    }, [idCompra]);

    const handleRowPress = (id) => {
        setSelectedId(id);
    };

    const renderItem = ({ item }) => {
        const isSelected = item.idCre_TablaDeAmortizacion === selectedId;
        return (
            <TouchableOpacity
                style={[styles.row, { backgroundColor: isSelected ? '#e9d192' : '#fff' }]}
                onPress={() => handleRowPress(item.idCre_TablaDeAmortizacion)}
            >
                <Text style={[styles.cell, { color: item.Estado === 2 ? '#0000ff' : item.Estado === 0 ? '#00c000' : '#ff0000' }]}>
                    {item.NumeroCuota}
                </Text>
                <Text style={[styles.cell, { color: item.Estado === 2 ? '#0000ff' : item.Estado === 0 ? '#00c000' : '#ff0000' }]}>
                    {new Date(item.Vence).toLocaleDateString()}
                </Text>
                <Text style={[styles.cell, { color: item.Estado === 2 ? '#0000ff' : item.Estado === 0 ? '#00c000' : '#ff0000' }]}>
                    ${item.ValorCuota.toFixed(2)}
                </Text>
                <Text style={[styles.cell, { color: item.Estado === 2 ? '#0000ff' : item.Estado === 0 ? '#00c000' : '#ff0000' }]}>
                    ${item.Gastos.toFixed(2)}
                </Text>
                <Text style={[styles.cell, { color: item.Estado === 2 ? '#0000ff' : item.Estado === 0 ? '#00c000' : '#ff0000' }]}>
                    ${item.Mora.toFixed(2)}
                </Text>
                <Text style={[styles.cell, { color: item.Estado === 2 ? '#0000ff' : item.Estado === 0 ? '#00c000' : '#ff0000' }]}>
                    ${item.Abono.toFixed(2)}
                </Text>
                <Text style={[styles.cell, { color: item.Estado === 2 ? '#0000ff' : item.Estado === 0 ? '#00c000' : '#ff0000' }]}>
                    {item.Saldo.toFixed(2)}
                </Text>
                <Text style={[styles.cell, { color: item.Estado === 2 ? '#0000ff' : item.Estado === 0 ? '#00c000' : '#ff0000' }]}>
                    {item.Retraso}
                </Text>
            </TouchableOpacity>
        );
    };

    if (loading) {
        // Mostrar ActivityIndicator mientras se cargan los datos
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Cargando tabla...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRowView}>
                <View style={styles.headerColumn}>
                    <Text style={styles.headerColumnText}>Cliente: {item.Cliente}</Text>
                    <Text style={styles.headerColumnText}>Cédula: {item.Cedula}</Text>
                    <Text style={styles.headerColumnText}>Documento: {item.Numero_Documento}</Text>
                </View>
                <View style={styles.headerColumn}>
                    <Text style={[styles.headerColumnTextView, styles.headerCedula]}>AL DÍA</Text>
                    <Text style={[styles.headerColumnTextView, styles.headerDocumento]}>VENCIDO</Text>
                    <Text style={[styles.headerColumnTextView, styles.headerCliente]}>CANCELADO</Text>
                </View>
            </View>

            {/* Verificación de Valores antes de renderizar */}
            {valores && (
                <View style={styles.headerRowView}>
                    <View style={styles.headerColumn}>
                        <Text
                            style={[
                                styles.headerColumnText,
                                valores.SaldoVencido > 0 && { color: 'red' } // Si el SaldoVencido es mayor a 0, aplica color rojo
                            ]}
                        >
                            Saldo Vencido: {valores.SaldoVencido || 0}
                        </Text>
                        <Text style={styles.headerColumnText}>Saldo Total: {valores.SaldoTotal || 0}</Text>
                        <Text style={styles.headerColumnText}>Siguiente Cuota: {valores.CuotaSiguiente || 0}</Text>
                    </View>
                    <View style={styles.headerColumn}>
                        <Text style={styles.headerColumnText}>Cuotas Vencidas: {valores.CuotasVencidas || 0}</Text>
                        <Text style={styles.headerColumnText}>Días Vencidos: {valores.DiasMora || 0}</Text>
                        <Text style={styles.headerColumnText}>Próximo a Vencer(D): {valores.ProximoPago || 0}</Text>
                    </View>
                </View>
            )}

            {/* Encabezados de las columnas */}
            <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Cuota</Text>
                <Text style={styles.headerCell}>Vence</Text>
                <Text style={styles.headerCell}>Valor</Text>
                <Text style={styles.headerCell}>Gestión</Text>
                <Text style={styles.headerCell}>Mora</Text>
                <Text style={styles.headerCell}>Abono</Text>
                <Text style={styles.headerCell}>Saldo</Text>
                <Text style={styles.headerCell}>Retraso</Text>
            </View>

            <FlatList
                data={productos}
                renderItem={renderItem}
                keyExtractor={(item) => item.idCre_TablaDeAmortizacion.toString()}
                contentContainerStyle={styles.tableContainer}
            />
        </View>
    );
};
