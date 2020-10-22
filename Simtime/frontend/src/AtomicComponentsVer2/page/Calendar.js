import React, {useEffect} from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import CalendarTemplate from "../template/CalendarTemplate";

import Header from "../../AtomicComponents/D-Templates/Header";

const MainContent = styled.div`
  width:80%;
  height:150px;
  border: solid 1px blue;
`

function Calendar(props) {
  return (
    <CalendarTemplate> 
      <MainContent>main</MainContent>
    </CalendarTemplate>
  )
}


// const mapStateToProps = (state) => ({
//   hasLoaded: state.status.hasLoadedDatas
// });

// export default connect(mapStateToProps, {getDatas})(Main);
export default Calendar;

