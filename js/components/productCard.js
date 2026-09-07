// DailyMart BD — Product Card Component (Restored Classic Card Layout with Premium Buy Now Button & Cleaned Info)
window.ProductCard = {
  render: (product, variant = null) => {
    const v = variant || product.variants[0];
    const inWishlist = window.Store.isInWishlist(product.id);
    const stock = window.Utils.stockLabel(v.stock);
    const discountPct = v.oldPrice ? window.Utils.discountPercent(v.price, v.oldPrice) : 0;

    return `
    <div 
      class="product-card bg-white rounded-2xl shadow-card overflow-hidden relative cursor-pointer border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between" 
      data-product-id="${product.id}" 
      data-variant-id="${v.variantId}"
      onclick="window.Router.navigate('/product/${product.slug}')"
    >
      <!-- Badges -->
      <div class="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
        ${discountPct > 0 ? `<span class="discount-badge bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm">-${discountPct}%</span>` : ''}
        ${product.bestSeller ? `<span class="bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm">Best Seller</span>` : ''}
        ${product.organic ? `<span class="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow-sm">Organic</span>` : ''}
      </div>

      <!-- Wishlist Button -->
      <button
        class="wishlist-btn absolute top-2.5 right-2.5 z-10 w-8 h-8 bg-white/90 backdrop-blur-xs rounded-full shadow-md flex items-center justify-center ${inWishlist ? 'active text-red-500' : 'text-gray-400 hover:text-red-400'} transition-all hover:scale-110"
        data-product-id="${product.id}"
        onclick="event.stopPropagation(); window.ProductCard.toggleWishlist(this, '${product.id}')"
        aria-label="Add to Wishlist"
      >
        <svg class="w-4 h-4" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>

      <!-- Product Image -->
      <div class="img-zoom-container h-44 sm:h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src="${v.image || product.image}"
          alt="${product.name}"
          class="product-img w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onerror="this.src='images/potatoes/potato-deshi.jpg';this.classList.add('fallback')"
          loading="lazy"
        />
      </div>

      <!-- Product Info -->
      <div class="p-3 sm:p-4 flex flex-col justify-between flex-1">
        <div>
          <!-- Category & Origin Badge -->
          <div class="flex items-center justify-between gap-1 text-xs mb-1.5">
            <span class="text-emerald-600 font-semibold capitalize truncate text-[11px] sm:text-xs">${product.category.replace(/-/g, ' ')}</span>
            ${product.originCountry ? `<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded flex items-center gap-1">${product.originCountry === 'Bangladesh' ? 'BD' : product.originCountry === 'India' ? 'India' : product.originCountry === 'Pakistan' ? 'Pak' : product.originCountry === 'Sri Lanka' ? 'Sri Lanka' : product.originCountry.includes('Holland') ? 'Holland' : product.originCountry}</span>` : ''}
          </div>

          <!-- Product Name -->
          <h3 class="text-xs sm:text-sm font-bold text-gray-900 mb-1.5 line-clamp-2 hover:text-emerald-700 transition-colors leading-snug">
            ${product.name}
          </h3>

          <!-- Rating & Stock in One Clean Row (Grade moved to Product Details) -->
          <div class="flex items-center justify-between gap-1 mb-2">
            <div class="flex items-center gap-1">
              ${window.Utils.stars(product.rating, 'sm')}
              <span class="text-[11px] text-gray-400 font-medium">(${product.reviewCount})</span>
            </div>
            <span class="text-[11px] font-semibold ${stock.color === 'red' ? 'text-red-500' : stock.color === 'yellow' ? 'text-amber-500' : 'text-emerald-600'} flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full ${stock.color === 'red' ? 'bg-red-500' : stock.color === 'yellow' ? 'bg-amber-400' : 'bg-emerald-500'}"></span>
              ${stock.text}
            </span>
          </div>

          <!-- Price Row -->
          <div class="flex items-baseline gap-1.5 mb-2">
            <span class="text-base sm:text-lg font-black text-emerald-700">${window.Utils.formatPrice(v.price)}</span>
            ${v.oldPrice ? `<span class="text-[11px] sm:text-xs text-gray-400 line-through">${window.Utils.formatPrice(v.oldPrice)}</span>` : ''}
            <span class="text-[11px] sm:text-xs text-gray-400 ml-auto font-medium">/${v.unit}</span>
          </div>
        </div>

        <!-- Premium Action Buttons (Rock-solid on Mobile) -->
        <div class="flex items-center gap-1.5 sm:gap-2 pt-2 border-t border-gray-100 mt-auto">
          <button
            class="buy-now-btn flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-95 text-white font-bold py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1 text-xs sm:text-sm tracking-wide min-w-0"
            onclick="event.stopPropagation(); window.ProductCard.buyNow(this, '${product.id}', '${v.variantId}')"
            title="Buy Now (Direct Checkout)"
          >
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span class="truncate">Buy Now</span>
          </button>
          <button
            class="add-cart-icon-btn w-8 h-8 sm:w-9 sm:h-9 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs flex-shrink-0"
            onclick="event.stopPropagation(); window.ProductCard.quickAdd(this, '${product.id}', '${v.variantId}')"
            title="Add to Cart"
          >
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    `;
  },

  buyNow: (btn, productId, variantId) => {
    const product = window.getProductById(productId);
    const variant = product?.variants.find(v => v.variantId === variantId);
    if (!product || !variant) return;

    const selectedWeight = variant.weights ? variant.weights[0] : variant.weight;
    window.Store.addToCart({ product, variant, selectedWeight, quantity: 1 });
    window.Router.navigate('/checkout');
  },

  quickAdd: (btn, productId, variantId) => {
    const product = window.getProductById(productId);
    const variant = product?.variants.find(v => v.variantId === variantId);
    if (!product || !variant) return;

    const selectedWeight = variant.weights ? variant.weights[0] : variant.weight;
    window.Store.addToCart({ product, variant, selectedWeight, quantity: 1 });
    if (window.Toast) window.Toast.success(`🛒 ${product.name} added to cart!`);

    // Button pop feedback
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<span class="text-xs font-black">✓</span>';
    btn.classList.add('bg-green-700', 'text-white');
    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.classList.remove('bg-green-700', 'text-white');
    }, 1000);
  },

  toggleWishlist: (btn, productId) => {
    const added = window.Store.toggleWishlist(productId);
    const svg = btn.querySelector('svg');
    if (added) {
      btn.classList.add('active', 'text-red-500');
      btn.classList.remove('text-gray-400');
      svg?.setAttribute('fill', 'currentColor');
      if (window.Toast) window.Toast.success('❤️ Added to wishlist!');
    } else {
      btn.classList.remove('active', 'text-red-500');
      btn.classList.add('text-gray-400');
      svg?.setAttribute('fill', 'none');
      if (window.Toast) window.Toast.info('Removed from wishlist');
    }
  },
};
