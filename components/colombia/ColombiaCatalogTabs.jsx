'use client';

import { useRef, useState } from 'react';
import ColombiaSection from './ColombiaSection';
import styles from './ColombiaCatalogTabs.module.css';

const TABS = [
  {
    id: 'web',
    label: 'Páginas',
    icon: '🌐',
    title: 'Páginas y Presencia Digital',
    intro:
      'Tu negocio visible, profesional y listo para vender desde el primer clic.',
    items: [
      'Home page corporativa o de marca',
      'Landing page de venta o captación',
      'Landing page con múltiples productos',
      'Página web corporativa',
      'Ecommerce completo con pasarela de pago',
      'Página de biografía / link in bio avanzado',
      'VSL — guión y estructura de video de ventas',
    ],
  },
  {
    id: 'auto',
    label: 'Automatización',
    icon: '⚡',
    title: 'Automatización',
    intro: 'Sistemas que trabajan mientras el cliente duerme — sin intervención manual.',
    items: [
      'Bot WhatsApp — respuestas, leads y seguimiento automático',
      'Bot Instagram — DMs y comentarios automatizados',
      'Combo WhatsApp + Instagram',
      'Bot de señales en tiempo real (Telegram o WhatsApp)',
      'Embudos de nutrición automatizados',
      'Flujos personalizados con n8n',
      'Sistema de agendamiento y reservas con recordatorios',
      'Automatización de email post-pago',
      'Instalación de píxeles y analítica',
    ],
  },
  {
    id: 'ia',
    label: 'IA',
    icon: '🤖',
    title: 'Inteligencia Artificial',
    intro: 'Tecnología que atiende, califica y cierra sola — disponible 24/7.',
    items: [
      'Chatbot con IA para sitio web',
      'Agente de ventas por WhatsApp con IA',
      'Generador de contenido automatizado con IA',
      'Analizador de métricas con IA',
    ],
  },
  {
    id: 'voz',
    label: 'Voz',
    icon: '🎙️',
    title: 'Bots de Voz',
    intro: 'Recepcionistas virtuales que nunca descansan ni pierden una llamada.',
    items: [
      'Bot de recordatorio de citas por llamada',
      'Bot de calificación de leads por llamada',
      'Recepcionista virtual con voz',
    ],
  },
  {
    id: 'sistemas',
    label: 'Sistemas',
    icon: '🖥️',
    title: 'Sistemas y Plataformas',
    intro: 'Visibilidad total del negocio y comunidades digitales que escalan.',
    items: [
      'Dashboard de métricas en tiempo real',
      'Dashboard de resultados en vivo',
      'CRM personalizado + automatización avanzada',
      'Mesa de ayuda y soporte al cliente',
      'Portal de clientes',
      'Setup de comunidad digital (Skool, Circle)',
      'Sistema de membresía o cursos',
      'Plataforma web a medida',
    ],
  },
  {
    id: 'apps',
    label: 'Apps',
    icon: '📱',
    title: 'Apps Móviles',
    intro: 'Tu negocio en el bolsillo de tus clientes, con tu marca.',
    items: ['App móvil con marca propia (iOS + Android)'],
  },
  {
    id: 'software',
    label: 'Software',
    icon: '💡',
    title: 'Software Personalizado',
    intro: 'Si lo puedes imaginar, lo construimos.',
    items: ['Software a medida para cualquier nicho o industria'],
  },
  {
    id: 'soporte',
    label: 'Soporte',
    icon: '🔧',
    title: 'Soporte Mensual',
    intro: 'Tu sistema optimizado mes a mes, sin preocupaciones técnicas.',
    items: ['Retainer — mantenimiento, optimizaciones y soporte continuo'],
  },
];

function CatalogContent({ active }) {
  return (
    <div className={styles.tabContent} key={active.id}>
      <h3 className={styles.categoryTitle}>{active.title}</h3>
      <p className={styles.categoryDesc}>{active.intro}</p>
      <div className={styles.itemsGrid}>
        {active.items.map((item) => (
          <div key={item} className={styles.itemCard}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ColombiaCatalogTabs() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const tabRefs = useRef({});
  const tabBarRef = useRef(null);
  const active = TABS.find((t) => t.id === activeId) || TABS[0];

  function scrollTabIntoBar(id) {
    const bar = tabBarRef.current;
    const tab = tabRefs.current[id];
    if (!bar || !tab) return;
    const targetLeft = tab.offsetLeft - bar.clientWidth / 2 + tab.offsetWidth / 2;
    bar.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
  }

  function handleTabClick(id) {
    setActiveId(id);
    scrollTabIntoBar(id);
  }

  return (
    <ColombiaSection className={styles.section} id="catalogo">
      <div className={styles.container}>
        <h2 className={styles.h2}>¿Qué construimos?</h2>
        <p className={styles.sub}>Selecciona la categoría que necesitas.</p>

        <div
          ref={tabBarRef}
          className={styles.tabBar}
          role="tablist"
          aria-label="Catálogo de servicios"
        >
          {TABS.map((tab) => {
            const isActive = activeId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                ref={(el) => {
                  if (el) tabRefs.current[tab.id] = el;
                }}
                className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>

        <div className={styles.tabDivider} aria-hidden />

        <div role="tabpanel" aria-labelledby={`tab-${active.id}`}>
          <CatalogContent active={active} />
        </div>
      </div>
    </ColombiaSection>
  );
}
