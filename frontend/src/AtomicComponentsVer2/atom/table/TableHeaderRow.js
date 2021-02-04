import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  MAIN_COLOR,
  ST_YELLOW_LIGHT,
  ST_WHITE,
  ST_GRAY_LIGHT,
} from "../../Colors";


const Content = styled.li`
  height: ${(props) => props.height};
  display: flex;
  flex-direction; row;
  justify-content: space-between;
  align-items: center;

  padding-left: 15px;
  padding-right: 15px;

  background-color: ${(props) => props.color || ST_GRAY_LIGHT};
    
`;

// export class TableHeader extends Component {
//   render() {
//     return <Content {...this.props} isOdd={this.props.rowNum % 2 == 1}></Content>
//   }
// }


function TableHeader(props){
  return <Content {...props} isOdd={props.rowNum % 2 == 1}></Content>
}

export default TableHeader;

TableHeader.propTypes = {
  height: PropTypes.string,
};

TableHeader.defaultProps = {
  height: "30px",
};
