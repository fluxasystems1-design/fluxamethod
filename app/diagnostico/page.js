'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FLUXA_WHATSAPP_HREF as WA_HREF } from '@/lib/whatsapp';

const STEPS = ['Tu audiencia', 'Tu contenido', 'Tu membresía o producto', 'Ads y opciones'];

const STORY_FREQ = [
  { id: 'never', label: 'Nunca' },
  { id: 'rarely', label: 'Casi nunca' },
  { id: 'sometimes', label: 'A veces' },
  { id: 'often', label: 'Frecuente' },
];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function formatMoney(n) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

function formatNum(n) {
  return Math.round(n).toLocaleString('es-CO');
}

function formatUsdInteger(n) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));
}

function computeProjection(inputs) {
  const {
    seguidores,
    vistasHistoria,
    precioMembresia,
    inversionAds,
    vistasReel,
    likesPub,
    freqHistorias,
    publicacionesSem,
  } = inputs;

  const tasa_conversion_base = (vistasHistoria / Math.max(seguidores, 1)) * 0.02;
  const nuevos_miembros_mes1 = Math.round(seguidores * tasa_conversion_base);
  const pubFactor = 1 + clamp((publicacionesSem - 3) / 14, -0.06, 0.1);
  const mrr_mes1 = Math.round(nuevos_miembros_mes1 * precioMembresia * pubFactor);

  const adsBoostAgresivo = inversionAds > 0 ? Math.min(inversionAds / 10000, 0.15) : 0;

  function buildSeries(monthlyRate) {
    const arr = [];
    for (let m = 0; m < 12; m++) {
      arr.push(Math.round(mrr_mes1 * Math.pow(1 + monthlyRate, m)));
    }
    return arr;
  }

  const conservador = buildSeries(0.05);
  const probable = buildSeries(0.15);
  const agresivo = buildSeries(0.3 + adsBoostAgresivo);

  const sum = (a) => a.reduce((s, v) => s + v, 0);

  const freqScore = { never: 20, rarely: 40, sometimes: 65, often: 85 }[freqHistorias] ?? 50;
  const ratioHist = vistasHistoria / Math.max(seguidores, 1);
  const audienciaCaliente = clamp(Math.round(ratioHist * 120), 5, 100);
  const potencialDescubrimiento = clamp(
    Math.round((Math.log10(vistasReel + 50) / Math.log10(500050)) * 100),
    5,
    100
  );
  const engagement = likesPub / Math.max(vistasReel, 1);
  const potencialMonetizacion = clamp(Math.round(engagement * 400 + mrr_mes1 / 200), 5, 100);
  const riesgoRetencion = clamp(100 - freqScore + Math.round((1 - engagement) * 15), 5, 100);

  const insights = [];
  if (ratioHist < 0.02) {
    insights.push(
      'Tu ratio vistas/historia vs. seguidores tiene margen de mejora: prueba ganchos más claros y CTAs en historias.'
    );
  } else if (ratioHist > 0.08) {
    insights.push('Tienes buena atención en historias: es un canal fuerte para ofertas y membresía.');
  }
  if (vistasReel > seguidores * 0.5) {
    insights.push('Tus reels aportan alcance: convierte esa atención con enlaces y secuencias en historias.');
  }
  if (freqHistorias === 'never' || freqHistorias === 'rarely') {
    insights.push('Vender más por historias suele requerir constancia: agenda ofertas y pruebas A/B en formato historia.');
  }
  if (inversionAds <= 0 && potencialDescubrimiento < 60) {
    insights.push('Una inversión acotada en pauta puede acelerar el descubrimiento sin depender solo del orgánico.');
  }
  if (insights.length < 2) {
    insights.push(
      'Tu precio de membresía y la proyección muestran un camino claro: el siguiente paso es ordenar embudo y oferta.'
    );
  }

  const siguientePaso =
    mrr_mes1 < 500
      ? 'Prioriza clarificar tu promesa de membresía y un embudo simple (historias → landing → pago) antes de escalar pauta.'
      : mrr_mes1 < 2500
        ? 'Tienes base para escalar: sistematiza contenido, automatiza seguimiento y prueba pauta con creatividades de historias/reels.'
        : 'Tu techo de MRR inicial es alto: conviene un sistema completo de pauta, automatizaciones y optimización mensual.';

  return {
    nuevos_miembros_mes1,
    mrr_mes1,
    conservador,
    probable,
    agresivo,
    totals: {
      conservador: sum(conservador),
      probable: sum(probable),
      agresivo: sum(agresivo),
    },
    diagnostic: {
      audienciaCaliente,
      potencialDescubrimiento,
      potencialMonetizacion,
      riesgoRetencion,
    },
    insights: insights.slice(0, 4),
    siguientePaso,
  };
}

function tableRowFromSeries(arr, total) {
  return {
    m1: arr[0],
    m3: arr[2],
    m6: arr[5],
    m12: arr[11],
    total,
  };
}

function pathPointAtT(pts, t) {
  if (t <= 0) return pts[0];
  if (t >= 1) return pts[pts.length - 1];
  const n = pts.length - 1;
  const f = t * n;
  const i = Math.floor(f);
  const u = f - i;
  const a = pts[i];
  const b = pts[i + 1];
  return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u };
}

function OptCheck() {
  return <span className="dg-opt-check">{'\u2713'}</span>;
}

