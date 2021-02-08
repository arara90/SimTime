import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled from "styled-components";
import Week from "../../C-Organisms/Calendar/Week";
import Paragraph from "../../A-Atomics/Font/Paragraph";
import SelectArrow from "../../A-Atomics/Filter/SelectArrow";
import Input from "../../B-Molecules/Form/Input";

import { generate, getStrFullDate } from "./Generator";
import { MAIN_COLOR, ST_SEMI_GRAY, ST_SEMI_YELLOW } from "../../Colors";

// cal_prev_page = [0]; -현재(오늘)로부터 과거로 load한 page
// cal_next_pate = [0]; -현재(오늘)로부터 미래로 load한 page

const Wrap = styled.div`
  width: 100%;
  height: 60px;
  padding-top: 5px;
  padding-bottom: 3px;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  overflow: hidden;
  border: solid 1px ${ST_SEMI_YELLOW};
  border-radius: 6px;
`;

const HourInput = styled(Input)``;

const MinuteInput = styled(Input)``;

const M = styled(SelectArrow)``;

function TimePicker(props) {
  return (
    <Wrap {...props}>
      <HourInput width="30%"></HourInput> :
      <MinuteInput width="30%"></MinuteInput>
      <M width="60px" height="40px" options={["AM", "PM"]}></M>
    </Wrap>
  );
}

export default TimePicker;

TimePicker.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

TimePicker.defaultProps = {
  height: "98%",
  width: "98%",
};
