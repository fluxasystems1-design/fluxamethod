import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl = 'https://fluxamethod.com';

const title = 'Sistema de crecimiento para traders | Fluxa Method';
const description =
  'Escala tu comunidad de trading con landing pages, VSL, Meta Ads, automatización WhatsApp y academias Skool. Implementación en 15–30 días.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: '/trading',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    title,
    description,
    images: [
      {
        url: '/trading/imagen1trading.png',
        width: 1024,
        height: 1024,
        alt: 'Sistema digital para traders — Fluxa Method',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/trading/imagen1trading.png'],
  },
};

export default function TradingLayout({ children }) {
  return (
    <div
      className={`${poppins.variable} ${poppins.className}`}
      style={{ fontFamily: 'var(--font-poppins), Poppins, system-ui, sans-serif' }}
    >
      {children}
    </div>
  );
}
