// DailyMart BD — Header Component
window.Header = (() => {
  let mobileMenuOpen = false;

  const openSidebar = () => {
    const sidebarDrawer = document.getElementById('sidebar-drawer');
    const sidebarBackdrop = document.getElementById('sidebar-drawer-backdrop');
    if (!sidebarDrawer || !sidebarBackdrop) return;
    sidebarBackdrop.classList.remove('hidden');
    requestAnimationFrame(() => {
      sidebarBackdrop.classList.remove('opacity-0');
      sidebarBackdrop.classList.add('opacity-100');
      sidebarDrawer.classList.remove('-translate-x-full');
    });
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    const sidebarDrawer = document.getElementById('sidebar-drawer');
    const sidebarBackdrop = document.getElementById('sidebar-drawer-backdrop');
    if (!sidebarDrawer || !sidebarBackdrop) return;
    sidebarDrawer.classList.add('-translate-x-full');
    sidebarBackdrop.classList.remove('opacity-100');
    sidebarBackdrop.classList.add('opacity-0');
    setTimeout(() => {
      sidebarBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  };

  const render = () => {
    const root = document.getElementById('header-root');
    if (!root) return;
    const cartCount = window.Store.getCartCount();
    const user = window.Store.getUser();

    root.innerHTML = `
    <header id="site-header" class="bg-[#166534] shadow-md sticky top-0 z-40">
      <!-- Top Announcement Bar (Desktop) -->
      <div class="bg-[#14532D] text-white text-xs py-1.5 px-4 border-b border-white/10 hidden sm:block">
        <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div class="flex items-center gap-4 text-[11px]">
            <span class="flex items-center gap-1.5 text-white/90">
              <svg class="w-3.5 h-3.5 text-[#84CC16]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Delivering across Bangladesh
            </span>
            <span class="text-white/30">•</span>
            <span class="text-white/80">Free delivery on orders over ৳1000</span>
          </div>
          <div class="flex items-center gap-3">
            <a href="#/admin" class="bg-[#84CC16] hover:bg-[#74b814] text-[#14532D] text-[11px] font-bold px-2.5 py-0.5 rounded-lg transition-colors flex items-center gap-1 shadow-xs">
              <span>➕</span> Add Product
            </a>
            ${user ? `
              <div class="flex items-center gap-2 text-xs">
                <a href="#/account" class="text-white/90 hover:text-white font-medium flex items-center gap-1">
                  <span>👤</span> Hi, ${(user.name || 'User').split(' ')[0]}
                </a>
                <span class="text-white/30">•</span>
                <button onclick="window.Header.logout()" class="text-xs text-white/70 hover:text-white transition-colors underline">Sign Out</button>
              </div>
            ` : `
              <a href="#/login" class="text-white/90 hover:text-[#84CC16] transition-colors font-medium text-xs">🔑 Login / Register</a>
            `}
          </div>
        </div>
      </div>

      <!-- Main Header (Compact, Deep Green #166534) -->
      <div class="max-w-7xl mx-auto px-4 py-2.5 sm:py-3">
        <div class="flex items-center justify-between gap-4">
          
          <!-- Left: Hamburger (☰) & DailyMart BD Logo -->
          <div class="flex items-center gap-2 sm:gap-3">
            <button id="mobile-menu-btn" class="p-2 -ml-1.5 rounded-xl text-white hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center" aria-label="Main Menu" title="Open Menu">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>

            <a href="#/" class="flex items-center gap-2.5 flex-shrink-0 group">
              <div class="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span class="text-[#166534] font-black text-lg sm:text-xl">D</span>
              </div>
              <div>
                <div class="font-black text-white text-base sm:text-lg leading-tight tracking-tight">DailyMart <span class="text-[#84CC16]">BD</span></div>
                <div class="text-[10px] text-white/75 font-medium leading-tight hidden xs:block">Fresh. Fair. Daily.</div>
              </div>
            </a>
          </div>

          <!-- Center: No large search bar per exact instructions -->

          <!-- Right: Sign In, Wishlist, Cart -->
          <div class="flex items-center gap-1 sm:gap-2">
            <!-- Sign In / Account -->
            <a href="${user ? '#/account' : '#/login'}" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-colors group">
              <svg class="w-5 h-5 text-white/90 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span class="text-xs font-semibold hidden sm:inline">${user ? (user.name || 'Account').split(' ')[0] : 'Sign In'}</span>
            </a>

            <!-- Wishlist -->
            <a href="#/wishlist" class="flex items-center gap-1.5 p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-colors group" title="Wishlist">
              <svg class="w-5 h-5 text-white/90 group-hover:text-[#84CC16] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              <span class="text-xs font-semibold hidden sm:inline">Wishlist</span>
            </a>

            <!-- Cart Button (Subtle Fresh Lime Green #84CC16 Accent) -->
            <button id="cart-toggle-btn" class="relative flex items-center gap-2 p-2 sm:px-3.5 sm:py-2 rounded-xl bg-[#84CC16] hover:bg-[#74b814] text-[#14532D] font-bold transition-all group active:scale-95 shadow-sm ml-1" aria-label="Cart">
              <div class="relative flex items-center">
                <svg class="w-5 h-5 text-[#14532D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                ${cartCount > 0 ? `<span id="cart-badge" class="cart-badge absolute -top-2.5 -right-2.5 bg-[#DC2626] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">${cartCount > 9 ? '9+' : cartCount}</span>` : `<span id="cart-badge" class="hidden"></span>`}
              </div>
              <span class="hidden sm:inline text-xs font-bold text-[#14532D]">Cart</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Navigation Subnav Bar (Desktop, Dark Green #14532D) -->
      <nav class="border-t border-white/10 bg-[#14532D] hidden md:block">
        <div class="max-w-7xl mx-auto px-4">
          <ul class="flex items-center gap-1 py-1" id="main-nav">
            ${[
              { label: 'Home', path: '/' },
              { label: 'Categories', path: '/categories' },
              { label: '🔥 Deals', path: '/deals' },
              { label: '📞 Contact', path: '/contact' },
              { label: '⚙️ Add Product', path: '/admin' },
            ].map(({ label, path }) => `
              <li>
                <a href="#${path}" data-path="${path}" class="nav-link px-3.5 py-2 text-xs font-semibold text-white/85 hover:text-white hover:bg-white/10 rounded-lg inline-block transition-colors ${path === '/admin' ? 'text-[#84CC16] font-bold' : ''}">
                  ${label}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </nav>

      <!-- Sleek 40% Sidebar Drawer (Left, Top, Bottom completely filled; rounded only on right) -->
      <div id="sidebar-drawer-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-xs z-[99] hidden transition-opacity duration-300 opacity-0"></div>

      <aside
        id="sidebar-drawer"
        class="fixed top-0 bottom-0 left-0 z-[100] w-[85vw] sm:w-[50vw] md:w-[40vw] max-w-[390px] h-full transform -translate-x-full transition-transform duration-300 ease-out flex flex-col pointer-events-none"
        aria-label="Main Navigation Sidebar"
      >
        <div class="pointer-events-auto h-full w-full bg-[#14532D] text-white rounded-r-3xl shadow-2xl flex flex-col overflow-hidden border-r border-white/10">
          
          <!-- Sidebar Header -->
          <div class="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#166534]">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md">
                <span class="text-[#166534] font-black text-base">D</span>
              </div>
              <div>
                <div class="font-black text-white text-base tracking-tight leading-tight">DailyMart <span class="text-[#84CC16]">BD</span></div>
                <div class="text-[10px] text-white/70 font-medium">Fresh. Fair. Daily.</div>
              </div>
            </div>

            <button
              id="sidebar-close-btn"
              class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors active:scale-95"
              aria-label="Close menu"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Sidebar Search Input (Inside Main Menu Drawer) -->
          <div class="px-3.5 pt-3.5 pb-1">
            <div class="relative">
              <input
                type="text"
                id="sidebar-search"
                placeholder="Search fresh products..."
                class="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-white/60 text-xs rounded-xl px-3 py-2.5 pl-8 outline-none focus:ring-2 focus:ring-[#84CC16] border border-white/15 transition-all"
              />
              <svg class="w-3.5 h-3.5 text-white/70 absolute left-2.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          <!-- Navigation Links Scrollable Area -->
          <div class="flex-1 overflow-y-auto px-3 py-3 space-y-1.5 custom-scrollbar">
            
            <!-- 1. Home -->
            <a
              href="#/"
              class="sidebar-nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
              data-path="/"
            >
              <svg class="w-5 h-5 text-[#84CC16] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span>Home</span>
            </a>

            <!-- 2. Categories (Accordion Collapsible) -->
            <div class="rounded-xl overflow-hidden transition-colors" id="sidebar-categories-container">
              <button
                id="sidebar-categories-toggle"
                class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-[#84CC16] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                  <span>Categories</span>
                </div>
                <svg id="sidebar-categories-chevron" class="w-4 h-4 text-white/60 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Subcategories List -->
              <div id="sidebar-categories-list" class="hidden space-y-1 pl-9 pr-2 py-2">
                <a href="#/categories" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs font-bold text-[#84CC16] hover:text-white hover:bg-white/10 transition-colors">
                  <span>• All Categories</span>
                </a>
                <a href="#/category/vegetables" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                  <span>• Vegetables</span>
                </a>
                <a href="#/category/fruits" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                  <span>• Fruits</span>
                </a>
                <a href="#/category/fish" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                  <span>• Fish & Seafood</span>
                </a>
                <a href="#/category/meat" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                  <span>• Meat & Poultry</span>
                </a>
                <a href="#/category/grocery" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                  <span>• Grocery</span>
                </a>
                <a href="#/category/household" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                  <span>• Household</span>
                </a>
              </div>
            </div>

            <!-- 3. Deals -->
            <a
              href="#/deals"
              class="sidebar-nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
              data-path="/deals"
            >
              <span class="text-base flex-shrink-0">🔥</span>
              <span>Deals & Offers</span>
            </a>

            <!-- 4. Accounts -->
            <a
              href="#/account"
              class="sidebar-nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
              data-path="/account"
            >
              <svg class="w-5 h-5 text-[#84CC16] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span>Accounts</span>
            </a>

            <!-- 5. Wishlist -->
            <a
              href="#/wishlist"
              class="sidebar-nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
              data-path="/wishlist"
            >
              <svg class="w-5 h-5 text-[#DC2626] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span>Wishlist</span>
            </a>

            <!-- 6. Add Product (CTA Highlight) -->
            <a
              href="#/admin"
              class="sidebar-nav-item flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-[#14532D] bg-[#84CC16] hover:bg-[#74b814] shadow-md font-bold text-sm transition-all active:scale-98 mt-3"
              data-path="/admin"
            >
              <span class="text-[#14532D] text-base font-black flex-shrink-0">➕</span>
              <span>Add Product (Admin)</span>
            </a>

          </div>

          <!-- Sidebar Footer -->
          <div class="p-3.5 border-t border-white/10 bg-black/10 flex items-center justify-between text-xs text-white/60">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse"></span>
              <span>DailyMart Online</span>
            </span>
            <span class="text-[11px] text-white/50">v5.0</span>
          </div>

        </div>
      </aside>
    </header>
    `;

    attachHeaderEvents();
  };

  const attachHeaderEvents = () => {
    // 40% Sidebar Drawer controls
    const closeBtn = document.getElementById('sidebar-close-btn');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebarBackdrop = document.getElementById('sidebar-drawer-backdrop');

    menuBtn?.addEventListener('click', openSidebar);
    closeBtn?.addEventListener('click', closeSidebar);
    sidebarBackdrop?.addEventListener('click', closeSidebar);

    // ESC key closes sidebar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });

    // Accordion toggle for Categories
    const catToggle = document.getElementById('sidebar-categories-toggle');
    const catList = document.getElementById('sidebar-categories-list');
    const catChevron = document.getElementById('sidebar-categories-chevron');
    catToggle?.addEventListener('click', () => {
      const isHidden = catList.classList.contains('hidden');
      catList.classList.toggle('hidden');
      catChevron.classList.toggle('rotate-180', isHidden);
      catToggle.classList.toggle('bg-white/10', isHidden);
      catToggle.classList.toggle('text-white', isHidden);
    });

    // Close on any link click inside sidebar
    document.querySelectorAll('.sidebar-nav-item').forEach(link => {
      link.addEventListener('click', closeSidebar);
    });

    // Sidebar search input
    document.getElementById('sidebar-search')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim();
        if (q) {
          closeSidebar();
          window.Router.navigate(`/search?q=${encodeURIComponent(q)}`);
          e.target.value = '';
        }
      }
    });

    // Cart drawer toggle
    document.getElementById('cart-toggle-btn')?.addEventListener('click', () => {
      window.CartDrawer.open();
    });
  };

  const updateNav = (path) => {
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkPath = link.getAttribute('data-path');
      if (linkPath === path || (path.startsWith('/category/') && linkPath === path)) {
        link.classList.add('bg-white/20', 'text-white');
        link.classList.remove('text-white/85');
      } else {
        link.classList.remove('bg-white/20', 'text-white');
        link.classList.add('text-white/85');
      }
    });
  };

  const updateCartBadge = () => {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const count = window.Store.getCartCount();
    badge.textContent = count > 9 ? '9+' : count;
    badge.className = count > 0 ? 'cart-badge absolute -top-2.5 -right-2.5 bg-[#DC2626] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs' : 'hidden';
  };

  const logout = () => {
    if (confirm('Are you sure you want to sign out of DailyMart BD?')) {
      window.Store.logout();
      if (window.Toast) window.Toast.info('Signed out');
      window.Router.navigate('/login');
    }
  };

  // Subscribe to store changes
  window.Store.subscribe(() => {
    updateCartBadge();
    render();
  });

  return { render, updateNav, updateCartBadge, logout, openSidebar, closeSidebar };
})();
