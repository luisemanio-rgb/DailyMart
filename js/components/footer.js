// DailyMart BD — Footer Component
window.Footer = {
  render: () => {
    const root = document.getElementById('footer-root');
    if (!root) return;
    root.innerHTML = `
    <footer class="bg-[#17212B] text-[#94A3B8] pt-14 pb-10 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Top grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          <!-- Brand column -->
          <div class="col-span-2 md:col-span-1">
            <a href="#/" class="flex items-center gap-2.5 mb-4">
              <div class="w-9 h-9 rounded-lg bg-[#087F5B] flex items-center justify-center text-white shadow-xs">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <div class="flex items-center">
                <span class="text-xl font-extrabold text-white tracking-tight">DailyMart</span>
                <span class="ml-1 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#FF7A18] text-white rounded">BD</span>
              </div>
            </a>
            <p class="text-xs sm:text-sm text-gray-400 mb-5 leading-relaxed">
              Bangladesh's trusted online grocery delivery platform. Sourcing farm-fresh produce and daily household essentials straight to your home.
            </p>
            <div class="flex gap-2.5">
              ${[
                { name: 'facebook', icon: '<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>' },
                { name: 'instagram', icon: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2"/>' },
                { name: 'twitter', icon: '<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>' },
                { name: 'youtube', icon: '<path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.95 29 29 0 00.46-5.25 29 29 0 00-.46-5.38z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>' }
              ].map(p => `
                <a href="#" aria-label="${p.name}" class="w-8 h-8 bg-gray-800/90 hover:bg-[#087F5B] text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">${p.icon}</svg>
                </a>
              `).join('')}
            </div>
          </div>

          <!-- Customer Service -->
          <div>
            <h4 class="text-white font-semibold mb-4 text-xs sm:text-sm tracking-wide uppercase">Customer Care</h4>
            <ul class="space-y-2.5">
              ${[
                { label: 'Help Center & FAQ', path: '/faq' },
                { label: 'Delivery Schedule', path: '/delivery-info' },
                { label: 'Track Order', path: '/account' },
                { label: 'Returns & Refunds', path: '/returns' },
                { label: 'Contact Support', path: '/contact' },
              ].map(({ label, path }) => `
                <li><a href="#${path}" class="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">${label}</a></li>
              `).join('')}
            </ul>
          </div>

          <!-- Company -->
          <div>
            <h4 class="text-white font-semibold mb-4 text-xs sm:text-sm tracking-wide uppercase">About Us</h4>
            <ul class="space-y-2.5">
              ${[
                { label: 'Our Story', path: '/about' },
                { label: 'Quality Guarantee', path: '/about' },
                { label: 'Careers', path: '/careers' },
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms of Service', path: '/terms' },
              ].map(({ label, path }) => `
                <li><a href="#${path}" class="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">${label}</a></li>
              `).join('')}
            </ul>
          </div>

          <!-- Categories (No emojis) -->
          <div>
            <h4 class="text-white font-semibold mb-4 text-xs sm:text-sm tracking-wide uppercase">Categories</h4>
            <ul class="space-y-2.5">
              ${[
                { label: 'Vegetables', path: '/category/vegetables' },
                { label: 'Fresh Fruits', path: '/category/fruits' },
                { label: 'Fish & Seafood', path: '/category/fish' },
                { label: 'Meat & Poultry', path: '/category/meat' },
                { label: 'Grocery Essentials', path: '/category/grocery' },
                { label: 'Household & Cleaning', path: '/category/household' },
                { label: 'Personal Care', path: '/category/personal-care' },
                { label: 'Baby Products', path: '/category/baby' },
              ].map(({ label, path }) => `
                <li><a href="#${path}" class="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">${label}</a></li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Contact & Payment -->
        <div class="border-t border-gray-800/80 pt-8 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Contact info -->
            <div>
              <h4 class="text-white font-semibold mb-3 text-xs sm:text-sm">Direct Hotline</h4>
              <div class="space-y-2.5">
                <div class="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                  <svg class="w-4 h-4 text-[#087F5B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <span>+880 1700-000000 (Available 24/7)</span>
                </div>
                <div class="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                  <svg class="w-4 h-4 text-[#087F5B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span>support@dailymartbd.com</span>
                </div>
                <div class="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                  <svg class="w-4 h-4 text-[#087F5B] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span>House 45, Road 11, Banani, Dhaka-1213</span>
                </div>
              </div>
            </div>

            <!-- Payment methods -->
            <div>
              <h4 class="text-white font-semibold mb-3 text-xs sm:text-sm">Accepted Payment Methods</h4>
              <div class="flex flex-wrap gap-2">
                ${[
                  { text: 'bKash', color: 'bg-[#D12053]' },
                  { text: 'Nagad', color: 'bg-[#E35925]' },
                  { text: 'Rocket', color: 'bg-[#8A2387]' },
                  { text: 'Cash on Delivery', color: 'bg-[#087F5B]' },
                  { text: 'Visa Card', color: 'bg-[#1A1F71]' },
                  { text: 'Mastercard', color: 'bg-[#EB001B]' },
                ].map(p => `
                  <span class="px-2.5 py-1 ${p.color} text-white text-[11px] font-bold rounded-md">${p.text}</span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-gray-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-gray-500">© 2025 DailyMart BD. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#/privacy" class="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#/terms" class="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#/contact" class="text-xs text-gray-500 hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- WhatsApp Float -->
    <a href="https://wa.me/8801700000000" target="_blank" class="whatsapp-float shadow-lg" title="Chat on WhatsApp">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
    `;
  }
};
