/** Datos centralizados — landing /trading */

import { tradingWaHref, TRADING_WA_DISPLAY } from '@/lib/trading/whatsapp';

export const TRADING_WA = {
  href: tradingWaHref('default'),
  display: TRADING_WA_DISPLAY,
  growth: tradingWaHref('growth'),
  domination: tradingWaHref('domination'),
  custom: tradingWaHref('custom'),
};

export const NAV_LINKS = [
  { href: '#solucion', label: 'Cómo funciona' },
  { href: '#paquetes', label: 'Paquetes' },
  { href: '#faq', label: 'FAQ' },
];

export const HERO = {
  eyebrow: 'Sistema para traders · LATAM',
  trustLine: 'Diagnóstico estratégico · Sin compromiso · Respuesta por WhatsApp',
  featureCards: [
    { icon: '🌐', label: 'Landing Pages' },
    { icon: '🎬', label: 'VSL' },
    { icon: '💬', label: 'WhatsApp' },
    { icon: '📣', label: 'Meta Ads' },
    { icon: '🎓', label: 'Skool' },
    { icon: '📊', label: 'Dashboards' },
  ],
  headlineLines: [
    [
      { text: 'Escala tu comunidad de trading ', style: 'white' },
      { text: 'con un sistema', style: 'purple' },
    ],
    [
      { text: 'diseñado para ', style: 'white' },
      { text: 'atraer, convertir y automatizar', style: 'purple' },
      { text: ' clientes.', style: 'white' },
    ],
  ],
  lead:
    'Deja de depender solo de publicaciones y mensajes manuales. Construimos la infraestructura que transforma tu audiencia en una máquina de generación de clientes.',
  ctaPrimary: 'Agendar Diagnóstico Estratégico',
  ctaSecondary: 'Ver cómo funciona',
  ctaSecondaryHref: TRADING_WA.href,
  systemBullets: [
    'Landing Pages de Conversión',
    'VSL Estratégicas',
    'Automatización WhatsApp',
    'Gestión de Meta Ads',
    'Academias Skool',
    'Dashboards y Tecnología para Traders',
  ],
};

export const PROBLEMA = {
  label: 'El problema',
  titleBefore: 'La mayoría de traders tienen audiencia, pero',
  titleAccent: 'no tienen un sistema.',
  intro: [
    'Publican contenido.',
    'Muestran resultados.',
    'Comparten análisis.',
    'Generan seguidores.',
  ],
  pivot:
    'Pero cuando alguien quiere comprar, todo depende de responder mensajes manualmente.',
  painsTag: 'Síntomas comunes',
  subtitle: 'Muchos traders tienen:',
  pains: [
    'Sin seguimiento a prospectos',
    'DMs perdidos en WhatsApp',
    'Contenido sin estrategia',
    'Publicidad sin medición',
    'Procesos manuales todo el día',
    'Dependencia de estar conectado',
  ],
  close: 'El resultado es un crecimiento lento e impredecible.',
};

export const SOLUCION = {
  label: 'La solución',
  titleBefore: 'Construimos el ecosistema completo de',
  titleAccent: 'crecimiento para traders.',
  subtitle:
    'Mientras tú te enfocas en operar y generar resultados, nosotros construimos el sistema que atrae, filtra y convierte prospectos.',
  includesTitle: 'Qué incluye el sistema',
  phases: [
    {
      id: 'captacion',
      step: '01',
      icon: '🎯',
      label: 'Captación',
      pills: ['Meta Ads', 'Landing', 'VSL', 'Lead Magnets'],
      items: ['Meta Ads', 'Landing Pages', 'VSLs', 'Lead Magnets'],
    },
    {
      id: 'conversion',
      step: '02',
      icon: '🔄',
      label: 'Conversión',
      pills: ['WhatsApp', 'Calificación', 'Seguimiento', 'Agenda'],
      items: [
        'Automatizaciones WhatsApp',
        'Calificación de prospectos',
        'Seguimiento automático',
        'Agendamiento de llamadas',
      ],
    },
    {
      id: 'escalamiento',
      step: '03',
      icon: '📈',
      label: 'Escalamiento',
      pills: ['Skool', 'Dashboards', 'Automatización', 'Tech a medida'],
      items: [
        'Academias Skool',
        'Dashboards comerciales',
        'Automatizaciones avanzadas',
        'Sistemas tecnológicos personalizados',
      ],
    },
  ],
};

