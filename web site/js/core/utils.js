// DailyMart BD — Utilities
window.Utils = {
  // Format currency with ৳
  formatPrice: (price) => `৳${price.toLocaleString('en-IN')}`,

  // Format date
  formatDate: (dateStr) => new Date(dateStr).toLocaleDateString('en-BD', { year: 'numeric', month: 'long', day: 'numeric' }),

  // Calculate discount percentage
  discountPercent: (price, oldPrice) => oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0,

  // Generate star HTML
  stars: (rating, size = 'sm') => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    const s = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';
    let html = `<span class="${s} inline-flex gap-0.5">`;
    for (let i = 0; i < full; i++) html += '<span class="star-filled">★</span>';
    if (half) html += '<span class="star-filled">★</span>';
    for (let i = 0; i < empty; i++) html += '<span class="star-empty">★</span>';
    html += '</span>';
    return html;
  },

  // Skeleton loader
  skeleton: (lines = 3, heights = []) => {
    return Array.from({ length: lines }, (_, i) =>
      `<div class="skeleton ${heights[i] || 'h-4'} mb-2 ${i === lines-1 ? 'w-3/4' : 'w-full'}"></div>`
    ).join('');
  },

  // Slugify
  slugify: (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),

  // Truncate text
  truncate: (str, len = 80) => str.length > len ? str.slice(0, len) + '…' : str,

  // Debounce
  debounce: (fn, ms = 300) => {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
  },

  // Handle img error
  imgFallback: (el, fallback = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=60') => {
    el.onerror = () => { el.src = fallback; el.classList.add('fallback'); };
  },

  // Render badge
  badge: (text, color = 'green') => {
    const colors = { green: 'bg-green-100 text-green-700', red: 'bg-red-100 text-red-700', yellow: 'bg-yellow-100 text-yellow-700', blue: 'bg-blue-100 text-blue-700', purple: 'bg-purple-100 text-purple-700', gray: 'bg-gray-100 text-gray-600' };
    return `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${colors[color] || colors.green}">${text}</span>`;
  },

  // Check stock
  stockLabel: (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'red', available: false };
    if (stock < 10) return { text: `Only ${stock} left`, color: 'yellow', available: true };
    return { text: 'In Stock', color: 'green', available: true };
  },

  // Navigate to product
  goToProduct: (product) => {
    window.Router.navigate(`/product/${product.slug}`);
  },

  // Navigate to category
  goToCategory: (category) => {
    window.Router.navigate(`/category/${category.slug}`);
  },

  // Scroll to element
  scrollTo: (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  // Click-outside handler
  onClickOutside: (el, callback) => {
    const handler = (e) => {
      if (!el.contains(e.target)) { callback(); document.removeEventListener('click', handler); }
    };
    setTimeout(() => document.addEventListener('click', handler), 0);
  },

  // Image with fallback
  img: (src, alt, cls = '', fallback = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=60') => {
    return `<img src="${src}" alt="${alt}" class="${cls}" onerror="this.src='${fallback}';this.classList.add('fallback')" loading="lazy" />`;
  },

  // Reviews sample data
  sampleReviews: (productId) => {
    const names = ['Rahul Ahmed', 'Fatima Khanam', 'Shafiqul Islam', 'Nusrat Jahan', 'Karim Mia', 'Parvin Sultana', 'Mahmudul Hasan', 'Rashida Begum'];
    const reviews = ['Excellent quality! Fresh and delivered on time.', 'Great product, will order again!', 'Very fresh. Loved the packaging.', 'Good quality, fair price.', 'Highly recommended for daily use.', 'Fast delivery and quality product.', 'Perfect freshness, exactly as described.', 'Best product in this category!'];
    const dates = ['2 days ago', '5 days ago', '1 week ago', '2 weeks ago', '3 weeks ago', '1 month ago'];
    const ratings = [5, 4, 5, 4, 5, 4, 5, 4];
    return Array.from({ length: 5 }, (_, i) => ({
      name: names[i % names.length],
      rating: ratings[i % ratings.length],
      review: reviews[i % reviews.length],
      date: dates[i % dates.length],
    }));
  },

  // Get grade color
  gradeColor: (grade) => {
    if (!grade) return 'gray';
    if (grade === 'A+' || grade === 'Premium') return 'green';
    if (grade === 'A') return 'blue';
    if (grade === 'B') return 'yellow';
    return 'gray';
  },
};
