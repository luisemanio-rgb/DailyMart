// DailyMart BD — Authentication Page (Sign In / Sign Up)
window.Pages = window.Pages || {};

window.Pages.auth = (initialMode = 'login') => {
  const content = document.getElementById('page-content');
  let currentMode = initialMode; // 'login' | 'signup'

  // If already logged in, redirect to account
  const currentUser = window.Store.getUser();
  if (currentUser) {
    window.Router.navigate('/account');
    return;
  }

  const render = () => {
    content.innerHTML = `
    <div class="page-enter max-w-xl mx-auto px-4 py-10">
      <!-- Brand Logo & Header -->
      <div class="text-center mb-8">
        <a href="#/" class="inline-flex items-center gap-2 mb-3">
          <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-md">
            <span class="text-white font-black text-2xl">D</span>
          </div>
        </a>
        <h1 class="text-2xl sm:text-3xl font-black text-gray-900">
          ${currentMode === 'login' ? 'Welcome Back to DailyMart BD' : 'Create Your DailyMart BD Account'}
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          ${currentMode === 'login' 
            ? 'Sign in to access your orders, saved addresses, and express checkout' 
            : 'Join thousands of happy customers shopping fresh groceries daily across Bangladesh'}
        </p>
      </div>

      <!-- Auth Card Container -->
      <div class="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        <!-- Tab Switcher -->
        <div class="grid grid-cols-2 border-b border-gray-100 bg-gray-50/50 p-1.5 gap-1.5">
          <button 
            type="button" 
            id="tab-login-btn"
            onclick="window.Pages.authSwitch('login')"
            class="py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${currentMode === 'login' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'}"
          >
            <span>🔑</span> Sign In
          </button>
          <button 
            type="button" 
            id="tab-signup-btn"
            onclick="window.Pages.authSwitch('signup')"
            class="py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${currentMode === 'signup' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'}"
          >
            <span>📝</span> Sign Up
          </button>
        </div>

        <div class="p-6 sm:p-8">
          <!-- Error / Info Notification Box -->
          <div id="auth-alert" class="hidden mb-5 p-3.5 rounded-xl text-sm font-medium flex items-center gap-2"></div>

          ${currentMode === 'login' ? renderLoginForm() : renderSignupForm()}

          <!-- Quick Test Credentials Box -->
          <div class="mt-8 pt-6 border-t border-gray-100 bg-gray-50/80 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 rounded-b-2xl">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase tracking-wider text-gray-400">⚡ Quick Demo Test</span>
              <span class="text-[11px] text-gray-500">1-click login</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onclick="window.Pages.quickAuthFill('customer')" 
                class="py-2 px-3 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 border border-gray-200 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>👤</span> Demo Customer
              </button>
              <button 
                type="button" 
                onclick="window.Pages.quickAuthFill('admin')" 
                class="py-2 px-3 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 border border-gray-200 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>👑</span> Store Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Badges -->
      <div class="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400">
        <span class="flex items-center gap-1">🔒 100% Secure Checkout</span>
        <span class="flex items-center gap-1">🚚 Delivery across BD</span>
        <span class="flex items-center gap-1">📞 24/7 Support</span>
      </div>
    </div>
    `;

    bindFormEvents();
  };

  const renderLoginForm = () => `
    <form id="auth-login-form" class="space-y-4" onsubmit="return false;">
      <div>
        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
          Mobile Number or Email <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </span>
          <input 
            type="text" 
            id="login-identifier" 
            placeholder="01XXXXXXXXX or email@example.com"
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all font-medium"
            required
            autocomplete="username"
          />
        </div>
        <p class="text-[11px] text-gray-400 mt-1">Bangladeshi 11-digit mobile number or registered email</p>
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Password <span class="text-red-500">*</span>
          </label>
          <a href="javascript:void(0)" onclick="alert('You can sign in with Demo Customer or Admin (admin / admin).')" class="text-xs text-emerald-600 hover:text-emerald-700 font-semibold">Forgot Password?</a>
        </div>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </span>
          <input 
            type="password" 
            id="login-password" 
            placeholder="Enter your password"
            class="w-full pl-10 pr-10 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all font-medium"
            required
            autocomplete="current-password"
          />
          <button 
            type="button" 
            onclick="window.Pages.togglePasswordVisibility('login-password', this)" 
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            tabindex="-1"
          >
            👁️
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between pt-1">
        <label class="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" id="remember-me" checked class="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
          <span class="text-xs text-gray-600">Remember me</span>
        </label>
      </div>

      <button 
        type="submit" 
        id="login-submit-btn"
        class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
      >
        <span>Sign In to DailyMart BD</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </button>

      <div class="text-center pt-2 text-xs text-gray-500">
        Don't have an account? 
        <a href="javascript:void(0)" onclick="window.Pages.authSwitch('signup')" class="text-emerald-600 font-bold hover:underline">
          Create Account / Sign Up
        </a>
      </div>
    </form>
  `;

  const renderSignupForm = () => `
    <form id="auth-signup-form" class="space-y-4" onsubmit="return false;">
      <div>
        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
          Full Name <span class="text-red-500">*</span>
        </label>
        <input 
          type="text" 
          id="signup-name" 
          placeholder="e.g. Tanvir Ahmed"
          class="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all font-medium"
          required
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Mobile Number <span class="text-red-500">*</span>
          </label>
          <input 
            type="tel" 
            id="signup-phone" 
            placeholder="01XXXXXXXXX"
            class="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all font-medium"
            required
            maxlength="11"
          />
          <span class="text-[10px] text-gray-400">11 digits (e.g., 01712345678)</span>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Email Address <span class="text-gray-400 font-normal text-[10px]">(Optional)</span>
          </label>
          <input 
            type="email" 
            id="signup-email" 
            placeholder="user@example.com"
            class="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all font-medium"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            District <span class="text-red-500">*</span>
          </label>
          <select 
            id="signup-district" 
            class="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all font-medium"
            required
          >
            ${(window.DISTRICTS || ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh']).map(d => `<option value="${d}" ${d === 'Dhaka' ? 'selected' : ''}>${d}</option>`).join('')}
          </select>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Delivery Area / Thana
          </label>
          <input 
            type="text" 
            id="signup-area" 
            placeholder="e.g. Uttara / Dhanmondi"
            class="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all font-medium"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
          Delivery Address / House No.
        </label>
        <input 
          type="text" 
          id="signup-address" 
          placeholder="House #, Road #, Flat #, Landmark"
          class="w-full px-4 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all font-medium"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Password <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input 
              type="password" 
              id="signup-password" 
              placeholder="At least 6 chars"
              class="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all font-medium"
              required
              minlength="6"
            />
            <button 
              type="button" 
              onclick="window.Pages.togglePasswordVisibility('signup-password', this)" 
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              tabindex="-1"
            >
              👁️
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Confirm Password <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input 
              type="password" 
              id="signup-confirm-password" 
              placeholder="Repeat password"
              class="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition-all font-medium"
              required
              minlength="6"
            />
            <button 
              type="button" 
              onclick="window.Pages.togglePasswordVisibility('signup-confirm-password', this)" 
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              tabindex="-1"
            >
              👁️
            </button>
          </div>
        </div>
      </div>

      <div class="pt-1">
        <label class="flex items-start gap-2 cursor-pointer select-none">
          <input type="checkbox" id="signup-terms" checked required class="w-4 h-4 mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
          <span class="text-xs text-gray-600">
            I agree to the DailyMart BD <a href="#/about" class="text-emerald-600 font-semibold underline">Terms of Service</a> & <a href="#/faq" class="text-emerald-600 font-semibold underline">Privacy Policy</a>
          </span>
        </label>
      </div>

      <button 
        type="submit" 
        id="signup-submit-btn"
        class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
      >
        <span>Create My Free Account</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </button>

      <div class="text-center pt-2 text-xs text-gray-500">
        Already registered? 
        <a href="javascript:void(0)" onclick="window.Pages.authSwitch('login')" class="text-emerald-600 font-bold hover:underline">
          Sign In to Your Account
        </a>
      </div>
    </form>
  `;

  const showAlert = (msg, isError = true) => {
    const box = document.getElementById('auth-alert');
    if (!box) return;
    box.className = isError 
      ? 'mb-5 p-3.5 rounded-xl text-sm font-medium flex items-center gap-2 bg-red-50 text-red-700 border border-red-200' 
      : 'mb-5 p-3.5 rounded-xl text-sm font-medium flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200';
    box.innerHTML = `<span>${isError ? '⚠️' : '✓'}</span> <span>${msg}</span>`;
    box.classList.remove('hidden');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const bindFormEvents = () => {
    // Login submit
    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = document.getElementById('login-identifier')?.value.trim();
        const password = document.getElementById('login-password')?.value;

        if (!identifier) {
          showAlert('Please enter your mobile number or email');
          return;
        }
        if (!password) {
          showAlert('Please enter your password');
          return;
        }

        const res = window.Store.login({ identifier, password });
        if (!res.success) {
          showAlert(res.message, true);
          if (window.Toast) window.Toast.error(res.message);
        } else {
          showAlert('Welcome back, ' + res.user.name + '! Redirecting...', false);
          if (window.Toast) window.Toast.success('Signed in as ' + res.user.name);
          setTimeout(() => {
            window.Router.navigate('/account');
          }, 400);
        }
      });
    }

    // Signup submit
    const signupForm = document.getElementById('auth-signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name')?.value.trim();
        const phone = document.getElementById('signup-phone')?.value.trim();
        const email = document.getElementById('signup-email')?.value.trim();
        const district = document.getElementById('signup-district')?.value;
        const area = document.getElementById('signup-area')?.value.trim();
        const street = document.getElementById('signup-address')?.value.trim();
        const password = document.getElementById('signup-password')?.value;
        const confirmPassword = document.getElementById('signup-confirm-password')?.value;
        const terms = document.getElementById('signup-terms')?.checked;

        if (!name) {
          showAlert('Please enter your full name');
          return;
        }
        if (!phone) {
          showAlert('Please enter your mobile number');
          return;
        }
        // Validate Bangladeshi phone (11 digits starting with 01)
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
          showAlert('Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01712345678)');
          return;
        }
        if (!password || password.length < 6) {
          showAlert('Password must be at least 6 characters long');
          return;
        }
        if (password !== confirmPassword) {
          showAlert('Passwords do not match. Please verify.');
          return;
        }
        if (!terms) {
          showAlert('Please agree to the Terms of Service to continue');
          return;
        }

        const fullAddress = [street, area, district].filter(Boolean).join(', ');

        const res = window.Store.register({
          name,
          phone: cleanPhone,
          email,
          district,
          address: fullAddress,
          password
        });

        if (!res.success) {
          showAlert(res.message, true);
          if (window.Toast) window.Toast.error(res.message);
        } else {
          showAlert('Welcome, ' + res.user.name + '! Account created successfully.', false);
          if (window.Toast) window.Toast.success('Account created! Welcome to DailyMart BD');
          setTimeout(() => {
            window.Router.navigate('/account');
          }, 500);
        }
      });
    }
  };

  // Switch between tabs
  window.Pages.authSwitch = (mode) => {
    currentMode = mode;
    render();
  };

  // Toggle eye visibility
  window.Pages.togglePasswordVisibility = (inputId, btn) => {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🙈';
    } else {
      input.type = 'password';
      btn.textContent = '👁️';
    }
  };

  // Quick Demo credentials fill
  window.Pages.quickAuthFill = (type) => {
    if (type === 'admin') {
      currentMode = 'login';
      render();
      const idEl = document.getElementById('login-identifier');
      const pwEl = document.getElementById('login-password');
      if (idEl && pwEl) {
        idEl.value = 'admin';
        pwEl.value = 'admin';
        showAlert('Admin credentials filled! Click "Sign In" to proceed.', false);
      }
    } else if (type === 'customer') {
      // Ensure test customer exists in dm_users_db
      const users = JSON.parse(localStorage.getItem('dm_users_db') || '[]');
      const demoPhone = '01711223344';
      let demoUser = users.find(u => u.phone === demoPhone);
      if (!demoUser) {
        demoUser = {
          id: 'usr_demo',
          name: 'Rahim Chowdhury',
          phone: demoPhone,
          email: 'rahim@example.com',
          district: 'Dhaka',
          address: 'House 42, Road 11, Banani, Dhaka',
          password: 'password123',
          registeredAt: new Date().toISOString()
        };
        users.push(demoUser);
        localStorage.setItem('dm_users_db', JSON.stringify(users));
      }

      currentMode = 'login';
      render();
      const idEl = document.getElementById('login-identifier');
      const pwEl = document.getElementById('login-password');
      if (idEl && pwEl) {
        idEl.value = demoPhone;
        pwEl.value = 'password123';
        showAlert('Demo Customer credentials filled (Rahim Chowdhury)! Click "Sign In".', false);
      }
    }
  };

  render();
};

window.Pages.login = () => window.Pages.auth('login');
window.Pages.signup = () => window.Pages.auth('signup');
