import pandas as pd
import re
from ntscraper import Nitter
from datetime import datetime
from db_connection import insert_into_db

def retrieve_tweets_data(tweet_count):
  username='WesternWeightRm'
  scraper = Nitter()

  tweets_data = scraper.get_tweets(username, mode='user', number=tweet_count)

    # Check if the 'tweets' key is present in the response
  if 'tweets' in tweets_data:
        tweets = tweets_data['tweets']
  else:
        print("No tweets found.")
        return pd.DataFrame()

  data = []

  for tweet in tweets:
        text = tweet['text']
        date = tweet['date']

        date_object = datetime.strptime(date, '%b %d, %Y · %I:%M %p UTC')
        date = int(date_object.strftime('%Y%m%d%H%M'))
        
        # Extracting WR number using regular expression
        wr_match = re.search(r'WR (\d+)', text)
        wr_number = int(wr_match.group(1)) if wr_match else None

        # Storing WR number and date in a dictionary
        tweet_data = {'WR_Number': wr_number, 'Date': date}
        data.append(tweet_data)

    # Creating a DataFrame from the list of dictionaries
  df = pd.DataFrame(data)

    # Filtering out rows with NaN WR numbers
  df = df.dropna(subset=['WR_Number']).astype({'WR_Number': int})

  return df

# Example usage:
resulting_dataframe = retrieve_tweets_data(400);
print(resulting_dataframe)
insert_into_db(resulting_dataframe);