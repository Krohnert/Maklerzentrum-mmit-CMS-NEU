/**
 * Maklerzentrum Configuration
 */

export const CONFIG = {
  // CMS Configuration
  CMS: {
    MOCK_MODE: location.hostname === 'localhost' || location.hostname === '127.0.0.1',
    DIRECTUS_URL: location.hostname === 'localhost' 
      ? 'http://localhost:8055' 
      : 'https://maklerzentrum.directus.app',
    PUBLIC_TOKEN: location.hostname === 'localhost'
      ? 'DEV_TOKEN'
      : 'PROD_TOKEN',
    
    // Local JSON paths (for mock mode)
    SITE_DATA_URL: '/content/site.json',
    NAVIGATION_DATA_URL: '/content/navigation.json'
  },

  // Security Configuration
  SECURITY: {
    RECAPTCHA_SITE_KEY: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Test key
    RATE_LIMIT: {
      REQUESTS: 10,
      WINDOW_MS: 5 * 60 * 1000 // 5 minutes
    },
    HONEYPOT_FIELD: 'website_url',
    CSP_NONCE: 'generated-by-server' // To be set by server
  },

  // Consent Management
  CONSENT: {
    STORAGE_KEY: 'mz_consent_v1',
    BANNER_DELAY: 2000, // ms
    MODAL_ID: 'consent-modal',
    BANNER_ID: 'consent-banner'
  },

  // Analytics & Marketing
  TRACKING: {
    GA4_ID: 'G-XXXXXXXXXX', // To be set
    GTAG_CONFIG: {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
      allow_google_signals: false
    },
    TIKTOK_PIXEL_ID: 'CXXXXXXXXX', // To be set
    FACEBOOK_PIXEL_ID: 'XXXXXXXXX' // To be set
  },

  // API Endpoints
  API: {
    BASE_URL: location.hostname === 'localhost'
      ? 'http://localhost:8001'
      : 'https://api.maklerzentrum.ch',
    ENDPOINTS: {
      CONTACT: '/api/contact',
      BOOKING: '/api/booking',
      WEBHOOK_BOOKING: '/api/webhooks/booking',
      WEBHOOK_CONTACT: '/api/webhooks/contact'
    }
  },

  // Cache Settings
  CACHE: {
    DURATION: 5 * 60 * 1000, // 5 minutes
    STORAGE_PREFIX: 'mz_cache_'
  },

  // Development flags
  DEBUG: location.hostname === 'localhost' || location.search.includes('debug=1'),
  
  // Site Information
  SITE: {
    DOMAIN: 'maklerzentrum.ch',
    CANONICAL_URL: 'https://maklerzentrum.ch',
    DEFAULT_LOCALE: 'de_CH',
    TIMEZONE: 'Europe/Zurich'
  }
};

// Environment detection
export const IS_DEVELOPMENT = CONFIG.DEBUG;
export const IS_PRODUCTION = !IS_DEVELOPMENT;

// API Base URL for CMS
export const API_BASE = window.location.origin;

// Logger utility
export const logger = {
  debug: (...args) => IS_DEVELOPMENT && console.log('[DEBUG]', ...args),
  info: (...args) => console.info('[INFO]', ...args),
  warn: (...args) => console.warn('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args)
};

// Feature flags
export const FEATURES = {
  CONSENT_BANNER: true,
  ANALYTICS: true,
  MARKETING: true,
  FORM_VALIDATION: true,
  RATE_LIMITING: true,
  SECURITY_HEADERS: true,
  GEO_SEO: false // Can be enabled later
};

export default CONFIG;