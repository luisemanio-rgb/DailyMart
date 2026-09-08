// DailyMart BD — Checkout Page
window.Pages = window.Pages || {};
window.Pages.checkout = () => {
  const content = document.getElementById('page-content');
  const cart = window.Store.getState().cart;

  if (cart.length === 0) {
    content.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-20 text-center page-enter">
      <div class="w-16 h-16 rounded-full bg-[#E8F7F1] flex items-center justify-center text-[#087F5B] mb-3 mx-auto">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
      </div>
      <h2 class="text-xl font-bold text-[#17212B] mb-2">Your cart is empty</h2>
      <p class="text-gray-400 mb-6">Add some products first!</p>
      <button onclick="window.Router.navigate('/categories')" class="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold">Shop Now</button>
    </div>
    `;
    return;
  }

  const subtotal = window.Store.getCartTotal();
  const delivery = window.Store.getDeliveryCharge();
  const total = subtotal + delivery;
  const user = window.Store.getUser();

  let selectedDelivery = 'standard';
  let selectedPayment = 'cod';

  content.innerHTML = `
  <div class="page-enter max-w-7xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center text-sm text-gray-500 mb-6">
      <a href="#/" class="hover:text-emerald-600">Home</a>
      <span class="mx-2">›</span>
      <a href="#/cart" class="hover:text-emerald-600">Cart</a>
      <span class="mx-2">›</span>
      <span class="text-gray-800 font-medium">Checkout</span>
    </nav>

    <!-- Auth Prompt Banner -->
    ${user ? `
      <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-between mb-6 shadow-xs">
        <span class="flex items-center gap-1.5"><span>✓</span> Logged in as <b>${user.name}</b> (${user.phone})</span>
        <span class="text-emerald-600 text-[11px]">Address Auto-filled</span>
      </div>
    ` : `
      <div class="bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium px-4 py-2.5 rounded-xl flex items-center justify-between mb-6 shadow-xs">
        <span>💡 Have an account? <a href="#/login" class="font-bold underline text-amber-800">Sign In</a> to auto-fill your delivery info and track orders easily.</span>
        <a href="#/login" class="bg-amber-200 hover:bg-amber-300 text-amber-900 px-3 py-1 rounded-lg font-bold text-[11px] transition-colors">Sign In</a>
      </div>
    `}

    <!-- Steps indicator -->
    <div class="flex items-center justify-center gap-0 mb-10">
      ${[
        { num: 1, label: 'Cart', done: true },
        { num: 2, label: 'Checkout', active: true },
        { num: 3, label: 'Confirmation', done: false },
      ].map(({ num, label, done, active }, i) => `
        <div class="flex items-center">
          <div class="flex flex-col items-center">
            <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${done ? 'bg-emerald-600 text-white' : active ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' : 'bg-gray-100 text-gray-400'}">
              ${done ? '✓' : num}
            </div>
            <span class="text-xs font-medium mt-1.5 ${active ? 'text-emerald-600' : done ? 'text-emerald-600' : 'text-gray-400'}">${label}</span>
          </div>
          ${i < 2 ? `<div class="w-20 h-0.5 ${done ? 'bg-emerald-600' : 'bg-gray-200'} mb-4 mx-2"></div>` : ''}
        </div>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Checkout Form -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Customer Info -->
        <div class="bg-white rounded-2xl shadow-card p-6">
          <h3 class="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
            <span class="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-black">1</span>
            Customer Information
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1.5">Full Name *</label>
              <input type="text" id="ch-name" value="${user?.name || ''}" placeholder="Your full name" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 font-medium" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1.5">Mobile Number *</label>
              <input type="tel" id="ch-phone" value="${user?.phone || ''}" placeholder="01XXXXXXXXX" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 font-medium" />
            </div>
            <div class="sm:col-span-2">
              <label class="text-sm font-semibold text-gray-700 block mb-1.5">Email Address</label>
              <input type="email" id="ch-email" value="${user?.email || ''}" placeholder="your@email.com (optional)" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 font-medium" />
            </div>
          </div>
        </div>

        <!-- Delivery Address -->
        <div class="bg-white rounded-2xl shadow-card p-6">
          <h3 class="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
            <span class="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-black">2</span>
            Delivery Address
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="text-sm font-semibold text-gray-700 block mb-1.5">Street Address / House *</label>
              <textarea id="ch-address" placeholder="House/Flat No, Road, Area" rows="2" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 resize-none font-medium">${user?.address || ''}</textarea>
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1.5">District *</label>
              <select id="ch-district" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 pr-10 bg-white font-medium">
                <option value="">Select District</option>
                ${window.DISTRICTS.map(d => `<option value="${d}" ${d === user?.district ? 'selected' : ''}>${d}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1.5">Area / Thana</label>
              <input type="text" id="ch-area" placeholder="Area or Thana" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1.5">Postal Code</label>
              <input type="text" id="ch-postal" placeholder="1207" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" />
            </div>
            <div>
              <label class="text-sm font-semibold text-gray-700 block mb-1.5">Delivery Instructions</label>
              <input type="text" id="ch-instructions" placeholder="e.g. Call before arriving" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" />
            </div>
          </div>
        </div>

        <!-- Delivery Options -->
        <div class="bg-white rounded-2xl shadow-card p-6">
          <h3 class="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
            <span class="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-black">3</span>
            Delivery Option
          </h3>
          <div class="space-y-3">
            ${[
              { id: 'standard', iconSvg: (window.Icons ? window.Icons.render('truck', 'w-5 h-5 text-[#087F5B]') : ''), title: 'Standard Delivery', detail: '1-2 business days · Across Bangladesh', price: delivery === 0 ? 'FREE' : window.Utils.formatPrice(60) },
              { id: 'express', iconSvg: (window.Icons ? window.Icons.render('zap', 'w-5 h-5 text-[#FF7A18]') : ''), title: 'Express Same-Day Delivery', detail: 'Order before 12PM · Dhaka, Gazipur, Narayanganj', price: window.Utils.formatPrice(120) },
            ].map(({ id, iconSvg, title, detail, price }) => `
              <label class="payment-card ${id === selectedDelivery ? 'selected' : ''} flex items-center gap-4 p-3.5 rounded-lg border border-[#E5E7EB] cursor-pointer transition-all bg-white" id="delivery-${id}">
                <input type="radio" name="delivery" value="${id}" ${id === selectedDelivery ? 'checked' : ''} class="accent-[#087F5B]" onchange="window.Pages.selectDelivery('${id}')" />
                <div class="w-9 h-9 rounded-lg bg-[#F8FAF9] flex items-center justify-center flex-shrink-0">${iconSvg}</div>
                <div class="flex-1">
                  <div class="font-semibold text-gray-800 text-sm">${title}</div>
                  <div class="text-xs text-gray-400">${detail}</div>
                </div>
                <div class="font-bold text-emerald-600">${price}</div>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="bg-white rounded-2xl shadow-card p-6">
          <h3 class="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
            <span class="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-black">4</span>
            Payment Method
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${[
              { id: 'cod', badgeText: 'COD', badgeBg: 'bg-[#087F5B]', title: 'Cash on Delivery', detail: 'Pay cash upon delivery' },
              { id: 'bkash', badgeText: 'bKash', badgeBg: 'bg-[#D12053]', title: 'bKash Mobile Payment', detail: 'Direct bKash transfer' },
              { id: 'nagad', badgeText: 'Nagad', badgeBg: 'bg-[#E35925]', title: 'Nagad Wallet', detail: 'Instant payment' },
              { id: 'card', badgeText: 'Cards', badgeBg: 'bg-[#1A1F71]', title: 'Visa / MasterCard', detail: 'All major cards accepted' },
            ].map(({ id, badgeText, badgeBg, title, detail }) => `
              <label class="payment-card ${id === selectedPayment ? 'selected' : ''} flex items-center gap-3 p-3.5 rounded-lg border border-[#E5E7EB] cursor-pointer bg-white" id="payment-${id}">
                <input type="radio" name="payment" value="${id}" ${id === selectedPayment ? 'checked' : ''} class="accent-[#087F5B]" onchange="window.Pages.selectPayment('${id}')" />
                <span class="px-2 py-1 rounded text-white text-[10px] font-extrabold ${badgeBg} flex-shrink-0">${badgeText}</span>
                <div>
                  <div class="font-semibold text-gray-800 text-sm">${title}</div>
                  <div class="text-xs text-gray-400">${detail}</div>
                </div>
              </label>
            `).join('')}
          </div>

          <!-- bKash / Nagad number field -->
          <div id="mobile-payment-field" class="hidden mt-4">
            <label class="text-sm font-semibold text-gray-700 block mb-1.5">bKash/Nagad Number</label>
            <input type="tel" id="ch-mobile-payment" placeholder="01XXXXXXXXX" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200" />
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-2xl shadow-card p-6 sticky-sidebar">
          <h3 class="font-bold text-gray-800 text-lg mb-5">Order Summary</h3>

          <!-- Cart items list -->
          <div class="space-y-3 mb-5 max-h-60 overflow-y-auto pr-1">
            ${cart.map(item => `
              <div class="flex gap-3">
                <img src="${item.image}" alt="${item.productName}" class="w-12 h-12 object-cover rounded-xl flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=60'" />
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-medium text-gray-800 truncate">${item.productName}</div>
                  <div class="text-xs text-gray-400">${item.variantName} · ${item.selectedWeight} × ${item.quantity}</div>
                  <div class="text-xs font-bold text-emerald-700">${window.Utils.formatPrice(item.price * item.quantity)}</div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="border-t border-gray-100 pt-4 space-y-3 mb-5">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-semibold">${window.Utils.formatPrice(subtotal)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Delivery</span>
              <span class="font-semibold ${delivery === 0 ? 'text-emerald-600' : ''}">${delivery === 0 ? 'FREE' : window.Utils.formatPrice(delivery)}</span>
            </div>
            <div class="border-t border-gray-100 pt-3 flex justify-between">
              <span class="font-bold text-gray-800">Grand Total</span>
              <span class="font-black text-xl text-emerald-700" id="checkout-total">${window.Utils.formatPrice(total)}</span>
            </div>
          </div>

          <button
            onclick="window.Pages.placeOrder()"
            id="place-order-btn"
            class="w-full bg-[#FF7A18] hover:bg-[#E56A10] active:scale-98 text-white font-bold py-3.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 shadow-xs"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Place Order
          </button>

          <div class="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            100% Secure Checkout
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  window.Pages.selectDelivery = (id) => {
    selectedDelivery = id;
    document.querySelectorAll('.payment-card[id^="delivery-"]').forEach(el => {
      el.classList.toggle('selected', el.id === `delivery-${id}`);
    });
  };

  window.Pages.selectPayment = (id) => {
    selectedPayment = id;
    document.querySelectorAll('.payment-card[id^="payment-"]').forEach(el => {
      el.classList.toggle('selected', el.id === `payment-${id}`);
    });
    const mobileField = document.getElementById('mobile-payment-field');
    if (mobileField) {
      mobileField.classList.toggle('hidden', !['bkash', 'nagad'].includes(id));
    }
  };

  window.Pages.placeOrder = () => {
    const name = document.getElementById('ch-name')?.value?.trim();
    const phone = document.getElementById('ch-phone')?.value?.trim();
    const address = document.getElementById('ch-address')?.value?.trim();
    const district = document.getElementById('ch-district')?.value;

    if (!name) { window.Toast.error('Please enter your full name'); document.getElementById('ch-name')?.focus(); return; }
    if (!phone || !/^01[0-9]{9}$/.test(phone)) { window.Toast.error('Please enter a valid Bangladeshi mobile number'); document.getElementById('ch-phone')?.focus(); return; }
    if (!address) { window.Toast.error('Please enter your delivery address'); document.getElementById('ch-address')?.focus(); return; }
    if (!district) { window.Toast.error('Please select your district'); document.getElementById('ch-district')?.focus(); return; }

    const btn = document.getElementById('place-order-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<svg class="w-5 h-5 spinner" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> Processing...'; }

    setTimeout(() => {
      const order = window.Store.placeOrder({
        customer: {
          name,
          phone,
          email: document.getElementById('ch-email')?.value?.trim() || '',
          address: document.getElementById('ch-address')?.value?.trim(),
          area: document.getElementById('ch-area')?.value?.trim(),
          district,
          postalCode: document.getElementById('ch-postal')?.value?.trim(),
          instructions: document.getElementById('ch-instructions')?.value?.trim(),
        },
        deliveryType: selectedDelivery,
        paymentMethod: selectedPayment,
      });
      window.Router.navigate(`/order-confirmation/${order.orderId}`);
    }, 1200);
  };
};
