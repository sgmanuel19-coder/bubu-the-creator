"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  monthlyPrice?: string;
  description: string;
  features: string[];
  recommended?: boolean;
  ctaText: string;
  ctaHref: string;
}

interface PricingModuleProps {
  plans: PricingPlan[];
  footnote?: string;
}

export const PricingModule = ({ plans, footnote }: PricingModuleProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Structure explainer */}
      <div className="flex justify-center mb-10">
        <div
          className="inline-flex items-center gap-6 rounded-xl px-6 py-3 border text-sm"
          style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.09)', fontFamily: 'Inter, sans-serif' }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: '#f8f8f2', fontWeight: 600 }}>Implementación</span>
            <span style={{ color: 'rgba(248,248,242,0.4)' }}>— pago único al inicio</span>
          </div>
          <span style={{ color: 'rgba(248,248,242,0.2)' }}>+</span>
          <div className="flex items-center gap-2">
            <span style={{ color: '#4D9FFF', fontWeight: 600 }}>Fee mensual</span>
            <span style={{ color: 'rgba(248,248,242,0.4)' }}>— desde el mes 2</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
            className="relative rounded-2xl flex flex-col"
            style={{
              padding: 1,
              background: plan.recommended
                ? 'linear-gradient(135deg, #1A80FF 0%, #4D9FFF 40%, #a0c8ff 60%, #1A80FF 100%)'
                : 'linear-gradient(135deg, rgba(100,140,220,0.4) 0%, rgba(160,190,240,0.15) 40%, rgba(77,120,200,0.35) 100%)',
              boxShadow: plan.recommended
                ? '0 0 30px rgba(26,128,255,0.25), 0 0 60px rgba(77,159,255,0.10)'
                : '0 0 20px rgba(77,120,200,0.08)',
            }}
          >
          <div className="rounded-2xl p-6 flex flex-col h-full" style={{
            background: plan.recommended ? 'rgba(6,12,30,0.97)' : 'rgba(6,8,22,0.98)',
          }}>
            {plan.recommended && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: '#1A80FF',
                  color: '#040406',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                <Zap className="w-3 h-3" />
                Mas popular
              </div>
            )}

            <div className="mb-6">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{
                  color: plan.recommended ? '#1A80FF' : 'rgba(248,248,242,0.4)',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {plan.name}
              </p>
              {/* Implementation price */}
              <div className="flex items-end gap-1.5 mb-1">
                <span className="text-4xl font-bold" style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}>
                  {plan.price}
                </span>
                <span className="text-xs mb-2" style={{ color: 'rgba(248,248,242,0.38)', fontFamily: 'Inter, sans-serif' }}>
                  implementación
                </span>
              </div>
              {/* Monthly fee */}
              {plan.monthlyPrice && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg mb-2"
                  style={{ background: 'rgba(77,159,255,0.08)', border: '1px solid rgba(77,159,255,0.2)' }}
                >
                  <span className="text-sm font-bold" style={{ color: '#4D9FFF', fontFamily: 'Poppins, sans-serif' }}>
                    + {plan.monthlyPrice}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(77,159,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
                    /mes desde el mes 2
                  </span>
                </div>
              )}
              <p
                className="text-sm"
                style={{ color: 'rgba(248,248,242,0.55)', fontFamily: 'Inter, sans-serif' }}
              >
                {plan.description}
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature, fi) => (
                <li key={fi} className="flex items-start gap-2.5">
                  <CheckCircle
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: plan.recommended ? '#1A80FF' : 'rgba(26,128,255,0.5)' }}
                  />
                  <span
                    className="text-sm leading-snug"
                    style={{ color: 'rgba(248,248,242,0.75)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={plan.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: 'Poppins, sans-serif',
                background: plan.recommended ? '#1A80FF' : 'rgba(255,255,255,0.06)',
                color: plan.recommended ? '#040406' : '#f8f8f2',
                border: plan.recommended ? 'none' : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {plan.ctaText}
            </a>
          </div>
          </motion.div>
        ))}
      </div>

      {footnote && (
        <p
          className="text-center text-sm mt-8"
          style={{ color: 'rgba(248,248,242,0.4)', fontFamily: 'Inter, sans-serif' }}
        >
          {footnote}
        </p>
      )}

      {/* Guarantee block */}
      <div
        className="flex items-start gap-4 mt-8 mx-auto px-6 py-5 rounded-2xl"
        style={{
          maxWidth: 560,
          border: '1px solid rgba(26,128,255,0.2)',
          background: 'rgba(26,128,255,0.03)',
        }}
      >
        <Shield className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#1A80FF' }} />
        <div>
          <p className="font-semibold text-sm mb-1" style={{ color: '#f8f8f2', fontFamily: 'Poppins, sans-serif' }}>
            Garantía de acompañamiento
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,248,242,0.55)', fontFamily: 'Inter, sans-serif' }}>
            30 días de acompañamiento incluido · Si en 5 días no activamos tu agente, reembolso total · Con contrato
          </p>
        </div>
      </div>
    </div>
  );
};
