import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled from "styled-components";
import Week from "../../C-Organisms/Calendar/Week";
import Paragraph from "../../A-Atomics/Font/Paragraph";
import ColoredButton from "../../A-Atomics/Button/ColoredButton";
import Image from "../../A-Atomics/Image";

import { generate, getStrFullDate } from "./Generator";
import {
  ST_WHITE,
  MAIN_COLOR,
  ST_SEMI_GRAY,
  ST_SEMI_YELLOW,
} from "../../Colors";

// cal_prev_page = [0]; -현재(오늘)로부터 과거로 load한 page
// cal_next_pate = [0]; -현재(오늘)로부터 미래로 load한 page

const Wrap = styled.div`
  background-color: ${ST_WHITE}
  width: 100%;
  height: 300px;
  padding-top: 5px;
  padding-bottom: 3px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow: hidden;
  border: solid 1px ${ST_SEMI_YELLOW};
  border-radius: 6px;

  z-index: 9999;
`;

const MonthWrap = styled.div`
  width: 100%;
  height: 36px;

  padding-left: 10px;
  padding-right: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  overflow: hidden;
`;

const Arrow = styled(Image)`
  opacity: ${(props) => (props.isActive ? "0.75" : "0.3")};
  cursor: ${(props) => (props.isActive ? "pointer" : "default")};
`;

const Month = styled(Paragraph)`
  font-weight: 500;
`;

const DayWrap = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: 2px 1px 0px 1px;
  overflow: hidden;
  border-bottom: dashed 1px ${ST_SEMI_GRAY};
`;

const Day = styled(Paragraph)`
  width: 32px;
  text-align: middle;
`;

const CalendarWrap = styled.div`
  width: 100%;
  height: 260px;
  padding: 2px 2px 2px 2px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
`;

const CloseBtn = styled(Paragraph)`
  padding: 0px 5px 0px 5px;
  cursor: pointer;
`;

//요일
const Days = React.memo(() => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days.map((day, index) => {
    return (
      <Day key={day} color="ST_GRAY">
        {day}
      </Day>
    );
  });
});

//일자
const Weeks = React.memo((props) => {
  const { curr, selectDate, selectedDate } = props;
  var dates = generate(curr, 0);
  return dates.map((week, index) => {
    return (
      <Week
        key={week.id}
        id={week.id}
        isDatePicker={true}
        weekDates={week.weekDates}
        selectDate={selectDate}
        selectedDate={selectedDate}
      />
    );
  });
});

function DatePicker(props) {
  const [curr, setCurr] = useState(props.currDate);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const nextMonth = () => {
    setCurr(new Date(curr.getFullYear(), curr.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    var today = getStrFullDate(new Date(), "yyyymmdd").substr(0, 6);
    var yyyymm = getStrFullDate(curr, "yyyymmdd").substr(0, 6);

    if (yyyymm > today) {
      setCurr(new Date(curr.getFullYear(), curr.getMonth() - 1, 1));
    }
  };

  return (
    <Wrap {...props}>
      <MonthWrap>
        <Arrow
          width="10px"
          height="10px"
          src="https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/left-arrow.png"
          isActive={
            getStrFullDate(curr, "yyyymmdd").substr(0, 6) >
            getStrFullDate(new Date(), "yyyymmdd").substr(0, 6)
          }
          onClick={prevMonth}
        />
        <Month fontSize="14px" color="TEXT">
          {`${months[curr.getMonth()]} ${curr.getFullYear()}`}
        </Month>
        <Arrow
          width="10px"
          height="10px"
          src="https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/right-arrow.png"
          onClick={nextMonth}
          isActive={true}
        />
      </MonthWrap>
      <DayWrap>
        <Days />
      </DayWrap>
      <CalendarWrap>
        <Weeks curr={curr} selectDate={props.selectDate} />
      </CalendarWrap>
      <CloseBtn onClick={props.onClose} color="MAIN_COLOR" fontSize="12px">
        닫기
      </CloseBtn>
    </Wrap>
  );
}

export default DatePicker;

DatePicker.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  selectedDate: PropTypes.string,
};

DatePicker.defaultProps = {
  currDate: new Date(),
  height: "98%",
  width: "98%",
  selectedDate: "0D", //context로 해보자
};
