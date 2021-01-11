import React, {Fragment, useEffect, useState} from "react"
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

import {generate, getStrFullDate, addDate} from "../../redux/actions/calendar"
import {getEvents, addEvent} from "../../redux/actions/events"
import {getInvitations, addInvitations, acceptInvitations} from "../../redux/actions/invitations"
import {getGroups} from "../../redux/actions/groups"
import {getFriends} from "../../redux/actions/friends"

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

const Error = styled.div`
width: 200px;
height: 200px;
background: red;
`

function Calendar(props) {
  //1.props
  // const {getEvents, getFriends, getGroups, addEvent, getInvitations, addInvitations, groups, friendships ,invitations, loading} = props;
  const {getFriends, getGroups, getInvitations, addInvitations, addEvent, loading, user, groups, friendships, invitations} = props;


  //2.context
  const { handleContextModal, closeContextModal, setContextModalContent } = React.useContext(ModalContext);

  //3.state
  ////calenedar 관련 
  const [current, setCurrent] = useState(new Date()); 
  const [weekDates, setWeekDates] = useState([]); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState( getStrFullDate(new Date(), "yyyy-mm-dd"))
  ////data
  const [filteredInvitations, setFilteredInvitations] = useState({}) 
  const [selectedInvitation, setSelectedInvitation] = useState({}) 
  const [newEvent, setNewEvent] = useState(null)
  //// modal
  const [modalContent, setModalContent] = useState(""); //modal (EventMaker, Dialog, InviteFriends, null )
  ////ui
  const [showDetail, setShowDetail] = useState(false); // invitation-detail or list

  //4.hooks - useEffect
  //// initialization
  useEffect(()=>{ 
    var {start, end, weeks} = generate(current, 5);
    setStartDate(start)
    setEndDate(end)
    setWeekDates(weeks)

    // invitations 정보 받아오기
    getEvents(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
    getInvitations(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
  }, [])

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
  //// modal
  const closeModal = () => setModalContent(null)
  //// click date cell
  const dateCellClickHandler = (e, date) =>{
    e.stopPropagation();
    setSelectedDate(date)
    setShowDetail(false);
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
      {loading&&<PencilIcon>Loading</PencilIcon>}
      <CalendarTemplate 
        leftTop     = {<Filters current={selectedDate} dateHandler={setCurrent}/>}  
        leftBottom  = {<EventCalendar 
                        dateClickHandler={dateCellClickHandler} 
                        invitationClickHandler={invitationClickHandler} 
                        selectedInvitation={selectedInvitation} 
                        selectedDate={selectedDate} 
                        current={current} 
                        dates={weekDates} 
                        invitations={filteredInvitations} />
                      } 
        rightTop    = { <NewButton color={"MAIN_COLOR"} onClick={()=>setModalContent("EventMaker")}>
                          <Pencil />New Event
                        </NewButton> 
                      }
        rightBottom = {showDetail ? 
                       <EventDetail isHost={selectedInvitation.event.host.id == user.id } invitation={selectedInvitation} backHandler={()=>{setShowDetail(false)}} /> : 
                       <EventList invitations={filteredInvitations ? filteredInvitations[selectedDate] : [] } current={selectedDate}
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
  addedEvent: state.events.selectedEvent,
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