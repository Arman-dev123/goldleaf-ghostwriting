# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import mysql.connector
# from mysql.connector import Error
# from datetime import datetime
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# import os


# app = Flask(__name__)

# CORS(
#     app,
#     resources={r"/api/*": {"origins": "*"}},
#     supports_credentials=False
# )

# # Database configuration
# DB_CONFIG = {
#     'host': 'localhost',
#     'user': 'arman',  # Replace with your MySQL username
#     'password': 'ppll99881234',  # Replace with your MySQL password
#     'database': 'goldleaf_ghostwriting'
# }

# # Email configuration (optional - for sending confirmation emails)
# EMAIL_CONFIG = {
#     'smtp_server': 'smtp.gmail.com',  # Replace with your SMTP server
#     'smtp_port': 587,
#     'sender_email':'k228708@nu.edu.pk',

#     'sender_password': 'nrji vnkc znto qouu'  # Replace with your email password/app password
# }

# def get_db_connection():
#     """Create and return a database connection"""
#     try:
#         connection = mysql.connector.connect(**DB_CONFIG)
#         return connection
#     except Error as e:
#         print(f"Database connection error: {e}")
#         return None

# def send_confirmation_email(data):
#     """Send confirmation email to the user"""
#     try:
#         # Create message
#         message = MIMEMultipart()
#         message['From'] = EMAIL_CONFIG['sender_email']
#         message['To'] = data['email']
#         message['Subject'] = f"Meeting Confirmation - {data['service_type']}"

#         # Email body
#         body = f"""
#         Dear {data['name']},

#         Thank you for scheduling a meeting with us!

#         Meeting Details:
#         - Service: {data['service_type']}
#         - Date: {data['meeting_date']}
#         - Time: {data['meeting_time']}
#         - Genre: {data.get('genre', 'N/A')}
#         - Word Count: {data.get('word_count', 'N/A')}

#         Project Details:
#         {data.get('message', 'No additional details provided')}

#         We look forward to speaking with you. If you need to reschedule or have any questions, 
#         please contact us at 0308-3255440 or reply to this email.

#         Best regards,
#         Your Company Team
#         """

#         message.attach(MIMEText(body, 'plain'))

#         # Send email
#         with smtplib.SMTP(EMAIL_CONFIG['smtp_server'], EMAIL_CONFIG['smtp_port']) as server:
#             server.starttls()
#             server.login(EMAIL_CONFIG['sender_email'], EMAIL_CONFIG['sender_password'])
#             server.send_message(message)
        
#         print(f"Confirmation email sent to {data['email']}")
#         return True
#     except Exception as e:
#         print(f"Email sending error: {e}")
#         return False

# @app.route('/api/schedule-meeting', methods=['POST', 'OPTIONS'])
# def schedule_meeting():
#     """Handle meeting scheduling requests"""
    
#     # Handle preflight OPTIONS request
#     if request.method == 'OPTIONS':
#         return '', 204
    
#     try:
#         # Get data from request
#         data = request.get_json()
        
#         # Validate required fields
#         required_fields = ['name', 'email', 'service_type', 'meeting_date', 'meeting_time']
#         for field in required_fields:
#             if not data.get(field):
#                 return jsonify({'error': f'Missing required field: {field}'}), 400
        
#         # Validate service type
#         valid_services = ['Ghostwriting', 'Book Design', 'Web Design', 'Other']
#         if data['service_type'] not in valid_services:
#             return jsonify({'error': 'Invalid service type'}), 400
        
#         # Validate date format
#         try:
#             meeting_date = datetime.strptime(data['meeting_date'], '%Y-%m-%d').date()
#             # Check if it's a weekday (Monday=0, Sunday=6)
#             if meeting_date.weekday() >= 5:  # Saturday or Sunday
#                 return jsonify({'error': 'Please select a weekday (Monday-Friday)'}), 400
#         except ValueError:
#             return jsonify({'error': 'Invalid date format'}), 400
        
#         # Validate time format
#         try:
#             meeting_time = datetime.strptime(data['meeting_time'], '%H:%M:%S').time()
#         except ValueError:
#             return jsonify({'error': 'Invalid time format'}), 400
        
#         # Convert word_count to int if provided
#         word_count = None
#         if data.get('word_count'):
#             try:
#                 word_count = int(data['word_count'])
#             except (ValueError, TypeError):
#                 return jsonify({'error': 'Invalid word count'}), 400
        
#         # Connect to database
#         connection = get_db_connection()
#         if not connection:
#             return jsonify({'error': 'Database connection failed'}), 500
        
#         cursor = connection.cursor()
        
