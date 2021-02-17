import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ST_YELLOW_LIGHT, ST_WHITE, ST_GRAY_LIGHT } from "../../Colors";

const Wrap = styled.div`
  background-color: ${(props) =>
    props.isSelected
      ? ST_YELLOW_LIGHT
      : props.isOdd
      ? ST_GRAY_LIGHT
      : ST_WHITE};
  height: ${(props) => props.height};
  ${(props) =>
    props.isSelected && props.selectIcon
      ? `background-size :14px;
      background-repeat: no-repeat;
      background-image: url("https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/check.png");
      background-position: 92% center;`
      : ""};
`;
const Content = styled.div`
    height: 100%;
    display: flex;
    flex-direction; row;
    justify-content: space-between;
    align-items: center;

    padding-left: 15px;
    padding-right: 15px;
`;

export class TableRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Wrap {...this.props} isOdd={this.props.rowNum % 2 == 1}>
        <Content>{this.props.children}</Content>
      </Wrap>
    );
  }
}

export default TableRow;

TableRow.propTypes = {
  height: PropTypes.string,
};

TableRow.defaultProps = {
  height: "45px",
};
