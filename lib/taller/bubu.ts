// ============================================================
// BUBU — cerebro de conocimiento del asistente (100% offline)
// Respuestas basadas en el contenido real de la masterclass
// (Obsidian: docs 00/02/03/06). Sin conexión a bots ni APIs:
// todo se responde aquí mismo, en el navegador del alumno.
// ============================================================

import { TALLER } from "@/lib/taller/content";

export type Entrada = {
  id: string;
  // Palabras que activan esta respuesta (en minúsculas, sin tildes).
  claves: string[];
  respuesta: string;
};

export const CONOCIMIENTO: Entrada[] = [
  {
    id: "cerebro",
    claves: ["cerebro creativo", "cerebro", "proceso de manuel", "mecanismo"],
    respuesta:
      "El Cerebro Creativo IA es el proceso que Manuel inventó para enseñarle a la IA a pensar y responder como un director creativo con 20 años de experiencia dentro de TU negocio (o el de tu cliente). No es un prompt suelto: se alimenta con la marca, el público, el mercado y los ángulos que funcionan. Lo construyes completo en la PARTE 2, y te llevas la plantilla lista para instalar.",
  },
  {
    id: "biblia",
    claves: ["biblia", "59 documentos", "60 documentos", "59 docs", "documentos"],
    respuesta:
      "La Biblia Publicitaria son los 59 documentos que le enseñan a la IA todo el oficio del director creativo — el mismo material que alimenta el sistema de Manuel. La recibes COMPLETA con tu compra (es el bono estrella) y aprendes a usarla en la PARTE 2. La encuentras en la sección Recursos, aquí abajo.",
  },
  {
    id: "herramientas",
    claves: ["herramientas", "que necesito", "requisitos", "higgsfield", "claude code", "chatgpt", "pagar", "stack", "programas"],
    respuesta:
      "Son cuatro: el plan básico de Higgsfield, el plan básico de Claude Code, una cuenta de ChatGPT de pago para la baraja de GPTs, y CapCut + Canva para edición y diseño (Pro recomendado). En la PARTE 5 tienes el desglose completo con precios: todo junto cuesta menos que una cena de negocios al mes, y un solo cliente lo paga por un año. Si ya pagas alguna herramienta de IA, vas con ventaja.",
  },
  {
    id: "precio",
    claves: ["precio", "cuanto cuesta", "costo", "cuotas", "pagar el curso", "vale"],
    respuesta:
      "El curso grabado cuesta $150 (S/560): acceso inmediato y de por vida, con el curso bonus StorySelling Pro y toda la bóveda de documentos incluidos. La masterclass en vivo cuesta $250 (S/950): cohorte con fecha fija, ~4.5 horas, Q&A, revisión de tu proyecto, e incluye el grabado de por vida. Ambos con cuotas disponibles. Para dimensionarlo: un proyecto con este sistema se ofrece a empresas desde $2,000 — aprenderlo cuesta menos del 10% de eso.",
  },
  {
    id: "garantia",
    claves: ["garant", "devol", "devuel", "reembols", "dinero"],
    respuesta:
      "Grabado: 7 días de garantía — si lo ves y sientes que no es para ti, devolución completa sin preguntas. En vivo: asiste, aplica el sistema, y si en 7 días no produces tu primer spot con IA, te devuelven el 100%.",
  },
  {
    id: "acceso",
    claves: ["acceso", "cuanto tiempo", "de por vida", "expira", "contrasena", "password"],
    respuesta:
      "El acceso es de por vida, con las actualizaciones del contenido incluidas. Entras siempre con la contraseña que recibiste por correo. Si la perdiste, en la página principal del portal hay un formulario para pedirla de nuevo.",
  },
  {
    id: "empezar",
    claves: ["empiez", "empez", "comienz", "comenz", "orden", "primero", "por donde"],
    respuesta:
      "Empieza por la PARTE 0 (las bases y el mapa) y avanza en orden. El error clásico es saltarse el ACTO 1 para ir directo a generar videos — no lo hagas: la estrategia es exactamente lo que separa tu contenido del 99% que se ve bonito pero no vende. Mi ritmo sugerido: una parte por día, y en una semana tienes el sistema completo.",
  },
  {
    id: "cobrar",
    claves: ["cobr", "tarifa", "precios de mercado", "cuanto vale un proyecto", "factur"],
    respuesta:
      "Eso se trabaja completo en la PARTE 5: tu propuesta de valor, tu oferta irresistible, los rangos reales de mercado para spots, campañas y paquetes mensuales, y el pitch de 60 segundos. La referencia ancla: Manuel ofrece proyectos con este sistema a empresas desde $2,000. El error a evitar: vender «videos con IA» en vez de vender resultados de campaña.",
  },
  {
    id: "clientes",
    claves: ["client", "conseguir client", "vender el servicio", "agencia propia"],
    respuesta:
      "La PARTE 5 te da los tres modelos: venderlo como servicio a clientes, integrarlo a lo que ya ofreces para subir tarifas, o usarlo para tu propia marca. Incluye la estructura de propuesta comercial para tu primer cliente y tu plan de 30 días. Consejo de Bubu: tu primer spot hecho con el sistema ES tu mejor herramienta de venta — prodúcelo para una marca que conozcas y úsalo de carta de presentación.",
  },
  {
    id: "consistencia",
    claves: ["hoja de personaje", "consistencia", "personaje cambia", "producto cambia", "mismo personaje"],
    respuesta:
      "Ese es el problema #1 de todo el que genera con IA: el producto y el personaje cambian en cada toma. La solución es la hoja de personaje (PARTE 3): fija producto, personaje y estética para que toda la campaña se vea de la misma marca. La plantilla lista para usar está en la sección Recursos.",
  },
  {
    id: "storyboard",
    claves: ["storyboard", "escenas", "planos", "desglose visual"],
    respuesta:
      "El storyboard convierte tu guion en el desglose visual completo: escenas, planos, ritmo y narrativa ANTES de generar una sola imagen. Te lo explico en la PARTE 3, con resultados reales de campañas mías, y tienes el GPT de storyboards de la baraja del proceso para aplicarlo. Pensar en escenas primero te ahorra horas de generaciones desperdiciadas.",
  },
  {
    id: "frames",
    claves: ["cinepromt", "frames", "imagenes", "nano banana", "gpt image", "fotogramas", "imagen cinematografica"],
    respuesta:
      "Los frames de cine se generan con CinePromt (de la baraja del proceso): produce prompts cinematográficos completos — lente, luz, color y atmósfera — para GPT Image 2 y Nano Banana Pro en Higgsfield. El flujo es frame por frame: cada escena del storyboard se convierte en una imagen de alta calidad. Todo en la PARTE 3.",
  },
  {
    id: "animacion",
    claves: ["anima", "kling", "seedance", "video", "movimiento"],
    respuesta:
      "La animación va frame por frame: Seedance Director (de la baraja) genera el prompt de animación perfecto para cada frame, y luego eliges Kling o Seedance según el tipo de movimiento. ¿Por qué frame por frame? Control total. Los que generan «de un tirón» obtienen resultados aleatorios. PARTE 3.",
  },
  {
    id: "ugc",
    claves: ["ugc", "celular", "testimonios con ia", "contenido organico"],
    respuesta:
      "El UGC con IA (personajes creíbles hablando de un producto real, como grabado con celular) se hace con el GPT de UGC de la baraja. En la PARTE 3 también aprendes cuándo una marca necesita UGC y cuándo necesita cine — y cómo cobrar cada uno.",
  },
  {
    id: "edicion",
    claves: ["edicion", "capcut", "edit", "montaje", "musica", "acabado"],
    respuesta:
      "El ensamblaje final es en CapCut: ritmo, música, sonido y textos (PARTE 3). Los detalles de acabado son los que separan «video de IA» de pieza publicitaria — para eso está el checklist «parece agencia» en la sección Recursos.",
  },
  {
    id: "prompts",
    claves: ["prompt", "prompting", "prompt engineering", "biblioteca de prompts"],
    respuesta:
      "El prompt engineering profesional se enseña en la PARTE 3, y con tu compra viene la biblioteca de prompts cinematográficos dentro de las plantillas (sección Recursos). Pero ojo: el diferencial no es el prompt suelto, es el Cerebro Creativo que piensa ANTES del prompt (PARTE 2).",
  },
  {
    id: "insight",
    claves: ["insight", "insights", "6 tipos"],
    respuesta:
      "El insight es la verdad del consumidor sobre la que se construye la campaña. En la PARTE 1 aprendes los 6 tipos de insight y cómo encontrarlos — es una de las herramientas centrales del pensamiento de director creativo.",
  },
  {
    id: "bigidea",
    claves: ["big idea", "concepto", "idea de campana", "campana"],
    respuesta:
      "La Big Idea es el concepto central que ordena toda la campaña. En la PARTE 1 ves cómo se construye (junto a las retóricas publicitarias y los tipos de campaña), y en la PARTE 2 el Cerebro Creativo te ayuda a generarlas con criterio para tu marca específica.",
  },
  {
    id: "hooks",
    claves: ["hook", "hooks", "gancho", "estructura narrativa", "headline", "guion", "guiones"],
    respuesta:
      "En la PARTE 1 está el arsenal completo de escritura: los 9 hooks, las 10 estructuras narrativas, las fórmulas de headline y los géneros de storytelling. Y en la PARTE 2 ves cómo el Cerebro Creativo escribe guiones con la voz de tu marca — no con voz de robot.",
  },
  {
    id: "casos",
    claves: ["casos", "wellmax", "win", "ejemplos", "marcas reales", "clientes reales"],
    respuesta:
      "La PARTE 4 son casos con marcas reales y presupuesto real: el caso Wellmax completo (campaña de producto), el personaje de marca de WIN, y una galería de referencias con lo mejor que se está haciendo — más cómo adaptar todo a tu propio caso.",
  },
  {
    id: "gpts",
    claves: ["gpts", "baraja", "cuales gpts", "seedance director gpt"],
    respuesta:
      "La baraja de GPTs del proceso de Manuel tiene 4 piezas: CinePromt (frames de cine), Storyboard (desglose visual), UGC (contenido tipo celular) y Seedance Director (prompts de animación). Los links de acceso están en la sección Recursos, y necesitas ChatGPT de pago para usarlos. En qué momento del flujo entra cada uno, lo ves en la PARTE 3.",
  },
  {
    id: "vivo",
    claves: ["en vivo", "cohorte", "fecha", "cuando es", "masterclass en vivo", "cupos"],
    respuesta:
      "La masterclass en vivo es por cohortes con fecha fija: ~4.5 horas, grupos de 15-20 personas, con sesión Q&A y revisión grupal de tu primer proyecto. Incluye el grabado de por vida. La fecha de la próxima cohorte aparece en la página «En vivo» del portal — y mi consejo: entra 10 minutos antes y ven con una marca o producto en mente.",
  },
  {
    id: "upgrade",
    claves: ["upgrade", "subir al vivo", "cambiar al vivo", "100"],
    respuesta:
      "Si compraste el grabado y quieres subir a la cohorte en vivo, el upgrade cuesta solo $100 más (la diferencia). Ganas la sesión en vivo, el Q&A y la revisión de tu primer proyecto con Manuel.",
  },
  {
    id: "comunidad",
    claves: ["comunidad", "soporte", "ayuda", "seguimiento", "llamada", "dia 14"],
    respuesta:
      "Tu compra incluye la comunidad de alumnos con soporte por 30 días y la llamada grupal de seguimiento a los 14 días, donde se revisan tus avances. La fecha de la llamada aparece en «Próximas sesiones» dentro de la página En vivo.",
  },
  {
    id: "adn",
    claves: ["adn de marca", "adn", "voz de marca", "identidad"],
    respuesta:
      "El ADN de marca es el documento que le enseña al Cerebro Creativo quién es tu marca: su voz, su público y su mercado. Con él la IA deja de escribir genérico y empieza a escribir como TU marca. La plantilla viene incluida (sección Recursos) y se trabaja en la PARTE 2.",
  },
  {
    id: "comercial",
    claves: ["uso comercial", "comercialmente", "derechos", "licencia"],
    respuesta:
      "Sí puedes usar comercialmente lo que generes: las plataformas del stack lo permiten en sus planes de pago. En la masterclass también se explican las buenas prácticas para trabajar con marcas de clientes sin problemas.",
  },
  {
    id: "publicidad-cero",
    claves: ["no se de publicidad", "sin experiencia", "desde cero", "principiante", "necesito saber"],
    respuesta:
      "No necesitas saber de publicidad: el sistema incluye toda la parte estratégica (ACTO 1 completo) y empiezas desde cero. Si sabes usar un navegador, puedes con esto. El Cerebro Creativo pone el criterio; tú pones la dirección.",
  },
];

