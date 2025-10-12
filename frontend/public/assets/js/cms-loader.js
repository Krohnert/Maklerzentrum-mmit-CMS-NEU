/**
 * CMS Content Loader
 * Dynamically loads content from CMS backend and renders it on the frontend
 */

import { API_BASE } from './config.js';

/**
 * Load FAQs from CMS
 */
export async function loadFAQs(locale = 'de-CH') {
    try {
        // Use public endpoint directly (no auth required)
        const response = await fetch(`${API_BASE}/api/content/${locale}/faq`);
        
        if (!response.ok) {
            throw new Error(`Failed to load FAQs: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ Loaded FAQs:', data.faq?.length || 0, 'items');
        return data.faq || [];
    } catch (error) {
        console.error('Error loading FAQs:', error);
        return [];
    }
}

/**
 * Load Modules from CMS
 */
export async function loadModules(locale = 'de-CH') {
    try {
        // Use public endpoint directly (no auth required)
        const response = await fetch(`${API_BASE}/api/content/${locale}/modules`);
        
        if (!response.ok) {
            throw new Error(`Failed to load modules: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ Loaded modules:', data.modules?.length || 0, 'items');
        return data.modules || [];
    } catch (error) {
        console.error('Error loading modules:', error);
        return [];
    }
}

/**
 * Render FAQ Accordion
 */
export function renderFAQs(faqs, containerId = 'faq-accordion') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`FAQ container #${containerId} not found`);
        return;
    }
    
    // Clear loading message
    container.innerHTML = '';
    
    if (faqs.length === 0) {
        container.innerHTML = '<div class="text-center py-12 text-gray-500">Keine FAQs verfügbar.</div>';
        return;
    }
    
    // Filter only visible FAQs
    const visibleFAQs = faqs.filter(faq => faq.visible !== false);
    
    // Create accordion items
    visibleFAQs.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item bg-white rounded-lg border border-gray-200';
        
        faqItem.innerHTML = `
            <button class="faq-trigger w-full text-left p-4 flex justify-between items-center hover:bg-gray-50 transition-colors" aria-expanded="false" role="button">
                <span class="font-semibold text-gray-800">${escapeHtml(faq.question)}</span>
                <svg class="faq-icon w-5 h-5 text-gray-500 transform transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
            </button>
            <div class="faq-content max-h-0 overflow-hidden transition-all duration-300" role="region">
                <div class="p-4 pt-0 text-gray-600">
                    ${faq.answer}
                </div>
            </div>
        `;
        
        container.appendChild(faqItem);
    });
    
    // Initialize accordion functionality
    initFAQAccordion(container);
    
    console.log(`✅ Rendered ${visibleFAQs.length} FAQs with accordion functionality`);
}

/**
 * Initialize FAQ Accordion Functionality
 */
function initFAQAccordion(container) {
    const triggers = container.querySelectorAll('.faq-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const content = faqItem.querySelector('.faq-content');
            const icon = this.querySelector('.faq-icon');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQs
            container.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    const otherContent = item.querySelector('.faq-content');
                    const otherTrigger = item.querySelector('.faq-trigger');
                    const otherIcon = item.querySelector('.faq-icon');
                    
                    otherContent.style.maxHeight = '0';
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            if (isExpanded) {
                content.style.maxHeight = '0';
                this.setAttribute('aria-expanded', 'false');
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                this.setAttribute('aria-expanded', 'true');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    console.log(`✅ Initialized ${triggers.length} FAQ accordion triggers`);
}

/**
 * Render Modules
 */
export function renderModules(modules, containerId = 'modules-list') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Modules container #${containerId} not found`);
        return;
    }
    
    // Clear loading message
    container.innerHTML = '';
    
    if (modules.length === 0) {
        container.innerHTML = '<div class="text-center py-12 text-gray-500">Keine Module verfügbar.</div>';
        return;
    }
    
    // Filter only visible modules
    const visibleModules = modules.filter(mod => mod.visible !== false);
    
    // Create module cards
    visibleModules.forEach((module, index) => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow';
        
        const formatBadge = module.format === 'online' 
            ? '<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Online</span>'
            : '<span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Präsenz</span>';
        
        const bulletsList = module.bullets && module.bullets.length > 0
            ? `<ul class="space-y-2 mt-4">
                ${module.bullets.map(bullet => `
                    <li class="flex items-start">
                        <svg class="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span class="text-gray-600">${escapeHtml(bullet)}</span>
                    </li>
                `).join('')}
               </ul>`
            : '';
        
        moduleCard.innerHTML = `
            <div class="flex items-start justify-between mb-3">
                <h3 class="text-xl font-bold text-gray-800">${escapeHtml(module.title)}</h3>
                ${formatBadge}
            </div>
            <p class="text-sm text-gray-500 mb-2">${module.durationDays} Tage</p>
            ${bulletsList}
        `;
        
        container.appendChild(moduleCard);
    });
    
    console.log(`✅ Rendered ${visibleModules.length} modules`);
}

/**
 * Initialize CMS content loading for a page
 */
export async function initCMSContent(options = {}) {
    const {
        locale = 'de-CH',
        loadFAQ = false,
        loadModules: shouldLoadModules = false,
        faqContainerId = 'faq-accordion',
        modulesContainerId = 'modules-list'
    } = options;
    
    console.log('🔄 Loading CMS content...');
    
    try {
        if (loadFAQ) {
            const faqs = await loadFAQs(locale);
            renderFAQs(faqs, faqContainerId);
        }
        
        if (shouldLoadModules) {
            const modules = await loadModules(locale);
            renderModules(modules, modulesContainerId);
        }
        
        console.log('✅ CMS content loaded successfully');
    } catch (error) {
        console.error('❌ Error loading CMS content:', error);
    }
}

/**
 * Helper: Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions globally available
window.loadFAQs = loadFAQs;
window.loadModules = loadModules;
window.renderFAQs = renderFAQs;
window.renderModules = renderModules;
window.initCMSContent = initCMSContent;
