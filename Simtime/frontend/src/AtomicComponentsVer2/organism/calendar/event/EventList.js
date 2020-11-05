import React, {Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../../../Colors";

import CalendarHeader from "../../../molecule/calendar/CalendarHeader"
import EventListItem from "../../../molecule/event/EventListItem"


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

    border-bottom: solid 1px ${Colors.MAIN_COLOR};
`
const List = styled.ul`
    width: 100%;
`


function EventList(props) {
  const { prevHandler, nextHandler } = props;

    return (
        <Wrap>
          <Header 
            size="1.2em" 
            type="date" 
            current={props.curr}
            prevHandler={prevHandler}  
            qnextHandler={nextHandler}
          />
          <List>
             <EventListItem />
             <EventListItem />
             <EventListItem />
          </List>
        </Wrap>
    )
}

export default EventList

EventList.propTypes = {
  };

EventList.defaultProps = {

  };
  