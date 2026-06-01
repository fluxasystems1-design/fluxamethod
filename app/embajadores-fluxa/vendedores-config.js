/** Datos centralizados — landing /embajadores-fluxa (sin hardcode en componentes) */

export const VENDEDORES_WA = {
  href: 'https://wa.me/573116425337',
  hrefWithText:
    'https://wa.me/573116425337?text=Hola%20Fluxa%20Method.%20Vi%20la%20p%C3%A1gina%20de%20vendedores%20y%20quiero%20saber%20m%C3%A1s%20sobre%20la%20alianza.',
  display: '+57 311 642 5337',
};

export const NAV_SECTIONS = [
  { id: 'hero', label: 'Inicio', href: '#hero' },
  { id: 'empieza-aqui', label: 'Empieza aquí', href: '#empieza-aqui' },
  { id: 'como-funciona', label: 'Cómo funciona', href: '#como-funciona' },
  { id: 'catalogo', label: 'Catálogo', href: '#catalogo' },
  { id: 'paquetes', label: 'Paquetes', href: '#paquetes' },
  { id: 'paquetes-nichos', label: 'Nichos', href: '#paquetes-nichos' },
  { id: 'speech', label: 'Speech', href: '#speech' },
  { id: 'calculadora', label: 'Calculadora', href: '#calculadora' },
  { id: 'operacion', label: 'Operación', href: '#operacion' },
  { id: 'precios-resumen', label: 'Precios', href: '#precios-resumen' },
  { id: 'reglas', label: 'Reglas', href: '#reglas' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'cta-final', label: 'Contacto', href: '#cta-final' },
];

/** Contraseña en .env: VENDEDORES_ACCESS_PASSWORD — si está vacía, la página queda abierta */
export const ACCESS = {
  cookieName: 'embajadores-fluxa-auth',
  loginPath: '/embajadores-fluxa/acceso',
};

export const EMPIEZA_AQUI = {
  title: 'Empieza aquí',
  titleAccent: 'en 3 pasos',
  subtitle: 'Ruta recomendada para tu primer cierre como aliado Fluxa.',
  steps: [
    {
      step: 1,
      title: 'Entiende la alianza',
      text: 'Lee cómo funciona el flujo de dinero y tu rol. Sin esto, todo lo demás confunde.',
      href: '#como-funciona',
      cta: 'Ver cómo funciona',
    },
    {
      step: 2,
      title: 'Elige qué vender',
      text: 'Paquetes por tier o combos por nicho — elige el que encaje con el negocio de tu prospecto.',
      href: '#paquetes',
      cta: 'Ver paquetes',
    },
    {
      step: 3,
      title: 'Usa el speech y cierra',
      text: 'Copia los scripts, simula tu ganancia en la calculadora y escribe a Fluxa cuando cierres.',
      href: '#speech',
      cta: 'Ir al speech',
    },
  ],
};

export const OPERACION = {
  title: 'Después de cerrar',
  subtitle: 'Enlaces y pasos para coordinar la ejecución con Fluxa.',
  brief: {
    title: 'Brief del proyecto',
    description:
      'Al confirmar el pago, Fluxa te envía el formulario estándar de brief. Complétalo con la info del cliente antes de que arranque ejecución.',
    ctaLabel: 'Solicitar brief por WhatsApp',
    ctaHref:
      'https://wa.me/573116425337?text=Hola%20Fluxa%20Method.%20Cerr%C3%A9%20un%20proyecto%20con%20un%20cliente%20y%20necesito%20el%20brief%20para%20arrancar.',
  },
  checklistTitle: 'Checklist antes de enviar el brief',
  checklist: [
    'Cobro confirmado del cliente final',
    'Neto a Fluxa transferido en USD',
    'Logos, textos y referencias visuales del cliente',
    'Accesos: dominio, WhatsApp Business, Instagram (si aplica)',
    'Paquete o combo acordado por escrito con el cliente',
  ],
  support: {
    title: 'Soporte aliados',
    text: 'Dudas de venta, cotización o seguimiento de proyecto: escribe por WhatsApp. Fluxa no contacta a tu cliente final.',
    href: VENDEDORES_WA.hrefWithText,
    cta: 'Escribir a Fluxa',
  },
};

export const PRECIOS_RESUMEN = {
  title: 'Resumen de precios',
  subtitle: 'Tabla rápida para consulta o impresión. Netos a Fluxa en USD.',
  printLabel: 'Imprimir / guardar PDF',
  columns: ['Paquete', 'Neto Fluxa', 'Venta ref.', 'Entrega orientativa', 'Tu margen ref.'],
};

