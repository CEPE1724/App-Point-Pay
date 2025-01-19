/*await db.runAsync(`
      CREATE TABLE IF NOT EXISTS PermisosMenu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Menu INTEGER NOT NULL DEFAULT 0
      );
    `);
    */
    export const addItemAsyncMenu = async (db, data, isConnected) => {
        console.log("data menu", data.usuario.permisosMenu);
    
        if (isConnected) {
            try {
                // Elimina todos los registros existentes en la tabla PermisosMenu
                await db.runAsync('DELETE FROM PermisosMenu');
                console.log("Registros eliminados correctamente.");
            } catch (error) {
                console.error("Error al eliminar registros de PermisosMenu:", error);
            }
    
            try {
                // Validar que data.usuario.permisosMenu es un array y tiene elementos
                if (Array.isArray(data.usuario.permisosMenu) && data.usuario.permisosMenu.length > 0) {
                    // Convertir todos los elementos de permisosMenu a números
                    const permisosNumericos = data.usuario.permisosMenu.map(menu => Number(menu));
    
                    // Verificar si todos los valores convertidos son números válidos
                    const permisosValidos = permisosNumericos.filter(menu => !isNaN(menu) && menu > 0);
    
                    if (permisosValidos.length > 0) {
                        // Inserta cada permiso en la tabla PermisosMenu
                        for (let menu of permisosValidos) {
                            if (menu !== null && !isNaN(menu)) {
                                // Proceder a la inserción en la tabla PermisosMenu
                                await db.runAsync(`
                                    INSERT INTO PermisosMenu (
                                        Menu
                                    ) VALUES (?)`, [menu]);
    
                                console.log(`Permiso con id ${menu} insertado correctamente.`);
                            } else {
                                console.log(`Valor no válido para la inserción: ${menu}`);
                            }
                        }
                    } else {
                        console.error("No se encontraron permisos válidos para insertar.");
                    }
                } else {
                    console.error("No se proporcionaron permisos válidos para insertar.");
                }
            } catch (error) {
                console.error("Error al insertar permisos:", error);
            }
        } else {
            console.log("No hay conexión a la base de datos.");
        }
    };
    
    // consulta menu

    export const getItemsAsyncMenu = async (db) => {
        try {
            const query = 'SELECT * FROM PermisosMenu';
            const items = await db.getAllAsync(query);
            console.log("Items de la base de datos:", items);
            return items;
        }
        catch (error) {
            console.error("Error getItemsAsyncMenu", error);
        }
    }
    
                 

