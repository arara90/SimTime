import React, {Fragment, createRef, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { MAIN_COLOR } from "../Colors";
import BasicModal from "../B-Molecules/Modal/BasicModal";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;


function TestModal(props) {

  const buttons = [
    { content: "Members", url: null },
    { content: "Add",
      url: "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/add-yellow.png",
    },
  ];
  
    // const { selectedGroup, relationships } = props;
    const {selectedGroup, relationships} = props;

  return (
    <BasicModal title="Edit Group">
      <Wrap className="TestModelWrap">
          {console.log("ㄸEdtgroup")} 
          <div>
              {selectedGroup ? selectedGroup.group.groupname: "nn"}
          </div> 
      </Wrap>
    </BasicModal>
  );
}

export default (TestModal);


