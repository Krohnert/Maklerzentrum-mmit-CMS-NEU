/**
 * HTML Sanitizer - Self-hosted DOMPurify alternative for legal content
 */

import { logger } from './config.js';

/**
 * Basic HTML sanitizer for legal content
 * This is a lightweight alternative to DOMPurify for our specific use case
 */
class HTMLSanitizer {
  constructor() {
    // Allowed HTML tags for legal content
    this.allowedTags = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr',
      'ul', 'ol', 'li',
      'strong', 'b', 'em', 'i', 'u',
      'a', 'span', 'div',
      'address', 'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'nav', 'section', 'article',
      'small', 'sup', 'sub'
    ];

    // Allowed attributes
    this.allowedAttributes = {
      'a': ['href', 'title', 'target', 'rel'],
      'div': ['class', 'id'],
      'span': ['class'],
      'h1': ['id'],
      'h2': ['id'],
      'h3': ['id'],
      'h4': ['id'],
      'h5': ['id'],
      'h6': ['id'],
      'section': ['class', 'id'],
      'nav': ['aria-label', 'class'],
      'ol': ['class'],
      'ul': ['class'],
      'li': ['class'],
      'table': ['class'],
      'thead': ['class'],
      'tbody': ['class'],
      'tr': ['class'],
      'th': ['class'],
      'td': ['class']
    };

    // Protocol whitelist for links
    this.allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  }

  /**
   * Sanitize HTML content
   */
  sanitize(html) {
    if (!html || typeof html !== 'string') {
      return '';
    }

    try {
      // Create a temporary DOM element
      const temp = document.createElement('div');
      temp.innerHTML = html;
      
      // Recursively sanitize
      this._sanitizeNode(temp);
      
      return temp.innerHTML;
    } catch (error) {
      logger.error('HTML sanitization failed:', error);
      return this._stripAllTags(html);
    }
  }

  /**
   * Recursively sanitize DOM nodes
   */
  _sanitizeNode(node) {
    const nodesToRemove = [];
    
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];
      
      if (child.nodeType === Node.ELEMENT_NODE) {
        const tagName = child.tagName.toLowerCase();
        
        if (!this.allowedTags.includes(tagName)) {
          // Remove disallowed tags but keep content
          while (child.firstChild) {
            node.insertBefore(child.firstChild, child);
          }
          nodesToRemove.push(child);
          continue;
        }
        
        // Sanitize attributes
        this._sanitizeAttributes(child);
        
        // Recursively sanitize child nodes
        this._sanitizeNode(child);
      }
    }
    
    // Remove marked nodes
    nodesToRemove.forEach(node => node.remove());
  }

  /**
   * Sanitize attributes of an element
   */
  _sanitizeAttributes(element) {
    const tagName = element.tagName.toLowerCase();
    const allowedAttrs = this.allowedAttributes[tagName] || [];
    
    // Get all attributes
    const attrs = Array.from(element.attributes);
    
    attrs.forEach(attr => {
      const name = attr.name.toLowerCase();
      
      if (!allowedAttrs.includes(name)) {
        element.removeAttribute(attr.name);
        return;
      }
      
      // Special handling for href attributes
      if (name === 'href') {
        const value = attr.value.trim();
        
        // Check for javascript: or other dangerous protocols
        if (value.startsWith('javascript:') || value.startsWith('data:') || value.startsWith('vbscript:')) {
          element.removeAttribute(attr.name);
          return;
        }
        
        // Validate protocols
        if (value.includes(':')) {
          const protocol = value.split(':')[0].toLowerCase() + ':';
          if (!this.allowedProtocols.includes(protocol)) {
            element.removeAttribute(attr.name);
            return;
          }
        }
      }
      
      // Special handling for target attribute
      if (name === 'target' && attr.value === '_blank') {
        // Add rel="noopener" for security
        if (!element.hasAttribute('rel')) {
          element.setAttribute('rel', 'noopener');
        } else {
          const rel = element.getAttribute('rel');
          if (!rel.includes('noopener')) {
            element.setAttribute('rel', rel + ' noopener');
          }
        }
      }
    });
  }

  /**
   * Strip all HTML tags (fallback)
   */
  _stripAllTags(html) {
    return html.replace(/<[^>]*>/g, '');
  }

  /**
   * Sanitize for specific content types
   */
  sanitizeForLegal(html) {
    // Legal content allows more formatting
    return this.sanitize(html);
  }

  sanitizeForBasic(html) {
    // Basic content - more restrictive
    const originalAllowed = [...this.allowedTags];
    this.allowedTags = ['p', 'br', 'strong', 'em', 'a'];
    
    const result = this.sanitize(html);
    
    // Restore original settings
    this.allowedTags = originalAllowed;
    
    return result;
  }
}

// Global sanitizer instance
const sanitizer = new HTMLSanitizer();

/**
 * Main sanitize function
 */
export function sanitize(html, options = {}) {
  const { type = 'legal' } = options;
  
  switch (type) {
    case 'basic':
      return sanitizer.sanitizeForBasic(html);
    case 'legal':
    default:
      return sanitizer.sanitizeForLegal(html);
  }
}

/**
 * Sanitize and set innerHTML safely
 */
export function setSafeHTML(element, html, options = {}) {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  
  if (element) {
    element.innerHTML = sanitize(html, options);
  }
}

export default sanitizer;