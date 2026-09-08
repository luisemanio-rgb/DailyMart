// DailyMart BD — Search Results Page
window.Pages = window.Pages || {};
window.Pages.search = () => {
  const content = document.getElementById('page-content');
  const query = new URLSearchParams(window.location.hash.split('?')[1] || '').get('q') || '';

  let results = query ? window.searchProducts(query) : [];
  let currentSort = 'popular';

  const render = () => {
    content.innerHTML = `
    <div class="page-enter max-w-7xl mx-auto px-4 py-8 pb-24 sm:pb-12">
      <!-- Search header -->
      <div class="mb-8">
        <div class="max-w-2xl">
          <div class="relative mb-4">
            <input
              type="text"
              id="search-page-input"
              value="${query}"
              placeholder="Search for fresh groceries, fruits, vegetables..."
              class="w-full pl-5 pr-24 py-3 rounded-lg border border-[#E5E7EB] bg-white focus:border-[#007d83] text-sm text-[#17212B] transition-all outline-none"
            />
            <button id="search-page-btn" class="absolute right-1.5 top-1.5 bottom-1.5 bg-[#007d83] hover:bg-[#006065] text-white px-4 rounded-md text-xs font-bold transition-colors">Search</button>
          </div>
        </div>
        ${query ? `
          <div class="flex items-center gap-3">
            <h1 class="text-base sm:text-lg font-bold text-[#17212B]">
              ${results.length > 0 ? `Showing ${results.length} results for` : 'No results found for'}
              "<span class="text-[#007d83]">${query}</span>"
            </h1>
          </div>
        ` : `<h1 class="text-xl sm:text-2xl font-bold text-[#17212B]">Search Products</h1>`}
      </div>

      ${results.length === 0 && query ? `
        <div class="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl border border-[#E5E7EB] p-8 max-w-lg mx-auto">
          <div class="w-16 h-16 rounded-full bg-[#eefbfc] flex items-center justify-center text-[#007d83] mb-3">
            ${window.Icons ? window.Icons.render('search', 'w-8 h-8') : ''}
          </div>
          <h2 class="text-base font-bold text-[#17212B] mb-1">No products found</h2>
          <p class="text-[#667085] text-xs sm:text-sm mb-5">We couldn't find any items matching "<strong>${query}</strong>". Try popular searches below:</p>
          <div class="flex flex-wrap gap-2 justify-center">
            ${['Potato', 'Fish', 'Chicken', 'Rice', 'Mango', 'Onion', 'Tomato'].map(s =>
              `<button onclick="window.Router.navigate('/search?q=${encodeURIComponent(s)}')" class="px-3 py-1.5 bg-[#f4fdfe] border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#17212B] hover:border-[#007d83] hover:text-[#007d83] transition-colors">${s}</button>`
            ).join('')}
          </div>
        </div>
      ` : results.length > 0 ? `
        <div class="flex items-center justify-between mb-6 bg-white p-3 rounded-xl border border-[#E5E7EB]">
          <p class="text-xs sm:text-sm font-medium text-[#667085]">Showing <strong class="text-[#17212B]">${results.length}</strong> items</p>
          <select class="bg-white border border-[#E5E7EB] text-[#17212B] text-xs sm:text-sm font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#007d83]" onchange="window.Pages.sortSearch(this.value)">
            <option value="popular">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
        <div class="product-grid grid-4" id="search-results-grid">
          ${results.map(p => window.ProductCard.render(p)).join('')}
        </div>
      ` : `
        <!-- Empty state - show popular products -->
        <div>
          <h2 class="text-lg font-bold text-[#17212B] mb-4">Popular Grocery Items</h2>
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
