import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors"


const Title = styled.h3`
  height: ${(props) => props.height};
  color: ${Colors.MAIN_COLOR};
  font-weight: bold;
  font-size: 1em;
  cursor: default;
`;

function TableTitle(props){
  return <Title>{props.children}</Title>;
}

export default TableTitle;

TableTitle.propTypes = {
  height: PropTypes.string,
};

TableTitle.defaultProps = {
  height: "auto",
};

