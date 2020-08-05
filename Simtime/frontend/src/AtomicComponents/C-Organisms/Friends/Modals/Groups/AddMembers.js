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
import { addToGroup } from "../../../../../actions/groups";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px red;
`;

const SearchWrap = styled.div`
  width: 100%;
`;

const ResultWrap = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;
const Result = styled(ResultTable)``;

const Button = styled(ColoredButton)`
  margin-bottom: 5px;
`;

const MyItem = styled(SelectedItem)`
  height: 20px;
  white-space: nowrap;
`;

//search하기 위해 id를 index로
const flatGroupMembers = (members) => {
  return members.reduce(
    (acc, member) => ({
      ...acc,
      [member.relationship.relationshipId]: member.relationship.relationshipId,
    }),
    {}
  );
};

// 친구 중에 멤버가 아닌 사람 구하기
const getNonMembers = (relationships, groupMembers) => {
  return relationships.filter((friend) => !groupMembers[friend.relationshipId]);
};

//TableData 형태로 만들기
const getCandidates = (nonMembers) => {
  return [
    ...new Set(
      nonMembers.map((friend) => {
        return { ...friend.friend, id: friend.relationshipId };
      })
    ),
  ];
};

function AddMembers(props) {
  const { relationships, members, groupId } = props;

  var flatMembers = flatGroupMembers(members);
  var nonMembers = getNonMembers(relationships, flatMembers);
  var candidates = getCandidates(nonMembers);

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [tableData, setTableData] = useState(candidates);

  React.useEffect(() => {
    var newData = tableData.filter(
      (data) => !selectedFriends.includes(data.id)
    );
    setTableData(newData);
    setSelectedFriends([]);
  }, [members, relationships, groupId]);

  const clickEvent = (e) => {
    e.preventDefault();
    try {
      var data = selectedFriends.map((friend) => {
        return { relationship: friend, group: groupId };
      });
      //멤버로 등록
      props.addToGroup(data);
    } catch (err) {
      console.log("addToGroupError", err);
    }
  };

  //친구 내에서 검색
  const searchFriends = (field, keyword) => {
    console.log("?", field, keyword);
    console.log("?", candidates);

    var map_field = { Username: "username", "E-mail": "email", Phone: "phone" };
    var filtered = candidates.filter((candidate) =>
      candidate[map_field[field]].includes(keyword)
    );
    console.log("?", filtered);

    setTableData(filtered);
  };

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
          selectHandler={(res) => {
            setSelectedFriends(res);
          }}
        >
          {console.log("tableData", tableData)}
        </Result>
      </ResultWrap>
      {console.log("candidates", candidates)}
      {console.log("nonMembers", nonMembers)}
      {console.log("memer", members)}
      {console.log("selectedFriends", selectedFriends)}

      <Button onClick={(e) => clickEvent(e)}>Done</Button>
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addToGroup })(AddMembers);
