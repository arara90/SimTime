import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
//context
import { ModalContext } from "../../contexts/modalContext";
//redux-actions
import { getMemebers, getGroups } from "../../actions/groups";
// import { getHosts } from "../../actions/invitations"
import TestModal from "./TestModal"


const Wrap = styled.div`
  overflow: hidden;
`;

const Bt = styled.button`

`;



function TestPage(props) {
  const {groups, relationships} = props;
  const {modal, handleModal, closeModal } = useContext(ModalContext);
  const [myModal, setMyModal] = useState(0);


  React.useEffect( ()=>{
      props.getGroups();
  }, [])
  
  React.useEffect( ()=>{
    if(modal){
      handleModal(<TestModal selectedGroup={groups.selectedGroup}/>)
    }
  }, [myModal])


   async function getMem(selectedGroup){
    var ss = await props.getMemebers(ref.current.value);
    setMyModal(!myModal)
    }

    
 var ref = React.createRef();
  return (
    <Wrap>
      <Bt onClick={()=>console.log(props.groups, groupDatas)}> click </Bt>
      <Bt onClick={(e)=>addmem(2)}> click </Bt>
      <Bt onClick={()=>{getMem(groups.selectedGroup)}}>member</Bt>
      <input ref={ref}></input>
      {/* handleModal(<TestModal groups={groups.selectedGroup} relationships={relationships} onClose={closeModal} />) */}
    
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  groups: state.groups,
  relationships: state.friends,
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getMemebers: (id) => dispatch(getMemebers(id)),
//   };
// };

export default connect(mapStateToProps, {getMemebers, getGroups})(TestPage);
