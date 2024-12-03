
 
const API_BASE_URL = "http://179.49.21.45:3025/cobranza/api/v1/point/";
const SOCKET_BASE_URL = "http://179.49.21.45:3025"; 

export const APIURL = {
   
    senLogin: () => `${API_BASE_URL}login`,
    postAllCountGestiones : () =>`${API_BASE_URL}all`,
    getAllcliente : () =>`${API_BASE_URL}registro`,
    getAllclienteInsert : () =>`${API_BASE_URL}registroindividual`,
    socketEndpoint: () => `${SOCKET_BASE_URL}`,
    getAllVerificacionTerrena : () =>`${API_BASE_URL}ClientesVerificionTerrena/list`,
    postUbicacionesAPPlocation : () =>`${API_BASE_URL}UbicacionesAPP/location`,
    getUbicacionesAPPidUser: (idUser) =>`${API_BASE_URL}UbicacionesAPP/idUser/${idUser}`,
    /* API DE VERIFICACION TERRENA */
    getClientesVerificionTerrenacountEstado : () =>`${API_BASE_URL}ClientesVerificionTerrena/countEstado`,
    postTerrenaGestionDomicilioSave : () =>`${API_BASE_URL}TerrenaGestionDomicilio/save`,
    postTerrenaGestionTrabajoSave : () =>`${API_BASE_URL}TerrenaGestionTrabajo/save`,
    /*api buscar por id */
    getClientesVerificionTerrenaid : (idTerrenaGestionTrabajo) =>`${API_BASE_URL}TerrenaGestionTrabajo/getAll/${idTerrenaGestionTrabajo}`,
    getClientesVerificacionDomicilioid : (idTerrenaGestionDomicilio) =>`${API_BASE_URL}TerrenaGestionDomicilio/getAll/${idTerrenaGestionDomicilio}`,
    /*api google*/
    putGoogle : () =>`${API_BASE_URL}googleApi/google`,
    /* api busca productos*/
    getProducto : () =>`${API_BASE_URL}SolicitudNCListaProductos/all`,
    Cbo_EstadosGestion : () =>`${API_BASE_URL}Cbo_EstadosGestion/list`,
    getEstadosTipoContacto: (selectedOption) => `${API_BASE_URL}Cbo_EstadosTipocontacto/list?idCbo_EstadoGestion=${selectedOption}`,
    getResultadoGestion: (selectTipoContacto) => `${API_BASE_URL}Cbo_ResultadoGestion/list?idCbo_EstadoGestion=${selectTipoContacto}`,
    postCbo_GestionesDeCobranzas : () =>`${API_BASE_URL}AppSave/insert`,
    postDepositosPendientesAPP : () =>`${API_BASE_URL}AppSave/Deposito`,
    /*api bancos*/
    getBancos : () =>`${API_BASE_URL}SolicitudNCListaProductos/bancos`,
    postSlack: () => `https://hooks.slack.com/services/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`,
    postRecojo: () => `${API_BASE_URL}AppSave/Recojo`,
    postAnticiposAPP: () => `${API_BASE_URL}AppSave/Anticipos`,
    postGestiondiaria: ()=> `${API_BASE_URL}GestionDiaria/list`,
    postGestiondiariaId: () => `${API_BASE_URL}GestionDiaria/allGestionId`, 
    getAllGestionDiaria : () =>`${API_BASE_URL}GestionDiaria/allGestion`,
    getViewLastGestiones: () => `${API_BASE_URL}AppSave/ViewGestionesDeCobranzas`,
    getViewTablaAmortizacion : () => `${API_BASE_URL}AppSave/TablaAmrtizacion`,
    getViewTablaAmortizacionValores : () => `${API_BASE_URL}AppSave/TablaValoresPendientes`,
    getViewListadoProductos : () => `${API_BASE_URL}Inventario/Productos`,
    getViewListadoProductosId : () => `${API_BASE_URL}Inventario/ProductosId`,
    getViewListadoProductosBodega : () => `${API_BASE_URL}BodegaUsuario`,
};
