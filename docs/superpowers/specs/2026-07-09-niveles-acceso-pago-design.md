# Niveles de acceso + bandeja de pago + revisión quincenal (diseño aprobado)

Aprobado por Manuel el 2026-07-09 (incluye mejoras A-D: links mágicos,
Acceso total como producto, embudo medible, Bubu vendedor).

## 1. Niveles de acceso por contraseña (sin Supabase)

### Modelo
- **Niveles (scopes)**: `todo` (maestro), `vivo` (en vivo), `grabado`
  (cursos + recursos normales de la bóveda), y uno por recurso premium
  (su slug, ej. `pack-prompts-cinematograficos`).
- **Contraseñas**: env `TALLER_PASSWORDS` en Vercel — JSON
  `{"todo":"...","vivo":"...","grabado":"...","<slug premium>":"..."}`.
  Compatibilidad: si falta, `TALLER_PASSWORD` actúa como `todo`
  (los alumnos actuales no pierden nada; deploy seguro sin tocar envs).
- **Cookie** `taller_niveles`: lista `nivel:token|nivel:token` donde
  token = SHA-256(`nivel|contraseña vigente`). Cambiar una contraseña en
  Vercel invalida SOLO los tokens de ese nivel. La cookie legada
  `taller_session` sigue valiendo como `todo`.
- **Acumulable**: cada login agrega un nivel a la cookie (alguien puede
  tener `vivo` + un premium).

### API
- `POST /api/taller/login` (existente, se extiende): compara la
  contraseña contra TODOS los niveles configurados (timing-safe, rate
  limit y delay actuales se conservan) y agrega el nivel a la cookie.
  Respuesta incluye `nivel`.
- `GET /api/taller/desbloquear?nivel=X&t=<token>` (**link mágico**):
  valida el token contra la contraseña vigente del nivel, agrega el
  nivel a la cookie y redirige al destino del nivel (premium → su
  recurso, vivo → /taller/en-vivo, grabado/todo → /taller/curso).
  El link lleva el token, nunca la contraseña; rotar la contraseña
  mata los links viejos.
- `/taller/admin/links?key=<TALLER_ADMIN_KEY>` (página solo para
  Manuel, noindex, no enlazada): lista cada nivel con su contraseña,
  su link mágico listo para copiar y un mensaje de WhatsApp sugerido.
  Requiere env `TALLER_ADMIN_KEY`; sin la key correcta no muestra nada.
  ⚠️ El repo es público: contraseñas y links JAMÁS se commitean — solo
  viven en envs de Vercel y esta página los genera en runtime.

### Qué pide cada zona (server-side, regla del candado intacta)
- `/taller/en-vivo` → `vivo` | `todo`
- `/taller/curso` y `/taller/curso/[slug]` → `grabado` | `todo`
- Recursos normales de la bóveda (contenido/descargas) → `grabado` | `todo`
- Recurso premium `[slug]` → su propio nivel | `todo`
- Landing, calendario, novedades, nav → cualquier nivel válido
  (`estaDesbloqueado()` sin argumento)

### session.ts
- `estaDesbloqueado(nivel?)`: sin argumento = ¿algún nivel válido?;
  con nivel = ese nivel o `todo`.
- `nivelesActivos()`: lista de niveles válidos (la bóveda la usa para
  marcar premium desbloqueados).

## 2. Bandeja de pago (BandejaPago)

- Sección inline en el detalle de cada recurso premium bloqueado (ya no
  se va directo a WhatsApp): precio, datos de pago, pasos 1-2-3,
  botones. La tarjeta premium de la bóveda ahora enlaza al detalle
  («Ver y desbloquear →»).
- Datos en `content.ts` → `PAGOS`: banco Interbank, cuenta y CCI de la
  empresa, número Yape/Plin, rutas de los QR (`/public/images/pagos/`,
  placeholder «QR próximamente» hasta que Manuel pase las imágenes).
- Botones: «Ya pagué → enviar mi captura por WhatsApp» (wa.me pestaña
  nueva, mensaje prellenado con recurso y precio) · «Pagar con tarjeta»
  si el premium tiene `hotmartUrl` · input «¿Ya tienes tu clave?»
  (POST /api/taller/login + reload).
- Flujo completo: paga → captura → WhatsApp → Manuel confirma → envía
  el LINK MÁGICO del nivel → el comprador entra directo desbloqueado.
- Subida de captura a Drive: FUERA de esta fase (llega por WhatsApp);
  punto de conexión futuro = campo de upload en BandejaPago → webhook
  n8n → Drive, o Supabase Storage.

## 3. Acceso total como producto + franja de niveles

- `content.ts` → `NIVELES_VENTA`: los 3 accesos vendibles con nombre,
  precio e incluye[] — `todo` (precio placeholder S/497, Manuel ajusta),
  `grabado` ($120, mismo precio del producto actual), `vivo` ($250).
- En la bóveda: tarjeta destacada «💎 Acceso total» arriba + franja
  «¿Qué incluye cada acceso?» con los 3 niveles; cada uno abre su
  BandejaPago (misma mecánica de cobro).

## 4. Embudo medible (Vercel Analytics)

- `taller_pago` {accion: abrir|whatsapp|hotmart, recurso}
- `taller_desbloqueo` {nivel} al validar contraseña en la bandeja
- Los eventos existentes (taller_login, taller_recurso) se conservan.

## 5. Bubu vendedor

- `CONOCIMIENTO_VENTAS` (lib/taller/bubu.ts) suma respuestas: cómo
  pagar (bandeja: transferencia/Yape/Plin + captura por WhatsApp),
  qué incluye cada nivel / acceso total, cómo desbloquear un premium.

## 6. Revisión quincenal de la bóveda de referencia

- Tarea programada cada 15 días (scheduled task local): abre
  tododeia.com/community con el navegador (es JS-rendered), extrae los
  ítems, compara contra los slugs/tags de `BOVEDA` en el repo, y
  redacta lo nuevo con el estilo de Manuel.
- **Regla inquebrantable**: repos públicos se enlazan tal cual con
  descripción propia; las guías de esa web solo se toman como TEMAS y
  se escriben desde el método RESUELTO — jamás copiar su texto ni sus
  títulos creativos. Ignorar los repos «exclusivos de tododeia».
- **Propone, no publica**: presenta el borrador a Manuel; solo con su
  ok se edita content.ts, se hace build y se publica.

## Rollout seguro
1. Deploy del código: sin `TALLER_PASSWORDS`, todo sigue igual que hoy
   (TALLER_PASSWORD = todo).
2. Manuel (o Claude con su ok) configura `TALLER_PASSWORDS` y
   `TALLER_ADMIN_KEY` en Vercel → los niveles cobran vida.
3. Manuel pasa los QR de Yape/Plin → se suben a /public/images/pagos/.
4. Rutina operativa: rotar la contraseña de `vivo` al cerrar cada
   cohorte; rotar un premium si su link se filtra.