export const IDEAL_PARA_TI = {
  label: '¿Es para ti?',
  title: 'Trabajamos con traders que ya tienen oferta y quieren escalar con sistema',
  yesTitle: 'Ideal si…',
  yes: [
    'Tienes mentoría, señales, academia o copytrading',
    'Ya tienes audiencia pero vendes de forma manual',
    'Quieres automatizar WhatsApp y captación constante',
    'Buscas un sistema medible, no solo publicar contenido',
  ],
  noTitle: 'No es para ti si…',
  no: [
    'Aún no tienes oferta clara',
    'Buscas resultados sin invertir en infraestructura',
    'Quieres señales gratis o “hacerse rico rápido”',
  ],
  businessCards: [
    { icon: '🎓', label: 'Mentorías' },
    { icon: '📡', label: 'Señales' },
    { icon: '🏫', label: 'Academias' },
    { icon: '📈', label: 'Copytrading' },
    { icon: '👥', label: 'Comunidades' },
  ],
};

export const COMPARACION = {
  label: 'Comparación',
  titleBefore: 'Trader tradicional vs',
  titleAccent: 'Trader con sistema',
  rows: [
    { topic: 'Operación diaria', before: 'Depende de publicaciones diarias', after: 'Sistema funcionando 24/7' },
    { topic: 'Mensajes', before: 'Responde mensajes manualmente', after: 'Automatizaciones inteligentes' },
    { topic: 'Prospectos', before: 'Pierde prospectos', after: 'Seguimiento automático' },
    { topic: 'Métricas', before: 'No mide resultados', after: 'Dashboard comercial' },
    { topic: 'Tráfico', before: 'Depende del algoritmo', after: 'Genera tráfico constantemente' },
    { topic: 'Ventas', before: 'Vende cuando está conectado', after: 'Sistema activo todo el tiempo' },
    { topic: 'Crecimiento', before: 'Crecimiento impredecible', after: 'Escalamiento estructurado' },
  ],
};

export const SOCIAL_PROOF = {
  label: 'Resultados',
  title: 'Traders que ya instalaron su sistema',
  items: [
    {
      quote:
        'Pasé de responder DMs todo el día a tener un embudo que agenda llamadas mientras opero.',
      author: 'Mentor de trading · LATAM',
    },
    {
      quote: 'En 3 semanas teníamos landing, VSL y WhatsApp automatizado. Las leads llegaron solas.',
      author: 'Comunidad de señales',
    },
    {
      quote: 'El dashboard nos permitió ver qué campaña convierte y duplicar presupuesto con datos.',
      author: 'Academia Skool',
    },
  ],
  stats: [
    { icon: '📅', value: '15–30', label: 'días de implementación' },
    { icon: '🕐', value: '24/7', label: 'sistema activo' },
    { icon: '🎯', value: '100%', label: 'enfoque en traders' },
  ],
};

export const PAQUETES = {
  label: 'Paquetes',
  title: 'Elige tu plan de implementación',
  plans: [
    {
      id: 'growth',
      name: 'Growth Trader',
      price: 897,
      currency: 'USD',
      badge: 'Ideal para empezar',
      tagline: 'Instalamos tu sistema de captación y conversión.',
      ideal:
        'Ideal para traders que quieren atraer prospectos de forma constante y automatizar su proceso comercial.',
      includes: [
        'Landing de Conversión',
        'VSL Estratégica',
        'Automatización WhatsApp',
        'Configuración Meta Ads',
        'Gestión de Campañas',
        '15 Guiones Estratégicos',
        'Dashboard Básico',
      ],
      result:
        'Un sistema funcional para atraer leads, automatizar conversaciones y aumentar conversiones.',
      cta: 'Aplicar al Plan Growth',
      waVariant: 'growth',
    },
    {
      id: 'domination',
      name: 'Trader Domination',
      price: 1597,
      currency: 'USD',
      featured: true,
      badge: 'Recomendado',
      tagline: 'Construimos una empresa digital lista para escalar.',
      ideal:
        'Ideal para traders que buscan consolidar una comunidad, academia o negocio de inversión.',
      includesLabel: 'Incluye todo lo del plan Growth +',
      includes: [
        'Academia Skool Completa',
        'Landing Principal',
        'Landing Webinar',
        'Landing Mentoría',
        'Landing Copytrading',
        'Email Marketing',
        'Recuperación de Leads',
        'Automatizaciones Avanzadas',
        'Dashboard Comercial',
        '30 Guiones Estratégicos',
        'Plan Estratégico de Crecimiento',
      ],
      result:
        'Una infraestructura completa para captar, convertir y escalar clientes de forma profesional.',
      cta: 'Aplicar al Plan Domination',
      waVariant: 'domination',
    },
  ],
};

