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
// Decisión de Roberth (10-nov-2026): la analítica mide desde el inicio y la
// barra de cookies queda como aviso con opción de rechazar («Solo
// necesarias» la apaga). La publicidad (Ads, Meta) sigue esperando a que
// la persona acepte. Antes todo arrancaba denegado y GA4 veía 1 de cada 6
// clics pagados.
var decision = null;
try { decision = localStorage.getItem('cookie-consent'); } catch (_) {}
gtag('consent', 'default', {
  analytics_storage: decision === 'rejected' ? 'denied' : 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
// Sin cookies, el ID del clic del anuncio (gclid) viaja en la URL de una
// página a otra; así la conversión de quien no aceptó cookies sigue unida
// a su clic en Google Ads (10-nov-2026: GA4 veía 14 de ~85 clics pagados).
gtag('set', 'url_passthrough', true);
if (decision === 'accepted') {
  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'
  });
}
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
