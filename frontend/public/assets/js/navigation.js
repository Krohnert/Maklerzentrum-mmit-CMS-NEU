/**
 * Navigation utilities with auto-scroll functionality
 */

import { logger } from './config.js';

/**
 * Scroll to top of page with smooth animation
 */
export function scrollToTop(behavior = 'smooth') {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: behavior
    });
    
    logger.debug('Scrolled to top');
}

/**
 * Handle page navigation with auto-scroll
 */
export function navigateToPage(url, scrollToTopAfter = true) {
    if (scrollToTopAfter) {
        // For same-page navigation, scroll immediately
        if (url.startsWith('#') || url.startsWith('/') === false) {
            scrollToTop();
        }
    }
    
    // Navigate to the URL
    if (url.startsWith('#')) {
        // Handle anchor links
        const element = document.querySelector(url);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else if (url.startsWith('http') || url.startsWith('/')) {
        // Handle external or internal page links
        window.location.href = url;
    }
}

/**
 * Initialize navigation handlers with auto-scroll
 */
export function initNavigationHandlers() {
    // Handle all internal navigation links
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');
        
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Skip external links and special links
        if (href.startsWith('http') && !href.includes('maklerzentrum.ch')) {
            return; // Let browser handle external links
        }
        
        if (href.startsWith('mailto:') || href.startsWith('tel:')) {
            return; // Let browser handle email/phone links
        }
        
        if (href.startsWith('#cookies-open')) {
            return; // Let consent manager handle this
        }
        
        // Handle internal page navigation
        if (href.endsWith('.html') || href.startsWith('/')) {
            event.preventDefault();
            
            // Scroll to top before navigation for page changes
            scrollToTop('auto');
            
            // Small delay to ensure scroll completes before navigation
            setTimeout(() => {
                window.location.href = href;
            }, 100);
        }
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        scrollToTop('auto');
    });
    
    // Handle page load - scroll to top
    window.addEventListener('load', () => {
        // Only scroll to top if not navigating to a specific anchor
        if (!window.location.hash) {
            scrollToTop('auto');
        }
    });
    
    logger.info('Navigation handlers initialized with auto-scroll');
}

/**
 * Scroll to specific element with offset for sticky header
 */
export function scrollToElement(selector, offset = 80) {
    const element = document.querySelector(selector);
    
    if (element) {
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        logger.debug(`Scrolled to element: ${selector}`);
    }
}

/**
 * Handle form navigation (for course-specific forms)
 */
export function navigateToForm(courseData) {
    const params = new URLSearchParams();
    
    if (courseData.cohort) params.set('cohort', courseData.cohort);
    if (courseData.module) params.set('module', courseData.module);
    if (courseData.location) params.set('location', courseData.location);
    if (courseData.startDate) params.set('startDate', courseData.startDate);
    if (courseData.endDate) params.set('endDate', courseData.endDate);
    
    const formUrl = `/#booking?${params.toString()}`;
    
    // Scroll to top first
    scrollToTop('auto');
    
    // Navigate to form with pre-filled data
    setTimeout(() => {
        window.location.href = formUrl;
    }, 100);
    
    logger.info('Navigating to form with course data', courseData);
}

export default {
    scrollToTop,
    navigateToPage, 
    initNavigationHandlers,
    scrollToElement,
    navigateToForm
};