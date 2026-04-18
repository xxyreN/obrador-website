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

  // ============================================
  //  CART DRAWER (Tienda demo)
  // ============================================
  const cart = { items: [] };

  function findItem(name) { return cart.items.find(i => i.name === name); }

  function renderCart() {
    const count = cart.items.reduce((s, i) => s + i.qty, 0);
    const subtotal = cart.items.reduce((s, i) => s + i.qty * i.price, 0);
    const shipping = subtotal >= 30 || subtotal === 0 ? 0 : 4.90;
    const total = subtotal + shipping;

    document.querySelectorAll('.cart-fab .count').forEach(e => e.textContent = count);

    const drawer = document.querySelector('.cart-drawer');
    if (!drawer) return;

    const itemsEl = drawer.querySelector('.cart-items');
    const isEn = document.documentElement.classList.contains('lang-en');
    if (cart.items.length === 0) {
      itemsEl.innerHTML = `<div class="cart-empty">${isEn ? 'Your cart is empty.' : 'Tu carrito está vacío.'}</div>`;
    } else {
      itemsEl.innerHTML = cart.items.map(i => `
        <div class="cart-item" data-name="${i.name.replace(/"/g, '&quot;')}">
          <div class="cart-item-img">${i.emoji || '📦'}</div>
          <div class="cart-item-info">
            <div class="name">${i.name}</div>
            <div class="price">€${i.price.toFixed(2)} / ud</div>
            <div class="cart-item-qty">
              <button onclick="changeQty('${i.name.replace(/'/g, "\\'")}', -1)" aria-label="menos">&minus;</button>
              <span class="n">${i.qty}</span>
              <button onclick="changeQty('${i.name.replace(/'/g, "\\'")}', 1)" aria-label="más">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeItem('${i.name.replace(/'/g, "\\'")}')" aria-label="quitar">×</button>
        </div>
      `).join('');
    }

    drawer.querySelector('.cart-subtotal').textContent = '€' + subtotal.toFixed(2);
    drawer.querySelector('.cart-shipping').textContent = shipping === 0 ? (isEn ? 'Free' : 'Gratis') : '€' + shipping.toFixed(2);
    drawer.querySelector('.cart-total').textContent = '€' + total.toFixed(2);
    drawer.querySelector('.cart-checkout').disabled = cart.items.length === 0;
  }

  window.addToCart = function (name, price, emoji) {
    const existing = findItem(name);
    if (existing) existing.qty++;
    else cart.items.push({ name, price, qty: 1, emoji: emoji || '📦' });
    renderCart();
    // Pulse the matching add-to-cart button without overwriting its innerHTML
    document.querySelectorAll('.add-to-cart').forEach(b => {
      if (b.dataset.name === name) {
        b.classList.add('just-added');
        setTimeout(() => b.classList.remove('just-added'), 900);
      }
    });
  };

  window.changeQty = function (name, delta) {
    const item = findItem(name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart.items = cart.items.filter(i => i.name !== name);
    renderCart();
  };

  window.removeItem = function (name) {
    cart.items = cart.items.filter(i => i.name !== name);
    renderCart();
  };

  window.toggleCart = function () {
    document.querySelector('.cart-drawer')?.classList.toggle('open');
    document.querySelector('.cart-backdrop')?.classList.toggle('open');
  };

  window.closeCart = function () {
    document.querySelector('.cart-drawer')?.classList.remove('open');
    document.querySelector('.cart-backdrop')?.classList.remove('open');
  };

  window.checkoutDemo = function () {
    const isEn = document.documentElement.classList.contains('lang-en');
    alert(isEn
      ? 'Checkout (demo)\n\nIn the real Tienda tier this opens Snipcart/Stripe with your shipping and payment info.\n\nYour cart persists until you complete the purchase.'
      : 'Checkout (demo)\n\nEn el tier Tienda real, esto abre Snipcart/Stripe con tus datos de envío y pago.\n\nEl carrito se mantiene hasta que finalizas la compra.');
  };

  window.accountDemo = function () {
    const isEn = document.documentElement.classList.contains('lang-en');
    alert(isEn
      ? 'Account (demo)\n\nIn the real Tienda tier: login via email/Google, view past orders, manage subscriptions (coffee / brunch boxes), edit shipping address.'
      : 'Mi cuenta (demo)\n\nEn el tier Tienda real: login por email/Google, ver pedidos pasados, gestionar suscripciones (café / brunch boxes), editar dirección de envío.');
  };

  // Inject cart drawer on DOM ready if cart FAB exists
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.querySelector('.cart-fab')) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'cart-backdrop';
    backdrop.onclick = window.closeCart;
    document.body.appendChild(backdrop);

    const drawer = document.createElement('aside');
    drawer.className = 'cart-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'Carrito');
    drawer.innerHTML = `
      <div class="cart-header">
        <h2><span class="es-only">Carrito</span><span class="en-only">Cart</span> <span class="cart-badge">Demo</span></h2>
        <button class="cart-close" onclick="closeCart()" aria-label="Cerrar">&times;</button>
      </div>
      <div class="cart-items"></div>
      <div class="cart-summary">
        <div class="line"><span><span class="es-only">Subtotal</span><span class="en-only">Subtotal</span></span><span class="cart-subtotal">€0.00</span></div>
        <div class="line"><span><span class="es-only">Envío</span><span class="en-only">Shipping</span> <em>(<span class="es-only">gratis &gt;€30</span><span class="en-only">free &gt;€30</span>)</em></span><span class="cart-shipping">Gratis</span></div>
        <div class="total"><span><span class="es-only">Total</span><span class="en-only">Total</span></span><span class="cart-total">€0.00</span></div>
        <button class="cart-checkout" onclick="checkoutDemo()"><span class="es-only">Proceder al checkout &rarr;</span><span class="en-only">Proceed to checkout &rarr;</span></button>
        <p class="cart-note"><span class="es-only">Demo · Snipcart + Stripe en el tier Tienda real</span><span class="en-only">Demo · Snipcart + Stripe in the real Tienda tier</span></p>
      </div>
    `;
    document.body.appendChild(drawer);
    renderCart();

    // Esc to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.closeCart();
    });
  });
})();
