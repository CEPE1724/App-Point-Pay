/*CREATE TABLE IF NOT EXISTS Usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL DEFAULT '',
    idUsuario INTEGER NOT NULL DEFAULT 0,
    Nombre TEXT NOT NULL DEFAULT '',
    idGrupo INTEGER NOT NULL DEFAULT 0,
    Activo bit NOT NULL DEFAULT 0,
    iTipoPersonal INTEGER NOT NULL DEFAULT 0,
    ICnombre TEXT NOT NULL DEFAULT '',
    ICcedula TEXT NOT NULL DEFAULT '',
    ICidIngresoCobrador INTEGER NOT NULL DEFAULT 0,
    ICCodigo TEXT NOT NULL DEFAULT '',
    Com_CargosDeVentas TEXT NOT NULL DEFAULT '',
    Com_Rango TEXT NOT NULL DEFAULT '',
    NombreApellido TEXT NOT NULL DEFAULT ''
  );*/
export const addItemAsyncUser = async (db, data, isConnected) => {

    if (isConnected) {
        await db.runAsync('DELETE FROM Usuario');
        try {
            await db.runAsync(`
                INSERT INTO Usuario (
                    token,
                    idUsuario,
                    Nombre,
                    idGrupo,
                    Activo,
                    iTipoPersonal,
                    ICnombre,
                    ICcedula,
                    ICidIngresoCobrador,
                    ICCodigo,
                    Com_CargosDeVentas,
                    Com_Rango,
                    NombreApellido,
                    Empresa,
                    Clave
                ) VALUES (
                    '${data.token}',
                    ${data.usuario.idUsuario},
                    '${data.usuario.Nombre}',
                    ${data.usuario.idGrupo},
                    ${data.usuario.Activo},
                    ${data.usuario.iTipoPersonal},
                    '${data.usuario.ingresoCobrador.nombre}',
                    '${data.usuario.ingresoCobrador.cedula}',
                    ${data.usuario.ingresoCobrador.idIngresoCobrador},
                    '${data.usuario.ingresoCobrador.Codigo}',
                    '${data.usuario.cargosDeVentas || ''}',
                    '${data.usuario.Com_Rango || ''}',
                    '${data.usuario.NombreApellido || ''}',
                    '${data.usuario.Empresa || ''}',
                    '${data.usuario.Clave || ''}'
                );
            `);
        } catch (error) {
            console.log("Error addItemAsyncUser", error);
        }
    }
}

export const getItemsAsyncUser = async (db) => {
    const query = 'SELECT * FROM Usuario';
    const items = await db.getAllAsync(query);
    return items;
};

export const getdispositivosappNot = async (db) => {
    const query = 'SELECT * FROM DispositivosAPP';
    const items = await db.getAllAsync(query);
    return items;
}

export const UpdateItemAsyncUSer = async (db, token) => {
    try {
        
        await db.runAsync(`
                UPDATE Usuario
                SET
                    token = '${token}'
            `);

    } catch (error) {
        console.log("Error UpdateItemAsyncUSer", error);
    }
}

export const UpdateActivoItemAsyncUSer = async (db, UsuarioActivo) => {
    try {
        
        await db.runAsync(`
                UPDATE Usuario
                SET
                    UsuarioActivo = ${UsuarioActivo}
            `);
    } catch (error) {
        console.log("Error UpdateItemAsyncUSer", error);
    }
}