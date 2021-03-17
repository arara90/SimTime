import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


import CalendarCell from "../../atom/calendar/CalendarCell"
import CalendarDateText from "../../atom/calendar/CalendarDateText"

const Wrap = styled(CalendarCell)`
  width: ${({width})=>width};
  height: ${({height})=>height};

  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;

  cursor: pointer;
  
`;

const ContentWrap = styled.ul`
  width: 100%;
  flex: 1;
  overflow: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0px;
  }
`

const CurrDate = styled(CalendarDateText)`
  margin-right: 5px;
  ${({date}) => (date == 1 ? `text-decoration: underline;` : "")};
`;


function CalendarMonthCell(props) {
  const { month, day, date } = props;
  return (
    <Wrap {...props} >
      <CurrDate date={date} day={day}>
        {/* 매월 1일에는 표시 (ex. 12/1 )*/}
        {date == 1 ? `${month}/1` : date}   
      </CurrDate>
      <ContentWrap>
      {props.children}
      </ContentWrap>
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
  isSelected: PropTypes.bool,
};

CalendarMonthCell.defaultProps = {
  width: "98%",
  height: "100%",
  month: 10,
  date: 30,
  day: 0,
  isHoliday: null,
  isActive: null,
  isActiveMonth: null,
  isToday: null,
  isSelected: null
};
