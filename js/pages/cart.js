// DailyMart BD — Cart Page
window.Pages = window.Pages || {};
window.Pages.cart = () => {
  const content = document.getElementById('page-content');

  const render = () => {
    const cart = window.Store.getState().cart;
    const subtotal = window.Store.getCartTotal();
    const delivery = window.Store.getDeliveryCharge();
    const total = subtotal + delivery;

    content.innerHTML = `
    <div class="page-enter max-w-7xl mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center text-sm text-gray-500 mb-6">
        <a href="#/" class="hover:text-emerald-600">Home</a>
        <span class="mx-2 text-gray-300">›</span>
        <span class="text-gray-800 font-medium">Shopping Cart</span>
      </nav>

      <h1 class="text-3xl font-black text-gray-900 mb-8">
        🛒 Shopping Cart
        <span class="text-lg font-normal text-gray-400 ml-2">(${window.Store.getCartCount()} items)</span>
      </h1>

      ${cart.length === 0 ? `
        <div class="flex flex-col items-center justify-center py-24 text-center">
          <div class="text-8xl mb-6">🛒</div>
          <h2 class="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h2>
          <p class="text-gray-400 mb-8 max-w-md">Looks like you haven't added anything yet. Browse our products and find something you love!</p>
          <button onclick="window.Router.navigate('/categories')" class="bg-emerald-600 text-white font-bold px-10 py-3.5 rounded-xl hover:bg-emerald-700 transition-colors">
            Start Shopping
          </button>
        </div>
      ` : `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Cart items -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-card overflow-hidden" id="cart-items-table">
              <!-- Header -->
              <div class="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                <div class="col-span-6">Product</div>
                <div class="col-span-2 text-center">Price</div>
                <div class="col-span-3 text-center">Quantity</div>
                <div class="col-span-1 text-right">Subtotal</div>
              </div>

              ${cart.map(item => `
              <div class="flex flex-col sm:grid sm:grid-cols-12 gap-4 p-4 sm:px-6 sm:py-5 border-b border-gray-50 last:border-0 items-start sm:items-center" data-key="${item.key}">
                <!-- Product info -->
                <div class="col-span-6 flex gap-3 w-full">
                  <img src="${item.image}" alt="${item.productName}" class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=60'" />
                  <div class="min-w-0">
                    <h3 class="font-semibold text-gray-800 text-sm">${item.productName}</h3>
                    <div class="text-xs text-gray-400 mt-0.5">${item.variantName}</div>
                    <div class="text-xs text-gray-400">${item.selectedWeight}</div>
                    ${item.grade ? `<div class="text-xs text-blue-600 font-medium">Grade ${item.grade}</div>` : ''}
                    <!-- Mobile price -->
                    <div class="sm:hidden mt-1 font-bold text-emerald-700">${window.Utils.formatPrice(item.price)}<span class="text-xs text-gray-400 font-normal">/${item.unit || 'unit'}</span></div>
                  </div>
                </div>

                <!-- Price (desktop) -->
                <div class="col-span-2 text-center hidden sm:block">
                  <div class="font-semibold text-gray-800">${window.Utils.formatPrice(item.price)}</div>
                  ${item.oldPrice ? `<div class="text-xs text-gray-400 line-through">${window.Utils.formatPrice(item.oldPrice)}</div>` : ''}
                </div>

                <!-- Quantity -->
                <div class="col-span-3 flex items-center sm:justify-center gap-3">
                  <div class="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button class="w-9 h-9 flex items-center justify-center hover:bg-red-50 hover:text-red-500 text-gray-600 font-bold transition-colors" onclick="window.Pages.updateCartItemQty('${item.key}', ${item.quantity - 1})">−</button>
                    <span class="w-10 h-9 flex items-center justify-center text-sm font-bold">${item.quantity}</span>
                    <button class="w-9 h-9 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 text-gray-600 font-bold transition-colors" onclick="window.Pages.updateCartItemQty('${item.key}', ${item.quantity + 1})">+</button>
                  </div>
                  <button onclick="window.Pages.removeCartItem('${item.key}')" class="text-gray-300 hover:text-red-500 transition-colors ml-auto sm:ml-2" title="Remove">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>

                <!-- Subtotal -->
                <div class="col-span-1 text-right hidden sm:block">
                  <div class="font-bold text-emerald-700">${window.Utils.formatPrice(item.price * item.quantity)}</div>
                </div>
              </div>
              `).join('')}
            </div>

            <!-- Cart actions -->
            <div class="flex flex-wrap items-center justify-between gap-3 mt-4">
              <button onclick="window.Router.navigate('/categories')" class="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 font-medium transition-colors">
                ← Continue Shopping
              </button>
              <button onclick="window.Pages.clearCart()" class="text-sm text-red-400 hover:text-red-600 font-medium transition-colors">
                🗑 Clear Cart
              </button>
            </div>
          </div>

          <!-- Cart Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl shadow-card p-6 sticky-sidebar">
              <h3 class="font-bold text-gray-800 text-lg mb-5">Order Summary</h3>
              <div class="space-y-3 mb-5">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Subtotal (${window.Store.getCartCount()} items)</span>
                  <span class="font-semibold">${window.Utils.formatPrice(subtotal)}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Delivery Charge</span>
                  <span class="font-semibold ${delivery === 0 ? 'text-emerald-600' : ''}">${delivery === 0 ? 'FREE ✓' : window.Utils.formatPrice(delivery)}</span>
                </div>
                ${delivery > 0 ? `
                <div class="text-xs text-emerald-600 bg-emerald-50 rounded-lg p-2">
                  Add ${window.Utils.formatPrice(1000 - subtotal)} more to get FREE delivery!
                </div>
                ` : `
                <div class="text-xs text-emerald-600 bg-emerald-50 rounded-lg p-2">
                  🎉 You qualify for FREE delivery!
                </div>
                `}
                <div class="border-t border-gray-100 pt-3 flex justify-between">
                  <span class="font-bold text-gray-800">Total</span>
                  <span class="font-black text-xl text-emerald-700">${window.Utils.formatPrice(total)}</span>
                </div>
              </div>

              <!-- Payment methods preview -->
              <div class="mb-5">
                <p class="text-xs text-gray-400 mb-2">Accepted payment methods:</p>
                <div class="flex flex-wrap gap-1.5">
                  ${['bKash', 'Nagad', 'COD', 'VISA'].map(m => `<span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">${m}</span>`).join('')}
                </div>
              </div>

              <button onclick="window.Router.navigate('/checkout')" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-colors mb-3">
                Proceed to Checkout →
              </button>
              <div class="flex items-center justify-center gap-2 text-xs text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                Secure checkout
              </div>
            </div>
          </div>
        </div>
      `}
    </div>
    `;
  };

  window.Pages.updateCartItemQty = (key, qty) => {
    window.Store.updateCartQty(key, qty);
    render();
  };

  window.Pages.removeCartItem = (key) => {
    window.Store.removeFromCart(key);
    window.Toast.info('Item removed');
    render();
  };

  window.Pages.clearCart = () => {
    if (confirm('Clear all items from cart?')) {
      window.Store.clearCart();
      render();
    }
  };

  render();
};
