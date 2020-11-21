import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import DefaultModal from "../../../molecule/modal/DefaultModal"

import { getGroups, getMembers } from "../../../../actions/groups";
import { getFriends } from "../../../../actions/friends";
import { addInvitation } from "../../../../actions/invitations";



function InviteFriends(props) {
  //hooks
  ////state
  const {getGroups, getFriends, selectedGroup, groups, relationships} = props;
  const [currGroup, setCurrGroup] = useState("All")
  const [displayFriends, setDisplayFriends] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState(null);

  ////useEffect
  useEffect(
    ()=>{
      getGroups()
      getFriends()
    }, []
  )

  //funcs
  const renderPage = () => {
    
  }


  return (
    <DefaultModal
      title="Invite Friends"
      pages={[<div>hello</div>]}
      totalPage={1}
      handleSubmit={handleSubmit}
      height="auto"
    ></DefaultModal>
  )
}




const mapStateToProps = (state) => ({
  groups: state.groups.groups,
  selectedGroup: state.groups.selectedGroup,
  relationships: state.friends.relationships,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => dispatch(getGroups()),
    getFriends: () => dispatch(getFriends()),
    getMembers: () => dispatch(getHost())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriends);

InviteFriends.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.array,
  selectedGoup: PropTypes.object,
  relationships: PropTypes.array,
  buttons: PropTypes.array,
  // closeModal: PropTypes.func,
};

InviteFriends.defaultProps = {
  title: "Table Title",
  headers: null,
  selectedGoup: { group: { id: "", groupname: "unknown" }, members: [] },
  relationships: [],
  buttons: [
    { content: "Members", url: null },
    {
      content: "Add",
      url:
        "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/add-yellow.png",
    },
  ],
  // closeModal: () => {
  //   console.log("Waring clsModal");
  // },
};
