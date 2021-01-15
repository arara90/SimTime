import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../../Colors"

import CalendarMonthCell from "../../molecule/calendar/CalendarMonthCell" 
import CalendarEventLabel from "../../molecule/calendar/CalendarEventLabel"
import SolidButton from "../../atom/buttons/SolidButton"


const Wrap = styled.div`
  width: 100%;
  background-color:  ${Colors.BG_INACTIVE_LIGHT};
  height: 42em;
  overflow-y: auto;
  overflow-x: hidden;

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

const More = styled(SolidButton)`
  height: 2em;
  opacity: 65%;

  &:hover{
    opacity: 50%;
  }
`


function EventCalendar(props) {
  const { current, dateClickHandler, invitationClickHandler, dates, invitations, moreClickHandler } = props;

  const renderEventLabel = (date)=>{
    if( invitations && date in invitations){
      return invitations[date].map((invitation)=>{ 
        const {id, event, attendance} = invitation;
        return (
          <CalendarEventLabel
            join 
            key={id}
            attendance={attendance}
            host = {event.host}
            name = {event.event_name}
            title={event.event_time + " | " + event.event_place.name}
            time={event.event_time}
            location={event.event_place.name}
            tags = {event.tags}
            color={event.color}
            onClick={(e) => invitationClickHandler(e, invitation)}
            />
          )}
        );
      }
    }

  const renderCalendarCells = (weeks, events={}) => {
    return Object.keys(weeks).map((week, index) => {
      return(
      <Week key={week}>
        { weeks[week].weekDates.map((date, index) => {
            return (
              <CalendarMonthCell
                key={date.id}
                year={parseInt(date.year)}
                month={parseInt(date.month)}
                date={parseInt(date.date)}
                day={parseInt(date.day)}
                isActive={date.isActive}
                isToday={date.id == "0D"}
                // isActiveMonth={current.getMonth()+1 == parseInt(date.month)}
                isActiveMonth={current.getMonth()+1 == parseInt(date.month)}
                onClick={(e) =>dateClickHandler(e, date.strDate)}
              >
                {renderEventLabel(date.strDate)}
              </CalendarMonthCell>
            );
          })
        }
      </Week>)
    });
    // return <div>ddd{console.log('myweeks', weeks)}</div>
  };
  
    return (
      <Wrap {...props} onScroll={props.scrollHandler}>
        <CalendarWrap>{renderCalendarCells(dates)}</CalendarWrap>
        {/* <More color={'ST_GRAY'} onClick={moreClickHandler}>More</More> */}
      </Wrap>
    )
}

export default EventCalendar

EventCalendar.propTypes = {
  current: PropTypes.object
};

EventCalendar.defaultProps = {};
  