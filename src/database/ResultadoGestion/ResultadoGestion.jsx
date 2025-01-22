export const ListadoResultadoGestion = async (db, data, isConnected) => {
    if (isConnected) {
        try {
            // Elimina todos los registros existentes en la tabla Bodegas
            await db.runAsync('DELETE FROM ResultadoGestion');
        } catch (error) {
            console.error("Error al eliminar registros de Bodegas:", error);
        }
        try {
            // Inserta cada bodega en la tabla Bodegas
            for (let bodega of data.usuario.ResultadoGestion) {
                // Verificar los datos de la bodega antes de la inserción
               // console.log("Datos de bodega a insertar:", bodega);

                // Verificar si el campo 'Nombre' está presente y no es vacío
                if ( (bodega.idCbo_ResultadoGestion && bodega.idCbo_ResultadoGestion > 0)) {
                   // console.log(`Bodega ${bodega.Nombre} es válida. Procediendo a la inserción.`);
                  
                    await db.runAsync(`
                        INSERT INTO ResultadoGestion (
                            idCbo_ResultadoGestion, idCbo_EstadoGestion, Resultado, idCbo_EstadosTipocontacto
                        ) VALUES (
                            ?, ?, ?, ?
                        )`, [
                        bodega.idCbo_ResultadoGestion,      // idCbo_ResultadoGestion
                        bodega.idCbo_EstadoGestion,      // idCbo_EstadoGestion
                        bodega.Resultado,  // Resultado
                        bodega.idCbo_EstadosTipocontacto  // idCbo_EstadosTipocontacto
                    ]);
                } 
            }
        } catch (error) {
            console.error("Error al insertar EstadoGestion:", error);
        }
    } else {
        console.log("No hay conexión a la base de datos.");
    }
};

export const getListadoResultadoGestion= async (db, idCbo_EstadosTipocontacto) => {

    try {
        const query = 'SELECT * FROM ResultadoGestion where idCbo_EstadosTipocontacto = ?';
        const items = await db.getAllAsync(query, [idCbo_EstadosTipocontacto]);
        return items;

    } catch (error) {
        console.error("Error al obtener bodegas:", error);
        return [];
    }
};
