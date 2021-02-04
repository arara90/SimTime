import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
//context
import { ModalContext } from "../../../contexts/modalContext";
// import { getHosts } from "../../redux/actions/invitations"

//components
import { ST_WHITE, ST_GRAY } from "../../Colors";
import Header from "../../A-Atomics/Font/Header";
import Table from "../../B-Molecules/Table/Table";
import Search from "../../B-Molecules/Filter/Search";
import GroupList from "../../C-Organisms/Friends/Lists/GroupList";
import AddGroup from "../../C-Organisms/Friends/Modals/Groups/AddGroup";

function GroupSection(props) {
  const { groups, selectedGroup, selectedGroupMembers, friendships } = props;
  const { handleContextModal, closeContextModal } = useContext(ModalContext);

  return (
    <Table
      title="My Groups"
      addButton={true}
      handleAddBtnClick={() =>
        handleContextModal(
          <AddGroup
            groups={groups}
            friendships={friendships}
            closeModal={closeContextModal}
          />
        )
      }
      width={props.width}
      rowHeight={props.rowHeight}
      rowNum={props.rowNum}
    >
      <GroupList
        groups={groups}
        selectedGroup={selectedGroup}
        selectedGroupMembers={selectedGroupMembers}
        friendships={friendships}
      />
    </Table>
  );
}

export default GroupSection;

GroupSection.propTypes = {
  rowNum: PropTypes.number,
  rowHeight: PropTypes.string,
  width: PropTypes.string,
};

GroupSection.defaultProps = {
  rowNum: 6,
  rowHeight: "45px",
  width: "100%",
};
