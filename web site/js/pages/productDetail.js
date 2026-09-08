// DailyMart BD — Product Detail Page
window.Pages = window.Pages || {};
window.Pages.productDetail = (params) => {
  const content = document.getElementById('page-content');
  const { slug } = params;
  const product = window.getProductBySlug(slug);

  if (!product) {
    content.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-20 text-center page-enter">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E8F7F1] flex items-center justify-center text-[#087F5B]">
        ${window.Icons ? window.Icons.render('search', 'w-8 h-8') : ''}
      </div>
      <h2 class="text-2xl font-bold text-[#17212B] mb-2">Product Not Found</h2>
      <p class="text-[#667085] mb-6 text-sm">The product you're looking for doesn't exist or has been removed.</p>
      <button onclick="window.Router.navigate('/')" class="bg-[#087F5B] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#056B4D] transition-colors text-sm">Back to Home</button>
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
    <div class="page-enter pb-24 sm:pb-16">
      <div class="max-w-7xl mx-auto px-4 py-5">

        <!-- Clean Breadcrumb -->
        <nav class="flex items-center text-xs sm:text-sm text-[#667085] mb-6 flex-wrap gap-1.5">
          <a href="#/" class="hover:text-[#087F5B] transition-colors">Home</a>
          <span class="text-gray-300">/</span>
          <a href="#/category/${product.category}" class="hover:text-[#087F5B] capitalize transition-colors">${category?.name || product.category}</a>
          <span class="text-gray-300">/</span>
          <a href="#/category/${product.category}/${product.subcategory}" class="hover:text-[#087F5B] capitalize transition-colors">${product.subcategory.replace(/-/g,' ')}</a>
          <span class="text-gray-300">/</span>
          <span class="text-[#17212B] font-semibold">${product.name}</span>
        </nav>

        <!-- Product Main Area -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

          <!-- LEFT: Image Gallery -->
          <div>
            <!-- Main image container -->
            <div class="rounded-xl overflow-hidden bg-white border border-[#E5E7EB] h-80 md:h-96 mb-4 relative flex items-center justify-center p-6">
              <img
                id="main-product-img"
                src="${product.images?.[selectedImageIdx] || product.image}"
                alt="${product.name}"
                class="max-w-full max-h-full object-contain"
                onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=60'"
              />
              ${discountPct > 0 ? `<div class="absolute top-4 left-4 bg-[#E5484D] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">-${discountPct}% OFF</div>` : ''}
              ${product.organic ? `<div class="absolute top-4 right-4 bg-[#087F5B] text-white text-xs font-semibold px-2.5 py-1 rounded-md">Organic</div>` : ''}
            </div>
            <!-- Thumbnails -->
            <div class="flex gap-3 overflow-x-auto pb-1" id="thumbnails">
              ${(product.images || [product.image]).map((img, i) => `
                <button class="thumb-btn flex-shrink-0 w-18 h-18 rounded-lg overflow-hidden border-2 p-1.5 bg-white ${i === selectedImageIdx ? 'border-[#087F5B]' : 'border-[#E5E7EB]'} hover:border-[#087F5B]/50 transition-colors"
                  onclick="window.Pages.selectImage(${i})">
                  <img src="${img}" alt="" class="w-full h-full object-contain" onerror="this.parentElement.style.display='none'" />
                </button>
              `).join('')}
            </div>
          </div>

          <!-- RIGHT: Product Info -->
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-[#17212B] mb-2 leading-tight">${product.name}</h1>

            <!-- Rating & reviews -->
            <div class="flex items-center gap-3 mb-4">
              ${window.Utils.stars(product.rating, 'base')}
              <span class="text-sm font-bold text-[#17212B]">${product.rating}</span>
              <span class="text-xs text-[#667085]">(${product.reviewCount} customer reviews)</span>
              <span class="text-xs text-gray-300">|</span>
              <span class="text-xs font-medium text-[#087F5B] bg-[#E8F7F1] px-2 py-0.5 rounded">Brand: ${product.brand}</span>
            </div>

            <!-- Grade & tags -->
            <div class="flex flex-wrap items-center gap-2 mb-5">
              ${selectedVariant.grade ? `
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-gray-100 text-[#17212B] border border-gray-200">
                  Grade ${selectedVariant.grade} · Quality Checked
                </span>
              ` : ''}
              ${product.organic ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#E8F7F1] text-[#087F5B]">100% Organic</span>` : ''}
              ${product.bestSeller ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">Best Seller</span>` : ''}
            </div>

            <!-- Price Container -->
            <div class="bg-[#F8FAF9] rounded-xl p-5 mb-6 border border-[#E5E7EB]">
              <div class="flex items-baseline gap-3 mb-1">
                <span class="text-3xl font-black text-[#087F5B]" id="current-price">${window.Utils.formatPrice(price)}</span>
                ${oldPrice ? `<span class="text-base text-[#667085] line-through" id="old-price">${window.Utils.formatPrice(oldPrice)}</span>` : '<span id="old-price"></span>'}
                ${discountPct > 0 ? `<span class="bg-red-50 text-[#E5484D] text-xs font-bold px-2 py-0.5 rounded border border-red-100">Save ${discountPct}%</span>` : ''}
              </div>
              <div class="text-xs font-medium text-[#667085]">Unit size: <span id="unit-display" class="text-[#17212B] font-semibold">${selectedWeight}</span></div>
              <!-- Availability -->
              <div class="mt-3 flex items-center gap-2">
                <div class="w-2 h-2 rounded-full ${stock.color === 'green' ? 'bg-[#16A34A]' : stock.color === 'yellow' ? 'bg-amber-400' : 'bg-red-500'}"></div>
                <span class="text-xs font-semibold ${stock.color === 'green' ? 'text-[#16A34A]' : stock.color === 'yellow' ? 'text-amber-600' : 'text-red-500'}">${stock.text}</span>
              </div>
            </div>

            <!-- Variant selector -->
            ${product.variants.length > 1 ? `
            <div class="mb-5">
              <label class="text-xs font-bold uppercase tracking-wider text-[#667085] block mb-2">Select Variant:</label>
              <div class="flex flex-wrap gap-2" id="variant-selector">
                ${product.variants.map((v, i) => `
                  <button
                    class="variant-btn px-3.5 py-2 rounded-lg border text-xs sm:text-sm font-semibold transition-all ${i === 0 ? 'border-[#087F5B] bg-[#E8F7F1] text-[#087F5B]' : 'border-[#E5E7EB] bg-white text-[#17212B] hover:border-[#087F5B]/50'}"
                    onclick="window.Pages.selectVariant(${i})"
                    data-variant-idx="${i}"
                  >
                    ${v.variantName}
                    <span class="block text-[11px] font-normal ${i === 0 ? 'text-[#087F5B]' : 'text-[#667085]'}">${window.Utils.formatPrice(v.price)}/${v.unit}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            ` : ''}

            <!-- Weight selector -->
            ${selectedVariant.weights && selectedVariant.weights.length > 1 ? `
            <div class="mb-5" id="weight-selector-container">
              <label class="text-xs font-bold uppercase tracking-wider text-[#667085] block mb-2">Select Package Size:</label>
              <div class="flex flex-wrap gap-2" id="weight-selector">
                ${selectedVariant.weights.map((w, i) => `
                  <button
                    class="weight-btn px-3.5 py-2 rounded-lg border text-xs sm:text-sm font-semibold transition-all ${i === 0 ? 'border-[#087F5B] bg-[#E8F7F1] text-[#087F5B]' : 'border-[#E5E7EB] bg-white text-[#17212B] hover:border-[#087F5B]/50'}"
                    onclick="window.Pages.selectWeight('${w}')"
                  >
                    ${w}
                    <span class="block text-[11px] font-normal text-[#667085]">${window.Utils.formatPrice(selectedVariant.prices?.[w] || 0)}</span>
                  </button>
                `).join('')}
              </div>
            </div>
            ` : ''}

            <!-- Quantity -->
            <div class="mb-6">
              <label class="text-xs font-bold uppercase tracking-wider text-[#667085] block mb-2">Quantity:</label>
              <div class="flex items-center gap-4">
                <div class="flex items-center border border-[#E5E7EB] rounded-lg bg-white overflow-hidden">
                  <button class="qty-btn w-9 h-9 flex items-center justify-center text-[#17212B] text-lg font-bold hover:bg-gray-100 transition-colors" onclick="window.Pages.changeDetailQty(-1)">−</button>
                  <span id="detail-qty" class="w-12 h-9 flex items-center justify-center font-bold text-sm text-[#17212B]">1</span>
                  <button class="qty-btn w-9 h-9 flex items-center justify-center text-[#17212B] text-lg font-bold hover:bg-gray-100 transition-colors" onclick="window.Pages.changeDetailQty(1)">+</button>
                </div>
                <span class="text-xs text-[#667085]">Max 99 units per order</span>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex items-center gap-3 mb-6">
              ${stock.available ? `
                <button id="buy-now-btn" onclick="window.Pages.buyNow()" class="flex-1 bg-[#FF7A18] hover:bg-[#E56A10] active:scale-98 text-white font-bold py-3 px-4 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 text-sm">
                  <span>Buy Now</span>
                </button>
                <button id="add-to-cart-detail" onclick="window.Pages.addToCartDetail()" class="add-to-cart-btn flex-1 bg-[#087F5B] hover:bg-[#056B4D] active:scale-98 text-white font-bold py-3 px-4 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 text-sm">
                  ${window.Icons ? window.Icons.render('cart', 'w-4 h-4') : ''}
                  <span>Add to Cart</span>
                </button>
              ` : `
                <button class="flex-1 bg-gray-200 text-gray-500 font-bold py-3 rounded-lg cursor-not-allowed text-sm" disabled>Out of Stock</button>
              `}
              <button id="wishlist-detail-btn" onclick="window.Pages.toggleDetailWishlist()" title="Save to Wishlist" class="w-11 h-11 border border-[#E5E7EB] ${inWishlist ? 'border-red-300 bg-red-50 text-red-500' : 'bg-white text-[#667085] hover:border-red-300 hover:text-red-500'} rounded-lg flex items-center justify-center transition-all flex-shrink-0 active:scale-95">
                ${window.Icons ? window.Icons.render('heart', 'w-5 h-5') : ''}
              </button>
            </div>

            <!-- Delivery info cards -->
            <div class="bg-[#F8FAF9] rounded-xl p-4 border border-[#E5E7EB] space-y-3">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-[#E8F7F1] flex items-center justify-center text-[#087F5B] flex-shrink-0">
                  ${window.Icons ? window.Icons.render('truck', 'w-4 h-4') : ''}
                </div>
                <div>
                  <div class="text-xs sm:text-sm font-semibold text-[#17212B]">Standard Grocery Delivery</div>
                  <div class="text-xs text-[#667085]">1-2 business days · ৳60 (Free delivery on orders over ৳1,000)</div>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF7A18] flex-shrink-0">
                  ${window.Icons ? window.Icons.render('zap', 'w-4 h-4') : ''}
                </div>
                <div>
                  <div class="text-xs sm:text-sm font-semibold text-[#17212B]">Express Same-Day Delivery</div>
                  <div class="text-xs text-[#667085]">Available across Dhaka, Gazipur & Narayanganj · ৳120 flat fee</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Tabs -->
        <div class="bg-white rounded-xl border border-[#E5E7EB] mb-12 overflow-hidden">
          <div class="flex border-b border-[#E5E7EB] overflow-x-auto bg-[#F8FAF9]">
            ${['description', 'information', 'nutrition', 'delivery', 'reviews'].map(tab => `
              <button class="tab-btn flex-shrink-0 px-5 py-3.5 text-xs sm:text-sm font-semibold transition-colors ${tab === activeTab ? 'active text-[#087F5B] border-b-2 border-[#087F5B] bg-white' : 'text-[#667085] hover:text-[#17212B]'} capitalize"
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
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-lg sm:text-xl font-bold text-[#17212B]">Related Products</h2>
              <p class="text-[#667085] text-xs mt-0.5">Customers who viewed this also bought</p>
            </div>
            <a href="#/category/${product.category}" class="text-xs font-semibold text-[#087F5B] hover:underline flex items-center gap-1">
              <span>View Category</span>
              ${window.Icons ? window.Icons.render('chevronRight', 'w-3.5 h-3.5') : ''}
            </a>
          </div>
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
          <h3 class="font-bold text-[#17212B] text-base mb-2">${product.name}</h3>
          <p class="text-[#667085] text-sm leading-relaxed mb-4">${product.description}</p>
          <div class="flex flex-wrap gap-2 mt-4">
            ${product.tags.map(tag => `<span class="px-2.5 py-1 bg-[#F8FAF9] border border-[#E5E7EB] text-[#667085] text-xs rounded-md">#${tag}</span>`).join('')}
          </div>
        `;
      case 'information':
        return `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              ['Organic', product.organic ? 'Yes' : 'No'],
            ].map(([label, value]) => `
              <div class="flex justify-between py-2.5 border-b border-[#E5E7EB]/60 text-xs sm:text-sm">
                <span class="text-[#667085] font-medium">${label}</span>
                <span class="text-[#17212B] font-semibold">${value}</span>
              </div>
            `).join('')}
          </div>
        `;
      case 'nutrition':
        if (!product.nutrition) return '<p class="text-[#667085] text-sm">Nutrition information not available for this product.</p>';
        return `
          <h3 class="font-bold text-[#17212B] text-sm mb-3">Nutrition Facts (per 100g)</h3>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
            ${Object.entries(product.nutrition).map(([key, val]) => `
              <div class="text-center bg-[#F8FAF9] border border-[#E5E7EB] rounded-lg p-3">
                <div class="text-lg font-bold text-[#087F5B]">${val}</div>
                <div class="text-xs text-[#667085] capitalize mt-0.5">${key}</div>
              </div>
            `).join('')}
          </div>
        `;
      case 'delivery':
        return `
          <div class="space-y-3">
            ${[
              { iconName: 'truck', title: 'Standard Delivery', detail: '1-2 business days · ৳60 · Free for orders over ৳1,000' },
              { iconName: 'zap', title: 'Express Delivery', detail: 'Same day across Dhaka, Gazipur, Narayanganj · ৳120' },
              { iconName: 'mapPin', title: 'Delivery Coverage', detail: 'All 64 districts of Bangladesh supported' },
              { iconName: 'rotateCcw', title: 'Hassle-Free Returns', detail: 'Immediate exchange or full refund on delivery doorstep inspection' },
            ].map(({ iconName, title, detail }) => `
              <div class="flex items-start gap-3.5 p-3.5 bg-[#F8FAF9] rounded-lg border border-[#E5E7EB]">
                <div class="w-8 h-8 rounded-md bg-[#E8F7F1] text-[#087F5B] flex items-center justify-center flex-shrink-0">
                  ${window.Icons ? window.Icons.render(iconName, 'w-4 h-4') : ''}
                </div>
                <div>
                  <div class="font-semibold text-[#17212B] text-xs sm:text-sm">${title}</div>
                  <div class="text-xs text-[#667085] mt-0.5">${detail}</div>
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
            <div class="text-center md:border-r md:border-[#E5E7EB] pr-4">
              <div class="text-5xl font-black text-[#17212B] mb-2">${avgRating}</div>
              <div class="flex justify-center mb-1.5">${window.Utils.stars(avgRating, 'lg')}</div>
              <div class="text-xs text-[#667085]">Based on ${product.reviewCount} reviews</div>
              <!-- Rating bars -->
              <div class="mt-4 space-y-2 text-left">
                ${[5,4,3,2,1].map(star => {
                  const pct = star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 3 : 2;
                  return `
                    <div class="flex items-center gap-2">
                      <span class="text-xs text-[#667085] w-3">${star}</span>
                      <div class="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div class="h-1.5 rounded-full bg-[#087F5B]" style="width:${pct}%"></div>
                      </div>
                      <span class="text-xs text-[#667085] w-7 text-right">${pct}%</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
            <!-- Review list -->
            <div class="md:col-span-2 space-y-4">
              ${reviews.map(r => `
                <div class="border-b border-[#E5E7EB] pb-4 last:border-0">
                  <div class="flex items-center gap-3 mb-1.5">
                    <div class="w-8 h-8 bg-[#E8F7F1] text-[#087F5B] font-bold rounded-full flex items-center justify-center text-xs">${r.name.charAt(0)}</div>
                    <div>
                      <div class="font-semibold text-xs sm:text-sm text-[#17212B]">${r.name}</div>
                      <div class="flex items-center gap-2">
                        ${window.Utils.stars(r.rating, 'sm')}
                        <span class="text-[11px] text-[#667085]">${r.date}</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-xs sm:text-sm text-[#667085] leading-relaxed">${r.review}</p>
                </div>
              `).join('')}
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
      btn.classList.toggle('border-[#087F5B]', i === idx);
      btn.classList.toggle('border-[#E5E7EB]', i !== idx);
    });
  };

  window.Pages.selectVariant = (idx) => {
    selectedVariant = product.variants[idx];
    selectedWeight = selectedVariant.weights ? selectedVariant.weights[0] : selectedVariant.weight;
    document.querySelectorAll('.variant-btn').forEach((btn, i) => {
      btn.classList.toggle('border-[#087F5B]', i === idx);
      btn.classList.toggle('bg-[#E8F7F1]', i === idx);
      btn.classList.toggle('text-[#087F5B]', i === idx);
      btn.classList.toggle('border-[#E5E7EB]', i !== idx);
      btn.classList.toggle('bg-white', i !== idx);
      btn.classList.toggle('text-[#17212B]', i !== idx);
    });
    updatePriceDisplay();
    // Update weight selector
    const weightContainer = document.getElementById('weight-selector-container');
    if (weightContainer && selectedVariant.weights) {
      weightContainer.innerHTML = `
        <label class="text-xs font-bold uppercase tracking-wider text-[#667085] block mb-2">Select Package Size:</label>
        <div class="flex flex-wrap gap-2">
          ${selectedVariant.weights.map((w, i) => `
            <button class="weight-btn px-3.5 py-2 rounded-lg border text-xs sm:text-sm font-semibold transition-all ${i === 0 ? 'border-[#087F5B] bg-[#E8F7F1] text-[#087F5B]' : 'border-[#E5E7EB] bg-white text-[#17212B]'}" onclick="window.Pages.selectWeight('${w}')">
              ${w}
              <span class="block text-[11px] font-normal text-[#667085]">${window.Utils.formatPrice(selectedVariant.prices?.[w] || 0)}</span>
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
      btn.classList.toggle('border-[#087F5B]', isActive);
      btn.classList.toggle('bg-[#E8F7F1]', isActive);
      btn.classList.toggle('text-[#087F5B]', isActive);
      btn.classList.toggle('border-[#E5E7EB]', !isActive);
      btn.classList.toggle('bg-white', !isActive);
      btn.classList.toggle('text-[#17212B]', !isActive);
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
    window.Toast.success(`${selectedVariant.variantName} (${selectedWeight}) added to cart`);
    const btn = document.getElementById('add-to-cart-detail');
    if (btn) {
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<span>Added to Cart!</span>';
      btn.classList.add('bg-[#16A34A]');
      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.classList.remove('bg-[#16A34A]');
      }, 1500);
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
      btn.classList.toggle('border-[#E5E7EB]', !added);
      btn.classList.toggle('bg-white', !added);
      btn.classList.toggle('text-[#667085]', !added);
      if (svg) svg.setAttribute('fill', added ? 'currentColor' : 'none');
    }
    window.Toast[added ? 'success' : 'info'](added ? 'Saved to wishlist' : 'Removed from wishlist');
  };

  window.Pages.switchTab = (tab) => {
    activeTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      const isActive = btn.getAttribute('onclick').includes(`'${tab}'`);
      btn.classList.toggle('active', isActive);
      btn.classList.toggle('text-[#087F5B]', isActive);
      btn.classList.toggle('border-b-2', isActive);
      btn.classList.toggle('border-[#087F5B]', isActive);
      btn.classList.toggle('bg-white', isActive);
      btn.classList.toggle('text-[#667085]', !isActive);
    });
    const tabContent = document.getElementById('tab-content');
    if (tabContent) tabContent.innerHTML = renderTab(tab);
  };

  renderPage();
};
