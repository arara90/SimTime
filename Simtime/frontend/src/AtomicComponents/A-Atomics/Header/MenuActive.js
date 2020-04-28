import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { ST_BLUE, TEXT_ACTIVE } from "../../Colors";
import StyledText from "../Font/Header";

const Wrap = styled.div`
  display: inline-block;
`;

const ContentWrap = styled.div`
  ${(props) => (props.width ? `width : ${props.width}px` : "")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  background-color: ${ST_BLUE};
  border-radius: 80px 80px 20px 20px;
  height: 5px;
  width: 64px;
`;
const StyledContent = styled(StyledText)`
  font-weight: 600;
`;

function MenuActive(props) {
  return (
    <Wrap>
      <ContentWrap>
        <StyledContent type="h4" color={TEXT_ACTIVE}>
          {props.children}
        </StyledContent>
        <Bottom />
      </ContentWrap>
    </Wrap>
  );
}

export default MenuActive;