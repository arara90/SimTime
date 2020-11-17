from rest_framework import serializers
from .models import Invitation,Event
from accounts.serializers import UserSerializer
from datetime import datetime


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = '__all__'


class EventSerializer(serializers.BaseSerializer):
    def to_representation(self, obj):
        return {
            'id':obj.id,
            'event_name':obj.event_name,
            'event_time':obj.event_time,
            'status':obj.status,
            'message':obj.message,
            'host':obj.host,
            'event_place':obj.event_place,
            'tags':obj.tags,
            'color':obj.color,
            'font_color':obj.font_color
        }

    # class Meta:
    #     model = Event
    #     fields = '__all__'


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
    id = serializers.ReadOnlyField()
    event_date=serializers.DateTimeField(format="%Y-%m-%d", source='event_time')
    class Meta:
        model = Event
        fields = ('id','event_date')
        # fields = '__all__'


# class TimestampField(serializers.DateTimeField):
#     #https://www.laurivan.com/timestamp-to-datetime-serializer-field-for-drf/
#     def to_representation(self, value):
#         result = super(TimestampField, self).to_representation(value)
#         return result.timestamp()

#     def to_internal_value(self, value):
#         converted = datetime.fromtimestamp(float('%s' % value))
#         return super(TimestampField, self).to_representation(converted)


