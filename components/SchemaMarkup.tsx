// Server Component — renders JSON-LD structured data for SEO
export function SchemaMarkup() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Super Agente IA para WhatsApp — Automatización Comercial",
    "provider": {
      "@type": "Organization",
      "name": "RESUELTO",
      "url": "https://resueltoagency.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "availableLanguage": "Spanish"
      }
    },
    "description": "Sistema de automatización comercial con IA entrenada en tu negocio. Responde WhatsApp Business, califica leads, agenda citas y hace seguimiento automático 24/7.",
    "areaServed": { "@type": "Country", "name": "Perú" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Planes de Automatización IA",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Plan Base",
          "description": "Chatbot WhatsApp IA con respuestas automáticas 24/7 y agendamiento",
          "price": "1500",
          "priceCurrency": "PEN",
          "priceValidUntil": "2026-12-31"
        },
        {
          "@type": "Offer",
          "name": "Plan Plus",
          "description": "Todo Base + nurturing, recuperación de leads fríos, CRM y cold email",
          "price": "3200",
          "priceCurrency": "PEN",
          "priceValidUntil": "2026-12-31"
        },
        {
          "@type": "Offer",
          "name": "Plan Pro",
          "description": "Sistema comercial completo multi-canal con IA avanzada y landing page",
          "price": "5800",
          "priceCurrency": "PEN",
          "priceValidUntil": "2026-12-31"
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Necesito saber programar para usar el sistema?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. El sistema lo configuro de principio a fin. Tú solo defines cómo quieres responder y lo armamos juntos. Al final recibes acceso y un video explicando cómo funciona."
        }
      },
      {
        "@type": "Question",
        "name": "¿En cuánto tiempo está listo el sistema?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Entre 5 y 10 días hábiles desde que iniciamos. El plan Base suele estar listo en 5 días."
        }
      },
      {
        "@type": "Question",
        "name": "¿Funciona con WhatsApp Business o el personal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Funciona con WhatsApp Business API, la versión para empresas con mayor capacidad. Si todavía no la tienes, te guiamos en el proceso de activación."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué pasa si el lead hace una pregunta que no está programada?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El sistema tiene un flujo de derivación a humano. Si el prospecto hace una pregunta fuera del libreto, el sistema le avisa que un asesor lo contactará pronto y te notifica de inmediato."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto me ahorro vs. contratar un asistente?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un asistente cuesta entre S/1,500 y S/2,500 al mes más beneficios. El sistema es un pago único sin planilla, sin rotación, sin días libres. En menos de 2 meses recuperas la inversión."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo cancelar el servicio en cualquier momento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. No hay contrato de permanencia. El sistema queda instalado en tu número y no dependes de nosotros para que funcione."
        }
      }
    ]
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RESUELTO",
    "url": "https://resueltoagency.com",
    "description": "Agencia de automatización comercial con inteligencia artificial para negocios en Perú.",
    "foundingLocation": { "@type": "Place", "name": "Lima, Perú" },
    "areaServed": "PE",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </>
  );
}
