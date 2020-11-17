from rest_framework import serializers
from .models import Invitation, Event
from accounts.serializers import UserSerializer
from datetime import datetime


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        res = super().to_representation(instance)
        res.update({'host': UserSerializer(instance.host).data})
        return res

    class Meta:
        model = Event
        fields = '__all__'
