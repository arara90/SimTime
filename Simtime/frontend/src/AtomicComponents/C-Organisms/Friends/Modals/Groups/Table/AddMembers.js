import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ColoredButton from "../../../../../A-Atomics/Button/ColoredButton";
import SelectedItem from "../../../../../A-Atomics/Filter/SelectedItem";
import Paragraph from "../../../../../A-Atomics/Font/Paragraph";
import SearchBar from "../../../../../C-Organisms/Friends/SearchFriend/SearchBar";
import ResultTable from "../../../ResultTable";

import { MAIN_COLOR } from "../../../../../Colors";
import { addToGroup } from "../../../../../../actions/groups";

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

const Button = styled(ColoredButton)`
  margin-bottom: 5px;
`;

const MyItem = styled(SelectedItem)`
  height: 20px;
  white-space: nowrap;
`;

const flatDatas= (datas)=> {
  return [datas.reduce(
    (acc, data ) => ({
      ...acc,
      id : data.relationshipId,
      username: data.friend.username,
      email: data.friend.email,
      profile_image: data.friend.profile_image,

    }),{}
    )]
}
const getCandidates = (relationships, membersIndex) => {
  var res = relationships.filter((relationship) => !membersIndex[relationship.relationshipId])
  return flatDatas(res)
}


const getMappedMembers= (members)=> {
  return members.reduce(
    (acc, member ) => ({
      ...acc,
      [member.relationship.relationshipId]: member.relationship,
    }),{}
    );
}




function AddMembers(props) {
  const { members, groupId, relationships } = props;

  var memberIndex = getMappedMembers(members)

  const [candidates, setCandidates] = useState(getCandidates(relationships, memberIndex));
  const [tableData, setTableData] = useState(candidates);
  const [selectedFriends, setSelectedFriends] = useState(getMappedMembers(members));

  // React.useEffect(()=>{
  //   setCandidates(getCandidates(members, memberIndex));
  //   setTableData(tableData.filter((data) => !memberIndex[data.relationshipId]))
  //   // setMemberIndex(getIndexMembers(members));
  // }, [members] );

  console.log("candidates, ", candidates)
  



  // useEffect(() => {
  //   console.log("useEffect setCandidatesToDisplay", candidates);
  //   // searchHandler(keyword);
  //   setCandidatesToDisplay(
  //     candidates.filter((candidate) => !selectedFriends.includes(candidate.id))
  //   );
  // }, [JSON.stringify(candidates)]);



  
//   const clickEvent = async (e) => {
//     e.preventDefault();
//     var groupId = props.selectedGroup.group.id;
//     try {
//       var data = selectedFriends.map((friend) => {
//         return { relationship: friend, group: groupId };
//       });

//       var res = await props.addToGroup(data);
//       console.log("res", res);

//       setGroupMembers(flatGroupMembers(selectedGroup.members));
//       setNonMembers(friends.filter((friend) => !groupMembers[friend.id]));
//       setCandidates([
//         ...new Set(
//           nonMembers.map((friend) => {
//             return { ...friend.friend, id: friend.id };
//           })
//         ),
//       ]);

//     } catch (err) {
//       console.log("addToGroupError", err);
//     }
//   };

  return (
    <Wrap>
      <SearchWrap>
        <SearchBar
          afterSearch={(res) => setTableData(res)}
          candidates={candidates}
        />
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
        />
      </ResultWrap>

      {/* <Button onClick={(e) => clickEvent(e)}>Done</Button> */}
    </Wrap>
  );
}



export default connect(null, { addToGroup })(AddMembers);
