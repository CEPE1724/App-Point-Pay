import axios from "axios";
import { screen } from "../../../../../utils/screenName";
import { APIURL } from "../../../../../config/apiconfig";
import { handleError } from '../../../../../utils/errorHandler';
import { getItemsAsyncUser, addItemAsyncACUbicCliente,getALLPendientes  } from '../../../../../database';
import * as Location from 'expo-location';
// Función principal que maneja el proceso de guardado
export const HandleSaveNotConnect = async ({
  data,
  summitDataTransfer,
  selectedResultado,
  selectedTipoPago,
  item,
  navigation,
  userInfo,
  submittedDataRecojo,
  setLoading,
  token,
  expireToken,
  Tipo,
  db,
  updateNotificationCount,
  latitude,
  longitude,
  Offline
}) => {
  console.log("Guardando datos...", summitDataTransfer);

  setLoading(true);

  try {
    // Guardar Gestiones de Cobranzas

    data.Tipo = Tipo;
    //IdCbo_GestionesDeCobranzas = await saveGestionesDeCobranzas(data, token);

    //if(IdCbo_GestionesDeCobranzas > 0){
    await InsertaddItemAsyncACUbic(data, db, selectedTipoPago,updateNotificationCount, latitude, longitude, summitDataTransfer, Offline);
    navigation.reset({
        index: 0, // Esto hace que la pantalla de destino sea la primera en el stack
        routes: [{ name: screen.registro.tab, params: { screen: screen.registro.inicio, params: { refresh: true } } }],
      });

  } catch (error) {
    handleError(error, expireToken); // Usamos el manejador de errores global
  } finally {
    setLoading(false);
  }
};



const InsertaddItemAsyncACUbic = async (data, db, selectedTipoPago, updateNotificationCount, latitude, longitude, summitDataTransfer, Offline) => {
  try {
    const currentDate = new Date();
    const timestamp = currentDate.toISOString().slice(0, 19).replace('T', ' ');  // Formato 'yyyy-mm-dd hh:mm:ss'

    const Item = await getItemsAsyncUser(db);
    if (!Item || !Item[0]?.ICidIngresoCobrador || !Item[0]?.Empresa) {

      return;
    }

    await addItemAsyncACUbicCliente(
      db, "GESTIÓN CLIENTE",
      latitude,
      longitude,
      Item[0]?.ICidIngresoCobrador,
      Item[0]?.Empresa,
      data.idCompra,
      data.idCbo_EstadoGestion,
      data.idCbo_EstadosTipocontacto,
      data.idCbo_ResultadoGestion,
      selectedTipoPago || 0,
      data.FechaPago || '2000-01-01 00:00:00',
      data.Valor,
      summitDataTransfer.IdBanco || 0,
      summitDataTransfer.NumeroDeposito || '',
      summitDataTransfer.images || '',
      Offline,
      timestamp,
        data.Notas || ''
    );
    console.log("Ubicación guardada correctamente");
    const pendingCount = await getALLPendientes(db);
    updateNotificationCount(pendingCount);
  } catch (error) {
    console.log("Error al insertar ubicación en la base de datos Bernabe:", error);
  }
};