// ============================================================
// CONOCIMIENTO DE VENTAS — para la landing pública.
// Aquí Bubu ayuda a DECIDIR la compra: precio, qué incluye,
// garantía, para quién. NO da detalle a profundidad de los
// módulos (eso es solo para alumnos, adentro).
// ============================================================
export const CONOCIMIENTO_VENTAS: Entrada[] = [
  {
    id: "v-como-pago",
    claves: ["como pago", "formas de pago", "yape", "plin", "transferencia", "deposito", "tarjeta", "metodo de pago", "cuenta"],
    respuesta:
      "Puedes pagar por transferencia (Interbank), Yape o Plin — al abrir cualquier recurso premium o acceso verás la bandeja con los datos y el paso a paso: transfieres, tomas la captura y se la envías a Manuel por WhatsApp. Él confirma y te manda tu acceso al instante. Algunos productos también tienen pago con tarjeta vía Hotmart.",
  },
  {
    id: "v-niveles",
    claves: ["niveles", "acceso total", "que acceso", "tipos de acceso", "solo el vivo", "solo grabado", "desbloquear todo", "boveda", "solo documentos"],
    respuesta:
      "Hay tres accesos, y cada uno de arriba incluye todo el de abajo: Bóveda de documentos ($50, solo guías y plantillas, sin las clases), Cursos grabados ($150, la masterclass completa + el bonus StorySelling Pro + toda la bóveda) y Cohorte en vivo ($250, las sesiones en vivo + todo lo del grabado). Los ves comparados en la pestaña Recursos, arriba de la bóveda.",
  },
  {
    id: "v-premium",
    claves: ["premium", "recurso de paga", "pack de prompts", "plantilla maestra", "desbloquear recurso", "clave", "contraseña del recurso"],
    respuesta:
      "Los prompts cinematográficos y la plantilla maestra de campaña ya no se compran sueltos: están incluidos en el acceso Bóveda de documentos ($50), junto con toda la guía de la bóveda. Si ya tienes Bóveda, Cursos grabados o el en vivo, ya los tienes desbloqueados.",
  },
  {
    id: "v-precio",
    claves: ["precio", "cuanto cuesta", "cuanto vale", "costo", "cuotas", "vale", "pagar"],
    respuesta:
      "Hay tres formas de entrar: la Bóveda de documentos a $50, solo guías y plantillas, sin video; el curso grabado a $150 (S/560), con las clases + el bonus StorySelling Pro + toda la bóveda, acceso inmediato y de por vida; y la masterclass en vivo a $250 (S/950), una cohorte con fecha fija de ~4.5 horas con Q&A y revisión de tu proyecto, que incluye todo lo del grabado. Cuotas disponibles en grabado y vivo. Para dimensionarlo: un proyecto con este sistema se ofrece a empresas desde $2,000 — aprenderlo cuesta menos del 10% de eso. Baja a la sección de precios para elegir.",
  },
  {
    id: "v-incluye",
    claves: ["que incluye", "que me llevo", "que trae", "que viene", "que recibo", "contenido"],
    respuesta:
      "Recibes la masterclass completa en módulos, la Biblia Publicitaria completa (59 documentos, el bono estrella), la baraja de GPTs de mi proceso, todas las plantillas del sistema, la comunidad con soporte por 30 días y una llamada grupal de seguimiento al día 14. La versión en vivo suma la sesión Q&A y la revisión de tu primer proyecto conmigo.",
  },
  {
    id: "v-garantia",
    claves: ["garant", "devol", "devuel", "reembols", "dinero", "riesgo"],
    respuesta:
      "El grabado tiene 7 días de garantía: si entras, lo ves y no es para ti, te devuelvo el dinero completo, sin preguntas. En el vivo la garantía es aún más fuerte: asiste, aplica el sistema, y si en 7 días no produces tu primer spot con IA, te devuelvo el 100%.",
  },
  {
    id: "v-para-quien",
    claves: ["es para mi", "para quien", "me sirve", "sirve para mi", "principiante", "sin experiencia", "no se de publicidad", "desde cero"],
    respuesta:
      "Es para ti si vives de crear contenido o quieres vivir de eso: creativos, community managers, editores, freelancers, y también dueños de agencias chicas o emprendedores con marca propia. No necesitas saber de publicidad ni tener experiencia: el sistema incluye toda la parte estratégica y empiezas desde cero. Si solo tienes curiosidad por la IA sin querer producir de verdad, quizá no es para ti.",
  },
  {
    id: "v-vivo-vs-grabado",
    claves: ["vivo o grabado", "diferencia", "cual elijo", "cual me conviene", "vivo vs", "grabado vs"],
    respuesta:
      "El grabado ($150) es el mismo contenido para verlo a tu ritmo, cuando quieras, de por vida. El vivo ($250) es una cohorte con fecha fija donde lo vemos juntos en ~4.5 horas, con sesión de preguntas en directo y revisión grupal de TU proyecto — y además te llevas el grabado de por vida. Si quieres acompañamiento y feedback directo, el vivo; si prefieres ir solo a tu ritmo, el grabado.",
  },
  {
    id: "v-herramientas",
    claves: ["herramientas", "que necesito", "requisitos", "higgsfield", "claude", "chatgpt", "programas", "stack"],
    respuesta:
      "Son cuatro: el plan básico de Higgsfield, el plan básico de Claude Code, una cuenta de ChatGPT de pago para la baraja de GPTs, y CapCut + Canva para edición y diseño (Pro recomendado). Todo junto cuesta menos que una cena de negocios al mes, y un solo cliente lo paga por un año. Dentro te doy la lista completa con precios y el orden en que conviene contratar cada cosa. Si ya pagas alguna herramienta de IA, vas con ventaja.",
  },
  {
    id: "v-acceso",
    claves: ["como accedo", "despues de pagar", "como entro", "como ingreso", "contrasena", "password", "recibo el acceso"],
    respuesta:
      "Apenas confirmes tu pago te enviamos por correo la contraseña de acceso. Con ella entras al portal desde el botón «Ya soy alumno» (arriba a la derecha) y ves el curso y, si compraste el vivo, la transmisión. El acceso es de por vida.",
  },
  {
    id: "v-cerebro",
    claves: ["cerebro creativo", "cerebro", "que es lo que ensenas", "que aprendo", "mecanismo", "diferente"],
    respuesta:
      "El corazón de la masterclass es el Cerebro Creativo IA: un proceso que inventé para que la IA piense y responda como un director creativo con 20 años de experiencia dentro de tu negocio. No es apretar botones ni un prompt suelto: es el paso estratégico que va ANTES de producir, el que las agencias cobran más caro. Eso no lo vas a encontrar en ningún otro curso.",
  },
  {
    id: "v-biblia",
    claves: ["biblia", "59 documentos", "60 documentos", "59 docs", "documentos"],
    respuesta:
      "La Biblia Publicitaria son los 59 documentos que le enseñan a la IA todo el oficio del director creativo — el mismo material que alimenta mi sistema. Te la llevas COMPLETA con tu compra. Es el bono estrella: por sí sola justifica el precio.",
  },
  {
    id: "v-comercial",
    claves: ["uso comercial", "comercialmente", "vender lo que", "cobrar por lo que", "clientes reales", "derechos"],
    respuesta:
      "Sí, puedes usar comercialmente todo lo que produzcas: las plataformas del stack lo permiten en sus planes de pago. De hecho, el tercer acto de la masterclass es exactamente cómo cobrar por esto — un proyecto con este sistema se ofrece a empresas desde $2,000.",
  },
  {
    id: "v-upgrade",
    claves: ["upgrade", "subir al vivo", "del grabado al vivo", "cambiar al vivo", "100"],
    respuesta:
      "Si compras el grabado y luego quieres el acompañamiento en vivo, subes a la cohorte por solo $100 más (la diferencia). Ganas la sesión de Q&A y la revisión de tu primer proyecto conmigo.",
  },
];

