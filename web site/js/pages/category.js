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

      <!-- Clean Category Header -->
      <div class="bg-white border-b border-[#E5E7EB]">
        <div class="max-w-7xl mx-auto px-4 py-4 sm:py-5">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <button onclick="window.history.back()" class="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#667085] hover:text-[#007d83] hover:border-[#007d83] transition-colors" title="Back">
                ${window.Icons ? window.Icons.render('arrowLeft', 'w-4 h-4') : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>'}
              </button>
              <div>
                <nav class="flex items-center gap-1.5 text-xs text-[#667085] mb-0.5">
                  <a href="#/" class="hover:text-[#007d83]">Home</a>
                  <span>/</span>
                  <span class="text-[#17212B] font-medium">Categories</span>
                </nav>
                <h1 class="text-xl sm:text-2xl font-bold text-[#17212B] leading-tight tracking-[-0.02em]">${category.name}</h1>
              </div>
            </div>
            <div class="text-xs text-[#007d83] bg-[#eefbfc] border border-[#93e2e4] rounded-md px-3 py-1 font-semibold tracking-[-0.01em] hidden xs:block">
              ${products.length} Products
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-6 pb-28 sm:pb-16">

        <!-- Subcategory chips -->
        ${category.subcategories && category.subcategories.length > 0 ? `
        <div class="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          <button onclick="window.Router.navigate('/category/${slug}')" class="flex-shrink-0 px-3.5 py-1.5 bg-[#007d83] text-white text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap shadow-xs tracking-[-0.01em]">All ${category.name}</button>
          ${category.subcategories.map(sub => `
            <button class="subcategory-chip flex-shrink-0 px-3.5 py-1.5 bg-white border border-[#E5E7EB] text-[#667085] hover:text-[#17212B] hover:border-[#007d83] text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-colors tracking-[-0.01em]" onclick="window.Router.navigate('/category/${slug}/${sub.slug}')">
              ${sub.name}
            </button>
          `).join('')}
        </div>
        ` : ''}

        <!-- Sort & Filter Bar -->
        <div class="flex items-center justify-between gap-4 mb-6 bg-white p-3 rounded-xl border border-[#E5E7EB]">
          <div class="flex items-center gap-3">
            <button id="toggle-filters-btn" class="flex items-center gap-2 px-3 py-1.5 bg-[#f4fdfe] border border-[#E5E7EB] rounded-lg text-xs sm:text-sm font-semibold text-[#17212B] hover:bg-gray-100 transition-colors md:hidden tracking-[-0.01em]" onclick="window.toggleCategoryFilters()">
              ${window.Icons ? window.Icons.render('filter', 'w-3.5 h-3.5 text-[#007d83]') : ''}
              <span>Filters</span>
            </button>
            <span class="text-xs sm:text-sm font-normal text-[#667085]" id="result-count">Showing <strong class="font-semibold text-[#17212B]">${filteredProducts.length}</strong> products</span>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-xs sm:text-sm text-[#667085] font-medium hidden sm:block">Sort by:</label>
            <select id="sort-select" class="bg-white border border-[#E5E7EB] text-[#17212B] text-xs sm:text-sm font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#007d83]" onchange="window.sortCategory(this.value)">
              <option value="popular">Popularity</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div class="flex gap-6">
          <!-- Filters sidebar (desktop) -->
          <div class="hidden md:block w-60 flex-shrink-0 sticky-sidebar">
            ${window.ProductFilters.render(products)}
          </div>

          <!-- Mobile filters drawer -->
          <div id="mobile-filters-drawer" class="hidden fixed inset-0 z-50 md:hidden">
            <div class="absolute inset-0 bg-black/50 backdrop-blur-xs" onclick="window.toggleCategoryFilters()"></div>
            <div class="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto p-5">
              <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                <h3 class="font-bold text-[#17212B]">Filter Products</h3>
                <button onclick="window.toggleCategoryFilters()" class="w-8 h-8 rounded-lg flex items-center justify-center text-[#667085] hover:text-[#17212B] hover:bg-gray-100">✕</button>
              </div>
              ${window.ProductFilters.render(products)}
            </div>
          </div>

          <!-- Product Grid -->
          <div class="flex-1 min-w-0">
            <div class="product-grid grid-4" id="category-product-grid">
              ${filteredProducts.length > 0
                ? filteredProducts.map(p => window.ProductCard.render(p)).join('')
                : `<div class="col-span-full bg-white rounded-xl border border-[#E5E7EB] text-center py-16 px-4">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-[#eefbfc] flex items-center justify-center text-[#007d83]">
                      ${window.Icons ? window.Icons.render('search', 'w-6 h-6') : ''}
                    </div>
                    <h3 class="font-bold text-[#17212B] text-base">No products match your criteria</h3>
                    <p class="text-[#667085] text-xs sm:text-sm mt-1">Try relaxing some filters or clearing search criteria.</p>
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
    if (countEl) countEl.innerHTML = `Showing <strong class="text-[#17212B]">${filteredProducts.length}</strong> products`;
    if (grid) {
      grid.innerHTML = filteredProducts.length > 0
        ? filteredProducts.map(p => window.ProductCard.render(p)).join('')
        : `<div class="col-span-full bg-white rounded-xl border border-[#E5E7EB] text-center py-16 px-4"><div class="w-12 h-12 mx-auto mb-3 rounded-full bg-[#eefbfc] flex items-center justify-center text-[#007d83]">${window.Icons ? window.Icons.render('search', 'w-6 h-6') : ''}</div><h3 class="font-bold text-[#17212B] text-base">No matching products</h3><p class="text-[#667085] text-xs sm:text-sm mt-1">Try adjusting your filters</p></div>`;
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
      <!-- Clean Category/Subcategory Header -->
      <div class="bg-white border-b border-[#E5E7EB]">
        <div class="max-w-7xl mx-auto px-4 py-4 sm:py-5">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <button onclick="window.history.back()" class="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#667085] hover:text-[#007d83] hover:border-[#007d83] transition-colors" title="Back">
                ${window.Icons ? window.Icons.render('arrowLeft', 'w-4 h-4') : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>'}
              </button>
              <div>
                <nav class="flex items-center gap-1.5 text-xs text-[#667085] mb-0.5">
                  <a href="#/" class="hover:text-[#007d83]">Home</a>
                  <span>/</span>
                  <a href="#/category/${slug}" class="hover:text-[#007d83]">${category.name}</a>
                  <span>/</span>
                  <span class="text-[#17212B] font-medium">${subcategory.name}</span>
                </nav>
                <h1 class="text-xl sm:text-2xl font-bold text-[#17212B] leading-tight tracking-[-0.02em]">${subcategory.name} Varieties</h1>
              </div>
            </div>
            <div class="text-xs text-[#007d83] bg-[#eefbfc] border border-[#93e2e4] rounded-md px-3 py-1 font-semibold tracking-[-0.01em] hidden xs:block">
              ${products.length} Products
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-6 pb-28 sm:pb-16">

        <!-- Origin / Variety Filter Chips -->
        ${origins.length > 1 ? `
        <div class="mb-6 bg-white p-3 rounded-xl border border-[#E5E7EB]">
          <div class="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Filter by Origin / Country:</div>
          <div class="flex flex-wrap gap-2">
            ${origins.map(orig => `
              <button
                class="origin-chip px-3 py-1.5 rounded-lg text-xs font-semibold transition-all tracking-[-0.01em] ${orig === activeOrigin ? 'bg-[#007d83] text-white shadow-xs' : 'bg-[#f4fdfe] text-[#17212B] hover:bg-gray-100 border border-[#E5E7EB]'}"
                onclick="window.filterSubByOrigin('${orig}')"
              >
                ${getOriginLabel(orig)}
              </button>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Sort & Count -->
        <div class="flex items-center justify-between mb-6 bg-white p-3 rounded-xl border border-[#E5E7EB]">
          <span class="text-xs sm:text-sm font-medium text-[#667085]" id="sub-result-count">Showing <strong class="text-[#17212B]">${filteredProducts.length}</strong> items</span>
          <div class="flex items-center gap-2">
            <label class="text-xs sm:text-sm text-[#667085] hidden sm:inline font-medium">Sort by:</label>
            <select id="sub-sort-select" class="bg-white border border-[#E5E7EB] text-[#17212B] text-xs sm:text-sm font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#007d83]" onchange="window.sortSubcategory(this.value)">
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div class="flex gap-6">
          <div class="hidden md:block w-60 flex-shrink-0 sticky-sidebar">
            ${window.ProductFilters.render(products)}
          </div>
          <div class="flex-1 min-w-0">
            <div class="product-grid grid-4" id="sub-product-grid">
              ${filteredProducts.length > 0
                ? filteredProducts.map(p => window.ProductCard.render(p)).join('')
                : `<div class="col-span-full bg-white rounded-xl border border-[#E5E7EB] text-center py-16 px-4">
                    <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-[#eefbfc] flex items-center justify-center text-[#007d83]">
                      ${window.Icons ? window.Icons.render('search', 'w-6 h-6') : ''}
                    </div>
                    <h3 class="font-bold text-[#17212B]">No products found for this selection</h3>
                    <button onclick="window.filterSubByOrigin('all')" class="mt-4 bg-[#007d83] hover:bg-[#006065] text-white px-5 py-2 rounded-lg text-xs font-semibold">Show All Varieties</button>
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
    if (countEl) countEl.innerHTML = `Showing <strong class="text-[#17212B]">${filteredProducts.length}</strong> items`;
    if (grid) {
      grid.innerHTML = filteredProducts.length > 0
        ? filteredProducts.map(p => window.ProductCard.render(p)).join('')
        : '<div class="col-span-full text-center py-8 text-[#667085]">No products match</div>';
    }
    document.querySelectorAll('.origin-chip').forEach(btn => {
      const isSelected = btn.getAttribute('onclick')?.includes(`'${origin}'`);
      btn.className = `origin-chip px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isSelected ? 'bg-[#007d83] text-white shadow-xs' : 'bg-[#f4fdfe] text-[#17212B] hover:bg-gray-100 border border-[#E5E7EB]'}`;
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
