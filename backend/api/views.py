from django.http import JsonResponse
from .models import TweetData
from django.db.models import Avg


def get_tweet_data(request):
    tweet_data = TweetData.objects.all().values()
    return JsonResponse(list(tweet_data), safe=False)

def get_avg_students_by_hour(request, requested_day):
    result = (
        TweetData.objects
        .filter(day=requested_day)  # Use the provided day parameter
        .values('hour')
        .annotate(avg_numOfStudents=Avg('numOfStudents'))
        .order_by('hour')
    )

    result_list = list(result)

    for entry in result_list:
        if 'avg_numOfStudents' in entry:
            entry['avg_numOfStudents'] = round(entry['avg_numOfStudents'], 1)

    return JsonResponse(result_list, safe=False)
  
def get_avg_students_day_total(request, requested_day):
  result = (
        TweetData.objects
        .filter(day=requested_day)  # Use the provided day parameter
        .values('day')
        .annotate(avg_numOfStudents=Avg('numOfStudents'))
    )
  
  result_list = list(result)
  
  for entry in result_list:
        if 'avg_numOfStudents' in entry:
            entry['avg_numOfStudents'] = round(entry['avg_numOfStudents'], 1)
  
  return JsonResponse(result_list, safe=False)

def get_latest_tweets(request):
    result = TweetData.objects.all().order_by('-datetime')[:12]

    result_list = list(result.values())

    return JsonResponse(result_list, safe=False)
  
def get_avg_students_days(request):
  result = (
        TweetData.objects  # Use the provided day parameter
        .values('day')
        .annotate(avg_numOfStudents=Avg('numOfStudents'))
    )
  
  result_list = list(result)
  
  for entry in result_list:
        if 'avg_numOfStudents' in entry:
            entry['avg_numOfStudents'] = round(entry['avg_numOfStudents'], 1)
  
  return JsonResponse(result_list, safe=False)

def average_students_by_hour(request):
    # Assuming your TweetData model has fields 'day', 'hour', and 'numOfStudents'
    queryset = TweetData.objects.values('day', 'hour').annotate(avg_numOfStudents=Avg('numOfStudents')).order_by('avg_numOfStudents')

    data = list(queryset)

    return JsonResponse({'data': data}, safe=False)