'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { COLOMBIA_LOGO_SRC } from '@/lib/colombia/brand';
import styles from './page.module.css';

function AccesoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/embajadores-fluxa';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/embajadores-fluxa-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError('Contraseña incorrecta. Intenta de nuevo.');
        return;
      }

      router.push(from.startsWith('/embajadores-fluxa') ? from : '/embajadores-fluxa');
      router.refresh();
    } catch {
      setError('No se pudo verificar el acceso. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <Image
        src={COLOMBIA_LOGO_SRC}
        alt="Fluxa Method"
        width={160}
        height={56}
        className={styles.logo}
      />
      <h1>Acceso aliados</h1>
      <p>Esta página es privada. Ingresa la contraseña que te compartió Fluxa.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.fieldLabel} htmlFor="access-password">
          Contraseña
        </label>
        <input
          id="access-password"
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error ? <p className={styles.error}>{error}</p> : null}
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Verificando…' : 'Entrar'}
        </button>
      </form>
      <p className={styles.hint}>Si no tienes contraseña, escribe a Fluxa por WhatsApp.</p>
    </div>
  );
}

export default function VendedoresAccesoPage() {
  return (
    <div className={styles.wrap}>
      <Suspense fallback={<div className={styles.card}>Cargando…</div>}>
        <AccesoForm />
      </Suspense>
    </div>
  );
}
