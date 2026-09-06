// DailyMart BD — Client-Side Router
window.Router = (() => {
  let routes = {};
  let currentPath = '';
  let beforeEach = null;

  const getPath = () => {
    const hash = window.location.hash.slice(1) || '/';
    // Strip query string for matching if present
    const cleanPath = hash.split('?')[0] || '/';
    return cleanPath;
  };

  const navigate = (path, replace = false) => {
    if (replace) {
      window.location.replace('#' + path);
    } else {
      window.location.hash = path;
    }
  };

  const resolve = (path) => {
    // Try exact match first
    if (routes[path]) return { handler: routes[path], params: {} };

    // Try pattern matching
    for (const [pattern, handler] of Object.entries(routes)) {
      if (!pattern.includes(':')) continue;
      const patternParts = pattern.split('/');
      const pathParts = path.split('/');
      if (patternParts.length !== pathParts.length) continue;
      const params = {};
      let match = true;
      for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(':')) {
          params[patternParts[i].slice(1)] = pathParts[i];
        } else if (patternParts[i] !== pathParts[i]) {
          match = false; break;
        }
      }
      if (match) return { handler, params };
    }
    return null;
  };

  const render = (force = false) => {
    const path = getPath();
    if (!force && path === currentPath) return;
    currentPath = path;

    const matched = resolve(path);
    const content = document.getElementById('page-content');
    if (!content) return;

    if (matched) {
      if (beforeEach) beforeEach(path);
      content.innerHTML = '';
      matched.handler(matched.params);
    } else {
      if (routes['*']) routes['*']({});
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update mobile nav active state
    window.MobileNav && window.MobileNav.update(path);
    // Update header active nav
    window.Header && window.Header.updateNav(path);
  };

  window.addEventListener('hashchange', () => render(true));
  window.addEventListener('load', () => render(true));

  return {
    define: (path, handler) => { routes[path] = handler; },
    navigate,
    getPath,
    beforeEach: (fn) => { beforeEach = fn; },
    go: (path) => navigate(path),
    back: () => window.history.back(),
    getCurrentPath: () => currentPath,
    init: () => render(true)
  };
})();
