import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, FlatList, Text } from "react-native";

export function DetalleCombosViewVertical({ data }) {
    const [imageExists, setImageExists] = useState({});

    // Función para verificar si la imagen existe
    const checkImageExists = async (codigo, index) => {
        const imageUrl = `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${codigo}_${index}.jpg`;
        try {
            const response = await fetch(imageUrl);
            if (response.ok) {
                // Si la imagen existe (código de estado 200)
                setImageExists((prev) => ({ ...prev, [`${codigo}_${index}`]: true }));
            } else {
                // Si la imagen no existe (código de estado diferente de 200)
                setImageExists((prev) => ({ ...prev, [`${codigo}_${index}`]: false }));
            }
        } catch (error) {
            // Si hay un error al intentar obtener la imagen (por ejemplo, falta de conexión)
            setImageExists((prev) => ({ ...prev, [`${codigo}_${index}`]: false }));
        }
    };

    // Ejecutar la comprobación para cada item y para las tres imágenes (_1, _2, _3)
    useEffect(() => {
        data.forEach((item) => {
            for (let i = 1; i <= 8; i++) {
                checkImageExists(item.Codigo, i); // Verificar si la imagen existe para cada sufijo
            }
        });
    }, [data]);

    // Renderiza cada imagen en el carrusel si existe
    const renderItem = ({ item }) => {
        const images = [];
        for (let i = 1; i <= 8; i++) {
            const imageUrl = `https://storage.googleapis.com/point_pweb/web2023/IMAGENES%20WEB/${item.Codigo}_${i}.jpg`;
            if (imageExists[`${item.Codigo}_${i}`]) {
                images.push(
                    <Image
                        key={`${item.Codigo}_${i}`}
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                );
            }
        }

        return (
            <View style={styles.imageContainer}>
                {images.length > 0 ? images : <Text></Text>}
            </View>
        );
    };

    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={data}
                vertical
                renderItem={renderItem}
                keyExtractor={(item) => item.Codigo.toString()}
                pagingEnabled
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    imageContainer: {
        marginVertical: 10, // Agregar espacio vertical entre los grupos de imágenes
    },
    image: {
        width: 150, // Ajusta el tamaño de la imagen
        height: 150,
        borderRadius: 8,
        marginVertical: 5, // Añade un pequeño margen vertical entre las imágenes
        borderColor: "#e0e0e0",
        borderWidth: 0.5,
        resizeMode: "contain",
    },
});
