'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Application } from '@splinetool/runtime';

const LOOK_TARGETS = ['Head', 'head', 'Robot', 'robot', 'Body', 'Character', 'Scene'];

function applyLookAt(app, nx, ny, isClick) {
  if (!app) return;
  try {
    app.setVariable('lookX', nx * 2);
    app.setVariable('lookY', -ny * 2);
    if (isClick) app.emitEvent('mouseDown');
  } catch {
    /* escena sin variables */
  }
  for (const name of LOOK_TARGETS) {
    const obj = app.findObjectByName?.(name);
    if (!obj?.rotation) continue;
    const strength = name.toLowerCase().includes('head') ? 1 : 0.55;
    obj.rotation.y = nx * strength;
    obj.rotation.x = ny * strength * 0.45;
    break;
  }
}

/**
 * Carga Spline vía runtime (sin react-spline) para capturar errores de buffer
 * sin tumbar toda la página.
 */
export function SplineScene({ scene, className = '', onSplineLoad, onError }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  const handlePointer = useCallback((clientX, clientY, isClick = false) => {
    const container = containerRef.current;
    const app = appRef.current;
    if (!container || !app) return;
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const nx = (clientX - rect.left) / rect.width - 0.5;
    const ny = (clientY - rect.top) / rect.height - 0.5;
    applyLookAt(app, nx, ny, isClick);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !scene) return undefined;

    let cancelled = false;
    let app = null;

    function resizeCanvas() {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      if (app?.setSize) {
        app.setSize(w, h);
      }
    }

    async function init() {
      try {
        app = new Application(canvas);
        resizeCanvas();
        await app.load(scene);
        if (cancelled) {
          app.dispose();
          return;
        }
        appRef.current = app;
        onSplineLoad?.(app);
      } catch (err) {
        if (!cancelled) {
          app?.dispose();
          appRef.current = null;
          onError?.(err);
        }
      }
    }

    init();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resizeCanvas) : null;
    ro?.observe(container);

    const onMove = (e) => handlePointer(e.clientX, e.clientY, false);
    const onDown = (e) => {
      handlePointer(e.clientX, e.clientY, true);
      container.setPointerCapture?.(e.pointerId);
    };
    container.addEventListener('pointermove', onMove, { passive: true });
    container.addEventListener('pointerdown', onDown);

    return () => {
      cancelled = true;
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerdown', onDown);
      ro?.disconnect();
      appRef.current = null;
      app?.dispose();
    };
  }, [scene, handlePointer, onSplineLoad, onError]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', touchAction: 'none' }}
      aria-hidden
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
