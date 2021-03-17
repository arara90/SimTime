import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";
import AngleIcon from "../../atom/icons/AngleIcon"
import IconButton from "../../atom/buttons/IconButton"

import {getStrFullDate} from "../../../util/calendar"

const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: default;
    font-size: ${({size})=>size};
    font-weight: bold;
`

const Arrow = styled(AngleIcon)`
    color: ${Colors["TEXT"]};
`

const PrevMonth = styled(Arrow)`
    transform: rotate(-90deg);
`
const NextMonth = styled(Arrow)`
    transform: rotate(90deg);
`


function CalendarHeader(props) {
    const {current, type, clickHandler, prevHandler, nextHandler, size} = props;

    const changeDate = (num)=>{
        var curr = new Date(current)
        var res = new Date(current)
        var newMonth = null

        if(type=='year'){
            res.setYear(curr.getFullYear() + num);
        } else if(type=='month') {
            if(num>0) newMonth = curr.getMonth() + num  //next Month
            else newMonth = (curr.getDate()==1  ? curr.getMonth()  + num : curr.getMonth()) //prev Month

            res.setMonth(newMonth);
            res.setDate(1);
        } else {
            res.setDate(curr.getDate() + num); 
        } 

        clickHandler(getStrFullDate(new Date(res), "yyyy-mm-dd")) //res는 날짜 object
    }

    
    
    return (
        <Wrap {...props} >
            <IconButton><PrevMonth size="1x" onClick={()=>changeDate(-1)}/></IconButton>
                {props.children}
            <IconButton><NextMonth size="1x" onClick={()=>changeDate(1)}/></IconButton>
        </Wrap>
    )
}

export default CalendarHeader

CalendarHeader.propTypes = {
    current: PropTypes.string,
    type: PropTypes.oneOf(['year','month', 'date', 'day']),
    size: PropTypes.string
  };

CalendarHeader.defaultProps = {
    current: getStrFullDate(new Date(), 'date'),
    type: 'month',
    size: "1em"
  };
  
