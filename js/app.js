// DailyMart BD - App Bootstrap
window.Pages = window.Pages || {};

// Boot the application
(function() {
  'use strict';

  // Initialize layout components
  if (window.Header && window.Header.render) window.Header.render();
  if (window.Footer && window.Footer.render) window.Footer.render();
  if (window.MobileNav && window.MobileNav.render) window.MobileNav.render();
  if (window.CartDrawer && window.CartDrawer.render) window.CartDrawer.render();

  // Define routes
  window.Router.define('/', function(p) {
    window.Pages.home(p);
  });

  window.Router.define('/categories', function() {
    const content = document.getElementById('page-content');
    const catsHtml = window.CATEGORIES.map(function(cat) {
      return window.CategoryCard.render(cat);
    }).join('');
    content.innerHTML = '<div class="page-enter max-w-7xl mx-auto px-4 py-8 pb-24 sm:pb-12">' +
      '<nav class="flex items-center text-xs text-[#667085] mb-4 gap-1.5">' +
      '<a href="#/" class="hover:text-[#087F5B]">Home</a><span>/</span><span class="text-[#17212B] font-medium">All Categories</span>' +
      '</nav>' +
      '<div class="mb-6 pb-3 border-b border-[#E5E7EB]">' +
      '<h1 class="text-xl sm:text-2xl font-bold text-[#17212B]">Shop by Category</h1>' +
      '<p class="text-xs sm:text-sm text-[#667085] mt-0.5">Explore our wide selection of fresh produce, meats, and daily essentials</p>' +
      '</div>' +
      '<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">' +
      catsHtml +
      '</div></div>';
  });

  window.Router.define('/deals', function() {
    const content = document.getElementById('page-content');
    const deals = window.getDealsProducts();
    let dealsHtml = deals.map(function(d) {
      return window.ProductCard.render(d);
    }).join('');
    content.innerHTML = '<div class="page-enter max-w-7xl mx-auto px-4 py-8 pb-24 sm:pb-12">' +
      '<nav class="flex items-center text-xs text-[#667085] mb-4 gap-1.5">' +
      '<a href="#/" class="hover:text-[#087F5B]">Home</a><span>/</span><span class="text-[#17212B] font-medium">Today Deals</span>' +
      '</nav>' +
      '<div class="mb-6 pb-3 border-b border-[#E5E7EB] flex items-center justify-between">' +
      '<div>' +
      '<h1 class="text-xl sm:text-2xl font-bold text-[#17212B]">Today\'s Special Deals</h1>' +
      '<p class="text-xs sm:text-sm text-[#667085] mt-0.5">Special discounted prices on daily groceries and essentials</p>' +
      '</div>' +
      '<span class="text-xs font-semibold text-[#E5484D] bg-red-50 px-3 py-1 rounded-md border border-red-100 hidden sm:block">' + deals.length + ' Deals Active</span>' +
      '</div>' +
      '<div class="product-grid grid-4">' + dealsHtml + '</div></div>';
  });

  window.Router.define('/fresh', function() {
    const content = document.getElementById('page-content');
    const fresh = window.PRODUCTS.filter(function(p) {
      return ['vegetables', 'fruits', 'fish', 'meat', 'dairy'].indexOf(p.category) !== -1;
    });
    let freshHtml = fresh.map(function(p) {
      return window.ProductCard.render(p);
    }).join('');
    content.innerHTML = '<div class="page-enter max-w-7xl mx-auto px-4 py-8 pb-24 sm:pb-12">' +
      '<nav class="flex items-center text-xs text-[#667085] mb-4 gap-1.5">' +
      '<a href="#/" class="hover:text-[#087F5B]">Home</a><span>/</span><span class="text-[#17212B] font-medium">Fresh Produce</span>' +
      '</nav>' +
      '<div class="mb-6 pb-3 border-b border-[#E5E7EB]">' +
      '<h1 class="text-xl sm:text-2xl font-bold text-[#17212B]">Fresh Market Produce</h1>' +
      '<p class="text-xs sm:text-sm text-[#667085] mt-0.5">Farm-fresh vegetables, seasonal fruits, fish, and quality meats</p>' +
      '</div>' +
      '<div class="product-grid grid-4">' + freshHtml + '</div></div>';
  });

  window.Router.define('/category/:slug', function(p) {
    window.Pages.category(p);
  });

  window.Router.define('/category/:slug/:subslug', function(p) {
    window.Pages.subcategory(p);
  });

  window.Router.define('/product/:slug', function(p) {
    window.Pages.productDetail(p);
  });

  window.Router.define('/cart', function() {
    window.Pages.cart();
  });

  window.Router.define('/checkout', function() {
    window.Pages.checkout();
  });

  window.Router.define('/order-confirmation/:orderId', function(p) {
    window.Pages.orderConfirmation(p);
  });

  window.Router.define('/search', function() {
    window.Pages.search();
  });

  window.Router.define('/wishlist', function() {
    window.Pages.wishlist();
  });

  window.Router.define('/account', function() {
    window.Pages.account();
  });

  window.Router.define('/login', function() {
    window.Pages.login();
  });

  window.Router.define('/signup', function() {
    window.Pages.signup();
  });

  window.Router.define('/admin', function() {
    window.Pages.admin();
  });

  window.Router.define('/contact', function() {
    const content = document.getElementById('page-content');
    content.innerHTML = '<div class="page-enter max-w-3xl mx-auto px-4 py-12 pb-24 sm:pb-12 text-center">' +
      '<h1 class="text-2xl sm:text-3xl font-bold text-[#17212B] mb-2">Customer Support</h1>' +
      '<p class="text-[#667085] text-sm mb-8">We are here to assist with your orders, deliveries, and queries.</p>' +
      '<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">' +
      '<div class="bg-white rounded-xl border border-[#E5E7EB] p-6 text-center">' +
      '<div class="w-10 h-10 rounded-lg bg-[#E8F7F1] text-[#087F5B] flex items-center justify-center mx-auto mb-3">' +
      (window.Icons ? window.Icons.render('phone', 'w-5 h-5') : '') +
      '</div>' +
      '<div class="font-bold text-[#17212B] text-sm mb-1">Helpline</div>' +
      '<div class="text-xs font-semibold text-[#087F5B]">+880 1700-000000</div>' +
      '<div class="text-[11px] text-[#667085] mt-1">24/7 Hotline</div>' +
      '</div>' +
      '<div class="bg-white rounded-xl border border-[#E5E7EB] p-6 text-center">' +
      '<div class="w-10 h-10 rounded-lg bg-[#E8F7F1] text-[#087F5B] flex items-center justify-center mx-auto mb-3">' +
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>' +
      '</div>' +
      '<div class="font-bold text-[#17212B] text-sm mb-1">Email</div>' +
      '<div class="text-xs font-semibold text-[#087F5B]">support@dailymartbd.com</div>' +
      '<div class="text-[11px] text-[#667085] mt-1">Quick responses</div>' +
      '</div>' +
      '<div class="bg-white rounded-xl border border-[#E5E7EB] p-6 text-center">' +
      '<div class="w-10 h-10 rounded-lg bg-[#E8F7F1] text-[#087F5B] flex items-center justify-center mx-auto mb-3">' +
      '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
      '</div>' +
      '<div class="font-bold text-[#17212B] text-sm mb-1">WhatsApp</div>' +
      '<div class="text-xs font-semibold text-[#087F5B]">+880 1700-000000</div>' +
      '<div class="text-[11px] text-[#667085] mt-1">Instant chat</div>' +
      '</div></div></div>';
  });

  window.Router.define('/about', function() {
    const content = document.getElementById('page-content');
    content.innerHTML = '<div class="page-enter max-w-4xl mx-auto px-4 py-12 pb-24 sm:pb-12">' +
      '<div class="text-center mb-8">' +
      '<h1 class="text-2xl sm:text-3xl font-bold text-[#17212B] mb-2">About DailyMart BD</h1>' +
      '<p class="text-[#667085] text-sm max-w-xl mx-auto">Fresh Products · Fair Prices · Guaranteed Quality · Delivered Daily</p>' +
      '</div>' +
      '<div class="bg-white rounded-xl p-8 border border-[#E5E7EB] space-y-4 text-xs sm:text-sm text-[#667085] leading-relaxed">' +
      '<p>DailyMart BD is Bangladesh\'s premier online grocery platform, dedicated to bringing farm-fresh vegetables, fruits, fish, meat, and everyday pantry essentials straight to your home.</p>' +
      '<p>We work directly with certified farmers and trusted local producers to ensure zero middlemen inflation and unmatched freshness for every single family we serve.</p>' +
      '</div></div>';
  });

  window.Router.define('/faq', function() {
    const content = document.getElementById('page-content');
    content.innerHTML = '<div class="page-enter max-w-3xl mx-auto px-4 py-12 pb-24 sm:pb-12">' +
      '<div class="text-center mb-8">' +
      '<h1 class="text-2xl sm:text-3xl font-bold text-[#17212B] mb-2">Frequently Asked Questions</h1>' +
      '<p class="text-xs sm:text-sm text-[#667085]">Everything you need to know about our service and orders</p>' +
      '</div>' +
      '<div class="space-y-3">' +
      '<div class="bg-white rounded-xl p-5 border border-[#E5E7EB]">' +
      '<h3 class="font-bold text-[#17212B] text-sm mb-1.5">How fast is delivery?</h3>' +
      '<p class="text-[#667085] text-xs sm:text-sm leading-relaxed">Standard delivery takes 1-2 business days. Express same-day delivery is available in Dhaka, Gazipur, and Narayanganj for orders placed before 12 PM.</p>' +
      '</div>' +
      '<div class="bg-white rounded-xl p-5 border border-[#E5E7EB]">' +
      '<h3 class="font-bold text-[#17212B] text-sm mb-1.5">What are the delivery charges?</h3>' +
      '<p class="text-[#667085] text-xs sm:text-sm leading-relaxed">Standard delivery is ৳60 flat. Orders over ৳1,000 enjoy 100% free delivery across all supported districts.</p>' +
      '</div>' +
      '<div class="bg-white rounded-xl p-5 border border-[#E5E7EB]">' +
      '<h3 class="font-bold text-[#17212B] text-sm mb-1.5">What payment methods do you accept?</h3>' +
      '<p class="text-[#667085] text-xs sm:text-sm leading-relaxed">We support Cash on Delivery (COD), bKash, Nagad, Rocket, and Visa/MasterCard debit and credit cards.</p>' +
      '</div>' +
      '<div class="bg-white rounded-xl p-5 border border-[#E5E7EB]">' +
      '<h3 class="font-bold text-[#17212B] text-sm mb-1.5">What is the return policy for perishables?</h3>' +
      '<p class="text-[#667085] text-xs sm:text-sm leading-relaxed">You can inspect products right at your doorstep. If any item is damaged or not fresh, we offer immediate replacement or a full refund.</p>' +
      '</div></div></div>';
  });

  // Fallback
  window.Router.define('*', function(p) {
    window.Pages.notFound(p);
  });

  // Render current route immediately
  window.Router.init();

  console.log('DailyMart BD initialized successfully');
})();
