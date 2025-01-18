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
        console.log("addItemAsyncBodega");
        if (isConnected) {
            try {
                // Elimina todos los registros existentes en la tabla Bodegas
                await db.execAsync('DELETE FROM Bodegas');
                console.log("Registros eliminados correctamente.");
            } catch (error) {
                console.error("Error al eliminar registros de Bodegas:", error);
            }
    
            try {
                // Inserta cada bodega en la tabla Bodegas
                for (let bodega of data.usuario.bodegas) {
                    // Verificar los datos de la bodega antes de la inserción
                    console.log("Datos de bodega a insertar:", bodega);
    
                    // Verificar si el campo 'Nombre' está presente y no es vacío
                    if ((bodega.Nombre && bodega.Nombre.trim()) !== '' || (bodega.idBodega && bodega.idBodega > 0)) {
                        console.log(`Bodega ${bodega.Nombre} es válida. Procediendo a la inserción.`);
    
                        await db.execAsync(`
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
                        console.log(`Bodega ${bodega.Nombre} insertada correctamente.`);
                    } else {
                        // Si el campo 'Nombre' está vacío o no definido, generar una advertencia
                        console.warn(`Bodega con idBodega ${bodega.idBodega} tiene un Nombre vacío o no definido. No se insertará.`);
                    }
                }
            } catch (error) {
                console.error("Error al insertar bodegas:", error);
            }
        } else {
            console.log("No hay conexión a la base de datos.");
        }
    };
    
    
    
                 

