import os
from dotenv import load_dotenv

load_dotenv()


# Configuration class
class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "your-secret-key-here")

    # MongoDB Atlas Configuration
    MONGODB_URI = os.environ.get(
        "MONGODB_URI", "mongodb+srv://jeelptl0705:msd_07@portfolio.q174pfv.mongodb.net/"
    )
    MONGODB_DB = os.environ.get("MONGODB_DB", "portfolio")

    # Frontend URLs (CORS allowed origins)
    FRONTEND_URLS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://jeelpatel-nine.vercel.app",
        "https://jeelpatel.vercel.app",
    ]

    # Email Configuration
    MAIL_SERVER = os.environ.get("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.environ.get("MAIL_PORT", 587))
    MAIL_USE_TLS = os.environ.get("MAIL_USE_TLS", True)
    MAIL_USERNAME = os.environ.get("GMAIL", "your-email@gmail.com")
    MAIL_PASSWORD = os.environ.get("GMAIL_PASS", "your-app-password")
    MAIL_DEFAULT_SENDER = os.environ.get("GMAIL", "your-email@gmail.com")

    # Admin email to receive messages
    ADMIN_EMAIL = os.environ.get("PORTFOLIO_EMAIL", "jeelptl2005@gmail.com")


# Create config object
config = Config()
