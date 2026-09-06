// DailyMart BD — Product Filters Component
window.ProductFilters = {
  state: {
    priceMin: 0,
    priceMax: 2000,
    sortBy: 'popular',
    organic: false,
    inStockOnly: false,
    selectedGrades: [],
    selectedBrands: [],
  },

  render: (products, onFilter) => {
    const allGrades = [...new Set(products.flatMap(p => p.variants.map(v => v.grade)).filter(Boolean))];
    const allBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    const maxPrice = Math.max(...products.flatMap(p => p.variants.map(v => v.price)), 2000);

    return `
    <div class="bg-white rounded-2xl shadow-card p-4" id="filter-panel">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-gray-800">Filters</h3>
        <button class="text-xs text-emerald-600 font-medium hover:text-emerald-700" onclick="window.ProductFilters.reset()">Clear All</button>
      </div>

      <!-- Price Range -->
      <div class="mb-6">
        <h4 class="text-sm font-semibold text-gray-700 mb-3">Price Range</h4>
        <div class="space-y-2">
          <input type="range" id="filter-price-max" min="0" max="${maxPrice}" value="${maxPrice}" step="10" class="w-full accent-emerald-600" oninput="window.ProductFilters.updatePriceLabel(this.value)" />
          <div class="flex justify-between text-xs text-gray-500">
            <span>৳0</span>
            <span id="price-max-label" class="font-semibold text-emerald-600">৳${maxPrice}</span>
          </div>
        </div>
      </div>

      <!-- Availability -->
      <div class="mb-6">
        <h4 class="text-sm font-semibold text-gray-700 mb-3">Availability</h4>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" id="filter-in-stock" class="w-4 h-4 accent-emerald-600" />
          <span class="text-sm text-gray-600">In Stock Only</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer mt-2">
          <input type="checkbox" id="filter-organic" class="w-4 h-4 accent-emerald-600" />
          <span class="text-sm text-gray-600">Organic Only</span>
        </label>
      </div>

      <!-- Grade -->
      ${allGrades.length > 0 ? `
      <div class="mb-6">
        <h4 class="text-sm font-semibold text-gray-700 mb-3">Grade</h4>
        <div class="space-y-2">
          ${allGrades.map(grade => `
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 accent-emerald-600 filter-grade" value="${grade}" />
              <span class="text-sm text-gray-600">Grade ${grade}</span>
            </label>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Brand -->
      ${allBrands.length > 1 ? `
      <div class="mb-6">
        <h4 class="text-sm font-semibold text-gray-700 mb-3">Brand</h4>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          ${allBrands.slice(0, 8).map(brand => `
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 accent-emerald-600 filter-brand" value="${brand}" />
              <span class="text-sm text-gray-600 truncate">${brand}</span>
            </label>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Apply Button -->
      <button
        class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
        onclick="window.ProductFilters.apply()"
      >
        Apply Filters
      </button>
    </div>
    `;
  },

  updatePriceLabel: (val) => {
    const el = document.getElementById('price-max-label');
    if (el) el.textContent = `৳${val}`;
  },

  apply: () => {
    const state = {
      priceMax: parseInt(document.getElementById('filter-price-max')?.value || 9999),
      inStockOnly: document.getElementById('filter-in-stock')?.checked || false,
      organic: document.getElementById('filter-organic')?.checked || false,
      selectedGrades: [...document.querySelectorAll('.filter-grade:checked')].map(el => el.value),
      selectedBrands: [...document.querySelectorAll('.filter-brand:checked')].map(el => el.value),
    };
    window.ProductFilters.state = { ...window.ProductFilters.state, ...state };

    // Dispatch filter event
    document.dispatchEvent(new CustomEvent('filter-changed', { detail: state }));
    window.Toast.info('Filters applied');
  },

  reset: () => {
    document.querySelectorAll('#filter-panel input[type="checkbox"]').forEach(el => el.checked = false);
    const priceInput = document.getElementById('filter-price-max');
    if (priceInput) {
      priceInput.value = priceInput.max;
      window.ProductFilters.updatePriceLabel(priceInput.max);
    }
    document.dispatchEvent(new CustomEvent('filter-changed', { detail: { priceMax: 99999, inStockOnly: false, organic: false, selectedGrades: [], selectedBrands: [] } }));
  },

  filterProducts: (products, filterState) => {
    return products.filter(p => {
      if (filterState.organic && !p.organic) return false;
      if (filterState.inStockOnly && p.variants.every(v => v.stock === 0)) return false;
      if (filterState.selectedGrades.length && !p.variants.some(v => filterState.selectedGrades.includes(v.grade))) return false;
      if (filterState.selectedBrands.length && !filterState.selectedBrands.includes(p.brand)) return false;
      if (filterState.priceMax && p.variants.every(v => v.price > filterState.priceMax)) return false;
      return true;
    });
  },

  sortProducts: (products, sortBy) => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc': return sorted.sort((a, b) => a.variants[0].price - b.variants[0].price);
      case 'price-desc': return sorted.sort((a, b) => b.variants[0].price - a.variants[0].price);
      case 'rating': return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest': return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default: return sorted.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    }
  },
};
