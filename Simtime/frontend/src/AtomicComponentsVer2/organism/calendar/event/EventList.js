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
  // border-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
`


const Header = styled(CalendarHeader)`
  width: 100%;
  font-weight: bold;
  height: 4rem;
  border-bottom: solid 1px ${Colors.MAIN_COLOR};
`
const List = styled.ul`
  width: 100%;
  height: 100%;
  flex: 1;

   & li:last-child{
    border-bottom: 0px;
  }
`


function EventList(props) {
  const { events, current, itemClickHandler} = props;

    return (
      <Wrap>
        <Header size="1.2em" type="date" current={current} clickHandler={props.dateHandler} >
          {getStringDate(current,"day")}
        </Header>
        <List isEmpty={events.length==0}>
          { events.map((event) => {
            return <EventListItem key={event.id} event={event} onClick={(e)=>{itemClickHandler(e,event)}}  />})
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
  events: [{
        id: null,
        event_name: "Simtime Test",
        event_place: {name:null, address:null, lat:"", lng:""},
        event_date: null,
        event_time: null,
        tags: null,
        host: {name:"test", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/group_basic.png"},
        like: null,
        join: null,
    }]
  };
  