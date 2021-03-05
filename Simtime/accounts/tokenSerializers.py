from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenVerifySerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import UntypedToken
from jwt import decode as jwt_decode

from rest_framework.response import Response
from rest_framework import exceptions, serializers


from django.conf import settings


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod 정적메소드(첫번째 인자에 cls를 넣는다.)
    # 클래스 자체를 객체로 본다. this나 bind? 같은 개념, staticmethod를 사용하면 부모클래스의 속성을 가져오지만,
    # classmethod에서는 cls를 활용해서 cls의 클래스 속성을 가져옴
    # https://suwoni-codelab.com/python%20%EA%B8%B0%EB%B3%B8/2018/03/11/Python-Basic-class-staticmethod/
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        # Add custom claims
        # token['username'] = user.username
        return token

    def validate(self, user):
        data = super().validate(user)
        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # # Add extra responses here
        userInfo = {"username": self.user.username,
                    "id": self.user.id, "email": self.user.email}
        print(self.user.profile_image)
        data['user'] = userInfo

        return data

# https://github.com/SimpleJWT/django-rest-framework-simplejwt/issues/118


class MyTokenVerifySerializer(TokenVerifySerializer):
    token = serializers.CharField()

    def validate(self, attrs):
        # UntypedToken(attrs['token'])
        data = jwt_decode(
            attrs['token'], settings.SECRET_KEY, algorithms=['HS256'])
        data = {'id': data['user_id']}
        return data
