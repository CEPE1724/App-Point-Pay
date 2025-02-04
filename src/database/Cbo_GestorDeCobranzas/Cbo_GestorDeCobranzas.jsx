export const addItemAsyncCbo_Gestorcobranza = async (db, data, isConnected) => {
    if (isConnected) {
        try {


            // Asegurarse de que todos los campos estén presentes para la inserción
            await db.runAsync(`
                INSERT INTO Cbo_GestorDeCobranzas (
                    idCbo_GestorDeCobranzas,
                    idcobrador,
                    notcobrador,
                    Valor_Cobrar_Proyectado,
                    Valor_Cobrado,
                    Numero_Documento,
                    Cedula,
                    Cliente,
                    idCompra,
                    idCliente,
                    Dias_Mora_Proyectado,
                    Banco,
                    Direccion,
                    Barrio,
                    Telefono,
                    Celular,
                    Fecha_Factura
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )`, [
                    data.idCbo_GestorDeCobranzas || null,
                    data.idcobrador || null,
                    data.notcobrador || null,
                    data.Valor_Cobrar_Proyectado || 0,
                    data.Valor_Cobrado || 0,
                    data.Numero_Documento || '',
                    data.Cedula || '',
                    data.Cliente || '',
                    data.idCompra || 0,
                    data.idCliente || 0,
                    data.Dias_Mora_Proyectado || 0,
                    data.Banco || '',
                    data.Direccion || '',
                    data.Barrio || '',
                    data.Telefono || '',
                    data.Celular || '',
                    data.Fecha_Factura || new Date().toISOString()
                ]);
        } catch (error) {
            console.error("Error al insertar datos en Cbo_GestorDeCobranzas:", error);
        }
    } 
};

export const deleteCbo_Gestorcobranza = async (db, isConnected) => {
    if (isConnected) {
        try {
            // Elimina todos los registros existentes en la tabla Cbo_GestorDeCobranzas
            await db.runAsync('DELETE FROM Cbo_GestorDeCobranzas');
        } catch (error) {
            console.error("Error al eliminar registros de Cbo_GestorDeCobranzas:", error);
        }
    } 
}


export const getallCbo_Gestorcobranza = async (db, filtro) => {
    try {
        // Construir la consulta base con el filtro común para todos los campos
        let query = `
            SELECT * FROM Cbo_GestorDeCobranzas
            WHERE Numero_Documento LIKE ?
            OR Cedula LIKE ?
            OR Cliente LIKE ?
            OR Banco LIKE ?
        `;
        
        // Crear un arreglo con el valor del filtro, que se aplica a todos los campos
        const values = [`%${filtro}%`, `%${filtro}%`, `%${filtro}%`, `%${filtro}%`];

        // Ejecutar la consulta con los valores
        const items = await db.getAllAsync(query, values);

        return items;
    } catch (error) {
        console.error("Error al obtener los datos de Cbo_GestorDeCobranzas:", error);
        return []; // Retorna un arreglo vacío en caso de error
    }
};


