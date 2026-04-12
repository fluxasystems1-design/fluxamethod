'use strict';

/**
 * Vanilla runtime extracted from legacy script.js for Next.js client mount.
 * loadThreeScript() + mountFluxaLanding() + mountFluxaThree()
 */

export function loadThreeScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    if (window.THREE) {
      resolve();
      return;
    }
    var existing = document.querySelector('script[data-fluxa-three="1"]');
    if (existing) {
      if (window.THREE) {
        resolve();
        return;
      }
      existing.addEventListener('load', function () {
        resolve();
      });
      existing.addEventListener('error', function () {
        reject(new Error('Three.js load error'));
      });
      return;
    }
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.dataset.fluxaThree = '1';
    script.onload = function () {
      resolve();
    };
    script.onerror = function () {
      reject(new Error('Three.js load error'));
    };
    document.head.appendChild(script);
  });
}

export function mountFluxaLanding() {
  initParticlesNavbarScrollReveal();
  bootUi();
}

export function mountFluxaThree() {
  initThreeJS();
}

/**
 * Partículas tipo “cielo estrellado” en canvas fijo (viewport), home /.
 * Blanco + violeta suave, deriva lenta y parpadeo sutil (mismo espíritu que el hero antiguo).
 */
function initGlobalStarfield(canvas, reducedMotion) {
  if (!canvas || typeof canvas.getContext !== 'function') return;
  if (reducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var particles = [];
  var running = false;
  var rafId = 0;
  var w = 0;
  var h = 0;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var twinkleEpoch =
    typeof performance !== 'undefined' ? performance.now() : Date.now();

  function particleCap(vw, vh) {
    var area = vw * vh;
    var n = Math.floor(area * 0.000065);
    if (vw < 400) return Math.min(n, 52);
    if (vw < 768) return Math.min(n, 78);
    if (vw < 1200) return Math.min(n, 118);
    return Math.min(n, 155);
  }

  function resize() {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(1, Math.floor(vw * dpr));
    h = Math.max(1, Math.floor(vh * dpr));
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = vw + 'px';
    canvas.style.height = vh + 'px';

    var count = particleCap(vw, vh);
    particles = [];
    var i;
    for (i = 0; i < count; i++) {
      var isWhite = Math.random() > 0.38;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16 * dpr,
        vy: (Math.random() - 0.5) * 0.16 * dpr,
        r: (Math.random() * 1.25 + 0.35) * dpr,
        isWhite: isWhite,
        phase: Math.random() * Math.PI * 2,
        tw: 0.35 + Math.random() * 0.9,
      });
    }
  }

  function drawFrame() {
    var now =
      typeof performance !== 'undefined' ? performance.now() : Date.now();
    var t = (now - twinkleEpoch) * 0.001;
    ctx.clearRect(0, 0, w, h);
    var i;
    for (i = 0; i < particles.length; i++) {
      var p = particles[i];
      var twinkle = 0.45 + 0.55 * Math.sin(t * p.tw + p.phase);
      ctx.globalAlpha = 0.14 + twinkle * 0.38;
      ctx.fillStyle = p.isWhite ? '#f8fafc' : '#d8b4fe';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -3) p.x = w + 3;
      if (p.x > w + 3) p.x = -3;
      if (p.y < -3) p.y = h + 3;
      if (p.y > h + 3) p.y = -3;
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    if (!running) return;
    drawFrame();
    rafId = window.requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = window.requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  function onVisibility() {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  }

  resize();
  window.addEventListener(
    'resize',
    function () {
      resize();
    },
    { passive: true }
  );
  document.addEventListener('visibilitychange', onVisibility);

  if (!document.hidden) {
    start();
  }
}

