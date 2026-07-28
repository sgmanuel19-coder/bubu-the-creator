import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// FICHAS DE REPOS · SKILLS, AGENTES Y DISEÑO (1 de 2)
// Escritas desde el README y la documentación real de cada repo.
// Cada ficha responde tres cosas: qué es, cómo se instala y usa,
// y cuándo NO conviene. Los datos de estrellas son del momento de
// la revisión, no de hoy.
// ═══════════════════════════════════════════════════════════════

const instalarSkill = (repo: string) =>
  `# Instalación global (queda disponible en todos tus proyectos)\nnpx skills add ${repo} --global\n\n# Solo en el proyecto actual\nnpx skills add ${repo}\n\n# Verifica que quedó instalada\n/skills`;

export const SECCIONES_REPOS_SKILLS: Record<string, SeccionRecurso[]> = {
  "repo-anthropics-skills": [
    {
      titulo: "Qué es y por qué importa",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Es el repositorio oficial de Anthropic con la implementación de referencia de las Agent Skills. Una skill es una carpeta con instrucciones, scripts y recursos que Claude carga cuando la tarea lo amerita, en vez de tener todo el contexto encima siempre.",
        },
        {
          tipo: "parrafo",
          texto:
            "La idea de fondo es la que sostiene tu Cerebro Creativo: en lugar de repetirle a Claude cómo se hace algo en cada chat, le enseñas el procedimiento una vez y queda disponible para siempre. Aquí está el estándar oficial de cómo se escribe una, con ejemplos que puedes copiar como plantilla.",
        },
        {
          tipo: "lista",
          items: [
            "Skills de documentos: crear archivos con las guías de marca de una empresa.",
            "Skills de análisis: procesar datos siguiendo siempre el mismo criterio.",
            "Skills de flujo: encadenar pasos que normalmente harías a mano.",
            "El formato es Markdown con frontmatter, así que se lee y se edita sin saber programar.",
          ],
        },
      ],
    },
    {
      titulo: "Cómo empezar",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Léelo antes de escribir la tuya", detalle: "Abre dos o tres skills del repo y fíjate en la estructura: nombre, descripción de cuándo se activa, y el cuerpo con el procedimiento. La descripción es lo más importante — es lo que decide si Claude la usa o la ignora." },
            { titulo: "2. Copia una como plantilla", detalle: "No empieces de cero. Toma la que más se parezca a lo que quieres y reemplaza el contenido." },
            { titulo: "3. Escribe la descripción pensando en el disparador", detalle: "«Usar cuando el usuario pida X» funciona mejor que describir qué hace la skill." },
            { titulo: "4. Pruébala con un caso real", detalle: "Si Claude no la invoca sola, el problema casi siempre está en la descripción, no en el cuerpo." },
          ],
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: instalarSkill("anthropics/skills") },
      ],
    },
    {
      titulo: "Cuándo no lo necesitas",
      bloques: [
        {
          tipo: "nota",
          texto:
            "Si tu procedimiento cambia cada vez, no lo conviertas en skill: las skills sirven para lo repetible. Para lo que varía, un buen prompt maestro rinde más.",
        },
      ],
    },
    {
      titulo: "Anatomía de una skill bien escrita",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Parte", "Qué contiene", "Error típico si falta"],
          filas: [
            ["Nombre y descripción", "Cuándo se activa, en una frase clara", "Claude no la invoca sola porque no reconoce cuándo aplica"],
            ["Procedimiento", "Los pasos exactos, en orden", "Resultados inconsistentes entre una vez y otra"],
            ["Ejemplos", "Casos de entrada y salida esperada", "Claude interpreta el procedimiento de forma distinta a la que querías"],
            ["Límites", "Qué NO debe hacer la skill", "Se sobre-extiende a tareas para las que no fue pensada"],
          ],
        },
      ],
    },
  ],

  "repo-awesome-claude-skills": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una lista curada de skills, recursos y herramientas para personalizar flujos de trabajo con Claude. No es una skill: es el catálogo donde buscas antes de escribir la tuya, para no reinventar algo que ya existe y está probado.",
        },
        {
          tipo: "parrafo",
          texto:
            "Sirve sobre todo como mapa del ecosistema. Si tienes una tarea repetitiva y no sabes si alguien ya la resolvió, este es el primer lugar donde mirar. La lista está organizada por categoría, así que puedes recorrer solo la sección que te interesa.",
        },
      ],
    },
    {
      titulo: "Cómo sacarle provecho",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Busca por tu problema, no por la herramienta", detalle: "Entra con «necesito que revise mis textos» en la cabeza, no con «quiero una skill de escritura»." },
            { titulo: "2. Revisa la fecha del último commit", detalle: "En un ecosistema que se mueve rápido, una skill sin actualizar en meses puede apuntar a comandos que ya cambiaron." },
            { titulo: "3. Léela antes de instalarla", detalle: "Una skill es un procedimiento que Claude va a seguir. Vale la pena saber qué le estás pidiendo que haga." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Ojo con instalar muchas a la vez: cada skill compite por atención cuando Claude decide cuál aplicar. Es mejor tener cinco que usas que cuarenta que no.",
        },
      ],
    },
    {
      titulo: "Cómo se organiza la lista por categoría",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Documentos y oficina: Word, Excel, PowerPoint, PDF — el punto de partida para casi cualquier negocio.",
            "Desarrollo y código: revisión, testing, arquitectura — para cuando ya construyes producto propio.",
            "Diseño: sistemas visuales, prototipos, crítica de interfaces.",
            "Datos y análisis: limpieza, visualización, reportes.",
            "Productividad personal: gestión de tareas, notas, seguimiento de proyectos.",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Entra a la categoría que resuelve tu cuello de botella actual, no a la que suena más interesante. Una skill de desarrollo no te sirve de nada si tu problema hoy es armar propuestas comerciales.",
        },
      ],
    },
  ],

  "repo-vercel-agent-skills": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La colección oficial de Vercel de skills para agentes de código. Siguen el formato estándar de Agent Skills, así que funcionan en Claude Code y en cualquier agente compatible.",
        },
        {
          tipo: "parrafo",
          texto:
            "La más útil del paquete es la que audita un proyecto en Vercel: revisa costo, rendimiento, fiabilidad, caché y uso de funciones. Primero recolecta las métricas reales del proyecto y recién después investiga las rutas y archivos que esas métricas señalan — no adivina.",
        },
      ],
    },
    {
      titulo: "Para qué te sirve a ti",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Si tienes sitios de clientes desplegados en Vercel, esta skill te da un informe de qué está costando de más y qué está lento, sin que tengas que entender el dashboard. Es material directo para una conversación de mantenimiento mensual con el cliente.",
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: instalarSkill("vercel-labs/agent-skills") },
        {
          tipo: "nota",
          texto:
            "Solo aplica si el proyecto está en Vercel. Si tu cliente está en otro hosting, la skill no tiene de dónde leer.",
        },
      ],
    },
    {
      titulo: "Qué te reporta la auditoría",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Área", "Qué revisa", "Por qué te importa a ti"],
          filas: [
            ["Costo", "Funciones que corren de más, ancho de banda excesivo", "Un sitio de cliente que factura de más sin que nadie lo note"],
            ["Rendimiento", "Tiempos de carga, imágenes sin optimizar", "Rendimiento lento cuesta conversión, y eso es dinero del cliente"],
            ["Caché", "Configuración de cacheo mal puesta o ausente", "Cada visita recarga cosas que podrían servirse instantáneas"],
            ["Uso de funciones", "Llamadas innecesarias a funciones serverless", "Multiplica el costo sin ningún beneficio visible"],
          ],
        },
      ],
    },
  ],

  "repo-emil-skill": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Skills para design engineers: gente que diseña y programa interfaces. Están hechas para responder algo difícil de saber solo — si la decisión que tomaste con una animación o con un detalle de diseño fue la correcta.",
        },
        {
          tipo: "parrafo",
          texto:
            "Están basadas en la experiencia del autor construyendo interfaces, y su valor está en el criterio, no en el código. Le dan a Claude una opinión formada sobre timing de animaciones, curvas de easing y jerarquía visual, en vez de dejarlo elegir por defecto.",
        },
      ],
    },
    {
      titulo: "Cuándo la vas a querer",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Cuando pides una landing y sale funcional pero se siente barata: el problema casi siempre está en las transiciones.",
            "Cuando quieres que una animación se sienta cara y no sabes qué parámetro tocar.",
            "Cuando necesitas un criterio de referencia para discutir con un cliente por qué algo no debería moverse tanto.",
          ],
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: instalarSkill("emilkowalski/skill") },
        {
          tipo: "tabla",
          columnas: ["Duda de diseño", "Lo que la skill responde"],
          filas: [
            ["¿Esta animación es muy lenta o muy rápida?", "Rangos de duración por tipo de interacción (hover, entrada, transición de página)"],
            ["¿Qué curva de easing uso?", "Cuál se siente natural para cada tipo de movimiento, con el porqué"],
            ["¿Por qué esto se ve barato aunque el código esté bien?", "Suele ser timing o jerarquía visual, no el código en sí"],
          ],
        },
      ],
    },
  ],

  "repo-huashu-design": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una skill de diseño nativo en HTML para Claude Code. Escribes una frase y devuelve un entregable: un prototipo de app que se puede clicar, una presentación editable, una animación de lanzamiento de producto o una infografía con calidad de impresión. Incluye exportación a MP4.",
        },
        {
          tipo: "parrafo",
          texto:
            "Trae 20 filosofías de diseño, una revisión en 5 dimensiones y una librería de 40 estilos nativos de HTML. Si le das tus activos de marca — logo, paleta, capturas de tu interfaz — los lee y ajusta el resultado a tu identidad. Si no le das nada, los estilos de respaldo evitan que salga con aspecto genérico de IA.",
        },
      ],
    },
    {
      titulo: "Para qué te sirve en la agencia",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Prototipos clicables para vender un proyecto web antes de construirlo.",
            "Presentaciones de campaña sin pelear con plantillas.",
            "Infografías para clientes que piden «algo que explique el proceso».",
            "Animaciones cortas de producto que después puedes montar en CapCut.",
          ],
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: instalarSkill("alchaincyf/huashu-design") },
        {
          tipo: "nota",
          texto:
            "El README está en chino con versión en inglés. La skill funciona igual en español, pero si vas a leer la documentación a fondo, abre el README.en.md.",
        },
      ],
    },
    {
      titulo: "Cómo se compara con pedirle a Claude un diseño normal",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["", "Pedido normal", "Con esta skill"],
          filas: [
            ["Coherencia con tu marca", "Depende de cuánto contexto le des cada vez", "Lee tus activos de marca una vez y los respeta en cada pieza"],
            ["Variedad de formato", "Genera lo que le pidas, plano por plano", "40 estilos nativos como respaldo si no le das nada"],
            ["Revisión de calidad", "No incluida", "5 dimensiones de revisión antes de entregar"],
            ["Exportación", "Depende de lo que pidas", "MP4 incluido para piezas con animación"],
          ],
        },
      ],
    },
  ],

  "repo-ui-ux-pro-max": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una skill que le carga a Claude inteligencia de diseño para construir interfaces en varias plataformas. Trae bibliotecas de estilos, paletas, combinaciones tipográficas, tipos de producto, guías de experiencia de usuario y tipos de gráfico, más soporte para varios stacks de desarrollo.",
        },
        {
          tipo: "parrafo",
          texto:
            "La diferencia con pedirle a Claude «hazme una landing bonita» es que aquí hay decisiones ya tomadas por alguien con criterio: qué paleta va con qué tipo de producto, qué tipografías combinan, qué patrón de navegación corresponde a un dashboard y no a un e-commerce.",
        },
      ],
    },
    {
      titulo: "Cómo usarla bien",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Dale el tipo de producto primero", detalle: "«Dashboard de métricas» o «landing de servicio B2B» activa decisiones distintas que «una web»." },
            { titulo: "2. Especifica el stack", detalle: "El resultado cambia si es HTML plano, React o Tailwind. Decirlo evita reescribir después." },
            { titulo: "3. Pide la revisión, no solo la construcción", detalle: "También sirve para auditar una interfaz que ya tienes y decirte qué está mal." },
          ],
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: instalarSkill("nextlevelbuilder/ui-ux-pro-max-skill") },
        {
          tipo: "nota",
          texto:
            "El nombre suena a marketing pero el contenido es real: paletas y combinaciones tipográficas curadas evitan que caigas en el mismo gradiente morado-azul que sale por default en casi todo lo generado sin dirección.",
        },
      ],
    },
  ],

  "repo-awesome-design-md": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una colección de archivos DESIGN.md analizados a partir de sistemas de diseño de marcas conocidas. Copias uno a tu proyecto, le dices al agente «construye una página con este lenguaje visual», y genera interfaces que se mantienen coherentes con esa identidad.",
        },
        {
          tipo: "parrafo",
          texto:
            "Es la versión de diseño de lo que tú haces con el ADN comunicacional: en vez de explicarle el estilo cada vez, le das un documento que lo define y el agente lo respeta en cada pieza.",
        },
      ],
    },
    {
      titulo: "Cómo lo aplicas a un cliente",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Busca la marca más parecida en espíritu", detalle: "No copies la marca: usa su DESIGN.md como referencia de estructura, y reemplaza colores y tipografías por los del cliente." },
            { titulo: "2. Reescribe los valores por los reales", detalle: "Paleta, tipografía, radios, sombras y espaciados del cliente." },
            { titulo: "3. Guárdalo en la carpeta del cliente", detalle: "Al lado de su ADN comunicacional. Desde ahí lo lee cualquier agente que trabaje en ese proyecto." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Tomar el DESIGN.md de una marca famosa y usarlo tal cual es copiar su identidad. Sirve como andamio, no como entregable.",
        },
      ],
    },
    {
      titulo: "Qué contiene un DESIGN.md bien hecho",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Sección", "Qué define", "Por qué importa"],
          filas: [
            ["Principios", "Las tres o cuatro reglas que gobiernan todas las decisiones", "Es lo que el agente consulta cuando tiene que elegir entre dos opciones válidas"],
            ["Color", "Paleta con sus usos: fondo, texto, acento, estados", "Sin usos declarados, el agente aplica los colores donde le parece"],
            ["Tipografía", "Familias, pesos y escala de tamaños", "Evita que cada sección tenga su propio tamaño de título"],
            ["Espaciado", "La unidad base y sus múltiplos", "Es lo que hace que una interfaz se sienta ordenada aunque no sepas por qué"],
            ["Componentes", "Botones, tarjetas, formularios y sus estados", "Define el comportamiento, no solo el aspecto"],
            ["Movimiento", "Duraciones y curvas de animación", "La diferencia entre algo que se siente caro y algo que se siente brusco"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Escribir el DESIGN.md de un cliente es un entregable vendible por sí mismo. Es la traducción de su manual de marca a un formato que cualquier agente puede ejecutar, y una vez que existe, todo lo que produzcas para esa marca sale coherente sin discusión.",
        },
      ],
    },
  ],

  "repo-marketing-skills-stack": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una colección de skills de marketing para agentes: optimización de conversión, copywriting, SEO, analítica y crecimiento. Está hecha para marketers técnicos y fundadores que quieren que el agente haga el trabajo de análisis, no solo la redacción.",
        },
        {
          tipo: "parrafo",
          texto:
            "Funciona con Claude Code y con cualquier agente que soporte el estándar de Agent Skills, así que no te ata a una herramienta.",
        },
      ],
    },
    {
      titulo: "Las que más te sirven",
      bloques: [
        {
          tipo: "lista",
          items: [
            "CRO: para auditar una landing de cliente antes de proponerle rehacerla — te da argumentos concretos en vez de opiniones.",
            "Copywriting: útil como segunda opinión, no como redactor. Tu criterio de dirección creativa sigue mandando.",
            "SEO: para las páginas de servicios, donde el tráfico orgánico sí importa.",
            "Analítica: para leer datos de campaña sin abrir cinco pestañas.",
          ],
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: instalarSkill("coreyhaines31/marketingskills") },
        {
          tipo: "nota",
          texto:
            "Están escritas con lógica de mercado estadounidense. Los principios aplican, pero los benchmarks de conversión y los costos por clic no: tu referencia es tu propia data de Meta en Perú.",
        },
      ],
    },
    {
      titulo: "Cómo adaptarlas a tu contexto",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Pide el análisis con la skill", detalle: "Deja que audite y proponga sobre principios generales de CRO o copy." },
            { titulo: "2. Cruza el resultado con tu propia data", detalle: "Si dice «tu tasa de conversión está baja», compárala con tu histórico real en Meta, no con el benchmark genérico que trae." },
            { titulo: "3. Ajusta el copy al español peruano neutro", detalle: "Las sugerencias suelen salir en inglés directo o en un tono muy agresivo de venta; suaviza según tu marca." },
          ],
        },
      ],
    },
  ],

  "repo-humanizer-blader": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una skill portátil que quita las marcas del texto generado por IA para que suene natural. Es Markdown plano, así que corre en cualquier entorno que soporte instrucciones tipo skill.",
        },
        {
          tipo: "parrafo",
          texto:
            "Detecta y corrige los patrones típicos: simbolismo inflado, lenguaje promocional, análisis superficiales que empiezan con gerundio, atribuciones vagas, abuso de la raya, la regla de tres repetida hasta el cansancio, vocabulario delator, paralelismos negativos y frases conjuntivas de más.",
        },
      ],
    },
    {
      titulo: "Por qué es obligatoria en tu flujo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un guion que suena a IA no es solo un problema de estilo: rompe la confianza justo en la parte donde estás vendiendo criterio humano. Si le entregas a un cliente un texto con las marcas puestas, la conversación deja de ser sobre la idea y pasa a ser sobre si lo escribiste tú.",
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: instalarSkill("blader/humanizer") },
        {
          tipo: "nota",
          texto:
            "Pásale todo guion antes de entregarlo, incluidos los que escribiste tú con ayuda. Es el último filtro antes del cliente.",
        },
      ],
    },
    {
      titulo: "Ejemplo antes y después",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Con marcas de IA", "Humanizado"],
          filas: [
            ["«En el vertiginoso mundo del marketing digital, es fundamental destacar»", "«El marketing digital cambia rápido, y si no destacas, te quedas atrás»"],
            ["«No solo aumentará tus ventas, sino que también fortalecerá tu marca»", "«Vas a vender más. Y de paso, tu marca se ve más sólida»"],
            ["«Descubre el poder transformador de esta estrategia»", "«Esta estrategia funciona. Así es como»"],
          ],
        },
      ],
    },
  ],

  "repo-last30days": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una skill que investiga cualquier tema cruzando Reddit, X, YouTube, Hacker News, mercados de predicción y la web abierta, y después sintetiza un resumen con las fuentes a la vista. La premisa es buscar lo que dice la gente, no lo que publicaron los editores.",
        },
      ],
    },
    {
      titulo: "Para qué la vas a usar",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Investigación previa a una campaña: qué se está diciendo de la categoría de tu cliente ahora mismo, no hace dos años.",
            "Búsqueda de insight: es exactamente la técnica de escuchar donde la marca no está, automatizada.",
            "Preparación de una reunión de venta: llegar sabiendo qué se comenta del sector.",
            "Detección de tendencias antes de que las levanten los medios.",
          ],
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: instalarSkill("mvanhorn/last30days-skill") },
        {
          tipo: "nota",
          texto:
            "Lo que devuelve son conversaciones, no verdades. Es materia prima para hipótesis de insight, no evidencia para un brief. Verifica antes de citar cifras.",
        },
      ],
    },
    {
      titulo: "Un flujo semanal con esta skill",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "Lunes: corre la búsqueda", detalle: "Un tema por semana, el que más te interese para el contenido que vas a producir." },
            { titulo: "Extrae el lenguaje, no el resumen", detalle: "Pídele las frases textuales que la gente usa, no la síntesis — ahí está el copy." },
            { titulo: "Cruza con tu calendario de contenido", detalle: "Si un tema viene subiendo, adelanta una pieza antes de que se sature." },
          ],
        },
      ],
    },
  ],

  "repo-ponytail": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una skill que hace que tu agente piense como el desarrollador senior más flojo de la sala: el que escribe una línea en vez de cien y funciona igual. Su premisa es que el mejor código es el que no escribiste.",
        },
        {
          tipo: "parrafo",
          texto:
            "El repositorio reporta mediciones sobre sesiones reales editando un proyecto abierto: alrededor de un 54% menos de código en promedio, con picos mucho mayores en tareas donde el agente tiende a sobre-construir, y prácticamente sin diferencia donde el código ya era mínimo. También reporta menor costo y menor tiempo.",
        },
      ],
    },
    {
      titulo: "Por qué te importa aunque no programes",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuando le pides a Claude Code una web o una automatización, la tendencia por defecto es construir de más: más archivos, más dependencias, más cosas que después se rompen. Menos código es menos superficie de error y menos tokens gastados en cada iteración.",
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: instalarSkill("DietrichGebert/ponytail") },
        {
          tipo: "nota",
          texto:
            "No la uses cuando de verdad necesitas una arquitectura completa. Optimiza para lo mínimo, y a veces lo mínimo no alcanza.",
        },
      ],
    },
    {
      titulo: "Dónde rinde más en tu operación",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Automatizaciones chicas para clientes: scripts de n8n, ajustes de landing, que no necesitan arquitectura de producto.",
            "Prototipos rápidos donde la velocidad de iteración importa más que la elegancia del código.",
            "Cualquier tarea donde el resultado se mide en «funciona» y no en «es la solución perfecta».",
          ],
        },
      ],
    },
  ],

  "repo-claude-ads-agricidaniel": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una skill de operación de medios pagados para Claude Code que cubre una docena de plataformas — entre ellas Google, Meta, YouTube, LinkedIn, TikTok, Microsoft y Amazon. Convierte exportaciones autorizadas o lecturas de cuenta en auditorías fundamentadas en la fuente, planes, flujos de creatividad, experimentos, monitoreo e informes.",
        },
        {
          tipo: "parrafo",
          texto:
            "Lo importante para trabajar con cuentas de cliente: es de solo lectura por defecto. Los cambios en vivo quedan deshabilitados hasta que la operación concreta pase por aprobación, verificación y capacidad de reversión.",
        },
      ],
    },
    {
      titulo: "Cómo encaja en tu operación",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Úsala primero para auditar", detalle: "Antes de proponerle a un cliente que te dé la cuenta, una auditoría con evidencia es el mejor argumento de venta que existe." },
            { titulo: "2. Mantén el modo lectura", detalle: "No le des permisos de escritura sobre la cuenta de un cliente hasta que confíes en el flujo completo." },
            { titulo: "3. Usa los informes como entregable", detalle: "El reporte mensual deja de ser una captura de pantalla y pasa a ser un documento con lectura." },
          ],
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: instalarSkill("AgriciDaniel/claude-ads") },
        {
          tipo: "tabla",
          columnas: ["Plataforma cubierta", "Qué te resuelve"],
          filas: [
            ["Meta", "Auditoría de estructura de campaña y salud del píxel"],
            ["Google", "Revisión de palabras clave y quality score"],
            ["TikTok", "Diversidad creativa y señales de fatiga"],
            ["LinkedIn", "Segmentación B2B y costo por lead"],
          ],
        },
      ],
    },
  ],
};
