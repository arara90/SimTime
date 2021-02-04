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

const PageWrap = styled.div`
  width: 100%;
  padding-bottom: 5px;
  ${(props) =>
    props.isActivePage
      ? `display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;`
      : `display:none;`}
`;

const ButtonWrap = styled.div`
  position: absolute;
  bottom: 0px;
  width: 90%;
  height: auto;

  padding-bottom: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Button = styled(DashedButton)`
  border-radius: 6px;
`;

const ButtonSpace = styled.div`
  height: 60px;
`;

function DialogModal(props) {
  const [page, setPage] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit();
  };

  const handleClick = (e, newPage) => {
    setPage(newPage);
  };

  const renderPages = () => {
    return (
      <PageWrap {...props} isActivePage={page == 0}>
        {props.children}
        <ButtonSpace></ButtonSpace>
      </PageWrap>
    );
  };

  const renderButtons = (page) => {
    if (page == props.totalPage) {
      if (props.totalPage == 0) {
        return (
          <ButtonWrap width="100%">
            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Done
            </Button>
          </ButtonWrap>
        );
      } else {
        return (
          <Fragment>
            <ButtonWrap width="48%">
              <Button onClick={(e) => handleClick(e, page - 1)}>Prev</Button>
            </ButtonWrap>

            <ButtonWrap width="48%">
              <Button type="submit" onSubmit={(e) => handleSubmit(e)}>
                Done
              </Button>
            </ButtonWrap>
          </Fragment>
        );
      }
    } else if (page == 0) {
      return (
        <ButtonWrap width="100%">
          <Button onClick={(e) => handleClick(e, page + 1)}>Next</Button>
        </ButtonWrap>
      );
    } else {
      return (
        <Fragment>
          <ButtonWrap width="48%">
            <Button onClick={(e) => handleClick(e, page - 1)}>Prev</Button>
          </ButtonWrap>
          <ButtonWrap width="48%">
            <Button onClick={(e) => handleClick(e, page + 1)}>Next</Button>
          </ButtonWrap>
        </Fragment>
      );
    }
  };

  return (
    <Wrap {...props}>
      <HeaderWrap className="HeaderWrap">
        {props.title && (
          <ModalTitle closeModal={props.closeModal}>{props.title}</ModalTitle>
        )}
        {/* <BarWrap><ProgressBar /></BarWrap> */}
      </HeaderWrap>

      <ContentWrap>
        {renderPages()}
        {renderButtons(page)}
      </ContentWrap>
    </Wrap>
  );
}

export default DialogModal;

DialogModal.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  totalPage: PropTypes.number,
  title: PropTypes.string,
  closeModal: PropTypes.func,
};

DialogModal.defaultProps = {
  height: "548px",
  width: "320px",
  totalPage: 1,
  title: null,
  closeModal: () => {},
};
