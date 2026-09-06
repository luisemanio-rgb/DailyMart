// DailyMart BD — Category Card Component
window.CategoryCard = {
  render: (category, size = 'md') => {
    const sizes = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };
    const imgSizes = {
      sm: 'h-20',
      md: 'h-28',
      lg: 'h-36',
    };

    return `
    <div class="category-card bg-white rounded-2xl shadow-card overflow-hidden cursor-pointer" onclick="window.Router.navigate('/category/${category.slug}')">
      <div class="overflow-hidden ${imgSizes[size]}">
        <img
          src="${category.image}"
          alt="${category.name}"
          class="cat-img w-full h-full object-cover"
          onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=60';this.classList.add('fallback')"
          loading="lazy"
        />
      </div>
      <div class="${sizes[size]}">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-lg">${category.icon}</span>
          <span class="font-semibold text-gray-800 text-sm">${category.name}</span>
        </div>
        ${size !== 'sm' ? `<p class="text-xs text-gray-400">${category.productCount}+ Products</p>` : ''}
      </div>
    </div>
    `;
  },

  renderSmall: (category) => {
    return `
    <div class="category-card flex items-center gap-3 bg-white rounded-xl p-3 shadow-card cursor-pointer hover:bg-emerald-50 transition-colors" onclick="window.Router.navigate('/category/${category.slug}')">
      <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
        <img src="${category.image}" alt="${category.name}" class="cat-img w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=60'" loading="lazy" />
      </div>
      <div>
        <div class="font-medium text-gray-800 text-sm">${category.name}</div>
        <div class="text-xs text-gray-400">${category.productCount}+ items</div>
      </div>
      <svg class="ml-auto w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    </div>
    `;
  },
};
