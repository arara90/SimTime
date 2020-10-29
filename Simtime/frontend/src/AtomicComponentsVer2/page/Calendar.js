import React, {useEffect, Fragment} from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import CalendarTemplate from "../template/CalendarTemplate";


function Calendar(props) {
  return (
    <Fragment>
      <CalendarTemplate />
    </Fragment>
  )
}


export default Calendar;

