import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import ColoredButton from "../../../../A-Atomics/Button/ColoredButton";
import SelectedItem from "../../../../A-Atomics/Filter/SelectedItem";
import Paragraph from "../../../../A-Atomics/Font/Paragraph";
import SearchBar from "../../../../C-Organisms/Friends/SearchFriend/SearchBar";
import ResultTable from "../../ResultTable";

import { MAIN_COLOR } from "../../../../Colors";
import { addToGroup } from "../../../../../actions/friends";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchWrap = styled.div`
  width: 100%;
`;
const ResultWrap = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;
const Result = styled(ResultTable)``;
const Result = styled(ResultTable)``;


//TableData 형태로 만들기
const transformIntoTableData = (candidates) => {
  return [
    ...new Set(
      candidates.map((friend) => {
        return { ...friend.friend, id: friend.relationshipId };
      })
    ),
  ];
};

function AddMembers(props) {
  const {searchFriends, tableData, selectHandler, multiple, rownum, width } = props
  return (
    <Wrap>
       <SearchWrap>
        <SearchBar searchFriends={searchFriends} />
      </SearchWrap>
      <ResultWrap>
        <Result
          multiple
          datas={tableData}
          width="100%"
          rowNum={5}
          selectHandler={selectHandler}
        />
      </ResultWrap>
    </Wrap>
  );
}

er,
});

export default AddMembers;

AddMembers.propTypes = {
  searchFriends: PropTypes.func.isrequired,
  selectHandler: PropTypes.func.isrequired,
  tableData: PropTypes.string.isrequired,
  multiple: PropTypes.boolean,
  rownum: PropTypes.number,
  width: PropTypes.string,
};

AddMembers.defaultProps = {
  multiple: false,
  rownum: 5,
  width: "100%"
};
