import './diagnostico.css';

export const metadata = {
  title: 'Diagnóstico Digital Gratuito — Fluxa Method',
  description:
    'Proyecta tu MRR con membresía: escenarios conservador, probable y agresivo. Herramienta gratuita Fluxa Method.',
};

export default function DiagnosticoLayout({ children }) {
  return <div className="diag-layout-root">{children}</div>;
}
