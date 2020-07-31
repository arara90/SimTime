import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

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

function AddMembers(props) {
  const { friends, selectedGroup } = props;

  // const setStateAsync = (state) => {
  //   return new Promise((resolve) => {
  //     this.setState(state, resolve)
  //   });
  // }

  // handleChange = (e) => {
  //   return this.setStateAsync({[e.target.name]: e.target.value})
  // }

  const flatGroupMembers = (members) => {
    return members.reduce(
      (acc, member) => ({
        ...acc,
        [member.relationship.id]: member.relationship.id,
      }),
      {}
    );
  };
  const [groupMembers, setGroupMembers] = useState(
    flatGroupMembers(selectedGroup.members)
  );
  const [nonMembers, setNonMembers] = useState(
    friends.filter((friend) => !groupMembers[friend.id])
  );

  const [candidates, setCandidates] = useState([
    ...new Set(
      nonMembers.map((friend) => {
        return { ...friend.friend, id: friend.id };
      })
    ),
  ]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  const clickEvent = async (e) => {
    e.preventDefault();
    var groupId = props.selectedGroup.group.id;
    try {
      var data = selectedFriends.map((friend) => {
        return { relationship: friend, group: groupId };
      });

      var res = await props.addToGroup(data);
      console.log("res", res);

      setGroupMembers(flatGroupMembers(selectedGroup.members));
      setNonMembers(friends.filter((friend) => !groupMembers[friend.id]));
      setCandidates([
        ...new Set(
          nonMembers.map((friend) => {
            return { ...friend.friend, id: friend.id };
          })
        ),
      ]);

      console.log("dd");
    } catch (err) {
      console.log("addToGroupError", err);
    }
  };

  return (
    <Wrap>
      <SearchWrap>
        <SearchBar
          search={(res) => setCandidates(res)}
          candidates={nonMembers}
        />
      </SearchWrap>
      <ResultWrap>
        <Result
          multiple
          datas={candidates}
          width="100%"
          rowNum={5}
          selectHandler={(res) => {
            setSelectedFriends(res);
          }}
        />
      </ResultWrap>

      <Button onClick={(e) => clickEvent(e)}>Done</Button>
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  selectedGroup: state.groups.selectedGroup,
  friends: state.friends.friends,
});

export default connect(mapStateToProps, { addToGroup })(AddMembers);
