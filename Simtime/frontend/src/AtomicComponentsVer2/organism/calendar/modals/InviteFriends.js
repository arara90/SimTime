import "babel-polyfill";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import { MAIN_COLOR } from "../../../Colors";
import DefaultModal from "../../../molecule/modal/DefaultModal";

import SearchBar from "../../../../AtomicComponents/C-Organisms/Friends/SearchFriend/SearchBar";
import ResultTable from "../../../../AtomicComponents/C-Organisms/Friends/ResultTable";

//redux-actions
import { addfriend, addToGroup } from "../../../../actions/friends";
import { searchUsers } from "../../../../actions/account";

const SearchWrap = styled.div`
  width: 100%;
  padding-bottom: 15px;
`;
const ResultWrap = styled.div`
  width: 100%;
`;
const Result = styled(ResultTable)``;
const Groups = styled(ResultTable)``;

function InviteFriends(props) {
  const { closeModal } = props;
  const [friends, setFriend] = useState([]);


  // const handleSubmit = async () => {
  //   try {
  //     //친구 등록
  //     var relationship = await props.addfriend( {account: props.user.id, friend: friend[0],});
  //     console.log(relationship)
  //     if(groups.length){
  //       var groupData = groups.map((group) => {
  //         return { relationship: relationship.data.relationshipId, group: group };
  //       });
  //       await props.addToGroup(groupData);
  //     }

  //     props.closeModal();
  //   } catch (err) {
  //     console.log("relationshipError", err);
  //   }
  // };


  return (
    <DefaultModal title={"Invite Friends"}> test</DefaultModal>
  );
}

const mapStateToProps = (state) => ({
});
// export default AddFriend;
export default connect(mapStateToProps, {  })(InviteFriends);

InviteFriends.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  closeModal: PropTypes.func,
};

InviteFriends.defaultProps = {
  height: "520px",
  width: "320px",
  closeModal: () => {
    console.log("Warning clsModal");
  },
};
