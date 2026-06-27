/**
 * Dolphin Medical - Programa de Reconocimiento
 * Google Apps Script: Recibe datos del formulario y los guarda en Google Sheets
 * Desplegar como: Web App -> Cualquier persona
 */

// CONFIG: Cambia este ID por el de tu hoja de calculo
// Puedes crearla en sheets.new y copiar el ID de la URL
var SHEET_ID = "TU_SHEET_ID_AQUI";

function doPost(e) {
  try {
    var data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      return respuesta(400, "No data received");
    }

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheets()[0];

    // Si la hoja esta vacia, agregar encabezados
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Reconocimiento",
        "Nombre Completo",
        "Especialidad",
        "Direccion Consultorio",
        "Fecha Visita",
        "Horario",
        "Necesidad (dispositivo dificil)",
        "WhatsApp",
        "Email",
        "Fuente"
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.reconocimiento || "",
      data.nombre || "",
      data.especialidad || "",
      data.direccion || "",
      data.fecha || "",
      data.horario || "",
      data.necesidad || "",
      data.whatsapp || "",
      data.email || "",
      "Programa Reconocimiento Dolphin Medical"
    ]);

    return respuesta(200, "OK");
  } catch(err) {
    return respuesta(500, err.toString());
  }
}

function doGet() {
  return HtmlService.createHtmlOutput(
    "<h1>Dolphin Medical - Programa de Reconocimiento</h1><p>Endpoint activo. Enviar POST con JSON.</p>"
  );
}

function respuesta(codigo, mensaje) {
  return ContentService
    .createTextOutput(JSON.stringify({status: codigo, message: mensaje}))
    .setMimeType(ContentService.MimeType.JSON);
}
