const iframeSandbox = 'allow-scripts allow-same-origin allow-forms allow-popups';

export default function PhoneMockup({ slides = [] }) {
  if (!slides.length) return null;

  return (
    <section className="mockup-section" id="demos-mockup">
      <div className="container">
        <p className="mockup-badge-top">🌐 Ejemplos reales del tipo de sistemas que instalamos</p>
        <p className="mockup-label">✦ Prueba visual</p>
        <h2 className="mockup-title">Landings y experiencias listas para vender</h2>
        <p className="mockup-subtitle">Cada demo es navegable. Desliza para ver diferentes tipos de negocios.</p>
        <div className="mockup-wrapper">
          <button type="button" className="mockup-arrow mockup-arrow--prev mockup-arrow--side" aria-label="Landing anterior">
            &#8592;
          </button>
          <div className="mockup-phone">
            <div className="phone-speaker" />
            <div className="phone-camera" />
            <div className="phone-screen">
              <div className="phone-slides">
                {slides.map((slide, i) => (
                  <div key={slide.src} className={`phone-slide${i === 0 ? ' active' : ''}`}>
                    <iframe
                      src={slide.src}
                      title={slide.title}
                      loading="lazy"
                      sandbox={iframeSandbox}
                      style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="phone-home-bar" />
          </div>
          <button type="button" className="mockup-arrow mockup-arrow--next mockup-arrow--side" aria-label="Siguiente landing">
            &#8594;
          </button>
        </div>
        <div className="mockup-controls">
          <button type="button" className="mockup-arrow mockup-arrow--prev mockup-arrow--bottom" aria-label="Landing anterior">
            &#8592;
          </button>
          <div className="mockup-progress" role="group" aria-label="Elegir demo de landing">
            {slides.map((slide, i) => (
              <button
                key={`seg-${slide.src}`}
                type="button"
                className={`mockup-seg${i === 0 ? ' active' : ''}`}
                aria-label={`Ver demo ${slide.title}`}
                aria-current={i === 0 ? 'true' : undefined}
              />
            ))}
          </div>
          <button type="button" className="mockup-arrow mockup-arrow--next mockup-arrow--bottom" aria-label="Siguiente landing">
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
