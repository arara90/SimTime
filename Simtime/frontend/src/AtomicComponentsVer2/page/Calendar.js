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
import {getEvents, editEvent, addEvent} from "../../redux/actions/events"
import {getInvitations, addInvitations} from "../../redux/actions/invitations"
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
  // const {getEvents, getFriends, getGroups, addEvent, getInvitations, addInvitations, groups, relationships ,invitations, loading} = props;
  const {getFriends, getGroups, getInvitations, addInvitations, addEvent, groups, relationships ,invitations, loading} = props;

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

  //// update friends information
  useEffect(()=>{
    if(modalContent=="InviteFriends"){
      setContextModalContent(<InviteFriends groups={groups} relationships={relationships} onClick={handleContextModal} closeModal={handleContextModal} />)
    } 
  }, [groups, relationships])
  
  //// change modals
  useEffect(()=>{
    function renderContext(){
      if(modalContent=="EventMaker"){
        return <EventMaker eventSubmitHandler={eventSubmitHandler} />
      }else if(modalContent=="Dialog"){
        return <YNDialogModal leftBtnClickHandler={dialogSubmitHandler} rightBtnClickHandler={closeContextModal} closeModal={closeContextModal}> 지금 친구들을 초대하시겠습니까? </YNDialogModal>
      }else if(modalContent=="InviteFriends"){
        return <InviteFriends groups={groups} relationships={relationships} inviteSubmitHandler={inviteSubmitHandler} closeModal={closeModal} />
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
    console.log(date)
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
      var res =  await addEvent(event, image); 
      setNewEvent(res)
      //modal 변경
      await closeContextModal()
      setModalContent("Dialog")
    }catch(e){
      console.log("relationshipError", e); 
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
  const inviteSubmitHandler = async (relationshipIds) =>{ 
    console.log(relationshipIds)
    var res = await addInvitations(newEvent, relationshipIds)
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
                        invitations={invitations} />
                      } 
        rightTop    = { <NewButton color={"MAIN_COLOR"} onClick={()=>setModalContent("EventMaker")}>
                          <Pencil />New Event
                        </NewButton> 
                      }
        rightBottom = {showDetail ? 
                       <EventDetail invitation={selectedInvitation} backHandler={()=>{setShowDetail(false)}} /> : 
                       <EventList invitations={invitations ? invitations[selectedDate] : [] } current={selectedDate}
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
  // events: state.events.events,
  invitations: state.invitations.datas,
  addedEvent: state.events.selectedEvent,
  groups: state.groups.groups,
  selectedGroup: state.groups.selectedGroup,
  relationships: state.friends.relationships,
  loading: state.loading

});

const mapDispatchToProps = (dispatch) => {
  return {
    // getEvents: (start, end) => dispatch(getEvents(start, end)),
    // editEvent: () => dispatch(editEvent()),
    getGroups: () => dispatch(getGroups()),
    getFriends: () => dispatch(getFriends()),
    addEvent: (myEvent, image) => dispatch(addEvent(myEvent, image)),
    getInvitations: (start, end)=>dispatch(getInvitations(start, end)),
    addInvitations: (event, relationshipIds) => dispatch(addInvitations(event, relationshipIds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);