"""
CMS Content Management Module
Handles all content CRUD operations for pages, modules, FAQ, team, etc.
"""
from typing import Optional, List, Dict
from datetime import datetime, timezone
import logging

logger = logging.getLogger(__name__)


class CMSContent:
    """
    Content management for CMS
    Supports multilingual content (de-CH, fr-CH, it-CH)
    """
    
    SUPPORTED_LOCALES = ['de-CH', 'fr-CH', 'it-CH']
    DEFAULT_LOCALE = 'de-CH'
    
    def __init__(self, db):
        self.db = db
    
    # ============================================
    # SITE GLOBAL (language-independent)
    # ============================================
    
    async def get_site_global(self) -> Dict:
        """Get global site settings"""
        doc = await self.db.cms_site_global.find_one({"_id": "global"})
        if not doc:
            # Create default
            doc = {
                "_id": "global",
                "colors": {
                    "primary": "#D81C1C",
                    "secondary": "#707070"
                },
                "contact": {
                    "email": "academy@maklerzentrum.ch",
                    "phone": "+41799486986"
                },
                "external": {
                    "loginUrl": "https://reteach.ch/login"
                },
                "preview": {
                    "showCmsLink": True
                },
                "seo": {
                    "ogImage": ""
                }
            }
            await self.db.cms_site_global.insert_one(doc)
        
        return doc
    
    async def update_site_global(self, data: Dict) -> bool:
        """Update global site settings"""
        try:
            await self.db.cms_site_global.update_one(
                {"_id": "global"},
                {"$set": {**data, "updatedAt": datetime.now(timezone.utc).isoformat()}},
                upsert=True
            )
            return True
        except Exception as e:
            logger.error(f"Error updating site global: {e}")
            return False
    
    # ============================================
    # SITE LOCALIZED (per language)
    # ============================================
    
    async def get_site_localized(self, locale: str) -> Dict:
        """Get localized site settings"""
        doc = await self.db.cms_site_localized.find_one({"_id": locale})
        if not doc:
            # Create default
            doc = {
                "_id": locale,
                "locale": locale,
                "brandName": "Maklerzentrum Schweiz AG",
                "seo": {
                    "defaultTitle": "VBV Ausbildung Schweiz",
                    "defaultDescription": "Professionelle VBV-Ausbildung",
                    "ogLocale": locale
                },
                "legal": {
                    "imprintHtml": "<p>Impressum</p>",
                    "privacyHtml": "<p>Datenschutz</p>",
                    "termsHtml": "<p>AGB</p>",
                    "cookieConsentText": "Wir verwenden Cookies"
                }
            }
            await self.db.cms_site_localized.insert_one(doc)
        
        return doc
    
    async def update_site_localized(self, locale: str, data: Dict) -> bool:
        """Update localized site settings"""
        try:
            await self.db.cms_site_localized.update_one(
                {"_id": locale},
                {"$set": {**data, "locale": locale, "updatedAt": datetime.now(timezone.utc).isoformat()}},
                upsert=True
            )
            return True
        except Exception as e:
            logger.error(f"Error updating site localized: {e}")
            return False
    
    # ============================================
    # PAGES (Home, Schulung, Services, About, Kontakt)
    # ============================================
    
    async def get_page(self, locale: str, page_id: str) -> Optional[Dict]:
        """Get page content"""
        return await self.db.cms_pages.find_one({"locale": locale, "pageId": page_id})
    
    async def update_page(self, locale: str, page_id: str, content: Dict, user_email: str) -> bool:
        """Update page content"""
        try:
            await self.db.cms_pages.update_one(
                {"locale": locale, "pageId": page_id},
                {
                    "$set": {
                        "locale": locale,
                        "pageId": page_id,
                        "content": content,
                        "updatedAt": datetime.now(timezone.utc).isoformat(),
                        "updatedBy": user_email
                    }
                },
                upsert=True
            )
            return True
        except Exception as e:
            logger.error(f"Error updating page: {e}")
            return False
    
    # ============================================
    # MODULES
    # ============================================
    
    async def list_modules(self, locale: str) -> List[Dict]:
        """List all modules for locale"""
        cursor = self.db.cms_modules.find({"locale": locale}).sort("order", 1)
        return await cursor.to_list(length=100)
    
    async def get_module(self, module_id: str) -> Optional[Dict]:
        """Get single module"""
        return await self.db.cms_modules.find_one({"_id": module_id})
    
    async def create_module(self, locale: str, data: Dict, user_email: str) -> Optional[str]:
        """Create new module"""
        try:
            import uuid
            module_id = str(uuid.uuid4())
            
            doc = {
                "_id": module_id,
                "locale": locale,
                "slug": data.get("slug", ""),
                "title": data.get("title", ""),
                "format": data.get("format", "online"),
                "durationDays": data.get("durationDays", 1),
                "bullets": data.get("bullets", []),
                "order": data.get("order", 999),
                "visible": data.get("visible", True),
                "createdAt": datetime.now(timezone.utc).isoformat(),
                "createdBy": user_email
            }
            
            await self.db.cms_modules.insert_one(doc)
            return module_id
        except Exception as e:
            logger.error(f"Error creating module: {e}")
            return None
    
    async def update_module(self, module_id: str, data: Dict, user_email: str) -> bool:
        """Update module"""
        try:
            await self.db.cms_modules.update_one(
                {"_id": module_id},
                {
                    "$set": {
                        **data,
                        "updatedAt": datetime.now(timezone.utc).isoformat(),
                        "updatedBy": user_email
                    }
                }
            )
            return True
        except Exception as e:
            logger.error(f"Error updating module: {e}")
            return False
    
    async def delete_module(self, module_id: str) -> bool:
        """Delete module"""
        try:
            result = await self.db.cms_modules.delete_one({"_id": module_id})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Error deleting module: {e}")
            return False
    
    async def reorder_modules(self, module_ids: List[str]) -> bool:
        """Reorder modules"""
        try:
            for index, module_id in enumerate(module_ids):
                await self.db.cms_modules.update_one(
                    {"_id": module_id},
                    {"$set": {"order": index}}
                )
            return True
        except Exception as e:
            logger.error(f"Error reordering modules: {e}")
            return False
    
    # ============================================
    # FAQ
    # ============================================
    
    async def list_faq(self, locale: str) -> List[Dict]:
        """List all FAQ for locale"""
        cursor = self.db.cms_faq.find({"locale": locale}).sort("order", 1)
        return await cursor.to_list(length=200)
    
    async def create_faq(self, locale: str, data: Dict, user_email: str) -> Optional[str]:
        """Create new FAQ"""
        try:
            import uuid
            faq_id = str(uuid.uuid4())
            
            doc = {
                "_id": faq_id,
                "locale": locale,
                "question": data.get("question", ""),
                "answer": data.get("answer", ""),
                "topic": data.get("topic", "allgemein"),
                "featured": data.get("featured", False),
                "order": data.get("order", 999),
                "visible": data.get("visible", True),
                "createdAt": datetime.now(timezone.utc).isoformat(),
                "createdBy": user_email
            }
            
            await self.db.cms_faq.insert_one(doc)
            return faq_id
        except Exception as e:
            logger.error(f"Error creating FAQ: {e}")
            return None
    
    async def update_faq(self, faq_id: str, data: Dict, user_email: str) -> bool:
        """Update FAQ"""
        try:
            await self.db.cms_faq.update_one(
                {"_id": faq_id},
                {
                    "$set": {
                        **data,
                        "updatedAt": datetime.now(timezone.utc).isoformat(),
                        "updatedBy": user_email
                    }
                }
            )
            return True
        except Exception as e:
            logger.error(f"Error updating FAQ: {e}")
            return False
    
    async def delete_faq(self, faq_id: str) -> bool:
        """Delete FAQ"""
        try:
            result = await self.db.cms_faq.delete_one({"_id": faq_id})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Error deleting FAQ: {e}")
            return False
    
    async def reorder_faq(self, faq_ids: List[str]) -> bool:
        """Reorder FAQ"""
        try:
            for index, faq_id in enumerate(faq_ids):
                await self.db.cms_faq.update_one(
                    {"_id": faq_id},
                    {"$set": {"order": index}}
                )
            return True
        except Exception as e:
            logger.error(f"Error reordering FAQ: {e}")
            return False
    
    # Similar methods for Team, Events, etc. would follow the same pattern...
