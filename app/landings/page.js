'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Minus, Rocket, Building2, ShoppingCart } from 'lucide-react';
import { FallingPattern } from './FallingPattern';
import LandingsGlobeSection from '@/components/landings/LandingsGlobeSection';
import LandingsVitrinaCarousel from '@/components/landings/LandingsVitrinaCarousel';
import styles from './page.module.css';

const WA_PRIMARY = 'https://wa.me/573105813007';

const INCLUDE_CARDS = [
  { icon: '📱', title: 'Responsive', text: 'Se ve perfecto en celular y computador' },
  { icon: '⚡', title: 'Entrega rápida', text: 'Máximo 3 días hábiles' },
  { icon: '📩', title: 'Formulario funcional', text: 'Los mensajes llegan directo a tu correo' },
  { icon: '💬', title: 'Botón WhatsApp', text: 'Flotante, siempre visible' },
  { icon: '🎨', title: 'Diseño personalizado', text: 'Con tus colores y tu logo' },
  { icon: '🔄', title: 'Un ajuste incluido', text: 'Cambios sin costo adicional' },
];

const PRICE_CHECKS = [
  'Diseño 100% personalizado',
  'Responsive para celular y desktop',
  'Formulario al correo',
  'Botón WhatsApp flotante',
  'Entrega en máximo 3 días',
  'Un ajuste sin costo',
];

const PROCESS_STEPS = [
  { icon: '💬', title: 'Nos escribes', text: 'Por WhatsApp, sin formularios' },
  { icon: '📋', title: 'Nos cuentas', text: 'Tu negocio, colores y logo' },
  { icon: '🎨', title: 'Diseñamos', text: 'Tú apruebas antes de publicar' },
  { icon: '🚀', title: 'Publicamos', text: 'Lista en máximo 3 días' },
];

const HERO_MICRO_CARDS = [
  { icon: '⚡', title: 'Entrega en 3 días', sub: 'Máximo 3 días hábiles' },
  { icon: '👁️', title: 'Ves el diseño primero', sub: 'Apruebas antes de publicar' },
  { icon: '💬', title: 'Todo por WhatsApp', sub: 'Sin reuniones ni formularios' },
  { icon: '🔄', title: 'Un ajuste incluido', sub: 'Sin costo adicional' },
];

const WA_LANDING_PLAN_TABLE = 'https://wa.me/573105813007';

const RSP_MOBILE_VIDEO_SRC =
  '/imagenes/' + encodeURIComponent('Video referencia .mov');

const PRICING_FEATURE_ROWS = [
  { label: 'Diseño personalizado', l: 'check', i: 'check', e: 'check' },
  { label: '100% responsive', l: 'check', i: 'check', e: 'check' },
  { label: 'Formulario de contacto', l: 'check', i: 'check', e: 'check' },
  { label: 'Botón WhatsApp flotante', l: 'check', i: 'check', e: 'check' },
  { label: 'SEO básico incluido', l: 'check', i: 'check', e: 'check' },
  { label: 'Entrega en 3 días', l: 'check', i: 'minus', e: 'minus' },
  { label: 'Múltiples páginas', l: 'minus', i: 'check', e: 'check' },
  { label: 'Blog / noticias', l: 'minus', i: 'check', e: 'check' },
  { label: 'Panel de administración', l: 'minus', i: 'check', e: 'check' },
  { label: 'Carrito de compras', l: 'minus', i: 'minus', e: 'check' },
  { label: 'Pasarela de pagos (Wompi)', l: 'minus', i: 'minus', e: 'check' },
  { label: 'Soporte post-entrega', l: 'minus', i: '15 días', e: '30 días' },
];

const PRICING_MOBILE_STACK = [
  {
    key: 'landing',
    featured: true,
    name: 'Landing',
    planBadge: 'El más popular',
    icon: Rocket,
    priceMain: '$200.000',
    priceStruck: '$350.000',
    featuresList: [
      'Diseño personalizado',
      '100% responsive',
      'Formulario de contacto',
      'Botón WhatsApp flotante',
      'SEO básico',
      'Entrega en 3 días',
      'Un ajuste incluido',
    ],
    ctaGreen: true,
    ctaHref: WA_LANDING_PLAN_TABLE,
    ctaLabel: 'Escribir por WhatsApp →',
  },
  {
    key: 'institucional',
    featured: false,
    name: 'Institucional',
    planBadge: 'Para empresas',
    icon: Building2,
    priceMain: 'Desde $800.000',
    priceStruck: '$1.500.000',
    featuresList: [
      'Diseño personalizado',
      '100% responsive',
      'Múltiples páginas',
      'Blog / noticias',
      'Panel de administración',
      'SEO básico',
      'Soporte 15 días',
    ],
    ctaGreen: false,
    ctaHref: WA_PRIMARY,
    ctaLabel: 'Cotizar →',
  },
  {
    key: 'ecommerce',
    featured: false,
    name: 'Ecommerce',
    planBadge: 'Tienda completa',
    icon: ShoppingCart,
    priceMain: 'Desde $1.500.000',
    priceStruck: '$2.500.000',
    featuresList: [
      'Diseño personalizado',
      '100% responsive',
      'Carrito de compras',
      'Pasarela de pagos (Wompi)',
      'Panel de administración',
      'SEO básico',
      'Soporte 30 días',
    ],
    ctaGreen: false,
    ctaHref: WA_PRIMARY,
    ctaLabel: 'Cotizar →',
  },
];

