import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
//context
import { ModalContext } from "../../contexts/modalContext";
import { ModalPortalBasic } from "../A-Atomics/Modal/ModalPortal"
//redux-actions
import { getMemebers, getGroups } from "../../actions/groups";
// import { getHosts } from "../../actions/invitations"
import TestModal from "./TestModal"

const Wrap = styled.div`
  overflow: hidden;
`;

const Bt = styled.button`
`;

const Content = React.memo((selectedGroup, relationships, closeModal) => {
  return <TestModal selectedGroup={selectedGroup} relationships={relationships} onClose={closeModal} />
});


function TestPage(props) {
  const {groups, relationships} = props;
  const {modal, setModal, closeModal } = useContext(ModalContext);
  const ref = React.createRef();
  React.useEffect( ()=>{
      props.getGroups();
  }, [])

 var getMem = async (selectedGroup) => {
    var ss = await props.getMemebers(ref.current.value);
    setModal(true);
    }
    
  return (
    <Wrap>
      <Bt onClick={() => getMem(groups.selectedGroup) } > click </Bt>
      <input ref={ref}></input>
      {modal && ( <ModalPortalBasic children={<TestModal selectedGroup={groups.selectedGroup} relationships={props.relationships} onClose={closeModal} />}/>)}
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  groups: state.groups,
  relationships: state.friends,
});


export default connect(mapStateToProps, {getMemebers, getGroups})(TestPage);



// import React, { useState, useEffect, useContext } from "react";
// import styled from "styled-components";
// import { connect } from "react-redux";
// //context
// import { ModalContext } from "../../contexts/modalContext";
// //redux-actions
// import { getMemebers, getGroups } from "../../actions/groups";
// // import { getHosts } from "../../actions/invitations"
// import TestModal from "./TestModal"
// import { ModalPortalBasic } from "../A-Atomics/Modal/ModalPortal"
// import  Modal  from "../A-Atomics/Modal/Modal"

// const Wrap = styled.div`
//   overflow: hidden;
// `;

// const Bt = styled.button`
// `;


// function TestPage(props) {
//   const {groups, relationships} = props;
//   // const {modal, handleModal, closeModal, openModal } = useContext(ModalContext);
//   // const [myModal, setMyModal] = useState(0);

//   const [isModalOpen, setIsOpenModal] = useState(false);

//   const handleOpenModal = () => {
//     setIsOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setIsOpenModal(false);
//   };


//   React.useEffect( ()=>{
//       props.getGroups();
//   }, [])

// //   React.useEffect( ()=>{
// //     console.log("update!")
// //     handleModal(renderModal());
// // }, [groups.selectedGroup])
  
// //   const renderModal = () => {
// //     return (<TestModal selectedGroup={groups.selectedGroup} onClose={closeModal} />)
// //   }

//  var getMem = async (selectedGroup) => {
//     var ss = await props.getMemebers(ref.current.value);
//     setIsOpenModal(true)
//     }

    
//  var ref = React.createRef();
//   return (
//     <Wrap>
//       <Bt onClick={()=>console.log(props.groups, groupDatas)}> click </Bt>
//       <Bt onClick={() => { getMem(groups.selectedGroup)}} > click </Bt>
//       <Bt onClick={()=>{getMem(groups.selectedGroup)}}>member</Bt>
//       <input ref={ref}></input>
      
//       {isModalOpen && (
//         <ModalPortalBasic
//           children={
//             <Modal onClose={handleCloseModal}>
//               <TestModal selectedGroup={groups.selectedGroup} onClose={handleCloseModal} />
//             </Modal>
//           }
//         ></ModalPortalBasic>
//       )}
//     </Wrap>
//   );
// }

// const mapStateToProps = (state) => ({
//   user: state.auth.user,
//   groups: state.groups,
//   relationships: state.friends,
// });

// // const mapDispatchToProps = (dispatch) => {
// //   return {
// //     getMemebers: (id) => dispatch(getMemebers(id)),
// //   };
// // };

// export default connect(mapStateToProps, {getMemebers, getGroups})(TestPage);