// ── Buscador offline ──────────────────────────────────────────
function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function buscar(base: Entrada[], q: string): Entrada | null {
  let mejor: Entrada | null = null;
  let mejorPuntaje = 0;
  for (const e of base) {
    let puntaje = 0;
    for (const clave of e.claves) {
      if (q.includes(clave)) puntaje += clave.includes(" ") ? 2 : 1;
    }
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje;
      mejor = e;
    }
  }
  return mejor;
}

// ── Conocimiento derivado del catálogo real ───────────────────
// Se genera solo desde TALLER.cursos: cada curso, módulo o lección que
// se suba a content.ts queda respondible sin escribir nada aquí.
// SOLO se usa en modo "curso": en modo "ventas" no se revela el detalle
// de módulos (regla de posicionamiento de la landing).

const VACIAS = new Set([
  "de", "la", "el", "los", "las", "tu", "tus", "un", "una", "y", "o", "al",
  "del", "en", "con", "para", "por", "que", "como", "lo", "se", "es", "mas",
  "modulo", "parte", "curso", "clase",
]);

// Quita el prefijo "Módulo 3 — " o "PARTE 1 — " para que el número no
// se convierta en palabra clave (haría match con cualquier pregunta).
function sinPrefijo(titulo: string): string {
  return titulo.replace(/^\s*(m[oó]dulo|parte)\s*\d+\s*[—–-]?\s*/i, "");
}

