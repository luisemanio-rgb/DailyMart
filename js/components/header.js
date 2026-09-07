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
      <div class="max-w-7xl mx-auto px-4 py-2.5 sm:py-3">
        <div class="flex items-center justify-between gap-3 md:gap-6">
          
          <!-- Left: Hamburger & Brand Logo -->
          <div class="flex items-center gap-2 sm:gap-3">
            <button id="mobile-menu-btn" class="md:hidden p-2 -ml-1.5 rounded-xl hover:bg-gray-100 text-gray-700 transition-colors" aria-label="Menu">
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

          <!-- Center: Desktop Search Bar (Matching Reference Image 2) -->
          <div class="hidden md:block flex-1 max-w-xl mx-2">
            <div class="relative" id="search-wrapper">
              <div class="relative flex items-center bg-white rounded-full shadow-sm border border-gray-200/90 hover:border-orange-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all p-1 pl-5">
                <input
                  type="text"
                  id="header-search"
                  placeholder="Search..."
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

        <!-- Mobile Search Bar (Matching Reference Image 2) -->
        <div class="md:hidden mt-2.5">
          <div class="relative" id="mobile-search-wrapper">
            <div class="relative flex items-center bg-white rounded-full shadow-xs border border-gray-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all p-1 pl-4">
              <input
                type="text"
                id="mobile-header-search"
                placeholder="Search..."
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

  return { render, updateNav, updateCartBadge, logout };
})();
