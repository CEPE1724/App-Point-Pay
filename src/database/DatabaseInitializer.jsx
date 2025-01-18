// src/components/DatabaseInitializer.js
import { useEffect } from 'react';
import { useDb } from '../database/db'; // Asegúrate de que esta ruta sea la correcta para tu hook

const DatabaseInitializer = () => {
  const { initializeDb } = useDb(); // Obtener la función para inicializar la DB

  useEffect(() => {
    const init = async () => {
      // Inicializa la base de datos y crea las tablas si no existen
      await initializeDb();
    };
    init();
  }, [initializeDb]);

  return null; // Este componente no necesita renderizar nada
};

export default DatabaseInitializer;
