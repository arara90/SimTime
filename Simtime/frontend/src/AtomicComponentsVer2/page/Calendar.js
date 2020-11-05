import React, {useEffect, Fragment} from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import CalendarTemplate from "../template/CalendarTemplate";

import TextButton from "../atom/buttons/TextButton"
import EventDetail from "../organism/calendar/event/EventDetail"
import EventList from "../organism/calendar/event/EventList"



function Calendar(props) {
  return (
    <Fragment>
      <CalendarTemplate 
        // leftTop={""} 
        // leftBottom={""} 
        rightTop={<TextButton> New Event </TextButton>} 
        rightBottom={<EventDetail />}
      />
    </Fragment>
  )
}


export default Calendar;