export const HERO = {
  eyebrow: 'ALIANZA FLUXA METHOD — VENDEDORES',
  titleLines: ['Tú cierras.', 'Nosotros ejecutamos.'],
  subtitle:
    'Vende servicios digitales de alto valor sin necesidad de un equipo técnico. Fluxa construye todo en segundo plano — tú te quedas el margen.',
  badge: 'Programa de aliados 2026',
  ctaPrimary: { label: 'Ver paquetes y comisiones', href: '#paquetes' },
  ctaSecondary: { label: 'Hablar con Fluxa', href: VENDEDORES_WA.href },
};

export const COMO_FUNCIONA = {
  title: '¿Cómo funciona la alianza?',
  subtitle:
    'Simple. Tú vendes, cobras primero, luego nos transfieres el neto. Nosotros ejecutamos sin que tu cliente sepa que existimos.',
  moneyFlow: [
    {
      step: 1,
      title: 'Tu cliente te paga',
      text: 'Cierras el trato y cobras el 100% en tu moneda local. El precio lo defines tú.',
    },
    {
      step: 2,
      title: 'Tú pagas el neto a Fluxa',
      text: 'Nos transfieres el neto en USD del paquete elegido. Sin ese pago no arrancamos.',
    },
    {
      step: 3,
      title: 'Fluxa ejecuta en segundo plano',
      text: 'Con el pago confirmado y el brief completo, construimos todo. Tu cliente nunca habla con nosotros.',
    },
    {
      step: 4,
      title: 'Tú entregas con tu marca',
      text: 'Recibes la entrega white-label lista para pasarle a tu cliente como si fuera tuyo.',
    },
  ],
  highlightedRule:
    'Fluxa no inicia ejecución hasta tener el neto en USD confirmado y el brief completo. Tú cobras primero — luego nos transfieres nuestro neto.',
  yourRoleTitle: 'Tu rol en cada proyecto',
  yourRoleSteps: [
    'Completas el brief Fluxa (formulario estándar que te enviamos al confirmar).',
    'Nos pasas accesos del cliente: dominio, WhatsApp Business, Instagram, logos y textos.',
    'Fluxa construye y te manda links de revisión — tú se los compartes a tu cliente.',
    'Coordinas las 2 rondas de revisión incluidas. Cambios fuera de alcance se cotizan aparte.',
    'Recibes la entrega final white-label (sin marca Fluxa visible) lista para cerrar con tu cliente.',
  ],
};

