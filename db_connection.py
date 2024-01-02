import pandas as pd
import mysql.connector
from mysql.connector import errorcode
from test import find_day_of_week

def insert_into_db(df):
  db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="cs3319",
    database="westernRecRm"
  )
  
  mycursor = db.cursor()
  
  for i in range(len(df)):
        datet = str(df.iloc[i]['Date'])
        wr_number = str(df.iloc[i]['WR_Number'])
        date = f"{datet[0]}{datet[1]}{datet[2]}{datet[3]}-{datet[4]}{datet[5]}-{datet[6]}{datet[7]}"
        time = f"{datet[8]}{datet[9]}:{datet[10]}{datet[11]}"
        day = find_day_of_week(date, "%Y-%m-%d")
        values = (datet, wr_number, date, time, day)
        try:
          print(values)
          mycursor.execute('INSERT INTO tweetData (datetime, numOfStudents) VALUES (%s, %s)', values)
        except mysql.connector.Error as err:
          if err.errno == errorcode.ER_DUP_ENTRY:
            print("Duplicate entry. Skipping...")
            continue 
          else:
            print(err)
  
  db.commit()
  mycursor.close()
  db.close()
  