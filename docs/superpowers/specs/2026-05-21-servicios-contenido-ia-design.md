# Diseño: Rediseño sección de servicios — Contenido IA + Comercial IA

**Fecha:** 2026-05-21  
**Proyecto:** resuelto (resueltoagency.com)  
**Solicitante:** Manuel Severo

---

## Contexto

La sección de servicios actual tiene dos tarjetas expandibles: "Sistema Audiovisual" y "RESUELTO Automation". El problema es que:

1. El servicio de **creación de contenido con IA** no existe como oferta clara — solo aparece como una opción suelta ("Opción E: Piezas de contenido IA") en el Plan Señal a $500, sin explicar el sistema completo detrás.
2. El **Sistema Comercial** (Card 2) no describe claramente los 4 servicios que ofrece — el visitante no sabe qué incluye.
3. Manuel ha desarrollado un sistema completo de producción de contenido con IA (Cerebro Creativo Estratégico + producción con motores IA) que justifica un paquete de S/4,500/mes pero no está visibilizado.

---

## Qué se construye

### Card 1: Audiovisual + Contenido (verde — expandible)

**Cambio:** Al expandirse, el panel mostrará **dos tabs** en lugar de contenido único:

#### Tab 1 — "📹 Audiovisual Corporativo"
Sin cambios. Todo el contenido actual de `ServiceDetailAudiovisual.tsx` permanece intacto:
- Problema / Antes-Después
- Qué es el sistema
- 10 pilares (accordion)
- Entregables finales
- Para quién es
- Proceso 60 días
- Condiciones / política
- Garantía
- Disponibilidad
- FAQ
- Planes y precios (Señal $500, Presencia $1k/mes, Autoridad $3k)

#### Tab 2 — "🤖 Contenido con IA" ← NUEVO
Secciones en orden:

1. **Header**: Título "Cerebro Creativo Estratégico con IA" + subtítulo "Adquisición de clientes mediante contenido estratégico mensual. Sin sesiones de grabación requeridas. Para cualquier tipo de negocio."

2. **3 Fases del proceso**:
   - Fase 01 (Mes 1): 🧠 Cerebro IA — 300-500 pág. docs estratégicos, briefing, buyer persona, arq. de comunicación, prompts maestros de marca. Badge: "Solo en mes 1"
   - Fase 02 (Mensual): 🎬 Producción — Guiones con IA → prompts semióticos → generación imagen/video → edición profesional manual. Badge: "Cada mes"
   - Fase 03 (Mensual): ✨ Entrega — 10 videos + 8 piezas gráficas + captions. Badge: "Cada mes"

3. **Qué recibes cada mes** (4 bloques con icono):
   - 🧠 Cerebro IA del negocio — Docs estratégicos + prompts maestros (mes 1)
   - 🎬 10 videos para redes — Kling 3.0 · Seedance · Veo 3 + edición manual
   - 🖼️ 8 piezas gráficas — Banana Pro · GPT Image + retoque profesional
   - 📋 Guiones + captions — Redactados con el Cerebro IA, alineados a voz de marca

4. **Motores de IA utilizados** (chips): Kling 3.0 · Seedance · Veo 3 · Banana Pro · GPT Image

5. **Inversión** (2 tarjetas lado a lado):
   - Mes 1 (Arranque): **S/ 4,500** +IGV · Cerebro IA + primera entrega · "Incluye construcción del Cerebro IA"
   - Mes 2+ (Retainer): **S/ 4,000** /mes +IGV · 10 videos + 8 piezas · "Sin permanencia mínima forzada"

6. **CTAs**: "Agendar llamada →" (btn-glow) + "WhatsApp →" (btn-outline)

---

### Card 2: Sistema Comercial con IA (purple — sin expandir, link directo)

**Cambio:** Actualizar el array `items` en `lib/constants.ts` para listar claramente los 4 servicios:

```
- Landing page / web con IA y vibe coding
- Base de datos automatizada (scraping de prospectos)
- Prospección en frío automática (emails personalizados masivos)
- Superagente WhatsApp IA que agenda y vende 24/7
```

El CTA button ya redirige a `/sistemas-ia` — no cambia.

---

## Archivos a modificar

| Archivo | Cambio |
|---|---|
| `components/ServiceDetailAudiovisual.tsx` | Agregar estado `activeTab`, barra de tabs, nuevo `<ContenidoIATab>` |
| `lib/constants.ts` | Actualizar `SITE.services.premium.items` con los 4 servicios comerciales |

### Estructura del componente (ServiceDetailAudiovisual.tsx)

```
ServiceDetailAudiovisual
├── Tab bar (Audiovisual Corporativo | Contenido con IA)
├── <AudiovisualTab> — todo el contenido actual
└── <ContenidoIATab> — componente nuevo
    ├── SectionLabel + h3 + p (header)
    ├── PhasesGrid (3 tarjetas)
    ├── DeliverablesGrid (4 bloques con icono)
    ├── EnginesBadges (chips de motores IA)
    ├── PricingCards (2 tarjetas S/4,500 / S/4,000)
    └── CTA row
```

El estado `activeTab: "audiovisual" | "contenido"` vive en `ServiceDetailAudiovisual`.  
La barra de tabs usa el mismo estilo de `border-b` que ya existe en el design system.

---

## Lo que NO cambia

- Comportamiento de expansión/colapso de las tarjetas (ServiceSelector.tsx — sin tocar)
- Diseño visual de las tarjetas (colores, animaciones, HUD marks)
- Todo el contenido del tab Audiovisual Corporativo
- Lógica de routing hash (`#audiovisual`)
- Card 2: solo cambian los `items`, no el layout ni el CTA

---

## Verificación

1. Abrir `/servicios` en local (`npm run dev`)
2. Click en la tarjeta verde → panel se expande
3. Verificar que tab "Audiovisual Corporativo" muestra todo el contenido actual sin cambios
4. Click en tab "Contenido con IA" → mostrar el nuevo contenido con las 3 fases, entregables, precios
5. Verificar precios: S/4,500 mes 1 / S/4,000 mes 2+
6. Verificar que Card 2 (purple) muestra los 4 servicios comerciales en su lista
7. Verificar en mobile (< 768px) que los tabs son responsivos
8. Build sin errores TypeScript: `npm run build`
