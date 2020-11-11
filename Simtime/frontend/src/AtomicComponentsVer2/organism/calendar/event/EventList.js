import React, {useEffect} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../../../Colors";

import CalendarHeader from "../../../molecule/calendar/CalendarHeader"
import EventListItem from "../../../molecule/event/EventListItem"
import {getStringDate} from "../../../../actions/calendar"

const Wrap = styled.div`
  width: 100%;
  border : solid 1px ${Colors.MAIN_COLOR};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
`


const Header = styled(CalendarHeader)`
  width: 100%;
  font-weight: bold;
  height: 4rem;
`
const List = styled.ul`
  width: 100%;
  height: 100%;
}
`

function EventList(props) {
  const { events, current, itemClickHandler} = props;
  useEffect(()=>{
    console.log(events)
  })
  
    return (
      <Wrap>
        <Header size="1.2em" type="date" current={new Date(current)} clickHandler={()=>{}} >
          {getStringDate(current,"day")}
        </Header>
        <List isEmpty={events.length==0}>
          { events.map((event) => {
            return <EventListItem key={event.id} event={event} onClick={(e)=>{
              console.log('EventListItemClicl', event)
              itemClickHandler(e,event)}}  />})
          }
        </List>
      </Wrap>
    )
}

export default EventList

EventList.propTypes = {
  events: PropTypes.array
  };

EventList.defaultProps = {
  events: [
    { id: "0",
      title: "Simtime Test1",
      location: {name:"작업실(우리집)", lat:"", lng:"", address:"경기도 부천시"},
      time: "PM 19:00",
      tags: ["개발","test", "simtime", "반달", "test", "simtime", "반달"],
      host: {name:"arra", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/group_basic.png"},
      like: false,
      join: false
    },
    {
      id: "1",
      title: "Simtime Test2",
      location: {name:"작업실(우리집)", lat:"", lng:"", address:"경기도 부천시"},
      time: "PM 19:00",
      tags: ["개발","test", "simtime", "반달", "test", "simtime", "반달"],
      host: {name:"arra", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/group_basic.png"},
      like: true,
      join: false
    },
    {
      id: "2",
      title: "Simtime Test3",
      location: {name:"작업실(우리집)", lat:"", lng:"", address:"경기도 부천시"},
      time: "PM 19:00",
      tags: ["개발","test", "simtime", "반달", "test", "simtime", "반달"],
      host: {name:"arra", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/group_basic.png"},
      like: false,
      join: true
    },
  ]

  };
  