function palabrasClave(titulo: string): string[] {
  const limpio = sinPrefijo(titulo);
  const base = normalizar(limpio);
  const sueltas = base
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((p) => p.length > 3 && !VACIAS.has(p));
  return [...new Set([base, ...sueltas])].filter(Boolean);
}

let cacheCatalogo: Entrada[] | null = null;

export function conocimientoDelCatalogo(): Entrada[] {
  if (cacheCatalogo) return cacheCatalogo;

  const entradas: Entrada[] = [];
  const cursos = TALLER.cursos.filter((c) => c.disponible);

  // Índice general: qué cursos existen y qué tan grandes son.
  entradas.push({
    id: "catalogo",
    claves: [
      "que cursos", "cursos hay", "catalogo", "classroom", "que clases",
      "cuantos modulos", "cuantas lecciones", "temario", "contenido del curso",
    ],
    respuesta:
      "Esto es lo que hay en tu Classroom ahora mismo:\n\n" +
      cursos
        .map((c) => {
          const mods = c.modulos.filter((m) => m.disponible);
          const lecs = mods.flatMap((m) => m.lecciones).length;
          return `• ${c.titulo} — ${mods.length} módulos, ${lecs} lecciones`;
        })
        .join("\n") +
      "\n\nEntra a Cursos en el menú de arriba para abrirlos.",
  });

  for (const curso of cursos) {
    const mods = curso.modulos.filter((m) => m.disponible);

    entradas.push({
      id: `curso-${curso.slug}`,
      claves: [...palabrasClave(curso.titulo), curso.slug.replace(/-/g, " ")],
      respuesta:
        `${curso.titulo}\n\n${curso.descripcion}\n\nMódulos:\n` +
        mods.map((m) => `• ${m.titulo}`).join("\n"),
    });

    for (const modulo of mods) {
      entradas.push({
        id: `modulo-${curso.slug}-${normalizar(sinPrefijo(modulo.titulo)).replace(/\s+/g, "-")}`,
        claves: palabrasClave(modulo.titulo),
        respuesta:
          `${modulo.titulo} — de ${curso.titulo}.\n\n${modulo.descripcion}\n\nLecciones:\n` +
          modulo.lecciones
            .map((l) => `• ${l.titulo}${l.youtubeId ? "" : " · disponible pronto"}`)
            .join("\n"),
      });
    }
  }

  cacheCatalogo = entradas;
  return entradas;
}

