export const addItemAsync = async (db, text) => {
    if (!text || text.trim() === '') {
      console.log("Texto vacío o nulo, no se añadirá el ítem.");
      return;
    }
  
    try {
      console.log("Añadiendo ítem a la base de datos", text);
      const result = await db.runAsync('INSERT INTO Cobrador (done, value) VALUES (?, ?);', false, text);
      console.log("Ítem insertado correctamente:", result);
    } catch (error) {
      console.error("Error al insertar el ítem:", error);
    }
  };
  
  export const getItemsAsync = async (db, doneStatus) => {
    const query = 'SELECT * FROM Cobrador WHERE done = ?';
    const items = await db.getAllAsync(query, doneStatus);
    return items;
  };
  