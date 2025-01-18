import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 15,
    margin: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    backgroundColor: '#2196F3', // Default background color
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  gestionadoText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 5, // Space between icon and text
  },
  totalText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 5, // Space between icon and text
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
