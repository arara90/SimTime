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
import { addToGroup } from "../../../../../redux/actions/friends";

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

const Button = styled(ColoredButton)`
  margin-bottom: 5px;
`;

const MyItem = styled(SelectedItem)`
  height: 20px;
  white-space: nowrap;
`;



//search하기 위해 id를 index로
const flatGroupMembers = (members) => {
  console.log('flatGroupMembers members', members)
  return members.reduce(
    (acc, member) => ({
      ...acc,
      [member.relationshipId]: member.relationshipId,
    }),
    {}
  );
};

// 친구 중에 멤버가 아닌 사람 구하기
const getNonMembers = (relationships, groupMembers) => {
  return relationships.filter((friend) => !groupMembers[friend.relationshipId]);
};

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
  const { relationships, selectedGroupMembers, groupId } = props;


  var flatMembers = flatGroupMembers(selectedGroupMembers);
  console.log('flatMembers', flatMembers)
  var nonMembers = getNonMembers(relationships, flatMembers);

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [tableData, setTableData] = useState(transformIntoTableData(nonMembers))

  React.useEffect(() => {
    console.log('AddMembers useEffect', selectedFriends,tableData )
    var newData = setTableData(tableData.filter(
      (data) => !selectedFriends.includes(data.id)
    ));
      
    setSelectedFriends([])
  }, [selectedGroupMembers, relationships, groupId]);


 

  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = selectedFriends.map((friend) => {
      return { relationship: friend, group: groupId };
    });

    //멤버로 등록
    var res = await props.addToGroup(data);
    
    if(res) {
      console.log('dd');
    }
  };

  //친구 내에서 검색
  const searchFriends = (field, keyword) => {
      var filtered = nonMembers.filter((nonMember) =>
        nonMember.friend[field].includes(keyword)
    );
    setTableData(transformIntoTableData(filtered))
  }


  return (
    <Wrap>
      <SearchWrap>
        <SearchBar searchFriends={searchFriends} />
      </SearchWrap>
      <ResultWrap>
        <ResultTable
         multiple
         datas={tableData}
         width="100%"
         rowNum={5}
         selectHandler={setSelectedFriends} />
      </ResultWrap>
      <Button handleSubmit={handleSubmit}>Done</Button>
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addToGroup })(AddMembers);
