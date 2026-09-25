import { StorageService } from './storage.js';

export const UIController = {
  currentTab: 'knowledge',

  init() {
    this.bindTabNavigation();
    this.bindModals();
    this.bindThemeToggle();

    // Listen for storage quota and error notifications
    window.addEventListener('subq-storage-error', (e) => {
      this.showToast(e.detail || 'Depolama hatası oluştu.', 5000);
    });
  },

  /**
   * Bind Bottom & Header Navigation Tabs
   */
  bindTabNavigation() {
    const navButtons = document.querySelectorAll('[data-tab-target]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTab = btn.getAttribute('data-tab-target');
        this.switchTab(targetTab);
      });
    });
  },

  /**
   * Switch active tab section
   */
  switchTab(tabId) {
    this.currentTab = tabId;

    // Update active tab buttons
    document.querySelectorAll('[data-tab-target]').forEach(btn => {
      if (btn.getAttribute('data-tab-target') === tabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update active view panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
      if (panel.id === `tab-${tabId}`) {
        panel.classList.add('active');
        panel.hidden = false;
      } else {
        panel.classList.remove('active');
        panel.hidden = true;
      }
    });

    // Scroll to top of window smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Bind Modal backdrop, close triggers, Escape key, and Focus Trap
   */
  bindModals() {
    // Generic modal close buttons
    document.querySelectorAll('.modal-close, .modal-backdrop').forEach(element => {
      element.addEventListener('click', (e) => {
        const modal = element.closest('.modal-container');
        if (modal) {
          this.closeModal(modal.id);
        }
      });
    });

    // About modal triggers
    document.querySelectorAll('[data-open-about]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openModal('modal-about');
      });
    });

    // Keyboard Escape key & Tab Focus Trap
    document.addEventListener('keydown', (e) => {
      const openModal = document.querySelector('.modal-container.open');
      if (!openModal) return;

      if (e.key === 'Escape') {
        this.closeModal(openModal.id);
        return;
      }

      if (e.key === 'Tab') {
        const focusable = openModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  },

  /**
   * Open modal by ID with focus management
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      this.previouslyFocusedElement = document.activeElement;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // prevent scroll

      // Focus close button or first focusable element
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.focus();
      }
    }
  },

  /**
   * Close modal by ID and restore focus
   */
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Restore focus to previously focused trigger
      if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
        this.previouslyFocusedElement.focus();
      }
    }
  },

  /**
   * Apply Theme to DOM and Icon
   */
  applyTheme(theme) {
    const validTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', validTheme);
    this.updateThemeIcon(validTheme);
  },

  /**
   * Theme Switcher synchronized with StorageService
   */
  bindThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');

    // Check saved or default theme from StorageService
    const settings = StorageService.getSettings();
    this.applyTheme(settings.theme || 'dark');

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        this.applyTheme(next);
        StorageService.saveSettings({ theme: next });
      });
    }

    window.addEventListener('subq-settings-updated', () => {
      const updatedSettings = StorageService.getSettings();
      this.applyTheme(updatedSettings.theme || 'dark');
    });
  },

  updateThemeIcon(theme) {
    const iconSpan = document.querySelector('#theme-toggle-btn .theme-icon');
    if (iconSpan) {
      iconSpan.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  },

  /**
   * Toast notification helper
   */
  showToast(message, duration = 3000) {
    let toast = document.getElementById('subq-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'subq-toast';
      toast.className = 'toast-container';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
};
