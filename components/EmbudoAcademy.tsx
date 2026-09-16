"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import LandingPortafolio from "@/components/LandingPortafolio";
import { eventoMeta } from "@/lib/meta/evento";
import { TALLER } from "@/lib/taller/content";

/**
 * EMBUDO DE LEADS CALIFICADOS — /empezar
 *
 * La landing completa servida por pasos. NO es una versión recortada:
 * lleva todo lo que tiene /masterclass (el VSL, los logos, las tres
 * tarjetas de problema, las cinco partes del método, los seis
 * entregables, el portafolio, las marcas, quién enseña y las FAQ),
 * reordenado para que el visitante avance respondiendo.
 *
 * La mecánica: las tres preguntas hacen dos trabajos a la vez.
 *   1. El visitante reconoce su problema antes de ver el precio, que es
 *      el orden de una llamada de venta.
 *   2. Manuel recibe el lead calificado — qué produce hoy, qué le duele
 *      y cuánto vale un cliente para él — así abre la conversación por
 *      el problema y no con un "hola".
 *
 * Decisión de contenido: las OPCIONES de la pregunta 2 son las tres
 * tarjetas de problema de la landing, y al elegir una su texto se
 * convierte en el espejo. El contenido no se pierde: se usa dentro de
 * la mecánica en vez de quedar en una sección que nadie lee.
 *
 * RUTEO: el paso final cambia según la calificación. Quien tiene equipo
 * o ticket alto ve además la puerta del in-company; el resto ve solo el
 * acceso de $99, para no ensuciar la decisión.
 *
 * Cada paso se ancla en una pieza real del portafolio — no en
 * ilustraciones: el producto se demuestra mientras se explica.
 */

const POSTER = "/images/portfolio/posters";

/** Volumen y variedad de trabajo real, de un golpe. */
const MOSAICO = [
  "comercial-06",
  "story-05",
  "producto-02",
  "comercial-09",
  "story-11",
  "comercial-04",
  "producto-04",
  "story-10",
];

const MARCAS = [
  "WIN Internet",
  "Wong",
  "BCP",
  "Cencosud",
  "Interbank",
  "Livoltek",
  "San Fernando",
  "Holcim",
  "Redondos",
  "BYD",
  "Wellmax",
  "Costa",
];

// ── Pregunta 1 ────────────────────────────────────────────────
const P1 = {
  eyebrow: "Pregunta 1 de 3",
  titulo: "¿Quién produce tu contenido hoy?",
  ayuda: "Sin juicio: es para saber de dónde partes.",
  img: "producto-06",
  opciones: [
    { id: "nadie", label: "Nadie. Publico cuando me acuerdo" },
    { id: "yo", label: "Yo mismo, como puedo" },
    { id: "tercero", label: "Una agencia o un freelance" },
    { id: "equipo", label: "Tengo equipo o produzco para otros" },
  ],
};

const ESPEJO: Record<string, { titulo: string; texto: string; img: string }> = {
  nadie: {
    titulo: "Entonces tu marca depende de que te acuerdes.",
    texto:
      "Y cuando te acuerdas, ya es tarde o estás cansado. El problema de publicar por impulso no es la frecuencia: es que cada pieza arranca de cero, sin una idea que las una. Así ninguna construye sobre la anterior.",
    img: "producto-01",
  },
  yo: {
    titulo: "Entonces le metes horas que no te pagan.",
    texto:
      "Produces tú, decides tú, editas tú — y al final publicas algo que no se parece al nivel de lo que vendes. No es falta de esfuerzo: estás haciendo el trabajo de tres personas sin el sistema de ninguna.",
    img: "producto-07",
  },
  tercero: {
    titulo: "Entonces ya sabes lo que cuesta y lo que no llega.",
    texto:
      "Pagas todos los meses y recibes piezas bien hechas que no dicen nada tuyo. Pasa porque le encargaste la producción a alguien que no tiene tu criterio de negocio — y el criterio no se terceriza.",
    img: "producto-03",
  },
  equipo: {
    titulo: "Entonces tu problema no es producir: es diferenciarte.",
    texto:
      "Ya sabes ejecutar y probablemente cobras por hacerlo. Lo que aprieta es que cualquiera con las mismas herramientas ofrece lo mismo más barato, y sin un método propio la conversación siempre termina en precio.",
    img: "comercial-08",
  },
};

