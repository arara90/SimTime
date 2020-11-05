import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import CalendarTemplate from "../template/CalendarTemplate";

import TextButton from "../atom/buttons/TextButton"
import EventDetail from "../organism/calendar/event/EventDetail"
import EventList from "../organism/calendar/event/EventList"
import EventCalendar from "../organism/calendar/EventCalendar"


import {generate} from "../../actions/calendar"

function Calendar(props) {
  const [current, setCurrent] = useState(new Date()); 
  const [dates, setDates] = useState(generate(new Date(), 5)); 
  const [datas, setDatas] = useState()



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

  useEffect(()=>{}, [])

  useEffect(()=>{
    console.log(dates)
    console.log(dates[0])
  })

  return (
      <CalendarTemplate 
        // leftTop={""} 
        leftBottom={<EventCalendar current={current} dates={dates}  />} 
        rightTop={<TextButton> New Event </TextButton>} 
        rightBottom={<EventDetail />}
      />

  )
}


export default Calendar;

