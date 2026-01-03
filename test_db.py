import MySQLdb
from dotenv import load_dotenv
import os

load_dotenv()

# Read credentials from .env
host = os.getenv("MYSQL_HOST")
user = os.getenv("MYSQL_USER")
password = os.getenv("MYSQL_PASSWORD")
db = os.getenv("MYSQL_DB")

try:
    connection = MySQLdb.connect(
        host=host,
        user=user,
        passwd=password,
        db=db
    )
    print("✅ Connection successful!")
    connection.close()
except Exception as e:
    print("❌ Connection failed:", e)
