export const migrateDbIfNeeded = async (db) => {
  try {
    // Obtener la versión actual de la base de datos
    const DataVersion = 1;  // Establecer la versión esperada de la base de datos
    const result = await db.getFirstAsync('PRAGMA user_version');
    let { user_version: currentDbVersion } = result;

    // Si la base de datos está en una versión no válida o es la primera vez, inicia la migración
    if (currentDbVersion === undefined || currentDbVersion === 0) {


      // Cambiar el modo de la base de datos para Write-Ahead Logging (WAL)
      await db.execAsync('PRAGMA journal_mode = "wal";');

      // Crear la tabla 'dispositivosapp' si no existe
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS dispositivosapp (
          idDispositivosApp INTEGER PRIMARY KEY AUTOINCREMENT,
          idNomina INTEGER NOT NULL DEFAULT 0,
          Empresa INTEGER NOT NULL DEFAULT 0,
          Cedula TEXT NOT NULL DEFAULT '',
          KeyDispositivo TEXT NOT NULL DEFAULT '',
          iTipoPersonal INTEGER NOT NULL DEFAULT 0,
          Alias TEXT NOT NULL DEFAULT '',
          kEYdATA TEXT NOT NULL DEFAULT ''
        );
      `);

      // Crear la tabla 'Usuario' si no existe
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Usuario (
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
          Empresa TEXT NOT NULL DEFAULT '',
          Com_CargosDeVentas TEXT NOT NULL DEFAULT '',
          Com_Rango TEXT NOT NULL DEFAULT '',
          NombreApellido TEXT NOT NULL DEFAULT '',
          UsuarioActivo INTEGER NOT NULL DEFAULT 0,
          Clave TEXT NOT NULL DEFAULT ''
        );
      `);

      // Crear la tabla 'Bodegas' si no existe (corregido)
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Bodegas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          Nombre TEXT DEFAULT 0,
          idBodega INTEGER DEFAULT 0,
          Bodega INTEGER DEFAULT 0,
          Codigo TEXT DEFAULT '',
          Activo bit DEFAULT 0,
          Factura bit DEFAULT 0,
          Almacen bit DEFAULT 0,
          Inventario bit DEFAULT 0
        );
      `);

      // Crear la tabla 'PermisosMenu' si no existe
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS PermisosMenu (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          Menu INTEGER NOT NULL DEFAULT 0
        );
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS UbicacionesAPP (
          idUbicacionesAPP INTEGER PRIMARY KEY AUTOINCREMENT,
          ICidIngresoCobrador INTEGER DEFAULT 0,
          latitude FLOAT NOT NULL DEFAULT 0,
          longitude FLOAT NOT NULL DEFAULT 0,
          timestamp timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          Empresa INTEGER DEFAULT 0,
          ICCodigo TEXT DEFAULT '',
          Nombre TEXT DEFAULT '',
          iTipoPersonal INTEGER DEFAULT 0,
          idUsuario INTEGER DEFAULT 0,
          enviado INTEGER DEFAULT 0
        );
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS DashboardMetrics (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           ICidIngresoCobrador INTEGER NOT NULL,
           totalAmount FLOAT DEFAULT 0,  
           numberOfClients INTEGER DEFAULT 0,  
           totalProjected FLOAT DEFAULT 0, 
           percentageCollected FLOAT DEFAULT 0  );
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS AccionesUbicaciones (
        idAccion INTEGER PRIMARY KEY AUTOINCREMENT,  
        tipoAccion TEXT NOT NULL,                    
        latitude FLOAT NOT NULL,                     
        longitude FLOAT NOT NULL,                     
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, 
        enviado INTEGER DEFAULT 0 ,
        ICidIngresoCobrador INTEGER DEFAULT 0,
        Empresa INTEGER DEFAULT 0                    
);
`);
      await db.execAsync(`
  CREATE TABLE IF NOT EXISTS EstadoGestion (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  idEstadoGestion INTEGER NOT NULL,
  Estado TEXT NOT NULL
);

`);

      await db.execAsync(`
  CREATE TABLE IF NOT EXISTS EstadoTipoContacto (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    idCbo_EstadosTipocontacto INTEGER NOT NULL,
    idCbo_EstadoGestion INTEGER NOT NULL,
    Estado TEXT NOT NULL
);
`);

      await db.execAsync(`
  CREATE TABLE IF NOT EXISTS ResultadoGestion (
   id INTEGER PRIMARY KEY AUTOINCREMENT, 
    idCbo_ResultadoGestion INTEGER NOT NULL,
    idCbo_EstadoGestion INTEGER NOT NULL,
    Resultado TEXT NOT NULL,
    idCbo_EstadosTipocontacto INTEGER NOT NULL
);
`);
      await db.execAsync(`
  CREATE TABLE IF NOT EXISTS listacuentas (
   id INTEGER PRIMARY KEY AUTOINCREMENT, 
    idCuenta INTEGER NOT NULL,
    Descripcion TEXT NOT NULL
);
`);

      // Actualizar la versión de la base de datos
      await db.execAsync('PRAGMA user_version = 1');

    }

    if (currentDbVersion === 1) {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS Cbo_GestorDeCobranzas (
          idCobranza INTEGER PRIMARY KEY AUTOINCREMENT,
          idCbo_GestorDeCobranzas INTEGER DEFAULT 0,
          idcobrador INTEGER DEFAULT 0,
          notcobrador INTEGER DEFAULT 0,
          Valor_Cobrar_Proyectado FLOAT DEFAULT 0,
          Valor_Cobrado FLOAT DEFAULT 0,
          Numero_Documento TEXT DEFAULT '',
          Cedula TEXT DEFAULT '',
          Cliente TEXT DEFAULT '',
          idCompra INTEGER DEFAULT 0,
          idCliente INTEGER DEFAULT 0,
          Dias_Mora_Proyectado INTEGER DEFAULT 0,
          Banco TEXT DEFAULT '',
          Direccion TEXT DEFAULT '',
          Barrio TEXT DEFAULT '',
          Telefono TEXT DEFAULT '',
          Celular TEXT DEFAULT '',
          Fecha_Factura DATETIME DEFAULT CURRENT_TIMESTAMP,
          enviado INTEGER DEFAULT 0
        );
      `);


      await db.execAsync(`
        ALTER TABLE AccionesUbicaciones ADD COLUMN idCompra INTEGER DEFAULT 0
      `);
      await db.execAsync(`
        ALTER TABLE AccionesUbicaciones ADD COLUMN idCombo1 INTEGER DEFAULT 0
      `);
      await db.execAsync(`
        ALTER TABLE AccionesUbicaciones ADD COLUMN idCombo2 INTEGER DEFAULT 0
      `);
      await db.execAsync(`
        ALTER TABLE AccionesUbicaciones ADD COLUMN idCombo3 INTEGER DEFAULT 0
      `);
      await db.execAsync(`
        ALTER TABLE AccionesUbicaciones ADD COLUMN TipoPago INTEGER DEFAULT 0
      `);
      await db.execAsync('PRAGMA user_version = 2');
    }

    if (currentDbVersion === 2) {
      await db.execAsync(`
          ALTER TABLE AccionesUbicaciones ADD COLUMN Notas TEXT DEFAULT ''
        `);

      await db.execAsync(`
          ALTER TABLE AccionesUbicaciones ADD COLUMN Offline INTEGER DEFAULT 0
        `);

      await db.execAsync(`
          ALTER TABLE AccionesUbicaciones ADD COLUMN Valor FLOAT DEFAULT 0
        `);

      await db.execAsync(`
          ALTER TABLE AccionesUbicaciones ADD COLUMN FechaPago DATETIME DEFAULT '2000-01-01 00:00:00'
        `);

      await db.execAsync(`
          ALTER TABLE AccionesUbicaciones ADD COLUMN IdBanco INTEGER DEFAULT 0
        `);

      await db.execAsync(`
          ALTER TABLE AccionesUbicaciones ADD COLUMN NumeroDeposito TEXT DEFAULT ''
        `);

      await db.execAsync(`
          ALTER TABLE AccionesUbicaciones ADD COLUMN Url TEXT DEFAULT ''
        `);

      await db.execAsync('PRAGMA user_version = 3');
    }

    if (currentDbVersion === 3) {
      await db.execAsync(`
            ALTER TABLE Cbo_GestorDeCobranzas ADD COLUMN Laboral TEXT DEFAULT ''
          `);

      await db.execAsync('PRAGMA user_version = 4');
    }

    if (currentDbVersion === 4) {
      await db.execAsync(`
            ALTER TABLE Cbo_GestorDeCobranzas ADD latitudEquifax FLOAT DEFAULT 0 
          `);

      await db.execAsync(`
            ALTER TABLE Cbo_GestorDeCobranzas ADD longitudEquifax FLOAT DEFAULT 0 
          `);

      await db.execAsync('PRAGMA user_version = 5');
    }

    if (currentDbVersion === 5) {

      await db.execAsync(`
            ALTER TABLE dispositivosapp ADD TokenPush TEXT DEFAULT ''
          `);

      // Update the database version
      await db.execAsync('PRAGMA user_version = 6');
    }

  } catch (error) {
    console.error("Error durante la migración de la base de datos:", error);
  }
};
