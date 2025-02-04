export const ListadoEstadoTipoContacto = async (db, data, isConnected) => {

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
  

                // Verificar si el campo 'Nombre' está presente y no es vacío
                if ( (bodega.idCbo_EstadosTipocontacto && bodega.idCbo_EstadosTipocontacto > 0)) {

                 
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