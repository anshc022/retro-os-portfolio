// Analytics and PWA utilities
export const analytics = {
  // Simple analytics without external dependencies
  data: JSON.parse(localStorage.getItem('ankita-portfolio-analytics') || '{}'),
  
  track(event, data = {}) {
    const timestamp = new Date().toISOString();
    const entry = { event, data, timestamp };
    
    if (!this.data[event]) this.data[event] = [];
    this.data[event].push(entry);
    
    // Keep only last 100 entries per event
    if (this.data[event].length > 100) {
      this.data[event] = this.data[event].slice(-100);
    }
    
    localStorage.setItem('ankita-portfolio-analytics', JSON.stringify(this.data));
  },
  
  getStats() {
    const stats = {};
    Object.keys(this.data).forEach(event => {
      stats[event] = {
        count: this.data[event].length,
        recent: this.data[event].slice(-5)
      };
    });
    return stats;
  },
  
  getMostUsedApps() {
    const appStats = {};
    if (this.data['app_opened']) {
      this.data['app_opened'].forEach(entry => {
        const app = entry.data.app;
        appStats[app] = (appStats[app] || 0) + 1;
      });
    }
    return Object.entries(appStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  }
};

// PWA installation
export const pwa = {
  deferredPrompt: null,
  
  init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      
      // Show install button if needed
      const installBtn = document.getElementById('pwa-install-btn');
      if (installBtn) {
        installBtn.style.display = 'block';
      }
    });
    
    window.addEventListener('appinstalled', () => {
      analytics.track('pwa_installed');
      this.deferredPrompt = null;
    });
  },
  
  async install() {
    if (!this.deferredPrompt) return false;
    
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    analytics.track('pwa_install_prompt', { outcome });
    this.deferredPrompt = null;
    return outcome === 'accepted';
  },
  
  isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
  }
};

// Touch and mobile utilities
export const mobile = {
  isTouchDevice() {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
  },
  
  isSmallScreen() {
    return window.innerWidth <= 768;
  },
  
  addTouchFeedback(element) {
    if (!this.isTouchDevice()) return;
    
    element.addEventListener('touchstart', () => {
      element.classList.add('touch-active');
    });
    
    element.addEventListener('touchend', () => {
      setTimeout(() => {
        element.classList.remove('touch-active');
      }, 150);
    });
  }
};

// Accessibility helpers
export const a11y = {
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
      
      if (e.key === 'Escape') {
        element.dispatchEvent(new CustomEvent('close'));
      }
    });
    
    firstElement?.focus();
  },
  
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }
};
