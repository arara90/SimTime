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
  const { groups } = props;
  const { relationships } = props.relationships;

  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const { handleModal, closeModal } = useContext(ModalContext);

  useEffect(
    ()=>{
      if(groups){
        setGroupList(groups.groups);
        setSelectedGroup(groups.selectedGroup);
      }
    }, [JSON.stringify(props.groups)]
  )

  

  return (
    <Table title="My Groups" 
      addButton={true} 
      handleAddBtnClick={() => handleModal(<AddGroup groups={groups} relationships={relationships} onClose={closeModal} />)}
      width={props.width}
      rowHeight={props.width}
      rowNum={props.rowNum}
    >
      {console.log('selectedGroup', selectedGroup)}
      <GroupList groups={groupList} selectedGroup={selectedGroup} relationships={relationships} />
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
