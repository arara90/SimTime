import React, {Fragment, useEffect, useState, useRef} from "react"
import styled from "styled-components"
import {connect} from "react-redux"

import CalendarTemplate from "../template/CalendarTemplate"
import {ModalContext} from "../../contexts/modalContext"

import TextButton from "../atom/buttons/TextButton"
import PencilIcon from "../atom/icons/PencilIcon"
import YNDialogModal from "../molecule/modal/YNDialogModal"

import Filters from "../organism/calendar/Filters"
import EventCalendar from "../organism/calendar/EventCalendar"
import EventDetail from "../organism/calendar/event/EventDetail"
import EventList from "../organism/calendar/event/EventList"
import InviteFriends from "../organism/calendar/modals/InviteFriends"
import EventMaker from "../../AtomicComponents/D-Templates/Event/EventMaker"


import {MAIN_COLOR} from "../../AtomicComponents/Colors"

import {generate, getStrFullDate, addDate, subWeek} from "../../redux/actions/calendar"
import {getEvents, addEvent} from "../../redux/actions/events"
import {getInvitations, addInvitations, acceptInvitations} from "../../redux/actions/invitations"
import {getGroups} from "../../redux/actions/groups"
import {getFriends} from "../../redux/actions/friends"


const topHeight='2.5em';

const NewButton = styled(TextButton)`
  width: 100%;
  border-radius: 0;
  font-weight: bold;
  font-size: 1.25em;
  border: solid 1px ${MAIN_COLOR};
`

const Pencil = styled(PencilIcon)`
  transform: rotate(275deg);
  margin-right: 0.5em;
  font-size: 1rem;
`

const MyFilter = styled(Filters)`
border: solid 1px ${MAIN_COLOR};
`


