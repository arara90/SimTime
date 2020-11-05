import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";


const Wrap = styled.div`
  width: 100%;
  height: 100%;

  min-height: 2em;
  overflow: hidden;

  background-color: ${({color}) => Colors[color]};

  &:hover{
    border: solid 1px  ${Colors.MAIN_COLOR_DARK};
    background: ${Colors.MAIN_COLOR_LIGHT};
    outline: none;
  }

`

function CalendarCell(props) {
  const {isSelected, isActiveMonth, isToday, isActive } = props;
  
    return (
        <Wrap {...props} color={color}> </Wrap>
    )
}

export default CalendarCell

CalendarCell.propTypes = {
  isSelected: PropTypes.bool, 
  isActiveMonth: PropTypes.bool, 
  isToday: PropTypes.bool, 
  isActive: PropTypes.bool, 
  };

CalendarCell.defaultProps = {
  isSelected: null, 
  isActiveMonth: null, 
  isToday: null, 
  isActive: null,
  };
  