'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// import PhoneMockup from '@/components/PhoneMockup';
import FluxaHero from '@/components/FluxaHero';
import FluxaSistemaPillars from '@/components/FluxaSistemaPillars';
import FluxaMainSections from '@/components/FluxaMainSections';
import { loadThreeScript, mountFluxaLanding, mountFluxaThree } from '@/lib/fluxaClientRuntime';

// Demos del mockup móvil — descomentar junto con PhoneMockup más abajo
// const demoSlides = [
//   { src: '/demos/veterinaria.html', title: 'PetCare Vet' },
//   { src: '/demos/peluqueria.html', title: 'GlowCuts Studio' },
//   { src: '/demos/creatina.html', title: 'ProForce Nutrition' },
// ];

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add('fluxa-home-body');

    mountFluxaLanding();

    var cancelled = false;
    loadThreeScript()
      .then(function () {
        if (!cancelled) mountFluxaThree();
      })
      .catch(function () {
        if (!cancelled) mountFluxaThree();
      });

    return function () {
      cancelled = true;
      document.body.classList.remove('fluxa-home-body');
    };
  }, []);

  return (
    <div className="fluxa-home-shell">
      <canvas id="fluxa-global-particles" className="fluxa-global-particles" aria-hidden="true" />
      <Navbar />
      <FluxaHero />
      <FluxaSistemaPillars />
      {/* PhoneMockup: sección “prueba visual” + teléfono — descomentar import, demoSlides y esta línea para reactivar */}
      {/* <PhoneMockup slides={demoSlides} /> */}
      <FluxaMainSections />
      <Footer />
    </div>
  );
}
