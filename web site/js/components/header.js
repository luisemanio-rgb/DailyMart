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
    <header id="site-header" class="bg-white shadow-sm">
      <!-- Top bar -->
      <div class="bg-emerald-800 text-white text-xs py-2 px-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Delivering across Bangladesh
            </span>
            <span class="hidden sm:flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              +880 1700-000000
            </span>
          </div>
          <div class="flex items-center gap-3">
            <span class="hidden sm:inline">Free delivery on orders over ৳1000</span>
            <a href="#/admin" class="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-sm">
              <span>➕</span> Add Product
            </a>
            ${user ? `
              <div class="hidden sm:flex items-center gap-2">
                <a href="#/account" class="text-emerald-200 hover:text-white font-semibold transition-colors flex items-center gap-1 text-xs">
                  <span>👤</span> Hi, ${(user.name || 'User').split(' ')[0]}
                </a>
                <span class="text-emerald-400">•</span>
                <button onclick="window.Header.logout()" class="text-xs text-emerald-300 hover:text-white transition-colors underline">Sign Out</button>
              </div>
            ` : `
              <a href="#/login" class="hover:text-emerald-200 transition-colors hidden sm:inline font-semibold text-xs">🔑 Login / Register</a>
            `}
          </div>
        </div>
      </div>

      <!-- Main header -->
      <div class="max-w-7xl mx-auto px-4 py-2.5 sm:py-3">
        <div class="flex items-center justify-between gap-3 md:gap-6">
          
          <!-- Left: Hamburger & Brand Logo -->
          <div class="flex items-center gap-2 sm:gap-3">
            <button id="mobile-menu-btn" class="p-2 -ml-1.5 rounded-xl hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors flex items-center gap-1.5" aria-label="Main Menu" title="Open Menu">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>

            <a href="#/" class="flex items-center gap-2.5 flex-shrink-0 group">
              <div class="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span class="text-white font-black text-lg sm:text-xl">D</span>
              </div>
              <div>
                <div class="font-black text-gray-900 text-base sm:text-lg leading-tight tracking-tight">DailyMart <span class="text-emerald-600">BD</span></div>
                <div class="text-[10px] text-gray-400 font-medium leading-tight hidden xs:block">Fresh. Fair. Daily.</div>
              </div>
            </a>
          </div>

          <!-- Center: Desktop Search Bar (60-30-10 Golden Harmony) -->
          <div class="hidden md:block flex-1 max-w-xl mx-2">
            <div class="relative" id="search-wrapper">
              <div class="relative flex items-center bg-white rounded-full shadow-sm border border-gray-200/90 hover:border-emerald-400 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all p-1 pl-5">
                <input
                  type="text"
                  id="header-search"
                  placeholder="Search fresh vegetables, fruits, groceries..."
                  class="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none pr-3"
                  autocomplete="off"
                />
                <button id="search-submit-btn" class="w-9 h-9 flex-shrink-0 bg-gradient-to-r from-orange-500 to-[#ff5722] hover:from-orange-600 hover:to-[#f4511e] active:scale-95 text-white rounded-full transition-all flex items-center justify-center shadow-xs" title="Search">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </button>
              </div>
              <!-- Autocomplete dropdown -->
              <div id="search-autocomplete" class="hidden absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-2xl mt-2 z-50 overflow-hidden max-h-72 overflow-y-auto"></div>
            </div>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-1 sm:gap-3">
            <!-- Account -->
            <a href="${user ? '#/account' : '#/login'}" class="hidden sm:flex flex-col items-center p-2 rounded-xl hover:bg-gray-50 transition-colors group">
              <svg class="w-5 h-5 ${user ? 'text-emerald-600' : 'text-gray-600'} group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span class="text-[10px] ${user ? 'text-emerald-700 font-bold' : 'text-gray-500'} group-hover:text-emerald-600">${user ? (user.name || 'Account').split(' ')[0] : 'Sign In'}</span>
            </a>

            <!-- Wishlist -->
            <a href="#/wishlist" class="hidden sm:flex flex-col items-center p-2 rounded-xl hover:bg-gray-50 transition-colors group">
              <svg class="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              <span class="text-[10px] text-gray-500 group-hover:text-red-500">Wishlist</span>
            </a>

            <!-- Cart Toggle -->
            <button id="cart-toggle-btn" class="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all group active:scale-95 shadow-2xs" aria-label="Cart">
              <div class="relative">
                <svg class="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                ${cartCount > 0 ? `<span id="cart-badge" class="cart-badge absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">${cartCount > 9 ? '9+' : cartCount}</span>` : `<span id="cart-badge" class="hidden"></span>`}
              </div>
              <span class="hidden sm:inline text-xs font-bold text-emerald-900">Cart</span>
            </button>
          </div>
        </div>

        <!-- Mobile Search Bar (Restored with 60-30-10 Polish) -->
        <div class="md:hidden mt-2.5">
          <div class="relative" id="mobile-search-wrapper">
            <div class="relative flex items-center bg-white rounded-full shadow-xs border border-gray-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 transition-all p-1 pl-4">
              <input
                type="text"
                id="mobile-header-search"
                placeholder="Search fresh vegetables, grocery..."
                class="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none pr-2"
                autocomplete="off"
              />
              <button id="mobile-search-submit-btn" class="w-8 h-8 flex-shrink-0 bg-gradient-to-r from-orange-500 to-[#ff5722] hover:from-orange-600 hover:to-[#f4511e] active:scale-95 text-white rounded-full transition-all flex items-center justify-center shadow-xs" title="Search">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
            <!-- Mobile Autocomplete dropdown -->
            <div id="mobile-search-autocomplete" class="hidden absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl mt-1.5 z-50 overflow-hidden max-h-64 overflow-y-auto"></div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="border-t border-gray-100 bg-white hidden md:block">
        <div class="max-w-7xl mx-auto px-4">
          <ul class="flex items-center gap-0" id="main-nav">
            ${[
              { label: 'Home', path: '/' },
              { label: 'Categories', path: '/categories' },
              { label: '🔥 Deals', path: '/deals' },
              { label: '📞 Contact', path: '/contact' },
              { label: '⚙️ Add Product', path: '/admin' },
            ].map(({ label, path }) => `
              <li>
                <a href="#${path}" data-path="${path}" class="nav-link px-4 py-3 text-sm font-medium ${path === '/admin' ? 'text-emerald-700 font-bold bg-emerald-50/70' : 'text-gray-700'} hover:text-emerald-600 hover:bg-emerald-50 inline-block transition-colors border-b-2 border-transparent hover:border-emerald-500">
                  ${label}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </nav>

      <!-- Sleek 40% Sidebar Drawer (Flow UI ES6 Style: Left, Top, Bottom completely filled) -->
      <div id="sidebar-drawer-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-xs z-[99] hidden transition-opacity duration-300 opacity-0"></div>

      <aside
        id="sidebar-drawer"
        class="fixed top-0 bottom-0 left-0 z-[100] w-[80vw] sm:w-[50vw] md:w-[40vw] max-w-[390px] h-full transform -translate-x-full transition-transform duration-300 ease-out flex flex-col pointer-events-none"
        aria-label="Main Navigation Sidebar"
      >
        <div class="pointer-events-auto h-full w-full bg-[#0f172a]/98 backdrop-blur-xl border-r border-white/10 text-white rounded-r-3xl shadow-2xl flex flex-col overflow-hidden">
          
          <!-- Sidebar Header: Flow UI Style (Matching Reference Image) -->
          <div class="p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
                <span class="text-white font-black text-sm">D</span>
              </div>
              <div>
                <div class="font-black text-white text-base tracking-tight leading-tight">DailyMart <span class="text-emerald-400">BD</span></div>
                <div class="text-[10px] text-gray-400 font-medium">Fresh. Fair. Daily.</div>
              </div>
            </div>

            <button
              id="sidebar-close-btn"
              class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors active:scale-95"
              aria-label="Close menu"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Sidebar Search Input (Flow UI Style) -->
          <div class="px-3.5 pt-3 pb-1">
            <div class="relative">
              <input
                type="text"
                id="sidebar-search"
                placeholder="Search products..."
                class="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-slate-400 text-xs rounded-xl px-3 py-2.5 pl-8 outline-none focus:ring-2 focus:ring-emerald-400 border border-white/10 transition-all"
              />
              <svg class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          <!-- Navigation Links Scrollable Area -->
          <div class="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
            
            <!-- 1. Home -->
            <a
              href="#/"
              class="sidebar-nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
              data-path="/"
            >
              <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span>Home</span>
            </a>

            <!-- 2. Categories (Accordion Collapsible, exactly like Settings in Reference Image) -->
            <div class="rounded-xl overflow-hidden transition-colors" id="sidebar-categories-container">
              <button
                id="sidebar-categories-toggle"
                class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
              >
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                  </svg>
                  <span>Categories</span>
                </div>
                <svg id="sidebar-categories-chevron" class="w-4 h-4 text-gray-400 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Subcategories List (Inside Categories as requested: 'baki gula catagoeies maje diye diba') -->
              <div id="sidebar-categories-list" class="hidden space-y-1 pl-9 pr-2 py-2">
                <a href="#/categories" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs font-semibold text-emerald-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span>• All Categories</span>
                </a>
                <a href="#/category/vegetables" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span>• Vegetables</span>
                </a>
                <a href="#/category/fruits" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span>• Fruits</span>
                </a>
                <a href="#/category/fish" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span>• Fish & Seafood</span>
                </a>
                <a href="#/category/meat" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span>• Meat & Poultry</span>
                </a>
                <a href="#/category/grocery" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span>• Grocery</span>
                </a>
                <a href="#/category/household" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                  <span>• Household</span>
                </a>
              </div>
            </div>

            <!-- 3. Deals -->
            <a
              href="#/deals"
              class="sidebar-nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
              data-path="/deals"
            >
              <span class="text-base flex-shrink-0">🔥</span>
              <span>Deals & Offers</span>
            </a>

            <!-- 4. Accounts -->
            <a
              href="#/account"
              class="sidebar-nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
              data-path="/account"
            >
              <svg class="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <span>Accounts</span>
            </a>

            <!-- 5. Wishlist -->
            <a
              href="#/wishlist"
              class="sidebar-nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 font-medium text-sm transition-all"
              data-path="/wishlist"
            >
              <svg class="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span>Wishlist</span>
            </a>

            <!-- 6. Add Product (10% CTA Highlight) -->
            <a
              href="#/admin"
              class="sidebar-nav-item flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-lg shadow-emerald-950/40 font-bold text-sm transition-all active:scale-98 mt-3"
              data-path="/admin"
            >
              <span class="text-white text-base font-black flex-shrink-0">➕</span>
              <span>Add Product (Admin)</span>
            </a>

          </div>

          <!-- Sidebar Footer -->
          <div class="p-3.5 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs text-gray-400">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>DailyMart Online</span>
            </span>
            <span class="text-[11px] text-gray-500">v4.3</span>
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

    // Mobile search
    document.getElementById('mobile-search-btn')?.addEventListener('click', () => {
      window.SearchOverlay.open();
    });

    // Unified search handler (Desktop & Mobile)
    const bindSearchInput = (inputId, dropdownId, wrapperId) => {
      const input = document.getElementById(inputId);
      const dropdown = document.getElementById(dropdownId);
      if (!input || !dropdown) return;

      const runSearch = () => {
        const q = input.value.trim();
        if (q.length >= 2) {
          const results = window.searchProducts(q).slice(0, 6);
          if (results.length) {
            dropdown.innerHTML = results.map(p => `
              <div class="autocomplete-item flex items-center gap-3 px-4 py-2.5 cursor-pointer border-b border-gray-50 last:border-0 hover:bg-emerald-50/50 transition-colors" data-slug="${p.slug}">
                <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-cover rounded-xl border border-gray-100 flex-shrink-0" onerror="this.src='images/potatoes/potato-deshi.jpg'" />
                <div class="min-w-0 flex-1">
                  <div class="text-xs sm:text-sm font-semibold text-gray-900 truncate">${p.name}</div>
                  <div class="text-xs text-emerald-700 font-bold">${window.Utils.formatPrice(p.variants[0].price)} <span class="text-gray-400 font-normal text-[11px]">/${p.variants[0].unit || '1kg'}</span></div>
                </div>
                <span class="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">${p.category}</span>
              </div>
            `).join('') + `
              <div class="p-2.5 bg-gray-50 text-center border-t border-gray-100">
                <button class="see-all-btn text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors">See all results for "${q}" →</button>
              </div>
            `;
            dropdown.classList.remove('hidden');

            dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
              item.addEventListener('click', () => {
                dropdown.classList.add('hidden');
                input.value = '';
                window.Router.navigate(`/product/${item.dataset.slug}`);
              });
            });

            dropdown.querySelector('.see-all-btn')?.addEventListener('click', () => {
              dropdown.classList.add('hidden');
              window.Router.navigate(`/search?q=${encodeURIComponent(q)}`);
              input.value = '';
            });
          } else {
            dropdown.innerHTML = `<div class="px-4 py-6 text-center text-xs text-gray-400">No products found for "${q}"</div>`;
            dropdown.classList.remove('hidden');
          }
        } else {
          dropdown.classList.add('hidden');
        }
      };

      input.addEventListener('input', window.Utils.debounce(runSearch, 200));

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const q = input.value.trim();
          if (q) {
            dropdown.classList.add('hidden');
            window.Router.navigate(`/search?q=${encodeURIComponent(q)}`);
            input.value = '';
          }
        }
      });

      document.addEventListener('click', (e) => {
        if (!document.getElementById(wrapperId)?.contains(e.target)) {
          dropdown.classList.add('hidden');
        }
      });
    };

    bindSearchInput('header-search', 'search-autocomplete', 'search-wrapper');
    bindSearchInput('mobile-header-search', 'mobile-search-autocomplete', 'mobile-search-wrapper');

    document.getElementById('search-submit-btn')?.addEventListener('click', () => {
      const q = document.getElementById('header-search')?.value?.trim();
      if (q) {
        document.getElementById('search-autocomplete')?.classList.add('hidden');
        window.Router.navigate(`/search?q=${encodeURIComponent(q)}`);
      }
    });

    document.getElementById('mobile-search-submit-btn')?.addEventListener('click', () => {
      const q = document.getElementById('mobile-header-search')?.value?.trim();
      if (q) {
        document.getElementById('mobile-search-autocomplete')?.classList.add('hidden');
        window.Router.navigate(`/search?q=${encodeURIComponent(q)}`);
      }
    });
  };

  const updateNav = (path) => {
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkPath = link.getAttribute('data-path');
      if (linkPath === path || (path.startsWith('/category/') && linkPath === path)) {
        link.classList.add('border-emerald-500', 'text-emerald-600');
        link.classList.remove('border-transparent', 'text-gray-700');
      } else {
        link.classList.remove('border-emerald-500', 'text-emerald-600');
        link.classList.add('border-transparent', 'text-gray-700');
      }
    });
  };

  const updateCartBadge = () => {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const count = window.Store.getCartCount();
    badge.textContent = count > 9 ? '9+' : count;
    badge.className = count > 0 ? 'cart-badge absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center' : 'hidden';
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
