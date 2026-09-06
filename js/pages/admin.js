// DailyMart BD — Store Admin & Product Management Page (Protected: Admin Only)
window.Pages = window.Pages || {};

window.Pages.admin = () => {
  const content = document.getElementById('page-content');
  if (!content) return;

  let activeTab = 'manage'; // 'manage' or 'add'
  let uploadedImageBase64 = '';
  let editUploadedImageBase64 = '';
  let editingProductId = null;

  // Check if current user is admin
  const render = () => {
    const isAdmin = window.Store.isAdmin();

    // IF NOT ADMIN: Show dedicated Admin Authentication Gate
    if (!isAdmin) {
      content.innerHTML = `
      <div class="page-enter max-w-md mx-auto px-4 py-16">
        <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          
          <div class="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
            🛡️
          </div>

          <h1 class="text-2xl font-black text-gray-900 mb-2">Admin Access Required</h1>
          <p class="text-sm text-gray-500 mb-6 leading-relaxed">
            Store product management, adding, editing, and deletion are restricted to authorized administrators only.
          </p>

          <form onsubmit="event.preventDefault(); window.Pages.submitAdminLogin();" class="space-y-4 text-left">
            <div>
              <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Admin Username / Email</label>
              <input
                type="text"
                id="admin-gate-id"
                value="admin"
                placeholder="admin or admin@dailymartbd.com"
                required
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <label class="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Admin Password</label>
              <input
                type="password"
                id="admin-gate-pass"
                value="admin"
                placeholder="Enter admin password"
                required
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>

            <div id="admin-gate-error" class="hidden text-xs text-red-500 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-100"></div>

            <button
              type="submit"
              class="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>🔐 Sign In to Admin Panel</span>
            </button>
          </form>

          <div class="mt-6 pt-5 border-t border-gray-100">
            <button
              onclick="window.Pages.quickAdminLogin()"
              class="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold py-2.5 rounded-xl transition-colors border border-emerald-200/80 flex items-center justify-center gap-1.5"
            >
              <span>⚡ One-Click Admin Sign In</span>
            </button>
            <p class="text-[11px] text-gray-400 mt-2">Default credentials: <span class="font-mono text-gray-600">admin / admin</span></p>
          </div>

          <div class="mt-4">
            <a href="#/" class="text-xs text-gray-400 hover:text-gray-600 underline">← Return to Store Front</a>
          </div>

        </div>
      </div>
      `;
      return;
    }

    // IF ADMIN: Render Full Store Management Dashboard
    const user = window.Store.getUser();

    content.innerHTML = `
    <div class="page-enter max-w-6xl mx-auto px-4 py-8">
      
      <!-- Admin Top Status Bar -->
      <div class="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 bg-white/15 backdrop-blur-xs rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
            🛡️
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-black text-base sm:text-lg">DailyMart Store Admin</h2>
              <span class="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Authorized
              </span>
            </div>
            <p class="text-xs text-emerald-200">Logged in as: <strong class="text-white">${user?.name || 'Administrator'}</strong> (${user?.email || 'admin@dailymartbd.com'})</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <a href="#/" class="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1">
            <span>🏪</span> Store Front
          </a>
          <button
            onclick="window.Pages.adminSignOut()"
            class="px-3 py-2 rounded-xl bg-red-500/80 hover:bg-red-600 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>🚪</span> Sign Out Admin
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <h1 class="text-2xl font-black text-gray-900 flex items-center gap-2">
            Product Management
          </h1>
          <p class="text-xs text-gray-500 mt-1">Add new products, edit pricing/stock, update images and manage store inventory</p>
        </div>
        <div class="flex gap-2">
          <button
            onclick="window.Pages.switchAdminTab('manage')"
            class="px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'manage' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}"
          >
            📋 Manage Products (${window.PRODUCTS.length})
          </button>
          <button
            onclick="window.Pages.switchAdminTab('add')"
            class="px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'add' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}"
          >
            ➕ Add New Product
          </button>
        </div>
      </div>

      <!-- TAB 1: MANAGE PRODUCTS (WITH EDIT & DELETE) -->
      <div id="admin-manage-tab" class="${activeTab === 'manage' ? '' : 'hidden'}">
        <div class="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="text-lg font-bold text-gray-800">All Products in Store (${window.PRODUCTS.length})</h2>
              <p class="text-xs text-gray-400">Click "Edit" to modify product information, price, weight, stock or image</p>
            </div>
            <div class="w-full sm:w-72">
              <input
                type="text"
                id="adm-search-input"
                placeholder="🔍 Search products by name, category..."
                oninput="window.Pages.filterAdminManage(this.value)"
                class="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full"
              />
            </div>
          </div>

          <!-- Product List -->
          <div class="space-y-3 max-h-[650px] overflow-y-auto pr-1" id="adm-products-list">
            ${window.Pages.renderAdminProductRows(window.PRODUCTS)}
          </div>
        </div>
      </div>

      <!-- TAB 2: ADD PRODUCT FORM -->
      <div id="admin-add-tab" class="${activeTab === 'add' ? '' : 'hidden'}">
        <div class="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-gray-100">
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
            <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-base">📝</span>
            New Product Information Form
          </h2>

          <form id="add-product-form" onsubmit="event.preventDefault(); window.Pages.submitNewProduct();" class="space-y-6">
            
            <!-- Row 1: Name & Origin -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Product Name *</label>
                <input
                  type="text"
                  id="adm-name"
                  placeholder="e.g. Sri Lankan Red Potato (শ্রীলঙ্কান আলু)"
                  required
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Origin / Country</label>
                <select id="adm-origin-country" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Holland / Netherlands">Holland / Netherlands</option>
                  <option value="Egypt">Egypt</option>
                  <option value="China">China</option>
                  <option value="Imported">Other Imported</option>
                </select>
              </div>
            </div>

            <!-- Row 2: Category & Subcategory -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Main Category *</label>
                <select id="adm-category" required onchange="window.Pages.onAdminCategoryChange()" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  ${window.CATEGORIES.map(c => `<option value="${c.slug}">${c.icon} ${c.name}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Subcategory *</label>
                <select id="adm-subcategory" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  <!-- Populated dynamically -->
                </select>
              </div>
            </div>

            <!-- Row 3: Pricing & Stock -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Price (৳ Taka) *</label>
                <input
                  type="number"
                  id="adm-price"
                  placeholder="e.g. 65"
                  required
                  min="1"
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Old Price (Optional - for discount)</label>
                <input
                  type="number"
                  id="adm-old-price"
                  placeholder="e.g. 75"
                  min="1"
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Stock Quantity</label>
                <input
                  type="number"
                  id="adm-stock"
                  placeholder="e.g. 100"
                  value="100"
                  min="0"
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <!-- Row 4: Weight & Grade & Brand -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Default Unit / Weight</label>
                <input
                  type="text"
                  id="adm-unit"
                  placeholder="e.g. 1kg or 500g"
                  value="1kg"
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Grade</label>
                <select id="adm-grade" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  <option value="A">Grade A (Standard Good)</option>
                  <option value="A+">Grade A+ (Premium Top)</option>
                  <option value="Organic">Organic Certified</option>
                  <option value="Standard">Standard Regular</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Brand / Farm Name</label>
                <input
                  type="text"
                  id="adm-brand"
                  placeholder="e.g. Deshi Krishi"
                  value="Farm Fresh"
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <!-- Row 5: Product Image -->
            <div>
              <label class="text-sm font-bold text-gray-700 block mb-1.5">Product Image *</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-xs text-gray-500 block mb-1">Option A: Upload from Device</label>
                  <input
                    type="file"
                    id="adm-image-file"
                    accept="image/*"
                    onchange="window.Pages.onAdminImageFilePicked(this)"
                    class="w-full border border-dashed border-emerald-300 rounded-xl p-2.5 text-xs text-gray-600 bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer"
                  />
                </div>
                <div>
                  <label class="text-xs text-gray-500 block mb-1">Option B: Paste Image URL</label>
                  <input
                    type="text"
                    id="adm-image-url"
                    placeholder="https://images.unsplash.com/... or images/..."
                    oninput="window.Pages.onAdminImageUrlInput(this.value)"
                    class="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <!-- Live Preview -->
              <div class="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <img
                  id="adm-preview-img"
                  src="images/potatoes/potato-deshi.jpg"
                  class="w-16 h-16 object-cover rounded-xl border border-gray-200 shadow-xs"
                  alt="Preview"
                />
                <div>
                  <div class="text-xs font-bold text-gray-700">Image Live Preview</div>
                  <div class="text-[11px] text-gray-400" id="adm-preview-info">Default product image selected</div>
                </div>
              </div>
            </div>

            <!-- Row 6: Description -->
            <div>
              <label class="text-sm font-bold text-gray-700 block mb-1.5">Description (Optional)</label>
              <textarea
                id="adm-desc"
                rows="2"
                placeholder="Short description about the product's origin, freshness, and culinary uses..."
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                id="adm-submit-btn"
                class="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-4 rounded-xl text-base shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>🚀 Save & Publish Product to Store</span>
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- EDIT PRODUCT MODAL CONTAINER -->
      <div id="edit-product-modal-root"></div>

    </div>
    `;

    // Populate subcategories for add form
    if (activeTab === 'add') {
      window.Pages.onAdminCategoryChange();
    }
  };

  // Render product rows in Manage tab
  window.Pages.renderAdminProductRows = (products) => {
    if (!products || !products.length) {
      return `<div class="p-8 text-center text-gray-400 text-sm">No products found.</div>`;
    }

    return products.map(p => {
      const v = p.variants?.[0] || {};
      const originDisplay = p.originCountry ? (p.originCountry === 'Bangladesh' ? 'BD' : p.originCountry) : '';
      return `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-gray-50 hover:bg-emerald-50/40 rounded-xl transition-all border border-gray-100" id="adm-prod-${p.id}">
        <div class="flex items-center gap-3 min-w-0">
          <img
            src="${p.image}"
            alt="${p.name}"
            class="w-14 h-14 object-cover rounded-xl border border-gray-200 flex-shrink-0 bg-white"
            onerror="this.src='images/potatoes/potato-deshi.jpg'"
          />
          <div class="min-w-0">
            <div class="font-bold text-gray-900 text-sm truncate flex items-center gap-2">
              <span class="truncate">${p.name}</span>
              ${originDisplay ? `<span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0">${originDisplay}</span>` : ''}
              ${p.bestSeller ? `<span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0">Best Seller</span>` : ''}
            </div>
            <div class="text-xs text-gray-500 capitalize truncate mt-0.5">
              ${p.category.replace(/-/g, ' ')} › ${p.subcategory || 'general'} · Brand: ${p.brand || 'DailyMart'}
            </div>
            <div class="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-2">
              <span>${window.Utils.formatPrice(v.price || 0)}</span>
              ${v.oldPrice ? `<span class="text-gray-400 line-through font-normal text-[11px]">${window.Utils.formatPrice(v.oldPrice)}</span>` : ''}
              <span class="text-gray-400 font-normal">/ ${v.weight || v.unit || '1kg'}</span>
              <span class="text-gray-300">•</span>
              <span class="${v.stock > 10 ? 'text-gray-500' : 'text-amber-600'} font-medium">Stock: ${v.stock || 0}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons: View, Edit, Delete -->
        <div class="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
          <button
            onclick="window.Router.navigate('/product/${p.slug}')"
            class="px-3 py-1.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            title="View Product Details"
          >
            👁️ View
          </button>
          
          <button
            onclick="window.Pages.openEditProductModal('${p.id}')"
            class="px-3 py-1.5 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
            title="Edit Product Information"
          >
            ✏️ Edit
          </button>

          <button
            onclick="window.Pages.deleteProductPrompt('${p.id}', '${p.name.replace(/'/g, "\\'")}')"
            class="px-3 py-1.5 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors"
            title="Delete Product"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
      `;
    }).join('');
  };

  // Switch tabs
  window.Pages.switchAdminTab = (tab) => {
    activeTab = tab;
    render();
  };

  // Admin Login Handler
  window.Pages.submitAdminLogin = () => {
    const id = document.getElementById('admin-gate-id')?.value?.trim();
    const pass = document.getElementById('admin-gate-pass')?.value?.trim();
    const errBox = document.getElementById('admin-gate-error');

    const res = window.Store.adminLogin(pass, id);
    if (res.success) {
      window.Toast.success('🛡️ Welcome back, Store Administrator!');
      render();
    } else {
      if (errBox) {
        errBox.textContent = res.message || 'Invalid admin credentials!';
        errBox.classList.remove('hidden');
      }
    }
  };

  // Quick 1-Click Admin Login
  window.Pages.quickAdminLogin = () => {
    window.Store.adminLogin('admin');
    window.Toast.success('🛡️ Signed in as Store Administrator!');
    render();
  };

  // Admin Logout Handler
  window.Pages.adminSignOut = () => {
    window.Store.adminLogout();
    window.Toast.info('Signed out from Admin Mode');
    render();
  };

  // Category change for Add form
  window.Pages.onAdminCategoryChange = () => {
    const catSlug = document.getElementById('adm-category')?.value;
    const subSelect = document.getElementById('adm-subcategory');
    if (!subSelect) return;

    const cat = window.CATEGORIES.find(c => c.slug === catSlug);
    if (cat && cat.subcategories && cat.subcategories.length) {
      subSelect.innerHTML = cat.subcategories.map(s => `<option value="${s.slug}">${s.icon || '🏷️'} ${s.name}</option>`).join('');
    } else {
      subSelect.innerHTML = `<option value="${catSlug}">${cat?.name || 'General'}</option>`;
    }
  };

  // Category change for Edit modal
  window.Pages.onEditAdminCategoryChange = (selectedSub = '') => {
    const catSlug = document.getElementById('edit-adm-category')?.value;
    const subSelect = document.getElementById('edit-adm-subcategory');
    if (!subSelect) return;

    const cat = window.CATEGORIES.find(c => c.slug === catSlug);
    if (cat && cat.subcategories && cat.subcategories.length) {
      subSelect.innerHTML = cat.subcategories.map(s => `<option value="${s.slug}" ${s.slug === selectedSub ? 'selected' : ''}>${s.icon || '🏷️'} ${s.name}</option>`).join('');
    } else {
      subSelect.innerHTML = `<option value="${catSlug}">${cat?.name || 'General'}</option>`;
    }
  };

  // File upload for Add Form
  window.Pages.onAdminImageFilePicked = (input) => {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImageBase64 = e.target.result;
        const img = document.getElementById('adm-preview-img');
        const info = document.getElementById('adm-preview-info');
        if (img) img.src = uploadedImageBase64;
        if (info) info.textContent = `Uploaded: ${file.name} (${Math.round(file.size / 1024)} KB)`;
      };
      reader.readAsDataURL(file);
    }
  };

  window.Pages.onAdminImageUrlInput = (url) => {
    if (url && url.trim().length > 5) {
      uploadedImageBase64 = url.trim();
      const img = document.getElementById('adm-preview-img');
      const info = document.getElementById('adm-preview-info');
      if (img) img.src = uploadedImageBase64;
      if (info) info.textContent = `Online URL linked`;
    }
  };

  // File upload for Edit Modal
  window.Pages.onEditImageFilePicked = (input) => {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        editUploadedImageBase64 = e.target.result;
        const img = document.getElementById('edit-preview-img');
        if (img) img.src = editUploadedImageBase64;
      };
      reader.readAsDataURL(file);
    }
  };

  window.Pages.onEditImageUrlInput = (url) => {
    if (url && url.trim().length > 5) {
      editUploadedImageBase64 = url.trim();
      const img = document.getElementById('edit-preview-img');
      if (img) img.src = editUploadedImageBase64;
    }
  };

  // OPEN EDIT PRODUCT MODAL
  window.Pages.openEditProductModal = (productId) => {
    const product = window.getProductById(productId);
    if (!product) {
      window.Toast.error('Product not found!');
      return;
    }

    editingProductId = productId;
    const v = product.variants?.[0] || {};
    editUploadedImageBase64 = product.image || '';

    const modalRoot = document.getElementById('edit-product-modal-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-fade-in" id="edit-modal-backdrop" onclick="if(event.target===this) window.Pages.closeEditModal()">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80 rounded-t-3xl sticky top-0 z-10">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">✏️</span>
            <div>
              <h3 class="font-black text-gray-900 text-base sm:text-lg">Edit Product Information</h3>
              <p class="text-xs text-gray-400">ID: ${product.id} · Slug: ${product.slug}</p>
            </div>
          </div>
          <button onclick="window.Pages.closeEditModal()" class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold transition-colors">
            ✕
          </button>
        </div>

        <!-- Modal Form -->
        <form onsubmit="event.preventDefault(); window.Pages.saveEditedProduct();" class="p-6 space-y-5">

          <!-- Name & Origin -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Product Name *</label>
              <input
                type="text"
                id="edit-adm-name"
                value="${product.name.replace(/"/g, '&quot;')}"
                required
                class="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
              />
            </div>
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Origin Country</label>
              <select id="edit-adm-origin-country" class="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                <option value="Bangladesh" ${product.originCountry === 'Bangladesh' ? 'selected' : ''}>Bangladesh</option>
                <option value="India" ${product.originCountry === 'India' ? 'selected' : ''}>India</option>
                <option value="Pakistan" ${product.originCountry === 'Pakistan' ? 'selected' : ''}>Pakistan</option>
                <option value="Sri Lanka" ${product.originCountry === 'Sri Lanka' ? 'selected' : ''}>Sri Lanka</option>
                <option value="Holland / Netherlands" ${product.originCountry && product.originCountry.includes('Holland') ? 'selected' : ''}>Holland / Netherlands</option>
                <option value="Egypt" ${product.originCountry === 'Egypt' ? 'selected' : ''}>Egypt</option>
                <option value="China" ${product.originCountry === 'China' ? 'selected' : ''}>China</option>
                <option value="Imported" ${product.originCountry === 'Imported' ? 'selected' : ''}>Other Imported</option>
              </select>
            </div>
          </div>

          <!-- Category & Subcategory -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Category *</label>
              <select id="edit-adm-category" onchange="window.Pages.onEditAdminCategoryChange()" class="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                ${window.CATEGORIES.map(c => `<option value="${c.slug}" ${c.slug === product.category ? 'selected' : ''}>${c.icon} ${c.name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Subcategory *</label>
              <select id="edit-adm-subcategory" class="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                <!-- populated by onEditAdminCategoryChange -->
              </select>
            </div>
          </div>

          <!-- Pricing & Stock -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Price (৳) *</label>
              <input
                type="number"
                id="edit-adm-price"
                value="${v.price || 0}"
                required
                min="1"
                class="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-700"
              />
            </div>
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Old Price (৳ - Optional)</label>
              <input
                type="number"
                id="edit-adm-old-price"
                value="${v.oldPrice || ''}"
                min="1"
                class="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Stock Quantity</label>
              <input
                type="number"
                id="edit-adm-stock"
                value="${v.stock || 100}"
                min="0"
                class="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <!-- Weight & Grade & Brand -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Unit / Weight</label>
              <input
                type="text"
                id="edit-adm-unit"
                value="${v.weight || v.unit || '1kg'}"
                class="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Grade</label>
              <select id="edit-adm-grade" class="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                <option value="A" ${v.grade === 'A' ? 'selected' : ''}>Grade A</option>
                <option value="A+" ${v.grade === 'A+' ? 'selected' : ''}>Grade A+</option>
                <option value="Organic" ${v.grade === 'Organic' || product.organic ? 'selected' : ''}>Organic Certified</option>
                <option value="Standard" ${v.grade === 'Standard' ? 'selected' : ''}>Standard</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-bold text-gray-700 block mb-1">Brand Name</label>
              <input
                type="text"
                id="edit-adm-brand"
                value="${product.brand || 'DailyMart'}"
                class="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <!-- Image Option -->
          <div>
            <label class="text-xs font-bold text-gray-700 block mb-1">Update Product Image</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              <input
                type="file"
                accept="image/*"
                onchange="window.Pages.onEditImageFilePicked(this)"
                class="w-full border border-dashed border-emerald-300 rounded-xl p-2 text-xs text-gray-600 bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer"
              />
              <input
                type="text"
                id="edit-adm-img-url"
                value="${product.image.startsWith('data:') ? '' : product.image}"
                placeholder="Or paste online image URL"
                oninput="window.Pages.onEditImageUrlInput(this.value)"
                class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div class="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
              <img id="edit-preview-img" src="${product.image}" alt="Preview" class="w-14 h-14 object-cover rounded-xl border border-gray-200" onerror="this.src='images/potatoes/potato-deshi.jpg'" />
              <span class="text-xs text-gray-500">Live preview of selected image</span>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="text-xs font-bold text-gray-700 block mb-1">Description</label>
            <textarea
              id="edit-adm-desc"
              rows="2"
              class="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            >${product.description || ''}</textarea>
          </div>

          <!-- Checkbox Badges -->
          <div class="flex flex-wrap items-center gap-5 pt-1">
            <label class="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
              <input type="checkbox" id="edit-adm-bestseller" ${product.bestSeller ? 'checked' : ''} class="w-4 h-4 text-emerald-600 rounded" />
              <span>🔥 Best Seller</span>
            </label>
            <label class="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
              <input type="checkbox" id="edit-adm-organic" ${product.organic ? 'checked' : ''} class="w-4 h-4 text-emerald-600 rounded" />
              <span>🌿 Organic Certified</span>
            </label>
            <label class="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
              <input type="checkbox" id="edit-adm-featured" ${product.featured ? 'checked' : ''} class="w-4 h-4 text-emerald-600 rounded" />
              <span>⭐ Featured Product</span>
            </label>
          </div>

          <!-- Modal Action Buttons -->
          <div class="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onclick="window.Pages.closeEditModal()"
              class="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
            >
              <span>💾 Save & Update Product</span>
            </button>
          </div>

        </form>

      </div>
    </div>
    `;

    // Populate subcategories for edit form
    window.Pages.onEditAdminCategoryChange(product.subcategory);
  };

  // Close Edit Modal
  window.Pages.closeEditModal = () => {
    const modalRoot = document.getElementById('edit-product-modal-root');
    if (modalRoot) modalRoot.innerHTML = '';
    editingProductId = null;
    editUploadedImageBase64 = '';
  };

  // SAVE EDITED PRODUCT
  window.Pages.saveEditedProduct = () => {
    if (!editingProductId) return;
    const existing = window.getProductById(editingProductId);
    if (!existing) return;

    const name = document.getElementById('edit-adm-name')?.value?.trim();
    const category = document.getElementById('edit-adm-category')?.value;
    const subcategory = document.getElementById('edit-adm-subcategory')?.value;
    const originCountry = document.getElementById('edit-adm-origin-country')?.value;
    const price = parseFloat(document.getElementById('edit-adm-price')?.value || 0);
    const oldPrice = parseFloat(document.getElementById('edit-adm-old-price')?.value || 0) || null;
    const stock = parseInt(document.getElementById('edit-adm-stock')?.value || 100);
    const unit = document.getElementById('edit-adm-unit')?.value?.trim() || '1kg';
    const grade = document.getElementById('edit-adm-grade')?.value || 'A';
    const brand = document.getElementById('edit-adm-brand')?.value?.trim() || existing.brand || 'DailyMart';
    const desc = document.getElementById('edit-adm-desc')?.value?.trim() || existing.description;
    const bestSeller = document.getElementById('edit-adm-bestseller')?.checked ?? existing.bestSeller;
    const organic = document.getElementById('edit-adm-organic')?.checked ?? existing.organic;
    const featured = document.getElementById('edit-adm-featured')?.checked ?? existing.featured;

    if (!name) {
      window.Toast.error('Product name cannot be empty');
      return;
    }
    if (!price || price <= 0) {
      window.Toast.error('Please enter a valid price');
      return;
    }

    const image = editUploadedImageBase64 || existing.image;

    // Update variants
    const updatedVariants = (existing.variants && existing.variants.length) ? existing.variants.map((v, i) => {
      if (i === 0) {
        return {
          ...v,
          price,
          oldPrice,
          stock,
          grade,
          weight: unit,
          unit: unit.includes('kg') || unit.includes('g') ? 'kg' : (v.unit || 'pack'),
          image,
          prices: v.prices ? { ...v.prices, [unit]: price } : { [unit]: price }
        };
      }
      return v;
    }) : [{
      variantId: `${existing.id}-var-1`,
      variantName: `${name} (${unit})`,
      grade,
      weight: unit,
      price,
      oldPrice,
      stock,
      unit: 'pack',
      image,
      prices: { [unit]: price }
    }];

    const updatedProduct = {
      ...existing,
      name,
      category,
      subcategory,
      originCountry,
      origin: originCountry,
      brand,
      description: desc,
      shortDesc: `${brand} fresh ${name}`,
      bestSeller,
      organic,
      featured,
      image,
      images: [image, ...(existing.images || []).filter(img => img !== image)],
      variants: updatedVariants
    };

    // Save update to Store
    window.Store.updateProduct(updatedProduct);
    window.Toast.success(`🎉 "${name}" updated successfully!`);

    // Close modal
    window.Pages.closeEditModal();

    // Re-render list
    const list = document.getElementById('adm-products-list');
    if (list) {
      list.innerHTML = window.Pages.renderAdminProductRows(window.PRODUCTS);
    }
  };

  // Submit new product
  window.Pages.submitNewProduct = () => {
    const name = document.getElementById('adm-name')?.value?.trim();
    const category = document.getElementById('adm-category')?.value;
    const subcategory = document.getElementById('adm-subcategory')?.value;
    const originCountry = document.getElementById('adm-origin-country')?.value;
    const price = parseFloat(document.getElementById('adm-price')?.value || 0);
    const oldPrice = parseFloat(document.getElementById('adm-old-price')?.value || 0) || null;
    const stock = parseInt(document.getElementById('adm-stock')?.value || 100);
    const unit = document.getElementById('adm-unit')?.value?.trim() || '1kg';
    const grade = document.getElementById('adm-grade')?.value || 'A';
    const brand = document.getElementById('adm-brand')?.value?.trim() || 'Farm Fresh';
    const desc = document.getElementById('adm-desc')?.value?.trim() || `${name} sourced freshly for DailyMart BD.`;

    if (!name) {
      window.Toast.error('Please enter product name');
      return;
    }
    if (!price || price <= 0) {
      window.Toast.error('Please enter a valid price');
      return;
    }

    const image = uploadedImageBase64 || 'images/potatoes/potato-deshi.jpg';
    const id = 'custom-' + Date.now();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || id;

    const newProduct = {
      id,
      name,
      slug,
      category,
      subcategory,
      originCountry,
      varietyTag: subcategory,
      description: desc,
      shortDesc: `${brand} fresh ${name}`,
      brand,
      origin: originCountry,
      image,
      images: [image],
      rating: 5.0,
      reviewCount: 1,
      tags: [category, subcategory, name.toLowerCase()],
      featured: true,
      bestSeller: false,
      organic: grade === 'A+' || grade === 'Organic',
      nutrition: { calories: 80, carbs: '18g', protein: '2g', fat: '0.1g', fiber: '2g' },
      storage: 'Keep in a cool dry area.',
      freshness: 'Fresh harvest',
      packaging: 'Standard eco-pack',
      createdAt: new Date().toISOString(),
      variants: [
        {
          variantId: `${id}-var-1`,
          variantName: `${name} (${unit})`,
          grade,
          weight: unit,
          price,
          oldPrice,
          stock,
          unit: unit.includes('kg') || unit.includes('g') ? 'kg' : 'pack',
          image,
          description: desc,
          weights: [unit],
          prices: { [unit]: price }
        }
      ]
    };

    // Save to Store
    window.Store.addProduct(newProduct);
    window.Toast.success(`🎉 "${name}" added successfully!`);

    // Reset form
    document.getElementById('add-product-form')?.reset();
    uploadedImageBase64 = '';
    const previewImg = document.getElementById('adm-preview-img');
    if (previewImg) previewImg.src = 'images/potatoes/potato-deshi.jpg';

    // Switch to manage tab so admin sees the new product right away
    activeTab = 'manage';
    render();
  };

  // Delete product
  window.Pages.deleteProductPrompt = (id, name) => {
    if (confirm(`Are you sure you want to remove "${name}" from the store?`)) {
      window.Store.deleteProduct(id);
      window.Toast.info(`Product removed from store`);
      const row = document.getElementById(`adm-prod-${id}`);
      if (row) row.remove();
      // Update header count if visible
      const heading = document.querySelector('#admin-manage-tab h2');
      if (heading) heading.textContent = `All Products in Store (${window.PRODUCTS.length})`;
    }
  };

  // Filter manage list
  window.Pages.filterAdminManage = (query) => {
    const q = query.toLowerCase().trim();
    const list = document.getElementById('adm-products-list');
    if (!list) return;
    const filtered = window.PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.originCountry && p.originCountry.toLowerCase().includes(q))
    );
    list.innerHTML = window.Pages.renderAdminProductRows(filtered);
  };

  render();
};
