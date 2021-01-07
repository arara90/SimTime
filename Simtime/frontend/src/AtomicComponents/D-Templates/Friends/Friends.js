import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

//context
import { ModalContext } from "../../../contexts/modalContext";

//components
import Table from "../../B-Molecules/Table/Table";
import FriendList from "../../C-Organisms/Friends/Lists/FriendList";
import AddFriend from "../../C-Organisms/Friends/Modals/Friends/AddFriend";

function Friends(props) {
  const { handleContextModal, closeContextModal } = useContext(ModalContext);
  return (
    <Table
      title="My Friends"
      addButton={true}
      handleAddBtnClick={() =>
        handleContextModal(<AddFriend closeModal={closeContextModal} />)
      }
      width={props.width}
      rowHeight={props.width}
      rowNum={props.rowNum}
      button={{
        content: "Add",
        url:
          "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/add-yellow.png",
      }}
    >
      <FriendList friendships={props.friendships} />
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
