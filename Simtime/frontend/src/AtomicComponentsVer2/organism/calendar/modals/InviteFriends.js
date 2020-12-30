// import React, { useState, useEffect, useCallback } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// import PropTypes from "prop-types";

// import * as Colors from "../../../Colors"
// import DefaultModal from "../../../molecule/modal/DefaultModal"
// import TableRow from "../../../atom/table/TableRow"
// import CaretIcon from "../../../atom/icons/CaretIcon"

// import UserCard from "../../../molecule/UserCard"
// import DefaultTable from "../../../molecule/table/DefaultTable"

// import { getMembers } from "../../../../actions/groups";

// const MyModal = styled(DefaultModal)``

// const Wrap = styled.div`
//   width: 100%;
//   height: 27em;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `

// const GroupTable = styled(DefaultTable)`
//   width: 120px;
// `

// const FriendsTable = styled(DefaultTable)` 
//   width: 160px;
// `

// const Row = styled(TableRow)`
//   ${({isSelected}) => isSelected ? `font-weight: bold;`: null}
//   cursor: pointer;
// `

// const Selected = styled(CaretIcon)`
//   color: ${Colors.MAIN_COLOR};
//   transform: rotate(90deg);
// `

// function InviteFriends(props) {
//   const {getMembers, selectedGroup, groups, relationships, inviteSubmitHandler} = props;

//   ////variables
//   const rowHeight = "3em"
//   const allGroup = {id:0, groupname:"All"}

//   ////hooks
//   //hook1-useState
//   const [currGroup, setCurrGroup] = useState(allGroup.id+allGroup.groupname)
//   const [displayGroups, setDisplayGroups] = useState(groups);
//   const [displayFriends, setDisplayFriends] = useState(relationships);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [allChecked, setAllChecked] = useState(false);
  
//   //hook2-useEffect
//   useEffect(
//     ()=>setDisplayGroups(groups)
//     , [groups] 
//   )

//   useEffect(
//     ()=> {
//       //새로운 그룹 선택-> 해당 그룹 멤버들이 이미 모두 추가된 상태인지 검사 후 전체 선택/해제
//       var targetArray = (currGroup==allGroup.id+allGroup.groupname ? relationships : selectedGroup.members)
//       var isAll = isAllChecked(selectedItems, targetArray)
//       setAllChecked(isAll)
//       setDisplayFriends(targetArray)
//     }, [currGroup, relationships] 
//   )

//   useEffect(
//     ()=>{
//       // 새로운 친구 선택/해제 -> 전체선택/해제 
//       var isAll = isAllChecked(selectedItems, displayFriends)
//       setAllChecked(isAll)
//     }, [selectedItems]
//   )


//   ////funcs
//   //funcs1
//   const isAllChecked = useCallback(
//     (sourceArr, allArray) => {
//       //sourceArr-선택된 items / allArray - '전체(All)' 정보
//       //sourceArr가 allArray에 있는 모든 아이템을 갖는지 검사한다.
//       var allDict = (transformRelationshipArrTodict(allArray))
//       var resArr = sourceArr.filter(item=>allDict[item]) //O(N) -selectedItem
//       return resArr.length==allArray.length
//     }
//   )

//   const transformRelationshipArrTodict = useCallback((arr) => {
//     return arr.reduce((acc, relationship)=>({...acc,[relationship.relationshipId]:relationship.relationshipId}),{});
//     }
//   )

//   //funcs2 - handlers
//   const groupClickHandler = useCallback(
//     async (group) =>{
//       if(group.id>0) await getMembers(group.id)
//       setCurrGroup(group.id.toString()+group.groupname)
//     }
//   )

//   const friendClickHandler = useCallback(
//     (e, id) => {
//       e.preventDefault();
//       var next = [];

//       if(id>0){
//         //친구선택
//         if (selectedItems.indexOf(id)>-1) next = selectedItems.filter((item)=>item != id); //선택해제
//         else next = [...selectedItems, id];
//       }else{ 
//         //전체선택(ALL)
//         var dictForSearch = transformRelationshipArrTodict(displayFriends)
//         var isAll = isAllChecked(selectedItems, displayFriends)
//         if(isAll) next = selectedItems.filter(item=>!dictForSearch[item]) //전부빼기(전체선택 해제) 
//         else next = displayFriends.reduce((acc, relationship)=>([...acc,relationship.relationshipId]), []); //전부넣기(전체선택)
//       }
//       setSelectedItems(next)
//     }, [selectedItems, displayFriends]
//   )
  
  
//   const submitHandler = () => {
//     inviteSubmitHandler(selectedItems)
//   }

