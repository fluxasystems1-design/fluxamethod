import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Embajadores Fluxa Method — Programa de Aliados 2026',
  description: 'Página privada para aliados Fluxa Method',
  robots: { index: false, follow: false },
};

export default function EmbajadoresFluxaLayout({ children }) {
  return (
    <div
      className={`${poppins.variable} ${poppins.className}`}
      style={{ fontFamily: 'var(--font-poppins), Poppins, system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
