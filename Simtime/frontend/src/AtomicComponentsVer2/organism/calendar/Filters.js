import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";
import {getStringDate} from "../../../actions/calendar"
import CalendarHeader from "../../molecule/calendar/CalendarHeader"


const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

function Filters(props) {
  const { current, dateHandler} = props;

    
    return (
      <Wrap>
        <CalendarHeader size="1.2em" type="month" current={current} clickHandler={props.dateHandler} >
          {getStringDate(current,"month")}
        </CalendarHeader>

      </Wrap>
    )
}

export default Filters

Filters.propTypes = {
  };

Filters.defaultProps = {

  };
  
