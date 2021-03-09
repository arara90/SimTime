# Simtime

**친구들이 알아서 모이는 약속잡기 프로젝트. 함께하면 더 즐거운 시간 :point_right: [SimTime](simti.me) :point_left:에서 공유해요!**  

> 이번주 금요일.. 나만 약속없어..? :cry: 예상치 못한 칼퇴!  이대로 그냥 집에 못가! :beer:  
>
> 여의도 출장 잡혔습니다.  같이 점심 드실 분?:curry:  답답해.. hoxy.. 주말에 바다보러 같이 갈 사람있나? :bus:  
>
> 뭐?! 그때 너도 거기 있었다고?! 그때 알았으면 우리 만날 수 있었는데..!! :no_good: 
 

![simtime](https://github.com/arara90/images/blob/master/Simtime/readme/img001.png?raw=true)



메신저 친구 목록보면서 누가 시간이 될까? 누가 거기에 있나? 그만 고민하고 친구들에게 내 시간을 공유하세요. 

혹시 알아요? 밥 한번 같이 먹자던 그 친구와 오늘 저녁 밥 한번 먹게 될지!!  Finally!!  
  
  
## 기술 스택

### FrontEnd

- React, Redux, webpack

- Atomic Designs pattern 적용
  
  

### BackEnd

* Django, Postgresql



### ETC

Git, Figma



### Architecture

![architecture](https://github.com/arara90/images/blob/master/Simtime/readme/architecture.png?raw=true)





## 기능상세

### Accounts

* Register / Login / 회원정보 수정 (jwt)

  

### Calendar
Filter - 좋아요 / 참석여부
날짜 이동  
  
  
👇Click! -Clendar 페이지 영상보기  
[![calendar](http://img.youtube.com/vi/BugwMZUyBGY/0.jpg)](https://youtu.be/BugwMZUyBGY?t=0s)

#### 이벤트(event)
* 추가/삭제/수정
* 초대장 보내기 - 친구의 달력에 나의 이벤트를 보여줌  
  
  
👇Click! -Event 추가 영상보기  
[![addEvent](http://img.youtube.com/vi/jdDfMK4clwU/0.jpg)](https://youtu.be/jdDfMK4clwU?t=0s)  
👇Click! -Event 수정 영상보기  
[![editEvent](http://img.youtube.com/vi/UcQqXb_ZtuA/0.jpg)](https://youtu.be/UcQqXb_ZtuA?t=0s)


### Friends
#### 친구등록/관리

* 친구목록
* 친구추가/삭제 - 친구검색 / 그룹에 추가
* 수신거부 - 친구의 초대장 받지 않기



#### 그룹등록/관리

* 그룹목록
* 그룹추가
* 멤버관리 - 멤버 추가(검색) , 멤버삭제  

👇Click! -Friend 페이지 영상보기  
[![editEvent](http://img.youtube.com/vi/BugwMZUyBGY/0.jpg)](https://youtu.be/Ml1Wn07VXog?t=0s)

## What's Next?

1) 카카오 API 활용 - 작업중

	- 로그인
	- 친구 목록 불러오기
	- 메세지 보내기



2) 반응형 - 작업중

* 모바일 버전 완성하기


3) 최적화 & 리팩토링

* 버전별로 흩어진 코드 리팩토링 필요
  *  components -> AtomicComponents -> AtomicComponentsVer2 순으로 진화함

4) 태그 기능
