
// Función para agregar la ubicación a la base de datos interna (SQLite)
export const addItemAsyncUAPP = async (db, latitude, longitude, ICidIngresoCobrador, ICCodigo, Nombre, iTipoPersonal, idUsuario, Empresa) => {
    try {
        // Asegúrate de convertir a enteros los valores que deben ser numéricos
        const icId = parseInt(ICidIngresoCobrador, 10);
        const iTipo = parseInt(iTipoPersonal, 10);
        const userId = parseInt(idUsuario, 10);
        const empresa = parseInt(Empresa, 10);

        // Inserción de la ubicación en la base de datos interna
        await db.runAsync(`
            INSERT INTO UbicacionesAPP (
                ICidIngresoCobrador,
                latitude,
                longitude,
                Empresa,
                ICCodigo,
                Nombre,
                iTipoPersonal,
                idUsuario,
                timestamp
            ) VALUES (
                ${icId},
                ${latitude},
                ${longitude},
                ${empresa},
                '${ICCodigo}',
                '${Nombre}',
                ${iTipo},
                ${userId},
                '${getLocalDateTime()}'
            );
        `);
        console.log("Ubicación agregada correctamente.");
    } catch (error) {
        console.log("Error al agregar ubicación en la base de datos:", error);
    }
};
// Función para subir ubicaciones pendientes a través del socket
export const getPendingLocations = async (db) => {
    try {

        const query = 'SELECT * FROM UbicacionesAPP WHERE enviado = 0 ORDER BY timestamp ASC';
        const locations = await db.getAllAsync(query);
        return locations;
    } catch (error) {
        console.error("Error al subir ubicaciones pendientes:", error);
    }
};

const getLocalDateTime = () => {
    const date = new Date();
    // Restamos 5 horas para convertir a la hora de Ecuador (UTC-5)
    date.setHours(date.getHours() - 5);
    return date.toISOString().replace('T', ' ').substring(0, 19); 
};



export const updateItemAPP = async (db, idUbicacionesAPP) => {
    try {
        console.log("Actualizando ubicación...");
        console.log("idUbicacionesAPP:", idUbicacionesAPP);
        await db.runAsync(`
            UPDATE UbicacionesAPP
            SET enviado = 1
            WHERE idUbicacionesAPP = ${idUbicacionesAPP}
        `);
        console.log("Ubicación actualizada correctamente.");
    } catch (error) {
        console.error("Error al actualizar la ubicación:", error);
    }
};

