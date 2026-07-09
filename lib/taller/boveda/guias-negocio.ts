import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// GUÍAS A FONDO — Meta Ads (4) + Sistema de contenido (5)
// El territorio propio de Manuel: escritas desde sus frameworks
// reales (10 ganchos, estructuras narrativas, embudo, Follow Me Ads).
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_NEGOCIO: Record<string, SeccionRecurso[]> = {
  // ── Meta Ads sin quemar plata ──────────────────────────────────
  "meta-ads-sin-quemar-plata": [
    {
      titulo: "El error que quema el presupuesto",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El 90% de la plata que se quema en Meta Ads se quema ANTES de tocar el administrador de anuncios: en no saber qué acción quieres provocar. «Quiero que me conozcan» no es un objetivo — es un deseo. Un objetivo es: que me escriban al WhatsApp, que se registren, que compren. Cada uno se configura distinto, se mide distinto y cuesta distinto.",
        },
        {
          tipo: "parrafo",
          texto:
            "La segunda verdad que nadie te dice al empezar: hoy el creativo pesa más que la segmentación. Meta es muy bueno encontrando a tu gente SI el video es bueno. Por eso en mi sistema la pauta viene después del contenido: primero aprendes a producir piezas que funcionan orgánicamente, después les pones gasolina.",
        },
      ],
    },
    {
      titulo: "La estructura mínima que funciona",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Una campaña, un objetivo",
              detalle:
                "Elige el objetivo que corresponde a la acción real: mensajes (si cierras por WhatsApp), clientes potenciales (si registras), ventas (si tienes checkout). No uses «reconocimiento» con presupuesto chico — es el objetivo más caro de medir.",
            },
            {
              titulo: "Un conjunto de anuncios, segmentación simple",
              detalle:
                "País + edad amplia + 2-3 intereses gruesos, o directamente Advantage (que Meta decida). Con presupuesto chico, la sofisticación de audiencias es humo: el creativo hace la selección.",
            },
            {
              titulo: "3-4 anuncios, ganchos distintos",
              detalle:
                "Mismo mensaje de fondo, ganchos diferentes (usa los 10 tipos — guía en esta bóveda). Meta reparte el presupuesto al que funciona, y tú aprendes qué le duele a tu audiencia.",
            },
            {
              titulo: "Presupuesto que aguante aprender",
              detalle:
                "Regla práctica: tu presupuesto diario debería poder pagar al menos 1-2 resultados por día. Si tu conversación te cuesta ~S/10, con S/20-30 diarios la campaña aprende. Con S/5 diarios solo compras ruido.",
            },
          ],
        },
      ],
    },
    {
      titulo: "La disciplina de prueba: UNA variable",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Con presupuesto chico solo puedes aprender de a una cosa a la vez. Si cambias creativo Y audiencia Y presupuesto al mismo tiempo, el resultado no te enseña nada — no sabes qué movió la aguja.",
        },
        {
          tipo: "lista",
          items: [
            "Semana 1-2: misma audiencia, ganchos distintos → aprende QUÉ mensaje jala.",
            "Semana 3: el gancho ganador, prueba de formato (talking head vs demo vs texto animado).",
            "Después: recién ahí toca audiencias, si hace falta — muchas veces no hace falta.",
            "No toques la campaña cada día: cada cambio reinicia el aprendizaje del algoritmo. Revisión cada 3-4 días, con calendario.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · diseña mi primera campaña con Claude",
          contenido:
            "Vas a ayudarme a diseñar mi primera campaña de Meta Ads. Mi contexto:\n\nQUÉ VENDO: [producto/servicio + precio]\nLA ACCIÓN: [que me escriban / se registren / compren]\nPRESUPUESTO: [S/ X por día]\nMI MEJOR CONTENIDO ORGÁNICO: [pega 2-3 posts que funcionaron]\n\n1. Dime qué objetivo de campaña corresponde y por qué.\n2. Propón la segmentación MÁS SIMPLE que tenga sentido.\n3. Dame 4 conceptos de anuncio con ganchos de tipos distintos, basados en lo que ya me funcionó orgánico.\n4. Dime qué número voy a mirar para saber si funciona (uno solo) y cuánto debería costar aproximadamente en mi rubro.\n5. Cierra con el calendario de revisión: qué miro el día 3, el día 7 y el día 14, y qué decisión tomo en cada punto.",
        },
        {
          tipo: "nota",
          texto:
            "Si en 7 días con presupuesto suficiente no hay UN resultado, el problema es el creativo o la oferta — no la segmentación. Apaga, revisa el mensaje, vuelve a entrar. Insistir con un ad muerto es la forma más disciplinada de quemar plata.",
        },
      ],
    },
  ],

  // ── Follow Me Ads ──────────────────────────────────────────────
  "follow-me-ads": [
    {
      titulo: "La lógica: nadie compra la primera vez",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La primera vez que alguien te ve, no te compra — te archiva. La venta ocurre entre el quinto y el décimo contacto, y esperar que el orgánico haga todos esos contactos es dejarle la venta al azar del algoritmo. Los Follow Me Ads son la solución de bajo presupuesto: campañas de $5-10 diarios dirigidas EXCLUSIVAMENTE a gente que ya interactuó contigo — vieron tus videos, visitaron tu perfil, te dejaron un like. Ya te conocen; ahora te van a recordar.",
        },
        {
          tipo: "parrafo",
          texto:
            "Es la pieza de remarketing de mi modelo de embudo: el orgánico atrae, los Follow Me Ads persiguen, el DM cierra. Cada pieza hace un solo trabajo.",
        },
      ],
    },
    {
      titulo: "El creativo correcto (contraintuitivo)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El error clásico: usar tu reel más viral como Follow Me Ad. El viral atrae a TODOS — curiosos incluidos. Pero esta audiencia ya te conoce; lo que necesita para cruzar la línea es otra cosa:",
        },
        {
          tipo: "lista",
          items: [
            "Contenido TÉCNICO y específico: el que demuestra que sabes de verdad. El viral entretiene; el técnico convence al que va a pagar.",
            "Casos y resultados: «así quedó esto que hice para X» con el proceso visible.",
            "Tu cara y tu voz: a esta altura ya eres una persona para ellos, no una marca — refuérzalo.",
            "CTA de conversación, no de venta dura: «escríbeme [palabra] y te mando [recurso/info]» abre el DM, y el DM cierra.",
          ],
        },
      ],
    },
    {
      titulo: "Montaje paso a paso",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Crea las audiencias personalizadas",
              detalle:
                "En el administrador: audiencia personalizada → interacciones. Arma 2-3: quienes vieron tus videos (últimos 30-60 días), quienes interactuaron con tu perfil de IG, y quienes visitaron tu web si tienes píxel.",
            },
            {
              titulo: "Campaña chica, objetivo mensajes o tráfico al DM",
              detalle:
                "$5-10 diarios bastan porque la audiencia es pequeña y caliente. El costo por resultado aquí suele ser una fracción del de audiencias frías.",
            },
            {
              titulo: "2-3 creativos técnicos rotando",
              detalle:
                "Con audiencias chicas la frecuencia sube rápido (la misma persona ve el ad varias veces). Rota creativos cada 2-3 semanas para no quemarte.",
            },
            {
              titulo: "Cierra en el DM con guion humano",
              detalle:
                "Respuesta rápida, con guion de conversación (no de robot): valor primero, pregunta de contexto, y la oferta cuando el problema está claro.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "El indicador de esta campaña son las CONVERSACIONES INICIADAS y las ventas que salen de ellas — no el alcance ni los likes. Si la frecuencia pasa de 4-5 y las conversaciones caen, toca creativo nuevo, no más presupuesto.",
        },
        {
          tipo: "cita",
          texto: "El orgánico te presenta. El Follow Me Ad te recuerda. El DM te cobra.",
        },
      ],
    },
  ],

  // ── Creativos para ads ─────────────────────────────────────────
  "creativos-para-ads": [
    {
      titulo: "La regla madre: que no parezca anuncio",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El usuario huele el anuncio a un scroll de distancia y lo salta sin culpa. Los creativos que rinden hoy se ven como CONTENIDO: gancho en el primer segundo, formato vertical nativo, subtítulos, ritmo de reel. La única diferencia con tu orgánico es la pauta detrás. Por eso la fábrica es la misma: tu sistema de contenido produce las piezas, y las mejores se convierten en ads.",
        },
        {
          tipo: "parrafo",
          texto:
            "Corolario práctico: tu mejor laboratorio de ads es tu orgánico. Un post que funcionó orgánicamente ya pasó la prueba más difícil — competir sin presupuesto. Escalarlo con pauta es apostar con el juego arreglado a tu favor.",
        },
      ],
    },
    {
      titulo: "Anatomía del creativo que convierte",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Segundo", "Qué pasa", "Regla"],
          filas: [
            [
              "0-1s",
              "El gancho",
              "Visual + textual a la vez. De los 10 tipos, en ads rinden más: contradicción, cifra específica, y dolor/urgencia.",
            ],
            [
              "1-3s",
              "La promesa",
              "Qué gana el que se queda. Si a los 3 segundos no está claro para quién es, ya se fue.",
            ],
            [
              "3-20s",
              "La prueba",
              "Demo, caso, antes/después, proceso. En ads la prueba pesa más que en orgánico: te están evaluando, no entreteniendo.",
            ],
            [
              "Final",
              "UN CTA",
              "Una sola acción, dicha explícita. «Escríbeme [palabra]» o «regístrate aquí» — nunca dos opciones.",
            ],
          ],
        },
        {
          tipo: "lista",
          items: [
            "Subtítulos siempre: la mayoría mira sin audio.",
            "Ritmo de edición de reel: cortes cada 1-3 segundos (tus reglas de edición aplican íntegras aquí).",
            "El logo discreto — la marca se nota en el estilo, no en el tamaño del logo.",
          ],
        },
      ],
    },
    {
      titulo: "Iterar creativos, no audiencias",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuando un ad se agota — la frecuencia sube, el costo por resultado sube — el reflejo común es cambiar la audiencia. Casi siempre es el reflejo equivocado: se cambia el CREATIVO. La audiencia no se aburrió de ti; se aburrió de ese video.",
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · fábrica de variantes con Claude",
          contenido:
            "Este creativo me está funcionando en Meta Ads: [pega el guion del ad ganador + sus números].\n\nGenérame 4 variantes para cuando se agote:\n1. MISMO mensaje, gancho de otro tipo (elige de: contradicción, cifra, misterio, promesa, autoridad, urgencia, novedad, comparación, desafío — distinto al actual).\n2. Mismo gancho, formato distinto (si era talking head → demo con voz en off, etc.).\n3. El mismo concepto contado desde un caso/resultado concreto.\n4. La versión «respuesta a la objeción»: ataca la duda #1 de mi cliente, que es [dila].\n\nCada variante con: gancho textual exacto + estructura por segundos + CTA. Mi tono y mis reglas están en el documento de marca.",
        },
        {
          tipo: "nota",
          texto:
            "Cuando un creativo gana, NO lo toques — ni «mejoras chiquitas». Escálalo subiendo presupuesto gradual (20-30% cada pocos días) y prepara las variantes para el relevo. El creativo ganador se cuida como lo que es: un activo que imprime plata.",
        },
      ],
    },
  ],

  // ── Medir lo que vende ─────────────────────────────────────────
  "medir-lo-que-vende": [
    {
      titulo: "Likes no pagan facturas",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El error de medición número uno: mirar métricas de aplauso (likes, alcance, vistas) para decidir sobre plata. La pauta se decide con UNA pregunta: ¿cuánto me cuesta cada resultado de negocio? Una conversación iniciada, un registro, una venta. Todo lo demás es contexto.",
        },
        {
          tipo: "parrafo",
          texto:
            "Y para responder esa pregunta necesitas medición instalada ANTES de gastar el primer sol. Sin píxel ni eventos, Meta optimiza a ciegas y tú decides a ciegas — doble pérdida.",
        },
      ],
    },
    {
      titulo: "La medición mínima según cómo vendes",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Si vendes por…", "Qué instalar", "Qué mides"],
          filas: [
            [
              "WhatsApp / DM",
              "Campañas con objetivo mensajes + una palabra clave por campaña («quiero info del taller»)",
              "Costo por conversación iniciada, y en tu registro manual: cuántas conversaciones → ventas.",
            ],
            [
              "Página web con formulario",
              "Píxel de Meta en la web + evento de registro (Lead) al enviar",
              "Costo por registro, y qué % de registros se vuelve cliente.",
            ],
            [
              "Checkout online (Hotmart, tienda)",
              "Píxel + evento de compra (la mayoría de plataformas lo integran con un clic)",
              "Costo por venta y ROAS: por cada sol de pauta, cuántos vuelven.",
            ],
          ],
        },
        {
          tipo: "nota",
          texto:
            "El píxel se instala UNA vez y trabaja para siempre — además deja que Meta construya audiencias de visitantes para tus Follow Me Ads. Si tienes web y no tiene píxel, eso va primero que cualquier campaña.",
        },
      ],
    },
    {
      titulo: "El tablero de una sola fila",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "No necesitas veinte columnas. Necesitas esta fila por campaña, revisada cada 3-4 días:",
        },
        {
          tipo: "lista",
          items: [
            "GASTADO: cuánto llevas invertido.",
            "RESULTADOS: cuántas acciones de negocio (conversaciones/registros/ventas).",
            "COSTO POR RESULTADO: la división de las dos anteriores. EL número.",
            "FRECUENCIA: cuántas veces vio el ad la misma persona (pasa de 4-5 → creativo nuevo).",
            "Y fuera de Meta, en tu hoja: de esos resultados, ¿cuántos se volvieron PLATA? El costo por venta real es el juez final.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · lee mis números y dime qué hacer",
          contenido:
            "Te pego los números de mis campañas de Meta de los últimos [7/14] días: [pega gastado, resultados, costo por resultado, frecuencia por campaña — y cuántas ventas reales salieron].\n\nMi contexto: vendo [producto] a [precio], y una venta me deja [margen aprox].\n\n1. Dime campaña por campaña: ¿escalar, mantener, cambiar creativo o apagar? Con el porqué en una línea.\n2. ¿Cuál es mi costo por venta REAL y cuánto margen me deja? ¿La pauta se paga sola?\n3. ¿Qué UNA cosa pruebo esta semana? (una sola variable).\n\nSé frío: si algo hay que apagar, dilo sin diplomacia.",
        },
        {
          tipo: "cita",
          texto: "El que mide aplausos optimiza el show. El que mide ventas optimiza el negocio.",
        },
      ],
    },
  ],

  // ── Los 10 ganchos ─────────────────────────────────────────────
  "los-10-ganchos": [
    {
      titulo: "El primer segundo decide todo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un reel sin gancho es un reel muerto, aunque el resto sea brillante: nadie llega al resto. El gancho es la compra de atención — tres segundos donde el cerebro del espectador decide si tu video existe o no. Y como toda compra, tiene técnica: estos son los diez tipos que uso en guiones reales, con el resorte psicológico que activa cada uno.",
        },
      ],
    },
    {
      titulo: "Los 10 tipos, con su resorte",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["#", "Tipo", "Cómo suena", "Resorte psicológico"],
          filas: [
            ["1", "Dopamínico", "«Deja de publicar todos los días si quieres crecer»", "Contradice una creencia → interrupción de patrón: el cerebro NECESITA resolver la disonancia."],
            ["2", "Cuantitativo", "«Cómo facturé S/30k con solo reels»", "La cifra específica vuelve creíble la promesa. 30k > «mucho dinero», siempre."],
            ["3", "Curiosidad", "«El error de 30 segundos que mata tus videos»", "Abre un vacío de información que pide cierre. El misterio retiene."],
            ["4", "Promesa", "«100k seguidores en 42 días»", "Resultado claro + plazo claro = aspiración con forma."],
            ["5", "Autoridad personal", "«Cómo conseguí 1M de vistas sin pauta»", "El «cómo lo hice yo» — experiencia vivida > teoría."],
            ["6", "Exclusividad", "«Solo 5 personas van a recibir esto»", "Grupo selecto → pertenencia y escasez a la vez."],
            ["7", "Dolor / urgencia", "«Si ignoras esto, tu cuenta lo paga»", "Pérdida inminente. El miedo a perder pesa más que el deseo de ganar."],
            ["8", "Novedad", "«La IA que hace un corto de cine en 15 segundos»", "Lo nuevo dispara FOMO tecnológico: nadie quiere quedarse atrás."],
            ["9", "Comparación", "«Producción tradicional vs IA: quién gana»", "El contraste ordena el mundo — y posiciona tu lado."],
            ["10", "Desafío / participación", "«Comenta ESTRUCTURA y te la mando»", "Acción inmediata + reciprocidad. Además alimenta el algoritmo con comentarios."],
          ],
        },
      ],
    },
    {
      titulo: "Cómo elegir el gancho (no es al azar)",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Por objetivo: atracción → dopamínico, novedad, comparación (paran el scroll de desconocidos). Autoridad → cuantitativo, autoridad personal (construyen respeto). Conversión → dolor/urgencia, exclusividad, desafío (empujan la acción).",
            "El gancho es visual Y textual a la vez: lo que se VE en el primer frame debe intrigar tanto como lo que se dice. Un gancho hablado sobre un plano aburrido es medio gancho.",
            "El gancho promete; el video DEBE pagar. Gancho fuerte + contenido flojo = audiencia estafada que no vuelve. La deuda del gancho se paga siempre.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Ejercicio · 5 ganchos por guion",
          contenido:
            "Toma este guion/idea de video: [pégalo].\n\nEscríbeme 5 ganchos de TIPOS DISTINTOS para esta misma pieza (elige los 5 que mejor calcen de: dopamínico, cuantitativo, curiosidad, promesa, autoridad personal, exclusividad, dolor/urgencia, novedad, comparación, desafío).\n\nPara cada uno:\n- El gancho TEXTUAL exacto (lo que se dice/lee en el segundo 0-1).\n- El gancho VISUAL (qué se ve en el primer frame).\n- Por qué este tipo calza con este contenido.\n\nRegla: cada gancho debe poder cumplirse con el contenido real del video. Nada de promesas que el video no paga.",
        },
        {
          tipo: "cita",
          texto: "El que domina el gancho compra la atención al por mayor. El que no, publica cartas de amor que nadie abre.",
        },
      ],
    },
  ],

  // ── Estructuras que retienen ───────────────────────────────────
  "estructuras-que-retienen": [
    {
      titulo: "El gancho compra 3 segundos; la estructura, el video entero",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Después del gancho viene el problema real: que se queden. La retención no es suerte ni carisma — es arquitectura. Estas son las cuatro estructuras narrativas con las que armo prácticamente todo, cada una con su trabajo específico:",
        },
        {
          tipo: "tabla",
          columnas: ["Estructura", "Fórmula", "Cuándo usarla"],
          filas: [
            [
              "GVCTA",
              "Gancho → Valor → CTA",
              "La base del contenido educativo: prometes, entregas, diriges. El 60% de tu grilla vive aquí.",
            ],
            [
              "GHMA",
              "Gancho → Historia → Moraleja → Acción",
              "Cuando cuentas experiencia propia. La historia hace memorable lo que el consejo suelto no logra.",
            ],
            [
              "DEI",
              "Demo → Explicación → Invitación",
              "Para mostrar IA o proceso con efecto «wow»: primero el resultado que impacta, después el cómo, al final la puerta.",
            ],
            [
              "PSPCTA",
              "Problema → Solución → Prueba → CTA",
              "La estructura de venta directa. El orden importa: la prueba va ANTES del CTA, nunca después.",
            ],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Y sobre todas, el principio Hook–Retain–Reward: gancho que promete, retención activa en el desarrollo (loops abiertos, ritmo, tensión), y una recompensa REAL al final. El espectador que llega al final y siente que valió la pena es el que te sigue, te guarda y te compra.",
        },
      ],
    },
    {
      titulo: "La fórmula de storytelling corto (7 pasos)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Para las piezas de historia (GHMA y derivados), esta es mi secuencia de 7 pasos — cabe en 45-60 segundos:",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "Contexto inmediato", detalle: "Arranca en medio de la acción, no en el principio de los tiempos. «Estaba por perder al cliente más grande que tenía» — no «hace tres años, cuando empecé…»." },
            { titulo: "Personaje + deseo", detalle: "Quién y qué quería. Una línea." },
            { titulo: "Obstáculo", detalle: "Lo que se interpuso. Aquí vive la tensión que retiene." },
            { titulo: "Descubrimiento / giro", detalle: "El método, la herramienta, el insight que cambió el juego." },
            { titulo: "Resultado rápido", detalle: "La métrica o el testimonio. Concreto, verificable." },
            { titulo: "Moraleja", detalle: "La lección en una frase — lo que el espectador se lleva aunque olvide la historia." },
            { titulo: "CTA", detalle: "Una sola acción. Siempre." },
          ],
        },
      ],
    },
    {
      titulo: "Las reglas que sostienen todo",
      bloques: [
        {
          tipo: "lista",
          items: [
            "UN concepto por video. Si tu guion explica tres ideas, son tres videos. Saturar una pieza es la forma más cara de perder audiencia.",
            "La estructura se elige por OBJETIVO: ¿esta pieza atrae, construye autoridad o convierte? Si no sabes responder, el guion no está listo.",
            "El CTA existe siempre — hasta en la pieza más orgánica. Sin dirección al final, el video entretiene y muere.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · guion con estructura elegida",
          contenido:
            "Escríbeme un guion con esta configuración:\n\nCONCEPTO (uno solo): [la idea]\nOBJETIVO: [atracción / autoridad / conversión]\nESTRUCTURA: [GVCTA / GHMA / DEI / PSPCTA — o dime tú cuál calza y por qué]\nGANCHO: [tipo elegido, o pídeme 3 opciones]\nDURACIÓN: [30/45/60 seg]\n\nFormato de entrega: tabla de dos columnas — AUDIO (lo que digo, mi tono del documento de marca) y VISUAL (qué se ve en cada bloque, con los cortes marcados).\nRegla: retención activa — al menos un loop abierto que se cierra al final.",
        },
      ],
    },
  ],

  // ── Edición con ritmo ──────────────────────────────────────────
  "edicion-con-ritmo": [
    {
      titulo: "La retención se edita",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Dos videos con el mismo guion pueden rendir 10x distinto por la edición. No es magia: el cerebro del espectador decide quedarse frame a frame, y la edición es el arte de renovarle la atención antes de que se le acabe. Estas son las reglas que uso en CapCut para todo lo que produzco:",
        },
        {
          tipo: "lista",
          items: [
            "CORTES CADA 1-3 SEGUNDOS. Cada corte resetea la atención. Un plano de 8 segundos sin cambios es una invitación a irse.",
            "SUBTÍTULOS SIEMPRE, en colores contrastantes, con las palabras clave destacadas. La mayoría mira sin audio — sin subtítulos no existes.",
            "ZOOMS en los puntos importantes: el punch visual que subraya la frase que importa.",
            "B-ROLL ESTRATÉGICO: visualiza lo que dices. Si hablas de resultados, se VEN los resultados — no tu cara diciendo que existen.",
            "AUDIO LIMPIO Y BUENA LUZ: lo no negociable. El espectador perdona imagen imperfecta; no perdona no entenderte.",
            "LOGO EN ESQUINA, presente sin gritar. La marca se reconoce por el estilo, no por el tamaño del logo.",
          ],
        },
      ],
    },
    {
      titulo: "El ritmo cambia por plataforma",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Plataforma", "Ritmo", "Por qué"],
          filas: [
            [
              "TikTok / Reels",
              "Edición agresiva: cortes rápidos, zooms, textos que entran y salen",
              "Compites contra el scroll más impaciente del mundo. La densidad visual retiene.",
            ],
            [
              "YouTube",
              "Más respiración: cortes presentes pero con aire, planos que duran",
              "El espectador llegó con intención. La agresividad de TikTok aquí cansa.",
            ],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Consecuencia práctica: el MISMO guion se edita distinto según dónde vive. Reciclar el export exacto entre plataformas es dejar retención sobre la mesa — al menos ajusta ritmo y formato.",
        },
      ],
    },
    {
      titulo: "El flujo de edición que no te quema",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "Edita en lote", detalle: "Un bloque de 2-3 horas editando 4-5 piezas rinde más que editar una cada día. El ojo entra en ritmo." },
            { titulo: "Primera pasada: estructura", detalle: "Cortes gruesos, quitar aire, que la historia fluya. Sin efectos todavía." },
            { titulo: "Segunda pasada: retención", detalle: "Zooms, subtítulos, b-roll, sonidos. Aquí se aplica la lista de arriba." },
            { titulo: "Control final: checklist", detalle: "Antes de exportar, pásala por el checklist «parece agencia» (está en esta bóveda): los detalles de acabado que separan «video de IA» de pieza publicitaria." },
          ],
        },
        {
          tipo: "cita",
          texto: "El guion decide qué se dice. La edición decide cuánta gente lo escucha.",
        },
      ],
    },
  ],

  // ── Calendario: tu mes en una tarde ────────────────────────────
  "calendario-mes-en-una-tarde": [
    {
      titulo: "El enemigo es la decisión diaria",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La inconsistencia mata más cuentas que el mal contenido — y la causa de la inconsistencia casi nunca es pereza: es que decidir QUÉ publicar cada día agota. La solución es estructural: separar la decisión de la ejecución. Una tarde al mes decides TODO; el resto del mes solo ejecutas. Este proyecto es esa tarde, sistematizada.",
        },
      ],
    },
    {
      titulo: "Paso 1 · Los pilares por objetivo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Todo contenido tiene UN trabajo. Mi reparto para una cuenta que vende servicios o formación:",
        },
        {
          tipo: "tabla",
          columnas: ["Pilar", "Trabajo", "Formatos típicos", "% del mes"],
          filas: [
            [
              "Atracción",
              "Que te descubran",
              "Ganchos fuertes, demos con «wow», comparaciones, tendencias del nicho",
              "~50%",
            ],
            [
              "Autoridad",
              "Que te respeten",
              "Frameworks, casos con proceso, análisis, «cómo lo hice»",
              "~35%",
            ],
            [
              "Conversión",
              "Que te compren",
              "CTA directo, historias de transformación, oferta con urgencia real",
              "~15%",
            ],
          ],
        },
        {
          tipo: "nota",
          texto:
            "La proporción importa: una cuenta que solo atrae junta curiosos que no compran; una que solo vende espanta antes de convencer. El embudo se alimenta por los tres lados a la vez.",
        },
      ],
    },
    {
      titulo: "Paso 2 · La matriz del mes (con Claude)",
      bloques: [
        {
          tipo: "copiable",
          etiqueta: "Prompt · arma mi matriz mensual",
          contenido:
            "Vamos a armar mi mes de contenido en una sesión. Mi documento de marca ya lo tienes; además: público [X] veces por semana en [plataformas].\n\n1. Con mis pilares (atracción ~50%, autoridad ~35%, conversión ~15%), dime cuántas piezas de cada tipo salen este mes.\n2. Arma LA MATRIZ en tabla: fecha → tema → tipo de gancho → estructura (GVCTA/GHMA/DEI/PSPCTA) → objetivo. Temas variados sin repetir enfoque en la misma semana.\n3. Si tengo datos del mes pasado te los pego — prioriza lo que la evidencia respalda (mira mi matriz de contenido si existe).\n4. Marca con ★ las 3 piezas más importantes del mes (las que empujan mi oferta actual: [dila]).\n\nTodavía NO escribas guiones — primero apruebo la matriz.",
        },
      ],
    },
    {
      titulo: "Paso 3 · Guiones en lote y a ejecutar",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "Guiones en una sola sesión", detalle: "Matriz aprobada → «escribe los guiones de la semana 1 y 2». Misma sesión, mismo contexto: la voz sale consistente y el costo por guion baja." },
            { titulo: "Grabación en lote", detalle: "Un bloque de grabación por semana (o dos al mes si eres valiente): misma luz, misma energía, 4-6 piezas por sesión." },
            { titulo: "Edición en lote", detalle: "Su propio bloque, con las reglas de ritmo (guía en esta bóveda)." },
            { titulo: "Cierre de mes: 15 minutos", detalle: "Qué rindió, qué no, y esa evidencia alimenta la matriz del mes siguiente. El sistema aprende o no es sistema." },
          ],
        },
        {
          tipo: "cita",
          texto: "El creador amateur decide cada día. El profesional decidió hace tres semanas — hoy solo ejecuta.",
        },
      ],
    },
  ],

  // ── El embudo del reel al cliente ──────────────────────────────
  "embudo-del-reel-al-cliente": [
    {
      titulo: "El contenido sin embudo es entretenimiento gratis",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Puedes tener vistas, seguidores y comentarios — y cero clientes. No es mala suerte: es que las vistas no se convierten solas. El embudo es el circuito que transforma atención en conversaciones y conversaciones en ventas. El mío tiene cinco etapas, y cada una tiene UN trabajo y UNA métrica:",
        },
        {
          tipo: "tabla",
          columnas: ["Etapa", "Qué pasa", "Métrica"],
          filas: [
            [
              "1 · Atracción",
              "Reels con gancho fuerte te ponen frente a desconocidos. El CTA apunta al lead magnet o a una palabra clave en comentarios.",
              "Alcance + conversaciones/leads generados",
            ],
            [
              "2 · Nutrición",
              "DMs (o correos) con valor real: frameworks, casos, respuestas útiles. Aquí te vuelves persona, no cuenta.",
              "Respuestas y conversaciones activas",
            ],
            [
              "3 · Conversión",
              "La oferta, presentada a quien ya recibió valor: llamada, taller o venta directa según tu producto.",
              "Ventas / agendas",
            ],
            [
              "4 · Seguimiento",
              "El registro de cada lead y en qué etapa está. Hoja de cálculo basta para empezar; lo importante es que exista.",
              "Leads sin respuesta > 48h (debería ser ~0)",
            ],
            [
              "5 · Remarketing",
              "Follow Me Ads ($5-10/día) persiguen a quien vio pero no escribió (guía completa en esta bóveda).",
              "Costo por conversación recuperada",
            ],
          ],
        },
      ],
    },
    {
      titulo: "El eslabón que casi todos rompen: el DM",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El 80% del resultado está en qué pasa DESPUÉS de que alguien comenta o escribe. Y ahí es donde la mayoría pierde la venta: respuesta tardía, respuesta robótica, o venta a quemarropa al primer mensaje.",
        },
        {
          tipo: "lista",
          items: [
            "Velocidad: el que comenta hoy está caliente hoy. Mañana es un extraño otra vez.",
            "Guion humano, no robótico: entrega lo prometido → pregunta de contexto genuina («¿para tu marca o para clientes?») → escucha → y la oferta recién cuando el problema está claro.",
            "No vendas a quien no calza: decir «esto no es para ti todavía, empieza por aquí» construye más autoridad que diez ventas forzadas.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · mi guion de conversación de DM",
          contenido:
            "Diséñame el guion de conversación de DM para mi embudo.\n\nMI OFERTA: [qué vendo + precio]\nEL GATILLO: la gente comenta [palabra clave] en mis reels para recibir [lead magnet/info]\nMI CLIENTE IDEAL: [quién sí]\nQUIÉN NO CALZA: [quién no — y a dónde lo derivo]\n\nDame el flujo completo:\n1. Primera respuesta (entrega lo prometido + abre conversación, sin vender).\n2. 2-3 preguntas de contexto para entender su situación.\n3. El puente a la oferta SOLO si califica (cómo suena, con mi tono).\n4. La respuesta amable para quien no califica.\n5. El mensaje de seguimiento si deja de responder (uno solo, a las 48h).\n\nQue suene a mí escribiendo, no a bot. Mi tono está en el documento de marca.",
        },
      ],
    },
    {
      titulo: "Móntalo esta semana (versión mínima)",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "Define UNA palabra clave y UN lead magnet", detalle: "Algo que tu cliente ideal quiera de verdad: una plantilla, un checklist, una mini-guía. Lo tuyo, no genérico." },
            { titulo: "Ponle el CTA a tus próximos 4 reels", detalle: "«Comenta [palabra] y te lo mando.» El mismo CTA, cuatro piezas — el embudo necesita volumen para aprender." },
            { titulo: "Abre tu hoja de seguimiento", detalle: "Nombre, fecha, de qué reel vino, etapa, próxima acción. Cinco columnas. El CRM sofisticado llega después; la disciplina, hoy." },
            { titulo: "A las 2 semanas, mira el circuito completo", detalle: "¿Cuántos comentaron → cuántos conversaron → cuántos compraron? El eslabón más débil es tu trabajo del mes siguiente." },
          ],
        },
        {
          tipo: "cita",
          texto: "Las vistas son aplausos. Las conversaciones son oportunidades. Las ventas son el negocio. El embudo convierte lo primero en lo último — o no tienes embudo, tienes público.",
        },
      ],
    },
  ],
};
