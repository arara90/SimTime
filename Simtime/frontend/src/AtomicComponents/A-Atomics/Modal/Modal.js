import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import GlobalStyle from "../../GlobalStyle";
import CloseButton from "../Button/CloseButton";

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
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: flex-end;

  @media only screen and (max-width: 320px) {
    width: 98%;
    position: relative;
  }
`;

const StyledCloseButton = styled(CloseButton)`
  background-color: white;
  cursor: pointer;
  @media only screen and (max-width: 320px) {
    position: absolute;
    right: 6px;
  }
`;

const Modal = (props) => {
  const { onClose, children } = props;

  return (
    <Fragment>
      <GlobalStyle />
      <MyModal>
        <ContentWrap closeFn={onClose}>
          <StyledCloseButton onClick={onClose} />
          {children}
        </ContentWrap>
      </MyModal>
    </Fragment>
  );
};

// const mapStateToProps = (state) => ({
//   event: state.events.selectedEvent[0],
//   user: state.auth.user,
// });

// export default connect(mapStateToProps, { getEvent, editEvent, addEvent })(
//   Modal
// );

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  onClose: () => {},
};
