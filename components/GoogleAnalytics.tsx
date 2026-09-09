import Script from "next/script";

/**
 * Google Analytics 4 — propiedad G-BNRFWGHL8D.
 *
 * ⚠️ GA4 se carga AQUÍ, no dentro de GTM. Si algún día se crea un tag de
 *    GA4 en el contenedor GTM-NSGQG23V, cada pageview se contaría dos veces
 *    y todas las métricas (usuarios, sesiones, rebote) quedarían infladas.
 *    Una cosa o la otra, nunca las dos.
 *
 * GTM sigue instalado para lo demás: píxeles, eventos, tags de terceros.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-BNRFWGHL8D";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        id="ga4-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