export const TECNOLOGIA = {
  label: 'Más tecnología',
  titleBefore: 'Más tecnología para',
  titleAccent: 'traders',
  subtitle:
    'Construimos herramientas personalizadas para automatizar y escalar tu operación.',
  description:
    'Además del marketing, desarrollamos soluciones tecnológicas adaptadas a traders, academias y comunidades de inversión.',
  groups: [
    {
      title: 'Trading & mercado',
      icon: '📈',
      pills: [
        {
          name: 'Bot de señales',
          desc: 'Envía operaciones al instante por Telegram o WhatsApp cuando publicas una señal.',
        },
        {
          name: 'Bots de trading',
          desc: 'Alertas y ejecución según tu método, sin depender de estar frente a la pantalla.',
        },
        {
          name: 'Scanners de mercado',
          desc: 'Filtra activos y setups que coinciden con tu estrategia en tiempo real.',
        },
        {
          name: 'Dashboard en vivo',
          desc: 'Muestra performance, métricas y resultados a tus clientes desde un panel propio.',
        },
        {
          name: 'Journal de trading',
          desc: 'Registro de operaciones y métricas de disciplina para tus alumnos o comunidad.',
        },
        {
          name: 'Calculadoras de riesgo',
          desc: 'Herramientas de lotaje, ROI y gestión de capital como lead magnet o recurso premium.',
        },
        {
          name: 'Alertas multi-activo',
          desc: 'Avisos personalizados en forex, crypto, índices o los mercados que operes.',
        },
      ],
    },
    {
      title: 'Automatización & canales',
      icon: '⚡',
      pills: [
        {
          name: 'Bot WhatsApp',
          desc: 'Responde, califica y hace seguimiento a leads sin mensajes manuales todo el día.',
        },
        {
          name: 'Bot Instagram',
          desc: 'Automatiza DMs y comentarios desde tu perfil para no perder prospectos en redes.',
        },
        {
          name: 'Combo WA + IG',
          desc: 'Un solo flujo que captura, nutre y convierte desde los dos canales donde más vendes.',
        },
        {
          name: 'Telegram & Discord',
          desc: 'Acceso a comunidad, avisos, nutrición y onboarding automatizado en tu grupo.',
        },
        {
          name: 'Embudos de nutrición',
          desc: 'Secuencias que educan y calientan prospectos antes de la llamada o la venta.',
        },
        {
          name: 'Agendamiento',
          desc: 'Citas y diagnósticos reservados sin fricción, con avisos automáticos al prospecto.',
        },
      ],
    },
    {
      title: 'Comunidad & ventas',
      icon: '🏛️',
      pills: [
        {
          name: 'CRM para traders',
          desc: 'Pipeline, clientes, ventas y seguimiento comercial en un panel hecho para tu operación.',
        },
        {
          name: 'Portal de clientes',
          desc: 'Espacio propio donde tus suscriptores acceden a señales, mentoría o copytrading.',
        },
        {
          name: 'Copytrading',
          desc: 'Infraestructura para conectar cuentas, gestionar suscriptores y escalar el servicio.',
        },
        {
          name: 'Skool y membresías',
          desc: 'Comunidad, cursos y pagos recurrentes listos para vender formación de forma profesional.',
        },
        {
          name: 'Dashboard comercial',
          desc: 'Mide campañas, conversiones y revenue para saber qué escalar con datos reales.',
        },
        {
          name: 'Biblioteca de contenido',
          desc: 'VOD con clases, lives grabados y análisis archivados para retener a tu comunidad.',
        },
        {
          name: 'Certificados y progreso',
          desc: 'Seguimiento de avance del alumno y certificación al completar tu programa.',
        },
      ],
    },
    {
      title: 'Inteligencia artificial',
      icon: '🧠',
      pills: [
        {
          name: 'Agente de ventas IA',
          desc: 'Califica y responde por WhatsApp 24/7 con contexto de tu oferta y tono de marca.',
        },
        {
          name: 'Chatbot en landing',
          desc: 'Atiende visitantes, resuelve dudas y filtra leads antes de pasarlos a ventas.',
        },
        {
          name: 'Analizador de métricas',
          desc: 'Interpreta datos de campañas y operación para detectar oportunidades de mejora.',
        },
        {
          name: 'Soporte post-venta IA',
          desc: 'Onboarding, dudas de acceso y soporte automático para clientes ya convertidos.',
        },
        {
          name: 'Moderación de comunidad',
          desc: 'Filtra spam y gestiona interacciones en Telegram, Discord o tu plataforma.',
        },
        {
          name: 'Resumen de lives',
          desc: 'Transcribe y resume tus transmisiones en clips, posts o emails automáticos.',
        },
      ],
    },
    {
      title: 'Apps & marca propia',
      icon: '📱',
      pills: [
        {
          name: 'App iOS + Android',
          desc: 'Tu marca en el bolsillo del cliente con señales, contenido y comunidad propia.',
        },
        {
          name: 'Push de señales',
          desc: 'Notificaciones instantáneas para que nadie pierda una operación ni se desconecte.',
        },
        {
          name: 'Área de miembros',
          desc: 'Cursos, recursos exclusivos y estado de suscripción dentro de tu app o portal.',
        },
        {
          name: 'App + web sincronizados',
          desc: 'Misma cuenta, mismos datos y experiencia unificada en móvil y escritorio.',
        },
      ],
    },
    {
      title: 'Pagos & suscripciones',
      icon: '💳',
      pills: [
        {
          name: 'Checkout propio',
          desc: 'Página de pago con tu marca, sin depender solo de links sueltos o terceros.',
        },
        {
          name: 'Suscripciones recurrentes',
          desc: 'Cobros mensuales o anuales automáticos para mentorías, señales o academias.',
        },
        {
          name: 'Recuperación de pagos',
          desc: 'Reintenta cobros fallidos y reduce la pérdida de clientes por tarjeta vencida.',
        },
        {
          name: 'Planes escalonados',
          desc: 'Upsells de básico a pro o VIP con acceso diferenciado por nivel de suscripción.',
        },
      ],
    },
  ],
  customTitle: '¿Necesitas algo más avanzado?',
  customText:
    'White-label completo, integraciones con brokers, APIs a medida y retainer mensual para evolucionar tu sistema sin techo.',
};

