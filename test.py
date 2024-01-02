from datetime import datetime, timedelta
import mysql.connector
from mysql.connector import errorcode

# Connect to the MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="cs3319",
    database="westernRecRm"
)

mycursor = db.cursor()

# Select datetime from the table
mycursor.execute("SELECT datetime FROM tweetData")

rows = mycursor.fetchall()

for row in rows:
    original_date_time_obj = datetime.strptime(row[0], "%Y%m%d%H%M")
    
    # Subtract 5 hours from the datetime
    updated_date_time_obj = original_date_time_obj
    
    # Extract updated 'hour'
    updated_hour = updated_date_time_obj.hour

    # Update 'hour' column in the database
    mycursor.execute('UPDATE tweetData SET hour=%s WHERE datetime=%s', (updated_hour, row[0]))

db.commit()

mycursor.close()
db.close()
