export default function Navbar({
  ctaHref = '/diagnostico',
  ctaLabel = 'Diagnóstico gratis',
  ctaLabelMobile = 'Diagnóstico gratis',
}) {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar__inner">
        <a href="/" className="navbar__logo">
          Fluxa <span className="navbar__logo--accent">Method</span>
        </a>
        <div className="navbar__actions">
          <a href={ctaHref} className="btn btn--primary navbar__cta">
            <span className="navbar__cta-text navbar__cta-text--desktop">{ctaLabel}</span>
            <span className="navbar__cta-text navbar__cta-text--mobile">{ctaLabelMobile}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
