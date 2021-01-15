import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled from "styled-components";
import CalWrap from "../../A-Atomics/Calendar/CalWrap";
import Week from "../../C-Organisms/Calendar/Week";
import { addDate, generate } from "./Generator";

const StyledCalWrap = styled(CalWrap)``;

const CalendarWrap = styled.div`
  width: 98%;
  height: 90%;
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow: hidden;
`;

function Calendar(props) {
  const { currDate } = props;
  // 5weeks 보여주기
  var dates = generate(currDate, 6); //["2020-4-12", 0, false, "12" ] [날짜, day(요일), isActive, date]

  const renderWeek = () => {
    return dates.map((week, index) => {
      return <Week key={week.id} id={week.id} weekDates={week.weekDates} />;
    });
  };

  return (
    <StyledCalWrap>
      <CalendarWrap>{renderWeek()}</CalendarWrap>
    </StyledCalWrap>
  );
}

export default Calendar;

// const mapStateToProps = (state) => ({s
//   events: state.events.events,
// });

// export default connect(mapStateToProps, {})(Calendar);

Calendar.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

Calendar.defaultProps = {
  currDate: new Date(),
  height: "98%",
  width: "98%",
};
