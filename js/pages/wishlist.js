// DailyMart BD — Wishlist Page
window.Pages = window.Pages || {};
window.Pages.wishlist = () => {
  const content = document.getElementById('page-content');

  const render = () => {
    const products = window.Store.getWishlistProducts();

    content.innerHTML = `
    <div class="page-enter max-w-7xl mx-auto px-4 py-8 pb-24 sm:pb-12">
      <nav class="flex items-center text-xs text-[#667085] mb-4 gap-1.5">
        <a href="#/" class="hover:text-[#007d83]">Home</a>
        <span>/</span>
        <span class="text-[#17212B] font-medium">Wishlist</span>
      </nav>

      <div class="flex items-center justify-between mb-6 pb-3 border-b border-[#E5E7EB]">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-[#17212B]">My Wishlist</h1>
          <p class="text-xs text-[#667085] mt-0.5">${products.length} saved ${products.length === 1 ? 'item' : 'items'}</p>
        </div>
        ${products.length > 0 ? `
          <button onclick="window.Pages.addAllToCart()" class="bg-[#007d83] hover:bg-[#006065] text-white font-semibold px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm shadow-xs">
            Add All to Cart
          </button>
        ` : ''}
      </div>

      ${products.length === 0 ? `
        <div class="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-[#E5E7EB] p-8 max-w-md mx-auto">
          <div class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-[#E5484D] mb-3">
            ${window.Icons ? window.Icons.render('heart', 'w-8 h-8') : '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>'}
          </div>
          <h2 class="text-base font-bold text-[#17212B] mb-1">Your wishlist is empty</h2>
          <p class="text-xs text-[#667085] mb-6">Explore our catalog and click the heart icon on any product to save it for later.</p>
          <button onclick="window.Router.navigate('/categories')" class="bg-[#007d83] hover:bg-[#006065] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-xs sm:text-sm">
            Browse Groceries
          </button>
        </div>
      ` : `
        <div class="product-grid grid-4">
          ${products.map(p => window.ProductCard.render(p)).join('')}
        </div>
      `}
    </div>
    `;
  };

  window.Pages.addAllToCart = () => {
    const products = window.Store.getWishlistProducts();
    products.forEach(p => {
      const v = p.variants[0];
      const weight = v.weights ? v.weights[0] : v.weight;
      window.Store.addToCart({ product: p, variant: v, selectedWeight: weight, quantity: 1 });
    });
    window.Toast.success(`${products.length} items added to cart`);
  };

  render();
};
