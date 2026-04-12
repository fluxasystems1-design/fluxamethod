import './diagnostico.css';

export const metadata = {
  title: 'Diagnóstico Digital Gratuito — Fluxa Method',
  description:
    'Proyecta tu MRR con membresía: escenarios conservador, probable y agresivo. Herramienta gratuita Fluxa Method.',
};

/**
 * Layout dedicado a /diagnostico (sin Navbar/Footer del home).
 * Nota: en App Router el <html>/<body> solo puede estar en app/layout.js raíz;
 * el fondo y la tipografía se aplican vía .diag-layout-root en diagnostico.css.
 */
export default function DiagnosticoLayout({ children }) {
  return <div className="diag-layout-root">{children}</div>;
}
