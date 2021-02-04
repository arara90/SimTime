import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MenuContext } from "../../../contexts/menuContext";

import LOGO from "../../A-Atomics/Logo";
import MenuLink from "../../A-Atomics/Menu/MenuLink";

const LogoWrap = styled.div`

`;

function Logo(props) {
  const { handleMenu } = useContext(MenuContext);
  return (
    <LogoWrap {...props}>
      <MenuLink
        handleClick={() => {
          handleMenu("/");
        }}
      >
        <LOGO />
      </MenuLink>
    </LogoWrap>
  );
}

export default Logo;