function initParticlesNavbarScrollReveal() {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var globalStarCanvas = document.getElementById('fluxa-global-particles');
  var canvas = document.getElementById('hero-particles');
  var scrollBtn = document.getElementById('btn-como-funciona');
  var comoSection = document.getElementById('como-funciona');
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 50) {
          navbar.style.background = 'rgba(5, 2, 10, 0.5)';
          navbar.style.borderBottomColor = 'rgba(168, 85, 247, 0.28)';
        } else {
          navbar.style.background = 'rgba(5, 2, 10, 0.36)';
          navbar.style.borderBottomColor = 'rgba(168, 85, 247, 0.18)';
        }
      },
      { passive: true }
    );
  }

  function scrollToComoFunciona() {
    if (!comoSection) return;
    var behavior = reducedMotion ? 'auto' : 'smooth';
    comoSection.scrollIntoView({ behavior: behavior, block: 'start' });
  }

  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      scrollToComoFunciona();
    });
  }

  var revealSections = document.querySelectorAll('.section--reveal');
  if (revealSections.length) {
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      revealSections.forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      try {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
        );
        revealSections.forEach(function (el) {
          observer.observe(el);
        });
      } catch (err) {
        revealSections.forEach(function (el) {
          el.classList.add('is-visible');
        });
      }
    }
  }

  if (globalStarCanvas) {
    initGlobalStarfield(globalStarCanvas, reducedMotion);
    return;
  }

  if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) {
    if (canvas) {
      canvas.style.display = 'none';
    }
    return;
  }

  if (!canvas || typeof canvas.getContext !== 'function' || reducedMotion) {
    if (canvas && reducedMotion) {
      canvas.style.display = 'none';
    }
    return;
  }

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var particles = [];
  var running = false;
  var rafId = 0;
  var w = 0;
  var h = 0;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var COLOR = '#A855F7';
  var OPACITY = 0.25;
  var COUNT_BASE = 0.00015;

  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(1, Math.floor(rect.width * dpr));
    h = Math.max(1, Math.floor(rect.height * dpr));
    canvas.width = w;
    canvas.height = h;
    var count = Math.max(24, Math.floor(rect.width * rect.height * COUNT_BASE));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22 * dpr,
        vy: (Math.random() - 0.5) * 0.22 * dpr,
        r: (Math.random() * 1.1 + 0.5) * dpr,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = COLOR;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.globalAlpha = OPACITY;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -2) p.x = w + 2;
      if (p.x > w + 2) p.x = -2;
      if (p.y < -2) p.y = h + 2;
      if (p.y > h + 2) p.y = -2;
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    if (!running) return;
    draw();
    rafId = window.requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    running = true;
    loop();
  }

  function stop() {
    running = false;
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
  }

  function onVisibility() {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  }

  resize();
  window.addEventListener('resize', function () {
    resize();
  });
  document.addEventListener('visibilitychange', onVisibility);

  if (!document.hidden) {
    start();
  }
}

