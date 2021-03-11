import React, { useState, useCallback, Fragment, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";

// import ModalTitle from "../../atom/modal/ModalTitle";
import ModalTitle from "../../../AtomicComponents/A-Atomics/Modal/ModalTitle"
import SolidButton from "../../atom/buttons/SolidButton";

const Wrap = styled.div`
  border: solid 1px ${Colors.MAIN_COLOR};
  background-color: ${Colors.ST_WHITE};

  min-width: 24em;
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
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // align-items: center;
  // overflow: hidden;
`;

const ContentWrap = styled.div`
  width: 100%;
  padding: 2em;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;


`;
const Message = styled.div`
  max-width: 24em;
  min-height: 3em;
  overflow: hidden;
  overflow-wrap: break-word;

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ButtonWrap = styled.div`
  width: 100%;
  min-height: 3em;
  padding-top: 1em;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-bottom;
`;

const Button = styled(SolidButton)`
`



function DialogModal(props) {
  const {clickHandler, closeModal, title, buttonText} = props;

  return (
    <Wrap {...props}>
      {title && (
        <HeaderWrap className="HeaderWrap">
          <ModalTitle closeModal={closeModal}>{title}</ModalTitle>
        </HeaderWrap>
        )}
      
      <ContentWrap>
      <Message><span>{props.children}</span></Message>

        <ButtonWrap>
          <Button color={"ST_BLUE"} onClick={clickHandler}>{buttonText}</Button>
        </ButtonWrap>
        </ContentWrap>
      
    </Wrap>
  );
}

export default DialogModal;

DialogModal.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  closeModal: PropTypes.func,
  clickHandler: PropTypes.func,
};

DialogModal.defaultProps = {
  height: "auto",
  width: "320px",
  title: null,
  buttonText: "확인", 
  closeModal: () => {},
  clickHandler:()=>{}
};
