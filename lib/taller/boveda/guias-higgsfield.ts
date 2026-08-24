import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// GUÍAS DE PRODUCCIÓN CON HIGGSFIELD
// Escritas desde la documentación oficial de Higgsfield (el fabricante)
// y bajadas al flujo real de RESUELTO. Cubren lo que la bóveda no
// tenía: cámara, fallos del modelo, motion, plugins, lotes y MCP.
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_HIGGSFIELD: Record<string, SeccionRecurso[]> = {
  // ── 1. CÁMARA ─────────────────────────────────────────────────
  "control-de-camara-ia": [
    {
      titulo: "Por qué «dolly lento» te da algo distinto cada vez",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un movimiento de cámara es un hecho físico con propiedades exactas: posición de inicio, posición final, una curva de velocidad que puede acelerar o frenar, y una relación entre lente y sujeto que cambia durante todo el recorrido. Nada de eso vive dentro de la frase «dolly lento hacia adelante».",
        },
        {
          tipo: "parrafo",
          texto:
            "El modelo lee esa frase y tiene que inventar todo lo que las palabras dejaron sin decir. Qué tan lento es lento. Dónde exactamente se detiene. Si el fondo se mantiene nítido o se cae de foco a mitad de camino. Cada uno de esos huecos es un lugar donde el modelo adivina, y la adivinanza cambia en cada corrida. La varianza que ves entre generaciones no es un defecto: es la distancia entre lo que el lenguaje puede especificar y lo que una cámara real hace.",
        },
        {
          tipo: "nota",
          texto:
            "Esto vale para cualquier motor, no solo para uno. La regla es universal: donde la herramienta te dé un parámetro real en vez de dejarlo al prompt, usa el parámetro. Mientras más se fija antes de generar, más repetible es el resultado.",
        },
      ],
    },
    {
      titulo: "Los cinco fallos típicos y qué los arregla",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Lo que sale mal", "Por qué pasa", "Qué lo arregla"],
          filas: [
            ["El «dolly lento» corre a otra velocidad en cada generación", "Nunca especificaste velocidad ni curva de aceleración: el modelo la estima de nuevo cada vez", "Movimiento fijado como parámetro, con su curva de velocidad incorporada"],
            ["La cámara se detiene a distinta distancia del sujeto", "Definiste dirección pero no posición final", "Encuadre inicial y final explícitos, fijados antes de generar"],
            ["La nitidez del fondo cambia a mitad del movimiento", "La profundidad de campo nunca se ató a una apertura concreta", "Apertura fijada de forma explícita, independiente del movimiento"],
            ["El mismo prompt da un push suave en una corrida y un zoom brusco en la siguiente", "En lenguaje llano «dolly» y «zoom» se parecen: el modelo adivina cuál querías", "Tipo de movimiento seleccionado directamente, sin ambigüedad"],
            ["La dirección de la luz cambia entre generaciones idénticas", "La posición de la fuente se describió con palabras en vez de fijarse", "Preset de iluminación que fija la posición de la fuente como parámetro físico"],
          ],
        },
      ],
    },
    {
      titulo: "Cómo lo aplicas en tu flujo",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Decide el plano antes de escribir", detalle: "Qué se ve al inicio, qué se ve al final. Si no lo tienes claro tú, el modelo tampoco." },
            { titulo: "2. Fija lo que se pueda fijar", detalle: "Género, movimiento, lente, apertura e iluminación como parámetros. Todo lo que quede en texto es una variable suelta." },
            { titulo: "3. Deja en el prompt solo lo que el parámetro no cubre", detalle: "Sujeto, acción, entorno y mood. La mecánica de cámara ya está resuelta arriba." },
            { titulo: "4. Genera dos veces la misma toma", detalle: "Si las dos salen parecidas, el plano está bien especificado. Si salen distintas, todavía hay algo que dejaste al azar." },
          ],
        },
        {
          tipo: "cita",
          texto: "El prompt describe la intención. El parámetro fija la física. Confundirlos es la razón número uno por la que no puedes repetir una toma.",
        },
      ],
    },
    {
      titulo: "Los 7 géneros de Cinema Studio y su lógica de cámara",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cinema Studio trata la cámara, la luz y el lente como parámetros explícitos de generación en vez de dejarlos enterrados en un párrafo de prompt. El género se elige primero, porque fija la lógica física del plano antes que cualquier otra cosa.",
        },
        {
          tipo: "tabla",
          columnas: ["Género", "Qué hace con la cámara", "Para qué sirve"],
          filas: [
            ["Drama", "Ralentiza el registro visual y trata la cámara como un observador paciente: movimientos largos, poca ansiedad", "Testimoniales, momentos de reflexión, cierres emocionales"],
            ["Acción", "Movimientos rápidos y encuadres inestables que comunican urgencia física", "Demostración de producto en uso, momentos de alta energía"],
            ["Documental", "Cámara en mano, imperfecta a propósito, como si siguiera algo que ya estaba pasando", "Testimonios, detrás de escena, contenido de confianza"],
            ["Publicitario clásico", "Encuadres simétricos y movimientos suaves y predecibles", "Producto como protagonista, packshots, spots de marca"],
            ["Suspenso", "Encuadres desbalanceados, cámara que se acerca sin que el sujeto lo note", "Ganchos de los primeros 3 segundos, revelaciones"],
            ["Épico", "Gran angular y movimientos amplios que agrandan la escala del sujeto", "Lanzamientos, momentos de cierre de campaña"],
            ["Íntimo", "Distancia corta, poca profundidad de campo, cámara casi inmóvil", "Momentos de conexión personal, testimoniales largos"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "El género se elige ANTES de escribir el prompt de contenido, no después. Si ya generaste la escena y luego intentas forzarle un género distinto en post, el resultado se nota artificial — la física del plano quedó fijada desde el principio.",
        },
      ],
    },
    {
      titulo: "Cinema Studio 4.0: los controles nuevos",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cinema Studio subió de versión y el salto no es cosmético: pasa de clips de hasta 15 segundos a hasta 30, de 9 referencias a 50, y suma tres controles que antes no existían — Tempo, Emotion Wheel y selector de Época. Si armaste tu flujo con la versión anterior, vale la pena revisar qué cambia.",
        },
        {
          tipo: "tabla",
          columnas: ["Control", "Antes (3.5)", "Ahora (4.0)"],
          filas: [
            ["Duración del clip", "Hasta 15 segundos", "Hasta 30 segundos — un arco de personaje completo en una sola toma"],
            ["Referencias por generación", "Hasta 9", "Hasta 50 — fija cara, forma de producto o estilo antes de generar el primer cuadro"],
            ["Ritmo de montaje", "Se dejaba al prompt", "Tempo como control directo: Chaotic, Dynamic, Calm o Single Shot"],
            ["Movimientos de cámara", "9 preajustes", "30+ preajustes, incluidos POV, brazo robótico y toma aérea"],
            ["Tipo de cámara", "3 opciones", "4 opciones: Moderna, cámara DV, 35mm y 8mm — con grano y textura de época"],
            ["Actuación del personaje", "No existía", "Emotion Wheel: etiquetas por @mención con 8+ emociones (ira, alegría, miedo, confianza)"],
            ["Época del plano", "No existía", "Selector de década: el grano, el color y el lente se ajustan solos"],
            ["Continuar un clip", "No existía", "Forward/Backward Extend: subes un video y lo extiendes hacia adelante o hacia atrás sin generar de cero"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Tempo es el que más cambia el día a día: antes el ritmo de corte quedaba a criterio del modelo, ahora lo eliges tú. Dynamic es el que más vas a usar en publicidad — corte con impulso hacia adelante sin volverse caótico, el mismo ritmo de la mayoría de comerciales y música. Chaotic sirve para acción o para el gancho de los primeros 3 segundos cuando quieres desorientar a propósito. Single Shot elimina el montaje entero: una sola toma continua de principio a fin, la opción más difícil de ejecutar bien y la más inmersiva cuando funciona.",
        },
        {
          tipo: "parrafo",
          texto:
            "Emotion Wheel resuelve algo que antes tenías que describir con palabras y esperar que el modelo interpretara bien: etiquetas al personaje con @nombre_del_personaje + la emoción (Alegría, Ira, Miedo, Confianza, Sorpresa, Tristeza, Asco, Esperanza) y el modelo construye la expresión y el lenguaje corporal a partir de eso. Es la misma lógica que ya usas para fijar cámara y luz como parámetro en vez de dejarlos en el prompt — ahora se extiende a la actuación.",
        },
        {
          tipo: "nota",
          texto:
            "El selector de Época no es un filtro de color encima del video: ajusta grano, respuesta de color y carácter de lente juntos, coherente con la década elegida. Combínalo con el tipo de cámara (35mm para look de película, 8mm para textura de video casero) cuando un cliente pida una estética retro específica — te ahorra armar ese look a mano en edición.",
        },
      ],
    },
    {
      titulo: "Auditoría rápida antes de generar",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. ¿Elegiste género de cámara o lo dejaste al prompt?", detalle: "Si no elegiste un género explícito, todavía estás dejando que el modelo adivine la física del plano." },
            { titulo: "2. ¿Definiste encuadre inicial Y final?", detalle: "Una dirección sin destino es media instrucción. El modelo necesita los dos puntos, no solo el rumbo." },
            { titulo: "3. ¿La apertura está fijada o implícita en el estilo?", detalle: "Si el fondo tiene que mantenerse nítido o desenfocarse en un punto exacto, esa es una decisión de apertura, no de «estilo cinematográfico»." },
            { titulo: "4. ¿El tipo de movimiento es explícito?", detalle: "Dolly y zoom no son sinónimos aunque el texto los confunda. Selecciona el movimiento, no lo describas." },
          ],
        },
        {
          tipo: "cita",
          texto: "Cuatro preguntas, treinta segundos, la diferencia entre una toma que se repite y una que sale distinta cada vez que la generas.",
        },
      ],
    },
  ],

  // ── 2. MANOS Y CARAS ──────────────────────────────────────────
  "manos-y-caras-ia": [
    {
      titulo: "Las dos cosas que el espectador nota primero",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Manos y caras son lo que la IA rompe más seguido y lo que el ojo humano detecta más rápido. No es mala suerte ni falta de presupuesto: es estructural, y entender por qué pasa es lo que te permite evitarlo en vez de regenerar veinte veces a ciegas.",
        },
        {
          tipo: "lista",
          items: [
            "Las manos concentran muchísimo detalle en poca área: varias articulaciones que doblan en direcciones específicas, dedos que se superponen y se entrelazan. Todo eso ocupa una fracción mínima de los píxeles del cuadro.",
            "Las caras se van desviando entre planos porque el modelo no tiene memoria del cuadro anterior. Cada generación es una interpretación nueva del prompt, no la continuación de una identidad guardada.",
            "«Una mujer de cabello oscuro y facciones marcadas» describe cientos de caras válidas. El modelo elige una distinta cada vez, y a lo largo de siete planos la deriva se acumula: la cara del plano 1 y la del plano 7 son ambas válidas, pero no son la misma persona.",
            "Los datos de entrenamiento tienen huecos reales en manos: aparecen agarrando, señalando, gesticulando, casi siempre tapadas parcialmente o con desenfoque de movimiento. El modelo ha visto muchos menos ejemplos limpios de una mano que de una cara mirando al frente.",
            "Un prompt sobrecargado reparte la atención del modelo. Si en el mismo párrafo describes cara, gesto, objeto, luz y movimiento de cámara, lo primero que se degrada es justo lo más difícil: manos y caras.",
          ],
        },
      ],
    },
    {
      titulo: "Los cinco arreglos",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Arreglo", "Qué haces", "Qué elimina"],
          filas: [
            ["Identidad entrenada en vez de descripción", "Entrena un Soul ID con 20 o más fotos de referencia y aplícalo en cada generación", "La necesidad del modelo de reinterpretar «una mujer de cabello oscuro» cada vez"],
            ["Controla el encuadre", "Fija lente, distancia focal y apertura según cuánto del cuadro ocupa la mano o la cara", "La ambigüedad sobre cuánto detalle estructural tiene que resolver"],
            ["Un prompt, una tarea", "Separa: primero el plano, después el gesto. No metas cinco cosas en el mismo párrafo", "La competencia por atención dentro de una sola generación"],
            ["Saca las manos del punto crítico", "Si la mano no aporta, que salga fuera de cuadro, tapada o en reposo", "El problema completo, gratis"],
            ["Arregla en vez de regenerar", "Retoque y reencuadre sobre el plano que ya salió bien en todo lo demás", "Perder una toma buena por un detalle chico"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "El más rentable es el cuarto. Antes de pelear con una mano, pregúntate si esa mano tiene que estar en cuadro. La mitad de las veces la respuesta es no.",
        },
      ],
    },
    {
      titulo: "Qué decirle al cliente",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Esto va en la conversación comercial, no solo en la producción. Decir de entrada que manos, texto en pantalla y logos son las tres zonas donde la IA todavía falla te ahorra la discusión incómoda de la ronda tres. Y te posiciona como alguien que conoce la herramienta, no como alguien que la está descubriendo con el dinero del cliente.",
        },
      ],
    },
    {
      titulo: "Soul ID paso a paso",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Entrenar una identidad es la solución más completa al problema de la cara que cambia. En vez de describir a la persona en cada prompt, entrenas un modelo de su rostro una vez y lo aplicas en cada generación que sigue.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Reúne 20 o más fotos de referencia", detalle: "Ángulos distintos, expresiones distintas, iluminación distinta. Entre más variedad real, más estable sale la identidad entrenada." },
            { titulo: "2. Evita fotos con filtros o retoque pesado", detalle: "El modelo aprende de lo que le das. Si le das una cara ya alterada, entrena sobre una versión que no existe." },
            { titulo: "3. Entrena el Soul ID una vez por persona", detalle: "Vocero de marca, personaje recurrente, el mismo actor en toda la campaña. Se hace una sola vez y queda disponible." },
            { titulo: "4. Aplícalo en cada generación de esa campaña", detalle: "No lo reserves para el hero: úsalo también en las piezas chicas. La inconsistencia entre pieza grande y piezas chicas es tan visible como la inconsistencia entre planos." },
            { titulo: "5. Verifica en el primer lote antes de escalar", detalle: "Genera 3 o 4 piezas de prueba y compara caras lado a lado antes de producir las cuarenta variantes de la campaña." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Igual que con la clonación de voz: usa Soul ID solo con personas propias o con autorización explícita. Entrenar la identidad de alguien sin permiso es un problema serio, no un atajo de producción.",
        },
      ],
    },
    {
      titulo: "Diagnóstico rápido cuando algo sale mal",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Lo que ves", "Causa probable", "Qué probar primero"],
          filas: [
            ["Seis dedos o dedos fusionados", "La mano ocupa demasiado detalle en poco espacio de cuadro", "Aleja el encuadre o saca la mano de foco"],
            ["La cara cambia entre dos planos consecutivos", "No hay identidad entrenada; cada generación reinterpreta la descripción", "Entrena un Soul ID antes de seguir generando"],
            ["El texto del logo sale ilegible", "Se le pidió texto real en una zona chica del cuadro", "Agrega el texto en post con tu editor, no en la generación"],
            ["La mano se ve bien de cerca pero mal en movimiento", "El video exige coherencia entre fotogramas, no solo dentro de uno", "Prueba un plano fijo o con la mano en reposo en vez de gesticulando"],
          ],
        },
      ],
    },
  ],

  // ── 3. VIDEO DE PRODUCTO ──────────────────────────────────────
  "video-de-producto-sin-estudio": [
    {
      titulo: "El formato decide más que el input",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Para un anuncio de producto con IA, el punto de partida cambia según lo que estés armando. Una demo necesita la URL real del producto para que el sistema saque características y precios verdaderos. Un UGC puede arrancar de un tema y un video de referencia que te gustó. Un reveal puede salir de una sola foto sin guion, dejando que la imagen cargue con todo.",
        },
        {
          tipo: "parrafo",
          texto:
            "La decisión de formato pesa más que el material de entrada, porque productos distintos y plataformas distintas piden anuncios genuinamente distintos. Unos necesitan a una persona real hablándole a la cámara. Otros necesitan que el producto hable solo, sin presentador en cuadro.",
        },
      ],
    },
    {
      titulo: "Los formatos disponibles",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Formato", "Para qué sirve"],
          filas: [
            ["UGC", "Contenido estilo creador para TikTok y Meta, cuando la publicidad evidente rebota"],
            ["Tutorial", "Demostración paso a paso de una función"],
            ["Unboxing", "El momento de revelación y primera impresión"],
            ["Product Review", "Pitch con vocero que reseña el producto"],
            ["TV Spot", "Formato pulido de marca, para awareness"],
            ["Hyper Motion", "Alta energía, cortes rápidos"],
            ["Wild Card", "Experimental, para romper el patrón de la categoría"],
            ["Virtual Try On", "Prueba de prendas, en versión creador o pulida"],
          ],
        },
      ],
    },
    {
      titulo: "El flujo desde una URL",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Pega la URL del producto", detalle: "La plataforma extrae imágenes, nombre, características y precio directamente de la página." },
            { titulo: "2. Revisa el guion que genera", detalle: "Aquí entra tu criterio: el sistema arma un guion correcto, no uno con concepto. Págalo por tu Cerebro Creativo antes de aceptarlo." },
            { titulo: "3. Fija al vocero con Soul ID", detalle: "20 fotos de referencia y la misma cara queda en todos los anuncios de esa marca. Sin esto, cada anuncio parece de una empresa distinta." },
            { titulo: "4. Genera con audio y lip sync en la misma pasada", detalle: "No hace falta sincronizar aparte." },
            { titulo: "5. Exporta al formato de la plataforma", detalle: "Vertical para TikTok y reels, con el primer plano funcionando sin sonido." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "La tentación es dejar que el sistema haga todo. No lo hagas: el guion automático es correcto pero genérico, y lo genérico no se recuerda. Tu valor está en el paso 2.",
        },
      ],
    },
    {
      titulo: "Qué formato pedirle a cada tipo de cliente",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Tipo de cliente", "Formato recomendado", "Por qué"],
          filas: [
            ["Producto físico nuevo en el mercado", "Unboxing o Product Reveal", "El primer contacto necesita generar el momento de descubrimiento, no explicar funciones todavía"],
            ["Producto ya conocido, buscando volumen de venta", "UGC o TV Spot según el canal", "UGC para Meta y TikTok con presupuesto chico, TV Spot cuando hay awareness que sostener"],
            ["Servicio complejo que hay que explicar", "Tutorial", "El formato existe justo para desglosar función por función sin perder al espectador"],
            ["Marca que compite por precio en su categoría", "Product Review con vocero", "El review con tercero da la credibilidad que un anuncio directo no logra"],
            ["Lanzamiento con presupuesto de awareness", "Hyper Motion o TV Spot", "Ambos priorizan impacto visual sobre información de producto"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "El error más caro es elegir el formato por lo que se ve bien en el portafolio en vez de por lo que el cliente necesita. Un TV Spot pulido para un producto que necesita conversión inmediata desperdicia presupuesto: el UGC convierte mejor en ese caso, aunque se vea menos «producido».",
        },
      ],
    },
    {
      titulo: "Los errores más caros en video de producto",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Dejar que el guion automático quede tal cual sale: siempre suena a genérico si no lo pasas por tu criterio de concepto primero.",
            "No revisar el primer segundo en silencio: la mayoría de este contenido se ve sin sonido, y si el gancho depende de la voz, se pierde.",
            "Usar Soul ID solo en el hero y dejar las variantes chicas con caras distintas: el ojo entrenado del espectador nota la inconsistencia entre piezas.",
            "Pedir el formato que se ve mejor en vez del que responde al objetivo real de negocio del cliente.",
            "No verificar precio y características extraídas de la URL antes de aprobar: el sistema saca datos automáticamente y a veces trae información vieja de la página.",
          ],
        },
      ],
    },
  ],

  // ── 4. MOTION DESIGN ──────────────────────────────────────────
  "motion-design-con-ia": [
    {
      titulo: "Motion no es lo mismo que video generativo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El video generativo brilla produciendo escenas ricas. El motion graphics es otra cosa: es estructura — tiempos, jerarquía, tipografía y flujo. Son elementos que necesitan precisión y repetibilidad, no interpretación creativa.",
        },
        {
          tipo: "parrafo",
          texto:
            "Vibe Motion cubre justamente ese hueco: en vez de trabajar sobre una línea de tiempo o un editor manual, se conversa. Pides el cambio, lo ves actualizarse, y sigues refinando. El movimiento se siente dirigido en vez de generado al azar.",
        },
      ],
    },
    {
      titulo: "Dónde rinde de verdad",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Infografías animadas: métricas y cifras que aparecen en secuencia lógica, con el énfasis moviéndose de un punto al siguiente. Como la animación se mantiene estable, actualizar los datos no obliga a rehacerla — sirve para reportes recurrentes.",
            "Presentaciones donde la información tiene que aparecer en orden y no de golpe.",
            "Contenido estructurado de marca: títulos, placas de datos, cierres con logo.",
            "Piezas sociales donde el texto es el protagonista y la tipografía tiene que respirar.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "Para tu operación esto resuelve un vacío concreto: las placas de datos y los cierres de marca eran lo que quedaba a mano en CapCut. Aquí se vuelven repetibles entre piezas del mismo cliente.",
        },
      ],
    },
    {
      titulo: "Motion vs. video generativo: cuándo usar cada uno",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Necesitas", "Usa", "Por qué"],
          filas: [
            ["Un fondo con movimiento ambiental", "Video generativo", "Vibe Motion está pensado para estructura, no para escenas orgánicas"],
            ["Una infografía con cifras que cambian", "Vibe Motion", "El video generativo no entiende jerarquía de datos ni tiempos de aparición"],
            ["Un título animado que abre la pieza", "Vibe Motion", "Timing y tipografía consistentes en cada versión"],
            ["Una escena con personajes y acción", "Video generativo", "Motion no está diseñado para narrativa con personajes"],
            ["Un reporte mensual reutilizable", "Vibe Motion", "Actualizar los datos no obliga a rehacer toda la animación"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "La confusión más común es intentar usar motion para contar una historia con personajes, o intentar usar video generativo para una placa de datos que necesita jerarquía y timing exacto. Cada herramienta resuelve el problema para el que fue construida — forzarla al otro terreno da resultados mediocres en los dos casos.",
        },
      ],
    },
    {
      titulo: "Flujo de trabajo con Vibe Motion",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Define la jerarquía antes de pedir nada", detalle: "Qué aparece primero, qué se destaca, qué queda al final. Esto es guion de motion, no un detalle técnico." },
            { titulo: "2. Pide la estructura por conversación", detalle: "Describe la secuencia paso a paso en vez de un párrafo denso; el sistema refina en tiempo real sobre lo anterior." },
            { titulo: "3. Ajusta timing antes que estilo", detalle: "Si el ritmo no está bien, ningún ajuste visual lo arregla. Corrige primero cuándo aparece cada elemento." },
            { titulo: "4. Guarda la plantilla que funcionó", detalle: "Si el formato sirve para un reporte mensual, pide que quede reutilizable con los mismos tiempos y solo los datos cambiando." },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Brief de animación",
          contenido:
            "Qué información se muestra y en qué orden: [lista numerada]\nCuál es el elemento más importante y debe destacarse más: [cuál]\nDuración total aproximada: [segundos]\nDónde se va a usar: [reporte / presentación / red social]\nSe va a reutilizar con datos distintos después: [sí/no]",
        },
      ],
    },
  ],

  // ── 5. AFTER EFFECTS ──────────────────────────────────────────
  "higgsfield-en-after-effects": [
    {
      titulo: "El ida y vuelta que te come la tarde",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Piensa en un plano que necesita un fondo generado detrás de material filmado. El flujo tradicional: describes el fondo en el navegador, generas, descargas, cambias a After Effects, importas, enmascaras al sujeto, ajustas el compuesto, te das cuenta de que la luz no coincide, vuelves al navegador, regeneras, descargas otra vez, reimportas, recompones. Cada ida y vuelta son entre cinco y diez minutos, y hacen falta varias.",
        },
        {
          tipo: "parrafo",
          texto:
            "El plugin de Higgsfield elimina ese trayecto: genera, quita fondos, reencuadra y escala directamente sobre tu línea de tiempo. Se instala como un solo panel que cubre After Effects y Premiere Pro, en Ventana → Extensiones → Higgsfield AI, y consume tus créditos existentes.",
        },
      ],
    },
    {
      titulo: "Qué trae el panel",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Herramienta", "Qué hace"],
          filas: [
            ["Generate AI Video", "Crea un clip desde un prompt — escenas, personajes, B-roll, movimientos de cámara — y cae directo en la línea de tiempo"],
            ["Generate AI Image", "Cualquier visual desde un prompt: fondos, sobreimpresiones, placas de título"],
            ["Reframe", "Recorta a 9:16, 16:9, 4:3, 3:4, 21:9 o 1:1 con seguimiento del sujeto para que el punto focal no se pierda"],
            ["Remove Background", "Recorte limpio sin croma, con bordes definidos y detalle de cabello"],
            ["Draw to Edit", "Dibujas sobre el cuadro para quitar objetos, agregar elementos o reemplazar zonas con una pincelada"],
            ["Upscale", "Sube el clip hasta 4K u 8K recuperando detalle real, no estirando píxeles"],
            ["Edit Video", "Aplica un cambio descrito en lenguaje natural sobre material existente, sin rehacer el plano"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Reframe es el que más te va a servir en el día a día de agencia: el mismo spot en horizontal, vertical y cuadrado sin recomponer tres veces a mano.",
        },
      ],
    },
    {
      titulo: "El flujo típico dentro del panel",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Genera o importa el material base", detalle: "Un clip filmado o generado con IA entra igual a la línea de tiempo." },
            { titulo: "2. Compón el fondo con Generate AI Image o Video", detalle: "Sin salir del panel, sin exportar nada al navegador." },
            { titulo: "3. Ajusta con Draw to Edit si algo sobra en el cuadro", detalle: "Un elemento que no debía entrar, un objeto que distrae, se borra con una pincelada en vez de replantear todo el plano." },
            { titulo: "4. Reencuadra al final, no al principio", detalle: "Termina de componer en el formato original y recién ahí genera las variantes verticales y cuadradas. Reencuadrar antes de terminar duplica el trabajo si algo cambia." },
            { titulo: "5. Sube resolución solo en la entrega final", detalle: "Escalar cada versión de prueba es gasto de crédito innecesario; escala cuando ya aprobaste el corte." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "El plugin consume tus créditos existentes de Higgsfield, no un plan aparte. No hay razón para seguir generando en el navegador si ya tienes el panel instalado.",
        },
      ],
    },
    {
      titulo: "Cuándo SÍ conviene volver al navegador",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Cuando necesitas explorar muchas variantes de concepto antes de decidir cuál llevar a la línea de tiempo — el navegador es más rápido para iterar en paralelo.",
            "Cuando el flujo requiere Marketing Studio completo (guion + vocero + audio en una pasada) y no solo generación de clips sueltos.",
            "Cuando trabajas en equipo y otra persona necesita revisar opciones sin acceso a tu proyecto de After Effects.",
          ],
        },
        {
          tipo: "cita",
          texto: "El plugin gana en producción. El navegador gana en exploración. Úsalos en ese orden: explora afuera, produce adentro.",
        },
      ],
    },
    {
      titulo: "Un caso real: VFX sin salir de la línea de tiempo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Vuelve al ejemplo del fondo generado detrás de material filmado. Con el plugin, el flujo cambia por completo: generas el fondo directo sobre la línea de tiempo, ajustas el compuesto en el mismo panel, y si la luz no coincide, usas Edit Video para describir el ajuste sin regenerar desde cero.",
        },
        {
          tipo: "tabla",
          columnas: ["Paso", "Sin plugin", "Con plugin"],
          filas: [
            ["Generar el fondo", "Navegador, luego descargar", "Directo en el panel"],
            ["Importar a la línea de tiempo", "Manual, buscar el archivo", "Ya está ahí"],
            ["Ajustar si la luz no coincide", "Volver al navegador y regenerar todo", "Edit Video sobre lo que ya existe"],
            ["Tiempo total", "20 a 40 minutos por iteración", "Minutos, sin salir del proyecto"],
          ],
        },
      ],
    },
  ],

  // ── 6. FIGMA ──────────────────────────────────────────────────
  "higgsfield-en-figma": [
    {
      titulo: "Por qué se rompen los sistemas de diseño",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Casi todos los sistemas visuales se caen igual: la imagen del hero sale de un banco de stock, la foto de producto la manda el cliente, el fondo se generó en otra parte, y ninguna de las tres comparte lógica de iluminación ni temperatura de color. El archivo se ve armado por tres personas distintas porque, en la práctica, lo estuvo.",
        },
      ],
    },
    {
      titulo: "Las siete herramientas del panel",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Herramienta", "Qué resuelve"],
          filas: [
            ["Generate AI Image", "Produce un visual en la línea de tu marca en vez de buscar en stock algo «lo bastante parecido»"],
            ["Generate AI Video", "Le da movimiento a una composición estática sin salir del archivo"],
            ["Remove Background", "Aísla al sujeto de una foto de stock o del cliente para que entre limpio en un componente"],
            ["Relight", "Lleva una foto desalineada hacia la dirección y calidez de luz que ya estableciste en el resto"],
            ["Color Grading", "Fija un mismo mood de color en todo el set, sin importar de dónde vino cada imagen"],
            ["Expand", "Convierte un recorte apretado en fondo a sangre completa o lo reencuadra a otra proporción sin volver a fotografiar"],
            ["Angles", "Construye vista frontal, lateral y tres cuartos del mismo producto desde una sola foto"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Dos generan material nuevo. Las otras cinco existen para meter en cintura imágenes que vinieron de afuera — que es exactamente el problema real de cualquier proyecto con cliente.",
        },
        {
          tipo: "nota",
          texto:
            "Angles resuelve un pedido clásico de e-commerce: el cliente manda una foto y necesitas tres vistas para la ficha. Antes era sesión nueva.",
        },
      ],
    },
    {
      titulo: "Armar el sistema de marca de un cliente, paso a paso",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Reúne lo que el cliente ya tiene", detalle: "Fotos de producto, banco de stock que usan, capturas de su web. Va a ser una mezcla desordenada — es normal, para eso es el plugin." },
            { titulo: "2. Define el mood con Color Grading primero", detalle: "Antes de generar nada nuevo, decide el mood de color sobre las imágenes que ya existen. Esa decisión gobierna todo lo que generes después." },
            { titulo: "3. Empareja las imágenes existentes con Relight", detalle: "Lleva cada foto de stock o de cliente hacia la misma dirección de luz que ya definiste." },
            { titulo: "4. Genera lo que falta con esa referencia puesta", detalle: "Ahora Generate AI Image parte de un archivo que ya respira el mismo mood, así que el resultado nuevo encaja sin esfuerzo extra." },
            { titulo: "5. Cierra con Angles para el catálogo", detalle: "Si el cliente vende producto físico, esto reemplaza media sesión de fotografía por ficha." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "El orden importa: Color Grading y Relight primero, generación después. Generar antes de fijar el mood es lo que produce un archivo con diez imágenes que parecen de diez marcas distintas.",
        },
      ],
    },
    {
      titulo: "Errores comunes al usarlo en un archivo de cliente",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Generar directo sin pasar antes por Relight y Color Grading sobre lo existente: el resultado nuevo se ve perfecto solo, pero desentona con lo que ya había.",
            "Usar Expand para estirar una imagen mucho más allá de su composición original: el sistema rellena, pero la composición ya no tiene la misma lógica visual.",
            "Aplicar Angles a un producto fotografiado con una luz muy particular: las vistas nuevas heredan esa luz, y si no era la que querías, hay que corregir cada una.",
            "No guardar el archivo de referencia de marca (paleta, mood) fuera de Figma: si cambias de archivo, todos tus ajustes quedan atrapados ahí.",
          ],
        },
      ],
    },
  ],

  // ── 7. LOTES ──────────────────────────────────────────────────
  "produccion-por-lotes": [
    {
      titulo: "Un clip es una decisión creativa; cincuenta son un sistema",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La mayoría de herramientas de IA están hechas para una generación a la vez: escribes el prompt, esperas, revisas, empiezas de nuevo. Funciona cuando necesitas un clip. Se rompe por completo cuando necesitas cincuenta.",
        },
        {
          tipo: "lista",
          items: [
            "Una marca con pauta activa necesita entre 20 y 30 variantes de anuncio por semana solo para no quemar el creativo.",
            "Un equipo de contenido diario necesita un pipeline que corra sin que alguien lo esté vigilando.",
            "Una agencia con varios clientes necesita el mismo flujo produciendo salidas distintas por brief, sin reconstruirlo cada vez.",
            "En todos los casos el cuello de botella no es la calidad de una generación: es el throughput del sistema.",
          ],
        },
      ],
    },
    {
      titulo: "Cómo se comparan las opciones",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Plataforma", "Método de lote", "Para qué es mejor"],
          filas: [
            ["Higgsfield · Supercomputer + Canvas", "Chats en paralelo y grafo visual de nodos", "Pipeline completo de video e imagen con flujos reutilizables"],
            ["Dreamina (CapCut)", "Chat con agente y carga de CSV", "Imágenes en volumen, hasta 40 de una"],
            ["Nano Banana en Google AI Studio", "Subida más multi-prompt", "De una foto a decenas de variantes"],
            ["HeyGen Batch Mode", "Un guion por video, mismo avatar", "Videos de vocero a escala"],
            ["Workflow builders y automatizaciones", "Disparadores desde datos externos", "Conectar la generación con tu hoja de cálculo o tu CRM"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Ojo con el orden: montar el lote antes de tener el concepto validado solo multiplica un error. Primero valida una pieza, después la industrializas.",
        },
      ],
    },
    {
      titulo: "Cómo montar tu primer lote sin desperdiciar créditos",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Valida el concepto con una sola generación", detalle: "Nunca montes el lote sobre un prompt sin probar. El error en la pieza 1 se multiplica exacto por 50 si no lo detectaste antes." },
            { titulo: "2. Fija todo lo que no debe variar", detalle: "Personaje, marca, estilo de cámara. Lo que cambia entre variantes es solo el dato o el mensaje, nunca la base visual." },
            { titulo: "3. Prepara la lista de variables en una hoja", detalle: "Una fila por variante, con las columnas que van a cambiar: texto, color de fondo, cifra. El sistema de lote lee de ahí." },
            { titulo: "4. Corre un lote chico de prueba primero", detalle: "5 variantes antes de las 50. Revisa que la variable se esté aplicando bien antes de gastar el lote completo." },
            { titulo: "5. Revisa el lote completo antes de entregar", detalle: "Un lote de 50 casi siempre trae 2 o 3 fallas puntuales. Revisarlas de una es más barato que descubrirlas por separado." },
          ],
        },
      ],
    },
    {
      titulo: "Cuándo NO conviene producir por lotes",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Cuando el concepto todavía se está definiendo: el lote industrializa una decisión, no la reemplaza.",
            "Cuando cada pieza necesita dirección propia, como un caso de cliente único que merece su propio tratamiento.",
            "Cuando el volumen real que necesitas es menor a diez: el tiempo de montar el sistema supera el ahorro.",
            "Cuando el cliente pide revisión pieza por pieza: el lote rinde cuando puedes aprobar en conjunto, no una por una.",
          ],
        },
      ],
    },
  ],

  // ── 8. MCP ────────────────────────────────────────────────────
  "higgsfield-mcp-con-claude": [
    {
      titulo: "Claude piensa, Higgsfield produce",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Conectar Claude al MCP de Higgsfield hace que dos modelos trabajen como un solo equipo: Claude es el cerebro que planea — concepto, guion, lista de planos, prompts — y Higgsfield es la máquina que produce. Deja de haber copiar y pegar entre pestañas: el plan y la ejecución viven en la misma conversación.",
        },
        {
          tipo: "parrafo",
          texto:
            "Es la misma lógica del Cerebro Creativo llevada un paso más: si Claude ya conoce la marca porque tiene la Biblia y el ADN comunicacional cargados, el prompt que le pasa a Higgsfield no sale genérico. Sale con el criterio de la marca adentro.",
        },
      ],
    },
    {
      titulo: "Qué cambia en la práctica",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Sin MCP", "Con MCP"],
          filas: [
            ["Pides el guion en un lado, lo copias, lo adaptas a prompt, lo pegas en otro lado", "Pides la campaña y el plan baja a generación sin intermediarios"],
            ["Cada plano se prompteaba a mano", "La lista de planos se convierte en una serie de generaciones encadenadas"],
            ["Corregir el concepto implicaba rehacer todos los prompts", "Corriges arriba y lo de abajo se regenera con el cambio"],
            ["El criterio de marca vivía en tu cabeza", "El criterio vive en los documentos que Claude ya tiene cargados"],
          ],
        },
      ],
    },
    {
      titulo: "Cómo montarlo",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Ten el Cerebro cargado primero", detalle: "Sin la Biblia y el ADN de la marca, el MCP solo te ahorra clics. Con ellos, te ahorra criterio." },
            { titulo: "2. Conecta el MCP de Higgsfield a Claude", detalle: "Queda disponible como herramienta dentro de la conversación." },
            { titulo: "3. Pide el plan antes que la pieza", detalle: "Concepto, estructura narrativa y lista de planos. Recién ahí que genere." },
            { titulo: "4. Revisa el primer plano antes de soltar el resto", detalle: "Si el primero salió con el look correcto, los demás heredan la dirección. Si no, corriges arriba." },
            { titulo: "5. Guarda el flujo que funcionó", detalle: "Lo que se repite se convierte en skill o en plantilla, y el próximo cliente empieza desde ahí." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Vas a encontrar contenido prometiendo cifras de ingresos con este combo. Ignóralo. Lo que el MCP te da es velocidad y consistencia; lo que te hace cobrar es el criterio con el que diriges, y eso no viene en la conexión.",
        },
      ],
    },
    {
      titulo: "Un flujo completo de principio a fin",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Así se ve el flujo completo aplicado a un pedido real de cliente, con el Cerebro Creativo y el MCP trabajando juntos en una sola conversación.",
        },
        {
          tipo: "tabla",
          columnas: ["Paso", "Qué haces", "Qué hace Claude con el MCP"],
          filas: [
            ["1. Brief", "Le cuentas el pedido del cliente en lenguaje natural", "Con la Biblia y el ADN cargados, hace las preguntas que un director creativo haría antes de avanzar"],
            ["2. Insight y concepto", "Apruebas o ajustas lo que propone", "Aplica el protocolo de pensamiento del DOC 00 para llegar al concepto"],
            ["3. Guion y storyboard", "Revisas el guion plano por plano", "Estructura la narrativa según el formato y la duración pedida"],
            ["4. Generación", "Apruebas el primer plano antes de seguir", "Traduce cada plano a instrucciones para Higgsfield vía MCP, sin que copies y pegues nada"],
            ["5. Ajustes", "Pides cambios puntuales en lenguaje normal", "Regenera solo lo que cambió, sin rehacer lo que ya estaba aprobado"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "La velocidad real no está en que Claude escriba el prompt por ti — eso ya lo hacía sin MCP. Está en que todo el flujo vive en una sola conversación, sin que tengas que copiar resultados de un lado a otro y perder el hilo del concepto en el camino.",
        },
      ],
    },
    {
      titulo: "Errores comunes al montar el flujo",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Conectar el MCP sin haber cargado el Cerebro antes: obtienes velocidad sin criterio, que es la mitad del valor.",
            "Pedir la pieza completa de una vez en vez de aprobar plano por plano: si el primer plano tenía un problema de dirección, se propaga a los demás.",
            "No guardar los flujos que funcionaron: cada vez que algo funciona bien y no lo conviertes en skill o plantilla, lo vuelves a improvisar la próxima vez.",
            "Usarlo solo para producción y nunca para pensar: el MCP no reemplaza al protocolo de pensamiento, lo ejecuta más rápido una vez que ya pensaste.",
          ],
        },
      ],
    },
  ],
};
