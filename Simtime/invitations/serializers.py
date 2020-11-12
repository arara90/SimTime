from rest_framework import serializers
from .models import Invitation,Event
from accounts.serializers import UserSerializer

from datetime import datetime


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class EventGetSerializer(serializers.ModelSerializer):
    # event_date=serializers.DateField(source='event_time')
    event_time=serializers.DateTimeField(format='%H:%M %p')
    event_date=serializers.DateTimeField(format="%Y-%m-%d", source='event_time')
    host = UserSerializer()

    class Meta:
        model = Event
        fields = ('id','event_name','event_time','event_date','status','message','photo','created_at','host','event_place','tags','color','font_color')
        # fields = '__all__'

class EventDelSerializer(serializers.ModelSerializer):
    # event_date=serializers.DateField(source='event_time')
    event_time=serializers.DateTimeField(format="%Y-%m-%d")
    host = UserSerializer()

    class Meta:
        model = Event
        fields = ('id','event_name','event_time','status','message','photo','created_at','host','event_place','tags','color','font_color')
        # fields = '__all__'


# class TimestampField(serializers.DateTimeField):
#     #https://www.laurivan.com/timestamp-to-datetime-serializer-field-for-drf/
#     def to_representation(self, value):
#         result = super(TimestampField, self).to_representation(value)
#         return result.timestamp()

#     def to_internal_value(self, value):
#         converted = datetime.fromtimestamp(float('%s' % value))
#         return super(TimestampField, self).to_representation(converted)


