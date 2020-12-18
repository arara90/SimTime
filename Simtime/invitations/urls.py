from django.urls import path, include
# from .api import EventAPI, EventDetailAPI
from .api import EventAPI, EventDetailAPI, InvitationAPI

urlpatterns = [
    path('api/events/', EventAPI.as_view(), name='events'),
    path('api/events/<str:start>/<str:end>', EventAPI.as_view(), name='events'),
    path('api/events/<int:pk>', EventDetailAPI.as_view(), name='events'),
    path('api/events/create', EventAPI.as_view(), name='events_create'),

    path('api/invitations/create', InvitationAPI.as_view(), name='events_create'),
    path('api/invitations/<str:start>/<str:end>', InvitationAPI.as_view(), name='invitations'),
    
]