'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './landingsShowcase.module.css';

export const VITRINA_ITEMS = [
  {
    src: '/imagenes/' + encodeURIComponent('ChatGPT Image 14 may 2026, 04_52_03 p.m..png'),
    name: 'Testosterone',
    category: 'Suplementos',
  },
  {
    src: '/imagenes/' + encodeURIComponent('ChatGPT Image 14 may 2026, 04_52_06 p.m..png'),
    name: 'Sopladora',
    category: 'Herramientas',
  },
  {
    src: '/imagenes/' + encodeURIComponent('ChatGPT Image 14 may 2026, 04_52_09 p.m..png'),
    name: 'Rueda Abdominal',
    category: 'Fitness',
  },
];

const POS_CLASSES = [
  styles.vitrinaPos0,
  styles.vitrinaPos1,
  styles.vitrinaPos2,
  styles.vitrinaPos3,
  styles.vitrinaPos4,
];

export default function LandingsVitrinaCarousel({
  id = 'ejemplos',
  headingId = 'examples-heading',
  title = 'Estas landings ya venden. La tuya puede ser la próxima.',
  subtitle = 'Landings que convierten para cada nicho',
  className = '',
  hideArrows = false,
  compact = false,
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(
    function () {
      if (!paused) {
        intervalRef.current = setInterval(function () {
          setActive(function (prev) {
            return (prev + 1) % VITRINA_ITEMS.length;
          });
        }, 2500);
      }
      return function () {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    },
    [paused]
  );

  return (
    <section
      className={
        styles.sectionExamples +
        (compact ? ` ${styles.sectionExamplesCompact}` : '') +
        (className ? ` ${className}` : '')
      }
      id={id}
      aria-labelledby={headingId}
    >
      <div className={styles.container}>
        <h2 id={headingId} className={styles.carouselSectionTitle}>
          {title}
        </h2>
        <p className={styles.carouselSectionSub}>{subtitle}</p>

        <div
          className={styles.vitrinaShowcase}
          onMouseEnter={function () {
            setPaused(true);
          }}
          onMouseLeave={function () {
            setPaused(false);
          }}
        >
          <div className={styles.vitrinaWrap}>
            <div className={styles.vitrinaStageBlock}>
              {!hideArrows ? (
                <button
                  type="button"
                  className={styles.vitrinaArrow}
                  aria-label="Anterior"
                  onClick={function () {
                    setActive(function (i) {
                      return (i - 1 + VITRINA_ITEMS.length) % VITRINA_ITEMS.length;
                    });
                  }}
                >
                  ←
                </button>
              ) : null}

              <div className={styles.vitrinaStage}>
                {[0, 1, 2, 3, 4].map(function (slot) {
                  var n = VITRINA_ITEMS.length;
                  var slotIndex = (active + slot - 2 + n * 10) % n;
                  var item = VITRINA_ITEMS[slotIndex];
                  var posClass = POS_CLASSES[slot];
                  return (
                    <div key={slot} className={styles.vitrinaPhoneItem + ' ' + posClass}>
                      <div className={styles.vitrinaPhoneFrame}>
                        <div className={styles.vitrinaStatusBar}>
                          <span className={styles.vitrinaStatusTime}>4:16</span>
                          <div className={styles.vitrinaNotch} aria-hidden />
                          <span className={styles.vitrinaStatusIcons} aria-hidden>
                            ▐▐ ≋ ▮
                          </span>
                        </div>
                        <div className={styles.vitrinaScreen}>
                          <img
                            src={item.src}
                            alt=""
                            className={styles.vitrinaScreenImg}
                            draggable={false}
                          />
                        </div>
                        <div className={styles.vitrinaHomeBar}>
                          <span className={styles.vitrinaHomePill} aria-hidden />
                        </div>
                      </div>
                      <div
                        className={
                          styles.vitrinaSlotLabel + (slot === 2 ? ' ' + styles.vitrinaSlotLabelOn : '')
                        }
                      >
                        <p className={styles.vitrinaSlotName}>{item.name}</p>
                        <p className={styles.vitrinaSlotCat}>{item.category}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!hideArrows ? (
                <button
                  type="button"
                  className={styles.vitrinaArrow + ' ' + styles.vitrinaArrowRight}
                  aria-label="Siguiente"
                  onClick={function () {
                    setActive(function (i) {
                      return (i + 1) % VITRINA_ITEMS.length;
                    });
                  }}
                >
                  →
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