// ── Pregunta 2 · son las tres tarjetas de problema de la landing ──
const P2 = {
  eyebrow: "Pregunta 2 de 3",
  titulo: "¿Qué te frustra más ahora mismo?",
  ayuda: "Elige la que más te suene a ti.",
  img: "problem-section-bg",
  opciones: [
    { id: "que", label: "Generas, pero no sabes qué generar" },
    { id: "igual", label: "Todo te sale parecido a todo" },
    { id: "novende", label: "Se ve bien, pero no me compra nadie" },
    { id: "cobrar", label: "No sabes qué cobrar" },
  ],
};

/** El texto largo de cada problema: es el de las tarjetas de la landing. */
const PROBLEMA: Record<string, { titulo: string; texto: string; img: string }> = {
  que: {
    titulo: "La herramienta está lista antes que tú.",
    texto:
      "Te sientas frente a un proyecto real y el cursor parpadea. No es que te falte la herramienta: es que nadie te enseñó qué pedirle. El trabajo que decide la pieza ocurre antes de escribir el primer prompt.",
    img: "story-02",
  },
  igual: {
    titulo: "Bonitas y olvidables.",
    texto:
      "Las piezas quedan bien y ninguna se recuerda. Sin un concepto detrás, la IA devuelve el promedio de internet — porque es literalmente lo que aprendió. La diferencia la pone la dirección, no el modelo.",
    img: "comercial-09",
  },
  novende: {
    titulo: "Se ve bien y no mueve nada.",
    texto:
      "Publicas piezas correctas y el teléfono no suena. Eso pasa cuando la pieza es bonita pero no dice nada que a tu cliente le importe: falta el insight, y sin insight no hay compra.",
    img: "comercial-06",
  },
  cobrar: {
    titulo: "Lo hiciste rápido, y sientes que vale poco.",
    texto:
      "Como te tomó dos horas, terminas cobrando la herramienta en vez del criterio. El cliente no paga tus horas: paga el problema que le resuelves. Y eso se aprende a nombrar y a poner en una propuesta.",
    img: "story-03",
  },
};

// ── Pregunta 3 · calificación comercial ───────────────────────
const P3 = {
  eyebrow: "Pregunta 3 de 3",
  titulo: "¿Cuánto te deja un cliente nuevo?",
  ayuda: "Te lo pregunto para decirte con franqueza si esto te conviene o no.",
  img: "producto-02",
  opciones: [
    { id: "no-se", label: "No lo tengo medido", nota: "Y eso ya es un dato" },
    { id: "bajo", label: "Menos de $300" },
    { id: "medio", label: "Entre $300 y $1,000" },
    { id: "alto", label: "Más de $1,000" },
  ],
};

/** Lo que el ticket cambia. Cierra el diagnóstico usando la pregunta 3. */
const TICKET: Record<string, string> = {
  "no-se":
    "Y que no lo tengas medido es parte del problema: sin ese número no puedes saber si una inversión se paga, ni qué cobrar por tu trabajo. Es lo primero que se calcula en la parte de Cobrar.",
  bajo:
    "Con ese ticket, lo que más te conviene no es producir más piezas: es subir el valor de lo que vendes. La parte de Cobrar es la que te va a servir antes que ninguna otra.",
  medio:
    "Con ese ticket, un solo cliente nuevo paga el acceso de todo un año. La pregunta ya no es si conviene, es cuánto tardas en conseguir ese cliente.",
  alto:
    "Con ese ticket, una sola pieza mejor hecha te devuelve el año entero. En tu caso el costo de no tener esto resuelto es mucho más alto que el de resolverlo.",
};

// ── Diagnóstico ───────────────────────────────────────────────
type Diag = { perfil: string; titulo: string; texto: string; ruta: string[]; img: string };

