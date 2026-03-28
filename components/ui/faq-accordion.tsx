"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border overflow-hidden transition-all duration-200"
            style={{
              borderColor: isOpen ? 'rgba(0,255,135,0.35)' : 'rgba(255,255,255,0.08)',
              background: isOpen ? 'rgba(0,255,135,0.04)' : 'rgba(255,255,255,0.025)',
            }}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span
                className="font-semibold text-base"
                style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {item.question}
              </span>
              <span
                className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  background: isOpen ? 'rgba(0,255,135,0.15)' : 'rgba(255,255,255,0.06)',
                  color: isOpen ? '#00ff87' : 'rgba(248,248,242,0.4)',
                }}
              >
                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </span>
            </button>

            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? '400px' : '0px' }}
            >
              <p
                className="px-6 pb-5 text-sm leading-relaxed"
                style={{ color: 'rgba(248,248,242,0.65)', fontFamily: 'Inter, sans-serif' }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
