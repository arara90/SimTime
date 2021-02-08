import React, { useState, useCallback, Fragment, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ModalTitle from "../../atom/modal/ModalTitle"
import SolidButton from "../../atom/buttons/SolidButton";

const Wrap = styled.section`
  background-color: white;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;


  @media only screen and (max-width: 320px) {
    width: 100%;
  }
`;

const PageWrap = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const ButtonWrap = styled.footer`
  width: 90%;
  height: auto;

  padding: 1em 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Button = styled(SolidButton)`
  border-radius: 6px;
  width: ${({width})=> width ? width : '100%'};
`;


function DefaultModal(props) {
  const { 
    height,
    width,
    pages,
    pageChangeHandler,
    title,
    closeModal} = props
  const [page, setPage] = useState(0);

  const submitHandler = (e) => {
    console.log('submitHandler')
    e.preventDefault();

    props.handleSubmit();
  };

  const clickHandler = (e, newPage) => {
    e.preventDefault();
    pageChangeHandler();
    setPage(newPage);
  }

  const renderPages = (page) => {
    return (
      <PageWrap {...props} >
        {pages[page]}
      </PageWrap>
    );
  };

  const renderButtons = (page) => {
    if (page == pages.length-1) { //마지막 페이지
      if (pages.length == 1) return <Button type="submit" onClick={(e) => submitHandler(e)}>Done</Button> // 단일 페이지( Done )
      else { // 여러 페이지 중 마지막 페이지 (Prev, Done)
        return (
          <Fragment>
              <Button width="48%" type="button" onClick={(e) => clickHandler(e, page - 1)}>Prev</Button>
              {/* <Button width="48%" type="submit" onSubmit={(e) => submitHandler(e)}>Done</Button> */}
              <Button width="48%" type="submit" onClick={(e) => submitHandler(e)}>Done</Button> 
              
          </Fragment>
        );
      }
    } else {
        if (page == 0) return <Button type="button" onClick={(e) => clickHandler(e, page + 1)}>Next</Button> // 여러 페이지 중 첫 페이지 (Next)
        else {  // 중간 페이지 (Prev, Next)
          return ( 
            <Fragment>
              <Button width="48%" type="button" onClick={(e) => clickHandler(e, page - 1)}>Prev</Button>
              <Button width="48%" type="button" onClick={(e) => clickHandler(e, page + 1)}>Next</Button>
            </Fragment> 
            );
        }
    }
  };

  return (
    <Wrap {...props} className="default-modal">
      {title && <ModalTitle closeModal={closeModal}>{title}</ModalTitle>}
      {renderPages(page)}
      <ButtonWrap>{renderButtons(page)}</ButtonWrap>
    </Wrap>
  );
}

export default DefaultModal;

DefaultModal.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  pages: PropTypes.array,
  pageChangeHandler: PropTypes.func,
  submitHandler: PropTypes.func, 
  title: PropTypes.string,
  closeModal: PropTypes.func,
};

DefaultModal.defaultProps = {
  height: "500px",
  width: "320px",
  pages: [<div>page1</div>, <div>page2</div>],
  pageChangeHandler: null,
  submitHandler: null,
  title: null,
  closeModal: () => {},
};
