'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WA_LINK =
  'https://wa.me/51907462070?text=Hola,%20quiero%20info%20sobre%20el%20Sistema%20de%20Automatizacion%20IA';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0, -3, 0] }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { type: 'spring', stiffness: 260, damping: 20 },
            y: {
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: 'easeInOut',
              times: [0, 0.3, 0.6, 0.8, 1],
            },
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            boxShadow: '0 4px 32px rgba(37,211,102,0.45)',
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Agendar demo por WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white flex-shrink-0" />
          <span
            className="text-white text-sm font-semibold"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Agendar Demo
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
