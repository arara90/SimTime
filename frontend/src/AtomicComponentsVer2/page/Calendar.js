import React, {Fragment, useEffect, useState, useCallback,  useRef} from "react"
import styled from "styled-components"
import {connect} from "react-redux"

import CalendarTemplate from "../template/CalendarTemplate"
import {ModalContext} from "../../contexts/modalContext"

import TextButton from "../atom/buttons/TextButton"
import PencilIcon from "../atom/icons/PencilIcon"
import PlusCircleIcon from "../atom/icons/PlusCircleIcon"
import YNDialogModal from "../molecule/modal/YNDialogModal"

import Filters from "../organism/calendar/Filters"
import EventCalendar from "../organism/calendar/EventCalendar"
import EventDetail from "../organism/calendar/event/EventDetail"
import EventList from "../organism/calendar/event/EventList"
import InviteFriends from "../organism/calendar/modals/InviteFriends"
import EventMaker from "../../AtomicComponents/D-Templates/Event/EventMaker"

import {generate, getStrFullDate, addDate} from "../../util/calendar"
import {getEvents, addEvent} from "../../redux/actions/events"
import {getInvitations, addInvitations, selectInvitation} from "../../redux/actions/invitations"
import {getGroups} from "../../redux/actions/groups"
import {getFriends} from "../../redux/actions/friends"

const NewButton = styled(TextButton)`
  width: 100%;
  border-radius: 0;
  font-weight: bold;
  font-size: 1.25em;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const AddIcon = styled(PlusCircleIcon)`
  margin-right: 0.5em;
  font-size: 1.2rem;
`

const MyFilter = styled(Filters)`
`


function Calendar(props) {
  //1.props
  // const {getEvents, getFriends, getGroups, addEvent, getInvitations, addInvitations, groups, friendships ,invitations, loading} = props;
  const {getFriends, getGroups, getInvitations, addInvitations, selectInvitation, addEvent
    , loading, user, groups, friendships, invitations, selectedInvitation } = props;

  //2.context
  const { handleContextModal, closeContextModal, setContextModalContent } = React.useContext(ModalContext);

  //3.state
  ////calenedar 관련 
  const [current, setCurrent] = useState(new Date()); //현재 화면에 보이는 첫번째 날짜
  const [weekDates, setWeekDates] = useState(new Map()); //지금까지 읽은 전체 날짜들
  const [selectedDate, setSelectedDate] = useState( getStrFullDate(new Date(), "yyyy-mm-dd"))

  ////data
  const [onlyLike, setOnlylike] =  useState(false)
  const [onlyJoin, setOnlyJoin] =  useState(false)

  const [filteredInvitations, setFilteredInvitations] = useState({}) 
  const [selectedDateInvList, setSelectedDateInvList] = useState([]) 
  // const [selectedInvitation, setSelectedInvitation] = useState({}) 
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

  useEffect(()=>{ 
    //filter 적용
    if(invitations){
      var filtered = {}

      for (var date in invitations) {
        filtered[date] = invitations[date].filter(invitation => {
          if(invitation.show){
            if(onlyJoin && onlyLike){
              return invitation.like && invitation.attendance
            } else{
              if(onlyLike) return invitation.like
              if(onlyJoin) return invitation.attendance
            }
          
            return true            
          }
        })
      }
      setFilteredInvitations(filtered)
    }
  }, [invitations, onlyLike, onlyJoin])

  useEffect(()=>{ 
    if(selectedInvitation){
      setSelectedDate(selectedInvitation.event.event_date)
      setShowDetail(true);
    }

  }, [selectedInvitation])

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
        return <EventMaker eventSubmitHandler={eventSubmitHandler} selectedDate={selectedDate}  closeModal={closeModal}/>
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
  //// modal
  const closeModal = useCallback(() => setModalContent(null), [])
  
  //// click date cell
  const dateClickHandler = useCallback((e, date) =>{
    e.stopPropagation();
    console.log(date)
    setSelectedDate(date)
    setShowDetail(false);
    selectInvitation(null);
  }, [])

 const monthClickHandler = (res) => {
  console.log('monthClickHandler', res)
   //res는 Date객체
  var newDate = getStrFullDate(res, "yyyy-mm-dd")
  var { start, end, weeks } = generate(newDate, 6); 
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
  }else{
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
      getInvitations(dataStart, dataEnd);
    }
  }

  setCurrent(res)
  
 }


// click invitation
  const invitationClickHandler = React.useCallback((e, invitation) =>{
  e.stopPropagation();
  selectInvitation(invitation)
}, [])

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
  
  React.useEffect(()=>{
    var strDate = getStrFullDate(selectedDate,'yyyy-mm-dd')
    setSelectedDateInvList(filteredInvitations[strDate])
  }, [selectedDate, filteredInvitations])

  return (
    <Fragment>
      <CalendarTemplate 
        leftTop     = {<MyFilter id='filter' height={'inherit'} current={current} dateHandler={monthClickHandler} joinHandler={setOnlyJoin} likeHandler={setOnlylike} />}  
        leftBottom  = {<EventCalendar 
                        ref = {monthRefs}
                        dateClickHandler={dateClickHandler}
                        invitationClickHandler={invitationClickHandler} 
                        current={current} 
                        dates={weekDates} 
                        invitations={filteredInvitations} />
                      } 
        rightTop    = { <NewButton height={'inherit'} color={"MAIN_COLOR"} onClick={()=>setModalContent("EventMaker")}>
                          <AddIcon />New Event
                        </NewButton> 
                      }
        rightBottom = {showDetail ? 
                       <EventDetail isHost={selectedInvitation.event.host.id == user.id } invitation={selectedInvitation} backHandler={()=>{setShowDetail(false)}} /> : 
                       <EventList 
                        invitations={selectedDateInvList}
                        current={selectedDate}
                        dateHandler={(date)=>{
                          setSelectedDate(getStrFullDate(date, 'yyyy-mm-dd'))
                        }}
                        itemClickHandler={(e, invitation)=>{
                          e.preventDefault();
                          setShowDetail(true);
                          selectInvitation(invitation)} } /> 

                      }
      />
      </Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  invitations: state.invitations.datas,
  selectedInvitation: state.invitations.selected,
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
    addInvitations: (event, friendIds) => dispatch(addInvitations(event, friendIds)),
    selectInvitation: (invitation) => dispatch(selectInvitation(invitation))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);