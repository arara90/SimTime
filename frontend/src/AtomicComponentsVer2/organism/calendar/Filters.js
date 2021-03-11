import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";
import {getStringDate} from "../../../redux/actions/calendar"
import CalendarHeader from "../../molecule/calendar/CalendarHeader"
import Toggle from "../../atom/forms/Toggle" 
import HeartIcon from "../../atom/icons/HeartIcon"
import CheckCircleIcon from "../../atom/icons/CheckCircleIcon"

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

  padding: 0px 10px;
`

const Center = styled.div`
  border: solid 1px ${Colors.MAIN_COLOR};
  flex: 0.5;
`

const STCalendarHeader = styled(CalendarHeader)`
  min-width: 160px;
`

const Right = styled.div`
  // border: solid 1px blue;
  padding-right: 10px;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: inherit;
`

const FilterItem = styled(Toggle)`
  margin-left: 10px;
`

function Filters(props) {
  const { current, height,  nextHandler, prevHandler, dateHandler, likeHandler, joinHandler} = props;

    return (
      <Wrap {...props}>
      {/* <Left></Left> */}
      <Left>
        <STCalendarHeader size="1.2em" type="month" current={getStringDate(current)} clickHandler={dateHandler} >
          {getStringDate(current,"month")}
        </STCalendarHeader>
        </Left>
      <Right>
        <FilterItem id='filterLike' color="ST_PINK" icon={<HeartIcon size="xs" />}  toggle={likeHandler}/>
        <FilterItem id='filterJoin' color="ST_GREEN_NEON" icon={<CheckCircleIcon size="sm" />}  toggle={joinHandler}/> 
      </Right>
      </Wrap>
    )
}

export default Filters

Filters.propTypes = {
  };

Filters.defaultProps = {

  };
  
