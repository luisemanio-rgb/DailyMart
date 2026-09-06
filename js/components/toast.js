// DailyMart BD — Toast Notification System
window.Toast = (() => {
  const container = () => document.getElementById('toast-container');

  const show = (message, type = 'success', duration = 3000) => {
    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
    const colors = { success: 'bg-gray-900 text-white', error: 'bg-red-600 text-white', info: 'bg-blue-600 text-white', warning: 'bg-amber-500 text-white' };
    const iconColors = { success: 'bg-green-500', error: 'bg-red-700', info: 'bg-blue-700', warning: 'bg-amber-600' };

    const toast = document.createElement('div');
    toast.className = `toast-item flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl max-w-sm w-full ${colors[type]} cursor-pointer`;
    toast.innerHTML = `
      <span class="w-6 h-6 rounded-full ${iconColors[type]} flex items-center justify-center text-xs font-bold flex-shrink-0">${icons[type]}</span>
      <span class="text-sm font-medium flex-1">${message}</span>
      <button class="text-white/70 hover:text-white text-lg leading-none" onclick="this.parentElement.remove()">×</button>
    `;
    toast.addEventListener('click', () => toast.remove());
    container().appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  return {
    success: (msg, dur) => show(msg, 'success', dur),
    error: (msg, dur) => show(msg, 'error', dur),
    info: (msg, dur) => show(msg, 'info', dur),
    warning: (msg, dur) => show(msg, 'warning', dur),
  };
})();
