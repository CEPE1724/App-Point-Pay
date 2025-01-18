import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4', 
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  circleText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  userTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#666',
  },
  userDescription: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  exitButton: {
    marginBottom: 15,
    backgroundColor: '#4CAF50',
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    height: '80%',
  },
  modalHeader: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
  },
  modalCloseButton: {
    backgroundColor: 'transparent',
  },
  modalBody: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalFooter: {
    flex: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  modalConfirmButton: {
    backgroundColor: '#4CAF50',
  },
});
