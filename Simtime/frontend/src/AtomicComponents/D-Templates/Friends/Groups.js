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
  const { groups, relationships } = props;
  const { handleModal, closeModal } = useContext(ModalContext);
  console.log(groups);
  
  return (
    <Table title="My Groups" 
      addButton={true} 
      handleAddBtnClick={() => 
        handleModal(<AddGroup groups={groups.groups} relationships={relationships} onClose={closeModal} />)
      }
      width={props.width}
      rowHeight={props.width}
      rowNum={props.rowNum}
    >
      <GroupList groups={groups.groups} selectedGroup={groups.selectedGroup} relationships={relationships} />
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
