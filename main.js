// CosmoVoyage: Primary Javascript Module Orchestrator
import './style.css';
import { initPlanetaryExplorer } from './components/planetary-explorer.js';
import { initDockingSimulator } from './components/docking-simulator.js';
import { initStarRegistry } from './components/star-registry.js';
import { initGearShop } from './components/gear-shop.js';
import { initFlightLogs } from './components/flight-logs.js';
import { initAcademyQuiz } from './components/academy-quiz.js';

// ==========================================
// 1. Dynamic Toast Notification Manager
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  // Icon selector based on state
  let icon = '✦';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '⚠';
  if (type === 'info') icon = '★';

  toast.innerHTML = `
    <span class="toast-icon" style="font-weight:900; color:var(--cyan-accent);">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Auto clean-up
  setTimeout(() => {
    toast.style.animation = 'fadeIn 0.3s var(--ease-cosmic) reverse forwards';
    setTimeout(() => {
      if (toast.parentNode) {
        container.removeChild(toast);
      }
    }, 300);
  }, 4200);
}

// ==========================================
// 2. Fixed Header Scroll Effects & Active Nav
// ==========================================
function initHeaderAndNavigation() {
  const header = document.getElementById('app-header');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');
  const mobNavItems = document.querySelectorAll('.mobile-nav-item');

  // Add scrolled shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy active navigation state
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      updateActiveNavItem(currentId);
    }
  });

  function updateActiveNavItem(id) {
    // Map section IDs to header list item IDs
    const sectionToNav = {
      'home-section': ['nav-home', 'mob-home'],
      'destinations': ['nav-destinations', 'mob-destinations'],
      'shop': ['nav-shop', 'mob-shop'],
      'simulator': ['nav-simulator', 'mob-simulator'],
      'academy': ['nav-academy', 'mob-academy'],
      'logs': ['nav-logs', 'mob-logs'],
      'registry': ['nav-registry', 'mob-registry']
    };

    const targetIds = sectionToNav[id];
    if (!targetIds) return;

    navItems.forEach(item => {
      if (item.id === targetIds[0]) item.classList.add('active');
      else item.classList.remove('active');
    });

    mobNavItems.forEach(item => {
      if (item.id === targetIds[1]) item.classList.add('active');
      else item.classList.remove('active');
    });
  }

  // Smooth scroll support
  const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a, .logo, .hero-actions a');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        // Handle logo click returning to home
        const targetId = href === '#' ? 'home-section' : href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ==========================================
// 3. Responsive Native Mobile Drawer Dialog
// ==========================================
function initMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const menuToggle = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawerLinks = drawer.querySelectorAll('.mobile-nav-links a');

  if (!drawer || !menuToggle) return;

  // Open Drawer Dialog
  menuToggle.addEventListener('click', () => {
    drawer.showModal();
  });

  // Close Drawer
  closeBtn.addEventListener('click', () => {
    drawer.close();
  });

  // Close drawer if clicking link
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.close();
    });
  });

  // Close drawer if clicking outside bounds
  drawer.addEventListener('click', (e) => {
    const rect = drawer.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      drawer.close();
    }
  });
}

// ==========================================
// 4. Premium Oklch Color Theme Switcher
// ==========================================
function initThemeToggler() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
  const themeIcon = document.getElementById('theme-icon');

  if (!themeToggleBtn) return;

  // Icons SVG definitions for Sun/Moon swapping
  const sunPath = `<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41z"/>`;
  const moonPath = `<path d="M12.3 22c-5.4 0-9.8-4.4-9.8-9.8 0-4.8 3.5-8.9 8.2-9.6.5-.1 1 .2 1.1.7.1.5-.2 1-.7 1.1-3.6.6-6.3 3.7-6.3 7.4 0 4.2 3.4 7.6 7.6 7.6 3.7 0 6.8-2.7 7.4-6.3.1-.5.6-.8 1.1-.7.5.1.8.6.7 1.1-.7 4.7-4.8 8.2-9.6 8.2z"/>`;

  // Read saved selection
  let currentTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    showToast(`Theme switched to interstellar ${currentTheme} mode.`, 'info');
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (metaColorScheme) {
      metaColorScheme.content = theme === 'dark' ? 'dark' : 'light';
    }

    // Morph Icon
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? sunPath : moonPath;
    }
  }
}

