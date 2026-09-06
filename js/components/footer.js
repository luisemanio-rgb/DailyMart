// DailyMart BD — Footer Component
window.Footer = {
  render: () => {
    const root = document.getElementById('footer-root');
    if (!root) return;
    root.innerHTML = `
    <footer class="bg-gray-900 text-gray-300 pt-14 pb-8">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Top grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          <!-- Brand column -->
          <div class="col-span-2 md:col-span-1">
            <a href="#/" class="flex items-center gap-2.5 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <span class="text-white font-black text-xl">D</span>
              </div>
              <div>
                <div class="font-black text-white text-xl">DailyMart <span class="text-emerald-400">BD</span></div>
                <div class="text-xs text-gray-500">Fresh. Fair. Daily.</div>
              </div>
            </a>
            <p class="text-sm text-gray-400 mb-4 leading-relaxed">Fresh products delivered daily to your doorstep. Serving families across Bangladesh with quality and care.</p>
            <div class="flex gap-3">
              ${['facebook', 'instagram', 'twitter', 'youtube'].map(platform => `
                <a href="#" aria-label="${platform}" class="w-8 h-8 bg-gray-800 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    ${platform === 'facebook' ? '<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>' : ''}
                    ${platform === 'instagram' ? '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2"/>' : ''}
                    ${platform === 'twitter' ? '<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>' : ''}
                    ${platform === 'youtube' ? '<path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.95 29 29 0 00.46-5.25 29 29 0 00-.46-5.38z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>' : ''}
                  </svg>
                </a>
              `).join('')}
            </div>
          </div>

          <!-- Customer Service -->
          <div>
            <h4 class="text-white font-semibold mb-4 text-sm">Customer Service</h4>
            <ul class="space-y-2.5">
              ${[
                { label: 'Contact Us', path: '/contact' },
                { label: 'FAQ', path: '/faq' },
                { label: 'Delivery Information', path: '/delivery-info' },
                { label: 'Return Policy', path: '/returns' },
                { label: 'Track Order', path: '/account' },
              ].map(({ label, path }) => `
                <li><a href="#${path}" class="text-sm text-gray-400 hover:text-emerald-400 transition-colors">${label}</a></li>
              `).join('')}
            </ul>
          </div>

          <!-- Company -->
          <div>
            <h4 class="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul class="space-y-2.5">
              ${[
                { label: 'About Us', path: '/about' },
                { label: 'Careers', path: '/careers' },
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms & Conditions', path: '/terms' },
                { label: 'Become a Seller', path: '/seller' },
              ].map(({ label, path }) => `
                <li><a href="#${path}" class="text-sm text-gray-400 hover:text-emerald-400 transition-colors">${label}</a></li>
              `).join('')}
            </ul>
          </div>

          <!-- Categories -->
          <div>
            <h4 class="text-white font-semibold mb-4 text-sm">Categories</h4>
            <ul class="space-y-2.5">
              ${[
                { label: '🥦 Vegetables', path: '/category/vegetables' },
                { label: '🍎 Fruits', path: '/category/fruits' },
                { label: '🐟 Fish', path: '/category/fish' },
                { label: '🥩 Meat', path: '/category/meat' },
                { label: '🛒 Grocery', path: '/category/grocery' },
                { label: '🏠 Household', path: '/category/household' },
                { label: '🧴 Personal Care', path: '/category/personal-care' },
                { label: '👶 Baby Products', path: '/category/baby' },
              ].map(({ label, path }) => `
                <li><a href="#${path}" class="text-sm text-gray-400 hover:text-emerald-400 transition-colors">${label}</a></li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Contact & Payment -->
        <div class="border-t border-gray-800 pt-8 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Contact info -->
            <div>
              <h4 class="text-white font-semibold mb-4 text-sm">Contact Information</h4>
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <svg class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <span class="text-sm text-gray-400">+880 1700-000000 (24/7 Support)</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span class="text-sm text-gray-400">support@dailymartbd.com</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span class="text-sm text-gray-400">House 45, Road 11, Banani, Dhaka-1213, Bangladesh</span>
                </div>
              </div>
            </div>
            <!-- Payment methods -->
            <div>
              <h4 class="text-white font-semibold mb-4 text-sm">We Accept</h4>
              <div class="flex flex-wrap gap-2">
                ${[
                  { name: 'bKash', color: 'bg-pink-600', text: 'bKash' },
                  { name: 'Nagad', color: 'bg-orange-500', text: 'Nagad' },
                  { name: 'Rocket', color: 'bg-purple-600', text: 'Rocket' },
                  { name: 'Cash on Delivery', color: 'bg-emerald-600', text: 'COD' },
                  { name: 'Visa', color: 'bg-blue-700', text: 'VISA' },
                  { name: 'MasterCard', color: 'bg-red-600', text: 'MCard' },
                ].map(p => `
                  <span class="px-3 py-1.5 ${p.color} text-white text-xs font-bold rounded-lg">${p.text}</span>
                `).join('')}
              </div>
              <div class="mt-4">
                <h5 class="text-white text-xs font-semibold mb-2">Download App (Coming Soon)</h5>
                <div class="flex gap-2">
                  <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition-colors">
                    <span class="text-xl">🤖</span><div><div class="text-[9px] text-gray-400">Get it on</div><div class="text-xs text-white font-semibold">Google Play</div></div>
                  </div>
                  <div class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition-colors">
                    <span class="text-xl">🍎</span><div><div class="text-[9px] text-gray-400">Download on the</div><div class="text-xs text-white font-semibold">App Store</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-gray-500">© 2024 DailyMart BD. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#/privacy" class="text-xs text-gray-500 hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#/terms" class="text-xs text-gray-500 hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="#/contact" class="text-xs text-gray-500 hover:text-emerald-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- WhatsApp Float -->
    <a href="https://wa.me/8801700000000" target="_blank" class="whatsapp-float" title="Chat on WhatsApp">
      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
    `;
  }
};
