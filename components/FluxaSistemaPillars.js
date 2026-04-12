function IconPencil({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMegaphone({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 11v2a2 2 0 002 2h2l4 3V6L7 9H5a2 2 0 00-2 2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 8.5a5 5 0 010 7M19 6a8 8 0 010 12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCheck({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PILLARS = [
  {
    id: 'contenido',
    title: 'Contenido',
    Icon: IconPencil,
    desc: 'Tu sistema de comunicación digital: ADN de marca, formatos por embudo, apoyo con IA donde aplica y un framework replicable para que tu equipo publique con criterio.',
  },
  {
    id: 'trafico',
    title: 'Tráfico',
    Icon: IconMegaphone,
    desc: 'Tu sistema de atracción y promoción: arquitectura de anuncios, campañas por objetivo, creativos alineados a la oferta y métricas para decidir con datos, no a ojo.',
  },
  {
    id: 'ventas',
    title: 'Ventas',
    Icon: IconCheck,
    desc: 'Tu sistema de conversión comercial: oferta clara, protocolos por canal (WhatsApp, redes, web), cierre en fases y calendario comercial para no perder oportunidades.',
  },
];

export default function FluxaSistemaPillars() {
  return (
    <section
      className="section section--reveal section--sistema-pillars"
      id="sistema-fluxa"
      aria-labelledby="sistema-pillars-heading"
    >
      <div className="container">
        <p className="section__eyebrow">¿QUÉ INSTALAMOS CONTIGO?</p>
        <h2 className="section__title sistema-pillars__title" id="sistema-pillars-heading">
          Te damos el sistema listo para que tu equipo lo ejecute
        </h2>
        <p className="section__lead sistema-pillars__lead">
          En semanas dejamos montados los <strong>tres sistemas</strong> que tu negocio necesita en digital:{' '}
          <strong>contenido, tráfico y ventas.</strong> No es un curso ni un PDF: es{' '}
          <strong>estrategia + ejecución con el equipo Fluxa</strong> para que tú te quedes con el tablero y las
          decisiones grandes.
        </p>
        <div className="sistema-pillars-grid">
          {PILLARS.map(({ id, title, Icon, desc }) => (
            <article key={id} className="sistema-pillar-card card card--glass">
              <div className="sistema-pillar-card__icon-wrap" aria-hidden>
                <Icon className="sistema-pillar-card__icon" />
              </div>
              <h3 className="sistema-pillar-card__title">{title}</h3>
              <p className="sistema-pillar-card__desc">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
