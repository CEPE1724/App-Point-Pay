import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  detailsContainer: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  iconsearch: {
    marginRight: 8,
  },
  value: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  textCell: {
    fontSize: 13,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  buttonAmortizacion: {
    backgroundColor: '#4CAF50', // Verde
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCelular: {
    backgroundColor: '#2196F3', // Azul
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGestiones: {
    backgroundColor: '#FFC107', // Amarillo
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonReferencias: {
    backgroundColor: '#9C27B0', // Púrpura
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonProductos: {
    backgroundColor: '#FF5722', // Naranja
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowPro: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueProAmo: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  rowProyect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  textProyect: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
