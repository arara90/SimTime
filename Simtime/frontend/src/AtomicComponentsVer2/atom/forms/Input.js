import React, { useState, useCallback, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";

const MyInput = styled.input`
    ${(props) => (props.cursor ? `cursor: ${props.cursor}` : null)};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding-left: 5px;
    border: solid 1px ${(props) => Colors[props.color]};
    border-radius: 6px 6px 6px 6px ;
    &:focus {
        outline: none;
        border: solid 2px ${(props) => Colors[props.color+"_DARK"]};
    }

    ::placeholder {
        color: ${Colors.ST_GRAY};
        font-size: 15px;
        font-weight: 300;
    }
`;

function Input(props) {
  const { cursor, width, height, color, //style
    innerRef,  //reactRef
    enterHandler, changeHandler, //이벤트
  } = props;

  const [myValue, setMyValue] = useState(props.value);

  const handleChange = (e) => {
    e.stopPropagation();
    changeHandler(e.target.value); //props
    setMyValue(e.target.value);
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "Enter") {
      enterHandler(e.target.value); //props
    }
  }

  return (
    <MyInput
        {...props}
        onChange={(e) => handleChange(e)}
        onKeyUp={(e) => handleKeyUp(e)}
        cursor={cursor}
        ref={innerRef}
    ></MyInput>
  );
}

export const InputRef = React.forwardRef((props, ref) => (
    <Input {...props} innerRef={ref} />
  ));

export default Input;


Input.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  cursor: PropTypes.string,
  enterHandler: PropTypes.func,
  changeHandler: PropTypes.func,
  innerRef:PropTypes.object
};

Input.defaultProps = {
  width: "100%",
  height: "40px",
  color: "MAIN_COLOR",
  cursor: null,
  enterHandler: ()=>{alert("enterHandler")},
  changeHandler: ()=>{console.log("changeHandler")},
  innerRef: null
};
