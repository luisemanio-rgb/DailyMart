// DailyMart BD — Product Card Component (Simple, Minimalist, High-converting design matching reference)
window.ProductCard = {
  render: (product, variant = null) => {
    const v = variant || product.variants[0];
    const discountPct = v.oldPrice ? window.Utils.discountPercent(v.price, v.oldPrice) : 0;

    return `
    <div 
      class="product-card bg-white rounded-2xl shadow-xs hover:shadow-md border border-gray-100 overflow-hidden relative cursor-pointer transition-all duration-300 flex flex-col justify-between group" 
      data-product-id="${product.id}" 
      data-variant-id="${v.variantId}"
      onclick="window.Router.navigate('/product/${product.slug}')"
    >
      <!-- Top Image & Badges -->
      <div class="relative w-full aspect-square sm:h-52 bg-gray-50 overflow-hidden flex items-center justify-center">
        <!-- Top-Left: Discount Badge (Black Pill) -->
        ${discountPct > 0 ? `
          <span class="absolute top-2.5 left-2.5 z-10 bg-black/85 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm tracking-tight pointer-events-none">
            ${discountPct}% ছাড়
          </span>
        ` : ''}

        <!-- Top-Right: Limited Stock Badge (Red Pill) -->
        <span class="absolute top-2.5 right-2.5 z-10 bg-[#f43f5e] text-white text-[10px] sm:text-xs font-medium px-2.5 py-0.5 rounded-full shadow-sm tracking-tight pointer-events-none">
          সীমিত
        </span>

        <img
          src="${v.image || product.image}"
          alt="${product.name}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onerror="this.src='images/potatoes/potato-deshi.jpg';this.classList.add('fallback')"
          loading="lazy"
        />
      </div>

      <!-- Product Info -->
      <div class="p-3 sm:p-4 flex flex-col justify-between flex-1">
        <div>
          <!-- Product Name -->
          <h3 class="text-xs sm:text-sm font-semibold text-gray-800 hover:text-emerald-700 transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-snug mb-1.5">
            ${product.name}
          </h3>

          <!-- Price Row -->
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-sm sm:text-base font-bold text-emerald-600">${window.Utils.formatPrice(v.price)}</span>
            ${v.oldPrice ? `<span class="text-xs text-gray-400 line-through">${window.Utils.formatPrice(v.oldPrice)}</span>` : ''}
          </div>
        </div>

        <!-- Stacked Action Buttons (Image 1 reference) -->
        <div class="flex flex-col gap-2 pt-1 mt-auto">
          <!-- Button 1: কার্টে যোগ করুন (White / outline) -->
          <button
            class="w-full py-2 sm:py-2.5 px-3 rounded-xl border border-gray-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 active:scale-98 text-gray-700 hover:text-emerald-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-all shadow-2xs"
            onclick="event.stopPropagation(); window.ProductCard.quickAdd(this, '${product.id}', '${v.variantId}')"
            title="কার্টে যোগ করুন"
          >
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span>কার্টে যোগ করুন</span>
          </button>

          <!-- Button 2: এখনই অর্ডার করুন (Orange solid pill) -->
          <button
            class="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#f4511e] hover:from-[#f4511e] hover:to-[#e64a19] active:scale-98 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all"
            onclick="event.stopPropagation(); window.ProductCard.buyNow(this, '${product.id}', '${v.variantId}')"
            title="এখনই অর্ডার করুন"
          >
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>এখনই অর্ডার করুন</span>
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
