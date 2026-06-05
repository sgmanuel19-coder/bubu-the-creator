"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "5+", label: "años de ejecución real" },
  { value: "2000+", label: "piezas producidas" },
  { value: "5M+", label: "vistas generadas" },
  { value: "20+", label: "marcas trabajadas" },
  { value: "2", label: "agencias globales top-tier" },
];

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden py-6">
      <div className="container-base">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {STATS.map((s, i) => {
            const isG = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-xl border px-4 py-4 text-center"
                style={{
                  border: `1px solid rgba(${isG ? "26,128,255" : "77,159,255"},0.14)`,
                  background: `rgba(${isG ? "26,128,255" : "77,159,255"},0.03)`,
                }}
              >
                <p className={`font-display font-black text-2xl ${isG ? "text-neon-green" : "text-neon-purple"}`}>
                  {s.value}
                </p>
                <p className="font-body text-muted text-[11px] mt-1 leading-snug">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
