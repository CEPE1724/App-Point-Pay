

export const addItemAsyncACUbic = async (db, tipoAccion, latitude, longitude,ICidIngresoCobrador,Empresa ) => {
    try {
        

        console.log("Agregando ubicación en la base de datos...");
        console.log("tipoAccion",tipoAccion);
        console.log("latitude",latitude);
        console.log("longitude",longitude);
        console.log("ICidIngresoCobrador",ICidIngresoCobrador);
        console.log("Empresa",Empresa);
        // Inserción de la ubicación en la base de datos interna
        await db.runAsync(`
            INSERT INTO AccionesUbicaciones (
                tipoAccion,
                latitude,
                longitude,
                ICidIngresoCobrador,
                Empresa,
                timestamp
            ) VALUES (
                '${tipoAccion}',
                ${latitude},
                ${longitude},
                ${ICidIngresoCobrador},
                ${Empresa},
                '${getLocalDateTime()}'
            );
        `);
        console.log("Datos guardados acciones");
    } catch (error) {
        console.log("Error al agregar ubicación en la base de datos:", error);
    }
};
// Función para subir ubicaciones pendientes a través del socket
export const getPendingACUbic = async (db) => {
    try {

        const query = 'SELECT * FROM AccionesUbicaciones WHERE enviado = 0 ORDER BY timestamp ASC';
        const locations = await db.getAllAsync(query);
        return locations;
    } catch (error) {
        console.error("Error al subir ubicaciones pendientes:", error);
    }
};

export const getTipoAccion = async (db, tipoAccion) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const query = `SELECT * FROM AccionesUbicaciones WHERE tipoAccion = '${tipoAccion}' AND enviado = 0 AND DATE(timestamp) = '${currentDate}' ORDER BY timestamp ASC`;
      const locations = await db.getAllAsync(query);
      return locations;
    } catch (error) {
      console.error("Error al obtener ubicaciones pendientes:", error);
    }
  };
  

const getLocalDateTime = () => {
    const date = new Date();
    // Restamos 5 horas para convertir a la hora de Ecuador (UTC-5)
    date.setHours(date.getHours() - 5);
    return date.toISOString().replace('T', ' ').substring(0, 19); 
};


