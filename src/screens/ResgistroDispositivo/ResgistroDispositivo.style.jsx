import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: "#F4F4F9",
    },
    formContainer: {
      flex: 1,
      padding: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    formTitle: {
      fontSize: 24,
      fontWeight: '500',
      color: '#00416D',
      marginBottom: 20,
    },
    formSubTitle: {
      fontSize: 16,
      color: '#333',
      marginBottom: 10,
      textAlign: 'left',
      marginHorizontal: 10,
    },
    formSubTitleOb: {
      fontSize: 16,
      color: '#333',
      marginBottom: 10,
      textAlign: 'left',
      marginHorizontal: 10,
    },
    input: {
      width: '90%',
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 8,
      marginBottom: 15,
      fontSize: 16,
      borderColor: '#ddd',
      borderWidth: 1,
    },
    pinContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: '#00416D',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    backButtonText: {
      color: '#00416D',
      fontSize: 16,
      marginLeft: 10,
    },
    loadingIndicator: {
      marginTop: 20,
    },
  });
  