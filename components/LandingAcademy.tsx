"use client";

import { motion } from "framer-motion";

import { NIVELES_VENTA, TALLER } from "@/lib/taller/content";

// ============================================================
// Landing de pauta de RESUELTO Academy.
//
// Misma arquitectura y las MISMAS clases de globals.css que
// LandingProduccionIA (lp-hero, lp-head, lp-prob, lp-metodo, lp-faq,
// lp-final). No se inventan clases nuevas: si algo hay que
// estilizarlo distinto, se hace con las que ya existen.
//
// Vende lo contrario que la de producción: allá contratas a la
// agencia, acá aprendes a hacerlo tú.
//
// Vive aparte de /taller a propósito. /taller es la página de venta
// completa con el menú del portal y los accesos de alumno; esta no
// tiene salidas: entras por un anuncio, ves el VSL, y el único clic
// posible es WhatsApp.
// ============================================================

const EASE = [0.16, 1, 0.3, 1] as const;

/* Mensaje propio de esta landing: en WhatsApp se distingue al toque si
   el lead vino de la pauta de Academy o de otro lado. */
const WA_MSG =
  "Hola, vi el video de la Masterclass de Creatividad Publicitaria IA y quiero saber cómo entrar.";

function waLink(): string {
  return `https://wa.me/51932844074?text=${encodeURIComponent(WA_MSG)}`;
}

function CtaBlock({ label, sub }: { label: string; sub?: string }) {
  return (
    <motion.div
      className="lp-cta-block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <a className="hm-btn hm-btn-lg" href={waLink()} target="_blank" rel="noopener noreferrer">
        {label} <i>→</i>
      </a>
      {sub && <p className="lp-cta-sub">{sub}</p>}
    </motion.div>
  );
}

/* ── Contenido ── */

const PROBLEMAS = [
  {
    label: "Generas, pero no sabes qué generar",
    text: "Te sientas frente a un proyecto real y la herramienta está lista antes que tú. El cursor parpadea y no sabes qué escribirle.",
  },
  {
    label: "Todo te sale parecido a todo",
    text: "Las piezas quedan bonitas y ninguna se recuerda. Sin un concepto detrás, la IA devuelve el promedio de internet.",
  },
  {
    label: "No sabes qué cobrar",
    text: "Como lo hiciste rápido, sientes que vale poco. Terminas cobrando la herramienta en vez del criterio.",
  },
];

const PARTES = [
  {
    n: "01",
    title: "Pensar",
    text: "El protocolo del director creativo: insight, concepto, Big Idea, retórica y las estructuras narrativas que sostienen una campaña.",
  },
  {
    n: "02",
    title: "El sistema",
    text: "Dónde vive el Cerebro Creativo y cómo se instala. Los GPTs de mi proceso, las plantillas y el día a día real de trabajo.",
  },
  {
    n: "03",
    title: "Crear",
    text: "Producción completa con IA hasta el video final. Sin cámara, sin productora y sin equipo de rodaje.",
  },
  {
    n: "04",
    title: "Casos",
    text: "Campañas que produje y entregué, abiertas de principio a fin: el brief, lo que se descartó y la pieza que salió al aire.",
  },
  {
    n: "05",
    title: "Cobrar",
    text: "Cómo se arma la oferta, qué se cobra y cómo se presenta para que el precio no sea la conversación.",
  },
];

const LLEVAS = [
  {
    label: "La Biblia Publicitaria",
    text: "Cincuenta y nueve documentos: el cuerpo de conocimiento con el que trabajo. Es el bono que más pesa y no se vende aparte.",
  },
  {
    label: "Las plantillas del sistema",
    text: "Los formatos que uso para bajar un brief a insight, concepto y guion sin empezar de cero cada vez.",
  },
  {
    label: "Los casos reales",
    text: "Campañas producidas y cobradas, con el proceso a la vista. Incluye lo que no funcionó.",
  },
  {
    label: "IA en Acción",
    text: "Tutoriales de herramienta paso a paso: Seedance, Kling, personajes consistentes, edición y casos de clientes.",
  },
  {
    label: "La comunidad",
    text: "El grupo donde se comparte lo que va saliendo y se resuelven los proyectos de cada quien.",
  },
  {
    label: "Actualizaciones de por vida",
    text: "Las herramientas cambian cada mes. Lo que se agregue después también entra, sin pagar de nuevo.",
  },
];

