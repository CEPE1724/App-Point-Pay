export const addItemAsync = async (db, data, nombre) => {


    // Asegúrate de que 'data' tiene la estructura correcta
    if (!data || !data.idNomina || !data.Empresa || !data.Cedula || !data.KeyDispositivo || !data.iTipoPersonal) {

        return;
    }

    if (!nombre || nombre.trim() === '') {
        return;
    }

    // Desestructuración de los datos
    const { idNomina, Empresa, Cedula, KeyDispositivo, iTipoPersonal } = data;

    try {
        // Eliminar regsitros
        await db.runAsync('DELETE FROM dispositivosapp');
        // Usa 'INSERT OR REPLACE' para insertar o reemplazar un registro si ya existe
        const result = await db.runAsync(
            'INSERT OR REPLACE INTO dispositivosapp (idNomina, Empresa, Cedula, KeyDispositivo, iTipoPersonal, Alias) VALUES (?, ?, ?, ?, ?, ?);',
            [idNomina, Empresa, Cedula, KeyDispositivo, iTipoPersonal, nombre]
        );
        
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

    if (!kEYdATA || kEYdATA.trim() === '') {
        return;
    }

    try {
        // Actualiza solo el campo 'Alias' en la base de datos
        const result = await db.runAsync(
            'UPDATE dispositivosapp SET kEYdATA = ? ;',
            [kEYdATA]
        );
        
    } catch (error) {
        console.error("Error al actualizar el ítem:", error);
    }
};

export const updatePushToken = async (db, token) => {
    if (!token || !db) return;
  
    try {
      const current = await db.getFirstAsync(
        'SELECT TokenPush FROM dispositivosapp'
      );
  
      if (current?.TokenPush === token) {
        return;
      }
  
      await db.runAsync(
        'UPDATE dispositivosapp SET TokenPush = ? ',
        [token]
      );
  
    } catch (error) {
      console.error("❌ Error al actualizar TokenPush:", error);
    }
  };