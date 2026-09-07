// DailyMart BD — Home Page
window.Pages = window.Pages || {};
window.Pages.home = () => {
  const content = document.getElementById('page-content');
  const featured = window.getFeaturedProducts();
  const bestSellers = window.getBestSellers();
  const deals = window.getDealsProducts();

  content.innerHTML = `
  <div class="page-enter">

    <!-- HERO SECTION -->
    <section class="hero-section relative py-16 px-4 overflow-hidden">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80" alt="Fresh groceries" class="w-full h-full object-cover opacity-20" loading="lazy" onerror="this.style.display='none'" />
      </div>
      <div class="relative z-10 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <div class="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm mb-6 backdrop-blur-sm border border-white/20">
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Same-day delivery available
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Freshness<br/>
              <span class="text-emerald-300">Delivered</span><br/>
              to Your Door
            </h1>
            <p class="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
              Shop fresh vegetables, fish, meat, groceries and everyday essentials. Premium quality, fair prices — delivered daily across Bangladesh.
            </p>
            <div class="flex flex-wrap gap-4">
              <button onclick="window.Router.navigate('/categories')" class="bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-all hover:shadow-lg flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                Shop Now
              </button>
              <button onclick="window.Router.navigate('/categories')" class="border-2 border-white/50 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                Explore Categories
              </button>
            </div>
            <!-- Stats -->
            <div class="flex gap-8 mt-10 pt-8 border-t border-white/20">
              ${[
                { num: '10,000+', label: 'Happy Customers' },
                { num: '500+', label: 'Products' },
                { num: '24/7', label: 'Support' },
              ].map(({ num, label }) => `
                <div>
                  <div class="text-2xl font-black text-white">${num}</div>
                  <div class="text-sm text-white/60">${label}</div>
                </div>
              `).join('')}
            </div>
          </div>
          <!-- Hero image grid -->
          <div class="hidden lg:grid grid-cols-2 gap-3">
            ${[
              'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
              'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80',
              'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&q=80',
              'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80',
            ].map((src, i) => `
              <div class="rounded-2xl overflow-hidden ${i === 0 ? 'row-span-2' : ''} h-48 shadow-xl">
                <img src="${src}" alt="Fresh product" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onerror="this.parentElement.style.display='none'" loading="lazy" />
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- PROMO BANNERS -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="promo-gradient rounded-2xl p-5 text-white flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform shadow-lg" onclick="window.Router.navigate('/deals')">
          <span class="text-4xl">🔥</span>
          <div>
            <div class="font-black text-lg">Today's Deals</div>
            <div class="text-sm opacity-80">Up to 30% off</div>
          </div>
        </div>
        <div class="promo-gradient-2 rounded-2xl p-5 text-white flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform shadow-lg" onclick="window.Router.navigate('/category/fish')">
          <span class="text-4xl">🐟</span>
          <div>
            <div class="font-black text-lg">Fresh Fish</div>
            <div class="text-sm opacity-80">Delivered same day</div>
          </div>
        </div>
        <div class="promo-gradient-3 rounded-2xl p-5 text-white flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform shadow-lg" onclick="window.Router.navigate('/category/vegetables')">
          <span class="text-4xl">🥦</span>
          <div>
            <div class="font-black text-lg">Farm Fresh Veggies</div>
            <div class="text-sm opacity-80">Straight from the farm</div>
          </div>
        </div>
      </div>
    </section>

    <!-- POPULAR CATEGORIES -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-black text-gray-900 section-header">Popular Categories</h2>
          <p class="text-gray-500 mt-1 text-sm">Browse by category to find what you need</p>
        </div>
        <button onclick="window.Router.navigate('/categories')" class="text-emerald-600 font-semibold text-sm hover:text-emerald-700 flex items-center gap-1">
          View All <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        ${window.CATEGORIES.map(cat => `
          <div class="category-card bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#E2E8E4] rounded-2xl shadow-xs overflow-hidden cursor-pointer transition-all hover:scale-102" onclick="window.Router.navigate('/category/${cat.slug}')">
            <div class="overflow-hidden h-20 sm:h-24 bg-white">
              <img src="${cat.image}" alt="${cat.name}" class="cat-img w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=60'" loading="lazy" />
            </div>
            <div class="p-2.5 text-center">
              <div class="text-base sm:text-lg mb-0.5">${cat.icon}</div>
              <div class="text-xs font-bold text-[#166534] leading-tight">${cat.name}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- DEALS OF THE DAY -->
    <section class="bg-amber-50 py-10">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-end justify-between mb-6">
          <div>
            <h2 class="text-2xl font-black text-gray-900 section-header">🔥 Today's Deals</h2>
            <p class="text-gray-500 mt-1 text-sm">Limited time offers — don't miss out!</p>
          </div>
          <button onclick="window.Router.navigate('/deals')" class="text-emerald-600 font-semibold text-sm hover:text-emerald-700 flex items-center gap-1">
            All Deals <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="product-grid grid-4">
          ${deals.slice(0, 4).map(p => window.ProductCard.render(p)).join('')}
        </div>
      </div>
    </section>

    <!-- BEST SELLERS -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-black text-gray-900 section-header">⭐ Best Sellers</h2>
          <p class="text-gray-500 mt-1 text-sm">Our most loved products by customers</p>
        </div>
      </div>
      <div class="product-grid grid-4">
        ${bestSellers.slice(0, 8).map(p => window.ProductCard.render(p)).join('')}
      </div>
    </section>

    <!-- FEATURE HIGHLIGHTS -->
    <section class="bg-gradient-to-r from-emerald-700 to-green-800 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${[
            { icon: '🚚', title: 'Free Delivery', desc: 'On orders over ৳1000' },
            { icon: '✅', title: 'Quality Assured', desc: 'Fresh & quality checked' },
            { icon: '🔄', title: 'Easy Returns', desc: '24-hour return policy' },
            { icon: '🔒', title: 'Secure Payment', desc: 'bKash, Nagad, Card & COD' },
          ].map(({ icon, title, desc }) => `
            <div class="flex flex-col items-center text-center text-white">
              <div class="text-4xl mb-3">${icon}</div>
              <div class="font-bold text-white">${title}</div>
              <div class="text-sm text-emerald-200 mt-1">${desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- FRESH TODAY SECTION -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <div class="flex items-end justify-between mb-6">
        <div>
          <h2 class="text-2xl font-black text-gray-900 section-header">🌿 Fresh Today</h2>
          <p class="text-gray-500 mt-1 text-sm">Freshly listed products just for you</p>
        </div>
      </div>
      <div class="product-grid grid-4">
        ${featured.slice(0, 8).map(p => window.ProductCard.render(p)).join('')}
      </div>
    </section>

    <!-- CATEGORY SPOTLIGHT -->
    <section class="max-w-7xl mx-auto px-4 py-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Vegetables spotlight -->
        <div class="rounded-2xl overflow-hidden relative h-52 cursor-pointer group shadow-card" onclick="window.Router.navigate('/category/vegetables')">
          <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" alt="Vegetables" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.parentElement.style.background='linear-gradient(135deg,#064e3b,#059669)'" />
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-transparent flex items-center p-8">
            <div>
              <div class="text-white/70 text-sm mb-1">Daily Essentials</div>
              <div class="text-white text-2xl font-black mb-2">Fresh Vegetables</div>
              <div class="text-white/80 text-sm mb-4">Farm-fresh, delivered daily</div>
              <span class="bg-white text-emerald-700 font-bold px-5 py-2 rounded-xl text-sm hover:bg-emerald-50 transition-colors">Shop Now →</span>
            </div>
          </div>
        </div>
        <!-- Fish spotlight -->
        <div class="rounded-2xl overflow-hidden relative h-52 cursor-pointer group shadow-card" onclick="window.Router.navigate('/category/fish')">
          <img src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80" alt="Fish" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.parentElement.style.background='linear-gradient(135deg,#1e3a8a,#1d4ed8)'" />
          <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center p-8">
            <div>
              <div class="text-white/70 text-sm mb-1">Fresh from the River</div>
              <div class="text-white text-2xl font-black mb-2">Fish & Seafood</div>
              <div class="text-white/80 text-sm mb-4">Hilsa, Rui, Shrimp & more</div>
              <span class="bg-white text-blue-700 font-bold px-5 py-2 rounded-xl text-sm hover:bg-blue-50 transition-colors">Shop Now →</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
  `;

};
