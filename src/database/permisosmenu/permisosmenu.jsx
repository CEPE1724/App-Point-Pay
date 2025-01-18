/*await db.execAsync(`
      CREATE TABLE IF NOT EXISTS PermisosMenu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Menu INTEGER NOT NULL DEFAULT 0
      );
    `);
    */
    export const addItemAsyncMenu = async (db, data, isConnected) => {
        console.log("addItemAsyncMenu");
    
        if (isConnected) {
            try {
                // Elimina todos los registros existentes en la tabla PermisosMenu
                await db.execAsync('DELETE FROM PermisosMenu');
                console.log("Registros eliminados correctamente.");
            } catch (error) {
                console.error("Error al eliminar registros de PermisosMenu:", error);
            }
    
            try {
                // Inserta cada permiso en la tabla PermisosMenu
                for (let menu of data.usuario.permisosMenu) {
                    // Verificar los datos antes de la inserción
                    console.log("Datos de permiso a insertar:", menu);
    
                    // Proceder a la inserción en la tabla PermisosMenu
                    await db.execAsync(`
                        INSERT INTO PermisosMenu (
                            Menu
                        ) VALUES (?)`, [menu]);
    
                    console.log(`Permiso con id ${menu} insertado correctamente.`);
                }
            } catch (error) {
                console.error("Error al insertar permisos:", error);
            }
        } else {
            console.log("No hay conexión a la base de datos.");
        }
    };
    
    
    
                 

