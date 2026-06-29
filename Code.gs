/**
 * Dolphin Medical - Programa de Reconocimiento
 * Google Apps Script: Recibe datos del formulario, guarda en Google Sheets
 * y envía notificación por correo.
 */

var SHEET_ID = "1bnmtwXuffA1bDHoVCCZxWgcRP_LE_EIyST5NDlBdpk0";

var EMAIL_NOTIFICACION = [
  "Info@comercialymarcas.com",
  "conexioncentral@gmail.com"
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

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha", "Nombre", "Especialidad", "Direccion",
        "Dispositivo Elegido", "Insumo Necesita",
        "WhatsApp", "Email", "Horario", "Fuente"
      ]);
    }

    sheet.appendRow([
      new Date(), data.reconocimiento || "", data.nombre || "",
      data.especialidad || "", data.direccion || "",
      data.fecha || "", data.horario || "",
      data.necesidad || "", data.whatsapp || "",
      data.email || "", "Programa Reconocimiento Dolphin Medical"
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
  cuerpo += "<tr><td><b>Reconocimiento:</b></td><td>" + (data.reconocimiento || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Nombre:</b></td><td>" + (data.nombre || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Especialidad:</b></td><td>" + (data.especialidad || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Direccion:</b></td><td>" + (data.direccion || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Fecha visita:</b></td><td>" + (data.fecha || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Horario:</b></td><td>" + (data.horario || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Insumo necesita:</b></td><td>" + (data.necesidad || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>WhatsApp:</b></td><td>" + (data.whatsapp || "--") + "</td></tr>";
  cuerpo += "<tr><td><b>Email:</b></td><td>" + (data.email || "--") + "</td></tr>";
  cuerpo += "</table>";

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
