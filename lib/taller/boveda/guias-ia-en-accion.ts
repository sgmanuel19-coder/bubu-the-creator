import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// IA EN ACCIÓN — LOS ARTÍCULOS ESCRITOS
//
// El curso IA en Acción se entrega en tres formatos: artículo escrito,
// video con cámara y video de solo pantalla. Este archivo contiene los
// ARTÍCULOS. Lo que se graba no vive acá.
//
// Los bloques `imagen` y `video` van con `src` / `youtubeId` VACÍOS a
// propósito: la página pinta un recuadro amarillo describiendo qué
// imagen falta y dónde va. El artículo se publica completo de texto y
// las imágenes se rellenan después sin tocar la redacción.
//
// Para rellenar una: sube el archivo a /public/images/ia-en-accion/ y
// pon su ruta en `src`. Ejemplo:
//   src: "/images/ia-en-accion/personaje-hoja.jpg"
//
// Regla de escritura de estos artículos: en cada decisión se dice POR
// QUÉ se eligió eso — qué modelo, qué falló y qué se corrigió. Eso es
// lo que no se copia.
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_IA_EN_ACCION: Record<string, SeccionRecurso[]> = {
  // ── 1. CONCEPTOS BÁSICOS (abierto) ────────────────────────────
  "conceptos-basicos-ia": [
    {
      titulo: "Por qué el mismo prompt te da dos resultados distintos",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Escribes un prompt, te sale algo decente, lo vuelves a correr para sacar una variante y ahora sale otra cosa. No es un error de la herramienta ni mala suerte: el modelo no guarda lo que hizo la vez anterior. Cada generación arranca de cero desde un punto aleatorio y va armando la imagen hasta que se parece a lo que le describiste.",
        },
        {
          tipo: "parrafo",
          texto:
            "Eso cambia cómo tienes que trabajar. Si el resultado depende del azar, tu trabajo no es escribir el prompt perfecto una vez: es reducir el margen de azar hasta que el resultado sea repetible. Todo lo que viene después en este curso es eso.",
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Grilla de 4 imágenes generadas con exactamente el mismo prompt, mostrando cuánto varían entre sí (misma escena, distinta cara, distinta luz).",
          pie: "El mismo prompt, cuatro corridas. Ninguna es igual a la otra.",
        },
      ],
    },
    {
      titulo: "Lo que el modelo realmente lee",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El modelo no entiende tu intención, entiende tu descripción. «Una foto profesional de un producto» no dice nada: no hay lente, no hay luz, no hay fondo, no hay ángulo. El modelo rellena esos huecos con el promedio de todo lo que vio en internet, y el promedio de internet es una foto de stock mediocre.",
        },
        {
          tipo: "parrafo",
          texto:
            "Escribir para IA es escribir como director de fotografía dictándole a alguien que no estuvo en la reunión. Si un dato no está en el prompt, no existe.",
        },
        {
          tipo: "tabla",
          columnas: ["Lo que escribe la mayoría", "Lo que lee el modelo", "Lo que hay que escribir"],
          filas: [
            [
              "Foto profesional del producto",
              "Promedio de stock: fondo blanco, luz plana",
              "Producto sobre superficie de concreto, luz lateral dura desde la izquierda, fondo gris degradado, lente 85mm",
            ],
            [
              "Un hombre sonriendo",
              "Cualquier hombre, cualquier edad",
              "Hombre de 45 años, piel trigueña, barba corta cana, camisa de trabajo azul, sonrisa contenida",
            ],
            [
              "Estilo cinematográfico",
              "Un filtro oscuro",
              "Contraste alto, sombras azuladas, luz de contra recortando el hombro, grano fino de película",
            ],
          ],
        },
      ],
    },
    {
      titulo: "Las cuatro palancas que sí mueven el resultado",
      bloques: [
        {
          tipo: "pasos",
          items: [
            {
              titulo: "La descripción",
              detalle:
                "Qué hay en la imagen: sujeto, acción, vestuario, entorno. Es lo único que la mayoría escribe, y es lo que menos diferencia porque todos lo escriben parecido.",
            },
            {
              titulo: "La cámara",
              detalle:
                "Lente, ángulo, distancia, profundidad de campo. Acá se decide si parece foto de agencia o foto de celular. Un 85mm con fondo desenfocado y un gran angular a ras de piso cuentan historias distintas del mismo producto.",
            },
            {
              titulo: "La luz",
              detalle:
                "De dónde viene, qué tan dura es, qué color tiene. Es la palanca más subestimada y la que más rápido sube el nivel de una pieza. Luz lateral dura = drama industrial. Luz difusa frontal = catálogo limpio.",
            },
            {
              titulo: "La referencia",
              detalle:
                "Una imagen que ancla el resultado. Cuando la plataforma la acepta, vale más que doscientas palabras de prompt. Es la palanca que convierte un resultado bonito en un resultado repetible.",
            },
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Comparación lado a lado del mismo sujeto: a la izquierda generado solo con descripción, a la derecha el mismo prompt con cámara y luz especificadas.",
          pie: "Izquierda: solo descripción. Derecha: mismo sujeto con cámara y luz dictadas.",
        },
      ],
    },
    {
      titulo: "Un prompt escrito con las cuatro palancas",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Este es el esqueleto que uso para arrancar cualquier imagen. No es mágico: es completo. Cambias lo que va entre corchetes y ya tienes las cuatro palancas cubiertas.",
        },
        {
          tipo: "copiable",
          etiqueta: "Esqueleto de prompt — imagen",
          contenido: `[SUJETO: quién o qué, con edad, material, color y estado]
[ACCIÓN: qué está haciendo exactamente en este instante]
[ENTORNO: dónde, con qué al fondo, a qué hora del día]
[CÁMARA: lente en mm, ángulo, distancia, profundidad de campo]
[LUZ: dirección, dureza, temperatura de color, qué recorta]
[ACABADO: contraste, paleta, grano, referencia de estilo]`,
        },
        {
          tipo: "nota",
          texto:
            "No lo llenes todo siempre. Si la pieza es un plano de producto sobre fondo neutro, el entorno sobra. Un prompt con relleno confunde igual que uno vacío.",
        },
      ],
    },
    {
      titulo: "El error que cuesta más caro",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Corregir tarde. Generar el video primero y después darse cuenta de que el personaje no era el correcto, que el producto tenía el logo mal o que la luz no pegaba con el resto de la campaña. Un video generado que sale mal se tira entero; una imagen que sale mal se corrige en segundos.",
        },
        {
          tipo: "cita",
          texto:
            "La imagen primero, siempre. Aprueba el frame y recién ahí anímalo.",
        },
      ],
    },
  ],

  // ── 2. EL STACK COMPLETO (abierto) ────────────────────────────
  "el-stack-completo": [
    {
      titulo: "El stack, en una tabla",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Estas son las herramientas con las que produzco piezas que se le cobran a un cliente. No es la lista de todo lo que existe: es la lista de lo que uso y para qué. Si una herramienta no está acá es porque no entró al flujo o porque se cayó del flujo.",
        },
        {
          tipo: "tabla",
          columnas: ["Herramienta", "Para qué la uso", "Cuándo NO"],
          filas: [
            [
              "Higgsfield",
              "Toda la imagen del sistema: producto, personaje, escenarios. Tres modelos adentro.",
              "Cuando la pieza es solo video a partir de una foto que ya tengo",
            ],
            [
              "Kling 3.0",
              "Video donde la física tiene que ser creíble: caminatas, telas, agua, cámara en movimiento",
              "Cuando la pieza necesita voz sincronizada",
            ],
            [
              "Seedance 2.5",
              "Video con audio nativo, corrección por región y hasta 50 referencias. El que se entrega.",
              "Exploración rápida — es lento, gastas tiempo",
            ],
            [
              "Seedance 2.0",
              "Construcción plano x plano con control fino de cada toma",
              "Cuando solo necesitas una toma suelta",
            ],
            ["ElevenLabs", "Locución en español neutro y latino, y clonado de voz", "Cuando el cliente pone su propio locutor"],
            ["HeyGen", "Vocero a cámara: presentadores y avatares que hablan", "Piezas sin persona hablando"],
            ["CapCut Pro", "Ensamblado, ritmo, subtítulos y acabado final", "Nunca: todo pasa por acá al final"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Runway no está en el stack. Lo probé y no se quedó: para lo que yo produzco, Kling y Seedance dan mejor resultado por el mismo tiempo de trabajo.",
        },
      ],
    },
    {
      titulo: "Imagen: los tres modelos de Higgsfield",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Higgsfield no es un modelo, son varios adentro de una misma plataforma. Elegir mal el modelo es la razón número uno por la que alguien dice «la IA no me da la calidad que quiero».",
        },
        {
          tipo: "tabla",
          columnas: ["Modelo", "Su cancha", "Ejemplo de mi trabajo"],
          filas: [
            ["Nano", "Volumen y velocidad: explorar 20 variantes de una idea en minutos", "Bocetar los 6 planos de una grilla antes de decidir cuál se produce"],
            ["Banana Pro", "Detalle y realismo cuando la pieza va a verse grande", "Foto de producto de la luminaria de Wellmax, donde se tiene que ver el material"],
            ["GPT-2 Image", "Cuando hay texto, logo o una instrucción fina que respetar", "Piezas con claim escrito dentro de la imagen"],
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Captura del selector de modelo en Higgsfield, con Nano, Banana Pro y GPT-2 Image visibles.",
          pie: "Dónde se cambia el modelo. Es el primer clic, no el último.",
          captura: true,
        },
        {
          tipo: "parrafo",
          texto:
            "La prueba que más enseña: corre el mismo prompt en dos modelos y compara. En diez minutos aprendes más sobre cuál te sirve que leyendo la documentación completa.",
        },
      ],
    },
    {
      titulo: "Video: cuándo Kling y cuándo Seedance",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "La decisión es simple y casi siempre la misma. ¿La pieza necesita voz o audio pegado a la imagen? Seedance. ¿La pieza vive del movimiento y de que la física se vea real? Kling.",
        },
        {
          tipo: "lista",
          items: [
            "Kling 3.0 — una persona caminando por una planta industrial, una tela moviéndose, líquido cayendo. El movimiento se sostiene sin deformarse.",
            "Seedance 2.5 — un vocero hablando, una pieza con locución, o cualquier caso donde necesites corregir un detalle sin regenerar el clip entero.",
            "Seedance 2.0 — construcción plano x plano cuando la campaña pide control toma por toma y no me sirve que el modelo decida los cortes.",
          ],
        },
        {
          tipo: "video",
          youtubeId: "",
          titulo: "Comparación: la misma escena generada en Kling 3.0 y en Seedance 2.5, lado a lado.",
          pie: "La diferencia se ve en el movimiento, no en el frame congelado.",
        },
      ],
    },
    {
      titulo: "El orden del flujo",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Idea y guion", detalle: "Antes de tocar ninguna herramienta. Qué se dice, a quién y por qué." },
            { titulo: "2. Imagen", detalle: "Genera y aprueba los frames en Higgsfield. Acá se corrige barato." },
            { titulo: "3. Movimiento", detalle: "Recién ahora Kling o Seedance, partiendo de las imágenes aprobadas." },
            { titulo: "4. Voz", detalle: "ElevenLabs o HeyGen, ya sabiendo la duración real de cada toma." },
            { titulo: "5. Ensamble", detalle: "CapCut: ritmo, subtítulos, acabado. Acá la pieza se vuelve cobrable." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Saltarse el paso 1 es lo más caro que puedes hacer. Toda pieza que generé sin guion terminó en la papelera, incluso las que se veían bien.",
        },
      ],
    },
  ],

  // ── 3. CLON Y UGC (candado) ───────────────────────────────────
  "clon-y-ugc": [
    {
      titulo: "Qué es y para qué sirve de verdad",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un vocero generado sirve para dos cosas concretas: para que una marca tenga a alguien hablando sin pagar casting, locación y jornada; y para probar diez versiones de un mensaje antes de decidir cuál se produce en serio. No sirve para engañar a nadie, y si lo usas para eso se nota.",
        },
        {
          tipo: "parrafo",
          texto:
            "En mis entregas lo uso sobre todo para el segundo caso: probar el mensaje. Un cliente aprueba mucho más rápido cuando ve el anuncio hablado que cuando lee el guion.",
        },
      ],
    },
    {
      titulo: "Clon propio o personaje inventado",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["", "Clon tuyo", "Personaje inventado"],
          filas: [
            ["Confianza", "Alta: es tu cara, la gente te reconoce", "Baja al inicio, hay que construirla"],
            ["Riesgo", "Tu cara queda asociada a lo que diga", "Ninguno personal"],
            ["Consistencia", "Fácil: siempre eres tú", "Difícil: se resuelve con hoja de personaje"],
            ["Cuándo", "Marca personal, autoridad, venta directa", "Marca de producto, UGC, testimonios genéricos"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Si el personaje va a decir algo sobre un producto que no probó, es un actor, no un testimonio. Trátalo como actor y no lo presentes como cliente real.",
        },
      ],
    },
    {
      titulo: "La base: grabarte una vez, bien",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El clon sale de una grabación base. Todo lo que salga mal ahí se multiplica después, así que esta parte se hace una sola vez y se hace bien.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "Fondo plano y separado", detalle: "Pared lisa, y tú a metro y medio de ella. Pegado a la pared la sombra te recorta mal." },
            { titulo: "Luz frontal difusa", detalle: "Ventana de lado o un aro grande. Nada de luz dura desde arriba: marca ojeras que después el modelo exagera." },
            { titulo: "Mirada fija a la cámara", detalle: "Si desvías la mirada, el clon aprende a desviarla y se ve raro en todos los videos." },
            { titulo: "Dos minutos hablando normal", detalle: "No leas. Cuenta algo. El modelo necesita tus gestos naturales, no tu voz de locutor." },
            { titulo: "Torso completo", detalle: "Encuadre de pecho para arriba, con las manos entrando de vez en cuando." },
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Esquema o foto del setup de grabación base: posición de la persona, distancia a la pared, ubicación de la luz y de la cámara.",
          pie: "El setup completo. No necesitas estudio, necesitas distancia y luz pareja.",
        },
      ],
    },
    {
      titulo: "El guion de 20 segundos",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un vocero generado se cae cuando habla mucho. A partir de cierto largo, los micro-errores se acumulan y el ojo los detecta. Veinte segundos es el punto donde todavía se sostiene y alcanza para decir algo.",
        },
        {
          tipo: "copiable",
          etiqueta: "Estructura de guion — vocero 20s",
          contenido: `0-3s   Frase que interrumpe. Una sola idea, sin saludo.
3-8s   El problema, dicho como lo diría el cliente.
8-15s  Qué cambia y por qué. Concreto, con un dato o un ejemplo.
15-20s Qué hacer ahora. Un solo paso, no tres.`,
        },
        {
          tipo: "nota",
          texto:
            "Nada de «hola, bienvenidos a este video». Los primeros tres segundos son el único momento en que decides si alguien se queda.",
        },
      ],
    },
    {
      titulo: "Los tells que lo delatan",
      bloques: [
        {
          tipo: "lista",
          items: [
            "La boca cierra tarde al final de la frase — se corrige acortando la frase, no editando.",
            "Los ojos no parpadean o parpadean a destiempo — regenera, no lo tapes con un corte.",
            "Las manos entran y salen del cuadro deformadas — vuelve a encuadrar más cerrado.",
            "El tono sube al final de cada oración como si leyera — es la voz, no el video: baja la energía en ElevenLabs.",
            "El cuello y la cara tienen distinta tonalidad de piel — suele pasar cuando la luz base era dura.",
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Capturas señaladas con círculos rojos sobre un frame de vocero generado, marcando boca desincronizada, manos deformadas y borde de cuello.",
          pie: "Los tres errores que más devuelven una pieza.",
          captura: true,
        },
      ],
    },
    {
      titulo: "Qué se entrega",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un vocero generado no se entrega crudo. Pasa por CapCut: se le ajusta el ritmo, se le ponen subtítulos quemados (la mayoría lo ve sin sonido) y se le corta cualquier micro-glitch. Entre el clip que sale del modelo y el que se manda al cliente hay entre veinte minutos y una hora de edición.",
        },
      ],
    },
  ],

  // ── 4. FOTO DE PRODUCTO (candado) ─────────────────────────────
  "foto-de-producto-ia": [
    {
      titulo: "La regla que no se negocia",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El producto de la foto tiene que ser EL producto. No uno parecido, no una interpretación. Si el cliente vende una luminaria de 40W con un cuerpo de aluminio específico, la imagen no puede tener otra luminaria bonita: tiene que tener la suya, con su forma, su material y su logo.",
        },
        {
          tipo: "parrafo",
          texto:
            "Por eso la foto de producto con IA casi nunca se genera desde cero. Se genera a partir de una foto real del producto, y lo que la IA construye es todo lo demás: el entorno, la luz y el acabado.",
        },
        {
          tipo: "nota",
          texto:
            "Si el cliente no te puede dar una foto limpia de su producto, ese es el primer entregable — no el catálogo.",
        },
      ],
    },
    {
      titulo: "La foto de origen",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "Fondo neutro y parejo", detalle: "Una cartulina blanca o gris alcanza. Lo importante es que el producto se recorte limpio." },
            { titulo: "Luz difusa, sin brillos quemados", detalle: "Un brillo reventado no se recupera después: el modelo lo interpreta como un hueco." },
            { titulo: "El producto completo y de frente", detalle: "Sin cortes, sin manos, sin nada delante. Después se reencuadra." },
            { titulo: "Resolución alta", detalle: "Cuanto más detalle traiga la foto de origen, menos se lo inventa el modelo." },
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Foto de origen del producto sobre fondo neutro, antes de cualquier procesamiento.",
          pie: "Así entra. Lo único que importa acá es que el producto esté limpio y completo.",
        },
      ],
    },
    {
      titulo: "Los planos que pide un catálogo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un cliente no necesita una foto: necesita un set. Estos cinco planos cubren casi cualquier ficha de producto, y salen todos de la misma foto de origen.",
        },
        {
          tipo: "tabla",
          columnas: ["Plano", "Para qué lo pide el cliente", "Dónde lo usa"],
          filas: [
            ["Producto aislado", "Ficha técnica, e-commerce", "Web, catálogo PDF"],
            ["Producto en contexto de uso", "Que se entienda dónde va instalado", "Redes, propuesta comercial"],
            ["Detalle de material", "Demostrar calidad de acabado", "Argumento de venta contra el competidor barato"],
            ["Escala con referencia", "Que se entienda el tamaño real", "Evita devoluciones"],
            ["Plano héroe", "La foto de portada, la que impresiona", "Portada, anuncio, feria"],
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Los cinco planos del mismo producto en una grilla: aislado, en contexto, detalle de material, escala y plano héroe.",
          pie: "El set completo, todo generado desde la misma foto de origen.",
        },
      ],
    },
    {
      titulo: "El prompt de entorno y luz",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Con el producto ya anclado por la referencia, el prompt solo tiene que dictar lo que lo rodea. Este es el que uso para el plano héroe de producto industrial.",
        },
        {
          tipo: "copiable",
          etiqueta: "Prompt — plano héroe de producto industrial",
          contenido: `El producto de la imagen de referencia, sin modificar su forma, color ni logotipo.
Apoyado sobre una superficie de concreto pulido gris oscuro.
Fondo degradado del mismo tono, sin objetos.
Luz principal lateral dura desde la izquierda a 45 grados, que marca el borde del cuerpo.
Luz de relleno suave desde la derecha para abrir la sombra sin borrarla.
Luz de contra recortando el contorno superior.
Lente 85mm, cámara ligeramente por debajo de la línea del producto.
Profundidad de campo corta: el producto nítido, el fondo suave.
Contraste alto, paleta fría, grano fino.`,
        },
        {
          tipo: "nota",
          texto:
            "La frase «sin modificar su forma, color ni logotipo» hace trabajo real. Sin ella el modelo se toma licencias con la etiqueta.",
        },
      ],
    },
    {
      titulo: "La corrección que siempre hace falta",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El logo. Es lo primero que el modelo deforma y lo primero que el cliente mira. En casi todas las entregas termino corrigiendo la etiqueta, ya sea regenerando esa región o pegando el logo real encima en edición.",
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Antes y después de la corrección de logotipo: a la izquierda el logo deformado por el modelo, a la derecha el logo real corregido.",
          pie: "Izquierda: lo que salió. Derecha: lo que se entrega.",
        },
        {
          tipo: "lista",
          items: [
            "Revisa el logo al 100% de zoom, no en la miniatura.",
            "Revisa que el número de modelo o la especificación impresa sea legible y correcta.",
            "Revisa que los tornillos, rejillas y perforaciones tengan la misma cantidad que el producto real.",
          ],
        },
      ],
    },
    {
      titulo: "Checklist antes de mandar",
      bloques: [
        {
          tipo: "lista",
          items: [
            "El producto es idéntico al real en forma, color y proporción.",
            "El logo y el texto impreso son correctos y legibles.",
            "La sombra cae en la misma dirección que la luz que dictaste.",
            "El reflejo sobre la superficie corresponde al producto y no a otra cosa.",
            "Los cinco planos comparten la misma luz y la misma paleta entre sí.",
            "Resolución suficiente para el uso final: web e impresión no son lo mismo.",
          ],
        },
      ],
    },
  ],

  // ── 5. FOTOS PROFESIONALES (candado) ──────────────────────────
  "fotos-profesionales-ia": [
    {
      titulo: "Qué resuelve esto",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una empresa necesita fotos de su gente: el gerente para LinkedIn, el equipo comercial para la propuesta, los técnicos para la web. Nunca las tiene, y la sesión de fotos siempre se posterga porque implica juntar a todos un día, contratar fotógrafo y estudio.",
        },
        {
          tipo: "parrafo",
          texto:
            "Con una foto decente de cada persona se resuelve en una tarde. No reemplaza una sesión real cuando la marca la necesita, pero sí resuelve el 80% de los usos donde nadie iba a contratar una sesión de todos modos.",
        },
      ],
    },
    {
      titulo: "La foto de partida de cada persona",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "De frente, cara completa", detalle: "Sin lentes de sol, sin gorra, sin nada tapando facciones." },
            { titulo: "Luz de día, sin flash", detalle: "Junto a una ventana funciona mejor que cualquier lámpara de oficina." },
            { titulo: "Expresión neutra o sonrisa leve", detalle: "Una carcajada distorsiona las facciones y el modelo la arrastra a todas las variantes." },
            { titulo: "Foto nítida, no capturada de un video", detalle: "Un frame de video trae desenfoque de movimiento y el resultado sale blando." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Pide la foto por WhatsApp pero que la manden como documento, no como imagen comprimida. La compresión de WhatsApp te quita el detalle que después necesitas.",
        },
      ],
    },
    {
      titulo: "Vestuario, fondo y coherencia de equipo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El error que arruina un set de equipo: generar a cada persona con luz, fondo y encuadre distintos. Puestas una al lado de la otra en la web, se nota que no estuvieron en el mismo lugar. La coherencia importa más que la calidad individual de cada foto.",
        },
        {
          tipo: "parrafo",
          texto:
            "Se resuelve fijando tres cosas iguales para todos y escribiéndolas idénticas en cada prompt: el fondo, la dirección de la luz y la distancia de cámara.",
        },
        {
          tipo: "copiable",
          etiqueta: "Bloque fijo — retrato corporativo de equipo",
          contenido: `Fondo gris medio uniforme con leve degradado, sin textura ni objetos.
Luz principal difusa desde la izquierda a 45 grados, luz de relleno suave a la derecha.
Lente 85mm, encuadre de pecho para arriba, cámara a la altura de los ojos.
Profundidad de campo corta, fondo suavemente desenfocado.
Piel con textura natural: poros visibles, sin suavizado de piel.
Paleta neutra, contraste medio.`,
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Grilla con los retratos de 6 personas distintas generados con el mismo bloque fijo, mostrando que el fondo y la luz coinciden entre todas.",
          pie: "Seis personas, un solo set. La coherencia se nota cuando están juntas.",
        },
      ],
    },
    {
      titulo: "El error de la piel",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Por defecto los modelos suavizan la piel hasta que la persona parece de cera. Se ve inmediatamente falso y es lo primero que comenta la persona retratada. Por eso «piel con textura natural, poros visibles, sin suavizado» va en el bloque fijo: hay que pedir explícitamente que NO la limpie.",
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Comparación de dos retratos de la misma persona: uno con piel plastificada por defecto, otro con textura natural pedida en el prompt.",
          pie: "Izquierda: lo que sale si no lo pides. Derecha: con la instrucción de textura.",
        },
      ],
    },
    {
      titulo: "Qué se entrega y qué se advierte",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Tres variantes por persona: frontal neutra, tres cuartos, y una con más expresión.",
            "Recorte cuadrado para redes y horizontal para web, de la misma toma.",
            "Aviso al cliente de que son retratos generados. No es un detalle legal: es que alguien lo va a notar y prefieres que se enteren por ti.",
          ],
        },
        {
          tipo: "cita",
          texto:
            "Si la persona no se reconoce en la foto, la foto no sirve por más buena que se vea.",
        },
      ],
    },
  ],

  // ── 6. ERRORES QUE DELATAN (candado) ──────────────────────────
  "errores-que-delatan-ia": [
    {
      titulo: "Por qué esto importa más que generar bonito",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Generar una imagen que impresiona es fácil y lo hace cualquiera. Entregarle a un cliente una pieza que aguante que la miren de cerca es otra cosa, y es la única razón por la que a alguien le pagan por esto.",
        },
        {
          tipo: "parrafo",
          texto:
            "Todo lo que sigue es el checklist que corro antes de mandar cualquier pieza. No es teoría: es la lista de las cosas que me devolvieron alguna vez.",
        },
      ],
    },
    {
      titulo: "Manos",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Siguen siendo el punto débil. Dedos de más, dedos fusionados, uñas que nacen del lugar equivocado, una mano sosteniendo un objeto que la atraviesa. Mejoró mucho, pero no lo suficiente como para no revisarlo.",
        },
        {
          tipo: "lista",
          items: [
            "Cuenta los dedos. Literalmente, uno por uno, con zoom.",
            "Revisa el punto de contacto entre la mano y el objeto: ahí es donde se rompe.",
            "Si la mano no aporta nada al mensaje, sácala del encuadre. Es más rápido que corregirla.",
          ],
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Zoom a manos generadas con errores señalados: dedo de más, dedos fusionados y objeto atravesando la palma.",
          pie: "Los tres fallos de mano más comunes, marcados.",
          captura: true,
        },
      ],
    },
    {
      titulo: "Cara: ojos, dientes y orejas",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Ojos que miran a puntos distintos, o con reflejos que no coinciden entre sí.",
            "Demasiados dientes, o dientes de tamaño imposible y perfectamente parejos.",
            "Orejas asimétricas o pendientes que solo aparecen en un lado.",
            "Lentes con una patilla que se pierde o un armazón que cambia de grosor.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "El reflejo de los ojos es el detector más rápido: las dos pupilas tienen que reflejar la misma fuente de luz, en la misma posición.",
        },
      ],
    },
    {
      titulo: "Texto y logos",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Cualquier texto dentro de una imagen generada es sospechoso hasta que lo verificas. Las letras se deforman, se inventan caracteres y los logos conocidos salen con las proporciones cambiadas. En piezas de cliente esto no se negocia: el logo real se pega encima en edición.",
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Ejemplos de texto generado con errores: letras inventadas en un cartel, logo con proporciones alteradas.",
          pie: "Si hay texto en la imagen, asume que está mal hasta comprobarlo.",
          captura: true,
        },
      ],
    },
    {
      titulo: "Física: sombras, reflejos y telas",
      bloques: [
        {
          tipo: "lista",
          items: [
            "La sombra cae hacia un lado y la luz viene del mismo lado: imposible.",
            "Un reflejo en un vidrio o en el piso que no corresponde a lo que está delante.",
            "Una tela que se dobla como si fuera plástico, o una manga que se funde con el fondo.",
            "Objetos que se apoyan flotando: falta la sombra de contacto justo debajo.",
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "La sombra de contacto es la que más se olvida y la que más delata. Un producto sin esa sombrita pegada a la base parece recortado y pegado, aunque todo lo demás esté perfecto.",
        },
      ],
    },
    {
      titulo: "Repetición y fondo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Los modelos repiten patrones cuando no saben qué poner: las mismas baldosas exactamente iguales, dos personas de fondo con la misma cara, ventanas clonadas a lo largo de una fachada. Se nota poco de lejos y muchísimo cuando alguien acerca.",
        },
        {
          tipo: "imagen",
          src: "",
          alt: "Fondo generado con patrones repetidos señalados: dos personas idénticas de fondo y ventanas clonadas.",
          pie: "El fondo es donde el modelo se relaja. Revísalo igual que el sujeto.",
          captura: true,
        },
      ],
    },
    {
      titulo: "El checklist, corto",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Esto es lo que corro en cinco minutos antes de mandar. Si algo falla, se corrige o se regenera — no se entrega con la esperanza de que no lo miren.",
        },
        {
          tipo: "copiable",
          etiqueta: "Checklist de acabado — antes de entregar",
          contenido: `[ ] Manos: dedos contados, punto de contacto revisado
[ ] Ojos: misma dirección, mismo reflejo
[ ] Dientes y orejas: cantidad y simetría
[ ] Texto y logo: verificados al 100% de zoom
[ ] Sombra: coherente con la dirección de la luz
[ ] Sombra de contacto: existe bajo cada objeto apoyado
[ ] Reflejos: corresponden a lo que está delante
[ ] Telas: caen con peso, no se funden con el fondo
[ ] Fondo: sin patrones ni caras repetidas
[ ] Resolución: suficiente para el uso final
[ ] Coherencia: esta pieza combina con el resto de la campaña`,
        },
        {
          tipo: "cita",
          texto:
            "El cliente no te paga por generar. Te paga por lo que decidiste no entregar.",
        },
      ],
    },
  ],
};