// modo "ventas" → responde desde la landing (info para decidir la compra).
// modo "curso"  → responde a profundidad (solo para alumnos, adentro).
export function responder(
  pregunta: string,
  modo: "ventas" | "curso" = "curso",
): { respuesta: string; id: string } {
  const q = normalizar(pregunta);
  const base = modo === "ventas" ? CONOCIMIENTO_VENTAS : CONOCIMIENTO;
  // Primero la libreta escrita a mano (respuestas curadas), y solo si
  // ninguna aplica se consulta el catálogo real de cursos.
  const mejor =
    buscar(base, q) ?? (modo === "curso" ? buscar(conocimientoDelCatalogo(), q) : null);
  if (mejor) return { respuesta: mejor.respuesta, id: mejor.id };
  if (modo === "ventas") {
    return {
      respuesta:
        "Buena pregunta. Aquí te ayudo a decidir si la masterclass es para ti — pregúntame por el precio, qué incluye, la garantía, si es para tu caso, o la diferencia entre el grabado y el vivo. El detalle a fondo de cada módulo lo ves cuando entres como alumno. Y si quieres, escríbele a Manuel por WhatsApp para dudas específicas de tu proyecto.",
      id: "fallback-ventas",
    };
  }
  return {
    respuesta:
      "Esa no la tengo en mi libreta todavía 😅 Prueba preguntarme por: el Cerebro Creativo, la Biblia, las herramientas que necesitas, precios y garantía, por dónde empezar, cómo cobrar, consistencia de personajes, animación, o los casos reales. Y si es algo muy específico de tu proyecto, guárdalo para la sesión Q&A del vivo o la llamada de seguimiento del día 14.",
    id: "fallback",
  };
}

