const menuStack = {
    tab: "MenuTab",
    inicio: "Inicio",
    cuenta: "Cuenta",
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

}

const terrenoStack = {
    tab: "TerrenoTab",
    inicio: "Terreno",
    insert: "TerrenoInsert",
    search: "TerrenoSearch",
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
export const screen = {
        drive: driveStack,
        home: homeStack,
        registro: registroStack,
        terreno: terrenoStack,
        gestionDiaria: gestionDiariaStack,
        menu: menuStack,
        menuVentas: menuVentasStack,

    };
//navigation.navigate(screen.drive.insert);   para viajar en las mismas pantallas o stack
    //navigation.navigate(screen.home.tab, { screen: screen.home.inicio }); para viajar entre diferenets menus de inicio a cuenta y asi 