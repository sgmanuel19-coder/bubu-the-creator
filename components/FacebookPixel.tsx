'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// ============================================================
// PIXEL DE META + CONVERSIONS API
//
// El Pixel del navegador y el endpoint /api/meta/capi mandan el MISMO
// evento con el MISMO `event_id`. Meta los deduplica y cuenta uno solo,
// pero si uno de los dos caminos se cae, el otro salva el evento.
//
// El listener de clics vive en React (no en el script inline) porque
// necesita generar el event_id y compartirlo entre ambos envíos. Tener
// dos listeners dispararía `Lead` dos veces —uno sin event_id— y ese no
// se puede deduplicar: Meta contaría doble.
// ============================================================

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function leerCookie(nombre: string): string | undefined {
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith(nombre + '='))
    ?.split('=')
    .slice(1)
    .join('=');
}

export default function FacebookPixel() {
  const [hasConsent, setHasConsent] = useState(false);
  // El valor guardado en Vercel arrastra un BOM (U+FEFF) invisible al
  // inicio — resto de un .env escrito en UTF-8 con BOM. Sin limpiarlo, la
  // validación de más abajo falla, el componente devuelve null y el Pixel
  // nunca carga. Como el ID es numérico, se descarta todo lo que no sea
  // dígito: cubre también comillas, espacios y saltos de línea.
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID?.replace(/\D/g, '');

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    setHasConsent(stored === 'accepted');

    const handleConsent = (e: Event) => {
      setHasConsent((e as CustomEvent<string>).detail === 'accepted');
    };
    window.addEventListener('cookie-consent-change', handleConsent);
    return () => window.removeEventListener('cookie-consent-change', handleConsent);
  }, []);

  // Clic en cualquier enlace de WhatsApp → evento Lead por los dos canales.
  useEffect(() => {
    if (!hasConsent) return;

    function onClick(e: MouseEvent) {
      let el = e.target as HTMLElement | null;
      while (el && el.tagName !== 'A') el = el.parentElement;
      const enlace = el as HTMLAnchorElement | null;
      const href = enlace?.href;
      if (!href) return;
      if (!href.includes('wa.me') && !href.includes('whatsapp.com')) return;

      const eventId = `lead.${Date.now()}.${Math.random().toString(36).slice(2, 10)}`;
      // La ruta permite separar en Events Manager los leads que vienen de
      // la landing pagada de los que vienen del sitio orgánico.
      const ruta = window.location.pathname;

      window.fbq?.(
        'track',
        'Lead',
        { content_name: 'WhatsApp CTA', content_category: ruta },
        { eventID: eventId },
      );

      // `keepalive` deja que la petición termine de salir aunque el
      // navegador ya esté yéndose a WhatsApp. Sin esto se perdería justo
      // el evento que más importa.
      fetch('/api/meta/capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          eventName: 'Lead',
          eventId,
          eventSourceUrl: window.location.href,
          contentName: 'WhatsApp CTA',
          contentCategory: ruta,
          fbp: leerCookie('_fbp'),
          fbc: leerCookie('_fbc'),
        }),
      }).catch(() => {
        // Si CAPI falla, el Pixel del navegador ya cubrió el evento.
      });
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [hasConsent]);

  const isValidPixelId = /^\d{10,20}$/.test(pixelId ?? '');
  if (!pixelId || !isValidPixelId || !hasConsent) return null;

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
