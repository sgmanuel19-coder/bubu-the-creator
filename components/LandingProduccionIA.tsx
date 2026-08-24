"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import LandingPortafolio from "@/components/LandingPortafolio";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Mensaje propio de la landing pagada: permite distinguir en WhatsApp
   si el lead vino de la pauta o del sitio orgánico. */
const WA_MSG =
  "Hola, vi la página de producción con IA y quisiera agendar una llamada para cotizar mi proyecto.";

function waLink(): string {
  return `${SITE.links.whatsapp}?text=${encodeURIComponent(WA_MSG)}`;
}

/* ── Contador animado ── */
function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{val.toLocaleString("en-US")}{suffix}</span>;
}

/* ── Bloque CTA reutilizable ── */
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

const PROBLEMAS = [
  {
    label: "La percepción está por debajo del nivel real",
    text: "Tu empresa ejecuta proyectos grandes. Pero el mercado no lo percibe así, porque la comunicación no está a la altura de lo que la empresa realmente vale.",
  },
  {
    label: "Lo técnico es difícil de explicar",
    text: "Tienes capacidad, experiencia y una solución valiosa. Traducir eso a algo que un cliente no técnico entienda y en lo que confíe es otro problema completamente distinto.",
  },
  {
    label: "Apareces solo cuando hay evento",
    text: "Un post cuando hay proyecto, un video cuando hay feria, un PDF cuando hay reunión. Todo suelto. Nada sostenido. Y la autoridad no se construye a saltos.",
  },
  {
    label: "La IA sin criterio produce genérico",
    text: "Tus competidores ya usan IA. El problema es que sin dirección creativa produce exactamente lo mismo para todos. La diferencia no está en la herramienta — está en quién la dirige.",
  },
];

const CASOS = [
  {
    n: "01",
    cliente: "Wellmax",
    sector: "Iluminación LED",
    trabajo:
      "Sistema de producción 100% IA: video de producto generado con IA, UGC IA para prueba social y storytelling de marca, con Cerebro Creativo entrenado en Wellmax.",
    metrica: "Presencia en +200 países",
    resultado: "Sistema de IA completo en operación continua, sin rodajes",
  },
  {
    n: "02",
    cliente: "WIN Internet",
    sector: "Telecomunicaciones",
    trabajo:
      "Creamos piezas y comerciales IA junto a la gestión editorial de la marca: pilares de contenido, campañas comerciales y cobertura de hitos con producción continua.",
    metrica: "+2.5M vistas orgánicas al año",
    resultado: "+99 piezas publicadas · Autoridad digital en telecomunicaciones",
  },
  {
    n: "03",
    cliente: "Smart System Perú",
    sector: "Tecnología",
    trabajo:
      "Comercial IA de lanzamiento para la marca: concepto, dirección de arte y producción generativa completa para su entrada al mercado.",
    metrica: "Comercial de lanzamiento 100% IA",
    resultado: "Marca posicionada dentro de su rubro desde el lanzamiento",
  },
  {
    n: "04",
    cliente: "Livoltek",
    sector: "Energía · B2B técnico",
    trabajo:
      "Video caso de su participación junto a BCP en ExpoSolar 2025, cobertura del evento y formato fake podcast. IA generativa para visualizar conceptos técnicos complejos.",
    metrica: "Material reutilizable en ferias y ventas",
    resultado: "Base para apertura de nuevos mercados · Circula entre gerentes y áreas comerciales",
  },
  {
    n: "05",
    cliente: "Wong · Cencosud",
    sector: "Retail premium",
    trabajo:
      "Sistema de producción ágil durante año y medio: lanzamientos de productos premium, campañas estacionales, orgánico y pauta con estética alineada al nivel de marca.",
    metrica: "+300 piezas producidas",
    resultado: "Productos que se agotaban en pocos días · Millones de vistas con pauta",
  },
  {
    n: "06",
    cliente: "Redondos",
    sector: "Consumo masivo",
    trabajo:
      "Campaña navideña con el medallista olímpico Stefano Peschiera. Contenidos de promoción, recetas, trends y el Calendario de Adviento sorteado en redes.",
    metrica: "+150K vistas en 24 horas",
    resultado: "+5,000 comentarios el primer día · +2.5M vistas acumuladas",
  },
];

