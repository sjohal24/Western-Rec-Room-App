from datetime import datetime
import mysql.connector
from mysql.connector import errorcode
# Establish a connection to the database
# db = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="cs3319",
#     database="westernRecRm"
# )

def find_day_of_week(date_string, date_format="%Y-%m%-d"):
    try:
        # Convert the date string to a datetime object
        date_object = datetime.strptime(date_string, date_format)
        # Get the day of the week as an integer (Monday is 0 and Sunday is 6)
        day_of_week = date_object.weekday()
        # Return the day of the week as a string
        return date_object.strftime("%A")

    except ValueError as e:
        print(f"Error parsing date: {e}")
        return None


# Create a cursor
# mycursor = db.cursor()

# # Execute a SELECT query to fetch data from the tweetData table
# mycursor.execute("SELECT * FROM tweetData")

# # Fetch all rows
# rows = mycursor.fetchall()

# # Traverse the rows and print the values
# for row in rows:  
#     id = str(row[0])
#     time = str(row[4])
#     if time[1] != ":":
#         hour = f"{time[0]}{time[1]}";
#     else:
#         hour = time[0]; 
#     print(hour);
#     mycursor.execute('update tweetData set hour=%s where datetime=%s', (hour, id))


# db.commit()
    

# # Close the cursor and the connection
# mycursor.close()
# db.close()
 



# Example usage:
# date_string = "20231206"
# day_of_week = find_day_of_week(date_string)

# if day_of_week is not None:
#     print(f"The day of the week for {date_string} is {day_of_week}.")
# else:
#     print("Invalid date.")
    

