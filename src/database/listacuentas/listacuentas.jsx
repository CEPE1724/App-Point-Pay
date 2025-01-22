
 export const ListadoCuenta = async (db, data, isConnected) => {
    console.log("data EstadoGestion", data.usuario.listacuentas);
    if (isConnected) {
        try {
            // Elimina todos los registros existentes en la tabla Bodegas
            await db.runAsync('DELETE FROM listacuentas');
        } catch (error) {
            console.error("Error al eliminar registros de Bodegas:", error);
        }

        try {
            // Inserta cada bodega en la tabla Bodegas
            for (let bodega of data.usuario.listacuentas) {
                // Verificar los datos de la bodega antes de la inserción
               // console.log("Datos de bodega a insertar:", bodega);

                // Verificar si el campo 'Nombre' está presente y no es vacío
                if ( (bodega.idCuenta && bodega.idCuenta > 0)) {
                   // console.log(`Bodega ${bodega.Nombre} es válida. Procediendo a la inserción.`);
                   
                    await db.runAsync(`
                        INSERT INTO listacuentas (
                            idCuenta, Descripcion
                        ) VALUES (
                            ?, ?
                        )`, [
                        bodega.idCuenta,      // idCbo_EstadoGestion
                        bodega.Descripcion  // Estado
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


export const getlistacuentas= async (db) => {

    try {
        const query = 'SELECT * FROM listacuentas';
        const items = await db.getAllAsync(query);
        return items;

    } catch (error) {
        console.error("Error al obtener bodegas:", error);
        return [];
    }
};