import Image from 'next/image';
import styles from '@/app/trading/page.module.css';

function TechGroupImage({ image }) {
  if (!image?.src) return null;

  const isPill = image.variant === 'pill';

  if (isPill) {
    return (
      <div className={styles.techGroupImagePill}>
        <Image
          src={image.src}
          alt={image.alt || ''}
          width={1024}
          height={1024}
          className={styles.techGroupImagePillImg}
          loading="lazy"
          sizes="(max-width: 720px) 100vw, 440px"
        />
      </div>
    );
  }

  return (
    <div className={styles.techGroupBanner}>
      <Image
        src={image.src}
        alt={image.alt || ''}
        width={1024}
        height={1024}
        className={styles.techGroupBannerImg}
        loading="lazy"
        sizes="(max-width: 720px) 100vw, 900px"
      />
    </div>
  );
}

export default function TradingTechPillGroups({ groups, className = '' }) {
  if (!groups?.length) return null;

  return (
    <div className={`${styles.techGroups} ${className}`.trim()}>
      {groups.map((group, groupIndex) => {
        const imageInside = group.image?.variant === 'pill';
        const imageOutside = group.image?.src && !imageInside;

        const groupCard = (
          <div className={styles.techGroup}>
            {imageInside ? <TechGroupImage image={group.image} /> : null}
            <div className={styles.techGroupHead}>
              {group.icon ? (
                <span className={styles.techGroupIcon} aria-hidden>
                  {group.icon}
                </span>
              ) : null}
              <h3 className={styles.techGroupTitle}>{group.title}</h3>
            </div>
            <div className={styles.techPillStack}>
              {group.pills.map((pill, pillIndex) => (
                <article
                  key={pill.name}
                  className={styles.techServicePill}
                  style={{ '--pill-delay': `${groupIndex * 0.06 + pillIndex * 0.04}s` }}
                >
                  <h4 className={styles.techServicePillName}>{pill.name}</h4>
                  <p className={styles.techServicePillDesc}>{pill.desc}</p>
                </article>
              ))}
            </div>
          </div>
        );

        if (imageOutside) {
          return (
            <div key={group.title} className={styles.techGroupSection}>
              <TechGroupImage image={group.image} />
              {groupCard}
            </div>
          );
        }

        return (
          <div key={group.title} className={styles.techGroupBlock}>
            {groupCard}
          </div>
        );
      })}
    </div>
  );
}
