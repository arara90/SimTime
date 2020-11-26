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

const PageWrap = styled.div`
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
  const [page, setPage] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit();
  };

  const handleClick = (e, newPage) => {
    props.pageChangeHandler();
    setPage(newPage);
  }

  const renderPages = (page) => {
    return (
      <PageWrap {...props} >
        {props.pages[page]}
      </PageWrap>
    );
  };

  const renderButtons = (page) => {
    if (page == props.totalPage-1) { //마지막 페이지
      if (props.totalPage == 1) return <Button type="submit" onClick={(e) => handleSubmit(e)}>Done</Button> // 단일 페이지( Done )
      else { // 여러 페이지 중 마지막 페이지 (Prev, Done)
        return (
          <Fragment>
              <Button width="48%" onClick={(e) => handleClick(e, page - 1)}>Prev</Button>
              <Button width="48%" type="submit" onSubmit={(e) => handleSubmit(e)}>Done</Button>
          </Fragment>
        );
      }
    } else {
        if (page == 0) return <Button onClick={(e) => handleClick(e, page + 1)}>Next</Button> // 여러 페이지 중 첫 페이지 (Next)
        else {  // 중간 페이지 (Prev, Next)
          return ( 
            <Fragment>
              <Button width="48%" onClick={(e) => handleClick(e, page - 1)}>Prev</Button>
              <Button width="48%" onClick={(e) => handleClick(e, page + 1)}>Next</Button>
            </Fragment> 
            );
        }
    }
  };

  return (
    <Wrap {...props} className="default-modal">
      {props.title && <ModalTitle closeModal={props.closeModal}>{props.title}</ModalTitle>}
      {renderPages(page)}
      <ButtonWrap>{renderButtons(page)}</ButtonWrap>
    </Wrap>
  );
}

export default DefaultModal;

DefaultModal.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  totalPage: PropTypes.number,
  pages: PropTypes.array,
  pageChangeHandler: PropTypes.func,
  handleSubmit: PropTypes.func, 
  title: PropTypes.string,
  closeModal: PropTypes.func,
};

DefaultModal.defaultProps = {
  height: "500px",
  width: "320px",
  pages: [<div>page1</div>, <div>page2</div>],
  totalPage: 2,
  pageChangeHandler: null,
  handleSubmit:  null,
  title: null,
  closeModal: () => {},
};
