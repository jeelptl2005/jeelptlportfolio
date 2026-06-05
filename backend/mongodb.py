"""
MongoDB Atlas connection using PyMongo.
"""

import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
import logging

logger = logging.getLogger(__name__)

_client = None
_db = None


def get_db():
    """Get MongoDB database instance (singleton)."""
    global _client, _db
    if _db is None:
        try:
            uri = os.environ.get(
                "MONGODB_URI",
                "mongodb+srv://jeelptl0705:msd_07@portfolio.q174pfv.mongodb.net/",
            )
            _client = MongoClient(uri, serverSelectionTimeoutMS=5000)
            # Test connection
            _client.admin.command("ping")
            db_name = os.environ.get("MONGODB_DB", "portfolio")
            _db = _client[db_name]
            logger.info(f"Connected to MongoDB Atlas database: {db_name}")
        except (ConnectionFailure, ServerSelectionTimeoutError) as e:
            logger.error(f"MongoDB connection failed: {e}")
            _db = None
            raise
    return _db


def is_db_connected():
    """Check if MongoDB is connected."""
    try:
        db = get_db()
        if db is not None:
            # Try to ping the database
            db.command("ping")
            return True
    except:
        return False
    return False


def get_collection(name: str):
    """Get a MongoDB collection by name."""
    db = get_db()
    if db is None:
        return None
    return db[name]


def save_contact_message(name, email, subject, message):
    """Save contact message to MongoDB."""
    try:
        col = get_collection("messages")
        if col is None:
            return None

        from datetime import datetime

        doc = {
            "name": name,
            "email": email,
            "subject": subject,
            "message": message,
            "created_at": datetime.utcnow().isoformat(),
            "read": False,
        }
        result = col.insert_one(doc)
        return str(result.inserted_id)
    except Exception as e:
        logger.error(f"Failed to save message to MongoDB: {e}")
        return None


def get_all_messages(limit=100):
    """Get all contact messages from MongoDB."""
    try:
        col = get_collection("messages")
        if col is None:
            return []

        docs = list(col.find({}, {"_id": 0}).sort("created_at", -1).limit(limit))
        return docs
    except Exception as e:
        logger.error(f"Failed to fetch messages: {e}")
        return []
