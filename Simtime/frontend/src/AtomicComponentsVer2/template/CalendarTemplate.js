import React, {Fragment} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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


// const Header = styled.header`
//   width:100%;
//   height:200px;
//   border: solid 1px red;
// `


const LeftSection = styled.section`
  width: 68.5%;
  height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media only screen and (max-width: 920px) {
    width: 100%;
  }
  border: solid 1px yellow;
`
const RightSection = styled.section`
  width: 31%;
  height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media only screen and (max-width: 920px) {
    width: 100%;
  }
  border: solid 1px black;
`

const Footer = styled.footer`

`

const CalendarTemplate = ({ header, children, footer, ...props }) => {
  return (
    <Wrap>
      <LeftSection>{children}</LeftSection>
      <RightSection></RightSection>
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
