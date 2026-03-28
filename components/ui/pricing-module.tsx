"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react';

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
  const [isMonthly, setIsMonthly] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div
          className="inline-flex items-center rounded-xl p-1 border"
          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <button
            onClick={() => setIsMonthly(false)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              background: !isMonthly ? 'rgba(0,255,135,0.15)' : 'transparent',
              color: !isMonthly ? '#00ff87' : 'rgba(248,248,242,0.5)',
              border: !isMonthly ? '1px solid rgba(0,255,135,0.3)' : '1px solid transparent',
            }}
          >
            Setup unico
          </button>
          <button
            onClick={() => setIsMonthly(true)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              background: isMonthly ? 'rgba(0,255,135,0.15)' : 'transparent',
              color: isMonthly ? '#00ff87' : 'rgba(248,248,242,0.5)',
              border: isMonthly ? '1px solid rgba(0,255,135,0.3)' : '1px solid transparent',
            }}
          >
            Setup + Mensualidad
          </button>
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
            className="relative rounded-2xl p-6 flex flex-col"
            style={{
              background: plan.recommended
                ? 'rgba(0,255,135,0.05)'
                : 'rgba(255,255,255,0.03)',
              border: plan.recommended
                ? '1px solid rgba(0,255,135,0.35)'
                : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {plan.recommended && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: '#00ff87',
                  color: '#060608',
                  fontFamily: 'Space Grotesk, sans-serif',
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
                  color: plan.recommended ? '#00ff87' : 'rgba(248,248,242,0.4)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                {plan.name}
              </p>
              <div className="flex items-end gap-1 mb-2">
                <span
                  className="text-4xl font-bold"
                  style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {isMonthly && plan.monthlyPrice ? plan.monthlyPrice : plan.price}
                </span>
                {isMonthly && plan.monthlyPrice && (
                  <span
                    className="text-sm mb-1.5"
                    style={{ color: 'rgba(248,248,242,0.4)', fontFamily: 'Inter, sans-serif' }}
                  >
                    /mes
                  </span>
                )}
              </div>
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
                    style={{ color: plan.recommended ? '#00ff87' : 'rgba(0,255,135,0.5)' }}
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
                fontFamily: 'Space Grotesk, sans-serif',
                background: plan.recommended ? '#00ff87' : 'rgba(255,255,255,0.06)',
                color: plan.recommended ? '#060608' : '#f8f8f2',
                border: plan.recommended ? 'none' : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              {plan.ctaText}
            </a>
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
    </div>
  );
};