#         # Insert data into database
#         insert_query = """
#             INSERT INTO leads 
#         (name, email, service_type, genre, word_count, message, meeting_date, meeting_time)
#         VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
#         """

        
#         values = (
#             data['name'],
#             data['email'],
#             data['service_type'],
#             data.get('genre') or None,
#             word_count,
#             data.get('message') or None,
#             data['meeting_date'],
#             data['meeting_time']
#         )
        
#         cursor.execute(insert_query, values)
#         connection.commit()
        
#         meeting_id = cursor.lastrowid
        
#         # Close database connection
#         cursor.close()
#         connection.close()
        
#         # Send confirmation email (optional)
#         # Uncomment and configure EMAIL_CONFIG to enable
#         # send_confirmation_email(data)
        
#         return jsonify({
#             'success': True,
#             'message': 'Meeting scheduled successfully',
#             'meeting_id': meeting_id
#         }), 201
        
#     except Error as e:
#         print(f"Database error: {e}")
#         return jsonify({'error': 'Database error occurred'}), 500
    
#     except Exception as e:
#         print(f"Unexpected error: {e}")
#         return jsonify({'error': 'An unexpected error occurred'}), 500

# @app.route('/api/test', methods=['GET'])
# def test():
#     """Test endpoint to check if API is working"""
#     return jsonify({
#         'status': 'success',
#         'message': 'API is working!',
#         'timestamp': datetime.now().isoformat()
#     })

# @app.route('/api/available-slots', methods=['GET'])
# def available_slots():
#     """Return available meeting time slots"""
#     slots = [
#         '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
#         '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
#         '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
#     ]
#     return jsonify({'slots': slots})

# @app.errorhandler(404)
# def not_found(error):
#     return jsonify({'error': 'Endpoint not found'}), 404

# @app.errorhandler(500)
# def internal_error(error):
#     return jsonify({'error': 'Internal server error'}), 500

# if __name__ == '__main__':
#     print("Starting Flask server...")
#     print("Server will run on http://127.0.0.1:5000")
#     print("Make sure your database is configured correctly!")
#     app.run(debug=True, host='127.0.0.1', port=5000)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import mysql.connector
# from mysql.connector import Error
# from datetime import datetime
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# import os
# from dotenv import load_dotenv
# load_dotenv()

# app = Flask(__name__)

# # Updated CORS to be more permissive for local development
# CORS(app)

# # Database configuration
# DB_CONFIG = {
#     'host': os.getenv('DB_HOST', 'localhost'),
#     'user': os.getenv('DB_USER', 'arman'),
#     'password': os.getenv('DB_PASSWORD', 'ppll99881234'),
#     'database': os.getenv('DB_NAME', 'goldleaf_ghostwriting'),
#     'port': int(os.getenv('DB_PORT', 3306))
# }

# # Email configuration
# EMAIL_CONFIG = {
#     'smtp_server': 'smtp.gmail.com',
#     'smtp_port': 587,
#     'sender_email': 'k228708@nu.edu.pk',
#     'sender_password': 'nrji vnkc znto qouu'
# }

# def get_db_connection():
#     try:
#         connection = mysql.connector.connect(**DB_CONFIG)
#         return connection
#     except Error as e:
#         print(f"Database connection error: {e}")
#         return None

# @app.route('/')
# def home():
#     return jsonify({"message": "Gold Leaf API is running. Use /api/test to verify."})

# @app.route('/api/test', methods=['GET'])
# def test():
#     return jsonify({
#         'status': 'success',
#         'message': 'API is working!',
#         'timestamp': datetime.now().isoformat()
#     })

# @app.route('/api/available-slots', methods=['GET'])
# def available_slots():
#     slots = [
#         '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
#         '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
#         '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
#     ]
#     return jsonify({'slots': slots})

# @app.route('/api/schedule-meeting', methods=['POST', 'OPTIONS'])
# def schedule_meeting():
#     if request.method == 'OPTIONS':
#         return '', 204
    
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({'error': 'No data provided'}), 400

#         # 1. Validate required fields
#         required_fields = ['name', 'email', 'service_type', 'meeting_date', 'meeting_time']
#         for field in required_fields:
#             if not data.get(field):
#                 return jsonify({'error': f'Missing required field: {field}'}), 400
        
#         # 2. Flexible Time Validation (Fixes the 400 Error)
#         # Tries HH:MM (09:30) first, then HH:MM:SS (09:30:00)
#         meeting_time_str = data['meeting_time']
#         try:
#             if len(meeting_time_str.split(':')) == 2:
#                 meeting_time = datetime.strptime(meeting_time_str, '%H:%M').time()
#             else:
#                 meeting_time = datetime.strptime(meeting_time_str, '%H:%M:%S').time()
#         except ValueError:
#             return jsonify({'error': 'Invalid time format. Use HH:MM or HH:MM:SS'}), 400

