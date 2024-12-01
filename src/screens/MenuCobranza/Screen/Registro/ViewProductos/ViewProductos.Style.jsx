import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Para Android
  },
  productCode: {
    fontSize: 14,
    color: '#6c757d',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  productSerial: {
    fontSize: 14,
    color: '#6c757d',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
});