export const CATALOGO = {
  title: '¿Qué puedes vender?',
  subtitle: 'Precios netos a Fluxa. Lo que cobres a tu cliente es tuyo.',
  note: 'Los precios de referencia de venta son orientativos. Tú defines cuánto cobras en tu mercado.',
  categories: [
    {
      id: 'web',
      label: 'Páginas',
      icon: '🌐',
      title: 'Páginas y Presencia Digital',
      block: {
        colombiaBlockId: 1,
        imageFirst: true,
        layout: 'image',
        imageKey: 'landing',
        label: 'PÁGINAS Y PRESENCIA DIGITAL',
        headline: 'Tu presencia digital, desde cero hasta convertir.',
      },
      description:
        'Construimos páginas que no solo se ven bien — están diseñadas para que quien llega, actúe. Desde una landing simple hasta un ecommerce completo.',
      services: [
        { name: 'Landing page venta/captación', neto: '$250', venta: '$400–$550', margen: '~$150' },
        { name: 'Landing page múltiples productos', neto: '$380', venta: '$580–$750', margen: '~$200' },
        { name: 'Home page corporativa o de marca', neto: '$450', venta: '$680–$900', margen: '~$230' },
        {
          name: 'Página web corporativa (hasta 5 secciones)',
          neto: '$550',
          venta: '$800–$1.050',
          margen: '~$250',
        },
        { name: 'Ecommerce completo + pasarela', neto: '$1.100', venta: '$1.600–$2.200', margen: '~$500' },
        { name: 'Página biografía / link in bio avanzado', neto: '$150', venta: '$250–$350', margen: '~$100' },
        {
          name: 'VSL — guión y estructura (sin producción de video)',
          neto: '$280',
          venta: '$430–$600',
          margen: '~$150',
        },
      ],
    },
    {
      id: 'auto',
      label: 'Automatización',
      icon: '⚡',
      title: 'Automatización',
      block: {
        colombiaBlockId: 2,
        imageFirst: false,
        layout: 'image',
        imageKey: 'robot',
        label: 'AUTOMATIZACIÓN',
        headline: 'Sistemas que trabajan mientras tú descansas.',
      },
      description:
        'Configuramos flujos automáticos que responden, califican y hacen seguimiento sin que tengas que estar presente en cada paso.',
      services: [
        { name: 'Bot WhatsApp (respuestas + leads + seguimiento)', neto: '$300', venta: '$480–$650', margen: '~$180' },
        { name: 'Bot Instagram (DMs + comentarios automáticos)', neto: '$300', venta: '$480–$650', margen: '~$180' },
        { name: 'Combo WhatsApp + Instagram', neto: '$500', venta: '$750–$1.000', margen: '~$250' },
        { name: 'Sistema agendamiento y reservas', neto: '$450', venta: '$680–$900', margen: '~$230' },
        { name: 'Embudos de nutrición automatizados', neto: '$450', venta: '$680–$900', margen: '~$230' },
        { name: 'Flujos personalizados con n8n', neto: 'desde $550', venta: 'desde $800', margen: '~$250+' },
      ],
    },
    {
      id: 'ia',
      label: 'IA',
      icon: '🤖',
      title: 'Inteligencia Artificial',
      block: {
        colombiaBlockId: 3,
        imageFirst: true,
        layout: 'ia',
        label: 'INTELIGENCIA ARTIFICIAL',
        headline: 'Tecnología que atiende, califica y cierra sola.',
      },
      description:
        'Integramos IA directamente en el negocio de tu cliente — disponible 24/7, sin salarios ni descansos.',
      services: [
        { name: 'Chatbot IA para sitio web', neto: '$480', venta: '$720–$1.000', margen: '~$240' },
        { name: 'Agente de ventas IA por WhatsApp', neto: '$620', venta: '$950–$1.300', margen: '~$330' },
        { name: 'Generador de contenido automatizado con IA', neto: '$400', venta: '$600–$850', margen: '~$200' },
        { name: 'Analizador de métricas con IA', neto: '$450', venta: '$680–$950', margen: '~$230' },
      ],
    },
    {
      id: 'voz',
      label: 'Voz',
      icon: '🎙️',
      title: 'Bots de Voz',
      block: {
        colombiaBlockId: 4,
        imageFirst: false,
        layout: 'voice',
        label: 'BOTS DE VOZ',
        headline: 'Recepcionistas virtuales que nunca pierden una llamada.',
      },
      description:
        'Agentes de voz que llaman, recuerdan citas, califican prospectos y atienden fuera de horario — sin intervención humana.',
      services: [
        { name: 'Bot recordatorio de citas por llamada', neto: '$450', venta: '$680–$950', margen: '~$230' },
        { name: 'Bot calificación de leads por llamada', neto: '$550', venta: '$820–$1.100', margen: '~$270' },
        { name: 'Recepcionista virtual con voz', neto: '$700', venta: '$1.050–$1.400', margen: '~$350' },
      ],
    },
    {
      id: 'sistemas',
      label: 'Sistemas',
      icon: '🖥️',
      title: 'Sistemas y Plataformas',
      block: {
        colombiaBlockId: 5,
        imageFirst: true,
        layout: 'video',
        label: 'SISTEMAS Y PLATAFORMAS',
        headline: 'Visibilidad total. Control absoluto.',
      },
      description:
        'Plataformas, dashboards y comunidades digitales construidas para que el negocio de tu cliente tenga la infraestructura que necesita para escalar sin límites.',
      services: [
        { name: 'Dashboard de métricas en tiempo real', neto: '$550', venta: '$820–$1.100', margen: '~$270' },
        { name: 'CRM personalizado + automatización avanzada', neto: '$800', venta: '$1.200–$1.600', margen: '~$400' },
        { name: 'Portal de clientes', neto: '$650', venta: '$980–$1.300', margen: '~$330' },
        { name: 'Setup comunidad digital (Skool/Circle)', neto: '$500', venta: '$750–$1.000', margen: '~$250' },
        { name: 'Sistema de membresía o cursos', neto: '$695', venta: '$1.050–$1.400', margen: '~$355' },
        { name: 'Plataforma web a medida', neto: 'desde $1.100', venta: 'desde $1.600', margen: '~$500+' },
      ],
    },
    {
      id: 'apps',
      label: 'Apps',
      icon: '📱',
      title: 'Apps Móviles',
      block: {
        colombiaBlockId: 6,
        imageFirst: false,
        layout: 'app',
        label: 'APPS MÓVILES',
        headline: 'Tu negocio en el bolsillo de tus clientes.',
      },
      description:
        'Desarrollamos apps móviles con la marca de tu cliente para iOS y Android — con membresías, contenido exclusivo y acceso premium desde cualquier dispositivo.',
      services: [
        { name: 'App móvil iOS + Android (base)', neto: '$1.800', venta: '$2.700–$3.500', margen: '~$900' },
        { name: 'Funcionalidades adicionales', neto: 'cotización', venta: 'cotización', margen: 'variable' },
      ],
    },
    {
      id: 'software',
      label: 'Software',
      icon: '💡',
      title: 'Software Personalizado',
      block: {
        colombiaBlockId: 7,
        imageFirst: true,
        layout: 'image',
        imageKey: 'software',
        label: 'SOFTWARE PERSONALIZADO',
        headline: 'Si lo puedes imaginar, lo construimos.',
      },
      description:
        'Desde herramientas internas hasta plataformas completas — desarrollamos software a medida exactamente como el negocio lo necesita.',
      services: [
        { name: 'Software a medida (base orientativa)', neto: 'desde $1.100', venta: 'desde $1.700', margen: '~$600+' },
        { name: 'Proyectos complejos', neto: 'cotización', venta: 'cotización', margen: 'variable' },
      ],
    },
    {
      id: 'soporte',
      label: 'Soporte',
      icon: '🔧',
      title: 'Soporte Mensual',
      block: {
        colombiaBlockId: 8,
        imageFirst: false,
        layout: 'text-only',
        label: 'SOPORTE MENSUAL',
        headline: 'Tu sistema optimizado mes a mes.',
      },
      description:
        'Mantenemos la infraestructura digital funcionando, optimizada y actualizada — sin que tengas que preocuparte por nada técnico.',
      services: [
        { name: 'Retainer básico (mantenimiento + ajustes)', neto: '$380/mes', venta: '$580–$750/mes', margen: '~$200/mes' },
        { name: 'Retainer avanzado (optimización + reportes)', neto: '$580/mes', venta: '$880–$1.100/mes', margen: '~$300/mes' },
      ],
    },
  ],
};

