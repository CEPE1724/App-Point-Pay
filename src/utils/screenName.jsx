const menuStack = {
    tab: "MenuTab",
    inicio: "Inicio",
    cuenta: "Cuenta",
    notificaciones: "Notificaciones",
}


const driveStack = {
    tab: "DriveTab",
    inicio: "Inicio",
    insert: "DriveInsert",
} 

const homeStack = {
    tab: "HomeTab",
    inicio: "Inicio",
    sesion: "Login",
}
 
const registroStack = {
    tab: "RegistroTab",
    inicio: "Registros",
    insert: "RegistroInsert",
    insertCall: "RegistroInsertCall",
    product: "Productos",
    viewGestiones: "ViewGestiones",
    TablaAmortizacion: "TablaAmortizacion",
    viewReferencias: "ViewReferencias",
    GpsEquifax : "GpsEquifax",

}

const terrenoStack = {
    tab: "TerrenoTab",
    inicio: "Terreno",
    insert: "TerrenoInsert",
    search: "TerrenoSearch",
    maps : "GoogleMaps",
}

const gestionDiariaStack = {
    tab: "GestionDiariaTab",
    inicio: "GestionDiaria",
    diaria: "Diaria",
}

const menuVentasStack = {
    tab: "MenuVentasTab",
    inicio: "MenuVentas",
    combos: "Combos",
    detallecombos : "DetalleCombos",
    salir: "Salir",
}

const menuCreditoStack = {
    tab: "MenuCreditoTab",
    inicio: "MenuCredito",
    salir: "Salir",
}
export const screen = {
        drive: driveStack,
        home: homeStack,
        registro: registroStack,
        terreno: terrenoStack,
        gestionDiaria: gestionDiariaStack,
        menu: menuStack,
        menuVentas: menuVentasStack,
        menuCredito: menuCreditoStack,

    };
//navigation.navigate(screen.drive.insert);   para viajar en las mismas pantallas o stack
    //navigation.navigate(screen.home.tab, { screen: screen.home.inicio }); para viajar entre diferenets menus de inicio a cuenta y asi 