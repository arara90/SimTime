import React, {useRef, useEffect, useState, forwardRef} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../../Colors"

import CalendarMonthCell from "../../molecule/calendar/CalendarMonthCell" 
import CalendarEventLabel from "../../molecule/calendar/CalendarEventLabel"
import SolidButton from "../../atom/buttons/SolidButton"
import {generate, getStrFullDate} from "../../../redux/actions/calendar"

const Wrap = styled.div`
  width: 100%;
  background-color:  ${Colors.BG_INACTIVE_LIGHT};
  // height: 42em;

  display: flex;
  flex-direction: column;
`

const CalendarWrap = styled.div`
  flex: 1;
`
const Week = styled.div`
  width: 100%;
  height: 8em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

const FirstWeek = styled.div`
  width: 100%;
  height: 8em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  border: solid 1px red;
`

const More = styled(SolidButton)`
  height: 2em;
  opacity: 65%;

  &:hover{
    opacity: 50%;
  }
`

function EventCalendar(props) {
  const { innerRef, current, invitationClickHandler,dateClickHandler, dates, invitations, moreClickHandler, scrollHandler } = props;
  
  const scrollToTargetAdjusted = React.useCallback(
    (target)=>{
      var targetElement = document.getElementById(target);
      var headerOffset = document.getElementById('event-calendar').getBoundingClientRect().top + document.getElementById('simtime-header').getBoundingClientRect().top 
      var elementPosition = targetElement.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
           top: offsetPosition,
           behavior: "smooth"
      });
  },
    [],
  )

  useEffect(()=>{
    const {start} = generate(current, 1)
    const scrollAchor = getStrFullDate(start,"yyyy-mm-dd" )
    if(innerRef.current.hasOwnProperty(scrollAchor)){
      scrollToTargetAdjusted(scrollAchor)
    }
  }, [current])

  const renderEventLabel = React.useCallback((date)=>{
    if( invitations && date in invitations){
      return invitations[date].map((invitation)=>{
        return (
          <CalendarEventLabel
            key={invitation.id}
            attendance = {invitation.attendance}  
            like={invitation.like}
            host = {invitation.event.host}
            name = {invitation.event.event_name}
            title={invitation.event.event_name + " | " + invitation.event.event_time + " | " + invitation.event.event_place.name}
            time={invitation.event.event_time}
            location={invitation.event.event_place.name}
            tags = {invitation.event.tags}
            color={invitation.event.color}            
            onClick={(e)=>invitationClickHandler(e, invitation)}
            />
          )}
        );
      }
    }, [dates, invitations])


  const renderCalendarCells =  React.useCallback((weeks, events={}) => {
    var firstDaysOfweeks = [...weeks.keys()]
    return firstDaysOfweeks.map((firstDay, index) => {
      var days = weeks.get(firstDay)
        return(
          <Week key={firstDay} id={firstDay} 
            ref={el=>{
            if(innerRef.current.hasOwnProperty(firstDay)) {
                innerRef.current[firstDay]=el}}}
          >
            {days.map((date, index) => {
              return (
                <CalendarMonthCell
                  key={date.strDate}
                  year={parseInt(date.year)}
                  month={parseInt(date.month)}
                  date={parseInt(date.date)}
                  day={parseInt(date.day)}
                  isActive={date.isActive}
                  isToday={date.strDate == getStrFullDate(new Date(),"yyyy-mm-dd" )}
                  isActiveMonth={ parseInt(date.month) == current.getMonth()+1}
                  onClick={(e) =>dateClickHandler(e, date.strDate)}
                >
                  {renderEventLabel(date.strDate)}
                </CalendarMonthCell>
              );
            })}
          </Week>)
    
    });
  },[invitations, dates])
  
    return (
      <Wrap {...props} onScroll={scrollHandler} id="event-calendar">
        {renderCalendarCells(dates)}
      </Wrap>
    )
}

export default React.memo(forwardRef((props, ref)=> <EventCalendar {...props} innerRef={ref} />))

EventCalendar.propTypes = {
  current: PropTypes.object
};

EventCalendar.defaultProps = {};
  