export const PAQUETES = {
  title: 'Paquetes listos para vender',
  subtitle: 'Un solo precio al cliente. Más valor, más margen para ti.',
  note: 'Precio de referencia venta es orientativo — tú defines cuánto cobras.',
  tiers: [
    {
      id: 'entrada',
      name: 'TIER 1 — ENTRADA',
      level: 1,
      featured: false,
      packages: [
        {
          id: 'kit-entrada',
          name: 'Kit Entrada',
          neto: 350,
          ventaMin: 550,
          ventaMax: 700,
          comision: '~$200',
          entrega: '5–8 días hábiles',
          includes: ['Landing page venta/captación', 'Bot WhatsApp'],
        },
        {
          id: 'sistema-starter',
          name: 'Sistema Starter',
          neto: 650,
          ventaMin: 950,
          ventaMax: 1200,
          comision: '~$300',
          entrega: '7–10 días hábiles',
          includes: ['Landing multi-producto', 'Bot WhatsApp + Bot Instagram'],
        },
      ],
    },
    {
      id: 'medio',
      name: 'TIER 2 — MEDIO',
      level: 2,
      featured: false,
      packages: [
        {
          id: 'sistema-completo',
          name: 'Sistema Completo',
          neto: 900,
          ventaMin: 1300,
          ventaMax: 1700,
          comision: '~$400',
          entrega: '10–14 días hábiles',
          includes: [
            'Landing multi-producto',
            'Bot WhatsApp + Bot Instagram',
            'Chatbot IA web',
          ],
        },
        {
          id: 'stack-ia',
          name: 'Stack IA',
          neto: 1300,
          ventaMin: 2000,
          ventaMax: 2600,
          comision: '~$700',
          entrega: '12–16 días hábiles',
          includes: [
            'Chatbot IA en sitio web',
            'Agente de ventas IA por WhatsApp',
            'Analizador de métricas con IA',
          ],
        },
        {
          id: 'sistema-digital-pro',
          name: 'Sistema Digital Pro',
          neto: 1700,
          ventaMin: 2400,
          ventaMax: 3000,
          comision: '~$700',
          entrega: '14–18 días hábiles',
          includes: [
            'Todo Sistema Completo',
            'Agente ventas IA WhatsApp',
            'Ecommerce + pasarela',
          ],
        },
      ],
    },
    {
      id: 'premium',
      name: 'TIER 3 — PREMIUM',
      level: 3,
      featured: true,
      recommendedLabel: 'Más vendido',
      packages: [
        {
          id: 'ecosistema-digital',
          name: 'Ecosistema Digital',
          neto: 2600,
          ventaMin: 3800,
          ventaMax: 5000,
          comision: '~$1.200',
          entrega: '3–4 semanas',
          includes: [
            'Todo Sistema Digital Pro',
            'CRM personalizado + automatización',
            'Dashboard de métricas',
            'Retainer 1 mes incluido',
          ],
        },
        {
          id: 'ecosistema-ia-total',
          name: 'Ecosistema con IA Total',
          neto: 3400,
          ventaMin: 5000,
          ventaMax: 6500,
          comision: '~$1.600',
          entrega: '4–5 semanas',
          includes: [
            'Todo Ecosistema Digital',
            'Agente de voz (recepcionista virtual)',
            'Generador de contenido IA',
          ],
        },
        {
          id: 'marca-digital-completa',
          name: 'Marca Digital Completa',
          neto: 4800,
          ventaMin: 7000,
          ventaMax: 9000,
          comision: '~$2.200',
          entrega: '5–6 semanas',
          includes: [
            'Todo Ecosistema IA Total',
            'App móvil iOS + Android (base)',
            'VSL — guión y estructura',
          ],
        },
      ],
    },
    {
      id: 'enterprise',
      name: 'TIER 4 — ENTERPRISE',
      level: 4,
      featured: false,
      packages: [
        {
          id: 'infraestructura-total',
          name: 'Infraestructura Total',
          neto: 6500,
          netoLabel: 'desde $6.500',
          ventaMin: 10000,
          ventaMax: null,
          ventaLabel: 'desde $10.000',
          comision: '~$3.500+',
          customQuote: true,
          badge: 'Cotización personalizada — contactar a Fluxa',
          entrega: 'Según alcance acordado',
          includes: [
            'Todo lo anterior',
            'Software a medida',
            'Portal de clientes',
            'Sistema de membresía o cursos',
          ],
        },
      ],
    },
  ],
  nicheCombos: {
    title: 'Sistemas especializados por industria',
    subtitle:
      'Combos armados específicamente para cada tipo de negocio. Más fácil de vender porque el cliente se identifica de inmediato.',
    navLabel: 'Nichos',
    combos: [
      {
        id: 'clinicas-consultorios',
        industryBadge: 'SALUD Y BIENESTAR',
        name: 'Sistema Clínicas y Consultorios',
        neto: 1800,
        ventaMin: 2600,
        ventaMax: 3200,
        ahorro: 530,
        margen: '~$800–$1.400',
        entrega: '2–4 semanas',
        includes: [
          'Landing page hasta 4 productos — servicios, precios y CTA por especialidad',
          'Bot WhatsApp — agendamiento, recordatorios y respuestas automáticas',
          'Sistema agendamiento y reservas — calendario online con confirmaciones',
          'Bot recordatorio de citas por llamada — llama al paciente antes de su cita',
          'Recepcionista virtual con voz — atiende llamadas fuera de horario',
        ],
        idealFor:
          'clínicas, consultorios médicos, odontológicos, psicológicos, estéticos y cualquier servicio que vive de citas',
      },
      {
        id: 'restaurantes-servicios',
        industryBadge: 'RESTAURANTES Y SERVICIOS LOCALES',
        name: 'Sistema Restaurantes y Servicios Locales',
        neto: 1150,
        ventaMin: 1700,
        ventaMax: 2200,
        ahorro: 300,
        margen: '~$550–$1.050',
        entrega: '2–4 semanas',
        includes: [
          'Landing page venta/captación — menú, carta o servicios con CTA directo',
          'Bot WhatsApp — pedidos, reservas y atención automática',
          'Bot Instagram — DMs y comentarios automáticos',
          'Sistema agendamiento y reservas — reservas de mesa o turnos online',
        ],
        idealFor:
          'restaurantes, cafeterías, peluquerías, spas, talleres y negocios locales con alto volumen de mensajes',
      },
      {
        id: 'coaches-infoproductores',
        industryBadge: 'EDUCACIÓN Y CONOCIMIENTO',
        name: 'Sistema Coaches e Infoproductores',
        neto: 1750,
        ventaMin: 2500,
        ventaMax: 3200,
        ahorro: 545,
        margen: '~$750–$1.450',
        entrega: '2–4 semanas',
        includes: [
          'Landing page hasta 4 productos — programas, servicios o cursos con CTA',
          'Bot WhatsApp + Bot Instagram — automatización completa de mensajería',
          'Sistema de membresía o cursos — plataforma para entregar contenido y cobrar',
          'VSL — guión y estructura de video de ventas para el lanzamiento',
        ],
        idealFor:
          'coaches, mentores, consultores e infoproductores que venden programas o cursos digitales',
      },
      {
        id: 'hoteleria-glamping',
        industryBadge: 'TURISMO Y HOSPEDAJE',
        name: 'Sistema Hotelería y Glamping',
        neto: 1950,
        ventaMin: 2800,
        ventaMax: 3500,
        ahorro: 580,
        margen: '~$850–$1.550',
        entrega: '2–4 semanas',
        includes: [
          'Landing page hasta 4 productos — habitaciones, cabañas o experiencias con precios y CTA',
          'Bot WhatsApp — consultas, disponibilidad y reservas automáticas',
          'Bot Instagram — DMs y comentarios automáticos',
          'Sistema agendamiento y reservas — calendario de disponibilidad con confirmaciones automáticas',
          'Bot recordatorio de citas por llamada — recuerda la reserva al huésped antes de su llegada',
          'Generador de contenido IA — contenido automático para redes y promociones',
        ],
        idealFor:
          'hoteles boutique, glamping, fincas, cabañas y alojamientos turísticos que quieren reservas directas sin pagar comisión a terceros',
      },
      {
        id: 'traders-senales',
        industryBadge: 'TRADING Y FINANZAS',
        name: 'Sistema Traders y Señales',
        neto: 1600,
        ventaMin: 2300,
        ventaMax: 3000,
        ahorro: 480,
        margen: '~$700–$1.400',
        entrega: '2–4 semanas',
        includes: [
          'Landing page hasta 4 productos — planes, señales o comunidad con CTA',
          'Bot de señales en tiempo real — envía alertas automáticas por WhatsApp o Telegram cuando se activa una señal',
          'Bot WhatsApp — respuestas automáticas, onboarding y soporte a miembros',
          'Sistema de membresía o cursos — acceso exclusivo por suscripción mensual',
          'Embudos de nutrición automatizados — secuencia de mensajes para convertir prospectos en miembros',
        ],
        idealFor:
          'traders que venden señales, comunidades de inversión, academias de trading y analistas financieros con suscriptores',
      },
      {
        id: 'inmobiliarias',
        industryBadge: 'INMOBILIARIO',
        name: 'Sistema Inmobiliarias y Agentes',
        neto: 1500,
        ventaMin: 2200,
        ventaMax: 2900,
        ahorro: 430,
        margen: '~$700–$1.400',
        entrega: '2–4 semanas',
        includes: [
          'Landing page hasta 4 productos — propiedades o servicios destacados con CTA',
          'Bot WhatsApp — calificación automática de prospectos e información de propiedades',
          'Bot Instagram — respuesta automática a consultas de propiedades',
          'Agente de ventas IA por WhatsApp — califica, filtra y agenda visitas automáticamente con IA',
          'Sistema agendamiento y reservas — agenda de visitas online',
        ],
        idealFor:
          'inmobiliarias, agentes independientes, constructoras y proyectos de vivienda nueva',
      },
      {
        id: 'tiendas-fisico',
        industryBadge: 'ECOMMERCE Y PRODUCTO FÍSICO',
        name: 'Sistema Tiendas y Producto Físico',
        neto: 1850,
        ventaMin: 2700,
        ventaMax: 3400,
        ahorro: 600,
        margen: '~$850–$1.550',
        entrega: '2–4 semanas',
        includes: [
          'Ecommerce completo + pasarela de pago — catálogo, carrito y cobro integrado',
          'Bot WhatsApp — seguimiento de pedidos, soporte y recuperación de carritos abandonados',
          'Bot Instagram — respuesta automática a consultas de productos',
          'Embudos de nutrición automatizados — secuencia post-compra y reactivación de clientes',
          'Dashboard de métricas en tiempo real — ventas, productos y rendimiento en un solo lugar',
        ],
        idealFor:
          'tiendas online, marcas de ropa, accesorios, suplementos, cosméticos y cualquier negocio con catálogo de productos físicos',
      },
      {
        id: 'eventos-entretenimiento',
        industryBadge: 'EVENTOS Y ENTRETENIMIENTO',
        name: 'Sistema Eventos y Entretenimiento',
        neto: 1300,
        ventaMin: 1900,
        ventaMax: 2500,
        ahorro: 380,
        margen: '~$600–$1.200',
        entrega: '2–4 semanas',
        includes: [
          'Landing page hasta 4 productos — eventos, entradas o experiencias con CTA',
          'Bot WhatsApp — información, reservas y confirmaciones automáticas',
          'Bot Instagram — DMs y comentarios automáticos para promoción',
          'Sistema agendamiento y reservas — venta de entradas o reservas de cupos',
          'VSL — guión y estructura de video promocional del evento',
        ],
        idealFor:
          'organizadores de eventos, bares, discotecas, salas de conciertos, experiencias gastronómicas y entretenimiento en vivo',
      },
    ],
  },
  comparisonTable: {
    headers: ['Escenario', 'Paquete', 'Cierres/mes', 'Pagas a Fluxa', 'Cobras (ref.)', 'Tu ganancia'],
    rows: [
      {
        escenario: 'Conservador',
        paquete: 'Sistema Completo x2',
        cierres: '2',
        pagas: '$1.800',
        cobras: '$2.800',
        ganancia: '~$1.000',
      },
      {
        escenario: 'Moderado',
        paquete: 'Sistema Digital Pro x2 + Retainer x1',
        cierres: '3',
        pagas: '$3.980',
        cobras: '$6.280',
        ganancia: '~$2.300',
      },
      {
        escenario: 'Escalado',
        paquete: 'Ecosistema Digital x2 + Retainer x3',
        cierres: '5',
        pagas: '$6.940',
        cobras: '$10.740',
        ganancia: '~$3.800',
      },
      {
        escenario: 'Premium',
        paquete: 'Marca Digital Completa x2 + Retainer x5',
        cierres: '7',
        pagas: '$12.500',
        cobras: '$19.400',
        ganancia: '~$6.900',
      },
    ],
  },
};

