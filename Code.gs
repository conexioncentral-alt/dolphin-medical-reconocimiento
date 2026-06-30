/**
 * Dolphin Medical - Programa de Reconocimiento
 */

var SHEET_ID = "1bnmtwXuffA1bDHoVCCZxWgcRP_LE_EIyST5NDlBdpk0";
var EMAIL_NOTIFICACION = "conexioncentral@gmail.com";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha Registro","Nombre","Especialidad","Direccion","Dispositivo Elegido","Insumo Necesita","WhatsApp","Email","Horario","Fecha Visita","Fuente"]);
    }
    sheet.appendRow([new Date(), data.nombre||"", data.especialidad||"", data.direccion||"", data.reconocimiento||"", data.necesidad||"", "'"+data.whatsapp, "'"+data.email, data.horario||"", data.fecha||"", "Programa Reconocimiento Dolphin Medical"]);
    var notifOk = enviarNotificacion(data);
    return ContentService.createTextOutput(JSON.stringify({status:"ok", sheets:true, email:notifOk})).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(err.toString()).setMimeType(ContentService.MimeType.JSON);
  }
}

function enviarNotificacion(data) {
  var cuerpo = "<h2>Nuevo registro</h2><table>";
  cuerpo += "<tr><td>Nombre:</td><td>"+(data.nombre||"--")+"</td></tr>";
  cuerpo += "<tr><td>Especialidad:</td><td>"+(data.especialidad||"--")+"</td></tr>";
  cuerpo += "<tr><td>Direccion:</td><td>"+(data.direccion||"--")+"</td></tr>";
  cuerpo += "<tr><td>Reconocimiento:</td><td>"+(data.reconocimiento||"--")+"</td></tr>";
  cuerpo += "<tr><td>Fecha visita:</td><td>"+(data.fecha||"--")+"</td></tr>";
  cuerpo += "<tr><td>WhatsApp:</td><td>"+(data.whatsapp||"--")+"</td></tr>";
  cuerpo += "<tr><td>Email:</td><td>"+(data.email||"--")+"</td></tr>";
  cuerpo += "</table>";
  try {
    MailApp.sendEmail({to:EMAIL_NOTIFICACION, subject:"Nuevo registro - Reconocimiento Dolphin Medical", htmlBody:cuerpo});
    return true;
  } catch(e) {
    console.error("MailApp fallo:", e);
    return false;
  }
}

function autorizarMailApp() {
  var data = {nombre:"Dr. Prueba",especialidad:"Ginecologia",direccion:"Test",reconocimiento:"Pesario",fecha:"2026-07-15",horario:"10:00",necesidad:"Test",whatsapp:"+57 300 000 0000",email:"test@test.com"};
  MailApp.sendEmail({to:Session.getActiveUser().getEmail(), subject:"Test autorizacion MailApp", htmlBody:"<h1>MailApp autorizado</h1>"});
  Logger.log("MailApp autorizado correctamente");
}

function doGet() {
  return HtmlService.createHtmlOutput("<h1>Dolphin Medical</h1><p>POST endpoint activo.</p>");
}
