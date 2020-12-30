from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.postgres.fields import ArrayField
from django.conf import settings
# from django.contrib.auth.models import User as User

# Model의 관계
# https://nachwon.github.io/django-relationship/


def user_path(instance, filename):  # instance는 Photo 클래스의 객체, filename은 업로드할 파일의 파일이름
    from random import choice   # string으로 나온 결과에서 하나의 문자열만 뽑아냄
    import string               # 무작위 문자열을 뽑아내기 위한 용도
    arr = [choice(string.ascii_letters) for _ in range(8)]  # 무작위로 8글자를 뽑아줌
    pid = filename.split('.')[0] + "-" + (''.join(arr))       # 파일 아이디생성
    extension = filename.split('.')[-1]  # 파일이름으로부터 확장자명가져오기
    # ex) honux/asfqqwer.png
    return '%s/%s.%s' % (instance.host, pid, extension)

# Modify Table Name


class CustomizedModelBase(models.base.ModelBase):
    def __new__(cls, name, bases, attrs, **kwargs):
        if name != "CustomizedModel":
            class MetaB:
                db_table = name

            attrs["Meta"] = MetaB

        r = super().__new__(cls, name, bases, attrs, **kwargs)
        return r


class CustomizedModel(models.Model, metaclass=CustomizedModelBase):
    class Meta:
        abstract = True


# Create your models here.
class EventStatus(models.TextChoices):
    CLOSED = 'CLOSED'  # 0
    OPEN = 'OPEN'  # 1
    PENDING = 'PENDING'  # 2


# class Attendance(models.TextChoices):
#     No = 'N'  # 0
#     Yes = 'Y'  # 1
#     Unknown = "Waiting for a response"  # 2

# attendance = models.CharField(max_length=25, choices=Attendance.choices, default=Attendance.Unknown)

def default_place_dict():
    return {'name': '', 'address': '', 'lat': '', 'lng': ''}


class Event(CustomizedModel):
    # 추후에 EvnetType 테이블 정의, ForeignKey
    objects = models.Manager()
    # related_name: User가 가지고 있는 invitations들을 조회, user.event.all()이 가능해짐
    host = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, related_name='events')
    event_name = models.CharField(max_length=200, blank=False)
    event_time = models.DateTimeField(blank=False, null=False)
    event_place = JSONField(default=default_place_dict)
    tags = ArrayField(models.CharField(max_length=200),
                      null=True, blank=True, default=list)  # 미구현
    status = models.CharField(max_length=10,
                              choices=EventStatus.choices,
                              default=EventStatus.OPEN)

    message = models.TextField(blank=True, null=True)
    photo = models.ImageField(upload_to=user_path, blank=True, null=True)
    color = models.CharField(max_length=10, default="ST_VIOLET")  # violet
    font_color = models.CharField(max_length=10, default="ST_WHITE")

    created_at = models.DateTimeField(auto_now_add=True)


# # Create your models here.
# class Invitation(CustomizedModel):
#     objects = models.Manager()
#     event = models.ForeignKey(
#         Event, on_delete=models.CASCADE, related_name='invitations')
#     # guest = models.ForeignKey(
#     #     settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='invitations')
#     attendance = models.CharField(
#         max_length=25, choices=Attendance.choices, default=Attendance.Unknown)


# Create your models here.
class Invitation(models.Model):
    objects = models.Manager()
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='invitations')
    relationship = models.ForeignKey(settings.AUTH_USER_RELATIONSHIP_MODEL, on_delete=models.CASCADE, related_name='invitations', default = 72 )
    guest = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='invitations', blank=False, default = 1 )
    attendance = models.BooleanField(default=False)
    # 초대받은 사람의 달력에 보일것인지, 초대받은 사람이 설정함
    show = models.BooleanField(default=True)
    like = models.BooleanField(default=False)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['event', 'relationship'], name='er_compositeKey')]