export const FAQ = {
  label: 'Preguntas frecuentes',
  title: 'Preguntas frecuentes',
  items: [
    {
      q: '¿Trabajan con traders principiantes?',
      a: 'Sí. Siempre que ya exista una oferta clara como mentoría, comunidad, señales, copytrading o formación.',
    },
    {
      q: '¿Ustedes gestionan las campañas publicitarias?',
      a: 'Sí. Configuramos y gestionamos las campañas incluidas en cada paquete.',
    },
    {
      q: '¿Tengo que grabar los videos?',
      a: 'Sí. Nosotros desarrollamos la estrategia, los guiones y la estructura. Tú grabas el contenido utilizando nuestra guía.',
    },
    {
      q: '¿Necesito tener una comunidad para comenzar?',
      a: 'No. Podemos ayudarte a construir desde cero el sistema necesario para captar y convertir prospectos.',
    },
    {
      q: '¿Qué plataforma utilizan para academias?',
      a: 'Trabajamos principalmente con Skool, aunque también podemos implementar otras plataformas según el proyecto.',
    },
    {
      q: '¿Pueden desarrollar bots o herramientas para mi comunidad?',
      a: 'Sí. Desarrollamos scanners, dashboards, bots de señales, automatizaciones y herramientas personalizadas para traders.',
    },
  ],
};

export const CTA_FINAL = {
  label: 'Siguiente paso',
  titleBefore: 'Tu crecimiento no debería depender de',
  titleAccent: 'responder mensajes todo el día.',
  subtitle:
    'Instala un sistema que atraiga prospectos, automatice conversaciones y genere oportunidades mientras tú te enfocas en operar.',
  lead: 'Agenda una sesión estratégica y descubre cuál es el mejor plan para tu negocio.',
  cta: 'Agendar Diagnóstico Estratégico',
};

export const FOOTER = {
  tagline: 'Fluxa Method — Infraestructura digital para traders.',
  links: [
    { href: 'https://fluxamethod.com/colombia', label: 'Sitio principal', external: true },
    { href: 'https://www.instagram.com/fluxamethod/', label: 'Instagram', external: true },
    { href: TRADING_WA.href, label: 'WhatsApp', external: true },
  ],
};
