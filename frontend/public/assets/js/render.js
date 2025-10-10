/**
 * Rendering utilities for CMS content
 */

import { sanitize } from './sanitize.js';
import { CONFIG, logger } from './config.js';

/**
 * Set text content for elements
 */
export function setText(selector, value) {
  const elements = document.querySelectorAll(`[data-cms="${selector}"]`);
  elements.forEach(el => {
    el.textContent = value || '';
  });
}

/**
 * Set src attribute for images
 */
export function setSrc(selector, fileObj) {
  const elements = document.querySelectorAll(`[data-cms-src="${selector}"]`);
  elements.forEach(el => {
    if (fileObj && fileObj.url) {
      el.src = fileObj.url;
    } else if (fileObj && fileObj.id && !CONFIG.CMS.MOCK_MODE) {
      el.src = `${CONFIG.CMS.DIRECTUS_URL}/assets/${fileObj.id}`;
    }
  });
}

/**
 * Render HTML content safely
 */
export function renderHTML(selector, html, options = {}) {
  const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
  
  if (element) {
    const sanitizedHTML = sanitize(html, options);
    element.innerHTML = sanitizedHTML;
    
    // Add accessibility improvements
    _improveAccessibility(element);
    
    logger.debug(`Rendered HTML to ${selector}`, { length: html?.length });
  }
}

/**
 * Render lists with templates
 */
export function renderList(listName, items, templateId) {
  const containers = document.querySelectorAll(`[data-cms-list="${listName}"]`);
  
  containers.forEach(container => {
    const template = document.getElementById(templateId || container.dataset.template);
    if (!template) {
      logger.warn(`Template ${templateId} not found for list ${listName}`);
      return;
    }
    
    container.innerHTML = '';
    
    items.forEach((item, index) => {
      const node = template.content.cloneNode(true);
      
      // Fill template with data
      node.querySelectorAll('[data-prop]').forEach(el => {
        const prop = el.dataset.prop;
        const value = item[prop];
        
        if (el.tagName === 'IMG') {
          if (value && value.url) {
            el.src = value.url;
            el.alt = item.name || item.title || '';
          } else if (value && value.id && !CONFIG.CMS.MOCK_MODE) {
            el.src = `${CONFIG.CMS.DIRECTUS_URL}/assets/${value.id}`;
            el.alt = item.name || item.title || '';
          }
        } else {
          el.textContent = value || '';
          
          // Handle HTML content for rich text fields
          if (prop === 'answer' || prop === 'content' || prop === 'bioShort') {
            el.innerHTML = sanitize(value || '', { type: 'basic' });
          }
        }
      });
      
      // Handle special attributes
      node.querySelectorAll('[data-cms-attr]').forEach(el => {
        const attrName = el.dataset.cmsAttr;
        const prop = el.dataset.prop;
        if (item[prop]) {
          el.setAttribute(attrName, item[prop]);
        }
      });
      
      container.appendChild(node);
    });
    
    logger.debug(`Rendered list ${listName}`, { items: items.length });
  });
}

/**
 * Update navigation
 */
export function renderNavigation(navigation) {
  // Render main navigation
  if (navigation.main) {
    const mainNav = document.querySelector('[data-cms-nav="main"]');
    if (mainNav) {
      const links = navigation.main.map(item => 
        `<a href="${item.url}" class="nav-link" ${item.target ? `target="${item.target}"` : ''}>${item.label}</a>`
      ).join('');
      mainNav.innerHTML = links;
    }
  }
  
  // Render footer groups
  if (navigation.footer_groups) {
    navigation.footer_groups.forEach(group => {
      const container = document.querySelector(`[data-cms-footer-group="${group.title}"]`);
      if (container) {
        const links = group.links.map(link => 
          `<a href="${link.url}" class="footer-link">${link.label}</a>`
        ).join('');
        container.innerHTML = `<h4>${group.title}</h4><div class="footer-links">${links}</div>`;
      }
    });
  }
  
  // Render mobile legal block
  if (navigation.mobile_legal_block) {
    const mobileBlock = document.querySelector('[data-cms-mobile-legal]');
    if (mobileBlock) {
      const links = navigation.mobile_legal_block.links.map(link => 
        `<li><a href="${link.url}" class="mobile-legal-link">${link.label}</a></li>`
      ).join('');
      
      mobileBlock.innerHTML = `
        <button class="mobile-legal-toggle ${navigation.mobile_legal_block.collapsed ? '' : 'active'}" aria-expanded="${!navigation.mobile_legal_block.collapsed}">
          ${navigation.mobile_legal_block.title}
          <span class="toggle-icon">+</span>
        </button>
        <ul class="mobile-legal-links ${navigation.mobile_legal_block.collapsed ? 'collapsed' : ''}">${links}</ul>
      `;
      
      // Add toggle functionality
      const toggle = mobileBlock.querySelector('.mobile-legal-toggle');
      const linksList = mobileBlock.querySelector('.mobile-legal-links');
      
      toggle?.addEventListener('click', () => {
        const isCollapsed = linksList.classList.contains('collapsed');
        linksList.classList.toggle('collapsed');
        toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isCollapsed);
        toggle.querySelector('.toggle-icon').textContent = isCollapsed ? '−' : '+';
      });
    }
  }
}

/**
 * Improve accessibility of rendered content
 */
function _improveAccessibility(element) {
  // Add skip links for long content
  const headings = element.querySelectorAll('h2, h3');
  if (headings.length > 3) {
    _addSkipNavigation(element, headings);
  }
  
  // Ensure links have proper attributes
  const links = element.querySelectorAll('a[href^="http"]');
  links.forEach(link => {
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
    }
    if (!link.hasAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
      link.setAttribute('rel', 'noopener');
    }
  });
  
  // Add aria-labels to generic elements if needed
  const genericElements = element.querySelectorAll('div, span');
  genericElements.forEach(el => {
    if (el.textContent.trim() && !el.hasAttribute('aria-label') && !el.hasAttribute('role')) {
      // Only add if it looks like it needs semantic meaning
      if (el.children.length === 0 && el.textContent.length > 50) {
        el.setAttribute('role', 'text');
      }
    }
  });
}

/**
 * Add skip navigation for long content
 */
function _addSkipNavigation(element, headings) {
  const nav = document.createElement('nav');
  nav.className = 'skip-nav';
  nav.setAttribute('aria-label', 'Inhaltsverzeichnis');
  
  const list = document.createElement('ol');
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    li.appendChild(link);
    list.appendChild(li);
  });
  
  nav.appendChild(list);
  element.insertBefore(nav, element.firstChild);
}

/**
 * Apply theme colors from CMS
 */
export function applyTheme(colors) {
  if (!colors) return;
  
  const root = document.documentElement;
  
  Object.entries(colors).forEach(([key, value]) => {
    if (value) {
      root.style.setProperty(`--color-${key}`, value);
    }
  });
  
  logger.debug('Applied theme colors', colors);
}

/**
 * Update page meta information
 */
export function updatePageMeta(meta) {
  if (meta.title) {
    document.title = meta.title;
  }
  
  if (meta.description) {
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
    }
    descMeta.content = meta.description;
  }
  
  logger.debug('Updated page meta', meta);
}