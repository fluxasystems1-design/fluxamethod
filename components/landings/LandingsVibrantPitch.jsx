import vibrant from './vibrantType.module.css';
import styles from './LandingsVibrantPitch.module.css';

/** Bloque de valor — tipografía vibrante (creativo referencia) */
export default function LandingsVibrantPitch() {
  return (
    <section className={styles.section} aria-labelledby="vibrant-pitch-heading">
      <div className={styles.inner}>
        <h2 id="vibrant-pitch-heading" className={vibrant.headline}>
          ¿Por qué <span className={vibrant.accentCoral}>pagar</span>{' '}
          <span className={vibrant.accentCoral}>cada mes</span> por herramientas que te
          limitan?
        </h2>
        <p className={vibrant.body}>
          Si vendes productos, necesitas{' '}
          <span className={vibrant.accentGreen}>probar rápido</span>. No quedarte atrapado
          pagando <span className={vibrant.accentCoral}>planes caros</span> solo para crear unas
          pocas páginas.
        </p>
      </div>
    </section>
  );
}
