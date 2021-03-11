import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CalDate from "../../A-Atomics/Calendar/CalDate";
import ContextStore from "../../../contexts/contextStore";
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

  // @media only screen and (max-width: 920px) {
  //   margin-right: 2px;
  //   margin-bottom: 2px;
  //   ${(props) => (props.day == 0 ? "margin-left: 2px;" : "")};
  // }

  // border: solid 1px blue;
`;

const MyCalDate = styled(CalDate)`
  font-size: 12px;
  font-weight: 500;
  ${(props) => (props.isSelected ? `color: ${ST_WHITE}` : null)};
`;

function Date(props) {
  const { day, date, strDate, isActive, isActiveMonth, isToday } = props;
  const contentHeight = size;

  const renderDate = (store) => {
    return (
      <Wrap {...props} isSelected={strDate == store}>
        <MyCalDate
          isActive={isActive}
          isActiveMonth={isActiveMonth}
          isSelected={strDate == store}
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
    <ContextStore.Consumer>
      {(store) => renderDate(store)}
    </ContextStore.Consumer>
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
