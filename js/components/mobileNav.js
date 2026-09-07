// DailyMart BD — Floating Mobile Bottom Navigation Dock (Matching Reference Image 4)
window.MobileNav = (() => {
  let currentActivePath = window.location.hash.slice(1) || '/';

  const navItems = [
    {
      id: 'nav-home',
      label: 'Home',
      path: '/',
      svg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
    },
    {
      id: 'nav-categories',
      label: 'Category',
      path: '/categories',
      svg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>'
    },
    {
      id: 'nav-wishlist',
      label: 'Wishlist',
      path: '/wishlist',
      svg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>'
    },
    {
      id: 'nav-cart',
      label: 'Cart',
      isButton: true,
      svg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>'
    },
    {
      id: 'nav-account',
      label: 'Me',
      path: '/account',
      authPath: '/login',
      svg: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>'
    }
  ];

  const render = () => {
    const root = document.getElementById('mobile-nav-root');
    if (!root) return;
    const user = window.Store.getUser();

    root.innerHTML = `
    <!-- Floating Mobile Pill Dock (Reference Image 4) -->
    <div class="fixed bottom-3 left-4 right-4 z-50 md:hidden flex justify-center pointer-events-none">
      <nav class="pointer-events-auto bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-2xl rounded-full px-3 py-1.5 flex items-center justify-between gap-1 w-full max-w-sm transition-all duration-300">
        ${navItems.map(item => {
          if (item.isButton) {
            return `
              <button
                id="mobile-cart-btn"
                class="mobile-nav-item relative p-2.5 rounded-full text-gray-500 hover:text-gray-900 active:scale-95 transition-all flex items-center justify-center"
                title="Cart"
              >
                ${item.svg}
                <span id="mobile-cart-badge" class="hidden absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"></span>
              </button>
            `;
          }

          const targetPath = item.authPath ? (user ? item.path : item.authPath) : item.path;
          const isActive = currentActivePath === item.path || (item.path !== '/' && currentActivePath.startsWith(item.path));

          return `
            <a
              href="#${targetPath}"
              data-path="${item.path}"
              class="mobile-nav-item rounded-full transition-all duration-300 flex items-center justify-center ${isActive ? 'bg-gray-900 text-white px-3.5 py-2 shadow-sm font-medium text-xs gap-1.5' : 'text-gray-500 hover:text-gray-900 p-2.5'}"
            >
              ${item.svg}
              <span class="${isActive ? 'block' : 'hidden'} text-xs font-semibold leading-none">${item.label}</span>
            </a>
          `;
        }).join('')}
      </nav>
    </div>
    <div class="h-20 md:hidden"></div>
    `;

    document.getElementById('mobile-cart-btn')?.addEventListener('click', () => {
      window.CartDrawer.open();
    });

    updateMobileCartBadge();
  };

  const update = (path) => {
    currentActivePath = path;
    const items = document.querySelectorAll('.mobile-nav-item[data-path]');
    items.forEach(item => {
      const itemPath = item.getAttribute('data-path');
      const labelSpan = item.querySelector('span');
      const isActive = itemPath === path || (itemPath !== '/' && path.startsWith(itemPath));

      if (isActive) {
        item.className = 'mobile-nav-item rounded-full transition-all duration-300 flex items-center justify-center bg-gray-900 text-white px-3.5 py-2 shadow-sm font-medium text-xs gap-1.5';
        if (labelSpan) labelSpan.classList.remove('hidden');
      } else {
        item.className = 'mobile-nav-item rounded-full transition-all duration-300 flex items-center justify-center text-gray-500 hover:text-gray-900 p-2.5';
        if (labelSpan) labelSpan.classList.add('hidden');
      }
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
  });

  return { render, update };
})();
