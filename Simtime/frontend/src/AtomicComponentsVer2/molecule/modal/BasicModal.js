import React, { useState, useCallback, Fragment, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import ContextStore from "../../../contexts/contextStore";

import { MAIN_COLOR, ST_GTAY } from "../../Colors";

import ModalTitle from "../../atom/modal/ModalTitle"


const Wrap = styled.section`
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

const ContentWrap = styled.div`
  width: 90%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

function BasicModal(props) {
  const {title, closeModal, width, height, totalPage} = props;
  return (
    <Wrap {...props}>
      {title && <ModalTitle closeModal={closeModal}>{props.title}</ModalTitle>}
      <ContentWrap>
        {props.children}
      </ContentWrap>
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
  closeModal: null,
};
