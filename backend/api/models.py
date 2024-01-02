# your_app_name/models.py
from django.db import models

class TweetData(models.Model):
    datetime = models.BigIntegerField(primary_key=True)
    numOfStudents = models.IntegerField()
    day = models.CharField(max_length=20)
    date = models.DateField()
    time = models.TimeField()
    hour = models.IntegerField()

    class Meta:
        # Set managed to False to indicate that Django should not manage this table
        managed = False
        # Set db_table to the name of your existing table
        db_table = 'tweetData'
