import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../../Colors";


const MyTextArea = styled.textarea`
  ::placeholder {
    color: ${Colors["ST_GRAY"]};
    font-size: 15px;
    font-weight: 300;
  }
  resize: none;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: solid 1px ${(props) => Colors[props.color + "_DARK"] ||  Colors["ST_SEMI_YELLOW"]};
  border-radius: 6px;
  padding-left: 5px;

  &:hover {
    border: solid 1px  ${(props) => Colors[props.color + "_DARK"] ||  Colors["MAIN_COLOR"]};
    outline: none;
  }

  &:focus {
    border: solid 1px  ${(props) => Colors[props.color + "_DARK"] ||  Colors["MAIN_COLOR"]};
    outline: none;
  }

`;

function TextArea(props) {
  const {
    width,
    height,
    maxlength,
    handleChange,
    color,
  } = props;

  const [myValue, setMyValue] = useState();
  const MyHandleChange = useCallback((e) => {
    setMyValue(e.target.value);
  }, []);

  return (
      <MyTextArea {...props}></MyTextArea>
  );
}

export default TextArea;

export const TextAreaRef = React.forwardRef((props, ref) => (
    <MyTextArea {...props} innerRef={ref} />
  ));

TextArea.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  maxlength: PropTypes.number,
};

TextArea.defaultProps = {
  width: "100%",
  height: "140px",
  color: null,
  maxlength: 1000,
};
