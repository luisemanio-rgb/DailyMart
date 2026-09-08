// DailyMart BD — Floating Mobile Bottom Navigation Dock
window.MobileNav = (() => {
  let currentActivePath = window.location.hash.slice(1) || '/';

  const getIcon = (name) => {
    if (window.Icons) {
      return window.Icons.render(name, 'w-5 h-5');
    }
    return '';
  };

  const navItems = [
    {
      id: 'nav-home',
      label: 'Home',
      path: '/',
      iconName: 'home'
    },
    {
      id: 'nav-categories',
      label: 'Categories',
      path: '/categories',
      iconName: 'grid'
    },
    {
      id: 'nav-wishlist',
      label: 'Wishlist',
      path: '/wishlist',
      iconName: 'heart'
    },
    {
      id: 'nav-cart',
      label: 'Cart',
      isButton: true,
      iconName: 'cart'
    },
    {
      id: 'nav-account',
      label: 'Account',
      path: '/account',
      authPath: '/login',
      iconName: 'user'
    }
  ];

  const render = () => {
    const root = document.getElementById('mobile-nav-root');
    if (!root) return;
    const user = window.Store.getUser();

    root.innerHTML = `
    <!-- Floating Mobile Pill Dock -->
    <div class="fixed bottom-3 left-4 right-4 z-50 md:hidden flex justify-center pointer-events-none">
      <nav class="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-xl rounded-full px-2.5 py-1.5 flex items-center justify-between gap-1 w-full max-w-sm transition-all duration-300">
        ${navItems.map(item => {
          const iconSvg = getIcon(item.iconName);
          if (item.isButton) {
            return `
              <button
                id="mobile-cart-btn"
                class="mobile-nav-item relative p-2.5 rounded-full text-[#667085] hover:text-[#087F5B] active:scale-95 transition-all flex items-center justify-center"
                title="Cart"
              >
                ${iconSvg}
                <span id="mobile-cart-badge" class="hidden absolute -top-0.5 -right-0.5 bg-[#FF7A18] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"></span>
              </button>
            `;
          }

          const targetPath = item.authPath ? (user ? item.path : item.authPath) : item.path;
          const isActive = currentActivePath === item.path || (item.path !== '/' && currentActivePath.startsWith(item.path));

          return `
            <a
              href="#${targetPath}"
              data-path="${item.path}"
              class="mobile-nav-item rounded-full transition-all duration-200 flex items-center justify-center ${isActive ? 'bg-[#087F5B] text-white px-3 py-1.5 shadow-xs font-semibold text-xs gap-1.5' : 'text-[#667085] hover:text-[#087F5B] p-2.5'}"
            >
              ${iconSvg}
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
        item.className = 'mobile-nav-item rounded-full transition-all duration-200 flex items-center justify-center bg-[#087F5B] text-white px-3 py-1.5 shadow-xs font-semibold text-xs gap-1.5';
        if (labelSpan) labelSpan.classList.remove('hidden');
      } else {
        item.className = 'mobile-nav-item rounded-full transition-all duration-200 flex items-center justify-center text-[#667085] hover:text-[#087F5B] p-2.5';
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