/* ⚠️ TESTIMONIOS — PENDIENTE DE APROBACIÓN DEL CLIENTE
   El de Wellmax está redactado sobre lo que Nao C. comunicó al equipo.
   Los de WIN y Livoltek son borradores construidos a partir de los
   resultados documentados de cada cuenta — no son palabras textuales.
   Confirmar el texto final con cada cliente antes de dejarlo en vivo. */
const TESTIMONIOS = [
  {
    quote:
      "Wellmax tiene presencia en más de 200 países y muchos años de trayectoria, pero eso existía solo como información — no se veía reflejado en nuestra comunicación. Con el equipo de Resuelto construimos la autoridad de marca que ya teníamos y no estábamos comunicando. Hacen un excelente trabajo.",
    autor: "Nao C.",
    cargo: "CEO — Wellmax",
    sector: "Iluminación LED · Presencia en +200 países",
  },
  {
    quote:
      "Llevamos más de tres años trabajando juntos. Lo que empezó como contenido se convirtió en un sistema editorial con voz propia, y hoy producimos piezas y comerciales IA. WIN es un referente digital en un sector donde todas las marcas dicen exactamente lo mismo.",
    autor: "Jose Cerrón",
    cargo: "WIN Internet",
    sector: "Telecomunicaciones · +2.5M vistas orgánicas al año",
  },
  {
    quote:
      "Necesitábamos explicar soluciones técnicas complejas a gerentes que no son técnicos. El video caso de ExpoSolar se volvió material que seguimos usando en presentaciones y procesos comerciales mucho después del evento.",
    autor: "Renato Amaya",
    cargo: "Livoltek",
    sector: "Energía · B2B técnico",
  },
];

const METODO = [
  {
    n: "I",
    title: "Dirección y concepto",
    text: "Idea, guion, storyboard y definición del look. La visión que hace que la pieza se sienta de tu marca y no genérica. Esta capa es 100% humana.",
  },
  {
    n: "II",
    title: "Generación",
    text: "Cada plano se genera y regenera decenas de veces hasta lograr consistencia, encuadre y movimiento de nivel cinematográfico.",
  },
  {
    n: "III",
    title: "Acabado",
    text: "Edición, color grade, diseño sonoro y música. Lo que convierte generaciones sueltas en una pieza pulcra y coherente.",
  },
];

const FAQ = [
  {
    q: "¿La IA no produce contenido genérico?",
    a: "Sola, sí. Por eso la primera capa del proceso es 100% humana: concepto, guion y dirección de arte se definen antes de generar un solo plano. La IA ejecuta una visión que ya existe. Ese es exactamente el criterio que se forjó en Fahrenheit DDB y TBWA — y es lo que separa una pieza de marca de un video de stock.",
  },
  {
    q: "¿Sirve para una empresa técnica o industrial?",
    a: "Es precisamente donde mejor funciona. Energía, telecomunicaciones, agroindustria, manufactura e infraestructura son sectores con capacidad real y comunicación por debajo de ese nivel. La IA generativa permite visualizar procesos y conceptos técnicos que sería carísimo o imposible filmar.",
  },
  {
    q: "¿Cuánto demora?",
    a: "Semanas, no meses. Sin rodaje, sin locación, sin cast ni coordinación de equipo técnico. Y cuando hay un cambio, la pieza se regenera en días — no exige volver a grabar.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Precio cerrado por proyecto, definido antes de empezar. No hay presupuesto abierto que crece en el camino. El alcance exacto y la inversión se definen en la llamada, según lo que tu empresa necesite.",
  },
  {
    q: "¿Qué necesitan de mi equipo?",
    a: "Muy poco tiempo. Una sesión de diagnóstico para entender el negocio y el mensaje, y luego revisiones puntuales en cada entrega. No necesitas montar un área ni liberar personal — el proceso es Done-For-You.",
  },
];

