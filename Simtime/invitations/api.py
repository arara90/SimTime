from .models import Invitation, Event
from .serializers import InvitationSerializer, EventSerializer
# from .models import  Event
# from .serializers import EventSerializer
from rest_framework import viewsets, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
import io
import boto3
import tempfile

from datetime import datetime
from django.utils import timezone


class EventAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, start, end):
        # events = self.request.user.events.all()
        start_datetime = datetime.strptime(start, '%Y-%m-%d')
        end_datetime = datetime.strptime(f'{end} 23:59:59', '%Y-%m-%d %H:%M:%S')

        start_datetime_aware = timezone.make_aware(start_datetime)
        end_datetime_aware = timezone.make_aware(end_datetime)
        events = self.request.user.events.filter(
            event_time__range=[start_datetime_aware, end_datetime_aware])
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        print("gre", request.data)
        serializer = EventSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(host=self.request.user)
            print('done', serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        return self.request.user.events.get(pk=pk)

    def get(self, request, pk):
        event = self.get_object(pk=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def delete(self, request, pk):
        event = self.get_object(pk)
        serializer = EventSerializer(event)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        event = self.get_object(pk)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(host=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class InvitationAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        print("gre", request.data)
        serializer = InvitationSerializer(data=request.data, many=True)
        if(serializer.is_valid()):
            print('valid')
            serializer.save()
            print('done', serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def get(self, request, start, end):
        start_datetime = datetime.strptime(start, '%Y-%m-%d')
        end_datetime = datetime.strptime(f'{end} 23:59:59', '%Y-%m-%d %H:%M:%S')
        start_datetime_aware = timezone.make_aware(start_datetime)
        end_datetime_aware = timezone.make_aware(end_datetime)

        invitations = Invitation.objects\
            .select_related('relationship').filter(relationship__friend=request.user, relationship__subscribe=True)\
                .select_related('event').filter(event__event_time__range=[start_datetime_aware, end_datetime_aware])

        print(str(invitations.query))
        serializer = InvitationSerializer(invitations, many=True)
        return Response(serializer.data)  