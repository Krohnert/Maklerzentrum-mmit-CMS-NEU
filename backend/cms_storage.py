"""
CMS Storage Module - MongoDB GridFS Image Handling
Handles image uploads, derivates, and serving
"""
from motor.motor_asyncio import AsyncIOMotorGridFSBucket
from PIL import Image
from io import BytesIO
import uuid
from datetime import datetime, timezone
from typing import Optional, Dict
import logging

logger = logging.getLogger(__name__)


class CMSStorage:
    """
    Image storage using MongoDB GridFS
    Supports auto-generation of derivates (320, 960, 1920px)
    Later switchable to S3 without API changes
    """
    
    def __init__(self, db):
        self.db = db
        self.fs = AsyncIOMotorGridFSBucket(db, bucket_name="cms_images")
        self.derivate_sizes = [320, 960, 1920]
        self.max_file_size = 10 * 1024 * 1024  # 10MB
        self.allowed_types = ['image/jpeg', 'image/png', 'image/webp']
    
    async def upload_image(
        self, 
        file_data: bytes, 
        filename: str, 
        content_type: str,
        alt_text: str = ""
    ) -> Dict:
        """
        Upload image and create derivates
        Returns: { original, derivates, metadata }
        """
        # Validate
        if len(file_data) > self.max_file_size:
            raise ValueError(f"File too large. Max {self.max_file_size / 1024 / 1024}MB")
        
        if content_type not in self.allowed_types:
            raise ValueError(f"Invalid file type. Allowed: {self.allowed_types}")
        
        # Generate unique ID
        image_id = str(uuid.uuid4())
        
        try:
            # Open image with Pillow
            img = Image.open(BytesIO(file_data))
            
            # Convert RGBA to RGB if needed
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Store original
            original_key = f"{image_id}_original"
            await self._store_to_gridfs(original_key, file_data, content_type, {
                "type": "original",
                "image_id": image_id,
                "filename": filename,
                "alt_text": alt_text,
                "width": img.width,
                "height": img.height,
                "uploaded_at": datetime.now(timezone.utc).isoformat()
            })
            
            # Create derivates
            derivates = {}
            for size in self.derivate_sizes:
                derivate_data = await self._create_derivate(img, size)
                derivate_key = f"{image_id}_{size}"
                
                await self._store_to_gridfs(derivate_key, derivate_data, "image/webp", {
                    "type": "derivate",
                    "image_id": image_id,
                    "size": size,
                    "format": "webp"
                })
                
                derivates[str(size)] = f"/api/media/serve/{derivate_key}"
            
            # Store metadata in collection
            await self.db.cms_media.insert_one({
                "_id": image_id,
                "filename": filename,
                "content_type": content_type,
                "alt_text": alt_text,
                "original": {
                    "key": original_key,
                    "url": f"/api/media/serve/{original_key}",
                    "width": img.width,
                    "height": img.height,
                    "size": len(file_data)
                },
                "derivates": derivates,
                "uploaded_at": datetime.now(timezone.utc).isoformat()
            })
            
            logger.info(f"Image uploaded successfully: {image_id}")
            
            return {
                "id": image_id,
                "original": f"/api/media/serve/{original_key}",
                "derivates": derivates,
                "alt_text": alt_text
            }
            
        except Exception as e:
            logger.error(f"Error uploading image: {e}")
            raise
    
    async def _create_derivate(self, img: Image.Image, max_width: int) -> bytes:
        """Create resized derivate as WebP"""
        # Calculate new size maintaining aspect ratio
        ratio = max_width / img.width
        new_height = int(img.height * ratio)
        
        # Resize
        resized = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        
        # Convert to WebP
        output = BytesIO()
        resized.save(output, format='WEBP', quality=80, method=6)
        output.seek(0)
        
        return output.read()
    
    async def _store_to_gridfs(self, key: str, data: bytes, content_type: str, metadata: dict):
        """Store file in GridFS"""
        await self.fs.upload_from_stream(
            key,
            BytesIO(data),
            metadata={
                "content_type": content_type,
                **metadata
            }
        )
    
    async def get_file(self, key: str) -> Optional[tuple]:
        """
        Get file from GridFS
        Returns: (data, content_type) or None
        """
        try:
            grid_out = await self.fs.open_download_stream_by_name(key)
            data = await grid_out.read()
            content_type = grid_out.metadata.get('content_type', 'application/octet-stream')
            return (data, content_type)
        except Exception as e:
            logger.error(f"Error retrieving file {key}: {e}")
            return None
    
    async def delete_image(self, image_id: str) -> bool:
        """Delete image and all derivates"""
        try:
            # Get metadata
            meta = await self.db.cms_media.find_one({"_id": image_id})
            if not meta:
                return False
            
            # Delete original
            await self._delete_from_gridfs(meta['original']['key'])
            
            # Delete derivates
            for size in self.derivate_sizes:
                await self._delete_from_gridfs(f"{image_id}_{size}")
            
            # Delete metadata
            await self.db.cms_media.delete_one({"_id": image_id})
            
            logger.info(f"Image deleted: {image_id}")
            return True
            
        except Exception as e:
            logger.error(f"Error deleting image {image_id}: {e}")
            return False
    
    async def _delete_from_gridfs(self, key: str):
        """Delete file from GridFS by name"""
        try:
            cursor = self.fs.find({"filename": key})
            async for grid_file in cursor:
                await self.fs.delete(grid_file._id)
        except Exception as e:
            logger.error(f"Error deleting from GridFS: {e}")
    
    async def list_media(self, skip: int = 0, limit: int = 50) -> list:
        """List all media with pagination"""
        cursor = self.db.cms_media.find().sort("uploaded_at", -1).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)
