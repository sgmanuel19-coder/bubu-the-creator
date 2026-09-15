'use client';
import { useEffect, useRef, useState } from 'react';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (!stored) setVisible(true);
  }, []);

  /* El banner se apoya en el borde inferior, donde tambien viven las barras
     de accion fijas de las landings. Publica su altura para que esas barras
     se corran hacia arriba mientras el visitante no haya decidido. */
  useEffect(() => {
    const raiz = document.documentElement;
    if (!visible) {
      raiz.style.removeProperty('--barra-cookies');
      return;
    }
    const medir = () => {
      const alto = caja.current?.offsetHeight ?? 0;
      raiz.style.setProperty('--barra-cookies', `${alto}px`);
    };
    medir();
    window.addEventListener('resize', medir);
    return () => {
      window.removeEventListener('resize', medir);
      raiz.style.removeProperty('--barra-cookies');
    };
  }, [visible]);

  const respond = (decision: 'accepted' | 'rejected') => {
    localStorage.setItem('cookie-consent', decision);
    setVisible(false);
    window.dispatchEvent(
      new CustomEvent('cookie-consent-change', { detail: decision })
    );
  };

  if (!visible) return null;

  return (
    <div
      ref={caja}
      role="dialog"
      aria-label="Preferencias de cookies"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'rgba(4,4,6,0.97)',
        borderTop: '1px solid rgba(26,128,255,0.2)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
        backdropFilter: 'blur(8px)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '0.8rem',
          color: 'rgba(248,248,242,0.7)',
          fontFamily: 'Inter, sans-serif',
          maxWidth: 640,
          lineHeight: 1.5,
        }}
      >
        Usamos cookies de análisis y publicidad (Meta Pixel) para mejorar la
        experiencia y medir conversiones.{' '}
        <span style={{ color: 'rgba(248,248,242,0.4)' }}>
          El Pixel de Meta solo se activa si aceptas.
        </span>
      </p>
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button
          onClick={() => respond('rejected')}
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'transparent',
            color: 'rgba(248,248,242,0.6)',
            fontSize: '0.8rem',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
          }}
        >
          Solo necesarias
        </button>
        <button
          onClick={() => respond('accepted')}
          style={{
            padding: '8px 20px',
            borderRadius: 6,
            border: 'none',
            background: '#1A80FF',
            color: '#fff',
            fontSize: '0.8rem',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Aceptar todo
        </button>
      </div>
    </div>
  );
}
