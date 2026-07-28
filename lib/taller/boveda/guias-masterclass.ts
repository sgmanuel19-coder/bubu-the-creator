import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// GUÍAS DE LOS RECURSOS DE LA MASTERCLASS
// Los cuatro entregables del curso: la Biblia, la baraja de GPTs,
// las plantillas del sistema y el checklist de acabado.
// Son material de alumno: van con candado de nivel "grabado".
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_MASTERCLASS: Record<string, SeccionRecurso[]> = {
  // ── LA BIBLIA ─────────────────────────────────────────────────
  "biblia-publicitaria": [
    {
      titulo: "Qué es y por qué existe",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La Biblia Publicitaria son 59 documentos que condensan el oficio del director creativo publicitario. No están escritos para que los leas de corrido como un libro: están escritos para que una IA los lea y aprenda a razonar con ellos. Esa es la diferencia entre tener información y tener un cerebro.",
        },
        {
          tipo: "parrafo",
          texto:
            "Una IA sin este material te responde con el promedio de internet: lugares comunes, adjetivos de relleno y estructuras que ya viste mil veces. Con la Biblia cargada, responde con criterio de oficio — sabe qué es un insight de verdad, distingue concepto de idea, reconoce qué figura retórica está usando y sabe cuándo una estructura narrativa no corresponde al formato.",
        },
        {
          tipo: "nota",
          texto:
            "Van del DOC 00 al DOC 59 pero el DOC 10 no existe: son 59 archivos, no 60. Si te falta alguno al descomprimir, revisa que sea ese.",
        },
      ],
    },
    {
      titulo: "Los 59 documentos, por bloque",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Este es el mapa. No tienes que cargarlos todos de una: si vas a trabajar una campaña concreta, con el bloque que corresponde y el DOC 00 ya tienes suficiente para que la IA razone bien.",
        },
        {
          tipo: "tabla",
          columnas: ["Bloque", "Documentos", "Cuándo lo cargas"],
          filas: [
            ["Pensamiento y diagnóstico", "00 protocolo del director creativo · 01 análisis de brief · 02 buyer persona · 03 customer journey · 39 investigación previa", "Siempre. El DOC 00 es la base de todo"],
            ["Ideación", "09 tipos de insight · 11 concepto creativo · 12 Big Idea · 13 retóricas · 27 conceptualización visual · 28 cómo piensa un director de arte", "Cuando estás definiendo qué decir"],
            ["Escritura y narrativa", "14 estructuras narrativas · 15 redacción creativa · 16 hooks · 17 estilos de escritura · 18 CTA · 34 guiones por formato · 35 géneros de storytelling", "Cuando ya sabes qué decir y toca escribirlo"],
            ["Formatos", "19 stories · 20 carruseles · 21 reels y video corto · 22 email · 23 spot de TV · 24 OOH y print · 25 radio y audio · 26 experiencial y activaciones", "Cuando el entregable tiene un formato específico"],
            ["Estrategia de marca y campaña", "30 arquitectura de campaña · 31 brand voice · 33 prompt engineering publicitario · 36 estrategias comunicacionales · 37 estrategias de contenido", "Al armar el plan, antes de producir"],
            ["Producción con IA", "44 flujo creativo integrado · 45 Kling · 46 Seedance · 47 Higgsfield · 48 Nano Banana · 49 imagen publicitaria · 50 audio y voz · 29 producción publicitaria · 32 evaluación y aprobación", "Cuando pasas de la idea a la pieza"],
            ["Negocio y oferta", "04 propuesta de valor · 05 oferta irresistible · 06 propuesta comercial y pitch · 07 precios · 08 embudos · 38 estrategias comerciales", "Cuando vas a cobrar por esto"],
            ["Medios y pauta", "40 medios y canales · 41 métricas y KPIs · 42 influencers y UGC · 43 landing pages · 51 Meta Ads · 52 Google Ads · 53 TikTok Ads · 54 LinkedIn Ads · 55 YouTube · 56 SEO · 57 canales complementarios · 58 grillas y calendarios · 59 media plan", "Cuando la campaña sale a la calle"],
          ],
        },
      ],
    },
    {
      titulo: "Cómo cargarla en tu Cerebro Creativo",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Descarga el paquete completo", detalle: "El ZIP de abajo trae los 59. Descomprímelo en una carpeta que no vayas a mover." },
            { titulo: "2. Crea la carpeta del Cerebro", detalle: "Una sola carpeta que sea la casa del sistema, con la Biblia adentro. Esa misma carpeta la abren Claude Code y Obsidian: dos puertas al mismo cerebro." },
            { titulo: "3. Carga primero el DOC 00", detalle: "Es el protocolo de pensamiento. Sin él, los demás documentos son información suelta; con él, se convierten en criterio ordenado." },
            { titulo: "4. Agrega el bloque que necesitas", detalle: "No cargues los 59 en un chat: se diluye la atención. Carga el DOC 00 más el bloque del trabajo que estés haciendo." },
            { titulo: "5. Genera el ADN de la marca", detalle: "Con la Biblia puesta, pídele que estudie a tu cliente y produzca sus documentos de marca. Ese ADN es lo que hace que las respuestas dejen de ser genéricas." },
            { titulo: "6. Unifica con el Prompt Maestro", detalle: "Biblia más ADN, atados por un prompt que define cómo se usan. Ahí el sistema queda armado." },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt de carga inicial",
          contenido:
            "Vas a trabajar como director creativo publicitario usando la metodología de estos documentos.\n\nLee primero el DOC 00 (El Protocolo de Pensamiento del Director Creativo) y adopta ese marco de razonamiento para todo lo que siga.\nDespués lee los documentos de este bloque: [pega los nombres de los DOCs del bloque que cargaste].\n\nCuando termines, no me resumas los documentos. Dime:\n1. Qué protocolo vas a seguir de ahora en adelante antes de proponer cualquier idea.\n2. Qué información me vas a pedir antes de empezar un encargo.\n3. Qué vas a rechazar automáticamente por no cumplir el criterio.\n\nA partir de aquí, cada vez que te pida algo creativo, empiezas por el protocolo del DOC 00 y me muestras el razonamiento antes del resultado.",
        },
        {
          tipo: "nota",
          texto:
            "La Biblia se hace una vez y sirve para todos tus clientes. Lo que cambia por cliente es el ADN comunicacional. Esa separación es lo que hace que el sistema escale en vez de rehacerse en cada proyecto.",
        },
      ],
    },
  ],

  // ── BARAJA DE GPTS ────────────────────────────────────────────
  "baraja-gpts": [
    {
      titulo: "Qué es esta baraja",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Son los GPTs que uso en mi flujo real de producción. Cada uno cubre una estación distinta del proceso, y esa es la razón de que sean varios y no uno: un GPT que hace todo termina haciendo todo a medias. La lógica es la misma de una mesa de trabajo — cada herramienta en su puesto.",
        },
        {
          tipo: "nota",
          texto:
            "Necesitas ChatGPT de pago para usarlos. Es uno de los requisitos del sistema, junto con el plan básico de Higgsfield y Claude.",
        },
      ],
    },
    {
      titulo: "Cada GPT en su estación",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["GPT", "En qué momento entra", "Qué le pides", "Qué NO le pides"],
          filas: [
            ["CinePromt", "Cuando ya tienes el plano decidido y necesitas el prompt", "Traducir una intención de dirección a lenguaje de generación: lente, luz, atmósfera, movimiento", "Que decida qué plano contar — eso lo decides tú antes"],
            ["Storyboard", "Después del guion, antes de generar nada", "Desglosar el guion en planos, con encuadre y duración por plano", "Que escriba el guion: llega cuando el guion ya existe"],
            ["UGC", "Cuando la pieza tiene que parecer contenido y no anuncio", "Guion y puesta en escena con lógica de creador, no de comercial", "Piezas de marca pulidas: rompe el registro"],
            ["Seedance Director", "En la etapa de animación", "Traducir la escena a las instrucciones que ese motor entiende mejor", "Trabajo de concepto: es un traductor técnico, no un creativo"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "El orden importa más que los GPTs. Si entras por CinePromt sin haber pasado por el concepto y el guion, vas a obtener planos bonitos que no cuentan nada. La baraja acelera la ejecución de una decisión ya tomada; no toma la decisión por ti.",
        },
      ],
    },
    {
      titulo: "El flujo completo, con la baraja adentro",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Cerebro Creativo", detalle: "Insight, concepto y estructura narrativa. Aquí no entra ningún GPT de la baraja: entra Claude con la Biblia y el ADN." },
            { titulo: "2. Guion", detalle: "Con la estructura elegida. Si la pieza es UGC, aquí entra el GPT de UGC." },
            { titulo: "3. Storyboard", detalle: "El guion se convierte en lista de planos con encuadre y duración." },
            { titulo: "4. CinePromt", detalle: "Cada plano se traduce a prompt con criterio de dirección." },
            { titulo: "5. Generación", detalle: "Imagen primero, después movimiento. Si el motor es Seedance, pasa por su director." },
            { titulo: "6. Montaje", detalle: "Ensamblaje, ritmo y acabado. La baraja ya salió de escena." },
          ],
        },
        {
          tipo: "cita",
          texto: "La baraja no piensa por ti. Ejecuta más rápido lo que tú ya decidiste.",
        },
      ],
    },
    {
      titulo: "Errores comunes al usar la baraja",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Entrar por CinePromt sin haber definido el concepto: obtienes planos técnicamente correctos que no cuentan nada, porque nadie decidió qué contar.",
            "Pedirle a un GPT que haga el trabajo de otro: usar Storyboard para escribir el guion, o UGC para pulir una pieza de marca. Cada uno tiene su estación.",
            "No revisar la salida antes de pasarla al siguiente GPT: un error en el guion se multiplica en el storyboard y otra vez en los prompts.",
            "Usar el GPT de UGC en una pieza que necesitaba verse pulida: el registro se contamina y el cliente lo nota aunque no sepa explicar por qué.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "Recuerda la regla de comunicación: estos GPTs se presentan como «la baraja que uso en mi flujo real», nunca como algo que Manuel inventó. Lo único que se comunica como creación propia es el Cerebro Creativo.",
        },
      ],
    },
  ],

  // ── PLANTILLAS ────────────────────────────────────────────────
  "plantillas-sistema": [
    {
      titulo: "Para qué sirven las plantillas",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una plantilla no es un formulario burocrático: es memoria. Cada vez que llenas una, dejas de depender de acordarte y empiezas a depender de un documento que la IA también puede leer. Ese es el truco completo del sistema — lo que está escrito se puede reutilizar, lo que está en tu cabeza se vuelve a improvisar cada vez.",
        },
      ],
    },
    {
      titulo: "Las plantillas del sistema",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Plantilla", "Qué guarda", "Por qué te ahorra tiempo"],
          filas: [
            ["Hoja de personaje", "Rasgos físicos, vestuario, edad, actitud y referencias visuales de cada personaje recurrente", "Es lo que evita que la cara cambie entre planos. Sin ella, cada generación reinventa a la persona"],
            ["Hoja de producto", "Ángulos, materiales, acabados, colores exactos, qué se ve y qué nunca se muestra", "Mantiene el producto reconocible en toda la campaña, que es donde más se nota el error"],
            ["Prompt maestro de marca", "El bloque fijo de estilo: paleta, tipo de luz, lente, atmósfera y grado de color", "Se pega al inicio de cada generación y toda la campaña sale del mismo mundo visual"],
            ["ADN comunicacional", "Tono, vocabulario propio, palabras prohibidas, temas que la marca puede y no puede tocar", "Es lo que hace que el copy suene a la marca y no a IA"],
            ["Hoja de lugares", "Los escenarios recurrentes con su descripción fija", "Un mismo local o casa que aparece en varias piezas y no cambia de forma"],
          ],
        },
      ],
    },
    {
      titulo: "Cómo se usan en la práctica",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Una carpeta por cliente", detalle: "Todas las plantillas de esa marca viven juntas. Cuando abres esa carpeta con Claude Code, el contexto entero está disponible." },
            { titulo: "2. Llénalas una vez, al inicio del proyecto", detalle: "Es la parte aburrida y es la que hace que todo lo demás sea rápido. Media hora aquí ahorra días después." },
            { titulo: "3. Pégalas en el prompt, no las describas", detalle: "«El personaje es como te conté» no funciona. La hoja de personaje pegada, sí." },
            { titulo: "4. Actualízalas cuando algo funcione", detalle: "Si un plano salió perfecto, guarda su prompt en la plantilla. La plantilla mejora con cada campaña." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Las plantillas son el activo que se queda contigo cuando el cliente se va. Un proyecto entregado se acaba; una hoja de personaje bien hecha sirve para el próximo cliente del mismo rubro con veinte minutos de ajuste.",
        },
      ],
    },
    {
      titulo: "Cómo se llena una hoja de personaje, con ejemplo",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Campo", "Ejemplo mal llenado", "Ejemplo bien llenado"],
          filas: [
            ["Físico", "«Hombre adulto, aspecto profesional»", "«Hombre de 45 años, piel morena, cabello corto con canas en las sienes, complexión media, 1.75m aprox»"],
            ["Vestuario", "«Ropa de oficina»", "«Camisa celeste manga larga, sin corbata, pantalón gris oscuro, reloj metálico en muñeca izquierda»"],
            ["Actitud", "«Serio y confiable»", "«Habla pausado, mira directo a cámara, gesticula poco, sonríe solo al cerrar una idea»"],
            ["Referencias visuales", "Ninguna", "2-3 fotos reales que capturen ese físico y esa actitud, no ilustraciones"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "La columna de la izquierda parece suficiente hasta que generas el segundo plano y el personaje ya cambió. La columna de la derecha es la que sostiene la cara y la actitud entre veinte generaciones distintas.",
        },
      ],
    },
  ],

  // ── CHECKLIST ─────────────────────────────────────────────────
  "checklist-parece-agencia": [
    {
      titulo: "Por qué existe este checklist",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La diferencia entre una pieza que parece hecha con IA y una que parece de agencia casi nunca está en la generación. Está en el acabado. Dos personas con los mismos clips crudos entregan cosas distintas, y lo que las separa es una lista de detalles que se revisan siempre, en el mismo orden.",
        },
        {
          tipo: "parrafo",
          texto:
            "Esta es esa lista. Se pasa antes de exportar, sin excepciones, incluso cuando estás apurado — sobre todo cuando estás apurado, porque es cuando se cometen los errores que el cliente sí nota.",
        },
      ],
    },
    {
      titulo: "El checklist, en orden",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Ritmo: ningún plano se queda más de lo que aporta. Si al ver la pieza tu atención se va en algún punto, ese plano sobra o está largo.",
            "Corte a tiempo: los cortes caen con el beat o con el acento de la locución, no en cualquier parte.",
            "Primer segundo: el plano de apertura se entiende sin sonido. Ábrelo en silencio y comprueba.",
            "Continuidad de personaje: la misma cara, la misma ropa y el mismo peinado en todos los planos. Es el error que más rápido delata.",
            "Continuidad de producto: color, etiqueta y proporción idénticos en cada aparición.",
            "Manos y texto: revisa cada plano donde aparezcan. Si hay un dedo de más o un letrero ilegible, se cambia el plano.",
            "Color: una sola lógica de color en toda la pieza. Si un plano viene de otra generación, se iguala en el montaje.",
            "Audio: niveles parejos entre locución, música y ambiente. La música nunca compite con la voz.",
            "Silencios: hay al menos un momento donde la pieza respira. Sin respiro no hay contraste y el final no pega.",
            "Tipografía: una familia, dos pesos como máximo. Todo lo demás es ruido.",
            "Zona segura: los textos no quedan tapados por la interfaz de la plataforma en vertical.",
            "Logo: aparece el tiempo suficiente para leerse y no está deformado ni recoloreado.",
            "Cierre: la pieza termina en algo — una acción, una idea, un remate. No se desvanece porque se acabó el material.",
            "Exportación: la proporción y la resolución corresponden a la plataforma donde va, no a la que tenías abierta.",
          ],
        },
      ],
    },
    {
      titulo: "Los tres que más se saltan",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Detalle", "Por qué se salta", "Qué pasa si lo saltas"],
          filas: [
            ["Ver la pieza en silencio", "Da flojera y ya la viste veinte veces", "El 80% del scroll ocurre sin sonido: si no se entiende muda, no se entiende"],
            ["Igualar el color entre planos", "Cada plano se ve bien por separado", "Juntos se nota que vienen de generaciones distintas y la pieza se siente armada"],
            ["Dejar un silencio", "Parece tiempo desperdiciado", "Sin contraste el cierre no golpea y la pieza se siente plana aunque todo esté bien hecho"],
          ],
        },
        {
          tipo: "cita",
          texto: "El cliente no sabe qué está mal. Solo sabe que algo se siente barato. Casi siempre es uno de estos catorce puntos.",
        },
      ],
    },
  ],
};
