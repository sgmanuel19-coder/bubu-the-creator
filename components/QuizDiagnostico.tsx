"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Quiz de diagnóstico: tres preguntas, un resultado con nombre y la
 * captura del lead.
 *
 * Por qué existe: la landing solo tenía CTA a WhatsApp, así que quien no
 * estaba listo para escribir se iba sin dejar rastro. El quiz convierte
 * ese tráfico en un lead con contexto — y al vendedor le llega qué le
 * duele al prospecto, no un "hola" en frío.
 *
 * Las preguntas son las que más califican de las 12 de descubrimiento
 * (ver la guía preguntas-de-descubrimiento en la bóveda): quién produce
 * hoy, qué intentó, y qué le frustra. El diagnóstico sale del dolor,
 * matizado por la experiencia previa.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Opcion = { id: string; label: string };
type Pregunta = { id: string; titulo: string; ayuda: string; opciones: Opcion[] };

const PREGUNTAS: Pregunta[] = [
  {
    id: "quien",
    titulo: "¿Quién produce tu contenido hoy?",
    ayuda: "Sin juicio: es para saber de dónde partes.",
    opciones: [
      { id: "nadie", label: "Nadie. Publico cuando me acuerdo" },
      { id: "yo", label: "Yo mismo, como puedo" },
      { id: "tercero", label: "Una agencia o un freelance" },
      { id: "equipo", label: "Tengo equipo o produzco para otros" },
    ],
  },
  {
    id: "ia",
    titulo: "¿Ya produjiste con IA?",
    ayuda: "Importa si te frustró, y por qué.",
    opciones: [
      { id: "nunca", label: "Nunca. No sé por dónde se empieza" },
      { id: "probe", label: "Probé y el resultado no me convenció" },
      { id: "publico", label: "Sí, y publico con eso" },
      { id: "vivo", label: "Sí, y ya le cobro a alguien" },
    ],
  },
  {
    id: "dolor",
    titulo: "¿Qué te frustra más ahora mismo?",
    ayuda: "Elige la que más te suene a ti.",
    opciones: [
      { id: "que", label: "No sé qué publicar" },
      { id: "igual", label: "Todo me sale parecido a todo" },
      { id: "novende", label: "Se ve bien, pero no me compra nadie" },
      { id: "cobrar", label: "No sé qué cobrar por esto" },
    ],
  },
];

type Resultado = {
  perfil: string;
  titulo: string;
  diagnostico: string;
  empezar: { parte: string; por: string }[];
};

/**
 * El diagnóstico lo decide el dolor. La respuesta de IA solo ajusta el
 * primer paso: quien nunca produjo necesita antes la parte de ejecución.
 */
function diagnosticar(r: Record<string, string>): Resultado {
  const novato = r.ia === "nunca";

  if (r.dolor === "cobrar") {
    return {
      perfil: "Te falta cobrarlo",
      titulo: "Sabes producir. Te falta convertirlo en negocio.",
      diagnostico:
        "El problema no es tu pieza: es que no tienes una oferta, un precio ni una conversación de venta. Producir mejor te da con qué vender, no a quién venderle. Eso se arma y es la parte que casi nadie enseña.",
      empezar: [
        { parte: "Parte 5 — Cobrar", por: "la oferta, el precio como señal y el plan de 30 días" },
        { parte: "Las 12 preguntas de descubrimiento", por: "para que el cliente se venda solo en la llamada" },
        { parte: "El guion de la llamada y las objeciones", por: "el método VERA y las 10 objeciones reales" },
      ],
    };
  }

  if (r.dolor === "novende") {
    return {
      perfil: "Te falta el criterio",
      titulo: "El problema no era la herramienta.",
      diagnostico:
        "Producir algo bonito que nadie compra es la señal más clara de que falta el trabajo de antes: el insight, el concepto y la razón por la que a alguien debería importarle. Ese trabajo ocurre antes de abrir cualquier herramienta, y es lo que las agencias cobran caro.",
      empezar: [
        { parte: "Parte 1 — Pensar", por: "el insight, sus 6 tipos y cómo se excavan" },
        { parte: "Del insight al concepto y la Big Idea", por: "para dejar de publicar ideas flojas" },
        { parte: "Parte 2 — El Sistema", por: "cargar ese criterio en tu Cerebro Creativo" },
      ],
    };
  }

  if (r.dolor === "igual") {
    return {
      perfil: "Te falta dirección",
      titulo: "Estás generando al azar, no dirigiendo.",
      diagnostico:
        "Que todo salga parecido no es culpa del modelo: es que el prompt no dicta cámara, luz ni intención, y sin eso la IA rellena con el promedio de internet. Se arregla dirigiendo — y fijando lo que no puede cambiar entre pieza y pieza.",
      empezar: [
        { parte: "Parte 3 — Crear", por: "el prompt semiótico y las cuatro palancas que sí mueven el resultado" },
        { parte: "Personaje consistente", por: "para que tu protagonista sea el mismo en toda la campaña" },
        { parte: "Parte 1 — Pensar", por: "porque dirigir empieza por tener algo que decir" },
      ],
    };
  }

  // r.dolor === "que"
  return {
    perfil: "Te falta el sistema",
    titulo: "No es falta de ideas. Es falta de sistema.",
    diagnostico: novato
      ? "Publicar cuando se te ocurre algo agota a cualquiera. Lo que necesitas primero no es una herramienta: es un sistema que decida qué publicar antes de que llegue el lunes, y después la ejecución paso a paso."
      : "Publicar cuando se te ocurre algo agota a cualquiera, y se nota en el resultado. El sistema convierte tu estrategia en una grilla decidida de antemano: el mes entero definido en una sola sesión de trabajo.",
    empezar: [
      { parte: "Parte 2 — El Sistema", por: "armar tu Cerebro Creativo con el ADN de tu marca" },
      { parte: "Matriz de contenido", por: "bajar la estrategia a una grilla con fecha y formato" },
      novato
        ? { parte: "IA en Acción", por: "la ejecución escrita, tema por tema, desde cero" }
        : { parte: "Tu mes de contenido en una tarde", por: "para dejar de improvisar cada semana" },
    ],
  };
}

