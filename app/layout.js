import './globals.css';

const fontHref =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap';

export const metadata = {
  title: 'Fluxa Method — Acompañamiento Digital Completo',
  description:
    'Contenido, pauta, landings y automatizaciones. Tu equipo de marketing digital completo en Colombia y Latinoamérica.',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    title: 'Fluxa Method',
    description: 'Tu equipo de marketing digital completo.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontHref} rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
