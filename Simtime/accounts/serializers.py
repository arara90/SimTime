from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Account, Friendship, FriendGroup, FriendshipGroupMap
# Relationship, Relationship_FriendGroup_MAP


class AccountSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    # profile_image = serializers.ImageField()

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'password', 'profile_image')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # password = validated_data.pop('password', None)
        password = validated_data['password']
        account = self.Meta.model(**validated_data)
        # as long as the fields are the same, we can just use this
        # or Use : instance = Account(email=validated_data['email'],username=validated_data['username'])
        if password is not None:
            account.set_password(password)
        # deserialized : json -> object(Account 모델 타입)으로 변환된 객체를 불러온다.
        account.save()
        return account


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'email', 'profile_image')


# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()

#     def validate(self, data):
#         user = authenticate(**data)
#         if user and user.is_active:
#             return user
#         raise serializers.ValidationError("Incorrect Credentials")


class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = '__all__'


class ResFriendSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        friend = UserSerializer(Account.objects.get(pk=instance.friend)).data
        res = {'id': instance.id, 'status': instance.status, 'subscribe': instance.subscribe, 'dispatch': instance.dispatch, 'block': instance.block
               }
        res.update({'friend': friend})

        return res

    class Meta:
        model = Friendship
        fields = ('id', 'friend', 'status', 'subscribe', 'dispatch', 'block')


# Group
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendGroup
        fields = ('id', 'groupname', 'account')
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=FriendGroup.objects.all(), fields=['account', 'groupname'], message=("already exists"))
        ]


class FriendGroupMapSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        res = {
            'FGmapId': instance.id,
            'friend': UserSerializer(instance.friend).data
        }
        return res

    # friend = UserSerializer(source='friend')
    class Meta:
        model = FriendshipGroupMap
        fields = '__all__'


class GroupMemberSerializer(serializers.ModelSerializer):
    # RGmapId = serializers.IntegerField(source='id')
    # relationship = FriendSerializer()
    def to_representation(self, instance):
        res = {
            'FGmapId': instance.id,
            'friend': UserSerializer(instance.friend).data
        }
        return res

    class Meta:
        model = FriendshipGroupMap
        fields = '__all__'


# res.update({'friend': UserSerializer(instance.account_B).data
# #     #     # 'account' : serializers.IntegerField(source='account'),
# #     #     # 'friend' : UserSerializer(source='friend').data,
# #     #     # 'subscribe' : serializers.BooleanField(source='subscribe'),
# #     #     # 'dispatch' : serializers.BooleanField(source='dispatch'),
# #     #     'block' : serializers.BooleanField(instance.block),
    # })


# Relationship
# class friendshipserializer(serializers.ModelSerializer):
#     class Meta:
#         model = Relationship
#         fields = '__all__'

# Relationship-Group
# class RGMapSerializer(serializers.ModelSerializer):
#     def to_representation(self, instance):
#         res = {'RGmapId': instance.id}
#         relationship = FriendSerializer(instance.relationship).data
#         res.update(relationship)
#         return res

#     class Meta:
#             model = Relationship_FriendGroup_MAP
#             fields = '__all__'


# class FriendSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Relationship
#         fields = ('id', 'friend', 'subscribe', 'dispatch')

    # friend = UserSerializer()
    # relationshipId = serializers.IntegerField(source='id')
    # def to_representation(self, instance):
    #     res = {'RGmapId': instance.id}
    #     relationship = FriendSerializer(instance.relationship).data
    #     res.update(relationship)
    #     return res

# class GroupMemberSerializer(serializers.ModelSerializer):
#     # RGmapId = serializers.IntegerField(source='id')
#     # relationship = FriendSerializer()
#     def to_representation(self, instance):
#         res = {'RGmapId': instance.id}
#         relationship = FriendSerializer(instance.relationship).data
#         res.update(relationship)
#         return res

#     class Meta:
#         model = Relationship_FriendGroup_MAP
#         fields = '__all__'+
