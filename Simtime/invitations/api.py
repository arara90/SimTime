import io
import boto3
import tempfile
from datetime import datetime
from django.conf import settings
from django.utils import timezone
from django.db.models import Max
from .models import Invitation, Event
from .serializers import InvitationSerializer, EventSerializer, HostSerializer
from accounts.models import Friendship

# from .models import  Event
# from .serializers import EventSerializer
from rest_framework import viewsets, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.views import APIView


class EventAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, start, end):
        # events = self.request.user.events.all()
        start_datetime = datetime.strptime(start, '%Y-%m-%d')
        end_datetime = datetime.strptime(
            f'{end} 23:59:59', '%Y-%m-%d %H:%M:%S')

        start_datetime_aware = timezone.make_aware(start_datetime)
        end_datetime_aware = timezone.make_aware(end_datetime)
        events = self.request.user.events.filter(
            event_time__range=[start_datetime_aware, end_datetime_aware])
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(host=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        event = self.get_object(pk=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def delete(self, request, pk):
        print(pk)
        event = self.get_object(pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        # print(request.data, pk)
        event = self.get_object(pk)
        serializer = EventSerializer(event, data=request.data, partial=True)
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

    def get_object(self, pk):
        try:
            return Invitation.objects.get(pk=pk)
        except Invitation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = InvitationSerializer(data=request.data, many=True)
        if(serializer.is_valid()):
            print('is_valid')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, start, end):
        start_datetime = datetime.strptime(start, '%Y-%m-%d')
        end_datetime = datetime.strptime(
            f'{end} 23:59:59', '%Y-%m-%d %H:%M:%S')
        start_datetime_aware = timezone.make_aware(start_datetime)
        end_datetime_aware = timezone.make_aware(end_datetime)

        invitations = request.user.invitations\
            .select_related('event').filter(event__event_time__range=[start_datetime_aware, end_datetime_aware])\

        serializer = InvitationSerializer(invitations, many=True)
        return Response(serializer.data)

    def put(self, request, pk):
        invitation = self.get_object(pk)
        serializer = InvitationSerializer(
            invitation, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HostAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        # hosts = request.user.invitations.distinct("host").order_by('created_at')
        import json
        print('ji')
        # hosts = Invitation.objects.select_related('event__host').filter(guest=request.user.id)\
        #     .values('event__host__id', 'event__host__username','event__host__profile_image', 'event__host__email' ).distinct()
        # print(hosts)
        hosts = Invitation.objects.select_related('event__host').filter(guest=request.user.id).values(
            "event__host_id").annotate(order_temp=Max("event__host_id")).order_by("-order_temp")
        print(hosts)
        # serializer = HostSerializer(hosts, many=True)
        # return Response(serializer.data)
