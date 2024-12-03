import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  header: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    color: '#333',
  },
  headerRow: {
    flexDirection: 'row', // Esto asegura que los encabezados de las columnas se alineen horizontalmente
    backgroundColor: '#3498db',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 10,
  },
  // Nueva fila para la sección de Cliente, Cédula y Documento (dispuestos en columnas)
  headerColumn: {
    flexDirection: 'column', // Coloca los elementos en columna
    flex: 1,
    borderRadius: 8,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
   
  },
  headerColumnText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5, // Espaciado entre cada texto
  },
  headerColumnTextView: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 9,
    color: '#333',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#7f8c8d',
  },
  tableContainer: {
    paddingHorizontal: 1,
  },
  headerRowView : {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerCliente: {
    backgroundColor: '#0000ff', // Fondo rosado
  },
  headerCedula: {
    backgroundColor: '#00c000', // Fondo verde claro
  },
  headerDocumento: {
    backgroundColor: '#ff0000', // Fondo morado claro
  },
});