const DIAGNOSTICOS: Record<string, Diag> = {
  novende: {
    perfil: "Te falta el criterio",
    titulo: "El problema no era la herramienta.",
    texto:
      "Producir algo bonito que nadie compra es la señal más clara de que falta el trabajo de antes: el insight, el concepto y la razón por la que a alguien debería importarle. Eso ocurre antes de abrir cualquier herramienta, y es lo que las agencias cobran caro.",
    ruta: [
      "Empieza por PENSAR: el insight y sus seis tipos",
      "Sigue con EL SISTEMA: ese criterio dentro de tu Cerebro Creativo",
      "Y recién ahí CREAR, con algo que decir",
    ],
    img: "comercial-06",
  },
  que: {
    perfil: "Te falta el sistema",
    titulo: "No es falta de ideas. Es falta de sistema.",
    texto:
      "Publicar cuando se te ocurre algo agota a cualquiera, y se nota en el resultado. El sistema convierte tu estrategia en una grilla decidida de antemano: el mes entero definido en una sola sesión de trabajo.",
    ruta: [
      "Empieza por EL SISTEMA: tu Cerebro Creativo con el ADN de tu marca",
      "Baja la estrategia a una grilla con fecha y formato",
      "Después CREAR, que ya sabrás qué producir",
    ],
    img: "story-02",
  },
  igual: {
    perfil: "Te falta dirección",
    titulo: "Estás generando al azar, no dirigiendo.",
    texto:
      "Que todo salga parecido no es culpa del modelo: el prompt no dicta cámara, luz ni intención, y sin eso la IA rellena con el promedio de internet. Se arregla dirigiendo, y fijando lo que no puede cambiar entre pieza y pieza.",
    ruta: [
      "Empieza por CREAR: el prompt semiótico y las cuatro palancas",
      "Fija tu personaje para que no cambie de cara entre planos",
      "Vuelve a PENSAR: dirigir empieza por tener algo que decir",
    ],
    img: "comercial-09",
  },
  cobrar: {
    perfil: "Te falta cobrarlo",
    titulo: "Sabes producir. Te falta convertirlo en negocio.",
    texto:
      "El problema no es tu pieza: es que no tienes una oferta, un precio ni una conversación de venta. Producir mejor te da con qué vender, no a quién venderle. Eso se arma, y es la parte que casi nadie enseña.",
    ruta: [
      "Empieza por COBRAR: la oferta y el precio como señal",
      "Las doce preguntas que hacen que el cliente se venda solo",
      "El guion de la llamada y cómo se responde cada objeción",
    ],
    img: "story-03",
  },
};

// ── Las cinco partes del método (las de la landing) ───────────
const PARTES = [
  {
    n: "01",
    title: "Pensar",
    img: `${POSTER}/story-03.jpg`,
    text: "El protocolo del director creativo: insight, concepto, Big Idea, retórica y las estructuras narrativas que sostienen una campaña.",
  },
  {
    n: "02",
    title: "El sistema",
    img: "/images/portfolio/design/design-03.jpg",
    text: "Dónde vive el Cerebro Creativo y cómo se instala. Los GPTs de mi proceso, las plantillas y el día a día real de trabajo.",
  },
  {
    n: "03",
    title: "Crear",
    img: `${POSTER}/comercial-01.jpg`,
    text: "Producción completa con IA hasta el video final. Sin cámara, sin productora y sin equipo de rodaje.",
  },
  {
    n: "04",
    title: "Casos",
    img: `${POSTER}/producto-02.jpg`,
    text: "Campañas que produje y entregué, abiertas de principio a fin: el brief, lo que se descartó y la pieza que salió al aire.",
  },
  {
    n: "05",
    title: "Cobrar",
    img: `${POSTER}/ugc-02.jpg`,
    text: "Cómo se arma la oferta, qué se cobra y cómo se presenta para que el precio no sea la conversación.",
  },
];

