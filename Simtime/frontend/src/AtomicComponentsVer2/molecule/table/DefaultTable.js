import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import TableHeader from "../../atom/table/TableHeader";
import TableTitle from "../../atom/table/TableTitle";
import { MAIN_COLOR } from "../../../AtomicComponents/Colors";
// import Header from "../../A-Atomics/Font/Header";
// import ButtonWithImage from "../../B-Molecules/Button/ButtonWithImage";

const TableWrap = styled.div`
  height: auto;
  width: ${(props) => props.width};
  display: inline-block;
`;

const StyledTableTitle = styled(TableTitle)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 4px;
`;

const TableContent = styled.div`
  // border: solid 1px grey;
  height: ${(props) => props.height}px;
  overflow-y: auto;
`;

const Header = styled.h2`
  color: ${MAIN_COLOR};
  font-weight : bold;
`


function Table(props) {
  const renderButton = (button) => {
    return (
      <ButtonWithImage
        height="20px"
        width="auto"
        button={button}
        onClick={() => props.handleAddBtnClick()}
      />
    );
  };

  return (
    <TableWrap {...props}>
      {props.title || props.addButton ? (
        <StyledTableTitle>
          {props.title ? (
            <Header type="h4" color={props.titleColor}>
              {props.title}
            </Header>
          ) : null}
          {props.addButton ? renderButton(props.button) : null}
        </StyledTableTitle>
      ) : null}

      {props.headers ? <TableHeader>hello?</TableHeader> : null}

      <TableContent
        height={parseInt(props.rowHeight.replace(/[^0-9]/g, "")) * props.rowNum}
      >
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
  button: PropTypes.object,
  width: PropTypes.string,
  rowNum: PropTypes.number,
  rowHeight: PropTypes.string,
  headers: PropTypes.array,
  datas: PropTypes.array,
};

Table.defaultProps = {
  titleColor: "TEXT",
  addButton: false,
  handleAddBtnClick: () => {
    alert("click");
  },
  button: {
    content: "Add",
    url:
      "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/add-yellow.png",
  },
  width: "48%",
  rowNum: 5,
  rowHeight: "45px",
  headers: null,
  datas: null,
};
