// DailyMart BD — Header Component
window.Header = (() => {
  let mobileMenuOpen = false;

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
      <div class="max-w-7xl mx-auto px-4 py-3">
        <div class="flex items-center gap-3 md:gap-6">
          <!-- Hamburger (mobile) -->
          <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>

          <!-- Logo -->
          <a href="#/" class="flex items-center gap-2 flex-shrink-0">
            <div class="w-9 h-9 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <span class="text-white font-black text-lg">D</span>
            </div>
            <div class="hidden sm:block">
              <div class="font-black text-gray-900 text-lg leading-tight">DailyMart <span class="text-emerald-600">BD</span></div>
              <div class="text-[10px] text-gray-400 font-medium leading-tight">Fresh. Fair. Daily.</div>
            </div>
          </a>

          <!-- Search bar -->
          <div class="flex-1 max-w-2xl">
            <div class="relative" id="search-wrapper">
              <input
                type="text"
                id="header-search"
                placeholder="Search for potato, fish, meat, rice..."
                class="w-full pl-5 pr-14 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 text-sm transition-all outline-none"
                autocomplete="off"
              />
              <button id="search-submit-btn" class="absolute right-0 top-0 bottom-0 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-r-xl transition-colors flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </button>
              <!-- Autocomplete dropdown -->
              <div id="search-autocomplete" class="hidden absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl mt-1 z-50 overflow-hidden max-h-64 overflow-y-auto"></div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1 sm:gap-3">
            <!-- Mobile search icon -->
            <button id="mobile-search-btn" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Search">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>

            <!-- Account -->
            <a href="${user ? '#/account' : '#/login'}" class="hidden sm:flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors group">
              <svg class="w-5 h-5 ${user ? 'text-emerald-600' : 'text-gray-600'} group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span class="text-[10px] ${user ? 'text-emerald-700 font-bold' : 'text-gray-500'} group-hover:text-emerald-600">${user ? (user.name || 'Account').split(' ')[0] : 'Sign In'}</span>
            </a>

            <!-- Wishlist -->
            <a href="#/wishlist" class="hidden sm:flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors group">
              <svg class="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              <span class="text-[10px] text-gray-500 group-hover:text-red-500">Wishlist</span>
            </a>

            <!-- Cart -->
            <button id="cart-toggle-btn" class="relative flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors group" aria-label="Cart">
              <div class="relative">
                <svg class="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                ${cartCount > 0 ? `<span id="cart-badge" class="cart-badge absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">${cartCount > 9 ? '9+' : cartCount}</span>` : `<span id="cart-badge" class="hidden"></span>`}
              </div>
              <span class="hidden sm:block text-[10px] text-gray-500 group-hover:text-emerald-600">Cart</span>
            </button>
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
              { label: '🥗 Fresh Food', path: '/fresh' },
              { label: '🛒 Grocery', path: '/category/grocery' },
              { label: '🏠 Household', path: '/category/household' },
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

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="md:hidden hidden bg-white border-t border-gray-100 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-3">
          <ul class="space-y-1">
            ${[
              { label: '🏠 Home', path: '/' },
              { label: '📦 Categories', path: '/categories' },
              { label: '🔥 Deals', path: '/deals' },
              { label: '🥗 Vegetables', path: '/category/vegetables' },
              { label: '🍎 Fruits', path: '/category/fruits' },
              { label: '🐟 Fish', path: '/category/fish' },
              { label: '🥩 Meat', path: '/category/meat' },
              { label: '🛒 Grocery', path: '/category/grocery' },
              { label: '🏠 Household', path: '/category/household' },
              { label: '👤 Account', path: '/account' },
              { label: '❤️ Wishlist', path: '/wishlist' },
              { label: '⚙️ Add Product (Admin)', path: '/admin' },
            ].map(({ label, path }) => `
              <li>
                <a href="#${path}" class="mobile-menu-link flex items-center py-2.5 px-3 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition-colors text-sm">
                  ${label}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </header>
    `;

    attachHeaderEvents();
  };

  const attachHeaderEvents = () => {
    // Mobile menu toggle
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
      const menu = document.getElementById('mobile-menu');
      mobileMenuOpen = !mobileMenuOpen;
      menu.classList.toggle('hidden', !mobileMenuOpen);
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        document.getElementById('mobile-menu')?.classList.add('hidden');
        mobileMenuOpen = false;
      });
    });

    // Cart drawer toggle
    document.getElementById('cart-toggle-btn')?.addEventListener('click', () => {
      window.CartDrawer.open();
    });

    // Mobile search
    document.getElementById('mobile-search-btn')?.addEventListener('click', () => {
      window.SearchOverlay.open();
    });

    // Search input
    const searchInput = document.getElementById('header-search');
    const autocomplete = document.getElementById('search-autocomplete');

    const doSearch = () => {
      const q = searchInput.value.trim();
      if (q.length >= 2) {
        const results = window.searchProducts(q).slice(0, 6);
        if (results.length) {
          autocomplete.innerHTML = results.map(p => `
            <div class="autocomplete-item flex items-center gap-3 px-4 py-2.5 cursor-pointer border-b border-gray-50 last:border-0 transition-colors" data-slug="${p.slug}">
              <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-cover rounded-lg flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=60'" />
              <div class="min-w-0">
                <div class="text-sm font-medium text-gray-800 truncate">${p.name}</div>
                <div class="text-xs text-emerald-600 font-semibold">${window.Utils.formatPrice(p.variants[0].price)}</div>
              </div>
              <div class="ml-auto text-xs text-gray-400 capitalize">${p.category}</div>
            </div>
          `).join('') + `
            <div class="px-4 py-2.5 bg-gray-50 text-center">
              <button id="search-all-btn" class="text-sm text-emerald-600 font-semibold hover:text-emerald-700">See all results for "${q}"</button>
            </div>
          `;
          autocomplete.classList.remove('hidden');
          // Attach item clicks
          autocomplete.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', () => {
              autocomplete.classList.add('hidden');
              searchInput.value = '';
              window.Router.navigate(`/product/${item.dataset.slug}`);
            });
          });
          document.getElementById('search-all-btn')?.addEventListener('click', () => {
            autocomplete.classList.add('hidden');
            window.Router.navigate(`/search?q=${encodeURIComponent(q)}`);
            searchInput.value = '';
          });
        } else {
          autocomplete.innerHTML = `<div class="px-4 py-6 text-center text-sm text-gray-500">No results for "${q}"</div>`;
          autocomplete.classList.remove('hidden');
        }
      } else {
        autocomplete.classList.add('hidden');
      }
    };

    searchInput?.addEventListener('input', window.Utils.debounce(doSearch, 250));

    searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = searchInput.value.trim();
        if (q) {
          autocomplete.classList.add('hidden');
          window.Router.navigate(`/search?q=${encodeURIComponent(q)}`);
          searchInput.value = '';
        }
      }
    });

    document.getElementById('search-submit-btn')?.addEventListener('click', () => {
      const q = searchInput.value.trim();
      if (q) {
        autocomplete.classList.add('hidden');
        window.Router.navigate(`/search?q=${encodeURIComponent(q)}`);
        searchInput.value = '';
      }
    });

    // Close autocomplete on outside click
    document.addEventListener('click', (e) => {
      if (!document.getElementById('search-wrapper')?.contains(e.target)) {
        autocomplete?.classList.add('hidden');
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

  return { render, updateNav, updateCartBadge, logout };
})();
