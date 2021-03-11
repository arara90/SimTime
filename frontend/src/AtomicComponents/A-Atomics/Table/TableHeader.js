import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  MAIN_COLOR,
  ST_YELLOW_LIGHT,
  ST_WHITE,
  ST_GRAY_LIGHT,
} from "../../Colors";

const Wrap = styled.div`
  background-color: ${(props) => props.color || ST_GRAY_LIGHT};
  height: ${(props) => props.height};
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

export class TableHeader extends Component {
  render() {
    return (
      <Wrap {...this.props} isOdd={this.props.rowNum % 2 == 1}>
        <Content {...this.props}></Content>
      </Wrap>
    );
  }
}

export default TableHeader;

TableHeader.propTypes = {
  height: PropTypes.string,
};

TableHeader.defaultProps = {
  height: "30px",
};
