import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StyledText from "./Font/Header";

const Wrap = styled.div`
  // border: solid 1px red;
  display: inline-block;
  vertical-align: middle;
`;

const Content = styled(StyledText)`
  font-weight: bold;
`;

function LOGO() {
  return (
    <Wrap>
      <Content type="h1" color="MAIN_COLOR">
        SimTime
      </Content>
    </Wrap>
  );
}

export default LOGO;