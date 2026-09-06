// DailyMart BD — Order Confirmation Page
window.Pages = window.Pages || {};
window.Pages.orderConfirmation = (params) => {
  const content = document.getElementById('page-content');
  const { orderId } = params;
  const order = window.Store.getOrderById(orderId);

  if (!order) {
    content.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-20 text-center page-enter">
      <div class="text-8xl mb-6">❌</div>
      <h2 class="text-2xl font-bold text-gray-700 mb-3">Order Not Found</h2>
      <button onclick="window.Router.navigate('/')" class="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold">Back to Home</button>
    </div>
    `;
    return;
  }

  const paymentLabels = { cod: 'Cash on Delivery', bkash: 'bKash', nagad: 'Nagad', card: 'Card Payment' };
  const deliveryLabels = { standard: 'Standard Delivery (1-2 days)', express: 'Express Delivery (Same Day)' };

  content.innerHTML = `
  <div class="page-enter max-w-4xl mx-auto px-4 py-10">

    <!-- Success Banner -->
    <div class="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-8 text-center text-white mb-8 shadow-xl">
      <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <span class="text-4xl">✓</span>
      </div>
      <h1 class="text-3xl font-black mb-2">Order Confirmed!</h1>
      <p class="text-emerald-100 text-lg">Thank you, ${order.customer.name}! Your order has been placed successfully.</p>
      <div class="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-xl px-5 py-2.5 backdrop-blur">
        <span class="text-emerald-100 text-sm">Order ID:</span>
        <span class="font-black text-white text-xl">#${order.orderId}</span>
      </div>
    </div>

    <!-- Order Tracking -->
    <div class="bg-white rounded-2xl shadow-card p-6 mb-6">
      <h2 class="font-bold text-gray-800 text-lg mb-6">Order Tracking</h2>
      <div class="relative">
        <div class="absolute top-5 left-5 right-5 h-0.5 bg-gray-100 hidden sm:block"></div>
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-6">
          ${order.tracking.map((step, i) => `
            <div class="tracker-step ${step.done ? 'done' : i === order.tracking.findIndex(s => !s.done) ? 'active' : 'pending'} flex flex-col items-center text-center">
              <div class="step-circle w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold mb-2 z-10 bg-white relative">
                ${step.done ? '✓' : i + 1}
              </div>
              <div class="text-xs font-semibold text-gray-700">${step.step}</div>
              ${step.time ? `<div class="text-xs text-gray-400 mt-0.5">${step.time}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="mt-6 bg-emerald-50 rounded-xl p-4 text-center">
        <p class="text-sm text-emerald-700">
          <span class="font-semibold">Estimated Delivery:</span> ${order.estimatedDelivery}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Delivery Details -->
      <div class="bg-white rounded-2xl shadow-card p-6">
        <h3 class="font-bold text-gray-800 mb-4">Delivery Details</h3>
        <div class="space-y-2 text-sm">
          <div class="flex gap-2">
            <span class="text-gray-500 w-24 flex-shrink-0">Name:</span>
            <span class="font-medium text-gray-800">${order.customer.name}</span>
          </div>
          <div class="flex gap-2">
            <span class="text-gray-500 w-24 flex-shrink-0">Phone:</span>
            <span class="font-medium text-gray-800">${order.customer.phone}</span>
          </div>
          <div class="flex gap-2">
            <span class="text-gray-500 w-24 flex-shrink-0">Address:</span>
            <span class="font-medium text-gray-800">${order.customer.address}, ${order.customer.area || ''} ${order.customer.district}</span>
          </div>
          <div class="flex gap-2">
            <span class="text-gray-500 w-24 flex-shrink-0">Delivery:</span>
            <span class="font-medium text-gray-800">${deliveryLabels[order.deliveryType] || 'Standard'}</span>
          </div>
          <div class="flex gap-2">
            <span class="text-gray-500 w-24 flex-shrink-0">Payment:</span>
            <span class="font-medium text-gray-800">${paymentLabels[order.paymentMethod] || 'Cash on Delivery'}</span>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="bg-white rounded-2xl shadow-card p-6">
        <h3 class="font-bold text-gray-800 mb-4">Order Summary</h3>
        <div class="space-y-3 max-h-48 overflow-y-auto mb-4">
          ${order.cart.map(item => `
            <div class="flex items-center gap-3">
              <img src="${item.image}" class="w-10 h-10 object-cover rounded-lg flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=60'" />
              <div class="flex-1 min-w-0">
                <div class="text-xs font-medium text-gray-800 truncate">${item.productName}</div>
                <div class="text-xs text-gray-400">${item.selectedWeight} × ${item.quantity}</div>
              </div>
              <div class="text-xs font-bold text-emerald-700">${window.Utils.formatPrice(item.price * item.quantity)}</div>
            </div>
          `).join('')}
        </div>
        <div class="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">Subtotal</span>
            <span>${window.Utils.formatPrice(order.subtotal)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Delivery</span>
            <span class="${order.deliveryCharge === 0 ? 'text-emerald-600' : ''}">${order.deliveryCharge === 0 ? 'FREE' : window.Utils.formatPrice(order.deliveryCharge)}</span>
          </div>
          <div class="flex justify-between font-black text-base">
            <span>Total Paid</span>
            <span class="text-emerald-700">${window.Utils.formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-wrap gap-4 justify-center">
      <button onclick="window.Router.navigate('/')" class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        Continue Shopping
      </button>
      <button onclick="window.Router.navigate('/account')" class="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        My Orders
      </button>
    </div>
  </div>
  `;
};