// ── Los seis entregables (los de la landing) ──────────────────
const LLEVAS = [
  {
    label: "La Biblia Publicitaria",
    img: "/images/portfolio/design/design-06.jpg",
    text: "Cincuenta y nueve documentos: el cuerpo de conocimiento con el que trabajo. Es el bono que más pesa y no se vende aparte.",
    estrella: true,
  },
  {
    label: "Las plantillas del sistema",
    img: "/images/portfolio/design/design-09.jpg",
    text: "Los formatos que uso para bajar un brief a insight, concepto y guion sin empezar de cero cada vez.",
  },
  {
    label: "Los casos reales",
    img: `${POSTER}/comercial-06.jpg`,
    text: "Campañas producidas y cobradas, con el proceso a la vista. Incluye lo que no funcionó.",
  },
  {
    label: "IA en Acción",
    img: `${POSTER}/avatar-02.jpg`,
    text: "La ejecución paso a paso: Seedance, Kling, personajes consistentes, edición y casos de clientes.",
  },
  {
    label: "La comunidad y la sesión mensual",
    img: `${POSTER}/story-07.jpg`,
    text: "El grupo donde se resuelve lo de cada quien, y una sesión en vivo al mes donde reviso piezas de los alumnos.",
  },
  {
    label: "Todo lo que se publique mientras estés dentro",
    img: `${POSTER}/producto-05.jpg`,
    text: "Las herramientas cambian cada mes y el material también: guías nuevas, artículos del proceso y las actualizaciones del stack.",
  },
];

const ETIQUETAS: Record<string, string> = {
  nadie: "nadie produce su contenido",
  yo: "lo produce él mismo",
  tercero: "paga agencia o freelance",
  equipo: "tiene equipo / produce para otros",
  que: "no sabe qué generar",
  igual: "todo le sale parecido",
  novende: "se ve bien y no vende",
  cobrar: "no sabe qué cobrar",
  "no-se": "no mide el valor de un cliente",
  bajo: "cliente < $300",
  medio: "cliente $300–1,000",
  alto: "cliente > $1,000",
};

const PASOS = 10;

/**
 * Barra de avance inferior: en los pasos largos (el método, los
 * entregables) el botón quedaba al fondo del scroll y no se entendía que
 * había que seguir. Ahora la acción está siempre a la vista y dice a
 * dónde lleva. En los pasos de pregunta no hay botón — la acción es
 * elegir — y la barra lo explica.
 */
const NAV: Record<number, { label: string } | { pregunta: true } | null> = {
  0: null, // el hero tiene su propio botón grande
  1: { pregunta: true },
  2: { label: "Siguiente pregunta" },
  3: { pregunta: true },
  4: { label: "Última pregunta" },
  5: { pregunta: true },
  6: { label: "Ver la prueba" },
  7: { label: "Ver cómo se aprende" },
  8: { label: "Ver quién enseña y el precio" },
  9: null, // el cierre: la acción es el pago, que ya es prominente
};