function webglAvailable() {
  try {
    var c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

function showWebglFallback(canvasEl, imgEl) {
  if (canvasEl) {
    canvasEl.classList.add('is-webgl-hidden');
  }
  if (imgEl) {
    imgEl.classList.add('is-fallback-visible');
  }
}

function initThreeJS() {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function isMobile() {
    return window.innerWidth < 768;
  }

  if (typeof window.THREE === 'undefined') {
    showWebglFallback(document.getElementById('diferenciacion-3d'), document.getElementById('chess-king-fallback'));
    var ctaNoLib = document.getElementById('cta-3d');
    if (ctaNoLib) ctaNoLib.classList.add('is-webgl-hidden');
    return;
  }

  var THREE = window.THREE;

  if (!webglAvailable()) {
    showWebglFallback(document.getElementById('diferenciacion-3d'), document.getElementById('chess-king-fallback'));
    var ctaNoGl = document.getElementById('cta-3d');
    if (ctaNoGl) ctaNoGl.classList.add('is-webgl-hidden');
    return;
  }

  var rafDiff = 0;
  var rafCta = 0;
  var fnDiff = null;
  var fnCta = null;

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (rafDiff) {
        window.cancelAnimationFrame(rafDiff);
        rafDiff = 0;
      }
      if (rafCta) {
        window.cancelAnimationFrame(rafCta);
        rafCta = 0;
      }
    } else {
      if (fnDiff && !rafDiff) rafDiff = window.requestAnimationFrame(fnDiff);
      if (fnCta && !rafCta) rafCta = window.requestAnimationFrame(fnCta);
    }
  });

  function initDiferenciacion3d() {
    var canvasEl = document.getElementById('diferenciacion-3d');
    var fallbackImg = document.getElementById('chess-king-fallback');
    if (!canvasEl) return;

    var scene;
    var camera;
    var renderer;
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 6;
      renderer = new THREE.WebGLRenderer({
        canvas: canvasEl,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    } catch (e) {
      showWebglFallback(canvasEl, fallbackImg);
      return;
    }

    var ambient = new THREE.AmbientLight(0xa855f7, 0.4);
    scene.add(ambient);
    var pl = new THREE.PointLight(0xffffff, 1.5, 100);
    pl.position.set(4, 4, 6);
    scene.add(pl);

    var icoGeo = new THREE.IcosahedronGeometry(1.5, 0);
    var icoMat = new THREE.MeshPhongMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.7,
      shininess: 200,
    });
    var crystal = new THREE.Mesh(icoGeo, icoMat);
    scene.add(crystal);

    var wfGeo = new THREE.WireframeGeometry(icoGeo);
    var wfMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });
    var wireLines = new THREE.LineSegments(wfGeo, wfMat);
    crystal.add(wireLines);

    var pCount = isMobile() ? 48 : 80;
    var pPos = new Float32Array(pCount * 3);
    for (var i = 0; i < pCount; i++) {
      var u = Math.random();
      var v = Math.random();
      var phi = Math.acos(2 * u - 1);
      var theta = 2 * Math.PI * v;
      var r = 3;
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    var pMat = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    var points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    function sizeDiff() {
      var sz = isMobile() ? 260 : 350;
      renderer.setSize(sz, sz, false);
      canvasEl.style.width = sz + 'px';
      canvasEl.style.height = sz + 'px';
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }

    sizeDiff();
    if (typeof ResizeObserver !== 'undefined') {
      try {
        var roDiff = new ResizeObserver(function () {
          sizeDiff();
        });
        var wrap = canvasEl.parentElement;
        if (wrap) roDiff.observe(wrap);
      } catch (eRo) {
        /* window resize only */
      }
    }
    window.addEventListener('resize', function () {
      sizeDiff();
    });

    var t0 = performance.now();
    fnDiff = function animateDiff(now) {
      if (document.hidden) {
        rafDiff = 0;
        return;
      }

      var t = ((now != null ? now : performance.now()) - t0) * 0.001;
      var baseY = Math.sin(t * 1.2) * 0.3;

      if (!reducedMotion) {
        crystal.rotation.x += 0.004;
        crystal.rotation.y += 0.006;
        crystal.position.y = baseY;
        points.rotation.y = t * 0.08;
      } else {
        crystal.position.y = 0;
      }

      renderer.render(scene, camera);
      rafDiff = window.requestAnimationFrame(fnDiff);
    };

    if (!document.hidden) {
      rafDiff = window.requestAnimationFrame(fnDiff);
    }
  }

  function initCta3d() {
    var canvasEl = document.getElementById('cta-3d');
    var section = document.getElementById('cta-final');
    if (!canvasEl || !section) return;

    var scene;
    var camera;
    var renderer;
    try {
      scene = new THREE.Scene();
      var w0 = section.clientWidth || 1;
      var h0 = section.clientHeight || 1;
      camera = new THREE.PerspectiveCamera(55, w0 / h0, 0.1, 200);
      camera.position.set(0, 0, 18);
      camera.lookAt(0, 0, 0);
      renderer = new THREE.WebGLRenderer({
        canvas: canvasEl,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    } catch (e) {
      canvasEl.classList.add('is-webgl-hidden');
      return;
    }

    var n = isMobile() ? 80 : 150;
    var positions = new Float32Array(n * 3);
    var speeds = new Float32Array(n);
    for (var i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speeds[i] = 0.01 + Math.random() * 0.02;
    }

    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    if (THREE.DynamicDrawUsage !== undefined) {
      geo.attributes.position.setUsage(THREE.DynamicDrawUsage);
    }

    var mat = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.08,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    });

    var pts = new THREE.Points(geo, mat);
    scene.add(pts);

    function fitCta() {
      var w = section.clientWidth;
      var h = Math.max(section.clientHeight, 1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    fitCta();

    if (typeof ResizeObserver !== 'undefined') {
      try {
        var roCta = new ResizeObserver(function () {
          fitCta();
        });
        roCta.observe(section);
      } catch (eRo) {
        /* window resize only */
      }
    }
    window.addEventListener('resize', fitCta);

    var posAttr = geo.attributes.position;
    var arr = posAttr.array;

    fnCta = function animateCta() {
      if (document.hidden) {
        rafCta = 0;
        return;
      }

      if (!reducedMotion) {
        for (var i = 0; i < n; i++) {
          var iy = i * 3 + 1;
          arr[iy] += speeds[i];
          if (arr[iy] > 5) {
            arr[iy] = -5;
            arr[i * 3] = (Math.random() - 0.5) * 20;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
          }
        }
        posAttr.needsUpdate = true;
      } else {
        mat.opacity = 0.35;
      }

      renderer.render(scene, camera);
      rafCta = window.requestAnimationFrame(fnCta);
    };

    if (!document.hidden) {
      rafCta = window.requestAnimationFrame(fnCta);
    }
  }

  if (isMobile()) {
    var ctaMobileOff = document.getElementById('cta-3d');
    if (ctaMobileOff) ctaMobileOff.classList.add('is-webgl-hidden');
  } else {
    initCta3d();
  }
  initDiferenciacion3d();
}

function initFAQ() {
  var faqRoot = document.getElementById('faq');
  if (!faqRoot) return;
  var items = faqRoot.querySelectorAll('.faq__item');
  function closeAllPanels() {
    items.forEach(function (other) {
      other.classList.remove('faq__item--open');
      var ob = other.querySelector('.faq__question');
      var opanel = other.querySelector('.faq__panel');
      if (ob) ob.setAttribute('aria-expanded', 'false');
      if (opanel) opanel.style.maxHeight = '';
    });
  }
  items.forEach(function (item) {
    var btn = item.querySelector('.faq__question');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('faq__item--open');
      closeAllPanels();
      if (!isOpen) {
        item.classList.add('faq__item--open');
        btn.setAttribute('aria-expanded', 'true');
        var panel = item.querySelector('.faq__panel');
        if (panel) {
          panel.style.maxHeight = panel.scrollHeight + 32 + 'px';
        }
      }
    });
  });
  window.addEventListener(
    'resize',
    function () {
      var openItem = faqRoot.querySelector('.faq__item--open .faq__panel');
      if (openItem) {
        openItem.style.maxHeight = openItem.scrollHeight + 32 + 'px';
      }
    },
    { passive: true }
  );
}

