// DailyMart BD — 404 Not Found Page
window.Pages = window.Pages || {};
window.Pages.notFound = () => {
  const content = document.getElementById('page-content');
  content.innerHTML = `
  <div class="page-enter max-w-7xl mx-auto px-4 py-24 text-center">
    <div class="text-8xl mb-6">🛒</div>
    <h1 class="text-4xl font-black text-gray-800 mb-3">Page Not Found</h1>
    <p class="text-gray-400 text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>
    <div class="flex flex-wrap gap-4 justify-center">
      <button onclick="window.Router.navigate('/')" class="bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-700 transition-colors">
        Back to Home
      </button>
      <button onclick="window.Router.navigate('/categories')" class="bg-white border border-gray-200 text-gray-700 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
        Browse Categories
      </button>
    </div>
    <div class="mt-12">
      <p class="text-sm text-gray-400 mb-4">Popular categories:</p>
      <div class="flex flex-wrap gap-3 justify-center">
        ${window.CATEGORIES.slice(0, 6).map(c =>
          `<button onclick="window.Router.navigate('/category/${c.slug}')" class="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors">${c.icon} ${c.name}</button>`
        ).join('')}
      </div>
    </div>
  </div>
  `;
};
