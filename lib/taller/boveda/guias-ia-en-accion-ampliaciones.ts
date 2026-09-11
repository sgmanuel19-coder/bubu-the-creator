import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// IA EN ACCIÓN — AMPLIACIONES DE GUÍAS QUE YA EXISTÍAN
//
// Tres temas del curso ya tenían guía en la bóveda (guias-produccion.ts),
// escrita como concepto y sin imágenes. Estas secciones se SUMAN al
// final de cada una (ver secciones.ts): el paso a paso, los prompts
// copiables y los huecos de imagen descritos, con el mismo formato que
// el resto de IA en Acción. La guía original no se toca.
// ═══════════════════════════════════════════════════════════════

export const AMPLIACIONES_IA_EN_ACCION: Record<string, SeccionRecurso[]> = {
  // ── PERSONAJE CONSISTENTE · paso a paso ───────────────────────
  "personaje-consistente": [
    {
      titulo: "Paso a paso · la hoja de personaje, campo por campo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Arriba está el porqué. Esto es el cómo. La hoja no es un documento bonito: es el bloque de texto que viaja pegado en cada prompt, palabra por palabra. Si un campo queda vago, el modelo lo rellena distinto cada vez, y ahí se rompe la continuidad.",
        },
        {
          tipo: "copiable",
          etiqueta: "Hoja de personaje — plantilla para llenar",
          contenido: `NOMBRE INTERNO: [para ti, no aparece en la pieza]
EDAD APARENTE: [número exacto, no "joven"]
PIEL: [tono con referencia: trigueña clara, morena oscura, etc.]
ROSTRO: [forma, pómulos, mandíbula, nariz, cejas — 4 rasgos como mínimo]
OJOS: [color y forma; si usa lentes, el armazón exacto]
PELO: [largo, textura, color, cómo lo lleva SIEMPRE]
CUERPO: [altura aparente, complexión, postura habitual]
MARCAS FIJAS: [barba, lunar, cicatriz, arete — lo que lo hace inconfundible]
VESTUARIO BASE: [prenda por prenda, con color y material]
ACTITUD: [dos adjetivos y un gesto característico]
LUZ DE REFERENCIA: [la luz con la que se aprobó la imagen ancla]`,
        },
        {
          tipo: "nota",
          texto:
            "La regla de oro: todo lo que esté en la hoja se copia entero en cada prompt. Nunca se resume. «El mismo hombre de antes» no significa nada para un modelo que no recuerda el prompt anterior.",
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Captura de una hoja de personaje real llenada para un cliente, con todos los campos completos (nombre interno tapado).",
          pie: "Así se ve una hoja terminada. Ningún campo dice «normal» ni «común».",
          captura: true,
        },
      ],
    },
    {
      titulo: "El casting: doce variantes, una elegida",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Genera 12 variantes con la hoja completa y un plano fijo",
              detalle:
                "Retrato frontal, fondo neutro, luz difusa. El mismo prompt doce veces en Higgsfield (Banana Pro si vas a ampliar después). No cambies nada entre corridas: quieres ver cuánto varía el modelo con TU hoja.",
            },
            {
              titulo: "Descarta por rasgo, no por gusto",
              detalle:
                "Tacha las que se salgan de la hoja: edad distinta, otra nariz, otro pelo. Si más de la mitad se salen, la hoja está vaga en ese campo. Vuelve y precísalo.",
            },
            {
              titulo: "Elige una y apruébala con el cliente ANTES de producir nada",
              detalle:
                "Una sola imagen, aprobada por escrito. Esa es el ancla. Todo lo que venga después se parece a esa imagen, no a la hoja.",
            },
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Grilla de 12 retratos generados con la misma hoja de personaje; tres marcados con X por salirse de la hoja y uno marcado con un círculo como el elegido.",
          pie: "El casting completo. Las X son las que se salieron de la hoja; el círculo, el ancla.",
        },
      ],
    },
    {
      titulo: "La imagen ancla como referencia en cada escena",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Con el ancla aprobada, la hoja pasa a segundo plano: la referencia visual manda. En Higgsfield se carga como imagen de referencia y el prompt describe SOLO lo que cambia: acción, entorno, cámara y luz. El personaje ya está definido por la imagen.",
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Captura del panel de Higgsfield con la imagen ancla cargada como referencia y el campo de prompt describiendo únicamente la escena.",
          pie: "Referencia arriba, prompt de escena abajo. El personaje no se vuelve a describir.",
          captura: true,
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt de escena — no toca al personaje",
          contenido: `La persona de la imagen de referencia, idéntica en rostro, pelo y vestuario.
[ACCIÓN: qué hace en este instante, con un verbo concreto]
[ENTORNO: dónde está, qué hay al fondo, hora del día]
[CÁMARA: lente, ángulo, distancia, profundidad de campo]
[LUZ: dirección y dureza — la misma familia que la imagen ancla]
Mantener la identidad de la referencia por encima de cualquier otra instrucción.`,
        },
        {
          tipo: "nota",
          texto:
            "«Idéntica en rostro, pelo y vestuario» y la última línea no son adorno: son las dos frases que más reducen que el modelo se tome licencias con la cara.",
        },
      ],
    },
    {
      titulo: "Del ancla al video",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Genera el primer frame de cada plano como imagen",
              detalle:
                "Cada toma del guion arranca como una imagen con el ancla de referencia. Se aprueba el frame; recién ahí se anima. Corregir una imagen cuesta segundos; un video, el render entero.",
            },
            {
              titulo: "Anima desde el frame aprobado",
              detalle:
                "Kling 3.0 si la escena vive del movimiento; Seedance 2.5 si lleva voz o audio pegado. En los dos, el frame de inicio es la imagen aprobada y el prompt describe solo el movimiento.",
            },
            {
              titulo: "Compara el último frame con el ancla",
              detalle:
                "Al final de cada clip, pausa y pon el frame al lado de la imagen ancla. Si la cara derivó, se acorta el clip o se regenera. No se arregla en edición.",
            },
          ],
        },
        {
          tipo: "video",
          youtubeId: "",
          titulo: "Secuencia de tres planos del mismo personaje, animados desde frames aprobados, para ver que la cara se sostiene de plano a plano.",
          pie: "Tres planos, una cara. Así se ve cuando el ancla trabaja.",
        },
      ],
    },
    {
      titulo: "Control de continuidad antes de entregar",
      bloques: [
        {
          tipo: "copiable",
          etiqueta: "Checklist de continuidad — antes de editar",
          contenido: `[ ] Misma edad aparente en todos los planos
[ ] Misma forma de nariz y mandíbula (compara de perfil si hay)
[ ] Mismo pelo: largo, raya y color
[ ] Mismo vestuario, prenda por prenda, salvo cambio de escena previsto
[ ] Marcas fijas presentes (barba, lunar, arete)
[ ] Luz de la misma familia que el ancla
[ ] Manos con cinco dedos en cada plano donde aparecen`,
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Comparación lado a lado: la imagen ancla junto al último frame de cuatro clips distintos, señalando en uno de ellos dónde derivó la cara.",
          pie: "Ancla contra cada plano. El cuarto se regeneró.",
          captura: true,
        },
      ],
    },
  ],

  // ── VOZ Y LOCUCIÓN · paso a paso ──────────────────────────────
  "voz-y-presentadores-ia": [
    {
      titulo: "Paso a paso · elegir la voz con el guion real",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El error de casi todos: elegir la voz escuchando la muestra de la biblioteca. La muestra está leída para vender la voz. Lo que importa es cómo lee TU guion, con tus frases y tu ritmo.",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Preselecciona tres voces por criterio, no por gusto",
              detalle:
                "Idioma y acento que el público reconozca como propio (para Perú: español latino neutro o rioplatense suave; nunca castellano de España para consumo local). Edad aparente coherente con quien habla en la pieza. Energía media: las voces «entusiastas» cansan a los diez segundos.",
            },
            {
              titulo: "Genera el mismo párrafo del guion con las tres",
              detalle:
                "El párrafo más difícil: el que tiene una cifra, una pausa y una pregunta. Ahí es donde una voz se cae.",
            },
            {
              titulo: "Escúchalas sin mirar la pantalla",
              detalle:
                "Con los ojos cerrados o mirando otra cosa. Si una te hace pensar «es una IA» en la primera frase, descártala aunque suene bonita.",
            },
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Captura de la biblioteca de voces de ElevenLabs con tres voces marcadas como preseleccionadas y el filtro de idioma en español.",
          pie: "Tres candidatas, mismo guion. La decisión se toma con el oído, no con la etiqueta.",
          captura: true,
        },
      ],
    },
    {
      titulo: "Los ajustes que sí cambian la lectura",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Ajuste", "Qué hace", "Dónde lo dejo"],
          filas: [
            ["Estabilidad", "Bajo = más expresiva y menos predecible; alto = plana y segura", "45–55 para locución de anuncio; 65+ para voz institucional"],
            ["Similitud", "Cuánto se pega a la voz original del modelo", "75–85. Al máximo aparecen artefactos"],
            ["Exageración de estilo", "Amplifica el carácter de la voz", "0 casi siempre. Solo sube en piezas cómicas"],
            ["Velocidad", "Ritmo global", "Ligeramente por debajo de 1.0: la IA tiende a correr"],
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Captura del panel de ajustes de ElevenLabs con estabilidad, similitud y estilo en los valores recomendados para locución de anuncio.",
          pie: "El panel con los valores de partida. Después se afina por frase, no por pieza.",
          captura: true,
        },
        {
          tipo: "nota",
          texto:
            "Un solo cambio a la vez. Si mueves estabilidad y velocidad juntas y mejora, no sabes cuál lo hizo, y la próxima pieza vuelves a adivinar.",
        },
      ],
    },
    {
      titulo: "Marcar el guion para la voz",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La voz lee lo que está escrito, no lo que quisiste decir. Las pausas, los énfasis y las cifras se escriben en el guion, no se esperan.",
        },
        {
          tipo: "copiable",
          etiqueta: "Guion marcado — ejemplo de 15 segundos",
          contenido: `Tu planta consume más de lo que produce... y nadie lo ve.
(pausa)
Con una luminaria industrial de cuarenta vatios — cuarenta, no cuatrocientos — bajas el consumo a la mitad.
(pausa corta)
¿Cuánto te está costando no cambiarla?`,
        },
        {
          tipo: "lista",
          items: [
            "Cifras escritas en letras: «cuarenta», no «40». La IA lee «40» de tres formas distintas.",
            "Puntos suspensivos para pausa corta; «(pausa)» en línea aparte para pausa real. Se borra del texto antes de generar si el modelo la lee en voz alta.",
            "Guiones largos para el inciso: bajan el tono como lo haría un locutor.",
            "La pregunta final siempre en línea propia: sube la entonación sola.",
          ],
        },
      ],
    },
    {
      titulo: "La voz manda la duración",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Genera la locución antes de animar",
              detalle:
                "La duración real de cada frase define cuánto dura cada plano. Animar primero y meter la voz después obliga a acelerar la locución, y se nota.",
            },
            {
              titulo: "Corta la locución por frase y anota los segundos",
              detalle:
                "Cada frase es un plano o dos. Con los tiempos anotados, el guion visual se ajusta a la voz y no al revés.",
            },
            {
              titulo: "Deja aire al inicio y al final",
              detalle:
                "Medio segundo de silencio antes de la primera palabra y un segundo después de la última. Sin eso, la pieza arranca a mitad de respiración.",
            },
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Captura de la línea de tiempo en CapCut con la locución partida por frases y cada plano de video ajustado a la duración de su frase.",
          pie: "La voz arriba, los planos ajustados debajo. Así se sincroniza sin acelerar nada.",
          captura: true,
        },
      ],
    },
    {
      titulo: "Lo que delata una locución IA",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Respira en el lugar equivocado: a mitad de una idea. Se corrige partiendo la frase en el guion.",
            "Sube al final de cada oración como si preguntara. Baja la estabilidad o reescribe la frase para que termine en punto.",
            "Pronuncia una marca o un tecnicismo mal. Se escribe fonéticamente en el guion («Livoltek» → «Livoltec»), y se prueba.",
            "Todas las frases tienen la misma energía. Un anuncio real baja la voz en el problema y la sube en la solución: se generan por separado si hace falta.",
            "Sin ruido de fondo alguno. Una cama de ambiente muy baja en edición la hace sonar en un lugar y no en un vacío.",
          ],
        },
      ],
    },
  ],

  // ── PACK DE PROMPTS · paso a paso ─────────────────────────────
  "pack-prompts-cinematograficos": [
    {
      titulo: "Paso a paso · usar un prompt del pack en Higgsfield",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Elige el prompt por la luz, no por el tema",
              detalle:
                "Los 50 están organizados por atmósfera lumínica. Un prompt de «luz lateral dura industrial» sirve igual para una luminaria, una bota o una máquina. El tema lo pones tú; la luz es lo que compras.",
            },
            {
              titulo: "Reemplaza SOLO el bloque de sujeto",
              detalle:
                "Cada prompt tiene su sujeto entre corchetes. Se cambia eso y nada más en la primera corrida. Así ves qué hace el prompt con tu producto antes de tocarlo.",
            },
            {
              titulo: "Corre en Nano primero, en Banana Pro después",
              detalle:
                "Nano para ver si la composición funciona (segundos, barato). Banana Pro solo para la versión que va a entregarse.",
            },
            {
              titulo: "Ajusta un parámetro por corrida",
              detalle:
                "Si la luz quedó dura de más, baja un paso la dureza. Si el fondo compite, aumenta el desenfoque. Nunca dos cosas a la vez.",
            },
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Captura de Higgsfield con un prompt del pack pegado en el campo de texto, el bloque de sujeto resaltado como lo único editado, y el modelo Nano seleccionado.",
          pie: "El prompt entero, con solo el sujeto cambiado. Primera corrida en Nano.",
          captura: true,
        },
      ],
    },
    {
      titulo: "Adaptar un prompt sin romperlo",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Se cambia", "No se toca", "Por qué"],
          filas: [
            ["El sujeto y su material", "La descripción de la luz", "La luz es lo que hace que parezca de agencia. Cambiarla es empezar de cero"],
            ["El entorno, si el producto lo exige", "La lente y la profundidad de campo", "La cámara define la escala; un gran angular en un plano pensado a 85 mm deforma el producto"],
            ["La paleta, si la marca tiene color propio", "El acabado (grano, contraste)", "El acabado une todas las piezas de la campaña entre sí"],
            ["Nada más", "La última línea de cada prompt", "Es la instrucción de control que evita que el modelo invente texto y logos"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Si necesitas cambiar más de dos bloques, el prompt equivocado. Vuelve al pack y elige otro por atmósfera.",
        },
      ],
    },
    {
      titulo: "Tres piezas hechas con el pack",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Tres entregas reales, con el número del prompt que se usó y lo único que se cambió. Para que se vea que el mismo prompt sostiene productos distintos.",
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Pieza real de cliente (producto industrial) generada con el prompt del pack de luz lateral dura, con el número del prompt y el bloque de sujeto usado en un pie.",
          pie: "Prompt 07 · luz lateral dura · solo se cambió el sujeto.",
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Pieza real de cliente (producto de consumo) generada con un prompt del pack de luz difusa de catálogo, con el número del prompt y el cambio de paleta indicado.",
          pie: "Prompt 21 · luz difusa de catálogo · se cambió el sujeto y la paleta a la de la marca.",
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Pieza real de cliente (retrato o vocero) generada con un prompt del pack de contraluz cinematográfico, con el número del prompt indicado.",
          pie: "Prompt 38 · contraluz cinematográfico · se cambió el sujeto y el entorno.",
        },
      ],
    },
    {
      titulo: "Cuándo el pack no sirve",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Cuando la pieza necesita texto dentro de la imagen: ahí manda GPT-2 Image con un prompt propio, no estos.",
            "Cuando el cliente tiene una fotografía de marca muy definida: se parte de sus fotos reales, no de un look de catálogo.",
            "Cuando todavía no hay guion. Un prompt bonito sin idea detrás produce una imagen bonita que no vende nada.",
          ],
        },
        {
          tipo: "cita",
          texto: "El pack te ahorra la luz. La idea sigue siendo tuya.",
        },
      ],
    },
  ],
};
