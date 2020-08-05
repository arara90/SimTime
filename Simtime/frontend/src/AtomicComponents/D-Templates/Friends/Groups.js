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
  const { groups, selectedGroup, relationships } = props;
  const { handleContextModal, closeContextModal } = useContext(ModalContext);

  return (
    <Table
      title="My Groups"
      addButton={true}
      handleAddBtnClick={() =>
        handleContextModal(
          <AddGroup
            groups={groups}
            relationships={relationships}
            closeModal={closeContextModal}
          />
        )
      }
      width={props.width}
      rowHeight={props.width}
      rowNum={props.rowNum}
    >
      {console.log("Groups selectedGroup", selectedGroup)}
      <GroupList
        groups={groups}
        selectedGroup={selectedGroup}
        relationships={relationships}
      />
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
