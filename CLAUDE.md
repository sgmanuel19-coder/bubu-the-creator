# SISTEMA IA — Plataforma de Atención al Cliente con IA

## ¿Qué es este proyecto?
Landing page independiente para **Sistema IA**, plataforma de atención al cliente automatizada con inteligencia artificial. Desarrollado para **RESUELTO** (Manuel Severo). Deployed en Vercel como proyecto separado.

## Stack
- Next.js 16 (App Router, `output: "export"` para deploy estático)
- Tailwind CSS con diseño profesional azul y blanco
- Framer Motion — animaciones scroll-triggered
- Facebook Pixel — tracking de conversiones
- Vercel Analytics

## Identidad visual
| Token | Valor |
|---|---|
| Azul primario | `#1A80FF` |
| Azul secundario | `#4D9FFF` |
| Fondo | `#FFFFFF` |
| Texto | `#000000` / `#666666` |
| Font display | Inter / Space Grotesk |
| Font body | Inter |

## Reglas críticas

1. **Sistema IA es proyecto independiente** — completamente separado de Resuelto. Vercel dashboard muestra como proyecto distinto.
2. **`app/sistemas-ia/page.tsx` es la única página** — todas las secciones viven en este archivo o sus imports.
3. **Server vs Client**: La página `app/sistemas-ia/page.tsx` es Server Component. Componentes con interactividad usan `"use client"`.
4. **Static export**: El sitio se exporta estáticamente para máxima velocidad.
5. **Facebook Pixel tracking** — implementado vía componente `FacebookPixel.tsx`. Se dispara en cada pageview y eventos de conversión.
6. **Mobile-first**: Tailwind responsive design `base → sm → md → lg`.

## Páginas
| Ruta | Archivo | Nota |
|---|---|---|
| `/` | `app/page.tsx` | Home temporal (redirige a Sistema IA) |
| `/app` | `app/sistemas-ia/page.tsx` | Landing principal |

## Deploy
```bash
npm run dev          # desarrollo
npm run build        # build local
npx vercel --prod    # deploy producción
git push             # auto-deploy vía GitHub→Vercel
```

## Variables de Entorno
```
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1298724568307272
```

## Componentes Clave
- **FacebookPixel.tsx** — Inicializa Facebook Pixel para tracking de conversiones
- **Secciones en `sistemas-ia/page.tsx`**:
  - Problems — Pain points del cliente
  - HowItWorks — Explicación de cómo funciona
  - Pricing — Planes de pago
  - Industries — Industrias objetivo
  - Testimonials — Casos de éxito
  - FAQ — Preguntas frecuentes
  - Guarantee — Garantía de satisfacción
  - FinalCTA — Llamada a acción final con WhatsApp

## Contacto
- **WhatsApp**: Botones CTA enlazan directamente a conversación WhatsApp
- **Píxel de conversión**: Track automático de view_content, add_to_cart, purchase events