// ==========================================
// 5. Cadet Academy Training progression
// ==========================================
function initCadetProgression() {
  const gForceVal = document.getElementById('g-force-val');
  const gForceBar = document.getElementById('g-force-bar');
  const vacVal = document.getElementById('vacuum-val');
  const vacBar = document.getElementById('vacuum-bar');
  const dockingVal = document.getElementById('docking-accuracy-val');
  const dockingBar = document.getElementById('docking-accuracy-bar');
  const navVal = document.getElementById('navigation-val');
  const navBar = document.getElementById('navigation-bar');

  // Trigger cascade delay animation for premium cadet profile progress bars
  setTimeout(() => {
    if (gForceVal && gForceBar) {
      gForceVal.textContent = '68%';
      gForceBar.style.width = '68%';
    }
  }, 400);

  setTimeout(() => {
    if (vacVal && vacBar) {
      vacVal.textContent = '42%';
      vacBar.style.width = '42%';
    }
  }, 750);

  setTimeout(() => {
    if (dockingVal && dockingBar) {
      dockingVal.textContent = '0%';
      dockingBar.style.width = '0%';
    }
  }, 1100);

  setTimeout(() => {
    if (navVal && navBar) {
      navVal.textContent = '35%';
      navBar.style.width = '35%';
    }
  }, 1450);
}

function updateAcademyProgress(cart) {
  const gForceVal = document.getElementById('g-force-val');
  const gForceBar = document.getElementById('g-force-bar');
  const vacVal = document.getElementById('vacuum-val');
  const vacBar = document.getElementById('vacuum-bar');

  let gForceDelta = 0;
  let vacDelta = 0;

  cart.forEach(item => {
    if (item.product.id === 'flight-suit') {
      gForceDelta += 10 * item.quantity;
      vacDelta += 15 * item.quantity;
    } else if (item.product.id === 'nav-helmet') {
      vacDelta += 15 * item.quantity;
    } else if (item.product.id === 'gravity-boots') {
      gForceDelta += 12 * item.quantity;
    } else if (item.product.id === 'space-rations') {
      gForceDelta += 5 * item.quantity;
    }
  });

  // Read current values
  let currentGF = parseInt(gForceVal?.textContent || '0');
  let currentVac = parseInt(vacVal?.textContent || '0');

  let targetGF = Math.min(100, currentGF + gForceDelta);
  let targetVac = Math.min(100, currentVac + vacDelta);

  if (gForceVal && gForceBar) {
    gForceVal.textContent = `${targetGF}%`;
    gForceBar.style.width = `${targetGF}%`;
  }
  if (vacVal && vacBar) {
    vacVal.textContent = `${targetVac}%`;
    vacBar.style.width = `${targetVac}%`;
  }
}

function promoteCadetRank() {
  const rankTitle = document.getElementById('cadet-rank-title');
  const navVal = document.getElementById('navigation-val');
  const navBar = document.getElementById('navigation-bar');
  const dockingVal = document.getElementById('docking-accuracy-val');
  const dockingBar = document.getElementById('docking-accuracy-bar');

  if (rankTitle) {
    rankTitle.textContent = "Stellar Commander";
    rankTitle.className = "academy-rank-value commander";
  }

  // Set navigation and docking accuracy stats high!
  if (navVal && navBar) {
    navVal.textContent = '95%';
    navBar.style.width = '95%';
  }
  if (dockingVal && dockingBar) {
    dockingVal.textContent = '90%';
    dockingBar.style.width = '90%';
  }
}

// ==========================================
// 6. Application Initializer
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize general behaviors
  initHeaderAndNavigation();
  initMobileDrawer();
  initThemeToggler();
  initCadetProgression();

  // Bootstrap Core Modules
  initPlanetaryExplorer(showToast);
  initDockingSimulator(showToast);
  initStarRegistry(showToast);
  initGearShop(showToast, updateAcademyProgress);
  initFlightLogs(showToast);
  initAcademyQuiz(showToast, promoteCadetRank);

  // Success toast on initial entry
  setTimeout(() => {
    showToast("CosmoVoyage navigation systems synced successfully. Welcome, Cadet.", "success");
  }, 1000);
});
