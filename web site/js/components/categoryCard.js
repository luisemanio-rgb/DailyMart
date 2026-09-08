// DailyMart BD — Production Category Card Component
window.CategoryCard = {
  render: (category, size = 'md') => {
    const imgHeights = {
      sm: 'h-24',
      md: 'h-28 sm:h-32',
      lg: 'h-36 sm:h-40',
    };

    return `
    <div 
      class="category-card bg-white rounded-xl border border-[#E5E7EB] hover:border-[#087F5B]/40 hover:shadow-card-hover transition-all duration-200 overflow-hidden cursor-pointer flex flex-col group" 
      onclick="window.Router.navigate('/category/${category.slug}')"
    >
      <div class="overflow-hidden ${imgHeights[size]} bg-[#F8FAF9] relative">
        <img
          src="${category.image}"
          alt="${category.name}"
          class="cat-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=60';this.classList.add('fallback')"
          loading="lazy"
        />
      </div>
      <div class="p-3 text-center flex-1 flex flex-col justify-center">
        <h3 class="font-semibold text-[#17212B] group-hover:text-[#087F5B] text-sm sm:text-base leading-snug transition-colors">
          ${category.name}
        </h3>
        ${category.productCount ? `
          <p class="text-[12px] text-[#667085] mt-0.5">${category.productCount}+ items</p>
        ` : ''}
      </div>
    </div>
    `;
  },

  renderSmall: (category) => {
    return `
    <div 
      class="category-card flex items-center gap-3 bg-white rounded-xl p-2.5 border border-[#E5E7EB] hover:border-[#087F5B]/30 hover:bg-[#F8FAF9] transition-all cursor-pointer group" 
      onclick="window.Router.navigate('/category/${category.slug}')"
    >
      <div class="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-[#F8FAF9] border border-[#E5E7EB]">
        <img 
          src="${category.image}" 
          alt="${category.name}" 
          class="cat-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-250" 
          onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=60'" 
          loading="lazy" 
        />
      </div>
      <div class="min-w-0 flex-1">
        <div class="font-semibold text-[#17212B] text-xs sm:text-sm truncate group-hover:text-[#087F5B] transition-colors">${category.name}</div>
        <div class="text-[11px] text-[#667085]">${category.productCount || 20}+ items</div>
      </div>
      <span class="text-[#667085] group-hover:text-[#087F5B] group-hover:translate-x-0.5 transition-all mr-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </span>
    </div>
    `;
  },
};
