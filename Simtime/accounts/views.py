from rest_framework.renderers import JSONRenderer
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.models import TokenUser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView

from django.db.models import OuterRef, Subquery, Q, F, Case, When, Value, IntegerField

from .tokenSerializers import MyTokenObtainPairSerializer, MyTokenVerifySerializer
from .serializers import AccountSerializer, UserSerializer, FriendshipSerializer, ResFriendSerializer, GroupSerializer, FriendGroupMapSerializer, GroupMemberSerializer
# , FriendSerializer, RGMapSerializer

from .models import Account, Friendship, FriendGroup, FriendshipGroupMap


# tokens
class ObtainTokenPair(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

# Create


class AccountCreateAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        print(request.data)
        serializer = AccountSerializer(account, data=request.data, partial=True)
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

        # all=True => union all : 중복허용
        friends = query_A.union(query_B, all=True)

        query = {"%s__contains" % field: keyword}  # }username ='a'
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


class FriendshipAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Friendship.objects.get(pk=pk)
        except Friendship.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_object_to_representation(self, pk, account, friend):
        try:
            res = Friendship.objects.filter(pk=pk)\
                .annotate(friend=F(f'account_{friend}'), subscribe=F(f'{account}_subscribe_{friend}'), dispatch=F(f'{account}_dispatch_{friend}'), block=F(f'{account}_block_{friend}'))
            return res[0]
        except Friendship.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_ab(self, request):
        # 더 작은 id가 account_A
        user = request.user.id
        friend = request.data['friend']
        return (user, friend) if user < friend else (friend, user)  # (a,b)

    def post(self, request):
        a, b = self.get_ab(request)
        print(a, b)
        account = 'A' if request.user.id == a else 'B'
        friend = 'B' if request.user.id == a else 'A'

        if(Friendship.objects.filter(account_A=a, account_B=b).exists()):
            # 이미 존재한다면 status UPDATE
            print('exists')
            friendship = Friendship.objects.get(account_A=a, account_B=b)
            if(friendship.status == 1 or friendship.status == 2):
                friendship.status = 0
                friendship.save()
            # errors
            elif(friendship.status == 0):
                print('already mutual')
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                print('incorrect status')
                return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            # 없다면 Create
            data = {'account_A': a, 'account_B': b}
            # 1=A_ONLY / 2=B_ONLY
            data['status'] = 1 if request.user.id == a else 2
            serializer = FriendshipSerializer(data=data)
            if serializer.is_valid():
                friendship = serializer.save()

            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            res = self.get_object_to_representation(
                friendship.id, account, friend)
            res_serializer = ResFriendSerializer(res)
            return Response(res_serializer.data, status=status.HTTP_201_CREATED)

        except Friendship.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request):
        # # account_A가 request.user인 경우 B가 친구
        query_A = request.user.friendship_A\
            .annotate(friend=F('account_B'), subscribe=F('A_subscribe_B'), dispatch=F('A_dispatch_B'), block=F('A_block_B'))\
            .filter(Q(status__lt=2))

        # # account_B가 request.user인 경우 A가 친구
        query_B = request.user.friendship_B\
            .annotate(friend=F('account_A'), subscribe=F('B_subscribe_A'), dispatch=F('B_dispatch_A'), block=F('B_block_A'))\
            .filter(Q(Q(status=0) | Q(status=2)))

        # all=True => union all : 중복허용
        query = query_A.union(query_B, all=True)
        serializer = ResFriendSerializer(query, many=True)
        return Response(serializer.data)


