"""
CMS Authentication Module
Handles user management, password hashing, and sessions
"""
from passlib.context import CryptContext
from datetime import datetime, timezone, timedelta
from typing import Optional
import secrets
import uuid
import logging

logger = logging.getLogger(__name__)

# Password hashing with argon2id
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


class CMSAuth:
    """
    Admin authentication and session management
    """
    
    def __init__(self, db):
        self.db = db
        self.session_timeout = 30  # minutes
        self.session_extended = 12 * 60  # 12 hours for "remember me"
    
    async def seed_admin_users(self):
        """
        Seed initial admin users
        Only runs if users collection is empty
        """
        count = await self.db.cms_users.count_documents({})
        if count > 0:
            logger.info("Admin users already exist, skipping seed")
            return
        
        initial_admins = [
            {
                "_id": str(uuid.uuid4()),
                "email": "fk@comrocket.de",
                "role": "admin",
                "mustResetPassword": True,
                "createdAt": datetime.now(timezone.utc).isoformat()
            },
            {
                "_id": str(uuid.uuid4()),
                "email": "ao@comrocket.de",
                "role": "admin",
                "mustResetPassword": True,
                "createdAt": datetime.now(timezone.utc).isoformat()
            },
            {
                "_id": str(uuid.uuid4()),
                "email": "dk@mapi.ch",
                "role": "admin",
                "mustResetPassword": True,
                "createdAt": datetime.now(timezone.utc).isoformat()
            }
        ]
        
        # Hash initial password: Com_2024!
        initial_password_hash = pwd_context.hash("Com_2024!")
        
        for admin in initial_admins:
            admin["passwordHash"] = initial_password_hash
            await self.db.cms_users.insert_one(admin)
        
        logger.info(f"✅ Seeded {len(initial_admins)} admin users")
    
    def hash_password(self, password: str) -> str:
        """Hash password with argon2id"""
        return pwd_context.hash(password)
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify password against hash"""
        return pwd_context.verify(plain_password, hashed_password)
    
    async def authenticate_user(self, email: str, password: str) -> Optional[dict]:
        """
        Authenticate user by email and password
        Returns user dict or None
        """
        user = await self.db.cms_users.find_one({"email": email})
        if not user:
            logger.warning(f"Login attempt for non-existent user: {email}")
            return None
        
        if not self.verify_password(password, user["passwordHash"]):
            logger.warning(f"Failed login attempt for user: {email}")
            return None
        
        # Update last login
        await self.db.cms_users.update_one(
            {"_id": user["_id"]},
            {"$set": {"lastLogin": datetime.now(timezone.utc).isoformat()}}
        )
        
        logger.info(f"✅ User authenticated: {email}")
        
        # Remove password hash before returning
        user.pop("passwordHash", None)
        return user
    
    async def create_session(
        self, 
        user_id: str, 
        email: str, 
        ip_address: str = "",
        user_agent: str = "",
        remember_me: bool = False
    ) -> str:
        """
        Create session and return session ID
        """
        session_id = secrets.token_urlsafe(32)
        timeout_minutes = self.session_extended if remember_me else self.session_timeout
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=timeout_minutes)
        
        await self.db.cms_sessions.insert_one({
            "_id": session_id,
            "userId": user_id,
            "email": email,
            "ipAddress": ip_address,
            "userAgent": user_agent,
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "expiresAt": expires_at.isoformat(),
            "lastActivity": datetime.now(timezone.utc).isoformat()
        })
        
        logger.info(f"✅ Session created for user: {email}")
        return session_id
    
    async def get_session(self, session_id: str) -> Optional[dict]:
        """
        Get session by ID
        Returns session dict or None if expired/invalid
        """
        session = await self.db.cms_sessions.find_one({"_id": session_id})
        if not session:
            return None
        
        # Check expiration
        expires_at = datetime.fromisoformat(session["expiresAt"])
        if expires_at < datetime.now(timezone.utc):
            # Session expired, delete it
            await self.db.cms_sessions.delete_one({"_id": session_id})
            logger.info(f"Session expired: {session_id}")
            return None
        
        # Update last activity
        await self.db.cms_sessions.update_one(
            {"_id": session_id},
            {"$set": {"lastActivity": datetime.now(timezone.utc).isoformat()}}
        )
        
        return session
    
    async def delete_session(self, session_id: str) -> bool:
        """Delete session (logout)"""
        result = await self.db.cms_sessions.delete_one({"_id": session_id})
        return result.deleted_count > 0
    
    async def get_user(self, user_id: str) -> Optional[dict]:
        """Get user by ID (without password hash)"""
        user = await self.db.cms_users.find_one({"_id": user_id})
        if user:
            user.pop("passwordHash", None)
        return user
    
    async def reset_password(self, user_id: str, old_password: str, new_password: str) -> bool:
        """
        Reset user password (with verification of old password)
        """
        user = await self.db.cms_users.find_one({"_id": user_id})
        if not user:
            return False
        
        # Verify old password
        if not self.verify_password(old_password, user["passwordHash"]):
            logger.warning(f"Invalid old password for user: {user['email']}")
            return False
        
        # Update password and remove mustResetPassword flag
        new_hash = self.hash_password(new_password)
        await self.db.cms_users.update_one(
            {"_id": user_id},
            {
                "$set": {
                    "passwordHash": new_hash,
                    "mustResetPassword": False,
                    "passwordChangedAt": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        logger.info(f"✅ Password reset for user: {user['email']}")
        return True
    
    async def cleanup_expired_sessions(self):
        """Delete all expired sessions (maintenance task)"""
        now = datetime.now(timezone.utc).isoformat()
        result = await self.db.cms_sessions.delete_many({"expiresAt": {"$lt": now}})
        if result.deleted_count > 0:
            logger.info(f"Cleaned up {result.deleted_count} expired sessions")
