
  // Menu.Style.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 30,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 1,
  },
  cardTitleLoc: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2066a4',
    marginTop: 5, // Espacio entre el ícono y el título
  },
  image: {
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  errorMessage: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  errorContainer: {
    backgroundColor: '#242c64',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainerLoc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: 30,
    justifyContent: 'space-around',
    width: '100%',

  },
});
