"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import LandingPortafolio from "@/components/LandingPortafolio";
import { TALLER } from "@/lib/taller/content";

/**
 * EMBUDO PASO A PASO — la misma landing de la Academy, servida de a poco.
 *
 * Por qué existe: la landing tradicional lo muestra todo de golpe y el
 * visitante decide en dos segundos si sigue leyendo. Acá el contenido se
 * revela por pasos y entre medio se le pregunta, así que llega al precio
 * habiendo reconocido su problema en voz alta — que es exactamente cómo
 * funciona una llamada de venta.
 *
 * NO hay contenido nuevo: es el material de la landing (gancho, espejo
 * del problema, prueba, sistema, objeción, precio) reordenado en ocho
 * pasos, más las dos preguntas.
 *
 * El correo NO está en el camino: el paso final es pago o WhatsApp, y
 * solo al que no hace ninguno de los dos se le ofrece el diagnóstico por
 * correo. Capturar emails sin secuencia de nutrición es juntar leads que
 * se enfrían solos.
 *
 * Vive en /empezar, que es noindex: el contenido revelado por JS no
 * perjudica el SEO porque esta ruta no se indexa. En /taller, que sí
 * rankea, esto sería un error.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Las dos preguntas ──────────────────────────────────────────
const P1 = {
  titulo: "¿Quién produce tu contenido hoy?",
  ayuda: "Sin juicio: es para saber de dónde partes.",
  opciones: [
    { id: "nadie", label: "Nadie. Publico cuando me acuerdo" },
    { id: "yo", label: "Yo mismo, como puedo" },
    { id: "tercero", label: "Una agencia o un freelance" },
    { id: "equipo", label: "Tengo equipo o produzco para otros" },
  ],
};

const P2 = {
  titulo: "¿Qué te frustra más ahora mismo?",
  ayuda: "Elige la que más te suene a ti.",
  opciones: [
    { id: "que", label: "No sé qué publicar" },
    { id: "igual", label: "Todo me sale parecido a todo" },
    { id: "novende", label: "Se ve bien, pero no me compra nadie" },
    { id: "cobrar", label: "No sé qué cobrar por esto" },
  ],
};

// ── El espejo: su situación, dicha con sus palabras ────────────
const ESPEJO: Record<string, { titulo: string; texto: string }> = {
  nadie: {
    titulo: "Entonces tu marca hoy depende de que te acuerdes.",
    texto:
      "Y cuando te acuerdas, ya es tarde o estás cansado. El problema de publicar por impulso no es la frecuencia: es que cada pieza arranca de cero, sin una idea que las una. Así ninguna construye sobre la anterior.",
  },
  yo: {
    titulo: "Entonces le estás metiendo horas que no te pagan.",
    texto:
      "Produces tú, decides tú, editas tú — y al final publicas algo que no se parece al nivel de lo que vendes. No es falta de esfuerzo: es que estás haciendo el trabajo de tres personas sin el sistema de ninguna.",
  },
  tercero: {
    titulo: "Entonces ya sabes lo que cuesta y lo que no llega.",
    texto:
      "Pagas todos los meses y recibes piezas que están bien hechas pero no dicen nada tuyo. Pasa porque le encargaste la producción a alguien que no tiene tu criterio de negocio — y el criterio no se terceriza.",
  },
  equipo: {
    titulo: "Entonces tu problema no es producir: es diferenciarte.",
    texto:
      "Ya sabes ejecutar y probablemente cobras por hacerlo. Lo que aprieta es que cualquiera con las mismas herramientas ofrece lo mismo más barato, y sin un método propio la conversación siempre termina en precio.",
  },
};

// ── El diagnóstico (mismo criterio que la guía de descubrimiento) ──
type Diag = { perfil: string; titulo: string; texto: string; ruta: string[] };

const DIAGNOSTICOS: Record<string, Diag> = {
  novende: {
    perfil: "Te falta el criterio",
    titulo: "El problema no era la herramienta.",
    texto:
      "Producir algo bonito que nadie compra es la señal más clara de que falta el trabajo de antes: el insight, el concepto y la razón por la que a alguien debería importarle. Ese trabajo ocurre antes de abrir cualquier herramienta, y es lo que las agencias cobran caro.",
    ruta: [
      "Parte 1 — Pensar: el insight y sus 6 tipos",
      "Del insight al concepto y la Big Idea",
      "Parte 2 — El Sistema: cargar ese criterio en tu Cerebro Creativo",
    ],
  },
  que: {
    perfil: "Te falta el sistema",
    titulo: "No es falta de ideas. Es falta de sistema.",
    texto:
      "Publicar cuando se te ocurre algo agota a cualquiera, y se nota en el resultado. El sistema convierte tu estrategia en una grilla decidida de antemano: el mes entero definido en una sola sesión de trabajo.",
    ruta: [
      "Parte 2 — El Sistema: tu Cerebro Creativo con el ADN de tu marca",
      "Matriz de contenido: la grilla con fecha y formato",
      "Tu mes de contenido en una tarde",
    ],
  },
  igual: {
    perfil: "Te falta dirección",
    titulo: "Estás generando al azar, no dirigiendo.",
    texto:
      "Que todo salga parecido no es culpa del modelo: es que el prompt no dicta cámara, luz ni intención, y sin eso la IA rellena con el promedio de internet. Se arregla dirigiendo, y fijando lo que no puede cambiar entre pieza y pieza.",
    ruta: [
      "Parte 3 — Crear: el prompt semiótico y las cuatro palancas",
      "Personaje consistente: la misma cara en toda la campaña",
      "Parte 1 — Pensar: porque dirigir empieza por tener algo que decir",
    ],
  },
  cobrar: {
    perfil: "Te falta cobrarlo",
    titulo: "Sabes producir. Te falta convertirlo en negocio.",
    texto:
      "El problema no es tu pieza: es que no tienes una oferta, un precio ni una conversación de venta. Producir mejor te da con qué vender, no a quién venderle. Eso se arma, y es la parte que casi nadie enseña.",
    ruta: [
      "Parte 5 — Cobrar: la oferta y el precio como señal",
      "Las 12 preguntas de descubrimiento",
      "El guion de la llamada y el método VERA para objeciones",
    ],
  },
};

const TOTAL_PASOS = 8;

export default function EmbudoAcademy() {
  const [paso, setPaso] = useState(0);
  const [r1, setR1] = useState("");
  const [r2, setR2] = useState("");

  // Salida por correo (solo al final, para quien no compra ni escribe)
  const [verCorreo, setVerCorreo] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const { gate, whatsapp } = TALLER;
  const prod = gate.productos.grabado;
  const diag = r2 ? DIAGNOSTICOS[r2] : null;

  const avanzar = () => {
    setPaso((p) => Math.min(p + 1, TOTAL_PASOS - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const waHref = `${whatsapp}?text=${encodeURIComponent(
    diag
      ? `Hola Manuel, hice el diagnóstico y me salió "${diag.perfil}". Quiero entrar a la Academy.`
      : "Hola Manuel, quiero entrar a RESUELTO Academy",
  )}`;

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
          producto: "Embudo /empezar",
          diagnostico: diag?.perfil ?? "",
          respuestas: `Produce hoy: ${r1} · Le frustra: ${r2}`,
        }),
      });
      const data = await res.json().catch(() => null);
      if (data?.ok) setEnviado(true);
      else setError(data?.error || "No se pudo enviar. Escríbeme por WhatsApp.");
    } catch {
      setError("No se pudo enviar. Escríbeme por WhatsApp.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="emb">
      {/* Avance: el visitante ve que esto tiene final */}
      <div className="emb-barra" aria-hidden>
        <span className="emb-barra-fill" style={{ width: `${((paso + 1) / TOTAL_PASOS) * 100}%` }} />
      </div>

      <div className="container-base emb-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={paso}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="emb-paso"
          >
            {/* ── 0 · EL GANCHO ── */}
            {paso === 0 && (
              <>
                <span className="hm-eyebrow">Dirección creativa con IA — RESUELTO Academy</span>
                <h1 className="emb-h1">
                  Ya sabes generar.
                  <br />
                  <span className="hm-grad">Te falta dirigir.</span>
                </h1>
                <p className="emb-sub">
                  Los tutoriales te enseñan a ejecutar. Ninguno te enseña a decidir qué
                  contar, a quién y por qué le va a importar. Ese trabajo se llama{" "}
                  <strong>dirección creativa</strong>: es lo que las agencias cobran más
                  caro y lo único que la IA no hace por ti.
                </p>
                <p className="emb-nota">
                  Dos preguntas y te digo exactamente qué te falta. Toma 30 segundos.
                </p>
                <button type="button" className="emb-cta" onClick={avanzar}>
                  Empezar el diagnóstico
                </button>
                <p className="emb-cred">{gate.credenciales}</p>
              </>
            )}

            {/* ── 1 · PREGUNTA 1 ── */}
            {paso === 1 && (
              <Pregunta
                num="Pregunta 1 de 2"
                data={P1}
                onElegir={(id) => {
                  setR1(id);
                  avanzar();
                }}
              />
            )}

            {/* ── 2 · EL ESPEJO ── */}
            {paso === 2 && r1 && (
              <>
                <span className="hm-eyebrow">Lo que suele pasar</span>
                <h2 className="emb-h2">{ESPEJO[r1].titulo}</h2>
                <p className="emb-txt">{ESPEJO[r1].texto}</p>
                <button type="button" className="emb-cta" onClick={avanzar}>
                  Sigue
                </button>
              </>
            )}

            {/* ── 3 · PREGUNTA 2 ── */}
            {paso === 3 && (
              <Pregunta
                num="Pregunta 2 de 2"
                data={P2}
                onElegir={(id) => {
                  setR2(id);
                  avanzar();
                }}
              />
            )}

            {/* ── 4 · EL DIAGNÓSTICO ── */}
            {paso === 4 && diag && (
              <>
                <span className="hm-eyebrow">Tu diagnóstico</span>
                <h2 className="emb-perfil">{diag.perfil}</h2>
                <p className="emb-diag-tit">{diag.titulo}</p>
                <p className="emb-txt">{diag.texto}</p>
                <p className="emb-sub-lbl">Por dónde empezar, en este orden:</p>
                <ol className="emb-ruta">
                  {diag.ruta.map((x, i) => (
                    <li key={x}>
                      <span className="emb-ruta-n">{i + 1}</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ol>
                <button type="button" className="emb-cta" onClick={avanzar}>
                  Ver si esto funciona de verdad
                </button>
              </>
            )}

            {/* ── 5 · LA PRUEBA ── */}
            {paso === 5 && (
              <>
                <span className="hm-eyebrow">La prueba</span>
                <h2 className="emb-h2">Piezas como estas, hechas por ti.</h2>
                <p className="emb-txt">
                  Todo lo que ves acá lo produje con las herramientas y el método que
                  enseño. Sin rodaje, sin set y sin equipo de producción.
                </p>
                <div className="emb-pf">
                  <LandingPortafolio />
                </div>
                <p className="emb-txt">
                  Y no es una demo: este mismo sistema produce hoy el contenido de{" "}
                  <strong>Wellmax</strong>, <strong>WIN Internet</strong> y{" "}
                  <strong>Livoltek</strong>. Un proyecto así lo cobro desde $2,000.
                </p>
                <button type="button" className="emb-cta" onClick={avanzar}>
                  ¿Qué incluye?
                </button>
              </>
            )}

            {/* ── 6 · EL SISTEMA Y LA OBJECIÓN ── */}
            {paso === 6 && (
              <>
                <span className="hm-eyebrow">Lo que te llevas</span>
                <h2 className="emb-h2">El sistema completo, no un tutorial.</h2>
                <ul className="emb-stack">
                  {gate.stack.map((s) => (
                    <li key={s.item}>
                      <span className="emb-stack-check" aria-hidden>
                        ✓
                      </span>
                      <span>
                        {s.estrella && "⭐ "}
                        {s.item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="emb-obj">
                  <p className="emb-obj-q">«¿Y esto no está gratis en YouTube?»</p>
                  <p className="emb-txt">
                    Los tutoriales de herramientas, sí — y te lo digo yo. Lo que no está
                    es el criterio: cómo se piensa la pieza antes de generarla y cómo se
                    le cobra a una marca. Eso no lo puede grabar alguien que no tiene
                    clientes que le paguen por hacerlo.
                  </p>
                </div>
                <button type="button" className="emb-cta" onClick={avanzar}>
                  Ver el precio
                </button>
              </>
            )}

            {/* ── 7 · PRECIO Y PAGO ── */}
            {paso === 7 && (
              <>
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
                    >
                      Entrar ahora por {prod.precio}
                    </a>
                  ) : (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="emb-cta emb-cta--pago"
                    >
                      Entrar — escribirme por WhatsApp
                    </a>
                  )}
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="emb-wa">
                    Tengo una duda antes de pagar
                  </a>
                </div>

                {/* Salida para quien no compra hoy. Fuera del camino a
                    propósito: no estorba la decisión de quien sí compra. */}
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
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Escape para el que quiere evaluar rápido: la landing completa
            de siempre. Mejor que perderlo por no dejarle ver todo. */}
        <div className="emb-pie">
          {paso > 0 && (
            <button
              type="button"
              className="emb-atras"
              onClick={() => setPaso((p) => Math.max(0, p - 1))}
            >
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

function Pregunta({
  num,
  data,
  onElegir,
}: {
  num: string;
  data: { titulo: string; ayuda: string; opciones: { id: string; label: string }[] };
  onElegir: (id: string) => void;
}) {
  return (
    <>
      <span className="hm-eyebrow">{num}</span>
      <h2 className="emb-h2">{data.titulo}</h2>
      <p className="emb-nota">{data.ayuda}</p>
      <div className="emb-ops">
        {data.opciones.map((o) => (
          <button key={o.id} type="button" className="qz-op" onClick={() => onElegir(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
    </>
  );
}
