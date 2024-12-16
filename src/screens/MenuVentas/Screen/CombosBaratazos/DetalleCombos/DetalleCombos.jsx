import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from "react-native";
import axios from "axios";
import { APIURL } from "../../../../../config/apiconfig";
import { styles } from "./DetalleCombos.style";
import LogoCobranza from '../../../../../../assets/PontyDollar.png';
export const DetalleCombos = ({ route }) => {
    const { item, bodega } = route.params; // Recibe la información del artículo desde la ruta
    const [impuesto, setImpuesto] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

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

    // Sumar los totales de cada forma de pago
    const getTotalSum = () => {
        let totalContado = 0;
        let totalTarjeta = 0;
        let totalCredito = 0;

        data.forEach((item) => {
            totalContado += item.Contado;
            totalTarjeta += item.Tarjeta;
            totalCredito += item.Credito;
        });

        totalContado = totalContado ? totalContado + (totalContado * impuesto) / 100 : 0;
        totalTarjeta = totalTarjeta ? totalTarjeta + (totalTarjeta * impuesto) / 100 : 0;
        totalCredito = totalCredito ? totalCredito + (totalCredito * impuesto) / 100 : 0;
        return { totalContado, totalTarjeta, totalCredito };
    };

    // Si hay error, mostrar mensaje de error
    if (error) {
        return <Text>{error}</Text>;
    }

    // Obtener los totales al final
    const { totalContado, totalTarjeta, totalCredito } = getTotalSum();

    // Función para manejar la selección de forma de pago
    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <View style={styles.container}>
            {/* Tarjeta con los detalles del artículo */}
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
                                                : 0
                                )
                            }
                        </Text>

                    </View>
                    <Image
                        source={LogoCobranza}
                        style={styles.image}
                        resizeMode="contain"
                    />


                </View>
                <View style={styles.paymentMethods}>
                    {totalContado > 0 && (
                        <TouchableOpacity
                            key="Contado"
                            onPress={() => handlePaymentMethodSelect("Contado")}
                            style={styles.paymentMethodItem}
                        >
                            <Text style={styles.paymentMethodText}>Contado</Text>
                        </TouchableOpacity>
                    )}
                    {totalTarjeta > 0 && (
                        <TouchableOpacity
                            key="Tarjeta"
                            onPress={() => handlePaymentMethodSelect("Tarjeta")}
                            style={styles.paymentMethodItem}
                        >
                            <Text style={styles.paymentMethodText}>Tarjeta</Text>
                        </TouchableOpacity>
                    )}
                    {totalCredito > 0 && (
                        <TouchableOpacity
                            key="Credito"
                            onPress={() => handlePaymentMethodSelect("Credito")}
                            style={styles.paymentMethodItem}
                        >
                            <Text style={styles.paymentMethodText}>Crédito</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </View>

            {/* Lista de formas de pago */}


            {/* Tabla de productos */}
            <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.table}>
                    {/* Cabeceras de la tabla */}
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableHeader, styles.tableHeaderCode]}>Código</Text>
                        <Text style={styles.tableHeader}>Contado</Text>
                        <Text style={styles.tableHeader}>Tarjeta</Text>
                        <Text style={styles.tableHeader}>Crédito</Text>
                    </View>
                    {/* Filas de la tabla */}
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => {
                            const rowStyle = index % 2 === 0 ? styles.evenRow : styles.oddRow;
                            return (
                                <View style={[styles.tableRow, rowStyle]}>
                                    <Text style={styles.tableCell}>{item.Codigo}</Text>

                                    <Text style={styles.tableCellData}>{formatCurrency(item.Contado)}</Text>
                                    <Text style={styles.tableCellData}>{formatCurrency(item.Tarjeta)}</Text>
                                    <Text style={styles.tableCellData}>{formatCurrency(item.Credito)}</Text>
                                </View>
                            );
                        }}
                        keyExtractor={(item) => item.Codigo}
                    />
                    {/* Fila con los totales por forma de pago */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Total General</Text>
                        <Text style={styles.tableCellData}>{formatCurrency(totalContado)}</Text>
                        <Text style={styles.tableCellData}>{formatCurrency(totalTarjeta)}</Text>
                        <Text style={styles.tableCellData}>{formatCurrency(totalCredito)}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
