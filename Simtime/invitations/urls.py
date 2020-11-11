from django.urls import path, include
from .api import EventAPI, EventDetailAPI

urlpatterns = [
    path('api/events/', EventAPI.as_view(), name='events'),
    path('api/events/<str:start>/<str:end>', EventAPI.as_view(), name='events'),
    path('api/events/<int:pk>', EventDetailAPI.as_view(), name='events'),
    path('api/events/create', EventAPI.as_view(), name='events_create'),
]