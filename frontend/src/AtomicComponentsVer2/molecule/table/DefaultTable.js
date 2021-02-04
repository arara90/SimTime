import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import * as Colors from "../../Colors"
import TableHeaderRow from "../../atom/table/TableHeaderRow";
import TableTitle from "../../atom/table/TableTitle";
import IconButton from "../../atom/buttons/IconButton";
import PlusCircleIcon from "../../atom/icons/PlusCircleIcon"
import { MAIN_COLOR } from "../../../AtomicComponents/Colors";
// import Header from "../../A-Atomics/Font/Header";


const TableWrap = styled.div`
  height: auto;
  width: ${(props) => props.width};
  display: inline-block;
`;


//title
const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 1.3em;
  padding: 0 3px;
`;

const Header = styled(TableTitle)`
`


//table

const TableContent = styled.ul`
  max-height: ${(props) => props.height};
  border: solid 1px ${Colors.MAIN_COLOR};
  border-radius: 6px;
  padding: 3px;
  overflow-y: auto;
`;



function Table(props) {
  const renderButton = (button) => {
  return button ? button : <IconButton onClick={props.handleAddBtnClick}><PlusCircleIcon /></IconButton>
  };

  return (
    <TableWrap {...props}>
      <TitleWrap>
        {props.title ? <Header type="h4" color={props.titleColor}>{props.title}</Header>: null}
        {props.button || props.addButton ? renderButton(props.button) : null}
      </TitleWrap>
      {props.headers ? <TableHeader>{props.headers}</TableHeader> : null}
      <TableContent height={parseFloat(props.rowHeight.replace(/[^-\.0-9]/g, "")) * props.rowNum + (props.rowHeight.replace(/[^a-z]/i,""))}>
        {props.children}
      </TableContent>
    </TableWrap>
  );
}

export default Table;

Table.propTypes = {
  title: PropTypes.string,
  titleColor: PropTypes.string,
  addButton: PropTypes.bool,
  handleAddBtnClick: PropTypes.func,
  button: PropTypes.node,
  width: PropTypes.string,
  rowNum: PropTypes.number,
  rowHeight: PropTypes.string,
  headers: PropTypes.array,
  datas: PropTypes.array,
};

Table.defaultProps = {
  titleColor: "TEXT",
  addButton: false,
  handleAddBtnClick: () => {alert("click");},
  button: null,
  width: "48%",
  rowNum: 5,
  rowHeight: "45px",
  headers: null,
  datas: null,
};
