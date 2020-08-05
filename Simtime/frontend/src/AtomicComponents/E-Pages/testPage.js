import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
//context
import { ModalContext } from "../../contexts/modalContext";
import ModalContextPortal, {
  ModalPortalBasic,
} from "../A-Atomics/Modal/ModalPortal";
//redux-actions
import { getMemebers, getGroups } from "../../actions/groups";
// import { getHosts } from "../../actions/invitations"
<<<<<<< HEAD
import TestModal from "./TestModal"
import Test from "./Test"
=======
import TestModal from "./TestModal";

>>>>>>> 91927602b1469a6bd6dbe695541b8a1a8f4a899e
const Wrap = styled.div`
  overflow: hidden;
`;

const Bt = styled.button``;

const Content = React.memo((selectedGroup, relationships, closeModal) => {
  return (
    <TestModal
      selectedGroup={selectedGroup}
      relationships={relationships}
      onClose={closeModal}
    />
  );
});

function TestPage(props) {
  const { groups, relationships } = props;
  const { modal, setModal, closeModal, handleModal } = useContext(ModalContext);
  const ref = React.createRef();
  React.useEffect(() => {
    props.getGroups();
  }, []);

  var getMem = async (selectedGroup) => {
    var ss = await props.getMemebers(ref.current.value);
<<<<<<< HEAD
    setModal(true);
    }
    
  
  const [data, setData] = React.useState(1)


  var ppp = () => {
    console.log("test", data)
  }
  var testFn = (keyword)=>{
    console.log("test", data, keyword)
  }

console.log(data)

  return (
    <Wrap>
      <Bt onClick={() => getMem(groups.selectedGroup) } > click </Bt>
      <Bt onClick={()=> setData(prev=>prev+1)}> +++++++++++++ </Bt>
      <Bt onClick={()=>ppp(data)}> hhhhhhhhhhhhhlllllloooooooooo </Bt>

      <Test  fn={ppp} testFn={testFn} />
=======
    // setModal(true);
    handleModal(
      <TestModal
        selectedGroup={groups.selectedGroup}
        relationships={props.relationships}
        onClose={closeModal}
      />
    );
  };

  return (
    <Wrap>
      <Bt onClick={() => getMem(groups.selectedGroup)}> click </Bt>
>>>>>>> 91927602b1469a6bd6dbe695541b8a1a8f4a899e
      <input ref={ref}></input>
      {modal && (
        <ModalPortalBasic
          className="dd"
          children={
            <TestModal
              selectedGroup={groups.selectedGroup}
              relationships={props.relationships}
              onClose={closeModal}
            />
          }
        />
      )}
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  groups: state.groups,
  relationships: state.friends,
});

export default connect(mapStateToProps, { getMemebers, getGroups })(TestPage);

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
