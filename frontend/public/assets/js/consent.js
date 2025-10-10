/**
 * Cookie Consent Management
 * Handles GDPR/revDSG compliant consent banner and blocking
 */

import { CONFIG, logger } from './config.js';
import { getSite } from './cms-adapter.js';

class ConsentManager {
  constructor() {
    this.consent = this._loadConsent();
    this.initialized = false;
    this.site = null;
  }

  /**
   * Initialize consent management
   */
  async init() {
    if (this.initialized) return;

    try {
      this.site = await getSite();
      
      // Show banner if no consent exists
      if (!this.consent) {
        setTimeout(() => this._showBanner(), CONFIG.CONSENT.BANNER_DELAY);
      } else {
        // Apply existing consent
        this._applyConsent();
      }

      // Set up modal trigger
      this._setupModalTrigger();
      
      this.initialized = true;
      logger.info('Consent manager initialized');
      
    } catch (error) {
      logger.error('Failed to initialize consent manager:', error);
    }
  }

  /**
   * Show consent banner
   */
  _showBanner() {
    if (document.getElementById(CONFIG.CONSENT.BANNER_ID)) return;

    const legal = this.site?.legal || {};
    
    const banner = document.createElement('div');
    banner.id = CONFIG.CONSENT.BANNER_ID;
    banner.className = 'consent-banner';
    banner.innerHTML = `
      <div class="consent-banner-content">
        <div class="consent-text">
          ${legal.cookieIntroHtml || '<p>Wir verwenden Cookies zur Verbesserung Ihres Browsing-Erlebnisses.</p>'}
        </div>
        <div class="consent-actions">
          <button id="consent-accept-all" class="btn-primary">
            Alle akzeptieren
          </button>
          <button id="consent-settings" class="btn-secondary">
            Einstellungen
          </button>
          <button id="consent-reject" class="btn-tertiary">
            Ablehnen
          </button>
        </div>
      </div>
    `;

    // Add styles
    banner.innerHTML += `
      <style>
        .consent-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 2px solid var(--color-primary, #D81C1C);
          box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
          z-index: 1000;
          padding: 1rem;
          animation: slideUp 0.3s ease;
        }
        
        .consent-banner-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .consent-text {
          flex: 1;
          min-width: 300px;
        }
        
        .consent-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .consent-banner button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .consent-banner .btn-primary {
          background: var(--color-primary, #D81C1C);
          color: white;
        }
        
        .consent-banner .btn-secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }
        
        .consent-banner .btn-tertiary {
          background: transparent;
          color: #6b7280;
          text-decoration: underline;
        }
        
        .consent-banner button:hover {
          transform: translateY(-1px);
        }
        
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .consent-banner-content {
            flex-direction: column;
            text-align: center;
          }
          .consent-actions {
            justify-content: center;
            width: 100%;
          }
        }
      </style>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById('consent-accept-all').addEventListener('click', () => {
      this._setConsent({ essential: true, analytics: true, marketing: true });
      this._hideBanner();
    });

    document.getElementById('consent-reject').addEventListener('click', () => {
      this._setConsent({ essential: true, analytics: false, marketing: false });
      this._hideBanner();
    });

    document.getElementById('consent-settings').addEventListener('click', () => {
      this._showModal();
    });

    logger.debug('Consent banner shown');
  }

  /**
   * Show consent settings modal
   */
  _showModal() {
    if (document.getElementById(CONFIG.CONSENT.MODAL_ID)) {
      document.getElementById(CONFIG.CONSENT.MODAL_ID).style.display = 'flex';
      return;
    }

    const legal = this.site?.legal || {};
    const categories = legal.cookieCategories || [];
    
    const modal = document.createElement('div');
    modal.id = CONFIG.CONSENT.MODAL_ID;
    modal.className = 'consent-modal';
    
    const categoriesHTML = categories.map(cat => `
      <div class="consent-category">
        <div class="consent-category-header">
          <label class="consent-toggle ${cat.required ? 'required' : ''}">
            <input type="checkbox" 
                   ${cat.required ? 'checked disabled' : ''} 
                   ${this.consent?.[cat.key] ? 'checked' : ''}
                   data-category="${cat.key}">
            <span class="toggle-slider"></span>
            <strong>${cat.title}</strong>
            ${cat.required ? '<span class="required-label">Erforderlich</span>' : ''}
          </label>
        </div>
        <div class="consent-category-description">
          ${cat.descriptionHtml || ''}
        </div>
      </div>
    `).join('');

    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2>Cookie-Einstellungen</h2>
          <button class="modal-close" aria-label="Schließen">&times;</button>
        </div>
        <div class="modal-body">
          <div class="consent-intro">
            ${legal.cookieIntroHtml || '<p>Verwalten Sie Ihre Cookie-Einstellungen.</p>'}
          </div>
          <div class="consent-categories">
            ${categoriesHTML}
          </div>
        </div>
        <div class="modal-footer">
          <button id="consent-save" class="btn-primary">Einstellungen speichern</button>
          <button id="consent-accept-all-modal" class="btn-secondary">Alle akzeptieren</button>
        </div>
      </div>
    `;

    // Add modal styles
    modal.innerHTML += `
      <style>
        .consent-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
        }
        
        .modal-content {
          background: white;
          border-radius: 8px;
          max-width: 600px;
          width: 90vw;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          animation: slideIn 0.3s ease;
        }
        
        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0.5rem;
        }
        
        .modal-body {
          padding: 1.5rem;
        }
        
        .consent-category {
          margin-bottom: 1.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
        }
        
        .consent-category-header {
          padding: 1rem;
          background: #f9fafb;
        }
        
        .consent-toggle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }
        
        .consent-toggle.required {
          cursor: default;
        }
        
        .consent-toggle input {
          position: relative;
          width: 44px;
          height: 24px;
          appearance: none;
          background: #d1d5db;
          border-radius: 12px;
          transition: background 0.2s ease;
          order: -1;
        }
        
        .consent-toggle input:checked {
          background: var(--color-primary, #D81C1C);
        }
        
        .consent-toggle input::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: transform 0.2s ease;
        }
        
        .consent-toggle input:checked::before {
          transform: translateX(20px);
        }
        
        .required-label {
          background: #fef3c7;
          color: #92400e;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          margin-left: auto;
        }
        
        .consent-category-description {
          padding: 1rem;
          background: white;
          border-top: 1px solid #f3f4f6;
        }
        
        .modal-footer {
          padding: 1.5rem;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }
        
        .modal-footer button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .modal-footer .btn-primary {
          background: var(--color-primary, #D81C1C);
          color: white;
        }
        
        .modal-footer .btn-secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: scale(0.95) translateY(-20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
          .modal-content {
            width: 95vw;
            max-height: 90vh;
          }
          .modal-footer {
            flex-direction: column;
          }
        }
      </style>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector('.modal-overlay').addEventListener('click', () => this._hideModal());
    modal.querySelector('.modal-close').addEventListener('click', () => this._hideModal());
    
    document.getElementById('consent-save').addEventListener('click', () => {
      this._saveModalConsent();
      this._hideModal();
    });
    
    document.getElementById('consent-accept-all-modal').addEventListener('click', () => {
      this._setConsent({ essential: true, analytics: true, marketing: true });
      this._hideModal();
    });

    // Setup hash trigger
    if (window.location.hash === '#cookies-open') {
      modal.style.display = 'flex';
      window.history.replaceState(null, '', window.location.pathname);
    }

    logger.debug('Consent modal created');
  }

  /**
   * Save consent from modal
   */
  _saveModalConsent() {
    const modal = document.getElementById(CONFIG.CONSENT.MODAL_ID);
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]:not([disabled])');
    
    const consent = { essential: true }; // Always true
    
    checkboxes.forEach(checkbox => {
      const category = checkbox.dataset.category;
      consent[category] = checkbox.checked;
    });

    this._setConsent(consent);
  }

  /**
   * Set consent and apply
   */
  _setConsent(consent) {
    this.consent = consent;
    localStorage.setItem(CONFIG.CONSENT.STORAGE_KEY, JSON.stringify({
      consent,
      timestamp: Date.now(),
      version: 1
    }));
    
    this._applyConsent();
    this._dispatchConsentEvent();
    
    logger.info('Consent updated', consent);
  }

  /**
   * Apply consent settings
   */
  _applyConsent() {
    if (!this.consent) return;

    // Block/unblock tracking scripts
    if (this.consent.analytics) {
      this._loadAnalytics();
    }
    
    if (this.consent.marketing) {
      this._loadMarketing();
    }
  }

  /**
   * Load analytics tracking
   */
  _loadAnalytics() {
    if (window.gtag || !CONFIG.TRACKING.GA4_ID) return;

    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.TRACKING.GA4_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${CONFIG.TRACKING.GA4_ID}', ${JSON.stringify(CONFIG.TRACKING.GTAG_CONFIG)});
    `;
    document.head.appendChild(script2);

    logger.info('Analytics loaded');
  }

