import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7", // Fondo general
  },
  pickerContainer: {
    marginBottom: 5,
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderRadius: 8,
    shadowColor: '#000',
  },
  pickerItem: {
    fontSize: 12,
  },
  inputContainersearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconsearch: {
    marginRight: 10,
  },
  inputsearch: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#0066cc',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 2,
    borderColor: '#004d99',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    color: '#333',
  },
  tableRowOdd: {
    backgroundColor: '#f9f9f9',
  },
  tableRowEven: {
    backgroundColor: '#ffffff',
  },
  iconNoData: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },

  


 
  
 
  
  imageThumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },


 
  recordsFoundText: {
    fontSize: 12,
    color: 'black',
  },
});
