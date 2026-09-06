// DailyMart BD — Wishlist Page
window.Pages = window.Pages || {};
window.Pages.wishlist = () => {
  const content = document.getElementById('page-content');

  const render = () => {
    const products = window.Store.getWishlistProducts();

    content.innerHTML = `
    <div class="page-enter max-w-7xl mx-auto px-4 py-8">
      <nav class="flex items-center text-sm text-gray-500 mb-6">
        <a href="#/" class="hover:text-emerald-600">Home</a>
        <span class="mx-2">›</span>
        <span class="text-gray-800 font-medium">Wishlist</span>
      </nav>

      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-black text-gray-900">❤️ My Wishlist
          <span class="text-lg font-normal text-gray-400 ml-2">(${products.length} items)</span>
        </h1>
        ${products.length > 0 ? `
          <button onclick="window.Pages.addAllToCart()" class="bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors text-sm">
            Add All to Cart
          </button>
        ` : ''}
      </div>

      ${products.length === 0 ? `
        <div class="flex flex-col items-center justify-center py-24 text-center">
          <div class="text-8xl mb-6">💔</div>
          <h2 class="text-2xl font-bold text-gray-700 mb-3">Your wishlist is empty</h2>
          <p class="text-gray-400 mb-8">Save items you like by clicking the heart icon on any product.</p>
          <button onclick="window.Router.navigate('/categories')" class="bg-emerald-600 text-white font-bold px-10 py-3.5 rounded-xl hover:bg-emerald-700 transition-colors">
            Browse Products
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
    window.Toast.success(`🛒 ${products.length} items added to cart!`);
  };

  render();
};
