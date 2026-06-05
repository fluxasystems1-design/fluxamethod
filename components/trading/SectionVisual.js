import Image from 'next/image';
import styles from '@/app/trading/page.module.css';

export default function SectionVisual({ image, className = '', priority = false, sizes }) {
  if (!image?.src) return null;
  const width = image.width || 1024;
  const height = image.height || 1024;
  return (
    <div className={`${styles.sectionVisual} ${className}`.trim()}>
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        className={styles.sectionVisualImg}
        priority={priority}
        sizes={sizes || '(max-width: 768px) 100vw, 720px'}
        loading={priority ? undefined : 'lazy'}
      />
    </div>
  );
}
