import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors"

const Wrap = styled.div`
  height: ${(props) => props.height};
  color: ${Colors.MAIN_COLOR};
  cursor: default;
  font-weight: bold;
`;

function TableTitle(props){
    return <Wrap {...props}></Wrap>;
}

export default TableTitle;

TableTitle.propTypes = {
  height: PropTypes.string,
};

TableTitle.defaultProps = {
  height: "auto",
};
