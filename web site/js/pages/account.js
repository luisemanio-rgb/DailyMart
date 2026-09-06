// DailyMart BD — Account Page
window.Pages = window.Pages || {};

window.Pages.account = () => {
  const content = document.getElementById('page-content');
  const user = window.Store.getUser();

  // If not logged in, show Auth page
  if (!user) {
    if (window.Pages.auth) {
      window.Pages.auth('login');
    } else {
      content.innerHTML = `
        <div class="page-enter max-w-md mx-auto px-4 py-16 text-center">
          <div class="text-6xl mb-4">🔒</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Please Sign In</h2>
          <p class="text-gray-500 text-sm mb-6">You need to be signed in to view your account dashboard.</p>
          <a href="#/login" class="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">Sign In / Register</a>
        </div>
      `;
    }
    return;
  }

  const orders = window.Store.getOrders();
  let activeSection = 'orders';

  const renderSection = (section) => {
    switch (section) {
      case 'orders':
        return orders.length === 0 ? `
          <div class="flex flex-col items-center justify-center py-16 text-center">
            <div class="text-7xl mb-4">📦</div>
            <h3 class="font-bold text-gray-700 mb-2">No orders placed yet</h3>
            <p class="text-gray-400 text-sm mb-6">When you place an order, its real-time delivery status will appear here.</p>
            <button onclick="window.Router.navigate('/categories')" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm">
              Start Shopping Now
            </button>
          </div>
        ` : `
          <div class="space-y-4">
            <div class="flex items-center justify-between pb-2 border-b border-gray-100">
              <h2 class="font-bold text-gray-800 text-base">Your Order History (${orders.length})</h2>
              <span class="text-xs text-gray-400">Click any order to view tracking receipt</span>
            </div>
            ${orders.map(order => `
              <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-card hover:shadow-md transition-all cursor-pointer hover:border-emerald-300" onclick="window.Router.navigate('/order-confirmation/${order.orderId}')">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-gray-800 text-sm sm:text-base">Order #${order.orderId}</span>
                      <span class="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">
                        ✓ ${order.status || 'Confirmed'}
                      </span>
                    </div>
                    <div class="text-xs text-gray-400 mt-0.5">${window.Utils.formatDate(order.placedAt)}</div>
                  </div>
                  <div class="text-right">
                    <div class="font-black text-emerald-700 text-base sm:text-lg">${window.Utils.formatPrice(order.total)}</div>
                    <div class="text-[11px] text-gray-400">${order.paymentMethod ? order.paymentMethod.toUpperCase() : 'COD'}</div>
                  </div>
                </div>

                <!-- Product thumbnails preview -->
                <div class="flex items-center gap-2 overflow-x-auto pb-1 mb-3">
                  ${(order.cart || []).slice(0, 5).map(item => `
                    <div class="relative group flex-shrink-0">
                      <img src="${item.image}" class="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-xs" onerror="this.src='images/potatoes/potato-deshi.jpg'" />
                      <span class="absolute -top-1 -right-1 bg-gray-800 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">${item.quantity}</span>
                    </div>
                  `).join('')}
                  ${(order.cart || []).length > 5 ? `<div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">+${order.cart.length - 5}</div>` : ''}
                </div>

                <div class="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-50">
                  <span class="flex items-center gap-1">📍 Delivery to: <b>${order.customer?.district || user.district || 'Bangladesh'}</b></span>
                  <span class="text-emerald-600 font-bold hover:underline">View Receipt & Track &rarr;</span>
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 'profile':
        return `
          <div class="space-y-6">
            <div class="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <h2 class="font-bold text-gray-800 text-base">Personal Profile</h2>
                <p class="text-xs text-gray-400">Update your contact details and default delivery district</p>
              </div>
            </div>

            <form id="profile-edit-form" onsubmit="window.Pages.handleProfileSave(event)" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Full Name *</label>
                  <input type="text" id="prof-name" value="${user.name || ''}" required class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 font-medium" />
                </div>
                <div>
                  <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Mobile Number *</label>
                  <input type="tel" id="prof-phone" value="${user.phone || ''}" required readonly class="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-xl px-4 py-2.5 text-sm cursor-not-allowed font-medium" title="Mobile number cannot be altered" />
                  <span class="text-[10px] text-gray-400">Registered primary account ID</span>
                </div>
                <div>
                  <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Email Address</label>
                  <input type="email" id="prof-email" value="${user.email || ''}" placeholder="your@email.com" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 font-medium" />
                </div>
                <div>
                  <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">District *</label>
                  <select id="prof-district" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 font-medium bg-white">
                    ${(window.DISTRICTS || ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi']).map(d => `<option value="${d}" ${d === user.district ? 'selected' : ''}>${d}</option>`).join('')}
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Default Delivery Address</label>
                  <textarea id="prof-address" rows="2" placeholder="House #, Road #, Area, Landmark" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-none font-medium">${user.address || ''}</textarea>
                </div>
              </div>

              <div class="pt-2">
                <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm">
                  <span>💾</span> Save Changes
                </button>
              </div>
            </form>
          </div>
        `;

      case 'addresses':
        return `
          <div class="space-y-6">
            <div class="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <h2 class="font-bold text-gray-800 text-base">Delivery Addresses</h2>
                <p class="text-xs text-gray-400">Manage where your DailyMart BD groceries get delivered</p>
              </div>
            </div>

            <div class="border-2 border-emerald-500/40 bg-emerald-50/30 rounded-2xl p-5 relative">
              <span class="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Primary Address
              </span>
              <div class="font-bold text-gray-800 mb-1 flex items-center gap-2">
                <span>📍</span> ${user.name}
              </div>
              <div class="text-sm text-gray-600 mb-1 leading-relaxed">
                ${user.address || 'No specific address set yet. Click Edit Profile to set your address.'}
              </div>
              <div class="text-xs font-semibold text-emerald-700">
                District: ${user.district || 'Dhaka'}, Bangladesh
              </div>
              <div class="text-xs text-gray-500 mt-2">
                📞 ${user.phone}
              </div>
            </div>

            <button onclick="window.Pages.switchAccountSection('profile')" class="text-emerald-600 hover:text-emerald-700 font-bold text-xs flex items-center gap-1">
              <span>✏️</span> Edit primary delivery address
            </button>
          </div>
        `;

      case 'wishlist':
        const wishProducts = window.Store.getWishlistProducts();
        return wishProducts.length === 0 ? `
          <div class="text-center py-16">
            <div class="text-7xl mb-4">❤️</div>
            <h3 class="font-bold text-gray-700 mb-2">Your wishlist is empty</h3>
            <p class="text-gray-400 text-sm mb-6">Browse our fresh produce and grocery items to save your favorite products.</p>
            <button onclick="window.Router.navigate('/categories')" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm">
              Explore Products
            </button>
          </div>
        ` : `
          <div class="space-y-4">
            <div class="flex items-center justify-between pb-2 border-b border-gray-100">
              <h2 class="font-bold text-gray-800 text-base">Saved Wishlist Items (${wishProducts.length})</h2>
              <button onclick="window.Router.navigate('/categories')" class="text-xs text-emerald-600 hover:underline font-bold">Add more items</button>
            </div>
            <div class="product-grid grid-3">
              ${wishProducts.map(p => window.ProductCard.render(p)).join('')}
            </div>
          </div>
        `;

      case 'security':
        return `
          <div class="space-y-6">
            <div class="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <h2 class="font-bold text-gray-800 text-base">Account Security</h2>
                <p class="text-xs text-gray-400">Change your password to keep your account secure</p>
              </div>
            </div>

            <form id="password-change-form" onsubmit="window.Pages.handlePasswordChange(event)" class="space-y-4 max-w-md">
              <div id="sec-alert" class="hidden p-3 rounded-xl text-xs font-medium"></div>

              <div>
                <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Current Password *</label>
                <input type="password" id="sec-old-pass" required placeholder="Enter current password" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 font-medium" />
              </div>

              <div>
                <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">New Password *</label>
                <input type="password" id="sec-new-pass" required minlength="6" placeholder="At least 6 characters" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 font-medium" />
              </div>

              <div>
                <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Confirm New Password *</label>
                <input type="password" id="sec-confirm-pass" required minlength="6" placeholder="Repeat new password" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 font-medium" />
              </div>

              <div class="pt-2">
                <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm">
                  <span>🔒</span> Update Password
                </button>
              </div>
            </form>
          </div>
        `;

      default:
        return `<div class="text-center py-12 text-gray-400">Select a section</div>`;
    }
  };

  const render = () => {
    content.innerHTML = `
    <div class="page-enter max-w-7xl mx-auto px-4 py-8">
      <!-- User Profile Header Card -->
      <div class="bg-gradient-to-r from-emerald-800 to-green-700 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-md">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white/15 border-2 border-white/30 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner font-black text-white">
              ${(user.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-xl sm:text-2xl font-black text-white">${user.name}</h1>
                <span class="bg-emerald-500/30 text-emerald-100 border border-emerald-400/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Verified Member
                </span>
              </div>
              <div class="text-emerald-100 text-xs sm:text-sm mt-1 flex items-center gap-3 flex-wrap">
                <span class="flex items-center gap-1">📱 ${user.phone}</span>
                ${user.email ? `<span class="flex items-center gap-1">✉️ ${user.email}</span>` : ''}
                <span class="flex items-center gap-1">📍 ${user.district || 'Dhaka'}, BD</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
            <button 
              onclick="window.Pages.handleLogout()" 
              class="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 border border-white/20"
            >
              <span>🚪</span> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Sidebar navigation -->
        <div class="md:col-span-1">
          <div class="bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100">
            ${[
              { id: 'orders', icon: '📦', label: 'My Orders', badge: orders.length },
              { id: 'profile', icon: '👤', label: 'My Profile' },
              { id: 'addresses', icon: '📍', label: 'Delivery Address' },
              { id: 'wishlist', icon: '❤️', label: 'Wishlist', badge: window.Store.getState().wishlist.length },
              { id: 'security', icon: '🔒', label: 'Security' },
            ].map(({ id, icon, label, badge }) => `
              <button
                class="account-nav-item w-full flex items-center gap-3 px-5 py-3.5 text-left text-sm font-semibold transition-colors hover:bg-gray-50 border-l-4 ${id === activeSection ? 'border-emerald-600 text-emerald-700 bg-emerald-50/70' : 'border-transparent text-gray-600'}"
                onclick="window.Pages.switchAccountSection('${id}')"
              >
                <span class="text-lg">${icon}</span>
                <span>${label}</span>
                ${badge > 0 ? `<span class="ml-auto bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">${badge}</span>` : ''}
              </button>
            `).join('')}
            <button 
              onclick="window.Pages.handleLogout()" 
              class="w-full flex items-center gap-3 px-5 py-3.5 text-left text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors border-l-4 border-transparent hover:border-red-400"
            >
              <span class="text-lg">🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <!-- Content area -->
        <div class="md:col-span-3">
          <div class="bg-white rounded-2xl shadow-card p-6 border border-gray-100" id="account-content">
            ${renderSection(activeSection)}
          </div>
        </div>
      </div>
    </div>
    `;
  };

  window.Pages.switchAccountSection = (section) => {
    activeSection = section;
    document.querySelectorAll('.account-nav-item').forEach(btn => {
      const isCurrent = btn.getAttribute('onclick')?.includes(`'${section}'`);
      btn.classList.toggle('border-emerald-600', isCurrent);
      btn.classList.toggle('text-emerald-700', isCurrent);
      btn.classList.toggle('bg-emerald-50/70', isCurrent);
      btn.classList.toggle('border-transparent', !isCurrent);
      btn.classList.toggle('text-gray-600', !isCurrent);
    });
    const contentEl = document.getElementById('account-content');
    if (contentEl) contentEl.innerHTML = renderSection(section);
  };

  // Profile Save
  window.Pages.handleProfileSave = (e) => {
    e.preventDefault();
    const name = document.getElementById('prof-name')?.value.trim();
    const email = document.getElementById('prof-email')?.value.trim();
    const district = document.getElementById('prof-district')?.value;
    const address = document.getElementById('prof-address')?.value.trim();

    if (!name) {
      if (window.Toast) window.Toast.error('Please provide your name');
      return;
    }

    window.Store.updateProfile({ name, email, district, address });
    if (window.Toast) window.Toast.success('Profile updated successfully!');
    render();
  };

  // Password change
  window.Pages.handlePasswordChange = (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById('sec-old-pass')?.value;
    const newPassword = document.getElementById('sec-new-pass')?.value;
    const confirmPassword = document.getElementById('sec-confirm-pass')?.value;
    const alertBox = document.getElementById('sec-alert');

    if (newPassword !== confirmPassword) {
      if (alertBox) {
        alertBox.className = 'mb-3 p-3 rounded-xl text-xs font-medium bg-red-50 text-red-700 border border-red-200';
        alertBox.textContent = 'New passwords do not match';
        alertBox.classList.remove('hidden');
      }
      return;
    }

    const res = window.Store.changePassword({ oldPassword, newPassword });
    if (!res.success) {
      if (alertBox) {
        alertBox.className = 'mb-3 p-3 rounded-xl text-xs font-medium bg-red-50 text-red-700 border border-red-200';
        alertBox.textContent = res.message;
        alertBox.classList.remove('hidden');
      }
    } else {
      if (alertBox) {
        alertBox.className = 'mb-3 p-3 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200';
        alertBox.textContent = res.message;
        alertBox.classList.remove('hidden');
      }
      if (window.Toast) window.Toast.success('Password changed successfully');
      document.getElementById('password-change-form')?.reset();
    }
  };

  // Logout handler
  window.Pages.handleLogout = () => {
    if (confirm('Are you sure you want to sign out of DailyMart BD?')) {
      window.Store.logout();
      if (window.Toast) window.Toast.info('You have been signed out');
      window.Router.navigate('/login');
    }
  };

  render();
};
