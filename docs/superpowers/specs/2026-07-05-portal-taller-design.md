# Portal del Taller — Diseño aprobado (2026-07-05)

## Objetivo
Portal en `resueltoagency.com/taller` para que los compradores del taller en vivo
o del curso grabado accedan con una contraseña compartida que Manuel envía por
correo. Incluye transmisión en vivo (YouTube Live embebido, sin límite de
asistentes ni costo) y el curso en módulos.

## Decisiones (aprobadas por Manuel)
- **Acceso:** contraseña compartida única (env `TALLER_PASSWORD` en Vercel,
  cambiable por cohorte sin tocar código). Sin base de datos.
- **Registro:** formulario (nombre, correo, producto comprado) → webhook n8n
  (Railway) → Google Sheets + notificación. Manuel responde con la contraseña.
- **En vivo:** protegido con la misma contraseña.
- **Videos:** YouTube oculto (unlisted) embebido.

## Rutas
| Ruta | Contenido | Protegida |
|---|---|---|
| `/taller` | Puerta: form de contraseña + form de registro | No |
| `/taller/en-vivo` | YouTube Live + chat + countdown si no hay stream | Sí |
| `/taller/curso` | Módulos y lecciones en video | Sí |

## Autenticación
- POST `/api/taller/login` con la contraseña → si coincide con
  `TALLER_PASSWORD`, setea cookie httpOnly `taller_session` = SHA-256 de la
  contraseña, 30 días.
- `middleware.ts` protege `/taller/en-vivo` y `/taller/curso`: recalcula el
  hash y compara. Cambiar la contraseña invalida todas las cookies.
- Sin `TALLER_PASSWORD` configurada, el portal muestra "en configuración" y
  nadie entra.
- POST `/api/taller/logout` borra la cookie.

## Registro
- POST `/api/taller/registro` valida campos y reenvía JSON al webhook
  `TALLER_N8N_WEBHOOK`. Si no está configurado, responde con fallback a
  WhatsApp (wa.me/51932844074).

## Contenido editable
`lib/taller/content.ts`: título del taller, ID del stream en vivo, fecha/hora
del próximo en vivo, y módulos (título, descripción, lecciones con ID de
YouTube, duración, flag `disponible`).

## Diseño visual
Tokens existentes del sitio (`--bg #0D0C08`, `--cream #F4F0DE`, azul
`#1A80FF`, Inter). Navbar minimal + Footer existentes. Portal con
`noindex` (no debe aparecer en Google).

## Fuera de alcance (a propósito)
Pagos en la página, cuentas individuales, anti-compartir de contraseña.
Migración futura: Supabase auth individual reusando la infraestructura del ICS.
