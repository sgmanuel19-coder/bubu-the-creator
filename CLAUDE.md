# RESUELTO — Guía del Proyecto

## ¿Qué es este proyecto?
Web de marca personal de **Manuel Severo**, estratega de contenido y sistemas comerciales, Lima, Perú. Marca: **RESUELTO**. Deployed en Vercel: `project-yvdip.vercel.app`.

## Stack
- Next.js 16 (App Router, `output: "export"` para deploy estático)
- Tailwind CSS con tokens neon personalizados
- Framer Motion — animaciones scroll-triggered, drag, spring
- React Three Fiber + Three.js — Hero 3D y CyberneticGridShader
- shadcn/ui en `components/ui/`

## Identidad visual
| Token | Valor |
|---|---|
| Neon verde | `#00ff87` |
| Neon morado | `#cc44ff` |
| Fondo | `#060608` |
| Texto | `#f8f8f2` |
| Font display | Space Grotesk |
| Font body | Inter |

## Reglas críticas

1. **`lib/constants.ts` es la fuente de verdad** — todos los textos, links, casos y testimonios viven ahí.
2. **Leer antes de editar** — nunca modificar sin haber leído el archivo.
3. **Server vs Client**: Las páginas `app/*/page.tsx` son Server Components. Hooks, drag, `dynamic({ssr:false})` → componentes con `"use client"`.
4. **Static export**: `generateStaticParams` obligatorio en `app/casos/[slug]/page.tsx`.
5. **Mobile-first**: Tailwind `base → sm → md → lg`.
6. **Sin over-engineering**: No crear archivos innecesarios. No añadir features no pedidas.

## Páginas
| Ruta | Archivo |
|---|---|
| `/` | `app/page.tsx` |
| `/sobre-mi` | `app/sobre-mi/page.tsx` |
| `/casos` | `app/casos/page.tsx` |
| `/casos/[slug]` | `app/casos/[slug]/page.tsx` |
| `/servicios` | `app/servicios/page.tsx` |
| `/contacto` | `app/contacto/page.tsx` |

## Deploy
```bash
npm run dev          # desarrollo
npm run build        # build local
npx vercel --prod    # deploy producción
```
