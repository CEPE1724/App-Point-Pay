import { useSQLiteContext } from 'expo-sqlite';
import { migrateDbIfNeeded } from './migrations';

export const useDb = () => {
  const db = useSQLiteContext();

  const initializeDb = async () => {
    // Asegurarse de que la base de datos esté configurada correctamente
    await migrateDbIfNeeded(db);
  };

  return { db, initializeDb };
};
