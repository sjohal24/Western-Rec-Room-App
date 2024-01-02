import pandas as pd
import re
from ntscraper import Nitter


username='WesternWeightRm'
scraper = Nitter()

tweets_data = scraper.get_tweets(username, mode='user', number=4)

print(tweets_data);