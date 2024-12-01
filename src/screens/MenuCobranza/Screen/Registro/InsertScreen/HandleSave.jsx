import axios from "axios";
import { sendSlackMessage } from "../../../../../components";
import { screen } from "../../../../../utils/screenName";
import { APIURL } from "../../../../../config/apiconfig";
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
}) => {

  console.log("Entra a guardar");
  setLoading(true);
  const urlGoogle = APIURL.putGoogle();
  let IdCbo_GestionesDeCobranzas = 0;

  try {
    // Guardar Gestiones de Cobranzas
    IdCbo_GestionesDeCobranzas = await saveGestionesDeCobranzas(data);

    // Procesar recojo si es necesario
    if (selectedResultado === 60) {
        console.log("selectedResultado", selectedResultado);
      await processRecojo(
        IdCbo_GestionesDeCobranzas,
        submittedDataRecojo,
        item,
        userInfo
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
        item
      );
    }
    if (selectedResultado === 61 && selectedTipoPago === 1) {
        voucher = await saveAnticiposAPP(
          data.idCompra,
          data.Valor,
          userInfo.Usuario
        );
         
      }
    let msg = "Datos guardados correctamente.";
    if (voucher) {
        msg += `\nNúmero de Comprobante:\n${voucher}`;
      }
      alert(msg); // Mensaje de éxito
      navigation.navigate(screen.registro.tab, { screen: screen.registro.inicio, params: { refresh: true } , }); // Navegar a la pantalla de inicio

  } catch (error) {
    alert("Error al guardar los datos.");
    await logErrorToSlack(error, data, summitDataTransfer, userInfo);
  } finally {
    setLoading(false);
  }
};

// Función para subir imágenes
const uploadImages = async (images, urlGoogle, idCompra, userInfo) => {
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

    const responseGoogle = await fetch(urlGoogle, {
      method: "PUT",
      body: formData,
    });
    if (!responseGoogle.ok) {
      const errorResponse = await responseGoogle.json();
      await logErrorToSlack(
        new Error(
          `Error en la subida de la imagen: ${responseGoogle.status} - ${
            errorResponse.message || responseGoogle.statusText
          }`
        ),
        null,
        null,
        userInfo
      );
      throw new Error(
        `Error en la subida de la imagen: ${responseGoogle.status} - ${
          errorResponse.message || responseGoogle.statusText
        }`
      );
    }

    const responseGoogleData = await responseGoogle.json();
    if (responseGoogleData.status !== "success") {
      throw new Error(
        `Error en la respuesta de Google: ${responseGoogleData.message}`
      );
    }
    uploadedImageUrls.push(responseGoogleData.url);
  }
  return uploadedImageUrls;
};

// Función para guardar Gestiones de Cobranzas
const saveGestionesDeCobranzas = async (data) => {
    console.log("data", data);
  const url = APIURL.postCbo_GestionesDeCobranzas();
  const response = await axios.post(url, { ...data });
  return response.data.result[0].IdCbo_GestionesDeCobranzas;
};

// Función para procesar recojo
const processRecojo = async (
  IdCbo_GestionesDeCobranzas,
  submittedDataRecojo,
  item,
  userInfo
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
        userInfo
      );
      const dataRecojo = {
        idCbo_GestionesDeCobranzas: IdCbo_GestionesDeCobranzas,
        idCompra: parseInt(item.idCompra, 10),
        idDetCompra: parseInt(itemRe.idDetCompra, 10),
        Nota: itemRe.observaciones,
        Imagenes: uploadedImageUrls,
      };
      const urlRecojo = APIURL.postRecojo();
      await axios.post(urlRecojo, dataRecojo);
    } catch (error) {
      console.error("Error en processRecojo:", error);
      await logErrorToSlack(error, dataRecojo, null, userInfo);
    }
  }
};

// Función para subir imágenes de recojo
const uploadRecojoImages = async (images, idDetCompra, userInfo) => {
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

      const responseGoogle = await fetch(APIURL.putGoogle(), {
        method: "PUT",
        body: formData,
      });

      if (!responseGoogle.ok) {
        const errorResponse = await responseGoogle.json();
        await logErrorToSlack(
          new Error(
            `Error en la subida de la imagen: ${responseGoogle.status} - ${
              errorResponse.message || responseGoogle.statusText
            }`
          ),
          null,
          null,
          userInfo
        );
        throw new Error(
          `Error en la subida de la imagen: ${responseGoogle.status} - ${
            errorResponse.message || responseGoogle.statusText
          }`
        );
      }

      const responseGoogleData = await responseGoogle.json();
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
  item
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
      userInfo
    ),
  };

  const urlTransfer = APIURL.postDepositosPendientesAPP();
  try {
    const responseTransfer = await axios.post(urlTransfer, dataTransfer);
    const voucher = responseTransfer.data.result[0]?.Voucher;

    // Mensaje personalizado al guardar
    //alert("Datos guardados correctamente\nNúmero de Comprobante:\n " + voucher);
    return voucher;
  } catch (transferError) {
    alert("Error al guardar los datos en la segunda API.");
    await logErrorToSlack(transferError, dataTransfer, item, userInfo);
  }
};

const saveAnticiposAPP = async (
    idCompra,
    Abono,
    Usuario
  ) => {
    const dataAnticipo = {
        idCompra: idCompra,
        Abono: Abono,
        Usuario: Usuario
    };
  
    const urlTransfer = APIURL.postAnticiposAPP();
    try {
      const responseTransfer = await axios.post(urlTransfer, dataAnticipo);
      const voucher = responseTransfer.data.result[0]?.Numero;
  
      // Mensaje personalizado al guardar
      //alert("Datos guardados correctamente\nNúmero de Comprobante:\n " + voucher);
      return voucher;
    } catch (transferError) {
      alert("Error al guardar los datos en la segunda API.");
      await logErrorToSlack(transferError, dataTransfer, item, userInfo);
    }
  };
// Función para loguear errores en Slack
const logErrorToSlack = async (
  error,
  data,
  summitDataTransfer,
  userInfo,
  context = null
) => {
  await sendSlackMessage({
    userId: userInfo.ingresoCobrador,
    username: userInfo.Usuario,
    component: "handleGuardar",
    errorMessage: error.message,
    process: "Guardar Datos",
    context: context || { data, summitDataTransfer },
    stackTrace: "",
    severity: "ERROR",
  });
};
