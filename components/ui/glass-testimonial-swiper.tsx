"use client";

import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';
import { LucideIcon } from 'lucide-react';

export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags: { text: string; type: 'featured' | 'default' }[];
  stats: { icon: LucideIcon; text: string }[];
  avatarGradient: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  visibleBehind?: number;
}

export const TestimonialStack = ({
  testimonials,
  visibleBehind = 2,
}: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback(
    (newIndex: number) => {
      setActiveIndex((newIndex + totalCards) % totalCards);
    },
    [totalCards]
  );

  const handleDragStart = (
    e: React.MouseEvent | React.TouchEvent,
    index: number
  ) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
  };

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      setDragOffset(clientX - dragStartRef.current);
    },
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  if (!testimonials?.length) return null;

  return (
    <section className="relative pb-12 w-full max-w-2xl mx-auto px-4">
      <div className="relative" style={{ height: '340px' }}>
        {testimonials.map((testimonial, index) => {
          const displayOrder = (index - activeIndex + totalCards) % totalCards;

          const style: CSSProperties = {
            position: 'absolute',
            width: '100%',
            transition:
              isDragging && displayOrder === 0
                ? 'none'
                : 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            cursor: displayOrder === 0 ? 'grab' : 'default',
            userSelect: 'none',
          };

          if (displayOrder === 0) {
            style.transform = `translateX(${dragOffset}px)`;
            style.opacity = 1;
            style.zIndex = totalCards;
          } else if (displayOrder <= visibleBehind) {
            style.transform = `scale(${1 - 0.05 * displayOrder}) translateY(${-1.5 * displayOrder}rem)`;
            style.opacity = 1 - 0.25 * displayOrder;
            style.zIndex = totalCards - displayOrder;
          } else {
            style.transform = 'scale(0.85) translateY(-4rem)';
            style.opacity = 0;
            style.zIndex = 0;
          }

          return (
            <div
              key={testimonial.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={style}
              onMouseDown={(e) => handleDragStart(e, index)}
              onTouchStart={(e) => handleDragStart(e, index)}
            >
              <div
                className="rounded-2xl p-6 border"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(0,255,135,0.15)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                    style={{ background: testimonial.avatarGradient }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-base"
                      style={{ color: '#f8f8f2', fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {testimonial.name}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: 'rgba(248,248,242,0.5)', fontFamily: 'Inter, sans-serif' }}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <blockquote
                  className="text-base leading-relaxed mb-4"
                  style={{ color: 'rgba(248,248,242,0.8)', fontFamily: 'Inter, sans-serif' }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div
                  className="flex items-center justify-between border-t pt-3 flex-wrap gap-2"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="flex gap-2 flex-wrap">
                    {testimonial.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={
                          tag.type === 'featured'
                            ? {
                                background: 'rgba(0,255,135,0.12)',
                                color: '#00ff87',
                                border: '1px solid rgba(0,255,135,0.25)',
                              }
                            : {
                                background: 'rgba(255,255,255,0.06)',
                                color: 'rgba(248,248,242,0.6)',
                              }
                        }
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>
                  <div
                    className="flex gap-3 text-xs"
                    style={{ color: 'rgba(248,248,242,0.4)' }}
                  >
                    {testimonial.stats.map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <span key={i} className="flex items-center gap-1">
                          <Icon className="w-3.5 h-3.5" />
                          {stat.text}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => navigate(index)}
            aria-label={`Ir al testimonio ${index + 1}`}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: activeIndex === index ? '#00ff87' : 'rgba(248,248,242,0.2)',
              transform: activeIndex === index ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </section>
  );
};
