import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 920px) {
    width: 100%;
    flex-direction: column;
  }

  overflow: hidden;
`;

const Left = styled.div`
  width: 68.5%;
  height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media only screen and (max-width: 920px) {
    width: 100%;
  }
`;

const LeftHeader = styled.div`
  margin-bottom: 8px;
`;

const LeftContent = styled.div`
`


const Right = styled.div`
  width: 31%;
  height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media only screen and (max-width: 920px) {
    width: 100%;
  }
`;


const CalendarTemplate = ({ header, children, footer, ...props }) => {
  return (
    <Wrap>
      <Left>
          <LeftHeader></LeftHeader>
          <LeftContent></LeftContent>
      </Left>
      <Right>
          <RightHeader></RightHeader>
          <RightContent></RightContent>
      </Right>
    </Wrap>
  );
};

CalendarTemplate.propTypes = {
  leftHeader: PropTypes.node.isRequired,
  leftContent: PropTypes.node,
  rightHeader: PropTypes.node,
  rightContent: PropTypes.node
};

CalendarTemplate.defaultProps = {
  leftHeader    : "leftHeader",
  leftContent   : "leftContent",
  rightHeader   : "rightHeader",
  rightContent  : "rightContent"
};

export default CalendarTemplate;
