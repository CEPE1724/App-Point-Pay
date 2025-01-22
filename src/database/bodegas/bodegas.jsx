/*CREATE TABLE IF NOT EXISTS Bodegas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idBodega INTEGER NOT NULL DEFAULT 0,
    Bodega INTEGER NOT NULL DEFAULT 0,
    Codigo TEXT NOT NULL DEFAULT '',
    Activo bit NOT NULL DEFAULT 0,
    Factura bit NOT NULL DEFAULT 0,
    Almacen bit NOT NULL DEFAULT 0,
    Inventario bit NOT NULL DEFAULT 0
    */
    export const addItemAsyncBodega = async (db, data, isConnected) => {
        if (isConnected) {
            try {
                // Elimina todos los registros existentes en la tabla Bodegas
                await db.runAsync('DELETE FROM Bodegas');
            } catch (error) {
                console.error("Error al eliminar registros de Bodegas:", error);
            }
    
            try {
                // Inserta cada bodega en la tabla Bodegas
                for (let bodega of data.usuario.bodegas) {
                    // Verificar los datos de la bodega antes de la inserción
                   // console.log("Datos de bodega a insertar:", bodega);
    
                    // Verificar si el campo 'Nombre' está presente y no es vacío
                    if ((bodega.Nombre && bodega.Nombre.trim()) !== '' || (bodega.idBodega && bodega.idBodega > 0)) {
                       // console.log(`Bodega ${bodega.Nombre} es válida. Procediendo a la inserción.`);
    
                        await db.runAsync(`
                            INSERT INTO Bodegas (
                                Activo, Almacen, Bodega, Codigo, Factura, Inventario, Nombre, idBodega
                            ) VALUES (
                                ?, ?, ?, ?, ?, ?, ?, ?
                            )`, [
                            bodega.Activo,      // Activo
                            bodega.Almacen,     // Almacen
                            bodega.Bodega,      // Bodega
                            bodega.Codigo,      // Codigo
                            bodega.Factura,     // Factura
                            bodega.Inventario,  // Inventario
                            bodega.Nombre,      // Nombre
                            bodega.idBodega     // idBodega
                        ]);
                    } 
                }
            } catch (error) {
                console.error("Error al insertar bodegas:", error);
            }
        } else {
            console.log("No hay conexión a la base de datos.");
        }
    };
    
    export const getItemsAsyncBodegaALL = async (db) => {

        try {
            const query = 'SELECT * FROM Bodegas';
            const items = await db.getAllAsync(query);
            return items;

        } catch (error) {
            console.error("Error al obtener bodegas:", error);
            return [];
        }
    };
    
    
                 

