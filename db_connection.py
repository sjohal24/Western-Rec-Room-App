import pandas as pd
import mysql.connector
from mysql.connector import errorcode

def insert_into_db(df):
  db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="cs3319",
    database="westernRecRm"
  )
  
  mycursor = db.cursor()
  
  for i in range(len(df)):
        date = str(df.iloc[i]['Date'])
        wr_number = str(df.iloc[i]['WR_Number'])
        values = (date, wr_number)
        try:
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