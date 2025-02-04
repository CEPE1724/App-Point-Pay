import axios from "axios";
import { screen } from "../../../../../utils/screenName";
import { APIURL } from "../../../../../config/apiconfig";
import { handleError } from '../../../../../utils/errorHandler';
import { getItemsAsyncUser, addItemAsyncACUbicCliente, getALLPendientes } from '../../../../../database';
import * as Location from 'expo-location';
// Función principal que maneja el proceso de guardado
export const HandleSave = async ({
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
  const urlGoogle = APIURL.putGoogle();
  let IdCbo_GestionesDeCobranzas = 0;

  try {
    // Guardar Gestiones de Cobranzas
    console.log("Guardando gestiones de cobranzas...", data);
    data.Tipo = Tipo;
    IdCbo_GestionesDeCobranzas = await saveGestionesDeCobranzas(data, token);
    console.log("Gestiones de cobranzas guardadas correctamente", summitDataTransfer);
    //if(IdCbo_GestionesDeCobranzas > 0){
    await InsertaddItemAsyncACUbic(data, db, selectedTipoPago, updateNotificationCount, latitude, longitude, summitDataTransfer, Offline);

    //}
    // Procesar recojo si es necesario
    if (selectedResultado === 60) {
      await processRecojo(
        IdCbo_GestionesDeCobranzas,
        submittedDataRecojo,
        item,
        userInfo,
        token
      );
    }

    let voucher = null;
    // Guardar en la segunda API si es necesario
    if (selectedResultado === 61 && selectedTipoPago === 2) {
      voucher = await saveDepositosPendientesAPP(
        summitDataTransfer,
        urlGoogle,
        item.idCompra,
        userInfo,
        item,
        token
      );
    }
    if (selectedResultado === 61 && selectedTipoPago === 1) {
      voucher = await saveAnticiposAPP(
        summitDataTransfer,
        urlGoogle,
        item.idCompra,
        userInfo,
        item,
        token
      );
    }

    let msg = "Datos guardados correctamente.";
    if (voucher) {
      msg += `\nNúmero de Comprobante:\n${voucher}`;
    }
    alert(msg); // Mensaje de éxito
    if (Tipo === 0) {
      navigation.reset({
        index: 0, // Esto hace que la pantalla de destino sea la primera en el stack
        routes: [{ name: screen.registro.tab, params: { screen: screen.registro.inicio, params: { refresh: true } } }],
      });
    } else {
      navigation.reset({
        index: 0, // Esto hace que la pantalla de destino sea la primera en el stack
        routes: [{ name: screen.gestionDiaria.tab, params: { screen: screen.gestionDiaria.inicio, params: { refresh: true } } }],
      });
    }

  } catch (error) {
    handleError(error, expireToken); // Usamos el manejador de errores global
  } finally {
    setLoading(false);
  }
};

// Función para subir imágenes
const uploadImages = async (images, urlGoogle, idCompra, userInfo, token) => {
  const uploadedImageUrls = [];
  for (const imagePath of images) {
    const formData = new FormData();
    formData.append("file", {
      uri: imagePath,
      name: `${Date.now()}.jpg`,
      type: "image/jpeg",
    });
    formData.append("cedula", idCompra);
    formData.append("nombre_del_archivo", `${Date.now()}.jpg`);
    formData.append("tipo", "VOUCHER");

    try {
      const responseGoogle = await axios.put(urlGoogle, formData, {
        headers: {
          "Authorization": `Bearer ${token}`, // Agregamos el token de autorización
          "Content-Type": "multipart/form-data", // Se establece el tipo adecuado para cargar archivos
        },
      });

      if (responseGoogle.status !== 200) {
        throw new Error(
          `Error en la subida de la imagen: ${responseGoogle.status} - ${responseGoogle.statusText}`
        );
      }

      const responseGoogleData = responseGoogle.data;
      if (responseGoogleData.status !== "success") {
        throw new Error(
          `Error en la respuesta de Google: ${responseGoogleData.message}`
        );
      }
      uploadedImageUrls.push(responseGoogleData.url);
    } catch (error) {
      console.error(`Error al subir la imagen ${imagePath}:`, error);
      continue;
    }
  }
  return uploadedImageUrls;
};

const InsertaddItemAsyncACUbic = async (data, db, selectedTipoPago, updateNotificationCount, latitude, longitude, summitDataTransfer, Offline) => {
  try {
    const currentDate = new Date();
    const timestamp = currentDate.toISOString().slice(0, 19).replace('T', ' ');  // Formato 'yyyy-mm-dd hh:mm:ss'

    console.log("bernabe ");
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
      data.Notas
    );
    console.log("Ubicación guardada correctamente");
    const pendingCount = await getALLPendientes(db);
    updateNotificationCount(pendingCount);
  } catch (error) {
    console.log("Error al insertar ubicación en la base de datos Bernabe:", error);
  }
};

