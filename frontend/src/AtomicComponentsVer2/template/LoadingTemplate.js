import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
`;

const Content = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingTemplate = ({ header, children, ...props }) => {
  return (
    <Wrapper {...props}>
      <Header>{header}</Header>
      <Content>{children}</Content>
    </Wrapper>
  );
};

LoadingTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node,
};

LoadingTemplate.defaultProps = {
  header: "header  ",
  children: "children",
};


export default LoadingTemplate;