//   return (
//     <MyModal
//       title="Invite Friends"
//       pages={[
//         <Wrap>
//           <section>
//             <GroupTable title="Groups" rowNum={8} rowHeight={rowHeight}> 
//               <Row key={0} height={rowHeight} rowNum={0} isSelected={currGroup==allGroup.id+allGroup.groupname} onClick={(e)=>groupClickHandler(allGroup)}>
//                 All{currGroup==allGroup.id+allGroup.groupname? <Selected  size="lg"/>:null}
//               </Row> 
//               {displayGroups.map((group, index)=>{ 
//                 return ( 
//                 <Row key={group.id} height={rowHeight} rowNum={index+1}
//                   isSelected={currGroup==group.id.toString()+group.groupname} 
//                   onClick={()=>groupClickHandler(group)}
//                 > {group.groupname}{currGroup == group.id.toString() + group.groupname ? <Selected  size="lg"/>: null } </Row>
//                 )
//               })}
//             </GroupTable>
//           </section>

//           <section>
//           {/* button={<IconButton><SearchIcon /></IconButton>}  */}
//             <FriendsTable title="Friends" rowNum={8} rowHeight={rowHeight}> 
//               <Row key={0} height={rowHeight} rowNum={0} isSelected={allChecked} onClick={(e)=>friendClickHandler(e, 0)}>All</Row> 
//               {displayFriends ? displayFriends.map((relationship, index)=>{
//                 return ( 
//                   <Row key={relationship.relationshipId} height={rowHeight} rowNum={index+1} 
//                       isSelected={selectedItems.includes(relationship.relationshipId)}
//                       selectIcon
//                       onClick={(e)=>friendClickHandler(e, relationship.relationshipId)}
//                   ><UserCard user={relationship.friend} /></Row>)
//                 }): null}
//             </FriendsTable>
//           </section>
//         </Wrap>
//     ]}
//       totalPage={1}
//       submitHandler={submitHandler}
//       height="auto"
//     ></MyModal>
//   )
// }

// const mapStateToProps = (state) => ({
//   selectedGroup: state.groups.selectedGroup,
// });

// export default connect(mapStateToProps, {getMembers})(InviteFriends);

// InviteFriends.propTypes = {
// };

// InviteFriends.defaultProps = {
// };

import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../../Colors"
import DefaultModal from "../../../molecule/modal/DefaultModal"
import TableRow from "../../../atom/table/TableRow"
import CaretIcon from "../../../atom/icons/CaretIcon"

import UserCard from "../../../molecule/UserCard"
import DefaultTable from "../../../molecule/table/DefaultTable"

import { getMembers } from "../../../../actions/groups";

const MyModal = styled(DefaultModal)``

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
  ${({isSelected}) => isSelected ? `font-weight: bold;`: null}
  cursor: pointer;
`

const Selected = styled(CaretIcon)`
  color: ${Colors.MAIN_COLOR};
  transform: rotate(90deg);
