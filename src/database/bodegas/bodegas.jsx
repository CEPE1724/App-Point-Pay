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
    
                    // Verificar si el campo 'Nombre' está presente y no es vacío
                    if ((bodega.Nombre && bodega.Nombre.trim()) !== '' || (bodega.idBodega && bodega.idBodega > 0)) {

    
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
        } 
    };
    
    export const getItemsAsyncBodegaALL = async (db) => {

        try {
            const query = 'SELECT * FROM Bodegas where Activo = 1 and Factura = 1 and Inventario = 1 ORDER BY Nombre ASC';
            const items = await db.getAllAsync(query);
            return items;

        } catch (error) {
            console.error("Error al obtener bodegas:", error);
            return [];
        }
    };
    
    
                 

