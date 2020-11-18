import React, { useState, useCallback, Fragment, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ModalTitle from "../../atom/modal/ModalTitle"
import SolidButton from "../../atom/buttons/SolidButton";

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

const Button = styled(SolidButton)`
  border-radius: 6px;
`;

const ButtonSpace = styled.div`
  height: 60px;
`;

function DefaultModal(props) {
  const [page, setPage] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit();
  };

  const handleClick = (e, newPage) => {
    setPage(newPage);
  };

  const renderPages = (page) => {
    console.log('renderPages', page)
    console.log('renderPages, children', props.pages)
    return (
      <PageWrap {...props} isActivePage={page == 0}>
        {props.pages[page]}
        <ButtonSpace></ButtonSpace>
      </PageWrap>
    );
  };

  const renderButtons = (page) => {
    if (page == props.totalPage-1) {
      if (props.totalPage == 1) {
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
        {renderPages(page)}
        {renderButtons(page)}
      </ContentWrap>
    </Wrap>
  );
}

export default DefaultModal;

DefaultModal.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  totalPage: PropTypes.number,
  pages: PropTypes.array,
  title: PropTypes.string,
  closeModal: PropTypes.func,
};

DefaultModal.defaultProps = {
  height: "548px",
  width: "320px",
  pages: [<div>page1</div>, <div>page2</div>],
  totalPage: 2,
  title: null,
  closeModal: () => {},
};
