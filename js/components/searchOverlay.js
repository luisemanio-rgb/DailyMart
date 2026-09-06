// DailyMart BD — Search Overlay
window.SearchOverlay = (() => {
  const open = () => {
    const root = document.getElementById('search-overlay-root');
    root.innerHTML = `
    <div id="search-overlay" class="search-overlay" onclick="window.SearchOverlay.close()">
      <div class="flex flex-col h-full" onclick="event.stopPropagation()">
        <!-- Search input area -->
        <div class="bg-white p-4 shadow-lg">
          <div class="max-w-2xl mx-auto">
            <div class="flex items-center gap-3">
              <div class="flex-1 relative">
                <input
                  type="text"
                  id="overlay-search-input"
                  placeholder="Search for potato, fish, rice..."
                  class="w-full pl-5 pr-14 py-3 rounded-xl border border-emerald-300 focus:ring-2 focus:ring-emerald-200 text-base outline-none"
                  autocomplete="off"
                />
                <button class="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600" id="overlay-search-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
              </div>
              <button onclick="window.SearchOverlay.close()" class="text-gray-500 hover:text-gray-700 font-medium px-3">Cancel</button>
            </div>
          </div>
        </div>

        <!-- Results area -->
        <div class="flex-1 overflow-y-auto p-4">
          <div class="max-w-2xl mx-auto" id="overlay-results">
            <!-- Popular searches -->
            <div>
              <h3 class="text-sm font-semibold text-gray-600 mb-3">Popular Searches</h3>
              <div class="flex flex-wrap gap-2">
                ${['Potato', 'Hilsa Fish', 'Chicken', 'Mango', 'Rice', 'Onion', 'Egg', 'Milk'].map(q =>
                  `<button class="search-chip px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 shadow-sm border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors" onclick="window.SearchOverlay.search('${q}')">${q}</button>`
                ).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    requestAnimationFrame(() => {
      document.getElementById('search-overlay')?.classList.add('open');
      document.getElementById('overlay-search-input')?.focus();
    });

    const input = document.getElementById('overlay-search-input');
    input?.addEventListener('input', window.Utils.debounce((e) => {
      window.SearchOverlay.showResults(e.target.value);
    }, 250));

    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') window.SearchOverlay.search(e.target.value);
    });

    document.getElementById('overlay-search-btn')?.addEventListener('click', () => {
      window.SearchOverlay.search(input?.value);
    });
  };

  const showResults = (q) => {
    const resultsEl = document.getElementById('overlay-results');
    if (!resultsEl) return;
    if (!q || q.length < 2) {
      resultsEl.innerHTML = '';
      return;
    }

    const results = window.searchProducts(q);
    if (results.length === 0) {
      resultsEl.innerHTML = `<div class="text-center py-8 text-gray-400">No results for "${q}"</div>`;
      return;
    }

    resultsEl.innerHTML = `
      <h3 class="text-sm font-semibold text-gray-600 mb-3">${results.length} results for "${q}"</h3>
      <div class="space-y-3">
        ${results.map(p => `
          <div class="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-emerald-50 transition-colors" onclick="window.SearchOverlay.close(); window.Router.navigate('/product/${p.slug}')">
            <img src="${p.image}" alt="${p.name}" class="w-14 h-14 object-cover rounded-xl flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=60'" />
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-gray-800 text-sm">${p.name}</div>
              <div class="text-xs text-gray-400 capitalize">${p.category} › ${p.subcategory}</div>
              <div class="text-sm font-bold text-emerald-600">${window.Utils.formatPrice(p.variants[0].price)} <span class="text-xs text-gray-400 font-normal">/${p.variants[0].unit}</span></div>
            </div>
            <svg class="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        `).join('')}
      </div>
    `;
  };

  const search = (q) => {
    if (!q || !q.trim()) return;
    close();
    window.Router.navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const close = () => {
    document.getElementById('search-overlay')?.classList.remove('open');
    setTimeout(() => {
      const root = document.getElementById('search-overlay-root');
      if (root) root.innerHTML = '';
    }, 300);
  };

  return { open, close, search, showResults };
})();