// ── Preguntas rápidas (chips del panel) ───────────────────────
export const PREGUNTAS_RAPIDAS = [
  "¿Por dónde empiezo?",
  "¿Qué es el Cerebro Creativo?",
  "¿Qué herramientas necesito?",
  "¿Cuánto cobro por un proyecto?",
];

export const PREGUNTAS_RAPIDAS_VENTAS = [
  "¿Qué incluye?",
  "¿Cuánto cuesta?",
  "¿Es para mí?",
  "¿En vivo o grabado?",
];

// ── Consejos según el avance del alumno ───────────────────────
export const CONSEJOS: Record<"arranque" | "progreso" | "avanzado" | "completo", string[]> = {
  arranque: [
    "Empieza por la PARTE 0 y no te saltes el ACTO 1. La estrategia es el paso que las agencias cobran más caro — y es lo que hace que tu contenido no se vea genérico.",
    "Antes de tu primera lección, elige una marca o producto real (tuyo o de alguien que conozcas). Todo lo que aprendas, aplícalo sobre ese caso: aprender produciendo vale el doble.",
    "Descarga la Biblia Publicitaria apenas esté disponible en Recursos: son los 59 documentos que alimentan el sistema, y vas a usarlos desde la PARTE 2.",
  ],
  progreso: [
    "Ritmo sugerido: una parte por día. En una semana tienes el sistema completo y tu primer spot producido.",
    "Cuando llegues a la PARTE 2, construye el Cerebro Creativo con TU marca real, no con un ejemplo inventado. Ese mismo cerebro te sirve después para vender.",
    "En la PARTE 3, la hoja de personaje es tu mejor amiga: resuelve el problema #1 de la IA (que el producto y el personaje cambien en cada toma). No la saltes.",
    "Guarda cada pieza que generes, incluso las fallidas: comparar versiones es la forma más rápida de educar tu criterio de dirección.",
  ],
  avanzado: [
    "Ya pasaste la mitad. Cuando termines la PARTE 3, ya puedes producir tu primer spot completo — no esperes a «saberlo todo» para empezar.",
    "En la PARTE 4, mira los casos con ojo de negocio: qué pidió el cliente, qué se produjo y qué habría costado por vía tradicional. Ese es tu argumento de venta.",
    "Tu primer spot terminado ES tu carta de presentación. Prodúcelo para una marca que conozcas y úsalo para conseguir tu primer cliente pagado.",
  ],
  completo: [
    "¡Sistema completo! 🎉 Ahora aplica la PARTE 5: define tu oferta, tu precio (recuerda el ancla: proyectos desde $2,000) y ejecuta tu plan de 30 días.",
    "Prepara tu pitch de 60 segundos y preséntalo en la llamada de seguimiento del día 14 — es el mejor lugar para pulirlo con feedback real.",
    "Vuelve a la PARTE 2 con tu segundo cliente: cada Cerebro Creativo nuevo te toma la mitad del tiempo que el anterior.",
  ],
};
