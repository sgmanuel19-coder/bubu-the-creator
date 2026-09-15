import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// AMPLIACIONES DE GUÍAS CORTAS
//
// Varias guías de la bóveda tenían 3 secciones y ~3,000 caracteres:
// planteaban bien el concepto pero se quedaban en la tabla resumen,
// sin el paso a paso ni los ejemplos desarrollados. Estas secciones se
// SUMAN al final de la guía original (ver el bucle de secciones.ts):
// no reemplazan nada, así que la guía sigue leyéndose igual y ahora
// continúa con el detalle.
//
// Criterio de ampliación: cada una añade (1) el concepto explicado,
// (2) el mismo ejemplo desarrollado de principio a fin sobre un caso
// real —Wellmax, luminaria industrial; WIN, internet—, (3) el
// procedimiento paso a paso y (4) una comprobación de lectura.
// ═══════════════════════════════════════════════════════════════

export const AMPLIACIONES: Record<string, SeccionRecurso[]> = {
  // ── LOS 10 GANCHOS ────────────────────────────────────────────
  "los-10-ganchos": [
    {
      titulo: "Los diez, escritos para el mismo producto",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La tabla de arriba es el mapa. El problema es que los ejemplos genéricos («cómo facturé 30k») no enseñan a escribir el tuyo cuando tu cliente vende luminarias industriales. Así que acá están los diez tipos aplicados al mismo producto real: una luminaria LED de 40W para nave industrial, que es lo que produzco para Wellmax.",
        },
        {
          tipo: "parrafo",
          texto:
            "Fíjate en una cosa mientras los lees: ninguno menciona la luminaria en el primer segundo. Un gancho que empieza nombrando el producto es un anuncio, y el anuncio se saltea.",
        },
        {
          tipo: "tabla",
          columnas: ["Tipo", "Gancho textual (seg. 0-2)", "Gancho visual (primer frame)"],
          filas: [
            ["Dopamínico", "«Cambiar los focos de tu planta no te va a bajar la luz»", "Recibo de luz con el monto tapado por una mano"],
            ["Cuantitativo", "«Esta nave gastaba 4,200 soles de luz al mes»", "Plano general de la nave a oscuras"],
            ["Curiosidad", "«El error que hace que pagues doble en tu planta»", "Detalle de un foco antiguo parpadeando"],
            ["Promesa", "«La mitad del consumo en la misma nave, sin obra»", "Split: mismo espacio, dos iluminaciones"],
            ["Autoridad personal", "«Instalé esto en 14 plantas: esto pasó en todas»", "Vocero en planta, casco puesto"],
            ["Exclusividad", "«Esto lo estamos haciendo solo con 5 plantas este mes»", "Plano de la ficha técnica sobre una mesa de obra"],
            ["Dolor / urgencia", "«Cada mes que no lo cambias, pagas la diferencia»", "Contador de luz girando rápido"],
            ["Novedad", "«La luminaria que no se calienta ni con 12 horas»", "Macro del cuerpo de aluminio"],
            ["Comparación", "«Foco tradicional vs LED industrial, en la misma nave»", "Lado a lado, corte duro entre los dos"],
            ["Desafío", "«Dime los metros de tu planta y te digo cuánto ahorras»", "Cinta métrica sobre plano de nave"],
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Los diez primeros frames uno al lado del otro en una grilla, cada uno con su tipo de gancho rotulado.",
          pie: "Los diez ganchos visuales del mismo producto. Ninguno abre mostrando el producto.",
        },
      ],
    },
    {
      titulo: "Cómo se construye un gancho desde cero",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un gancho no se ocurre: se fabrica. Cuatro pasos, y el primero es el que casi nadie hace.",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "1. Escribe la creencia que tiene tu público",
              detalle:
                "No el beneficio de tu producto: lo que tu público cree hoy. En el caso de la luminaria: «cambiar de focos es un gasto que no se nota». Sin esta frase escrita no hay gancho dopamínico posible, porque no tienes contra qué chocar.",
            },
            {
              titulo: "2. Busca el dato que la contradice",
              detalle:
                "El número, el caso o la consecuencia que hace insostenible esa creencia. «La misma nave pasó de 4,200 a 1,900 soles al mes». El dato es el que sostiene el gancho; sin dato, el gancho es una opinión y se olvida.",
            },
            {
              titulo: "3. Recórtalo hasta que quepa en dos segundos",
              detalle:
                "Nueve palabras o menos. «Cambiar los focos de tu planta no te va a bajar la luz» son doce y ya está en el límite. Si no cabe en un aliento, no cabe en un reel.",
            },
            {
              titulo: "4. Decide qué se VE mientras se dice",
              detalle:
                "El frame es la mitad del gancho. Pregúntate: si alguien ve esto sin sonido, ¿se detiene? Si la respuesta es no, tienes medio gancho aunque el texto sea brillante.",
            },
          ],
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt · fabrica el gancho desde la creencia",
          contenido: `Mi cliente vende [producto] a [tipo de cliente].

1. Escríbeme las 5 creencias que tiene ese público hoy sobre este
   tipo de producto — las que hacen que NO compre. Frases textuales,
   como las diría él.
2. Para cada creencia, dime qué dato, caso o consecuencia la
   contradice. Si no tengo el dato, dime qué dato tendría que
   conseguir.
3. Convierte las 3 más fuertes en gancho de máximo 9 palabras.
4. Para cada gancho, describe el primer frame: qué se ve, en qué
   plano, con qué luz. Tiene que intrigar en silencio.

No uses adjetivos de folleto (innovador, líder, revolucionario).`,
        },
      ],
    },
    {
      titulo: "El banco de ganchos",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Escribir ganchos en el momento en que necesitas publicar es la peor condición posible: con prisa sale el promedio. Lo que funciona es tener un banco, y alimentarlo cuando no estás produciendo.",
        },
        {
          tipo: "lista",
          items: [
            "Una hoja por cliente, con tres columnas: gancho textual, tipo, y si ya se usó y cómo rindió.",
            "Cada vez que un cliente te dice una frase suya en una llamada, va al banco tal cual. Las mejores no las escribes tú: las dice él.",
            "Cuando un gancho funciona, no lo jubiles: cámbiale el visual y vuelve a usarlo en tres meses. La audiencia nueva no lo vio.",
            "Marca los que fallaron y por qué. Un banco sin fracasos anotados te hace repetirlos.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "Regla de honestidad: el gancho promete y el video paga. Un gancho que el contenido no cumple te consigue una vista y te cuesta un seguidor.",
        },
        {
          tipo: "pregunta",
          enunciado:
            "Quieres escribir un gancho dopamínico. Según el método, ¿qué necesitas tener escrito ANTES?",
          opciones: [
            "El beneficio principal del producto",
            "La creencia que tiene hoy tu público y el dato que la contradice",
            "El guion completo del video",
          ],
          correcta: 1,
          explicacion:
            "El gancho dopamínico funciona por choque: sin la creencia escrita no tienes contra qué chocar, y sin el dato el choque es una opinión que se olvida.",
        },
      ],
    },
  ],

  // ── ESTRUCTURAS QUE RETIENEN ──────────────────────────────────
  "estructuras-que-retienen": [
    {
      titulo: "La misma idea en cuatro estructuras",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Las fórmulas se entienden cuando ves la misma idea montada de cuatro maneras distintas. La idea: «la mayoría de las plantas industriales paga de más por su iluminación». Producto: la luminaria de 40W. Mismo contenido, cuatro arquitecturas, cuatro objetivos.",
        },
        {
          tipo: "copiable",
          etiqueta: "GVCTA · educativo (para atraer)",
          contenido: `GANCHO (0-3s)
"Cambiar los focos de tu planta no te va a bajar la luz."

VALOR (3-35s)
"Te la va a bajar la POTENCIA, no el foco. La mayoría cambia
focos de 400W por otros de 400W más modernos y el consumo queda
igual. La cuenta baja cuando bajas vatios manteniendo lux: 40W
bien distribuidos iluminan lo mismo que 400W mal puestos.
Tres cosas deciden eso: la altura de montaje, el ángulo de
apertura y cuántos puntos pones."

CTA (35-40s)
"Si quieres saber cuántos vatios te sobran, escríbeme los metros
de tu nave."`,
        },
        {
          tipo: "copiable",
          etiqueta: "GHMA · historia (para autoridad)",
          contenido: `GANCHO
"Esta planta gastaba 4,200 soles de luz al mes y creía que era normal."

HISTORIA
"Cuando entré, tenían 60 focos de 400W colgados a 9 metros.
El gerente ya había cambiado los focos dos veces: mismo consumo.
Nadie le había dicho que el problema no eran los focos, era la
altura y el ángulo. Rehicimos la distribución con 40W."

MORALEJA
"El ahorro no está en el producto que compras. Está en el cálculo
que nadie te hizo."

ACCIÓN
"Si estás por cambiar focos, pide el cálculo primero."`,
        },
        {
          tipo: "copiable",
          etiqueta: "DEI · demo (para el wow)",
          contenido: `DEMO (0-8s)
Split screen: la misma nave, misma cámara, antes y después.
Sin voz. Solo el cambio.

EXPLICACIÓN (8-30s)
"Lo que cambió no fue la cantidad de luz: fue de dónde viene.
Mismo espacio, 60 puntos de 400W a 40 puntos de 40W. El lux
sobre la mesa de trabajo quedó igual y la cuenta bajó a menos
de la mitad."

INVITACIÓN (30-35s)
"¿Quieres ver cómo se vería la tuya? Mándame una foto de tu nave."`,
        },
        {
          tipo: "copiable",
          etiqueta: "PSPCTA · venta directa (para convertir)",
          contenido: `PROBLEMA
"Si tu planta tiene focos de más de 200W colgados a más de 6
metros, estás pagando el doble de lo que deberías."

SOLUCIÓN
"Se resuelve con un cálculo de distribución y luminarias de menor
potencia. Sin obra, sin parar producción: se cambia por sectores."

PRUEBA
"En esta nave de 900 m² pasó de 4,200 a 1,900 soles al mes. Acá
está la factura antes y después."

CTA
"Escríbeme los metros de tu planta y te digo cuánto ahorrarías."`,
        },
        {
          tipo: "nota",
          texto:
            "Ninguno de los cuatro es «el mejor». Se eligen por objetivo: GVCTA y DEI para desconocidos, GHMA para construir respeto, PSPCTA cuando ya te conocen y toca pedir la acción.",
        },
      ],
    },
    {
      titulo: "Loops abiertos: la técnica concreta de retención",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "«Retención activa» suena abstracto hasta que lo bajas a una técnica: abrir una pregunta y no responderla todavía. El cerebro no tolera bien un vacío de información, y se queda a cerrarlo.",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Abre el loop en el gancho",
              detalle:
                "«Tres cosas deciden tu consumo, y la tercera es la que nadie mira». Ya prometiste un orden y una revelación final: hay razón para quedarse.",
            },
            {
              titulo: "Paga los primeros rápido",
              detalle:
                "Uno y dos se explican en diez segundos cada uno. Si tardas mucho en pagar el primero, el espectador deja de confiar en que vas a pagar el tercero.",
            },
            {
              titulo: "Guarda el mejor para el final",
              detalle:
                "El tercero es el que justifica todo el video. Si tu mejor dato está en el segundo 5, el resto del video es descenso.",
            },
            {
              titulo: "Cierra el loop antes del CTA",
              detalle:
                "Nunca dejes el loop sin cerrar para «forzar» que escriban. Eso no genera un DM, genera una persona molesta que no vuelve.",
            },
          ],
        },
        {
          tipo: "tabla",
          columnas: ["Segundo", "Qué pasa ahí", "Qué tiene que haber"],
          filas: [
            ["0-3", "Se decide si el video existe", "Gancho visual y textual a la vez"],
            ["3-5", "La primera caída fuerte de audiencia", "Una promesa concreta de lo que viene, o el loop abierto"],
            ["8-12", "Segunda caída: si no pagaste nada aún, se van", "El primer valor entregado, completo y útil"],
            ["15-25", "Zona de deriva: el video se siente largo", "Un cambio de plano, de ritmo o de tono. Algo tiene que romperse"],
            ["Últimos 5", "Decide si te siguen o te olvidan", "La recompensa del loop y UN solo CTA"],
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Captura de la curva de retención de un reel real en Instagram, con los segundos 3, 8 y 15 señalados y qué había en cada uno.",
          pie: "La curva real de un reel: se ve exactamente dónde se cae.",
          captura: true,
        },
      ],
    },
    {
      titulo: "Diagnóstico: por qué se cayó tu retención",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Dónde se cae", "Causa casi siempre", "Arreglo"],
          filas: [
            ["Antes del segundo 3", "El gancho visual no existe: abre con el logo, con un plano genérico o contigo saludando", "Cambia el primer frame, no el texto"],
            ["Segundo 5-8", "Prometiste y empezaste a dar contexto en vez de valor", "Borra la introducción. Entra directo al primer punto"],
            ["A mitad", "Dos o tres conceptos peleando en una pieza", "Pártelo en dos videos. Un concepto por pieza"],
            ["Justo antes del final", "El cierre se desvanece: se acabó el material y ya", "Guarda el mejor dato para el final y remata con una frase"],
          ],
        },
        {
          tipo: "pregunta",
          enunciado:
            "Tu reel pierde la mitad de la audiencia en el segundo 6. ¿Qué es lo primero que revisas?",
          opciones: [
            "El gancho: probablemente el primer frame no detiene",
            "Si entre el 3 y el 6 estás dando contexto en vez de entregar el primer valor",
            "La duración total del video",
          ],
          correcta: 1,
          explicacion:
            "Si se fueron en el 6 y no en el 3, el gancho funcionó: los detuvo. Lo que falló es lo que vino después — casi siempre una introducción que retrasa el primer valor.",
        },
      ],
    },
  ],

  // ── EDICIÓN CON RITMO ─────────────────────────────────────────
  "edicion-con-ritmo": [
    {
      titulo: "Los cortes, con números",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "«Corta rápido» no es una instrucción: es una sensación. Estos son los números con los que trabajo, y por qué. No son ley, son punto de partida para que dejes de adivinar.",
        },
        {
          tipo: "tabla",
          columnas: ["Tipo de plano", "Duración", "Por qué"],
          filas: [
            ["Gancho de apertura", "1-2 s", "Tiene que entrar y salir antes de que el pulgar decida"],
            ["Plano hablado (vocero)", "3-5 s antes de variar encuadre", "Más de 5 s del mismo encuadre y el ojo se apaga aunque el audio siga"],
            ["Plano de apoyo (b-roll)", "1-2 s", "Ilustra una palabra, no cuenta una escena"],
            ["Plano de producto en detalle", "2-3 s", "Necesita tiempo para leerse, pero no para contemplarse"],
            ["Plano de resultado / antes-después", "3-4 s", "Es el argumento: se le da aire"],
            ["Cierre con claim", "2-3 s", "Suficiente para leer el texto en voz baja"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "El corte cae en el acento de la locución o en el golpe de la música, nunca en medio de una palabra. Si no sabes dónde está el acento, sube el waveform de la voz y córtalo donde el pico baja.",
        },
      ],
    },
    {
      titulo: "Subtítulos que se leen sin sonido",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La mayoría ve sin audio. Eso convierte al subtítulo en el canal principal, no en un accesorio de accesibilidad. Y un subtítulo automático sin tocar se nota igual que una imagen IA sin corregir.",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Dos a cuatro palabras por pantalla, no la frase completa",
              detalle:
                "El bloque corto se lee de un golpe sin desviar la vista de la imagen. La frase de doce palabras obliga a leer y se pierde el plano.",
            },
            {
              titulo: "Resalta una palabra por bloque, no cuatro",
              detalle:
                "El color existe para jerarquizar. Si todo está resaltado, nada está resaltado, y encima se ve barato.",
            },
            {
              titulo: "Corrige nombres y cifras a mano, siempre",
              detalle:
                "El automático escribe «Livoltec» como «libro tek» y «40 vatios» como «cuarenta batidos». Un nombre de marca mal escrito en el subtítulo es el error que el cliente sí ve.",
            },
            {
              titulo: "Súbelos de la zona de interfaz",
              detalle:
                "En vertical, el tercio inferior lo tapan el usuario, la descripción y los botones. Los subtítulos van al centro-bajo, no al pie.",
            },
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Comparación de dos frames del mismo video: uno con subtítulo automático de frase larga al pie, otro con bloques de tres palabras al centro-bajo y una palabra resaltada.",
          pie: "Izquierda: automático sin tocar. Derecha: dos minutos de trabajo.",
        },
      ],
    },
    {
      titulo: "El audio, que es la mitad de la pieza",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una pieza con imagen impecable y audio saturado se siente amateur; una con imagen regular y audio limpio pasa por profesional. Es la inversión de esfuerzo más rentable de toda la edición.",
        },
        {
          tipo: "lista",
          items: [
            "La voz manda: la música se sienta entre 15 y 20 dB por debajo. Si dudas si la música molesta, molesta.",
            "Baja la música bajo la voz (ducking) y súbela en los silencios. Ese sube-y-baja es lo que da sensación de montaje profesional.",
            "El ambiente muy bajo por debajo de todo hace que la escena exista en un lugar. Sin ambiente, la voz flota.",
            "Nunca corte seco de música al final: media segundo de caída o un golpe que cierre.",
            "Escúchalo una vez con audífonos y otra en el parlante del celular. Casi todo el mundo lo va a oír en el segundo.",
          ],
        },
      ],
    },
    {
      titulo: "La misma pieza en tres plataformas",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Plataforma", "Ritmo", "Qué cambia de la versión base"],
          filas: [
            ["TikTok / Reels", "Agresivo: cortes de 1-2 s", "Gancho en el segundo 0, subtítulos grandes, sin intro"],
            ["YouTube (horizontal)", "Con respiración: planos de 3-6 s", "Se puede dar contexto 10 s; el remate va más elaborado"],
            ["LinkedIn", "Medio, sin música o muy baja", "Arranca con el dato, no con el efecto. Subtítulos obligatorios y tono sobrio"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "No exportes la misma pieza para las tres y listo. La base es la misma, pero el reencuadre, el gancho y la longitud se ajustan por plataforma: ahí está la diferencia entre repostear y publicar.",
        },
        {
          tipo: "pregunta",
          enunciado: "¿Cuál de estos delata más rápido una edición amateur?",
          opciones: [
            "Usar solo dos tipografías",
            "Música al mismo volumen que la voz",
            "Cortes cada 2 segundos",
          ],
          correcta: 1,
          explicacion:
            "El oído perdona menos que el ojo. Una música que compite con la voz hace que la pieza se sienta barata incluso cuando la imagen está impecable.",
        },
      ],
    },
  ],

  // ── CHECKLIST «PARECE AGENCIA» ────────────────────────────────
  "checklist-parece-agencia": [
    {
      titulo: "Cómo se revisa cada punto (el procedimiento)",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La lista de arriba dice QUÉ revisar. Esto dice CÓMO, porque «revisar el color» no significa nada si no sabes qué estás mirando. Son cuatro pases sobre la misma pieza, cada uno con un solo objetivo. Separarlos es lo que hace que encuentres cosas: revisar todo a la vez es no revisar nada.",
        },
        {
          tipo: "pasos",
          items: [
            {
              titulo: "Pase 1 · En silencio, a velocidad normal",
              detalle:
                "Quita el audio por completo. ¿Se entiende de qué va? ¿El primer plano detiene? ¿Los textos alcanzan a leerse? Este pase solo juzga si la pieza funciona muda, que es como la va a ver la mayoría.",
            },
            {
              titulo: "Pase 2 · Solo audio, sin mirar la pantalla",
              detalle:
                "Da la vuelta al monitor y escucha. ¿La voz se entiende sin esfuerzo? ¿La música tapa alguna palabra? ¿Hay un salto de nivel entre clips? Lo que te moleste acá, al cliente le va a molestar más.",
            },
            {
              titulo: "Pase 3 · Cuadro por cuadro en los puntos de riesgo",
              detalle:
                "Pausa en cada plano donde haya manos, caras, texto o logo. Zoom al 100%. Cuenta dedos, lee el letrero, compara el logo con el original. Es el pase lento y es el que salva entregas.",
            },
            {
              titulo: "Pase 4 · En el celular, como lo va a ver el cliente",
              detalle:
                "Manda la pieza a tu propio WhatsApp y míralo ahí. La compresión, el brillo del teléfono y la interfaz cambian cosas que en el monitor se veían bien.",
            },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Los cuatro pases toman entre seis y diez minutos en una pieza de 30 segundos. Es la diferencia de precio entre un proveedor y otro.",
        },
      ],
    },
    {
      titulo: "Qué mirar exactamente en los puntos que más fallan",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Punto", "Qué mirar concretamente", "Cómo se arregla"],
          filas: [
            [
              "Continuidad de personaje",
              "Pon el primer frame de cada plano en una fila. ¿Misma edad, mismo pelo, misma prenda?",
              "Se regenera el plano que se salió, no se disimula con un corte rápido",
            ],
            [
              "Continuidad de producto",
              "Compara el color y la etiqueta contra la foto original del cliente, no contra el plano anterior",
              "Corrección de color por plano, o pegar el logo real encima",
            ],
            [
              "Color entre planos",
              "Mira las zonas de sombra: si una es azulada y otra verdosa, vienen de generaciones distintas",
              "Igualar en el montaje con una capa de ajuste, no plano por plano",
            ],
            [
              "Zona segura",
              "Superpón la interfaz de la plataforma sobre tu export y mira qué tapa",
              "Sube los textos al centro-bajo y deja el tercio inferior libre",
            ],
            [
              "Cierre",
              "¿La pieza termina o se acaba? Si el último plano no remata, se acabó el material",
              "Un plano de cierre con claim, o cortar antes y terminar en el mejor momento",
            ],
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Fila con el primer frame de cada plano de una pieza real, puesta para comparar continuidad de personaje y color, con un plano señalado como fuera de rango.",
          pie: "El control de continuidad: todos los primeros frames en una fila.",
          captura: true,
        },
      ],
    },
    {
      titulo: "Cuando encuentras un fallo y no hay tiempo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Pasa: entrega en dos horas y el pase 3 encuentra una mano rota en el plano 4. No todos los fallos cuestan lo mismo, y conviene tener decidido de antemano cuáles se corrigen y cuáles se cortan.",
        },
        {
          tipo: "tabla",
          columnas: ["Gravedad", "Qué es", "Qué hacer con el reloj en contra"],
          filas: [
            [
              "No se entrega así",
              "Logo deformado, texto ilegible, cara distinta del vocero, dato incorrecto",
              "Se corrige o se saca el plano. Esto lo ve el cliente y lo comenta",
            ],
            [
              "Se corta, no se corrige",
              "Mano fallada, objeto raro al fondo, un plano que no iguala en color",
              "Sacar el plano suele costar menos que regenerarlo, y casi nunca se nota que falta",
            ],
            [
              "Se anota para la próxima",
              "Un silencio que falta, una tipografía que no es exacta, un corte un frame tarde",
              "Se entrega y se apunta. Perseguir esto con el reloj en contra rompe cosas peores",
            ],
          ],
        },
        {
          tipo: "cita",
          texto:
            "Entregar tarde se perdona una vez. Entregar con el logo deformado se recuerda siempre.",
        },
        {
          tipo: "pregunta",
          enunciado:
            "De los cuatro pases de revisión, ¿cuál juzga si la pieza funciona para la mayoría de la gente que la va a ver?",
          opciones: [
            "El pase cuadro por cuadro, al 100% de zoom",
            "El pase en silencio",
            "El pase solo de audio",
          ],
          correcta: 1,
          explicacion:
            "La mayoría del scroll ocurre sin sonido. Si la pieza no se entiende muda, no se entiende — y ese es el único pase que lo comprueba.",
        },
      ],
    },
  ],
};
