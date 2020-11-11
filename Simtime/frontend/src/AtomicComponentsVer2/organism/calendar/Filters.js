// import React from 'react';
// import styled from "styled-components";
// import PropTypes from "prop-types";

// import * as Colors from "../../Colors";


// const Wrap = styled.div`
// `

// function Filters(props) {
//     return (
//         <Wrap>
            
//         </Wrap>
//     )
// }

// export default Filters

// Filters.propTypes = {
//   };

// Filters.defaultProps = {

//   };
  

//   import React, {useEffect, useState} from "react";
// import styled from "styled-components";
// import { connect } from "react-redux";

// import CalendarTemplate from "../template/CalendarTemplate";

// import TextButton from "../atom/buttons/TextButton"
// import EventDetail from "../organism/calendar/event/EventDetail"
// import EventList from "../organism/calendar/event/EventList"
// import EventCalendar from "../organism/calendar/EventCalendar"
// import GetEventButton from "./GetEventButton"

// import {generate, getStrFullDate, addDate} from "../../actions/calendar"
// import {getEvent, getEvents} from "../../actions/events"

function Calendar(props) {
  const {getEvents, events} = props;

  const [current, setCurrent] = useState(new Date('2020-07-15'));  //당일 또는 달력 UI상 첫 날
  const [weekDates, setweekDates] = useState([]); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function getDatas(date, num=5){
    // 화면에 보여줄 날짜정보 가져오기 & 저장
    var newDates = generate(date, 5);
    setStartDate(start)
    setEndDate(end)
    setCurrent(newDates.start)
    setweekDates(weeks)

    // event 정보 받아오기
    getEvents(getStrFullDate(newDates.start, "yyyy-mm-dd"), getStrFullDate(newDates.end, "yyyy-mm-dd"));

  }

  useEffect(()=>{ 
    getDatas(current,5)
    
  }, [])

  useEffect(()=>{ 
    console.log(dates.start, dates.end)
    
  })



//   const clickNextHandler=(type="next")=>{
//     if(type=="prev"){
//       getDatas(addDate(dates.start,-1), -5 )
//     }else{

//       getDatas(addDate(dates.end,1), 5 )
//     }

    
//   }

//   return (
//       <CalendarTemplate 
//         leftTop={<GetEventButton clickHandler={clickNextHandler} current={current}/>} 
//         leftBottom={<EventCalendar current={current} dates={dates.weeks} events={events} />} 
//         rightTop={<TextButton> New Event </TextButton>} 
//         rightBottom={<EventDetail />}
//       />

//   )
// }

// const mapStateToProps = (state) => ({
//   events: state.events.events,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getEvents: (str, end) => dispatch(getEvents(str, end)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Calendar);


  

//   // datas = [
//   //   {
//   //     strDate: "2020-11-01", year: 2020, month: 11, date: "1", day: 0, id: "-5D", 
//   //     isActive: false, isActiveMonth: true, 
//   //     events: [eventId, eventId, eventId, eventId]
//   //   }, {
//   //     strDate: "2020-11-02", year: 2020, month: 11, date: "2", day: 0, id: "-4D", 
//   //     isActive: false, isActiveMonth: true, 
//   //     events: [eventId, eventId, eventId, eventId]
//   //   }
//   // ]