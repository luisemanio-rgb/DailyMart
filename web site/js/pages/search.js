// DailyMart BD — Search Results Page
window.Pages = window.Pages || {};
window.Pages.search = () => {
  const content = document.getElementById('page-content');
  const query = new URLSearchParams(window.location.hash.split('?')[1] || '').get('q') || '';

  let results = query ? window.searchProducts(query) : [];
  let currentSort = 'popular';

  const render = () => {
    content.innerHTML = `
    <div class="page-enter max-w-7xl mx-auto px-4 py-8">
      <!-- Search header -->
      <div class="mb-8">
        <div class="max-w-2xl">
          <div class="relative mb-4">
            <input
              type="text"
              id="search-page-input"
              value="${query}"
              placeholder="Search for products..."
              class="w-full pl-5 pr-14 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 text-base transition-all outline-none"
            />
            <button id="search-page-btn" class="absolute right-2 top-2 bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">Search</button>
          </div>
        </div>
        ${query ? `
          <div class="flex items-center gap-3">
            <h1 class="text-lg font-bold text-gray-800">
              ${results.length > 0 ? `${results.length} results for` : 'No results for'}
              "<span class="text-emerald-600">${query}</span>"
            </h1>
          </div>
        ` : `<h1 class="text-2xl font-bold text-gray-800">Search Products</h1>`}
      </div>

      ${results.length === 0 && query ? `
        <div class="flex flex-col items-center justify-center py-20 text-center">
          <div class="text-8xl mb-6">🔍</div>
          <h2 class="text-xl font-bold text-gray-700 mb-2">No results found</h2>
          <p class="text-gray-400 mb-6">We couldn't find anything for "<strong>${query}</strong>". Try different keywords.</p>
          <div class="flex flex-wrap gap-2 justify-center">
            ${['Potato', 'Fish', 'Chicken', 'Rice', 'Mango', 'Onion'].map(s =>
              `<button onclick="window.Router.navigate('/search?q=${encodeURIComponent(s)}')" class="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors">${s}</button>`
            ).join('')}
          </div>
        </div>
      ` : results.length > 0 ? `
        <div class="flex items-center justify-between mb-6">
          <p class="text-sm text-gray-500">${results.length} products found</p>
          <select class="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl px-3 py-2 pr-8" onchange="window.Pages.sortSearch(this.value)">
            <option value="popular">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>
        <div class="product-grid grid-4" id="search-results-grid">
          ${results.map(p => window.ProductCard.render(p)).join('')}
        </div>
      ` : `
        <!-- Empty state - show popular products -->
        <div>
          <h2 class="text-xl font-bold text-gray-800 mb-4">Popular Products</h2>
          <div class="product-grid grid-4">
            ${window.getBestSellers().slice(0, 8).map(p => window.ProductCard.render(p)).join('')}
          </div>
        </div>
      `}
    </div>
    `;

    document.getElementById('search-page-btn')?.addEventListener('click', () => {
      const q = document.getElementById('search-page-input')?.value.trim();
      if (q) window.Router.navigate(`/search?q=${encodeURIComponent(q)}`);
    });

    document.getElementById('search-page-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim();
        if (q) window.Router.navigate(`/search?q=${encodeURIComponent(q)}`);
      }
    });
  };

  window.Pages.sortSearch = (sortBy) => {
    results = window.ProductFilters.sortProducts(results, sortBy);
    const grid = document.getElementById('search-results-grid');
    if (grid) grid.innerHTML = results.map(p => window.ProductCard.render(p)).join('');
  };

  render();
};