/** Paquetes para calculadora — alineados con PAQUETES (tiers + nichos) */
const CALCULATOR_FROM_TIERS = PAQUETES.tiers.flatMap((tier) =>
  tier.packages
    .filter((p) => typeof p.neto === 'number' && p.ventaMin)
    .map((p) => ({
      id: p.id,
      name: p.name,
      neto: p.neto,
      ventaMin: p.ventaMin,
      ventaMax: p.ventaMax ?? Math.round(p.ventaMin * 1.25),
      ventaDesde: !p.ventaMax,
    }))
);

const CALCULATOR_FROM_NICHES = PAQUETES.nicheCombos.combos.map((combo) => ({
  id: combo.id,
  name: combo.name,
  neto: combo.neto,
  ventaMin: combo.ventaMin,
  ventaMax: combo.ventaMax,
  ventaDesde: false,
}));

export const CALCULATOR_PACKAGES = [...CALCULATOR_FROM_TIERS, ...CALCULATOR_FROM_NICHES];

/** Grupos del selector — generados desde tiers para no omitir paquetes */
export const CALCULATOR_PACKAGE_GROUPS = [
  ...PAQUETES.tiers.map((tier) => ({
    id: `tier-${tier.id}`,
    label: tier.name.replace(/^TIER \d+ — /, ''),
    packageIds: tier.packages
      .filter((p) => typeof p.neto === 'number' && p.ventaMin)
      .map((p) => p.id),
  })),
  {
    id: 'nichos',
    label: 'Combos por nicho',
    packageIds: PAQUETES.nicheCombos.combos.map((c) => c.id),
  },
];

