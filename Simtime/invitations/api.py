from .models import Invitation, Event
from rest_framework import viewsets, permissions, authentication, status
from rest_framework.response import Response
from .serializers import InvitationSerializer, EventSerializer, EventGetSerializer, EventDelSerializer
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
        end_datetime = datetime.strptime( f'{end} 23:59:59', '%Y-%m-%d %H:%M:%S')

        start_datetime_aware = timezone.make_aware(start_datetime)
        end_datetime_aware = timezone.make_aware(end_datetime)

        events = self.request.user.events.filter(event_time__range=[start_datetime_aware, end_datetime_aware])
        serializer = EventGetSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        print("gre", request.data)
        serializer = EventSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(host=self.request.user)
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
        serializer = EventDelSerializer(event)
        event.delete()
        return Response(status=status.HTTP_200_OK, data=serializer.data)

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


# class EventsViewSet(viewsets.ModelViewSet):
#     queryset = Event.objects.all()
#     permission_classes = (permissions.IsAuthenticated,)
#     serializer_class = EventSerializer

#     def get_queryset(self):
#         return self.request.user.events.all()  # related_name으로 invitations지정

#     def perform_create(self, serializer):
#         serializer.save(host=self.request.user)


# class InvitationsViewSet(viewsets.ModelViewSet):
#     queryset = Invitation.objects.all()
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]

#     serializer_class = InvitationSerializer

#     def get_queryset(self):
#         # 해당 유저의 invitations만 return
#         return self.request.user.invitations.all()  # related_name으로 invitations지정

#     def perform_create(self, serializer):
#         # invitation을 만들 떄 host를 저장하도록 한다.
#         serializer.save(host=self.request.user)
