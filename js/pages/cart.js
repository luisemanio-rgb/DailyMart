// DailyMart BD — Cart Page (Modern Minimalist Design matching Mobile & Desktop)
window.Pages = window.Pages || {};

window.Pages.cart = () => {
  const content = document.getElementById('page-content');

  const render = () => {
    const cart = window.Store.getState().cart;
    const subtotal = window.Store.getCartTotal();
    const delivery = window.Store.getDeliveryCharge();
    const total = subtotal + delivery;
    const cartCount = window.Store.getCartCount();

    content.innerHTML = `
    <div class="page-enter max-w-4xl mx-auto px-4 py-6 sm:py-10">
      <!-- Back & Title Header -->
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <button 
            onclick="window.history.back()" 
            class="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-700 shadow-sm transition-all"
            title="Go Back"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 class="text-2xl sm:text-3xl font-black text-gray-900">Your Cart</h1>
        </div>
        <span class="text-sm font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
          ${cartCount} ${cartCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      ${cart.length === 0 ? `
        <div class="bg-white rounded-xl p-12 text-center shadow-card border border-gray-100 max-w-lg mx-auto">
          <div class="w-16 h-16 rounded-full bg-[#eefbfc] flex items-center justify-center text-[#007d83] mb-4 mx-auto">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p class="text-gray-400 text-sm mb-6">Looks like you haven't added any fresh groceries yet.</p>
          <button 
            onclick="window.Router.navigate('/categories')" 
            class="bg-[#007d83] hover:bg-[#006065] text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg text-sm"
          >
            Start Shopping
          </button>
        </div>
      ` : `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Cart Items List (Screen 3 style) -->
          <div class="lg:col-span-7 space-y-3.5">
            ${cart.map((item, idx) => {
              // Alternating soft tinted cards like reference design
              const bgClass = idx % 2 === 0 ? 'bg-white border-[#E5E7EB]' : 'bg-white border-[#E5E7EB]';
              return `
              <div class="${bgClass} border rounded-xl p-4 sm:p-5 flex items-center justify-between gap-3 shadow-xs hover:shadow-md transition-all">
                <!-- Circular Image & Product info -->
                <div class="flex items-center gap-3.5 min-w-0 flex-1">
                  <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-xs p-1.5 flex items-center justify-center flex-shrink-0">
                    <img 
                      src="${item.image}" 
                      alt="${item.productName}" 
                      class="w-full h-full object-cover rounded-xl"
                      onerror="this.src='images/potatoes/potato-deshi.jpg'"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="font-bold text-gray-900 text-sm sm:text-base truncate mb-0.5">${item.productName}</h3>
                    <div class="text-xs text-gray-500 font-medium mb-1">
                      ${item.selectedWeight || item.variantName || 'Standard'}
                    </div>
                    <div class="text-base font-black text-gray-900">
                      ${window.Utils.formatPrice(item.price)}
                    </div>
                  </div>
                </div>

                <!-- Minimalist Stepper & Delete -->
                <div class="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                  <div class="flex items-center bg-white rounded-full p-1 shadow-xs border border-gray-200/80">
                    <button 
                      class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-black flex items-center justify-center text-sm transition-colors"
                      onclick="window.Pages.updateCartItemQty('${item.key}', ${item.quantity - 1})"
                      title="Decrease"
                    >
                      −
                    </button>
                    <span class="w-7 sm:w-9 text-center text-xs sm:text-sm font-black text-gray-900 select-none">
                      ${item.quantity}
                    </span>
                    <button 
                      class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-black flex items-center justify-center text-sm transition-colors"
                      onclick="window.Pages.updateCartItemQty('${item.key}', ${item.quantity + 1})"
                      title="Increase"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onclick="window.Pages.removeCartItem('${item.key}')" 
                    class="p-1.5 text-gray-300 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
              `;
            }).join('')}

            <!-- Bottom Actions -->
            <div class="flex items-center justify-between pt-2">
              <button 
                onclick="window.Router.navigate('/categories')" 
                class="text-xs sm:text-sm text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5"
              >
                <span>←</span> Add More Products
              </button>
              <button 
                onclick="window.Pages.clearCart()" 
                class="text-xs text-red-500 hover:text-red-700 font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <!-- Order Summary Card (Matching Reference) -->
          <div class="lg:col-span-5">
            <div class="bg-white rounded-xl p-6 sm:p-7 shadow-card border border-gray-100 sticky top-24">
              <h2 class="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

              <div class="space-y-3.5 mb-6 text-sm">
                <div class="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span class="font-bold text-gray-900">${window.Utils.formatPrice(subtotal)}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span class="font-bold text-emerald-600">৳0.00</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span class="font-bold ${delivery === 0 ? 'text-emerald-600' : 'text-gray-900'}">
                    ${delivery === 0 ? 'FREE' : window.Utils.formatPrice(delivery)}
                  </span>
                </div>

                ${delivery > 0 ? `
                  <div class="bg-emerald-50 text-emerald-800 text-xs font-semibold p-2.5 rounded-xl border border-emerald-100 flex items-center gap-2">
                    <span>💡</span>
                    <span>Add ${window.Utils.formatPrice(1000 - subtotal)} more for <b>FREE Delivery</b></span>
                  </div>
                ` : `
                  <div class="bg-emerald-50 text-emerald-800 text-xs font-semibold p-2.5 rounded-xl border border-emerald-100 flex items-center gap-2">
                    <span>🎉</span>
                    <span>You got <b>FREE Delivery</b> on this order!</span>
                  </div>
                `}

                <div class="border-t border-gray-100 pt-4 flex items-baseline justify-between">
                  <span class="text-base font-bold text-gray-900">Total:</span>
                  <span class="text-2xl font-black text-gray-900">${window.Utils.formatPrice(total)}</span>
                </div>
              </div>

              <!-- Big Pill Confirm Order Button -->
              <button 
                onclick="window.Router.navigate('/checkout')" 
                class="w-full py-4 bg-[#007d83] hover:bg-[#006065] active:scale-98 text-white font-black text-base rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm Order</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>

              <div class="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400 font-medium">
                <span>🔒 100% Secure</span>
                <span>•</span>
                <span>💵 Cash on Delivery</span>
                <span>•</span>
                <span>📱 bKash / Nagad</span>
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
    if (window.Toast) window.Toast.info('Item removed from cart');
    render();
  };

  window.Pages.clearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      window.Store.clearCart();
      if (window.Toast) window.Toast.info('Cart cleared');
      render();
    }
  };

  render();
};
