import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 12, // Reducido
    backgroundColor: '#F3F4F6',
  },

  // Título general
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3464c0', // Azul institucional
    marginBottom: 16, // Reducido
  },

  // Contenedor con sombra elegante y margen compacto
  pickerContainer: {
    marginBottom: 10, // Reducido
    backgroundColor: '#ffffff',
    paddingVertical: 10, // Menos padding interno
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    color: '#111827',
  },

  pickerItem: {
    fontSize: 13,
    color: '#374151',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color: '#374151',
  },

  textCedula: {
    height: 44,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    color: '#111827',
    fontSize: 15,
  },

  errorText: {
    color: '#ec5d3f', // Naranja institucional
    fontSize: 12,
    marginTop: 3,
  },

  // Tarjeta de información del cliente
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginTop: 14, // Reducido
    marginBottom: 12, // Reducido
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
    color: '#ec5d3f', // Naranja institucional
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    paddingBottom: 5,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  cardLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    flex: 1,
  },

  cardValue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#111827',
    flex: 1,
    textAlign: 'left',
  },

  // Encabezado con ícono
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3464c0', // Azul institucional
    marginLeft: 6,
  },

  // Campo con ícono
  fieldContainer: {
    marginBottom: 10, // Reducido
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    elevation: 2,
  },

  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // Reducido
  },
  buttonContainer: {
    marginTop: 12, // Reducido
    backgroundColor: '#3464c0', // Azul institucional
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
