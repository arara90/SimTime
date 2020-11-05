import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";


const Date = styled.strong`
  color: ${({color})=>Colors[color]};
`

function CalendarDateText(props) {
  const {isHoliday, day} = props;
  const color = () => {
    if (day == 0 || isHoliday) return "ST_RED"; //일
    else if (day == 6) return "ST_BLUE"; //토
    else return "TEXT"; //평일
  };

    return (
        <Date {...props} color={color}></Date>
    )
}

export default CalendarDateText={
   isHoliday: PropTypes.bool,
    day: PropTypes.number, 
  };

  CalendarDateText.defaultProps = {
   isHoliday: null, 
   day: 1,
  };
  