import type { SeccionRecurso } from "@/lib/taller/content";

// ═══════════════════════════════════════════════════════════════
// FICHAS DE REPOS · PRODUCCIÓN, DATOS E INFRAESTRUCTURA (2 de 2)
// Escritas desde el README y la documentación real de cada repo.
// Qué es · cómo se instala y usa · cuándo NO conviene.
// ═══════════════════════════════════════════════════════════════

export const SECCIONES_REPOS_DATOS: Record<string, SeccionRecurso[]> = {
  "repo-remotion": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una librería para hacer videos por programación usando React. En vez de arrastrar clips en una línea de tiempo, describes el video en código: los elementos, sus posiciones y qué hacen en cada fotograma. Después se renderiza a MP4.",
        },
        {
          tipo: "parrafo",
          texto:
            "Suena a herramienta de programador y lo es, pero resuelve un problema muy concreto de agencia: el video que hay que hacer cien veces con datos distintos. Una plantilla de resultados mensuales por cliente, cien piezas de precio para un catálogo, o el mismo spot con veinte textos diferentes para probar en pauta.",
        },
      ],
    },
    {
      titulo: "Cuándo vale la pena",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Situación", "¿Remotion?"],
          filas: [
            ["Un spot único con dirección propia", "No. Es más lento que producirlo normal"],
            ["Cien variantes con la misma estructura y distinto dato", "Sí. Ahí gana por goleada"],
            ["Reportes en video para clientes, todos los meses", "Sí. Se automatiza una vez y corre solo"],
            ["Piezas que cambian de estructura cada vez", "No. Reprogramar cuesta más que editar"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Requiere saber React. Si no programas, es un proyecto para pedirle a Claude Code que te lo monte, no algo que vayas a tocar todos los días.",
        },
      ],
    },
    {
      titulo: "Ejemplo real de plantilla renovable",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El caso de uso más rentable: el video de «3 datos de la semana» de un cliente. Mismo formato, mismo timing, mismos colores de marca — solo cambian las tres cifras y los tres textos. Se monta una vez y se reutiliza cada semana con datos nuevos.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Define la plantilla con Claude Code", detalle: "Estructura, colores de marca, tipografía y timing fijos." },
            { titulo: "2. Deja los datos en un archivo separado", detalle: "Cada semana solo se edita ese archivo, nunca el código de la plantilla." },
            { titulo: "3. Renderiza con un solo comando", detalle: "El video sale igual de pulido cada vez, sin abrir un editor." },
          ],
        },
      ],
    },
  ],

  "repo-hyperframes": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Escribes HTML y devuelve video. Está construido específicamente para que lo manejen agentes de IA, no personas: la idea es que Claude pueda generar la estructura y obtener un video renderizado sin pasar por un editor.",
        },
        {
          tipo: "parrafo",
          texto:
            "Es el mismo territorio que Remotion pero con una barrera de entrada más baja: HTML y CSS en vez de React. Para alguien que ya le pide páginas web a Claude Code, la curva es casi nula.",
        },
      ],
    },
    {
      titulo: "Para qué lo usarías",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Placas de datos animadas para un reporte de cliente.",
            "Cierres de marca consistentes entre piezas, sin rehacerlos en CapCut cada vez.",
            "Variantes de texto sobre el mismo fondo para probar mensajes en pauta.",
            "Piezas de contenido informativo donde la tipografía es la protagonista.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "No reemplaza a Higgsfield ni a CapCut: no genera imagen ni monta metraje. Cubre la franja de motion gráfico, que es justo la que tu flujo tenía a mano.",
        },
      ],
    },
    {
      titulo: "Hyperframes vs Remotion",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["", "Hyperframes", "Remotion"],
          filas: [
            ["Lenguaje base", "HTML y CSS", "React (JavaScript)"],
            ["Curva de entrada", "Más baja si ya le pides páginas web a Claude", "Requiere entender componentes"],
            ["Mejor para", "Placas de texto, títulos, cierres simples", "Animaciones con lógica más compleja y reutilización de datos"],
            ["Pensado para agentes", "Sí, desde el diseño", "También, pero nació para desarrolladores humanos"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Si nunca programaste nada, empieza aquí. Si ya te sientes cómodo pidiéndole estructuras más complejas a Claude Code, Remotion te da más control a largo plazo.",
        },
      ],
    },
    {
      titulo: "Cómo lo aprovecharías sin programar",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Define la plantilla una sola vez", detalle: "Pídele a Claude Code que construya la estructura HTML con los espacios variables marcados: el título, el dato, el logo, el color de fondo." },
            { titulo: "2. Fija los valores de marca", detalle: "Paleta, tipografía y proporciones salen del ADN comunicacional del cliente, no de lo que se le ocurra al agente." },
            { titulo: "3. Alimenta con los datos reales", detalle: "Una lista con los textos y cifras de cada variante. De ahí salen todas las piezas de una vez." },
            { titulo: "4. Revisa la primera antes de renderizar todas", detalle: "Si la plantilla está mal, el error se multiplica por el número de piezas." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "El punto de equilibrio está alrededor de las diez piezas. Por debajo de eso, montar la plantilla te cuesta más que hacerlas a mano en CapCut.",
        },
      ],
    },
  ],

  "repo-voicebox": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un estudio de voz con IA de código abierto que corre localmente en tu máquina. Clona voces, genera locución, permite dictar dentro de cualquier aplicación y hablar con agentes usando voces propias. Es la pila completa de entrada y salida de voz, sin depender de un servicio en la nube.",
        },
      ],
    },
    {
      titulo: "Dónde encaja frente a lo que ya usas",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["", "Servicio en la nube", "Voicebox local"],
          filas: [
            ["Calidad en español latino", "Alta y consistente", "Depende de tu equipo y del modelo"],
            ["Costo por locución", "Por crédito o suscripción", "Solo tu electricidad"],
            ["Privacidad del material", "Sube a un servidor ajeno", "No sale de tu máquina"],
            ["Volumen alto de pruebas", "Se te va el presupuesto", "Ilimitado"],
            ["Entrega a cliente", "Listo para usar", "Conviene revisar antes"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "El uso más rentable es iterar barato: pruebas veinte versiones de la locución en local hasta dar con el tono, y recién la definitiva la haces con el servicio de calidad. Es la misma lógica de «iterar barato, producir caro».",
        },
        {
          tipo: "parrafo",
          texto:
            "Sobre clonar voces: hazlo solo con voces propias o con autorización escrita. Clonar la voz de una persona sin permiso es un problema legal y reputacional que ninguna eficiencia compensa.",
        },
      ],
    },
    {
      titulo: "Flujo de iteración barata",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Prueba el guion en local", detalle: "Genera 5 o 6 versiones de tono distinto sin gastar créditos de un servicio pago." },
            { titulo: "2. Elige la que mejor encaje", detalle: "Con el cliente o con tu propio criterio de dirección." },
            { titulo: "3. Produce la definitiva con el servicio de calidad", detalle: "ElevenLabs para lo que va al cliente final. Local para todo lo que es prueba." },
          ],
        },
      ],
    },
  ],

  "repo-claude-video-vision": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un plugin de Claude Code que le da la capacidad de ver y entender videos. Extrae fotogramas con ffmpeg y procesa el audio con distintos motores de transcripción. Claude recibe los fotogramas como imágenes y la transcripción con marcas de tiempo.",
        },
        {
          tipo: "parrafo",
          texto:
            "El propio repositorio hace una aclaración importante: es una capa de percepción, no de interpretación. Le da a Claude los ojos y los oídos; el criterio sobre lo que está viendo lo pones tú o tu Cerebro Creativo.",
        },
      ],
    },
    {
      titulo: "El uso que te cambia el trabajo",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Dale un video que funcionó", detalle: "Un reel de la competencia, una campaña que te gustó, una pieza tuya que rindió bien en pauta." },
            { titulo: "2. Pídele el desarme, no la opinión", detalle: "En qué segundo está el gancho, qué estructura narrativa usa, cuántos planos tiene, dónde está el giro, cuánto dura cada plano." },
            { titulo: "3. Cruza el desarme con tu Cerebro", detalle: "Ahora Claude puede decirte qué figura retórica opera y qué género es, porque tiene la Biblia cargada." },
            { titulo: "4. Adapta la estructura, no el contenido", detalle: "Lo que copias es el esqueleto. El relleno sale de tu insight, no del video ajeno." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Necesita ffmpeg instalado y una clave de API para la transcripción de audio. La instalación no es de un clic: reserva media hora la primera vez.",
        },
      ],
    },
    {
      titulo: "Ejemplo de lo que se puede pedir",
      bloques: [
        {
          tipo: "copiable",
          etiqueta: "Prompt de desarme",
          contenido:
            "Analiza este video [ruta o URL].\n\n1. En qué segundo aparece el gancho y de qué tipo es.\n2. Cuántos planos tiene y cuánto dura cada uno.\n3. Qué estructura narrativa usa.\n4. En qué segundo está el giro o el momento clave.\n5. Cómo cierra y qué CTA usa.\n\nDame el resultado como ficha técnica, no como reseña.",
        },
      ],
    },
  ],

  "repo-awesome-gpt-image-2": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una biblioteca enorme de prompts para GPT Image 2, con imágenes de vista previa y actualizaciones frecuentes. Más de dos mil prompts curados, en varios idiomas. El modelo destaca en renderizado de texto dentro de la imagen, que es históricamente la parte donde la generación fallaba más.",
        },
      ],
    },
    {
      titulo: "Cómo usarla sin volverte dependiente",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El error es tomar un prompt y usarlo tal cual: te sale una imagen bonita que no tiene nada que ver con la marca del cliente. El uso correcto es de ingeniería inversa — mirar cómo está construido el prompt que produjo el resultado que te gusta, y trasladar la estructura a tu propia fórmula de siete piezas.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Busca por resultado visual, no por tema", detalle: "Entra buscando «luz dura de estudio con fondo de color» y no «foto de zapatilla»." },
            { titulo: "2. Desarma el prompt en sus componentes", detalle: "Sujeto, acción, entorno, luz, cámara, estilo y mood. Vas a ver cuáles trae y cuáles omite." },
            { titulo: "3. Reemplaza sujeto y marca, conserva la parte técnica", detalle: "La descripción de luz y lente es lo transferible. El resto es del ejemplo." },
            { titulo: "4. Guárdalo en tu prompt maestro de marca", detalle: "Si el look funciona para ese cliente, se convierte en estándar y deja de depender de tu memoria." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Que el texto en imagen ya funcione bien no significa que funcione en español con tildes ni con logos reales. Verifica siempre esas dos cosas antes de mandar a cliente.",
        },
      ],
    },
    {
      titulo: "Cómo se busca dentro del repo",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Está organizado por categoría visual: retrato, producto, tipografía, escena, estilo artístico.",
            "Cada prompt trae imagen de vista previa, así que decides por resultado antes de leer el texto completo.",
            "La actualización es diaria, así que vale la pena revisarlo cada cierto tiempo en vez de guardarlo una sola vez.",
          ],
        },
      ],
    },
  ],

  "repo-agent-browser-vercel": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una herramienta de línea de comandos para que los agentes de IA controlen un navegador. Está escrita en Rust, así que es rápida, y se instala junto con su propia copia de Chrome para pruebas.",
        },
        {
          tipo: "parrafo",
          texto:
            "En la práctica: le permite a Claude entrar a sitios, navegar, leer lo que hay y actuar sobre la página. Es la diferencia entre un asistente que te dice cómo hacer algo y uno que lo hace.",
        },
      ],
    },
    {
      titulo: "Para qué lo usarías en la agencia",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Revisar cómo se ve la web de un cliente en distintos tamaños sin abrirlas tú.",
            "Recolectar referencias visuales de una categoría completa para un moodboard.",
            "Verificar que una landing quedó bien después de un cambio, en lugar de mirarla a ojo.",
            "Sacar información de sitios públicos que no tienen API.",
          ],
        },
        { tipo: "copiable", etiqueta: "Instalación", contenido: "# Instalación global del binario nativo\nnpm install -g agent-browser\n\n# Descarga Chrome for Testing (solo la primera vez)\nagent-browser install" },
        {
          tipo: "nota",
          texto:
            "No lo uses para automatizar cuentas ni para saltarte límites de sitios ajenos. Para lectura de información pública está bien; para operar en nombre de alguien, no.",
        },
      ],
    },
    {
      titulo: "Un caso concreto de uso",
      bloques: [
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Define qué necesitas revisar", detalle: "Las webs de 5 competidores de un cliente, por ejemplo." },
            { titulo: "2. Pide la navegación estructurada", detalle: "«Entra a cada sitio y dime qué CTA principal usan en el hero» — no una captura, un análisis." },
            { titulo: "3. Cruza el resultado con tu propuesta", detalle: "Ese análisis alimenta directo la conversación de venta con el cliente sobre su propia web." },
          ],
        },
      ],
    },
  ],

  "repo-apify-mcp": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un servidor MCP que le permite a tus agentes extraer datos de redes sociales, buscadores, mapas, sitios de comercio electrónico y páginas en general, usando miles de extractores ya construidos que no tienes que programar.",
        },
        {
          tipo: "parrafo",
          texto:
            "La diferencia con un navegador automatizado es la escala y la estructura: en vez de leer una página, te devuelve datos ordenados de cientos, listos para analizar.",
        },
      ],
    },
    {
      titulo: "El uso publicitario real",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Esto es la técnica de excavación de insight llevada a escala. La guía de insight te dice que reúnas al menos 200 reseñas y busques patrones en las críticas. Hacerlo a mano son tres tardes. Con esto son minutos, y el tiempo se te va donde importa: en interpretar.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Extrae reseñas del producto y de los competidores", detalle: "Cuantas más, mejor. Las de 1 a 3 estrellas son las que traen la verdad." },
            { titulo: "2. Pásalas por tu Cerebro Creativo", detalle: "Que las clasifique en dato, observación, hipótesis e insight, y que busque las quejas que se repiten con palabras distintas." },
            { titulo: "3. Pide el lenguaje literal, no el resumen", detalle: "Las metáforas que usa la gente son la materia prima del copy. Un resumen las borra." },
          ],
        },
        {
          tipo: "nota",
          texto:
            "Respeta los términos de uso de cada plataforma y no extraigas datos personales. Lo que buscas son patrones de lenguaje, no personas.",
        },
      ],
    },
  ],

  "repo-supabase-mcp": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Conecta tus proyectos de Supabase con asistentes de IA a través del Model Context Protocol, el estándar que define cómo los modelos hablan con servicios externos. Permite que el asistente gestione tablas, consulte configuración y lea datos directamente.",
        },
      ],
    },
    {
      titulo: "Por qué te toca de cerca",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Tu propia academia tiene el esquema de base de datos escrito y sin ejecutar. Cuando llegue el momento de encender las cuentas individuales, el progreso en la nube y el ranking, este MCP es la vía para que Claude opere la base en vez de que tú copies y pegues SQL en el panel.",
        },
        {
          tipo: "nota",
          texto:
            "Dale acceso de solo lectura mientras estés explorando. Un agente con permisos de escritura sobre la base de producción es una mala noche esperando a ocurrir.",
        },
      ],
    },
    {
      titulo: "Qué puede hacer y qué conviene que no haga",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Operación", "¿Se lo dejarías al agente?"],
          filas: [
            ["Consultar datos y explicártelos en lenguaje normal", "Sí. Es donde más rinde y no tiene riesgo"],
            ["Revisar la configuración del proyecto", "Sí. Detecta cosas mal puestas que tú no ibas a mirar"],
            ["Crear tablas nuevas en un entorno de prueba", "Sí, con cuidado y revisando el SQL antes"],
            ["Modificar el esquema en producción", "No sin que tú leas el cambio primero"],
            ["Borrar o migrar datos reales", "Nunca de forma automática"],
          ],
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Empieza por un proyecto de prueba", detalle: "Conecta el MCP a una base vacía y familiarízate con lo que hace antes de acercarlo a datos reales." },
            { titulo: "2. Pide explicaciones, no solo ejecuciones", detalle: "«Explícame qué hace esta consulta antes de correrla» convierte al agente en alguien que te enseña en vez de alguien que hace magia." },
            { titulo: "3. Guarda las migraciones como archivos", detalle: "Cada cambio de esquema debe quedar en un archivo versionado, no solo aplicado. Así se puede revisar y revertir." },
          ],
        },
      ],
    },
  ],

  "repo-postgres-mcp": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Un servidor MCP para Postgres con acceso configurable de lectura y escritura, más análisis de rendimiento: ajuste de índices, planes de ejecución, chequeos de salud y ejecución segura de consultas.",
        },
        {
          tipo: "parrafo",
          texto:
            "Frente al MCP de Supabase, este es más genérico y más profundo en la parte de rendimiento. Si tu base está en Supabase, empieza por el otro; este entra cuando la base crece y hay que optimizar.",
        },
      ],
    },
    {
      titulo: "Cuándo lo vas a necesitar",
      bloques: [
        {
          tipo: "lista",
          items: [
            "Cuando una consulta empieza a tardar y no sabes por qué.",
            "Cuando tienes que decidir qué índices crear sin ser especialista en bases de datos.",
            "Cuando quieres una revisión de salud antes de abrir un portal a cientos de alumnos.",
          ],
        },
        {
          tipo: "nota",
          texto:
            "Es una herramienta de nivel avanzado. Si todavía no tienes una base con datos reales corriendo, no te aporta nada — guárdalo para cuando el problema exista.",
        },
      ],
    },
    {
      titulo: "Las cuatro cosas que hace bien",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Función", "Qué resuelve", "Cuándo la vas a usar"],
          filas: [
            ["Ajuste de índices", "Te dice qué índice falta para que una consulta deje de arrastrarse", "Cuando el portal empieza a tardar con más alumnos"],
            ["Planes de ejecución", "Explica cómo está resolviendo la base una consulta, en lenguaje entendible", "Cuando no sabes por qué algo es lento"],
            ["Chequeos de salud", "Revisión general del estado de la base", "Antes de abrir a mucha gente, como control previo"],
            ["Ejecución segura de SQL", "Corre consultas con límites, para que un error no tumbe nada", "Siempre que explores datos sin conocerlos bien"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "La diferencia práctica con contratar a alguien: no reemplaza a un especialista cuando el problema es serio, pero te evita llamarlo por las cosas que se resuelven leyendo un plan de ejecución.",
        },
      ],
    },
  ],

  "repo-dlt": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Una librería de Python de código abierto que automatiza la carga de datos: tomar información de un lado y dejarla ordenada en otro. Corre en cualquier parte — un cuaderno de Colab, una función serverless, tu laptop o un agente de código.",
        },
      ],
    },
    {
      titulo: "Para qué en una agencia de contenido",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "El caso concreto: juntar en un solo lugar las métricas de las campañas de tus clientes, que hoy viven repartidas entre plataformas distintas. Una vez que están juntas y ordenadas, el reporte mensual deja de ser trabajo manual y pasa a ser una consulta.",
        },
        {
          tipo: "nota",
          texto:
            "Esto solo tiene sentido con varios clientes activos y reportes recurrentes. Con dos cuentas, una hoja de cálculo te resuelve el mismo problema sin instalar nada.",
        },
      ],
    },
    {
      titulo: "El caso concreto de una agencia de contenido",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Imagina cinco clientes con campañas activas. Cada mes hay que entrar a cada plataforma, exportar, pegar en una hoja, ordenar, calcular y armar el informe. Son horas repetidas que no se cobran y que nadie disfruta.",
        },
        {
          tipo: "pasos",
          items: [
            { titulo: "1. Define qué métricas importan de verdad", detalle: "Inversión, alcance, clics, conversiones y costo por resultado. Todo lo demás es ruido de dashboard." },
            { titulo: "2. Escribe un flujo por fuente", detalle: "Uno por plataforma. Cada uno trae los mismos campos, aunque la plataforma los llame distinto." },
            { titulo: "3. Deja todo en un solo destino", detalle: "Puede ser una base de datos o incluso una hoja: lo importante es que sea un solo lugar con la misma estructura." },
            { titulo: "4. Programa la actualización", detalle: "Diaria o semanal. A partir de ahí el reporte mensual es una consulta, no un trabajo." },
            { titulo: "5. Conecta el Cerebro al final", detalle: "Con los datos ordenados, Claude puede leer el mes y escribirte la lectura estratégica, no solo la tabla." },
          ],
        },
        {
          tipo: "cita",
          texto: "El valor no está en tener los datos: está en dejar de perder la mañana juntándolos.",
        },
      ],
    },
  ],

  "repo-airbyte": [
    {
      titulo: "Qué es",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Movimiento de datos de código abierto para tuberías de extracción, transformación y carga: desde APIs, bases de datos y archivos hacia almacenes de datos y aplicaciones de IA. Existe en versión autoalojada y en la nube.",
        },
        {
          tipo: "parrafo",
          texto:
            "Cubre el mismo territorio que la librería anterior pero con otra filosofía: aquí hay una interfaz gráfica y cientos de conectores ya hechos, en vez de escribir el flujo en Python.",
        },
      ],
    },
    {
      titulo: "Cuál de los dos elegir",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["Si tú…", "Elige"],
          filas: [
            ["Prefieres configurar en pantalla y no tocar código", "Airbyte"],
            ["Quieres que Claude Code lo escriba y lo mantenga", "La librería en Python"],
            ["Necesitas un conector raro que no existe", "La librería, porque lo escribes tú"],
            ["Vas a conectar plataformas conocidas de publicidad y analítica", "Airbyte, ya vienen resueltas"],
          ],
        },
        {
          tipo: "nota",
          texto:
            "Los dos son infraestructura, no creatividad. Están en la bóveda porque en algún momento vas a querer automatizar el reporte mensual, no porque los necesites esta semana.",
        },
      ],
    },
    {
      titulo: "Autoalojado o en la nube",
      bloques: [
        {
          tipo: "tabla",
          columnas: ["", "Autoalojado", "En la nube"],
          filas: [
            ["Costo", "Solo el servidor donde corre", "Por volumen de datos movidos"],
            ["Mantenimiento", "Tuyo: actualizaciones y caídas", "Del proveedor"],
            ["Datos de clientes", "No salen de tu infraestructura", "Pasan por un tercero"],
            ["Para empezar", "Requiere montar y sostener", "Funciona el mismo día"],
            ["Recomendación", "Cuando el volumen ya justifica el trabajo", "Para probar si esto te sirve"],
          ],
        },
        {
          tipo: "parrafo",
          texto:
            "Para una agencia chica el orden sensato es empezar en la nube con el plan mínimo, comprobar que el reporte automático de verdad te ahorra tiempo, y recién entonces evaluar si vale la pena autoalojarlo. Montar infraestructura para un beneficio que todavía no comprobaste es la forma más común de perder dos semanas.",
        },
        {
          tipo: "nota",
          texto:
            "Si mueves datos de clientes, revisa qué información personal estás copiando y a dónde. Métricas agregadas de campaña no son un problema; listas de contactos sí lo son.",
        },
      ],
    },
  ],
};
