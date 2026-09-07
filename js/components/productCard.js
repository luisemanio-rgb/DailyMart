// DailyMart BD — Product Card Component (Ultra-Premium Greeny Style with Tight Name-Price Pairing)
window.ProductCard = {
  render: (product, variant = null) => {
    const v = variant || product.variants[0];
    const discountPct = v.oldPrice ? window.Utils.discountPercent(v.price, v.oldPrice) : 0;
    const inWishlist = window.Store?.isInWishlist ? window.Store.isInWishlist(product.id) : false;
    const cleanName = (product.name || '')
      .replace(/\s*\([\u0980-\u09FF\s\-]+\)/g, '')
      .replace(/^Bangladeshi\s+/i, '')
      .replace(/\bBD\b/g, '')
      .trim();

    return `
    <div 
      class="product-card bg-white rounded-2xl shadow-xs hover:shadow-md border border-[#E2E8E4] hover:border-[#166534]/50 overflow-hidden relative cursor-pointer transition-all duration-300 flex flex-col justify-between group" 
      data-product-id="${product.id}" 
      data-variant-id="${v.variantId}"
      onclick="window.Router.navigate('/product/${product.slug}')"
    >
      <!-- Top Image Container (Soft Off-White #F8FAF7) -->
      <div class="relative w-full h-40 sm:h-48 bg-[#F8FAF7] overflow-hidden flex items-center justify-center">
        <!-- Top-Left: Discount Badge (#DC2626) -->
        ${discountPct > 0 ? `
          <span class="absolute top-2.5 left-2.5 z-10 bg-[#DC2626] text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-lg shadow-xs tracking-tight pointer-events-none">
            -${discountPct}%
          </span>
        ` : ''}

        <!-- Top-Right: Wishlist Heart Button -->
        <button
          class="wishlist-btn absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-white/95 backdrop-blur-xs rounded-full shadow-xs flex items-center justify-center ${inWishlist ? 'active text-[#DC2626]' : 'text-[#64748B] hover:text-[#DC2626] hover:bg-white'} transition-all hover:scale-105"
          data-product-id="${product.id}"
          onclick="event.stopPropagation(); window.ProductCard.toggleWishlist(this, '${product.id}')"
          aria-label="Add to Wishlist"
        >
          <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        <img
          src="${v.image || product.image}"
          alt="${cleanName}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onerror="this.src='images/potatoes/potato-deshi.jpg';this.classList.add('fallback')"
          loading="lazy"
        />
      </div>

      <!-- Product Info: Centered, Clean, Spacious -->
      <div class="p-3.5 sm:p-4 flex flex-col justify-between flex-1 text-center bg-white">
        <div class="flex flex-col items-center">
          <!-- Product Name (#17251B) -->
          <h3 
            class="text-xs sm:text-sm font-bold text-[#17251B] group-hover:text-[#166534] transition-colors line-clamp-2 leading-snug mb-1 text-center" 
            title="${cleanName}"
          >
            ${cleanName}
          </h3>

          <!-- Price & Quantity Row (#16A34A Price, #64748B Secondary Text) -->
          <div class="flex items-baseline justify-center gap-1 mb-1.5">
            <span class="text-sm sm:text-base font-extrabold text-[#16A34A] tracking-tight">${window.Utils.formatPrice(v.price)}</span>
            <span class="text-xs text-[#64748B] font-normal">/${v.unit || 'kg'}</span>
            ${v.oldPrice ? `<span class="text-[11px] text-[#64748B] line-through font-normal ml-1">${window.Utils.formatPrice(v.oldPrice)}</span>` : ''}
          </div>

          <!-- Rating Stars Row -->
          <div class="flex items-center justify-center gap-1 mb-2.5">
            ${window.Utils.stars(product.rating || 5, 'sm')}
            <span class="text-[11px] text-[#64748B] font-medium">(${product.reviewCount || 120})</span>
          </div>
        </div>

        <!-- Action Buttons: Add-to-Cart #166534 with #14532D hover, white text -->
        <div class="flex items-center gap-1.5 pt-2 mt-auto border-t border-[#E2E8E4] w-full">
          <button
            class="add-to-cart-btn flex-1 bg-[#166534] hover:bg-[#14532D] active:scale-98 text-white font-bold py-2 sm:py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 text-xs sm:text-sm tracking-wide min-w-0"
            onclick="event.stopPropagation(); window.ProductCard.quickAdd(this, '${product.id}', '${v.variantId}')"
            title="Add to Cart"
          >
            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="truncate">Add to Cart</span>
          </button>

          <button
            class="w-8 h-8 sm:w-9 sm:h-9 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#166534] border border-[#E2E8E4] rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs flex-shrink-0"
            onclick="event.stopPropagation(); window.ProductCard.buyNow(this, '${product.id}', '${v.variantId}')"
            title="⚡ Buy Now"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
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
