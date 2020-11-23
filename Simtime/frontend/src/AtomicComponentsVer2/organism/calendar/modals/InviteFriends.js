import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../../Colors"
import DefaultModal from "../../../molecule/modal/DefaultModal"

// import TableTitle from "../../../atom/table/TableTitle"
import TableRow from "../../../atom/table/TableRow"
import SearchIcon from "../../../atom/icons/SearchIcon"


import { getGroups, getMembers } from "../../../../actions/groups";
import { getFriends } from "../../../../actions/friends";
import { addInvitation } from "../../../../actions/invitations";

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Section = styled.section`
`

const GroupTable = styled.ul`
border: solid 1px ${Colors.MAIN_COLOR};
padding: 3px;
width: 120px;
`

const FriendsTable = styled.ul`
  border: solid 1px ${Colors.MAIN_COLOR};
  padding: 3px;
  width: 160px;
`

const Row = styled(TableRow)`
  cursor: pointer;
`
const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TableTitle = styled.h3`
  height: ${(props) => props.height};
  color: ${Colors.MAIN_COLOR};
  font-weight: bold;
  font-size: 1em;
  cursor: default;
  
`;

const Search = styled(SearchIcon)`
  color: ${Colors.MAIN_COLOR};
  cursor: pointer;

  margin-right: 2px;

`


function InviteFriends(props) {
  const rowHeight = "2.5em"

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


  const handleSubmit = () => {
    
  }
  return (
    <DefaultModal
      title="Invite Friends"
      pages={[
        <Wrap>
          <section>
            <TableHeader>
              <TableTitle>Groups</TableTitle>
            </TableHeader>
            
            <GroupTable> 
                {groups.map((group, index)=>{ return <Row height={rowHeight} key={index} rowNum={index}>{group.groupname}</Row>})}
            </GroupTable>
          </section>

          <section>
            <TableHeader>
              <TableTitle>Friends</TableTitle>
              <Search />
            </TableHeader>
            <FriendsTable> 
                {relationships.map((relationship, index)=>{return <Row height={rowHeight} key={index} rowNum={index}>{relationship.friend.username}</Row>})}
            </FriendsTable>
          </section>
        </Wrap>
    ]}
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
