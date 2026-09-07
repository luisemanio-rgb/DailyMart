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
    <div class="category-card bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#E2E8E4] rounded-2xl shadow-xs overflow-hidden cursor-pointer transition-all hover:scale-102" onclick="window.Router.navigate('/category/${category.slug}')">
      <div class="overflow-hidden ${imgSizes[size]} bg-white">
        <img
          src="${category.image}"
          alt="${category.name}"
          class="cat-img w-full h-full object-cover"
          onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=60';this.classList.add('fallback')"
          loading="lazy"
        />
      </div>
      <div class="${sizes[size]} text-center">
        <div class="flex items-center justify-center gap-1.5 mb-1">
          <span class="text-base sm:text-lg">${category.icon}</span>
          <span class="font-bold text-[#166534] text-sm">${category.name}</span>
        </div>
        ${size !== 'sm' ? `<p class="text-[11px] text-[#64748B] font-medium">${category.productCount}+ Products</p>` : ''}
      </div>
    </div>
    `;
  },

  renderSmall: (category) => {
    return `
    <div class="category-card flex items-center gap-3 bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#E2E8E4] rounded-xl p-3 shadow-xs cursor-pointer transition-colors" onclick="window.Router.navigate('/category/${category.slug}')">
      <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-[#E2E8E4]">
        <img src="${category.image}" alt="${category.name}" class="cat-img w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=60'" loading="lazy" />
      </div>
      <div>
        <div class="font-bold text-[#166534] text-sm">${category.name}</div>
        <div class="text-xs text-[#64748B]">${category.productCount}+ items</div>
      </div>
      <svg class="ml-auto w-4 h-4 text-[#166534]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    </div>
    `;
  },
};
