// DailyMart BD — Cart Drawer Component
window.CartDrawer = (() => {
  let isOpen = false;

  const render = () => {
    const root = document.getElementById('cart-drawer-root');
    if (!root) return;

    root.innerHTML = `
    <div id="cart-overlay" class="cart-overlay" onclick="window.CartDrawer.close()"></div>
    <div id="cart-drawer" class="cart-drawer fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl flex flex-col z-[1001]">

      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <div>
          <h2 class="font-bold text-gray-800 text-lg">Shopping Cart</h2>
          <p class="text-xs text-gray-400" id="cart-item-count">0 items</p>
        </div>
        <button onclick="window.CartDrawer.close()" class="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Cart items -->
      <div class="flex-1 overflow-y-auto p-4" id="cart-items-container">
        <div id="cart-items-list"></div>
      </div>

      <!-- Cart Summary -->
      <div class="border-t border-gray-100 p-4 bg-gray-50" id="cart-summary-section"></div>
    </div>
    `;

    updateDrawer();
  };

  const updateDrawer = () => {
    const cart = window.Store.getState().cart;
    const countEl = document.getElementById('cart-item-count');
    const listEl = document.getElementById('cart-items-list');
    const summaryEl = document.getElementById('cart-summary-section');
    if (!listEl) return;

    const count = window.Store.getCartCount();
    if (countEl) countEl.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;

    if (cart.length === 0) {
      listEl.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 text-center">
          <div class="text-6xl mb-4">🛒</div>
          <h3 class="font-semibold text-gray-700 mb-1">Your cart is empty</h3>
          <p class="text-sm text-gray-400 mb-4">Add some fresh products to get started!</p>
          <button onclick="window.CartDrawer.close(); window.Router.navigate('/categories')" class="bg-emerald-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors">
            Shop Now
          </button>
        </div>
      `;
      if (summaryEl) summaryEl.innerHTML = '';
      return;
    }

    listEl.innerHTML = cart.map(item => `
      <div class="flex gap-3 py-4 border-b border-gray-100 last:border-0" data-cart-key="${item.key}">
        <img
          src="${item.image}"
          alt="${item.productName}"
          class="w-16 h-16 object-cover rounded-xl flex-shrink-0"
          onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=60'"
        />
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-gray-800 truncate">${item.productName}</h4>
          <div class="text-xs text-gray-400">${item.variantName} · ${item.selectedWeight}</div>
          ${item.grade ? `<div class="text-xs text-blue-600 font-medium">Grade ${item.grade}</div>` : ''}
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center border border-gray-200 rounded-lg">
              <button class="w-7 h-7 flex items-center justify-center hover:bg-red-50 hover:text-red-500 text-gray-600 font-bold text-sm rounded-l-lg transition-colors"
                onclick="window.CartDrawer.updateQty('${item.key}', ${item.quantity - 1})">−</button>
              <span class="w-8 h-7 flex items-center justify-center text-xs font-bold">${item.quantity}</span>
              <button class="w-7 h-7 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 text-gray-600 font-bold text-sm rounded-r-lg transition-colors"
                onclick="window.CartDrawer.updateQty('${item.key}', ${item.quantity + 1})">+</button>
            </div>
            <span class="text-sm font-bold text-emerald-700">${window.Utils.formatPrice(item.price * item.quantity)}</span>
          </div>
        </div>
        <button
          class="text-gray-300 hover:text-red-500 transition-colors self-start"
          onclick="window.CartDrawer.removeItem('${item.key}')"
          aria-label="Remove"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    `).join('');

    const subtotal = window.Store.getCartTotal();
    const delivery = window.Store.getDeliveryCharge();
    const total = subtotal + delivery;

    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Subtotal</span>
            <span class="font-semibold">${window.Utils.formatPrice(subtotal)}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Delivery</span>
            <span class="font-semibold ${delivery === 0 ? 'text-emerald-600' : ''}">${delivery === 0 ? 'FREE' : window.Utils.formatPrice(delivery)}</span>
          </div>
          ${delivery > 0 ? `<p class="text-xs text-gray-400">Free delivery on orders over ৳1000</p>` : ''}
          <div class="border-t border-gray-200 pt-2 flex justify-between">
            <span class="font-bold text-gray-800">Total</span>
            <span class="font-black text-lg text-emerald-700">${window.Utils.formatPrice(total)}</span>
          </div>
        </div>
        <div class="space-y-2">
          <button
            onclick="window.CartDrawer.close(); window.Router.navigate('/checkout')"
            class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Proceed to Checkout →
          </button>
          <button
            onclick="window.CartDrawer.close(); window.Router.navigate('/cart')"
            class="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            View Full Cart
          </button>
        </div>
      `;
    }
  };

  const open = () => {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (!drawer) { render(); }
    isOpen = true;
    requestAnimationFrame(() => {
      document.getElementById('cart-drawer')?.classList.add('open');
      document.getElementById('cart-overlay')?.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
    updateDrawer();
  };

  const close = () => {
    document.getElementById('cart-drawer')?.classList.remove('open');
    document.getElementById('cart-overlay')?.classList.remove('open');
    document.body.style.overflow = '';
    isOpen = false;
  };

  const updateQty = (key, qty) => {
    window.Store.updateCartQty(key, qty);
    updateDrawer();
  };

  const removeItem = (key) => {
    window.Store.removeFromCart(key);
    updateDrawer();
    window.Toast.info('Item removed from cart');
  };

  window.Store.subscribe(updateDrawer);

  return { render, open, close, updateQty, removeItem, updateDrawer };
})();
