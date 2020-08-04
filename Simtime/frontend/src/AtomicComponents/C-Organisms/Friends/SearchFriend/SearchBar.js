import "babel-polyfill";
import React, { Fragment, useState, createRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { searchUsers } from "../../../../actions/account";
// component
import { MAIN_COLOR } from "../../../Colors";
import SelectBoxRef from "../../../A-Atomics/Filter/SelectBoxRef";
import Search from "../../../B-Molecules/Filter/Search";
import ResultTable from "../ResultTable";

const SearchWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: solid 1px ${MAIN_COLOR};
`;

const StyledSelectBox = styled(SelectBoxRef)``;

const StyledSearch = styled(Search)`
  margin-left: 5px;
`;

const ResultWrap = styled.div`
  width: 100%;
`;
const Result = styled(ResultTable)``;
const Groups = styled(ResultTable)``;

function SearchBar(props) {
  const {
    height,
    width,
    newFriends,
    searchUsers,
    candidates,
    afterSearch
  } = props;


  const [field, setField] = useState("Username");
  const selectRef = createRef();
  const searchRef = createRef();

  const handleOptionChange = (option) => {
    setField(option);
    searchRef.current.focus();
  };

  const searchFriends = (field, keyword) => {
    var fieldMap = {Username: "username", "E-mail": "email", Phone: "phone",};

    var filterOption = fieldMap[field];
    var filtered = candidates.reduce((acc, candidate) => {
      console.log(filterOption, candidate)
      if (candidate[filterOption].includes(keyword)) acc.push(candidate);
        return acc;
      } , []);


    return filtered;
  }

  
  const searchHandler = async (keyword) => {
    if (keyword.length == 0) {
      var res = candidates;
    } else {
      if (newFriends) {
        var res = await searchUsers(field, keyword);
      } else {
        var res = searchFriends(field, keyword);
      }
    }
    console.log("res", res)
    afterSearch(res);
  };

  return (
    <Fragment>
      <SearchWrap {...props}>
        <StyledSelectBox
          options={["Username", "E-mail", "Phone"]}
          defaultOption="Username"
          width="102px"
          ref={selectRef}
          handleOptionChange={handleOptionChange}
        />
        <StyledSearch
          width="auto"
          desc="Find a friend"
          height="25px"
          ref={searchRef}
          searchHandler={searchHandler}
        />
      </SearchWrap>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  friends: state.friends.friends,
});
// export default SearchBars;
export default connect(mapStateToProps, { searchUsers })(SearchBar);

SearchBar.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  setResult: PropTypes.func,
  candidates: PropTypes.array,
  afterSearch: PropTypes.func
};

SearchBar.defaultProps = {
  height: "40px",
  width: "320px",
  setResult: (res) => {
    console.log("SearchBar - Default setResult : ", res);
  },
  candidates: [],
  afterSearch: ()=>{}
};
