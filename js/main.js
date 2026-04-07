/* ============================================
   OBRADOR.WEB — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Animations (Intersection Observer) ──
  const animElements = document.querySelectorAll('.anim-fade-up, .anim-slide-left');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animElements.forEach(el => observer.observe(el));

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Parallax on scroll ──
  const coffeeRings = document.querySelectorAll('.coffee-ring');
  const steamContainer = document.querySelector('.steam-container');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    coffeeRings.forEach(ring => {
      const speed = 0.03;
      const rect = ring.parentElement.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2) * speed;
      ring.style.transform = `translateY(${offset}px) rotate(${offset * 0.5}deg)`;
    });

    if (steamContainer) {
      steamContainer.style.transform = `translateY(${scrollY * -0.08}px)`;
    }
  }, { passive: true });

  // ── 3D Tilt effect on cards ──
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateY(-4px)`;
      card.style.boxShadow = `${x * -10}px ${12 + y * 10}px 40px rgba(26, 23, 21, 0.12)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // ── Animated price counters ──
  const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        // Extract the number (e.g., "€650" → 650, "€1.000" → 1000, "€1.500" → 1500)
        const match = text.match(/[\d.]+/);
        if (!match) return;
        const targetNum = parseInt(match[0].replace('.', ''), 10);
        const prefix = '€';
        const duration = 1200;
        const start = performance.now();

        function animate(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out quart
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = Math.round(targetNum * eased);
          // Format with dots for thousands
          el.textContent = prefix + current.toLocaleString('es-ES');
          if (progress < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
        priceObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.plan-amount').forEach(el => priceObserver.observe(el));

  // ── Magnetic buttons ──
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });

  // ── Stat counter animation ──
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1000;
        const start = performance.now();

        function animate(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

  // ── Language Toggle ──
  const langToggle = document.getElementById('langToggle');
  let currentLang = 'es';

  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    document.documentElement.lang = currentLang;

    // Update toggle UI
    langToggle.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('lang-active', opt.dataset.lang === currentLang);
    });

    // Swap all text with data-en attributes
    document.querySelectorAll('[data-en]').forEach(el => {
      if (!el.dataset.es) {
        // Store original Spanish on first switch
        el.dataset.es = el.innerHTML;
      }
      el.innerHTML = currentLang === 'en' ? el.dataset.en : el.dataset.es;
    });

    // Swap placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
      if (!el.dataset.esPlaceholder) {
        el.dataset.esPlaceholder = el.placeholder;
      }
      el.placeholder = currentLang === 'en' ? el.dataset.enPlaceholder : el.dataset.esPlaceholder;
    });

    // Update page title
    document.title = currentLang === 'en'
      ? 'Obrador — Websites for cafés in Madrid'
      : 'Obrador — Webs para cafeterías en Madrid';
  });

  // ── Before/After Sliders ──
  document.querySelectorAll('.ba-slider').forEach(initSlider);

  function initSlider(slider) {
    const wrapper = slider.querySelector('.ba-wrapper');
    const before = slider.querySelector('.ba-before');
    const handle = slider.querySelector('.ba-handle');
    const labelBefore = slider.querySelector('.ba-label-before');
    const labelAfter = slider.querySelector('.ba-label-after');
    let isDragging = false;

    function updatePosition(x) {
      const rect = wrapper.getBoundingClientRect();
      let pos = (x - rect.left) / rect.width;
      pos = Math.max(0.02, Math.min(0.98, pos));
      const pct = pos * 100;

      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;

      labelBefore.style.opacity = Math.min(1, pct / 20);
      labelAfter.style.opacity = Math.min(1, (100 - pct) / 20);
    }

    wrapper.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDragging = true;
      updatePosition(e.clientX);
      wrapper.style.cursor = 'ew-resize';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      wrapper.style.cursor = '';
    });

    wrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      updatePosition(e.touches[0].clientX);
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    }, { passive: false });

    wrapper.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Form submission (Netlify) ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch('https://formspree.io/f/xkopydnb', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });

        if (response.ok) {
          btn.textContent = 'Enviado';
          btn.style.background = 'var(--copper)';
          form.reset();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        btn.textContent = 'Error — intenta de nuevo';
        btn.disabled = false;
        setTimeout(() => { btn.textContent = originalText; }, 3000);
      }
    });
  }

});
