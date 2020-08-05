import React, { useEffect, useCallback, useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

//context
import { ModalContext } from "../../../../contexts/modalContext";
import { ModalPortalBasic } from "../../../A-Atomics/Modal/ModalPortal";
import Modal from "../../../A-Atomics/Modal/Modal";
//redux
import { connect } from "react-redux";
//components
import { deleteGroup, getGroup, getMemebers } from "../../../../actions/groups";
import TableRow from "../../../A-Atomics/Table/TableRow";
import Paragraph from "../../../A-Atomics/Font/Paragraph";
import UserCardForList from "../../../B-Molecules/User/UserCardForList";
import ButtonWithImage from "../../../B-Molecules/Button/ButtonWithImage";
import EditGroup from "../Modals/Groups/EditGroup";
import EditMembers from "../Modals/Groups/EditMembers";

//size
const buttonMargin = 10;
const buttonsWidth = 160 + 8; //"삭제"-26px, "수신차단" or 차단-52 , bittonMargin * 버튼수 => 26 +104 + 30
const buttonDefaultSize = 13 * 4 + 2; //4글자기준

//components
const Wrap = styled.div``;
const UserCard = styled(UserCardForList)`
  cursor: pointer;
`;
const Buttons = styled.div`
  width: ${buttonsWidth}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
const ButtonWrap = styled.div`
  ${(props) => (props.width ? "width: " + props.width : "")};
`;
const TextButton = styled(Paragraph)`
  margin-left: ${buttonMargin}px;
  cursor: pointer;
`;
const StyledButtonWithImage = styled(ButtonWithImage)`
  margin-left: ${buttonMargin}px;
`;

function GroupList(props) {
  const { groups, selectedGroup, relationships } = props;
  let { handleContextModal, closeContextModal } = React.useContext(
    ModalContext
  );
  const [modal, setModal] = useState(false);

  const clickEvent = (e, cb) => {
    e.preventDefault();
    cb();
  };

  const editMembers = async (id) => {
    const friends = await props.getMemebers(id);
    setModal(!modal);
  };

  const renderModal = (selectedGroup, relationships) => {
    return (
      <EditMembers
        selectedGroup={selectedGroup}
        relationships={relationships}
        closeModal={() => setModal(false)}
      />
    );
  };

  const renderButton = useCallback(
    (content = "삭제", fn, color = "TEXT_LINK") => {
      return (
        <ButtonWrap>
          <TextButton
            color={color}
            type="button"
            onClick={(e) => clickEvent(e, fn)}
          >
            {content}
          </TextButton>
        </ButtonWrap>
      );
    },
    []
  );

  const renderRows = (groups) => {
    return groups.map((group, index) => {
      return (
        <TableRow rowNum={index} key={group.id}>
          <UserCard
            username={group.groupname}
            imageSize="32px"
            // url={group.profile_image}
            url="https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/group_basic.png"
          ></UserCard>
          <Buttons>
            {renderButton("이름변경", () =>
              handleContextModal(
                <EditGroup group={group} closeModal={closeContextModal} />
              )
            )}
            {renderButton("멤버관리", () => editMembers(group.id))}
            {renderButton(
              "삭제",
              () => props.deleteGroup(group.id),
              "TEXT_WARNING"
            )}
          </Buttons>
        </TableRow>
      );
    });
  };

  return (
    <Wrap>
      {renderRows(props.groups)}
      {modal && (
        <ModalPortalBasic
          children={<Modal>{renderModal(selectedGroup, relationships)}</Modal>}
        />
      )}
    </Wrap>
  );
}

export default connect(null, { deleteGroup, getGroup, getMemebers })(GroupList);

GroupList.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.array,
  groups: PropTypes.array,
  selectedGroup: PropTypes.object,
  relationships: PropTypes.array,
};

GroupList.defaultProps = {
  title: "Table Title",
  headers: null,
  groups: [],
  selectedGroup: { group: {}, members: [] },
  relationships: [],
};