const FAQ = [
  {
    q: "¿Necesito saber de publicidad?",
    a: "No. La primera parte es justamente esa: cómo piensa un director creativo. Si vienes de cero, ese es el punto de partida.",
  },
  {
    q: "¿Necesito saber usar las herramientas?",
    a: "Tampoco. IA en Acción son los tutoriales paso a paso de cada herramienta y va incluido. Si ya las usas, te saltas esa parte.",
  },
  {
    q: "¿Sirve si todavía no tengo clientes?",
    a: "Sí, y la parte de Cobrar es la que más te va a servir: cómo armar la oferta y qué cobrar cuando recién empiezas.",
  },
  {
    q: "¿Cuánto tiempo me toma?",
    a: "El grabado va a tu ritmo y tienes acceso de por vida. La cohorte en vivo tiene fechas y por eso cuesta más.",
  },
  {
    q: "¿Y si las herramientas cambian?",
    a: "Cambian cada mes, por eso las actualizaciones están incluidas. El método de decidir no caduca: es el mismo con cualquier herramienta.",
  },
];

export default function LandingAcademy() {
  const vsl = TALLER.gate.vslYoutubeId;

  return (
    <div className="hm lp">
      <div className="hm-grain" aria-hidden="true" />

      {/* ── HERO + VSL ── */}
      <header className="lp-hero">
        <div className="hm-glow hm-glow-1" />
        <div className="hm-glow hm-glow-2" />
        <div className="hm-grid-tex" aria-hidden="true" />

        <div className="container-base" style={{ position: "relative", zIndex: 2 }}>
          <motion.div
            className="hm-eyebrow-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.span
              className="hm-eyebrow-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            />
            <span className="hm-eyebrow-text">
              Dirección creativa con IA — RESUELTO Academy
            </span>
          </motion.div>

          <motion.h1
            className="lp-h1"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          >
            Ya sabes generar.<br />
            <span className="hm-grad">Te falta dirigir.</span>
          </motion.h1>

          <motion.p
            className="lp-sub"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          >
            Los tutoriales te enseñan a ejecutar. Ninguno te enseña a decidir qué
            contar, a quién y por qué le va a importar. Ese trabajo se llama{" "}
            <strong>dirección creativa</strong>: es lo que las agencias cobran más
            caro y lo único que la IA no hace por ti.
          </motion.p>

          <motion.div
            className="lp-vsl-wrap"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          >
            <div className="hm-vsl-frame">
              {vsl ? (
                <iframe
                  src={`https://www.youtube.com/embed/${vsl}?rel=0&modestbranding=1&cc_load_policy=0`}
                  title="RESUELTO Academy — Masterclass de Creatividad Publicitaria IA"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                /* Marcador mientras el VSL no está grabado. Pon el ID en
                   TALLER.gate.vslYoutubeId (lib/taller/content.ts) y este
                   recuadro se reemplaza solo por el video. */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    padding: "1.5rem",
                  }}
                >
                  <strong style={{ fontSize: "1.05rem" }}>Aquí va el VSL</strong>
                  <span style={{ fontSize: "0.78rem", opacity: 0.6 }}>
                    Pon el ID de YouTube en TALLER.gate.vslYoutubeId
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          <CtaBlock
            label="Quiero entrar — escribir por WhatsApp"
            sub="Te respondo yo. Sin formularios ni vendedores."
          />

          <motion.div
            className="hm-cred lp-cred"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span>
              <b>2,000+</b> piezas producidas
            </span>
            <i />
            <span>
              <b>20+</b> marcas
            </span>
            <i />
            <span className="hm-cred-ag">TBWA · Fahrenheit DDB</span>
          </motion.div>
        </div>
      </header>

      {/* ── LOGOS ── */}
      <section className="lp-logos">
        <div className="container-base">
          <p className="lp-logos-label">
            El método sale de campañas reales para estas marcas
          </p>
          <div className="lp-logos-row">
            {[
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
            ].map((m) => (
              <span key={m} className="lp-logo-item">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── EL PROBLEMA ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Lo que pasa cuando falta la otra mitad</span>
          <h2>Te enseñaron a apretar botones.</h2>
          <p className="lp-head-sub">
            El trabajo que decide si una pieza funciona ocurre antes de abrir
            cualquier herramienta. Nadie lo enseña porque es lo que las agencias se
            guardan.
          </p>
        </div>

        <div className="lp-prob-grid">
          {PROBLEMAS.map((p, i) => (
            <motion.div
              className="lp-prob"
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <h3>{p.label}</h3>
              <p>{p.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="lp-closing"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          La herramienta se aprende en una tarde.
          <strong> El criterio para dirigirla es lo que se cobra.</strong>
        </motion.p>
      </section>

      {/* ── EL MÉTODO ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Lo que vas a aprender</span>
          <h2>El Cerebro Creativo IA.</h2>
          <p className="lp-head-sub">
            Un proceso para que la inteligencia artificial razone como un director
            creativo dentro de tu negocio, o el de tu cliente. Cinco partes, del
            insight al video terminado. Y cómo cobrarlo.
          </p>
        </div>

        <div className="lp-metodo">
          {PARTES.map((m, i) => (
            <motion.div
              className="lp-metodo-item"
              key={m.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            >
              <span className="lp-metodo-n">{m.n}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── QUÉ TE LLEVAS ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Además de las clases</span>
          <h2>Qué te llevas.</h2>
        </div>

        <div className="lp-prob-grid">
          {LLEVAS.map((b, i) => (
            <motion.div
              className="lp-prob"
              key={b.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
            >
              <h3>{b.label}</h3>
              <p>{b.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── QUIÉN TE ENSEÑA ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Quién te enseña</span>
          <h2>Manuel Severo.</h2>
          <p className="lp-head-sub">
            Pasé por TBWA y por Fahrenheit DDB, con más de dos mil piezas para marcas
            como Wong, BCP, Cencosud y Redondos. Hoy dirijo Resuelto, mi agencia,
            donde produzco campañas con IA para clientes que pagan por esto. No te voy
            a enseñar teoría: te voy a enseñar lo que uso esta semana.
          </p>
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Tres formas de entrar</span>
          <h2>Elige por dónde empiezas.</h2>
          <p className="lp-head-sub">
            Un proyecto con mi agencia arranca en $2,000. Esto es el mismo método,
            para que lo hagas tú.
          </p>
        </div>

        <div className="lp-metodo">
          {NIVELES_VENTA.map((n, i) => (
            <motion.div
              className="lp-metodo-item"
              key={n.nivel}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            >
              <span className="lp-metodo-n">{n.precio}</span>
              <h3>{n.nombre}</h3>
              <p>{n.descripcion}</p>
              <p style={{ marginTop: "0.75rem", opacity: 0.85 }}>
                {n.incluye.join(" · ")}
              </p>
            </motion.div>
          ))}
        </div>

        <CtaBlock
          label="Escribirme por WhatsApp"
          sub="Me cuentas en qué estás y te digo cuál de los tres te sirve. Si ninguno, te lo digo también."
        />
      </section>

      {/* ── FAQ ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Antes de escribirme</span>
          <h2>Lo que suelen preguntar.</h2>
        </div>

        <div className="lp-faq">
          {FAQ.map((f, i) => (
            <motion.div
              className="lp-faq-item"
              key={f.q}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            >
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CIERRE ── */}
      <section className="lp-final">
        <div className="container-base">
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Si ya sabes generar<br />
            <span className="hm-grad">y quieres aprender a dirigir.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Escríbeme y te digo por dónde empezar según lo que estés haciendo hoy.
          </motion.p>
          <CtaBlock label="Empezar por WhatsApp" />
        </div>
      </section>
    </div>
  );
}
