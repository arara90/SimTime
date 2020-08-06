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

  // var flatMembers = flatGroupMembers(members);
  // var nonMembers = getNonMembers(relationships, flatMembers);
  // var candidates = getCandidates(nonMembers);

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [tableData, setTableData] = useState(getCandidates(getNonMembers(relationships,  flatGroupMembers(members))))
  const [searchTaget, setSearchTarget] = useState(getCandidates(getNonMembers(relationships,  flatGroupMembers(members))));

  console.log("searchTargetrrrrrr", searchTaget)
  React.useEffect(() => {
    var newData = tableData.filter(
      (data) => !selectedFriends.includes(data.id)
    );

    var newTarget = searchTaget.filter(
      (data) => !selectedFriends.includes(data.id)
    );
    setTableData(newData);
    setSearchTarget(newTarget);
    setSelectedFriends([]);

    console.log("useEffect")
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
  // 얘만 실행하면... 되돌아와..
  const searchFriends = (field, keyword) => {
    console.log("?", field, keyword);
    console.log("datas?", searchTaget)
    var map_field = { Username: "username", "E-mail": "email", Phone: "phone" };
    var filtered = searchTaget.filter((candidate) =>
      candidate[map_field[field]].includes(keyword)
    );
    setTableData(filtered)
  }

  const test = (field) =>{
    console.log("test", searchTaget, field)
  }

// datas={getCandidates(getNonMembers(relationships, flatGroupMembers(members)))
// datas={candidates(nonMembers)} afterSearch={(res)=>setTableData(res)}
  //const [fn, setFn] = useState( ()=>members=> members.length )
  
  return (
    <Wrap>
      <SearchWrap>
        <SearchBar searchFriends={(field, keyword)=>searchFriends(field, keyword)}
        test ={(field)=>test(fields)} 

        // afterSearch={(res)=>setTableData(res)}
         />
      </SearchWrap>
      <ResultWrap>
        <Result
          multiple
          datas={tableData}
          width="100%"
          rowNum={5}
          selectHandler={setSelectedFriends}
        >
          {console.log("tableData", tableData)}
        </Result>
      </ResultWrap>


      <Button onClick={(e) => clickEvent(e)}>Done</Button>
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addToGroup })(AddMembers);
