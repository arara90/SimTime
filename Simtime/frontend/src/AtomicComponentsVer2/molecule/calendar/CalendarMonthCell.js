import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


import CalendarCell from "../../atom/calendar/CalendarCell"
import CalendarDateText from "../../atom/calendar/CalendarDateText"

const Wrap = styled(CalendarCell)`
  width: ${({width})=>width};
  height: ${({height})=>height};;

  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const CurrDate = styled(CalendarDateText)`
  margin-right: 5px;
  ${({date}) => (date == 1 ? `text-decoration: underline;` : "")};
`;


function CalendarMonthCell(props) {
  const { year, month, day, date, isHoliday, isActive, isActiveMonth, isToday } = props;
  return (
    <Wrap {...props} >
      <CurrDate date={date} day={day}>
        {date == 1 ? `${month}/1` : date}
      </CurrDate>
      {props.children}
    </Wrap>
  );
}

export default CalendarMonthCell;

CalendarMonthCell.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  month: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  isHoliday: PropTypes.bool,
  isActive: PropTypes.bool,
  isActiveMonth: PropTypes.bool,
  isToday: PropTypes.bool,
};

CalendarMonthCell.defaultProps = {
  width: "100%",
  height: "100%",
  month: 10,
  date: 30,
  day: 0,
  isHoliday: null,
  isActive: null,
  isActiveMonth: null,
  isToday: null,
};