  /**
   * Load marketing tracking
   */
  _loadMarketing() {
    // Load TikTok Pixel
    if (CONFIG.TRACKING.TIKTOK_PIXEL_ID && !window.ttq) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function (w, d, t) {
          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
          ttq.load('${CONFIG.TRACKING.TIKTOK_PIXEL_ID}');
          ttq.page();
        }(window, document, 'ttq');
      `;
      document.head.appendChild(script);
    }

    // Load Facebook Pixel
    if (CONFIG.TRACKING.FACEBOOK_PIXEL_ID && !window.fbq) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${CONFIG.TRACKING.FACEBOOK_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }

    logger.info('Marketing tracking loaded');
  }

  /**
   * Load stored consent
   */
  _loadConsent() {
    try {
      const stored = localStorage.getItem(CONFIG.CONSENT.STORAGE_KEY);
      if (!stored) return null;

      const data = JSON.parse(stored);
      
      // Check if consent is still valid (e.g., not older than 1 year)
      const maxAge = 365 * 24 * 60 * 60 * 1000; // 1 year
      if (Date.now() - data.timestamp > maxAge) {
        localStorage.removeItem(CONFIG.CONSENT.STORAGE_KEY);
        return null;
      }

      return data.consent;
    } catch (error) {
      logger.error('Failed to load consent:', error);
      return null;
    }
  }

  /**
   * Hide banner
   */
  _hideBanner() {
    const banner = document.getElementById(CONFIG.CONSENT.BANNER_ID);
    if (banner) {
      banner.style.animation = 'slideDown 0.3s ease forwards';
      setTimeout(() => banner.remove(), 300);
    }
  }

  /**
   * Hide modal
   */
  _hideModal() {
    const modal = document.getElementById(CONFIG.CONSENT.MODAL_ID);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  /**
   * Setup modal trigger for hash links
   */
  _setupModalTrigger() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#cookies-open') {
        this._showModal();
        window.history.replaceState(null, '', window.location.pathname);
      }
    });

    // Listen for clicks on cookie settings links
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href="#cookies-open"], [href="#cookies-open"] *')) {
        e.preventDefault();
        this._showModal();
      }
    });
  }

  /**
   * Dispatch consent change event
   */
  _dispatchConsentEvent() {
    const event = new CustomEvent('consent_changed', {
      detail: this.consent
    });
    window.dispatchEvent(event);
  }

  /**
   * Get current consent
   */
  getConsent() {
    return this.consent;
  }

  /**
   * Check if category is consented
   */
  hasConsent(category) {
    return this.consent?.[category] === true;
  }
}

// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Global consent manager
const consentManager = new ConsentManager();

// Export functions
export const initConsent = () => consentManager.init();
export const getConsent = () => consentManager.getConsent();
export const hasConsent = (category) => consentManager.hasConsent(category);

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConsent);
} else {
  initConsent();
}

export default consentManager;