export default function LandingProduccionIA() {
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
            <span className="hm-eyebrow-text">Producción audiovisual con IA — Lima, Perú</span>
          </motion.div>

          <motion.h1
            className="lp-h1"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          >
            La producción publicitaria<br />cambió de era.<br />
            <span className="hm-grad">Nosotros la dirigimos.</span>
          </motion.h1>

          <motion.p
            className="lp-sub"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          >
            Resuelto une <strong>5+ años de criterio en agencias globales</strong> con los
            motores de generación más avanzados del mundo. El resultado: piezas de nivel
            televisión, entregadas en semanas, con precio cerrado.
          </motion.p>

          {/* VSL */}
          <motion.div
            className="lp-vsl-wrap"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
          >
            <div className="hm-vsl-frame">
              <iframe
                src="https://www.youtube.com/embed/30bVmigalKQ?rel=0&modestbranding=1&cc_load_policy=0"
                title="RESUELTO — Sistema de producción audiovisual con IA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>

          <CtaBlock
            label="Agendar llamada por WhatsApp"
            sub="Respondemos el mismo día. Sin formularios ni intermediarios."
          />

          {/* Credenciales */}
          <motion.div
            className="hm-cred lp-cred"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <span><b><Counter to={5} suffix="M+" /></b> vistas generadas</span>
            <i />
            <span><b><Counter to={20} suffix="+" /></b> marcas</span>
            <i />
            <span><b><Counter to={2000} suffix="+" /></b> piezas</span>
            <i />
            <span className="hm-cred-ag">TBWA · Fahrenheit DDB</span>
          </motion.div>
        </div>
      </header>

      {/* ── LOGOS ── */}
      <section className="lp-logos">
        <div className="container-base">
          <p className="lp-logos-label">Marcas y empresas con las que hemos trabajado</p>
          <div className="lp-logos-row">
            {["WIN Internet", "Wong", "BCP", "Cencosud", "Interbank", "Livoltek", "San Fernando", "Holcim", "Redondos", "BYD", "Wellmax", "Costa"].map((m) => (
              <span className="lp-logo-item" key={m}>{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTAFOLIO EN VIDEO — la prueba más fuerte va temprano ── */}
      <LandingPortafolio />

      <div className="container-base">
        <CtaBlock
          label="Quiero producir así"
          sub="Te respondemos con una propuesta cerrada el mismo día."
        />
      </div>

      {/* ── EL PROBLEMA ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Lo que vemos una y otra vez</span>
          <h2>El problema no es tu operación.</h2>
          <p className="lp-head-sub">
            Es la distancia entre lo que tu empresa hace y lo que el mercado percibe que hace.
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
          IA sin dirección produce ruido. Criterio sin IA produce lento.
          <strong> La combinación correcta es lo que cambia cómo se percibe tu empresa.</strong>
        </motion.p>
      </section>

      {/* ── CASOS ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Clientes</span>
          <h2>Marcas que ya producen con nosotros.</h2>
          <p className="lp-head-sub">
            Seis industrias distintas. El mismo sistema detrás de cada una.
          </p>
        </div>

        <div className="lp-casos">
          {CASOS.map((c, i) => (
            <motion.article
              className="lp-caso"
              key={c.cliente}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.75, delay: i * 0.08, ease: EASE }}
            >
              <div className="lp-caso-glow" aria-hidden="true" />
              <div className="lp-caso-top">
                <span className="lp-caso-sector">{c.sector}</span>
                <span className="lp-caso-n">{c.n}</span>
              </div>
              <h3 className="lp-caso-cliente">{c.cliente}</h3>
              <p className="lp-caso-metrica">{c.metrica}</p>
              <p className="lp-caso-trabajo">{c.trabajo}</p>
              <p className="lp-caso-resultado">{c.resultado}</p>
            </motion.article>
          ))}
        </div>

        <CtaBlock label="Quiero resultados así para mi empresa" />
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Lo que dicen los clientes</span>
          <h2>No lo decimos nosotros.</h2>
        </div>

        <div className="lp-testi-grid">
          {TESTIMONIOS.map((t, i) => (
            <motion.blockquote
              className="lp-testi"
              key={t.cargo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            >
              <span className="lp-testi-mark" aria-hidden="true">&ldquo;</span>
              <p className="lp-testi-quote">{t.quote}</p>
              <footer className="lp-testi-foot">
                <p className="lp-testi-autor">{t.autor}</p>
                <p className="lp-testi-cargo">{t.cargo}</p>
                <p className="lp-testi-sector">{t.sector}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* ── MÉTODO ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Cómo se produce cada pieza</span>
          <h2>La IA genera. El criterio dirige.</h2>
          <p className="lp-head-sub">
            Toda pieza atraviesa las mismas tres capas. La diferencia entre una pieza de marca
            y un video genérico se decide en la primera.
          </p>
        </div>

        <div className="lp-metodo">
          {METODO.map((m, i) => (
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

      {/* ── QUIÉN DIRIGE ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Quién dirige</span>
          <h2>Dirección con estándar de agencia global.</h2>
        </div>

        <div className="lp-autor">
          <motion.div
            className="lp-autor-bio"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="lp-autor-head">
              <div className="lp-autor-foto">
                <Image
                  src="/images/equipo/manuel.jpg"
                  alt="Manuel Severo — dirección creativa y estratégica de RESUELTO"
                  width={130}
                  height={130}
                  className="lp-autor-img"
                />
              </div>
              <div>
                <p className="lp-autor-nombre">Manuel Severo</p>
                <p className="lp-autor-rol">Dirección creativa y estratégica — RESUELTO</p>
                <p className="lp-autor-tags">
                  <span>Inteligencia Artificial</span>
                  <span>Dirección Audiovisual</span>
                  <span>Estrategia Creativa</span>
                  <span>Producción Comercial</span>
                </p>
              </div>
            </div>
            <p>
              Pasé años dentro de las agencias donde los estándares no tienen margen para el
              error. Trabajé con las marcas más grandes del Perú — de banca a retail — y vi
              de primera mano cómo la comunicación puede cambiar por completo la percepción
              de un negocio.
            </p>
            <p>
              Con el tiempo entendí que el problema real no es &ldquo;hacer contenido&rdquo;. Es que la
              mayoría de negocios con ofertas valiosas comunican muy por debajo de lo que
              valen. Y cuando eso cambia, todo cambia: se ven mejor, atraen mejor cliente y
              convierten con menos fricción.
            </p>
            <p>
              Hoy integro IA en cada fase del proceso — planeación, producción y
              postproducción — no para reemplazar el criterio, sino para explorar más rápido
              y elevar el nivel de cada pieza. <strong>La estrategia sigue siendo humana; la
              ejecución va potenciada con IA.</strong>
            </p>
          </motion.div>

        </div>

        {/* Collage de marcas — reemplaza la línea de tiempo. Es panorámica
            (1621×902), así que va a todo el ancho debajo de la bio en vez
            de en una columna lateral. */}
        <motion.figure
          className="lp-marcas"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <Image
            src="/images/portfolio/slide-06.png"
            alt="Marcas que ya confiaron en RESUELTO: BCP, San Fernando, Holcim, BYD, Interbank, Costa, Footloose, I-RUN, Boogie y más"
            width={1621}
            height={902}
            sizes="(max-width: 900px) 100vw, 1100px"
            className="lp-marcas-img"
          />
        </motion.figure>

        {/* Pico de confianza de la página: acaban de ver la cara, las
            habilidades y las marcas. Es el mismo destino que el resto de
            CTAs para no partir la señal de conversión — solo cambia el
            texto para aprovechar el momento. */}
        <CtaBlock
          label="Hablar directamente con Manuel"
          sub="Te responde el mismo día, sin intermediarios."
        />
      </section>

      {/* ── FAQ ── */}
      <section className="container-base hm-section">
        <div className="lp-head">
          <span className="hm-eyebrow">Antes de escribirnos</span>
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
            Tu competencia ya está<br />
            <span className="hm-grad">produciendo en esta era.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Cuéntanos qué necesitas producir. Respondemos el mismo día con una propuesta cerrada.
          </motion.p>
          <CtaBlock label="Hablar por WhatsApp" />
        </div>
      </section>
    </div>
  );
}
