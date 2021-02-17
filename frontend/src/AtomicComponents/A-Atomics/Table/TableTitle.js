import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrap = styled.div`
  height: ${(props) => props.height};
  cursor: default;
`;

export class TableTitle extends Component {
  render() {
    return <Wrap {...this.props}></Wrap>;
  }
}

export default TableTitle;

TableTitle.propTypes = {
  height: PropTypes.string,
};

TableTitle.defaultProps = {
  height: "auto",
};
