import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import TableRow from "../../A-Atomics/Table/TableRow";
import Table from "../../B-Molecules/Table/Table";
import SelectTable from "../../B-Molecules/Table/SelectTable";
import UserCardForList from "../../B-Molecules/User/UserCardForList";

const Row = styled(TableRow)`
  ${(props) => (props.pointer ? "cursor: pointer" : "cursor: default")};
`;
const ImageCard = styled(UserCardForList)`
  cursor: pointer;
`;

function ResultTable(props) {

  const {
    addButton,      
    titleColor,       
    rowNum,           
    datas,            
    selectHandler,    
    handleAddBtnClick} = props

  useEffect(()=>{setSelectionFilter(prev=> prev.filter(selection=> selection == datas.id))}, [datas])

  //UI용
  const [selectionFilter, setSelectionFilter] = useState([]);

  const handleClick = (e, id) => {
    e.preventDefault();
    var res = [];

    if (selectionFilter.indexOf(id) > -1) {
      // = selectionFilter.includes(id)
      res = selectionFilter.filter((selection) => selection != id);
    } else {
      if (props.multiple) res = [...selectionFilter, id];
      else res = [id];
    }

    setSelectionFilter(res);
    props.selectHandler(res);
  };

  const renderRows = (datas = []) => {
    return datas.map((data, index) => {
      return (
        <Row
          key={data.id}
          onClick={(e) => handleClick(e, data.id)}
          isSelected={selectionFilter.includes(data.id)}
          pointer
          selectIcon
        >
          <ImageCard
            username={data.username || data.groupname}
            imageSize="32px"
            url={data.profile_image}
          />
        </Row>
      );
    });
  };

  const renderDefaultRow = () => {
    return <Row>No results found :(</Row>;
  };

  return (
    <Table
      title={props.title}
      titleColor={props.titleColor}
      width="100%"
      rowNum={props.rowNum}
      handleAddBtnClick ={props.handleAddBtnClick}
      addButton={props.addButton}
    >
      {props.datas.length == 0 ? renderDefaultRow() : renderRows(props.datas)}
    </Table>
  );
}

export default ResultTable

ResultTable.propTypes = {
  addButton: PropTypes.bool,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  rowNum: PropTypes.number,
  datas: PropTypes.array,
  selectHandler: PropTypes.func,
  handleAddBtnClick: PropTypes.func,
};

ResultTable.defaultProps = {
  addButton         : false,
  titleColor        : "MAIN_COLOR",
  rowNum            : 3,
  datas             : [{ id: 0 }],
  selectHandler     : () => {},
  handleAddBtnClick : () => {},
};
