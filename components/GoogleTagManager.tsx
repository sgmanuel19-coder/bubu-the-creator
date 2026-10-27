import Script from "next/script";

/**
 * Google Tag Manager — contenedor GTM-NSGQG23V.
 *
 * El contenedor GTM está instalado para tags futuros. GA4 se carga por
 * separado en GoogleAnalytics.tsx y el contenedor publicado está vacío;
 * no añadir otra etiqueta GA4 aquí mientras siga activo el GA4 directo.
 *
 * ⚠️ La CSP de next.config.ts debe permitir www.googletagmanager.com en
 *    script-src (contenedor) y en frame-src (iframe del <noscript>).
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NSGQG23V";

/**
 * Snippet de <head>. `afterInteractive` deja que la página pinte primero:
 * GTM no debe competir con el LCP.
 */
export function GoogleTagManager() {
  return (
    <Script id="gtm-base" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/**
 * Fallback sin JavaScript. Va como primer hijo del <body>.
 */
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
