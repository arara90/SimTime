import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Paragraph from "../Font/Paragraph";
import * as Colors from "../../Colors";

// const Wrap = styled.div`
//     width: 100%;
//     height: ${props=> props.height};
//     display : flex;
//     justify-content: center;
//     align-items: center;
// `
const Button = styled.button`
  width: 100%;
  background-color: ${(props) => Colors[props.color]};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  line-height: ${(props) => props.height};
  text-align: center;

  &:focus {
    outline: none;
    border: none;
  }

  @media only screen and (max-width: 920px) {
    width: 100%;
  }
  border-radius: 6px 6px 6px 6px;
  box-shadow: none;
  outline: none;
  border: none;
`;

const Content = styled(Paragraph)`
  font-weight: 500;
`;

function ColoredButton(props) {
  return (
    // <Wrap height={props.height}>
    <Button {...props} onClick={props.handleSubmit}>
      <Content color="ST_WHITE" fontSize="18px">
        {props.children}
      </Content>
    </Button>
    // </Wrap>
  );
}

export default ColoredButton;

ColoredButton.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
};

ColoredButton.defaultProps = {
  height: "38px",
  width: "245px",
  color: "ST_BLUE",
};
