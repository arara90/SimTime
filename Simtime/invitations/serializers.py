from rest_framework import serializers
from .models import Invitation, Event
# from .models import  Event
from accounts.serializers import UserSerializer
from accounts.models import Account
from datetime import datetime



class InvitationSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        res = super().to_representation(instance)
        res.update({
            'event': EventSerializer(instance.event).data,
            })

        return res

    def to_internal_value(self, data):
        isInt = isinstance(data['event'], int)
        if(not isInt):
            data['event'] = data['event']['id']

        return super().to_internal_value(data)

    class Meta:
        model = Invitation
        fields = '__all__'


 
class EventSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        res = super().to_representation(instance)
        entryQuery = instance.invitations.filter(attendance=True)
        participants=[]

        for item in entryQuery:
            participants.append(UserSerializer(item.guest).data)

        res.update({ 'host': UserSerializer(instance.host).data, 'participants': participants})
        return res

    class Meta:
        model = Event
        fields = '__all__'

 
class HostSerializer(serializers.ModelSerializer):
    # RGmapId = serializers.IntegerField(source='id')
    host = UserSerializer(source='host')
    class Meta:
        model = Invitation
        fields = ('host')