function renderPricingCell(value) {
  if (value === 'check') {
    return (
      <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
        <Check size={14} color="#22c55e" strokeWidth={2.5} aria-hidden />
      </span>
    );
  }
  if (value === 'minus') {
    return (
      <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
        <Minus size={14} color="#475569" aria-hidden />
      </span>
    );
  }
  return <span style={{ fontSize: 12, color: '#94a3b8' }}>{value}</span>;
}

function OrbitIconsField() {
  var hostRef = useRef(null);

  useEffect(function () {
    var host = hostRef.current;
    if (!host) return undefined;
    var nodes = host.querySelectorAll('[data-orbit-icon]');
    var items = [];
    var i;
    for (i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      items.push({
        el: node,
        r: Number(node.getAttribute('data-r')),
        speed: Number(node.getAttribute('data-speed')),
        dir: Number(node.getAttribute('data-dir')),
        angle: Number(node.getAttribute('data-phase')),
      });
    }

    var frameId = 0;

    function tick() {
      var w = host.offsetWidth || 280;
      var scale = w / 400;
      var j;
      for (j = 0; j < items.length; j++) {
        var o = items[j];
        o.angle += o.speed * o.dir;
        var xr = o.r * scale * Math.cos(o.angle);
        var yr = o.r * scale * Math.sin(o.angle);
        o.el.style.transform = 'translate(-50%, -50%) translate(' + xr + 'px,' + yr + 'px)';
      }
      frameId = window.requestAnimationFrame(tick);
    }

    frameId = window.requestAnimationFrame(tick);

    return function () {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className={styles.orbitHost} ref={hostRef}>
      <div className={styles.orbitRing + ' ' + styles.orbitRing1} aria-hidden />
      <div className={styles.orbitRing + ' ' + styles.orbitRing2} aria-hidden />
      <div className={styles.orbitRing + ' ' + styles.orbitRing3} aria-hidden />
      <div className={styles.orbitCenterLogo} aria-hidden>
        F
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="80"
        data-speed="0.008"
        data-dir="1"
        data-phase="0"
      >
        ⚡
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="80"
        data-speed="0.008"
        data-dir="1"
        data-phase="3.14159"
      >
        📱
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="130"
        data-speed="0.005"
        data-dir="-1"
        data-phase="0"
      >
        🔒
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="130"
        data-speed="0.005"
        data-dir="-1"
        data-phase="2.0944"
      >
        📧
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="130"
        data-speed="0.005"
        data-dir="-1"
        data-phase="4.18879"
      >
        💬
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="180"
        data-speed="0.003"
        data-dir="1"
        data-phase="0"
      >
        🎨
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="180"
        data-speed="0.003"
        data-dir="1"
        data-phase="2.0944"
      >
        📊
      </div>
      <div
        className={styles.orbitIcon}
        data-orbit-icon
        data-r="180"
        data-speed="0.003"
        data-dir="1"
        data-phase="4.18879"
      >
        🚀
      </div>
    </div>
  );
}

export default function LandingsPage() {
  const [responsiveView, setResponsiveView] = useState('mobile');
  const heroSectionRef = useRef(null);
  const heroCanvasRef = useRef(null);
  const rspMobileVideoRef = useRef(null);

  useEffect(
    function () {
      var video = rspMobileVideoRef.current;
      if (!video) return undefined;

      if (responsiveView !== 'mobile') {
        video.pause();
        return undefined;
      }

      var frameId = window.requestAnimationFrame(function () {
        var playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(function () {});
        }
      });

      return function () {
        window.cancelAnimationFrame(frameId);
      };
    },
    [responsiveView],
  );

  useEffect(function () {
    var section = heroSectionRef.current;
    var canvas = heroCanvasRef.current;
    if (!section || !canvas) return undefined;

    var ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    var lines = [];
    var frameId = 0;

    function buildLines(w, h) {
      var count = Math.max(48, Math.min(240, Math.floor((w * h) / 4500)));
      var arr = [];
      var i;
      for (i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * w,
          y: Math.random() * (h + h * 0.5) - h * 0.7,
          speed: 1 + Math.random() * 4.2,
          len: 12 + Math.random() * 48,
          lw: 0.5 + Math.random() * 1.1,
        });
      }
      return arr;
    }

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      var w = section.offsetWidth;
      var h = section.offsetHeight;
      if (w < 1 || h < 1) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lines = buildLines(w, h);
    }

    function tick() {
      var w = section.offsetWidth;
      var h = section.offsetHeight;
      if (w < 1 || h < 1) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      var i;
      for (i = 0; i < lines.length; i++) {
        var L = lines[i];
        L.y += L.speed;
        if (L.y > h + L.len) {
          L.y = -L.len - Math.random() * h * 0.4;
          L.x = Math.random() * w;
          L.speed = 1 + Math.random() * 4.2;
        }
        ctx.strokeStyle = 'rgba(124,58,237,0.35)';
        ctx.lineWidth = L.lw;
        ctx.beginPath();
        ctx.moveTo(L.x, L.y);
        ctx.lineTo(L.x, L.y + L.len);
        ctx.stroke();
      }
      frameId = window.requestAnimationFrame(tick);
    }

    resize();
    var ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(section);
    window.addEventListener('resize', resize);

    frameId = window.requestAnimationFrame(tick);

    return function cleanup() {
      window.cancelAnimationFrame(frameId);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageFallingLayer} aria-hidden="true">
        <FallingPattern
          color="rgba(124, 58, 237, 0.4)"
          backgroundColor="#0a0a0a"
          duration={150}
          blurIntensity="1em"
          density={1}
          className={styles.pageFallingInner}
        />
      </div>
      <main className={styles.pageMain}>
        <section className={styles.hero} ref={heroSectionRef}>
          <canvas className={styles.heroCanvas} ref={heroCanvasRef} aria-hidden="true" />
          <div className={styles.heroCanvasOverlay} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <p className={styles.heroBadge}>
                <span className={styles.heroBadgeBolt} aria-hidden="true">
                  ⚡
                </span>{' '}
                Entrega en máximo 3 días
              </p>
              <div className={styles.heroTitleWrap}>
                <div className={styles.heroTitleGlow} aria-hidden="true" />
                <h1 className={styles.heroTitle}>
                  Tu negocio necesita
                  <br />
                  <span className={styles.heroTitleLine2}>
                    una página <span className={styles.heroTitleGradient}>que venda</span>
                  </span>
                </h1>
              </div>
              <p
                style={{
                  margin: '0 auto',
                  maxWidth: 360,
                  width: '100%',
                  fontSize: 14,
                  color: '#94a3b8',
                  lineHeight: 1.7,
                  textAlign: 'center',
                }}
              >
                Diseño profesional, entrega en 3 días y
                <br />
                todo el proceso por WhatsApp. Sin vueltas.
              </p>

              <div className={styles.heroPriceRibbon}>
                <span className={styles.heroPriceRibbonFrom}>desde</span>
                <span className={styles.heroPriceRibbonOld}>$350.000</span>
                <span className={styles.heroPriceRibbonNow}>$200.000 COP</span>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: 8,
                    padding: '3px 12px',
                    fontSize: 11,
                    background: 'rgba(239, 68, 68, 0.15)',
                    color: '#f87171',
                    borderRadius: 999,
                  }}
                >
                  🔥 Oferta limitada
                </span>
              </div>

              <div
                className={styles.heroButtons}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  marginTop: '1.2rem',
                }}
              >
                <a className={styles.btnWhatsAppHero} href={WA_PRIMARY} target="_blank" rel="noopener noreferrer">
                  Escribir por WhatsApp →
                </a>
                <a className={styles.btnGhostHero} href="#ejemplos">
                  Ver ejemplos
                </a>
              </div>

              <div className={styles.heroMiniGrid} role="group" aria-label="Beneficios clave">
                {HERO_MICRO_CARDS.map(function (item) {
                  return (
                    <div key={item.title} className={styles.heroMiniCard}>
                      <div className={styles.heroMiniIcon} aria-hidden="true">
                        {item.icon}
                      </div>
                      <div className={styles.heroMiniTexts}>
                        <div className={styles.heroMiniTitle}>{item.title}</div>
                        <div className={styles.heroMiniSub}>{item.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="sale-web-heading">
          <style
            dangerouslySetInnerHTML={{
              __html:
                '@keyframes spv-in{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}' +
                '@keyframes spv-arr{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:translateX(0)}}' +
                '.spv-inner{box-sizing:border-box;max-width:560px;margin:0 auto;padding:1.25rem 1rem;text-align:center}' +
                '.spv-cards-row{display:flex;flex-direction:row;align-items:stretch;gap:12px;overflow-x:auto;-webkit-overflow-scrolling:touch;' +
                'scroll-snap-type:x proximity;scroll-padding:0 8px;padding:4px 8px 14px;justify-content:flex-start;touch-action:pan-x}' +
                '.spv-cards-row::-webkit-scrollbar{height:5px}' +
                '.spv-cards-row::-webkit-scrollbar-thumb{background:rgba(124,58,237,.35);border-radius:99px}' +
                '.spv-card{box-sizing:border-box;min-width:150px;max-width:170px;width:150px;flex-shrink:0;scroll-snap-align:start;' +
                'display:flex;flex-direction:column;justify-content:flex-start;min-height:124px;' +
                'background:#111111;border:1px solid #1e293b;border-radius:14px;padding:16px 14px;text-align:center;' +
                'transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease;animation:spv-in .58s cubic-bezier(.22,1,.36,1) forwards;opacity:0}' +
                '@media (max-width:767px){' +
                '.spv-inner{padding-left:max(12px, env(safe-area-inset-left));padding-right:max(12px, env(safe-area-inset-right));padding-top:1rem;padding-bottom:1.1rem}' +
                '.spv-cards-row{gap:8px;padding:4px 2px 12px;justify-content:center;flex-wrap:nowrap;overflow-x:visible;' +
                'scroll-snap-type:none;-webkit-overflow-scrolling:auto;touch-action:manipulation}' +
                '.spv-card{flex:0 0 calc((100% - 16px)/3)!important;width:calc((100% - 16px)/3)!important;min-width:0!important;' +
                'max-width:none!important;padding:10px 6px!important;border-radius:11px!important;min-height:0!important;' +
                'scroll-snap-align:none}' +
                '.spv-card > div:first-of-type{font-size:21px!important;line-height:1!important;margin-bottom:5px!important}' +
                '.spv-card h3{font-size:11px!important;font-weight:700!important;line-height:1.25!important}' +
                '.spv-card p{font-size:9.5px!important;line-height:1.42!important;margin-top:4px!important;word-break:break-word}' +
                '}' +
                '.spv-card:hover{transform:translateY(-5px);box-shadow:0 14px 32px rgba(0,0,0,.38)}' +
                '.spv-card--spot{background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.4)}' +
                '.spv-card--spot:hover{box-shadow:0 14px 36px rgba(124,58,237,.22)}' +
                '.spv-d0{animation-delay:.06s}.spv-d1{animation-delay:.2s}.spv-d2{animation-delay:.34s}' +
                '.spv-arrow{display:none;align-items:center;justify-content:center;font-size:20px;color:#334155;flex-shrink:0;' +
                'align-self:center;min-height:48px;animation:spv-arr .45s ease .42s forwards;opacity:0}' +
                '@media (min-width:768px){' +
                '.spv-cards-row{justify-content:center;overflow-x:visible;flex-wrap:nowrap;padding:4px 0 8px;scroll-snap-type:none}' +
                '.spv-arrow{display:flex}' +
                '}' +
                '@media (prefers-reduced-motion:reduce){' +
                '.spv-card,.spv-arrow{animation:none!important;opacity:1!important;transform:none!important}' +
                '.spv-card:hover{transform:none;box-shadow:none}' +
                '.spv-card--spot:hover{box-shadow:none}' +
                '}',
            }}
          />
          <div className="spv-inner">
            <p
              style={{
                margin: '0 0 4px',
                fontSize: 15,
                fontWeight: 400,
                color: '#94a3b8',
              }}
            >
              Una página pensada para una sola cosa:
            </p>
            <h2
              id="sale-web-heading"
              style={{
                margin: '0 0 1.5rem',
                fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Que el cliente te contacte.
            </h2>

            <div
              className="spv-cards-row"
              role="group"
              aria-label="Te ven, te contactan, te compran"
            >
              <article className="spv-card spv-d0">
                <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 8 }} aria-hidden="true">
                  👀
                </div>
                <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#fff' }}>Te ven</h3>
                <p style={{ margin: '6px 0 0', fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>
                  El cliente llega a tu página desde Instagram, Google o WhatsApp
                </p>
              </article>

              <span className="spv-arrow" aria-hidden="true">
                →
              </span>

              <article className="spv-card spv-card--spot spv-d1">
                <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 8 }} aria-hidden="true">
                  💬
                </div>
                <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>Te contactan</h3>
              </article>

              <span className="spv-arrow" aria-hidden="true">
                →
              </span>

              <article className="spv-card spv-d2">
                <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 8 }} aria-hidden="true">
                  💰
                </div>
                <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#fff' }}>Te compran</h3>
                <p style={{ margin: '6px 0 0', fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>
                  Conviertes visitas en clientes sin hablar con nadie primero
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.sectionIncludes} aria-labelledby="includes-heading">
          <div className={styles.container}>
            <h2 id="includes-heading" className={styles.sectionTitle}>
              Todo lo que necesitas, sin pagar de más
            </h2>
            <div className={styles.includeGrid}>
              {INCLUDE_CARDS.map(function (item) {
                return (
                  <article key={item.title} className={styles.includeCard}>
                    <span className={styles.includeIcon} aria-hidden>
                      {item.icon}
                    </span>
                    <h3 className={styles.includeCardTitle}>{item.title}</h3>
                    <p className={styles.includeCardText}>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <LandingsVitrinaCarousel />

        <LandingsGlobeSection />

        <section className={styles.sectionResponsive} aria-labelledby="responsive-heading">
          <div className={styles.container}>
            <h2 id="responsive-heading" className={styles.sectionTitle}>
              Se ve perfecto en cualquier pantalla
            </h2>
            <p className={styles.responsiveSubtitle}>
              Tus clientes te encuentran desde el celular o el computador
            </p>

            <div className={styles.rspToggleRow}>
              <button
                type="button"
                className={
                  responsiveView === 'mobile'
                    ? styles.rspToggleBtn + ' ' + styles.rspToggleBtnActive
                    : styles.rspToggleBtn + ' ' + styles.rspToggleBtnInactive
                }
                onClick={function () {
                  setResponsiveView('mobile');
                }}
                aria-pressed={responsiveView === 'mobile'}
              >
                📱 Móvil
              </button>
              <button
                type="button"
                className={
                  responsiveView === 'desktop'
                    ? styles.rspToggleBtn + ' ' + styles.rspToggleBtnActive
                    : styles.rspToggleBtn + ' ' + styles.rspToggleBtnInactive
                }
                onClick={function () {
                  setResponsiveView('desktop');
                }}
                aria-pressed={responsiveView === 'desktop'}
              >
                💻 Desktop
              </button>
            </div>

            <div className={styles.rspViewStage}>
              <div
                className={
                  styles.rspDesktopWrap +
                  (responsiveView === 'desktop' ? ' ' + styles.rspPanelVisible : ' ' + styles.rspPanelHidden)
                }
                aria-hidden={responsiveView !== 'desktop'}
              >
                <div className={styles.rspBrowser}>
                  <div className={styles.rspBrowserScreen}>
                    <img
                      src="/imagenes/imagen2.png"
                      alt=""
                      className={styles.rspImgDesktop}
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              <div
                className={
                  styles.rspMobileWrap +
                  (responsiveView === 'mobile' ? ' ' + styles.rspPanelVisible : ' ' + styles.rspPanelHidden)
                }
                aria-hidden={responsiveView !== 'mobile'}
              >
                <div className={styles.rspPhone}>
                  <div className={styles.rspPhoneScreen}>
                    <video
                      ref={rspMobileVideoRef}
                      src={RSP_MOBILE_VIDEO_SRC}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className={styles.rspPhoneVideo}
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        pointerEvents: 'none',
                      }}
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionPrice} aria-labelledby="price-heading">
          <div className={styles.containerNarrow}>
            <p className={styles.priceLabel}>Inversión única</p>
            <p className={styles.priceStruck}>$350.000</p>
            <p className={styles.priceReal}>$200.000 COP</p>
            <ul className={styles.priceList}>
              {PRICE_CHECKS.map(function (line) {
                return (
                  <li key={line} className={styles.priceLi}>
                    <span className={styles.priceCheck} aria-hidden>
                      ✓
                    </span>
                    {line}
                  </li>
                );
              })}
            </ul>
            <p className={styles.priceNote}>* Dominio y hosting no incluidos</p>
            <a className={styles.btnPriceCta} href={WA_PRIMARY} target="_blank" rel="noopener noreferrer">
              Quiero mi landing ahora →
            </a>
          </div>
        </section>

        <section className={styles.sectionProcess} aria-labelledby="process-heading">
          <div className={styles.container}>
            <h2 id="process-heading" className={styles.sectionTitle}>
              Así de fácil funciona
            </h2>
            <ol className={styles.processList}>
              {PROCESS_STEPS.map(function (step) {
                return (
                  <li key={step.title} className={styles.processStep}>
                    <span className={styles.processIcon} aria-hidden>
                      {step.icon}
                    </span>
                    <div className={styles.processBody}>
                      <h3 className={styles.processTitle}>{step.title}</h3>
                      <p className={styles.processText}>{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className={styles.sectionOrbit} aria-labelledby="orbit-tech-heading">
          <div className={styles.container}>
            <h2 id="orbit-tech-heading" className={styles.sectionTitle}>
              Construido con tecnología de primer nivel
            </h2>
            <p className={styles.sectionOrbitSub}>
              Las mismas herramientas que usan las empresas más grandes del mundo
            </p>
            <div className={styles.orbitGrid}>
              <div className={styles.orbitTextCol}>
                <h3 className={styles.orbitHeading}>Tu landing, construida para vender</h3>
                <p className={styles.orbitBody}>
                  Usamos las tecnologías más modernas para que tu página cargue rápido, se vea increíble
                  y convierta visitantes en clientes.
                </p>
                <a className={styles.orbitCtaWhats} href={WA_PRIMARY} target="_blank" rel="noopener noreferrer">
                  Escribir por WhatsApp →
                </a>
              </div>
              <div className={styles.orbitVisualCol}>
                <OrbitIconsField />
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="complex-pricing-heading"
          style={{
            background: 'transparent',
            padding: '0 16px 40px',
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html:
                '.lpc-pricing-mobile{display:block;width:100%;max-width:900px;margin:0 auto;box-sizing:border-box}' +
                '.lpc-pricing-desktop{display:none;width:100%;box-sizing:border-box}' +
                '@media (min-width:769px){' +
                '.lpc-pricing-mobile{display:none!important}' +
                '.lpc-pricing-desktop{display:block!important;max-width:900px;margin:0 auto;width:100%}' +
                '}' +
                '.lpc-pricing-desktop .lpc-table-wrap{box-sizing:border-box;width:100%;overflow-x:auto;overflow-y:hidden;' +
                '-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain;' +
                'scrollbar-color:rgba(124,58,237,0.35) transparent;scrollbar-width:thin}' +
                '@media (min-width:769px){' +
                '.lpc-table{min-width:0!important;width:100%!important}' +
                'colgroup col.lpc-col-h{width:200px!important;min-width:200px!important;max-width:200px!important}' +
                'colgroup col.lpc-col-p{width:auto!important;min-width:0!important}' +
                '}' +
                '.lpc-card-name{background:transparent!important;-webkit-tap-highlight-color:transparent}' +
                '.lpc-plan-card{box-sizing:border-box;width:100%;min-width:0}' +
                '.lpc-table tbody tr.lpc-row:hover{background:rgba(124,58,237,.04)!important}',
            }}
          />
          <h2
            id="complex-pricing-heading"
            style={{
              margin: '0 0 0.5rem',
              textAlign: 'center',
              fontSize: 'clamp(1.35rem, 4vw, 1.85rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#f8fafc',
              lineHeight: 1.15,
            }}
          >
            ¿Necesitas algo más complejo?
          </h2>
          <p
            style={{
              margin: '0 auto 2rem',
              textAlign: 'center',
              color: '#94a3b8',
              fontSize: 14,
              maxWidth: 520,
            }}
          >
            También construimos desde tiendas hasta plataformas completas
          </p>

          <div className="lpc-pricing-mobile">
            {PRICING_MOBILE_STACK.map(function (plan, planIdx) {
              var IconComp = plan.icon;
              var isLast = planIdx === PRICING_MOBILE_STACK.length - 1;
              return (
                <div
                  key={plan.key}
                  style={{
                    position: 'relative',
                    background: '#111111',
                    border: plan.featured ? '1.5px solid #7C3AED' : '1px solid #1e293b',
                    boxSizing: 'border-box',
                    borderRadius: 16,
                    padding: plan.featured ? '28px 20px 20px' : 20,
                    width: '100%',
                    marginBottom: isLast ? 0 : 12,
                  }}
                >
                  {plan.featured ? (
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 14,
                        background: '#7C3AED',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: 999,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      ⭐ Más vendido
                    </div>
                  ) : null}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 8,
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <IconComp size={16} color="#94a3b8" aria-hidden />
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8' }}>{plan.name}</span>
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        background: '#1e293b',
                        color: '#94a3b8',
                        fontWeight: 600,
                        borderRadius: 999,
                        padding: '3px 10px',
                      }}
                    >
                      {plan.planBadge}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: '12px 0 4px',
                      fontSize: 28,
                      fontWeight: 900,
                      color: '#fff',
                      lineHeight: 1.1,
                    }}
                  >
                    {plan.priceMain}
                  </p>
                  <p
                    style={{
                      margin: '0 0 16px',
                      fontSize: 13,
                      color: '#475569',
                      textDecoration: 'line-through',
                    }}
                  >
                    {plan.priceStruck}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      marginBottom: 16,
                    }}
                  >
                    {plan.featuresList.map(function (feat, fi) {
                      return (
                        <div
                          key={plan.key + '-' + fi}
                          style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                        >
                          <Check size={13} color="#22c55e" strokeWidth={2.5} aria-hidden />
                          <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.35 }}>{feat}</span>
                        </div>
                      );
                    })}
                  </div>
                  {plan.ctaGreen ? (
                    <a
                      href={plan.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        width: '100%',
                        boxSizing: 'border-box',
                        background: '#22c55e',
                        color: '#fff',
                        padding: 10,
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      {plan.ctaLabel}
                    </a>
                  ) : (
                    <a
                      href={plan.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        width: '100%',
                        boxSizing: 'border-box',
                        background: 'transparent',
                        border: '1.5px solid #7C3AED',
                        color: '#a78bfa',
                        padding: 10,
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'center',
                        textDecoration: 'none',
                      }}
                    >
                      {plan.ctaLabel}
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          <div className="lpc-pricing-desktop">
            <div className="lpc-table-wrap">
              <table
              className="lpc-table"
              style={{
                width: '100%',
                minWidth: 900,
                borderCollapse: 'collapse',
                tableLayout: 'fixed',
              }}
            >
              <colgroup>
                <col className="lpc-col-h" />
                <col className="lpc-col-p" />
                <col className="lpc-col-p" />
                <col className="lpc-col-p" />
              </colgroup>
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      verticalAlign: 'top',
                      padding: '8px 8px 12px',
                      fontWeight: 400,
                    }}
                  />
                  <th
                    scope="col"
                    style={{
                      verticalAlign: 'top',
                      padding: '8px 8px 12px',
                      fontWeight: 400,
                    }}
                  >
                    <div
                      className="lpc-plan-card"
                      style={{
                        position: 'relative',
                        background: '#111111',
                        border: '1.5px solid #7C3AED',
                        boxShadow: '0 0 24px rgba(124, 58, 237, 0.15)',
                        borderRadius: 12,
                        padding: 16,
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: -10,
                          right: 12,
                          background: '#7C3AED',
                          color: '#fff',
                          fontSize: 10,
                          padding: '3px 10px',
                          borderRadius: 999,
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        ⭐ Más vendido
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          marginBottom: 8,
                        }}
                      >
                        <Rocket size={16} color="#a78bfa" aria-hidden />
                        <span
                          className="lpc-card-name"
                          style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 13,
                            color: '#94a3b8',
                            fontWeight: 600,
                          }}
                        >
                          Landing
                        </span>
                      </div>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: 10,
                          background: '#1e293b',
                          color: '#94a3b8',
                          borderRadius: 999,
                          padding: '2px 10px',
                          marginBottom: 10,
                          fontWeight: 600,
                        }}
                      >
                        El más popular
                      </span>
                      <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                        $200.000
                      </p>
                      <p
                        style={{
                          margin: '0 0 12px',
                          fontSize: 13,
                          color: '#475569',
                          textDecoration: 'line-through',
                        }}
                      >
                        $350.000
                      </p>
                      <a
                        href={WA_LANDING_PLAN_TABLE}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          width: '100%',
                          boxSizing: 'border-box',
                          background: '#22c55e',
                          color: '#fff',
                          padding: 10,
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'center',
                          textDecoration: 'none',
                        }}
                      >
                        Escribir por WhatsApp →
                      </a>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{
                      verticalAlign: 'top',
                      padding: '8px 8px 12px',
                      fontWeight: 400,
                    }}
                  >
                    <div
                      className="lpc-plan-card"
                      style={{
                        background: '#111111',
                        border: '1px solid #1e293b',
                        borderRadius: 12,
                        padding: 16,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          marginBottom: 8,
                        }}
                      >
                        <Building2 size={16} color="#94a3b8" aria-hidden />
                        <span
                          className="lpc-card-name"
                          style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 13,
                            color: '#94a3b8',
                            fontWeight: 600,
                          }}
                        >
                          Institucional
                        </span>
                      </div>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: 10,
                          background: '#1e293b',
                          color: '#94a3b8',
                          borderRadius: 999,
                          padding: '2px 10px',
                          marginBottom: 10,
                          fontWeight: 600,
                        }}
                      >
                        Para empresas
                      </span>
                      <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                        Desde $800.000
                      </p>
                      <p
                        style={{
                          margin: '0 0 12px',
                          fontSize: 13,
                          color: '#475569',
                          textDecoration: 'line-through',
                        }}
                      >
                        $1.500.000
                      </p>
                      <a
                        href={WA_PRIMARY}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          width: '100%',
                          boxSizing: 'border-box',
                          background: 'transparent',
                          border: '1.5px solid #7C3AED',
                          color: '#a78bfa',
                          padding: 10,
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'center',
                          textDecoration: 'none',
                        }}
                      >
                        Cotizar →
                      </a>
                    </div>
                  </th>
                  <th
                    scope="col"
                    style={{
                      verticalAlign: 'top',
                      padding: '8px 8px 12px',
                      fontWeight: 400,
                    }}
                  >
                    <div
                      className="lpc-plan-card"
                      style={{
                        background: '#111111',
                        border: '1px solid #1e293b',
                        borderRadius: 12,
                        padding: 16,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          marginBottom: 8,
                        }}
                      >
                        <ShoppingCart size={16} color="#94a3b8" aria-hidden />
                        <span
                          className="lpc-card-name"
                          style={{
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: 13,
                            color: '#94a3b8',
                            fontWeight: 600,
                          }}
                        >
                          Ecommerce
                        </span>
                      </div>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: 10,
                          background: '#1e293b',
                          color: '#94a3b8',
                          borderRadius: 999,
                          padding: '2px 10px',
                          marginBottom: 10,
                          fontWeight: 600,
                        }}
                      >
                        Tienda completa
                      </span>
                      <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                        Desde $1.500.000
                      </p>
                      <p
                        style={{
                          margin: '0 0 12px',
                          fontSize: 13,
                          color: '#475569',
                          textDecoration: 'line-through',
                        }}
                      >
                        $2.500.000
                      </p>
                      <a
                        href={WA_PRIMARY}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          width: '100%',
                          boxSizing: 'border-box',
                          background: 'transparent',
                          border: '1.5px solid #7C3AED',
                          color: '#a78bfa',
                          padding: 10,
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'center',
                          textDecoration: 'none',
                        }}
                      >
                        Cotizar →
                      </a>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICING_FEATURE_ROWS.map(function (row, idx) {
                  var oddBg = idx % 2 === 0 ? '#0d0d0d' : 'transparent';
                  return (
                    <tr key={row.label} className="lpc-row" style={{ borderBottom: '1px solid #0f172a', background: oddBg }}>
                      <td
                        style={{
                          padding: '12px 8px',
                          fontSize: 13,
                          color: '#94a3b8',
                          textAlign: 'left',
                          paddingLeft: 8,
                          verticalAlign: 'middle',
                        }}
                      >
                        {row.label}
                      </td>
                      <td
                        style={{
                          padding: '12px 8px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                        }}
                      >
                        {renderPricingCell(row.l)}
                      </td>
                      <td
                        style={{
                          padding: '12px 8px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                        }}
                      >
                        {renderPricingCell(row.i)}
                      </td>
                      <td
                        style={{
                          padding: '12px 8px',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                        }}
                      >
                        {renderPricingCell(row.e)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
          <p
            style={{
              fontSize: 12,
              color: '#475569',
              textAlign: 'center',
              marginTop: 16,
              marginBottom: 0,
              padding: '0 8px',
            }}
          >
            * Todos los precios son en COP. Hosting y dominio no incluidos.
          </p>
        </section>

        <section className={styles.sectionFinalCta} aria-labelledby="final-cta-heading">
          <h2 id="final-cta-heading" className={styles.finalCtaTitle}>
            ¿Listo para vender más?
          </h2>
          <p className={styles.finalCtaSub}>Escríbenos hoy y en 3 días tienes tu página lista.</p>
          <a className={styles.btnFinalWhatsApp} href={WA_PRIMARY} target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp →
          </a>
          <p className={styles.finalCtaHint}>
            WhatsApp +57 310 5813007 · Respuesta en menos de 1 hora 🕐
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>Fluxa · Colombia</p>
      </footer>
    </div>
  );
}
