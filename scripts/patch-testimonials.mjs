import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(__dirname, '..', 'components', 'FluxaMainSections.js');
let s = fs.readFileSync(p, 'utf8');

const i0 = s.indexOf('<section className="section section--reveal section--testimonials" id="testimonios">');
const i1 = s.indexOf('<section className="section section--reveal" id="planes">', i0);
if (i0 < 0 || i1 < 0) {
  console.error('markers', i0, i1);
  process.exit(1);
}

const newSection = `      <section className="section section--reveal section--testimonials" id="testimonios">
        <div className="container">
          <div className="fluxa-social-proof">
            <p className="fluxa-social-proof__eyebrow">¿Quién instala el sistema?</p>
            <h2 className="fluxa-social-proof__headline">
              Fluxa no solo asesora — <span className="fluxa-social-proof__headline-accent">ejecuta</span>.
            </h2>
            <blockquote className="fluxa-social-proof__manifesto">
              <p>
                Día a día aplicamos en clientes reales lo que diseñamos: contenido, pauta, landings y automatización bajo
                una sola estrategia. Cada entrega la probamos con el mismo rigor que exigimos a tu negocio. No vendemos
                teoría: vendemos sistemas que nosotros mismos operamos.
              </p>
            </blockquote>
            <div className="fluxa-social-proof__stats" role="list">
              {FLUXA_INSTALLER_STATS.map(function (s) {
                return (
                  <div key={s.label} className="fluxa-social-proof__stat card card--glass" role="listitem">
                    <span className="fluxa-social-proof__stat-num">{s.num}</span>
                    <span className="fluxa-social-proof__stat-label">{s.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="fluxa-social-proof__carousel" aria-label="Testimonios de clientes">
              <div className="fluxa-social-proof__cards">
                {testimonialSlice.map(function (t) {
                  return (
                    <article key={t.id} className="fluxa-social-proof__card card card--glass">
                      <div className="fluxa-social-proof__stars" aria-hidden="true">
                        {'\u2605\u2605\u2605\u2605\u2605'}
                      </div>
                      <p className="fluxa-social-proof__quote">&ldquo;{t.quote}&rdquo;</p>
                      <div className="fluxa-social-proof__person">
                        <div
                          className={'fluxa-social-proof__avatar ' + t.avatarClass}
                          aria-hidden="true"
                        >
                          {t.initials}
                        </div>
                        <div className="fluxa-social-proof__person-text">
                          <p className="fluxa-social-proof__name">{t.name}</p>
                          <p className="fluxa-social-proof__role">{t.role}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="fluxa-social-proof__nav">
                <button
                  type="button"
                  className="fluxa-social-proof__arrow"
                  aria-label="Anterior"
                  onClick={function () {
                    setTestimonialPage(function (p) {
                      var pages = Math.max(1, Math.ceil(FLUXA_TESTIMONIALS.length / testimonialPageSize));
                      var cur = Math.min(p, pages - 1);
                      return (cur - 1 + pages) % pages;
                    });
                  }}
                >
                  ←
                </button>
                <div className="fluxa-social-proof__dots" role="tablist" aria-label="Página de testimonios">
                  {Array.from({ length: testimonialPages }).map(function (_, i) {
                    return (
                      <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={i === safeTestimonialPage}
                        className={
                          'fluxa-social-proof__dot' + (i === safeTestimonialPage ? ' fluxa-social-proof__dot--active' : '')
                        }
                        aria-label={'Página ' + (i + 1) + ' de ' + testimonialPages}
                        onClick={function () {
                          setTestimonialPage(i);
                        }}
                      />
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="fluxa-social-proof__arrow"
                  aria-label="Siguiente"
                  onClick={function () {
                    setTestimonialPage(function (p) {
                      var pages = Math.max(1, Math.ceil(FLUXA_TESTIMONIALS.length / testimonialPageSize));
                      var cur = Math.min(p, pages - 1);
                      return (cur + 1) % pages;
                    });
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

`;

s = s.slice(0, i0) + newSection + s.slice(i1);
fs.writeFileSync(p, s);
console.log('ok');
