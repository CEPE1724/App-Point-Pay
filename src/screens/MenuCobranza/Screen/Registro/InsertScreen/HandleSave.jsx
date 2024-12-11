import axios from "axios";
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



  setLoading(true);
  const urlGoogle = APIURL.putGoogle();
  let IdCbo_GestionesDeCobranzas = 0;

  try {
    // Guardar Gestiones de Cobranzas
    IdCbo_GestionesDeCobranzas = await saveGestionesDeCobranzas(data);

    // Procesar recojo si es necesario
    if (selectedResultado === 60) {
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
        summitDataTransfer,
        urlGoogle,
        item.idCompra,
        userInfo,
        item
      );

    }
    let msg = "Datos guardados correctamente.";
    if (voucher) {
      msg += `\nNúmero de Comprobante:\n${voucher}`;
    }
    alert(msg); // Mensaje de éxito
    navigation.navigate(screen.registro.tab, { screen: screen.registro.inicio, params: { refresh: true }, }); // Navegar a la pantalla de inicio

  } catch (error) {
    alert("Error al guardar los datos.");
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

      throw new Error(
        `Error en la subida de la imagen: ${responseGoogle.status} - ${errorResponse.message || responseGoogle.statusText
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
        throw new Error(
          `Error en la subida de la imagen: ${responseGoogle.status} - ${errorResponse.message || responseGoogle.statusText
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
  }
};

const saveAnticiposAPP = async (
  summitDataTransfer,
  urlGoogle,
  idCompra,
  userInfo,
  item
) => {


  const dataTransfer = {
    idCompra: parseInt(idCompra, 10),
    idCobrador: parseInt(userInfo.ingresoCobrador, 10),
    Valor: parseFloat(summitDataTransfer.Abono),
    Voucher : summitDataTransfer.NumeroDeposito,
    Usuario: userInfo.Usuario,
    Imagen: await uploadImages(
      summitDataTransfer.images,
      urlGoogle,
      idCompra,
      userInfo
    ),
  };


  const urlTransfer = APIURL.postCob_AppCobrosEfectivo();
  
  try {
    const responseTransfer = await axios.post(urlTransfer, dataTransfer);
    
    // Acceder correctamente al voucher en la respuesta
    const voucher = responseTransfer.data.Voucher;  // Acceso correcto a Voucher


    if (voucher) {
      // Si el voucher es válido, lo retornas
      return voucher;
    } else {
      console.error("No se encontró el voucher en la respuesta");
    }
  } catch (transferError) {
    console.error("Error durante la llamada a la API:", transferError);  // Log del error
    alert("Error al guardar los datos en la segunda API...");
  }
};



// Función para loguear errores en Slack
