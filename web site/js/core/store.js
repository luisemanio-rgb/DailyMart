// DailyMart BD — Global Store (State Management)
window.Store = (() => {
  // Initial state
  const getInitialState = () => ({
    cart: JSON.parse(localStorage.getItem('dm_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('dm_wishlist') || '[]'),
    user: JSON.parse(localStorage.getItem('dm_user') || 'null'),
    orders: JSON.parse(localStorage.getItem('dm_orders') || '[]'),
  });

  let state = getInitialState();
  let listeners = [];

  const notify = () => listeners.forEach(fn => fn(state));

  const persist = () => {
    localStorage.setItem('dm_cart', JSON.stringify(state.cart));
    localStorage.setItem('dm_wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('dm_orders', JSON.stringify(state.orders));
    if (state.user) {
      localStorage.setItem('dm_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('dm_user');
    }
  };

  // Cart helpers
  const getCartKey = (productId, variantId, selectedWeight) =>
    `${productId}__${variantId}__${selectedWeight}`;

  return {
    getState: () => state,

    subscribe: (fn) => {
      listeners.push(fn);
      return () => { listeners = listeners.filter(l => l !== fn); };
    },

    // ===== CART =====
    addToCart: ({ product, variant, selectedWeight, quantity = 1 }) => {
      const key = getCartKey(product.id, variant.variantId, selectedWeight);
      const price = variant.prices[selectedWeight] || variant.price;
      const existing = state.cart.find(i => i.key === key);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cart.push({
          key,
          productId: product.id,
          productName: product.name,
          variantId: variant.variantId,
          variantName: variant.variantName,
          selectedWeight,
          price,
          oldPrice: variant.oldPrice ? (variant.prices[selectedWeight] ? Math.round(variant.prices[selectedWeight] * (variant.oldPrice/variant.price)) : variant.oldPrice) : null,
          image: variant.image || product.image,
          grade: variant.grade,
          unit: variant.unit,
          category: product.category,
          quantity,
        });
      }
      persist();
      notify();
    },

    updateCartQty: (key, quantity) => {
      const item = state.cart.find(i => i.key === key);
      if (item) {
        if (quantity <= 0) {
          state.cart = state.cart.filter(i => i.key !== key);
        } else {
          item.quantity = quantity;
        }
      }
      persist();
      notify();
    },

    removeFromCart: (key) => {
      state.cart = state.cart.filter(i => i.key !== key);
      persist();
      notify();
    },

    clearCart: () => {
      state.cart = [];
      persist();
      notify();
    },

    getCartCount: () => state.cart.reduce((sum, i) => sum + i.quantity, 0),

    getCartTotal: () => state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0),

    getDeliveryCharge: () => {
      const total = state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      if (total === 0) return 0;
      return total >= 1000 ? 0 : 60;
    },

    // ===== WISHLIST =====
    toggleWishlist: (productId) => {
      const idx = state.wishlist.indexOf(productId);
      if (idx > -1) {
        state.wishlist.splice(idx, 1);
      } else {
        state.wishlist.push(productId);
      }
      persist();
      notify();
      return idx === -1; // true if added, false if removed
    },

    isInWishlist: (productId) => state.wishlist.includes(productId),

    getWishlistProducts: () => state.wishlist.map(id => window.getProductById(id)).filter(Boolean),

    // ===== ORDERS =====
    placeOrder: (orderData) => {
      const orderId = 'DM' + Date.now().toString().slice(-8);
      const order = {
        orderId,
        ...orderData,
        cart: [...state.cart],
        subtotal: state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0),
        deliveryCharge: window.Store.getDeliveryCharge(),
        total: state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0) + window.Store.getDeliveryCharge(),
        status: 'confirmed',
        placedAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        tracking: [
          { step: 'Order Placed', done: true, time: new Date().toLocaleTimeString('en-BD') },
          { step: 'Order Confirmed', done: true, time: new Date().toLocaleTimeString('en-BD') },
          { step: 'Preparing', done: false, time: '' },
          { step: 'Out for Delivery', done: false, time: '' },
          { step: 'Delivered', done: false, time: '' },
        ]
      };
      state.orders.unshift(order);
      state.cart = [];
      persist();
      notify();
      return order;
    },

    getOrders: () => state.orders,
    getOrderById: (id) => state.orders.find(o => o.orderId === id),

    // ===== PRODUCT MANAGEMENT (ADMIN) =====
    addProduct: (product) => {
      const custom = JSON.parse(localStorage.getItem('dm_custom_products') || '[]');
      custom.unshift(product);
      localStorage.setItem('dm_custom_products', JSON.stringify(custom));
      // Add to memory
      if (!window.PRODUCTS.some(p => p.id === product.id)) {
        window.PRODUCTS.unshift(product);
      }
      notify();
      return product;
    },

    updateProduct: (updatedProduct) => {
      // 1. Update in custom products if it exists there
      let custom = JSON.parse(localStorage.getItem('dm_custom_products') || '[]');
      const cIdx = custom.findIndex(p => p.id === updatedProduct.id);
      if (cIdx !== -1) {
        custom[cIdx] = { ...custom[cIdx], ...updatedProduct };
        localStorage.setItem('dm_custom_products', JSON.stringify(custom));
      }

      // 2. Also save to overrides so ANY product (built-in or custom) stays updated
      const overrides = JSON.parse(localStorage.getItem('dm_product_overrides') || '{}');
      overrides[updatedProduct.id] = updatedProduct;
      localStorage.setItem('dm_product_overrides', JSON.stringify(overrides));

      // 3. Update in memory
      const idx = window.PRODUCTS.findIndex(p => p.id === updatedProduct.id);
      if (idx !== -1) {
        window.PRODUCTS[idx] = { ...window.PRODUCTS[idx], ...updatedProduct };
      }
      notify();
      return updatedProduct;
    },

    deleteProduct: (productId) => {
      let custom = JSON.parse(localStorage.getItem('dm_custom_products') || '[]');
      custom = custom.filter(p => p.id !== productId);
      localStorage.setItem('dm_custom_products', JSON.stringify(custom));

      // Track deleted products in localStorage so built-in products remain deleted across reloads
      const deleted = JSON.parse(localStorage.getItem('dm_deleted_products') || '[]');
      if (!deleted.includes(productId)) {
        deleted.push(productId);
        localStorage.setItem('dm_deleted_products', JSON.stringify(deleted));
      }

      window.PRODUCTS = window.PRODUCTS.filter(p => p.id !== productId);
      notify();
    },

    getCustomProducts: () => {
      return JSON.parse(localStorage.getItem('dm_custom_products') || '[]');
    },

    // ===== AUTHENTICATION (SIGN IN / SIGN UP) =====
    getUser: () => state.user,

    register: (userData) => {
      const users = JSON.parse(localStorage.getItem('dm_users_db') || '[]');
      // Check duplicate phone or email
      if (userData.phone && users.some(u => u.phone === userData.phone)) {
        return { success: false, message: 'This mobile number is already registered' };
      }
      if (userData.email && users.some(u => u.email && u.email === userData.email)) {
        return { success: false, message: 'This email is already registered' };
      }

      const newUser = {
        id: 'usr_' + Date.now(),
        name: userData.name,
        phone: userData.phone,
        email: userData.email || '',
        district: userData.district || 'Dhaka',
        address: userData.address || '',
        password: userData.password,
        registeredAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('dm_users_db', JSON.stringify(users));

      // Auto login
      state.user = { id: newUser.id, name: newUser.name, phone: newUser.phone, email: newUser.email, district: newUser.district, address: newUser.address };
      persist();
      notify();
      return { success: true, user: state.user };
    },

    login: ({ identifier, password }) => {
      const users = JSON.parse(localStorage.getItem('dm_users_db') || '[]');
      // Search matching phone or email
      const idStr = identifier.trim().toLowerCase();
      const user = users.find(u => (u.phone === idStr || (u.email && u.email.toLowerCase() === idStr)));

      if (!user) {
        // If no user found in DB, check if admin credentials or create mock user
        if ((idStr === "admin" || idStr === "admin@dailymartbd.com") && (password === "admin" || password === "admin123")) {
          state.user = { id: 'admin', name: 'Store Admin', phone: '01700000000', email: 'admin@dailymartbd.com', role: 'admin', district: 'Dhaka', address: 'DailyMart HQ' };
          persist();
          notify();
          return { success: true, user: state.user };
        }
        return { success: false, message: 'No account found with this phone/email. Please Sign Up first.' };
      }

      if (user.password !== password) {
        return { success: false, message: 'Incorrect password. Please try again.' };
      }

      state.user = { id: user.id, name: user.name, phone: user.phone, email: user.email, role: user.role || (user.email === 'admin@dailymartbd.com' ? 'admin' : 'customer'), district: user.district, address: user.address };
      persist();
      notify();
      return { success: true, user: state.user };
    },

    isAdmin: () => {
      return !!(state.user && (state.user.role === 'admin' || state.user.id === 'admin' || state.user.email === 'admin@dailymartbd.com'));
    },

    adminLogin: (password, identifier = 'admin') => {
      const p = password ? password.trim() : '';
      if (p === 'admin' || p === 'admin123' || p === '1234') {
        state.user = { id: 'admin', name: 'Store Administrator', phone: '01700000000', email: 'admin@dailymartbd.com', role: 'admin', district: 'Dhaka', address: 'DailyMart HQ' };
        persist();
        notify();
        return { success: true, user: state.user };
      }
      return { success: false, message: 'Incorrect admin password! (Default: admin)' };
    },

    adminLogout: () => {
      if (state.user && state.user.role === 'admin') {
        state.user = null;
        localStorage.removeItem('dm_user');
        persist();
        notify();
      }
    },

    updateProfile: (updatedData) => {
      if (!state.user) return { success: false, message: 'Not logged in' };
      state.user = { ...state.user, ...updatedData };
      const users = JSON.parse(localStorage.getItem('dm_users_db') || '[]');
      const idx = users.findIndex(u => u.id === state.user.id || u.phone === state.user.phone);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updatedData };
        localStorage.setItem('dm_users_db', JSON.stringify(users));
      }
      persist();
      notify();
      return { success: true, user: state.user };
    },

    changePassword: ({ oldPassword, newPassword }) => {
      if (!state.user) return { success: false, message: 'Not logged in' };
      const users = JSON.parse(localStorage.getItem('dm_users_db') || '[]');
      const user = users.find(u => u.id === state.user.id || u.phone === state.user.phone);
      if (!user) return { success: false, message: 'User not found in database' };
      if (user.password !== oldPassword) return { success: false, message: 'Current password is incorrect' };
      user.password = newPassword;
      localStorage.setItem('dm_users_db', JSON.stringify(users));
      return { success: true, message: 'Password changed successfully' };
    },

    logout: () => {
      state.user = null;
      localStorage.removeItem('dm_user');
      persist();
      notify();
    },

  };
})();
