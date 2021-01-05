from rest_framework.renderers import JSONRenderer
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.models import TokenUser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView

from django.db.models import OuterRef, Subquery, Q, F, Case, When, Value, IntegerField

from .tokenSerializers import MyTokenObtainPairSerializer, MyTokenVerifySerializer
from .serializers import AccountSerializer, UserSerializer, RelationshipSerializer, GroupSerializer, FriendSerializer, RGMapSerializer, GroupMemberSerializer, TempFriendSerializer, FriendshipSerializer
from .models import Account, Relationship, FriendGroup, Relationship_FriendGroup_MAP, Friendship


# tokens
class ObtainTokenPair(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

# Create


class AccountCreateAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            account = serializer.save()
            if account:
                json = serializer.data
                response = Response(json, status=status.HTTP_201_CREATED)
                # username = serializer.data['username']
                # response.set_cookie('username', username, httponly=True, max_age=3600)
                return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Account
class AccountDetailAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Account.objects.get(pk=pk)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        account = self.get_object(pk)
        serializer = AccountSerializer(account)
        return Response(serializer.data)

    def put(self, request, pk):
        account = self.get_object(pk)
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        account = self.get_object(pk)
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AccountSearchAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, field, keyword):
        # friends = self.request.user.friends.all().values('friend_id')
        query_A = self.request.user.friendship_A\
            .filter(Q(status__lt=2))\
            .values('account_B')

        # # account_B가 request.user인 경우 A가 친구
        query_B = self.request.user.friendship_B\
            .filter(Q(Q(status=0) | Q(status=2)))\
            .values('account_A')
        
        friends = query_A.union(query_B, all=True) # all=True => union all : 중복허용

        query = {"%s__contains" % field: keyword} # }username ='a'
        results = Account.objects.filter(**query)\
            .exclude(pk=self.request.user.id)\
            .exclude(pk__in=Subquery(friends))\
            .order_by('username')

        data = []
        for item in results:
            serializer = UserSerializer(item)
            data.append(serializer.data)
        return Response(data)


class AccountLoadAPI(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        account = self.get_object()
        serializer = UserSerializer(account)
        print(serializer.data)
        return Response(serializer.data)


class TokenVerify(TokenVerifyView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenVerifySerializer

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        account = self.get_object()
        serializer = UserSerializer(account)
        print(serializer.data)
        return Response(serializer.data)

# # Relationship
# class RelationshipAPI(APIView):
#     permission_classes = (permissions.IsAuthenticated,)

#     def post(self, request):
#         serializer = RelationshipSerializer(data=request.data)
#         if serializer.is_valid():
#             relationship = serializer.save(account=self.request.user)
#             if relationship:
#                 # res = self.request.user.friends.get(
#                 #     pk=relationship.id).select_related('friend')
#                 res_serializer = FriendSerializer(relationship)
#                 return Response(res_serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Relationship
class RelationshipAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_ab(self):
        user = self.request.user.id
        friend = self.request.data['friend']
        return (user, friend) if user < friend else (user, friend)

    def post(self, request):
        a,b = self.get_ab()
        friendship = Friendship.objects.filter(account_A=a, account_B=b)

        if(friendship):
            #이미 존재한다면
            print('friendship')

        else:
            if(self.request.user.id==a):
                data = { 'account_A': a, 'account_B': b, 'status': 1 #A_ONLY
                    , 'A_dispatch_to_B' : True
                    , 'B_dispatch_to_A' : False }
            else:
                data = { 'account_A': a, 'account_B': b, 'status': 2 #B_ONLY
                    , 'A_dispatch_to_B' : False
                    , 'B_dispatch_to_A' : True }
                

            print(data)
            serializer = FriendshipSerializer(data=data)
            print(serializer.is_valid())
        
    
        if serializer.is_valid():
            res = serializer.save()
            if res:
                res_serializer = FriendSerializer(friendship)
                return Response(data, status=status.HTTP_201_CREATED)
            else:
                return Response(res_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        # # account_A가 request.user인 경우 B가 친구
        query_A = self.request.user.friendship_A\
            .annotate( friend=F('account_B'), subscribe=F('A_subscribe_to_B'), dispatch=F('A_dispatch_to_B'), block=F('A_block_B'))\
            .filter(Q(status__lt=2))

        # # account_B가 request.user인 경우 A가 친구
        query_B = self.request.user.friendship_B\
            .annotate( friend=F('account_A'), subscribe=F('B_subscribe_to_A'), dispatch=F('B_dispatch_to_A'), block=F('B_block_A'))\
            .filter(Q(Q(status=0) | Q(status=2)) )
        
        query = query_A.union(query_B, all=True) # all=True => union all : 중복허용
        serializer = TempFriendSerializer(query, many=True)
    
        return Response(serializer.data)

          
class RelationshipDetailAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Relationship.objects.get(pk=pk)
        except Relationship.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        relationship = self.get_object(pk)
        serializer = FriendSerializer(
            relationship, data=request.data, partial=True)
        # {"dispatch": false}
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        relationship = self.get_object(pk)
        relationship.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




class GroupAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return FriendGroup.objects.get(pk=pk)
        except FriendGroup.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        data = request.data.copy()
        data['account'] = request.user.id
        serializer = GroupSerializer(data=data)

        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        

    def get(self, request):
        groups = self.request.user.FriendGroups.all()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)


# groupDetail
class GroupDetailAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return FriendGroup.objects.get(pk=pk)
        except FriendGroup.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        group = self.get_object(pk)
        serializer = GroupSerializer(group)
        return Response(serializer.data)

    def delete(self, request, pk):
        group = self.get_object(pk)
        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        group = self.get_object(pk)
        serializer = GroupSerializer(group, data=request.data)
        # {"dispatch": false}
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Relationship-Group
class RGMapAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    # add-to-group
    def post(self, request):
        print('request', request.data)
        serializer = RGMapSerializer(data=request.data,  many=True)
        print('serializer',serializer)
        if(serializer.is_valid()):
            print('valid')
            res = serializer.save()
            print(res)
            output = RGMapSerializer(res, many=True)
            return Response(output.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, ids):
        #ids = "1 2 3"
        Relationship_FriendGroup_MAP.filter()

        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GroupMemberAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Relationship_FriendGroup_MAP.objects.get(pk=pk)
        except Relationship_FriendGroup_MAP.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        mapObjects = Relationship_FriendGroup_MAP.objects.filter(group=pk)
        if mapObjects:
            serializer = GroupMemberSerializer(mapObjects, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("nodata")
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        mapObj = self.get_object(pk)
        mapObj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
