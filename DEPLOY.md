# Landing Reconocimiento Dolphin Medical

## URLs activas

| Propósito | URL | Estado |
|---|---|---|
| GH Pages (sitio standalone) | https://conexioncentral-alt.github.io/dolphin-medical-reconocimiento/ | ✅ Activo |
| WP iframe (producción) | https://dolphinmedical.com/colombia/reconocimiento/ | ✅ Activo |
| Google Sheet (datos) | https://docs.google.com/spreadsheets/d/1bnmtwXuffA1bDHoVCCZxWgcRP_LE_EIyST5NDlBdpk0/edit | ✅ Activo |
| Apps Script (POST endpoint) | Script ID en Code.gs | ⚠️ Verificar despliegue |

## Estructura del proyecto

```
landing-reconocimiento/
├── index.html                    ← Sitio standalone (GH Pages)
├── wordpress-gutenberg-block.html ← Fragmento para WP (Custom HTML block)
├── Code.gs                       ← Google Apps Script (Sheet + notificaciones)
├── gracias.html                  ← Página post-envío (GH Pages)
├── politica-datos.html           ← Política de tratamiento de datos
├── DEPLOY.md                     ← Este archivo
├── images/                       ← 6 fotos de productos
│   ├── Pesario-Ring-5.jpg
│   ├── Pesario-Ring-6.jpg
│   ├── Pesario-Gellhorn-Vastago-Corto-5.jpg
│   ├── Balanza-Monitor-Grasa-Latidos.jpg
│   ├── Linterna-Contacto-LED-GMD.jpg
│   └── Pulsioximetro-Curva-Latidos-Pro.jpg
└── .git/                         ← Remote: conexioncentral-alt/dolphin-medical-reconocimiento
```

## Cómo desplegar

### GH Pages (automático)
El repo en GitHub `conexioncentral-alt/dolphin-medical-reconocimiento` está conectado a GH Pages.
Cualquier push a `main` despliega automáticamente en:
https://conexioncentral-alt.github.io/dolphin-medical-reconocimiento/

### WordPress (Custom HTML block)
1. Ir a la página `/colombia/reconocimiento/` en WP Admin
2. Editar con Gutenberg
3. Agregar bloque **Custom HTML**
4. Pegar TODO el contenido de `wordpress-gutenberg-block.html`
5. **NO** incluir `<html>`, `<head>`, `<body>` — solo la sección de contenido + estilos + scripts
6. Actualizar

### Google Apps Script
1. Ir a https://script.google.com/
2. Crear nuevo proyecto o usar el existente
3. Pegar `Code.gs`
4. Desplegar → Nuevo despliegue → Web app
   - Ejecutar como: `yo`
   - Acceso: `Cualquier persona`
5. Copiar la URL desplegada y actualizarla en `index.html` y `wordpress-gutenberg-block.html`

## Bugs conocidos (corregidos)

| Bug | Estado | Detalle |
|---|---|---|
| XHR sin .send() | ✅ Corregido | index.html no enviaba datos al Sheet (faltaba .send()) |
| Column mapping erróneo | ✅ Corregido | Code.gs intercambiaba nombre/reconocimiento en las columnas |
| URLs inconsistentes | ✅ Corregido | index.html y WP block ahora apuntan al mismo Apps Script |
| Rutas relativas en WP | ✅ Corregido | images/ y politica-datos.html ahora usan URLs absolutas GH Pages |

## Datos del formulario (columnas en el Sheet)

| Columna | Campo | Origen |
|---|---|---|
| A | Fecha Registro | Auto (new Date()) |
| B | Nombre | form.nombre |
| C | Especialidad | form.especialidad |
| D | Direccion | form.direccion |
| E | Dispositivo Elegido | form.reconocimiento (radio) |
| F | Insumo Necesita | form.necesidad |
| G | WhatsApp | form.whatsapp |
| H | Email | form.email |
| I | Horario | form.horario |
| J | Fecha Visita | form.fecha |
| K | Fuente | "Programa Reconocimiento Dolphin Medical" |

## Colores de marca

- Primario: #28337a (navy oscuro)
- Acento: #1A90D6 / #008DD2 (azul dolphin)
- Highlight: #4dc3ff
- Fondos suaves: #eef3f8, #e0edf5 / #E8F4FD

## Notificaciones

Los registros se notifican por correo a:
- conexioncentral@gmail.com
- estudionaranja@gmail.com
- Info@comercialymarcas.com

## Git

```bash
git remote -v
# origin  https://github.com/conexioncentral-alt/dolphin-medical-reconocimiento.git

git push origin main  # despliega automáticamente a GH Pages
```
