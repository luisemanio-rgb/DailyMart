// DailyMart BD — Mobile Bottom Navigation
window.MobileNav = (() => {
  const render = () => {
    const root = document.getElementById('mobile-nav-root');
    if (!root) return;
    const user = window.Store.getUser();
    root.innerHTML = `
    <nav class="mobile-bottom-nav fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden shadow-lg">
      <div class="flex items-center justify-around px-2 py-2">
        ${[
          { icon: '🏠', label: 'Home', path: '/' },
          { icon: '📦', label: 'Categories', path: '/categories' },
          { icon: '🔥', label: 'Deals', path: '/deals' },
          { icon: '❤️', label: 'Wishlist', path: '/wishlist' },
          { icon: '👤', label: user ? (user.name || 'User').split(' ')[0] : 'Sign In', path: user ? '/account' : '/login' },
        ].map(({ icon, label, path }) => `
          <a href="#${path}" data-path="${path}" class="mobile-nav-item flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-gray-500 hover:text-emerald-600 transition-colors">
            <span class="text-xl leading-none">${icon}</span>
            <span class="text-[10px] font-medium">${label}</span>
          </a>
        `).join('')}
        <button id="mobile-cart-btn" class="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-gray-500 hover:text-emerald-600 transition-colors">
          <div class="relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <span id="mobile-cart-badge" class="hidden absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"></span>
          </div>
          <span class="text-[10px] font-medium">Cart</span>
        </button>
      </div>
    </nav>
    <div class="h-16 md:hidden"></div>
    `;

    document.getElementById('mobile-cart-btn')?.addEventListener('click', () => {
      window.CartDrawer.open();
    });

    updateMobileCartBadge();
  };

  const update = (path) => {
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      const itemPath = item.getAttribute('data-path');
      const isActive = itemPath === path || (path !== '/' && path.startsWith(itemPath) && itemPath !== '/');
      item.classList.toggle('text-emerald-600', isActive && itemPath === path);
      item.classList.toggle('text-gray-500', !isActive || itemPath !== path);
    });
  };

  const updateMobileCartBadge = () => {
    const badge = document.getElementById('mobile-cart-badge');
    if (!badge) return;
    const count = window.Store.getCartCount();
    badge.textContent = count > 9 ? '9+' : count;
    if (count > 0) {
      badge.classList.remove('hidden');
      badge.classList.add('flex');
    } else {
      badge.classList.add('hidden');
      badge.classList.remove('flex');
    }
  };

  window.Store.subscribe(() => {
    updateMobileCartBadge();
    render();
  });

  return { render, update };
})();
