import React, {useEffect, useState} from 'react';
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




function CalendarHeader(props) {
    const {current, type, clickHandler, size} = props;
    const [currString, setCurrString] = useState("");

    useEffect(
        ()=>{
            setCurrString(changeDate(0,))
        }, []
    )

    const changeDate = (num)=>{
        var res = new Date(current)
        if(type=='year'){
            res.setYear(current.getFullYear() + num);
        } else if(type=='month') {
            res.setMonth(current.getMonth() + num);
        } else {
            res.setDate(current.getDate() + num);
        } 
        
        clickHandler(res);

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
    current: PropTypes.instanceOf(Date),
    type: PropTypes.oneOf(['year','month', 'date', 'day']),
    size: PropTypes.string
  };

CalendarHeader.defaultProps = {
    current: new Date(),
    type: 'month',
    size: "1em"
  };
  
