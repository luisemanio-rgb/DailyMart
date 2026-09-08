// DailyMart BD — Production Product Card Component
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
    const icons = window.Icons || {};

    return `
    <div 
      class="product-card bg-white rounded-xl border border-[#93e2e4]/50 hover:border-[#007d83] hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden relative cursor-pointer" 
      data-product-id="${product.id}" 
      data-variant-id="${v.variantId}"
      onclick="window.Router.navigate('/product/${product.slug}')"
    >
      <!-- Top Badges & Wishlist -->
      <div class="product-img-wrapper relative w-full aspect-[4/3] bg-[#f4fdfe] overflow-hidden">
        <!-- Top-Left: Discrete Discount Badge -->
        ${discountPct > 0 ? `
          <span class="absolute top-2 left-2 z-10 bg-[#E5484D] text-white text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-0.5 rounded shadow-2xs pointer-events-none">
            -${discountPct}%
          </span>
        ` : ''}

        <!-- Top-Right: Wishlist Heart -->
        <button
          class="wishlist-btn absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-white/95 backdrop-blur-xs rounded-full border border-[#E5E7EB] shadow-2xs flex items-center justify-center ${inWishlist ? 'active text-[#E5484D]' : 'text-[#667085] hover:text-[#E5484D]'} transition-colors"
          data-product-id="${product.id}"
          onclick="event.stopPropagation(); window.ProductCard.toggleWishlist(this, '${product.id}')"
          aria-label="Add to Wishlist"
          title="Add to Wishlist"
        >
          ${icons.heart ? icons.heart(15, inWishlist ? 'text-[#E5484D]' : 'text-[#667085]', inWishlist) : '♥'}
        </button>

        <!-- Product Image: 100% Uniform Size across ALL cards -->
        <img
          src="${v.image || product.image}"
          alt="${cleanName}"
          class="product-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onerror="this.src='images/potatoes/potato-deshi.jpg';this.classList.add('fallback')"
          loading="lazy"
        />
      </div>

      <!-- Content Area -->
      <div class="p-3.5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <!-- Category / Short Info -->
          <div class="text-[11px] font-medium text-[#007d83] capitalize mb-1">
            ${product.subcategory ? product.subcategory.replace(/-/g, ' ') : product.category}
          </div>

          <!-- Product Title -->
          <h3 
            class="text-[14px] sm:text-[15px] font-semibold text-[#17212B] group-hover:text-[#007d83] transition-colors line-clamp-2 leading-snug mb-1.5" 
            title="${cleanName}"
          >
            ${cleanName}
          </h3>

          <!-- Price Row (20px bold price tightly paired with unit & strike old price) -->
          <div class="flex items-baseline gap-1.5 mb-1.5 flex-wrap">
            <span class="text-base sm:text-[18px] font-bold text-[#007d83] tracking-tight">
              ${window.Utils.formatPrice(v.price)}
            </span>
            <span class="text-xs text-[#667085] font-normal">
              /${v.unit || 'kg'}
            </span>
            ${v.oldPrice ? `
              <span class="text-xs text-[#667085] line-through font-normal ml-0.5">
                ${window.Utils.formatPrice(v.oldPrice)}
              </span>` : ''}
          </div>

          <!-- Star Rating -->
          <div class="flex items-center gap-1 mb-3">
            ${window.Utils.stars(product.rating || 5, 'sm')}
            <span class="text-[11px] text-[#667085] font-medium">(${product.reviewCount || 120})</span>
          </div>
        </div>

        <!-- Action Buttons: [ Buy Now ] [ Cart ] -->
        <div class="flex items-center gap-1.5 sm:gap-2 pt-2 sm:pt-2.5 border-t border-[#E5E7EB] mt-auto">
          <!-- Buy Now (Primary CTA) -->
          <button
            class="btn-buy-now flex-1 h-8 sm:h-9 bg-[#007d83] hover:bg-[#006065] active:scale-98 text-white font-semibold text-[11px] sm:text-xs px-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs whitespace-nowrap"
            onclick="event.stopPropagation(); window.ProductCard.buyNow(this, '${product.id}', '${v.variantId}')"
            title="Buy Now"
          >
            <span>${icons.zap ? icons.zap(13) : ''}</span>
            <span>Buy Now</span>
          </button>

          <!-- Cart Button (Compact secondary) -->
          <button
            class="w-8 sm:w-9 h-8 sm:h-9 bg-[#93e2e4]/20 hover:bg-[#93e2e4]/45 text-[#007d83] border border-[#93e2e4]/80 hover:border-[#007d83] rounded-lg flex items-center justify-center transition-colors active:scale-95 flex-shrink-0"
            onclick="event.stopPropagation(); window.ProductCard.quickAdd(this, '${product.id}', '${v.variantId}')"
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            ${icons.cart ? icons.cart(16) : ''}
          </button>
        </div>

      </div>
    </div>
    `;
  },

  // Quick Add to Cart with visual feedback
  quickAdd: (btn, productId, variantId) => {
    const product = window.getProductById(productId);
    if (!product) return;
    const variant = product.variants.find(v => v.variantId === variantId) || product.variants[0];

    window.Store.addToCart(product, variant, 1);

    // Subtle button feedback
    const originalContent = btn.innerHTML;
    btn.innerHTML = window.Icons ? window.Icons.check(18, 'text-[#007d83]') : '✓';
    btn.classList.add('bg-[#eefbfc]', 'border-[#007d83]');
    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.classList.remove('bg-[#eefbfc]', 'border-[#007d83]');
    }, 900);

    if (window.Toast) {
      window.Toast.success(`Added ${product.name.split(' ')[0]} to cart`);
    }
  },

  // Buy Now: adds to cart & opens checkout/drawer directly
  buyNow: (btn, productId, variantId) => {
    const product = window.getProductById(productId);
    if (!product) return;
    const variant = product.variants.find(v => v.variantId === variantId) || product.variants[0];

    window.Store.addToCart(product, variant, 1);
    if (window.CartDrawer) {
      window.CartDrawer.open();
    } else {
      window.Router.navigate('/checkout');
    }
  },

  // Wishlist toggle
  toggleWishlist: (btn, productId) => {
    const isSaved = window.Store.toggleWishlist(productId);
    btn.classList.toggle('active', isSaved);
    btn.classList.toggle('text-[#E5484D]', isSaved);
    btn.classList.toggle('text-[#667085]', !isSaved);
    const icons = window.Icons || {};
    btn.innerHTML = icons.heart ? icons.heart(16, isSaved ? 'text-[#E5484D]' : 'text-[#667085]', isSaved) : '♥';

    if (window.Toast) {
      if (isSaved) {
        window.Toast.success('Saved to wishlist');
      } else {
        window.Toast.info('Removed from wishlist');
      }
    }
  },
};