export const CALCULATOR_RETAINERS = [
  { id: 'basico', label: 'Básico', neto: 380, ventaMin: 580, ventaMax: 750 },
  { id: 'avanzado', label: 'Avanzado', neto: 580, ventaMin: 880, ventaMax: 1100 },
];

export const CALCULADORA = {
  title: 'Calcula tu ganancia mensual',
  subtitle: 'Estimación con precios de referencia. Tú defines cuánto cobras realmente.',
  projectsLabel: 'Proyectos por mes',
  projectsMin: 1,
  projectsMax: 10,
  retainersLabel: 'Retainers activos',
  retainersMin: 0,
  retainersMax: 10,
  packageLabel: 'Paquete principal',
  retainerTypeLabel: 'Tipo de retainer',
  results: {
    pagas: 'Pagas a Fluxa',
    cobras: 'Cobras (referencia)',
    ganancia: 'Tu ganancia estimada',
  },
  footnote:
    'Pagas a Fluxa = netos de proyectos + netos de retainers activos. Cobras = punto medio de la venta de referencia por cada cierre o mes de retainer. En paquetes “desde $X” se estima el tope al 125% del mínimo. Tu ganancia real puede ser mayor si cobras arriba del rango.',
};

export { SPEECH } from './speech-data';

export const REGLAS = {
  title: 'Las reglas de la alianza',
  subtitle: 'Sin letra pequeña.',
  items: [
    'Pagos: 100% del neto a Fluxa antes de iniciar ejecución. Tú cobras primero a tu cliente, luego nos transfieres nuestro neto en USD.',
    'Moneda: Precios netos en USD. Tú cobras en tu moneda local y nos transfieres el equivalente acordado.',
    'Confidencialidad: Fluxa no contacta ni comercializa directamente a tus clientes. Tu cartera es tuya.',
    'White-label: El cliente final nunca ve la marca Fluxa. Todo se entrega bajo tu marca o la del cliente.',
    'Revisiones: 2 rondas incluidas por proyecto. Cambios fuera de alcance se cotizan aparte.',
    'Exclusividad: Ninguna de las dos partes la exige. Puedes trabajar con otros proveedores.',
    'Ajuste de precios: Si cambian nuestros costos, te avisamos con anticipación antes de aplicar nuevos valores.',
    'Inicio de proyecto: Solo arranca con pago confirmado + brief completo enviado.',
  ],
};

