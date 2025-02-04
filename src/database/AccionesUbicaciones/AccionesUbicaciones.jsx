

export const addItemAsyncACUbic = async (db, tipoAccion, latitude, longitude, ICidIngresoCobrador, Empresa) => {
    try {

        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 5);  // Restar 5 horas para Ecuador
        // Convertir a formato YYYY-MM-DD
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = `
        SELECT count(*) as total 
        FROM AccionesUbicaciones 
        WHERE tipoAccion = '${tipoAccion}' 
            AND timestamp LIKE '${formattedDate}%'
        ORDER BY timestamp ASC
      `;
        const result = await db.getAllAsync(query);

        if (result.total > 0) {
            return;  // Si ya existe, no hacemos nada
        }

        // Inserción de la ubicación en la base de datos interna
        await db.runAsync(`
            INSERT INTO AccionesUbicaciones (
                tipoAccion,
                latitude,
                longitude,
                ICidIngresoCobrador,
                Empresa,
                timestamp
            ) VALUES (
                '${tipoAccion}',
                ${latitude},
                ${longitude},
                ${ICidIngresoCobrador},
                ${Empresa},
                '${getLocalDateTime()}'
            );
        `);
    } catch (error) {
        console.log("Error al agregar ubicación en la base de datos:", error);
    }
};

export const addItemAsyncACUbicCliente = async (db, tipoAccion, latitude, longitude, ICidIngresoCobrador, Empresa, idCompra, idCombo1, idCombo2, idCombo3, TipoPago, FechaPago,Valor , IdBanco, NumeroDeposito, Url,Offline, timestamp, Notas ) => {
    try { 
        console.log("addItemAsyncACUbicCliente", tipoAccion, latitude, longitude, ICidIngresoCobrador, Empresa, idCompra, idCombo1, idCombo2, idCombo3, TipoPago, FechaPago,Valor , IdBanco, NumeroDeposito, Url, Offline, timestamp, Notas);
        console.log("addItemAsyncACUbicCliente",  getLocalDateTime());
       
        // Inserción de la ubicación en la base de datos interna
        await db.runAsync(`
            INSERT INTO AccionesUbicaciones (
                tipoAccion,
                latitude,
                longitude,
                ICidIngresoCobrador,
                Empresa,
                timestamp,
                idCompra,
                idCombo1,
                idCombo2,
                idCombo3,
                TipoPago,
                FechaPago,
                IdBanco,
                NumeroDeposito,
                Url,
                Valor,
                Offline,
                timestamp,
                Notas
            ) VALUES (
                '${tipoAccion}',
                ${latitude},
                ${longitude},
                ${ICidIngresoCobrador},
                ${Empresa},
                '${getLocalDateTime()}',
                ${idCompra},
                ${idCombo1},
                ${idCombo2},
                ${idCombo3},
                ${TipoPago},
                '${FechaPago}',
                ${IdBanco},
                '${NumeroDeposito}',
                '${Url}',
                ${Valor},
                ${Offline},
                '${timestamp}',
                '${Notas}'
            );
        `);
        console.log("addItemAsyncACUbicCliente", tipoAccion, latitude, longitude, ICidIngresoCobrador, Empresa, idCompra, idCombo1, idCombo2, idCombo3, TipoPago, timestamp);
    } catch (error) {
        console.log("Error al agregar ubicación en la base de datos:", error);
    }
};
// Función para subir ubicaciones pendientes a través del socket
export const getPendingACUbic = async (db) => {
    try {

        const query = 'SELECT * FROM AccionesUbicaciones WHERE enviado = 0 ORDER BY timestamp ASC';
        const locations = await db.getAllAsync(query);
        return locations;
    } catch (error) {
        console.error("Error al subir ubicaciones pendientes:", error);
    }
};

export const getTipoAccion = async (db, tipoAccion) => {
    try {
        // Obtener la fecha actual en UTC y ajustarla a la zona horaria de Ecuador (UTC-5)
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 5);  // Restar 5 horas para Ecuador
        // Convertir a formato YYYY-MM-DD
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = `
        SELECT * 
        FROM AccionesUbicaciones 
        WHERE tipoAccion = '${tipoAccion}' 
            AND timestamp LIKE '${formattedDate}%'
        ORDER BY timestamp ASC
      `;
        const locations = await db.getAllAsync(query);
        return locations;
    } catch (error) {
        console.error("Error al obtener ubicaciones pendientes:", error);
    }
};



const getLocalDateTime = () => {
    const date = new Date();
    // Restamos 5 horas para convertir a la hora de Ecuador (UTC-5)
    date.setHours(date.getHours() - 5);
    return date.toISOString().replace('T', ' ').substring(0, 19);
};


export const getTipoAccioncount = async (db, tipoAccion, idCompra) => {
    try {
        // Obtener la fecha actual en UTC y ajustarla a la zona horaria de Ecuador (UTC-5)
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 5);  // Restar 5 horas para Ecuador
        // Convertir a formato YYYY-MM-DD
        const formattedDate = currentDate.toISOString().split('T')[0];

        // Consulta SQL para obtener el conteo de registros
        const query = `
        SELECT COUNT(*) AS total
        FROM AccionesUbicaciones 
        WHERE tipoAccion = '${tipoAccion}' 
            AND timestamp LIKE '${formattedDate}%'
            AND idCompra = ${idCompra}
        `;

        // Ejecutar la consulta
        const result = await db.getAllAsync(query);
        console.log("getTipoAccioncount", result);
        // Retornar el conteo
        return result.length > 0 ? result[0].total : 0;
    } catch (error) {
        console.error("Error al obtener el conteo de ubicaciones pendientes:", error);
    }
};


export const getTopRegsitro = async (db, idCompra) => {
    try {
        console.log("getTopRegsitro", idCompra);
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 5);  // Restar 5 horas para Ecuador
        // Convertir a formato YYYY-MM-DD
        const formattedDate = currentDate.toISOString().split('T')[0];
        const query = `
        SELECT tipoAccion
        FROM AccionesUbicaciones 
        where idCompra = ${idCompra}
        AND timestamp LIKE '${formattedDate}%'
        ORDER BY timestamp DESC
        LIMIT 1
      `;
        const tipoAccion = await db.getAllAsync(query);
        console.log("getTopRegsitro", tipoAccion);
        return tipoAccion;
    }
    catch (error) {
        console.error("Error al obtener el tipo de acción:", error);
    }
};
