import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Fluxa Method — Arquitectura digital · Colombia',
  description:
    'Páginas, automatizaciones, IA, bots de voz, apps y software a medida. Tu visión convertida en tecnología que funciona sola.',
  openGraph: {
    locale: 'es_CO',
    title: 'Fluxa Method — Colombia',
    description: 'Arquitectura digital para marcas que escalan sin operar manualmente.',
  },
};

export default function ColombiaLayout({ children }) {
  return (
    <div className={poppins.variable} style={{ fontFamily: 'var(--font-poppins), Poppins, system-ui, sans-serif' }}>
      {children}
    </div>
  );
}
