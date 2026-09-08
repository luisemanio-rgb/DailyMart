// DailyMart BD — Production Header Component
window.Header = (() => {
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
    }, 280);
  };

  const render = () => {
    const root = document.getElementById('header-root');
    if (!root) return;
    const cartCount = window.Store.getCartCount();
    const user = window.Store.getUser();
    const icons = window.Icons || {};

    root.innerHTML = `
    <header id="site-header" class="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
      
      <!-- 1. Top Utility Bar (Desktop) -->
      <div class="bg-[#056B4D] text-white text-xs py-1.5 px-4 hidden sm:block border-b border-emerald-900/20">
        <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div class="flex items-center gap-5 text-[12px]">
            <span class="flex items-center gap-1.5 text-emerald-100">
              ${icons.mapPin ? icons.mapPin(14, 'text-[#FF7A18]') : ''}
              <span>Delivering across Bangladesh</span>
            </span>
            <span class="text-emerald-300/40">•</span>
            <span class="flex items-center gap-1.5 text-emerald-100">
              ${icons.phone ? icons.phone(13, 'text-emerald-200') : ''}
              <span>+880 1700-000000</span>
            </span>
            <span class="text-emerald-300/40">•</span>
            <span class="text-emerald-100">Free delivery on orders over ৳1000</span>
          </div>

          <div class="flex items-center gap-4 text-[12px]">
            <a href="#/admin" class="inline-flex items-center gap-1 text-emerald-100 hover:text-white font-medium transition-colors">
              ${icons.plus ? icons.plus(13, 'text-[#FF7A18]') : ''}
              <span>Add Product</span>
            </a>
            <span class="text-emerald-300/40">•</span>
            ${user ? `
              <div class="flex items-center gap-2">
                <a href="#/account" class="text-emerald-100 hover:text-white font-medium transition-colors flex items-center gap-1">
                  ${icons.user ? icons.user(13, 'text-emerald-200') : ''}
                  <span>Hi, ${(user.name || 'User').split(' ')[0]}</span>
                </a>
                <span class="text-emerald-300/40">•</span>
                <button onclick="window.Header.logout()" class="text-emerald-200 hover:text-white underline text-[11px] transition-colors">Sign Out</button>
              </div>
            ` : `
              <a href="#/login" class="text-emerald-100 hover:text-white font-medium transition-colors flex items-center gap-1">
                ${icons.user ? icons.user(13, 'text-emerald-200') : ''}
                <span>Login / Register</span>
              </a>
            `}
          </div>
        </div>
      </div>

      <!-- 2. Main Header Row -->
      <div class="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div class="flex items-center justify-between gap-4 lg:gap-8">
          
          <!-- Brand Logo & Mobile Menu Toggle -->
          <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button id="mobile-menu-btn" class="p-2 -ml-1.5 rounded-lg text-[#17212B] hover:bg-[#E8F7F1] hover:text-[#087F5B] transition-colors flex items-center justify-center active:scale-95" aria-label="Main Menu" title="Open Navigation Menu">
              ${icons.menu ? icons.menu(22) : '☰'}
            </button>

            <!-- Production Logo -->
            <a href="#/" class="flex items-center gap-2 group flex-shrink-0">
              <div class="w-9 h-9 sm:w-10 sm:h-10 bg-[#087F5B] rounded-lg flex items-center justify-center shadow-xs group-hover:bg-[#056B4D] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 8-11 5 3 8 7 8 11a7 7 0 0 1-7 7Z"></path>
                  <path d="M12 2v20"></path>
                </svg>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-1">
                  <span class="font-extrabold text-xl sm:text-[22px] text-[#17212B] tracking-tight leading-none">DailyMart</span>
                  <span class="bg-[#FF7A18] text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">BD</span>
                </div>
                <span class="text-[10px] font-medium text-[#667085] tracking-wider leading-tight hidden xs:block mt-0.5">Fresh. Fair. Daily.</span>
              </div>
            </a>
          </div>

          <!-- Desktop Search Bar (Large & Elegant) -->
          <div class="hidden md:block flex-1 max-w-2xl mx-2">
            <div class="relative" id="search-wrapper">
              <div class="relative flex items-center bg-white rounded-lg border border-[#E5E7EB] focus-within:border-[#087F5B] focus-within:ring-2 focus-within:ring-[#087F5B]/15 transition-all p-1 pl-3.5">
                <span class="text-[#667085] mr-2 flex-shrink-0">
                  ${icons.search ? icons.search(18) : ''}
                </span>
                <input
                  type="text"
                  id="header-search"
                  placeholder="Search vegetables, fruits, groceries..."
                  class="w-full bg-transparent text-sm text-[#17212B] placeholder-[#667085] outline-none pr-3"
                  autocomplete="off"
                />
                <button id="search-submit-btn" class="h-9 px-4 bg-[#FF7A18] hover:bg-[#EA680C] text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs active:scale-98 flex-shrink-0" title="Search">
                  <span>Search</span>
                </button>
              </div>
              <!-- Autocomplete dropdown -->
              <div id="search-autocomplete" class="hidden absolute top-full left-0 right-0 bg-white border border-[#E5E7EB] rounded-xl shadow-lg mt-2 z-50 overflow-hidden max-h-72 overflow-y-auto"></div>
            </div>
          </div>

          <!-- Right Utility Actions (Account, Wishlist, Cart) -->
          <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <!-- Account -->
            <a href="${user ? '#/account' : '#/login'}" class="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-[#17212B] hover:bg-[#E8F7F1] hover:text-[#087F5B] transition-colors group" title="My Account">
              <span class="text-[#667085] group-hover:text-[#087F5B] transition-colors">
                ${icons.user ? icons.user(20) : ''}
              </span>
              <div class="text-left hidden lg:block">
                <div class="text-[11px] text-[#667085] leading-tight">Account</div>
                <div class="text-xs font-semibold text-[#17212B] leading-tight group-hover:text-[#087F5B]">${user ? (user.name || 'User').split(' ')[0] : 'Sign In'}</div>
              </div>
            </a>

            <!-- Wishlist -->
            <a href="#/wishlist" class="flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-lg text-[#17212B] hover:bg-[#E8F7F1] hover:text-[#087F5B] transition-colors group" title="Wishlist">
              <span class="text-[#667085] group-hover:text-[#E5484D] transition-colors">
                ${icons.heart ? icons.heart(20) : ''}
              </span>
              <div class="text-left hidden lg:block">
                <div class="text-[11px] text-[#667085] leading-tight">Favorite</div>
                <div class="text-xs font-semibold text-[#17212B] leading-tight group-hover:text-[#087F5B]">Wishlist</div>
              </div>
            </a>

            <!-- Cart Trigger -->
            <button id="cart-toggle-btn" class="relative flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#E8F7F1] hover:bg-[#d5f3e7] text-[#087F5B] font-semibold transition-colors active:scale-98 border border-[#087F5B]/20" aria-label="Open Cart">
              <div class="relative flex items-center">
                ${icons.cart ? icons.cart(20, 'text-[#087F5B]') : ''}
                ${cartCount > 0 ? `
                  <span id="cart-badge" class="cart-badge absolute -top-2.5 -right-2.5 bg-[#E5484D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    ${cartCount > 9 ? '9+' : cartCount}
                  </span>` : `
                  <span id="cart-badge" class="hidden"></span>`}
              </div>
              <div class="text-left hidden sm:block">
                <div class="text-[10px] text-[#056B4D] leading-tight">Total Cart</div>
                <div class="text-xs font-bold text-[#087F5B] leading-tight">Cart (${cartCount})</div>
              </div>
            </button>
          </div>

        </div>

        <!-- Mobile Search Bar (Directly below main row) -->
        <div class="md:hidden mt-2.5 pt-1">
          <div class="relative" id="mobile-search-wrapper">
            <div class="relative flex items-center bg-white rounded-lg border border-[#E5E7EB] focus-within:border-[#087F5B] focus-within:ring-2 focus-within:ring-[#087F5B]/15 transition-all p-1 pl-3">
              <span class="text-[#667085] mr-2 flex-shrink-0">
                ${icons.search ? icons.search(16) : ''}
              </span>
              <input
                type="text"
                id="mobile-header-search"
                placeholder="Search vegetables, fruits, groceries..."
                class="w-full bg-transparent text-xs text-[#17212B] placeholder-[#667085] outline-none pr-2"
                autocomplete="off"
              />
              <button id="mobile-search-submit-btn" class="h-7 px-3 bg-[#FF7A18] hover:bg-[#EA680C] active:scale-95 text-white rounded text-[11px] font-semibold flex items-center justify-center transition-colors shadow-xs" title="Search">
                Search
              </button>
            </div>
            <!-- Mobile Autocomplete dropdown -->
            <div id="mobile-search-autocomplete" class="hidden absolute top-full left-0 right-0 bg-white border border-[#E5E7EB] rounded-xl shadow-lg mt-1.5 z-50 overflow-hidden max-h-64 overflow-y-auto"></div>
          </div>
        </div>

      </div>

      <!-- 3. Desktop Subnavigation Bar -->
      <nav class="border-t border-[#E5E7EB] bg-[#F8FAF9] hidden md:block">
        <div class="max-w-7xl mx-auto px-4">
          <ul class="flex items-center gap-1 py-1.5" id="main-nav">
            ${[
              { label: 'Home', path: '/' },
              { label: 'Categories', path: '/categories' },
              { label: "Today's Deals", path: '/deals', badge: 'Hot' },
              { label: 'Contact Us', path: '/contact' },
              { label: 'Add Product', path: '/admin', isAccent: true },
            ].map(({ label, path, badge, isAccent }) => `
              <li>
                <a href="#${path}" data-path="${path}" class="nav-link px-3.5 py-1.5 text-xs font-semibold text-[#17212B] hover:text-[#087F5B] hover:bg-white rounded-md transition-colors inline-flex items-center gap-1.5 ${isAccent ? 'text-[#087F5B] font-bold' : ''}">
                  <span>${label}</span>
                  ${badge ? `<span class="bg-[#FF7A18] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">${badge}</span>` : ''}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </nav>

      <!-- 4. Production Sidebar Drawer (40% Desktop / 85% Mobile) -->
      <div id="sidebar-drawer-backdrop" class="fixed inset-0 bg-[#17212B]/50 backdrop-blur-xs z-[999] hidden transition-opacity duration-250 opacity-0"></div>

      <aside
        id="sidebar-drawer"
        class="fixed top-0 bottom-0 left-0 z-[1000] w-[75vw] sm:w-[50vw] md:w-[40vw] max-w-[360px] h-full transform -translate-x-full transition-transform duration-280 ease-out flex flex-col pointer-events-none"
        aria-label="Main Navigation Sidebar"
      >
        <div class="pointer-events-auto h-full w-full bg-white text-[#17212B] rounded-r-2xl shadow-xl flex flex-col overflow-hidden border-r border-[#E5E7EB]">
          
          <!-- Drawer Header -->
          <div class="p-4 sm:p-5 flex items-center justify-between border-b border-[#E5E7EB] bg-[#F8FAF9]">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 bg-[#087F5B] rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
                  <path d="M11 20A7 7 0 0 1 4 13c0-4 3-8 8-11 5 3 8 7 8 11a7 7 0 0 1-7 7Z"></path>
                  <path d="M12 2v20"></path>
                </svg>
              </div>
              <div class="flex items-center gap-1">
                <span class="font-bold text-lg text-[#17212B]">DailyMart</span>
                <span class="bg-[#FF7A18] text-white text-[10px] font-bold px-1 py-0.5 rounded">BD</span>
              </div>
            </div>

            <button
              id="sidebar-close-btn"
              class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#667085] hover:text-[#17212B] flex items-center justify-center transition-colors active:scale-95"
              aria-label="Close menu"
            >
              ${icons.x ? icons.x(18) : '✕'}
            </button>
          </div>

          <!-- Drawer Search Input -->
          <div class="p-3.5 pb-2 border-b border-[#E5E7EB]">
            <div class="relative">
              <span class="absolute left-3 top-2.5 text-[#667085]">
                ${icons.search ? icons.search(16) : ''}
              </span>
              <input
                type="text"
                id="sidebar-search"
                placeholder="Search fresh products..."
                class="w-full bg-[#F8FAF9] hover:bg-white focus:bg-white text-xs text-[#17212B] placeholder-[#667085] rounded-lg pl-9 pr-3 py-2 outline-none border border-[#E5E7EB] focus:border-[#087F5B] focus:ring-1 focus:ring-[#087F5B] transition-all"
              />
            </div>
          </div>

          <!-- Drawer Navigation Links -->
          <div class="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            
            <!-- Home -->
            <a
              href="#/"
              class="sidebar-nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#17212B] hover:bg-[#E8F7F1] hover:text-[#087F5B] transition-colors"
              data-path="/"
            >
              <span class="text-[#087F5B]">${icons.home ? icons.home(18) : ''}</span>
              <span>Home</span>
            </a>

            <!-- Categories Accordion -->
            <div class="rounded-lg overflow-hidden" id="sidebar-categories-container">
              <button
                id="sidebar-categories-toggle"
                class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#17212B] hover:bg-[#E8F7F1] hover:text-[#087F5B] transition-colors"
              >
                <div class="flex items-center gap-3">
                  <span class="text-[#087F5B]">${icons.grid ? icons.grid(18) : ''}</span>
                  <span>Categories</span>
                </div>
                <span id="sidebar-categories-chevron" class="text-[#667085] transform transition-transform duration-200">
                  ${icons.chevronDown ? icons.chevronDown(16) : '▼'}
                </span>
              </button>

              <div id="sidebar-categories-list" class="hidden space-y-0.5 pl-8 pr-2 py-1.5 bg-[#F8FAF9] rounded-lg mt-1">
                <a href="#/categories" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-md text-xs font-semibold text-[#087F5B] hover:bg-white transition-colors">
                  <span>All Categories</span>
                </a>
                <a href="#/category/vegetables" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-md text-xs text-[#667085] hover:text-[#087F5B] hover:bg-white transition-colors">
                  <span>Vegetables</span>
                </a>
                <a href="#/category/fruits" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-md text-xs text-[#667085] hover:text-[#087F5B] hover:bg-white transition-colors">
                  <span>Fruits</span>
                </a>
                <a href="#/category/fish" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-md text-xs text-[#667085] hover:text-[#087F5B] hover:bg-white transition-colors">
                  <span>Fish & Seafood</span>
                </a>
                <a href="#/category/meat" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-md text-xs text-[#667085] hover:text-[#087F5B] hover:bg-white transition-colors">
                  <span>Meat & Poultry</span>
                </a>
                <a href="#/category/grocery" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-md text-xs text-[#667085] hover:text-[#087F5B] hover:bg-white transition-colors">
                  <span>Grocery Essentials</span>
                </a>
                <a href="#/category/household" class="sidebar-nav-item flex items-center gap-2 py-1.5 px-2 rounded-md text-xs text-[#667085] hover:text-[#087F5B] hover:bg-white transition-colors">
                  <span>Household</span>
                </a>
              </div>
            </div>

            <!-- Deals -->
            <a
              href="#/deals"
              class="sidebar-nav-item flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#17212B] hover:bg-[#E8F7F1] hover:text-[#087F5B] transition-colors"
              data-path="/deals"
            >
              <div class="flex items-center gap-3">
                <span class="text-[#FF7A18]">${icons.tag ? icons.tag(18) : ''}</span>
                <span>Today's Deals</span>
              </div>
              <span class="bg-[#FF7A18] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">Hot</span>
            </a>

            <!-- Accounts -->
            <a
              href="#/account"
              class="sidebar-nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#17212B] hover:bg-[#E8F7F1] hover:text-[#087F5B] transition-colors"
              data-path="/account"
            >
              <span class="text-[#087F5B]">${icons.user ? icons.user(18) : ''}</span>
              <span>My Account</span>
            </a>

            <!-- Wishlist -->
            <a
              href="#/wishlist"
              class="sidebar-nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#17212B] hover:bg-[#E8F7F1] hover:text-[#087F5B] transition-colors"
              data-path="/wishlist"
            >
              <span class="text-[#E5484D]">${icons.heart ? icons.heart(18) : ''}</span>
              <span>Wishlist</span>
            </a>

            <!-- Add Product CTA -->
            <div class="pt-3">
              <a
                href="#/admin"
                class="sidebar-nav-item flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white bg-[#087F5B] hover:bg-[#056B4D] font-semibold text-xs transition-colors shadow-xs"
                data-path="/admin"
              >
                <span>${icons.plus ? icons.plus(16) : '+'}</span>
                <span>Add Product (Admin)</span>
              </a>
            </div>

          </div>

          <!-- Drawer Footer -->
          <div class="p-3.5 border-t border-[#E5E7EB] bg-[#F8FAF9] flex items-center justify-between text-xs text-[#667085]">
            <span class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
              <span class="font-medium">Online Service Active</span>
            </span>
            <span class="text-[11px]">DailyMart BD</span>
          </div>

        </div>
      </aside>
    </header>
    `;

    attachHeaderEvents();
  };

  const attachHeaderEvents = () => {
    // Sidebar drawer controls
    const closeBtn = document.getElementById('sidebar-close-btn');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebarBackdrop = document.getElementById('sidebar-drawer-backdrop');

    menuBtn?.addEventListener('click', openSidebar);
    closeBtn?.addEventListener('click', closeSidebar);
    sidebarBackdrop?.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });

    // Categories accordion in sidebar
    const catToggle = document.getElementById('sidebar-categories-toggle');
    const catList = document.getElementById('sidebar-categories-list');
    const catChevron = document.getElementById('sidebar-categories-chevron');
    catToggle?.addEventListener('click', () => {
      const isHidden = catList.classList.contains('hidden');
      catList.classList.toggle('hidden');
      catChevron?.classList.toggle('rotate-180', isHidden);
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

    // Unified search handler with live autocomplete
    const bindSearchInput = (inputId, dropdownId, wrapperId) => {
      const input = document.getElementById(inputId);
      const dropdown = document.getElementById(dropdownId);
      if (!input || !dropdown) return;

      const runSearch = () => {
        const q = input.value.trim();
        if (q.length >= 2) {
          const results = window.searchProducts ? window.searchProducts(q).slice(0, 6) : [];
          if (results.length) {
            dropdown.innerHTML = results.map(p => `
              <div class="autocomplete-item flex items-center gap-3 px-3.5 py-2.5 cursor-pointer border-b border-[#E5E7EB] last:border-0 hover:bg-[#F8FAF9] transition-colors" data-slug="${p.slug}">
                <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-contain rounded-md border border-[#E5E7EB] p-1 bg-white flex-shrink-0" onerror="this.src='images/potatoes/potato-deshi.jpg'" />
                <div class="min-w-0 flex-1 text-left">
                  <div class="text-xs sm:text-sm font-semibold text-[#17212B] truncate">${p.name}</div>
                  <div class="text-xs text-[#087F5B] font-bold">${window.Utils.formatPrice(p.variants[0].price)} <span class="text-[#667085] font-normal text-[11px]">/${p.variants[0].unit || '1kg'}</span></div>
                </div>
                <span class="text-[10px] bg-[#E8F7F1] text-[#087F5B] font-medium px-2 py-0.5 rounded capitalize">${p.category}</span>
              </div>
            `).join('') + `
              <div class="p-2.5 bg-[#F8FAF9] text-center border-t border-[#E5E7EB]">
                <button class="see-all-btn text-xs font-semibold text-[#087F5B] hover:underline">See all results for "${q}" →</button>
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
            dropdown.innerHTML = `<div class="px-4 py-5 text-center text-xs text-[#667085]">No products found for "${q}"</div>`;
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
        link.classList.add('text-[#087F5B]', 'font-bold', 'bg-white');
        link.classList.remove('text-[#17212B]');
      } else {
        link.classList.remove('text-[#087F5B]', 'font-bold', 'bg-white');
        link.classList.add('text-[#17212B]');
      }
    });
  };

  const updateCartBadge = () => {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const count = window.Store.getCartCount();
    badge.textContent = count > 9 ? '9+' : count;
    badge.className = count > 0 ? 'cart-badge absolute -top-2.5 -right-2.5 bg-[#E5484D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs' : 'hidden';
  };

  const logout = () => {
    if (confirm('Are you sure you want to sign out of DailyMart BD?')) {
      window.Store.logout();
      if (window.Toast) window.Toast.info('Signed out successfully');
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