class FriendshipDetailAPI(APIView):
    def get_object(self, pk):
        try:
            return Friendship.objects.get(pk=pk)
        except Friendship.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_object_to_representation(self, pk, account, friend):
        try:
            res = Friendship.objects.filter(pk=pk)\
                .annotate(friend=F(f'account_{friend}'), subscribe=F(f'{account}_subscribe_{friend}'), dispatch=F(f'{account}_dispatch_{friend}'), block=F(f'{account}_block_{friend}'))
            return res[0]
        except Friendship.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        friendship = self.get_object(pk)
        account = 'A' if request.user.id == friendship.account_A.id else 'B'
        friend = 'B' if request.user.id == friendship.account_A.id else 'A'
        k, v = request.data['key'], request.data['value']

        data = {f'{account}_{k}_{friend}': v}
        serializer = FriendshipSerializer(friendship, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            res = self.get_object_to_representation(pk, account, friend)

            print('res', res)
            res_serializer = ResFriendSerializer(res)
            return Response(res_serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        friendship = self.get_object(pk)
        user = 'a' if friendship.account_A == self.request.user else 'b'
        friendshipStatus = friendship.status

        def do_delete(friendship):
            try:
                friendship.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except:
                print('delete err')
                return Response(status=status.HTTP_400_BAD_REQUEST)

        def do_update(friendship, newStatus):
            try:
                # update
                friendship.status = newStatus
                friendship.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except:
                print('update err')
                return Response(status=status.HTTP_400_BAD_REQUEST)

        if(user == 'a'):
            if(friendshipStatus == 0):
                # update (status 0 ==>2) : (mutual ==> b_only')
                return do_update(friendship, 2)
            elif(friendshipStatus == 1 or friendshipStatus == 3):  # 'a_only인 경우'
                return do_delete(friendship)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            if(friendshipStatus == 0):
                # update (status 0 ==>1) : (mutual ==> a_only')
                return do_update(friendship, 1)
            elif(friendshipStatus == 2 or friendshipStatus == 4):  # 'b_only인 경우'
                return do_delete(friendship)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)


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


# Friendship-Group
class FGMapAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    # add-to-group
    def post(self, request):
        print(request.data)
        serializer = FriendGroupMapSerializer(data=request.data,  many=True)
        # data = {{friend: 3, group: 34}}
        if(serializer.is_valid()):
            print('is_valid')
            res = serializer.save()
            output = FriendGroupMapSerializer(res, many=True)
            return Response(output.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, ids):
        #ids = "1 2 3"
        FriendshipGroupMap.filter()
        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GroupMemberAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, pk):
        try:
            return FriendshipGroupMap.objects.get(pk=pk)
        except FriendshipGroupMap.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        mapObjects = FriendshipGroupMap.objects.filter(group=pk)
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


# # Relationship-Group
# class RGMapAPI(APIView):
#     permission_classes = (permissions.IsAuthenticated,)

#     # add-to-group
#     def post(self, request):
#         print(request.data)
#         serializer = RGMapSerializer(data=request.data,  many=True)
#         if(serializer.is_valid()):
#             res = serializer.save()
#             print(res)
#             output = RGMapSerializer(res, many=True)
#             return Response(output.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, ids):
#         #ids = "1 2 3"
#         Relationship_FriendGroup_MAP.filter()
#         group.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# class GroupMemberAPI(APIView):
#     permission_classes = (permissions.IsAuthenticated,)

#     def get_object(self, pk):
#         try:
#             return Relationship_FriendGroup_MAP.objects.get(pk=pk)
#         except Relationship_FriendGroup_MAP.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def get(self, request, pk):
#         mapObjects = Relationship_FriendGroup_MAP.objects.filter(group=pk)
#         if mapObjects:
#             serializer = GroupMemberSerializer(mapObjects, many=True)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print("nodata")
#         return Response(status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         mapObj = self.get_object(pk)
#         mapObj.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# # Relationship
# class RelationshipAPI(APIView):
#     permission_classes = (permissions.IsAuthenticated,)

#     def post(self, request):
#         serializer = friendshipserializer(data=request.data)
#         if serializer.is_valid():
#             relationship = serializer.save(account=self.request.user)
#             if relationship:
#                 # res = self.request.user.friends.get(
#                 #     pk=relationship.id).select_related('friend')
#                 res_serializer = FriendSerializer(relationship)
#                 return Response(res_serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class RelationshipDetailAPI(APIView):
#     permission_classes = (permissions.IsAuthenticated,)

#     def get_object(self, pk):
#         try:
#             return Relationship.objects.get(pk=pk)
#         except Relationship.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def put(self, request, pk):
#         relationship = self.get_object(pk)
#         serializer = FriendSerializer(relationship, data=request.data, partial=True)
#         # {"dispatch": false}
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         relationship = self.get_object(pk)
#         relationship.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
