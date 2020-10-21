import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  border: solid 1px red;
`;

const Left = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  border: solid 1px blue;
`;

const Right = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  border: solid 1px yellow;
`;


//   max-width: ${size("maxWidth")};
const Footer = styled.footer`
`;

const MainTemplate = ({ header, children, ...props }) => {
  return (
    <Wrapper {...props} className="DT">
      <Header>{header}</Header>
      <Left>{children}</Left>
      <Right>{children}</Right>
    </Wrapper>
  );
};

MainTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.any.isRequired,
};

MainTemplate.defaultProps = {
  header: "header  ",
  children: "children",
};

export default MainTemplate;
