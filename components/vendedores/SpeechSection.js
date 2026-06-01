'use client';

import { useState } from 'react';
import { SPEECH } from '@/app/embajadores-fluxa/vendedores-config';
import colombiaVibrant from '@/components/colombia/colombiaVibrant.module.css';
import VendedoresSection from './VendedoresSection';
import styles from './SpeechSection.module.css';

function CopyScriptButton({ text, label, copiedLabel, feedbackMs }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), feedbackMs);
    } catch {
      /* fallback silencioso */
    }
  }

  return (
    <button type="button" className={styles.copyBtn} onClick={handleCopy}>
      {copied ? copiedLabel : label}
    </button>
  );
}

function CategoryCard({ category }) {
  return (
    <article className={`${styles.card} ${colombiaVibrant.glowCard}`}>
      <h4 className={styles.cardTitle}>{category.name}</h4>
      <dl className={styles.defList}>
        <div>
          <dt>Qué es</dt>
          <dd>{category.queEs}</dd>
        </div>
        <div>
          <dt>Para quién</dt>
          <dd>{category.paraQuien}</dd>
        </div>
        <div>
          <dt>Problema que resuelve</dt>
          <dd>{category.problema}</dd>
        </div>
        <div>
          <dt>Analogía</dt>
          <dd className={styles.analogia}>{category.analogia}</dd>
        </div>
      </dl>
    </article>
  );
}

function ScriptCard({ item, copyLabel, copiedLabel, feedbackMs }) {
  return (
    <article
      className={`${styles.card} ${colombiaVibrant.glowCard} ${item.featured ? styles.cardFeatured : ''}`}
    >
      <h4 className={styles.cardTitle}>{item.title}</h4>
      <p className={styles.context}>{item.context}</p>
      <blockquote className={styles.scriptBlock}>
        <p>{item.script}</p>
      </blockquote>
      {item.notes?.length > 0 && (
        <div className={styles.notes}>
          <p className={styles.notesLabel}>Notas del vendedor</p>
          <ul>
            {item.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}
      <CopyScriptButton
        text={item.script}
        label={copyLabel}
        copiedLabel={copiedLabel}
        feedbackMs={feedbackMs}
      />
    </article>
  );
}

function ObjectionsAccordion({ objections, copyLabel, copiedLabel, feedbackMs }) {
  const [openId, setOpenId] = useState(objections.items[0]?.id ?? null);

  function toggle(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={styles.objectionsWrap}>
      <h4 className={styles.objectionsTitle}>{objections.title}</h4>
      <p className={styles.context}>{objections.context}</p>
      <div className={styles.accordion}>
        {objections.items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`${styles.accordionItem} ${colombiaVibrant.glowCard} ${isOpen ? styles.accordionOpen : ''}`}
            >
              <button
                type="button"
                className={styles.accordionTrigger}
                aria-expanded={isOpen}
                onClick={() => toggle(item.id)}
              >
                <span>&ldquo;{item.objection}&rdquo;</span>
                <span className={styles.accordionIcon} aria-hidden>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className={styles.accordionBody}>
                  <blockquote className={styles.scriptBlock}>
                    <p>{item.script}</p>
                  </blockquote>
                  <CopyScriptButton
                    text={item.script}
                    label={copyLabel}
                    copiedLabel={copiedLabel}
                    feedbackMs={feedbackMs}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpeechTabs({ tabs, activeId, onSelect }) {
  return (
    <>
      <div className={styles.tabBarScroll} role="tablist" aria-label="Secciones de speech">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`speech-tab-${tab.id}`}
            aria-selected={activeId === tab.id}
            className={activeId === tab.id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => onSelect(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabBar} role="tablist" aria-label="Secciones de speech">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeId === tab.id}
            className={activeId === tab.id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => onSelect(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default function SpeechSection() {
  const { titleBefore, titleAccent, subtitle, tabs, copyButtonLabel, copyButtonCopied, copyFeedbackMs } =
    SPEECH;
  const [activeId, setActiveId] = useState(tabs[0].id);

  const active = tabs.find((t) => t.id === activeId) || tabs[0];

  return (
    <VendedoresSection className={styles.section} id="speech">
      <div className={styles.container}>
        <h2 className={`${styles.h2} ${colombiaVibrant.headlineSm}`}>
          {titleBefore}
          <span className={colombiaVibrant.accentPurple}>{titleAccent}</span>
        </h2>
        <p className={styles.sub}>{subtitle}</p>

        <SpeechTabs tabs={tabs} activeId={activeId} onSelect={setActiveId} />

        <div className={styles.panel} role="tabpanel" key={active.id}>
          {active.id === 'entiende' && (
            <div className={styles.cardsGrid}>
              {active.categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          )}

          {active.id === 'presentar' && (
            <div className={styles.cardsStack}>
              {active.scripts.map((item) => (
                <ScriptCard
                  key={item.id}
                  item={item}
                  copyLabel={copyButtonLabel}
                  copiedLabel={copyButtonCopied}
                  feedbackMs={copyFeedbackMs}
                />
              ))}
            </div>
          )}

          {active.id === 'cerrar' && (
            <>
              <div className={styles.cardsStack}>
                {active.scripts.map((item) => (
                  <ScriptCard
                    key={item.id}
                    item={item}
                    copyLabel={copyButtonLabel}
                    copiedLabel={copyButtonCopied}
                    feedbackMs={copyFeedbackMs}
                  />
                ))}
              </div>
              {active.objections && (
                <ObjectionsAccordion
                  objections={active.objections}
                  copyLabel={copyButtonLabel}
                  copiedLabel={copyButtonCopied}
                  feedbackMs={copyFeedbackMs}
                />
              )}
            </>
          )}
        </div>
      </div>
    </VendedoresSection>
  );
}
