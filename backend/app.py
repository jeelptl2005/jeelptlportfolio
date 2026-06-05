from flask import Flask, request, jsonify
from flask_cors import CORS
import resend
import os
from datetime import datetime
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)
CORS(app, origins="*")

# Resend
resend.api_key = os.environ.get("RESEND_API_KEY")

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
        # Email to user
        resend.Emails.send({
            "from": "Jeel Patel <onboarding@resend.dev>",
            "to": os.environ.get("GMAIL"),
            "subject": "Message Received - Jeel Portfolio",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #3b82f6;">Thank You, {name}!</h2>
                <p>I have received your message regarding <strong>"{subject}"</strong>.</p>
                <p>I will get back to you within <strong>24-48 hours</strong>.</p>
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                    <p><strong>Your Message:</strong></p>
                    <p>{message}</p>
                </div>
                <p style="color: #666;">Best regards,<br><strong>Jeel Patel</strong><br>Data Science Student | Parul University</p>
            </div>
            """
        })

        # Email to owner
        resend.Emails.send({
            "from": "Portfolio Contact <onboarding@resend.dev>",
            "to": os.environ.get("GMAIL"),
            "subject": f"New Contact: {subject} from {name}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px;">
                <h2 style="color: #3b82f6;">New Message from Portfolio!</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Subject:</strong> {subject}</p>
                <p><strong>Message:</strong> {message}</p>
                <p><strong>Time:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            </div>
            """
        })

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
            if messages_collection is not None:
                message_doc = {
                    "name": name,
                    "email": email,
                    "subject": subject,
                    "message": message,
                    "created_at": datetime.now().isoformat(),
                    "read": False,
                }
                messages_collection.insert_one(message_doc)
                print(f"Saved to MongoDB: {name}")
        except Exception as mongo_error:
            print(f"MongoDB error: {mongo_error}")

        email_sent = send_emails(name, email, subject, message)

        if email_sent:
            return jsonify({"success": True, "message": "Message sent successfully! Check your email for confirmation."}), 200
        else:
            return jsonify({"success": True, "message": "Message sent successfully!)"}), 200

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
