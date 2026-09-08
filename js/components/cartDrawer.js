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
      <div class="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
        <div>
          <h2 class="font-bold text-[#17212B] text-base">Shopping Cart</h2>
          <p class="text-xs text-[#667085]" id="cart-item-count">0 items</p>
        </div>
        <button onclick="window.CartDrawer.close()" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-[#667085] hover:text-[#17212B]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Cart items -->
      <div class="flex-1 overflow-y-auto p-4" id="cart-items-container">
        <div id="cart-items-list"></div>
      </div>

      <!-- Cart Summary -->
      <div class="border-t border-[#E5E7EB] p-5 bg-[#F8FAF9]" id="cart-summary-section"></div>
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
          <div class="w-16 h-16 rounded-full bg-[#E8F7F1] flex items-center justify-center text-[#087F5B] mb-3">
            ${window.Icons ? window.Icons.render('cart', 'w-8 h-8') : '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>'}
          </div>
          <h3 class="font-bold text-[#17212B] text-sm mb-1">Your cart is empty</h3>
          <p class="text-xs text-[#667085] mb-5">Browse our fresh grocery collection to add items</p>
          <button onclick="window.CartDrawer.close(); window.Router.navigate('/categories')" class="bg-[#087F5B] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#056B4D] transition-colors">
            Start Shopping
          </button>
        </div>
      `;
      if (summaryEl) summaryEl.innerHTML = '';
      return;
    }

    listEl.innerHTML = cart.map((item) => {
      return `
      <div class="bg-white border border-[#E5E7EB] rounded-lg p-3 mb-2.5 flex items-center justify-between gap-3 shadow-2xs" data-cart-key="${item.key}">
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="w-12 h-12 rounded-lg bg-[#F8FAF9] border border-[#E5E7EB] p-1 flex items-center justify-center flex-shrink-0">
            <img
              src="${item.image}"
              alt="${item.productName}"
              class="w-full h-full object-contain"
              onerror="this.src='images/potatoes/potato-deshi.jpg'"
            />
          </div>
          <div class="min-w-0 flex-1">
            <h4 class="text-xs sm:text-sm font-semibold text-[#17212B] truncate mb-0.5">${item.productName}</h4>
            <div class="text-[11px] text-[#667085] font-medium mb-1">${item.selectedWeight || item.variantName || ''}</div>
            <div class="text-xs sm:text-sm font-bold text-[#087F5B]">${window.Utils.formatPrice(item.price)}</div>
          </div>
        </div>

        <div class="flex flex-col items-end gap-2 flex-shrink-0">
          <button
            class="text-gray-400 hover:text-[#E5484D] transition-colors p-0.5"
            onclick="window.CartDrawer.removeItem('${item.key}')"
            aria-label="Remove"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <div class="flex items-center bg-[#F8FAF9] rounded-md border border-[#E5E7EB]">
            <button class="w-6 h-6 hover:bg-gray-200 text-[#17212B] font-bold flex items-center justify-center text-xs transition-colors"
              onclick="window.CartDrawer.updateQty('${item.key}', ${item.quantity - 1})">−</button>
            <span class="w-6 text-center text-xs font-bold text-[#17212B]">${item.quantity}</span>
            <button class="w-6 h-6 hover:bg-gray-200 text-[#17212B] font-bold flex items-center justify-center text-xs transition-colors"
              onclick="window.CartDrawer.updateQty('${item.key}', ${item.quantity + 1})">+</button>
          </div>
        </div>
      </div>
      `;
    }).join('');

    const subtotal = window.Store.getCartTotal();
    const delivery = window.Store.getDeliveryCharge();
    const total = subtotal + delivery;

    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="space-y-2 mb-4 text-xs sm:text-sm">
          <div class="flex justify-between text-[#667085]">
            <span>Subtotal</span>
            <span class="font-bold text-[#17212B]">${window.Utils.formatPrice(subtotal)}</span>
          </div>
          <div class="flex justify-between text-[#667085]">
            <span>Delivery Fee</span>
            <span class="font-bold ${delivery === 0 ? 'text-[#16A34A]' : 'text-[#17212B]'}">${delivery === 0 ? 'FREE' : window.Utils.formatPrice(delivery)}</span>
          </div>
          ${delivery > 0 ? `<p class="text-[11px] text-[#087F5B] font-medium">Add ৳${1000 - subtotal} more for free delivery</p>` : ''}
          <div class="border-t border-[#E5E7EB] pt-2 flex items-baseline justify-between">
            <span class="font-bold text-[#17212B] text-sm">Estimated Total:</span>
            <span class="font-black text-lg text-[#087F5B]">${window.Utils.formatPrice(total)}</span>
          </div>
        </div>
        <div class="space-y-2">
          <button
            onclick="window.CartDrawer.close(); window.Router.navigate('/checkout')"
            class="w-full bg-[#FF7A18] hover:bg-[#E56A10] active:scale-98 text-white font-bold py-3 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <span>Proceed to Checkout</span>
            ${window.Icons ? window.Icons.render('arrowRight', 'w-4 h-4') : ''}
          </button>
          <button
            onclick="window.CartDrawer.close(); window.Router.navigate('/cart')"
            class="w-full bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#17212B] font-semibold py-2 rounded-lg transition-colors text-xs text-center"
          >
            View Cart
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
