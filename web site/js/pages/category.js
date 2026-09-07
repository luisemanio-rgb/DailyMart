// DailyMart BD — Category Page
window.Pages = window.Pages || {};
window.Pages.category = (params) => {
  const content = document.getElementById('page-content');
  const { slug } = params;
  const category = window.CATEGORIES.find(c => c.slug === slug);

  if (!category) {
    window.Pages.notFound({});
    return;
  }

  let products = window.getProductsByCategory(slug);
  let filteredProducts = [...products];
  let currentSort = 'popular';
  let filterState = { priceMax: 99999, inStockOnly: false, organic: false, selectedGrades: [], selectedBrands: [] };
  let showFilters = false;

  const renderPage = () => {
    content.innerHTML = `
    <div class="page-enter">

      <!-- Clean Category Header matching Reference Image 1 -->
      <div class="bg-white border-b border-gray-100 shadow-2xs">
        <div class="max-w-7xl mx-auto px-4 py-3.5 sm:py-4">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <button onclick="window.history.back()" class="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-emerald-300 active:scale-95 transition-all" title="Back">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              </button>
              <div>
                <span class="text-[11px] text-gray-400 font-medium block leading-tight">ক্যাটাগরি</span>
                <h1 class="text-xl sm:text-2xl font-black text-gray-900 leading-tight">${category.name}</h1>
              </div>
            </div>
            <div class="text-xs text-gray-500 bg-gray-50 border border-gray-200/80 rounded-full px-3 py-1 font-medium hidden xs:block">
              ${products.length} Products
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-6 pb-24 sm:pb-12">

        <!-- Subcategory chips -->
        ${category.subcategories && category.subcategories.length > 0 ? `
        <div class="flex gap-3 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <button onclick="window.Router.navigate('/category/${slug}')" class="flex-shrink-0 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-full whitespace-nowrap">All ${category.name}</button>
          ${category.subcategories.map(sub => `
            <button class="subcategory-chip flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white shadow-sm border border-gray-200 text-gray-700 text-sm font-medium rounded-full whitespace-nowrap hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors" onclick="window.Router.navigate('/category/${slug}/${sub.slug}')">
              ${sub.icon} ${sub.name}
            </button>
          `).join('')}
        </div>
        ` : ''}

        <!-- Sort & Filter Bar -->
        <div class="flex items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-2">
            <button id="toggle-filters-btn" class="flex items-center gap-2 px-4 py-2 bg-white shadow-sm border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors md:hidden" onclick="window.toggleCategoryFilters()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/></svg>
              Filters
            </button>
            <span class="text-sm text-gray-500" id="result-count">${filteredProducts.length} products</span>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600 font-medium hidden sm:block">Sort:</label>
            <select id="sort-select" class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-200" onchange="window.sortCategory(this.value)">
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        <div class="flex gap-6">
          <!-- Filters sidebar (desktop) -->
          <div class="hidden md:block w-56 flex-shrink-0 sticky-sidebar">
            ${window.ProductFilters.render(products)}
          </div>

          <!-- Mobile filters drawer -->
          <div id="mobile-filters-drawer" class="hidden fixed inset-0 z-50 md:hidden">
            <div class="absolute inset-0 bg-black/50" onclick="window.toggleCategoryFilters()"></div>
            <div class="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-gray-800">Filters</h3>
                <button onclick="window.toggleCategoryFilters()" class="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              ${window.ProductFilters.render(products)}
            </div>
          </div>

          <!-- Product Grid -->
          <div class="flex-1 min-w-0">
            <div class="product-grid grid-4" id="category-product-grid">
              ${filteredProducts.length > 0
                ? filteredProducts.map(p => window.ProductCard.render(p)).join('')
                : `<div class="col-span-full text-center py-16">
                    <div class="text-6xl mb-4">📦</div>
                    <h3 class="font-semibold text-gray-700">No products found</h3>
                    <p class="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
                  </div>`
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    // Listen for filter changes
    document.addEventListener('filter-changed', handleFilter);
  };

  const handleFilter = (e) => {
    filterState = { ...filterState, ...e.detail };
    filteredProducts = window.ProductFilters.filterProducts(products, filterState);
    filteredProducts = window.ProductFilters.sortProducts(filteredProducts, currentSort);
    const grid = document.getElementById('category-product-grid');
    const countEl = document.getElementById('result-count');
    if (countEl) countEl.textContent = `${filteredProducts.length} products`;
    if (grid) {
      grid.innerHTML = filteredProducts.length > 0
        ? filteredProducts.map(p => window.ProductCard.render(p)).join('')
        : `<div class="col-span-full text-center py-16"><div class="text-6xl mb-4">🔍</div><h3 class="font-semibold text-gray-700">No matching products</h3><p class="text-gray-400 text-sm mt-1">Try adjusting your filters</p></div>`;
    }
  };

  window.sortCategory = (sortBy) => {
    currentSort = sortBy;
    filteredProducts = window.ProductFilters.sortProducts(filteredProducts, sortBy);
    const grid = document.getElementById('category-product-grid');
    if (grid) grid.innerHTML = filteredProducts.map(p => window.ProductCard.render(p)).join('');
  };

  window.toggleCategoryFilters = () => {
    const drawer = document.getElementById('mobile-filters-drawer');
    if (drawer) drawer.classList.toggle('hidden');
  };

  renderPage();
};

// Subcategory page (e.g. /category/vegetables/potato)
window.Pages.subcategory = (params) => {
  const content = document.getElementById('page-content');
  const { slug, subslug } = params;
  const category = window.CATEGORIES.find(c => c.slug === slug);
  const subcategory = category?.subcategories?.find(s => s.slug === subslug);

  if (!category || !subcategory) {
    window.Pages.category(params);
    return;
  }

  const products = window.getProductsBySubcategory(subslug);
  let activeOrigin = 'all';
  let currentSort = 'popular';
  let filteredProducts = [...products];

  // Get distinct origins if any
  const origins = ['all'];
  products.forEach(p => {
    if (p.originCountry && !origins.includes(p.originCountry)) {
      origins.push(p.originCountry);
    }
  });

  const getOriginLabel = (orig) => {
    if (orig === 'all') return `All (${products.length})`;
    if (orig === 'Bangladesh') return 'Bangladeshi';
    if (orig === 'India') return 'Indian';
    if (orig === 'Pakistan') return 'Pakistani';
    if (orig === 'Sri Lanka') return 'Sri Lankan';
    if (orig.includes('Holland')) return 'Holland Diamond';
    return orig;
  };

  const renderSubPage = () => {
    content.innerHTML = `
    <div class="page-enter">
      <!-- Banner -->
      <div class="relative h-44 md:h-56 overflow-hidden">
        <img src="${subcategory.image}" alt="${subcategory.name}" class="w-full h-full object-cover" onerror="this.parentElement.style.background='linear-gradient(135deg,#064e3b,#059669)'" />
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900/85 to-gray-900/30 flex items-end pb-6">
          <div class="max-w-7xl mx-auto px-4 w-full">
            <nav class="flex items-center text-white/70 text-sm mb-2">
              <a href="#/" class="hover:text-white">Home</a>
              <span class="mx-2 text-white/40">›</span>
              <a href="#/category/${slug}" class="hover:text-white">${category.name}</a>
              <span class="mx-2 text-white/40">›</span>
              <span class="text-white font-medium">${subcategory.name}</span>
            </nav>
            <h1 class="text-3xl md:text-4xl font-black text-white">${subcategory.icon} ${subcategory.name} Varieties</h1>
            <p class="text-white/80 text-sm mt-1">${products.length} distinct types and origins available</p>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-6">

        <!-- Origin / Variety Filter Chips -->
        ${origins.length > 1 ? `
        <div class="mb-6 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <div class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Filter by Origin / Country:</div>
          <div class="flex flex-wrap gap-2">
            ${origins.map(orig => `
              <button
                class="origin-chip px-4 py-2 rounded-xl text-sm font-semibold transition-all ${orig === activeOrigin ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200'}"
                onclick="window.filterSubByOrigin('${orig}')"
              >
                ${getOriginLabel(orig)}
              </button>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Sort & Count -->
        <div class="flex items-center justify-between mb-6">
          <span class="text-sm font-semibold text-gray-700" id="sub-result-count">${filteredProducts.length} items found</span>
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-500 hidden sm:inline">Sort:</label>
            <select id="sub-sort-select" class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2 pr-8" onchange="window.sortSubcategory(this.value)">
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        <div class="flex gap-6">
          <div class="hidden md:block w-56 flex-shrink-0 sticky-sidebar">
            ${window.ProductFilters.render(products)}
          </div>
          <div class="flex-1 min-w-0">
            <div class="product-grid grid-4" id="sub-product-grid">
              ${filteredProducts.length > 0
                ? filteredProducts.map(p => window.ProductCard.render(p)).join('')
                : `<div class="col-span-full text-center py-16">
                    <div class="text-6xl mb-4">📦</div>
                    <h3 class="font-semibold text-gray-700">No products found for this selection</h3>
                    <button onclick="window.filterSubByOrigin('all')" class="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-semibold">Show All Varieties</button>
                  </div>`
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  };

  window.filterSubByOrigin = (origin) => {
    activeOrigin = origin;
    let list = [...products];
    if (origin !== 'all') {
      list = list.filter(p => p.originCountry === origin);
    }
    filteredProducts = window.ProductFilters.sortProducts(list, currentSort);
    const grid = document.getElementById('sub-product-grid');
    const countEl = document.getElementById('sub-result-count');
    if (countEl) countEl.textContent = `${filteredProducts.length} items found`;
    if (grid) {
      grid.innerHTML = filteredProducts.length > 0
        ? filteredProducts.map(p => window.ProductCard.render(p)).join('')
        : '<div class="col-span-full text-center py-8 text-gray-400">No products match</div>';
    }
    document.querySelectorAll('.origin-chip').forEach(btn => {
      const isSelected = btn.getAttribute('onclick')?.includes(`'${origin}'`);
      btn.className = `origin-chip px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isSelected ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200'}`;
    });
  };

  window.sortSubcategory = (sortBy) => {
    currentSort = sortBy;
    filteredProducts = window.ProductFilters.sortProducts(filteredProducts, sortBy);
    const grid = document.getElementById('sub-product-grid');
    if (grid) grid.innerHTML = filteredProducts.map(p => window.ProductCard.render(p)).join('');
  };

  renderSubPage();
};
