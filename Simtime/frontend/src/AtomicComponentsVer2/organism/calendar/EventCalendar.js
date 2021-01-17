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
  
        return (
          <CalendarEventLabel
            key={invitation.id}
            attendance = {invitation.attendance}  
            host = {invitation.event.host}
            title={invitation.event.event_name}
            time={invitation.event.event_time}
            location={invitation.event.event_place.name}
            tags = {invitation.event.tags}
            color={invitation.event.color}
            onClick={(e) => invitationClickHandler(e, invitation)}
            />
          )}
        );
      }
    }

  const renderCalendarCells = (weeks, events={}) => {
    var firstDaysOfweeks = [...weeks.keys()]
    return firstDaysOfweeks.map((firstDay, index) => {
      var days = weeks.get(firstDay)
      return(
      <Week key={firstDay}>
        { days.map((date, index) => {
            return (
              <CalendarMonthCell
                key={date.strDate}
                year={parseInt(date.year)}
                month={parseInt(date.month)}
                date={parseInt(date.date)}
                day={parseInt(date.day)}
                isActive={date.isActive}
                isToday={date.id == "0D"}
                isActiveMonth={ parseInt(date.month) == current.getMonth()+1}
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
  
  // const renderCalendarCells = (weeks, events={}) => {
  //   return weeks.map((week, index) => {
  //     return(
  //       <Week>
  //         {Object.values(week).map((date, index) => {
  //           console.log(date)
  //             return (
  //               <CalendarMonthCell
  //                 key={date.id}
  //                 year={parseInt(date.year)}
  //                 month={parseInt(date.month)}
  //                 date={parseInt(date.date)}
  //                 day={parseInt(date.day)}
  //                 isActive={date.isActive}
  //                 isToday={date.id == "0D"}
  //                 isActiveMonth={true}
  //                 onClick={(e) =>dateClickHandler(e, date.strDate)}
  //               >
  //                 {renderEventLabel(date.strDate)}
  //               </CalendarMonthCell>
  //             );
  //           })
  //         }
  //       </Week>)
  //   });
  //   // return <div>ddd{console.log('myweeks', weeks)}</div>
  // };

    
//   const renderCalendarCells = (weeks, events={}) => {
//     return weeks.map((week, index) => {
//       return Object.keys(week).map((key, index) => {
//         return (
//           <Week>
//             {week[key].map((date, index) => {
//               return (
//                 <CalendarMonthCell
//                   key={date.id}
//                   year={parseInt(date.year)}
//                   month={parseInt(date.month)}
//                   date={parseInt(date.date)}
//                   day={parseInt(date.day)}
//                   isActive={date.isActive}
//                   isToday={date.id == "0D"}
//                   isActiveMonth={true}
//                   onClick={(e) =>dateClickHandler(e, date.strDate)}
//                 >{renderEventLabel(date.strDate)}
//                 </CalendarMonthCell>
//               )
//               })}
//           </Week>)
//     });
//   });
// }

    return (
      <Wrap {...props} onScroll={props.scrollHandler}>
        {renderCalendarCells(dates)}
      </Wrap>
    )
}

export default EventCalendar

EventCalendar.propTypes = {
  current: PropTypes.object
};

EventCalendar.defaultProps = {};
  