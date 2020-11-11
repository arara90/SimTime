from .models import Invitation, Event
from rest_framework import viewsets, permissions, authentication, status
from rest_framework.response import Response
from .serializers import InvitationSerializer, EventSerializer
from rest_framework.views import APIView
from django.conf import settings
import io
import boto3
import tempfile


class EventAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)


    def get(self, request, start, end):
        print('events', start, end)
        # events = self.request.user.events.all()
        events = self.request.user.events.filter(event_time__range=[start, end])
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
        # return self.request.user.events.all()  # related_name으로 invitations지정

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
