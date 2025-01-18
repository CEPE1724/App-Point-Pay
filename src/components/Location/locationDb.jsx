import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('locations.db');

// Crear tabla para ubicaciones si no existe
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL, timestamp INTEGER);',
      [],
      () => console.log('Tabla de ubicaciones creada o ya existe'),
      (_, error) => { console.error(error); return false; }
    );
  });
};

// Guardar ubicación en SQLite
export const saveLocationToDb = (latitude, longitude, timestamp) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO locations (latitude, longitude, timestamp) VALUES (?, ?, ?)',
      [latitude, longitude, timestamp],
      () => console.log('Ubicación guardada en la base de datos'),
      (_, error) => { console.error(error); return false; }
    );
  });
};

// Obtener ubicaciones almacenadas en SQLite
export const getStoredLocations = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM locations',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => { reject(error); }
      );
    });
  });
};
