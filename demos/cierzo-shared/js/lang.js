(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem('cierzo-lang');
  if (saved === 'en') root.classList.add('lang-en');

  function syncLangButtons() {
    const isEn = root.classList.contains('lang-en');
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === (isEn ? 'en' : 'es'));
    });
  }

  function setLang(lang) {
    if (lang === 'en') root.classList.add('lang-en'); else root.classList.remove('lang-en');
    localStorage.setItem('cierzo-lang', lang);
    syncLangButtons();
  }

  document.addEventListener('click', e => {
    const langBtn = e.target.closest('.lang-toggle button');
    if (langBtn) { setLang(langBtn.dataset.lang); return; }
    if (e.target.closest('.nav-burger')) {
      e.preventDefault();
      document.querySelector('.mobile-menu')?.classList.toggle('open');
    } else if (e.target.closest('.mobile-menu a')) {
      document.querySelector('.mobile-menu')?.classList.remove('open');
    }
  });

  function initReveal() {
    const selectors = [
      '.manifesto-title', '.manifesto-body', '.manifesto-stats',
      '.trio-head > div', '.trio-note', '.trio-card',
      '.locations-head', '.loc-card',
      '.contact-info', '.contact-map',
      '.cultura-program', '.cultura-head',
      '.carta-section-head', '.item',
      '.tienda-head', '.product', '.tienda-filters'
    ];
    const els = document.querySelectorAll(selectors.join(','));
    els.forEach(el => el.classList.add('reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }

  function ready() { document.body.classList.add('ready'); }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(ready);
    setTimeout(ready, 800);
  } else setTimeout(ready, 200);

  document.addEventListener('DOMContentLoaded', function () {
    syncLangButtons();
    initReveal();
  });

  // Tienda — cart state (demo only, no real checkout)
  const cart = { items: [] };
  window.addToCart = function (name, price) {
    cart.items.push({ name, price });
    const fab = document.querySelector('.cart-fab .count');
    if (fab) fab.textContent = cart.items.length;
    const btns = document.querySelectorAll('.add-to-cart');
    btns.forEach(b => {
      if (b.dataset.name === name) {
        const orig = b.textContent;
        b.textContent = '✓ Añadido';
        setTimeout(() => { b.textContent = orig; }, 1500);
      }
    });
  };
  window.toggleCart = function () {
    alert('Demo Snipcart: ' + cart.items.length + ' producto(s) · Total: €' +
      cart.items.reduce((s, i) => s + i.price, 0).toFixed(2) +
      '\n\n(En el tier Tienda real, esto abre el checkout de Snipcart/Stripe)');
  };
})();
