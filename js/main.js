/* ══════════════════════════════════════════════════════════════
   OBRADOR.WEB · v2.1 cargado · 2026-05-13
   Preloader · cursor · scroll progress · tilt · magnetic · B/A
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const isMobile = window.matchMedia('(max-width: 1024px)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ══ PAGE LOAD (no preloader, just trigger reveals immediately) ═ */
  document.body.classList.add('is-loaded-page');


  /* ══ SCROLL PROGRESS ═════════════════════════════════════════ */
  const progress = $('#scrollProgress');
  if (progress) {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = pct + '%';
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
  }


  /* ══ NAVBAR SHADOW ON SCROLL ═════════════════════════════════ */
  const navbar = $('#navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  /* ══ SMOOTH SCROLL ANCHORS ═══════════════════════════════════ */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top: y, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  });


  /* ══ BEFORE / AFTER SLIDER ═══════════════════════════════════ */
  $$('[data-ba]').forEach((ba) => {
    const frame = ba.querySelector('.ba-frame');
    const before = ba.querySelector('.ba-before');
    const handle = ba.querySelector('.ba-handle');
    if (!frame || !before || !handle) return;

    let dragging = false;
    const setPos = (clientX) => {
      const rect = frame.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(rect.width, x));
      const pct = (x / rect.width) * 100;
      before.style.width = pct + '%';
      handle.style.left = pct + '%';
    };

    frame.addEventListener('mousedown', (e) => { e.preventDefault(); dragging = true; setPos(e.clientX); });
    window.addEventListener('mousemove', (e) => { if (dragging) setPos(e.clientX); });
    window.addEventListener('mouseup', () => { dragging = false; });

    frame.addEventListener('touchstart', (e) => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', (e) => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', () => { dragging = false; });

    // initial position
    setTimeout(() => {
      const rect = frame.getBoundingClientRect();
      if (rect.width) setPos(rect.left + rect.width / 2);
    }, 50);
  });


  /* ══ TILT cards with glow follow ═════════════════════════════ */
  if (!isMobile && !reducedMotion) {
    $$('.tilt').forEach((card) => {
      const glow = card.querySelector('.plan-glow');
      let raf = null;

      card.addEventListener('mousemove', (e) => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          const rotX = (y - 0.5) * -8;
          const rotY = (x - 0.5) * 8;
          card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
          if (glow) {
            glow.style.setProperty('--mouse-x', `${x * 100}%`);
            glow.style.setProperty('--mouse-y', `${y * 100}%`);
          }
        });
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }


  /* ══ MAGNETIC BUTTONS ════════════════════════════════════════ */
  if (!isMobile && !reducedMotion) {
    $$('.magnetic').forEach((btn) => {
      let raf = null;
      const strength = btn.classList.contains('nav-cta') ? 0.25 : 0.35;

      btn.addEventListener('mousemove', (e) => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }


  /* ══ REVEAL ON SCROLL ════════════════════════════════════════ */
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    $$('.reveal').forEach((el) => reveal.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-visible'));
  }


  /* ══ HERO PARALLAX ═══════════════════════════════════════════ */
  if (!reducedMotion) {
    const parallaxLayers = $$('[data-parallax]');
    if (parallaxLayers.length) {
      let scrollY = 0;
      let ticking = false;
      const onScrollPara = () => {
        scrollY = window.scrollY;
        if (!ticking) {
          requestAnimationFrame(() => {
            parallaxLayers.forEach((layer) => {
              const speed = parseFloat(layer.dataset.parallax) || 0.2;
              layer.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
            });
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', onScrollPara, { passive: true });
    }
  }


  /* ══ LANGUAGE TOGGLE ═════════════════════════════════════════ */
  const langButton = $('#langToggle');
  if (langButton) {
    function applyLang(lang) {
      const isEN = lang === 'en';
      document.documentElement.lang = isEN ? 'en' : 'es';
      document.body.classList.toggle('lang-en', isEN);

      $$('[data-en]').forEach((el) => {
        if (!el.dataset.es) el.dataset.es = el.innerHTML;
        el.innerHTML = isEN ? el.dataset.en : el.dataset.es;
      });

      $$('[data-en-placeholder]').forEach((el) => {
        if (!el.dataset.esPlaceholder) el.dataset.esPlaceholder = el.placeholder;
        el.placeholder = isEN ? el.dataset.enPlaceholder : el.dataset.esPlaceholder;
      });

      try { localStorage.setItem('obrador-lang', lang); } catch (_) {}
    }

    let stored = 'es';
    try { stored = localStorage.getItem('obrador-lang') || 'es'; } catch (_) {}
    applyLang(stored);

    langButton.addEventListener('click', () => {
      const next = document.body.classList.contains('lang-en') ? 'es' : 'en';
      applyLang(next);
    });
  }


  /* ══ FOOTER LIVE CLOCK ═══════════════════════════════════════ */
  const footerTime = $('#footerTime');
  if (footerTime) {
    const fmt = new Intl.DateTimeFormat('es-ES', {
      timeZone: 'Europe/Madrid',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => { footerTime.textContent = 'MADRID · ' + fmt.format(new Date()); };
    tick();
    setInterval(tick, 1000);
  }


  /* ══ MOBILE BURGER ═══════════════════════════════════════════ */
  const burger = $('#navBurger');
  const navLinks = $('#navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }


  /* ══ HERO META COUNT-UP ══════════════════════════════════════ */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/(\d+)/);
        if (!match) { counterObserver.unobserve(el); return; }
        const target = parseInt(match[1], 10);
        const prefix = text.slice(0, match.index);
        const suffix = text.slice(match.index + match[0].length);
        const dur = 1400;
        const start = performance.now();

        const step = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const ease = 1 - Math.pow(1 - t, 3);
          const cur = Math.floor(ease * target);
          el.textContent = prefix + cur + suffix;
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = text;
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    $$('.hero-meta-num').forEach((el) => counterObserver.observe(el));
  }


  /* ══ TYPE-AWARE ACCESSIBILITY ════════════════════════════════ */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      $$('details[open]').forEach((d) => d.removeAttribute('open'));
      const navLinksEl = $('#navLinks');
      const burgerEl = $('#navBurger');
      if (navLinksEl && navLinksEl.classList.contains('is-open')) {
        navLinksEl.classList.remove('is-open');
        if (burgerEl) burgerEl.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }
  });

})();
