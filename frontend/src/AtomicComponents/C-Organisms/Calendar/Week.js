import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Day from "../../B-Molecules/Calendar/Day";
import Date from "../../B-Molecules/DatePicker/Date";

const height = "116px";

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${(props) =>
    props.isDatePicker
      ? `
    align-items: center;
    height: 100%;
    margin-bottom: 0px;
    `
      : `
    align-items: flex-start;
    height: ${height};
    margin-bottom: 4px;
   `}
`;

function Week(props) {
  const { weekDates, isDatePicker, selectDate } = props;
  const onSelect = (strDate) => {
    selectDate(strDate);
  };

  const renderDays = () => {
    return weekDates.map((date, index) => {
      return (
        <Day
          key={date.id}
          strDate={date.strDate}
          year={date.year}
          month={date.month}
          day={date.day}
          date={date.date}
          isActive={date.isActive}
          isToday={date.id == "0D"}
          height={height}
        ></Day>
      );
    });
  };

  const renderDates = () => {
    return weekDates.map((date, index) => {
      return (
        <Date
          key={date.id}
          strDate={date.strDate}
          year={date.year}
          month={date.month}
          day={date.day}
          date={date.date}
          isActive={date.isActive}
          isActiveMonth={date.isActiveMonth}
          isToday={date.id == "0D"}
          height={height}
          onClick={() => (date.isActive ? onSelect(date.strDate) : null)}
        />
      );
    });
  };

  return <Wrap {...props}>{isDatePicker ? renderDates() : renderDays()}</Wrap>;
}

export default Week;

Week.propTypes = {
  weekDates: PropTypes.array,
  isDatePicker: PropTypes.bool,
};

Week.defaultProps = {
  weekDates: [],
  isDatePicker: false,
};
