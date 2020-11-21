import React, {useEffect, useState} from "react";
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


// const InviteFriends = styled.div`
// width: 200px;
// height: 200px;
// background: blue;
// `

const Error = styled.div`
width: 200px;
height: 200px;
background: red;
`

function Calendar(props) {
  //props
  const {getEvents, events} = props;

  //context
  const { handleContextModal, closeContextModal, setContextModalContent } = React.useContext(ModalContext);

  //hooks

  ///// states calendar 관련 states
  const [current, setCurrent] = useState(new Date()); 
  const [weekDates, setWeekDates] = useState([]); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState( getStrFullDate(new Date(), "yyyy-mm-dd"))
  const [selectedEvent, setSelectedEvent] = useState({})

  ///// states - calendar 관련 statesevent-detail or list
  const [showDetail, setShowDetail] = useState(false);
  
  ///// states - modal 관련 
  const [modalContent, setModalContent] = useState(null);
  //EventMaker, Dialog, Invite, null 

  ///// useEffect
  useEffect(()=>{ 
    var {start, end, weeks} = generate(current, 5);
    setStartDate(start)
    setEndDate(end)
    setWeekDates(weeks)
    // event 정보 받아오기
    getEvents(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));

  }, [])

  useEffect(()=>{ 
    if(modalContent) setContextModalContent(renderModalContext(modalContent))
    else closeContextModal()
  }, [modalContent])


  // event Click
  const eventClickHandler = (e, event) =>{
    e.stopPropagation();
    setSelectedEvent(event);
    setSelectedDate(event.event_date)
    setShowDetail(true);
  }

  const dateCellClickHandler = (e, date) =>{
    e.stopPropagation();
    setSelectedDate(date)
    setShowDetail(false);
  }

  //renders
  const renderModalContext= (content) =>{
    if(content=="EventMaker"){
      return <EventMaker closeModal={closeContextModal} submitHandler={()=>setContextModalContent(renderModalContext("Dialog"))} />
    }else if(content=="Dialog"){
      return (
        <YNDialogModal 
          leftBtnClickHandler={()=>setContextModalContent(renderModalContext("InviteFriends"))} 
          rightBtnClickHandler={closeContextModal} 
          closeModal={closeContextModal} >
        지금 친구들을 초대하시겠습니까?
        </YNDialogModal>
        )
    }else if(content=="InviteFriends"){
      async () => {

      }
      return <InviteFriends onClick={closeContextModal} closeModal={closeContextModal}/>
    }else{
    return <div>ggg</div>
    }
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
        rightTop =    {<NewButton color={"MAIN_COLOR"} onClick={()=>handleContextModal(renderModalContext("InviteFriends"))}>
                          <Pencil />New Event
                        </NewButton>}
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
  selectedEvent: state.events.selectedEvent
});

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: (start, end) => dispatch(getEvents(start, end)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

  // datas = [
  //   {
  //     strDate: "2020-11-01", year: 2020, month: 11, date: "1", day: 0, id: "-5D", 
  //     isActive: false, isActiveMonth: true, 
  //     events: [eventId, eventId, eventId, eventId]
  //   }, {
  //     strDate: "2020-11-02", year: 2020, month: 11, date: "2", day: 0, id: "-4D", 
  //     isActive: false, isActiveMonth: true, 
  //     events: [eventId, eventId, eventId, eventId]
  //   }
  // ]

  // //calendar 이동
  // const clickNextHandler=(type="next")=>{
  //   if(type=="prev"){
  //     var {start, end, weeks} = generate(addDate(startDate,-1), -5 )
  //     setCurrent(start)
  //     setWeekDates(weeks)

  //     if( start<startDate){
  //       setStartDate(start)
  //       getEvents(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
  //     }
  //   }else{
  //     var {start, end, weeks} = generate(addDate(endDate,1), 5);
      
  //     setCurrent(start)
  //     setWeekDates(weeks)
      
  //     if(end>endDate){
  //       setEndDate(end)
  //       getEvents(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
  //     }
  //   }
  // }
