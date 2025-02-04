export const addItemAsync = async (db, text) => {
    if (!text || text.trim() === '') {
      return;
    }
  
    try {
      const result = await db.runAsync('INSERT INTO Cobrador (done, value) VALUES (?, ?);', false, text);
    } catch (error) {
      console.error("Error al insertar el ítem:", error);
    }
  };
  
  export const getItemsAsync = async (db, doneStatus) => {
    const query = 'SELECT * FROM Cobrador WHERE done = ?';
    const items = await db.getAllAsync(query, doneStatus);
    return items;
  };
  