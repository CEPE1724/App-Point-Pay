import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    alertContainer: {
        position: 'absolute',
        top: '50%', // Centrar verticalmente
        left: '5%',
        
        right: '5%',
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1000, // Asegúrate de que esté por encima de otros elementos
    },
    icon: {
        marginRight: 10,
    },
    alertText: {
        color: '#fff',
        fontSize: 16,
    },
});