function initPhoneMockup() {
  var mockupEl = document.getElementById('demos-mockup');
  var slides = mockupEl ? mockupEl.querySelectorAll('.phone-slide') : document.querySelectorAll('.phone-slide');
  var segs = mockupEl ? mockupEl.querySelectorAll('.mockup-seg') : document.querySelectorAll('.mockup-seg');
  var prevBtns = mockupEl ? mockupEl.querySelectorAll('.mockup-arrow--prev') : document.querySelectorAll('.mockup-arrow--prev');
  var nextBtns = mockupEl ? mockupEl.querySelectorAll('.mockup-arrow--next') : document.querySelectorAll('.mockup-arrow--next');

  if (!slides.length) return;

  var current = 0;

  function goTo(index) {
    if (slides[current]) slides[current].classList.remove('active');
    if (segs[current]) {
      segs[current].classList.remove('active');
      segs[current].removeAttribute('aria-current');
    }
    current = (index + slides.length) % slides.length;
    if (slides[current]) slides[current].classList.add('active');
    if (segs[current]) {
      segs[current].classList.add('active');
      segs[current].setAttribute('aria-current', 'true');
    }
  }

  prevBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      goTo(current - 1);
    });
  });

  nextBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      goTo(current + 1);
    });
  });

  for (var i = 0; i < segs.length; i++) {
    (function (idx) {
      segs[idx].addEventListener('click', function () {
        goTo(idx);
      });
    })(i);
  }
}

function bootUi() {
  initPhoneMockup();
  initFAQ();
}
