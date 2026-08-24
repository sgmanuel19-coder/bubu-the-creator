import { SITE } from "@/lib/constants";

/**
 * Bloque legal del footer: privacidad, cookies y términos.
 * Colapsado por defecto (<details> nativo) para no interferir con el diseño.
 * Editar los datos de la empresa en LEGAL.
 */
const LEGAL = {
  razonSocial: "RESUELTO SMART SOLUTIONS S.A.C.",
  ruc: "20614688921",
  domicilio: "Lima, Perú",
  email: SITE.email,
  actualizado: "15 de agosto de 2026",
};

type BlockProps = {
  title: string;
  children: React.ReactNode;
};

function LegalBlock({ title, children }: BlockProps) {
  return (
    <details className="legal-block group border-t border-white/5">
      <summary
        className="flex items-center justify-between gap-4 cursor-pointer list-none
                   py-3 text-xs font-body text-muted/70 hover:text-cream/80
                   transition-colors duration-200"
      >
        <span>{title}</span>
        <span
          aria-hidden="true"
          className="legal-block__chevron text-[0.65rem] text-muted/50 transition-transform duration-200"
        >
          ▾
        </span>
      </summary>
      <div
        className="pb-6 pr-2 max-w-3xl space-y-3 text-[0.72rem] leading-relaxed
                   font-body text-muted/60 [&_strong]:text-muted/85 [&_strong]:font-semibold
                   [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1 [&_a]:underline
                   [&_a]:decoration-white/20 hover:[&_a]:text-cream/80"
      >
        {children}
      </div>
    </details>
  );
}

export default function LegalNotice() {
  return (
    <div className="mt-10">
      <p className="text-[0.65rem] uppercase tracking-[0.2em] font-body text-muted/40 mb-1">
        Información legal
      </p>

      <LegalBlock title="Política de Privacidad">
        <p>
          <strong>{LEGAL.razonSocial}</strong> (RUC {LEGAL.ruc}), con domicilio en{" "}
          {LEGAL.domicilio}, es responsable del tratamiento de los datos personales
          recogidos a través de este sitio web, conforme a la Ley N.º 29733 — Ley de
          Protección de Datos Personales del Perú y su Reglamento.
        </p>

        <p>
          <strong>Qué datos recogemos.</strong> Solo los que nos entregas
          voluntariamente al contactarnos o registrarte: nombre, correo electrónico,
          número de teléfono/WhatsApp, empresa y el contenido de tu mensaje. De forma
          automática registramos datos técnicos de navegación (dirección IP,
          navegador, dispositivo, páginas visitadas) mediante herramientas de análisis
          y publicidad.
        </p>

        <p>
          <strong>Para qué los usamos.</strong> Para responder tus consultas, enviarte
          propuestas comerciales, gestionar el acceso a nuestros programas de
          formación, medir el rendimiento del sitio y de nuestras campañas
          publicitarias, y —solo si lo autorizas— enviarte comunicaciones sobre
          servicios y contenidos. No vendemos ni alquilamos tus datos a terceros.
        </p>

        <p>
          <strong>Con quién los compartimos.</strong> Con proveedores que nos prestan
          servicios y actúan como encargados de tratamiento, entre ellos: Vercel
          (alojamiento), Meta Platforms (píxel de publicidad y WhatsApp), Google
          (analítica y correo), Calendly (agendamiento), Hotmart (pagos de cursos),
          Supabase y n8n (gestión de registros). Algunos de estos proveedores están
          ubicados fuera del Perú, por lo que puede existir un flujo transfronterizo de
          datos con las garantías que exige la normativa vigente.
        </p>

        <p>
          <strong>Cuánto tiempo los conservamos.</strong> Mientras dure la relación
          comercial y, después, por el plazo necesario para atender obligaciones
          legales, contables y tributarias. Si retiras tu consentimiento, eliminamos o
          bloqueamos tus datos salvo que exista obligación legal de conservarlos.
        </p>

        <p>
          <strong>Tus derechos (ARCO).</strong> Puedes acceder, rectificar, cancelar u
          oponerte al tratamiento de tus datos, así como revocar tu consentimiento en
          cualquier momento, escribiendo a{" "}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. Responderemos en los
          plazos que establece la ley. Si consideras que no atendimos tu solicitud,
          puedes acudir a la Autoridad Nacional de Protección de Datos Personales del
          Ministerio de Justicia y Derechos Humanos.
        </p>

        <p>
          <strong>Menores de edad.</strong> Este sitio está dirigido a personas mayores
          de 18 años. No recogemos datos de menores de forma consciente.
        </p>
      </LegalBlock>

      <LegalBlock title="Política de Cookies">
        <p>
          Usamos cookies y tecnologías similares para que el sitio funcione, recordar
          tus preferencias y medir el rendimiento de nuestras campañas.
        </p>
        <ul>
          <li>
            <strong>Necesarias.</strong> Imprescindibles para el funcionamiento del
            sitio y para recordar tu decisión sobre cookies. No requieren
            consentimiento.
          </li>
          <li>
            <strong>Analíticas.</strong> Nos permiten entender cómo se usa el sitio de
            forma agregada para mejorarlo.
          </li>
          <li>
            <strong>Publicitarias.</strong> Píxel de Meta (Facebook e Instagram), usado
            para medir conversiones y mostrar anuncios relevantes.{" "}
            <strong>Solo se activa si aceptas</strong> en el banner de cookies.
          </li>
        </ul>
        <p>
          Puedes cambiar tu decisión en cualquier momento borrando los datos del sitio
          desde tu navegador; el banner volverá a mostrarse. También puedes bloquear o
          eliminar cookies desde la configuración de tu navegador, aunque algunas
          funciones podrían dejar de operar correctamente.
        </p>
      </LegalBlock>

      <LegalBlock title="Términos y Condiciones">
        <p>
          <strong>Contenido del sitio.</strong> La información publicada tiene fines
          informativos y comerciales. Los textos, videos, imágenes, marcas y materiales
          de este sitio son propiedad de {LEGAL.razonSocial} o se usan con
          autorización, y no pueden reproducirse ni distribuirse sin permiso escrito
          previo.
        </p>
        <p>
          <strong>Precios y propuestas.</strong> Los precios mostrados son
          referenciales, están expresados en soles y no incluyen IGV salvo que se
          indique lo contrario. Pueden variar según el alcance de cada proyecto. Toda
          contratación se formaliza mediante una propuesta o contrato específico, cuyos
          términos prevalecen sobre lo publicado aquí.
        </p>
        <p>
          <strong>Resultados.</strong> No garantizamos resultados comerciales
          específicos, viralidad ni volúmenes de venta. Los casos y métricas mostrados
          corresponden a proyectos reales y no constituyen una promesa de resultados
          equivalentes.
        </p>
        <p>
          <strong>Enlaces externos.</strong> El sitio puede contener enlaces a
          plataformas de terceros (WhatsApp, Calendly, Hotmart, YouTube, redes
          sociales). No somos responsables de sus contenidos ni de sus políticas de
          privacidad.
        </p>
        <p>
          <strong>Ley aplicable.</strong> Estos términos se rigen por la legislación
          peruana. Cualquier controversia se someterá a los jueces y tribunales de
          Lima, Perú.
        </p>
      </LegalBlock>

      <p className="pt-3 border-t border-white/5 text-[0.65rem] font-body text-muted/40">
        Última actualización: {LEGAL.actualizado} · Consultas sobre datos personales:{" "}
        <a href={`mailto:${LEGAL.email}`} className="underline decoration-white/20">
          {LEGAL.email}
        </a>
      </p>
    </div>
  );
}
