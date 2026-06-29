/**
 * Dolphin Medical - Programa de Reconocimiento
 * Google Apps Script: Recibe datos del formulario, guarda en Google Sheets
 * y envía notificación por correo.
 */

var SHEET_ID = "1bnmtwXuffA1bDHoVCCZxWgcRP_LE_EIyST5NDlBdpk0";

var EMAIL_NOTIFICACION = [
  "conexioncentral@gmail.com",
  "estudionaranja@gmail.com",
  "Info@comercialymarcas.com"
];

// Columnas en orden correcto:
// A: Fecha registro (auto)
// B: Nombre completo
// C: Especialidad
// D: Direccion consultorio
// E: Dispositivo Elegido (reconocimiento)
// F: Insumo Necesita
// G: WhatsApp
// H: Email
// I: Horario preferido
// J: Fecha visita
// K: Fuente

var HEADERS = [
  "Fecha Registro", "Nombre", "Especialidad", "Direccion",
  "Dispositivo Elegido", "Insumo Necesita",
  "WhatsApp", "Email", "Horario", "Fecha Visita", "Fuente"
];

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

    // Si la hoja esta vacia, escribir encabezados
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    // ORDEN CORREGIDO: cada campo va a su columna correcta
    sheet.appendRow([
      new Date(),                  // A: Fecha Registro
      data.nombre || "",           // B: Nombre
      data.especialidad || "",     // C: Especialidad
      data.direccion || "",        // D: Direccion
      data.reconocimiento || "",   // E: Dispositivo Elegido
      data.necesidad || "",        // F: Insumo Necesita
      data.whatsapp || "",         // G: WhatsApp
      data.email || "",            // H: Email
      data.horario || "",          // I: Horario
      data.fecha || "",            // J: Fecha Visita
      "Programa Reconocimiento Dolphin Medical"  // K: Fuente
    ]);

    var notifOk = enviarNotificacion(data);
    return respuesta(200, JSON.stringify({status: "ok", sheets: true, email: notifOk}));
  } catch(err) {
    return respuesta(500, err.toString());
  }
}

function enviarNotificacion(data) {
  var ok = false;
  var asunto = "Nuevo registro - Reconocimiento Dolphin Medical";
  var cuerpo = "<h2>Nuevo medico registrado</h2><table>";
  cuerpo += "<tr><td><b>Nombre:</b></td><td>" + (data.nombre || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Especialidad:</b></td><td>" + (data.especialidad || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Direccion:</b></td><td>" + (data.direccion || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Reconocimiento:</b></td><td>" + (data.reconocimiento || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Fecha visita:</b></td><td>" + (data.fecha || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Horario:</b></td><td>" + (data.horario || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Insumo necesita:</b></td><td>" + (data.necesidad || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>WhatsApp:</b></td><td>" + (data.whatsapp || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Email:</b></td><td>" + (data.email || "--") + "</td></tr>";
  cuerpo += "</table>";
  cuerpo += "<p><small>Programa Reconocimiento Dolphin Medical Colombia</small></p>";

  for (var i = 0; i < EMAIL_NOTIFICACION.length; i++) {
    try {
      MailApp.sendEmail({
        to: EMAIL_NOTIFICACION[i],
        subject: asunto,
        htmlBody: cuerpo
      });
      ok = true;
    } catch(err) { ok = false; }
  }
  return ok;
}

function doGet() {
  return HtmlService.createHtmlOutput("<h1>Dolphin Medical</h1><p>POST endpoint activo.</p>");
}

function respuesta(codigo, data) {
  var content = (typeof data === 'string') ? data : JSON.stringify(data);
  return ContentService
    .createTextOutput(content)
    .setMimeType(ContentService.MimeType.JSON);
}
