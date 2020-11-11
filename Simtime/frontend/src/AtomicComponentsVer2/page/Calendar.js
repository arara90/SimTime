import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import CalendarTemplate from "../template/CalendarTemplate";
import { ModalContext } from "../../contexts/modalContext";

import TextButton from "../atom/buttons/TextButton"

import EventMaker from "../../AtomicComponents/D-Templates/Event/EventMaker"
import EventDetail from "../organism/calendar/event/EventDetail"
import EventList from "../organism/calendar/event/EventList"
import EventCalendar from "../organism/calendar/EventCalendar"
import GetEventButton from "./GetEventButton"

import {generate, getStrFullDate, addDate} from "../../actions/calendar"
import {getEvent, getEvents} from "../../actions/events"

function Calendar(props) {
  //props
  const {getEvents, events} = props;

  //context
  const { handleContextModal, closeContextModal } = React.useContext(ModalContext);

  //calendar 관련 states
  const [current, setCurrent] = useState(new Date()); 
  const [weekDates, setWeekDates] = useState([]); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectdDate, setSelectedDate] = useState( getStrFullDate(new Date(), "yyyy-mm-dd"))
  const [selectedEvent, setSelectedEvent] = useState({})
  // const [dates, setDates] = useState( { str:null, end:null , weeks:[] }); 

  //event-detail or list
  const [showDetail, setShowDetail] = useState(false);
  


  useEffect(()=>{ 
    var {start, end, weeks} = generate(current, 5);
    setStartDate(start)
    setEndDate(end)
    setWeekDates(weeks)

    // event 정보 받아오기
    getEvents(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
  }, [])


  useEffect(()=>{ 
    console.log(showDetail)
  },[showDetail])

  useEffect(()=>{ 
    console.log(startDate, endDate)
  })

  //calendar 이동
  const clickNextHandler=(type="next")=>{
    if(type=="prev"){
      var {start, end, weeks} = generate(addDate(startDate,-1), -5 )
      setCurrent(start)
      setWeekDates(weeks)

      if( start<startDate){
        setStartDate(start)
        getEvents(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
      }
    }else{
      var {start, end, weeks} = generate(addDate(endDate,1), 5);
      
      setCurrent(start)
      setWeekDates(weeks)
      
      if(end>endDate){
        setEndDate(end)
        getEvents(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
      }
    }
  }

  return (
      <CalendarTemplate 
        leftTop={<GetEventButton clickHandler={clickNextHandler} current={current}/>}  
        
        leftBottom={<EventCalendar current={current} dates={weekDates} events={events} />} 
        
        rightTop={<TextButton onClick={() =>handleContextModal(<EventMaker closeModal={closeContextModal}/>)}> New Event </TextButton>} 
        
        rightBottom={ showDetail ? 
          <EventDetail 
            event={selectedEvent}
            backHandler={()=>{setShowDetail(false);}} /> : 
          <EventList
            events={events ? events[selectdDate] : []} 
            current={selectdDate}
            dateHandler={()=>{}}
            itemClickHandler={(e, event)=>{
              // e.stopPropagation();
              
              e.preventDefault();
              console.log('itemClickHandler', event)
              setShowDetail(true);
              setSelectedEvent(event)
            }}
            />}
      />

  )
}

const mapStateToProps = (state) => ({
  events: state.events.events,
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