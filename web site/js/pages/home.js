// DailyMart BD — Production Home Page
window.Pages = window.Pages || {};
window.Pages.home = () => {
  const content = document.getElementById('page-content');
  if (!content) return;

  const deals = window.getDealsProducts ? window.getDealsProducts().slice(0, 4) : [];
  const bestSellers = window.getBestSellers ? window.getBestSellers().slice(0, 8) : [];
  const vegetables = window.getProductsByCategory ? window.getProductsByCategory('vegetables').slice(0, 4) : [];
  const fruits = window.getProductsByCategory ? window.getProductsByCategory('fruits').slice(0, 4) : [];
  const grocery = window.getProductsByCategory ? window.getProductsByCategory('grocery').slice(0, 4) : [];
  const categories = window.CATEGORIES ? window.CATEGORIES.slice(0, 8) : [];
  const icons = window.Icons || {};

  content.innerHTML = `
  <div class="page-enter pb-16">

    <!-- 1. HERO BANNER (Clean & Professional Composition) -->
    <section class="bg-gradient-to-b from-[#eefbfc] via-white to-white border-b border-[#E5E7EB]/60 py-10 sm:py-16">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <!-- Hero Left Content -->
          <div class="lg:col-span-7 text-left">
            <div class="inline-flex items-center gap-2 bg-[#eefbfc] border border-[#93e2e4] rounded-full px-3 py-1 text-xs font-semibold text-[#007d83] mb-5 tracking-[-0.01em]">
              <span class="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
              <span>Same-day express delivery across Bangladesh</span>
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#17212B] leading-[1.18] tracking-[-0.025em] mb-4">
              Fresh Groceries,<br/>
              <span class="text-[#007d83]">Delivered to Your Door</span>
            </h1>

            <p class="text-sm sm:text-base text-[#667085] font-normal leading-relaxed mb-8 max-w-xl">
              Shop farm-fresh vegetables, seasonal fruits, local river fish, meat, and everyday pantry essentials. Verified quality at fair, transparent market prices.
            </p>

            <div class="flex flex-wrap items-center gap-3">
              <button 
                onclick="window.Router.navigate('/categories')" 
                class="bg-[#007d83] hover:bg-[#006065] active:scale-98 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm tracking-[-0.01em]"
              >
                <span>Shop Now</span>
                <span>${icons.arrowRight ? icons.arrowRight(16) : '→'}</span>
              </button>

              <button 
                onclick="window.Router.navigate('/categories')" 
                class="bg-white hover:bg-[#f4fdfe] active:scale-98 text-[#17212B] border border-[#E5E7EB] hover:border-[#007d83] font-semibold text-sm px-6 py-3 rounded-lg transition-colors flex items-center gap-2 tracking-[-0.01em]"
              >
                <span>Explore Categories</span>
              </button>
            </div>

            <!-- Customer Trust Metrics -->
            <div class="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#E5E7EB]">
              <div>
                <div class="text-xl sm:text-2xl font-bold tracking-tight text-[#17212B]">10,000+</div>
                <div class="text-xs font-normal text-[#667085] mt-0.5">Happy Customers</div>
              </div>
              <div>
                <div class="text-xl sm:text-2xl font-bold tracking-tight text-[#17212B]">100%</div>
                <div class="text-xs font-normal text-[#667085] mt-0.5">Fresh Guaranteed</div>
              </div>
              <div>
                <div class="text-xl sm:text-2xl font-bold tracking-tight text-[#17212B]">30 Mins</div>
                <div class="text-xs font-normal text-[#667085] mt-0.5">Express Packing</div>
              </div>
            </div>
          </div>

          <!-- Hero Right Showcase Imagery -->
          <div class="lg:col-span-5">
            <div class="relative grid grid-cols-2 gap-3 p-3 bg-white rounded-2xl border border-[#E5E7EB] shadow-card">
              <div class="rounded-xl overflow-hidden h-40 sm:h-48 bg-[#f4fdfe]">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" 
                  alt="Fresh Vegetables" 
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
              </div>
              <div class="rounded-xl overflow-hidden h-40 sm:h-48 bg-[#f4fdfe]">
                <img 
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&q=80" 
                  alt="Fresh Fruits" 
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
              </div>
              <div class="col-span-2 rounded-xl overflow-hidden h-36 sm:h-44 bg-[#f4fdfe] relative">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=80" 
                  alt="Grocery Marketplace" 
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <span class="text-white text-xs font-semibold">100% Quality Checked Sourcing</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 2. TRUST / SERVICE FEATURES (Lucide Icons) -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${[
          { icon: icons.truck ? icons.truck(24, 'text-[#007d83]') : '', title: 'Free Delivery', desc: 'On orders over ৳1000' },
          { icon: icons.checkCircle ? icons.checkCircle(24, 'text-[#007d83]') : '', title: 'Quality Assured', desc: '100% fresh, farm sourced' },
          { icon: icons.rotateCcw ? icons.rotateCcw(24, 'text-[#007d83]') : '', title: '24-Hour Return', desc: 'Easy instant replacement' },
          { icon: icons.shield ? icons.shield(24, 'text-[#007d83]') : '', title: 'Secure Payments', desc: 'bKash, Nagad, Card & COD' },
        ].map(item => `
          <div class="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-subtle flex items-center gap-3.5 hover:border-[#007d83] transition-colors">
            <div class="w-11 h-11 rounded-lg bg-[#eefbfc] flex items-center justify-center flex-shrink-0">
              ${item.icon}
            </div>
            <div>
              <div class="font-semibold text-[#17212B] text-sm leading-snug">${item.title}</div>
              <div class="text-[12px] text-[#667085] leading-tight mt-0.5">${item.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- 3. FEATURED CATEGORIES (Clean Category Cards) -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-end justify-between mb-6 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 class="section-title">Shop by Category</h2>
          <p class="section-subtitle">Browse through our farm-fresh grocery selections</p>
        </div>
        <button 
          onclick="window.Router.navigate('/categories')" 
          class="text-xs sm:text-sm font-semibold text-[#007d83] hover:text-[#006065] flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <span>${icons.chevronRight ? icons.chevronRight(16) : '›'}</span>
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        ${categories.map(cat => window.CategoryCard.render(cat, 'sm')).join('')}
      </div>
    </section>

    <!-- 4. TODAY'S DEALS -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-card">
        <div class="flex items-end justify-between mb-6 pb-2 border-b border-[#E5E7EB]">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-[#eefbfc] flex items-center justify-center text-[#007d83]">
              ${icons.tag ? icons.tag(18) : '🏷️'}
            </div>
            <div>
              <h2 class="section-title">Today's Deals</h2>
              <p class="section-subtitle">Special discounts on fresh grocery items for a limited time</p>
            </div>
          </div>
          <button 
            onclick="window.Router.navigate('/deals')" 
            class="text-xs sm:text-sm font-semibold text-[#007d83] hover:text-[#006065] flex items-center gap-1 transition-colors"
          >
            <span>All Deals</span>
            <span>${icons.chevronRight ? icons.chevronRight(16) : '›'}</span>
          </button>
        </div>

        <div class="product-grid grid-4">
          ${deals.map(p => window.ProductCard.render(p)).join('')}
        </div>
      </div>
    </section>

    <!-- 5. POPULAR PRODUCTS / BEST SELLERS -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-end justify-between mb-6 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 class="section-title">Popular Best Sellers</h2>
          <p class="section-subtitle">Our most frequently ordered items trusted by families</p>
        </div>
        <button 
          onclick="window.Router.navigate('/categories')" 
          class="text-xs sm:text-sm font-semibold text-[#007d83] hover:text-[#006065] flex items-center gap-1 transition-colors"
        >
          <span>Explore All</span>
          <span>${icons.chevronRight ? icons.chevronRight(16) : '›'}</span>
        </button>
      </div>

      <div class="product-grid grid-4">
        ${bestSellers.map(p => window.ProductCard.render(p)).join('')}
      </div>
    </section>

    <!-- 6. FRESH VEGETABLES SHOWCASE -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-end justify-between mb-6 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 class="section-title">Farm Fresh Vegetables</h2>
          <p class="section-subtitle">Crisp, nutritious vegetables sourced directly from local growers</p>
        </div>
        <button 
          onclick="window.Router.navigate('/category/vegetables')" 
          class="text-xs sm:text-sm font-semibold text-[#007d83] hover:text-[#006065] flex items-center gap-1 transition-colors"
        >
          <span>View Vegetables</span>
          <span>${icons.chevronRight ? icons.chevronRight(16) : '›'}</span>
        </button>
      </div>

      <div class="product-grid grid-4">
        ${vegetables.map(p => window.ProductCard.render(p)).join('')}
      </div>
    </section>

    <!-- 7. SEASONAL FRUITS SHOWCASE -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-end justify-between mb-6 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 class="section-title">Fresh Seasonal Fruits</h2>
          <p class="section-subtitle">Hand-picked sweet and ripe fruits packed with natural vitamins</p>
        </div>
        <button 
          onclick="window.Router.navigate('/category/fruits')" 
          class="text-xs sm:text-sm font-semibold text-[#007d83] hover:text-[#006065] flex items-center gap-1 transition-colors"
        >
          <span>View Fruits</span>
          <span>${icons.chevronRight ? icons.chevronRight(16) : '›'}</span>
        </button>
      </div>

      <div class="product-grid grid-4">
        ${fruits.map(p => window.ProductCard.render(p)).join('')}
      </div>
    </section>

    <!-- 8. GROCERY ESSENTIALS SHOWCASE -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-end justify-between mb-6 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h2 class="section-title">Pantry & Daily Grocery</h2>
          <p class="section-subtitle">Rice, cooking oil, lentils, flour, and spices for daily meals</p>
        </div>
        <button 
          onclick="window.Router.navigate('/category/grocery')" 
          class="text-xs sm:text-sm font-semibold text-[#007d83] hover:text-[#006065] flex items-center gap-1 transition-colors"
        >
          <span>View Grocery</span>
          <span>${icons.chevronRight ? icons.chevronRight(16) : '›'}</span>
        </button>
      </div>

      <div class="product-grid grid-4">
        ${grocery.map(p => window.ProductCard.render(p)).join('')}
      </div>
    </section>

    <!-- 9. PROMOTIONAL EXPRESS BANNER (Restrained & Trustworthy) -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-[#007d83] text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div class="max-w-xl z-10 text-left">
          <span class="text-xs font-semibold text-teal-200 tracking-wider uppercase">Order by 2:00 PM</span>
          <h3 class="text-2xl sm:text-3xl font-bold text-white mt-1 mb-2 leading-tight tracking-[-0.02em]">Same-Day Express Grocery Delivery</h3>
          <p class="text-sm font-normal text-teal-100 leading-relaxed">
            Need urgent dinner ingredients or daily pantry refills? We pack and deliver temperature-controlled fresh groceries to your doorstep across Bangladesh.
          </p>
        </div>
        <button 
          onclick="window.Router.navigate('/categories')" 
          class="z-10 bg-white hover:bg-teal-50 active:scale-98 text-[#007d83] font-semibold text-sm px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm flex-shrink-0 tracking-[-0.01em]"
        >
          <span>Order Fresh Today</span>
          <span>${icons.arrowRight ? icons.arrowRight(16) : '→'}</span>
        </button>
      </div>
    </section>

    <!-- 10. WHY DAILYMART BD (Trust Pillars) -->
    <section class="max-w-7xl mx-auto px-4 py-10">
      <div class="text-center mb-10">
        <h2 class="section-title">Why Shop with DailyMart BD?</h2>
        <p class="section-subtitle max-w-xl mx-auto">We connect local farmers and trusted suppliers directly with consumers for fairer prices and unmatched freshness.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { icon: icons.checkCircle ? icons.checkCircle(26, 'text-[#007d83]') : '', title: '100% Quality Checked', desc: 'Every piece of fruit and vegetable is manually inspected before packaging.' },
          { icon: icons.truck ? icons.truck(26, 'text-[#007d83]') : '', title: 'Fresh Daily Logistics', desc: 'Same-day delivery in insulated bags to preserve optimal freshness.' },
          { icon: icons.tag ? icons.tag(26, 'text-[#007d83]') : '', title: 'Fair Market Pricing', desc: 'Direct sourcing removes middlemen, ensuring fair rates for you and farmers.' },
          { icon: icons.headset ? icons.headset(26, 'text-[#007d83]') : '', title: 'Dedicated BD Support', desc: 'Friendly customer service available via call and WhatsApp 24/7.' }
        ].map(pillar => `
          <div class="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-subtle text-left">
            <div class="w-12 h-12 rounded-lg bg-[#eefbfc] flex items-center justify-center mb-4">
              ${pillar.icon}
            </div>
            <h4 class="font-semibold text-[#17212B] text-base mb-1.5 tracking-[-0.01em]">${pillar.title}</h4>
            <p class="text-xs font-normal text-[#667085] leading-relaxed">${pillar.desc}</p>
          </div>
        `).join('')}
      </div>
    </section>

  </div>
  `;
};
