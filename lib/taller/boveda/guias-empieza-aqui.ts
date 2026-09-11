import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// EMPIEZA AQUÍ — la entrada del portal
//
// Es la primera tarjeta del catálogo, antes de la Masterclass. Su
// trabajo es que alguien que acaba de entrar sepa en dos minutos qué
// tiene delante, en qué orden usarlo y qué va a poder hacer al salir.
//
// ESTÁ ABIERTO A PROPÓSITO: para agregar una pieza nueva, escribe sus
// secciones acá abajo, registra el recurso en BOVEDA_EMPIEZA_AQUI
// (content.ts) y agrega una línea a MODULOS_EMPIEZA_AQUI. Nada más.
//
// Ideas que quedaron pendientes de decidir: un recorrido en video del
// portal, las reglas de la comunidad, y un "qué traer a la primera
// sesión en vivo".
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_EMPIEZA_AQUI: Record<string, SeccionRecurso[]> = {
  // ── BIENVENIDA ────────────────────────────────────────────────
  bienvenida: [
    {
      titulo: "Lo que tienes delante",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Esto no es un curso de herramientas. Las herramientas cambian cada tres meses y quien solo aprendió a apretar botones vuelve a empezar de cero cada vez que sale una versión nueva. Lo que vas a construir acá es un criterio y un sistema: cómo se piensa una pieza publicitaria antes de generarla, y cómo se produce después sin depender de que la suerte te dé un buen resultado.",
        },
        {
          tipo: "parrafo",
          texto:
            "Todo lo que está adentro sale de trabajo real con marcas que pagan: grillas mensuales, campañas de producto, piezas que se aprobaron y piezas que me devolvieron. Cuando digo que algo funciona es porque se entregó; cuando digo que algo no, es porque me costó una corrección.",
        },
        {
          tipo: "cita",
          texto:
            "La IA no te hace creativo. Te hace rápido. Si lo que tenías era malo, ahora lo tienes malo y en volumen.",
        },
      ],
    },
    {
      titulo: "Para quién es",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Dueño de negocio que ya vende, pero cuyo contenido no se parece al nivel de lo que ofrece.",
            "Quien produce contenido por encargo y quiere dejar de competir por precio.",
            "Equipos de marketing que tercerizan todo y quieren resolver adentro lo que hoy pagan afuera.",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Y para quién no: si buscas un botón que te genere campañas solo, esto te va a frustrar. Acá hay decisiones que se toman a mano. La IA ejecuta; el criterio sigue siendo tuyo.",
        },
      ],
    },
    {
      titulo: "La promesa, dicha en concreto",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Al terminar tienes tu Cerebro Creativo armado —una IA que razona con criterio publicitario en vez de responder con el promedio de internet—, una grilla de contenido que sale de una estrategia y no de la inspiración del lunes, y la capacidad de producir las piezas tú mismo: imagen, video, voz y edición.",
        },
        {
          tipo: "nota",
          texto:
            "No prometo resultados de venta. Eso depende de tu oferta, tu precio y tu mercado. Prometo que vas a poder producir a un nivel que hoy tienes que contratar afuera.",
        },
      ],
    },
  ],

  // ── POR DÓNDE EMPEZAR ─────────────────────────────────────────
  "por-donde-empezar": [
    {
      titulo: "La regla del orden",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El error más común de quien entra a un portal con mucho material es empezar por lo que más brilla. Casi siempre eso es la parte de producción: generar un video, hacer una foto de producto. Se siente productivo y no lleva a ningún lado, porque producir sin estrategia es fabricar piezas bonitas que no venden nada.",
        },
        {
          tipo: "parrafo",
          texto:
            "El orden correcto es aburrido y funciona: primero decides, después ejecutas. La Masterclass enseña a decidir. IA en Acción enseña a ejecutar. Si los inviertes, vas a producir mucho y a avanzar poco.",
        },
      ],
    },
    {
      titulo: "Tu primera semana, día por día",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Día 1 · Mira la Masterclass completa, sin pausar para hacer",
              detalle:
                "Una pasada entera para tener el mapa. No armes nada todavía. Anota las tres cosas que más te chocaron con cómo trabajas hoy.",
            },
            {
              titulo: "Día 2 · Arma tu Cerebro Creativo",
              detalle:
                "Vuelve al módulo donde se construye y hazlo con TU marca, no con un ejemplo. Este es el activo: todo lo demás se apoya acá.",
            },
            {
              titulo: "Día 3 · Lee «Conceptos básicos» y «El stack completo» en IA en Acción",
              detalle:
                "Dos artículos. Te ahorran semanas de probar herramientas al azar y entender por qué tus resultados cambian entre corrida y corrida.",
            },
            {
              titulo: "Día 4 · Baja tu estrategia a una grilla de contenido",
              detalle:
                "Un mes de piezas, definidas en una sola sesión. Todavía sin generar nada.",
            },
            {
              titulo: "Día 5 · Produce UNA pieza, completa",
              detalle:
                "De la idea al archivo final, con edición y subtítulos. Una pieza terminada enseña más que veinte empezadas.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Si solo tienes una hora a la semana, haz el día 2. El Cerebro Creativo armado es lo único que te cambia el resultado aunque no hagas nada más.",
        },
      ],
    },
    {
      titulo: "Si ya sabes generar",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Mucha gente llega sabiendo usar las herramientas y con un problema distinto: produce cosas que se ven bien y que igual no le compran. Si ese es tu caso, sáltate la parte de producción y ve directo a la estrategia y al Cerebro Creativo. Después vuelve a IA en Acción por el artículo de control de calidad, que es el que separa una pieza que impresiona de una que se entrega.",
        },
        {
          tipo: "enlace",
          url: "/taller/recursos/errores-que-delatan-ia",
          texto: "Los errores que delatan una imagen IA y cómo taparlos",
          nota: "El checklist que corro antes de mandar cualquier pieza a un cliente.",
        },
      ],
    },
    {
      titulo: "Lo que no hay que hacer",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Consumir todo el material antes de aplicar nada. La bóveda tiene más de setenta guías: no es una lista de tareas, es una biblioteca de consulta.",
            "Armar el Cerebro Creativo con una marca de ejemplo «para practicar». Ármalo con la tuya o no lo armes.",
            "Generar sin guion. Toda pieza que hice sin guion terminó en la papelera, incluso las que se veían bien.",
            "Esperar a entenderlo todo para publicar la primera pieza.",
          ],
        },
      ],
    },
  ],

  // ── QUÉ VAS A PODER HACER ─────────────────────────────────────
  "que-vas-a-poder-hacer": [
    {
      titulo: "El antes y el después",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Hoy", "Al terminar"],
          filas: [
            [
              "Publicas cuando se te ocurre algo",
              "Tienes un mes de contenido definido antes de que empiece el mes",
            ],
            [
              "Le pides ideas a la IA y te devuelve lugares comunes",
              "Tu Cerebro Creativo razona con criterio publicitario y te discute las ideas flojas",
            ],
            [
              "Contratas cada foto y cada video",
              "Produces imagen, video y voz tú mismo, y contratas solo lo que de verdad necesita rodaje",
            ],
            [
              "Entregas lo que salió",
              "Entregas lo que pasó un checklist, y sabes qué descartar",
            ],
            [
              "Compites por precio",
              "Cobras por criterio, y puedes explicar por qué cada pieza es como es",
            ],
          ],
        },
      ],
    },
    {
      titulo: "Las cinco capacidades concretas",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Construir un Cerebro Creativo con el ADN de una marca",
              detalle:
                "Una IA cargada con criterio de oficio y con la voz específica de tu marca, que deja de responder con el promedio de internet.",
            },
            {
              titulo: "Convertir una estrategia en grilla",
              detalle:
                "Bajar un posicionamiento a piezas concretas con fecha, formato y objetivo. Sin depender de la inspiración.",
            },
            {
              titulo: "Producir la pieza completa",
              detalle:
                "Imagen dirigida, video con movimiento creíble, voz y ensamble final. De la idea al archivo listo para publicar.",
            },
            {
              titulo: "Sostener consistencia",
              detalle:
                "Que el personaje sea el mismo en la escena 1 y en la 12, que los seis retratos del equipo parezcan del mismo día, que la campaña se vea como una sola cosa.",
            },
            {
              titulo: "Controlar la calidad antes de entregar",
              detalle:
                "Saber qué mirar y qué descartar. Es lo que hace la diferencia entre un aficionado con buenas herramientas y alguien a quien le pagan.",
            },
          ],
        },
      ],
    },
    {
      titulo: "Cómo sabes que lo lograste",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "No por haber visto todos los videos. Por estas tres señales concretas:",
        },
        {
          tipo: "lista",
          items: [
            "Puedes producir una pieza terminada, de la idea al archivo final, en una sola sesión de trabajo.",
            "Puedes explicar por qué cada decisión de esa pieza es como es: por qué esa luz, ese plano, ese texto.",
            "Alguien la ve y pregunta quién la hizo.",
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Antes y después real de un cliente: pieza propia del cliente antes de trabajar juntos, y la pieza entregada después.",
          pie: "El cambio que se nota sin explicar nada.",
        },
      ],
    },
    {
      titulo: "Lo que esto no te va a dar",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Clientes por el solo hecho de terminarlo. Producir mejor te da con qué vender, no a quién venderle.",
            "Un reemplazo del rodaje cuando la marca necesita rodaje de verdad. Esto amplía lo que puedes hacer, no lo sustituye todo.",
            "Resultados sin publicar. El sistema funciona cuando sale a la calle.",
          ],
        },
        {
          tipo: "cita",
          texto:
            "El material no hace el trabajo. Lo hace más corto.",
        },
      ],
    },
  ],

  // ── CÓMO ESTÁ ORGANIZADO ──────────────────────────────────────
  "como-esta-organizado": [
    {
      titulo: "Las zonas del portal",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Zona", "Qué es", "Cuándo entras"],
          filas: [
            [
              "Cursos",
              "La Masterclass y los cursos de ejecución, en módulos ordenados",
              "Al principio, y cada vez que necesites el orden completo",
            ],
            [
              "Recursos (la bóveda)",
              "Más de setenta guías a fondo, plantillas, repos y packs de prompts",
              "Cuando tengas una duda puntual. Es consulta, no lectura de corrido",
            ],
            [
              "En vivo",
              "Las sesiones en directo y su grabación posterior",
              "Si tienes acceso al nivel en vivo",
            ],
            [
              "Calendario",
              "Qué viene y cuándo, con recordatorio a tu Google Calendar",
              "Al empezar la semana",
            ],
            [
              "Novedades",
              "Lo que se agregó al portal desde la última vez",
              "Una vez al mes basta",
            ],
            [
              "La noticIA",
              "Portal de noticias de IA aplicada a publicidad, se actualiza solo todos los días",
              "Cuando necesites saber qué cambió en las herramientas",
            ],
          ],
        },
      ],
    },
    {
      titulo: "Cursos: qué hay en cada uno",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Masterclass de Creatividad Publicitaria IA — el sistema completo: estrategia, Cerebro Creativo, producción y cómo cobrarlo. Es el ancla, y es donde sale mi cara.",
            "IA en Acción — la ejecución paso a paso. Está repartido en tres formatos: lo que se lee, lo que se ve conmigo a cámara y lo que se ve en grabación de pantalla. La parte escrita ya está disponible.",
            "StorySelling Pro — el método CAT para pasar de la idea al guion sin partir de cero cada vez.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "Los módulos que todavía no están grabados se ven en el temario como pendientes. No es un error: es el mapa de lo que viene, para que sepas qué esperar.",
        },
      ],
    },
    {
      titulo: "Cómo crece esto",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El portal no es un producto cerrado que se compra una vez y queda congelado. Cada vez que resuelvo algo nuevo en una entrega real —una herramienta que cambió, un método que mejoró, un error nuevo que aprendí a evitar— entra acá. Por eso IA en Acción está pensado para actualizarse: lo escrito se corrige en minutos y lo grabado se suma encima cuando hace falta.",
        },
        {
          tipo: "parrafo",
          texto:
            "La pestaña Novedades es donde ver qué se agregó desde tu última visita.",
        },
      ],
    },
    {
      titulo: "Si te trabas",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Antes de escribirme, revisa dos cosas: si tu duda es de criterio, está en la Masterclass; si es de ejecución, está en IA en Acción o en la bóveda. La mayoría de las preguntas que me llegan ya tienen respuesta escrita, y encontrarla tú te la deja aprendida.",
        },
        {
          tipo: "parrafo",
          texto:
            "Si aun así no aparece, escríbeme por WhatsApp con la pieza concreta que estás intentando sacar. «No me sale» no se puede responder; «este prompt me da esto y quiero esto otro» se resuelve en un minuto.",
        },
      ],
    },
  ],
};
