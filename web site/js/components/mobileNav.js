// DailyMart BD — Docked Mobile Bottom Navigation Bar
window.MobileNav = (() => {
  let currentActivePath = window.location.hash.slice(1) || '/';

  const getIcon = (name, isActive) => {
    const cls = isActive ? 'text-[#007d83] w-5 h-5' : 'text-[#667085] w-5 h-5';
    if (window.Icons) {
      return window.Icons.render(name, cls, 20);
    }
    return '';
  };

  const navItems = [
    { id: 'nav-home', label: 'Home', path: '/', iconName: 'home' },
    { id: 'nav-categories', label: 'Categories', path: '/categories', iconName: 'grid' },
    { id: 'nav-wishlist', label: 'Wishlist', path: '/wishlist', iconName: 'heart' },
    { id: 'nav-cart', label: 'Cart', isButton: true, iconName: 'cart' },
    { id: 'nav-account', label: 'Account', path: '/account', authPath: '/login', iconName: 'user' }
  ];

  const render = () => {
    const root = document.getElementById('mobile-nav-root');
    if (!root) return;
    const user = window.Store.getUser();

    root.innerHTML = `
    <!-- Docked Mobile Bottom Navigation Bar -->
    <div id="mobile-bottom-bar" class="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-[#93e2e4]/50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <nav class="flex items-center justify-around h-14 max-w-lg mx-auto px-1">
        ${navItems.map(item => {
          const targetPath = item.authPath ? (user ? item.path : item.authPath) : item.path;
          const isActive = !item.isButton && (currentActivePath === item.path || (item.path !== '/' && (currentActivePath.startsWith(item.path) || (item.id === 'nav-categories' && currentActivePath.startsWith('/category')))));
          const iconSvg = getIcon(item.iconName, isActive);

          if (item.isButton) {
            return `
              <button
                id="mobile-cart-btn"
                class="mobile-nav-item flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors relative active:scale-95 text-[#667085] hover:text-[#007d83]"
                title="Cart"
              >
                <div class="relative">
                  ${iconSvg}
                  <span id="mobile-cart-badge" class="hidden absolute -top-1 -right-2 bg-[#007d83] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs leading-none"></span>
                </div>
                <span class="text-[10px] font-semibold mt-1 leading-none tracking-[-0.01em] text-[#667085]">Cart</span>
              </button>
            `;
          }

          return `
            <a
              href="#${targetPath}"
              data-path="${item.path}"
              class="mobile-nav-item flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors relative active:scale-95 ${isActive ? 'text-[#007d83]' : 'text-[#667085] hover:text-[#007d83]'}"
            >
              <div class="relative">
                ${iconSvg}
              </div>
              <span class="text-[10px] font-semibold mt-1 leading-none tracking-[-0.01em] ${isActive ? 'text-[#007d83]' : 'text-[#667085]'}">${item.label}</span>
            </a>
          `;
        }).join('')}
      </nav>
    </div>
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
      const isActive = itemPath === path || (itemPath !== '/' && (path.startsWith(itemPath) || (item.getAttribute('data-path') === '/categories' && path.startsWith('/category'))));

      if (isActive) {
        item.classList.remove('text-[#667085]');
        item.classList.add('text-[#007d83]');
        if (labelSpan) {
          labelSpan.classList.remove('text-[#667085]', 'font-medium');
          labelSpan.classList.add('text-[#007d83]', 'font-semibold');
        }
      } else {
        item.classList.remove('text-[#007d83]');
        item.classList.add('text-[#667085]');
        if (labelSpan) {
          labelSpan.classList.remove('text-[#007d83]', 'font-semibold');
          labelSpan.classList.add('text-[#667085]', 'font-medium');
        }
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
