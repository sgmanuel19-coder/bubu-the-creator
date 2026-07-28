import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// GUÍAS DE PENSAMIENTO CREATIVO (2 de 2)
// Estructuras narrativas · Headlines · Géneros · Arquitectura
// Salen del Cerebro de Aprendizaje (DOC 14, 15, 35, 30).
// Estándar: guía formativa, con ejemplos reales y adaptación por
// duración. La primera mitad vive en guias-creatividad.ts.
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_NARRATIVA: Record<string, SeccionRecurso[]> = {
  // ── 5. ESTRUCTURAS NARRATIVAS ─────────────────────────────────
  "estructuras-narrativas": [
    {
      titulo: "Estructura, formato y género son tres cosas distintas",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Antes de escribir hay que separar tres decisiones que la mayoría toma revueltas, y por eso salen guiones que no se entienden. La estructura es el orden en que entregas la información. El formato es la duración y el soporte donde vive. El género es el contrato emocional que le prometes a quien mira.",
        },
        {
          tipo: "tabla",
          columnas: ["Dimensión", "Qué decide", "Ejemplo"],
          filas: [
            ["Estructura", "El orden de la información", "Empiezo por el problema, o empiezo por el final"],
            ["Formato", "Duración, proporción y plataforma", "15 segundos vertical para reels"],
            ["Género", "Cómo se va a sentir", "Drama emocional, comedia, documental"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Las tres se combinan libremente: un Problem-Solution puede ser comedia de 15 segundos o drama de 60. Pero hay que elegirlas por separado y en ese orden. Cuando alguien dice «hagamos algo emotivo de un minuto», está eligiendo género y formato pero no estructura — y eso es exactamente lo que produce piezas bonitas que no llevan a ningún lado.",
        },
      ],
    },
    {
      titulo: "Las 10 estructuras, con su cuándo sí y su cuándo no",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Estructura", "Cómo ordena", "Cuándo sí", "Cuándo NO"],
          filas: [
            ["Problem-Solution", "Muestra el dolor, luego el producto como salida, luego el resultado", "Conversión directa y necesidades latentes que la gente no había nombrado", "Marcas premium: recordarle al comprador que tiene un problema abarata la marca"],
            ["Before-After-Bridge", "Estado actual → el producto como puente → estado deseado", "Consideración y decisión, cuando la transformación es visible", "Cuando el cambio no se puede mostrar sin exagerar"],
            ["Hero's Journey corto", "Mundo ordinario, llamado, prueba, transformación — comprimido", "Marca aspiracional y construcción de personaje a largo plazo", "Piezas de 15 segundos: no hay espacio para el mundo ordinario"],
            ["In Medias Res", "Arranca en el clímax y explica después", "Retención en los primeros segundos, formatos verticales", "Cuando la explicación posterior es más aburrida que el arranque"],
            ["Reverse Story", "Empieza por el final y va hacia atrás hasta el origen", "Cuando el giro ES el mensaje y el producto es el punto de partida", "Públicos distraídos: exige atención sostenida para que el giro pague"],
            ["The Confession", "Alguien admite algo que normalmente se calla", "Cercanía y credibilidad, marcas retadoras", "Cuando la confesión no es realmente incómoda: se lee falsa"],
            ["Testimonial Narrativo", "Una persona real cuenta su recorrido completo", "Prueba social con emoción, categorías de alta desconfianza", "Cuando suena guionado: pierdes lo único que aportaba"],
            ["Comparación Dramática", "Dos realidades enfrentadas en paralelo", "Posicionamiento de retador y demostración de diferencia", "Cuando la diferencia real es mínima: se nota el truco"],
            ["Demostración Sorprendente", "El producto hace algo que no se cree hasta verlo", "Diferenciación funcional genuina", "Cuando hay que exagerar para que sorprenda: destruye credibilidad"],
            ["¿Y Si...? Especulativo", "Plantea un mundo hipotético y lo habita hasta el final", "Awareness y conversación cultural", "Cuando el negocio necesita conversión esta semana"],
          ],
        },
      ],
    },
    {
      titulo: "Cuatro casos que valen por un curso",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Head & Shoulders, «La primera impresión» — Problem-Solution bien hecho: no muestra la caspa como algo asqueroso, la muestra como el elemento que sabotea la primera impresión. El problema no es el síntoma, es lo que el síntoma te cuesta socialmente. Ahí está la diferencia entre un comercial de farmacia y una campaña.",
            "Nike, «Find Your Greatness» — Hero's Journey donde el héroe no es un atleta olímpico sino un niño con sobrepeso corriendo por un camino rural. El mundo ordinario es evidente, y el desafío no es un rival: es la inacción. Demuestra que la estructura no exige épica de presupuesto, exige claridad de conflicto.",
            "Volkswagen, «The Force» — In Medias Res puro: arranca con un niño disfrazado de Darth Vader intentando usar la fuerza sobre los objetos de la casa. Sin explicación, sin contexto, solo la acción. El espectador entra a resolver qué está pasando, y esa pregunta es la que sostiene la atención.",
            "Avis, «We're Number Two. We Try Harder.» — La Confession más famosa de la historia. Avis admitió públicamente ser el segundo del mercado en vez de ocultarlo, y convirtió la desventaja en la razón para elegirlos. Sigue siendo el mejor ejemplo de que la honestidad incómoda vende más que la superioridad inventada.",
          ],
        },
      ],
    },
    {
      titulo: "Adaptar la misma estructura a cada duración",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una estructura no se recorta: se redistribuye. Tomando Problem-Solution como ejemplo, así cambia el reparto de tiempo según la duración.",
        },
        {
          tipo: "tabla",
          columnas: ["Duración", "Problema", "Solución", "Resultado", "Nota"],
          filas: [
            ["15 segundos", "3–4 s, visual o sonoro", "8–10 s", "2–3 s", "Sin agravación: ir directo"],
            ["30 segundos", "5–8 s con una consecuencia breve", "15 s", "5–7 s", "Cabe un solo giro"],
            ["60 segundos", "10–15 s con agravación", "25–30 s", "10–15 s", "Cabe un momento de respiro donde no pasa nada — es lo que hace que el final pegue"],
          ],
        },
        {
          tipo: "lista",
          items: [
            "En vertical, el primer plano tiene que funcionar sin sonido: el 80% del scroll ocurre en silencio.",
            "En 15 segundos no metas subtramas ni personajes secundarios. Una estructura, un conflicto, un desenlace.",
            "El respiro de los 60 segundos no es relleno: es la pausa que crea contraste para el cierre. Quitarlo por «optimizar» es lo que deja los spots planos.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt de guion estructurado",
          contenido:
            "Actúa como guionista publicitario.\n\nConcepto: [tu concepto en una frase]\nMarca: [marca] · Duración: [15/30/60s] · Formato: [vertical/horizontal] · Género: [drama/comedia/documental/etc.]\n\nTAREA\n1. Elige 3 de estas estructuras y justifica por qué encajan con el concepto: Problem-Solution, Before-After-Bridge, Hero's Journey corto, In Medias Res, Reverse Story, The Confession, Testimonial Narrativo, Comparación Dramática, Demostración Sorprendente, ¿Y Si...?\n2. Para cada una, escribe el guion completo plano por plano: qué se ve, qué se escucha, cuántos segundos dura cada plano.\n3. Respeta el reparto de tiempo según la duración que te di.\n4. Marca en qué segundo está el gancho y en qué segundo el giro.\n5. Para cada estructura, dime también su «cuándo NO usarla» aplicado a ESTA marca.\n6. Cierra recomendando una y descartando las otras dos con razones.\n\nEl primer plano tiene que funcionar sin audio.",
        },
      ],
    },
    {
      titulo: "Qué estructura pide cada plataforma",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La plataforma no es solo el lugar donde publicas: cambia el comportamiento de quien mira, y por lo tanto cambia qué estructura sobrevive. La misma historia que funciona en un pre-roll se muere en un reel, no por calidad sino por arquitectura.",
        },
        {
          tipo: "tabla",
          columnas: ["Dónde vive", "Cómo llega el espectador", "Estructuras que aguantan", "Estructuras que se caen"],
          filas: [
            ["Reels y TikTok", "Scrolleando, en silencio, listo para irse", "In Medias Res · Demostración Sorprendente · The Confession", "Hero's Journey: se va antes de que llegues al llamado"],
            ["YouTube pre-roll", "Esperando otro contenido, con el dedo en «saltar»", "Problem-Solution · Comparación Dramática", "Reverse Story: el giro llega después de que ya saltó"],
            ["Feed de Meta", "Navegando, con más tolerancia que en vertical", "Before-After-Bridge · Testimonial Narrativo", "¿Y Si...?: necesita más aire del que hay"],
            ["Landing o web propia", "Buscando activamente, dispuesto a leer", "Testimonial Narrativo · Problem-Solution largo", "In Medias Res: ya vino con intención, no hace falta atraparlo"],
            ["Spot de TV o evento", "Público cautivo, con sonido", "Hero's Journey · Reverse Story · ¿Y Si...?", "Demostración Sorprendente sola: se agota en un visionado"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "La consecuencia práctica: no adaptes un spot recortándolo para vertical. Reescribe la estructura. Un spot de 60 segundos convertido a 15 con tijera es un spot mutilado; lo correcto es tomar el mismo concepto y escribirle una estructura nueva que funcione en ese contexto.",
        },
        {
          tipo: "nota",
          texto:
            "Esto es lo que justifica cobrar por adaptación en vez de regalarla. Adaptar bien no es exportar en otra proporción: es volver a escribir.",
        },
      ],
    },
    {
      titulo: "El error que se repite en todas las estructuras",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Independientemente de cuál elijas, hay un fallo que aparece una y otra vez: gastar demasiado tiempo en el planteamiento y quedarse sin aire para el desenlace. El guion se escribe de principio a fin, y para cuando llegas al final ya gastaste el presupuesto de segundos.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Escribe el final primero", detalle: "Qué queda en la cabeza del espectador cuando termina. Si no lo sabes, no empieces el guion." },
            { titulo: "2. Asigna segundos antes de escribir", detalle: "Reparte la duración total entre las partes de la estructura y respétalo como si fuera presupuesto. Porque lo es." },
            { titulo: "3. Escribe el desenlace en su tiempo asignado", detalle: "Si no cabe, el problema no es el final: es que el planteamiento se comió su espacio." },
            { titulo: "4. Recién ahí escribe el inicio", detalle: "Con lo que sobra. Vas a descubrir que se puede plantear en la mitad del tiempo que creías." },
          ],
        },
        {
          tipo: "cita",
          texto: "Nadie recuerda el planteamiento. Todos recuerdan el final. Escribe en ese orden.",
        },
      ],
    },
  ],

  // ── 6. HEADLINES ──────────────────────────────────────────────
  "formulas-de-headline": [
    {
      titulo: "Respuesta directa y marca no se escriben igual",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Antes de elegir una fórmula hay que saber qué tipo de copy estás escribiendo, porque las reglas de los dos se contradicen. Mezclarlos es la trampa más común, y produce anuncios que no consiguen ninguna de las dos cosas.",
        },
        {
          tipo: "tabla",
          columnas: ["", "Respuesta directa", "Copy de marca"],
          filas: [
            ["Titular", "Promete un beneficio específico y verificable", "Construye un territorio, puede ser ambiguo"],
            ["Cuerpo", "Anticipa y desmonta objeciones una por una", "Deja espacio para el silencio y la metáfora"],
            ["Urgencia", "Real o construida, siempre presente", "Rara vez aparece"],
            ["CTA", "Claro, único y repetido", "Puede no existir"],
            ["Lenguaje", "Coloquial, cercano, casi conversacional", "Voz de marca consistente y distintiva"],
            ["Prueba", "Social, garantías, testimoniales, cifras exactas", "La forma del texto es parte del contenido"],
            ["Qué mide", "Conversión inmediata", "Recordación y preferencia en el tiempo"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Un anuncio con alma de branding y CTA de performance no logra ninguna de las dos. Decide primero cuál estás escribiendo y no lo mezcles a mitad de camino.",
        },
      ],
    },
    {
      titulo: "Las 8 fórmulas, con su estructura exacta",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Fórmula", "Estructura", "Ejemplo", "Por qué funciona"],
          filas: [
            ["Promesa directa de beneficio", "Resultado específico + tiempo específico + objeción eliminada", "«Pierde hasta 12 kilos en 30 días sin dejar el pan»", "El cerebro compra concreción, no adjetivos. El «sin…» desactiva la duda antes de que aparezca"],
            ["El «cómo» instructivo", "Cómo [resultado] en [tiempo] sin [objeción]", "«Cómo duplicar tus seguidores en 60 días sin publicar todos los días»", "«Cómo» se procesa como promesa de información útil, no como venta"],
            ["Pregunta de identificación", "¿Eres de los que…?", "«¿Eres de los que revisan el teléfono antes de levantarse?»", "Si el lector se dice que sí, ya entró en el texto"],
            ["El aviso", "Nunca [acción] antes de [leer/ver] esto", "«Nunca contrates a un diseñador antes de leer esto»", "La prevención de pérdida pesa más que la promesa de ganancia"],
            ["El número que organiza", "N [errores/formas/razones] que [grupo] comete", "«7 errores que cometen todos los que empiezan a invertir»", "El número promete estructura; «todos» crea identificación y alivia la culpa"],
            ["El contraste sorprendente", "Dos realidades opuestas en dos frases", "«La empresa más pequeña de su industria. El cliente más grande del mundo»", "El lector necesita resolver la contradicción y para eso tiene que seguir leyendo"],
            ["El testimonio como headline", "La frase textual de alguien que ya pasó por ahí", "«Dejé mi trabajo el martes. El jueves ya ganaba más»", "Prueba social sin sonar a publicidad, porque no la dice la marca"],
            ["La afirmación contraintuitiva", "Lo contrario de lo que repite toda la categoría", "«Deja de publicar todos los días»", "Rompe el piloto automático del scroll: obliga a verificar si leíste bien"],
          ],
        },
      ],
    },
    {
      titulo: "El copy como arquitectura",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La forma del texto es parte del contenido. Antes de escribir la primera línea conviene decidir la arquitectura: cuántos bloques tiene, dónde respira, dónde se acelera. Un párrafo largo comunica algo distinto que cuatro frases cortas seguidas, aunque digan exactamente lo mismo.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Define el nivel de consciencia", detalle: "Si la persona no sabe que tiene el problema, la promesa directa no le dice nada. Ahí funcionan la pregunta de identificación, el contraste o la contraintuitiva. La promesa directa es para quien ya sabe qué busca." },
            { titulo: "2. Escribe la objeción principal antes del titular", detalle: "La mayoría de fórmulas mejoran cuando les agregas el «sin…» que desactiva la duda. Si no sabes cuál es la objeción, todavía no estás listo para escribir." },
            { titulo: "3. Escribe cinco versiones con cinco fórmulas distintas", detalle: "Nunca elijas la primera. La primera es la más obvia porque es la que ya viste mil veces en la categoría." },
            { titulo: "4. Léelas en voz alta", detalle: "La que se traba al leerla se traba al escucharla, y en video todo se escucha." },
            { titulo: "5. Tápale el logo", detalle: "Si el titular le sirve igual a tu competidor, no es tuyo todavía." },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt de titulares",
          contenido:
            "Actúa como copywriter publicitario.\n\nProducto: [qué es]\nPúblico: [descríbelo por su situación, no por edad]\nNivel de consciencia: [no sabe que tiene el problema / sabe el problema / conoce soluciones / conoce mi marca]\nObjeción principal: [la duda real que frena la compra]\nTipo de copy: [respuesta directa / marca]\n\nTAREA\n1. Escribe 8 titulares, uno por cada fórmula: promesa directa, cómo instructivo, pregunta de identificación, aviso, número que organiza, contraste sorprendente, testimonio, afirmación contraintuitiva.\n2. En cada uno incorpora la objeción como «sin…» donde la fórmula lo permita.\n3. Descarta tú mismo los que no correspondan al nivel de consciencia que te di, y explica por qué.\n4. Marca cuáles le servirían igual a un competidor genérico.\n5. Ordena los sobrevivientes del más fuerte al más débil.\n\nProhibido: «revoluciona», «lleva tu negocio al siguiente nivel», «descubre el secreto».",
        },
      ],
    },
    {
      titulo: "Los 4 niveles de consciencia: el filtro que decide todo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un titular no es bueno o malo en abstracto: es bueno o malo para alguien que está en un punto concreto del recorrido. El mismo texto que convierte a quien ya conoce tu marca puede ser invisible para quien ni siquiera sabe que tiene el problema. Esta es la causa número uno de campañas con buen copy y mal resultado.",
        },
        {
          tipo: "tabla",
          columnas: ["Nivel", "En qué está la persona", "Qué fórmulas funcionan", "Qué fórmula la espanta"],
          filas: [
            ["No sabe que tiene el problema", "Vive con la molestia y la naturalizó", "Pregunta de identificación · afirmación contraintuitiva · contraste sorprendente", "Promesa directa: promete resolver algo que no sabe que tiene"],
            ["Sabe el problema, no las soluciones", "Le molesta pero cree que no hay salida", "El aviso · el número que organiza · testimonio", "Comparativas: todavía no puede comparar nada"],
            ["Conoce soluciones, no la tuya", "Está evaluando alternativas", "Cómo instructivo · contraste · promesa con «sin…»", "Pregunta de identificación: ya pasó esa etapa y se siente tratado como novato"],
            ["Te conoce, no compró", "Le falta desactivar una objeción concreta", "Promesa directa con la objeción adentro · testimonio · el aviso", "Contraintuitiva: la confunde justo cuando estaba por decidir"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Para tu propio negocio esto se traduce directo: en pauta fría casi todo tu público está en los dos primeros niveles, así que la promesa directa rinde poco. En retargeting y en tu lista, están en los dos últimos, y ahí la promesa directa es exactamente lo que hace falta. El mismo producto, dos copys opuestos.",
        },
        {
          tipo: "nota",
          texto:
            "Antes de escribir, anota en una línea en qué nivel está quien va a leer. Si no lo sabes, eso es la investigación que te falta, no el titular.",
        },
      ],
    },
    {
      titulo: "Los 6 errores que matan un titular",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Error", "Cómo suena", "Corrección"],
          filas: [
            ["Adjetivar en vez de concretar", "«Resultados increíbles para tu marca»", "«Tres reels al mes que no parecen publicidad»"],
            ["Hablar de ti en vez de la persona", "«Somos una agencia de contenido con IA»", "«Tu contenido del mes, listo en una tarde»"],
            ["Prometer sin cuantificar", "«Ahorra tiempo en tu producción»", "«De tres semanas de producción a cuatro días»"],
            ["Meter dos ideas en un titular", "«Aprende IA y consigue clientes premium»", "Elige una: la otra es el subtítulo o es otra campaña"],
            ["Usar el vocabulario de la categoría", "«Soluciones integrales de comunicación 360»", "Escríbelo como se lo dirías a un amigo en un café"],
            ["Ignorar la objeción real", "«Videos con IA para tu negocio»", "«Videos con IA que no parecen hechos con IA»"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "El último es el más rentable de corregir. Casi todos los titulares mejoran cuando les incorporas la duda que frena la compra, porque el lector siente que ya pensaste en lo que él iba a objetar. Es la diferencia entre vender y conversar.",
        },
        {
          tipo: "cita",
          texto: "Si tu titular le sirve igual a tu competidor, todavía no escribiste el titular: escribiste la categoría.",
        },
      ],
    },
    {
      titulo: "Lo que va después del titular",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El titular solo compra la siguiente línea. Esa es toda su función. Si el subtítulo no sostiene lo que el titular prometió, ganaste la atención y la perdiste en dos segundos — que es peor que no haberla ganado, porque el lector se siente engañado.",
        },
        {
          tipo: "tabla",
          columnas: ["Pieza", "Su único trabajo", "Error típico"],
          filas: [
            ["Titular", "Que lea la línea siguiente", "Intentar explicarlo todo y no dejar razón para seguir"],
            ["Subtítulo", "Concretar la promesa y desactivar la primera duda", "Repetir el titular con otras palabras"],
            ["Primer párrafo", "Demostrar que entiendes la situación de quien lee", "Empezar hablando de la empresa"],
            ["Prueba", "Hacer creíble lo prometido", "Testimonios genéricos sin nombre ni cifra"],
            ["CTA", "Decir exactamente qué pasa al hacer clic", "«Más información», que no promete nada"],
          ],
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Escribe titular y subtítulo como pareja", detalle: "Nunca por separado. El subtítulo es donde metes lo concreto que no cabía arriba: el plazo, el número, el «sin…»." },
            { titulo: "2. Abre el cuerpo con la situación del lector", detalle: "Una frase que describa su día, no tu servicio. Si acierta, ya te ganaste el resto del texto." },
            { titulo: "3. Pon la objeción principal en el tercio inicial", detalle: "No la escondas al final. La duda que no desactivas temprano es la que hace abandonar la lectura." },
            { titulo: "4. Un solo CTA, repetido", detalle: "Dos llamados distintos compiten y ninguno gana. Si hay dos acciones posibles, hay dos piezas." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Regla práctica para anuncios: si el texto no cabe en las tres líneas que Meta muestra antes del «ver más», reescríbelo. Lo que va después del corte lo lee muy poca gente.",
        },
      ],
    },
  ],

  // ── 7. GÉNEROS ────────────────────────────────────────────────
  "generos-del-storytelling": [
    {
      titulo: "El género es un contrato emocional",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuando eliges un género le estás prometiendo a la audiencia cómo se va a sentir. Y esa promesa condiciona todo lo que viene después: casting, música, ritmo de edición, paleta de color y hasta el tipo de lente. Elegir mal el género es la causa silenciosa de campañas que se sienten raras sin que nadie sepa explicar por qué — el problema no está en ninguna pieza, está en que se prometió una cosa y se entregó otra.",
        },
        {
          tipo: "parrafo",
          texto:
            "Hay una distinción que decide el resultado en los géneros aspiracionales: si el protagonista es la marca o sus valores, estás predicando. Si el protagonista es la persona que vive esos valores, estás inspirando. La diferencia entre una campaña que emociona y una que da vergüenza ajena suele ser exactamente esa.",
        },
      ],
    },
    {
      titulo: "Los 10 géneros",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Género", "Qué promete", "Para qué categorías", "Riesgo principal"],
          filas: [
            ["Drama emocional", "Que te va a mover", "Seguros, alimentos, telecomunicaciones, causas sociales, ropa de ocasión", "Caer en melodrama y perder credibilidad"],
            ["Comedia", "Que te vas a reír", "Consumo masivo, categorías de baja implicación", "Que el chiste tape la marca y nadie recuerde quién era"],
            ["Thriller / suspenso", "Que algo va a pasar", "Productos que resuelven un problema urgente; diferenciación en categorías saturadas de positividad", "El suspenso que no resuelve frustra en vez de intrigar; y exige producción a la altura o cae en ridículo"],
            ["Inspiracional / épico", "Que te vas a sentir capaz", "Deporte, educación, emprendimiento", "Predicar en vez de inspirar: pasa cuando el protagonista es la marca"],
            ["Documental / slice of life", "Que esto es verdad", "Categorías con desconfianza alta", "Aburrir por falta de conflicto"],
            ["Fantasía / surreal", "Que vas a ver algo que no existe", "Moda, bebidas, tecnología", "Belleza vacía sin idea debajo"],
            ["Testimonial narrativo", "Que le pasó a alguien real", "Salud, finanzas, formación", "Sonar guionado y perder lo único que aportaba"],
            ["Mockumentary / parodia", "Que se van a burlar de algo conocido", "Marcas retadoras con público cómplice", "Que el público no capte la broma y la lea literal"],
            ["Épico / cine publicitario", "Que vas a ver una película", "Lanzamientos grandes, automotriz, deportivas", "Presupuesto visible e idea invisible"],
            ["Participativo / interactivo", "Que vas a ser parte", "Plataformas sociales, comunidades", "Pedir participación sin dar nada a cambio"],
          ],
        },
      ],
    },
    {
      titulo: "Tres casos y por qué funcionaron",
      bloques: [
        {
          tipo: "lista",
          items: [
            "P&G, «Thank You Mom» — Drama emocional sostenido en varias piezas, mostrando madres que apoyan a futuros atletas olímpicos desde la infancia. El producto (detergente, pañales, limpieza) aparece de forma funcional dentro de la historia, no interrumpiéndola. Es el ejemplo de que el drama funciona cuando el producto es parte del mundo, no el protagonista.",
            "Old Spice, «The Man Your Man Could Smell Like» — Comedia construida sobre personaje: el humor emerge de quién es, no de lo que pasa. Transiciones imposibles sin cortes visibles, premisa absurda y tono completamente serio. La ejecución impecable es lo que sostiene lo absurdo; con producción floja habría sido un chiste malo.",
            "Honda, «The Other Side» — Thriller usado con precisión: el espectador alterna entre dos versiones de la misma historia, una vida familiar cotidiana y una vida de crimen. La mecánica de suspenso está al servicio de una idea de producto (dos caras del mismo auto), no encima de ella.",
          ],
        },
      ],
    },
    {
      titulo: "El género decide el prompt",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Esto importa el doble cuando produces con IA. El género define parámetros concretos de generación, y si lo eliges después de generar las imágenes terminas montando piezas que pelean entre sí.",
        },
        {
          tipo: "tabla",
          columnas: ["Género", "Plano y lente", "Luz", "Ritmo de corte"],
          filas: [
            ["Drama emocional", "Cerrado, focal larga, poca profundidad", "Suave, direccional, sombras presentes", "Cortes largos, respiraciones"],
            ["Comedia", "Abierto, focal media", "Plana y pareja", "Cortes secos y rápidos"],
            ["Documental", "Cámara en mano, focal normal", "Disponible, sin diseño evidente", "Irregular, con imperfección"],
            ["Épico", "Gran angular, escala", "Contraste alto, contraluces", "Acumulativo hacia el clímax"],
            ["Thriller", "Encuadres desbalanceados", "Baja clave, mucho negro", "Acelerando"],
          ],
        },
        {
          tipo: "cita",
          texto: "Primero el contrato emocional, después el prompt. Nunca al revés.",
        },
        {
          tipo: "nota",
          texto:
            "Se pueden mezclar géneros, pero solo de a dos y con uno claramente dominante. Tres géneros en una pieza de 30 segundos no es riqueza, es ruido.",
        },
      ],
    },
    {
      titulo: "Cómo elegir el género según el objetivo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El género no se elige por gusto ni por lo que está de moda: se elige por lo que la pieza tiene que lograr. Un objetivo de conversión y uno de recordación piden contratos emocionales distintos, y forzar el equivocado es tirar el presupuesto por el lado más caro.",
        },
        {
          tipo: "tabla",
          columnas: ["Objetivo", "Géneros que rinden", "Por qué", "Qué evitar"],
          filas: [
            ["Conversión inmediata", "Testimonial narrativo · documental · thriller", "Reducen desconfianza y aceleran la decisión", "Fantasía y épico: bonitos, pero no responden la objeción"],
            ["Recordación de marca", "Drama emocional · épico · comedia de personaje", "Se anclan en emoción, que es lo que sobrevive al olvido", "Documental: creíble pero poco memorable"],
            ["Conversación cultural", "Mockumentary · participativo · provocación", "Invitan a tomar posición, y eso se comparte", "Testimonial: no genera debate"],
            ["Educar sobre una categoría nueva", "Documental · slice of life · tutorial", "Explican sin condescendencia", "Surreal: agrega confusión donde falta claridad"],
            ["Diferenciarte en categoría saturada", "Thriller · mockumentary · provocador", "Rompen el registro que todos usan", "Drama emocional: es justo lo que ya hacen todos"],
          ],
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Escribe el objetivo en una frase medible", detalle: "«Que agenden una llamada» es distinto de «que nos recuerden en tres meses». Si no lo escribes, vas a elegir género por gusto." },
            { titulo: "2. Mira qué género usa toda tu categoría", detalle: "Ese es el que probablemente NO deberías usar, salvo que puedas hacerlo mejor que todos." },
            { titulo: "3. Verifica que la marca pueda sostenerlo", detalle: "La comedia exige timing, el thriller exige producción, el documental exige acceso real. Elegir un género que no puedes ejecutar bien es peor que elegir uno modesto." },
            { titulo: "4. Comprométete con el contrato", detalle: "Si prometiste comedia, el cierre no puede ser solemne. Romper el contrato a mitad de la pieza es lo que hace que la gente sienta que algo estuvo raro." },
          ],
        },
      ],
    },
    {
      titulo: "Cómo se rompe un género (y cómo se nota)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El error casi nunca es elegir mal el género: es no sostenerlo. La pieza arranca en un registro y termina en otro, normalmente porque alguien pidió «que se vea más profesional» o «que quede claro el beneficio» sobre un guion que ya estaba resuelto.",
        },
        {
          tipo: "tabla",
          columnas: ["Síntoma que reporta el cliente", "Lo que realmente pasó"],
          filas: [
            ["«Se siente frío»", "Género emocional con edición de ritmo publicitario: los cortes no dejan respirar"],
            ["«No se entiende qué vendemos»", "Comedia donde el chiste ocupó el lugar del producto"],
            ["«Parece de otra marca»", "Se mezclaron dos géneros sin que ninguno dominara"],
            ["«Se ve barato»", "Género épico o thriller sin la producción que exigen"],
            ["«Da vergüenza ajena»", "Inspiracional donde el protagonista es la marca y no la persona"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Cuando un cliente te da un comentario vago, tradúcelo con esta tabla antes de tocar nada. La mitad de las rondas de cambios se resuelven arreglando el género en vez de retocar planos.",
        },
      ],
    },
    {
      titulo: "El género en tu propio contenido",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Esto no aplica solo al trabajo de cliente. Tu propia marca personal también tiene un género, lo hayas elegido o no, y si no lo elegiste probablemente estés alternando entre tres sin darte cuenta — que es exactamente lo que hace que una cuenta no termine de cuajar.",
        },
        {
          tipo: "tabla",
          columnas: ["Género en marca personal", "Qué promete", "Qué te exige"],
          filas: [
            ["Documental / detrás de escena", "Que vas a ver cómo se hace de verdad", "Mostrar el proceso real, incluidos los errores"],
            ["Didáctico", "Que vas a aprender algo aplicable hoy", "Tener método propio, no repetir lo que ya circula"],
            ["Opinión / provocación", "Que vas a escuchar una postura", "Sostenerla cuando te discutan"],
            ["Resultados", "Que vas a ver pruebas", "Tener casos reales que puedas mostrar"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Se puede combinar, pero con la misma regla de siempre: uno domina y otro acompaña. Un perfil que alterna entre didáctico, provocador y resultados sin jerarquía se lee como ruido, aunque cada pieza por separado esté bien hecha.",
        },
        {
          tipo: "cita",
          texto: "Elegir el género es elegir a qué vuelve la gente. Sin elección, no hay a qué volver.",
        },
        {
          tipo: "nota",
          texto:
            "Prueba rápida para saber si ya elegiste: mira tus últimas diez publicaciones seguidas, sin leer las descripciones. Si un desconocido no puede decir en una frase qué tipo de cuenta es, todavía no hay género — hay piezas sueltas que se parecen entre sí solo porque las hizo la misma persona.",
        },
      ],
    },
  ],

  // ── 8. ARQUITECTURA DE CAMPAÑA ────────────────────────────────
  "arquitectura-de-campana": [
    {
      titulo: "Una campaña no es una colección de piezas",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La arquitectura de campaña es lo que hace que veinte piezas se sientan como una sola cosa. Sin ella tienes producción, no campaña: contenido que se acumula sin construir nada, y presupuesto que se gasta sin capitalizarse.",
        },
        {
          tipo: "parrafo",
          texto:
            "El arquitecto de campaña decide qué se dice, a quién, en qué formato, en qué plataforma y en qué momento del recorrido. Esa decisión determina si la idea escala o se muere en la tercera semana. Es un rol distinto al del creativo que produce las piezas, aunque en equipos chicos sea la misma persona — y confundir los dos sombreros es lo que hace que se produzca mucho y se avance poco.",
        },
      ],
    },
    {
      titulo: "Hero / Hub / Help: las tres velocidades",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El modelo nació en el equipo de YouTube de Google, pero sobrevivió a todos los cambios de plataforma porque no describe un canal: describe cómo funciona la atención. La premisa original sigue vigente — no todo el contenido puede ser un evento. Las marcas que solo producen contenido grande no sostienen presencia; las que solo producen contenido utilitario no generan impacto cultural.",
        },
        {
          tipo: "tabla",
          columnas: ["Capa", "Qué es", "Frecuencia", "Qué mide", "Ejemplo en tu operación"],
          filas: [
            ["Hero", "El evento. Busca impacto masivo, cobertura orgánica y conversación", "1 a 4 veces al año", "Alcance, menciones, conversación", "El spot de lanzamiento, la pieza que muestras en la propuesta"],
            ["Hub", "El contenido recurrente que sostiene la relación entre eventos", "Semanal o quincenal", "Retención, suscripción, comunidad", "La grilla mensual, la serie de reels con formato fijo"],
            ["Help", "El contenido útil que responde lo que la gente ya está buscando", "Permanente, siempre disponible", "Búsqueda, intención, conversión", "Tutoriales, respuestas a objeciones, comparativas"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "El error típico de la marca chica es querer hacer solo Hero, porque es lo que se ve en los festivales y en los portafolios. El error de la agencia de contenido es hacer solo Hub, porque es lo que se factura mensual. Sin Help no capturas a quien ya te está buscando — que es el más barato de convertir de los tres.",
        },
      ],
    },
    {
      titulo: "La matriz creativa: cinco ejes",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Antes de producir nada se cruzan cinco ejes: audiencia, mensaje, formato, plataforma y etapa del funnel. Cada celda de esa matriz es una pieza concreta. Lo que era «hacer contenido» se convierte en una lista, y de paso queda a la vista qué celdas están vacías — que suele ser la información más útil de todo el ejercicio.",
        },
        {
          tipo: "tabla",
          columnas: ["Audiencia", "Etapa", "Mensaje", "Formato", "Capa"],
          filas: [
            ["No usuario de la categoría", "Awareness", "¿Sabes cuánto te está costando esto?", "Video 15s vertical", "Hero"],
            ["Usuario de la competencia", "Consideración", "Lo que tu proveedor actual no te dice", "Comparativa en carrusel", "Hub"],
            ["Ya te conoce, no compra", "Conversión", "La objeción concreta, desactivada", "Testimonial 30s", "Help"],
            ["Cliente actual", "Retención", "Cómo sacarle más a lo que ya tienes", "Tutorial", "Help"],
          ],
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Lista tus audiencias reales", detalle: "No demográficas: por relación con la categoría. No usuario, usuario de la competencia, usuario tuyo, ex usuario. Cada una necesita un mensaje distinto aunque el producto sea el mismo." },
            { titulo: "2. Asigna el mensaje por etapa", detalle: "Awareness pregunta, consideración compara, conversión desactiva la objeción, retención enseña a usar mejor. Un mensaje de conversión en awareness se ignora." },
            { titulo: "3. Elige formato y plataforma por celda", detalle: "El mismo mensaje no se dice igual en un reel de 15 segundos que en una landing. La plataforma no es un canal de distribución: es parte del mensaje." },
            { titulo: "4. Marca qué celda es Hero, cuál Hub y cuál Help", detalle: "Si todo te salió Hero, no tienes campaña: tienes una lista de deseos que no vas a poder sostener." },
            { titulo: "5. Recién ahí produce", detalle: "Con la matriz llena, cada prompt sabe para qué celda es. Ese es el momento en que el contenido generado deja de salir genérico." },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt de arquitectura de campaña",
          contenido:
            "Actúa como director de estrategia publicitaria.\n\nMarca: [marca] · Categoría: [categoría]\nBig Idea / Concepto: [pégalo]\nObjetivo del trimestre: [qué debe pasar y cómo se mide]\nPresupuesto de producción: [alto/medio/bajo]\n\nTAREA\n1. Define 4 audiencias por RELACIÓN con la categoría (no por demografía).\n2. Construye la matriz creativa cruzando audiencia × etapa del funnel × mensaje × formato × plataforma.\n3. Clasifica cada celda como Hero, Hub o Help.\n4. Señala qué celdas quedaron vacías y si esa ausencia es un error o una decisión.\n5. Ajusta la matriz al presupuesto: dime qué se cae primero si hay que recortar y por qué.\n6. Entrega la lista final de piezas a producir, ordenada por orden de producción.\n\nSi todas las celdas te salieron Hero, rehaz el ejercicio.",
        },
        {
          tipo: "cita",
          texto: "La diferencia entre una campaña y una colección de piezas es que la campaña sabe qué hace cada pieza.",
        },
      ],
    },
    {
      titulo: "Los 5 errores de arquitectura",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Error", "Cómo se ve", "Qué cuesta"],
          filas: [
            ["Todo Hero", "Cada pieza quiere ser el lanzamiento", "Te quedas sin presupuesto en el mes dos y sin nada que sostenga el resto del año"],
            ["Todo Hub", "Publicar por publicar, grilla llena y nada que destaque", "Presencia sin impacto: nadie te recuerda aunque te vean seguido"],
            ["Cero Help", "Nada que responda lo que la gente ya busca", "Dejas ir al público más barato de convertir, el que ya te estaba buscando"],
            ["Mismo mensaje para todas las audiencias", "Una pieza que le habla a todos", "Le habla a nadie, y la pauta lo confirma con el costo por resultado"],
            ["Producir antes de planear", "La grilla se llena con lo que se pudo grabar", "El contenido no construye nada porque nada estaba dirigido"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "El primero y el último son los más comunes en marcas chicas. El de «todo Hero» viene de mirar portafolios de festival; el de «producir antes de planear» viene de la ansiedad de tener la grilla llena. Los dos se resuelven con la misma disciplina: la matriz antes de la cámara.",
        },
      ],
    },
    {
      titulo: "El reparto de esfuerzo que sí funciona",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "No hay una regla universal, pero sí un punto de partida razonable para una marca que está construyendo presencia con presupuesto acotado. Ajústalo según lo que la data te vaya diciendo, pero empieza por aquí en vez de improvisar.",
        },
        {
          tipo: "tabla",
          columnas: ["Capa", "% del esfuerzo de producción", "% del presupuesto de pauta", "Cadencia"],
          filas: [
            ["Hero", "30%", "40%", "1 pieza por trimestre, con pauta concentrada"],
            ["Hub", "50%", "40%", "Semanal, con pauta constante y baja"],
            ["Help", "20%", "20%", "Se produce una vez y queda permanente"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Fíjate en la asimetría del Help: es el que menos esfuerzo se lleva y el que más dura. Una guía que responde la objeción principal de tu categoría sigue trabajando dos años después, mientras que el Hero se agota en semanas. Es el activo peor aprovechado por casi todo el mundo.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Empieza por el Help", detalle: "Las tres preguntas que todos tus clientes hacen antes de comprar. Eso es contenido que ya tiene demanda comprobada." },
            { titulo: "2. Sigue con el Hub", detalle: "Un formato repetible que puedas sostener sin agotarte. Si no lo puedes hacer cuatro veces al mes, no es tu formato." },
            { titulo: "3. Deja el Hero para cuando tengas los otros dos", detalle: "El evento funciona cuando hay a dónde llevar a la gente que llegó. Sin Hub ni Help, el Hero trae tráfico a una casa vacía." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Esta lógica aplica también a tu propia marca personal, no solo a la de tus clientes. Es exactamente la conversación que tienes pendiente con tu contenido orgánico.",
        },
      ],
    },
    {
      titulo: "De la matriz a la grilla del mes",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La matriz dice qué piezas existen; la grilla dice cuándo salen. Son dos documentos distintos y saltarse el primero es lo que convierte la planificación mensual en una lluvia de ideas apurada el día 28.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Ordena las piezas por dependencia", detalle: "Algunas necesitan que otra exista antes: el Help responde objeciones que el Hero levanta. Producir en desorden obliga a rehacer." },
            { titulo: "2. Agrupa por sesión de producción", detalle: "Todo lo que comparte escenario, vestuario o modelo se produce junto, aunque se publique en semanas distintas. Ahí está el ahorro real." },
            { titulo: "3. Asigna fecha de publicación, no de producción", detalle: "La grilla es un compromiso con la audiencia. La producción va siempre por delante, con al menos dos semanas de colchón." },
            { titulo: "4. Deja huecos a propósito", detalle: "Entre un 15% y un 20% de la grilla sin asignar, para lo que surja: una tendencia, una noticia de la categoría, una pregunta que se repitió en comentarios." },
            { titulo: "5. Marca qué se mide en cada pieza", detalle: "Si una pieza no tiene métrica asignada, no vas a saber si funcionó y vas a repetirla por costumbre." },
          ],
        },
        {
          tipo: "tabla",
          columnas: ["Semana", "Qué sale", "Capa", "Producción"],
          filas: [
            ["1", "Pieza ancla del mes", "Hero o Hub fuerte", "Producida el mes anterior"],
            ["2", "Desarrollo del tema", "Hub", "Misma sesión que la semana 1"],
            ["3", "Respuesta a objeción", "Help", "Se produce una vez y se reutiliza"],
            ["4", "Prueba o caso", "Hub", "Material de cliente, requiere permiso previo"],
            ["Libre", "Reacción a lo que pase", "Hub", "Se produce en el momento"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "El colchón de dos semanas es lo que separa a quien sostiene una grilla de quien la abandona en el mes tres. Producir para publicar el mismo día funciona una vez; como sistema, no.",
        },
      ],
    },
  ],
};
