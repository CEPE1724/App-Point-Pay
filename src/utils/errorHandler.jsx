// utils/errorHandler.js
import { useAuth } from '../navigation/AuthContext';

export const handleError = (error, expireToken) => {
  // Si el error tiene una respuesta del servidor
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 404:
        console.error("Error 404: Recurso no encontrado");
        break;
      case 401:
        expireToken(); // Realiza el logout si el token es inválido
        break;
      case 403:
        expireToken(); // Realiza el logout si no tienes permiso
        break;
      default:
        console.error(`Error ${status}: Error desconocido`);
    }
  } 
  // Si el error no tiene respuesta (posible pérdida de conexión)
  else if (error.request) {
    console.error("No se recibió respuesta del servidor. Verifica tu conexión a Internet.");
  } 
  // Si hubo un error al configurar la solicitud
  else {
    console.error("Error en la configuración de la solicitud:", error.message);
  }
};