#         # 3. Date Validation
#         try:
#             meeting_date = datetime.strptime(data['meeting_date'], '%Y-%m-%d').date()
#             if meeting_date.weekday() >= 5:
#                 return jsonify({'error': 'Meetings are only available Monday-Friday'}), 400
#         except ValueError:
#             return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

#         # 4. Word Count Conversion
#         word_count = None
#         if data.get('word_count'):
#             try:
#                 word_count = int(data['word_count'])
#             except (ValueError, TypeError):
#                 word_count = None

#         # 5. Database Operation
#         connection = get_db_connection()
#         if not connection:
#             return jsonify({'error': 'Database connection failed'}), 500
        
#         cursor = connection.cursor()
#         insert_query = """
#             INSERT INTO leads 
#             (name, email, service_type, genre, word_count, message, meeting_date, meeting_time)
#             VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
#         """
#         values = (
#             data['name'],
#             data['email'],
#             data['service_type'],
#             data.get('genre'),
#             word_count,
#             data.get('message'),
#             meeting_date,
#             meeting_time
#         )
        
#         cursor.execute(insert_query, values)
#         connection.commit()
#         meeting_id = cursor.lastrowid
#         cursor.close()
#         connection.close()
        
#         return jsonify({
#             'success': True,
#             'message': 'Meeting scheduled successfully',
#             'meeting_id': meeting_id
#         }), 201
        
#     except Exception as e:
#         print(f"Error: {str(e)}")
#         return jsonify({'error': 'An internal server error occurred'}), 500

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     app.run(debug=True, host='0.0.0.0', port=port)




from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to call your backend

# Database configuration from Railway environment variables
DB_CONFIG = {
    'host': os.environ.get('DB_HOST'),
    'user': os.environ.get('DB_USER'),
    'password': os.environ.get('DB_PASSWORD'),
    'database': os.environ.get('DB_NAME'),
    'port': int(os.environ.get('DB_PORT', 3306))
}

# Helper function to get DB connection
def get_db_connection():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Database connection error: {e}")
        return None

# Basic health check
@app.route('/')
def home():
    return jsonify({"message": "Gold Leaf API is running. Use /api/test to verify."})

# Simple API test
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({
        'status': 'success',
        'message': 'API is working!',
        'timestamp': datetime.now().isoformat()
    })

# Return available meeting slots
@app.route('/api/available-slots', methods=['GET'])
def available_slots():
    slots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ]
    return jsonify({'slots': slots})

# Schedule a meeting
@app.route('/api/schedule-meeting', methods=['POST', 'OPTIONS'])
def schedule_meeting():
    if request.method == 'OPTIONS':
        return '', 204  # preflight request for CORS

    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Required fields
        required_fields = ['name', 'email', 'service_type', 'meeting_date', 'meeting_time']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Time validation (HH:MM or HH:MM:SS)
        meeting_time_str = data['meeting_time']
        try:
            if len(meeting_time_str.split(':')) == 2:
                meeting_time = datetime.strptime(meeting_time_str, '%H:%M').time()
            else:
                meeting_time = datetime.strptime(meeting_time_str, '%H:%M:%S').time()
        except ValueError:
            return jsonify({'error': 'Invalid time format. Use HH:MM or HH:MM:SS'}), 400

        # Date validation (YYYY-MM-DD)
        try:
            meeting_date = datetime.strptime(data['meeting_date'], '%Y-%m-%d').date()
            if meeting_date.weekday() >= 5:  # 5=Saturday, 6=Sunday
                return jsonify({'error': 'Meetings are only available Monday-Friday'}), 400
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

        # Optional word count
        word_count = None
        if data.get('word_count'):
            try:
                word_count = int(data['word_count'])
            except (ValueError, TypeError):
                word_count = None

        # Connect to DB
        connection = get_db_connection()
        if not connection:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = connection.cursor()
        insert_query = """
            INSERT INTO leads 
            (name, email, service_type, genre, word_count, message, meeting_date, meeting_time)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data['name'],
            data['email'],
            data['service_type'],
            data.get('genre'),
            word_count,
            data.get('message'),
            meeting_date,
            meeting_time
        )

        cursor.execute(insert_query, values)
        connection.commit()
        meeting_id = cursor.lastrowid
        cursor.close()
        connection.close()

        return jsonify({
            'success': True,
            'message': 'Meeting scheduled successfully',
            'meeting_id': meeting_id
        }), 201

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'An internal server error occurred'}), 500
@app.route('/db-test', methods=['GET'])
def db_test_route():
    connection = get_db_connection()
    if connection:
        connection.close()
        return jsonify({"db": "connected"}), 200
    else:
        return jsonify({"db": "failed"}), 500
# Run app on Railway port
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