function useIntersectionOnce(refObject, enabled) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!enabled || active) return undefined;
    const el = refObject.current;
    if (!el) return undefined;
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done) return;
        const e = entries[0];
        if (e?.isIntersecting && e.intersectionRatio >= 0.1) {
          done = true;
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.1, 0.2], rootMargin: '0px 0px -7% 0px' }
    );
    io.observe(el);
    const t = window.setTimeout(() => {
      if (!done && el.getBoundingClientRect().top < window.innerHeight) {
        done = true;
        setActive(true);
        io.disconnect();
      }
    }, 400);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [enabled, active, refObject]);
  return active;
}

function ParticlesCanvas() {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY || 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w = 0;
    let h = 0;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: 36 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: 0.12 + Math.random() * 0.28,
      }));
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const sy = scrollRef.current * 0.28;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        let dy = p.y + sy;
        dy = ((dy % h) + h) % h;
        ctx.beginPath();
        ctx.fillStyle = `rgba(168, 85, 247, ${p.a})`;
        ctx.arc(p.x, dy, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="dg-particles" aria-hidden />;
}

function AnimatedMrrChart({ conservador, probable, agresivo, shouldPlay }) {
  const ref = useRef(null);
  const legendRef = useRef(null);
  const wrapperRef = useRef(null);
  const chartTooltipRef = useRef(null);
  const playedRef = useRef(false);
  const startRef = useRef(0);
  const rafRef = useRef(0);
  const lastElapsedRef = useRef(0);

  const [tooltip, setTooltip] = useState(null);

  const maxY = useMemo(() => {
    const m = Math.max(...conservador, ...probable, ...agresivo, 100);
    return Math.ceil(m * 1.12);
  }, [conservador, probable, agresivo]);

  const getMonthFromX = useCallback((clientX) => {
    const canvas = ref.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const cssW = canvas.clientWidth;
    const padL = 46;
    const padR = 10;
    const chartW = cssW - padL - padR;
    if (chartW <= 0) return null;
    const relX = clientX - rect.left;
    const idx = Math.round(((relX - padL) / chartW) * 11);
    return Math.max(0, Math.min(11, idx));
  }, []);

  const drawScene = useCallback(
    (elapsed) => {
      const canvas = ref.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      if (cssW <= 0 || cssH <= 0) return;
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const padL = 46;
      const padR = 10;
      const padT = 14;
      const padB = 42;
      const chartW = cssW - padL - padR;
      const chartH = cssH - padT - padB;

      const T_GRID = 500;
      const T_LINES = 2000;
      const POINT_STAG = 60;
      const POP_DUR = 300;

      const xAt = (i) => padL + (i / 11) * chartW;
      const yAt = (v) => padT + chartH - (v / maxY) * chartH;

      const gridAlpha = Math.min(1, elapsed / T_GRID);
      const lineT = elapsed <= T_GRID ? 0 : easeInOutCubic(Math.min(1, (elapsed - T_GRID) / T_LINES));

      ctx.clearRect(0, 0, cssW, cssH);

      ctx.save();
      ctx.globalAlpha = gridAlpha;
      ctx.fillStyle = 'rgba(148, 163, 184, 0.08)';
      for (let g = 0; g <= 4; g++) {
        const y = padT + (chartH * g) / 4;
        ctx.fillRect(padL, y, chartW, 1);
      }

      ctx.fillStyle = '#64748b';
      ctx.font = '10px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      for (let m = 0; m < 12; m += 2) {
        ctx.fillText(`M${m + 1}`, xAt(m), cssH - 18);
      }

      ctx.textAlign = 'right';
      for (let g = 0; g <= 4; g++) {
        const val = Math.round((maxY * (4 - g)) / 4);
        const y = padT + (chartH * g) / 4;
        ctx.fillText(val >= 1000 ? `${(val / 1000).toFixed(1)}k` : String(val), padL - 6, y + 3);
      }
      ctx.restore();

      function strokePartial(data, color, dashed, progress) {
        const pts = data.map((v, i) => ({ x: xAt(i), y: yAt(v) }));
        const end = pathPointAtT(pts, progress);
        ctx.beginPath();
        if (dashed) ctx.setLineDash([6, 4]);
        else ctx.setLineDash([]);
        ctx.moveTo(pts[0].x, pts[0].y);
        const fullSeg = Math.min(11, Math.floor(progress * 11));
        for (let s = 0; s < fullSeg; s++) {
          ctx.lineTo(pts[s + 1].x, pts[s + 1].y);
        }
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.setLineDash([]);

        const headR = 4;
        ctx.beginPath();
        ctx.arc(end.x, end.y, headR, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (lineT > 0) {
        strokePartial(conservador, '#60a5fa', true, lineT);
        strokePartial(probable, '#fbbf24', false, lineT);
        strokePartial(agresivo, '#22c55e', false, lineT);
      }

      const pointPhaseStart = T_GRID + T_LINES;
      if (elapsed > pointPhaseStart) {
        const lines = [
          { data: conservador, color: '#60a5fa' },
          { data: probable, color: '#fbbf24' },
          { data: agresivo, color: '#22c55e' },
        ];
        for (let mi = 0; mi < 12; mi++) {
          const t0 = pointPhaseStart + mi * POINT_STAG;
          const dt = elapsed - t0;
          if (dt <= 0) continue;
          const u = Math.min(1, dt / POP_DUR);
          let sc;
          if (u < 0.45) sc = (u / 0.45) * 1.2;
          else sc = 1.2 - ((u - 0.45) / 0.55) * 0.2;
          for (const { data, color } of lines) {
            const x = xAt(mi);
            const y = yAt(data[mi]);
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(sc, sc);
            ctx.beginPath();
            ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#0f172a';
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      const tip = chartTooltipRef.current;
      if (tip) {
        const idx = tip.mes - 1;
        const xLine = padL + (idx / 11) * chartW;

        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xLine, padT);
        ctx.lineTo(xLine, padT + chartH);
        ctx.stroke();
        ctx.setLineDash([]);

        const tipLines = [
          { data: conservador, color: '#60a5fa' },
          { data: probable, color: '#fbbf24' },
          { data: agresivo, color: '#22c55e' },
        ];
        for (const { data, color } of tipLines) {
          const yPt = padT + chartH - (data[idx] / maxY) * chartH;
          ctx.beginPath();
          ctx.arc(xLine, yPt, 5, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.shadowColor = color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.restore();
      }

      const legendT = pointPhaseStart + 12 * POINT_STAG + 120;
      if (legendRef.current) {
        const lo = elapsed >= legendT ? Math.min(1, (elapsed - legendT) / 400) : 0;
        legendRef.current.style.opacity = String(lo);
      }

      lastElapsedRef.current = elapsed;
    },
    [conservador, probable, agresivo, maxY]
  );

  const handleMouseMove = useCallback(
    (e) => {
      const idx = getMonthFromX(e.clientX);
      if (idx === null) return;
      const canvas = ref.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      const padL = 46;
      const padR = 10;
      const padT = 14;
      const padB = 42;
      const chartW = cssW - padL - padR;
      const chartH = cssH - padT - padB;
      const x = padL + (idx / 11) * chartW;
      const y = padT + chartH - (probable[idx] / maxY) * chartH;
      const data = {
        screenX: x,
        screenY: y,
        canvasW: cssW,
        mes: idx + 1,
        con: conservador[idx],
        prob: probable[idx],
        agr: agresivo[idx],
      };
      chartTooltipRef.current = data;
      setTooltip(data);
      drawScene(lastElapsedRef.current);
    },
    [getMonthFromX, conservador, probable, agresivo, maxY, drawScene]
  );

  const handleMouseLeave = useCallback(() => {
    chartTooltipRef.current = null;
    setTooltip(null);
    drawScene(lastElapsedRef.current);
  }, [drawScene]);

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      handleMouseMove({ clientX: touch.clientX });
    },
    [handleMouseMove]
  );

  useEffect(() => {
    if (!shouldPlay || playedRef.current) return undefined;
    playedRef.current = true;
    startRef.current = performance.now();
    const TOTAL = 500 + 2000 + 12 * 60 + 120 + 500;

    const tick = (now) => {
      const elapsed = now - startRef.current;
      drawScene(Math.min(elapsed, TOTAL));
      if (elapsed < TOTAL) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        drawScene(TOTAL);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      drawScene(lastElapsedRef.current);
    });
    if (ref.current) ro.observe(ref.current);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [shouldPlay, drawScene]);

  useEffect(() => {
    if (legendRef.current) legendRef.current.style.opacity = '0';
  }, [conservador, probable, agresivo]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <canvas
        ref={ref}
        className="dg-chart-canvas"
        aria-hidden
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        style={{ cursor: 'crosshair', display: 'block', touchAction: 'none' }}
      />
      {tooltip && (
        <div
          className="dg-chart-tooltip"
          style={{
            left: tooltip.screenX > tooltip.canvasW / 2 ? tooltip.screenX - 130 : tooltip.screenX + 16,
            top: Math.max(8, tooltip.screenY - 50),
          }}
        >
          <p className="dg-chart-tooltip__mes">Mes {tooltip.mes}</p>
          <p className="dg-chart-tooltip__row dg-chart-tooltip__row--con">
            ${Math.round(tooltip.con).toLocaleString('es-CO')}
          </p>
          <p className="dg-chart-tooltip__row dg-chart-tooltip__row--prob">
            ${Math.round(tooltip.prob).toLocaleString('es-CO')}
          </p>
          <p className="dg-chart-tooltip__row dg-chart-tooltip__row--agr">
            ${Math.round(tooltip.agr).toLocaleString('es-CO')}
          </p>
        </div>
      )}
      <div ref={legendRef} className="dg-legend dg-legend--chart">
        <span className="dg-legend-item">
          <span className="dg-legend-dash" aria-hidden />
          Conservador
        </span>
        <span className="dg-legend-item">
          <span className="dg-legend-swatch" style={{ background: '#fbbf24' }} />
          Probable
        </span>
        <span className="dg-legend-item">
          <span className="dg-legend-swatch" style={{ background: '#22c55e' }} />
          Agresivo
        </span>
      </div>
    </div>
  );
}

function LoadingScreen({ exiting }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1500;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      setPct(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={'dg-loading-screen' + (exiting ? ' dg-loading-screen--out' : '')} aria-busy="true">
      <p className="dg-loading-text">Calculando tu proyección…</p>
      <div className="dg-loading-bar">
        <div className="dg-loading-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function MrrCountCard({ label, target, precio, delay, isActive }) {
  const [entered, setEntered] = useState(false);
  const [val, setVal] = useState(0);
  const [glow, setGlow] = useState(true);

  useEffect(() => {
    if (!isActive) return undefined;
    const t = window.setTimeout(() => setEntered(true), delay);
    return () => window.clearTimeout(t);
  }, [isActive, delay]);

  useEffect(() => {
    if (!entered) return undefined;
    const start = performance.now();
    const dur = 1500;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = easeOutCubic(t);
      setVal(Math.round(target * e));
      setGlow(t < 0.98);
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setVal(target);
        setGlow(false);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [entered, target]);

  const miembros = Math.round(val / Math.max(precio, 1));

  return (
    <div className={'dg-mrr-card' + (entered ? ' dg-mrr-card--in' : '')}>
      <p className="dg-mrr-label">{label}</p>
      <p className={'dg-mrr-value' + (glow ? ' dg-mrr-value--glow' : ' dg-mrr-value--settled')}>
        US$&nbsp;{formatUsdInteger(val)}
      </p>
      <p className="dg-mrr-sub">~{formatNum(miembros)} miembros</p>
    </div>
  );
}

function CountUpCell({ target, play, duration = 800 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!play) return undefined;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const e = easeOutCubic(t);
      setV(Math.round(target * e));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setV(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, target, duration]);
  return <>{formatMoney(v)}</>;
}

export default function DiagnosticoPage() {
  const [phase, setPhase] = useState('intro');
  const [step, setStep] = useState(0);
  const [panelClass, setPanelClass] = useState('dg-step-panel--visible');
  const [loadingExit, setLoadingExit] = useState(false);
  const [resultReveal, setResultReveal] = useState(false);

  const [seguidores, setSeguidores] = useState(10000);
  const [vistasHistoria, setVistasHistoria] = useState(500);
  const [vistasReel, setVistasReel] = useState(3000);
  const [likesPub, setLikesPub] = useState(300);
  const [precioMembresia, setPrecioMembresia] = useState(29);
  const [inversionAds, setInversionAds] = useState(0);
  const [storyFreq, setStoryFreq] = useState(null);
  const [publicacionesSem, setPublicacionesSem] = useState(3);

  const [frozenResult, setFrozenResult] = useState(null);

  const mrrBlockRef = useRef(null);
  const chartBlockRef = useRef(null);
  const tableBlockRef = useRef(null);
  const diagBlockRef = useRef(null);
  const insightsBlockRef = useRef(null);
  const nextBlockRef = useRef(null);
  const ctaBlockRef = useRef(null);

  const resultEnabled = phase === 'result' && Boolean(frozenResult);

  const mrrIO = useIntersectionOnce(mrrBlockRef, resultEnabled);
  const chartIO = useIntersectionOnce(chartBlockRef, resultEnabled);
  const tableIO = useIntersectionOnce(tableBlockRef, resultEnabled);
  const diagIO = useIntersectionOnce(diagBlockRef, resultEnabled);
  const insightsIO = useIntersectionOnce(insightsBlockRef, resultEnabled);
  const nextIO = useIntersectionOnce(nextBlockRef, resultEnabled);
  const ctaIO = useIntersectionOnce(ctaBlockRef, resultEnabled);

  const [heroIn, setHeroIn] = useState(false);
  const [tableRowsIn, setTableRowsIn] = useState(0);
  const [tableTotalsPlay, setTableTotalsPlay] = useState(false);
  const [diagPhase, setDiagPhase] = useState(0);
  const [diagWidths, setDiagWidths] = useState([0, 0, 0, 0]);
  const [diagNums, setDiagNums] = useState([0, 0, 0, 0]);
  const [diagBounce, setDiagBounce] = useState([false, false, false, false]);
  const [insightItemsIn, setInsightItemsIn] = useState(0);
  const [insightsCardIn, setInsightsCardIn] = useState(false);
  const [nextCardIn, setNextCardIn] = useState(false);
  const [ctaIn, setCtaIn] = useState(false);

  const inputs = useMemo(
    () => ({
      seguidores,
      vistasHistoria,
      vistasReel,
      likesPub,
      precioMembresia,
      inversionAds,
      freqHistorias: storyFreq,
      publicacionesSem,
    }),
    [
      seguidores,
      vistasHistoria,
      vistasReel,
      likesPub,
      precioMembresia,
      inversionAds,
      storyFreq,
      publicacionesSem,
    ]
  );

  const liveMrrMes1 = useMemo(() => {
    if (step !== 3 || !storyFreq) return null;
    return computeProjection({ ...inputs, freqHistorias: storyFreq }).mrr_mes1;
  }, [step, storyFreq, inputs]);

  const stepValid = useMemo(() => {
    if (step === 3) return Boolean(storyFreq);
    return true;
  }, [step, storyFreq]);

  const goStep = useCallback((next) => {
    setPanelClass('dg-step-panel--exit');
    window.setTimeout(() => {
      setStep(next);
      setPanelClass('dg-step-panel--enter');
      window.requestAnimationFrame(() => setPanelClass('dg-step-panel--visible'));
    }, 320);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (phase !== 'loading') return undefined;
    setLoadingExit(false);
    setResultReveal(false);
    const t1 = window.setTimeout(() => {
      setLoadingExit(true);
      setResultReveal(true);
    }, 1300);
    const t2 = window.setTimeout(() => {
      setPhase('result');
    }, 1700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'result' || !frozenResult) return undefined;
    const t = window.setTimeout(() => setHeroIn(true), 80);
    return () => window.clearTimeout(t);
  }, [phase, frozenResult]);

  useEffect(() => {
    if (!tableIO) return undefined;
    setTableRowsIn(0);
    const t0 = window.setTimeout(() => setTableRowsIn(1), 80);
    const t1 = window.setTimeout(() => setTableRowsIn(2), 180);
    const t2 = window.setTimeout(() => setTableRowsIn(3), 280);
    const t3 = window.setTimeout(() => setTableTotalsPlay(true), 520);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [tableIO]);

  const diagTargets = useMemo(() => {
    if (!frozenResult) return [0, 0, 0, 0];
    const d = frozenResult.diagnostic;
    return [d.audienciaCaliente, d.potencialDescubrimiento, d.potencialMonetizacion, d.riesgoRetencion];
  }, [frozenResult]);

  useEffect(() => {
    if (!diagIO) return undefined;
    setDiagPhase(0);
    setDiagWidths([0, 0, 0, 0]);
    setDiagNums([0, 0, 0, 0]);
    setDiagBounce([false, false, false, false]);

    const stagger = 200;
    const barDur = 1200;
    const timers = [];

    for (let i = 0; i < 4; i++) {
      const startAt = i * stagger;
      const target = diagTargets[i];
      const tStart = window.setTimeout(() => {
        const t0 = performance.now();
        let raf;
        const stepBar = (now) => {
          const t = Math.min(1, (now - t0) / barDur);
          const e = easeOutExpo(t);
          const w = target * e;
          const n = Math.round(target * e);
          setDiagWidths((prev) => {
            const next = [...prev];
            next[i] = w;
            return next;
          });
          setDiagNums((prev) => {
            const next = [...prev];
            next[i] = n;
            return next;
          });
          if (t < 1) raf = requestAnimationFrame(stepBar);
          else {
            setDiagWidths((prev) => {
              const next = [...prev];
              next[i] = target;
              return next;
            });
            setDiagNums((prev) => {
              const next = [...prev];
              next[i] = target;
              return next;
            });
            setDiagBounce((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            window.setTimeout(() => {
              setDiagBounce((prev) => {
                const nx = [...prev];
                nx[i] = false;
                return nx;
              });
            }, 500);
          }
        };
        raf = requestAnimationFrame(stepBar);
      }, startAt);
      timers.push(tStart);
    }

    return () => {
      timers.forEach((x) => window.clearTimeout(x));
    };
  }, [diagIO, diagTargets]);

  useEffect(() => {
    if (!insightsIO) return undefined;
    setInsightsCardIn(true);
    setInsightItemsIn(0);
    const n = frozenResult?.insights.length ?? 0;
    const timers = [];
    for (let i = 0; i < n; i++) {
      timers.push(window.setTimeout(() => setInsightItemsIn(i + 1), 320 + i * 150));
    }
    return () => timers.forEach((x) => window.clearTimeout(x));
  }, [insightsIO, frozenResult?.insights.length]);

  useEffect(() => {
    if (!nextIO) return undefined;
    const t = window.setTimeout(() => setNextCardIn(true), 300);
    return () => window.clearTimeout(t);
  }, [nextIO]);

  useEffect(() => {
    if (!ctaIO) return undefined;
    const t = window.setTimeout(() => setCtaIn(true), 120);
    return () => window.clearTimeout(t);
  }, [ctaIO]);

  const showResult = useCallback(() => {
    const r = computeProjection({ ...inputs, freqHistorias: storyFreq });
    setFrozenResult(r);
    setHeroIn(false);
    setTableRowsIn(0);
    setTableTotalsPlay(false);
    setInsightItemsIn(0);
    setInsightsCardIn(false);
    setNextCardIn(false);
    setCtaIn(false);
    setPhase('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [inputs, storyFreq]);

  const resetAll = useCallback(() => {
    setPhase('form');
    setStep(0);
    setSeguidores(10000);
    setVistasHistoria(500);
    setVistasReel(3000);
    setLikesPub(300);
    setPrecioMembresia(29);
    setInversionAds(0);
    setStoryFreq(null);
    setPublicacionesSem(3);
    setFrozenResult(null);
    setPanelClass('dg-step-panel--visible');
    setLoadingExit(false);
    setResultReveal(false);
    setHeroIn(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const pct = (v, min, max) => `${((v - min) / (max - min)) * 100}%`;

  const res = frozenResult;
  const mrrProb = res?.probable;

  const diagRows = res
    ? [
        {
          key: 'audienciaCaliente',
          icon: '\u{1F465}',
          label: 'Audiencia caliente',
          grad: 'linear-gradient(90deg, #F59E0B, #FCD34D)',
          valColor: '#f59e0b',
        },
        {
          key: 'potencialDescubrimiento',
          icon: '\u{26A1}',
          label: 'Potencial de descubrimiento',
          grad: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
          valColor: '#60a5fa',
        },
        {
          key: 'potencialMonetizacion',
          icon: '\u{1F4C8}',
          label: 'Potencial de monetización',
          grad: 'linear-gradient(90deg, #22C55E, #4ADE80)',
          valColor: '#22c55e',
        },
        {
          key: 'riesgoRetencion',
          icon: '\u{26A0}',
          label: 'Riesgo por retención',
          grad: 'linear-gradient(90deg, #EF4444, #F87171)',
          valColor: '#ef4444',
        },
      ]
    : [];

  const tableCon = res ? tableRowFromSeries(res.conservador, res.totals.conservador) : null;
  const tableProb = res ? tableRowFromSeries(res.probable, res.totals.probable) : null;
  const tableAgr = res ? tableRowFromSeries(res.agresivo, res.totals.agresivo) : null;

  const showPostForm = phase === 'loading' || phase === 'result';

  return (
    <div className={'dg-page' + (phase === 'result' ? ' dg-page--result-live' : '')}>
      <ParticlesCanvas />
      <div className="dg-inner">
        <header className={'dg-header' + (phase === 'intro' ? ' dg-header--intro' : '')}>
          <p className="dg-logo">
            <span className="dg-logo-fluxa">Fluxa </span>
            <span className="dg-logo-method">Method</span>
          </p>
          <p className="dg-badge">
            <span aria-hidden>{'\u2726'} </span>
            Diagnóstico Digital Gratuito
          </p>
        </header>

        {phase === 'intro' && (
          <div className="dg-intro">
            <p className="dg-intro-badge dg-intro-reveal dg-intro-reveal--1">
              <span aria-hidden>✦</span> Herramienta gratuita para negocios
            </p>
            <h1 className="dg-intro-title dg-intro-reveal dg-intro-reveal--2">
              Descubre cuánto podría generar tu negocio si instalas
              un sistema digital que{' '}
              <span className="dg-intro-accent">trabaje todos los días.</span>
            </h1>
            <p className="dg-intro-summary dg-intro-reveal dg-intro-reveal--3">
              4 pasos · MRR en 3 escenarios · ~2 minutos
            </p>
            <p className="dg-intro-sub dg-intro-reveal dg-intro-reveal--4">
              Introduce tus métricas de Instagram y obtén una proyección orientativa de MRR en
              escenarios conservador, probable y agresivo — igual que verás al finalizar.
            </p>
            <p className="dg-intro-audience dg-intro-reveal dg-intro-reveal--5">
              Pensado si vendes membresía, suscripción o producto recurrente y quieres ordenar números
              antes de invertir en pauta o sistemas.
            </p>
            <ul className="dg-intro-bullets dg-intro-reveal dg-intro-reveal--6" aria-label="Qué incluye">
              <li>Diagnóstico en 4 bloques (audiencia, contenido, precio, ads)</li>
              <li>Tabla y gráfico comparando los tres escenarios</li>
              <li>Insights y siguiente paso según tus datos</li>
            </ul>
            <p className="dg-intro-trust dg-intro-reveal dg-intro-reveal--7">
              No guardamos tus métricas en ningún servidor.
            </p>
            <div className="dg-intro-cta-wrap dg-intro-reveal dg-intro-reveal--8">
              <button
                type="button"
                className="dg-btn dg-btn--primary dg-intro-cta dg-btn--cta-glow"
                onClick={() => setPhase('form')}
              >
                Calcular mi proyección →
              </button>
            </div>
            <p className="dg-intro-note dg-intro-reveal dg-intro-reveal--9">
              Gratis · Sin registro · Resultado en ~2 minutos
            </p>
          </div>
        )}

        {phase === 'form' && (
          <>
            <div className="dg-progress" role="list">
              {STEPS.map((label, i) => (
                <div key={label} className="dg-progress-cell" role="listitem">
                  <div
                    className={
                      'dg-progress-bar' +
                      (i < step ? ' dg-progress-bar--done' : '') +
                      (i === step ? ' dg-progress-bar--active' : '')
                    }
                  />
                  <span className={'dg-progress-label' + (i === step ? ' dg-progress-label--active' : '')}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className={`dg-card dg-step-panel ${panelClass}`}>
              {step === 0 && (
                <div className="dg-step-inner">
                  <div className="dg-step-head">
                    <span className="dg-step-icon" aria-hidden>
                      {'\u{1F465}'}
                    </span>
                    <h2 className="dg-step-title">Tu audiencia</h2>
                    <p className="dg-step-sub">Cuéntanos sobre tu comunidad</p>
                  </div>
                  <div>
                    <p className="dg-q">Número de seguidores</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(seguidores, 500, 500000) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={500}
                        max={500000}
                        step={500}
                        value={seguidores}
                        onChange={(e) => setSeguidores(Number(e.target.value))}
                      />
                    </div>
                    <div className="dg-slider-label-row" style={{ marginTop: 6 }}>
                      <span />
                      <span className="dg-slider-val">{formatNum(seguidores)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="dg-q">Vistas promedio por historia</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(vistasHistoria, 10, 100000) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={10}
                        max={100000}
                        step={10}
                        value={vistasHistoria}
                        onChange={(e) => setVistasHistoria(Number(e.target.value))}
                      />
                    </div>
                    <div className="dg-slider-label-row" style={{ marginTop: 6 }}>
                      <span />
                      <span className="dg-slider-val">{formatNum(vistasHistoria)}</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="dg-step-inner">
                  <div className="dg-step-head">
                    <span className="dg-step-icon" aria-hidden>
                      {'\u{1F440}'}
                    </span>
                    <h2 className="dg-step-title">Tu contenido</h2>
                    <p className="dg-step-sub">Métricas de engagement</p>
                  </div>
                  <div>
                    <p className="dg-q">Vistas promedio por reel</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(vistasReel, 50, 500000) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={50}
                        max={500000}
                        step={50}
                        value={vistasReel}
                        onChange={(e) => setVistasReel(Number(e.target.value))}
                      />
                    </div>
                    <div className="dg-slider-label-row" style={{ marginTop: 6 }}>
                      <span />
                      <span className="dg-slider-val">{formatNum(vistasReel)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="dg-q">Likes promedio por publicación</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(likesPub, 5, 50000) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={5}
                        max={50000}
                        step={5}
                        value={likesPub}
                        onChange={(e) => setLikesPub(Number(e.target.value))}
                      />
                    </div>
                    <div className="dg-slider-label-row" style={{ marginTop: 6 }}>
                      <span />
                      <span className="dg-slider-val">{formatNum(likesPub)}</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="dg-step-inner">
                  <div className="dg-step-head">
                    <span className="dg-step-icon" aria-hidden>
                      {'\u{1F4B2}'}
                    </span>
                    <h2 className="dg-step-title">Tu membresía o producto</h2>
                    <p className="dg-step-sub">Precio y monetización</p>
                  </div>
                  <div>
                    <p className="dg-q">Precio mensual de tu membresía o producto (USD)</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(precioMembresia, 5, 500) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={5}
                        max={500}
                        step={1}
                        value={precioMembresia}
                        onChange={(e) => setPrecioMembresia(Number(e.target.value))}
                      />
                    </div>
                    <div className="dg-slider-label-row" style={{ marginTop: 6 }}>
                      <span />
                      <span className="dg-slider-val">{formatMoney(precioMembresia)}</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="dg-step-inner">
                  <div className="dg-step-head">
                    <span className="dg-step-icon" aria-hidden>
                      {'\u{1F4E2}'}
                    </span>
                    <h2 className="dg-step-title">Ads y opciones</h2>
                    <p className="dg-step-sub">Inversión y ritmo de publicación</p>
                  </div>
                  <div>
                    <p className="dg-q">Inversión mensual en ads (USD)</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(inversionAds, 0, 10000) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={0}
                        max={10000}
                        step={50}
                        value={inversionAds}
                        onChange={(e) => setInversionAds(Number(e.target.value))}
                      />
                    </div>
                    <div className="dg-slider-label-row" style={{ marginTop: 6 }}>
                      <span />
                      <span className="dg-slider-val">{formatMoney(inversionAds)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="dg-q">¿Con qué frecuencia vendes por historias?</p>
                    <div className="dg-grid">
                      {STORY_FREQ.map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={'dg-opt' + (storyFreq === o.id ? ' dg-opt--selected' : '')}
                          onClick={() => setStoryFreq((p) => (p === o.id ? null : o.id))}
                        >
                          {storyFreq === o.id && <OptCheck />}
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="dg-q">Publicaciones por semana</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(publicacionesSem, 1, 14) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={1}
                        max={14}
                        step={1}
                        value={publicacionesSem}
                        onChange={(e) => setPublicacionesSem(Number(e.target.value))}
                      />
                    </div>
                    <div className="dg-slider-label-row" style={{ marginTop: 6 }}>
                      <span />
                      <span className="dg-slider-val">{publicacionesSem}</span>
                    </div>
                  </div>
                  {liveMrrMes1 != null && (
                    <p className="dg-live-preview">
                      MRR mes 1 (base del cálculo):{' '}
                      <strong className="dg-live-preview-strong">{formatMoney(liveMrrMes1)}</strong>
                      <span className="dg-live-preview-hint"> — se actualiza al mover los controles</span>
                    </p>
                  )}
                </div>
              )}

              <div className="dg-nav">
                {step > 0 ? (
                  <button type="button" className="dg-btn dg-btn--ghost" onClick={() => goStep(step - 1)}>
                    Anterior
                  </button>
                ) : (
                  <span />
                )}
                {step < 3 ? (
                  <button type="button" className="dg-btn dg-btn--primary" onClick={() => goStep(step + 1)}>
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="button"
                    className="dg-btn dg-btn--primary"
                    disabled={!stepValid}
                    onClick={showResult}
                  >
                    Ver mi proyección
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {showPostForm && res && mrrProb && (
          <div className="dg-result-stack">
            {phase === 'loading' && <LoadingScreen exiting={loadingExit} />}
            <div
              className={
                'dg-result-layer' +
                (resultReveal || phase === 'result' ? ' dg-result-layer--reveal' : ' dg-result-layer--hidden')
              }
            >
              <div className="dg-result">
                <h2 className={'dg-result-title dg-result-hero-title' + (heroIn ? ' dg-result-hero-title--in' : '')}>
                  Tu proyección de ingresos
                </h2>
                <p
                  className={
                    'dg-privacy dg-result-hero-sub' + (heroIn ? ' dg-result-hero-sub--in' : '')
                  }
                  style={{ marginBottom: 12 }}
                >
                  Escenario <strong style={{ color: '#fbbf24' }}>probable</strong> (15% crecimiento mensual del MRR).
                  Miembros estimados según tu precio.
                </p>

                <div className="dg-mrr-grid" ref={mrrBlockRef}>
                  {[
                    { label: 'MRR mes 1', i: 0 },
                    { label: 'MRR mes 3', i: 2 },
                    { label: 'MRR mes 6', i: 5 },
                    { label: 'MRR mes 12', i: 11 },
                  ].map(({ label, i }, idx) => (
                    <MrrCountCard
                      key={label}
                      label={label}
                      target={mrrProb[i]}
                      precio={precioMembresia}
                      delay={idx * 150}
                      isActive={mrrIO}
                    />
                  ))}
                </div>

                <div className="dg-chart-card" ref={chartBlockRef}>
                  <h3 className="dg-chart-title">Proyección de ingreso recurrente mensual</h3>
                  <AnimatedMrrChart
                    key={`mrr-chart-${res.mrr_mes1}-${res.probable[11]}`}
                    conservador={res.conservador}
                    probable={res.probable}
                    agresivo={res.agresivo}
                    shouldPlay={chartIO}
                  />
                </div>

                <div className={'dg-card dg-table-block' + (tableIO ? ' dg-table-block--in' : '')} ref={tableBlockRef}>
                  <h3 className="dg-block-title">Comparativa de escenarios</h3>
                  <div className="dg-table-wrap">
                    <table className="dg-table">
                      <thead>
                        <tr>
                          <th>Escenario</th>
                          <th>Mes 1</th>
                          <th>Mes 3</th>
                          <th>Mes 6</th>
                          <th>Mes 12</th>
                          <th>Total 12m</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          className={'dg-row-con' + (tableRowsIn >= 1 ? ' dg-tr--in' : '')}
                          style={tableRowsIn >= 1 ? { animationDelay: '0.05s' } : undefined}
                        >
                          <td>Conservador</td>
                          <td>{formatMoney(tableCon.m1)}</td>
                          <td>{formatMoney(tableCon.m3)}</td>
                          <td>{formatMoney(tableCon.m6)}</td>
                          <td>{formatMoney(tableCon.m12)}</td>
                          <td className="dg-total">
                            <CountUpCell target={tableCon.total} play={tableTotalsPlay} duration={800} />
                          </td>
                        </tr>
                        <tr
                          className={
                            'dg-row-prob' +
                            (tableRowsIn >= 2 ? ' dg-tr--in' : '') +
                            (tableRowsIn >= 2 ? ' dg-row-prob--pulse' : '')
                          }
                          style={tableRowsIn >= 2 ? { animationDelay: '0.15s' } : undefined}
                        >
                          <td>Probable</td>
                          <td>{formatMoney(tableProb.m1)}</td>
                          <td>{formatMoney(tableProb.m3)}</td>
                          <td>{formatMoney(tableProb.m6)}</td>
                          <td>{formatMoney(tableProb.m12)}</td>
                          <td className="dg-total">
                            <CountUpCell target={tableProb.total} play={tableTotalsPlay} duration={800} />
                          </td>
                        </tr>
                        <tr
                          className={'dg-row-agr' + (tableRowsIn >= 3 ? ' dg-tr--in' : '')}
                          style={tableRowsIn >= 3 ? { animationDelay: '0.25s' } : undefined}
                        >
                          <td>Agresivo</td>
                          <td>{formatMoney(tableAgr.m1)}</td>
                          <td>{formatMoney(tableAgr.m3)}</td>
                          <td>{formatMoney(tableAgr.m6)}</td>
                          <td>{formatMoney(tableAgr.m12)}</td>
                          <td className="dg-total">
                            <CountUpCell target={tableAgr.total} play={tableTotalsPlay} duration={800} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="dg-card" ref={diagBlockRef}>
                  <h3 className="dg-block-title">Tu diagnóstico</h3>
                  {diagRows.map((row, idx) => (
                    <div
                      key={row.key}
                      className={'dg-area-row' + (diagIO ? ' dg-area-row--in' : '')}
                      style={diagIO ? { animationDelay: `${idx * 0.2}s` } : undefined}
                    >
                      <span className="dg-area-icon" aria-hidden>
                        {row.icon}
                      </span>
                      <span className="dg-area-label">{row.label}</span>
                      <span className="dg-area-val" style={{ color: row.valColor }}>
                        {diagNums[idx]}/100
                      </span>
                      <div className="dg-area-track">
                        <div
                          className={
                            'dg-area-fill-anim' + (diagBounce[idx] ? ' dg-area-fill--bounce' : '')
                          }
                          style={{
                            width: `${diagWidths[idx]}%`,
                            background: row.grad,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={'dg-card dg-insights-card' + (insightsCardIn ? ' dg-insights-card--in' : '')}
                  ref={insightsBlockRef}
                >
                  <h3 className="dg-block-title">Insights personalizados</h3>
                  <ul className="dg-insights">
                    {res.insights.map((t, i) => (
                      <li key={t} className={i < insightItemsIn ? 'dg-insight-li--in' : ''}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={'dg-card dg-next-card' + (nextCardIn ? ' dg-next-card--in' : '')} ref={nextBlockRef}>
                  <h3 className="dg-block-title">Tu siguiente paso recomendado</h3>
                  <p className="dg-next">{res.siguientePaso}</p>
                </div>

                <p className="dg-privacy">
                  <span aria-hidden>{'\u{1F512}'} </span>
                  No guardamos tus métricas. Proyecciones orientativas, no promesa de ingresos.
                </p>

                <div
                  className={'dg-card dg-cta-card-anim' + (ctaIn ? ' dg-cta-card-anim--in' : '')}
                  ref={ctaBlockRef}
                >
                  <h3 className="dg-cta-title">¿Quieres llevar esto a resultados reales?</h3>
                  <p className="dg-cta-sub">Elige cómo quieres dar el siguiente paso con nuestro equipo.</p>
                  <button
                    type="button"
                    className="dg-btn dg-btn--primary dg-btn--block dg-btn--cta-glow"
                    onClick={() => {
                      if (window.Calendly) {
                        window.Calendly.initPopupWidget({
                          url: 'https://calendly.com/fluxasystems1/30min',
                        });
                      }
                    }}
                    aria-label="Agendar videollamada gratuita en Calendly"
                  >
                    Agendar videollamada gratuita →
                  </button>
                  <a
                    href={WA_HREF}
                    className="dg-btn dg-btn--ghost dg-btn--block"
                    style={{ marginTop: '10px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir WhatsApp para escribir con Fluxa Method"
                  >
                    Prefiero escribir por WhatsApp →
                  </a>
                  <button type="button" className="dg-link-muted" onClick={resetAll}>
                    Calcular de nuevo con otras métricas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
