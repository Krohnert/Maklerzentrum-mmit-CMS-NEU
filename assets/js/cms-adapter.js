/**
 * CMS Adapter - Handles data loading from local JSON or Directus
 */

import { CONFIG, logger } from './config.js';

class CMSAdapter {
  constructor() {
    this.cache = new Map();
    this.loadPromise = null;
  }

  /**
   * Get site settings
   */
  async getSite() {
    const data = await this._loadData();
    return data.site_settings || {};
  }

  /**
   * Get navigation data
   */
  async getNavigation() {
    const data = await this._loadNavigationData();
    return data.navigation || {};
  }

  /**
   * Load all CMS data
   */
  async _loadData() {
    if (this.cache.has('site_data')) {
      return this.cache.get('site_data');
    }

    try {
      let data;
      
      if (CONFIG.CMS.MOCK_MODE) {
        // Load from local JSON
        const response = await fetch(CONFIG.CMS.SITE_DATA_URL);
        if (!response.ok) throw new Error('Failed to load site data');
        data = await response.json();
        logger.debug('Loaded site data from local JSON');
      } else {
        // Load from Directus
        data = await this._loadFromDirectus();
        logger.debug('Loaded site data from Directus');
      }

      this.cache.set('site_data', data);
      return data;

    } catch (error) {
      logger.error('Failed to load site data:', error);
      return this._getFallbackData();
    }
  }

  /**
   * Load navigation data
   */
  async _loadNavigationData() {
    if (this.cache.has('navigation_data')) {
      return this.cache.get('navigation_data');
    }

    try {
      let data;
      
      if (CONFIG.CMS.MOCK_MODE) {
        // Load from local JSON
        const response = await fetch(CONFIG.CMS.NAVIGATION_DATA_URL);
        if (!response.ok) throw new Error('Failed to load navigation data');
        data = await response.json();
      } else {
        // Load from Directus
        data = { navigation: await this._directusRequest('navigation') };
      }

      this.cache.set('navigation_data', data);
      return data;

    } catch (error) {
      logger.error('Failed to load navigation data:', error);
      return { navigation: {} };
    }
  }

  /**
   * Load data from Directus API
   */
  async _loadFromDirectus() {
    const siteSettings = await this._directusRequest('site_settings?fields=*');
    
    return {
      site_settings: siteSettings.data || siteSettings
    };
  }

  /**
   * Make request to Directus API
   */
  async _directusRequest(endpoint) {
    const url = `${CONFIG.CMS.DIRECTUS_URL}/items/${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${CONFIG.CMS.PUBLIC_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Directus API error: ${response.status}`);
    }
    
    return response.json();
  }

  /**
   * Fallback data when CMS is unavailable
   */
  _getFallbackData() {
    return {
      site_settings: {
        brandName: "Maklerzentrum Schweiz AG",
        claim: "Keine halben Sachen.",
        contact: {
          email: "info@maklerzentrum.ch",
          phone: "+41 79 948 69 86"
        },
        legal: {
          imprintHtml: "<h1>Impressum</h1><p>Daten werden geladen...</p>",
          privacyHtml: "<h1>Datenschutzerklärung</h1><p>Daten werden geladen...</p>",
          termsHtml: "<h1>AGB</h1><p>Daten werden geladen...</p>"
        }
      }
    };
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    logger.info('CMS cache cleared');
  }

  /**
   * Refresh data
   */
  async refresh() {
    this.clearCache();
    return await this._loadData();
  }
}

// Global CMS instance
const cms = new CMSAdapter();

// Export functions
export const getSite = () => cms.getSite();
export const getNavigation = () => cms.getNavigation();
export const refreshCMS = () => cms.refresh();
export const clearCMSCache = () => cms.clearCache();

export default cms;