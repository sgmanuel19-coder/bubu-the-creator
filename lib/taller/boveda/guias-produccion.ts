import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// GUÍAS A FONDO — Producción con IA (4) + interiores premium (2)
// El stack real de RESUELTO: Higgsfield, Kling, Seedance,
// ElevenLabs, HeyGen, CapCut. Copy 100% original de Manuel.
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_PRODUCCION: Record<string, SeccionRecurso[]> = {
  // ── Higgsfield desde cero ──────────────────────────────────────
  "higgsfield-desde-cero": [
    {
      titulo: "Qué es (y qué lugar ocupa en el sistema)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Higgsfield es la máquina de generación del sistema: imagen, motion y video en una sola plataforma. Es donde produzco el material visual para clientes reales — no una herramienta de juguete. Pero hay que entender su lugar: la máquina EJECUTA, no piensa. En mi flujo, el prompt llega a Higgsfield ya pensado — el insight, la idea y la dirección de arte se decidieron antes (eso es la PARTE 1 de la masterclass). Higgsfield convierte esa decisión en píxeles.",
        },
        {
          tipo: "parrafo",
          texto:
            "Si le pides a la máquina que piense por ti, produce imágenes bonitas y vacías — el famoso «look de IA». Si llegas con la idea resuelta, produce material que compite con producción tradicional.",
        },
      ],
    },
    {
      titulo: "Los modelos: cuál usar para qué",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Modelo", "Su cancha", "Cuándo lo uso"],
          filas: [
            [
              "Nano",
              "Velocidad y volumen",
              "Exploración: cuando estoy buscando la dirección visual y necesito probar 10 variaciones rápido y barato.",
            ],
            [
              "Banana Pro",
              "Detalle y realismo",
              "La pieza final: cuando la dirección ya está elegida y necesito la versión de máxima calidad.",
            ],
            [
              "GPT-2 Image",
              "Obediencia fina y texto",
              "Cuando la imagen lleva texto legible o instrucciones muy específicas que otros modelos ignoran.",
            ],
          ],
        },
        {
          tipo: "nota",
          texto:
            "El flujo económico: exploras en Nano (barato), decides, y produces la final en Banana Pro. Generar todo en el modelo caro es quemar créditos en borradores.",
        },
      ],
    },
    {
      titulo: "El prompt que produce cine (no stock)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La diferencia entre una imagen genérica y una con look de película está en UN hábito: describir como director de fotografía, no como cliente. Lente, luz, atmósfera, paleta — las cuatro decisiones que el 95% no toma y que lo cambian todo.",
        },
        {
          tipo: "copiable",
          etiqueta: "Estructura · el prompt cinematográfico base",
          contenido:
            "[SUJETO Y ACCIÓN: quién hace qué, con actitud]\n[ESCENARIO: dónde, con detalles que cuenten historia]\n[LENTE: ej. 75mm, primer plano con fondo desenfocado]\n[LUZ: fuente principal + luz de recorte + rebote suave]\n[PALETA: ej. sombras azul profundo, brillos cálidos de la piel]\n[ATMÓSFERA: neblina ligera / partículas / aire denso]\n[ACABADO: grano fino de película, profundidad de campo corta]\n\nEjemplo armado:\nHombre de 40 años revisando planos en una fábrica de luminarias, expresión concentrada. Lente 75mm, primer plano con maquinaria desenfocada al fondo. Luz principal fría desde una claraboya, recorte cálido desde las lámparas del taller, rebote suave frontal. Sombras azul profundo, brillos cálidos en la piel. Neblina industrial ligera. Grano fino de película, profundidad de campo corta.",
        },
        {
          tipo: "lista",
          items: [
            "Un cambio a la vez: si la imagen salió 80% bien, cambia SOLO lo que falla. Regenerar todo desde cero es tirar el 80% ganado.",
            "Guarda tus prompts ganadores con su resultado: tu biblioteca personal vale más que cualquier tutorial (el pack premium de esta bóveda son los míos de producción real, calibrados).",
            "El texto en imágenes casi siempre se agrega DESPUÉS en edición — más control, cero deformaciones.",
          ],
        },
      ],
    },
    {
      titulo: "De la imagen al motion",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Higgsfield también anima: la imagen aprobada se convierte en un clip con movimiento de cámara o del sujeto. La regla de producción es sagrada: LA IMAGEN PRIMERO. Generas y apruebas el frame; recién entonces lo animas. Corregir una imagen toma segundos; corregir un video generado cuesta el render entero. Y cuando la escena pide física realista o audio sincronizado, ahí entran Kling y Seedance — la siguiente guía de esta bóveda.",
        },
        {
          tipo: "cita",
          texto: "La plataforma la puede pagar cualquiera. El criterio con el que le hablas — eso es lo que cobras.",
        },
      ],
    },
  ],

  // ── Personaje consistente ──────────────────────────────────────
  "personaje-consistente": [
    {
      titulo: "El problema #1 del video con IA",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Generas la escena 1 y tu protagonista es perfecto. Generas la escena 2 y… es otra persona. Cara distinta, edad distinta, hasta otra ropa. Para un experimento da igual; para una CAMPAÑA es descalificante — la audiencia no conecta con un personaje que muta, y el cliente no paga por él. La consistencia de personaje es LA habilidad que separa el video de IA amateur del profesional.",
        },
        {
          tipo: "parrafo",
          texto:
            "La solución no es suerte ni regenerar cien veces: es documentación. Igual que una productora tiene su hoja de personaje y su continuista, tu sistema necesita lo mismo — versión IA.",
        },
      ],
    },
    {
      titulo: "La hoja de personaje (tu contrato de continuidad)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La hoja de personaje fija POR ESCRITO todo lo que no puede cambiar entre escenas. Esa descripción viaja COMPLETA en cada prompt — palabra por palabra, sin resumir. Lo que debe fijar:",
        },
        {
          tipo: "lista",
          items: [
            "Identidad física: edad exacta, rasgos de cara distintivos, tono de piel, tipo y corte de pelo, contextura.",
            "Vestuario de campaña: prenda por prenda, con colores exactos. El personaje no se cambia de ropa entre escenas salvo decisión de guion.",
            "Actitud y energía: cómo mira, cómo se para. «Seguro y sereno» produce otro personaje que «intenso y urgente».",
            "Luz de referencia: el mismo esquema de luz ayuda a que la cara se lea igual entre escenas.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Plantilla · hoja de personaje",
          contenido:
            "PERSONAJE: [nombre interno de campaña]\n\nFÍSICO (va ÍNTEGRO en cada prompt):\nHombre/Mujer de [edad] años, [rasgos de cara: forma, detalles distintivos], piel [tono], cabello [color, corte, largo], contextura [tipo].\n\nVESTUARIO:\n[prenda 1 con color exacto] + [prenda 2] + [detalle: reloj, lentes…]\n\nACTITUD:\n[2-3 palabras de energía: ej. «concentrado, seguro, cálido»]\n\nLUZ DE REFERENCIA:\n[ej. «luz principal suave lateral, recorte cálido, sombras azul profundo»]\n\nREGLA DE USO: este bloque se pega COMPLETO en cada prompt de la campaña.\nSolo cambian: la acción, el escenario y el encuadre.",
        },
      ],
    },
    {
      titulo: "El ancla visual: tu personaje aprobado como referencia",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Genera al personaje una vez, hasta aprobarlo",
              detalle:
                "Sesión dedicada solo a él: frente, perfil, expresiones. De ahí sale SU imagen oficial — el casting, en términos de productora.",
            },
            {
              titulo: "Usa esa imagen como referencia en cada escena",
              detalle:
                "Donde la plataforma acepte imagen de referencia (Higgsfield la acepta), el personaje aprobado ancla cada generación nueva. La hoja escrita + el ancla visual juntas son tu máxima consistencia.",
            },
            {
              titulo: "Cambia el mundo, nunca al personaje",
              detalle:
                "De escena a escena varían acción, fondo y encuadre. La descripción del personaje NO se toca — ni un sinónimo. «Camisa azul marino» no se convierte en «camisa oscura».",
            },
            {
              titulo: "Control de continuidad antes de editar",
              detalle:
                "Pon todas las escenas en una grilla y míralas juntas: ¿es la misma persona en todas? La que desentona se regenera ANTES de editar, no después de publicar.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Honestidad de producción: ni con todo esto la consistencia es 100% — es 90-95%, y ese margen se maneja con selección de tomas y planos (si una escena salió con la cara levemente distinta, úsala en plano más abierto). El 5% restante es exactamente el mismo problema que el cine resuelve con montaje.",
        },
      ],
    },
  ],

  // ── De imagen a video: Kling y Seedance ────────────────────────
  "de-imagen-a-video": [
    {
      titulo: "Dos motores, dos trabajos",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "En mi stack de máxima calidad conviven dos motores de video, y elegir bien cuál usar es la mitad del resultado:",
        },
        {
          tipo: "tabla",
          columnas: ["Motor", "Su fuerza", "Cuándo lo uso"],
          filas: [
            [
              "Kling 3.0",
              "Física creíble: caminatas, telas, agua, peso, cámara en movimiento",
              "Escenas realistas donde el movimiento tiene que sentirse VERDAD. El plano que parece rodado.",
            ],
            [
              "Seedance 2.0",
              "Sincronización audiovisual: voz, música y sonido alineados con la imagen",
              "Cuando la pieza lleva alguien hablando, o el audio y el video deben respirar juntos.",
            ],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Y la regla que gobierna a ambos, heredada de la guía de Higgsfield: LA IMAGEN PRIMERO. El frame inicial se genera y aprueba antes de animar nada. Un video generado desde una imagen mediocre es una imagen mediocre… en movimiento.",
        },
      ],
    },
    {
      titulo: "El prompt de video se escribe como escena de guion",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "«Mujer caminando por la ciudad» es una lotería. Una escena descrita con intención es una toma. La diferencia son cuatro decisiones: qué hace el sujeto (con arco: qué pasa al inicio y qué al final de los segundos), cómo se mueve la cámara, qué ritmo tiene la acción, y qué NO debe pasar.",
        },
        {
          tipo: "copiable",
          etiqueta: "Estructura · prompt de escena para video",
          contenido:
            "SUJETO Y ARCO: [quién + qué hace del segundo 0 al final — la acción tiene inicio y fin]\nCÁMARA: [fija / travelling lateral / acercamiento lento / órbita — UNA decisión]\nRITMO: [lento y contemplativo / natural / enérgico]\nCONSISTENCIA: [pega aquí el bloque de tu hoja de personaje]\nNO: [lo que arruina la toma: cortes bruscos, cámara temblorosa, cambios de cara]\n\nEjemplo:\nLa mujer del personaje de referencia levanta la vista de su laptop, sonríe levemente y gira hacia la ventana de la oficina; la luz cálida del atardecer le cruza la cara al final. Cámara: acercamiento lento frontal. Ritmo natural. NO: movimientos bruscos, NO cambios en el rostro ni el vestuario.",
        },
        {
          tipo: "lista",
          items: [
            "Una acción por clip. Los motores hacen bien UNA cosa por generación; la secuencia compleja se arma en edición con varios clips.",
            "Piensa en tomas de 5-10 segundos, como un director de verdad: el video final es un MONTAJE de tomas, no una generación milagrosa de 60 segundos.",
            "En Seedance, escribe el diálogo/audio junto con la acción: la sincronización es su gracia — desperdiciarla es usarlo como Kling caro.",
          ],
        },
      ],
    },
    {
      titulo: "El pipeline completo de una pieza",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "Guion y storyboard", detalle: "La pieza se piensa en papel: qué tomas la componen, qué dice cada una. (Las estructuras narrativas de esta bóveda aplican íntegras.)" },
            { titulo: "Frames en Higgsfield", detalle: "El frame inicial de cada toma, con el prompt cinematográfico y la hoja de personaje. Se aprueban TODOS antes de animar." },
            { titulo: "Animación en Kling o Seedance", detalle: "Cada frame aprobado se anima con su prompt de escena. Kling para el movimiento realista; Seedance para lo que lleva voz." },
            { titulo: "Voz y presentadores", detalle: "El voiceover en ElevenLabs; el talking-head en HeyGen si aplica (guía aparte en esta bóveda)." },
            { titulo: "Montaje en CapCut", detalle: "Las tomas se vuelven pieza con las reglas de ritmo. Y antes de exportar: checklist «parece agencia»." },
          ],
        },
        {
          tipo: "cita",
          texto: "La IA no hace el video. Hace las tomas. El video — la pieza que cobra — lo sigue haciendo el montaje y el criterio.",
        },
      ],
    },
  ],

  // ── Voz y presentadores IA ─────────────────────────────────────
  "voz-y-presentadores-ia": [
    {
      titulo: "El mapa honesto",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Voz y presentadores son donde la IA más rápido se nota MAL usada — y donde mejor rinde bien usada. Mis dos herramientas de producción y su territorio:",
        },
        {
          tipo: "tabla",
          columnas: ["Herramienta", "Qué hace", "Dónde brilla", "Dónde NO usarla"],
          filas: [
            [
              "ElevenLabs",
              "Voces sintéticas de alta calidad y clonación de voz",
              "Voiceover de piezas publicitarias, narración de video, versiones en otros idiomas",
              "Testimonios y historia personal emocional — ahí la voz real gana siempre",
            ],
            [
              "HeyGen",
              "Presentadores/avatares en video a partir de guion",
              "Videos corporativos, explicativos, multiidioma, cuando no se puede grabar",
              "Contenido de marca personal — tu audiencia te sigue A TI, no a tu avatar",
            ],
          ],
        },
      ],
    },
    {
      titulo: "ElevenLabs: dirigir la voz como se dirige un actor",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Elige la voz CREÍBLE, no la «épica»: la voz de tráiler de cine vende menos que una voz que suena a persona que sabe.",
            "La puntuación es tu dirección de actor: las comas y puntos son pausas; los signos de interrogación y exclamación cambian la entonación completa. Un guion bien puntuado narra solo.",
            "Frases cortas: la voz sintética se delata en las frases kilométricas. 8-15 palabras por frase y el resultado sube un nivel.",
            "Genera 2-3 tomas del mismo texto y elige — igual que con un locutor real, la primera toma rara vez es la buena.",
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · adapta mi guion para voz IA",
          contenido:
            "Toma este guion y adáptalo para narración con voz sintética (ElevenLabs):\n\n[pega tu guion]\n\n1. Corta toda frase de más de 15 palabras en frases más cortas.\n2. Puntúa para la respiración: comas donde va pausa corta, punto y aparte donde va pausa de énfasis.\n3. Marca en MAYÚSCULA la palabra de énfasis de cada frase clave (máximo una por frase).\n4. Elimina lo que suena escrito y no hablado («cabe destacar», «asimismo»).\n\nDevuélveme el guion listo para pegar, y debajo una nota de qué energía debería tener la voz (para elegirla bien).",
        },
      ],
    },
    {
      titulo: "HeyGen y la regla de la mezcla",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "HeyGen resuelve el talking-head cuando grabar no es opción: el video corporativo del cliente que no quiere salir en cámara, la versión en inglés de tu pieza, el explicativo que se actualiza cada mes. Funciona mejor con guiones cortos y directos — el monólogo de tres minutos delata al avatar.",
        },
        {
          tipo: "nota",
          texto:
            "La regla de oro de todo este territorio es LA MEZCLA: piezas 100% sintéticas se sienten sintéticas. Voz IA sobre b-roll real, avatar intercalado con producto real, tu cara real en el gancho y la IA en el desarrollo — la mezcla es exactamente lo que hace que el espectador no levante la ceja. Y la línea ética: clonar solo TU voz o con permiso escrito del dueño; en trabajos de cliente, el cliente sabe qué es sintético. La confianza cuesta más cara que cualquier render.",
        },
        {
          tipo: "cita",
          texto: "La voz IA no reemplaza tu voz. Multiplica las horas del día en que tu voz puede estar trabajando.",
        },
      ],
    },
  ],

  // ── Cuánto demora un render ────────────────────────────────────
  "cuanto-demora-un-render": [
    {
      titulo: "Por qué esto importa más de lo que parece",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Nadie te cobra por saber cuánto demora un render. Te cobran — o te descuentan — por prometer una entrega el viernes y entregarla el lunes. En producción con IA el error de cálculo más caro no es artístico: es de agenda. Le dijiste al cliente «te lo tengo mañana», hiciste la cuenta con la última vez que generaste un clip, y esa vez habías generado en 720p un martes a las diez de la mañana. El día de la entrega estás en 1080p, es domingo en la noche, y el mismo trabajo te tomó cuatro veces más.",
        },
        {
          tipo: "parrafo",
          texto:
            "Dirección creativa también es esto: saber cuánto cuesta en horas lo que estás decidiendo en el brief. Un director que promete 12 tomas para pasado mañana sin saber estos números no está dirigiendo, está apostando.",
        },
      ],
    },
    {
      titulo: "Los tiempos reales, modelo por modelo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Esta tabla es la medición que Higgsfield publicó sobre sus propias generaciones: la mediana de 30 días para un clip de 8 segundos en 720p, con la cola de espera separada del render en sí. No es el mejor caso a las 4am con los servidores vacíos — es tráfico normal. Léela así: la columna «Cola» no la controlas, la columna «Render» sí.",
        },
        {
          tipo: "tabla",
          columnas: ["Modelo", "Cola", "Render", "Total"],
          filas: [
            ["Kling (720p, 8s)", "~10 s", "~77 s", "~1.5 min"],
            ["WAN (promedio)", "~4 s", "~85 s", "~1.5 min"],
            ["Veo (1080p, 8s)", "~3 s", "~127 s", "~2 min"],
            ["Seedance (720p, 8s)", "~10–34 s", "~206 s", "~3.5–4 min"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "El dato que a mí me cambió la planificación: Seedance demora casi el triple que Kling para el MISMO clip. No es que Seedance esté lento — está haciendo otra cosa (por eso es el que uso cuando la escena lleva voz sincronizada). Pero si estoy explorando dirección visual y tiro diez pruebas en Seedance, acabo de gastar cuarenta minutos donde Kling me hubiera dado la misma respuesta creativa en quince.",
        },
        {
          tipo: "nota",
          texto:
            "Regla que saqué de esto: explorar en Kling, cerrar en Seedance. Igual que en imagen exploro en Nano y cierro en Banana Pro. El modelo caro (en créditos o en minutos) nunca se usa para borradores.",
        },
      ],
    },
    {
      titulo: "La resolución es el multiplicador que nadie mira",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Si un render está demorando más de lo que esperabas, revisa la resolución ANTES de asumir que el servidor está saturado. Es, por lejos, la variable que más pesa — más que el largo del clip, más que el modelo que elegiste.",
        },
        {
          tipo: "tabla",
          columnas: ["Resolución", "Render de un clip Kling de 8s"],
          filas: [
            ["720p", "~77 s"],
            ["1080p", "~191 s (unas 2.5 veces más)"],
            ["4K", "~170 s"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "La razón es aritmética simple: 1080p son unos 2.1 millones de píxeles por cuadro; 4K son unos 8.3 millones, casi cuatro veces más. Cada píxel lo tiene que resolver el modelo. Subir de resolución no es mover un slider, es pedirle al motor varias veces el mismo trabajo.",
        },
        {
          tipo: "nota",
          texto:
            "Sí, el 4K de la tabla marca menos que el 1080p. No es error de tipeo — el 4K pasa por una ruta de upscale distinta, no por el mismo render nativo. Lo importante es el salto 720p → 1080p, que es el que vas a hacer todos los días.",
        },
      ],
    },
    {
      titulo: "El largo del clip: la única variable que se comporta",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Kling en 720p: 5 segundos ≈ 60 s · 8 segundos ≈ 77 s · 15 segundos ≈ 130 s.",
            "Seedance en 1080p: 4 segundos ≈ 226 s · 15 segundos ≈ 307 s.",
            "La regla gruesa: el doble de largo, el doble de tiempo. Escala casi lineal.",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Esta es la buena noticia de toda la medición: el largo es la variable que puedes presupuestar con confianza real, porque no se mueve con las condiciones del servidor. La cola sí se mueve. El largo no. Así que cuando armes el cronograma de una pieza, calcula sobre segundos totales de material, no sobre «cantidad de clips».",
        },
      ],
    },
    {
      titulo: "Cómo armo un día de producción con estos números",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Primero los frames, siempre",
              detalle:
                "La regla sagrada no cambia: la imagen se aprueba antes de animar. Corregir una imagen son segundos; corregir un video generado es el render entero de nuevo. Todo lo de esta guía asume que los frames YA están aprobados.",
            },
            {
              titulo: "Prueba toda la pieza en 720p",
              detalle:
                "Composición, movimiento de cámara y ritmo se validan perfecto en 720p. Nadie aprueba un concepto por la resolución. Esta pasada es la que decide qué tomas sobreviven.",
            },
            {
              titulo: "Cuenta segundos, no clips",
              detalle:
                "Suma los segundos de las tomas que sobrevivieron y aplica la tabla. 12 tomas de 8 segundos en Kling 720p ≈ 15 minutos de render puro. Las mismas 12 en Seedance ≈ 45 minutos. Ese número va al cronograma, no tu intuición.",
            },
            {
              titulo: "Recién ahí sube a 1080p, y solo lo aprobado",
              detalle:
                "Multiplica por 2.5 el tiempo del paso anterior para la pasada final. Si eso no entra en tu día, la conversación con el cliente es HOY, no el día de la entrega.",
            },
            {
              titulo: "Deja colchón para la cola",
              detalle:
                "La cola engorda en el horario pico (aprox. 01:00–08:00 UTC, que es la noche en América). Si tu batch no tiene deadline duro, córrelo fuera de esa ventana. Si lo tiene, súmale margen y no lo negocies.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Si estás en un plan con chats en paralelo (Plus da 3, Ultra da 10), el cálculo cambia por completo: diez clips de Seedance en secuencia son ~40 minutos; los mismos diez en paralelo se acercan al tiempo de UNO. Antes de pagar el plan más caro, haz esta cuenta con tu volumen real de la semana — es la única forma honesta de saber si te conviene.",
        },
      ],
    },
    {
      titulo: "Los cuatro números que le das al cliente",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cuando cotizas una pieza, el tiempo de máquina es solo una parte. Lo que le prometes al cliente se arma con cuatro bloques, y solo uno de ellos aparece en esta guía:",
        },
        {
          tipo: "lista",
          items: [
            "Pensamiento — insight, concepto, guion y storyboard. No lo hace la máquina y es lo que de verdad cobras.",
            "Frames — generación y aprobación de la imagen inicial de cada toma en Higgsfield.",
            "Render — esto: segundos de material × modelo × resolución, con colchón para la cola.",
            "Montaje — voz en ElevenLabs, presentador en HeyGen si aplica, y el armado con ritmo en CapCut.",
          ],
        },
        {
          tipo: "cita",
          texto:
            "El cliente no te paga por esperar el render. Te paga porque tú sabías cuánto iba a demorar antes de prometerlo.",
        },
      ],
    },
  ],

  // ── PREMIUM · Pack de prompts cinematográficos (interior) ──────
  "pack-prompts-cinematograficos": [
    {
      titulo: "Qué recibes exactamente",
      bloques: [
        {
          tipo: "lista",
          items: [
            "50 prompts de producción real, organizados por tipo de plano (retrato, producto, escena industrial, lifestyle, arquitectura) y por género de campaña.",
            "Cada prompt con su receta completa: lente, esquema de luz, paleta, atmósfera y acabado — calibrados en Higgsfield (Nano y Banana Pro).",
            "Notas de uso por prompt: cuándo usarlo, qué variar para tu marca y qué NO tocar.",
            "Actualizaciones incluidas: cuando el pack crece, te llega la versión nueva.",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Con tu acceso activo, las descargas aparecen aquí abajo. Cualquier duda de uso, me escribes directo por WhatsApp — el soporte viene incluido.",
        },
        {
          tipo: "nota",
          texto:
            "Cómo sacarle el jugo: no copies el prompt entero a ciegas — identifica QUÉ decisión (luz, lente, paleta) hace que funcione, y esa decisión llévala a tus propios prompts. El pack enseña el criterio mientras lo usas.",
        },
      ],
    },
    {
      titulo: "Un prompt completo, de muestra",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Esto es el nivel de detalle de cada uno de los 50 — no una descripción vaga, sino la receta técnica exacta que produce el resultado.",
        },
        {
          tipo: "copiable",
          etiqueta: "Muestra · retrato de producto premium",
          contenido:
            "Producto en primer plano, fondo desenfocado en tono carbón profundo.\nLENTE: 85mm, apertura f/1.8, el producto ocupa el 60% del cuadro.\nLUZ: key light lateral a 45°, ratio 3:1 con fill suave, rim light frío detrás para separar del fondo.\nPALETA: tonos cálidos en el producto, fondo desaturado en frío para contraste.\nATMÓSFERA: leve neblina de estudio para suavizar sombras duras.\nACABADO: grano fino de película, sin viñeteado agresivo, contraste medio-alto.",
        },
        {
          tipo: "parrafo",
          texto:
            "Lo que cambias por marca: la paleta y el tono de la luz (cálido vs frío según la identidad). Lo que NO tocas: la relación de lente y apertura — eso es lo que da la sensación de «producción cara» y es independiente de la marca.",
        },
      ],
    },
    {
      titulo: "Cómo están organizados los 50",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Categoría", "Cuántos", "Para qué campaña"],
          filas: [
            ["Retrato y personaje", "12", "Testimoniales, vocero de marca, contenido con rostro"],
            ["Producto en estudio", "10", "E-commerce, packshots, catálogo"],
            ["Escena industrial y B2B", "8", "Servicios, manufactura, tecnología"],
            ["Lifestyle y cotidiano", "12", "UGC, contenido de marca personal, redes"],
            ["Arquitectura y espacio", "8", "Inmobiliaria, eventos, hospitality"],
          ],
        },
      ],
    },
  ],

  // ── PREMIUM · Plantilla maestra de campaña (interior) ──────────
  "plantilla-maestra-campana": [
    {
      titulo: "Qué recibes exactamente",
      bloques: [
        {
          tipo: "lista",
          items: [
            "La plantilla maestra en documento editable: el flujo completo de brief → insight → Big Idea → estructura narrativa → hooks → guiones listos para producir.",
            "Las 4 etapas del protocolo con sus preguntas guía — las mismas que uso con mis clientes activos.",
            "Video corto de cómo la lleno yo, paso a paso, con un caso real.",
            "La salida queda lista para alimentar tu Cerebro Creativo: la plantilla y el sistema de la masterclass hablan el mismo idioma.",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Con tu acceso activo, las descargas aparecen aquí abajo. Si la usas para un cliente y quieres una segunda opinión sobre tu campaña, escríbeme — ese ida y vuelta está incluido en el precio.",
        },
        {
          tipo: "nota",
          texto:
            "El error a evitar: saltarte las etapas de pensamiento para llegar rápido a los guiones. La plantilla funciona PORQUE te obliga a decidir como director creativo antes de tocar cualquier herramienta. Si la llenas en 10 minutos, la llenaste mal.",
        },
      ],
    },
    {
      titulo: "Las 4 etapas, con un caso llenado",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Etapa", "Pregunta guía", "Ejemplo llenado (marca de suplementos)"],
          filas: [
            ["1. Brief", "¿Qué necesita el negocio y quién es el cliente real?", "Aumentar ventas del producto B en el trimestre. Cliente: mujeres 28-40 que ya hacen ejercicio pero abandonan suplementos por sabor"],
            ["2. Insight", "¿Qué verdad no dicha hay detrás del comportamiento?", "No dejan el suplemento por falta de disciplina — lo dejan porque cada toma se siente como una obligación más, no como un cuidado"],
            ["3. Big Idea / concepto", "¿Cómo se convierte eso en territorio de marca?", "El suplemento no es una tarea de la rutina: es el único momento del día que es solo para ti"],
            ["4. Estructura y hooks", "¿Qué formato y qué gancho lo llevan a pieza?", "Testimonial narrativo, gancho de pregunta de identificación: «¿Eres de las que dejaron el suplemento a la semana?»"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Nota cómo cada etapa se apoya en la anterior: sin el insight de la etapa 2, la Big Idea de la etapa 3 hubiera sido genérica («siéntete mejor contigo»). El insight específico es lo que hace que el concepto sea imposible de copiar por un competidor.",
        },
      ],
    },
    {
      titulo: "Errores comunes al llenarla",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Escribir el insight en la voz de la marca en vez de la voz del consumidor: «queremos que se sientan cuidadas» no es insight, es deseo de marca.",
            "Saltar directo a la etapa 4 porque ya tienes una idea de video: si no puedes trazarla hasta el insight, no sabes si es la idea correcta o solo la primera que se te ocurrió.",
            "Llenar la plantilla solo, sin el brief real del cliente: la plantilla organiza el pensamiento, pero necesita información real para producir algo específico.",
          ],
        },
      ],
    },
  ],
};
