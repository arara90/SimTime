import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CalDate from "../../A-Atomics/Calendar/CalDate";
import { MAIN_COLOR, ST_WHITE, ST_YELLOW_LIGHT } from "../../Colors";

const size = "32px";

const Wrap = styled.div`
  width: ${size};
  height: ${size};
  border-radius: ${size};

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  cursor:  ${(props) => (props.isActive ? "pointer" : "Default")} ;
  ${(props) => (props.isToday ? `background-color: ${ST_YELLOW_LIGHT}` : null)};
  ${(props) => (props.isSelected ? `background-color: ${MAIN_COLOR}` : null)};

  &:hover {
    ${(props) => (props.isActive ? `border: solid 1px ${MAIN_COLOR}` : null)};
  }

`;

const MyCalDate = styled(CalDate)`
  font-size: 12px;
  font-weight: 500;
  ${(props) => (props.isSelected ? `color: ${ST_WHITE}` : null)};
`;

function Date(props) {
  const { day, date, isActive, isActiveMonth, isSelected, isToday } = props;
  const contentHeight = size;

  const renderDate = () => {
    return (
      <Wrap {...props}>
        <MyCalDate
          isActive={isActive}
          isActiveMonth={isActiveMonth}
          isSelected={isSelected}
          isToday={isToday}
          date={date}
          day={day}
          contentHeight={contentHeight}
        >
          {date}
        </MyCalDate>
      </Wrap>
    );
  };

  return (
    <Wrap {...props}>
        <MyCalDate
          isActive={isActive}
          isActiveMonth={isActiveMonth}
          isSelected={isSelected}
          isToday={isToday}
          date={date}
          day={day}
          contentHeight={contentHeight}
        >
          {date}
        </MyCalDate>
      </Wrap>
  );
}

export default Date;

Date.propTypes = {
  date: PropTypes.string.isRequired,
  day: PropTypes.number,
  isActive: PropTypes.bool,
  isActiveMonth: PropTypes.bool,
  isToday: PropTypes.bool,
};

Date.defaultProps = {
  date: "30",
};
