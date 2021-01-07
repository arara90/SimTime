import "babel-polyfill";
import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MAIN_COLOR, ST_GREEN, ST_RED } from "../../../../Colors";
import { createGroup } from "../../../../../redux/actions/groups";
import { addToGroup } from "../../../../../redux/actions/friends";

import DefaultModal from "../../../../../AtomicComponentsVer2/molecule/modal/DefaultModal"

import InputWrap from "../../../../A-Atomics/Form/InputWrap";
import Paragraph from "../../../../A-Atomics/Font/Paragraph";
import ResultTable from "../../ResultTable";
import SearchBar from "../../../../C-Organisms/Friends/SearchFriend/SearchBar";

import AddMembers from "./AddMembers"


const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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


function AddGroup(props) {
  const { groups, relationships, closeModal } = props;
  const inputRef = useRef(null);

  //UI
  const [groupname, setGroupName] = useState("");
  const [addMembers, setAddMembers] = useState(false);

  //Data Filtering
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [tableData, setTableData] = useState(transformIntoTableData(relationships));
  const [isValid, setIsValid] = useState(false);


  //////////////groupname
  //funcs
  const checkValidation = (groupname) => {
    inputRef.current.classList.remove("valid-value", "invalid-value");

    if (groupname != "") {
      let res = !groups.find((group) => group.groupname === groupname);

      //valid state 저장
      setIsValid(res);

      //css 적용
      if (res) inputRef.current.classList.add("valid-value");
      else inputRef.current.classList.add("invalid-value");
      // inputRef.current.style.backgroundColor = "red";
    } 
    else {
      inputRef.current.classList.add("invalid-value");
    }
  };

  const handleChange = useCallback((e) => {
    let value = e.target.value;
    checkValidation(value);
    setGroupName(value);
  });


  ///////////////////////addMember
  const handleSubmit = async () => {
    if (isValid) {
      try {
        const group = await props.createGroup(groupname);
        if (selectedFriends.length > 0) {
          var mambersTogroup = selectedFriends.map((relationshipId) => {
            return { relationship: relationshipId, group: group.id };
          });
          await props.addToGroup(mambersTogroup);
        }
        closeModal();
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
    var filtered = relationships.filter((relationship) =>
      relationship.friend[field].includes(keyword)
    );

    setTableData(transformIntoTableData(filtered));
  };

  
  const renderAddMember = () => {
    return (
      <Wrap>
        <StyledSearchBar searchFriends={searchFriends} />
        <ResultWrap>
          <Result
            multiple
            datas={tableData}
            titleColor="MAIN_COLOR"
            width="100%"
            rowNum={6}
            selectHandler={setSelectedFriends}
          />
        </ResultWrap>
      </Wrap>
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
      pages={[renderChild()]}
      totalPage={1}
      submitHandler={handleSubmit}
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
