import React from "react";
import PropTypes from "prop-types";
import styled, { css} from "styled-components";
import * as Colors from "../Colors";

const Wrap = styled.main`
  width:inherit;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 920px) {
    flex-direction: column;
  }

`;

const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media only screen and (max-width: 920px) {
    width: 100%;
  }
  z-index: 1;
`
const RightSection = styled.section`
  flex: 1;
  margin-left: 10px; 
  display: flex;
  flex-direction: column;

  position: -webkit-sticky;
  position: sticky;
  z-index: 2;
  top: 60px;   // header 높이만큼
  height: 100%;  // height 반드시 있어야함(sticky)

  @media only screen and (max-width: 920px) {
    width: 100%;
  }

  @media only screen and (max-width: 680px) {
      top: 50px;
    }

`
const topCss = css`
  width: 100%;
  padding-bottom: 10px;
  top: 60px;
  height: 4em;

  @media only screen and (max-width: 680px) {
    top: 50px;
    height: 3em;
  }

`

const LeftTop = styled.div`
  ${topCss}

  position: -webkit-sticky;
  position: sticky;
  z-index: 5;
`

const LeftBottom = styled.section`
  width: 100%;
  flex: 1;
`

const RightTop = styled.div`
  ${topCss}

  @media only screen and (max-width: 920px) {
    display: none;
  }
`

const RightBottom = styled.section`
  width: 100%;
  flex: 1;

  @media only screen and (max-width: 920px) {
    position: -webkit-sticky;
    position: sticky;
    top:150px;
  }
`


const CalendarTemplate = ({children, ...props }) => {
  const headerHeight = document.getElementById('simtime-header').getBoundingClientRect().height
  const {leftTop, leftBottom, rightTop, rightBottom } = props;
  return (
    <Wrap id="simtime-page" headerHeight= {headerHeight}>
      <LeftSection headerHeight= {headerHeight}>
        <LeftTop>{leftTop}</LeftTop>
        <LeftBottom >{leftBottom} </LeftBottom>
      </LeftSection>
      <RightSection headerHeight= {headerHeight}>
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
