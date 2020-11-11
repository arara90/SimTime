import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../../Colors"

import CalendarMonthCell from "../../molecule/calendar/CalendarMonthCell" 
import CalendarEventLabel from "../../molecule/calendar/CalendarEventLabel"


const Wrap = styled.div`
  width: 100%;
  background-color:  ${Colors.BG_INACTIVE_LIGHT};
  height: 40em;
  overflow: hidden;
`

const Week = styled.div`
  width: 100%;
  height: 8em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`

function EventCalendar(props) {
  const { dates, events, datas } = props;

  console.log('EventCalendar, events', events)

  const renderEventLabel = (date)=>{
    if( events && date in events){
      return events[date].map((event)=>{ 
        return (
          <CalendarEventLabel 
            join 
            key={event.id} 
            title={event.event_name} 
            color={event.color}
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
                isActiveMonth={true}
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
        {renderCalendarCells(dates)}
      </Wrap>
    )
}

export default EventCalendar

EventCalendar.propTypes = {};

EventCalendar.defaultProps = {};
  