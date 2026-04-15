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

/** Lectura directa del modelo (sin nuevas preguntas al formulario). */
function buildFluxaDiagnostico({
  mrr_mes1,
  inversionAds,
  potencialDescubrimiento,
  storyRare,
  riesgoRetencion,
}) {
  let lecturaHonesta;

  if (mrr_mes1 < 150) {
    lecturaHonesta =
      'Siendo directo: hoy no hay un sistema claro que convierta tu audiencia en ingresos. Puede ser que tu oferta no esté conectando, que el proceso de compra tenga fricciones o que el mensaje no sea lo suficientemente claro. Antes de crecer hay que resolver cuál de esos tres es el problema real.';
  } else if (inversionAds >= 300 && mrr_mes1 < 500) {
    lecturaHonesta =
      'Estás gastando en publicidad pero los ingresos no lo reflejan. Eso casi siempre significa que el anuncio lleva a las personas a un lugar donde no encuentran una razón clara para comprar. Más presupuesto no va a resolver eso — hay que arreglar lo que pasa después del clic.';
  } else if (mrr_mes1 < 500) {
    if (storyRare) {
      lecturaHonesta =
        'Tus ingresos todavía están en etapa de construcción. El problema principal es que casi no estás usando las historias para vender, y ese es el canal que más cierra ventas de membresías o productos digitales. Tener audiencia no es suficiente si el canal de venta no está activo.';
    } else {
      lecturaHonesta =
        'Tus ingresos recurrentes todavía están en una base frágil. No es un problema de tu valor o tu contenido — es que falta un proceso claro que lleve a las personas desde que te descubren hasta que pagan, de forma repetible y sin depender del impulso del momento.';
    }
  } else if (mrr_mes1 < 2500) {
    if (inversionAds <= 0) {
      lecturaHonesta =
        'Ya tienes tracción real — eso es importante. Pero sin publicidad medida, tu crecimiento depende completamente de tu ritmo de contenido orgánico. Si un día publicas menos, los ingresos se sienten. El siguiente paso es construir un sistema que no dependa solo de ti.';
    } else {
      lecturaHonesta =
        'Estás en un punto donde la publicidad ya tiene sentido. El riesgo más común aquí es cambiar todo cada semana sin saber qué está fallando realmente. Necesitas un sistema simple para medir qué anuncio funciona y qué paso del proceso de venta está frenando a los compradores.';
    }
  } else if (potencialDescubrimiento >= 60) {
    lecturaHonesta =
      'Tus números muestran un potencial de ingresos alto y buena capacidad de llegar a personas nuevas. El reto ahora es crecer sin que todo dependa de tu tiempo y energía — necesitas sistemas y automatizaciones que trabajen mientras tú te enfocas en lo que solo tú puedes hacer.';
  } else {
    lecturaHonesta =
      'Tus ingresos potenciales son buenos pero tu capacidad de llegar a personas nuevas todavía es limitada. Si escalas agresivamente ahora sin resolver eso, vas a amplificar un problema que ya existe — ya sea en cómo comunicas tu oferta o en cómo atraes nuevas audiencias.';
  }

  if (riesgoRetencion >= 85 && mrr_mes1 >= 150) {
    lecturaHonesta +=
      ' Además, hay una señal importante de retención: si no hay una experiencia de valor constante después de la compra, los clientes de tu membresía o producto van a dejar de renovar. La venta es solo el comienzo — lo que pasa después es lo que sostiene el ingreso recurrente.';
  }

  return lecturaHonesta;
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
  const ratioHist = seguidores > 0 ? vistasHistoria / seguidores : 0;
  const audienciaCaliente = clamp(Math.round(ratioHist * 120), 5, 100);
  const potencialDescubrimiento = clamp(
    Math.round((Math.log10(vistasReel + 50) / Math.log10(500050)) * 100),
    5,
    100
  );
  const engagement = likesPub / Math.max(vistasReel, 1);
  const potencialMonetizacion = clamp(Math.round(engagement * 400 + mrr_mes1 / 200), 5, 100);
  const riesgoRetencion = clamp(100 - freqScore + Math.round((1 - engagement) * 15), 5, 100);

  const storyRare = freqHistorias === 'never' || freqHistorias === 'rarely';
  const insightSeed = (seguidores + vistasReel + vistasHistoria) | 0;

  const insightRules = [
    {
      when: inversionAds >= 300 && mrr_mes1 < 500,
      text:
        'Estás invirtiendo en pauta pero tus ingresos del mes 1 siguen bajos. Estás pagando por tráfico que no se convierte en clientes recurrentes. Antes de seguir gastando en publicidad, hay que revisar tu oferta y tu proceso de venta.',
    },
    {
      when: mrr_mes1 < 150,
      text:
        'Tus ingresos estimados del primer mes son muy bajos para el tamaño de tu audiencia. El problema no es la cantidad de seguidores — es que tu oferta o tu proceso de venta no está convirtiendo. Hay que arreglar eso antes de pensar en crecer.',
    },
    {
      when: engagement < 0.01 && vistasReel >= 2000,
      text:
        'Tus reels tienen alcance pero poca interacción real. Que alguien vea tu contenido no significa que le interese lo suficiente para comprar. Con ese nivel de engagement, vender tu membresía o producto va a ser muy difícil aunque sigas publicando más.',
    },
    {
      when: ratioHist < 0.015 && storyRare,
      text:
        'Casi no estás usando las historias para vender y se nota en los números. Las historias son el canal que más convierte en ventas de membresías o productos digitales. Hoy ese canal está dormido y estás dejando dinero sobre la mesa.',
    },
    {
      when: riesgoRetencion >= 80,
      text:
        'Aunque consigas clientes nuevos, hay alta probabilidad de que no se queden. Cuando tu membresía o producto no genera un hábito de valor continuo en el cliente, la compra se siente como un evento aislado y no renuevan. Hay que trabajar la experiencia post-venta.',
    },
    {
      when: inversionAds > 0 && potencialMonetizacion < 35,
      text:
        'Tienes atención pero no la estás convirtiendo en dinero. El problema no es conseguir más seguidores — es que los que ya te siguen no están dando el paso de comprar. Escalar sin resolver eso solo va a multiplicar el problema.',
    },
    {
      when: audienciaCaliente < 25,
      text:
        'Las personas que más probabilidad tienen de comprarte casi no están viendo tus historias. Sin esa audiencia activa en historias, vender tu membresía o producto por ese canal es prácticamente imposible por ahora.',
    },
    {
      when: ratioHist < 0.02 && !(ratioHist < 0.015 && storyRare),
      text:
        'Pocas personas de las que te siguen están viendo tus historias. Prueba empezar cada historia con algo que genere curiosidad inmediata y termina siempre con una acción clara — una pregunta, un link o un mensaje directo.',
    },
    {
      when: ratioHist >= 0.02 && ratioHist <= 0.08,
      text:
        'Tus historias tienen un alcance medio para el tamaño de tu audiencia. Prueba publicar 2 o 3 veces por semana con un formato fijo — una historia que genere conversación, una que invite a actuar y una que muestre resultados reales. Mide cuál de las tres genera más respuesta.',
    },
    {
      when: ratioHist > 0.08,
      text:
        'Tus historias están funcionando bien — la gente te está viendo. Ese es tu canal más fuerte para presentar ofertas y vender tu membresía o producto. Apróvechalo con más consistencia.',
    },
    {
      when: vistasReel > seguidores * 0.5,
      text:
        'Tus reels están atrayendo gente nueva. El siguiente paso es no dejarla ir — usa historias para darle seguimiento a ese alcance y lleva a esas personas hacia tu oferta con pasos claros y simples.',
    },
    {
      when: vistasReel > seguidores * 0.12 && vistasReel <= seguidores * 0.5,
      text:
        'Tus reels están llegando a personas nuevas. Para convertir ese alcance en ventas necesitas una sola promesa clara en tu contenido y un siguiente paso obvio — lleva ese interés a tus historias donde puedas cerrar la venta.',
    },
    {
      when: vistasReel <= seguidores * 0.08 && seguidores >= 3000,
      text:
        'Tus reels no están llegando tan lejos como deberían para el tamaño de tu audiencia. Enfócate en los primeros segundos del video — ahí se decide si alguien sigue viendo. Elige 3 temas que repitas con frecuencia y termina siempre pidiendo algo concreto al espectador.',
    },
    {
      when: storyRare,
      text:
        'Vender por historias funciona cuando se hace de forma constante y con intención. Agenda días específicos para presentar tu oferta y prueba diferentes formatos para ver cuál genera más respuesta de tu audiencia.',
    },
    {
      when: freqHistorias === 'sometimes',
      text:
        'Vender de vez en cuando por historias no es suficiente para construir ingresos estables. Elige 2 días fijos a la semana como tu momento de venta y prepara una secuencia de historias previas que genere anticipación antes de presentar tu membresía o producto.',
    },
    {
      when: freqHistorias === 'often',
      text:
        'Ya tienes el hábito de vender por historias — eso es una ventaja real. El siguiente paso es ordenar ese proceso en una secuencia fija: primero educa, luego muestra resultados, luego presenta tu oferta. Documenta qué funciona para replicarlo sin depender de la inspiración del momento.',
    },
    {
      when: inversionAds <= 0 && potencialDescubrimiento >= 60,
      text:
        'Tu contenido orgánico está atrayendo personas nuevas sin necesidad de publicidad pagada. Ese es el momento ideal para afinar tu oferta y tu proceso de venta. Cuando eso esté funcionando bien, la pauta va a amplificar resultados reales en lugar de gastos sin retorno.',
    },
    {
      when: inversionAds <= 0 && potencialDescubrimiento < 60,
      text:
        'Una inversión pequeña y bien dirigida en publicidad puede ayudarte a llegar a más personas sin depender únicamente de tu contenido orgánico. No necesitas un gran presupuesto — necesitas el mensaje correcto para la persona correcta.',
    },
    {
      when: inversionAds > 0 && potencialDescubrimiento < 50,
      text:
        'Estás invirtiendo en publicidad pero no estás llegando a suficientes personas nuevas. El problema casi nunca es el presupuesto — es el mensaje o el público al que le estás mostrando el anuncio. Hay que revisar ambos antes de aumentar la inversión.',
    },
    {
      when: engagement < 0.02,
      text:
        'Tus reels tienen alcance pero poca gente interactúa con ellos. Prueba empezar con una apertura más directa, reduce el texto en pantalla y enfócate en una sola idea por video. La simplicidad convierte mejor que el contenido sobrecargado.',
    },
    {
      when: engagement >= 0.06,
      text:
        'Tu audiencia interactúa bien con tu contenido — eso es una señal muy positiva. Ahora hay que convertir ese interés en ventas concretas. Asegúrate de tener un link claro en tu bio, usa stickers de enlace en historias y ten un mensaje listo para responder a quienes te escriban con intención de compra.',
    },
    {
      when: publicacionesSem <= 2,
      text:
        'Publicar poco le da al algoritmo pocas señales para distribuir tu contenido. Define un mínimo semanal que puedas mantener — 3 piezas es un buen punto de partida — y cuando encuentres un formato que funcione, repítelo con variaciones en lugar de inventar algo nuevo cada vez.',
    },
    {
      when: publicacionesSem >= 9,
      text:
        'Estás publicando bastante, lo cual es positivo. Para que ese esfuerzo se traduzca en ventas, separa tu contenido en dos tipos — el que construye tu marca y el que vende directamente. Protege días específicos de la semana exclusivamente para presentar tu membresía o producto.',
    },
    {
      when: precioMembresia > 0 && precioMembresia < 20,
      text:
        'Tu precio actual es bajo, lo que significa que necesitas muchos clientes para generar ingresos significativos. Trabaja en subir el valor por cliente — un plan anual con descuento, un servicio adicional o un producto complementario pueden aumentar tus ingresos sin necesitar más compradores nuevos.',
    },
    {
      when: precioMembresia >= 79,
      text:
        'Con un precio alto, el cliente necesita confiar mucho antes de comprar. Asegúrate de tener testimonios reales y visibles, una garantía clara y una bienvenida post-compra que haga sentir al cliente que tomó la mejor decisión desde el primer momento.',
    },
    {
      when: riesgoRetencion >= 70 && riesgoRetencion < 80,
      text:
        'Hay señales de que tus clientes podrían no renovar o quedarse. Para evitarlo, mantén presencia constante en historias y comunícate regularmente con quienes ya compraron — recuérdales el valor que están recibiendo para que la membresía o producto se sienta como algo indispensable y no como una compra ocasional.',
    },
  ];

  const insights = [];
  const seen = new Set();
  for (const rule of insightRules) {
    if (insights.length >= 4) break;
    if (!rule.when) continue;
    const text = rule.text;
    if (!text || seen.has(text)) continue;
    seen.add(text);
    insights.push(text);
  }

  if (insights.length < 2) {
    const fallbackA =
      'Tu precio y tu proyección de ingresos muestran que hay un camino real aquí. El siguiente paso es ordenar cómo presentas tu oferta y cómo llevas a las personas desde que te descubren hasta que compran.';
    const fallbackB =
      'Tus números indican que antes de sumar más canales o estrategias, lo que más va a mover tus ingresos es ordenar lo básico — una sola oferta clara, una página donde se pueda comprar y un ritual semanal de historias dedicado a vender.';
    const pick = insightSeed % 2 === 0 ? fallbackA : fallbackB;
    if (!seen.has(pick)) {
      seen.add(pick);
      insights.push(pick);
    } else if (!seen.has(fallbackA)) {
      insights.push(fallbackA);
    } else {
      insights.push(fallbackB);
    }
  }

  let siguientePaso;
  if (mrr_mes1 < 150) {
    siguientePaso =
      'Trata esto como una alerta urgente. Antes de invertir más tiempo o dinero en crecer, valida que tu oferta conecta, que el proceso de pago funciona sin fricción y que tu mensaje es claro para quien llega por primera vez. Sin eso, escalar solo amplifica el problema.';
  } else if (inversionAds >= 300 && mrr_mes1 < 500) {
    siguientePaso =
      'Considera pausar o reducir la pauta por ahora. Primero construye una oferta clara, una página donde se pueda comprar y una secuencia de historias que ya haya demostrado generar ventas. Hoy estás pagando por tráfico que no tiene a dónde ir.';
  } else if (mrr_mes1 < 500) {
    siguientePaso = storyRare
      ? 'El primer paso es crear un ritual semanal de historias donde presentes tu membresía o producto con claridad y consistencia. Al mismo tiempo, construye una página simple con una sola promesa. No escales la publicidad hasta que ese proceso esté generando ventas de forma estable.'
      : 'Antes de invertir en publicidad, deja muy claro qué ofreces y para quién. Luego construye un camino simple: historias que generen interés → una página que explique la oferta → un proceso de pago sin fricción. Cuando eso funcione, la pauta va a multiplicar resultados reales.';
  } else if (mrr_mes1 < 2500) {
    siguientePaso =
      inversionAds <= 0
        ? 'Ya tienes una base real para crecer. El siguiente paso es sistematizar tu contenido para que no dependa de tu estado de ánimo del día, y automatizar el seguimiento de personas interesadas. Cuando el orgánico esté convirtiendo de forma estable, usa tus mejores historias y reels como base para tus anuncios pagados.'
        : 'Tienes base para crecer con publicidad. Pero necesitas un sistema simple para medir qué está funcionando — desde el anuncio hasta la compra. Cambia las creatividades con frecuencia para no quemarte, pero no toques el proceso de venta cada semana. La estabilidad del embudo es lo que permite leer bien los datos.';
  } else {
    siguientePaso =
      potencialDescubrimiento >= 60
        ? 'Tu potencial de ingresos es alto. Para llegar a ese techo necesitas un sistema completo — publicidad bien dirigida, automatizaciones que atiendan a los interesados y un proceso de venta que se mantenga estable aunque el volumen crezca. El foco ahora es escalar sin perder la conversión que ya tienes.'
        : 'Tu potencial de ingresos es alto, pero todavía no estás llegando a suficientes personas nuevas. Antes de aumentar el presupuesto en publicidad, trabaja en cómo comunicas tu oferta y en qué tipo de contenido atrae a personas que no te conocen. Eso primero — la pauta después.';
  }

  const lecturaHonesta = buildFluxaDiagnostico({
    mrr_mes1,
    inversionAds,
    potencialDescubrimiento,
    storyRare,
    riesgoRetencion,
  });

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
    lecturaHonesta,
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

const STEP_NUMERIC_FIELD_IDS = {
  0: ['seguidores', 'vistasHistoria'],
  1: ['vistasReel', 'likesPub'],
  2: ['precioMembresia'],
  3: ['inversionAds', 'publicacionesSem'],
};

function FieldAlertInline() {
  return (
    <div className="dg-field-alert" role="alert">
      <span className="dg-field-alert__icon" aria-hidden>
        ⚠
      </span>
      <span className="dg-field-alert__text">
        Por favor completa este campo antes de continuar. Si no tienes el dato exacto puedes dejarlo en 0.
      </span>
    </div>
  );
}

function DgFormNumericRow({
  fieldId,
  value,
  onChange,
  min,
  max,
  variant = 'plain',
  registerFieldValidator,
  showAlert,
  onDismissAlert,
  ariaLabel,
}) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    return registerFieldValidator(fieldId, () => focused && draft === '');
  }, [fieldId, registerFieldValidator, focused, draft]);

  const committed = Math.round(Number(value)) || 0;
  const displayStr = !focused
    ? formatNum(committed)
    : draft !== null && draft !== undefined
      ? draft
      : formatNum(committed);

  const parseDigitsToInt = (s) => {
    const d = String(s).replace(/\D/g, '');
    if (!d) return NaN;
    const n = parseInt(d, 10);
    return Number.isFinite(n) ? n : NaN;
  };

  const handleFocus = () => {
    setFocused(true);
    setDraft(formatNum(committed));
    onDismissAlert?.();
  };

  const handleBlur = () => {
    let next = 0;
    if (draft === '' || draft === null || draft === undefined) {
      next = 0;
    } else {
      const n = parseDigitsToInt(draft);
      next = Number.isNaN(n) ? 0 : clamp(n, min, max);
    }
    onChange(next);
    setFocused(false);
    setDraft(null);
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '');
    onDismissAlert?.();
    if (!digits) {
      setDraft('');
      onChange(0);
      return;
    }
    let n = parseInt(digits, 10);
    if (!Number.isFinite(n)) return;
    n = clamp(n, min, max);
    setDraft(formatNum(n));
    onChange(n);
  };

  const bump = (delta) => {
    const next = clamp(committed + delta, min, max);
    onChange(next);
    onDismissAlert?.();
    if (focused) setDraft(formatNum(next));
  };

  return (
    <div className="dg-num-block">
      <div className="dg-num-row">
        <button
          type="button"
          className="dg-num-btn"
          onClick={() => bump(-1)}
          aria-label={`Disminuir ${ariaLabel}`}
        >
          −
        </button>
        <div
          className={
            'dg-num-field' +
            (variant === 'money' ? ' dg-num-field--money' : '') +
            (variant === 'seguidores' ? ' dg-num-field--seguidores' : '')
          }
        >
          {variant === 'money' && (
            <span className="dg-num-prefix" aria-hidden>
              $
            </span>
          )}
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            className="dg-num-input"
            value={displayStr}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            aria-label={ariaLabel}
          />
          {variant === 'seguidores' && (
            <span className="dg-num-suffix" aria-hidden>
              seg.
            </span>
          )}
        </div>
        <button
          type="button"
          className="dg-num-btn"
          onClick={() => bump(1)}
          aria-label={`Aumentar ${ariaLabel}`}
        >
          +
        </button>
      </div>
      {showAlert ? <FieldAlertInline /> : null}
    </div>
  );
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

  const [seguidores, setSeguidores] = useState(0);
  const [vistasHistoria, setVistasHistoria] = useState(0);
  const [vistasReel, setVistasReel] = useState(0);
  const [likesPub, setLikesPub] = useState(0);
  const [precioMembresia, setPrecioMembresia] = useState(0);
  const [inversionAds, setInversionAds] = useState(0);
  const [storyFreq, setStoryFreq] = useState(null);
  const [publicacionesSem, setPublicacionesSem] = useState(0);

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
  const [tableHintVisible, setTableHintVisible] = useState(true);
  const [diagPhase, setDiagPhase] = useState(0);
  const [diagWidths, setDiagWidths] = useState([0, 0, 0, 0]);
  const [diagNums, setDiagNums] = useState([0, 0, 0, 0]);
  const [diagBounce, setDiagBounce] = useState([false, false, false, false]);
  const [insightItemsIn, setInsightItemsIn] = useState(0);
  const [insightsCardIn, setInsightsCardIn] = useState(false);
  const [nextCardIn, setNextCardIn] = useState(false);
  const [ctaIn, setCtaIn] = useState(false);

  const fieldValidatorsRef = useRef({});
  const [fieldAlert, setFieldAlert] = useState(null);

  const registerFieldValidator = useCallback((id, getBlocking) => {
    fieldValidatorsRef.current[id] = getBlocking;
    return () => {
      delete fieldValidatorsRef.current[id];
    };
  }, []);

  const clearFieldAlert = useCallback(() => setFieldAlert(null), []);

  useEffect(() => {
    setFieldAlert(null);
  }, [step]);

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
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead');
    }
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

  const tryAdvanceNext = useCallback(() => {
    const ids = STEP_NUMERIC_FIELD_IDS[step] || [];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      if (fieldValidatorsRef.current[id]?.()) {
        setFieldAlert(id);
        return;
      }
    }
    setFieldAlert(null);
    goStep(step + 1);
  }, [step, goStep]);

  const trySubmitProjection = useCallback(() => {
    const ids = STEP_NUMERIC_FIELD_IDS[3] || [];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      if (fieldValidatorsRef.current[id]?.()) {
        setFieldAlert(id);
        return;
      }
    }
    setFieldAlert(null);
    if (!storyFreq) return;
    showResult();
  }, [storyFreq, showResult]);

  const openCalendly = useCallback(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Schedule');
    }
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/fluxasystems1/30min',
      });
    }
  }, []);

  const resetAll = useCallback(() => {
    setPhase('form');
    setStep(0);
    setSeguidores(0);
    setVistasHistoria(0);
    setVistasReel(0);
    setLikesPub(0);
    setPrecioMembresia(0);
    setInversionAds(0);
    setStoryFreq(null);
    setPublicacionesSem(0);
    setFrozenResult(null);
    setPanelClass('dg-step-panel--visible');
    setLoadingExit(false);
    setResultReveal(false);
    setHeroIn(false);
    setFieldAlert(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const pct = (v, min, max) => {
    if (max <= min) return '0%';
    const x = clamp(Number(v) || 0, min, max);
    return `${((x - min) / (max - min)) * 100}%`;
  };

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
        </header>
        {phase === 'intro' && (
          <p className="dg-badge">
            <span aria-hidden>{'\u2726'} </span>
            Diagnóstico Digital Gratuito
          </p>
        )}

        {phase === 'intro' && (
          <div className="dg-intro">
            <h1 className="dg-intro-title dg-intro-reveal dg-intro-reveal--2">
              Descubre cuánto podría generar tu negocio si instalas
              un sistema digital que{' '}
              <span className="dg-intro-accent">trabaje 24/7 para ti.</span>
            </h1>
            <p className="dg-intro-summary dg-intro-reveal dg-intro-reveal--3">
              Gratis · Sin registro · Resultado en ~2 minutos
            </p>
            <p className="dg-intro-sub dg-intro-reveal dg-intro-reveal--4">
              Ingresa tus métricas, el precio estimado de tu producto o servicio + tu inversión en ads para ver una
              proyección de crecimiento en 3 escenarios.
            </p>
            <p className="dg-intro-audience dg-intro-reveal dg-intro-reveal--5">
              Pensado si vendes membresía, suscripción o producto recurrente y quieres ordenar números
              antes de invertir en pauta o sistemas.
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
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(seguidores, 0, 500000) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={0}
                        max={500000}
                        step={1}
                        value={seguidores}
                        onInput={(e) => {
                          clearFieldAlert();
                          setSeguidores(Number(e.currentTarget.value));
                        }}
                        onChange={(e) => setSeguidores(Number(e.target.value))}
                      />
                    </div>
                    <p className="dg-slider-hint">
                      La mayoría de creadores tiene entre 1.000 y 100.000 seguidores
                    </p>
                    <DgFormNumericRow
                      fieldId="seguidores"
                      value={seguidores}
                      onChange={setSeguidores}
                      min={0}
                      max={500000}
                      variant="seguidores"
                      registerFieldValidator={registerFieldValidator}
                      showAlert={fieldAlert === 'seguidores'}
                      onDismissAlert={clearFieldAlert}
                      ariaLabel="Número de seguidores"
                    />
                  </div>
                  <div>
                    <p className="dg-q">Vistas promedio por historia</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(vistasHistoria, 0, 100000) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={0}
                        max={100000}
                        step={1}
                        value={vistasHistoria}
                        onInput={(e) => {
                          clearFieldAlert();
                          setVistasHistoria(Number(e.currentTarget.value));
                        }}
                        onChange={(e) => setVistasHistoria(Number(e.target.value))}
                      />
                    </div>
                    <p className="dg-slider-hint">Promedio normal: 5% a 15% de tus seguidores</p>
                    <DgFormNumericRow
                      fieldId="vistasHistoria"
                      value={vistasHistoria}
                      onChange={setVistasHistoria}
                      min={0}
                      max={100000}
                      variant="plain"
                      registerFieldValidator={registerFieldValidator}
                      showAlert={fieldAlert === 'vistasHistoria'}
                      onDismissAlert={clearFieldAlert}
                      ariaLabel="Vistas promedio por historia"
                    />
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
                    <p className="dg-step-sub">Impacto de tu contenido</p>
                  </div>
                  <div>
                    <p className="dg-q">Vistas promedio por reel</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(vistasReel, 0, 500000) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={0}
                        max={500000}
                        step={1}
                        value={vistasReel}
                        onInput={(e) => {
                          clearFieldAlert();
                          setVistasReel(Number(e.currentTarget.value));
                        }}
                        onChange={(e) => setVistasReel(Number(e.target.value))}
                      />
                    </div>
                    <p className="dg-slider-hint">Un reel promedio tiene entre 500 y 50.000 vistas</p>
                    <DgFormNumericRow
                      fieldId="vistasReel"
                      value={vistasReel}
                      onChange={setVistasReel}
                      min={0}
                      max={500000}
                      variant="plain"
                      registerFieldValidator={registerFieldValidator}
                      showAlert={fieldAlert === 'vistasReel'}
                      onDismissAlert={clearFieldAlert}
                      ariaLabel="Vistas promedio por reel"
                    />
                  </div>
                  <div>
                    <p className="dg-q">Likes promedio por publicación</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(likesPub, 0, 50000) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={0}
                        max={50000}
                        step={1}
                        value={likesPub}
                        onInput={(e) => {
                          clearFieldAlert();
                          setLikesPub(Number(e.currentTarget.value));
                        }}
                        onChange={(e) => setLikesPub(Number(e.target.value))}
                      />
                    </div>
                    <p className="dg-slider-hint">Engagement normal: 1% a 3% de tus vistas</p>
                    <DgFormNumericRow
                      fieldId="likesPub"
                      value={likesPub}
                      onChange={setLikesPub}
                      min={0}
                      max={50000}
                      variant="plain"
                      registerFieldValidator={registerFieldValidator}
                      showAlert={fieldAlert === 'likesPub'}
                      onDismissAlert={clearFieldAlert}
                      ariaLabel="Likes promedio por publicación"
                    />
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
                    <p className="dg-q">Precio promedio de tu producto o servicio</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(precioMembresia, 0, 500) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={0}
                        max={500}
                        step={1}
                        value={precioMembresia}
                        onInput={(e) => {
                          clearFieldAlert();
                          setPrecioMembresia(Number(e.currentTarget.value));
                        }}
                        onChange={(e) => setPrecioMembresia(Number(e.target.value))}
                      />
                    </div>
                    <p className="dg-slider-hint">Precio en USD — Ej: $29, $97, $197</p>
                    <DgFormNumericRow
                      fieldId="precioMembresia"
                      value={precioMembresia}
                      onChange={setPrecioMembresia}
                      min={0}
                      max={500}
                      variant="money"
                      registerFieldValidator={registerFieldValidator}
                      showAlert={fieldAlert === 'precioMembresia'}
                      onDismissAlert={clearFieldAlert}
                      ariaLabel="Precio promedio de tu producto o servicio en USD"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="dg-step-inner">
                  <div className="dg-step-head">
                    <span className="dg-step-icon" aria-hidden>
                      {'\u{1F4E2}'}
                    </span>
                    <h2 className="dg-step-title">Ads y orgánico</h2>
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
                        step={1}
                        value={inversionAds}
                        onInput={(e) => {
                          clearFieldAlert();
                          setInversionAds(Number(e.currentTarget.value));
                        }}
                        onChange={(e) => setInversionAds(Number(e.target.value))}
                      />
                    </div>
                    <p className="dg-slider-hint">Puedes empezar desde $50 USD/mes</p>
                    <DgFormNumericRow
                      fieldId="inversionAds"
                      value={inversionAds}
                      onChange={setInversionAds}
                      min={0}
                      max={10000}
                      variant="money"
                      registerFieldValidator={registerFieldValidator}
                      showAlert={fieldAlert === 'inversionAds'}
                      onDismissAlert={clearFieldAlert}
                      ariaLabel="Inversión mensual en ads USD"
                    />
                  </div>
                  <div>
                    <p className="dg-q">¿Con qué frecuencia vendes por historias?</p>
                    <div className="dg-grid">
                      {STORY_FREQ.map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={'dg-opt' + (storyFreq === o.id ? ' dg-opt--selected' : '')}
                          onClick={() => {
                            clearFieldAlert();
                            setStoryFreq((p) => (p === o.id ? null : o.id));
                          }}
                        >
                          <span className="dg-opt-label">{o.label}</span>
                          {storyFreq === o.id ? <span className="dg-opt-check dg-opt-check--trailing">{'\u2713'}</span> : null}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="dg-q">Publicaciones por semana</p>
                    <div className="dg-slider-track-wrap" style={{ '--pct': pct(publicacionesSem, 0, 14) }}>
                      <input
                        type="range"
                        className="dg-range"
                        min={0}
                        max={14}
                        step={1}
                        value={publicacionesSem}
                        onInput={(e) => {
                          clearFieldAlert();
                          setPublicacionesSem(Number(e.currentTarget.value));
                        }}
                        onChange={(e) => setPublicacionesSem(Number(e.target.value))}
                      />
                    </div>
                    <p className="dg-slider-hint">Lo ideal es entre 3 y 7 publicaciones</p>
                    <DgFormNumericRow
                      fieldId="publicacionesSem"
                      value={publicacionesSem}
                      onChange={setPublicacionesSem}
                      min={0}
                      max={14}
                      variant="plain"
                      registerFieldValidator={registerFieldValidator}
                      showAlert={fieldAlert === 'publicacionesSem'}
                      onDismissAlert={clearFieldAlert}
                      ariaLabel="Publicaciones por semana"
                    />
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
                  <button type="button" className="dg-btn dg-btn--primary" onClick={tryAdvanceNext}>
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="button"
                    className="dg-btn dg-btn--primary dg-btn--projection"
                    disabled={!stepValid}
                    onClick={trySubmitProjection}
                  >
                    Ver mi proyección →
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

                  <div className={'dg-table-hint' + (!tableHintVisible ? ' dg-table-hint--hidden' : '')}>
                    <span className="dg-table-hint__arrow">←</span>
                    <span>Desliza para ver más</span>
                    <span className="dg-table-hint__arrow">→</span>
                  </div>

                  <div className="dg-table-wrap" onScroll={() => setTableHintVisible(false)}>
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
                  <h3 className="dg-block-title">Analisis Personalizado</h3>
                  <ul className="dg-insights">
                    {res.insights.map((t, i) => (
                      <li key={t} className={i < insightItemsIn ? 'dg-insight-li--in' : ''}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={'dg-card dg-next-card' + (nextCardIn ? ' dg-next-card--in' : '')} ref={nextBlockRef}>
                  <h3 className="dg-block-title">Diagnostico Personalizado</h3>
                  <p className="dg-fluxa-kicker">Qué dicen tus números</p>
                  <p className="dg-fluxa-honest">{res.lecturaHonesta}</p>
                  <div className="dg-next-rule" aria-hidden />
                  <p className="dg-fluxa-kicker">Tu siguiente paso recomendado</p>
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
                    onClick={openCalendly}
                    aria-label="Agendar videollamada gratuita en Calendly"
                  >
                    Agendar videollamada gratuita →
                  </button>
                  <a
                    href="/"
                    className="dg-btn dg-btn--ghost dg-btn--block"
                    style={{ marginTop: '10px' }}
                    aria-label="Volver a la página principal"
                  >
                    Soluciones Fluxa →
                  </a>
                  <button type="button" className="dg-link-muted" onClick={resetAll}>
                    Calcular de nuevo con otras métricas
                  </button>
                </div>
                {phase === 'result' && ctaIn && (
                  <a
                    href={WA_HREF}
                    className="dg-wa-float"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir WhatsApp de Fluxa Method"
                  >
                    <svg viewBox="0 0 16 16" className="dg-wa-float-icon" aria-hidden="true">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 8.062 0C3.87 0 .467 3.403.467 7.595c0 1.335.347 2.638 1.007 3.79L0 16l4.777-1.506a7.568 7.568 0 0 0 3.284.746h.003c4.191 0 7.595-3.403 7.595-7.595 0-2.03-.79-3.94-2.058-5.319zm-5.54 11.57h-.002a6.26 6.26 0 0 1-3.186-.87l-.228-.135-2.834.894.907-2.764-.148-.238a6.258 6.258 0 0 1-.967-3.345c0-3.454 2.807-6.261 6.262-6.261 1.67 0 3.235.65 4.415 1.831a6.2 6.2 0 0 1 1.833 4.414c-.002 3.454-2.81 6.261-6.265 6.261zm3.442-4.69c-.188-.094-1.11-.547-1.282-.61-.172-.063-.297-.094-.422.094-.125.188-.484.61-.594.735-.109.125-.219.141-.406.047-.188-.094-.793-.292-1.51-.932-.558-.497-.935-1.11-1.045-1.297-.109-.188-.012-.29.082-.383.084-.083.188-.219.281-.328.094-.109.125-.188.188-.313.063-.125.031-.234-.016-.328-.047-.094-.422-1.016-.578-1.39-.152-.365-.306-.315-.422-.321-.109-.005-.234-.007-.359-.007a.696.696 0 0 0-.5.234c-.172.188-.656.64-.656 1.56 0 .922.672 1.813.766 1.938.094.125 1.323 2.02 3.205 2.832.447.193.795.308 1.066.394.448.143.855.123 1.177.075.359-.054 1.11-.453 1.266-.89.156-.438.156-.813.109-.89-.047-.078-.172-.125-.359-.219z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