export const FAQ = {
  title: 'Preguntas frecuentes',
  items: [
    {
      q: '¿Quién habla con el cliente final?',
      a: 'Solo tú. Fluxa no contacta tu cartera. Toda la comunicación comercial y de seguimiento es tuya.',
    },
    {
      q: '¿En qué orden van los pagos?',
      a: 'Primero cobras a tu cliente. Luego nos transfieres el neto en USD. Cuando confirmamos ese pago y recibimos el brief, arranca la ejecución.',
    },
    {
      q: '¿Cómo le pago a Fluxa desde otro país?',
      a: 'Coordinamos por WhatsApp el medio que te acomode — transferencia internacional, Wise u otro acordado. Lo importante es que el neto en USD queda confirmado antes de arrancar.',
    },
    {
      q: '¿Qué pasa si mi cliente no me paga?',
      a: 'El cobro al cliente final es tu relación comercial. Nosotros solo ejecutamos cuando el neto a Fluxa está pagado — así evitas prometer entregas sin respaldo.',
    },
    {
      q: '¿Puedo poner mis propios precios?',
      a: 'Sí. Los precios de esta página son netos a Fluxa. Lo que cobres a tu cliente es 100% tu decisión.',
    },
    {
      q: '¿La marca Fluxa aparece en lo que ve el cliente final?',
      a: 'No. Fluxa ejecuta en segundo plano. Tu marca o la del cliente es la que se muestra en todo lo entregado.',
    },
    {
      q: '¿Qué pasa si el cliente pide cambios extra?',
      a: 'Las 2 rondas de revisión cubren ajustes dentro del alcance del paquete. Fuera de eso, cotizamos y tú decides si se lo cobras al cliente.',
    },
    {
      q: '¿Necesito saber de tecnología para vender esto?',
      a: 'No. Solo necesitas entender qué problema resuelve cada paquete y cómo presentarlo. El speech de esta misma página te da todo lo que necesitas.',
    },
    {
      q: '¿Puedo combinar servicios del catálogo que no estén en los paquetes?',
      a: 'Sí. Los paquetes son los combos más vendidos, pero puedes cotizar piezas sueltas o combinaciones personalizadas coordinando con Fluxa por WhatsApp.',
    },
  ],
};

