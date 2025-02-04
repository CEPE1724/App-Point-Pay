export const getALLPendientes = async (db) => {
    try {
        console.log("getALLPendientes");
        // Construir la consulta para obtener todos los registros donde enviado = 0
        let query = `
            SELECT COUNT(*) FROM AccionesUbicaciones
            WHERE enviado = 0
        `;
        // Ejecutar la consulta sin necesidad de valores adicionales
        const result = await db.getAllAsync(query);
        const count = result[0]?.["COUNT(*)"] || 0; // Usar "COUNT(*)" para acceder al valor
        return count;
    } catch (error) {
        console.error("Error al obtener los datos de Cbo_GestorDeCobranzas:", error);
        return []; // Retorna un arreglo vacío en caso de error
    }
};


export const deletePendientes = async (db) => {
    try {
        // Construir la consulta para eliminar todos los registros donde enviado = 0
        let query = `
            DELETE FROM AccionesUbicaciones
            WHERE enviado = 0 and idCompra > 0
        `;
        // Ejecutar la consulta sin necesidad de valores adicionales
        await db.runAsync(query);
    } catch (error) {
        console.error("Error al eliminar los datos de Cbo_GestorDeCobranzas:", error);
    }
};


export const getALLDataACC = async (db) => {
    try {
        // Construir la consulta para obtener todos los registros donde enviado = 0
        let query = `
            SELECT * FROM AccionesUbicaciones  WHERE enviado = 0
        `;
        // Ejecutar la consulta sin necesidad de valores adicionales
        const result = await db.getAllAsync(query);
        return result;
    } catch (error) {
        console.error("Error al obtener los datos de Cbo_GestorDeCobranzas:", error);
        return []; // Retorna un arreglo vacío en caso de error
    }
};

export const getALlUodateId = async (db, id) => {
    try {
        // Construir la consulta para obtener todos los registros donde enviado = 0
        let query = `
            Update AccionesUbicaciones set enviado = 1 WHERE idAccion = ${id} and enviado = 0
        `;
        // Ejecutar la consulta sin necesidad de valores adicionales
        await db.runAsync(query);
    }
    catch (error) {
        console.error("Error al obtener los datos de Cbo_GestorDeCobranzas:", error);
    }
}
