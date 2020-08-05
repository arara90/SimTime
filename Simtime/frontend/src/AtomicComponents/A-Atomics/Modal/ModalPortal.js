import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ModalContext } from "../../../contexts/modalContext";
import GlobalStyle from "../../GlobalStyle";

const MyModal = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ContentWrap = styled.div`
  background: rgba(0, 0, 0, 0);
  width: auto;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;

  @media only screen and (max-width: 320px) {
    width: 98%;
    position: relative;
  }
`;

export const ModalContextPortal = (props) => {
  const el = document.getElementById("app-modal");
  let { modalContent, modal } = React.useContext(ModalContext);
  if (modal) {
    return ReactDOM.createPortal(
      <Fragment>
        <MyModal className="modalcontextPotal">
          <ContentWrap>{modalContent}</ContentWrap>
        </MyModal>
      </Fragment>,
      el
    );
  } else return null;
};

export const ModalPortalBasic = (props) => {
  const el = document.getElementById("app-modal");
  return ReactDOM.createPortal(
    <Fragment>
      <MyModal className="modalcontextPotal">
        <ContentWrap>{props.children}</ContentWrap>
      </MyModal>
    </Fragment>,
    el
  );
};

export default ModalContextPortal;
