import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

function MenuLink(props) {
  return (
    <StyledLink to={props.src} onClick={(e) => props.handleClick()}>
      {props.children}
    </StyledLink>
  );
}

export default MenuLink;

MenuLink.propTypes = {
  src: PropTypes.string,
  handleClick: PropTypes.func
};

MenuLink.defaultProps = {
  src: "/",
  handleClick: ()=>{}
};
