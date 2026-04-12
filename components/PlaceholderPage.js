export default function PlaceholderPage({ title }) {
  return (
    <main
      style={{
        background: '#080c14',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Space Grotesk, system-ui, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <p style={{ color: '#A855F7', marginBottom: '16px' }}>✦ Próximamente</p>
        <h1>{title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '16px' }}>Esta sección está en construcción</p>
        <a href="/" style={{ color: '#A855F7', marginTop: '24px', display: 'block' }}>
          ← Volver al inicio
        </a>
      </div>
    </main>
  );
}
