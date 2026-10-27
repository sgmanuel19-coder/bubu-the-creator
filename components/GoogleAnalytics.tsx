import Script from "next/script";

/**
 * Google Analytics 4 — propiedad G-BNRFWGHL8D.
 *
 * GA4 se carga AQUÍ, no dentro de GTM. Si algún día se crea un tag de
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
      <Script id="google-consent-default" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('cookie-consent') === 'accepted') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }
} catch (_) {}
window.addEventListener('cookie-consent-change', function(event) {
  var granted = event.detail === 'accepted' ? 'granted' : 'denied';
  gtag('consent', 'update', {
    analytics_storage: granted,
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted
  });
});`}
      </Script>
      <Script
        id="ga4-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
