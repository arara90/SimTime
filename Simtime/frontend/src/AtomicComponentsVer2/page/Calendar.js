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
import {getEvent, getEvents} from "../../actions/events"
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
  const {getEvents, getFriends, getGroups, groups, relationships, events} = props;

  //context
  const { handleContextModal, closeContextModal, contextModalContent, setContextModalContent } = React.useContext(ModalContext);

  //calenedar 관련 states
  const [current, setCurrent] = useState(new Date()); 
  const [weekDates, setWeekDates] = useState([]); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState( getStrFullDate(new Date(), "yyyy-mm-dd"))

  const [selectedEvent, setSelectedEvent] = useState({}) 
  const [showDetail, setShowDetail] = useState(false); // event-detail or list
  const [modalContent, setModalContent] = useState(""); //modal (EventMaker, Dialog, InviteFriends, null )

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
    if(!contextModalContent) setModalContent(null)
  }, [contextModalContent])

  
  useEffect(()=>{
    function renderContext(){
      if(modalContent=="EventMaker"){
        return <EventMaker submitHandler={eventSubmitHandler} />
      }else if(modalContent=="Dialog"){
        return <YNDialogModal leftBtnClickHandler={dialogSubmitHandler} rightBtnClickHandler={handleContextModal} closeModal={handleContextModal}> 지금 친구들을 초대하시겠습니까? </YNDialogModal>
      }else if(modalContent=="InviteFriends"){
        return <InviteFriends groups={groups} relationships={relationships} onClick={handleContextModal} closeModal={closeModal} />
      }else return null
    }

    if(modalContent){
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

  const eventSubmitHandler = () =>{
    closeContextModal()
    setModalContent("Dialog")
  }

  
  const dialogSubmitHandler = () => {
    // closeContextModal()
    var promise = new Promise(function(resolve, reject) {

      var gStatus =  getGroups()
      var fStatus = getFriends()

      resolve( gStatus && fStatus)
      reject(new Error("Request is failed"))
    });

    promise.then((res)=>{ 
      if(res==200)  setModalContent("InviteFriends")
      }).catch((err)=>{console.log(err)})

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
        rightTop =    { <NewButton color={"MAIN_COLOR"} onClick={dialogSubmitHandler}>
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
  )
}

const mapStateToProps = (state) => ({
  events: {...state.events.events},
  selectedEvent: state.events.selectedEvent,
  groups: state.groups.groups,
  selectedGroup: state.groups.selectedGroup,
  relationships: state.friends.relationships,
  
});

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: (start, end) => dispatch(getEvents(start, end)),
    getGroups: () => dispatch(getGroups()),
    getFriends: () => dispatch(getFriends()),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);