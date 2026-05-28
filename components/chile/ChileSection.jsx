'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Sección con fadeInUp al entrar en viewport */
export default function ChileSection({ children, className = '', id }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px' }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
