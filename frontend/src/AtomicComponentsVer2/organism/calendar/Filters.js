import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";
import {getStringDate} from "../../../redux/actions/calendar"
import CalendarHeader from "../../molecule/calendar/CalendarHeader"
import Toggle from "../../atom/forms/Toggle" 


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
  flex: 1;
  padding: 0px 20px;
`

const Center = styled.div`
  border: solid 1px ${Colors.MAIN_COLOR};
  flex: 0.5;
`

const STCalendarHeader = styled(CalendarHeader)`
  min-width: 128px;
`

const Right = styled.div`
  // border: solid 1px blue;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  
`


function Filters(props) {
  const { current, height,  nextHandler, prevHandler, dateHandler} = props;

    return (
      <Wrap {...props}>
      {/* <Left></Left> */}
      <Left>
        <STCalendarHeader size="1.2em" type="month" current={current} clickHandler={dateHandler} >
          {getStringDate(current,"month")}
        </STCalendarHeader>
        </Left>
      <Right>
        <Toggle id='filterLike'></Toggle>

      </Right>
      </Wrap>
    )
}

export default Filters

Filters.propTypes = {
  };

Filters.defaultProps = {

  };
  
