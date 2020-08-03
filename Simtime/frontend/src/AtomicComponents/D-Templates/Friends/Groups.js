import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
//context
import { ModalContext } from "../../../contexts/modalContext";
// import { getHosts } from "../../actions/invitations"

//components
import { ST_WHITE, ST_GRAY } from "../../Colors";
import Header from "../../A-Atomics/Font/Header";
import Table from "../../B-Molecules/Table/Table";
import Search from "../../B-Molecules/Filter/Search";
import GroupList from "../../C-Organisms/Friends/Lists/GroupList";
import AddGroup from "../../C-Organisms/Friends/Modals/Groups/AddGroup";


function Groups(props) {
  const { groups } = props.groups;
  const { relationships } = props.relationships;

  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const { handleModal, closeModal } = useContext(ModalContext);

  useEffect(
    
    ()=>{
      if(groups){
        console.log("ef", groups);
        setGroupList(groups);
        setSelectedGroup(groups.selectedGroup);
      }
    }, [JSON.stringify(groups)]
  )

  // useEffect(
  //   ()=> setSelectedGroup(groups.selectedGroup), [JSON.stringify(groups.selectedGroup)]
  // )

  return (
    <Table title="My Groups" 
      addButton={true} 
      handleAddBtnClick={() => handleModal(<AddGroup groups={groups} relationships={relationships} onClose={closeModal} />)}
      width={props.width}
      rowHeight={props.width}
      rowNum={props.rowNum}
    >
      {console.log('groupList', groupList)}
      <GroupList groups={groupList} />
  </Table>
  );
}

export default Groups;

Groups.propTypes = {
    rowNum: PropTypes.number,
    rowHeight: PropTypes.string,
    width: PropTypes.string,
  };
  
Groups.defaultProps = {
    rowNum: 6,
    rowHeight: "45px",
    width: "100%",
  };