// Función para guardar Gestiones de Cobranzas
const saveGestionesDeCobranzas = async (data, token) => {

  const url = APIURL.postCbo_GestionesDeCobranzas();
  try {
    const response = await axios.post(url, { ...data }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.result[0].IdCbo_GestionesDeCobranzas;
  } catch (error) {
    console.error("Error al guardar gestiones de cobranzas:", error);
    throw error; // Rethrow error after logging it
  }
};

// Función para procesar recojo
const processRecojo = async (
  IdCbo_GestionesDeCobranzas,
  submittedDataRecojo,
  item,
  userInfo,
  token
) => {
  for (const itemRe of submittedDataRecojo) {
    if (!itemRe.imagenes || itemRe.imagenes.length === 0) {
      console.warn(
        `No hay imágenes para subir para el idDetCompra: ${itemRe.idDetCompra}`
      );
      continue;
    }

    try {
      const uploadedImageUrls = await uploadRecojoImages(
        itemRe.imagenes,
        itemRe.idDetCompra,
        userInfo,
        token
      );
      const dataRecojo = {
        idCbo_GestionesDeCobranzas: IdCbo_GestionesDeCobranzas,
        idCompra: parseInt(item.idCompra, 10),
        idDetCompra: parseInt(itemRe.idDetCompra, 10),
        Nota: itemRe.observaciones,
        Imagenes: uploadedImageUrls,
      };
      const urlRecojo = APIURL.postRecojo();
      await axios.post(urlRecojo, dataRecojo, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error en processRecojo:", error);
    }
  }
};

// Función para subir imágenes de recojo
const uploadRecojoImages = async (images, idDetCompra, userInfo, token) => {
  const uploadedImageUrls = [];
  for (const imagePath of images) {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: imagePath,
        name: `${Date.now()}.jpg`,
        type: "image/jpeg",
      });
      formData.append("cedula", idDetCompra);
      formData.append("nombre_del_archivo", `${Date.now()}.jpg`);
      formData.append("tipo", "RECOJO");

      const responseGoogle = await axios.put(APIURL.putGoogle(), formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (responseGoogle.status !== 200) {
        throw new Error(
          `Error en la subida de la imagen: ${responseGoogle.status} - ${responseGoogle.statusText}`
        );
      }

      const responseGoogleData = responseGoogle.data;
      if (responseGoogleData.status !== "success") {
        throw new Error(
          `Error en la respuesta de Google: ${responseGoogleData.message}`
        );
      }

      uploadedImageUrls.push(responseGoogleData.url);
    } catch (error) {
      console.error(`Error subiendo la imagen ${imagePath}:`, error);
      continue;
    }
  }
  return uploadedImageUrls;
};

// Función para guardar en la segunda API
const saveDepositosPendientesAPP = async (
  summitDataTransfer,
  urlGoogle,
  idCompra,
  userInfo,
  item,
  token
) => {
  const dataTransfer = {
    ...summitDataTransfer,
    Fecha: new Date().toISOString(),
    IdCliente: 0,
    IdCompra: parseInt(idCompra, 10),
    Usuario: userInfo.Usuario,
    Url: await uploadImages(
      summitDataTransfer.images,
      urlGoogle,
      idCompra,
      userInfo,
      token
    ),
  };

  const urlTransfer = APIURL.postDepositosPendientesAPP();
  try {
    const responseTransfer = await axios.post(urlTransfer, dataTransfer, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const voucher = responseTransfer.data.result[0]?.Voucher;

    // Mensaje personalizado al guardar
    return voucher;
  } catch (transferError) {
    alert("Error al guardar los datos en la segunda API.");
    console.error("Error durante la llamada a la API:", transferError);
  }
};

const saveAnticiposAPP = async (
  summitDataTransfer,
  urlGoogle,
  idCompra,
  userInfo,
  item,
  token
) => {

  const dataTransfer = {
    idCompra: parseInt(idCompra, 10),
    idCobrador: parseInt(userInfo.ingresoCobrador, 10),
    Valor: parseFloat(summitDataTransfer.Abono),
    Voucher: summitDataTransfer.NumeroDeposito,
    Usuario: userInfo.Usuario,
    Imagen: await uploadImages(
      summitDataTransfer.images,
      urlGoogle,
      idCompra,
      userInfo,
      token
    ),
  };

  const urlTransfer = APIURL.postCob_AppCobrosEfectivo();

  try {
    const responseTransfer = await axios.post(urlTransfer, dataTransfer, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const voucher = responseTransfer.data.Voucher;

    if (voucher) {
      return voucher;
    } else {
      console.error("No se encontró el voucher en la respuesta");
    }
  } catch (transferError) {
    console.error("Error durante la llamada a la API:", transferError);
    alert("Error al guardar los datos en la segunda API...");
  }
};
