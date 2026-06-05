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
    <section className="relative border-y border-cream/8">
      <div className="container-base">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-cream/8">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="px-5 py-7 first:pl-0"
            >
              <p className="font-display font-black text-cream text-2xl lg:text-[1.7rem] tabular-nums leading-none">
                {s.value}
              </p>
              <p className="font-body text-muted text-[11.5px] mt-2 leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
