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
    let catsHtml = '';
    for (let i = 0; i < window.CATEGORIES.length; i++) {
      const cat = window.CATEGORIES[i];
      catsHtml += '<div class="category-card bg-white rounded-2xl shadow-card overflow-hidden cursor-pointer" onclick="window.Router.navigate(\'/category/' + cat.slug + '\')">' +
        '<div class="overflow-hidden h-32">' +
        '<img src="' + cat.image + '" alt="' + cat.name + '" class="cat-img w-full h-full object-cover" onerror="this.src=\'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=60\'" loading="lazy" />' +
        '</div>' +
        '<div class="p-4">' +
        '<div class="flex items-center gap-2 mb-1">' +
        '<span class="text-xl">' + cat.icon + '</span>' +
        '<span class="font-bold text-gray-800 text-sm">' + cat.name + '</span>' +
        '</div>' +
        '<p class="text-xs text-gray-400 mb-2 line-clamp-2">' + cat.description + '</p>' +
        '<span class="text-xs text-emerald-600 font-medium">' + cat.productCount + '+ Products</span>' +
        '</div>' +
        '</div>';
    }
    content.innerHTML = '<div class="page-enter max-w-7xl mx-auto px-4 py-10">' +
      '<nav class="flex items-center text-sm text-gray-500 mb-6">' +
      '<a href="#/" class="hover:text-emerald-600">Home</a><span class="mx-2">&#8250;</span><span class="text-gray-800 font-medium">All Categories</span>' +
      '</nav>' +
      '<div class="mb-8">' +
      '<h1 class="text-3xl font-black text-gray-900 section-header">All Categories</h1>' +
      '<p class="text-gray-500 mt-2">Browse all product categories available on DailyMart BD</p>' +
      '</div>' +
      '<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">' +
      catsHtml +
      '</div></div>';
  });

  window.Router.define('/deals', function() {
    const content = document.getElementById('page-content');
    const deals = window.getDealsProducts();
    let dealsHtml = '';
    for (let i = 0; i < deals.length; i++) {
      dealsHtml += window.ProductCard.render(deals[i]);
    }
    content.innerHTML = '<div class="page-enter max-w-7xl mx-auto px-4 py-10">' +
      '<nav class="flex items-center text-sm text-gray-500 mb-6">' +
      '<a href="#/" class="hover:text-emerald-600">Home</a><span class="mx-2">&#8250;</span><span class="text-gray-800 font-medium">Today Deals</span>' +
      '</nav>' +
      '<div class="mb-8 text-center">' +
      '<div class="text-5xl mb-3">&#128293;</div>' +
      '<h1 class="text-3xl font-black text-gray-900">Today Best Deals</h1>' +
      '<p class="text-gray-500 mt-2">Exclusive discounts for a limited time</p>' +
      '</div>' +
      '<div class="product-grid grid-4">' + dealsHtml + '</div></div>';
  });

  window.Router.define('/fresh', function() {
    const content = document.getElementById('page-content');
    const fresh = window.PRODUCTS.filter(function(p) {
      return ['vegetables', 'fruits', 'fish', 'meat', 'dairy'].indexOf(p.category) !== -1;
    });
    let freshHtml = '';
    for (let i = 0; i < fresh.length; i++) {
      freshHtml += window.ProductCard.render(fresh[i]);
    }
    content.innerHTML = '<div class="page-enter max-w-7xl mx-auto px-4 py-10">' +
      '<div class="mb-8 text-center">' +
      '<div class="text-5xl mb-3">&#127807;</div>' +
      '<h1 class="text-3xl font-black text-gray-900">Fresh Food</h1>' +
      '<p class="text-gray-500 mt-2">Vegetables, fruits, fish, meat and dairy - all fresh, all daily</p>' +
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
    content.innerHTML = '<div class="page-enter max-w-3xl mx-auto px-4 py-16 text-center">' +
      '<div class="text-6xl mb-4">&#128222;</div>' +
      '<h1 class="text-3xl font-black text-gray-900 mb-4">Contact Us</h1>' +
      '<p class="text-gray-500 mb-8">We are here to help! Reach out through any of the following channels.</p>' +
      '<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">' +
      '<div class="bg-white rounded-2xl shadow-card p-6 text-center hover-lift">' +
      '<div class="text-4xl mb-3">&#128222;</div>' +
      '<div class="font-bold text-gray-800 mb-1">Phone</div>' +
      '<div class="text-sm text-emerald-600 font-medium">+880 1700-000000</div>' +
      '<div class="text-xs text-gray-400 mt-1">24/7 Support</div>' +
      '</div>' +
      '<div class="bg-white rounded-2xl shadow-card p-6 text-center hover-lift">' +
      '<div class="text-4xl mb-3">&#9993;</div>' +
      '<div class="font-bold text-gray-800 mb-1">Email</div>' +
      '<div class="text-sm text-emerald-600 font-medium">support@dailymartbd.com</div>' +
      '<div class="text-xs text-gray-400 mt-1">Reply within 2 hours</div>' +
      '</div>' +
      '<div class="bg-white rounded-2xl shadow-card p-6 text-center hover-lift">' +
      '<div class="text-4xl mb-3">&#128172;</div>' +
      '<div class="font-bold text-gray-800 mb-1">WhatsApp</div>' +
      '<div class="text-sm text-emerald-600 font-medium">+880 1700-000000</div>' +
      '<div class="text-xs text-gray-400 mt-1">Chat instantly</div>' +
      '</div></div></div>';
  });

  window.Router.define('/about', function() {
    const content = document.getElementById('page-content');
    content.innerHTML = '<div class="page-enter max-w-4xl mx-auto px-4 py-16">' +
      '<div class="text-center mb-10">' +
      '<div class="text-5xl mb-3">&#127978;</div>' +
      '<h1 class="text-3xl font-black text-gray-900 mb-3">About DailyMart BD</h1>' +
      '<p class="text-gray-600 text-lg max-w-2xl mx-auto">Fresh Products. Fair Prices. Delivered Daily.</p>' +
      '</div>' +
      '<div class="bg-white rounded-2xl p-8 shadow-card space-y-6 text-gray-700 leading-relaxed">' +
      '<p>DailyMart BD is Bangladesh premier online grocery marketplace, dedicated to bringing fresh vegetables, fruits, fish, meat, dairy, and household essentials directly from local farms and trusted suppliers to your doorstep.</p>' +
      '<p>Our mission is simple: provide genuine quality, transparent fair pricing, and reliable delivery across all 64 districts of Bangladesh.</p>' +
      '</div></div>';
  });

  window.Router.define('/faq', function() {
    const content = document.getElementById('page-content');
    content.innerHTML = '<div class="page-enter max-w-3xl mx-auto px-4 py-16">' +
      '<div class="text-center mb-10">' +
      '<div class="text-5xl mb-3">&#10067;</div>' +
      '<h1 class="text-3xl font-black text-gray-900 mb-3">Frequently Asked Questions</h1>' +
      '</div>' +
      '<div class="space-y-4">' +
      '<div class="bg-white rounded-2xl p-6 shadow-card">' +
      '<h3 class="font-bold text-gray-800 mb-2">How fast is delivery?</h3>' +
      '<p class="text-gray-600 text-sm leading-relaxed">Standard delivery takes 1-2 business days. Express same-day delivery is available in Dhaka, Gazipur, and Narayanganj for orders placed before 12 PM.</p>' +
      '</div>' +
      '<div class="bg-white rounded-2xl p-6 shadow-card">' +
      '<h3 class="font-bold text-gray-800 mb-2">What are the delivery charges?</h3>' +
      '<p class="text-gray-600 text-sm leading-relaxed">Standard delivery is 60 Taka. Delivery is completely FREE for orders over 1000 Taka.</p>' +
      '</div>' +
      '<div class="bg-white rounded-2xl p-6 shadow-card">' +
      '<h3 class="font-bold text-gray-800 mb-2">What payment methods do you accept?</h3>' +
      '<p class="text-gray-600 text-sm leading-relaxed">We accept Cash on Delivery (COD), bKash, Nagad, and major Visa/MasterCard debit/credit cards.</p>' +
      '</div>' +
      '<div class="bg-white rounded-2xl p-6 shadow-card">' +
      '<h3 class="font-bold text-gray-800 mb-2">What if a product is not fresh?</h3>' +
      '<p class="text-gray-600 text-sm leading-relaxed">We have a 24-hour return and replacement guarantee on all perishable items.</p>' +
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
