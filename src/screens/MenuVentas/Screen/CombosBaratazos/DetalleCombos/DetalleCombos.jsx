import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image, Modal } from "react-native";
import axios from "axios";
import { APIURL } from "../../../../../config/apiconfig";
import { styles } from "./DetalleCombos.style";
import LogoCobranza from '../../../../../../assets/PontyDollar.png';
import { DetalleCombosView } from '../../../../../components';
import {DetalleCombosViewVertical} from '../../../../../components';
export const DetalleCombos = ({ route }) => {
    const { item, bodega } = route.params; // Recibe la información del artículo desde la ruta
    const [impuesto, setImpuesto] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null); // Estado para el método seleccionado
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal


    // Función para consumir la API
    const fetchData = async () => {
        try {
            const url = APIURL.getViewListComboProductosDet();
            const response = await axios.get(url, {
                params: {
                    Bodega: bodega,
                    idPromocion: item.idPromocion,
                },
            });
            if (response.data.success) {
                setData(response.data.data);
                if (response.data.data.length > 0) {
                    setImpuesto(response.data.data[0].Impuesto);
                }
            } else {
                setError("No se encontraron productos.");
            }
        } catch (err) {
            setError("Error al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [item, bodega]);

    // Si no hay artículo o estamos cargando, muestra el indicador de carga
    if (loading) {
        return <ActivityIndicator size="large" color="#FF6F61" style={styles.loader} />;
    }

    // Función para formatear los números a 2 decimales
    const formatCurrency = (value) => {
        return parseFloat(value).toFixed(2);
    };

    const handleViewModal = () => {
        setModalVisible(true); // Abre el modal
    };

    const closeModal = () => {
        setModalVisible(false); // Cierra el modal
    };
    // Sumar los totales de cada forma de pago
    const getTotalSum = () => {
        let totalContado = 0;
        let totalTarjeta = 0;
        let totalCredito = 0;
        let totalTCSI = 0;

        data.forEach((item) => {
            totalContado += item.Contado;
            totalTarjeta += item.Tarjeta;
            totalCredito += item.Credito;
            totalTCSI += item.TCSI;
        });
        console.log(totalCredito);
        totalContado = totalContado ? totalContado  : 0;
        totalTarjeta = totalTarjeta ? totalTarjeta  : 0;
        totalCredito = totalCredito ? totalCredito  : 0;
        totalTCSI = totalTCSI ? totalTCSI  : 0;
        return { totalContado, totalTarjeta, totalCredito, totalTCSI };
    };

    // Si hay error, mostrar mensaje de error
    if (error) {
        return <Text>{error}</Text>;
    }

    // Obtener los totales al final
    const { totalContado, totalTarjeta, totalCredito, totalTCSI } = getTotalSum();

    // Función para manejar la selección de forma de pago
    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.itemTitle}>{item.Articulo}</Text>
                <View style={styles.cardHeader}>
                    <View style={styles.textContainer}>

                        <Text style={styles.itemDates}>
                            Inicia: {new Date(item.FechaDesde).toLocaleDateString()} / Finaliza: {new Date(item.FechaHasta).toLocaleDateString()}
                        </Text>
                        <Text style={styles.itemCode}>Código: {item.Codigo}</Text>
                        <Text style={styles.itemPromo}>{item.Promo}</Text>
                        <Text style={styles.impuestoText}>
                            {selectedPaymentMethod &&
                                formatCurrency(
                                    selectedPaymentMethod === "Contado"
                                        ? totalContado
                                        : selectedPaymentMethod === "Tarjeta"
                                            ? totalTarjeta
                                            : selectedPaymentMethod === "Credito"
                                                ? totalCredito
                                                : selectedPaymentMethod === "TCSI"
                                                    ? totalTCSI
                                                    : 0
                                )
                            }
                        </Text>

                    </View>
                    <View style={{ flex: 1 }}>

                        <ScrollView>
                            <TouchableOpacity onPress={handleViewModal}>
                            <DetalleCombosView data={data} />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.paymentMethods}>
                    {totalContado > 0 && (
                        <TouchableOpacity
                            key="Contado"
                            onPress={() => handlePaymentMethodSelect("Contado")}
                            style={[
                                styles.paymentMethodItem,
                                selectedMethod === "Contado" && styles.selectedMethod // Aplica el estilo si es el seleccionado
                            ]}
                        >
                            <Text style={styles.paymentMethodText}>Contado</Text>
                        </TouchableOpacity>
                    )}
                    {totalTarjeta > 0 && (
                        <TouchableOpacity
                            key="Tarjeta"
                            onPress={() => handlePaymentMethodSelect("Tarjeta")}
                            style={[
                                styles.paymentMethodItem,
                                selectedMethod === "Tarjeta" && styles.selectedMethod // Aplica el estilo si es el seleccionado
                            ]}
                        >
                            <Text style={styles.paymentMethodText}>Tarjeta</Text>
                        </TouchableOpacity>
                    )}
                    {totalCredito > 0 && (
                        <TouchableOpacity
                            key="Credito"
                            onPress={() => handlePaymentMethodSelect("Credito")}
                            style={[
                                styles.paymentMethodItem,
                                selectedMethod === "Credito" && styles.selectedMethod // Aplica el estilo si es el seleccionado
                            ]}
                        >
                            <Text style={styles.paymentMethodText}>Crédito</Text>
                        </TouchableOpacity>
                    )}
                    {totalTCSI > 0 && (
                        <TouchableOpacity
                            key="TCSI"
                            onPress={() => handlePaymentMethodSelect("TCSI")}
                            style={[
                                styles.paymentMethodItem,
                                selectedMethod === "TCSI" && styles.selectedMethod // Aplica el estilo si es el seleccionado
                            ]}
                        >
                            <Text style={styles.paymentMethodText}>TC Sin Intereses</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </View>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeText}>Cerrar</Text>
                        </TouchableOpacity>
                        <DetalleCombosViewVertical data={data} /> 
                    </View>
                </View>
            </Modal>
            <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.table}>
                    {/* Cabeceras de la tabla */}
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableHeader, styles.tableHeaderCode]}>Código</Text>
                        {totalContado > 0 && <Text style={styles.tableHeader}>Contado</Text>}
                        {totalTarjeta > 0 && <Text style={styles.tableHeader}>Tarjeta</Text>}
                        {totalCredito > 0 && <Text style={styles.tableHeader}>Crédito</Text>}
                        {totalTCSI > 0 && <Text style={styles.tableHeader}>TCSI</Text>}

                    </View>
                    {/* Filas de la tabla */}
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            const rowStyle = index % 2 === 0 ? styles.evenRow : styles.oddRow;
                            return (
                                <View style={[styles.tableRow, rowStyle]}>
                                    <Text style={styles.tableCell}>{item.Codigo}</Text>
                                    {totalContado > 0 && <Text style={styles.tableCellData}>{formatCurrency(item.Contado)}</Text>}
                                    {totalTarjeta > 0 && <Text style={styles.tableCellData}>{formatCurrency(item.Tarjeta)}</Text>}
                                    {totalCredito > 0 && <Text style={styles.tableCellData}>{formatCurrency(item.Credito)}</Text>}
                                    {totalTCSI > 0 && <Text style={styles.tableCellData}>{formatCurrency(item.TCSI)}</Text>}


                                </View>
                            );
                        }}
                        keyExtractor={(item) => item.Codigo}
                    />

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Total General</Text>
                        {totalContado > 0 && <Text style={styles.tableCellData}>{formatCurrency(totalContado)}</Text>}
                        {totalTarjeta > 0 && <Text style={styles.tableCellData}>{formatCurrency(totalTarjeta)}</Text>}
                        {totalCredito > 0 && <Text style={styles.tableCellData}>{formatCurrency(totalCredito)}</Text>}
                        {totalTCSI > 0 && <Text style={styles.tableCellData}>{formatCurrency(totalTCSI)}</Text>}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