function Calendar(props) {
  //1.props
  // const {getEvents, getFriends, getGroups, addEvent, getInvitations, addInvitations, groups, friendships ,invitations, loading} = props;
  const {getFriends, getGroups, getInvitations, addInvitations, addEvent, loading, user, groups, friendships, invitations} = props;

  //2.context
  const { handleContextModal, closeContextModal, setContextModalContent } = React.useContext(ModalContext);

  //3.state
  ////calenedar 관련 
  const [current, setCurrent] = useState(new Date()); //현재 화면에 보이는 첫번째 날짜
  const [weekDates, setWeekDates] = useState(new Map()); //지금까지 읽은 전체 날짜들
  const [selectedDate, setSelectedDate] = useState( getStrFullDate(new Date(), "yyyy-mm-dd"))

  ////data
  const [filteredInvitations, setFilteredInvitations] = useState({}) 
  const [selectedInvitation, setSelectedInvitation] = useState({}) 
  const [newEvent, setNewEvent] = useState(null)
  //// modal
  const [modalContent, setModalContent] = useState(""); //modal (EventMaker, Dialog, InviteFriends, null )
  ////ui
  const [showDetail, setShowDetail] = useState(false); // invitation-detail or list


  //4. ref
  const startDate = useRef(null);; //지금까지 읽어온 데이터 중 첫번째 날짜
  const endDate = useRef(null);//지금까지 읽어온 데이터 중 마지막날짜
  const monthRefs = useRef({})

  //5.hooks - useEffect
  //// initialization
  useEffect(()=>{ 
    var {start, end, weeks} = generate(new Date(), 7);

    setCurrent(start)
    setWeekDates(weeks)
    startDate.current = start
    endDate.current = end

    // invitations 정보 받아오기
    getEvents(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
    getInvitations(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
  }, [])

  // useEffect(
  //   ()=>{
  //     console.log('newWeekDates', weekDates)
  //     document.addEventListener('scroll', handleScroll)
  //   }
  // )

  useEffect(()=>{ 
    //filter 적용
    if(invitations){
      var filtered = {}
      for (var date in invitations) {
        filtered[date] = invitations[date].filter(invitaion =>invitaion.show)
      }
      setFilteredInvitations(filtered)
    }

  }, [invitations])

  //// update friends information
  useEffect(()=>{
    if(modalContent=="InviteFriends"){
      setContextModalContent(<InviteFriends groups={groups} friendships={friendships} onClick={handleContextModal} closeModal={handleContextModal} />)
    } 
  }, [groups, friendships])
  
  //// change modals
  useEffect(()=>{
    function renderContext(){
      if(modalContent=="EventMaker"){
        return <EventMaker eventSubmitHandler={eventSubmitHandler} />
      }else if(modalContent=="Dialog"){
        return <YNDialogModal leftBtnClickHandler={dialogSubmitHandler} rightBtnClickHandler={closeContextModal} closeModal={closeContextModal}> 지금 친구들을 초대하시겠습니까? </YNDialogModal>
      }else if(modalContent=="InviteFriends"){
        return <InviteFriends groups={groups} friendships={friendships} inviteSubmitHandler={inviteSubmitHandler} closeModal={closeModal} />
      }else return null
    }

    if(modalContent) {
      handleContextModal(renderContext())
    }
  }, [modalContent])


  //5. functions
  // function handleScroll(){
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   const clientHeight = document.documentElement.clientHeight;

  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     var curr = new Date(current)
  //     var res = new Date(current)
  //     var newMonth = curr.getMonth() + 2
  //     res.setMonth(newMonth);
  //     res.setDate(1);
  //     console.log('res', res)

  //     monthClickHandler(res)
  //   }
  // }


  //// modal
  const closeModal = () => setModalContent(null)
  //// click date cell
  const dateClickHandler = (e, date) =>{
    e.stopPropagation();
    setSelectedDate(date)
    setShowDetail(false);
  }

 const monthClickHandler= (res)=>{
  var newDate = new Date(getStrFullDate(res, 'date'))
  var { start, end, weeks } = generate(newDate, 7); 
  //6주차에 해당하는 {첫날, 끝날, 해당기간 내 모든날}
  var newWeekDates = new Map()

  //새롭게 읽을 데이터 시작/끝
  var dataStart = ''
  var dataEnd = ''

  // 매월 첫주차(day=0) element 저장 -> scrollTo 지점
  monthRefs.current[getStrFullDate(start, "yyyy-mm-dd")] = null;


  if(res<startDate.current){
    //Prev Month
    if(start < startDate.current ){
      //data 구간 구하기
      dataStart = getStrFullDate(start, "yyyy-mm-dd");
      dataEnd = getStrFullDate(new Date(addDate(startDate.current, -1)), "yyyy-mm-dd"); 

      //새로 읽어온 주차 먼저 입력 후, 그 다음 기존값 붙여넣기
      weeks.forEach((v,k)=>newWeekDates.set(k,v))
      weekDates.forEach((v,k)=>newWeekDates.set(k,v))

      //setStates
      startDate.current = start
      setWeekDates(newWeekDates)
      getInvitations(dataStart, dataEnd);
    }

  }
  else{
    //Next Month
    if(end > endDate.current ){
      //data 구간 구하기
      dataStart = getStrFullDate(new Date(addDate(endDate.current, 1)), "yyyy-mm-dd"); 
      dataEnd = getStrFullDate(end, "yyyy-mm-dd");

      // 기존값에 새로 읽은 주차 붙이기
      newWeekDates = new Map(weekDates)
      weeks.forEach((v,k)=>newWeekDates.set(k,v))

      //set States
      endDate.current = end
      setWeekDates(newWeekDates)
    }
  }
  setCurrent(res)

 }



//// click invitation
  const invitationClickHandler = (e, invitation) =>{
  e.stopPropagation();
  setSelectedInvitation(invitation);
  setSelectedDate(invitation.event.event_date)
  setShowDetail(true);
}

  //// submit new event
  const eventSubmitHandler = async (event, image) =>{
    try{
      //event 추가
      var res = await addEvent(event, image); 
      setNewEvent(res)
      //modal 변경
      await closeContextModal()
      setModalContent("Dialog")
    }catch(e){
      console.log("Error", e); 
    }
  }
  //// submit yn dialog
  const dialogSubmitHandler = async () => {
    try{
      await closeContextModal()
      var gStatus = await getGroups()
      var fStatus = await getFriends()
      if(gStatus==200&&fStatus==200) setModalContent("InviteFriends")
    }catch(e){
      console.log(e)
    }
  }
  //// submit invitation
  const inviteSubmitHandler = async (friendIds) =>{ 
    await addInvitations(newEvent, friendIds)
    closeContextModal()
  }

  return (
    <Fragment>
      {/* {loading&&<PencilIcon>Loading</PencilIcon>} */}
      <CalendarTemplate 
        leftTop     = {<MyFilter id='filter' height={topHeight} current={current} dateHandler={monthClickHandler}/>}  
        leftBottom  = {<EventCalendar 
                        ref = {monthRefs}
                        dateClickHandler={dateClickHandler}
                        invitationClickHandler={invitationClickHandler} 
                        selectedInvitation={selectedInvitation} 
                        current={current} 
                        dates={weekDates} 
                        invitations={filteredInvitations} />
                      } 
        rightTop    = { <NewButton  height={topHeight} color={"MAIN_COLOR"} onClick={()=>setModalContent("EventMaker")}>
                          <Pencil />New Event
                        </NewButton> 
                      }
        rightBottom = {showDetail ? 
                       <EventDetail isHost={selectedInvitation.event.host.id == user.id } invitation={selectedInvitation} backHandler={()=>{setShowDetail(false)}} /> : 
                       <EventList 
                        invitations={filteredInvitations ? filteredInvitations[selectedDate] : [] }
                        current={selectedDate}
                        dateHandler={setSelectedDate}
                        itemClickHandler={(e, invitation)=>{
                          e.preventDefault();
                          setShowDetail(true);
                          setSelectedInvitation(invitation)} } /> 

                      }
      />
      </Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  invitations: state.invitations.datas,
  groups: state.groups.groups,
  selectedGroup: state.groups.selectedGroup,
  friendships: state.friends.friendships,
  loading: state.loading
});

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => dispatch(getGroups()),
    getFriends: () => dispatch(getFriends()),
    addEvent: (myEvent, image) => dispatch(addEvent(myEvent, image)),
    getInvitations: (start, end)=>dispatch(getInvitations(start, end)),
    addInvitations: (event, friendIds) => dispatch(addInvitations(event, friendIds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);