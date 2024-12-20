import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, FlatList, Text } from "react-native";

export function DetalleCombosView({ data }) {
    const [imageExists, setImageExists] = useState({});

    // Función para verificar si la imagen existe
    const checkImageExists = async (codigo) => {
        const imageUrl = `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${codigo}.jpg`;
        try {
            const response = await fetch(imageUrl);
            if (response.ok) {
                // Si la imagen existe (código de estado 200)
                setImageExists((prev) => ({ ...prev, [codigo]: true }));
            } else {
                // Si la imagen no existe (código de estado diferente de 200)
                setImageExists((prev) => ({ ...prev, [codigo]: false }));
            }
        } catch (error) {
            // Si hay un error al intentar obtener la imagen (por ejemplo, falta de conexión)
            setImageExists((prev) => ({ ...prev, [codigo]: false }));
        }
    };

    // Ejecutar la comprobación para cada item
    useEffect(() => {
        data.forEach((item) => {
            checkImageExists(item.Codigo); // Verificar si la imagen existe
        });
    }, [data]);

    // Renderiza cada imagen en el carrusel si existe
    const renderItem = ({ item }) => {
        const imageUrl = `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${item.Codigo}.jpg`;

        return (
            imageExists[item.Codigo] && (
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="contain"
                />
            )
        );
    }

    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={data}
                horizontal
                renderItem={renderItem}
                keyExtractor={(item) => item.Codigo.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    carouselContainer: {
        flexDirection: "row",
        overflow: "hidden",
    },
    image: {
        width: 150,
        height: 150,
        marginRight: 10,
    },
    imagePlaceholder: {
        width: 150,
        height: 150,
        backgroundColor: "#ccc", // Fondo gris para indicar que no hay imagen
        justifyContent: "center",
        alignItems: "center",
    },
});
