import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CalendarCell from "../../atom/calendar/CalendarCell"
import CalendarDateText from "../../atom/calendar/CalendarDateText"

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  border: solid 1px red;

  background-color: ${(props) => (props.isActive ? BG_WHITE : BG_INACTIVE)}95;
  ${(props) => (props.isToday ? `background-color: ${MAIN_COLOR}95` : "")};

  overflow: hidden;

  @media only screen and (max-width: 920px) {
    width: 14.8%;
    margin-right: 2px;
    margin-bottom: 2px;
    ${(props) => (props.day == 0 ? "margin-left: 2px;" : "")};
  }
`;

const DateWrap = styled.div`
  height: ${(props) => props.contentHeight}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const MyCalDate = styled(CalDate)`
  margin-right: 4px;
  ${(props) => (props.date == "1" ? `text-decoration: underline;` : "")}
`;

const Event = styled.div`
  width: 100%;
  height: auto;
  min-height: 16px;
  background-color: pink;
  border: solid 1px blue;

`

function CalendarMonthCell(props) {
  const { year, month, day, date } = props;
  const contentHeight = (
    parseInt(props.height.replace(/[^0-9]/g, "")) / 7
  ).toFixed(2);

  return (
    <Wrap {...props}>
      <DateWrap contentHeight={contentHeight}>
        <MyCalDate date={date} day={day} contentHeight={contentHeight}>
          {date == "1" ? `${month}/1` : date}
        </MyCalDate>
      </DateWrap>
      <Event className="here"/>
      <Event className="here"/>
      <Event className="here"/>
      <Event className="here"/>
      <Event className="here"/>
      <Event className="here"/>

    </Wrap>
  );
}

export default CalendarMonthCell;

CalendarMonthCell.propTypes = {
  height: PropTypes.string,
  date: PropTypes.string.isRequired,
  numOfDay: PropTypes.number,
  isActive: PropTypes.bool,
  isToday: PropTypes.bool,
};

CalendarMonthCell.defaultProps = {
  date: "30",
};
