import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";
import {getStringDate} from "../../../redux/actions/calendar"
import CalendarHeader from "../../molecule/calendar/CalendarHeader"


const Wrap = styled.div`
  height: ${({height})=> height};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25em;
  background-color:${Colors.BG_WHITE};
`

const Left = styled.div`
  // border: solid 1px ${Colors.MAIN_COLOR};
  flex: 1;
`

const Center = styled.div`
  // border: solid 1px ${Colors.MAIN_COLOR};
  flex: 0.5;
`

const STCalendarHeader = styled(CalendarHeader)`
  min-width: 128px;
`

const Right = styled.div`
  // border: solid 1px ${Colors.MAIN_COLOR};
  flex: 1;
  
`


function Filters(props) {
  const { current, height,  nextHandler, prevHandler, dateHandler} = props;

    return (
      <Wrap {...props}>
      <Left></Left>
      <Center>
        <STCalendarHeader size="1.2em" type="month" current={current} clickHandler={dateHandler} >
          {getStringDate(current,"month")}
        </STCalendarHeader>
        </Center>
      <Right></Right>
      </Wrap>
    )
}

export default Filters

Filters.propTypes = {
  };

Filters.defaultProps = {

  };
  
