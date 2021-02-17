import React, { useState, useCallback, Fragment, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import ContextStore from "../../../contexts/contextStore";

import { MAIN_COLOR, ST_GTAY } from "../../Colors";

import ModalTitle from "../../A-Atomics/Modal/ModalTitle";
import ProgressBar from "../../A-Atomics/Deco/ProgressBar";
import DashedButton from "../../A-Atomics/Button/DashedButton";

const Wrap = styled.div`
  background-color: white;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 320px) {
    width: 100%;
  }
`;

const HeaderWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const ContentWrap = styled.div`
  width: 90%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

function BasicModal(props) {
  return (
    <Wrap {...props}>
      <HeaderWrap className="HeaderWrap">
        {props.title && (
          <ModalTitle closeModal={props.closeModal}>{props.title}</ModalTitle>
        )}
      </HeaderWrap>
      <ContentWrap>{props.children}</ContentWrap>
    </Wrap>
  );
}

export default BasicModal;

BasicModal.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  totalPage: PropTypes.number,
  title: PropTypes.string,
  closeModal: PropTypes.func,
};

BasicModal.defaultProps = {
  height: "548px",
  width: "320px",
  totalPage: 1,
  title: null,
  closeModal: () => {},
};
