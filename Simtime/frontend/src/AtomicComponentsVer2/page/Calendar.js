import React, {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import CalendarTemplate from "../template/CalendarTemplate";
import { ModalContext } from "../../contexts/modalContext";

import TextButton from "../atom/buttons/TextButton"
import PencilIcon from "../atom/icons/PencilIcon"

import EventMaker from "../../AtomicComponents/D-Templates/Event/EventMaker"
import EventDetail from "../organism/calendar/event/EventDetail"
import EventList from "../organism/calendar/event/EventList"
import EventCalendar from "../organism/calendar/EventCalendar"
import Filters from "../organism/calendar/Filters"

import YNDialogModal from "../molecule/modal/YNDialogModal"
import InviteFriends from "../organism/calendar/modals/InviteFriends"

import {generate, getStrFullDate, addDate} from "../../actions/calendar"
  import {getEvent, getEvents, editEvent, addEvent} from "../../actions/events"
import { MAIN_COLOR } from "../../AtomicComponents/Colors";

import { getGroup, getGroups } from "../../actions/groups";
import { getFriends } from "../../actions/friends";

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
  //props
  const {getEvents, getFriends, getGroups, addEvent, groups, relationships, events, loading} = props;

  //context
  const { handleContextModal, closeContextModal, contextModalContent, setContextModalContent } = React.useContext(ModalContext);

  //calenedar 관련 states
  const [current, setCurrent] = useState(new Date()); 
  const [weekDates, setWeekDates] = useState([]); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState( getStrFullDate(new Date(), "yyyy-mm-dd"))

  //data
  const [selectedEvent, setSelectedEvent] = useState({}) 
  const [newEvent, setNewEvent] = useState(null)
  // modal
  const [modalContent, setModalContent] = useState(""); //modal (EventMaker, Dialog, InviteFriends, null )

  //ui
  const [showDetail, setShowDetail] = useState(false); // event-detail or list

  // hooks - useEffect
  useEffect(()=>{ 
    var {start, end, weeks} = generate(current, 5);
    setStartDate(start)
    setEndDate(end)
    setWeekDates(weeks)
    // event 정보 받아오기
    getEvents(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
  }, [])

  useEffect(()=>{
    if(modalContent=="InviteFriends"){
      setContextModalContent(<InviteFriends groups={groups} relationships={relationships}  onClick={handleContextModal} closeModal={handleContextModal} />)
    } 
  }, [groups, relationships])
  
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



  // event Click
  const eventClickHandler = (e, event) =>{
    e.stopPropagation();
    setSelectedEvent(event);
    setSelectedDate(event.event_date)
    setShowDetail(true);
  }

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

  const inviteSubmitHandler = (relationshipIds) =>{
    // console.log(relationshipIds) 
    // var invitations = new Array(relationshipIds.length)

    // relationshipIds.forEach( (relationshipId, index) => {
    //   invitations[index] = {event: newEvent, relationship:relationshipId  }

    // });

    // console.log(invitations)
    
    
    

  }

  const dateCellClickHandler = (e, date) =>{
    e.stopPropagation();
    setSelectedDate(date)
    setShowDetail(false);
  }


  const closeModal = () =>{
    setModalContent(null)
  }


  return (
    <Fragment>
      {loading&&<PencilIcon>Loading</PencilIcon>}
      <CalendarTemplate 
        leftTop =     {<Filters current={selectedDate} dateHandler={setCurrent}/>}  
        leftBottom =  {<EventCalendar 
                        dateClickHandler={dateCellClickHandler} 
                        eventClickHandler={eventClickHandler} 
                        selectedEvent={selectedEvent} 
                        selectedDate={selectedDate} 
                        current={current} 
                        dates={weekDates} 
                        events={events} />} 
        // rightTop =    { <NewButton color={"MAIN_COLOR"} onClick={dialogSubmitHandler}>
        rightTop =    { <NewButton color={"MAIN_COLOR"} onClick={()=>setModalContent("EventMaker")}>
                          <Pencil />New Event
                        </NewButton> }
        rightBottom = {showDetail ? 
                       <EventDetail event={selectedEvent} backHandler={()=>{setShowDetail(false)}} /> : 
                       <EventList events={events ? events[selectedDate] : [] } current={selectedDate}
                          dateHandler={setSelectedDate}
                          itemClickHandler={(e, event)=>{
                            e.preventDefault();
                            setShowDetail(true);
                            setSelectedEvent(event)} } /> 
                      }
      />
      </Fragment>
  )
}

const mapStateToProps = (state) => ({
  events: {...state.events.events},
  addedEvent: state.events.selectedEvent,
  groups: state.groups.groups,
  selectedGroup: state.groups.selectedGroup,
  relationships: state.friends.relationships,
  // loading: state.ui.loading

});

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: (start, end) => dispatch(getEvents(start, end)),
    getGroups: () => dispatch(getGroups()),
    getFriends: () => dispatch(getFriends()),
    editEvent: () => dispatch(editEvent()),
    addEvent: (myEvent, image) => dispatch(addEvent(myEvent, image))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);