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
        await db.execAsync('DELETE FROM Usuario');
        console.log("Registros eliminados correctamente.");
        try {
            await db.execAsync(`
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
                    Empresa
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
                    '${data.usuario.Empresa || ''}'
                );
            `);
            console.log("Usuario agregado correctamente.");
        } catch (error) {
            console.log("Error addItemAsyncUser", error);
        }
    }
}

