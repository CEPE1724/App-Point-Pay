
 
//const API_BASE_URL = "http://192.168.2.167:3025/cobranza/api/v1/point/";


//const SOCKET_BASE_URL = "http://192.168.2.167:3025"; 
const API_BASE_URL = "https://appservices.com.ec/cobranza/api/v1/point/";
const SOCKET_BASE_URL = "https://appservices.com.ec";
export const APIURL = {
   
    senLogin: () => `${API_BASE_URL}login`,
    senLoginV1: () => `${API_BASE_URL}v1/login`,
    senLoginPin: () => `${API_BASE_URL}v1/loginPin`,
    postAllCountGestiones : () =>`${API_BASE_URL}all`,//
    getAllcliente : () =>`${API_BASE_URL}registro`,//
    getAllclienteInsert : () =>`${API_BASE_URL}registroindividual`,//
    getfullclienteInsert : () =>`${API_BASE_URL}registroindividual/full`,//
    socketEndpoint: () => `${SOCKET_BASE_URL}`,
    getAllVerificacionTerrena : () =>`${API_BASE_URL}ClientesVerificionTerrena/list`,//
    postUbicacionesAPPlocation : () =>`${API_BASE_URL}UbicacionesAPP/location`,
    getUbicacionesAPPidUser: (idUser) =>`${API_BASE_URL}UbicacionesAPP/idUser/${idUser}`,
    postInsertUbi : () =>`${API_BASE_URL}accUbi/insert`,
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
    postCob_AppCobrosEfectivo : () =>`${API_BASE_URL}AppSave/Cob_AppCobrosEfectivo`,
    postGestiondiaria: ()=> `${API_BASE_URL}GestionDiaria/list`,
    postGestiondiariaId: () => `${API_BASE_URL}GestionDiaria/allGestionId`, 
    getAllGestionDiaria : () =>`${API_BASE_URL}GestionDiaria/allGestion`,
    getViewLastGestiones: () => `${API_BASE_URL}AppSave/ViewGestionesDeCobranzas`,
    getViewTablaAmortizacion : () => `${API_BASE_URL}AppSave/TablaAmrtizacion`,
    getViewTablaAmortizacionValores : () => `${API_BASE_URL}AppSave/TablaValoresPendientes`,
    getViewListadoProductos : () => `${API_BASE_URL}Inventario/V1/Productos`,
    getViewListadoProductosDet : () => `${API_BASE_URL}Inventario/V1/Productos/Det`,
    getViewListComboProductos : () => `${API_BASE_URL}Inventario/V1/ListaCombos`,
    getViewListComboProductosDet : () => `${API_BASE_URL}Inventario/V1/ListaCombos/Det`,
    getViewListadoProductosId : () => `${API_BASE_URL}Inventario/ProductosId`,
    getViewListadoProductosBodega : () => `${API_BASE_URL}BodegaUsuario`,
    getValDispositivo : () => `${API_BASE_URL}DispositivosAPP/Val`,
    getValDispositivoImei : () => `${API_BASE_URL}DispositivosAPP/ValEmai`,
    getTelefono : () => `${API_BASE_URL}Cre_GCTelefono/all`,
    SaveTelefono : () => `${API_BASE_URL}Cre_GCTelefono/add`,
    listTablaPago: () => `${API_BASE_URL}Inventario/V1/ListaPagos`,
    validaComporbante : () => `${API_BASE_URL}Inventario/V1/ValidaComprobante`,
    validaComporbanteRecojo : () => `${API_BASE_URL}recojo/allComprobante`,
    seteoVerdion : () => `${API_BASE_URL}seteo/all`,
    getNotificaciones : () => `${API_BASE_URL}NotificationUser/allID`,
    getCountNotificaciones : () => `${API_BASE_URL}NotificationUser/count`,
    getReferencias : () => `${API_BASE_URL}referencia/V1/all`,

    getNotificacionesNoti : () => `${API_BASE_URL}NotificationUser/allID/notificacion`,
    getCountNotificacionesNoti : () => `${API_BASE_URL}NotificationUser/count/notificacion`,
    updatePushToken: () => `${API_BASE_URL}DispositivosAPP/UpdateTokenExpo`,


};
