export const ListadoEstadoTipoContacto = async (db, data, isConnected) => {

    console.log("data EstadoTipoContacto", data.usuario.EstadoTipoContacto);
    if (isConnected) {
        try {
            // Elimina todos los registros existentes en la tabla Bodegas
            await db.runAsync('DELETE FROM EstadoTipoContacto');
        } catch (error) {
            console.error("Error al eliminar registros de Bodegas:", error);
        }

        try {
            // Inserta cada bodega en la tabla Bodegas
            for (let bodega of data.usuario.EstadoTipoContacto) {
                // Verificar los datos de la bodega antes de la inserción
               // console.log("Datos de bodega a insertar:", bodega);

                // Verificar si el campo 'Nombre' está presente y no es vacío
                if ( (bodega.idCbo_EstadosTipocontacto && bodega.idCbo_EstadosTipocontacto > 0)) {
                   // console.log(`Bodega ${bodega.Nombre} es válida. Procediendo a la inserción.`);
                 
                    await db.runAsync(`
                        INSERT INTO EstadoTipoContacto (
                            idCbo_EstadosTipocontacto, idCbo_EstadoGestion,Estado
                        ) VALUES (
                            ?, ?, ?
                        )`, [
                        bodega.idCbo_EstadosTipocontacto,      // idCbo_EstadosTipocontacto
                        bodega.idCbo_EstadoGestion,      // idCbo_EstadoGestion
                        bodega.Estado  // Estado
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

export const getListadoEstadoTipoContacto = async (db, idCbo_EstadoGestion) => {

    try {
        const query = 'SELECT * FROM EstadoTipoContacto where idCbo_EstadoGestion = ?';
        const items = await db.getAllAsync(query, [idCbo_EstadoGestion]);
        return items;

    } catch (error) {
        console.error("Error al obtener bodegas:", error);
        return [];
    }
};