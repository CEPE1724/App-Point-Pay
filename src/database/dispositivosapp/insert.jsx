export const addItemAsync = async (db, data, nombre) => {
    console.log("Datos recibidos para insertar:", data);
    console.log("Data idNomina:", data.idNomina);
    console.log("Data Empresa:", data.Empresa);
    console.log("Data Cedula:", data.Cedula);
    console.log("Data KeyDispositivo:", data.KeyDispositivo);
    console.log("Data idTipoPersonal:", data.iTipoPersonal);

    // Asegúrate de que 'data' tiene la estructura correcta
    if (!data || !data.idNomina || !data.Empresa || !data.Cedula || !data.KeyDispositivo || !data.iTipoPersonal) {
        console.log("Datos incompletos o incorrectos. No se añadirá el ítem.");
        return;
    }

    if (!nombre || nombre.trim() === '') {
        console.log("Nombre vacío o nulo, no se añadirá el ítem.");
        return;
    }

    // Desestructuración de los datos
    const { idNomina, Empresa, Cedula, KeyDispositivo, iTipoPersonal } = data;

    try {
        // Eliminar regsitros
        await db.runAsync('DELETE FROM dispositivosapp');
        console.log("Registros eliminados correctamente.");
        // Usa 'INSERT OR REPLACE' para insertar o reemplazar un registro si ya existe
        const result = await db.runAsync(
            'INSERT OR REPLACE INTO dispositivosapp (idNomina, Empresa, Cedula, KeyDispositivo, iTipoPersonal, Alias) VALUES (?, ?, ?, ?, ?, ?);',
            [idNomina, Empresa, Cedula, KeyDispositivo, iTipoPersonal, nombre]
        );
        
        console.log("Ítem insertado o actualizado correctamente:", result);
    } catch (error) {
        console.error("Error al insertar o actualizar el ítem:", error);
    }
};

export const getItemsAsync = async (db) => {
    const query = 'SELECT * FROM dispositivosapp';
    const items = await db.getAllAsync(query);
    return items;
};

export const updateItemAsync = async (db,  kEYdATA) => {
    console.log("Nuevo nombre para Alias:", kEYdATA);
    if (!kEYdATA || kEYdATA.trim() === '') {
        console.log("Nombre vacío o nulo, no se actualizará el ítem.");
        return;
    }

    try {
        // Actualiza solo el campo 'Alias' en la base de datos
        const result = await db.runAsync(
            'UPDATE dispositivosapp SET kEYdATA = ? ;',
            [kEYdATA]
        );
        
        console.log("Ítem actualizado correctamente:", result);
    } catch (error) {
        console.error("Error al actualizar el ítem:", error);
    }
};

