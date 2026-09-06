// DailyMart BD — Easy Admin & Product Management Page
window.Pages = window.Pages || {};

window.Pages.admin = () => {
  const content = document.getElementById('page-content');
  let activeTab = 'add'; // 'add' or 'manage'
  let uploadedImageBase64 = '';

  const render = () => {
    const customProds = window.Store.getCustomProducts();

    content.innerHTML = `
    <div class="page-enter max-w-5xl mx-auto px-4 py-8">
      <!-- Admin Breadcrumb & Title -->
      <nav class="flex items-center text-sm text-gray-500 mb-4">
        <a href="#/" class="hover:text-emerald-600">Home</a>
        <span class="mx-2">›</span>
        <span class="text-gray-800 font-medium">Store Admin</span>
      </nav>

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
        <div>
          <h1 class="text-3xl font-black text-gray-900 flex items-center gap-2">
            ⚙️ Store Admin Panel
          </h1>
          <p class="text-sm text-gray-500 mt-1">Easily add new products, varieties and custom images to DailyMart BD</p>
        </div>
        <div class="flex gap-2">
          <button
            onclick="window.Pages.switchAdminTab('add')"
            class="px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'add' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}"
          >
            ➕ Add New Product
          </button>
          <button
            onclick="window.Pages.switchAdminTab('manage')"
            class="px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'manage' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}"
          >
            📋 Manage Products (${window.PRODUCTS.length})
          </button>
        </div>
      </div>

      <!-- TAB 1: ADD PRODUCT FORM -->
      <div id="admin-add-tab" class="${activeTab === 'add' ? '' : 'hidden'}">
        <div class="bg-white rounded-2xl shadow-card p-6 md:p-8">
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
            <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-base">📝</span>
            Product Information Form
          </h2>

          <form id="add-product-form" onsubmit="event.preventDefault(); window.Pages.submitNewProduct();" class="space-y-6">
            
            <!-- Row 1: Name & Brand -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Product Name *</label>
                <input
                  type="text"
                  id="adm-name"
                  placeholder="e.g. Sri Lankan Red Potato (শ্রীলঙ্কান আলু)"
                  required
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Origin / Country</label>
                <select id="adm-origin-country" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white">
                  <option value="Bangladesh">🇧🇩 Bangladesh</option>
                  <option value="India">🇮🇳 India</option>
                  <option value="Pakistan">🇵🇰 Pakistan</option>
                  <option value="Sri Lanka">🇱🇰 Sri Lanka</option>
                  <option value="Holland / Netherlands">🇳🇱 Holland / Netherlands</option>
                  <option value="Egypt">🇪🇬 Egypt</option>
                  <option value="China">🇨🇳 China</option>
                  <option value="Imported">🌍 Other Imported</option>
                </select>
              </div>
            </div>

            <!-- Row 2: Category & Subcategory -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Main Category *</label>
                <select id="adm-category" required onchange="window.Pages.onAdminCategoryChange()" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white">
                  ${window.CATEGORIES.map(c => `<option value="${c.slug}">${c.icon} ${c.name}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Subcategory *</label>
                <select id="adm-subcategory" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white">
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
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                />
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Old Price (Optional - for discount)</label>
                <input
                  type="number"
                  id="adm-old-price"
                  placeholder="e.g. 75"
                  min="1"
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
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
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            <!-- Row 4: Weight & Grade -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Default Unit / Weight</label>
                <input
                  type="text"
                  id="adm-unit"
                  placeholder="e.g. 1kg or 500g"
                  value="1kg"
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Quality Grade</label>
                <select id="adm-grade" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white">
                  <option value="A+">Grade A+ (Premium)</option>
                  <option value="A" selected>Grade A (Standard)</option>
                  <option value="B">Grade B (Economy)</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-bold text-gray-700 block mb-1.5">Brand / Farm Name</label>
                <input
                  type="text"
                  id="adm-brand"
                  placeholder="e.g. Ceylon Agro or Local Farm"
                  value="Direct Import"
                  class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            <!-- Row 5: IMAGE UPLOADER -->
            <div class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6">
              <label class="text-sm font-bold text-gray-800 block mb-2">📸 Product Image (Upload from Computer or URL)</label>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <!-- File Picker -->
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">Upload from Phone / Computer:</label>
                  <input
                    type="file"
                    id="adm-file-input"
                    accept="image/*"
                    onchange="window.Pages.onAdminImageFilePicked(this)"
                    class="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                  />
                  <span class="text-[11px] text-gray-400 mt-1 block">Supports JPG, PNG, WebP</span>
                </div>

                <!-- URL input -->
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">Or paste online Image URL:</label>
                  <input
                    type="url"
                    id="adm-image-url"
                    placeholder="https://example.com/photo.jpg"
                    oninput="window.Pages.onAdminImageUrlInput(this.value)"
                    class="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-200 bg-white"
                  />
                </div>
              </div>

              <!-- Live Preview -->
              <div id="adm-preview-box" class="mt-4 flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100">
                <img
                  id="adm-preview-img"
                  src="images/potatoes/potato-deshi.jpg"
                  class="w-20 h-20 object-cover rounded-xl border border-gray-200 shadow-sm"
                  alt="Preview"
                />
                <div>
                  <div class="text-xs font-bold text-gray-700">Image Live Preview</div>
                  <div class="text-[11px] text-gray-400" id="adm-preview-info">Default potato image selected</div>
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
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                id="adm-submit-btn"
                class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl text-base shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>🚀 Save & Publish Product to Store</span>
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- TAB 2: MANAGE PRODUCTS -->
      <div id="admin-manage-tab" class="${activeTab === 'manage' ? '' : 'hidden'}">
        <div class="bg-white rounded-2xl shadow-card p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 class="text-lg font-bold text-gray-800">All Products in Store (${window.PRODUCTS.length})</h2>
            <input
              type="text"
              id="adm-search-input"
              placeholder="Search products..."
              oninput="window.Pages.filterAdminManage(this.value)"
              class="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 w-full sm:w-64"
            />
          </div>

          <div class="space-y-3 max-h-[600px] overflow-y-auto pr-1" id="adm-products-list">
            ${window.PRODUCTS.map(p => `
              <div class="flex items-center gap-4 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100" id="adm-prod-${p.id}">
                <img src="${p.image}" alt="${p.name}" class="w-14 h-14 object-cover rounded-xl border border-gray-200 flex-shrink-0" onerror="this.src='images/potatoes/potato-deshi.jpg'" />
                <div class="flex-1 min-w-0">
                  <div class="font-bold text-gray-900 text-sm truncate">${p.name}</div>
                  <div class="text-xs text-gray-500 capitalize">${p.category} › ${p.subcategory} ${p.originCountry ? `· 🌍 ${p.originCountry}` : ''}</div>
                  <div class="text-xs font-bold text-emerald-700 mt-0.5">${window.Utils.formatPrice(p.variants[0]?.price || 0)} <span class="text-gray-400 font-normal">/ ${p.variants[0]?.weight || '1kg'}</span></div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <button
                    onclick="window.Router.navigate('/product/${p.slug}')"
                    class="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50"
                  >
                    View
                  </button>
                  <button
                    onclick="window.Pages.deleteProductPrompt('${p.id}', '${p.name.replace(/'/g, "\\'")}')"
                    class="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

    </div>
    `;

    // Populate subcategories initially
    window.Pages.onAdminCategoryChange();
  };

  // Switch tabs
  window.Pages.switchAdminTab = (tab) => {
    activeTab = tab;
    render();
  };

  // When Category changes, update Subcategories
  window.Pages.onAdminCategoryChange = () => {
    const catSlug = document.getElementById('adm-category')?.value;
    const subSelect = document.getElementById('adm-subcategory');
    if (!subSelect) return;

    const cat = window.CATEGORIES.find(c => c.slug === catSlug);
    if (cat && cat.subcategories && cat.subcategories.length) {
      subSelect.innerHTML = cat.subcategories.map(s => `<option value="${s.slug}">${s.icon} ${s.name}</option>`).join('');
    } else {
      subSelect.innerHTML = `<option value="${catSlug}">${cat?.name || 'General'}</option>`;
    }
  };

  // When image file picked
  window.Pages.onAdminImageFilePicked = (input) => {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImageBase64 = e.target.result;
        const img = document.getElementById('adm-preview-img');
        const info = document.getElementById('adm-preview-info');
        if (img) img.src = uploadedImageBase64;
        if (info) info.textContent = `Uploaded file: ${file.name} (${Math.round(file.size / 1024)} KB)`;
      };
      reader.readAsDataURL(file);
    }
  };

  // When image URL input
  window.Pages.onAdminImageUrlInput = (url) => {
    if (url && url.trim().length > 5) {
      uploadedImageBase64 = url.trim();
      const img = document.getElementById('adm-preview-img');
      const info = document.getElementById('adm-preview-info');
      if (img) img.src = uploadedImageBase64;
      if (info) info.textContent = `Online URL linked`;
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
      organic: grade === 'A+',
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
          unit: 'pack',
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

    // Show action prompt
    setTimeout(() => {
      if (confirm(`"${name}" is now live! Would you like to view it on the website?`)) {
        window.Router.navigate(`/product/${slug}`);
      }
    }, 400);
  };

  // Delete product
  window.Pages.deleteProductPrompt = (id, name) => {
    if (confirm(`Are you sure you want to remove "${name}" from store?`)) {
      window.Store.deleteProduct(id);
      window.Toast.info(`Product removed from store`);
      const row = document.getElementById(`adm-prod-${id}`);
      if (row) row.remove();
    }
  };

  // Filter manage list
  window.Pages.filterAdminManage = (query) => {
    const q = query.toLowerCase().trim();
    const list = document.getElementById('adm-products-list');
    if (!list) return;
    const filtered = window.PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q) || p.subcategory.includes(q));
    list.innerHTML = filtered.map(p => `
      <div class="flex items-center gap-4 p-3.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-100" id="adm-prod-${p.id}">
        <img src="${p.image}" alt="${p.name}" class="w-14 h-14 object-cover rounded-xl border border-gray-200 flex-shrink-0" onerror="this.src='images/potatoes/potato-deshi.jpg'" />
        <div class="flex-1 min-w-0">
          <div class="font-bold text-gray-900 text-sm truncate">${p.name}</div>
          <div class="text-xs text-gray-500 capitalize">${p.category} › ${p.subcategory} ${p.originCountry ? `· 🌍 ${p.originCountry}` : ''}</div>
          <div class="text-xs font-bold text-emerald-700 mt-0.5">${window.Utils.formatPrice(p.variants[0]?.price || 0)} <span class="text-gray-400 font-normal">/ ${p.variants[0]?.weight || '1kg'}</span></div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <button
            onclick="window.Router.navigate('/product/${p.slug}')"
            class="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50"
          >
            View
          </button>
          <button
            onclick="window.Pages.deleteProductPrompt('${p.id}', '${p.name.replace(/'/g, "\\'")}')"
            class="px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    `).join('');
  };

  render();
};
