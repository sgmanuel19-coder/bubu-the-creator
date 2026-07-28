import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// GUÍAS DE PENSAMIENTO CREATIVO (1 de 2)
// Insight · Concepto · Big Idea · Retórica
// Salen del Cerebro de Aprendizaje (DOC 09, 11, 12, 13).
// Estándar: guía formativa, con ejemplos trabajados, errores reales
// y prompts copiables. No resúmenes.
// La segunda mitad vive en guias-narrativa.ts.
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_CREATIVIDAD: Record<string, SeccionRecurso[]> = {
  // ── 1. INSIGHT ────────────────────────────────────────────────
  "insight-los-6-tipos": [
    {
      titulo: "Los cuatro niveles: dónde se queda todo el mundo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La mayoría de briefs que llegan a una agencia traen «insights» que en realidad son observaciones bien redactadas. La diferencia no es de estilo, es de nivel: hay cuatro escalones entre un número de dashboard y una verdad que le sirva a un creativo, y casi todo el mundo se baja en el segundo.",
        },
        {
          tipo: "tabla",
          columnas: ["Nivel", "Pregunta que responde", "Herramienta", "Ejemplo"],
          filas: [
            ["Dato", "¿Qué pasa?", "Analytics, encuestas", "67% de millennials en Lima compra ropa online al menos una vez al mes"],
            ["Observación", "¿Cuándo y cuánto pasa?", "Reportes de mercado", "Compran más ropa online que nadie, pero también devuelven más que nadie"],
            ["Hipótesis", "¿Por qué pasa?", "Análisis cualitativo", "Piden varias tallas para probarse en casa y devolver lo que no funciona, compensando que no hay probador"],
            ["Insight", "¿Qué revela sobre el ser humano?", "Empatía y escucha", "No están eligiendo ropa: están buscando una versión de sí mismos que se sienta bien. Devolver ocho de diez no es indecisión, es el ritual de autodefinición que la tienda física ya no les permite hacer en privado"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Fíjate en lo que cambia entre la hipótesis y el insight. La hipótesis explica el comportamiento y se queda en lo racional: «compensan la falta de probador». El insight toca la emoción y de pronto hay algo que contar: alguien encerrado en su cuarto probándose diez prendas está haciendo algo mucho más íntimo que comprar. Ese salto es todo el oficio.",
        },
        {
          tipo: "parrafo",
          texto:
            "Un analista trabaja bien en los tres primeros niveles. Un director creativo vive en el cuarto. No es cuestión de inteligencia: es la pregunta que se hace. El estratega siempre está preguntando qué dice esto sobre cómo se siente una persona consigo misma.",
        },
        {
          tipo: "nota",
          texto:
            "Prueba de dos segundos: si tu insight se puede graficar, no es un insight. Es un dato con buena redacción. Los insights no tienen eje Y.",
        },
      ],
    },
    {
      titulo: "Por qué el insight es la palanca de todo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Toda campaña tiene que responder una pregunta antes de escribir una línea de copy: ¿por qué le debería importar esto a alguien? La respuesta honesta, en el 90% de los casos, es que no hay razón. Los productos se parecen, los mensajes se parecen, y el presupuesto ya no compra atención.",
        },
        {
          tipo: "parrafo",
          texto:
            "Lo único que rompe esa indiferencia es encontrar algo que ya vivía dentro del consumidor — una tensión, una verdad, una emoción sin nombre — y articularlo de forma que la persona sienta que la marca la entiende mejor de lo que ella misma se entiende. El insight no produce información ni sorpresa: produce reconocimiento. «Eso es exactamente lo que yo siento, ¿cómo lo supieron?»",
        },
        {
          tipo: "parrafo",
          texto:
            "El caso Dove lo muestra completo. El dato era que solo el 4% de las mujeres se describía a sí misma como bella. Ese número por sí solo no dice nada: podrías haber hecho una campaña de autoestima genérica con él. El insight fue otro: las mujeres sí saben intelectualmente que son bellas, pero ninguna se siente autorizada a decirlo en voz alta, porque la industria de la belleza definió un estándar inalcanzable y las mantiene en aspiración perpetua. Eso generó Real Beauty, que no solo vendió jabón — redefinió una categoría y sostuvo a la marca en la conversación cultural por dos décadas.",
        },
        {
          tipo: "cita",
          texto: "Sin insight, aunque tengas presupuesto ilimitado, estás empujando sin palanca.",
        },
      ],
    },
    {
      titulo: "Los 6 tipos y cuándo excavar en cada uno",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Dejar de esperar la inspiración empieza por saber dónde cavar. La verdad de una marca no vive en un solo lugar: vive en seis, y cada uno se busca con un método distinto y trae riesgos distintos.",
        },
        {
          tipo: "tabla",
          columnas: ["Tipo", "Qué es", "Cuándo lo usas", "Su riesgo"],
          filas: [
            ["Consumer", "Una verdad sobre el comportamiento o la motivación del consumidor que aún no se ha dicho en voz alta", "El más común y el más buscado: sirve casi siempre", "Es el más difícil: exige pasar de lo que la gente declara a lo que no se atreve a decir"],
            ["Cultural", "Una tensión o cambio en la cultura que la marca puede ocupar de forma auténtica. No es sobre la persona, es sobre el momento histórico", "Cuando la marca tiene autoridad real para meterse en ese tema", "El más poderoso y el más peligroso: si la marca no tiene derecho a hablar, se le devuelve multiplicado"],
            ["Brand", "Una verdad sobre la marca misma que la audiencia siente pero no ha articulado, incluidas sus limitaciones y paradojas", "Cuando la marca se atreve a mirarse al espejo en vez de repetir sus fortalezas", "Requiere una honestidad que la mayoría de comités no aprueba"],
            ["Category", "Una frustración, contradicción o hipocresía que toda la categoría perpetúa", "Arma preferida de la marca retadora que llega tarde", "Si el líder responde bien, te deja sin territorio"],
            ["Behavioral", "Un patrón de comportamiento observado que revela una motivación no obvia. Parte de lo que la gente hace, no de lo que dice", "Cuando necesitas terreno verificable", "Puede quedarse en lo descriptivo si no llegas a la motivación"],
            ["Tension", "Una contradicción entre lo que la persona quiere y lo que hace, puede hacer o se permite hacer. El espacio entre el yo aspiracional y el yo real", "La fuente más fértil de todas: la tensión ya es dramática por sí sola", "Es fácil inventarla en vez de encontrarla"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Un ejercicio útil para ver la diferencia: toma cualquier marca y escribe un insight de cada tipo sobre ella. Vas a notar que unos salen solos y otros se resisten — los que se resisten suelen ser los que nadie en tu categoría ha explorado, y por eso mismo son los que valen.",
        },
      ],
    },
    {
      titulo: "Las tres técnicas que sí producen insights",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "1. Reseñas de 1, 2 y 3 estrellas",
              detalle:
                "Son la fuente más honesta que existe. El consumidor molesto no cuida las palabras, no filtra y no quiere impresionar a nadie. Reúne al menos 200 reseñas del producto y de los competidores, y arma tres columnas: qué elogian, qué critican y qué lenguaje usan. En críticas busca las quejas que se repiten con palabras distintas — eso es insight en bruto. En lenguaje, presta atención a las metáforas: «esto me hace sentir como…» o «esto es lo que necesitaba cuando…» son ventanas directas a la emoción.",
            },
            {
              titulo: "2. Escucha donde la marca no está",
              detalle:
                "No busques lo que se dice de tu marca. Busca lo que se dice del problema que tu marca resuelve, cuando la marca ni siquiera aparece en la conversación. Comentarios de YouTube en reseñas largas, subreddits de la categoría, grupos cerrados de Facebook donde la gente habla sin el performance del perfil público, reseñas detalladas de app stores. Ahí piensa el consumidor en voz alta, sin el filtro de la relación con la marca.",
            },
            {
              titulo: "3. Interroga a ventas y a atención al cliente",
              detalle:
                "Tienen acceso a algo que ninguna investigación replica: conversaciones reales en el momento de máxima sinceridad. Pregúntales qué objeción escuchan siempre, qué pregunta hacen todos antes de comprar, y cuál fue el caso más raro o memorable que atendieron. Esa última es la más fértil: el caso que se recuerda es casi siempre el que rompió el patrón, y el patrón roto señala dónde está la verdad que nadie escribió en el brief.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Las preguntas que la gente hace ANTES de comprar revelan las dudas reales, no las declaradas. Es la lista de objeciones que tu copy tiene que desactivar, servida gratis.",
        },
      ],
    },
    {
      titulo: "Los 5 errores que arruinan un insight",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Error", "Cómo suena", "Cómo se corrige"],
          filas: [
            ["Confundir insight con ejecución", "«El insight es que la gente quiere ver madres fuertes en publicidad»", "Eso es una instrucción de casting. El insight sería: las madres sienten que la publicidad las retrata o perfectas e inalcanzables, o sacrificadas y sin vida propia — y ninguna de esas versiones las hace sentir vistas"],
            ["Generalizar hasta la inutilidad", "«A la gente le importa su familia». «Los consumidores quieren calidad»", "Un insight que le aplica a todos no le habla a nadie. Si no abre una dirección creativa concreta, no sirve"],
            ["Empezar por la solución", "Ya tienes la campaña en la cabeza y buscas el insight que la justifique", "Inevitablemente encuentras lo que quieres encontrar. El insight genera la idea, no la valida a posteriori"],
            ["Ignorar el contexto competitivo", "Un insight verdadero que todos tus competidores ya están usando", "No es ventaja, es precio de entrada. El relevante es el que nadie ha articulado todavía"],
            ["Quedarse en la superficie emocional", "«Los consumidores quieren sentirse seguros»", "Baja un nivel más: quien compra un seguro de vida no lo hace por miedo a morir, lo hace por lo que significa dejar de ser el que sostiene"],
          ],
        },
      ],
    },
    {
      titulo: "Cómo se lo pides a la IA",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Si le pides insights a una IA sin estructura, te devuelve observaciones genéricas con adjetivos bonitos. La única forma de que suba al cuarto nivel es obligarla a recorrer los cuatro escalones en orden, declarar de qué tipo es cada candidato y someterse ella misma al filtro de errores.",
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt de excavación de insight",
          contenido:
            "Actúa como director creativo publicitario con 20 años en el mercado peruano.\n\nCONTEXTO\nMarca: [marca]\nCategoría: [categoría]\nPúblico: [descríbelo por comportamiento y momento de vida, NO por demografía]\nLo que sé hoy: [pega datos duros, reseñas, quejas frecuentes]\nQué dicen los competidores hoy: [3 mensajes que ya están en la categoría]\n\nTAREA\n1. Clasifica lo que te di en DATO / OBSERVACIÓN / HIPÓTESIS. No avances sin clasificar.\n2. Propón 6 insights candidatos, uno por tipo: Consumer, Cultural, Brand, Category, Behavioral y Tension.\n3. Cada uno en UNA frase, en primera persona del consumidor, sin mencionar la marca.\n4. Para cada uno indica: qué verdad no articulada revela, por qué incomoda, y qué historia habilita.\n5. Aplica este filtro y descarta lo que falle: ¿es ejecución disfrazada? ¿es tan general que le aplica a todos? ¿ya lo dice un competidor? ¿se queda en emoción superficial?\n6. Cierra eligiendo el más fértil y explicando por qué los otros cinco lo son menos.\n\nRESTRICCIONES\nProhibido usar «se sienten especiales», «buscan calidad», «valoran su tiempo». Si un candidato se puede graficar, descártalo y reemplázalo.",
        },
        {
          tipo: "nota",
          texto:
            "Cuando te entregue los seis, léelos en voz alta. El que te dé un poco de vergüenza decir en una reunión de cliente suele ser el bueno.",
        },
      ],
    },
  ],

  // ── 2. CONCEPTO ───────────────────────────────────────────────
  "del-insight-al-concepto": [
    {
      titulo: "La jerarquía que casi nadie separa",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Confundir estrategia, concepto, idea y ejecución es la razón número uno por la que una campaña se cae en la segunda pieza. Si lo que tienes es una idea y creías que era un concepto, la campaña no escala: cada pieza nueva arranca de cero y termina pareciendo de otra marca.",
        },
        {
          tipo: "tabla",
          columnas: ["Nivel", "Qué es", "Pregunta que responde", "Cuánto dura"],
          filas: [
            ["Estrategia", "La decisión de negocio: a quién le hablas y qué quieres que pase", "¿Por qué?", "Años"],
            ["Concepto", "La idea organizadora de toda la comunicación", "¿Qué?", "Una campaña completa"],
            ["Idea", "La ocurrencia concreta de una pieza", "¿Cómo?", "Una pieza"],
            ["Ejecución", "El acabado: guion, arte, edición, prompt, montaje", "¿Con qué?", "Una versión"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "La prueba práctica: si le das tu concepto a dos creativos que no se hablan entre sí y ambos vuelven con piezas distintas pero que se sienten de la misma campaña, era concepto. Si vuelven con dos campañas distintas, les diste una estrategia. Si vuelven con la misma pieza, les diste una idea.",
        },
      ],
    },
    {
      titulo: "Qué NO es un concepto",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Un eslogan. El eslogan es la expresión verbal del concepto, no el concepto. Si te quitan el eslogan y no queda nada, no había concepto.",
            "Un insight. El insight es la materia prima; el concepto es lo que haces con ella. Muchos briefs presentan el insight como si ya fuera la idea.",
            "Un beneficio de producto. «Dura más» es un argumento, no un concepto: no organiza nada, solo afirma.",
            "Un tono. «Cercano y divertido» es una decisión de ejecución que puede acompañar a cualquier concepto.",
            "Una ejecución brillante. Un buen recurso visual que solo funciona una vez es una idea, no un concepto — se agota en la segunda pieza.",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Un concepto de verdad cumple tres cosas al mismo tiempo: nace de un insight, se puede ejecutar en formatos distintos sin repetirse, y es lo bastante específico como para orientar decisiones concretas de producción sin necesidad de explicarlo.",
        },
      ],
    },
    {
      titulo: "Los 5 tipos de concepto",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Tipo", "De qué se agarra", "Cuándo conviene", "Cuándo NO"],
          filas: [
            ["De producto", "El producto mismo: su función, su proceso, su efecto. La demostración es la idea, sin metáfora", "Cuando el producto de verdad hace algo que el resto no hace", "Cuando la diferencia funcional es mínima: se vuelve un folleto"],
            ["Emocional", "Una emoción precisa y no obvia como organizadora. No «felicidad» — algo con nombre y apellido, como el orgullo incómodo de ver a tu hijo irse", "Cuando la categoría es paritaria y la diferencia está en cómo se siente", "Cuando el público compra por precio y no por identidad"],
            ["Cultural", "Una conversación que ya está ocurriendo afuera. La marca no la inventa: la identifica, la nombra y la lidera", "Cuando la marca tiene autoridad real para meterse", "Cuando la marca no ha hecho nada en ese tema: se lee como oportunismo"],
            ["De comportamiento", "Una acción concreta que la marca cambia, revela, celebra o cuestiona. Nada de valores abstractos", "Cuando quieres resultados medibles y no solo simpatía", "Cuando el comportamiento pedido es demasiado costoso para la persona"],
            ["Provocador", "Una posición controversial o contraintuitiva, incluso opuesta a lo que se espera de la marca. No busca complacer: busca dividir", "Cuando eres retador y la indiferencia te mata más rápido que el rechazo", "Cuando la marca es líder y tiene más que perder que ganar"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Este cuadro sirve sobre todo para leer lo que te propone la IA. Cuando te entregue diez ideas, clasifícalas por tipo: si las diez caen en el mismo casillero, no te dio variedad, te dio sinónimos. Pídele explícitamente uno de cada tipo.",
        },
      ],
    },
    {
      titulo: "Los 5 filtros de evaluación",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. ¿Nace del insight?", detalle: "Traza la línea hacia atrás. Si no puedes conectar el concepto con la verdad humana que encontraste, es una ocurrencia bonita." },
            { titulo: "2. ¿Sobrevive al forzamiento?", detalle: "Fuérzalo en tres formatos: un spot, un reel y una gráfica sin video. Si en alguno se rompe o se repite igual, no era concepto." },
            { titulo: "3. ¿Es propiedad de esta marca?", detalle: "Tápale el logo. Si le queda igual de bien a tu competidor, no es tuyo." },
            { titulo: "4. ¿Genera más de una pieza?", detalle: "Escribe tres titulares distintos bajo el mismo concepto. Si el tercero ya se siente forzado, se agota rápido." },
            { titulo: "5. ¿Se entiende sin explicación?", detalle: "Cuéntaselo a alguien fuera del proyecto en una frase. Si necesitas el deck, todavía no está." },
          ],
        },
      ],
    },
    {
      titulo: "El concept statement, paso a paso",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un concepto que no está escrito en una frase todavía no existe. El concept statement es la prueba: si no cabe, es porque siguen siendo varias ideas peleando entre sí.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Nombra el insight", detalle: "En una frase, en la voz del consumidor y sin mencionar la marca." },
            { titulo: "2. Declara la tensión", detalle: "Qué se contradice dentro de esa verdad. Sin tensión no hay drama, y sin drama no hay campaña — solo información." },
            { titulo: "3. Define el rol de la marca", detalle: "Qué hace la marca frente a esa tensión: la resuelve, la nombra, la desafía o le da permiso. Solo uno de los cuatro." },
            { titulo: "4. Escribe el concepto", detalle: "Una frase que un creativo pueda ejecutar sin preguntarte nada más." },
            { titulo: "5. Escribe qué NO es", detalle: "Dos o tres cosas que el concepto explícitamente no incluye. Esto evita la mitad de las correcciones posteriores." },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt de conceptualización",
          contenido:
            "Actúa como director creativo. Tengo este insight:\n[pega tu insight en una frase, voz del consumidor]\n\nMarca: [marca] · Categoría: [categoría] · Objetivo de negocio: [qué debe pasar]\nQué NO puede hacer la marca: [restricciones reales, legales o de posicionamiento]\n\nTAREA\n1. Propón 5 conceptos, uno por cada tipo: producto, emocional, cultural, comportamiento y provocador.\n2. Cada uno en UNA frase ejecutable, sin adjetivos de relleno.\n3. Para cada uno: qué tensión resuelve, cuál es el rol de la marca (resolver / nombrar / desafiar / dar permiso) y qué NO incluye.\n4. Fuerza cada concepto en 3 formatos (spot 30s, reel 15s, gráfica sin video) y dime en cuál se rompe.\n5. Tápale el logo mentalmente: dime cuáles le servirían igual a un competidor y descártalos.\n6. Ordena los sobrevivientes de mayor a menor y justifica el orden.\n\nNo me des ejecuciones todavía. Solo conceptos.",
        },
        {
          tipo: "cita",
          texto: "Si el concepto necesita que le expliques el concepto, no es concepto.",
        },
      ],
    },
    {
      titulo: "Cómo se defiende un concepto en una reunión",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un concepto se muere en la reunión de presentación, no en la producción. Y casi nunca se muere porque sea malo: se muere porque se presentó como gusto personal en vez de como decisión razonada. Si el cliente puede opinar, va a opinar; si le muestras el camino que recorriste, va a decidir contigo.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Presenta el insight antes que la idea", detalle: "Nunca abras con la ejecución. Abre con la verdad humana que encontraste. Si el cliente asiente ahí, ya ganaste la mitad — porque lo que viene después es consecuencia de algo que él aceptó." },
            { titulo: "2. Muestra la tensión", detalle: "Explica qué se contradice dentro de esa verdad. La tensión es lo que justifica que haya campaña y no un aviso informativo." },
            { titulo: "3. Declara el rol de la marca", detalle: "«Frente a esta tensión, la marca hace esto». Una sola opción de las cuatro: resolver, nombrar, desafiar o dar permiso." },
            { titulo: "4. Recién ahí el concepto, en una frase", detalle: "Si tuviste que hablar tres minutos para llegar aquí, bien. Lo que no puede pasar es que el concepto necesite otros tres para entenderse." },
            { titulo: "5. Muéstralo en tres formatos", detalle: "Es la prueba de que escala. Un cliente que ve la misma idea funcionando en spot, en reel y en gráfica deja de preguntarse si «da para más»." },
            { titulo: "6. Cierra con lo que el concepto NO es", detalle: "Contraintuitivo pero decisivo: declarar los límites evita la mitad de las correcciones y te posiciona como alguien que ya pensó los bordes." },
          ],
        },
        {
          tipo: "tabla",
          columnas: ["Lo que dice el cliente", "Lo que suele significar", "Cómo responder"],
          filas: [
            ["«No me convence»", "No entendió el insight, no la idea", "Vuelve al insight y verifica si está de acuerdo con esa verdad"],
            ["«¿Y si probamos otra cosa?»", "No vio suficiente evidencia de que esta funcione", "Muestra el concepto en un tercer formato, no propongas otro concepto"],
            ["«Le falta el producto»", "El rol de la marca no quedó claro", "Explica cuál de los cuatro roles ocupa y por qué ese"],
            ["«A mi esposa no le gustaría»", "Está evaluando por gusto propio, no por objetivo", "Devuelve la conversación al público objetivo y a la métrica"],
            ["«Está muy arriesgado»", "Le preocupa una consecuencia concreta que no dijo", "Pregunta qué específicamente le preocupa; casi siempre se resuelve con un ajuste chico"],
          ],
        },
      ],
    },
    {
      titulo: "El concepto en la era de la IA",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La producción se abarató a casi cero, y eso cambió dónde está el valor. Cuando cualquiera puede generar veinte piezas en una tarde, la pieza deja de ser el diferencial. Lo que queda como diferencial es la decisión de qué producir, y esa decisión es el concepto.",
        },
        {
          tipo: "tabla",
          columnas: ["Antes", "Ahora"],
          filas: [
            ["El cuello de botella era producir", "El cuello de botella es decidir qué producir"],
            ["Se pagaba por la ejecución", "Se paga por el criterio que dirige la ejecución"],
            ["Pocas piezas, muy cuidadas", "Muchas piezas: la coherencia entre ellas es el problema nuevo"],
            ["El concepto era una etapa del proceso", "El concepto es lo único que no se puede automatizar"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Ahí está el argumento comercial completo. Un cliente que compra piezas compara precios. Un cliente que compra criterio compara resultados, y ese no se va con el que cobre veinte soles menos. Por eso la conversación de venta empieza en el concepto y no en cuántos videos entregas al mes.",
        },
        {
          tipo: "nota",
          texto:
            "Es también la razón por la que la IA sin Cerebro produce material genérico: no tiene concepto, tiene promedio. El concepto es lo que le das tú.",
        },
      ],
    },
  ],

  // ── 3. BIG IDEA ───────────────────────────────────────────────
  "la-big-idea": [
    {
      titulo: "Arriba del concepto hay otro piso",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La Big Idea no es un concepto más grande: opera en otro nivel. El concepto organiza una campaña; la Big Idea organiza el significado de la marca. Puede durar décadas y puede cambiar de concepto varias veces sin perder identidad. Vive a nivel de significado, no de comunicación — es el «por qué» de toda la arquitectura creativa.",
        },
        {
          tipo: "tabla",
          columnas: ["Nivel", "Qué es", "Duración", "Ejemplo Dove"],
          filas: [
            ["Big Idea", "La verdad humana que la marca defiende", "Décadas", "La belleza real ya existe; el problema es el permiso para reconocerla"],
            ["Concepto", "La idea organizadora de una campaña concreta", "Una campaña", "Real Beauty Sketches: te describes peor de lo que te ven los demás"],
            ["Campaña", "El despliegue en medios y en el tiempo", "Meses", "Lanzamiento global con documental, prensa y activaciones"],
            ["Piezas", "Las ejecuciones concretas", "Días", "El video largo, las gráficas, los cortes verticales"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Una Big Idea puede habitar al mismo tiempo un cartel, un documental de 30 minutos, una experiencia física y una comunidad digital, y en todos se reconoce como la misma cosa. Esa es la prueba de fuego: no que se vea igual, sino que se sienta igual.",
        },
      ],
    },
    {
      titulo: "Por qué casi ninguna campaña tiene una",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La mayoría de campañas no tiene Big Idea y funciona igual durante un trimestre. El costo aparece después: cada año hay que reinventar todo, porque no hay nada arriba que sostenga lo de abajo. El presupuesto del año 2 no capitaliza nada del año 1.",
        },
        {
          tipo: "lista",
          items: [
            "Los ciclos de aprobación premian lo que se entiende rápido en una reunión, y una Big Idea suele incomodar antes de convencer.",
            "El calendario de performance obliga a producir todas las semanas, y producir sin parar deja poco espacio para pensar en el nivel de arriba.",
            "Rotan los equipos: la Big Idea necesita a alguien que la custodie durante años, y ese rol casi nunca existe formalmente.",
            "Es más fácil medir una pieza que un significado, así que se optimiza lo medible y se abandona lo demás.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "Para una marca chica esto es una ventaja: no tienes comité. Puedes decidir tu Big Idea en una tarde y sostenerla, que es exactamente lo que las grandes no logran.",
        },
      ],
    },
    {
      titulo: "Los 5 tipos de Big Idea",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Tipo", "Cómo opera", "Qué la delata como buena"],
          filas: [
            ["Behavioral", "Cambia lo que la gente hace, no lo que piensa. No aspira a que te caiga bien: aspira a modificar una conducta concreta", "Se puede medir en comportamiento, no solo en recordación"],
            ["Cultural", "Se inserta en un movimiento que ya existe. No lo inventa: lo reconoce, lo nombra y le da voz cuando nadie más se anima", "La conversación seguiría existiendo sin la marca, pero la marca la aceleró"],
            ["Product-Truth", "Toma la verdad más inesperada del propio producto y la convierte en territorio", "Nadie más puede usarla, porque el producto es distinto"],
            ["Character-Led", "Un personaje tan sólido que la marca habla a través de él. No es mascota ni vocero: es un arquetipo viviente", "El personaje puede aparecer en contextos nuevos y seguir siendo coherente"],
            ["Participatory", "La audiencia se convierte en el medio. La forma más moderna, y la que mejor se adapta a plataformas sociales", "Participar enriquece a quien participa, no solo a la marca"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "La diferencia entre una Participatory Big Idea y un gimmick viral está justo en ese último punto. En la Big Idea, quien participa se lleva algo — reconocimiento, pertenencia, una herramienta. En el gimmick, quien participa solo aporta alcance gratis.",
        },
      ],
    },
    {
      titulo: "El test de las 5 estrellas",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Jeremy Bullmore proponía evaluar una idea grande por cinco cualidades. Es el filtro más rápido que existe y no requiere investigación: se hace en una hoja.",
        },
        {
          tipo: "lista",
          items: [
            "¿Sobrevive al cambio de formato? Una idea grande vive igual en un cartel, en un video largo y en una comunidad. Si solo funciona en video, es un concepto.",
            "¿Sobrevive al cambio de agencia o de equipo? Si depende de quién la ejecuta, es un estilo, no una idea.",
            "¿Le puede durar diez años? Si se agota en la segunda temporada, era un concepto disfrazado de Big Idea.",
            "¿La puede explicar bien alguien fuera del equipo? Si necesita el deck para entenderse, no está lista.",
            "¿Le incomoda a alguien? Las ideas que no le molestan a nadie tampoco le importan a nadie.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "Cuatro de cinco es una buena idea. Cinco de cinco es rarísimo. Si te dan cinco de cinco a la primera, probablemente te estás calificando a ti mismo con generosidad — pídele a alguien de afuera que lo haga.",
        },
      ],
    },
    {
      titulo: "Big Idea vs. truco creativo",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["", "Big Idea", "Truco creativo"],
          filas: [
            ["Origen", "Una verdad humana", "Un recurso de ejecución"],
            ["Repetición", "Gana fuerza al repetirse", "Se gasta a la segunda vez"],
            ["Extensión", "Genera piezas nuevas sin esfuerzo", "Hay que reinventarlo cada vez"],
            ["Sin la marca", "La verdad sigue siendo cierta", "No queda nada"],
            ["Métrica", "Construye marca en el tiempo", "Pico de atención y caída"],
          ],
        },
        {
          tipo: "cita",
          texto: "Un truco te da una semana buena. Una Big Idea te da una década de trabajo con dirección.",
        },
      ],
    },
    {
      titulo: "Cuatro técnicas para llegar a una",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "No se llega a una Big Idea escribiendo ideas. Se llega subiendo de nivel desde algo que ya tienes: un insight, un concepto que funcionó, una queja repetida. Estas cuatro técnicas son formas distintas de hacer esa subida.",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "1. La escalera del porqué",
              detalle:
                "Toma tu concepto y pregúntale «¿por qué le importa esto a alguien?» cinco veces seguidas, usando cada respuesta como base de la siguiente. Las dos primeras respuestas son sobre el producto. La tercera y la cuarta suelen ser sobre la vida de la persona. La quinta, si llegaste, suele ser la Big Idea. Si en la tercera ya no tienes respuesta, tu concepto no tiene fondo suficiente.",
            },
            {
              titulo: "2. El enemigo común",
              detalle:
                "Pregúntate contra qué está la marca, no a favor de qué. Las ideas grandes casi siempre tienen un antagonista: un estándar injusto, una costumbre absurda, una hipocresía de la categoría, una idea heredada que ya no sirve. Definir el enemigo suele ser más productivo que definir el propósito, porque el enemigo obliga a tomar posición.",
            },
            {
              titulo: "3. El permiso que la marca puede dar",
              detalle:
                "Muchas Big Ideas funcionan porque autorizan algo que la gente ya quería hacer pero no se permitía. Pregúntate qué le está prohibido a tu audiencia — socialmente, no legalmente — y si tu marca tiene derecho a levantarle esa prohibición. Dove dio permiso para llamarse bella. Esa es la mecánica.",
            },
            {
              titulo: "4. La verdad que la marca no quiere decir",
              detalle:
                "Haz la lista de lo que el cliente evita mencionar: la limitación del producto, el precio alto, que llegaron tarde, que son pequeños. Casi siempre hay una Big Idea escondida en la que más incomoda. Avis construyó dos décadas de marca admitiendo que era el número dos.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Estas cuatro técnicas funcionan mejor en una sesión de tres horas con descansos que en una lluvia de ideas de cuarenta minutos. Las primeras respuestas siempre son las obvias; lo bueno aparece cuando ya se te acabaron.",
        },
      ],
    },
    {
      titulo: "Por qué cada vez hay menos",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Las Big Ideas se volvieron raras y no es porque haya menos talento. Es porque el sistema que las producía cambió. Vale la pena entender esto, porque las mismas condiciones que las hacen raras en una corporación son las que a ti te las hacen posibles.",
        },
        {
          tipo: "tabla",
          columnas: ["Condición del mercado", "Qué le hace a la Big Idea", "Tu ventaja"],
          filas: [
            ["Presión de performance semanal", "Se optimiza lo medible y se abandona lo que construye a años", "Tú decides tu horizonte; no le rindes cuentas a un comité trimestral"],
            ["Fragmentación de plataformas", "La idea se diluye adaptándose a cada formato", "Si la idea es fuerte, la adaptación es traducción y no reinvención"],
            ["Rotación de equipos y agencias", "Nadie custodia la idea el tiempo suficiente", "Tú eres la continuidad de tus clientes"],
            ["Aprobación por consenso", "Lo que incomoda se lima hasta volverse inocuo", "Tratas directo con el dueño, no con cuatro capas"],
            ["Abundancia de producción", "Es más fácil producir mucho que pensar una vez bien", "Tu diferencial es justo el pensamiento, no el volumen"],
          ],
        },
        {
          tipo: "cita",
          texto: "La escasez de ideas grandes es tu oportunidad comercial: si casi nadie las tiene, tenerlas te distingue más que cualquier herramienta.",
        },
      ],
    },
    {
      titulo: "Cómo se custodia una Big Idea",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Encontrarla es la parte corta. Lo difícil es que sobreviva dos años de pedidos sueltos, cambios de temporada y gente nueva opinando. Una Big Idea sin custodia se erosiona: cada decisión menor la desvía un grado, y en veinte decisiones ya está en otro lado.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Escríbela en un documento de una página", detalle: "Qué es, qué no es, y tres ejemplos de piezas que sí la encarnan. Todo el que trabaje en la marca lo lee antes de proponer nada." },
            { titulo: "2. Define los límites por escrito", detalle: "«Esta marca nunca hace X» es más útil que diez páginas de valores. Los límites son lo que evita la deriva." },
            { titulo: "3. Evalúa cada pieza contra la idea, no contra el gusto", detalle: "La pregunta en la revisión no es «¿me gusta?» sino «¿esto encarna la idea o solo no la contradice?». No contradecirla no alcanza." },
            { titulo: "4. Revisa la deriva cada trimestre", detalle: "Pon las últimas veinte piezas juntas en una pared. Si vistas en conjunto no se reconoce la idea, ya te desviaste aunque cada pieza pareciera bien." },
            { titulo: "5. Cambia el concepto, no la idea", detalle: "Cuando algo se agota, lo que se renueva es el concepto de campaña. La Big Idea permanece. Confundir los dos niveles es lo que hace que las marcas se reinventen cada año sin capitalizar nada." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Para un cliente tuyo, ser el custodio de su Big Idea es lo que convierte un contrato de producción en una relación de años. La producción se cotiza; la custodia se renueva.",
        },
      ],
    },
  ],

  // ── 4. RETÓRICA ───────────────────────────────────────────────
  "retorica-publicitaria": [
    {
      titulo: "Los tres pilares que no han cambiado en 2.400 años",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Aristóteles dejó los tres pilares de la persuasión y siguen intactos. Logos es el argumento racional: la lógica, la evidencia, la causa y el efecto. Pathos es la apelación emocional: lo que mueve, lo que duele, lo que emociona. Ethos es la credibilidad del emisor: por qué yo, por qué ahora, por qué creerme.",
        },
        {
          tipo: "parrafo",
          texto:
            "Publicidad que solo tiene logos es un folleto técnico. Solo pathos, es un corto bonito que no vende. Solo ethos, es vanidad de marca. La magia ocurre en la intersección, y la mayoría de piezas flojas lo son porque se apoyaron en uno solo.",
        },
        {
          tipo: "parrafo",
          texto:
            "Pero hay algo más profundo. La retórica no es solo el «qué decir»: es el «cómo decirlo para que lo dicho signifique más de lo que las palabras dicen». Eso es exactamente lo que hacen las figuras retóricas. Cada figura es un mecanismo cognitivo que activa en quien recibe algo que el discurso literal nunca podría activar.",
        },
        {
          tipo: "parrafo",
          texto:
            "Cuando Nike dice «Just Do It» no está diciendo «compra zapatillas». Usa elipsis — omite el objeto directo —, modo imperativo y síntesis extrema, y con eso convierte una orden en una invitación existencial que trasciende el producto. Cuando Dove lanza «Real Beauty» está usando antítesis implícita contra toda la industria cosmética, más paradoja: llamar «real» a lo que la categoría trata como insuficiente.",
        },
      ],
    },
    {
      titulo: "Verbal, visual y estructural",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La retórica en publicidad opera en tres planos a la vez, y las piezas más fuertes repiten el mismo mecanismo en los tres. La retórica verbal vive en el texto: titular, locución, copy. La visual vive en la imagen: qué se muestra, qué se oculta, qué se yuxtapone, qué escala se rompe. La estructural vive en el orden: qué se revela primero y qué se guarda.",
        },
        {
          tipo: "nota",
          texto:
            "Cuando el titular usa una figura y la imagen usa otra distinta, la pieza se siente desafinada aunque cada parte esté bien hecha por separado. Es el error más común en material generado con IA, porque el texto y la imagen se pidieron en dos conversaciones distintas.",
        },
      ],
    },
    {
      titulo: "Las 12 figuras aplicadas a publicidad",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Figura", "Qué hace", "Cuándo la usas", "Ejemplo de aplicación"],
          filas: [
            ["Metáfora", "Dice que una cosa es otra y traslada sus atributos", "Cuando el beneficio es abstracto y necesitas volverlo imagen", "Un seguro mostrado como un paraguas que no se ve hasta que llueve"],
            ["Símil", "Compara de forma explícita, con «como»", "Cuando la metáfora sería demasiado ambigua para la categoría", "«Suave como el primer día» en textiles"],
            ["Metonimia", "Nombra algo por otra cosa asociada", "Cuando el símbolo comunica más rápido que el objeto", "Las llaves en la mano para hablar de una casa propia"],
            ["Sinécdoque", "Usa la parte por el todo", "Cuando un detalle cuenta la historia completa", "Solo las manos del abuelo para contar toda una vida de oficio"],
            ["Hipérbole", "Exagera hasta lo imposible", "Comedia y demostración: funciona porque nadie la toma literal", "El producto resistiendo una situación absurda"],
            ["Antítesis", "Enfrenta dos opuestos", "Comparaciones y posicionamiento de retador", "«Antes / después» sin decir antes ni después"],
            ["Paradoja", "Afirma algo que se contradice y aun así es cierto", "Cuando quieres que la gente se detenga a resolverlo", "«Mientras menos hace, mejor funciona»"],
            ["Ironía", "Dice lo contrario de lo que significa", "Públicos que se sienten inteligentes al descifrarla", "Una marca burlándose de su propia categoría"],
            ["Personificación", "Le da voluntad humana a lo que no la tiene", "Producto como protagonista, personajes de marca", "El producto que «decide» actuar por su cuenta"],
            ["Anáfora", "Repite al inicio de cada frase", "Cuando necesitas ritmo y que algo se quede pegado", "«Para el que… Para el que… Para el que…»"],
            ["Elipsis", "Omite deliberadamente", "Cuando el silencio dice más: el espectador completa y se apropia", "El plano que corta justo antes del desenlace"],
            ["Aliteración", "Repite sonidos", "Slogans y nombres que tienen que sobrevivir de boca en boca", "Marcas que se recuerdan por cómo suenan, no por lo que dicen"],
          ],
        },
      ],
    },
    {
      titulo: "Retórica, emoción y comportamiento",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cada figura no solo cambia el significado: cambia la emoción que produce y, con ella, la conducta que habilita. Esta es la parte que convierte la retórica en una herramienta de negocio y no en un adorno de curso de redacción.",
        },
        {
          tipo: "tabla",
          columnas: ["Figura", "Emoción que activa", "Comportamiento que habilita"],
          filas: [
            ["Metáfora", "Comprensión súbita, placer de entender", "Recordar y explicárselo a otro"],
            ["Hipérbole", "Diversión, complicidad", "Compartir"],
            ["Antítesis", "Claridad, toma de posición", "Comparar y elegir"],
            ["Paradoja", "Curiosidad incómoda", "Detenerse y volver a mirar"],
            ["Elipsis", "Participación, intriga", "Completar la historia y apropiársela"],
            ["Anáfora", "Ritmo, acumulación, convicción", "Memorizar el mensaje"],
            ["Personificación", "Empatía hacia el producto", "Preferencia afectiva sobre el genérico"],
          ],
        },
      ],
    },
    {
      titulo: "Úsalas para evaluar, no solo para crear",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Nombra la figura", detalle: "Frente a cualquier pieza, identifica qué mecanismo está operando. Si no encuentras ninguno, probablemente sea literal — y lo literal se olvida." },
            { titulo: "2. Verifica que el mecanismo sirva al mensaje", detalle: "Una hipérbole en una campaña de seguros de salud puede destruir la credibilidad que la categoría necesita." },
            { titulo: "3. Prueba la figura contraria", detalle: "Si tienes metáfora, prueba antítesis. Si tienes hipérbole, prueba elipsis. Casi siempre aparece una ruta mejor que la primera." },
            { titulo: "4. Confirma que sea visual y verbal a la vez", detalle: "Si el texto usa una figura y la imagen otra, alinea las dos antes de producir." },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt de auditoría retórica",
          contenido:
            "Actúa como director creativo. Te voy a pasar una pieza publicitaria (titular + descripción de la imagen).\n\nPIEZA\nTitular: [texto]\nImagen: [describe qué se ve]\n\nTAREA\n1. Nombra la figura retórica del titular y la de la imagen. Si alguna es literal, dilo.\n2. Dime si ambas figuras son la misma o si pelean entre sí.\n3. Clasifica la pieza en logos / pathos / ethos y señala cuál falta.\n4. Reescribe el titular tres veces usando tres figuras distintas: una metáfora, una antítesis y una elipsis.\n5. Para cada versión, dime qué emoción activa y qué comportamiento habilita.\n\nNo evalúes si te gusta. Evalúa el mecanismo.",
        },
        {
          tipo: "nota",
          texto:
            "Este es el filtro más rápido que existe para material generado con IA: pídele que declare qué figura usó en cada propuesta. Las que no puedan nombrarla suelen ser las flojas.",
        },
      ],
    },
    {
      titulo: "Construir una figura desde cero",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Reconocer figuras es la mitad del oficio. La otra mitad es construirlas a propósito, y para eso hay un método: partir del beneficio abstracto y buscarle un vehículo concreto que comparta su estructura, no su apariencia.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Escribe el beneficio en su forma más aburrida", detalle: "«El seguro te protege de gastos imprevistos». Aburrido está bien: necesitas la idea desnuda antes de vestirla." },
            { titulo: "2. Extrae la estructura, no el tema", detalle: "«Algo que no se ve hasta que hace falta, y entonces vale todo». Esa es la estructura. Ya no habla de seguros." },
            { titulo: "3. Busca cinco cosas del mundo con esa misma estructura", detalle: "Un paracaídas, un extintor, un paraguas guardado, la copia de seguridad, el cinturón de seguridad. Ninguna tiene que ver con seguros y todas comparten la lógica." },
            { titulo: "4. Elige la que traiga la emoción correcta", detalle: "El paracaídas trae tensión, el paraguas trae cotidianidad, el extintor trae urgencia. La figura no solo comunica: decide el tono." },
            { titulo: "5. Decide si es metáfora o símil", detalle: "Metáfora si quieres que el espectador haga el salto solo. Símil si el público no comparte tanto contexto y necesitas guiarlo." },
            { titulo: "6. Repítela en la imagen", detalle: "Si el titular usa el paraguas, la imagen no puede usar una familia sonriendo. Misma figura en los dos planos o la pieza se desafina." },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt de construcción de figura",
          contenido:
            "Actúa como director creativo.\n\nBeneficio en su forma más literal: [escríbelo aburrido, sin adjetivos]\nEmoción que quiero que produzca: [una sola, con nombre y apellido]\nMarca: [marca] · Categoría: [categoría]\n\nTAREA\n1. Extrae la ESTRUCTURA lógica del beneficio, sin mencionar la categoría.\n2. Dame 10 objetos, situaciones o fenómenos del mundo real que compartan esa misma estructura y que NO tengan relación con la categoría.\n3. Para cada uno, dime qué emoción trae consigo.\n4. Descarta los que ya sean lugar común en publicidad y dime cuáles descartaste.\n5. Con los 3 mejores, escribe un titular usando metáfora y otro usando símil.\n6. Para cada titular, describe la imagen que usa LA MISMA figura.\n\nNada de «como nunca antes» ni «la mejor versión de ti».",
        },
        {
          tipo: "nota",
          texto:
            "El paso 4 es el que más valor agrega y el que todos se saltan. La primera metáfora que aparece suele ser la que ya usó tu categoría entera; las buenas están en el puesto siete u ocho de la lista.",
        },
      ],
    },
  ],
};
