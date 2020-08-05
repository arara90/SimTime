import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

//context
import { ModalContext } from "../../../contexts/modalContext";

//components
import { ST_WHITE, ST_GRAY } from "../../Colors";
import Header from "../../A-Atomics/Font/Header";
import Table from "../../B-Molecules/Table/Table";
import Search from "../../B-Molecules/Filter/Search";
import FriendList from "../../C-Organisms/Friends/Lists/FriendList";
import AddFriend from "../../C-Organisms/Friends/Modals/Friends/AddFriend";

function Friends(props) {
  const { handleModal, closeModal } = useContext(ModalContext);
  const datas = [];
  return (
    <Table
      title="My Friends"
      addButton={true}
      handleAddBtnClick={() => handleModal(<AddFriend onClose={closeModal} />)}
      width={props.width}
      rowHeight={props.width}
      rowNum={props.rowNum}
      button={{
        content: "Add",
        url:
          "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/add-yellow.png",
      }}
    >
      <FriendList relationships={props.relationships} />
    </Table>
  );
}

export default React.memo(Friends);

Friends.propTypes = {
  rowNum: PropTypes.number,
  rowHeight: PropTypes.string,
  width: PropTypes.string,
  friends: PropTypes.array,
};

Friends.defaultProps = {
  rowNum: 6,
  rowHeight: "45px",
  width: "100%",
  friends: [],
};
