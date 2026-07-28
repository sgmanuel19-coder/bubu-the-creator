import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// GUÍAS A FONDO — Claude, nivel intermedio/avanzado (7 guías)
// Copy 100% RESUELTO, escrito desde el método y la operación real
// de Manuel (agencia de contenido con IA).
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_CLAUDE_PRO: Record<string, SeccionRecurso[]> = {
  // ── El estudio creativo dentro de Claude ───────────────────────
  "estudio-creativo-en-claude": [
    {
      titulo: "La idea: un mini estudio sin diez suscripciones",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un estudio de contenido necesita cuatro capacidades: video, voz, radar de tendencias y piezas gráficas. La sorpresa es que las cuatro se pueden montar DENTRO de Claude con herramientas open source — sin sumar suscripciones nuevas. No reemplaza a tu stack de producción pesada (Higgsfield, Kling, CapCut siguen siendo las máquinas para piezas cinematográficas), pero cubre un territorio distinto: lo repetible, lo programático, lo que se produce en lote.",
        },
        {
          tipo: "parrafo",
          texto:
            "La distinción importa: el video de marca con look de película se dirige a mano. Los motion graphics del dato de la semana, el video de precios que cambia cada mes, la animación del logo — eso se automatiza con código, y Claude escribe ese código por ti.",
        },
      ],
    },
    {
      titulo: "Las cuatro piezas (todas en esta bóveda)",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Pieza", "Herramienta", "Qué produce"],
          filas: [
            [
              "Video por código",
              "remotion-dev/remotion",
              "Videos hechos con componentes React: Claude escribe la animación y renderiza MP4. Plantillas de video que se regeneran con datos nuevos.",
            ],
            [
              "Video rápido HTML→MP4",
              "heygen-com/hyperframes",
              "Convierte HTML/CSS en video. La vía corta para animaciones de texto y gráficos sin editor.",
            ],
            [
              "Voz local",
              "jamiepine/voicebox",
              "Estudio de voz en tu propia máquina: clona voces y narra guiones sin pagar por carácter.",
            ],
            [
              "Radar de tendencias",
              "mvanhorn/last30days-skill",
              "Le da a Claude el pulso de qué sonó en Reddit, X, YouTube y GitHub el último mes.",
            ],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Honestidad de producción: Remotion e Hyperframes piden tolerancia técnica — Claude hace el trabajo pesado, pero la primera configuración toma una tarde. Voicebox corre local y gratis, con la contraparte de que la calidad depende de tu máquina. Para voz comercial de cliente, ElevenLabs sigue siendo mi estándar.",
        },
      ],
    },
    {
      titulo: "El primer proyecto: tu plantilla de video renovable",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El mejor punto de entrada es una pieza que produces cada semana con la misma estructura y distinto contenido. Ejemplo real: el video de «3 datos de la semana» de una marca — misma animación, datos nuevos.",
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · tu primera plantilla de video con Remotion",
          contenido:
            "Quiero montar una plantilla de video renovable con Remotion. Guíame paso a paso, explicando cada cosa en lenguaje normal.\n\nLA PIEZA: un video vertical de 15 segundos con 3 tarjetas de texto animadas que entran una por una, con los colores y tipografía de mi marca (te los doy abajo).\n\nMI MARCA: [colores exactos + tipografía]\n\n1. Instala lo necesario en este proyecto y dime qué instalaste.\n2. Crea la plantilla con datos de ejemplo.\n3. Enséñame el video renderizado.\n4. Lo importante: deja los textos en UN archivo de datos separado, para que cada semana yo solo cambie ese archivo y te pida «renderiza la versión de esta semana».",
        },
        {
          tipo: "lista",
          items: [
            "Regla de oro: plantilla una vez, datos cada semana. Si cada video requiere tocar código, el sistema falló.",
            "El radar (last30days) alimenta al estudio: tendencia detectada → guion con tu matriz de contenido → pieza producida. El circuito completo vive en esta bóveda.",
          ],
        },
      ],
    },
    {
      titulo: "Cuándo NO usar este estudio",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Situación", "Qué usar en vez"],
          filas: [
            ["Spot de marca con dirección cinematográfica", "Higgsfield + Kling/Seedance: ese territorio necesita ojo de director, no código"],
            ["Una sola pieza sin necesidad de repetirse", "El costo de montar la plantilla no se justifica para algo que usas una vez"],
            ["Voz para entrega final a cliente", "ElevenLabs: Voicebox rinde para iterar barato, no para el archivo definitivo"],
            ["Necesitas resultado hoy y nunca tocaste Remotion", "La primera configuración toma una tarde; si el plazo es de horas, no es el momento de aprenderlo"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Este estudio gana en lo repetible y programático. Para la pieza única que necesita dirección de arte, tu stack de siempre sigue siendo el correcto.",
        },
      ],
    },
  ],

  // ── Saca información de internet ───────────────────────────────
  "saca-informacion-de-internet": [
    {
      titulo: "Para qué sirve esto en un negocio real",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "«Scraping» suena técnico, pero la pregunta de negocio es simple: ¿de qué está hablando mi nicho AHORA, qué está publicando mi competencia, y qué dicen los comentarios de mi audiencia? Esa información existe, es pública, y revisarla a mano toma horas. El MCP de Apify le da a Claude acceso a miles de extractores («actors») que la traen por ti: tú pides en español, él ejecuta.",
        },
        {
          tipo: "lista",
          items: [
            "Investigación de competencia: qué publican, con qué frecuencia, qué les funciona.",
            "Minería de comentarios: las palabras EXACTAS con las que tu audiencia describe su problema (oro puro para copy).",
            "Radar de nicho: los temas que están subiendo antes de que se saturen.",
            "Prospección: mapear negocios de un rubro y zona para tu pipeline comercial.",
          ],
        },
      ],
    },
    {
      titulo: "Montarlo (una vez)",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Crea tu cuenta de Apify",
              detalle:
                "apify.com tiene plan gratuito con créditos mensuales — suficiente para investigación semanal de un negocio. Copia tu API token desde la configuración.",
            },
            {
              titulo: "Conecta el MCP a Claude",
              detalle:
                "El repo oficial es apify/apify-mcp-server (está en esta bóveda). Pídele a Claude Code que lo conecte con tu token — es un comando y queda listo.",
            },
            {
              titulo: "Verifica con una pregunta chica",
              detalle:
                "«Trae los últimos 10 posts públicos de [cuenta de tu nicho] y dime de qué tratan.» Si responde con datos reales, el canal está abierto.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Ética y límites: esto es para información PÚBLICA — posts, comentarios, perfiles de negocio. Ni datos privados ni volúmenes absurdos: además de mal hechas, esas prácticas te queman las cuentas. La investigación seria no necesita nada de eso.",
        },
      ],
    },
    {
      titulo: "El flujo semanal de investigación",
      bloques: [
        {
          tipo: "copiable",
          etiqueta: "Prompt · investigación semanal de nicho",
          contenido:
            "Investigación semanal de mi nicho. Usa el MCP de Apify.\n\nMI NICHO: [descríbelo]\nCUENTAS A VIGILAR: [3-5 competidores o referentes]\n\n1. Trae los posts de los últimos 7 días de esas cuentas.\n2. Dime: ¿qué 3 temas se repiten? ¿qué formato está rindiendo más (según likes/comentarios relativos a su tamaño)?\n3. De los comentarios, extrae 10 frases textuales donde la audiencia describe un problema o deseo — las palabras exactas, no tu resumen.\n4. Cierra con: 3 ideas de contenido para MI marca que ataquen esos temas SIN copiar el enfoque de nadie — usa mis estructuras (están en mi documento de marca).\n\nDatos primero, opinión después. Si algo no se pudo extraer, dilo claro.",
        },
        {
          tipo: "parrafo",
          texto:
            "La regla que ordena todo: empieza con una pregunta de negocio, no con la herramienta. «¿Qué dice mi nicho este mes?» produce decisiones; «baja todo lo que puedas» produce un Excel que nadie lee. El dato sin pregunta es ruido.",
        },
      ],
    },
    {
      titulo: "De la extracción al insight (conectando con tu Cerebro)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Esta técnica es exactamente la que describe la guía de insight de esta bóveda, llevada a escala. La guía dice: reúne al menos 200 reseñas, busca las quejas que se repiten con palabras distintas, presta atención a las metáforas. El MCP de Apify hace esa recolección en minutos en vez de tardes.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Extrae en volumen", detalle: "Reseñas, comentarios, posts de la categoría — no solo de tu marca." },
            { titulo: "2. Pide el lenguaje literal, no el resumen", detalle: "Un resumen borra exactamente las metáforas que necesitas para el copy." },
            { titulo: "3. Clasifica con el protocolo del DOC 00", detalle: "Dato → observación → hipótesis → insight. Si le pides directamente «dame insights», el modelo se queda en el segundo nivel." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Sin este cruce, la extracción es solo un Excel con más filas. Con él, es la técnica de excavación de insight funcionando a escala.",
        },
      ],
    },
  ],

  // ── Claude Code desde el teléfono ──────────────────────────────
  "claude-desde-el-telefono": [
    {
      titulo: "Qué cambia",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Claude Code dejó de vivir solo en tu terminal: las sesiones pueden continuar desde la app del teléfono y desde la web, y los trabajos largos pueden correr en la nube sin que tu compu siga prendida. Para alguien que produce, esto significa una cosa concreta: lanzas el trabajo pesado antes de salir, y desde la calle revisas avances, respondes preguntas y apruebas decisiones.",
        },
        {
          tipo: "parrafo",
          texto:
            "Mi uso real: dejo corriendo la tanda de producción (generaciones en lote, renders, organización de archivos) y superviso desde el teléfono entre reuniones. El trabajo no me espera a mí; yo lo superviso a él.",
        },
      ],
    },
    {
      titulo: "Cómo se monta",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Misma cuenta en todos lados",
              detalle:
                "Claude Code en tu compu y la app de Claude en tu teléfono, con la misma cuenta. Las sesiones aparecen en ambos.",
            },
            {
              titulo: "Lanza el trabajo con instrucciones completas",
              detalle:
                "La diferencia entre supervisar y niñear es el brief inicial: criterio de calidad, qué hacer si algo falla, dónde dejar el resultado.",
            },
            {
              titulo: "Revisa por hitos, no por ansiedad",
              detalle:
                "Pídele que reporte al terminar cada etapa. Tú abres el teléfono cuando hay algo que decidir, no cada cinco minutos.",
            },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · lanzar trabajo supervisable",
          contenido:
            "Voy a dejar este trabajo corriendo y lo superviso desde el teléfono. Reglas:\n\nLA TAREA: [qué hay que producir, con el criterio de calidad claro]\n\n1. Divide el trabajo en etapas y dime cuáles son antes de empezar.\n2. Al terminar cada etapa, deja un resumen corto de qué salió y qué sigue.\n3. Si encuentras un problema que requiere MI decisión, DETENTE y déjame la pregunta clara con tus 2 opciones recomendadas. No decidas por mí en: [lo que solo tú decides — ej. borrar cosas, publicar, gastar].\n4. El resultado final va en: [carpeta/archivo].\n\nConfirma que entendiste las reglas y arranca.",
        },
      ],
    },
    {
      titulo: "Para qué NO es",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Trabajo de criterio fino (elegir la dirección creativa de una campaña) — eso se hace sentado, con calma.",
            "Primeras veces: un flujo nuevo se prueba contigo mirando, no desde la calle.",
            "Nada irreversible sin tu ok explícito: publicar, borrar, enviar. Eso queda en la lista de «solo tú decides» del prompt.",
          ],
        },
        {
          tipo: "cita",
          texto: "La libertad no viene de que la IA trabaje sola — viene de haberle dejado instrucciones tan claras que no te necesite para lo pequeño.",
        },
      ],
    },
    {
      titulo: "Un día real usando esto",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Hora", "Qué haces", "Qué corre en la nube"],
          filas: [
            ["8:00 AM", "Lanzas la tanda de generación de la semana antes de salir", "Higgsfield produce las 20 variantes de un cliente"],
            ["10:30 AM", "Revisas desde el teléfono entre reuniones", "Ya hay 8 listas; apruebas 6 y pides regenerar 2"],
            ["1:00 PM", "Otra revisión rápida", "El lote terminó; queda organizado en la carpeta que definiste"],
            ["6:00 PM", "Te sientas a producir con criterio fino", "Ya tienes el material crudo listo, sin haber perdido la mañana esperando"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "El valor no es «trabajar menos» — es que el tiempo de espera de la máquina deja de ser tiempo tuyo. Lo que antes era mirar una barra de progreso ahora es una notificación que revisas cuando puedes.",
        },
      ],
    },
  ],

  // ── El cerebro externo (base de datos) ─────────────────────────
  "cerebro-externo-base-de-datos": [
    {
      titulo: "El problema que resuelve",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuando tu operación crece, terminas con la información regada: los leads en WhatsApp, los clientes en una hoja de cálculo, el contenido en Notion, las métricas en cada red. Conectarle a Claude diez herramientas sueltas parece la solución, pero en la práctica lo vuelves lento: para responder una pregunta que cruza fuentes tiene que visitarlas una por una, y a mitad de camino se pierde o se rinde.",
        },
        {
          tipo: "parrafo",
          texto:
            "El patrón que escala es al revés: UNA base de datos donde tus fuentes ya viven juntas, y Claude consulta ese único lugar. Una pregunta, una consulta, una respuesta que cruza todo. Los conectores vivos quedan para ACTUAR (mandar el correo, crear el evento); la base queda para SABER.",
        },
        {
          tipo: "nota",
          texto:
            "¿Es para ti HOY? Solo si ya te duele: si tienes 2-3 fuentes y tus preguntas no cruzan datos, no lo montes todavía. Este patrón paga cuando el desorden ya existe. Señal clara: te descubres copiando y pegando entre 4 ventanas para responder «¿cómo va el cliente X?».",
        },
      ],
    },
    {
      titulo: "Las piezas (todas en esta bóveda)",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Pieza", "Opciones", "Nota RESUELTO"],
          filas: [
            [
              "La base (Postgres)",
              "Supabase / Neon / Railway",
              "Supabase si quieres panel visual y todo montado; Railway si ya corres cosas ahí (como mi n8n). Desde ~$20-25/mes.",
            ],
            [
              "Mover los datos",
              "dlt-hub/dlt · airbytehq/airbyte · n8n",
              "n8n es mi pegamento natural (ya lo uso para leads): un evento dispara el workflow que inserta la fila. dlt/Airbyte para volúmenes serios.",
            ],
            [
              "Que Claude la lea",
              "crystaldba/postgres-mcp · supabase-community/supabase-mcp",
              "SIEMPRE en modo solo lectura. Claude consulta; jamás escribe en tu base.",
            ],
          ],
        },
      ],
    },
    {
      titulo: "El diseño: Claude lo hace contigo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "No necesitas saber diseñar bases de datos — necesitas saber qué preguntas quieres responder. Con eso, Claude diseña el esquema, decide qué se sincroniza y con qué frecuencia, y genera el SQL. Tu trabajo es la entrevista inicial y aprobar el plan antes de que toque nada (modo Plan).",
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · diseña mi cerebro de datos (correr en modo Plan)",
          contenido:
            "Quiero centralizar la información de mi negocio en una base Postgres que tú puedas consultar, en vez de tener todo regado. NO toques nada todavía: primero el plan.\n\nEntrevístame una pregunta a la vez:\n1. Qué fuentes tengo (hojas de cálculo, WhatsApp/CRM, redes, facturación…).\n2. Las 5 preguntas que más quisiera poder responderte («¿qué clientes están por renovar?», «¿qué contenido rindió este mes?»…).\n3. Qué dato necesito al segundo (eso NO va a la base, se queda en conector vivo) y qué aguanta actualizarse cada hora o cada día.\n\nCon mis respuestas, preséntame:\n- Las tablas propuestas y qué guarda cada una (en lenguaje normal, el SQL después).\n- Cómo y cada cuánto se actualiza cada fuente, y con qué herramienta (n8n / dlt / Airbyte) — con costo estimado honesto.\n- Qué preguntas de mis 5 quedarán respondibles y cuáles no.\n\nSolo cuando yo apruebe el plan, generas el SQL y me guías a crearlo.",
        },
      ],
    },
    {
      titulo: "Las reglas de seguridad que no se negocian",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Claude se conecta en modo SOLO LECTURA, siempre. El postgres-mcp de esta bóveda trae ese modo integrado; úsalo.",
            "Un usuario de base de datos de mínimo privilegio para el MCP: puede leer lo que necesita y nada más. Tu usuario dueño jamás se conecta a la IA.",
            "Los datos frescos-al-segundo no viven aquí: la base siempre va un paso atrás de la realidad, y eso está bien para saber — no para actuar.",
            "Cada dato con su fecha de sincronización: una base que parece fresca pero está vieja es peor que ninguna.",
          ],
        },
        {
          tipo: "cita",
          texto: "El cerebro responde; los conectores ejecutan. Saber y actuar son permisos distintos — y esa separación es tu seguridad.",
        },
      ],
    },
    {
      titulo: "Las 3 preguntas que justifican montarlo",
      bloques: [
        {
          tipo: "lista",
          items: [
            "«¿Cuánto facturé este mes por cliente y cómo se compara con el anterior?» — cruza facturación y clientes, dos fuentes que hoy viven separadas.",
            "«¿Qué clientes están por renovar y cuál fue su última interacción?» — cruza contratos y WhatsApp/CRM.",
            "«¿Qué contenido rindió mejor este trimestre y qué tienen en común?» — cruza métricas de redes con tu propia clasificación de temas.",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Si tus preguntas reales de negocio se parecen a estas tres, el cerebro externo te ahorra horas cada semana. Si tus preguntas viven cómodas dentro de una sola hoja de cálculo, todavía no lo necesitas — móntalo cuando el dolor de cruzar fuentes ya sea real, no antes.",
        },
      ],
    },
  ],

  // ── Matriz de contenido ────────────────────────────────────────
  "matriz-de-contenido": [
    {
      titulo: "La premisa: evidencia antes que intuición",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La mayoría decide su próximo contenido por intuición o por imitación. Este proyecto lo decide con evidencia: tus propios números. Claude analiza qué publicaste, qué rindió y POR QUÉ — tipo de gancho, estructura, duración, tema — y de ese patrón salen los guiones del próximo mes, escritos sobre lo que ya demostró funcionar con TU audiencia.",
        },
        {
          tipo: "parrafo",
          texto:
            "Esto conecta directo con el sistema de la masterclass: la matriz te dice QUÉ está funcionando; el pensamiento de director creativo (PARTE 1) te dice CÓMO contarlo mejor. Datos sin criterio es repetirte; criterio sin datos es apostar.",
        },
      ],
    },
    {
      titulo: "Paso 1 · Junta tu evidencia",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Necesitas tus últimos 30-50 posts con sus métricas. Dos caminos según tu tolerancia técnica:",
        },
        {
          tipo: "lista",
          items: [
            "Camino manual (funciona hoy): exporta las métricas desde la app (Instagram → panel profesional; TikTok → analytics) o vuélcalas a una hoja: fecha, tema, gancho usado, duración, vistas, likes, comentarios, guardados, compartidos.",
            "Camino automático: el MCP de Apify (guía en esta bóveda) baja tus posts públicos y los de tu competencia — útil para sumar el afuera al análisis.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "Los guardados y compartidos valen más que los likes: señalan contenido que la audiencia considera ÚTIL, y lo útil es lo que convierte seguidores en clientes.",
        },
      ],
    },
    {
      titulo: "Paso 2 · El análisis de patrón",
      bloques: [
        {
          tipo: "copiable",
          etiqueta: "Prompt · encuentra mi patrón",
          contenido:
            "Te pego mis últimos [30-50] posts con métricas. Analiza y respóndeme SOLO con evidencia de estos datos:\n\n1. PATRÓN GANADOR: ¿qué tienen en común mis 5 mejores posts? (tipo de gancho, tema, duración, estructura, día/hora). Sé específico.\n2. PATRÓN PERDEDOR: ¿qué tienen en común los 5 peores? ¿Qué debo dejar de hacer?\n3. LA SORPRESA: ¿qué dato contradice lo que yo probablemente creo de mi contenido?\n4. HUECOS: ¿qué combinación gancho+tema que me funciona estoy usando POCO?\n\nFormato: tabla con el patrón + el número que lo respalda. Nada de consejos genéricos de gurú — solo lo que estos datos demuestran.",
        },
      ],
    },
    {
      titulo: "Paso 3 · Del patrón al mes de guiones",
      bloques: [
        {
          tipo: "copiable",
          etiqueta: "Prompt · el mes de contenido sobre evidencia",
          contenido:
            "Con el patrón que encontraste y mi documento de marca (tono, estructuras, los 10 ganchos), arma mi próximo mes:\n\n1. LA MATRIZ: 12-16 ideas en tabla — tema + tipo de gancho + estructura narrativa + objetivo (atracción/autoridad/conversión). Respeta la proporción: mayoría atracción, un tercio autoridad, 2-3 de conversión.\n2. Cada idea EXPLOTA el patrón ganador o ATACA un hueco detectado. Ninguna idea huérfana de evidencia.\n3. Escribe los primeros 4 guiones completos (gancho textual + desarrollo + CTA).\n\nRegla: si una idea no puede señalar qué dato la respalda, se cae de la matriz.",
        },
        {
          tipo: "parrafo",
          texto:
            "Cierra el ciclo cada mes: publicas, mides, vuelves a correr el análisis con los datos nuevos. La matriz mejora sola porque cada mes tiene más evidencia. A los 3 ciclos, tu contenido decide con más datos que el 99% de tu nicho.",
        },
      ],
    },
  ],

  // ── Desarma videos virales ─────────────────────────────────────
  "desarma-videos-virales": [
    {
      titulo: "El principio: la estructura se copia, el contenido jamás",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Detrás de cada video que explota hay un esqueleto que se puede nombrar: un tipo de gancho, una promesa, un ritmo de desarrollo, una recompensa final. Ese esqueleto NO es de nadie — es narrativa aplicada. Lo que sí es de alguien es su historia, sus palabras y su edición. Este proyecto entrena a Claude para extraer el esqueleto de cualquier video de referencia y devolvértelo VACÍO, listo para que lo llenes con una historia verdadera de tu marca.",
        },
        {
          tipo: "nota",
          texto:
            "La línea ética y práctica: copiar la estructura es estudiar; copiar el contenido es robar — y además no funciona, porque la audiencia huele la copia. La estructura ajena + tu historia real = pieza original que aprovecha física narrativa probada.",
        },
      ],
    },
    {
      titulo: "El agente desarmador",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Le das la transcripción o una descripción detallada del video (qué se ve y qué se dice, segundo a segundo si puedes), y te devuelve la ficha técnica:",
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · desarma esta referencia",
          contenido:
            "Te voy a dar [la transcripción / descripción segundo a segundo] de un video que funcionó muy bien. Desármalo como analista narrativo:\n\n1. GANCHO (0-3s): ¿qué tipo es? (contradicción, cifra, misterio, promesa, autoridad, urgencia, novedad, comparación, desafío). ¿Qué lo hace funcionar AQUÍ?\n2. PROMESA: ¿qué se le promete al espectador para que se quede?\n3. ESTRUCTURA: divide el video en bloques con su función (contexto, giro, prueba, recompensa) y su duración relativa.\n4. RETENCIÓN: ¿qué recursos usa para que no te vayas? (loops abiertos, cambios de plano, conteo, tensión).\n5. CIERRE: ¿cómo aterriza y qué CTA usa?\n\nAl final, entrégame LA PLANTILLA VACÍA: la misma estructura como esqueleto con espacios en blanco, SIN ninguna palabra del video original.",
        },
      ],
    },
    {
      titulo: "Llenar la plantilla con TU historia",
      bloques: [
        {
          tipo: "copiable",
          etiqueta: "Prompt · rellena con mi marca",
          contenido:
            "Toma la plantilla vacía que extrajiste. Ahora la llenamos con MI material:\n\nMI HISTORIA REAL: [la anécdota, caso o dato verdadero de tu marca que encaja con esta estructura]\nMI AUDIENCIA: [quién lo va a ver]\nMI CTA: [la acción que quiero]\n\nEscribe el guion completo respetando la estructura, con mi tono (documento de marca). Regla dura: ni una frase, metáfora o ejemplo del video original — si la historia mía no llena bien un bloque, dímelo en vez de rellenar con genérico.",
        },
        {
          tipo: "lista",
          items: [
            "Desarma 5 referencias de tu nicho y vas a ver que usan 2-3 esqueletos. Ese es el metajuego: dominar pocos esqueletos, no perseguir cada video.",
            "Combina con «Los 10 ganchos» y «Estructuras que retienen» de esta bóveda: la referencia te da el esqueleto; tus frameworks lo mejoran.",
            "Guarda cada plantilla extraída en un banco de estructuras — a los dos meses tienes una biblioteca que vale más que cualquier curso de virales.",
          ],
        },
      ],
    },
    {
      titulo: "Ejemplo completo: de video ajeno a guion propio",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Etapa", "Lo que salió del video ajeno", "Lo que se llenó con marca propia"],
          filas: [
            ["Gancho", "Contradicción: «Todo el mundo te dice X, y es mentira»", "«Todo el mundo te dice que necesitas ads para vender, y en mi primer año no gasté ni un sol»"],
            ["Promesa", "«Te voy a mostrar cómo lo hice sin gastar nada»", "«Te muestro exactamente los 3 pasos que usé, con capturas reales»"],
            ["Estructura", "Contexto (5s) → giro (10s) → prueba (10s) → recompensa (5s)", "Misma proporción, con la historia real del negocio del alumno"],
            ["Cierre", "CTA a comentarios: «cuéntame tu caso»", "CTA al DM: «escríbeme AYUDA y te paso el paso a paso»"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Nota lo que NO cambió: la proporción de tiempos y el tipo de gancho. Lo que sí cambió: cada palabra. Esa es la línea exacta entre estudiar la estructura y copiar el contenido.",
        },
      ],
    },
  ],

  // ── Tu web sin agencia ─────────────────────────────────────────
  "tu-web-sin-agencia": [
    {
      titulo: "Por qué una landing cuesta miles (y qué cambió)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una landing de agencia se cobra en miles por tres trabajos: la estrategia (qué decir y a quién), el diseño (cómo se ve) y el código (que funcione). Claude puede ejecutar los tres — lo que no puede poner es la dirección: saber qué vendes de verdad, a quién, y qué acción quieres provocar. Si pones eso, este proyecto te entrega una web publicada sin pagar una agencia. Lo digo con conocimiento de causa: mi propio sitio está construido exactamente así.",
        },
        {
          tipo: "nota",
          texto:
            "Advertencia honesta: «sin agencia» no es «sin trabajo». Es una tarde de brief bien pensado + sesiones de construcción dirigida. Lo que te ahorras es la plata y los ciclos de ida y vuelta; el criterio lo sigues poniendo tú.",
        },
      ],
    },
    {
      titulo: "Fase 1 · El brief conversado (el 80% del resultado)",
      bloques: [
        {
          tipo: "copiable",
          etiqueta: "Prompt · el brief de tu web (correr en modo Plan)",
          contenido:
            "Vamos a construir mi landing. ANTES de diseñar o programar nada, entrevístame — una pregunta a la vez — hasta tener claro:\n\n1. Qué vendo y cuál es LA acción que quiero que haga el visitante (una sola).\n2. Quién llega a esta página y desde dónde (¿ads? ¿mi bio? ¿referidos?).\n3. Por qué yo y no otro: mi diferencia real, con pruebas (casos, números, clientes).\n4. Las objeciones típicas de mi cliente y cómo las respondo.\n5. Identidad visual: colores, tipografía y 2 referencias de webs que me gustan (te describo qué me gusta de cada una).\n\nCon eso, entrégame el BLUEPRINT en un documento: la estructura sección por sección (hero, prueba, oferta, objeciones, CTA), con el mensaje de cada una escrito. Ese documento es el contrato — no se construye nada que no esté ahí.",
        },
        {
          tipo: "parrafo",
          texto:
            "El orden de aprobación importa y es innegociable: primero apruebas el TEXTO, luego el diseño, al final el código. Corregir palabras es gratis; corregir un diseño construido cuesta; corregir código publicado, más.",
        },
      ],
    },
    {
      titulo: "Fase 2 · Construcción por secciones",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Sección por sección, contra el blueprint",
              detalle:
                "«Construye el hero según el blueprint» → revisas → siguiente. Nunca «hazme toda la web»: pierdes el control de calidad en la sección 2.",
            },
            {
              titulo: "Auditoría de diseño antes de publicar",
              detalle:
                "Corre la skill de auditoría de Vercel (en esta bóveda) sobre el resultado: contraste, jerarquía, accesibilidad, móvil. Es tu control de calidad de agencia.",
            },
            {
              titulo: "Publica en Vercel",
              detalle:
                "Gratis para empezar, con dominio propio después. Claude te guía con el deploy — es un comando y quedas en línea.",
            },
          ],
        },
      ],
    },
    {
      titulo: "Fase 3 · Medir (o no existió)",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Un evento por la acción principal (clic al WhatsApp, envío del formulario). Sin eso, no sabes si la web trabaja.",
            "Revisa a las 2 semanas: ¿cuánta gente llegó, cuántos hicieron LA acción? Si nadie la hace, el problema casi siempre es el mensaje del hero — vuelve al blueprint, no al código.",
            "La web nunca está «terminada»: está publicada y aprendiendo. Cada corrección sale de un dato, no de un antojo.",
          ],
        },
        {
          tipo: "cita",
          texto: "La agencia no te cobraba por el código. Te cobraba por decidir. Ahora decides tú — con un equipo que ejecuta al instante.",
        },
      ],
    },
    {
      titulo: "Los 5 errores que delatan una web hecha sin brief",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Error", "Por qué pasa", "Cómo se evita"],
          filas: [
            ["El hero no dice qué se vende", "Se saltó la Fase 1 y se fue directo a pedir «algo bonito»", "El blueprint obliga a escribir el mensaje del hero antes de diseñarlo"],
            ["Hay tres CTA distintos compitiendo", "No se definió LA acción única desde el principio", "La pregunta 1 del brief existe justo para esto"],
            ["Se ve genérica, como salida de una plantilla", "Faltaron referencias visuales concretas en el brief", "Pide 2 referencias reales y describe qué te gusta de cada una, no «moderno y profesional»"],
            ["Nadie completa el formulario", "El mensaje no responde la objeción real del visitante", "Vuelve a la pregunta 4 del brief: las objeciones típicas, antes de tocar el diseño"],
          ],
        },
      ],
    },
  ],
};