export const CTA_FINAL = {
  title: '¿Listo para arrancar?',
  subtitle:
    'Escríbenos por WhatsApp. Sin compromisos. El primer proyecto es el piloto — si funciona, construimos el sistema juntos.',
  ctaLabel: 'Escribir a Fluxa por WhatsApp',
  ctaHref: VENDEDORES_WA.hrefWithText,
  secondaryText: `${VENDEDORES_WA.display} · Fluxa Method`,
};

export const FOOTER = {
  confidential: 'Información confidencial para aliados Fluxa Method. No distribuir.',
  copyright: '© 2026 Fluxa Method. Todos los derechos reservados.',
};

function formatPrecioVenta(min, max, label) {
  if (label) return label;
  if (max) return `$${min.toLocaleString('en-US')}–$${max.toLocaleString('en-US')}`;
  return `desde $${min.toLocaleString('en-US')}`;
}

/** Filas para tabla imprimible — generadas desde paquetes y nichos */
export const PRECIOS_RESUMEN_ROWS = [
  ...PAQUETES.tiers.flatMap((tier) =>
    tier.packages
      .filter((p) => typeof p.neto === 'number' && p.ventaMin)
      .map((p) => ({
        name: p.name,
        neto: `$${p.neto.toLocaleString('en-US')}`,
        venta: formatPrecioVenta(p.ventaMin, p.ventaMax, p.ventaLabel),
        entrega: p.entrega || 'A convenir',
        margen: p.comision || '—',
      }))
  ),
  ...PAQUETES.nicheCombos.combos.map((c) => ({
    name: c.name,
    neto: `$${c.neto.toLocaleString('en-US')}`,
    venta: formatPrecioVenta(c.ventaMin, c.ventaMax),
    entrega: c.entrega || '2–4 semanas',
    margen: c.margen,
  })),
];
