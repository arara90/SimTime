import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../Colors";

const Wrap = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: 920px) {
    width: 100%;
    flex-direction: column;
  }
  overflow: hidden;
`;

const LeftSection = styled.section`
  width: 68.5%;
  height: auto;
  display: flex;
  flex-direction: column;
  // background-color:  ${Colors.BG_INACTIVE_LIGHT};

  @media only screen and (max-width: 920px) {
    width: 100%;
  }
`
const RightSection = styled.section`
  width: 31%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;

  // background-color:  ${Colors.BG_INACTIVE_LIGHT};

  @media only screen and (max-width: 920px) {
    width: 100%;
  }
`

const LeftTop = styled.div`
  width: 100%;
  @media only screen and (max-width: 920px) {
    height: 40px;
  }

`

const LeftBottom = styled.section`
  width: 100%;
  flex: 1;
`

const RightTop = styled.div`
  width: 100%;
  @media only screen and (max-width: 920px) {
    display: none;
  }
`

const RightBottom = styled.section`
  width: 100%;
  flex: 1;
`


const CalendarTemplate = ({children, ...props }) => {
  const {leftTop, leftBottom, rightTop, rightBottom } = props;
  return (
    <Wrap>
      <LeftSection>
        <LeftTop>{leftTop}</LeftTop>
        <LeftBottom >{leftBottom} </LeftBottom>
      </LeftSection>
      <RightSection>
        <RightTop >{rightTop}</RightTop>
        <RightBottom >{rightBottom}</RightBottom>
      </RightSection>
    </Wrap>
  );
};

CalendarTemplate.propTypes = {
  leftTop     : PropTypes.node,
  leftBottom  : PropTypes.node,
  rightTop    : PropTypes.node,
  rightBottom : PropTypes.node,
};

CalendarTemplate.defaultProps = {
  leftTop     : "leftTop",
  leftBottom  :"leftBottom",
  rightTop    : "rightTop",
  rightBottom : "rightBottom"

};

export default CalendarTemplate;
