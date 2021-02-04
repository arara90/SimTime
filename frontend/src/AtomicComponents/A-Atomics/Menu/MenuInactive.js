import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { ST_BLUE, ST_WHITE, TEXT_ACTIVE, TEXT_INACTIVE } from "../../Colors";
import Header from "../Font/Header";

const Wrap = styled.div`
  // border: solid 1px red;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

`;

const ContentWrap = styled.div`
  // ${(props) => (props.width ? `width : ${props.width}px` : "")};
  @media only screen and (max-width:1099px){
    max-width: 110px;
  }

  min-width: 80px;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
`;

const Bottom = styled.div`
  background-color: ${ST_WHITE};
  border-radius: 80px 80px 20px 20px;
  height: 5px;
  width: 64px;
`;

const StyledContent = styled(Header)`
  color: ${TEXT_INACTIVE};
  font-weight: bold;
  &:hover {
    color: ${TEXT_ACTIVE};
  }
`;

function MenuInActive(props) {
  return (
    <Wrap>
      <ContentWrap>
        <StyledContent type="h4" color={TEXT_INACTIVE}>
          {props.children}
        </StyledContent>
        <Bottom />
      </ContentWrap>
    </Wrap>
  );
}

export default MenuInActive;
