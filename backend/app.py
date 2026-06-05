from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from datetime import datetime
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)

CORS(app, origins="*")

# Email Configuration
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = os.environ.get("GMAIL", "")
app.config["MAIL_PASSWORD"] = os.environ.get("GMAIL_PASS", "")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("GMAIL", "")

mail = Mail(app)

# MongoDB
MONGODB_URI = os.environ.get("MONGODB_URI")
try:
    client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    db = client["portfolio"]
    messages_collection = db["messages"]
except Exception as e:
    print(f"MongoDB connection error: {e}")
    messages_collection = None


def send_emails(name, email, subject, message):
    try:
        user_html = f"""
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
            <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #3b82f6; margin-top: 0;">Thank You, {name}! 🙏</h2>
                <p>I have received your message regarding <strong>"{subject}"</strong>.</p>
                <p>I will get back to you within <strong>24-48 hours</strong>.</p>
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                    <p style="margin: 0; color: #166534;"><strong>Your Message:</strong></p>
                    <p style="margin: 5px 0 0 0; color: #14532d;">{message}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="color: #666; margin-bottom: 0;">Best regards,<br><strong>Jeel Patel</strong><br>Data Science Student | Parul University</p>
            </div>
        </body>
        </html>
        """
        user_msg = Message(
            subject="Message Received - Jeel Portfolio",
            recipients=[email],
            html=user_html,
        )
        mail.send(user_msg)

        owner_html = f"""
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
            <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #3b82f6; margin-top: 0;">📬 New Message from Portfolio!</h2>
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>👤 Name:</strong> {name}</p>
                    <p><strong>📧 Email:</strong> {email}</p>
                    <p><strong>📌 Subject:</strong> {subject}</p>
                    <p><strong>💬 Message:</strong></p>
                    <p style="background: white; padding: 10px; border-radius: 5px;">{message}</p>
                    <p><strong>🕐 Time:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                </div>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="color: #666; margin-bottom: 0;">Reply to: <a href="mailto:{email}" style="color: #3b82f6;">{email}</a></p>
            </div>
        </body>
        </html>
        """
        owner_msg = Message(
            subject=f"New Contact: {subject} from {name}",
            recipients=[os.environ.get("PORTFOLIO_EMAIL", "jeelptl2005@gmail.com")],
            html=owner_html,
        )
        mail.send(owner_msg)
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False


@app.route("/api/contact", methods=["POST"])
def contact():
    try:
        data = request.get_json()
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        subject = data.get("subject", "").strip()
        message = data.get("message", "").strip()

        if not all([name, email, subject, message]):
            return jsonify({"success": False, "message": "All fields are required."}), 400

        try:
            message_doc = {
                "name": name,
                "email": email,
                "subject": subject,
                "message": message,
                "created_at": datetime.now().isoformat(),
                "read": False,
            }
            if messages_collection is not None:
                messages_collection.insert_one(message_doc)
            print(f"Saved to MongoDB: {name}")
        except Exception as mongo_error:
            print(f"MongoDB error: {mongo_error}")

        email_sent = send_emails(name, email, subject, message)

        if email_sent:
            return jsonify({"success": True, "message": "Message sent successfully! Check your email for confirmation."}), 200
        else:
            return jsonify({"success": True, "message": "Message received! (Email notification pending)"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"success": False, "message": "An error occurred. Please try again later."}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()}), 200


@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({"message": "API is working!", "status": "ok"}), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