export default function EmbudoAcademy() {
  const [paso, setPaso] = useState(0);
  const cajaPaso = useRef<HTMLDivElement>(null);
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");
  const [r3, setR3] = useState("");
  const [faqAbierta, setFaqAbierta] = useState<number | null>(0);

  const [verCorreo, setVerCorreo] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const { gate, whatsapp } = TALLER;
  const prod = gate.productos.grabado;
  const inco = gate.productos.mentoria;
  const diag = r2 ? DIAGNOSTICOS[r2] : null;
  const prob = r2 ? PROBLEMA[r2] : null;

  const esAlto = r1 === "equipo" || r3 === "alto";

  /* Cambiar de paso siempre deja al lector arriba del nuevo paso: si no,
     al salir de un paso largo se aterriza a mitad del siguiente. */
  const irA = (n: number) => {
    setPaso(Math.min(Math.max(n, 0), PASOS - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const avanzar = () => irA(paso + 1);

  /* Al cambiar de paso el foco se queda donde estaba el boton que acaba de
     desaparecer. Lo llevamos al paso nuevo para que el teclado y el lector
     de pantalla sigan el recorrido. */
  useEffect(() => {
    if (paso === 0) return;
    cajaPaso.current?.focus({ preventScroll: true });
  }, [paso]);

  /* Llegar al diagnostico es haber contestado las tres preguntas: ese es el
     lead calificado y es por lo que la pauta tiene que optimizar. */
  const avisoDiagnostico = useRef(false);
  useEffect(() => {
    if (paso !== 6 || avisoDiagnostico.current) return;
    avisoDiagnostico.current = true;
    eventoMeta("CompleteRegistration", { contentName: "Diagnóstico del embudo" });
  }, [paso]);

  const perfilTexto = [r1 && ETIQUETAS[r1], r2 && ETIQUETAS[r2], r3 && ETIQUETAS[r3]]
    .filter(Boolean)
    .join(" · ");

  const waHref = `${whatsapp}?text=${encodeURIComponent(
    diag
      ? `Hola Manuel. Hice el diagnóstico y me salió "${diag.perfil}". Mi situación: ${perfilTexto}. Quiero entrar a la Academy.`
      : "Hola Manuel, quiero entrar a RESUELTO Academy",
  )}`;

  const waInco = `${whatsapp}?text=${encodeURIComponent(
    `Hola Manuel. Hice el diagnóstico (${diag?.perfil ?? "—"}) y me interesa el programa para mi equipo. Mi situación: ${perfilTexto}.`,
  )}`;

  /* El clic al pago es el evento que mas vale: sin `value` Meta solo puede
     optimizar por volumen de clics, no por retorno. */
  function irAlPago() {
    // Sin pasarela el boton lleva a WhatsApp, y ese clic ya lo cuenta como
    // Lead el listener global del Pixel: no es un checkout.
    if (!prod.hotmartUrl) return;
    eventoMeta("InitiateCheckout", {
      contentName: prod.nombre,
      value: Number(prod.precio.replace(/[^\d.]/g, "")) || undefined,
      currency: "USD",
    });
  }

  async function enviarCorreo(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      const res = await fetch("/api/taller/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          web,
          producto: esAlto ? "Embudo /empezar · LEAD ALTO" : "Embudo /empezar",
          diagnostico: diag?.perfil ?? "",
          respuestas: perfilTexto,
        }),
      });
      const data = await res.json().catch(() => null);
      if (data?.ok) {
        setEnviado(true);
        eventoMeta("Lead", { contentName: "Correo del embudo" });
      }
      else setError(data?.error || "No se pudo enviar. Escríbeme por WhatsApp.");
    } catch {
      setError("No se pudo enviar. Escríbeme por WhatsApp.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="emb">
      <div className="emb-barra" aria-hidden>
        <span className="emb-barra-fill" style={{ width: `${((paso + 1) / PASOS) * 100}%` }} />
      </div>

      <div className="container-base emb-wrap">
        <div key={paso} ref={cajaPaso} tabIndex={-1} className="emb-paso">
            {/* ── 0 · GANCHO: mosaico, VSL y credenciales ── */}
            {paso === 0 && (
              <div className="emb-hero">
                <div className="emb-mosaico" aria-hidden>
                  {MOSAICO.map((p, i) => (
                    <span key={p} className="emb-mos-item">
                      <Image
                        src={`${POSTER}/${p}.jpg`}
                        alt=""
                        width={320}
                        height={480}
                        sizes="(max-width: 900px) 24vw, 170px"
                        priority={i < 4}
                      />
                    </span>
                  ))}
                </div>

                <div className="emb-hero-txt">
                  <span className="hm-eyebrow">Dirección creativa con IA — RESUELTO Academy</span>
                  <h1 className="emb-h1">
                    Ya sabes generar.
                    <br />
                    <span className="hm-grad">Te falta dirigir.</span>
                  </h1>
                  <p className="emb-sub">
                    Todas esas piezas las produje con el método que enseño. Sin rodaje, sin
                    set y sin equipo. Lo que decide si una funciona ocurre{" "}
                    <strong>antes</strong> de abrir cualquier herramienta.
                  </p>

                  {/* El VSL: la pieza que más vende cuando esté grabado.
                      Mientras no lo esté, el hueco solo se ve en desarrollo:
                      en la landing de pauta no puede aparecer una caja vacía. */}
                  {gate.vslYoutubeId ? (
                    <div className="emb-vsl">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${gate.vslYoutubeId}`}
                        title="RESUELTO Academy — Masterclass de Creatividad Publicitaria IA"
                        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    process.env.NODE_ENV !== "production" && (
                      <div className="emb-vsl">
                        <div className="emb-vsl-hueco">
                          <strong>Aquí va el VSL</strong>
                          <span>Pon el ID de YouTube en TALLER.gate.vslYoutubeId</span>
                        </div>
                      </div>
                    )
                  )}

                  <button type="button" className="emb-cta" onClick={avanzar}>
                    Empezar el diagnóstico →
                  </button>
                  <p className="emb-nota">Tres preguntas · sin registro · 1 minuto</p>
                  <p className="emb-cred">{gate.credenciales}</p>
                </div>
              </div>
            )}

            {/* ── 1 · PREGUNTA 1 ── */}
            {paso === 1 && <Pregunta data={P1} onElegir={(id) => { setR1(id); avanzar(); }} />}

            {/* ── 2 · ESPEJO + las marcas de donde sale el método ── */}
            {paso === 2 && r1 && (
              <>
                <Split img={ESPEJO[r1].img} alt="Pieza producida con el método">
                  <span className="hm-eyebrow">Lo que suele pasar</span>
                  <h2 className="emb-h2">{ESPEJO[r1].titulo}</h2>
                  <p className="emb-txt">{ESPEJO[r1].texto}</p>
                </Split>
                <div className="emb-logos">
                  <p className="emb-logos-lbl">El método sale de campañas reales para estas marcas</p>
                  <div className="emb-logos-row">
                    {MARCAS.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── 3 · PREGUNTA 2 (las tarjetas de problema) ── */}
            {paso === 3 && <Pregunta data={P2} onElegir={(id) => { setR2(id); avanzar(); }} />}

            {/* ── 4 · EL PROBLEMA, AMPLIADO ── */}
            {paso === 4 && prob && (
              <Split img={prob.img} alt="Pieza producida con el método">
                <span className="hm-eyebrow">Tu problema, en concreto</span>
                <h2 className="emb-h2">{prob.titulo}</h2>
                <p className="emb-txt">{prob.texto}</p>
              </Split>
            )}

            {/* ── 5 · PREGUNTA 3 · calificación ── */}
            {paso === 5 && <Pregunta data={P3} onElegir={(id) => { setR3(id); avanzar(); }} />}

            {/* ── 6 · DIAGNÓSTICO: usa las tres respuestas ── */}
            {paso === 6 && diag && (
              <Split img={diag.img} alt="Pieza producida con el método">
                <span className="hm-eyebrow">Tu diagnóstico</span>
                <h2 className="emb-perfil">{diag.perfil}</h2>
                <p className="emb-diag-tit">{diag.titulo}</p>
                <p className="emb-txt">{diag.texto}</p>
                {r3 && <p className="emb-ticket">{TICKET[r3]}</p>}
                <p className="emb-sub-lbl">Tu ruta, en este orden</p>
                <ol className="emb-ruta">
                  {diag.ruta.map((x, i) => (
                    <li key={x}>
                      <span className="emb-ruta-n">{i + 1}</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ol>
              </Split>
            )}

            {/* ── 7 · LA PRUEBA: portafolio, marcas y clientes ── */}
            {paso === 7 && (
              <div className="emb-full">
                <span className="hm-eyebrow">La prueba</span>
                <h2 className="emb-h2">Piezas como estas, hechas por ti.</h2>
                <p className="emb-txt">
                  Todo lo que ves acá lo produje con las herramientas y el método que
                  enseño. Dale play a cualquiera.
                </p>
                <div className="emb-pf">
                  <LandingPortafolio />
                </div>
                <figure className="emb-marcas">
                  <Image
                    src="/images/portfolio/slide-06.png"
                    alt="Marcas con las que ha trabajado RESUELTO: BCP, San Fernando, Holcim, BYD, Interbank, Costa, Footloose y más"
                    width={1621}
                    height={902}
                    sizes="(max-width: 900px) 100vw, 900px"
                  />
                </figure>
                <p className="emb-txt">
                  Y no es una demo de curso: este mismo sistema produce hoy el contenido de{" "}
                  <strong>Wellmax</strong>, <strong>WIN Internet</strong> y{" "}
                  <strong>Livoltek</strong>. Un proyecto así lo cobro desde $2,000.
                </p>
              </div>
            )}

            {/* ── 8 · EL MÉTODO Y LOS ENTREGABLES ── */}
            {paso === 8 && (
              <div className="emb-full">
                <span className="hm-eyebrow">El método</span>
                <h2 className="emb-h2">Cinco partes, en este orden.</h2>
                <p className="emb-txt">
                  El orden importa: primero se decide, después se ejecuta. Por eso tu ruta
                  del diagnóstico arranca donde arranca.
                </p>
                <div className="emb-partes">
                  {PARTES.map((p) => (
                    <article key={p.n} className="emb-parte">
                      <figure>
                        <Image src={p.img} alt={`Parte ${p.n}: ${p.title}`} width={480} height={300} sizes="(max-width: 700px) 100vw, 320px" />
                      </figure>
                      <p className="emb-parte-n">{p.n}</p>
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                    </article>
                  ))}
                </div>

                <span className="hm-eyebrow">Qué te llevas</span>
                <h2 className="emb-h2">Y todo esto viene incluido.</h2>
                <div className="emb-llevas">
                  {LLEVAS.map((l) => (
                    <article key={l.label} className={l.estrella ? "emb-lleva es-estrella" : "emb-lleva"}>
                      <figure>
                        <Image src={l.img} alt={l.label} width={480} height={300} sizes="(max-width: 700px) 100vw, 300px" />
                      </figure>
                      {l.estrella && <p className="emb-estrella">Bono estrella</p>}
                      <h3>{l.label}</h3>
                      <p>{l.text}</p>
                    </article>
                  ))}
                </div>

              </div>
            )}

            {/* ── 9 · QUIÉN ENSEÑA, FAQ, PRECIO Y PAGO ── */}
            {paso === 9 && (
              <div className="emb-cierre">
                <div className="emb-autor">
                  <Image
                    src={gate.instructor.foto}
                    alt={gate.instructor.nombre}
                    width={320}
                    height={320}
                    sizes="(max-width: 700px) 110px, 150px"
                  />
                  <div>
                    <p className="emb-autor-nombre">{gate.instructor.nombre}</p>
                    <p className="emb-autor-rol">{gate.instructor.rol}</p>
                    <p className="emb-txt">{gate.instructor.historia}</p>
                  </div>
                </div>

                <div className="emb-obj">
                  <p className="emb-obj-q">«¿Y esto no está gratis en YouTube?»</p>
                  <p className="emb-txt">
                    Los tutoriales de herramientas, sí — y te lo digo yo. Lo que no está es
                    el criterio: cómo se piensa la pieza antes de generarla y cómo se le
                    cobra a una marca. Eso no lo puede grabar alguien que no tiene clientes
                    que le paguen por hacerlo.
                  </p>
                </div>

                {/* Quien tiene equipo o cobra sobre $1,000 vale mucho mas por
                    in-company que por la suscripcion: esa puerta va antes del
                    precio, no enterrada detras de las dudas frecuentes. */}
                {esAlto && (
                  <div className="emb-inco">
                    <p className="emb-inco-lbl">Por lo que me contaste, esto te puede servir más</p>
                    <p className="emb-inco-tit">{inco.nombre}</p>
                    <p className="emb-txt">{inco.nota}</p>
                    <a href={waInco} target="_blank" rel="noopener noreferrer" className="emb-inco-cta">
                      {inco.cta} →
                    </a>
                  </div>
                )}

                <div className="emb-precio">
                  <span className="hm-eyebrow">Un solo precio</span>
                  <h2 className="emb-h2">{prod.precio} y tienes todo abierto.</h2>
                  <p className="emb-precio-local">
                    {prod.precioLocal} · {prod.nota}
                  </p>
                  <ul className="emb-benef">
                    {prod.beneficios.map((b) => (
                      <li key={b}>
                        <span className="emb-stack-check" aria-hidden>
                          ✓
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="emb-ancla">{gate.ancla}</p>

                  <div className="emb-pago">
                    {prod.hotmartUrl ? (
                      <a
                        href={prod.hotmartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="emb-cta emb-cta--pago"
                        onClick={irAlPago}
                      >
                        Entrar ahora por {prod.precio}
                      </a>
                    ) : (
                      <a href={waHref} target="_blank" rel="noopener noreferrer" className="emb-cta emb-cta--pago">
                        Entrar — escribirme por WhatsApp
                      </a>
                    )}
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="emb-wa">
                      Tengo una duda antes de pagar
                    </a>
                  </div>
                </div>

                <span className="hm-eyebrow">Dudas frecuentes</span>
                <div className="emb-faq">
                  {gate.faq.map((f, i) => (
                    <details
                      key={f.q}
                      open={faqAbierta === i}
                      onToggle={(e) => {
                        if ((e.currentTarget as HTMLDetailsElement).open) setFaqAbierta(i);
                      }}
                    >
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>


                <div className="emb-salida">
                  {!verCorreo && !enviado && (
                    <button type="button" className="emb-salida-link" onClick={() => setVerCorreo(true)}>
                      ¿No es para ti ahora? Te mando tu diagnóstico por correo
                    </button>
                  )}
                  {verCorreo && !enviado && (
                    <form className="emb-form" onSubmit={enviarCorreo}>
                      <div className="emb-form-row">
                        <input
                          id="emb-nombre"
                          type="text"
                          placeholder="Tu nombre"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          required
                          autoComplete="name"
                        />
                        <input
                          id="emb-email"
                          type="email"
                          placeholder="Tu correo"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </div>
                      <input
                        id="emb-web"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={web}
                        onChange={(e) => setWeb(e.target.value)}
                        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
                        aria-hidden
                      />
                      <button type="submit" className="emb-form-btn" disabled={enviando}>
                        {enviando ? "Enviando…" : "Mándame el diagnóstico"}
                      </button>
                      {error && <p className="emb-error">{error}</p>}
                    </form>
                  )}
                  {enviado && <p className="emb-ok">Listo, te llega en un momento.</p>}
                </div>
              </div>
            )}
        </div>

        {/* Acción siempre visible: en pasos largos el botón quedaba
            enterrado al final del scroll. */}
        {NAV[paso] && (
          <div className={`emb-nav${"pregunta" in NAV[paso]! ? " emb-nav--hint" : ""}`}>
            <span className="emb-nav-paso">
              Paso {paso + 1} de {PASOS}
            </span>
            {"pregunta" in NAV[paso]! ? (
              <span className="emb-nav-hint">Elige una opción para continuar</span>
            ) : (
              <button type="button" className="emb-nav-cta" onClick={avanzar}>
                {(NAV[paso] as { label: string }).label} →
              </button>
            )}
          </div>
        )}

        {/* El cierre es el paso mas largo: el pago se queda pegado abajo
            mientras se leen las dudas frecuentes. */}
        {paso === PASOS - 1 && (
          <div className="emb-nav emb-nav--pago">
            <span className="emb-nav-precio">
              <b>{prod.precio}</b> · acceso a todo · cancelas cuando quieras
            </span>
            <a
              href={prod.hotmartUrl || waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="emb-nav-cta"
              onClick={irAlPago}
            >
              {prod.hotmartUrl ? "Entrar ahora →" : "Escríbeme para entrar →"}
            </a>
          </div>
        )}

        <div className="emb-pie">
          {paso > 0 && (
            <button type="button" className="emb-atras" onClick={() => irA(paso - 1)}>
              ← Atrás
            </button>
          )}
          <a href="/masterclass" className="emb-todo">
            Prefiero verlo todo de una vez
          </a>
        </div>
      </div>
    </div>
  );
}

/** Paso a dos columnas: la pieza a un lado, el texto al otro. */
function Split({ img, alt, children }: { img: string; alt: string; children: React.ReactNode }) {
  return (
    <div className="emb-split">
      <figure className="emb-split-img">
        <Image
          src={`${POSTER}/${img}.jpg`}
          alt={alt}
          width={640}
          height={960}
          sizes="(max-width: 900px) 100vw, 380px"
        />
      </figure>
      <div className="emb-split-txt">{children}</div>
    </div>
  );
}

function Pregunta({
  data,
  onElegir,
}: {
  data: {
    eyebrow: string;
    titulo: string;
    ayuda: string;
    img: string;
    opciones: { id: string; label: string; nota?: string }[];
  };
  onElegir: (id: string) => void;
}) {
  return (
    <Split img={data.img} alt="Pieza producida con el método">
      <span className="hm-eyebrow">{data.eyebrow}</span>
      <h2 className="emb-h2">{data.titulo}</h2>
      <p className="emb-nota">{data.ayuda}</p>
      <div className="emb-ops">
        {data.opciones.map((o) => (
          <button key={o.id} type="button" className="emb-op" onClick={() => onElegir(o.id)}>
            <span>{o.label}</span>
            {o.nota && <i>{o.nota}</i>}
          </button>
        ))}
      </div>
    </Split>
  );
}
