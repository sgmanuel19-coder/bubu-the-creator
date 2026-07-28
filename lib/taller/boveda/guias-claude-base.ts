import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// GUÍAS A FONDO — Claude, nivel base (8 guías)
// Copy 100% RESUELTO: escrito desde el método de Manuel. Los temas
// coinciden con lo que la comunidad busca; el contenido es original.
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_CLAUDE_BASE: Record<string, SeccionRecurso[]> = {
  // ── Skills de Claude · instala tu primer equipo ────────────────
  "skills-primer-equipo": [
    {
      titulo: "Qué es una skill (sin humo)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una skill es una carpeta con instrucciones que convierte a Claude en especialista de UNA tarea: armar presentaciones, trabajar hojas de cálculo, diseñar, editar guiones. No la programas. La instalas, y desde ese momento Claude sabe hacer ese trabajo con un estándar que tú no tendrías que explicarle cada vez.",
        },
        {
          tipo: "parrafo",
          texto:
            "La forma correcta de pensarlo: cada skill es un empleado que contratas gratis. Uno diseña, otro escribe documentos Word, otro arma Excel. Tu trabajo deja de ser «hacer la tarea» y pasa a ser dirigir — que es exactamente el cambio de mentalidad que trabajamos en la PARTE 1 de la masterclass.",
        },
        {
          tipo: "nota",
          texto:
            "No acumules skills que no usas. Cada una que instalas suma instrucciones que el modelo carga en su cabeza. Regla RESUELTO: instala una, prodúcele algo real a tu marca esta semana, y recién ahí suma la siguiente.",
        },
      ],
    },
    {
      titulo: "Dónde conseguirlas",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Fuente", "Qué trae", "Para quién"],
          filas: [
            [
              "anthropics/skills (en esta bóveda)",
              "El repo oficial de Anthropic: skills de documentos (Word, Excel, PowerPoint, PDF), diseño y más",
              "Tu primera parada. Calidad garantizada.",
            ],
            [
              "ComposioHQ/awesome-claude-skills (en esta bóveda)",
              "Colección curada de más de cien skills de la comunidad",
              "Cuando ya sabes qué buscas y quieres opciones.",
            ],
            [
              "vercel-labs/agent-skills (en esta bóveda)",
              "Skills de diseño web de Vercel, incluida la auditoría de diseño",
              "Si produces landings o piezas web.",
            ],
          ],
        },
      ],
    },
    {
      titulo: "Instala tu primera skill, paso a paso",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Abre Claude Code en una carpeta de trabajo",
              detalle:
                "Crea una carpeta para tus proyectos de marca (ej. «mi-marca») y abre Claude Code ahí. Todo lo que instales vive en esa carpeta.",
            },
            {
              titulo: "Pídele que la instale por ti",
              detalle:
                "No necesitas tocar la terminal más de lo necesario: dile a Claude qué skill quieres del repo oficial y deja que él haga el trabajo. Para eso está.",
            },
            {
              titulo: "Ponla a producir DE VERDAD",
              detalle:
                "Nada de pruebas de juguete. Pídele la pieza que tu marca necesita esta semana: la presentación para el cliente, el Excel de la grilla, el documento de propuesta.",
            },
            {
              titulo: "Corrige como director",
              detalle:
                "El primer resultado nunca es el final. Corriges sobre lo concreto: «el titular más corto», «esta sección sobra». Igual que dirigirías a un diseñador junior.",
            },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · instala y prueba tu primera skill",
          contenido:
            "Quiero instalar mi primera skill de Claude.\n\n1. Descarga el repo oficial anthropics/skills y muéstrame la lista de skills disponibles con una línea de qué hace cada una.\n2. Yo elijo una. Instálala en este proyecto y confirma que quedó activa.\n3. Apenas esté instalada, úsala con una tarea real que te voy a dar — no me des un ejemplo de juguete, espera mi tarea.\n\nExplícame cada paso en lenguaje normal, sin tecnicismos.",
        },
      ],
    },
    {
      titulo: "El criterio (lo que separa al que produce del que colecciona)",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Una skill trabajando > diez instaladas. La colección no factura.",
            "Las skills ejecutan; el criterio lo pones tú. Sin dirección creativa, la skill produce plantillas bonitas y vacías.",
            "Si una skill no produjo nada útil en dos semanas, desinstálala. El orden también es una habilidad.",
          ],
        },
        {
          tipo: "cita",
          texto:
            "La IA no reemplaza al creativo. Reemplaza al creativo que no sabe dirigirla.",
        },
      ],
    },
    {
      titulo: "Las 5 skills con las que empezaría hoy",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Skill", "Para qué la instalas primero", "Qué NO esperar de ella"],
          filas: [
            ["Documentos (Word/PDF)", "Propuestas comerciales y cotizaciones con formato profesional en minutos", "Que redacte el argumento de venta por ti: el criterio sigue siendo tuyo"],
            ["Hojas de cálculo (Excel)", "La grilla de contenido mensual y el control de facturación", "Que decida qué fórmula usar sin que le digas qué necesitas calcular"],
            ["Presentaciones (PowerPoint)", "Decks de propuesta para clientes, con tu identidad de marca", "Diseño de nivel agencia sin que definas tú la paleta y la estructura"],
            ["Diseño web", "Landings y componentes cuando necesitas algo rápido y funcional", "Que reemplace una decisión de UX que requiere pensar en el usuario real"],
            ["Auditoría (vercel-optimize u otra)", "Revisar un proyecto ya desplegado antes de tocarlo", "Que arregle lo que encuentra: te dice qué está mal, tú decides qué corregir"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Instálalas en ese orden, una por semana, y úsalas en trabajo real de cliente antes de sumar la siguiente. Cinco skills bien usadas valen más que veinte instaladas sin tocar.",
        },
      ],
    },
  ],

  // ── Ahorro de tokens en Claude Code ────────────────────────────
  "ahorro-de-tokens": [
    {
      titulo: "El problema real",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Claude Code se te queda sin tokens a media tarea y tu primer instinto es pagar un plan más caro. Error. En el 90% de los casos el problema no es el plan — es que estás gastando el contexto como si fuera infinito. El contexto es la memoria de trabajo de Claude: todo lo que lee, todo lo que le dices y todo lo que responde vive ahí. Cuando lo llenas de basura, pagas por la basura.",
        },
        {
          tipo: "parrafo",
          texto:
            "La mentalidad correcta es de productor: cada sesión tiene un presupuesto, y el que administra bien produce el doble con el mismo plan. Estas son las reglas que uso en producción real.",
        },
      ],
    },
    {
      titulo: "Regla 1 · Una sesión, una tarea",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuando cambias de tema en la misma conversación — empezaste con guiones y terminaste pidiendo un Excel — arrastras TODO lo anterior en cada mensaje nuevo. Claude relee la conversación completa cada vez, y eso cuesta.",
        },
        {
          tipo: "lista",
          items: [
            "Terminaste una tarea → /clear y empiezas limpio.",
            "Tarea nueva sin relación → sesión nueva, sin dudarlo.",
            "¿Necesitas algo de la sesión anterior? Pídele antes de cerrar: «déjame un resumen de dónde quedamos en un archivo» — la sesión siguiente arranca leyendo ese archivo, no repitiendo la historia.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · cierre de sesión con memoria",
          contenido:
            "Antes de cerrar esta sesión, escribe un archivo NOTAS-SESION.md con:\n1. Qué terminamos hoy (lista corta).\n2. Qué quedó pendiente y en qué archivo está cada cosa.\n3. Las decisiones que tomamos y POR QUÉ (para no re-discutirlas).\n\nLa próxima sesión va a empezar leyendo ese archivo, así que escríbelo para alguien que no vio esta conversación.",
        },
      ],
    },
    {
      titulo: "Regla 2 · No lo dejes explorar a ciegas",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Si le dices «revisa mi proyecto», Claude abre archivo tras archivo buscando qué mirar — y cada archivo leído es contexto quemado. Tú sabes dónde está lo importante: díselo.",
        },
        {
          tipo: "lista",
          items: [
            "Mal: «mejora mi landing» → Bien: «mejora el titular del hero en app/page.tsx».",
            "Mal: «revisa los guiones» → Bien: «lee solo guiones/julio.md y dame 3 mejoras».",
            "No le pidas releer archivos que ya leyó en esta sesión. Él los recuerda.",
          ],
        },
      ],
    },
    {
      titulo: "Regla 3 · Vigila el gasto como vigilas la pauta",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "En Meta Ads jamás dejarías correr una campaña sin mirar el costo. Aquí igual: el comando /cost te dice cuánto llevas gastado en la sesión. Míralo cuando la conversación se alarga — si el número te sorprende, es señal de que tocaba /clear hace rato.",
        },
        {
          tipo: "nota",
          texto:
            "Señal de alarma: si Claude responde cada vez más lento y la conversación lleva horas, estás pagando el peso de todo el historial en cada mensaje. Resume, guarda y reinicia. Cinco minutos de orden ahorran media tarde de tokens.",
        },
        {
          tipo: "cita",
          texto: "No necesitas más tokens. Necesitas dejar de quemarlos.",
        },
      ],
    },
    {
      titulo: "Los 3 errores que más gastan sin que lo notes",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Error", "Por qué gasta de más", "Corrección"],
          filas: [
            ["Pegar un documento entero cuando solo necesitas una parte", "Claude carga el documento completo aunque uses cinco líneas", "Copia solo el fragmento relevante, o dile «lee solo la sección X del archivo»"],
            ["Pedir «revisa todo el proyecto» de rutina", "Explora archivo por archivo sin saber qué buscas", "Dile específicamente qué archivo y qué está buscando"],
            ["No cerrar sesiones que ya terminaron", "El historial completo se relee en cada mensaje nuevo, aunque no lo uses", "/clear apenas termines una tarea, no al final del día"],
          ],
        },
      ],
    },
  ],

  // ── Memoria de Claude ──────────────────────────────────────────
  "memoria-de-claude": [
    {
      titulo: "Por qué Claude «se olvida» de tu marca",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Ayer Claude escribió el guion perfecto con tu tono. Hoy abres un chat nuevo y te devuelve algo genérico, como si nunca los hubieran presentado. No está fallando: cada conversación nueva nace de cero por diseño. La memoria no viene puesta — se construye. Y construirla es de las mejores inversiones de tiempo que vas a hacer.",
        },
        {
          tipo: "parrafo",
          texto:
            "El principio es el mismo del ADN de marca que trabajamos en la masterclass: si la información vive solo en tu cabeza, la repites cada vez. Si vive en un documento que Claude siempre lee, la escribes UNA vez.",
        },
      ],
    },
    {
      titulo: "Dónde vive la memoria (según qué Claude uses)",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Dónde", "Cómo se llama", "Qué guardar ahí"],
          filas: [
            [
              "App de Claude (web/móvil)",
              "Proyectos",
              "Creas un proyecto por marca, subes tu ADN de marca y tus referencias. Todos los chats de ese proyecto arrancan sabiéndolo.",
            ],
            [
              "Claude Code",
              "CLAUDE.md",
              "Un archivo en la raíz de tu carpeta con las reglas del proyecto: quién es la marca, el tono, qué no hacer. Se lee solo, en cada sesión.",
            ],
            [
              "Cualquier sesión larga",
              "Archivos de notas",
              "Resúmenes de decisiones que le pides al final de cada sesión. La memoria de corto plazo entre un día y otro.",
            ],
          ],
        },
      ],
    },
    {
      titulo: "Arma tu documento de memoria de marca",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El documento de memoria no es un brief bonito — es una herramienta de trabajo. Esto es lo mínimo que debe tener para que cualquier chat nuevo arranque con criterio:",
        },
        {
          tipo: "lista",
          items: [
            "Quién es la marca y a quién le habla (avatar concreto, no «todo el mundo»).",
            "El tono en 3 líneas + 3 ejemplos reales de frases que SÍ suenan a ti.",
            "Lo prohibido: palabras, promesas y estilos que tu marca nunca usa.",
            "Tus ofertas y precios vigentes (para que no invente).",
            "Los formatos que produces cada semana y su estructura.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · genera tu documento de memoria",
          contenido:
            "Vas a crear el documento de memoria de mi marca. Entrevístame — UNA pregunta a la vez — hasta tener claro:\n\n1. Qué vendo y a quién (mi cliente concreto, con nombre y situación).\n2. Mi tono: te voy a pegar 3 textos míos reales para que lo extraigas.\n3. Lo que mi marca NUNCA diría (palabras y promesas prohibidas).\n4. Mis ofertas y precios actuales.\n5. Los formatos que publico cada semana.\n\nCon eso, escribe el documento final en formato claro, listo para pegarlo en un Proyecto de Claude o en un CLAUDE.md. Máximo una página: si no cabe, está sobrando algo.",
        },
      ],
    },
    {
      titulo: "La regla de las tres veces",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "¿Cómo sabes qué va al documento de memoria? Simple: si te descubres explicándole lo mismo a Claude por tercera vez, eso va al documento HOY. La memoria se construye por fricción real, no por teoría.",
        },
        {
          tipo: "nota",
          texto:
            "Revisa tu documento una vez al mes. Una memoria con precios viejos o una oferta que ya no existe es peor que ninguna: Claude va a responder con seguridad… cosas que ya no son ciertas.",
        },
      ],
    },
    {
      titulo: "Memoria de marca vs. memoria de proyecto",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Si trabajas para varios clientes, no mezcles la memoria. Cada marca tiene su propio documento y su propia carpeta o Proyecto. Un solo documento gigante con todos tus clientes adentro produce mezclas: el tono de uno se cuela en el guion de otro, y nadie lo nota hasta que el cliente sí.",
        },
        {
          tipo: "lista",
          items: [
            "Una carpeta por cliente, con su CLAUDE.md o su Proyecto de Claude adentro.",
            "El documento de memoria vive junto a las plantillas del sistema (hoja de personaje, ADN comunicacional) — no separado.",
            "Si trabajas la misma marca en Claude Code y en la app, que ambos lean el mismo documento base, aunque el formato del archivo cambie.",
          ],
        },
      ],
    },
  ],

  // ── Comandos de Claude Code ────────────────────────────────────
  "comandos-claude-code": [
    {
      titulo: "Los que uso todos los días",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Claude Code tiene decenas de comandos, y la verdad de producción es que con seis cubres el 90% del trabajo diario. Estos son, en orden de cuánto los vas a usar:",
        },
        {
          tipo: "tabla",
          columnas: ["Comando", "Qué hace", "Cuándo usarlo"],
          filas: [
            [
              "/clear",
              "Limpia la conversación y arranca de cero (sin cerrar la terminal)",
              "Cada vez que terminas una tarea. El botón de higiene mental — y de ahorro de tokens.",
            ],
            [
              "/cost",
              "Te dice cuánto llevas gastado en la sesión",
              "Cuando la conversación se alarga. Si el número asusta, tocaba /clear hace rato.",
            ],
            [
              "/memory",
              "Abre y edita lo que Claude recuerda del proyecto",
              "Cuando corrige algo que ya le habías dicho: la regla va a la memoria, no al chat.",
            ],
            [
              "/model",
              "Cambia de modelo",
              "Tareas pesadas de criterio → el modelo grande. Tareas mecánicas → uno rápido.",
            ],
            [
              "/compact",
              "Comprime el historial en un resumen",
              "Sesión larga que NO quieres cerrar pero pesa demasiado.",
            ],
            [
              "Escape",
              "Interrumpe la respuesta en curso",
              "Cuando ves que va por mal camino. Corregir a tiempo cuesta menos que dejarlo terminar mal.",
            ],
          ],
        },
      ],
    },
    {
      titulo: "El flujo de una sesión bien llevada",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Abre con contexto puesto",
              detalle:
                "Si tu carpeta tiene CLAUDE.md, la sesión ya sabe las reglas. Si no, primer paso: créalo (mira la guía de memoria de esta bóveda).",
            },
            {
              titulo: "Una tarea, dicha como brief",
              detalle:
                "Resultado esperado + dónde está lo que necesita + qué NO quieres. Tres líneas bien pensadas rinden más que diez párrafos vagos.",
            },
            {
              titulo: "Interrumpe temprano, corrige concreto",
              detalle:
                "Escape apenas veas el desvío. «El tono está muy formal, mira el ejemplo 2 del CLAUDE.md» es una corrección; «no me gusta» no.",
            },
            {
              titulo: "Cierra con orden",
              detalle:
                "¿Terminaste? /cost para saber qué gastaste, resumen a archivo si mañana sigues, y /clear. La sesión siguiente te lo agradece.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "El modo Plan merece mención aparte: con Shift+Tab activas un modo donde Claude PLANIFICA lo que va a hacer y te lo enseña antes de tocar un solo archivo. Para cualquier cambio grande, es la diferencia entre dirigir y rezar.",
        },
      ],
    },
    {
      titulo: "Comandos propios: tu atajo de casa",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuando notes que repites el mismo pedido cada semana («arma la grilla», «revisa este guion con mis reglas»), conviértelo en comando propio: un archivo de texto en la carpeta .claude/commands/ de tu proyecto. El nombre del archivo se vuelve el comando.",
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · crea tu primer comando propio",
          contenido:
            "Quiero crear un comando propio de Claude Code.\n\nSe va a llamar /revisar-guion y su trabajo es: tomar el guion que yo le pegue y revisarlo contra mis reglas de marca (están en CLAUDE.md): gancho en el primer segundo, un solo concepto por video, CTA claro al final, y mi tono.\n\nCrea el archivo .claude/commands/revisar-guion.md con esas instrucciones bien escritas, y explícame cómo usarlo.",
        },
      ],
    },
    {
      titulo: "Los 3 comandos con los que se equivocan más",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Comando", "Confusión típica", "Aclaración"],
          filas: [
            ["/clear vs /compact", "Creer que hacen lo mismo", "/clear borra todo; /compact resume y sigue. Usa /compact solo cuando de verdad necesitas la sesión larga; si ya terminaste la tarea, /clear es más limpio"],
            ["Escape", "No usarlo por miedo a «romper algo»", "Interrumpir a tiempo nunca rompe nada — es más seguro que dejar que termine mal y tener que deshacer"],
            ["/model", "Cambiarlo una vez y olvidarse", "Revísalo al empezar cada tipo de tarea distinta: no es una preferencia fija, es una decisión por trabajo"],
          ],
        },
      ],
    },
  ],

  // ── Prompts que dirigen ────────────────────────────────────────
  "prompts-que-dirigen": [
    {
      titulo: "El error de fondo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La mayoría le habla a la IA como fan: «hazme algo increíble, viral, que rompa todo». Y la IA — obediente — devuelve algo genérico, porque «increíble» no es una instrucción. Un director no pide magia: pide un resultado concreto con criterios concretos. Ese es todo el secreto del prompting, y por eso en mi sistema el prompt es la ÚLTIMA etapa, no la primera: primero se piensa, después se pide.",
        },
        {
          tipo: "parrafo",
          texto:
            "Con los modelos actuales hay una segunda verdad incómoda: los prompts kilométricos estorban. El modelo obedece tanto que tres páginas de instrucciones contradictorias lo confunden más que un párrafo claro. Menos texto, más intención.",
        },
      ],
    },
    {
      titulo: "La estructura del prompt-brief",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un buen prompt tiene la misma anatomía que un buen brief creativo. Cuatro piezas:",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "El resultado",
              detalle:
                "Qué quieres tener al final, en formato concreto: «un guion de 30 segundos», «5 titulares», «una tabla comparativa».",
            },
            {
              titulo: "El contexto que manda",
              detalle:
                "Para quién es, qué referencia seguir, dónde está la información. Si tienes documento de memoria, este paso ya está pagado.",
            },
            {
              titulo: "El criterio de calidad",
              detalle:
                "Cómo se ve «bien hecho»: «el gancho contradice una creencia», «ninguna frase de más de 15 palabras», «cero clichés de IA».",
            },
            {
              titulo: "Lo prohibido",
              detalle:
                "Qué NO quieres ver. Suele ser lo que más rápido eleva el resultado: «sin emojis», «sin prometer resultados», «sin la palabra ‘revolucionario’».",
            },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Plantilla · el prompt-brief de RESUELTO",
          contenido:
            "RESULTADO: [qué quiero, en formato concreto]\n\nCONTEXTO: [para quién es / referencia que manda / dónde está la info]\n\nCRITERIO: [2-3 señales de que está bien hecho]\n\nPROHIBIDO: [lo que no quiero ver]\n\nSi algo del pedido es ambiguo, pregúntame ANTES de producir. Después dame 3 opciones distintas entre sí, no 3 variaciones de la misma idea.",
        },
      ],
    },
    {
      titulo: "Corrige sobre propuesta, no sobre vacío",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El salto de calidad no está en el primer prompt — está en la segunda ronda. Pide siempre opciones distintas entre sí, elige la dirección ganadora y corrige puntual: «la opción 2, pero el gancho de la 3». Así trabaja un director con su equipo, y así se trabaja con el modelo.",
        },
        {
          tipo: "lista",
          items: [
            "Pide 3 opciones DISTINTAS, no 3 versiones de lo mismo.",
            "Corrige con sustantivos, no con adjetivos: «acorta el titular a 8 palabras» y no «hazlo más impactante».",
            "Cuando el resultado te encante, pregúntale qué información le sirvió más — eso te dice qué meter al documento de memoria.",
          ],
        },
        {
          tipo: "cita",
          texto: "El prompt no hace magia. El prompt transporta tu criterio — si no hay criterio, no hay nada que transportar.",
        },
      ],
    },
    {
      titulo: "Tres prompts reales, antes y después",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Antes (prompt de fan)", "Después (prompt de director)"],
          filas: [
            ["«Hazme un reel increíble para mi marca de ropa»", "«Guion de 15s, formato Before-After-Bridge, para ropa deportiva mujer 25-35. Gancho: contradice la creencia de que hacer ejercicio necesita ropa cara. Sin emojis, sin ‘descubre’»"],
            ["«Escribe un titular que venda mucho»", "«5 titulares usando la fórmula del aviso (‘nunca X antes de Y’), para gente que ya perdió dinero con otro proveedor. Máximo 8 palabras cada uno»"],
            ["«Mejóralo»", "«El titular 2 funciona, pero acórtalo a 6 palabras y quita el adjetivo ‘revolucionario’»"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "La columna de la derecha no es más larga porque sí: cada palabra ahí es una decisión que ya tomaste. La columna de la izquierda delega esa decisión al modelo, y el modelo la resuelve con el promedio de internet.",
        },
      ],
    },
  ],

  // ── Semana en Google Calendar ──────────────────────────────────
  "semana-en-calendar": [
    {
      titulo: "La idea",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Planificar la semana es de esas tareas que todos sabemos hacer y casi nadie hace, porque toma una hora de domingo y decisiones aburridas. Claude conectado a tu Google Calendar la reduce a cinco minutos: tú le das prioridades y restricciones, él arma el plan, tú corriges, y recién entonces lo vuelca al calendario real.",
        },
        {
          tipo: "nota",
          texto:
            "Requisito único: activar el conector de Google Calendar en claude.ai → Configuración → Conectores. Se conecta una vez con tu cuenta de Google y queda.",
        },
      ],
    },
    {
      titulo: "Los dos prompts",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El sistema son dos prompts: uno que planifica EN TEXTO (para que corrijas sin ensuciar el calendario) y uno que ejecuta. Nunca al revés.",
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt 1 · el plan (domingo, 5 minutos)",
          contenido:
            "Arma mi semana. Mis datos:\n\nPRIORIDADES ESTA SEMANA: [las 3 cosas que SÍ o SÍ deben avanzar]\nHORARIOS FIJOS: [reuniones, clases, compromisos que no se mueven]\nMIS RITMOS: [cuándo rindo para trabajo profundo / cuándo para tareas mecánicas]\nTIEMPOS REALES: [cuánto me toma de verdad cada tipo de tarea — sé honesto]\nNO NEGOCIABLE: [ejercicio, familia, descanso — lo que se protege]\n\nRevisa primero qué ya tengo en el calendario esta semana para no chocar.\nDame el plan como lista por día, en texto. TODAVÍA no crees ningún evento.",
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt 2 · la ejecución",
          contenido:
            "El plan está aprobado con los ajustes que te di. Ahora sí:\n\n1. Crea los eventos en mi Google Calendar, con títulos claros y colores por tipo (producción / clientes / personal).\n2. A cada bloque de trabajo profundo ponle en la descripción QUÉ se produce exactamente en ese bloque.\n3. Al final dame la lista de todo lo creado para revisarla.\n\nNo toques los eventos que ya existían.",
        },
      ],
    },
    {
      titulo: "Las reglas que hacen que funcione",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Tiempos reales, no aspiracionales. Si editar un reel te toma 2 horas, el bloque dice 2 horas — el plan bonito que no cabe en la realidad muere el martes.",
            "Bloques de producción con entregable: «grabar 3 reels» es un bloque; «trabajar en contenido» es una expresión de deseo.",
            "Deja aire: un 20% de la semana sin asignar absorbe lo inesperado sin romper el resto.",
            "El viernes, cierre de 5 minutos: qué se cumplió, qué no y por qué — ese dato alimenta el prompt del domingo siguiente.",
          ],
        },
      ],
    },
    {
      titulo: "Errores que rompen el sistema",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Error", "Qué pasa", "Corrección"],
          filas: [
            ["Ejecutar sin revisar el plan en texto primero", "Un mal cálculo de tiempo termina creado en tu calendario real, y deshacerlo cuesta más que planificarlo bien", "Siempre Prompt 1, revisar, y recién después Prompt 2"],
            ["No decirle tus horarios fijos reales", "Te agenda trabajo profundo encima de una reunión que olvidaste mencionar", "Antes de pedir el plan, confírmale que revise el calendario existente"],
            ["Planificar la semana ideal en vez de la real", "El plan se rompe el martes y dejas de confiar en el sistema", "Usa tus tiempos históricos, no los que te gustaría tener"],
          ],
        },
      ],
    },
  ],

  // ── Claude desde cero ──────────────────────────────────────────
  "claude-desde-cero": [
    {
      titulo: "El mapa: qué Claude te toca",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Claude vive en varios lugares y el error del primer día es intentar usarlos todos. El mapa honesto:",
        },
        {
          tipo: "tabla",
          columnas: ["Dónde", "Para qué sirve", "Empieza aquí si…"],
          filas: [
            [
              "App web y móvil (claude.ai)",
              "Conversar, analizar documentos, escribir, crear proyectos con memoria",
              "…eres nuevo. Aquí empieza el 100% de la gente.",
            ],
            [
              "Claude Code",
              "Construir: automatizaciones, webs, sistemas, trabajo sobre archivos reales",
              "…ya sientes el límite del chat y quieres que las cosas se hagan solas.",
            ],
            [
              "Conectores",
              "Enchufar Claude a tus herramientas (Calendar, Gmail, Drive…)",
              "…ya usas la app a diario y quieres que actúe sobre tu mundo real.",
            ],
          ],
        },
      ],
    },
    {
      titulo: "Tu primer día, bien hecho (3 ejercicios)",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Dale un documento real y hazle preguntas de verdad",
              detalle:
                "Sube algo de tu negocio — una propuesta, tus precios, un contrato — y pregúntale lo que le preguntarías a un consultor. Ahí entiendes de qué es capaz.",
            },
            {
              titulo: "Hazlo escribir COMO TÚ",
              detalle:
                "Pega 3 textos tuyos reales y pídele que reescriba un cuarto texto imitando ese tono. Compara. Este ejercicio te enseña la diferencia entre pedir «un texto» y dirigir un resultado.",
            },
            {
              titulo: "Pídele que te entreviste",
              detalle:
                "«Entrevístame una pregunta a la vez sobre mi negocio y al final dame las 3 oportunidades que ves.» Descubres que la conversación — no el pedido suelto — es donde está el valor.",
            },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · tu primer ejercicio serio",
          contenido:
            "Te voy a pegar 3 textos que escribí yo. Léelos y dime:\n\n1. Cómo describirías mi tono en 3 líneas.\n2. Las 3 muletillas o patrones que más repito.\n\nDespués te paso un texto nuevo mal escrito y lo vas a reescribir con MI tono — no con el tuyo. Si en algún punto no sabes cómo diría yo algo, pregúntame en vez de inventar.",
        },
      ],
    },
    {
      titulo: "Los errores del primer mes (ahórratelos)",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Tratarlo como Google: hacer una pregunta y cerrar. El valor está en la conversación que itera.",
            "No crear un Proyecto: sin memoria de marca, cada chat empieza de cero y tú repites todo.",
            "Creerle todo: Claude afirma con la misma seguridad lo que sabe y lo que inventa. Datos críticos se verifican.",
            "Pedir «algo viral»: los adjetivos no son instrucciones. Mira la guía de prompts de esta bóveda.",
            "Saltar a Claude Code el día 1: primero domina la conversación; la construcción llega sola cuando sientes el límite.",
          ],
        },
        {
          tipo: "cita",
          texto: "El primer día no se trata de aprender IA. Se trata de descubrir cuánto criterio ya tenías y no estabas usando.",
        },
      ],
    },
    {
      titulo: "El plan de tu primera semana",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Día", "Qué haces", "Qué buscas descubrir"],
          filas: [
            ["Día 1", "Los 3 ejercicios de arriba, en la app web", "Cómo se siente dirigir en vez de preguntar"],
            ["Día 2-3", "Créale un Proyecto a tu marca y sube tu ADN comunicacional", "Que deje de repetir lo genérico"],
            ["Día 4-5", "Pídele una tarea real de tu semana, de principio a fin", "Dónde todavía tienes que corregir mucho"],
            ["Día 6-7", "Si sientes el límite del chat, instala Claude Code para una tarea concreta", "Si de verdad necesitas construcción o si el chat ya te alcanza"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "No te saltes al día 6 si el día 1 todavía no te convence. El orden importa más que la velocidad: quien domina la conversación aprovecha diez veces mejor Claude Code cuando le toca.",
        },
      ],
    },
  ],

  // ── Plugins de Claude ──────────────────────────────────────────
  "plugins-de-claude": [
    {
      titulo: "Qué es un plugin (y en qué se diferencia de una skill)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Si una skill es un empleado que sabe UNA tarea, un plugin es contratar un departamento entero: un paquete de skills, agentes y comandos listos para un rol completo — marketing, ventas, operaciones, diseño, finanzas. Se instalan desde el marketplace de Claude Code con un comando, y de golpe Claude sabe trabajar como ese equipo.",
        },
        {
          tipo: "parrafo",
          texto:
            "La consecuencia práctica: en vez de armar pieza por pieza tu flujo de marketing, instalas el plugin de marketing y ya tiene adentro la revisión de marca, los reportes, las secuencias de correo. Tu trabajo es el de siempre — poner el criterio y la dirección.",
        },
      ],
    },
    {
      titulo: "Los que rinden para un negocio de contenido",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Tipo de plugin", "Qué te resuelve", "Señal de que lo necesitas"],
          filas: [
            [
              "Marketing",
              "Planes de campaña, revisión de marca, reportes de performance, secuencias de email",
              "Produces contenido/campañas cada semana y todo vive en tu cabeza.",
            ],
            [
              "Diseño",
              "Sistemas de diseño, críticas de piezas, revisión de accesibilidad",
              "Tus piezas se ven «de IA» y no sabes por qué.",
            ],
            [
              "Ventas",
              "Research de cuentas, preparación de llamadas, seguimiento de pipeline",
              "Pierdes ventas por no hacer seguimiento a tiempo.",
            ],
            [
              "Productividad / operaciones",
              "Gestión de tareas, documentación de procesos, reportes de estado",
              "Creces y los procesos siguen siendo «como salga».",
            ],
          ],
        },
      ],
    },
    {
      titulo: "Cómo evaluarlos sin intoxicarte",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Instala UNO, el de tu dolor más caro",
              detalle:
                "No los cinco. El que ataque el cuello de botella que hoy te cuesta plata o tiempo.",
            },
            {
              titulo: "Dale una tarea real de esta semana",
              detalle:
                "La misma que ibas a hacer a mano. Compara resultado y tiempo contra tu estándar — no contra cero.",
            },
            {
              titulo: "Decide en 7 días: se queda o se va",
              detalle:
                "Cada plugin instalado suma instrucciones que el modelo carga siempre. El que no produce, desinstalado. Inventario limpio = modelo con criterio.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "La trampa del coleccionista existe también aquí: hay gente con diez plugins y cero resultados. El plugin no trabaja — te presta un equipo. Si no hay dirección, el equipo se sienta a esperar órdenes que nunca llegan.",
        },
      ],
    },
    {
      titulo: "Un ejemplo de instalación real",
      bloques: [
        {
          tipo: "copiable",
          etiqueta: "Prompt · evalúa un plugin de marketing",
          contenido:
            "Quiero instalar un plugin de marketing en Claude Code.\n\n1. Búscalo en el marketplace oficial y muéstrame qué trae adentro (skills, comandos, agentes).\n2. Instálalo.\n3. Dame la lista de lo que puedo pedirle esta semana con mi negocio real: [describe tu negocio en una línea].\n\nDespués de usarlo con una tarea real, pregúntame si lo dejamos o lo desinstalamos.",
        },
        {
          tipo: "nota",
          texto:
            "Guarda en tu documento de memoria (mira esa guía en esta bóveda) qué plugins tienes activos y para qué sirve cada uno. En seis meses no vas a recordar por qué instalaste la mitad.",
        },
      ],
    },
  ],

  // ── Diseña hablando ────────────────────────────────────────────
  "disena-hablando": [
    {
      titulo: "El cambio de juego",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Diseñar hablando no es «pídele un diseño y reza». Es lo mismo que hacemos con la imagen en la masterclass: el resultado depende de la calidad del brief, no de la herramienta. Claude puede armarte una landing, un carrusel o una presentación en minutos — versiones múltiples, además — pero solo se ve profesional si tú le diste una dirección de arte concreta.",
        },
        {
          tipo: "parrafo",
          texto:
            "La mentalidad correcta: le hablas como le hablarías a un diseñador senior que acaba de llegar a tu marca. Referencia visual, jerarquía de mensajes, a quién le hablamos y qué acción buscamos. Con eso, produce. Sin eso, decora.",
        },
      ],
    },
    {
      titulo: "El brief de diseño que funciona",
      bloques: [
        {
          tipo: "copiable",
          etiqueta: "Plantilla · brief de diseño para Claude",
          contenido:
            "Vas a diseñar [pieza: landing / carrusel / presentación] para [marca].\n\nOBJETIVO: [la única acción que quiero provocar]\nAUDIENCIA: [quién la ve y en qué contexto]\nJERARQUÍA: [el mensaje #1 que se lee en 3 segundos, luego el #2, luego el #3]\nIDENTIDAD: [colores exactos, tipografía, y 1-2 referencias de estilo descritas]\nPROHIBIDO: [gradientes genéricos, stock feo, emojis, lo que tu marca no usa]\n\nDame 3 VERSIONES con enfoques distintos (no la misma con otro color).\nPara cada una, dime en una línea qué decisión de diseño la define.",
        },
        {
          tipo: "lista",
          items: [
            "Pide versiones. Elegir entre 3 direcciones te hace director; aceptar la primera te hace espectador.",
            "Corrige por capas: primero estructura y jerarquía, después color y tipografía, al final los detalles. Nunca todo junto.",
            "El texto SIEMPRE antes que el diseño: una landing preciosa con copy débil es un poster caro.",
          ],
        },
      ],
    },
    {
      titulo: "Sube el estándar con las skills de diseño",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El «look de IA» — todos los diseños parecidos, los mismos gradientes, la misma tarjeta con glow — se combate con skills que le dan a Claude criterio visual entrenado. Las cuatro que están en esta bóveda:",
        },
        {
          tipo: "lista",
          items: [
            "vercel-labs/agent-skills → auditoría de diseño web: la corres ANTES de publicar cualquier pieza.",
            "emilkowalski/skill → animaciones y transiciones con gusto (el detalle que separa amateur de pro).",
            "nextlevelbuilder/ui-ux-pro-max-skill → biblioteca gigante de estilos, paletas y tipografías para salir del look genérico.",
            "alchaincyf/huashu-design → 7 modos de diseño: prototipos, decks, motion, infografías.",
          ],
        },
        {
          tipo: "cita",
          texto: "La herramienta te da velocidad. La dirección de arte te da identidad. Sin la segunda, la primera solo produce más de lo mismo, más rápido.",
        },
      ],
    },
    {
      titulo: "Los 3 detalles que delatan un diseño de IA",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Detalle delator", "Por qué aparece", "Cómo pedirlo distinto"],
          filas: [
            ["Gradiente morado-azul en el fondo", "Es el default más común en los datasets de entrenamiento", "Especifica tu paleta exacta en hex, nunca dejes «colores modernos» al criterio del modelo"],
            ["Tarjetas con sombra y glow en todo", "Patrón sobreusado en templates genéricos", "Pide explícitamente «sin sombras de glow, bordes planos»"],
            ["Iconos genéricos de stock", "Se generan sin referencia de tu identidad visual", "Sube tu logo y tus piezas anteriores como referencia antes de pedir el diseño"],
          ],
        },
      ],
    },
  ],

  // ── Niveles de esfuerzo ─────────────────────────────────────────
  "niveles-de-esfuerzo": [
    {
      titulo: "El reflejo que te está costando caro",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La gente trae a Claude siempre al tope pensando que así saca mejor resultado. Pero el esfuerzo — cuánto «piensa» antes de responder — es una perilla, no un botón de «mejor calidad». Súbela en las tareas que la necesitan y bájala en las que no.",
        },
        {
          tipo: "parrafo",
          texto:
            "En tareas simples (reescribir un caption, ajustar un título), el esfuerzo alto no mejora el resultado — a veces lo empeora porque el modelo sobre-piensa algo que no lo necesitaba, y de paso quema minutos y presupuesto que ibas a necesitar para la tarea de verdad grande del día.",
        },
      ],
    },
    {
      titulo: "Los niveles, de menos a más",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Nivel", "Cuándo usarlo", "Cuándo NO"],
          filas: [
            [
              "Bajo",
              "Preguntas directas, ajustes de texto, tareas de una sola instrucción clara.",
              "Cuando el problema tiene varias piezas que conectar entre sí.",
            ],
            [
              "Medio",
              "El default razonable para la mayoría de tu trabajo diario de producción.",
              "Decisiones grandes de estrategia o cambios que tocan muchas piezas a la vez.",
            ],
            [
              "Alto",
              "Estrategia de campaña completa, depurar un problema que no encuentras, un guion con varias capas de estructura.",
              "Tareas rutinarias — ahí solo quemas tiempo y presupuesto.",
            ],
            [
              "Máximo",
              "Auditorías completas, migraciones grandes, la tarea más difícil del mes.",
              "Casi todo lo demás — resérvalo, no lo dejes de default.",
            ],
          ],
        },
      ],
    },
    {
      titulo: "El hábito que te ahorra la cuenta",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Empieza en medio por default; sube solo cuando sientas que la respuesta se quedó corta o superficial.",
            "Baja el esfuerzo para tareas que se repiten seguido — no necesitas razonamiento profundo para lo que ya sabes que funciona.",
            "Si vas a lanzar la tarea más pesada del día, ese es el momento de subir a alto o máximo — no antes.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · pregúntale a Claude si vale la pena subir el esfuerzo",
          contenido:
            "Antes de esta tarea, dime en una línea si te conviene más esfuerzo del que traes ahora, y por qué.",
        },
        {
          tipo: "nota",
          texto:
            "El esfuerzo no es gratis: se paga en tiempo de espera y en presupuesto de tu cuenta. Trátalo como el resto de tus herramientas de producción — la dosis correcta, no la máxima siempre.",
        },
      ],
    },
    {
      titulo: "Ejemplos concretos de tu semana",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Tarea", "Nivel correcto", "Por qué"],
          filas: [
            ["Acortar un titular a 8 palabras", "Bajo", "Una instrucción, un resultado, sin ambigüedad"],
            ["Guion de reel de 30 segundos", "Medio", "Varias piezas (gancho, estructura, cierre) pero de tamaño manejable"],
            ["Estrategia completa de campaña para un cliente nuevo", "Alto", "Cruza insight, concepto, formato y canal — varias decisiones conectadas"],
            ["Auditoría completa de la bóveda o migración de contenido", "Máximo", "Volumen grande, muchas piezas que deben quedar coherentes entre sí"],
          ],
        },
      ],
    },
  ],

  // ── Más comandos de Claude Code ──────────────────────────────────
  "mas-comandos-claude-code": [
    {
      titulo: "Cuando el proyecto ya no es tarea de una persona",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuando empiezas, con /memory, /clear y /cost te alcanza. El punto donde necesitas más es cuando el trabajo se vuelve grande: varias piezas en paralelo, herramientas conectadas que hay que auditar, sesiones que se cortan a media tarea. Ahí entran estos.",
        },
      ],
    },
    {
      titulo: "Los comandos que sí vas a usar después",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Comando", "Para qué"],
          filas: [
            ["/agents", "Arma y administra tu equipo de subagentes — cada uno especializado en una parte del trabajo, corriendo en paralelo."],
            ["/mcp", "Revisa qué herramientas externas (MCP) están conectadas a esa sesión — de dónde saca datos o a dónde puede escribir."],
            ["/resume", "Retoma una sesión anterior donde la dejaste, en vez de empezar de cero explicando todo otra vez."],
            ["/doctor", "Diagnóstico rápido de tu instalación cuando algo no funciona como debería."],
            ["/permissions", "Ajusta qué puede hacer Claude sin pedirte permiso cada vez — útil cuando confías en una rutina que repites seguido."],
            ["/add-dir", "Súmale otra carpeta a la sesión cuando el trabajo cruza más de un proyecto."],
            ["/export", "Saca la conversación completa a un archivo — para guardar una decisión importante o compartirla con tu equipo."],
          ],
        },
      ],
    },
    {
      titulo: "Cómo aprenderlos sin memorizar la lista",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Escribe / solo y mira el menú",
              detalle: "Claude Code te muestra todos los comandos disponibles con una línea de qué hace cada uno — no hace falta memorizar nada.",
            },
            {
              titulo: "Prueba uno nuevo por semana",
              detalle: "Súmalo a tu rutina de a uno; la lista completa junta abruma y no se queda.",
            },
            {
              titulo: "Anota los tuyos en tu propio CLAUDE.md",
              detalle: "Los tres o cuatro que terminas usando de verdad, déjalos escritos como recordatorio de tu propio flujo.",
            },
          ],
        },
        {
          tipo: "cita",
          texto: "El comando que no usas no te ahorra nada. Suma solo los que de verdad entran a tu rutina.",
        },
      ],
    },
    {
      titulo: "Cuándo cada comando te salva de verdad",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Situación real", "Comando que la resuelve"],
          filas: [
            ["Tienes tres piezas de contenido distintas que producir hoy y quieres que avancen en paralelo", "/agents — un subagente por pieza, corriendo a la vez"],
            ["Algo no responde como antes y no sabes si es tu instalación", "/doctor — antes de sospechar de tu prompt, descarta el problema técnico"],
            ["Cerraste la laptop a media tarea y quieres seguir donde quedaste", "/resume — evita reexplicar todo desde cero"],
            ["Ya confías en una rutina que repites cada semana y el permiso constante te frena", "/permissions — ajusta una vez, no confirmes cada vez"],
          ],
        },
      ],
    },
  ],

  // ── Terminal o app ────────────────────────────────────────────────
  "terminal-o-app": [
    {
      titulo: "Misma herramienta, dos puertas",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Terminal y app corren el mismo Claude Code por debajo, pero cambian cuánto ves y cuánto controlas. La terminal es la versión completa: acceso total a tus archivos, tareas que corren en el fondo o programadas, y tus propias herramientas (skills, MCP, hooks). La app es la versión guiada: más rápida para empezar, con menos perillas que tocar.",
        },
      ],
    },
    {
      titulo: "La comparación directa",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["", "Terminal", "App"],
          filas: [
            ["Para quién", "Quien ya construye piezas complejas y quiere control fino", "Quien recién empieza o produce piezas simples y rápidas"],
            ["Visibilidad de gasto", "Ves tu conteo de contexto y ajustas en el momento", "Menos controles expuestos — más automático"],
            ["Tareas en segundo plano", "Sí, y también programadas", "Limitado o inexistente según la versión"],
            ["Curva de entrada", "Un poco más de fricción al inicio", "Casi inmediata"],
          ],
        },
      ],
    },
    {
      titulo: "Mi recomendación honesta",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Si estás armando tus primeras piezas de contenido o apenas estás probando el sistema, empieza en la app — sin fricción.",
            "El día que sientas el límite (necesitas más control, más herramientas conectadas, tareas que corran solas), ese es tu momento de pasar a la terminal — no antes.",
            "No necesitas elegir una para siempre: yo uso ambas según la tarea del día.",
          ],
        },
        {
          tipo: "cita",
          texto: "La herramienta correcta es la que no te hace pensar en la herramienta — solo en lo que estás produciendo.",
        },
      ],
    },
    {
      titulo: "Señales concretas de que ya te tocó pasar a terminal",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Necesitas que Claude trabaje sobre varios archivos de un proyecto real, no sobre un pedido suelto.",
            "Quieres conectar herramientas externas (MCP) como bases de datos, calendarios o repositorios.",
            "Te encuentras copiando y pegando el mismo contexto en cada chat de la app: eso ya pide un CLAUDE.md que se lee solo.",
            "Necesitas que una tarea corra en segundo plano mientras haces otra cosa.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "Si ninguna de estas cuatro te suena familiar todavía, quédate en la app. Pasar a terminal antes de necesitarlo solo agrega fricción sin ningún beneficio real.",
        },
      ],
    },
  ],
};
