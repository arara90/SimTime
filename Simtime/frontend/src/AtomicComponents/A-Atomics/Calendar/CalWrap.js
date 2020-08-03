import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BG_INACTIVE_LIGHT} from "../../Colors";

const Wrap = styled.div`
  background-color: ${BG_INACTIVE_LIGHT};
  background-size: 100%;
  background-image: url("https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/months/${props=>props.month}.png");
  background-position: center center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 100%;

  z-index: 99;


  @media only screen and (max-width: 920px) {
    width: 100%;
  }
`;


function CalWrap(props) {
  return <Wrap {...props}></Wrap>;
}

export default CalWrap;

CalWrap.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

CalWrap.defaultProps = {
  height: "660px",
  width: "620px",
  month: "4"
};
