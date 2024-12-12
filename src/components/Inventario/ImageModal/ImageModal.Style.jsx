import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingTop: 75,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  fullScreenImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 5,
  },
  // Estilos de la tarjeta que contiene la información del producto
  cardContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 5,
  },
  cardContent: {
    marginTop: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productCode: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productStock: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  productInstallments: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  stockrows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Asegura que el texto y el botón se alineen correctamente
    marginBottom: 5, // Puedes ajustar la separación entre los elementos
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  showButton: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10, // Para separar el botón del texto
  },
  showButtonText: {
    color: '#fff',
    fontSize: 14,
  },
 
  bodegaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  bodegaText: {
    fontSize: 14,
    color: '#666',
  },


closeBodegasButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: '#ff0000',
  borderRadius: 20,
  padding: 5,
  zIndex: 1,
},
closeBodegasText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
},
bodegaContainer: {
  marginTop: 20,
  padding: 10,
  backgroundColor: '#f9f9f9',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,
},

bodegaItem: {
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},

  
});
