/* ============================================
   OBRADOR.WEB — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Animations (Intersection Observer) ──
  const animElements = document.querySelectorAll('.anim-fade-up');
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
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
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

      // ba-before = antes (old site) overlay, shows LEFT portion
      // ba-after = después (mockup) background, shows RIGHT portion
      // inset(0 RIGHT% 0 0) — clips RIGHT% from the right, showing left portion
      // handle at 50% → clip 50% from right → left half visible (antes)
      // handle at 80% → clip 20% from right → 80% antes visible
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;

      // ANTES label (left side): fade when slider near left (antes shrinks)
      labelBefore.style.opacity = Math.min(1, pct / 20);
      // DESPUÉS label (right side): fade when slider near right (después shrinks)
      labelAfter.style.opacity = Math.min(1, (100 - pct) / 20);
    }

    // Mouse events
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

    // Touch events
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
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
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
