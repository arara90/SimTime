import React, { Fragment, useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import "babel-polyfill";
import { connect } from "react-redux";
import { MAIN_COLOR } from "../../../../Colors";
import { editGroup } from "../../../../../actions/groups";

import InputWrap from "../../../../A-Atomics/Form/InputWrap";
import DefaultModal from "../../../../B-Molecules/Modal/DefaultModal";

const StyledInput = styled(InputWrap)`
  padding-bottom: 15px;
`;
function EditGroup(props) {
  const { group, closeModal } = props;
  const [groupname, setGroupName] = useState(group.groupname);

  const handleChange = useCallback((e) => {
    setGroupName(e.target.value);
  });

  const handleSubmit = async () => {
    try {
      const res = await props.editGroup({ ...group, groupname: groupname });
      props.onClose();
    } catch (err) {
      console.log("err", err);
    }
  };

  const renderChild = () => {
    return (
      <Fragment>
        <StyledInput
          height="55px"
          label="Name"
          name="GroupName"
          desc="Group Name"
          value={groupname}
          onChange={handleChange}
        />
      </Fragment>
    );
  };

  return (
    <DefaultModal
      title="Add Group"
      children={renderChild()}
      totalPage={0}
      handleSubmit={() => handleSubmit()}
      height="auto"
      closeModal={closeModal}
    ></DefaultModal>
  );
}

export default connect(null, { editGroup })(EditGroup);

EditGroup.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  group: PropTypes.object,
  closeModal: PropTypes.func,
};

EditGroup.defaultProps = {
  height: "520px",
  width: "320px",
  group: {},
  closeModal: () => {
    console.log("Warning clsModal");
  },
};
