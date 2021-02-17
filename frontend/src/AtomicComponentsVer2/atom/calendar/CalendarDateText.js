import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";


const Date = styled.strong`
  display: block;
  color: ${({day, isHoliday})=>{
    if (day == 0 || isHoliday) return Colors.ST_RED; //일
    else if (day == 6) return  Colors.ST_BLUE; //토
    else return  Colors.TEXT; //평일
  }};
`

function CalendarDateText(props) {
  const {isHoliday, day} = props;
  return <Date {...props}></Date>
}

export default CalendarDateText;

CalendarDateText.propTypes={
   isHoliday: PropTypes.bool,
   day: PropTypes.number, 
};

CalendarDateText.defaultProps = {
   isHoliday: null, 
   day: 1,
  };
  