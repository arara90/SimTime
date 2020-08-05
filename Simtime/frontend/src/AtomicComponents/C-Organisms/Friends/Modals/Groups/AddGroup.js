import "babel-polyfill";
import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  createRef,
} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MAIN_COLOR, ST_GREEN, ST_RED } from "../../../../Colors";
import { createGroup } from "../../../../../actions/groups";
import { addToGroup } from "../../../../../actions/friends";

import InputWrap from "../../../../A-Atomics/Form/InputWrap";
import Paragraph from "../../../../A-Atomics/Font/Paragraph";
import DefaultModal from "../../../../B-Molecules/Modal/DefaultModal";
import ResultTable from "../../ResultTable";
import SearchBar from "../../../../C-Organisms/Friends/SearchFriend/SearchBar";

const StyledInput = styled(InputWrap)`
  padding-bottom: 15px;
`;

const ResultWrap = styled.div`
  width: 100%;
`;

const StyledSearchBar = styled(SearchBar)``;
const ArrowParagraph = styled(Paragraph)`
  cursor: pointer;
  padding-bottom: 10px;
`;

const Result = styled(ResultTable)``;

function AddGroup(props) {
  const { groups, relationships, closeModal } = props;
  const inputRef = createRef(null);

  //UI
  const [groupname, setGroupName] = useState("");
  const [addMembers, setAddMembers] = useState(false);

  //Data Filtering
  const [filteredFriendList, setFilteredFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isValid, setIsValid] = useState(false);

  function getTableData(relationships) {
    return relationships.map((relationship) => {
      return { id: relationship.relationshipId, ...relationship.friend };
    });
  }

  //initializing
  useEffect(() => {
    setFilteredFriendList(getTableData(relationships));
  }, []);

  //funcs
  const checkValidation = (groupname) => {
    inputRef.current.classList.remove("valid-value", "invalid-value");
    console.log("checkValidation", groupname, groups);
    if (groupname != "") {
      let res = !groups.find((group) => group.groupname === groupname);
      //valid state 저장
      setIsValid(res);
      //css 적용
      if (res) inputRef.current.classList.add("valid-value");
      else inputRef.current.classList.add("invalid-value");
      // inputRef.current.style.backgroundColor = "red";
    } else {
      inputRef.current.classList.add("invalid-value");
    }
  };

  const handleChange = useCallback((e) => {
    let value = e.target.value;
    checkValidation(value);
    setGroupName(value);
  });

  const handleSubmit = async () => {
    console.log("hello");
    if (isValid) {
      try {
        const group = await props.createGroup(groupname);
        if (selectedFriends.length > 0) {
          var mambersTogroup = selectedFriends.map((relationshipId) => {
            return { relationship: relationshipId, group: group.id };
          });
          console.log("mambersTogroup", mambersTogroup);
          await props.addToGroup(mambersTogroup);
        }
        props.onClose();
      } catch (err) {
        console.log("relationshipError", err);
      }
    } else {
      inputRef.current.focus();
      inputRef.current.classList.add("invalid-value");
    }
  };

  //친구 내에서 검색
  const searchFriends = (field, keyword) => {
    var map_field = { Username: "username", "E-mail": "email", Phone: "phone" };
    var filtered = relationships.filter((relationship) =>
      relationship.friend[map_field[field]].includes(keyword)
    );
    //resultTable Data에 맞게 정제
    setFilteredFriendList(getTableData(filtered));
  };

  const renderAddMember = () => {
    return (
      <Fragment>
        <StyledSearchBar searchFriends={searchFriends} />
        <ResultWrap>
          <Result
            datas={filteredFriendList}
            titleColor="MAIN_COLOR"
            width="100%"
            rowNum={6}
            onSelect={(res) => {
              setSelectedFriends(res);
            }}
            multiple
          ></Result>
        </ResultWrap>
      </Fragment>
    );
  };

  const renderChild = () => {
    return (
      <Fragment>
        <StyledInput
          height="55px"
          label="Name"
          name="GroupName"
          desc="Group Name"
          onChange={handleChange}
          enterHandler={handleSubmit}
          ref={inputRef}
        />
        {addMembers ? (
          <ArrowParagraph
            fontSize="14px"
            color="MAIN_COLOR"
            onClick={() => setAddMembers(false)}
          >
            {" "}
            ▲ Hide{" "}
          </ArrowParagraph>
        ) : (
          <ArrowParagraph
            fontSize="14px"
            color="MAIN_COLOR"
            onClick={() => setAddMembers(true)}
          >
            {" "}
            ▼ Add Members?{" "}
          </ArrowParagraph>
        )}
        {addMembers ? renderAddMember() : null}
      </Fragment>
    );
  };

  return (
    <DefaultModal
      title="Add Group"
      children={renderChild()}
      totalPage={0}
      handleSubmit={handleSubmit}
      height="auto"
      closeModal={closeModal}
    ></DefaultModal>
  );
}

// export default AddGroup;
export default connect(null, { createGroup, addToGroup })(AddGroup);

AddGroup.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  closeModal: PropTypes.func,
};

AddGroup.defaultProps = {
  height: "520px",
  width: "320px",
  closeModal: () => {
    console.log("Waring clsModal");
  },
};
