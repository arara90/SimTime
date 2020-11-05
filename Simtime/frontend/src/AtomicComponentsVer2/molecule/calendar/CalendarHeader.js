import React, {useState} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";
import AngleIcon from "../../atom/icons/AngleIcon"
import IconButton from "../../atom/buttons/IconButton"

const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: default;

    font-size: ${({size})=>size};
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

function getStringDate(date, type='month'){
    const now = new Date(date)
    var year = now.getFullYear().toString();
    var month = (now.getMonth() + 1).toString();
    var date = now.getDate().toString();
    var day = now.getDay().toString().substr(0,3);

    var koWeek = ['일', '월', '화', '수', '목', '금', '토'];
    var engWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if(type=='year'){
        return year
    } else if(type=='month'){
        return [year, month].join('.')
    } else if(type=='date') {
        return [year, month, date].join('.')
    } else if(type=='day') {
        return [year, month, date].join('.') + ` (${koWeek[day]})`
    } 
    
}


function CalendarHeader(props) {
    const {current, type, prevHandler, nextHandler, size} = props;

    const changeDate = (num)=>{
        var res = new Date(current)
        if(type=='year'){
            res.setYear(current.getFullYear() + num);
        } else if(type=='month') {
            res.setMonth(current.getMonth() + num);
        } else {
            res.setDate(current.getDate() + num);
        } 

        if(num==1){
            nextHandler(res)
        }else{
            prevHandler(res)
        }
    }
    
    return (
        <Wrap {...props} >
            <IconButton><PrevMonth size="1x" onClick={()=>changeDate(-1)}/></IconButton>
                {getStringDate(current, type)}
            <IconButton><NextMonth size="1x" onClick={()=>changeDate(1)}/></IconButton>
        </Wrap>
    )
}

export default CalendarHeader

CalendarHeader.propTypes = {
    current: PropTypes.instanceOf(Date),
    type: PropTypes.oneOf(['year','month', 'date', 'day']),
    size: PropTypes.string
  };

CalendarHeader.defaultProps = {
    current: new Date(),
    type: 'month',
    size: "1em"
  };
  
