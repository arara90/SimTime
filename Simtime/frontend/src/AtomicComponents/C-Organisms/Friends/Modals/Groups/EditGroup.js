import React, { Fragment, useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import "babel-polyfill";
import { connect } from "react-redux";
import { MAIN_COLOR } from "../../../../Colors";
import { editGroup } from "../../../../../redux/actions/groups";

import InputWrap from "../../../../A-Atomics/Form/InputWrap";
import DefaultModal from "../../../../../AtomicComponentsVer2/molecule/modal/DefaultModal";


const StyledInput = styled(InputWrap)``;

function EditGroup(props) {
  const { group, closeModal } = props;
  const [groupname, setGroupName] = useState(group.groupname);

  const handleChange = useCallback((e) => {
    setGroupName(e.target.value);
  });

  const handleSubmit = async () => {
    try {
      const res = await props.editGroup({ ...group, groupname: groupname });
      closeModal();
    } catch (err) {
      console.log("err", err);
    }
  };

  const renderChild = () => {
    return <StyledInput label="Name" name="GroupName" desc="Group Name" value={groupname} enterHandler={handleSubmit} onChange={handleChange}/>

  };

  return (
    <DefaultModal
      title="Add Group"
      pages={[renderChild()]}
      totalPage={1}
      handleSubmit={handleSubmit}
    
      height="auto"
      // closeModal={closeModal}

      // title="Add Group"
      // pages={[renderChild()]}
      // totalPage={1}
      // handleSubmit={handleSubmit}
      // height="auto"
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