const ETIQUETAS: Record<string, string> = {
  nadie: "Nadie produce su contenido",
  yo: "Lo hace él mismo",
  tercero: "Agencia o freelance",
  equipo: "Tiene equipo / produce para otros",
  nunca: "Nunca usó IA",
  probe: "Probó IA y no le convenció",
  publico: "Publica con IA",
  vivo: "Ya cobra por producir con IA",
  que: "No sabe qué publicar",
  igual: "Todo le sale parecido",
  novende: "Se ve bien y no vende",
  cobrar: "No sabe qué cobrar",
};

export default function QuizDiagnostico({ whatsapp }: { whatsapp: string }) {
  const [paso, setPaso] = useState(0);
  const [resp, setResp] = useState<Record<string, string>>({});
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState(""); // honeypot
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const total = PREGUNTAS.length;
  const terminado = paso >= total;
  const resultado = terminado ? diagnosticar(resp) : null;

  function responder(pregunta: string, opcion: string) {
    setResp((r) => ({ ...r, [pregunta]: opcion }));
    setPaso((p) => p + 1);
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!resultado) return;
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
          producto: "Quiz de diagnóstico",
          diagnostico: resultado.perfil,
          respuestas: PREGUNTAS.map(
            (p) => `${p.titulo} → ${ETIQUETAS[resp[p.id]] ?? "—"}`,
          ).join(" · "),
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

  const waHref = resultado
    ? `${whatsapp}?text=${encodeURIComponent(
        `Hola Manuel, hice el diagnóstico y me salió "${resultado.perfil}". Quiero saber más.`,
      )}`
    : whatsapp;

  return (
    <section className="container-base hm-section" id="diagnostico">
      <div className="lp-head">
        <span className="hm-eyebrow">Diagnóstico en 30 segundos</span>
        <h2>¿Qué te está faltando exactamente?</h2>
        <p className="lp-head-sub">
          Tres preguntas. Al final te digo por dónde empezar — y si esto no es para
          ti, también te lo digo.
        </p>
      </div>

      <div className="qz">
        {/* Avance por pasos */}
        <div className="qz-barra" aria-hidden>
          {PREGUNTAS.map((p, i) => (
            <span key={p.id} className={i <= paso - 1 || terminado ? "qz-seg on" : "qz-seg"} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!terminado ? (
            <motion.div
              key={PREGUNTAS[paso].id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <p className="qz-num">
                Pregunta {paso + 1} de {total}
              </p>
              <h3 className="qz-preg">{PREGUNTAS[paso].titulo}</h3>
              <p className="qz-ayuda">{PREGUNTAS[paso].ayuda}</p>
              <div className="qz-ops">
                {PREGUNTAS[paso].opciones.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className="qz-op"
                    onClick={() => responder(PREGUNTAS[paso].id, o.id)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
              {paso > 0 && (
                <button type="button" className="qz-atras" onClick={() => setPaso((p) => p - 1)}>
                  ← Atrás
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="resultado"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="qz-num">Tu diagnóstico</p>
              <h3 className="qz-perfil">{resultado!.perfil}</h3>
              <p className="qz-res-tit">{resultado!.titulo}</p>
              <p className="qz-res-txt">{resultado!.diagnostico}</p>

              <p className="qz-sub">Por dónde empezar, en este orden:</p>
              <ol className="qz-ruta">
                {resultado!.empezar.map((e, i) => (
                  <li key={e.parte}>
                    <span className="qz-ruta-n">{i + 1}</span>
                    <span>
                      <b>{e.parte}</b>
                      <i>{e.por}</i>
                    </span>
                  </li>
                ))}
              </ol>

              {!enviado ? (
                <form className="qz-form" onSubmit={enviar}>
                  <p className="qz-form-tit">
                    Te mando este diagnóstico por correo con la ruta completa
                  </p>
                  <div className="qz-form-row">
                    <input
                      id="qz-nombre"
                      type="text"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(ev) => setNombre(ev.target.value)}
                      required
                      autoComplete="name"
                    />
                    <input
                      id="qz-email"
                      type="email"
                      placeholder="Tu correo"
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  {/* Honeypot: invisible para humanos, lo llenan los bots. */}
                  <input
                    id="qz-web"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={web}
                    onChange={(ev) => setWeb(ev.target.value)}
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
                    aria-hidden
                  />
                  <button type="submit" className="qz-enviar" disabled={enviando}>
                    {enviando ? "Enviando…" : "Mándame la ruta"}
                  </button>
                  {error && <p className="qz-error">{error}</p>}
                  <p className="qz-legal">
                    Te escribo yo, no un vendedor. Nada de spam: si no te sirve, me lo
                    dices y listo.
                  </p>
                </form>
              ) : (
                <div className="qz-ok">
                  <p className="qz-ok-tit">Listo, te llega en un momento.</p>
                  <p className="qz-ok-txt">
                    Si quieres adelantar, escríbeme y seguimos desde tu diagnóstico.
                  </p>
                </div>
              )}

              <div className="qz-cierre">
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="qz-wa">
                  Hablar con Manuel por WhatsApp
                </a>
                <button
                  type="button"
                  className="qz-atras"
                  onClick={() => {
                    setPaso(0);
                    setResp({});
                    setEnviado(false);
                    setError("");
                  }}
                >
                  Volver a empezar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
