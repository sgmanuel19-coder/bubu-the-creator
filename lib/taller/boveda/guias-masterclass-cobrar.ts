import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// PARTE 5 — COBRAR · los artículos de la parte comercial
//
// La PARTE 5 de la Masterclass tiene 2 videos y ~6 minutos: sabía a
// poco para lo que decide si esto se vuelve un negocio o un hobby.
// Estos cinco artículos son el material escrito que la completa:
// descubrimiento, agendar, el guion de la llamada, objeciones y la
// propuesta.
//
// FUENTE: el Manual Maestro de Objeciones de RESUELTO (método VERA,
// 35 objeciones en 7 categorías) y el FAQ Comercial (proceso de venta
// en 6 pasos, BANT adaptado), en Obsidian → RESUELTO CEREBRO MADRE.
// Adaptado de vender automatización a vender PRODUCCIÓN DE CONTENIDO,
// que es lo que vende el alumno de la Masterclass.
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_COBRAR: Record<string, SeccionRecurso[]> = {
  // ── 1. LAS 12 PREGUNTAS DE DESCUBRIMIENTO ─────────────────────
  "preguntas-de-descubrimiento": [
    {
      titulo: "La llamada no se gana hablando",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El error que arruina más llamadas de venta es presentarse demasiado. Entras, te emocionas, explicas tu sistema, muestras tu portafolio, hablas veinte minutos seguidos, y al final preguntas «¿qué te parece?». El prospecto dice «interesante, mándame una propuesta» y no vuelve a contestar.",
        },
        {
          tipo: "parrafo",
          texto:
            "Pasó porque le vendiste algo que él nunca dijo que necesitaba. El descubrimiento existe para que el cliente diga en voz alta cuál es su problema, cuánto le cuesta y qué pasaría si lo resuelve. Cuando eso sale de su boca y no de la tuya, tu propuesta deja de ser un gasto y pasa a ser la respuesta a algo que él acaba de reconocer.",
        },
        {
          tipo: "cita",
          texto:
            "El que pregunta, dirige. El que habla, ruega.",
        },
        {
          tipo: "nota",
          texto:
            "Regla de tiempo: en una llamada de 30 minutos, tú hablas 10. Si hablaste más de la mitad, no hiciste descubrimiento, diste una clase.",
        },
      ],
    },
    {
      titulo: "Las 12 preguntas, en orden",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El orden importa: primero el contexto, después el dolor, después el costo de ese dolor, y solo al final el dinero y la decisión. Preguntar por el presupuesto en el minuto dos es lo que hace que la llamada se sienta como un interrogatorio.",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "1. Cuéntame de tu negocio: qué vendes y a quién",
              detalle:
                "Abre sin fricción y te da el vocabulario del cliente. Escucha qué palabras usa para su producto: esas son las que vas a usar tú después.",
            },
            {
              titulo: "2. ¿Cómo consigues clientes hoy?",
              detalle:
                "Te dice si el contenido es su canal o un adorno. Si vive de referidos, el contenido es para sostener reputación; si vive de pauta, es para bajar el costo por resultado.",
            },
            {
              titulo: "3. ¿Quién hace tu contenido ahora mismo?",
              detalle:
                "Tres respuestas posibles: nadie, yo mismo, o una agencia. Cada una cambia la venta. «Nadie» exige justificar el gasto nuevo; «una agencia» exige diferenciarte de algo que ya paga.",
            },
            {
              titulo: "4. ¿Qué es lo que más te frustra de cómo se ve tu marca hoy?",
              detalle:
                "La pregunta del dolor. Cállate y deja que hable. Lo que diga acá es, literalmente, el titular de tu propuesta.",
            },
            {
              titulo: "5. ¿Hace cuánto que te pasa eso?",
              detalle:
                "Mide si es una molestia o una herida. Un problema de dos años ya está presupuestado emocionalmente; uno de dos semanas todavía no.",
            },
            {
              titulo: "6. ¿Qué has intentado para resolverlo?",
              detalle:
                "Te dice qué NO proponer y cuánto ya gastó. Si probó tres proveedores, tu primer trabajo es que no te confunda con el cuarto.",
            },
            {
              titulo: "7. ¿Cuánto vale un cliente nuevo para ti?",
              detalle:
                "El número que convierte tu precio en una fracción. Si un cliente le deja $3,000 y tu servicio cuesta $1,500, tu servicio se paga con medio cliente.",
            },
            {
              titulo: "8. ¿Qué te está costando no tener esto resuelto?",
              detalle:
                "La pregunta más incómoda y la más rentable. Si no puede responderla, el problema no le duele lo suficiente y no va a comprar hoy.",
            },
            {
              titulo: "9. Si esto funcionara, ¿cómo se vería en tres meses?",
              detalle:
                "Le hace imaginar el después. Su respuesta es la promesa que tú vas a repetir al cerrar, con sus mismas palabras.",
            },
            {
              titulo: "10. ¿Para cuándo necesitas tener esto andando?",
              detalle:
                "La urgencia real. «Para ayer» y «este trimestre» son verdes; «en algún momento» y «estamos viendo» son rojas.",
            },
            {
              titulo: "11. ¿Quién más participa en esta decisión?",
              detalle:
                "Nunca preguntes «¿tú decides?» — nadie dice que no manda. Preguntar quién más participa te da los nombres sin herir el ego.",
            },
            {
              titulo: "12. ¿Cuánto tenías pensado invertir en esto?",
              detalle:
                "Al final, y en pasado («tenías pensado»), que suena a plan y no a examen. Si no tiene un número, tu trabajo es dárselo tú con un rango, no preguntarlo otra vez.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "No son un cuestionario para leer. Son doce cosas que tienes que saber antes de colgar. Si el cliente te las contesta desordenadas hablando solo, mucho mejor: apunta y sigue.",
        },
      ],
    },
    {
      titulo: "Cómo suena una respuesta que califica",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Es el BANT clásico, traducido a lo que vendemos: presupuesto, autoridad, necesidad y plazo. Con tres verdes de cuatro, la propuesta vale la pena. Con dos rojas, estás a punto de escribir una propuesta que nadie va a leer.",
        },
        {
          tipo: "tabla",
          columnas: ["Qué mides", "Señal verde", "Señal roja"],
          filas: [
            [
              "Presupuesto",
              "«Estamos gastando X en pauta» o «pagábamos Y a la otra agencia»",
              "«Depende de cuánto cueste» o no conoce ninguno de sus números",
            ],
            [
              "Autoridad",
              "«Lo decido yo» o «lo veo con mi socio, que entra a la próxima»",
              "«Tengo que presentarlo a un comité» sin fecha ni nombre",
            ],
            [
              "Necesidad",
              "Nombra un momento concreto: una feria, un lanzamiento, un competidor",
              "«Queremos estar más activos en redes», sin decir para qué",
            ],
            [
              "Plazo",
              "«Lo necesito este mes» o hay una fecha externa que empuja",
              "«Estamos viendo opciones para el próximo año»",
            ],
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Plantilla de notas de llamada llenada a mano o en pantalla, con las 12 respuestas y los cuatro semáforos de BANT marcados.",
          pie: "Así queda una hoja de descubrimiento después de una llamada real.",
          captura: true,
        },
      ],
    },
    {
      titulo: "El resumen que cierra el descubrimiento",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Antes de proponer nada, repites lo que escuchaste. Suena obvio y casi nadie lo hace. Sirve para dos cosas: confirmas que entendiste, y le haces oír su propio problema ordenado, que es el momento en que muchos se venden solos.",
        },
        {
          tipo: "copiable",
          etiqueta: "El resumen — cámbialo por lo que te dijo",
          contenido: `A ver si entendí bien.

Vendes [producto] a [cliente], y hoy consigues clientes por [canal].
El contenido lo hace [quién], y lo que más te frustra es [dolor, con sus palabras].
Llevas [tiempo] así, ya probaste [intento] y no terminó de funcionar.
Cada cliente nuevo te deja alrededor de [monto], y me dijiste que
esto te está costando [costo que él mismo nombró].
Si funcionara, en tres meses querrías [su visión], y lo necesitas
andando para [fecha].

¿Me faltó algo o resumí bien?`,
        },
        {
          tipo: "parrafo",
          texto:
            "Cuando dice «sí, exacto», tienes permiso para proponer. Y tu propuesta ya no compite con su presupuesto: compite con el costo que él acaba de reconocer en voz alta.",
        },
      ],
    },
    {
      titulo: "Cuándo decir que no",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El descubrimiento no sirve solo para vender: sirve para no meterte en un proyecto que te va a costar más de lo que te paga. Estas cuatro señales son para declinar, o para cobrar por adelantado y sin descuento.",
        },
        {
          tipo: "lista",
          items: [
            "No conoce ninguno de sus números: no va a poder juzgar tu resultado, así que ningún resultado le va a parecer suficiente.",
            "Quiere «probar con uno» y decidir después. Una pieza suelta no mueve nada, y cuando no mueva nada, la culpa será tuya.",
            "Su referencia de precio es un freelancer de Fiverr. No es tu cliente; es el cliente de otro.",
            "Te pide que le des ideas gratis «para ver cómo trabajas». Las ideas son el trabajo. Muestra casos, no regales estrategia.",
          ],
        },
        {
          tipo: "cita",
          texto:
            "Un cliente mal calificado no es un ingreso: es un pasivo con fecha de entrega.",
        },
        {
          tipo: "pregunta",
          enunciado:
            "En el minuto tres de la llamada el prospecto pregunta «¿cuánto cobras?». ¿Qué haces?",
          opciones: [
            "Le doy el precio de una vez, para no parecer evasivo",
            "Le digo que depende de lo que necesita y sigo con el descubrimiento",
            "Le digo que es caro para ir preparándolo",
          ],
          correcta: 1,
          explicacion:
            "Un precio sin problema reconocido siempre suena caro. «Depende de lo que necesites exactamente; cuéntame tu situación y vemos si tiene sentido» devuelve el control a la conversación sin sonar evasivo.",
        },
      ],
    },
  ],

  // ── 2. DE UN DM A UNA LLAMADA AGENDADA ────────────────────────
  "de-dm-a-llamada": [
    {
      titulo: "El error de mandar el precio por mensaje",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Te escriben «hola, ¿cuánto cobras por los videos?». Respondes con el precio. Te dejan en visto. Pasa el 90% de las veces, y no es porque el precio sea alto: es porque un número sin contexto es lo único que el prospecto puede comparar, y siempre habrá alguien más barato.",
        },
        {
          tipo: "parrafo",
          texto:
            "El objetivo de un DM no es cerrar. Es conseguir una conversación de veinte minutos donde sí puedas preguntar. Todo lo que hagas en el chat se mide contra eso: ¿esto me acerca a una llamada agendada?",
        },
        {
          tipo: "nota",
          texto:
            "Excepción: si vendes un producto de precio fijo y bajo (una pieza suelta, un pack cerrado), el precio por DM sí funciona. Para servicios de más de unos cientos de dólares, no.",
        },
      ],
    },
    {
      titulo: "La secuencia de cuatro mensajes",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuatro mensajes tuyos, con respuesta del prospecto entre cada uno. Nunca dos tuyos seguidos: eso se lee como desesperación.",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Mensaje 1 · Devuelve la pregunta con una pregunta",
              detalle:
                "«Depende de lo que necesites — cuéntame, ¿qué vendes y para qué lo quieres usar?». Reconoce su mensaje y abre contexto sin dar el número.",
            },
            {
              titulo: "Mensaje 2 · Nombra su problema con tus palabras",
              detalle:
                "Con lo que te contó, devuélvele el problema mejor formulado de como él lo dijo. Es el momento en que pasas de proveedor a alguien que entiende su negocio.",
            },
            {
              titulo: "Mensaje 3 · Propón la llamada como diagnóstico, no como venta",
              detalle:
                "«Esto se ve mejor en veinte minutos que por chat. Te muestro cómo lo resolví con un caso parecido y te digo si tiene sentido para ti». Vende la llamada, no el servicio.",
            },
            {
              titulo: "Mensaje 4 · Propón dos horarios concretos",
              detalle:
                "Nunca «¿cuándo puedes?». Dos opciones cerradas, con día y hora. Decidir entre dos es fácil; abrir la agenda mental es trabajo, y el trabajo se posterga.",
            },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Los cuatro mensajes, listos para adaptar",
          contenido: `1) Depende bastante de lo que necesites. Cuéntame: ¿qué vendes
   y para qué quieres usar los videos?

2) Entiendo. Entonces el tema no es que te falte contenido —
   es que lo que publicas no se parece al nivel de lo que vendes.
   Eso lo he resuelto con [rubro parecido].

3) Te propongo algo: veinte minutos de llamada. Te muestro cómo
   lo armé para [caso] y te digo con franqueza si a ti te conviene
   o no. Si no te sirve, te lo digo y no te hago perder tiempo.

4) ¿Te queda mejor mañana 4pm o el jueves 10am?`,
        },
      ],
    },
    {
      titulo: "Confirmar sin que te planten",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Entre agendar y la llamada, la mitad del entusiasmo se evapora. Tres cosas bajan el plantón casi a cero, y las tres cuestan dos minutos.",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Manda la invitación al calendario en el momento",
              detalle:
                "No «te mando el link luego». Ahora, mientras está contestando. Con enlace de la reunión adentro.",
            },
            {
              titulo: "Pide una preparación mínima",
              detalle:
                "«Tráeme el nombre de un competidor que te guste cómo se ve». Quien prepara algo, asiste: ya invirtió.",
            },
            {
              titulo: "Confirma el día anterior con una sola línea",
              detalle:
                "«Mañana 4pm seguimos, ¿todo bien?». Si no contesta, reprograma tú antes de quedarte esperando frente a la pantalla.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Si te plantan dos veces, no insistas una tercera: manda un mensaje corto cerrando la puerta con elegancia («te escribo en un par de meses»). Los que valen, responden ahí mismo.",
        },
      ],
    },
    {
      titulo: "Si no responde: tres seguimientos y se archiva",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Cuándo", "Qué manda", "Por qué funciona"],
          filas: [
            ["48 h después", "Una pieza tuya del rubro del prospecto, sin texto de venta", "Demuestra en vez de pedir"],
            ["+4 días", "Una pregunta cerrada: «¿lo dejamos para más adelante o lo vemos esta semana?»", "Da salida digna y suele desbloquear un sí"],
            ["+7 días", "El cierre amable: «te dejo tranquilo, te escribo en unos meses»", "Quita presión y reabre después sin quemar el contacto"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Después del tercero, se archiva y se olvida. Perseguir a alguien que no contesta cuesta el tiempo que necesitas para hablar con tres que sí.",
        },
        {
          tipo: "pregunta",
          enunciado: "¿Cuál de estas formas de proponer la llamada funciona mejor?",
          opciones: [
            "«¿Cuándo tienes un espacio para conversar?»",
            "«¿Te queda mejor mañana 4pm o el jueves 10am?»",
            "«Avísame cuando quieras que hablemos»",
          ],
          correcta: 1,
          explicacion:
            "Elegir entre dos opciones concretas es un segundo de trabajo; abrir tu agenda y proponer un hueco es una tarea, y las tareas se postergan.",
        },
      ],
    },
  ],

  // ── 3. EL GUION DE LA LLAMADA ─────────────────────────────────
  "guion-de-la-llamada": [
    {
      titulo: "Treinta minutos con estructura",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una llamada de venta sin estructura se convierte en una charla simpática que no termina en nada. Esta es la repartición que uso: el descubrimiento se lleva la mitad del tiempo, y la presentación de lo que hago no pasa de cinco minutos.",
        },
        {
          tipo: "tabla",
          columnas: ["Bloque", "Minutos", "Qué pasa ahí"],
          filas: [
            ["Apertura", "2", "Fijas la agenda y pides permiso para preguntar"],
            ["Descubrimiento", "12", "Las 12 preguntas. Él habla, tú anotas"],
            ["Resumen", "3", "Le devuelves su problema ordenado y confirmas"],
            ["El puente", "5", "Conectas su problema con tu forma de trabajar. Con un caso, no con una lista de servicios"],
            ["Precio y siguiente paso", "5", "Dices el número y propones qué sigue"],
            ["Objeciones y cierre", "3", "Lo que quede"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Si al minuto 20 todavía estás preguntando, no cierres hoy: propón una segunda llamada con propuesta. Es mejor que un precio dicho a las apuradas.",
        },
      ],
    },
    {
      titulo: "Apertura: dos minutos que ordenan todo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La apertura tiene un solo trabajo: que el prospecto sepa qué va a pasar y te dé permiso de preguntar. Sin eso, cada pregunta tuya se siente como una intromisión.",
        },
        {
          tipo: "copiable",
          etiqueta: "Apertura",
          contenido: `Gracias por el tiempo. Te propongo algo para no hacerte perder
la mañana: primero te hago unas preguntas de tu negocio para
entender bien qué necesitas, unos diez minutos. Después te
muestro cómo trabajo yo esto con un caso parecido al tuyo. Y al
final, si veo que te conviene, te digo precio y cómo seguiría;
si veo que no, también te lo digo. ¿Te parece?`,
        },
        {
          tipo: "parrafo",
          texto:
            "La frase «si veo que no, también te lo digo» hace más por tu credibilidad que todo tu portafolio. Nadie que esté desesperado por vender diría eso.",
        },
      ],
    },
    {
      titulo: "El puente: de su problema a tu sistema",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Acá se cae la mayoría. Después del descubrimiento, la tentación es enumerar todo lo que sabes hacer. Error: el prospecto no compra tu catálogo, compra la solución a la frase que él dijo en la pregunta 4.",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Repite su frase textual",
              detalle:
                "«Me dijiste que tu producto se ve mejor en la fábrica que en tu Instagram». Empezar con sus palabras hace que lo que sigue suene hecho para él.",
            },
            {
              titulo: "Cuenta un caso, no una metodología",
              detalle:
                "Un cliente parecido, qué tenía antes, qué se hizo, qué cambió. Treinta segundos. Si puedes mostrar la pieza en pantalla, mejor que cualquier explicación.",
            },
            {
              titulo: "Nombra el mecanismo una sola vez",
              detalle:
                "«Lo que hago no es grabar más: es construir el criterio primero y producir después». Una frase. No expliques el sistema entero: eso es el producto, y todavía no te lo compró.",
            },
            {
              titulo: "Devuélvelo a su caso",
              detalle:
                "«En tu caso, lo primero que atacaría es [lo que más le dolía]». Concreto y accionable, sin entregar el plan completo.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Nunca digas «uso inteligencia artificial» como argumento central. Al cliente le da igual la herramienta; le importa que su producto se vea como lo que cuesta. La IA es tu método, no tu propuesta de valor.",
        },
      ],
    },
    {
      titulo: "Decir el precio sin pedir permiso",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El precio se dice completo, en voz normal, sin adornos ni disculpas, y después te callas. El silencio incómodo que sigue es del prospecto, no tuyo. Quien lo rompe primero, negocia contra sí mismo.",
        },
        {
          tipo: "copiable",
          etiqueta: "El precio, dicho como se debe",
          contenido: `Para lo que me describes, el trabajo es [entregable concreto]
y la inversión es [monto] al mes, con un mínimo de [plazo].

(silencio — espera a que hable él)`,
        },
        {
          tipo: "lista",
          items: [
            "No digas «serían aproximadamente». O sabes tu precio o no lo sabes.",
            "No lo bajes en la misma frase en que lo subes («son 2,000… pero podemos ver»). Acabas de enseñarle que tu precio es negociable antes de que él lo pida.",
            "No lo justifiques sin que te lo pidan. Justificar antes de la objeción suena a que tú tampoco te lo crees.",
            "Si hay ancla, úsala antes: «un proyecto así con una agencia está sobre los $X». El número de comparación tiene que entrar primero.",
          ],
        },
      ],
    },
    {
      titulo: "Los tres cierres que funcionan",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Cierre", "Cómo suena", "Cuándo usarlo"],
          filas: [
            [
              "El siguiente paso",
              "«¿Te mando la propuesta hoy y la vemos el jueves?»",
              "Por defecto. Casi siempre es el correcto",
            ],
            [
              "La alternativa",
              "«¿Arrancamos con el paquete completo o prefieres empezar por el primer bloque?»",
              "Cuando ya dijo que sí pero no se decide por el tamaño",
            ],
            [
              "El resumen y la pregunta directa",
              "«Me dijiste que esto te cuesta X al mes y que lo necesitas para la feria. Lo resolvemos en [plazo] por [monto]. ¿Lo hacemos?»",
              "Cuando el descubrimiento fue fuerte y hay urgencia real",
            ],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Lo que nunca cierra: «bueno, cualquier cosa me avisas». Esa frase le pasa el trabajo de decidir a alguien que tiene otras veinte cosas que hacer hoy.",
        },
        {
          tipo: "pregunta",
          enunciado: "Dijiste el precio y el prospecto se queda callado. ¿Qué haces?",
          opciones: [
            "Explico qué incluye para llenar el silencio",
            "Me callo y espero a que hable él",
            "Ofrezco una forma de pago más cómoda",
          ],
          correcta: 1,
          explicacion:
            "El silencio después del precio es del prospecto, es donde procesa. Quien lo rompe primero empieza a negociar contra sí mismo, y normalmente rebajando.",
        },
      ],
    },
  ],

  // ── 4. OBJECIONES CON EL MÉTODO VERA ──────────────────────────
  "objeciones-metodo-vera": [
    {
      titulo: "Una objeción es buena señal",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Quien objeta está en la conversación. El silencio es mucho peor: el que se va sin objetar ya decidió que no y no te lo quiso decir. Y hay algo más importante: el 80% de las objeciones no son la verdad profunda, son la primera defensa emocional del prospecto.",
        },
        {
          tipo: "parrafo",
          texto:
            "Por eso nunca se responde una objeción con un argumento de venta inmediato. Primero se valida, después se explora, y solo entonces se responde. Y el objetivo no es ganar el debate: es mover la conversación un paso hacia la decisión.",
        },
        {
          tipo: "cita",
          texto:
            "Cómo respondes a una objeción dice más de tu nivel que toda tu presentación.",
        },
      ],
    },
    {
      titulo: "El método VERA",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Paso", "Qué hacer", "Cómo suena"],
          filas: [
            [
              "V · Validar",
              "Reconocer la objeción sin ponerte a la defensiva. Jamás contradecir de frente",
              "«Te entiendo, y es una duda muy válida»",
            ],
            [
              "E · Explorar",
              "Una pregunta para llegar a la raíz real",
              "«¿Qué es exactamente lo que más te genera esa duda?»",
            ],
            [
              "R · Reencuadrar",
              "Cambiar el ángulo desde el que mira el problema",
              "«Lo que me dices no es que sea caro: es que todavía no ves qué te devuelve. Eso sí lo podemos aclarar»",
            ],
            [
              "A · Avanzar",
              "Proponer el siguiente paso concreto, sin presionar",
              "«¿Te parece si te muestro el número de lo que te cuesta hoy no tenerlo?»",
            ],
          ],
        },
        {
          tipo: "nota",
          texto:
            "El paso que todos se saltan es EXPLORAR. Sin esa pregunta estás respondiendo a la objeción que imaginaste, no a la que tiene.",
        },
      ],
    },
    {
      titulo: "Las diez objeciones que más vas a escuchar",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Salen del manual de objeciones de la casa, filtradas a las que aplican cuando vendes producción de contenido. Para cada una: lo que de verdad significa y por dónde entrar.",
        },
        {
          tipo: "tabla",
          columnas: ["Lo que dice", "Lo que significa", "Por dónde entrar"],
          filas: [
            [
              "«Es muy caro»",
              "No ve el retorno, o te compara con un freelancer",
              "«¿Caro comparado con qué?» — casi siempre te compara con algo que no hace lo mismo",
            ],
            [
              "«No tengo presupuesto ahora»",
              "No es prioridad, o el ciclo de caja no calza",
              "Pregunta cuándo abre presupuesto y agenda para esa fecha. No bajes el precio: mueve la fecha",
            ],
            [
              "«Dame un descuento»",
              "Está probando si tu precio es real",
              "El precio no baja; baja el alcance. «Puedo ajustar el paquete, no la tarifa»",
            ],
            [
              "«¿Por qué mensual y no por pieza?»",
              "Quiere probar sin comprometerse",
              "Una pieza suelta no mueve nada. Explica que lo que se compra es consistencia, no archivos",
            ],
            [
              "«Necesito pensarlo»",
              "Falta información, o no es él quien decide",
              "«Claro. ¿Qué te falta saber para decidir?» — la respuesta te da la objeción real",
            ],
            [
              "«Quiero ver resultados primero»",
              "No confía todavía",
              "Muestra casos y ofrece un primer hito corto y pagado, nunca trabajo gratis",
            ],
            [
              "«Ahora no es el momento»",
              "Puede ser verdad (temporada) o evasión",
              "«¿Qué tendría que pasar para que sí sea el momento?»",
            ],
            [
              "«No te conozco / ¿cómo sé que funciona?»",
              "Riesgo percibido",
              "Casos con nombre, y una garantía con condición y remedio. No promesas de venta",
            ],
            [
              "«Lo hace un freelancer por la mitad»",
              "Compara precio porque no ve la diferencia",
              "No hables mal del freelancer. Muestra dos piezas lado a lado y deja que decida el ojo",
            ],
            [
              "«Tengo que consultarlo con mi socio»",
              "Autoridad compartida, muchas veces real",
              "«Perfecto. ¿Qué le va a preocupar a él?» y ofrece entrar a esa conversación tú mismo",
            ],
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Captura de una conversación real de WhatsApp donde una objeción de precio se resuelve con el método VERA, con los cuatro pasos señalados.",
          pie: "VERA aplicado en un chat real, paso por paso.",
          captura: true,
        },
      ],
    },
    {
      titulo: "¿Objeción real o pretexto?",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Hay una pregunta que las separa, y conviene usarla antes de gastar munición argumentando:",
        },
        {
          tipo: "copiable",
          etiqueta: "La pregunta que revela la verdad",
          contenido: `Entiendo. Déjame preguntarte una cosa para no hacerte perder
tiempo: si el precio no fuera un tema, ¿lo harías?

→ Si dice SÍ: la objeción es real y es de dinero. Trabaja el ROI,
  la forma de pago o el alcance.
→ Si duda o cambia de tema: el precio era el pretexto. La objeción
  verdadera es otra (confianza, prioridad, o no es él quien decide).`,
        },
        {
          tipo: "lista",
          items: [
            "Señal de objeción real: da detalles, números, fechas.",
            "Señal de pretexto: se pone vago, generaliza, o salta a otro tema.",
            "Señal de que no era tu cliente: objeta todo y no pregunta nada.",
          ],
        },
      ],
    },
    {
      titulo: "La única objeción que no se trabaja",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuando el prospecto no reconoce ningún problema. Si en el descubrimiento no hubo dolor, no hay nada que reencuadrar: estarías convenciéndolo de que tiene una herida que él no siente. Esas ventas, cuando salen, se caen en el mes dos y encima te piden devolución.",
        },
        {
          tipo: "parrafo",
          texto:
            "Ahí se cierra distinto: «creo que hoy no lo necesitas. Cuando [evento que lo va a obligar] llegue, escríbeme». Se van con respeto y vuelven solos más seguido de lo que parece.",
        },
        {
          tipo: "pregunta",
          enunciado:
            "El prospecto dice «está caro». Según VERA, ¿qué es lo PRIMERO que haces?",
          opciones: [
            "Explicar todo lo que incluye para justificar el precio",
            "Validar la objeción y preguntar qué le genera la duda",
            "Ofrecer un paquete más chico",
          ],
          correcta: 1,
          explicacion:
            "Validar y explorar van antes de responder. Si te lanzas a justificar, contestas la objeción que imaginaste y no la que el prospecto tiene de verdad.",
        },
      ],
    },
  ],

  // ── 5. LA PROPUESTA Y EL PRECIO ───────────────────────────────
  "la-propuesta-y-el-precio": [
    {
      titulo: "Una propuesta no es un presupuesto",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un presupuesto es una lista de cosas con un número al final: invita a comparar precio y a recortar partidas. Una propuesta cuenta el problema del cliente, lo que va a cambiar y qué hace falta para lograrlo. Compiten en ligas distintas.",
        },
        {
          tipo: "nota",
          texto:
            "La propuesta se manda DESPUÉS de la llamada, nunca antes. Una propuesta sin descubrimiento es una cotización a ciegas, y se responde con «gracias, lo reviso».",
        },
      ],
    },
    {
      titulo: "La estructura de una página",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "1. Su problema, en sus palabras",
              detalle:
                "Dos líneas con la frase que dijo en la llamada. Si abre leyendo su propio diagnóstico, ya no está comparando proveedores.",
            },
            {
              titulo: "2. Qué va a cambiar",
              detalle:
                "El resultado concreto, no la lista de tareas. «Tu catálogo se va a ver como lo que cuesta» antes que «8 imágenes y 2 videos».",
            },
            {
              titulo: "3. Qué incluye, en bloques",
              detalle:
                "Agrupado por función, no por unidades sueltas. Los bloques se entienden; las listas de 14 ítems se recortan.",
            },
            {
              titulo: "4. Cómo se trabaja y en cuánto tiempo",
              detalle:
                "Fases con fechas. Baja la ansiedad del que nunca contrató esto y te separa del que improvisa.",
            },
            {
              titulo: "5. La inversión",
              detalle:
                "Un número claro, con el plazo mínimo y la forma de pago. Si hay ancla de mercado, va justo arriba.",
            },
            {
              titulo: "6. La garantía y el siguiente paso",
              detalle:
                "Qué pasa si no funciona, y qué tiene que hacer él hoy para arrancar. Una sola acción.",
            },
          ],
        },
        {
          tipo: "enlace",
          url: "/taller/recursos/plantilla-maestra-campana",
          texto: "Plantilla maestra de campaña",
          nota: "De brief a guion en una tarde: sirve para armar el bloque 3 y 4 de la propuesta.",
        },
      ],
    },
    {
      titulo: "Tres opciones, no una",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Con un solo precio, la decisión es sí o no. Con tres, la decisión pasa a ser cuál — y eso ya es una venta. La del medio es la que quieres vender; la de arriba existe para que la del medio parezca razonable.",
        },
        {
          tipo: "tabla",
          columnas: ["Opción", "Para qué sirve", "Cómo se presenta"],
          filas: [
            ["La mínima", "Que nadie se vaya por precio", "Un bloque, alcance corto, mismo estándar de calidad"],
            ["La recomendada", "Es la que quieres cerrar", "Marcada como recomendada, con el alcance que de verdad resuelve el problema"],
            ["La completa", "Hace de ancla y a veces se vende", "Todo, con la pieza que él mencionó de pasada en la llamada"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Nunca bajes la tarifa: baja el alcance. Si cedes en la tarifa, le enseñas que tu precio era inventado, y el año que viene vuelve a pedir lo mismo.",
        },
      ],
    },
    {
      titulo: "Por qué cobrar barato te abarata",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El precio no es solo dinero: es una señal de categoría. Quien cobra la mitad del mercado comunica que hace la mitad del trabajo, y atrae al cliente que negocia todo, aprueba tarde y pide cambios sin fin. Subir el precio no es ambición: es filtro.",
        },
        {
          tipo: "lista",
          items: [
            "Cobra por el problema que resuelves, no por las horas que te toma. Que la IA te haga rápido no significa que valga menos.",
            "El primer cliente puede ser más barato a cambio de algo concreto: permiso para mostrar el caso y un testimonio grabado. Nunca «a cambio de nada, para ganar experiencia».",
            "Sube el precio cuando tengas tres casos con resultado. No antes, y no mucho después.",
            "Pide adelanto, siempre. La mitad al arrancar es estándar y ordena al cliente además de a ti.",
          ],
        },
        {
          tipo: "cita",
          texto:
            "Tu precio enseña a tu cliente cómo tratarte.",
        },
      ],
    },
    {
      titulo: "El mínimo que tiene que estar por escrito",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "No hace falta un contrato de abogado para empezar, pero sí que estas seis cosas estén escritas y aceptadas por mensaje. Todas las peleas que he visto salen de una de ellas.",
        },
        {
          tipo: "lista",
          items: [
            "Qué se entrega exactamente: cantidad, formato y duración de cada pieza.",
            "Cuántas rondas de cambios entran, y qué se cobra a partir de la siguiente.",
            "Qué necesitas de él y para cuándo: fotos del producto, logos, aprobaciones. Si él se retrasa, la fecha se mueve.",
            "Plazo de entrega y plazo de pago, con fechas.",
            "Qué pasa si se cancela a mitad: lo trabajado se cobra.",
            "Quién puede publicar el material y dónde, y si tú puedes mostrarlo en tu portafolio.",
          ],
        },
        {
          tipo: "pregunta",
          enunciado:
            "El cliente pide 20% de descuento. ¿Cuál es la respuesta que no te abarata?",
          opciones: [
            "Dárselo para cerrar hoy y asegurar el cliente",
            "Mantener la tarifa y ajustar el alcance a lo que entra en ese monto",
            "Dárselo solo esta vez y avisarle que el próximo mes sube",
          ],
          correcta: 1,
          explicacion:
            "Bajar la tarifa enseña que el precio era negociable. Bajar el alcance mantiene intacto el valor de tu hora y deja la decisión del lado del cliente.",
        },
      ],
    },
  ],
};
