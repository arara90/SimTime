from rest_framework import serializers
from .models import Invitation,Event

class InvitationSerializer(serializers.ModelSerializer):
    # event_place = serializers.JSONField()
    class Meta:
        model = Invitation
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'