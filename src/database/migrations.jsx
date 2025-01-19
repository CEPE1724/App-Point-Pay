export const migrateDbIfNeeded = async (db) => {
  try {
    // Obtener la versión actual de la base de datos
    const DataVersion = 1;  // Establecer la versión esperada de la base de datos
    const result = await db.getFirstAsync('PRAGMA user_version');
    let { user_version: currentDbVersion } = result;
    console.log("Versión actual de la base de datos:", currentDbVersion);
    console.log("Versión de la base de datos esperada:", DataVersion);
    
    // Si la base de datos está en una versión no válida o es la primera vez, inicia la migración
    if (currentDbVersion === undefined || currentDbVersion === 0) {
      //console.log("Iniciando migración para la versión 1...");

      // Cambiar el modo de la base de datos para Write-Ahead Logging (WAL)
      await db.execAsync('PRAGMA journal_mode = "wal";');

      // Crear la tabla 'dispositivosapp' si no existe
      //console.log("Creando tabla 'dispositivosapp'...");
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
          UsuarioActivo INTEGER NOT NULL DEFAULT 0
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

      console.log("Listado de tablas creadas.");

      // Actualizar la versión de la base de datos
      await db.execAsync('PRAGMA user_version = 1');
      //console.log("Versión de la base de datos actualizada a 1.");
    } else {
      console.log("La base de datos ya está en la versión esperada.");
    }
  } catch (error) {
    console.error("Error durante la migración de la base de datos:", error);
  }
};
