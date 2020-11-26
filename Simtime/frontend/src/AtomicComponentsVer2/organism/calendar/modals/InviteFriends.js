import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../../Colors"
import DefaultModal from "../../../molecule/modal/DefaultModal"

// import TableTitle from "../../../atom/table/TableTitle


import IconButton from "../../../atom/buttons/IconButton";
import SearchIcon from "../../../atom/icons/SearchIcon"

import TableRow from "../../../atom/table/TableRow"
import CaretIcon from "../../../atom/icons/CaretIcon"
import DefaultTable from "../../../molecule/table/DefaultTable"


import { getGroups, getMembers } from "../../../../actions/groups";
import { getFriends } from "../../../../actions/friends";

import { addInvitation } from "../../../../actions/invitations";

const MyModal = styled(DefaultModal)`

`

const Wrap = styled.div`
  width: 100%;
  height: 27em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const GroupTable = styled(DefaultTable)`
  width: 120px;
`

const FriendsTable = styled(DefaultTable)` 
  width: 160px;
`

const Row = styled(TableRow)`
  ${({selected}) => selected ? `font-weight: bold;`: null}
  cursor: pointer;
`

const Selected = styled(CaretIcon)`
  color: ${Colors.MAIN_COLOR};
  transform: rotate(90deg);

`


function InviteFriends(props) {
  const rowHeight = "2.5em"

  //hooks
  ////state
  const {getMembers, selectedGroup, groups, relationships} = props;
  const [currGroup, setCurrGroup] = useState("0ALL")
  const [displayGroups, setDisplayGroups] = useState([{id:0, groupname:"ALL"}]);
  const [displayFriends, setDisplayFriends] = useState([{relationshipId:0, friend:{username:"ALL"}}]);
  const [selectedFriends, setSelectedFriends] = useState(null);

  ////useEffect
  useEffect(()=>setDisplayGroups([{id:0, groupname:"ALL"}].concat(groups)), [groups] )
  useEffect(()=> {
    console.log("currGroup", currGroup)
    if(currGroup=="0ALL"){
      setDisplayFriends([{relationshipId:0, friend:{username:"ALL"}}].concat(relationships))
    }else{
      setDisplayFriends([{relationshipId:0, friend:{username:"ALL"}}].concat(selectedGroup.members))
    }
    
    
  }, [currGroup, relationships] 
  )

  // useEffect(()=> setDisplayFriends([{relationshipId:0, friend:{username:"ALL"}}].concat(selectedGroup.members))
  // , [selectedGroup] 
  // )

  const groupClickHandler = async (group) =>{
    if(group.id!=0){
      await getMembers(group.id)
    }
    setCurrGroup(group.id.toString()+group.groupname)
  }
  
  const handleSubmit = () => {
  }

  return (
    <MyModal
      title="Invite Friends"
      pages={[
        <Wrap>
          <section>
            <GroupTable title="Groups" rowNum={10} rowHeight={rowHeight}> 
            {console.log('displayGroups', displayGroups)}
            {console.log('displayFriends', displayFriends)}
                { 
                displayGroups.map((group, index)=>{ 
                  return (
                  <Row key={index}
                  selected={currGroup==group.id.toString()+group.groupname } 
                  height={rowHeight} rowNum={index}
                  onClick={()=>groupClickHandler(group)}
                  >
                    {group.groupname}
                    {currGroup == group.id.toString() + group.groupname ? <Selected  size="lg"/>: null }
                  </Row>
                  )})
                }
                
            </GroupTable>
          </section>

          <section>
            <FriendsTable title="Friends" button={<IconButton><SearchIcon /></IconButton>} rowNum={10} rowHeight={rowHeight}> 
              {displayFriends.map((relationship, index)=>{
                return <Row height={rowHeight} key={index} rowNum={index}>{relationship.friend.username}</Row> 
                })
              }
            </FriendsTable>
          </section>
        </Wrap>
    ]}
      totalPage={1}
      handleSubmit={handleSubmit}
      height="auto"
    ></MyModal>
  )
}




const mapStateToProps = (state) => ({
  selectedGroup: state.groups.selectedGroup,
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getGroups: () => dispatch(getGroups()),
//     getFriends: () => dispatch(getFriends()),
//     getMembers: (id) =>getMembers(id)
//   }
// };

export default connect(mapStateToProps, {getMembers})(InviteFriends);

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
  groups: [],
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
