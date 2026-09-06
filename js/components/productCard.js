// DailyMart BD — Product Card Component
window.ProductCard = {
  render: (product, variant = null) => {
    const v = variant || product.variants[0];
    const inWishlist = window.Store.isInWishlist(product.id);
    const stock = window.Utils.stockLabel(v.stock);
    const discountPct = v.oldPrice ? window.Utils.discountPercent(v.price, v.oldPrice) : 0;

    return `
    <div class="product-card bg-white rounded-2xl shadow-card overflow-hidden relative" data-product-id="${product.id}" data-variant-id="${v.variantId}">

      <!-- Badges -->
      <div class="absolute top-2 left-2 flex flex-col gap-1 z-10">
        ${discountPct > 0 ? `<span class="discount-badge bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">-${discountPct}%</span>` : ''}
        ${product.bestSeller ? `<span class="bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-lg">Best Seller</span>` : ''}
        ${product.organic ? `<span class="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg">Organic</span>` : ''}
        ${v.stock < 10 && v.stock > 0 ? `<span class="bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-lg">Low Stock</span>` : ''}
      </div>

      <!-- Wishlist Button -->
      <button
        class="wishlist-btn absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center ${inWishlist ? 'active text-red-500' : 'text-gray-400 hover:text-red-400'} transition-colors"
        data-product-id="${product.id}"
        onclick="event.stopPropagation(); window.ProductCard.toggleWishlist(this, '${product.id}')"
        aria-label="Add to Wishlist"
      >
        <svg class="w-4 h-4" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
      </button>

      <!-- Product Image -->
      <div class="img-zoom-container h-40 sm:h-48 overflow-hidden cursor-pointer bg-gray-50" onclick="window.Router.navigate('/product/${product.slug}')">
        <img
          src="${v.image || product.image}"
          alt="${product.name}"
          class="product-img w-full h-full object-cover"
          onerror="this.src='images/potatoes/potato-deshi.jpg';this.classList.add('fallback')"
          loading="lazy"
        />
      </div>

      <!-- Product Info -->
      <div class="p-3">
        <!-- Category & Origin -->
        <div class="flex items-center justify-between gap-1 text-xs mb-1">
          <span class="text-emerald-600 font-medium capitalize truncate">${product.category.replace(/-/g, ' ')}</span>
          ${product.originCountry ? `<span class="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">${product.originCountry === 'Bangladesh' ? '🇧🇩 BD' : product.originCountry === 'India' ? '🇮🇳 India' : product.originCountry === 'Pakistan' ? '🇵🇰 Pak' : product.originCountry === 'Sri Lanka' ? '🇱🇰 Sri Lanka' : product.originCountry.includes('Holland') ? '🇳🇱 Holland' : product.originCountry}</span>` : ''}
        </div>

        <!-- Product name -->
        <h3 class="text-sm font-bold text-gray-800 mb-0.5 line-clamp-2 cursor-pointer hover:text-emerald-700 transition-colors" onclick="window.Router.navigate('/product/${product.slug}')">
          ${product.name}
        </h3>
        ${v.variantName && v.variantName !== product.name ? `<div class="text-[11px] text-gray-400 mb-1">${v.variantName}</div>` : ''}

        <!-- Short desc -->
        <p class="text-xs text-gray-400 mb-2 line-clamp-1">${window.Utils.truncate(product.shortDesc, 55)}</p>

        <!-- Rating -->
        <div class="flex items-center gap-1 mb-2">
          ${window.Utils.stars(product.rating, 'sm')}
          <span class="text-xs text-gray-500">(${product.reviewCount})</span>
          ${v.grade ? `<span class="ml-auto text-xs font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">Grade ${v.grade}</span>` : ''}
        </div>

        <!-- Price -->
        <div class="flex items-baseline gap-2 mb-3">
          <span class="text-base font-black text-emerald-700">${window.Utils.formatPrice(v.price)}</span>
          ${v.oldPrice ? `<span class="text-xs text-gray-400 line-through">${window.Utils.formatPrice(v.oldPrice)}</span>` : ''}
          <span class="text-xs text-gray-400 ml-auto">/${v.unit}</span>
        </div>

        <!-- Stock status -->
        <div class="mb-3">
          <span class="text-xs font-medium ${stock.color === 'red' ? 'text-red-500' : stock.color === 'yellow' ? 'text-amber-500' : 'text-emerald-600'}">
            ${stock.color === 'green' ? '✓' : stock.color === 'yellow' ? '⚠' : '✕'} ${stock.text}
          </span>
        </div>

        <!-- Quantity + Add to Cart -->
        ${stock.available ? `
          <div class="flex items-center gap-2">
            <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button class="qty-btn w-7 h-8 flex items-center justify-center text-gray-600 hover:bg-emerald-50 text-base font-bold" onclick="event.stopPropagation(); window.ProductCard.changeQty(this, -1)">−</button>
              <span class="qty-display w-8 h-8 flex items-center justify-center text-sm font-semibold">1</span>
              <button class="qty-btn w-7 h-8 flex items-center justify-center text-gray-600 hover:bg-emerald-50 text-base font-bold" onclick="event.stopPropagation(); window.ProductCard.changeQty(this, 1)">+</button>
            </div>
            <button
              class="add-to-cart-btn flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-2 rounded-xl transition-colors"
              data-product-id="${product.id}"
              data-variant-id="${v.variantId}"
              onclick="event.stopPropagation(); window.ProductCard.addToCart(this, '${product.id}', '${v.variantId}')"
            >
              + Cart
            </button>
          </div>
        ` : `
          <button class="w-full bg-gray-100 text-gray-400 text-xs font-semibold py-2 rounded-xl cursor-not-allowed">Out of Stock</button>
        `}
      </div>
    </div>
    `;
  },

  changeQty: (btn, delta) => {
    const card = btn.closest('.product-card');
    const display = card.querySelector('.qty-display');
    let qty = parseInt(display.textContent) + delta;
    if (qty < 1) qty = 1;
    if (qty > 99) qty = 99;
    display.textContent = qty;
  },

  addToCart: (btn, productId, variantId) => {
    const card = btn.closest('.product-card');
    const qty = parseInt(card.querySelector('.qty-display')?.textContent || '1');
    const product = window.getProductById(productId);
    const variant = product?.variants.find(v => v.variantId === variantId);
    if (!product || !variant) return;

    const selectedWeight = variant.weights ? variant.weights[0] : variant.weight;

    window.Store.addToCart({ product, variant, selectedWeight, quantity: qty });
    window.Toast.success(`🛒 ${variant.variantName} added to cart!`);

    // Button feedback
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.classList.add('bg-green-600');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('bg-green-600');
    }, 1500);
  },

  toggleWishlist: (btn, productId) => {
    const added = window.Store.toggleWishlist(productId);
    const svg = btn.querySelector('svg');
    if (added) {
      btn.classList.add('active', 'text-red-500');
      btn.classList.remove('text-gray-400');
      svg.setAttribute('fill', 'currentColor');
      window.Toast.success('❤️ Added to wishlist!');
    } else {
      btn.classList.remove('active', 'text-red-500');
      btn.classList.add('text-gray-400');
      svg.setAttribute('fill', 'none');
      window.Toast.info('Removed from wishlist');
    }
  },
};
