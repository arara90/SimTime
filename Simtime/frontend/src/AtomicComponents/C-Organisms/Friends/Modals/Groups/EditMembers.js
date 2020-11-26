import React, { useState , useEffect} from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { deleteMembers } from "../../../../../actions/groups";

import { MAIN_COLOR } from "../../../../Colors";
import BasicModal from "../../../../../AtomicComponentsVer2/molecule/modal/BasicModal";
import TabTable from "../../../../B-Molecules/Table/TabTable";
import ImageUser from "../../../../A-Atomics/ImageUser";
import Image from "../../../../A-Atomics/Image";
import Header from "../../../../A-Atomics/Font/Header";
import MemberList from "../../Lists/MemberList";
import AddMembers from "./AddMembers";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Group = styled.div`
  width: 100%;
  height: 25%;
  padding-bottom: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GroupImage = styled(ImageUser)`
  position: relative;
  height: 60px;
  width: 60px;
  margin-bottom: 10px;
  border-radius: 10px 10px 10px 10px;
`;

const AddImage = styled(Image)`
  position: absolute;
  height: 20px;
  width: 20px;
  bottom: -5px;
  right: -5px;
  border-radius: 10px 10px 10px 10px;
`;

const GroupName = styled(Header)`
  position: initial;
  height: 20px;
  width: auto;
  text-align: center;
`;

const Table = styled(TabTable)`
  height: 75%;
`;

function EditMembers(props) {
  const { selectedGroup, relationships, selectedGroupMembers, buttons, closeModal } = props;
  const [tab, setTab] = useState("Members");

  return (
    <BasicModal title="Edit Group" closeModal={()=>closeModal(false)}>
      <Wrap className="EditMembersWrap">
        <Group>
          <GroupImage
            height="60px"
            width="60px"
            url={
              "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/group_basic.png"
            }
          >
            {/* // url={selectedGroup.group.profile_image}> */}
            <AddImage
              src={
                "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/add-yellow.png"
              }
            />
          </GroupImage>
          <GroupName type="h3">{selectedGroup.group.groupname}</GroupName>
        </Group>

        <Table
          button={tab != "Members"}
          buttons={buttons}
          changeHandler={(tab) => setTab(tab)}
        >
          {tab == "Members" ? (
            <MemberList selectedGroupMembers={selectedGroupMembers} />
          ) : (
            <AddMembers
              groupId={selectedGroup.group.id}
              selectedGroupMembers={selectedGroupMembers}
              relationships={relationships}
            />
          )}
        </Table>
      </Wrap>
    </BasicModal>
  );
}

export default connect(null, { deleteMembers })(EditMembers);

EditMembers.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.array,
  selectedGoup: PropTypes.object,
  relationships: PropTypes.array,
  buttons: PropTypes.array,
  closeModal: PropTypes.func,
};

EditMembers.defaultProps = {
  title: "Table Title",
  headers: null,
  selectedGoup: { group: { id: "", groupname: "unknown" }, members: [] },
  relationships: [],
  buttons: [
    { content: "Members", url: null },
    { content: "Add",url: "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/add-yellow.png",},
  ],
  closeModal: () => {
    console.log("Waring clsModal");
  },
};
