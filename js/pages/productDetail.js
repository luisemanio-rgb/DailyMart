// DailyMart BD — Product Detail Page
window.Pages = window.Pages || {};
window.Pages.productDetail = (params) => {
  const content = document.getElementById('page-content');
  const { slug } = params;
  const product = window.getProductBySlug(slug);

  if (!product) {
    content.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-20 text-center page-enter">
      <div class="text-8xl mb-6">🔍</div>
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Product Not Found</h2>
      <p class="text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <button onclick="window.Router.navigate('/')" class="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors">Back to Home</button>
    </div>
    `;
    return;
  }

  let selectedVariant = product.variants[0];
  let selectedWeight = selectedVariant.weights ? selectedVariant.weights[0] : selectedVariant.weight;
  let selectedImageIdx = 0;
  let quantity = 1;
  let activeTab = 'description';

  const category = window.CATEGORIES.find(c => c.id === product.category);
  const relatedProducts = window.PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);

  const getPrice = () => {
    return selectedVariant.prices?.[selectedWeight] || selectedVariant.price;
  };
  const getOldPrice = () => {
    if (!selectedVariant.oldPrice) return null;
    const ratio = selectedVariant.oldPrice / selectedVariant.price;
    return Math.round(getPrice() * ratio);
  };

  const renderPage = () => {
    const price = getPrice();
    const oldPrice = getOldPrice();
    const discountPct = oldPrice ? window.Utils.discountPercent(price, oldPrice) : 0;
    const inWishlist = window.Store.isInWishlist(product.id);
    const stock = window.Utils.stockLabel(selectedVariant.stock);

    content.innerHTML = `
    <div class="page-enter">
      <div class="max-w-7xl mx-auto px-4 py-6">

        <!-- Breadcrumb -->
        <nav class="flex items-center text-sm text-gray-500 mb-6 flex-wrap gap-1">
          <a href="#/" class="hover:text-emerald-600 transition-colors">Home</a>
          <span class="text-gray-300">›</span>
          <a href="#/category/${product.category}" class="hover:text-emerald-600 capitalize transition-colors">${category?.name || product.category}</a>
          <span class="text-gray-300">›</span>
          <a href="#/category/${product.category}/${product.subcategory}" class="hover:text-emerald-600 capitalize transition-colors">${product.subcategory.replace(/-/g,' ')}</a>
          <span class="text-gray-300">›</span>
          <span class="text-gray-800 font-medium">${product.name}</span>
        </nav>

        <!-- Product Main Area -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

          <!-- LEFT: Image Gallery -->
          <div>
            <!-- Main image -->
            <div class="img-zoom-container rounded-2xl overflow-hidden bg-gray-50 h-80 md:h-96 mb-4 shadow-card relative">
              <img
                id="main-product-img"
                src="${product.images?.[selectedImageIdx] || product.image}"
                alt="${product.name}"
                class="w-full h-full object-cover"
                onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60'"
              />
              ${discountPct > 0 ? `<div class="absolute top-4 left-4 bg-red-500 text-white text-sm font-black px-3 py-1 rounded-xl">-${discountPct}%</div>` : ''}
              ${product.organic ? `<div class="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-lg">🌿 Organic</div>` : ''}
            </div>
            <!-- Thumbnails -->
            <div class="flex gap-3 overflow-x-auto pb-1" id="thumbnails">
              ${(product.images || [product.image]).map((img, i) => `
                <button class="thumb-btn flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${i === selectedImageIdx ? 'border-emerald-500' : 'border-gray-200'} hover:border-emerald-300 transition-colors"
                  onclick="window.Pages.selectImage(${i})">
                  <img src="${img}" alt="" class="w-full h-full object-cover" onerror="this.parentElement.style.display='none'" />
                </button>
              `).join('')}
            </div>
          </div>

          <!-- RIGHT: Product Info -->
          <div>
            <h1 class="text-2xl md:text-3xl font-black text-gray-900 mb-2">${product.name}</h1>

            <!-- Rating & reviews -->
            <div class="flex items-center gap-3 mb-4">
              ${window.Utils.stars(product.rating, 'base')}
              <span class="text-sm font-semibold text-gray-700">${product.rating}</span>
              <span class="text-sm text-gray-400">(${product.reviewCount} reviews)</span>
              <span class="text-xs text-gray-300 mx-1">|</span>
              <span class="text-sm text-emerald-600 font-medium">Brand: ${product.brand}</span>
            </div>

            <!-- Grade & origin -->
            <div class="flex flex-wrap gap-2 mb-5">
              ${selectedVariant.grade ? `${window.Utils.badge(`Grade ${selectedVariant.grade}`, window.Utils.gradeColor(selectedVariant.grade))}` : ''}
              ${window.Utils.badge(product.origin, 'gray')}
              ${product.organic ? window.Utils.badge('🌿 Organic', 'green') : ''}
              ${product.bestSeller ? window.Utils.badge('⭐ Best Seller', 'yellow') : ''}
            </div>

            <!-- Price -->
            <div class="bg-emerald-50 rounded-2xl p-5 mb-6">
              <div class="flex items-baseline gap-3 mb-1">
                <span class="text-3xl font-black text-emerald-700" id="current-price">${window.Utils.formatPrice(price)}</span>
                ${oldPrice ? `<span class="text-lg text-gray-400 line-through" id="old-price">${window.Utils.formatPrice(oldPrice)}</span>` : '<span id="old-price"></span>'}
                ${discountPct > 0 ? `<span class="bg-red-100 text-red-600 text-sm font-bold px-2.5 py-1 rounded-lg">Save ${discountPct}%</span>` : ''}
              </div>
              <div class="text-sm text-gray-500">per <span id="unit-display">${selectedWeight}</span></div>
              <!-- Availability -->
              <div class="mt-3 flex items-center gap-2">
                <div class="w-2 h-2 rounded-full ${stock.color === 'green' ? 'bg-emerald-500' : stock.color === 'yellow' ? 'bg-amber-400' : 'bg-red-500'}"></div>
                <span class="text-sm font-medium ${stock.color === 'green' ? 'text-emerald-600' : stock.color === 'yellow' ? 'text-amber-500' : 'text-red-500'}">${stock.text}</span>
              </div>
            </div>

            <!-- Variant selector -->
            ${product.variants.length > 1 ? `
            <div class="mb-5">
              <label class="text-sm font-semibold text-gray-700 block mb-2">Select Type:</label>
              <div class="flex flex-wrap gap-2" id="variant-selector">
                ${product.variants.map((v, i) => `
                  <button
                    class="variant-btn px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${i === 0 ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-700 hover:border-emerald-300'}"
                    onclick="window.Pages.selectVariant(${i})"
                    data-variant-idx="${i}"
                  >
                    ${v.variantName}
                    <span class="block text-xs ${i === 0 ? 'text-emerald-600' : 'text-gray-400'}">${window.Utils.formatPrice(v.price)}/${v.unit}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            ` : ''}

            <!-- Weight selector -->
            ${selectedVariant.weights && selectedVariant.weights.length > 1 ? `
            <div class="mb-5" id="weight-selector-container">
              <label class="text-sm font-semibold text-gray-700 block mb-2">Select Weight:</label>
              <div class="flex flex-wrap gap-2" id="weight-selector">
                ${selectedVariant.weights.map((w, i) => `
                  <button
                    class="weight-btn px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${i === 0 ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-700 hover:border-emerald-300'}"
                    onclick="window.Pages.selectWeight('${w}')"
                  >
                    ${w}
                    <span class="block text-xs">${window.Utils.formatPrice(selectedVariant.prices?.[w] || 0)}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            ` : ''}

            <!-- Quantity -->
            <div class="mb-6">
              <label class="text-sm font-semibold text-gray-700 block mb-2">Quantity:</label>
              <div class="flex items-center gap-4">
                <div class="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button class="qty-btn w-10 h-10 flex items-center justify-center text-gray-600 text-xl font-bold hover:bg-red-50 hover:text-red-500 transition-colors" onclick="window.Pages.changeDetailQty(-1)">−</button>
                  <span id="detail-qty" class="w-12 h-10 flex items-center justify-center font-bold text-lg">1</span>
                  <button class="qty-btn w-10 h-10 flex items-center justify-center text-gray-600 text-xl font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-colors" onclick="window.Pages.changeDetailQty(1)">+</button>
                </div>
                <span class="text-sm text-gray-400">Max 99 per order</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 mb-6">
              ${stock.available ? `
                <button id="add-to-cart-detail" onclick="window.Pages.addToCartDetail()" class="add-to-cart-btn flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  Add to Cart
                </button>
                <button id="buy-now-btn" onclick="window.Pages.buyNow()" class="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                  ⚡ Buy Now
                </button>
              ` : `
                <button class="flex-1 bg-gray-200 text-gray-500 font-bold py-3.5 rounded-xl cursor-not-allowed" disabled>Out of Stock</button>
              `}
              <button id="wishlist-detail-btn" onclick="window.Pages.toggleDetailWishlist()" class="w-12 h-12 border-2 ${inWishlist ? 'border-red-300 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400'} rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                <svg class="w-5 h-5" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              </button>
            </div>

            <!-- Delivery info -->
            <div class="bg-gray-50 rounded-xl p-4">
              <div class="flex items-start gap-3 mb-2">
                <span class="text-xl">🚚</span>
                <div>
                  <div class="text-sm font-semibold text-gray-700">Standard Delivery</div>
                  <div class="text-xs text-gray-400">1-2 business days · ৳60 (Free over ৳1000)</div>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="text-xl">⚡</span>
                <div>
                  <div class="text-sm font-semibold text-gray-700">Same-Day Delivery</div>
                  <div class="text-xs text-gray-400">Available in Dhaka, Gazipur, Narayanganj · ৳120</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Tabs -->
        <div class="bg-white rounded-2xl shadow-card mb-10 overflow-hidden">
          <div class="flex border-b border-gray-100 overflow-x-auto">
            ${['description', 'information', 'nutrition', 'delivery', 'reviews'].map(tab => `
              <button class="tab-btn flex-shrink-0 px-6 py-4 text-sm font-semibold ${tab === activeTab ? 'active text-emerald-600 border-b-emerald-500' : 'text-gray-600 hover:text-gray-800'} capitalize"
                onclick="window.Pages.switchTab('${tab}')">
                ${tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab === 'information' ? 'Product Info' : tab}
              </button>
            `).join('')}
          </div>
          <div class="p-6" id="tab-content">
            ${renderTab('description')}
          </div>
        </div>

        <!-- Related Products -->
        ${relatedProducts.length > 0 ? `
        <div class="mb-10">
          <h2 class="text-2xl font-black text-gray-900 mb-2 section-header">Related Products</h2>
          <p class="text-gray-400 text-sm mb-6">You might also like these</p>
          <div class="product-grid grid-4">
            ${relatedProducts.map(p => window.ProductCard.render(p)).join('')}
          </div>
        </div>
        ` : ''}

      </div>
    </div>
    `;
  };

  const renderTab = (tab) => {
    switch(tab) {
      case 'description':
        return `
          <h3 class="font-bold text-gray-800 mb-3">${product.name}</h3>
          <p class="text-gray-600 leading-relaxed mb-4">${product.description}</p>
          <div class="flex flex-wrap gap-2 mt-4">
            ${product.tags.map(tag => `<span class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">#${tag}</span>`).join('')}
          </div>
        `;
      case 'information':
        return `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${[
              ['Product Name', product.name],
              ['Category', category?.name || product.category],
              ['Grade', selectedVariant.grade || 'Standard'],
              ['Origin', product.origin],
              ['Weight/Unit', selectedWeight],
              ['Brand', product.brand],
              ['Freshness', product.freshness],
              ['Storage', product.storage],
              ['Packaging', product.packaging],
              ['Organic', product.organic ? 'Yes ✓' : 'No'],
            ].map(([label, value]) => `
              <div class="flex gap-3 py-3 border-b border-gray-50">
                <span class="text-sm text-gray-500 w-32 flex-shrink-0 font-medium">${label}</span>
                <span class="text-sm text-gray-800">${value}</span>
              </div>
            `).join('')}
          </div>
        `;
      case 'nutrition':
        if (!product.nutrition) return '<p class="text-gray-400">Nutrition information not available for this product.</p>';
        return `
          <h3 class="font-bold text-gray-800 mb-4">Nutrition Facts (per 100g)</h3>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
            ${Object.entries(product.nutrition).map(([key, val]) => `
              <div class="text-center bg-emerald-50 rounded-xl p-4">
                <div class="text-xl font-black text-emerald-700">${val}</div>
                <div class="text-xs text-gray-500 capitalize mt-1">${key}</div>
              </div>
            `).join('')}
          </div>
        `;
      case 'delivery':
        return `
          <div class="space-y-4">
            ${[
              { icon: '🚚', title: 'Standard Delivery', detail: '1-2 business days · ৳60 · Free for orders over ৳1000' },
              { icon: '⚡', title: 'Express Delivery', detail: 'Same day (Dhaka, Gazipur, Narayanganj) · ৳120' },
              { icon: '📍', title: 'Delivery Areas', detail: 'Currently delivering to all 64 districts of Bangladesh' },
              { icon: '🕐', title: 'Order Cutoff', detail: 'Order before 12PM for same-day delivery (Express only)' },
              { icon: '🔄', title: 'Easy Returns', detail: 'Return within 24 hours if the product is not fresh or damaged' },
            ].map(({ icon, title, detail }) => `
              <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <span class="text-2xl flex-shrink-0">${icon}</span>
                <div>
                  <div class="font-semibold text-gray-800 text-sm">${title}</div>
                  <div class="text-sm text-gray-500 mt-0.5">${detail}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      case 'reviews':
        const reviews = window.Utils.sampleReviews(product.id);
        const avgRating = product.rating;
        return `
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Rating summary -->
            <div class="text-center">
              <div class="text-6xl font-black text-emerald-700 mb-2">${avgRating}</div>
              <div class="flex justify-center mb-2">${window.Utils.stars(avgRating, 'lg')}</div>
              <div class="text-sm text-gray-500">${product.reviewCount} reviews</div>
              <!-- Rating bars -->
              <div class="mt-4 space-y-2 text-left">
                ${[5,4,3,2,1].map(star => {
                  const pct = star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 3 : 2;
                  return `
                    <div class="flex items-center gap-2">
                      <span class="text-xs text-gray-500 w-4">${star}</span>
                      <span class="text-yellow-400 text-xs">★</span>
                      <div class="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div class="rating-bar-fill h-1.5 rounded-full" style="width:${pct}%"></div>
                      </div>
                      <span class="text-xs text-gray-400">${pct}%</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
            <!-- Review list -->
            <div class="md:col-span-2 space-y-4">
              ${reviews.map(r => `
                <div class="border-b border-gray-100 pb-4 last:border-0">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-9 h-9 bg-emerald-100 text-emerald-700 font-bold rounded-full flex items-center justify-center text-sm">${r.name.charAt(0)}</div>
                    <div>
                      <div class="font-semibold text-sm text-gray-800">${r.name}</div>
                      <div class="flex items-center gap-2">
                        ${window.Utils.stars(r.rating, 'sm')}
                        <span class="text-xs text-gray-400">${r.date}</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 leading-relaxed">${r.review}</p>
                </div>
              `).join('')}
              <button class="text-emerald-600 font-medium text-sm hover:text-emerald-700">View all ${product.reviewCount} reviews →</button>
            </div>
          </div>
        `;
      default:
        return '';
    }
  };

  // Page methods
  window.Pages.selectImage = (idx) => {
    selectedImageIdx = idx;
    const mainImg = document.getElementById('main-product-img');
    if (mainImg) mainImg.src = product.images?.[idx] || product.image;
    document.querySelectorAll('.thumb-btn').forEach((btn, i) => {
      btn.classList.toggle('border-emerald-500', i === idx);
      btn.classList.toggle('border-gray-200', i !== idx);
    });
  };

  window.Pages.selectVariant = (idx) => {
    selectedVariant = product.variants[idx];
    selectedWeight = selectedVariant.weights ? selectedVariant.weights[0] : selectedVariant.weight;
    document.querySelectorAll('.variant-btn').forEach((btn, i) => {
      btn.classList.toggle('border-emerald-500', i === idx);
      btn.classList.toggle('bg-emerald-50', i === idx);
      btn.classList.toggle('text-emerald-700', i === idx);
      btn.classList.toggle('border-gray-200', i !== idx);
      btn.classList.toggle('text-gray-700', i !== idx);
    });
    updatePriceDisplay();
    // Update weight selector
    const weightContainer = document.getElementById('weight-selector-container');
    if (weightContainer && selectedVariant.weights) {
      weightContainer.innerHTML = `
        <label class="text-sm font-semibold text-gray-700 block mb-2">Select Weight:</label>
        <div class="flex flex-wrap gap-2">
          ${selectedVariant.weights.map((w, i) => `
            <button class="weight-btn px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${i === 0 ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-700'}" onclick="window.Pages.selectWeight('${w}')">
              ${w}
              <span class="block text-xs">${window.Utils.formatPrice(selectedVariant.prices?.[w] || 0)}</span>
            </button>
          `).join('')}
        </div>
      `;
    }
  };

  window.Pages.selectWeight = (weight) => {
    selectedWeight = weight;
    document.querySelectorAll('.weight-btn').forEach(btn => {
      const isActive = btn.textContent.trim().startsWith(weight);
      btn.classList.toggle('border-emerald-500', isActive);
      btn.classList.toggle('bg-emerald-50', isActive);
      btn.classList.toggle('text-emerald-700', isActive);
      btn.classList.toggle('border-gray-200', !isActive);
      btn.classList.toggle('text-gray-700', !isActive);
    });
    updatePriceDisplay();
  };

  const updatePriceDisplay = () => {
    const price = getPrice();
    const oldPrice = getOldPrice();
    const priceEl = document.getElementById('current-price');
    const oldPriceEl = document.getElementById('old-price');
    const unitEl = document.getElementById('unit-display');
    if (priceEl) priceEl.textContent = window.Utils.formatPrice(price);
    if (oldPriceEl) oldPriceEl.textContent = oldPrice ? window.Utils.formatPrice(oldPrice) : '';
    if (unitEl) unitEl.textContent = selectedWeight;
  };

  window.Pages.changeDetailQty = (delta) => {
    const el = document.getElementById('detail-qty');
    let q = parseInt(el?.textContent || '1') + delta;
    if (q < 1) q = 1;
    if (q > 99) q = 99;
    if (el) el.textContent = q;
    quantity = q;
  };

  window.Pages.addToCartDetail = () => {
    const qty = parseInt(document.getElementById('detail-qty')?.textContent || '1');
    window.Store.addToCart({ product, variant: selectedVariant, selectedWeight, quantity: qty });
    window.Toast.success(`🛒 ${selectedVariant.variantName} (${selectedWeight}) added to cart!`);
    const btn = document.getElementById('add-to-cart-detail');
    if (btn) {
      btn.textContent = '✓ Added to Cart!';
      btn.classList.add('bg-green-600');
      setTimeout(() => {
        btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg> Add to Cart';
        btn.classList.remove('bg-green-600');
      }, 2000);
    }
  };

  window.Pages.buyNow = () => {
    const qty = parseInt(document.getElementById('detail-qty')?.textContent || '1');
    window.Store.addToCart({ product, variant: selectedVariant, selectedWeight, quantity: qty });
    window.Router.navigate('/checkout');
  };

  window.Pages.toggleDetailWishlist = () => {
    const added = window.Store.toggleWishlist(product.id);
    const btn = document.getElementById('wishlist-detail-btn');
    if (btn) {
      const svg = btn.querySelector('svg');
      btn.classList.toggle('border-red-300', added);
      btn.classList.toggle('bg-red-50', added);
      btn.classList.toggle('text-red-500', added);
      btn.classList.toggle('border-gray-200', !added);
      btn.classList.toggle('text-gray-400', !added);
      if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
    }
    window.Toast[added ? 'success' : 'info'](added ? '❤️ Added to wishlist!' : 'Removed from wishlist');
  };

  window.Pages.switchTab = (tab) => {
    activeTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.getAttribute('onclick').includes(`'${tab}'`);
      btn.classList.toggle('active', isActive);
      btn.classList.toggle('text-emerald-600', isActive);
      btn.classList.toggle('text-gray-600', !isActive);
    });
    const tabContent = document.getElementById('tab-content');
    if (tabContent) tabContent.innerHTML = renderTab(tab);
  };

  renderPage();
};
