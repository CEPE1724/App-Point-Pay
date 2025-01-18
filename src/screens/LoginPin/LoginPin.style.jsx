import { StyleSheet, Dimensions } from "react-native";


export const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4F4F9',
            paddingHorizontal: 30,
            marginBottom: 50,
        },
        image: {
            marginBottom: 30,
        },
        connectionStatusContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        connectionStatusText: {
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
        },
        pinContainer: {
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: 40,
        },
        circle: {
            width: 25,
            height: 25,
            borderRadius: 20 / 2,
            margin: 5,
            borderWidth: 1,
            borderColor: '#00416D',
        },
        buttonContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '80%',
            marginBottom: 30,
            justifyContent: 'space-between',
        },
        numButton: {
            width: '30%',
            paddingVertical: 12,
            backgroundColor: '#00416D',
            marginBottom: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
        },
        numButtonText: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
        },
        deleteButton: {
            width: '30%',
            paddingVertical: 12,
            backgroundColor: '#FF4C4C',
            marginBottom: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
        },
        backButton: {
            backgroundColor: 'green',
            paddingVertical: 12,
            paddingHorizontal: 40,
            borderRadius: 8,
            marginTop: 20,
            marginBottom: 30,
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });
    