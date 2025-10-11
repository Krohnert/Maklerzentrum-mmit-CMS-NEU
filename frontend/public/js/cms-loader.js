/**
 * CMS Content Loader
 * Loads content from MongoDB via API and renders it on the page
 */

class CMSLoader {
    constructor() {
        this.API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? window.location.protocol + '//' + window.location.hostname + ':8001'
            : window.location.protocol + '//' + window.location.host;
        
        this.currentLocale = this.detectLocale();
        this.cache = {};
    }
    
    /**
     * Detect current locale from URL
     */
    detectLocale() {
        const path = window.location.pathname;
        if (path.startsWith('/fr/')) return 'fr-CH';
        if (path.startsWith('/it/')) return 'it-CH';
        return 'de-CH';  // Default
    }
    
    /**
     * Fetch data from API
     */
    async fetch(endpoint) {
        const cacheKey = `${this.currentLocale}_${endpoint}`;
        
        // Return from cache if available
        if (this.cache[cacheKey]) {
            return this.cache[cacheKey];
        }
        
        try {
            const response = await fetch(`${this.API_BASE}${endpoint}`, {
                credentials: 'include'
            });
            
            if (!response.ok) {
                console.warn(`CMS API error: ${response.status} for ${endpoint}`);
                return null;
            }
            
            const data = await response.json();
            
            // Cache the result
            if (data.success) {
                this.cache[cacheKey] = data;
                return data;
            }
            
            return null;
        } catch (error) {
            console.error('CMS fetch error:', error);
            return null;
        }
    }
    
    /**
     * Load modules for current locale
     */
    async loadModules() {
        const data = await this.fetch(`/api/admin/content/${this.currentLocale}/modules`);
        return data?.modules || [];
    }
    
    /**
     * Load FAQ for current locale
     */
    async loadFAQ() {
        const data = await this.fetch(`/api/admin/content/${this.currentLocale}/faq`);
        return data?.faq || [];
    }
    
    /**
     * Render modules into container
     */
    renderModules(modules, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        modules.filter(m => m.visible).forEach(module => {
            const div = document.createElement('div');
            div.className = 'bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition';
            
            const bullets = module.bullets?.map(b => `<li>${this.escapeHtml(b)}</li>`).join('') || '';
            
            div.innerHTML = `
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">${this.escapeHtml(module.title)}</h3>
                        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${this.escapeHtml(module.format)}</span>
                        <span class="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded ml-2">${module.durationDays} Tage</span>
                    </div>
                </div>
                ${bullets ? `<ul class="list-disc list-inside space-y-1 text-gray-600">${bullets}</ul>` : ''}
            `;
            
            container.appendChild(div);
        });
    }
    
    /**
     * Render FAQ accordion
     */
    renderFAQ(faqItems, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        faqItems.filter(f => f.visible).forEach((faq, index) => {
            const div = document.createElement('div');
            div.className = 'faq-item border-b border-gray-200';
            
            const isOpen = index === 0; // First item open by default
            
            div.innerHTML = `
                <button class="faq-trigger w-full flex items-center justify-between py-6 text-left hover:text-primary transition" 
                        aria-expanded="${isOpen}">
                    <span class="text-lg font-semibold text-gray-800">${this.escapeHtml(faq.question)}</span>
                    <svg class="w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                <div class="faq-content overflow-hidden transition-all duration-300" 
                     style="max-height: ${isOpen ? '1000px' : '0'}">
                    <div class="pb-6 text-gray-600">
                        ${faq.answer}
                    </div>
                </div>
            `;
            
            // Add click handler
            const trigger = div.querySelector('.faq-trigger');
            const content = div.querySelector('.faq-content');
            const icon = trigger.querySelector('svg');
            
            trigger.addEventListener('click', () => {
                const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
                
                if (isOpen) {
                    content.style.maxHeight = '0px';
                    icon.style.transform = 'rotate(0deg)';
                    trigger.setAttribute('aria-expanded', 'false');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });
            
            container.appendChild(div);
        });
    }
    
    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Initialize CMS content loading for current page
     */
    async init() {
        console.log('🚀 CMS Loader initialized for locale:', this.currentLocale);
        
        // Check if we have CMS-enabled elements on this page
        const modulesContainer = document.querySelector('[data-cms-modules]');
        const faqContainer = document.querySelector('[data-cms-faq]');
        
        if (modulesContainer) {
            console.log('📦 Loading modules from CMS...');
            const modules = await this.loadModules();
            this.renderModules(modules, modulesContainer.id);
            console.log(`✅ Loaded ${modules.length} modules`);
        }
        
        if (faqContainer) {
            console.log('❓ Loading FAQ from CMS...');
            const faq = await this.loadFAQ();
            this.renderFAQ(faq, faqContainer.id);
            console.log(`✅ Loaded ${faq.length} FAQ items`);
        }
    }
}

// Auto-initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cmsLoader = new CMSLoader();
        window.cmsLoader.init();
    });
} else {
    window.cmsLoader = new CMSLoader();
    window.cmsLoader.init();
}
