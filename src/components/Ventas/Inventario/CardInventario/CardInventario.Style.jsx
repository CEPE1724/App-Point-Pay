import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Esto agrega la sombra en Android
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowProyect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  textProyect: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
