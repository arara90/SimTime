import React, {useEffect, Fragment} from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import CalendarTemplate from "../template/CalendarTemplate";
// import Components from "../Components";

function Calendar(props) {
  return (
    <Fragment>
      <CalendarTemplate />
      {/* <Components /> */}
    </Fragment>
  )
}


export default Calendar;

