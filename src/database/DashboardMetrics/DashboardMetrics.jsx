export const addItemAsyncDSbMetr = async (db, data) => {

    if (!data || !data.ICidIngresoCobrador || !data.totalAmount || !data.numberOfClients || !data.totalProjected || !data.percentageCollected) {
        return;
    }

    // Desestructuración de los datos
    const { ICidIngresoCobrador, totalAmount, numberOfClients, totalProjected, percentageCollected } = data;

    try {
        // Eliminar regsitros
        await db.runAsync('DELETE FROM DashboardMetrics');
        const result = await db.runAsync(
            'INSERT OR REPLACE INTO DashboardMetrics (ICidIngresoCobrador, totalAmount, numberOfClients, totalProjected, percentageCollected) VALUES (?, ?, ?, ?, ?);',
            [ICidIngresoCobrador, totalAmount, numberOfClients, totalProjected, percentageCollected]
        );
    } catch (error) {
        console.error("Error al insertar o actualizar el ítem:", error);
    }
};

export const getItemsAsyncDSbMetr = async (db) => {


    try {
        const query = 'SELECT * FROM DashboardMetrics';
        const items = await db.getAllAsync(query);
        return items;
    } catch (error) {
        console.error("Error al obtener los ítems:", error);
        return [];
    }
};

export const UpdateAllDSbMetr = async (db, data) => {
    if (!data || !data.ICidIngresoCobrador || !data.totalAmount || !data.numberOfClients || !data.totalProjected || !data.percentageCollected) {
        return;
    }

    // Desestructuración de los datos
    const { ICidIngresoCobrador, totalAmount, numberOfClients, totalProjected, percentageCollected } = data;

    try {
        // Actualizar regsitros
        const result = await db.runAsync(
            'UPDATE DashboardMetrics SET totalAmount = ?, numberOfClients = ?, totalProjected = ?, percentageCollected = ? WHERE ICidIngresoCobrador = ?;',
            [totalAmount, numberOfClients, totalProjected, percentageCollected, ICidIngresoCobrador]
        );
    }
    catch (error) {
        console.error("Error al actualizar el ítem:", error);
    }
}