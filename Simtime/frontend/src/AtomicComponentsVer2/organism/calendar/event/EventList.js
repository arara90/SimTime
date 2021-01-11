import React, {useEffect} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../../../Colors";

import CalendarHeader from "../../../molecule/calendar/CalendarHeader"
import EventListItem from "../../../molecule/event/EventListItem"
import {getStringDate} from "../../../../redux/actions/calendar"

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
  padding: 0.5em;
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
  const { invitations, current, itemClickHandler, dateHandler} = props;
    return (
      <Wrap>
        <Header size="1.2em" type="date" current={current} clickHandler={dateHandler} >
          {getStringDate(current,"day")}
        </Header>
        <List isEmpty={!invitations}>
          { invitations && invitations.map((invitation) => {
            return <EventListItem key={invitation.id} invitation={invitation} onClick={(e)=>{itemClickHandler(e,invitation)}}  />})
          }
        </List>
      </Wrap>
    )
}

export default EventList

EventList.propTypes = {
  };

EventList.defaultProps = {
 }
  