`

function InviteFriends(props) {
  const {getMembers, selectedGroup, groups, relationships, inviteSubmitHandler} = props;

  ////variables
  const rowHeight = "3em"
  const allGroup = {id:0, groupname:"All"}

  ////hooks
  //hook1-useState
  const [currGroup, setCurrGroup] = useState(allGroup.id+allGroup.groupname)
  const [displayGroups, setDisplayGroups] = useState(groups);
  const [displayFriends, setDisplayFriends] = useState(relationships);
  const [selectedItems, setSelectedItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  
  //hook2-useEffect
  useEffect(
    ()=>setDisplayGroups(groups)
    , [groups] 
  )

  useEffect(
    ()=> {
      //새로운 그룹 선택-> 해당 그룹 멤버들이 이미 모두 추가된 상태인지 검사 후 전체 선택/해제
      var targetArray = (currGroup==allGroup.id+allGroup.groupname ? relationships : selectedGroup.members)
      var isAll = isAllChecked(selectedItems, targetArray)
      setAllChecked(isAll)
      setDisplayFriends(targetArray)
    }, [currGroup, relationships] 
  )

  useEffect(
    ()=>{
      // 새로운 친구 선택/해제 -> 전체선택/해제 
      var isAll = isAllChecked(selectedItems, displayFriends)
      setAllChecked(isAll)
    }, [selectedItems]
  )


  ////funcs
  //funcs1
  const isAllChecked = useCallback(
    (sourceArr, allArray) => {
      //sourceArr-선택된 items / allArray - '전체(All)' 정보
      //sourceArr가 allArray에 있는 모든 아이템을 갖는지 검사한다.
      var allDict = (transformRelationshipArrTodict(allArray))
      var resArr = sourceArr.filter(item=>allDict[item]) //O(N) -selectedItem
      return resArr.length==allArray.length
    }
  )

  const transformRelationshipArrTodict = useCallback((arr) => {
    return arr.reduce((acc, relationship)=>({...acc,[relationship.friend.id]:relationship.friend.id}),{});
    }
  )

  //funcs2 - handlers
  const groupClickHandler = useCallback(
    async (group) =>{
      if(group.id>0) await getMembers(group.id)
      setCurrGroup(group.id.toString()+group.groupname)
    }
  )

  const friendClickHandler = useCallback(
    (e, id) => {
      e.preventDefault();
      var next = [];

      if(id>0){
        //친구선택
        if (selectedItems.indexOf(id)>-1) next = selectedItems.filter((item)=>item != id); //선택해제
        else next = [...selectedItems, id];
      }else{ 
        //전체선택(ALL)
        var dictForSearch = transformRelationshipArrTodict(displayFriends)
        var isAll = isAllChecked(selectedItems, displayFriends)
        if(isAll) next = selectedItems.filter(item=>!dictForSearch[item]) //전부빼기(전체선택 해제) 
        else next = displayFriends.reduce((acc, relationship)=>([...acc,relationship.friend.id]), []); //전부넣기(전체선택)
      }
      setSelectedItems(next)
    }, [selectedItems, displayFriends]
  )
  
  
  const submitHandler = () => {
    inviteSubmitHandler(selectedItems)
  }

  return (
    <MyModal
      title="Invite Friends"
      pages={[
        <Wrap>
          <section>
            <GroupTable title="Groups" rowNum={8} rowHeight={rowHeight}> 
              <Row key={0} height={rowHeight} rowNum={0} isSelected={currGroup==allGroup.id+allGroup.groupname} onClick={(e)=>groupClickHandler(allGroup)}>
                All{currGroup==allGroup.id+allGroup.groupname? <Selected  size="lg"/>:null}
              </Row> 
              {displayGroups.map((group, index)=>{ 
                return ( 
                <Row key={group.id} height={rowHeight} rowNum={index+1}
                  isSelected={currGroup==group.id.toString()+group.groupname} 
                  onClick={()=>groupClickHandler(group)}
                > {group.groupname}{currGroup == group.id.toString() + group.groupname ? <Selected  size="lg"/>: null } </Row>
                )
              })}
            </GroupTable>
          </section>

          <section>
          {/* button={<IconButton><SearchIcon /></IconButton>}  */}
            <FriendsTable title="Friends" rowNum={8} rowHeight={rowHeight}> 
              <Row key={0} height={rowHeight} rowNum={0} isSelected={allChecked} onClick={(e)=>friendClickHandler(e, 0)}>All</Row> 
              {displayFriends ? displayFriends.map((relationship, index)=>{
                return ( 
                  <Row key={relationship.friend.id} height={rowHeight} rowNum={index+1} 
                      isSelected={selectedItems.includes(relationship.friend.id)}
                      selectIcon
                      onClick={(e)=>friendClickHandler(e, relationship.friend.id)}
                  ><UserCard user={relationship.friend} /></Row>)
                }): null}
            </FriendsTable>
          </section>
        </Wrap>
    ]}
      totalPage={1}
      submitHandler={submitHandler}
      height="auto"
    ></MyModal>
  )
}

const mapStateToProps = (state) => ({
  selectedGroup: state.groups.selectedGroup,
});

export default connect(mapStateToProps, {getMembers})(InviteFriends);

InviteFriends.propTypes = {
};

InviteFriends.defaultProps = {
};
