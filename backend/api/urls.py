from django.urls import path
from .views import get_tweet_data, get_avg_students_by_hour, get_avg_students_day_total, get_latest_tweets, get_avg_students_days

urlpatterns = [
    path('all/', get_tweet_data, name='get_tweet_data'),
    path('avg/total/days', get_avg_students_days, name='get_avg_students_days'),
    path('avg/<str:requested_day>/', get_avg_students_by_hour, name='get_avg_students_by_hour'),
    path('avg/total/<str:requested_day>/', get_avg_students_day_total, name='get_avg_students_day_total'),
    path('avg/all/recent', get_latest_tweets, name='get_latest_tweets'),
]
