'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FLUXA_WHATSAPP_HREF } from '@/lib/whatsapp';

const STEPS = ['Tu negocio', 'Tu presencia', 'Tu objetivo', 'Tu inversión'];

const NETS = [
  { id: 'ig', label: 'Instagram' },
  { id: 'fb', label: 'Facebook' },
  { id: 'tt', label: 'TikTok' },
  { id: 'li', label: 'LinkedIn' },
  { id: 'yt', label: 'YouTube' },
  { id: 'none', label: 'Ninguna' },
];

const LOADING_MSGS = [
  'Analizando tu negocio...',
  'Calculando tu potencial...',
  'Generando tu diagnóstico...',
];

function formatFollowers(n) {
  return Math.round(n).toLocaleString('es-CO');
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function computeDiagnostics(answers) {
  const {
    businessAge,
    businessModel,
    clientesActuales,
    networks,
    contentFreq,
    webStatus,
    followers,
    investCurrent,
    objective,
    timeGoal,
    desiredClients,
    investWilling,
    team,
  } = answers;

  const timePts = { lt6: 5, y1: 10, y3: 15, gt3: 20 }[businessAge] || 0;
  const netCount = networks.has('none') ? 0 : networks.size;
  const netPts = Math.min(netCount * 4, 20);
  const freqPts = { never: 0, low: 5, mid: 10, daily: 15 }[contentFreq] || 0;
  const webPts = { none: 0, basic: 5, noConv: 8, works: 15 }[webStatus] || 0;
  let folPts = 0;
  if (followers > 10000) folPts = 15;
  else if (followers > 1000) folPts = 10;
  else if (followers > 100) folPts = 5;
  else if (followers > 0) folPts = 2;
  const invCurPts = { none: 0, lt200: 5, mid: 10, gt500: 15 }[investCurrent] || 0;

  const modelPts = { physical: 10, service: 12, ecommerce: 14, local: 11 }[businessModel] || 0;
  const capActPts = (clientesActuales / 100) * 8;
  const objPts = { newc: 10, upsell: 8, brand: 7, all: 12 }[objective] || 0;
  const plazoPts = { u1: 12, u3: 10, u6: 8, chill: 5 }[timeGoal] || 0;
  const wantPts = (desiredClients / 200) * 6;
  const willingPts = (investWilling / 2000) * 10;
  const teamPts = { solo: 0, part: 4, messy: 6, full: 8 }[team] || 0;

  const earned =
    timePts +
    netPts +
    freqPts +
    webPts +
    folPts +
    invCurPts +
    modelPts +
    capActPts +
    objPts +
    plazoPts +
    wantPts +
    willingPts +
    teamPts;
  const maxPossible = 20 + 20 + 15 + 15 + 15 + 15 + 14 + 8 + 12 + 12 + 6 + 10 + 8;
  const score = clamp(Math.round((earned / maxPossible) * 100), 0, 100);

  const presenciaDigital = clamp(Math.round(((netPts + freqPts + webPts) / 50) * 100), 0, 100);
  const captacion = clamp(
    Math.round((clientesActuales / 100) * 50 + (invCurPts / 15) * 50),
    0,
    100
  );
  const effRaw = modelPts + timePts;
  const eficiencia = clamp(Math.round((effRaw / 34) * 100), 0, 100);
  const willingNorm = investWilling / 2000;
  const escalabilidad = clamp(Math.round(willingNorm * 55 + score * 0.45), 0, 100);

  const ca = clientesActuales;
  const scenarios = {
    conservador: { m3: Math.round(ca * 1.2), m6: Math.round(ca * 1.4) },
    probable: { m3: Math.round(ca * 2), m6: Math.round(ca * 3) },
    agresivo: { m3: Math.round(ca * 3.5), m6: Math.round(ca * 6) },
  };

  let plan = 'FLUXA START';
  let planDesc =
    'Tu base digital aún tiene mucho por ordenar. Empezamos por presencia, mensaje claro y un embudo simple que genere primeras conversiones.';
  if (score >= 40 && score <= 70) {
    plan = 'FLUXA GROW';
    planDesc =
      'Tienes tracción y señales claras. Escalamos con contenido sistemático, pauta medible y mejoras continuas en captación.';
  } else if (score > 70) {
    plan = 'FLUXA SCALE';
    planDesc =
      'Estás listo para acelerar: estrategia integrada, pauta a escala y automatizaciones para que el crecimiento no dependa solo de tu tiempo.';
  }

  const gaugeMeta =
    score <= 30
      ? { color: '#EF4444', label: 'Potencial base — hay mucho por construir' }
      : score <= 60
        ? { color: '#F59E0B', label: 'Potencial medio — buen punto de partida' }
        : score <= 80
          ? { color: '#22C55E', label: 'Alto potencial — listo para escalar' }
          : { color: '#A855F7', label: 'Potencial premium — momento de acelerar' };

  const insights = [];
  if (netCount <= 1) {
    insights.push('Ampliar presencia en 1–2 redes clave puede multiplicar puntos de contacto con clientes ideales.');
  }
  if (contentFreq === 'never' || contentFreq === 'low') {
    insights.push('Subir la frecuencia de contenido suele bajar el costo por lead y educa mejor antes de la venta.');
  }
  if (webStatus === 'none' || webStatus === 'basic') {
    insights.push('Una landing enfocada en una sola oferta suele convertir mejor que perfiles sueltos en redes.');
  }
  if (invCurPts <= 5) {
    insights.push('Invertir de forma medible en marketing acelera el aprendizaje: qué canal y mensaje funcionan para tu negocio.');
  }
  if (insights.length < 2) {
    insights.push('Tu combinación de objetivos e inversión encaja con un roadmap por fases: quick wins primero, escala después.');
  }

  return {
    score,
    gaugeMeta,
    areas: {
      presencia: presenciaDigital,
      captacion,
      eficiencia,
      escalabilidad,
    },
    scenarios,
    plan,
    planDesc,
    insights: insights.slice(0, 4),
  };
}

function OptCheck() {
  return <span className="diagnostico-opt-check">{'\u2713'}</span>;
}

export default function DiagnosticoWidget() {
  const numInputWidth = (v, minChars = 3) =>
    `${Math.max(String(Math.abs(Number(v) || 0)).length, minChars) + 2}ch`;
  const [phase, setPhase] = useState('form');
  const [step, setStep] = useState(0);
  const [panelClass, setPanelClass] = useState('diagnostico-step-panel--visible');

  const [businessAge, setBusinessAge] = useState(null);
  const [businessModel, setBusinessModel] = useState(null);
  const [clientesActuales, setClientesActuales] = useState(0);

  const [networks, setNetworks] = useState(() => new Set());
  const [contentFreq, setContentFreq] = useState(null);
  const [webStatus, setWebStatus] = useState(null);
  const [followers, setFollowers] = useState(0);

  const [objective, setObjective] = useState(null);
  const [timeGoal, setTimeGoal] = useState(null);
  const [desiredClients, setDesiredClients] = useState(0);

  const [investCurrent, setInvestCurrent] = useState(null);
  const [investWilling, setInvestWilling] = useState(0);
  const [team, setTeam] = useState(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const loadCanvasRef = useRef(null);
  const loadRafRef = useRef(null);
  const particleLoopRef = useRef(null);

  const [result, setResult] = useState(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [barsReady, setBarsReady] = useState(false);
  const resultWrapRef = useRef(null);

  const toggleSingle = useCallback((setFn, value) => {
    setFn((prev) => (prev === value ? null : value));
  }, []);

  const toggleNetwork = useCallback((id) => {
    setNetworks((prev) => {
      const next = new Set(prev);
      if (id === 'none') {
        next.clear();
        next.add('none');
        return next;
      }
      next.delete('none');
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const answers = useMemo(
    () => ({
      businessAge,
      businessModel,
      clientesActuales,
      networks,
      contentFreq,
      webStatus,
      followers,
      objective,
      timeGoal,
      desiredClients,
      investCurrent,
      investWilling,
      team,
    }),
    [
      businessAge,
      businessModel,
      clientesActuales,
      networks,
      contentFreq,
      webStatus,
      followers,
      objective,
      timeGoal,
      desiredClients,
      investCurrent,
      investWilling,
      team,
    ]
  );

  const stepValid = useMemo(() => {
    if (step === 0) return Boolean(businessAge && businessModel);
    if (step === 1) return networks.size > 0 && contentFreq && webStatus;
    if (step === 2) return Boolean(objective && timeGoal);
    if (step === 3) return Boolean(investCurrent && team);
    return false;
  }, [step, businessAge, businessModel, networks, contentFreq, webStatus, objective, timeGoal, investCurrent, team]);

  const goStep = useCallback((nextStep) => {
    setPanelClass('diagnostico-step-panel--exit');
    window.setTimeout(() => {
      setStep(nextStep);
      setPanelClass('diagnostico-step-panel--enter');
      window.requestAnimationFrame(() => {
        setPanelClass('diagnostico-step-panel--visible');
      });
    }, 350);
  }, []);

  const runLoading = useCallback(() => {
    if (loadRafRef.current) cancelAnimationFrame(loadRafRef.current);
    setPhase('loading');
    setLoadingProgress(0);
    setLoadingMsgIdx(0);
    const start = performance.now();
    const dur = 3000;

    const tick = (now) => {
      const t = clamp((now - start) / dur, 0, 1);
      setLoadingProgress(Math.round(t * 100));
      setLoadingMsgIdx(Math.min(Math.floor((now - start) / 1000), LOADING_MSGS.length - 1));
      if (t < 1) {
        loadRafRef.current = requestAnimationFrame(tick);
      } else {
        loadRafRef.current = null;
        const diag = computeDiagnostics(answers);
        setResult(diag);
        setDisplayScore(0);
        setBarsReady(false);
        setPhase('result');
      }
    };
    loadRafRef.current = requestAnimationFrame(tick);
  }, [answers]);

  useEffect(() => {
    return () => {
      if (loadRafRef.current) cancelAnimationFrame(loadRafRef.current);
      if (particleLoopRef.current) cancelAnimationFrame(particleLoopRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'loading') return undefined;
    const canvas = loadCanvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    let w = 0;
    let h = 0;
    let particles = [];
    let raf = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: 28 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        a: 0.15 + Math.random() * 0.35,
      }));
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(168, 85, 247, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
      particleLoopRef.current = raf;
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'result' || !result) return undefined;
    const target = result.score;
    const dur = 1500;
    const start = performance.now();
    let raf = 0;
    const count = (now) => {
      const t = clamp((now - start) / dur, 0, 1);
      const eased = 1 - (1 - t) * (1 - t);
      setDisplayScore(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(count);
      else {
        setDisplayScore(target);
        setBarsReady(true);
      }
    };
    raf = requestAnimationFrame(count);
    return () => cancelAnimationFrame(raf);
  }, [phase, result]);

  const resetAll = useCallback(() => {
    setPhase('form');
    setStep(0);
    setBusinessAge(null);
    setBusinessModel(null);
    setClientesActuales(0);
    setNetworks(new Set());
    setContentFreq(null);
    setWebStatus(null);
    setFollowers(0);
    setObjective(null);
    setTimeGoal(null);
    setDesiredClients(0);
    setInvestCurrent(null);
    setInvestWilling(0);
    setTeam(null);
    setResult(null);
    setPanelClass('diagnostico-step-panel--visible');
  }, []);

  const gaugeCirc = 2 * Math.PI * 52;
  const gaugeOffset = result ? gaugeCirc * (1 - displayScore / 100) : gaugeCirc;

  const areaRows = [
    { key: 'presencia', icon: '\u{1F310}', label: 'Presencia digital', color: '#A855F7' },
    { key: 'captacion', icon: '\u{1F3AF}', label: 'Captación de clientes', color: '#3B82F6' },
    { key: 'eficiencia', icon: '\u{26A1}', label: 'Eficiencia de ventas', color: '#22C55E' },
    { key: 'escalabilidad', icon: '\u{1F4C8}', label: 'Escalabilidad', color: '#F97316' },
  ];

  return (
    <section
      className="diagnostico-section section section--reveal section--diagnostico"
      id="diagnostico"
      aria-labelledby="diagnostico-heading"
    >
      <div className="container">
        <p className="diagnostico-eyebrow">
          <span className="diagnostico-eyebrow-star" aria-hidden>
            {'\u2726'}
          </span>{' '}
          DIAGNÓSTICO GRATUITO
        </p>
        <h2 className="diagnostico-title" id="diagnostico-heading">
          Descubre el potencial digital de tu negocio
        </h2>
        <p className="diagnostico-lead">
          Responde 4 preguntas y recibe tu diagnóstico personalizado + plan recomendado
        </p>

        <div className="diagnostico-shell">
          {phase === 'form' && (
            <>
              <div className="diagnostico-progress" role="list" aria-label="Pasos del diagnóstico">
                {STEPS.map((label, i) => (
                  <div key={label} className="diagnostico-progress-cell" role="listitem">
                    <div
                      className={
                        'diagnostico-progress-bar' +
                        (i < step ? ' diagnostico-progress-bar--done' : '') +
                        (i === step ? ' diagnostico-progress-bar--active' : '') +
                        (i > step ? ' diagnostico-progress-bar--pending' : '')
                      }
                    />
                    <span
                      className={
                        'diagnostico-progress-label' + (i === step ? ' diagnostico-progress-label--active' : '')
                      }
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className={`diagnostico-card diagnostico-step-panel ${panelClass}`}>
                {step === 0 && (
                  <div className="diagnostico-step-inner">
                    <div className="diagnostico-step-head">
                      <span className="diagnostico-step-icon" aria-hidden>
                        {'\u{1F3E2}'}
                      </span>
                      <h3 className="diagnostico-step-title">Cuéntanos sobre tu negocio</h3>
                      <p className="diagnostico-step-sub">Para darte un diagnóstico real necesitamos entender dónde estás</p>
                    </div>

                    <p className="diagnostico-q">¿Cuánto tiempo lleva tu negocio activo?</p>
                    <div className="diagnostico-grid diagnostico-grid--2">
                      {[
                        { id: 'lt6', label: 'Menos de 6 meses' },
                        { id: 'y1', label: '6 meses a 1 año' },
                        { id: 'y3', label: '1 a 3 años' },
                        { id: 'gt3', label: 'Más de 3 años' },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={
                            'diagnostico-opt' + (businessAge === o.id ? ' diagnostico-opt--selected' : '')
                          }
                          onClick={() => toggleSingle(setBusinessAge, o.id)}
                        >
                          {businessAge === o.id && <OptCheck />}
                          {o.label}
                        </button>
                      ))}
                    </div>

                    <p className="diagnostico-q">¿Cuál es tu modelo de negocio?</p>
                    <div className="diagnostico-grid diagnostico-grid--2">
                      {[
                        { id: 'physical', label: 'Productos físicos' },
                        { id: 'service', label: 'Servicios / consultoría' },
                        { id: 'ecommerce', label: 'Ecommerce / tienda online' },
                        { id: 'local', label: 'Negocio local' },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={
                            'diagnostico-opt' + (businessModel === o.id ? ' diagnostico-opt--selected' : '')
                          }
                          onClick={() => toggleSingle(setBusinessModel, o.id)}
                        >
                          {businessModel === o.id && <OptCheck />}
                          {o.label}
                        </button>
                      ))}
                    </div>

                    <p className="diagnostico-q">¿Cuántos clientes nuevos consigues al mes?</p>
                    <div
                      className="diagnostico-slider-row"
                      style={{ '--pct': `${(clientesActuales / 100) * 100}%` }}
                    >
                      <input
                        type="range"
                        className="diagnostico-range"
                        min={0}
                        max={100}
                        value={clientesActuales}
                        onInput={(e) => setClientesActuales(Number(e.currentTarget.value))}
                        onChange={(e) => setClientesActuales(Number(e.target.value))}
                        aria-valuetext={`${clientesActuales} clientes`}
                      />
                      <div className="diagnostico-slider-control">
                        <button
                          type="button"
                          className="diagnostico-slider-btn"
                          onClick={() => setClientesActuales((prev) => clamp(prev - 1, 0, 100))}
                          aria-label="Disminuir clientes nuevos al mes"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="diagnostico-slider-input"
                          min={0}
                          max={100}
                          step={1}
                          style={{ width: numInputWidth(clientesActuales, 2) }}
                          value={clientesActuales}
                          onChange={(e) => {
                            const v = Number(e.currentTarget.value);
                            if (Number.isNaN(v)) return;
                            setClientesActuales(clamp(v, 0, 100));
                          }}
                          aria-label="Clientes nuevos al mes"
                        />
                        <button
                          type="button"
                          className="diagnostico-slider-btn"
                          onClick={() => setClientesActuales((prev) => clamp(prev + 1, 0, 100))}
                          aria-label="Aumentar clientes nuevos al mes"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="diagnostico-step-inner">
                    <div className="diagnostico-step-head">
                      <span className="diagnostico-step-icon" aria-hidden>
                        {'\u{1F4F1}'}
                      </span>
                      <h3 className="diagnostico-step-title">Tu presencia digital actual</h3>
                    </div>

                    <p className="diagnostico-q">¿En qué redes tienes presencia?</p>
                    <div className="diagnostico-grid diagnostico-grid--3">
                      {NETS.map((n) => (
                        <button
                          key={n.id}
                          type="button"
                          className={
                            'diagnostico-opt' + (networks.has(n.id) ? ' diagnostico-opt--selected' : '')
                          }
                          onClick={() => toggleNetwork(n.id)}
                        >
                          {networks.has(n.id) && <OptCheck />}
                          {n.label}
                        </button>
                      ))}
                    </div>

                    <p className="diagnostico-q">¿Con qué frecuencia publicas contenido?</p>
                    <div className="diagnostico-grid diagnostico-grid--2">
                      {[
                        { id: 'never', label: 'Nunca o casi nunca' },
                        { id: 'low', label: '1-2 veces/semana' },
                        { id: 'mid', label: '3-4 veces/semana' },
                        { id: 'daily', label: 'Todos los días' },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={
                            'diagnostico-opt' + (contentFreq === o.id ? ' diagnostico-opt--selected' : '')
                          }
                          onClick={() => toggleSingle(setContentFreq, o.id)}
                        >
                          {contentFreq === o.id && <OptCheck />}
                          {o.label}
                        </button>
                      ))}
                    </div>

                    <p className="diagnostico-q">¿Tienes página web o landing?</p>
                    <div className="diagnostico-grid diagnostico-grid--2">
                      {[
                        { id: 'none', label: 'No tengo nada' },
                        { id: 'basic', label: 'Algo básico que no convierte' },
                        { id: 'noConv', label: 'Tengo página pero no genera clientes' },
                        { id: 'works', label: 'Sí y funciona bien' },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={
                            'diagnostico-opt' + (webStatus === o.id ? ' diagnostico-opt--selected' : '')
                          }
                          onClick={() => toggleSingle(setWebStatus, o.id)}
                        >
                          {webStatus === o.id && <OptCheck />}
                          {o.label}
                        </button>
                      ))}
                    </div>

                    <p className="diagnostico-q">¿Cuántos seguidores tienes?</p>
                    <div
                      className="diagnostico-slider-row"
                      style={{ '--pct': `${(followers / 50000) * 100}%` }}
                    >
                      <input
                        type="range"
                        className="diagnostico-range"
                        min={0}
                        max={50000}
                        step={1}
                        value={followers}
                        onInput={(e) => setFollowers(Number(e.currentTarget.value))}
                        onChange={(e) => setFollowers(Number(e.target.value))}
                        aria-valuetext={formatFollowers(followers)}
                      />
                      <div className="diagnostico-slider-control">
                        <button
                          type="button"
                          className="diagnostico-slider-btn"
                          onClick={() => setFollowers((prev) => clamp(prev - 1, 0, 50000))}
                          aria-label="Disminuir seguidores actuales"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="diagnostico-slider-input"
                          min={0}
                          max={50000}
                          step={1}
                          style={{ width: numInputWidth(followers, 2) }}
                          value={followers}
                          onChange={(e) => {
                            const v = Number(e.currentTarget.value);
                            if (Number.isNaN(v)) return;
                            setFollowers(clamp(v, 0, 50000));
                          }}
                          aria-label="Seguidores actuales"
                        />
                        <button
                          type="button"
                          className="diagnostico-slider-btn"
                          onClick={() => setFollowers((prev) => clamp(prev + 1, 0, 50000))}
                          aria-label="Aumentar seguidores actuales"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="diagnostico-step-inner">
                    <div className="diagnostico-step-head">
                      <span className="diagnostico-step-icon" aria-hidden>
                        {'\u{1F3AF}'}
                      </span>
                      <h3 className="diagnostico-step-title">¿Qué quieres lograr?</h3>
                    </div>

                    <p className="diagnostico-q">¿Cuál es tu objetivo principal?</p>
                    <div className="diagnostico-grid diagnostico-grid--2">
                      {[
                        { id: 'newc', label: 'Conseguir más clientes nuevos' },
                        { id: 'upsell', label: 'Vender más a actuales' },
                        { id: 'brand', label: 'Construir mi marca online' },
                        { id: 'all', label: 'Todo lo anterior' },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={
                            'diagnostico-opt' + (objective === o.id ? ' diagnostico-opt--selected' : '')
                          }
                          onClick={() => toggleSingle(setObjective, o.id)}
                        >
                          {objective === o.id && <OptCheck />}
                          {o.label}
                        </button>
                      ))}
                    </div>

                    <p className="diagnostico-q">¿En cuánto tiempo quieres resultados?</p>
                    <div className="diagnostico-grid diagnostico-grid--2">
                      {[
                        { id: 'u1', label: '1 mes — urgente' },
                        { id: 'u3', label: '3 meses — razonable' },
                        { id: 'u6', label: '6 meses — sólido' },
                        { id: 'chill', label: 'Sin prisa' },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={
                            'diagnostico-opt' + (timeGoal === o.id ? ' diagnostico-opt--selected' : '')
                          }
                          onClick={() => toggleSingle(setTimeGoal, o.id)}
                        >
                          {timeGoal === o.id && <OptCheck />}
                          {o.label}
                        </button>
                      ))}
                    </div>

                    <p className="diagnostico-q">¿Cuántos clientes nuevos al mes quisieras tener?</p>
                    <div
                      className="diagnostico-slider-row"
                      style={{ '--pct': `${(desiredClients / 200) * 100}%` }}
                    >
                      <input
                        type="range"
                        className="diagnostico-range"
                        min={0}
                        max={200}
                        value={desiredClients}
                        onInput={(e) => setDesiredClients(Number(e.currentTarget.value))}
                        onChange={(e) => setDesiredClients(Number(e.target.value))}
                      />
                      <div className="diagnostico-slider-control">
                        <button
                          type="button"
                          className="diagnostico-slider-btn"
                          onClick={() => setDesiredClients((prev) => clamp(prev - 1, 0, 200))}
                          aria-label="Disminuir clientes deseados al mes"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="diagnostico-slider-input"
                          min={0}
                          max={200}
                          step={1}
                          style={{ width: numInputWidth(desiredClients, 2) }}
                          value={desiredClients}
                          onChange={(e) => {
                            const v = Number(e.currentTarget.value);
                            if (Number.isNaN(v)) return;
                            setDesiredClients(clamp(v, 0, 200));
                          }}
                          aria-label="Clientes deseados al mes"
                        />
                        <button
                          type="button"
                          className="diagnostico-slider-btn"
                          onClick={() => setDesiredClients((prev) => clamp(prev + 1, 0, 200))}
                          aria-label="Aumentar clientes deseados al mes"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="diagnostico-step-inner">
                    <div className="diagnostico-step-head">
                      <span className="diagnostico-step-icon" aria-hidden>
                        {'\u{1F4B0}'}
                      </span>
                      <h3 className="diagnostico-step-title">Tu capacidad de inversión</h3>
                    </div>

                    <p className="diagnostico-q">¿Cuánto inviertes actualmente en marketing?</p>
                    <div className="diagnostico-grid diagnostico-grid--2">
                      {[
                        { id: 'none', label: 'Nada todavía' },
                        { id: 'lt200', label: 'Menos de $200/mes' },
                        { id: 'mid', label: '$200 - $500/mes' },
                        { id: 'gt500', label: 'Más de $500/mes' },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={
                            'diagnostico-opt' + (investCurrent === o.id ? ' diagnostico-opt--selected' : '')
                          }
                          onClick={() => toggleSingle(setInvestCurrent, o.id)}
                        >
                          {investCurrent === o.id && <OptCheck />}
                          {o.label}
                        </button>
                      ))}
                    </div>

                    <p className="diagnostico-q">¿Cuánto invertirías para crecer?</p>
                    <div
                      className="diagnostico-slider-row"
                      style={{ '--pct': `${(investWilling / 2000) * 100}%` }}
                    >
                      <input
                        type="range"
                        className="diagnostico-range"
                        min={0}
                        max={2000}
                        step={1}
                        value={investWilling}
                        onInput={(e) => setInvestWilling(Number(e.currentTarget.value))}
                        onChange={(e) => setInvestWilling(Number(e.target.value))}
                      />
                      <div className="diagnostico-slider-control">
                        <button
                          type="button"
                          className="diagnostico-slider-btn"
                          onClick={() => setInvestWilling((prev) => clamp(prev - 1, 0, 2000))}
                          aria-label="Disminuir inversión mensual para crecer"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="diagnostico-slider-input"
                          min={0}
                          max={2000}
                          step={1}
                          style={{ width: numInputWidth(investWilling, 3) }}
                          value={investWilling}
                          onChange={(e) => {
                            const v = Number(e.currentTarget.value);
                            if (Number.isNaN(v)) return;
                            setInvestWilling(clamp(v, 0, 2000));
                          }}
                          aria-label="Inversión mensual para crecer en USD"
                        />
                        <button
                          type="button"
                          className="diagnostico-slider-btn"
                          onClick={() => setInvestWilling((prev) => clamp(prev + 1, 0, 2000))}
                          aria-label="Aumentar inversión mensual para crecer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="diagnostico-q">¿Tienes equipo de marketing?</p>
                    <div className="diagnostico-grid diagnostico-grid--2">
                      {[
                        { id: 'solo', label: 'No, hago todo solo' },
                        { id: 'part', label: '1 persona part-time' },
                        { id: 'messy', label: 'Equipo sin estrategia' },
                        { id: 'full', label: 'Equipo completo' },
                      ].map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={'diagnostico-opt' + (team === o.id ? ' diagnostico-opt--selected' : '')}
                          onClick={() => toggleSingle(setTeam, o.id)}
                        >
                          {team === o.id && <OptCheck />}
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="diagnostico-nav">
                  {step > 0 ? (
                    <button type="button" className="diagnostico-btn diagnostico-btn--ghost" onClick={() => goStep(step - 1)}>
                      Anterior
                    </button>
                  ) : (
                    <span className="diagnostico-nav-spacer" />
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      className={
                        'diagnostico-btn diagnostico-btn--primary' + (!stepValid ? ' diagnostico-btn--disabled' : '')
                      }
                      disabled={!stepValid}
                      onClick={() => goStep(step + 1)}
                    >
                      Siguiente
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={
                        'diagnostico-btn diagnostico-btn--primary diagnostico-btn--glow' +
                        (!stepValid ? ' diagnostico-btn--disabled' : '')
                      }
                      disabled={!stepValid}
                      onClick={runLoading}
                    >
                      Ver mi diagnóstico
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {phase === 'loading' && (
            <div className="diagnostico-card diagnostico-loading" aria-live="polite">
              <canvas ref={loadCanvasRef} className="diagnostico-loading-canvas" />
              <p className="diagnostico-loading-text">{LOADING_MSGS[loadingMsgIdx]}</p>
              <div className="diagnostico-loading-bar-track">
                <div className="diagnostico-loading-bar-fill" style={{ width: `${loadingProgress}%` }} />
              </div>
            </div>
          )}

          {phase === 'result' && result && (
            <div className="diagnostico-result" ref={resultWrapRef}>
              <div className="diagnostico-card diagnostico-result-hero diagnostico-fade-stagger">
                <div className="diagnostico-gauge-wrap">
                  <svg className="diagnostico-gauge" viewBox="0 0 120 120" aria-hidden>
                    <circle className="diagnostico-gauge-bg" cx="60" cy="60" r="52" fill="none" />
                    <circle
                      className="diagnostico-gauge-fill"
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={result.gaugeMeta.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={gaugeCirc}
                      strokeDashoffset={gaugeOffset}
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="diagnostico-score-num" style={{ color: result.gaugeMeta.color }}>
                    {displayScore}
                  </div>
                </div>
                <p className="diagnostico-gauge-label">Tu Potencial Digital</p>
                <p className="diagnostico-gauge-sublabel">{result.gaugeMeta.label}</p>
              </div>

              <div className="diagnostico-scenarios diagnostico-fade-stagger">
                <h4 className="diagnostico-result-block-title">Clientes nuevos proyectados</h4>
                <div className="diagnostico-scenario-grid">
                  <div className="diagnostico-scenario diagnostico-scenario--con">
                    <p className="diagnostico-scenario-name">Conservador</p>
                    <p className="diagnostico-scenario-desc">Sin cambios significativos</p>
                    <p>
                      Mes 3: <strong>{result.scenarios.conservador.m3}</strong>
                    </p>
                    <p>
                      Mes 6: <strong>{result.scenarios.conservador.m6}</strong>
                    </p>
                  </div>
                  <div className="diagnostico-scenario diagnostico-scenario--prob">
                    <span className="diagnostico-badge">Con Fluxa</span>
                    <p className="diagnostico-scenario-name">Probable</p>
                    <p className="diagnostico-scenario-desc">Implementando el sistema</p>
                    <p>
                      Mes 3: <strong>{result.scenarios.probable.m3}</strong>
                    </p>
                    <p>
                      Mes 6: <strong>{result.scenarios.probable.m6}</strong>
                    </p>
                  </div>
                  <div className="diagnostico-scenario diagnostico-scenario--agr">
                    <span className="diagnostico-badge diagnostico-badge--green">Sistema completo</span>
                    <p className="diagnostico-scenario-name">Agresivo</p>
                    <p className="diagnostico-scenario-desc">Con pauta + automatizaciones</p>
                    <p>
                      Mes 3: <strong>{result.scenarios.agresivo.m3}</strong>
                    </p>
                    <p>
                      Mes 6: <strong>{result.scenarios.agresivo.m6}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="diagnostico-card diagnostico-fade-stagger">
                <h4 className="diagnostico-result-block-title">Diagnóstico por área</h4>
                {areaRows.map((row) => (
                  <div key={row.key} className="diagnostico-area-row">
                    <span className="diagnostico-area-icon" aria-hidden>
                      {row.icon}
                    </span>
                    <span className="diagnostico-area-label">{row.label}</span>
                    <span className="diagnostico-area-val" style={{ color: row.color }}>
                      {result.areas[row.key]}/100
                    </span>
                    <div className="diagnostico-area-track">
                      <div
                        className={'diagnostico-area-fill diagnostico-area-fill--anim' + (barsReady ? ' is-on' : '')}
                        style={{
                          width: barsReady ? `${result.areas[row.key]}%` : '0%',
                          background: row.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="diagnostico-card diagnostico-plan diagnostico-fade-stagger">
                <h4 className="diagnostico-result-block-title">Plan recomendado</h4>
                <p className="diagnostico-plan-name">Basado en tu diagnóstico, te recomendamos: {result.plan}</p>
                <p className="diagnostico-plan-desc">{result.planDesc}</p>
              </div>

              <div className="diagnostico-card diagnostico-fade-stagger">
                <h4 className="diagnostico-result-block-title">Analisis Personalizado</h4>
                <ul className="diagnostico-insights">
                  {result.insights.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <p className="diagnostico-privacy">
                <span aria-hidden>{'\u{1F512}'}</span> No guardamos tu información. Solo queremos ayudarte a crecer.
              </p>

              <div className="diagnostico-card diagnostico-cta-card diagnostico-fade-stagger">
                <h3 className="diagnostico-cta-title">¿Listo para convertir este potencial en resultados reales?</h3>
                <p className="diagnostico-cta-sub">
                  Agenda tu diagnóstico por WhatsApp con Fluxa Method y te mostramos el camino exacto.
                </p>
                <a
                  href={FLUXA_WHATSAPP_HREF}
                  className="diagnostico-btn diagnostico-btn--primary diagnostico-btn--block diagnostico-btn--glow"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Agendar diagnóstico: abrir WhatsApp"
                >
                  Agendar mi diagnóstico gratuito
                </a>
                <button type="button" className="diagnostico-link-reset" onClick={resetAll}>
                  Hacer el diagnóstico de nuevo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
