import React, { useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";

const MyInputColor = styled.input`
    cursor: pointer;
    width: 20px;
    height: 100%;
    padding: 0;
    border: 0px;
    outline:  none;
    background: none;
  
`;

function InputColor(props) {
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

  return (
    <MyInputColor
        {...props}
        type='color'
        onChange={(e) => handleChange(e)}
        cursor={cursor}
        ref={innerRef}
    ></MyInputColor>
  );
}

export default InputColor;

export const InputColorRef = React.forwardRef((props, ref) => (
  <InputWrap {...props} innerRef={ref} />
));



InputColor.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  cursor: PropTypes.string,
  changeHandler: PropTypes.func,
  innerRef:PropTypes.object
};

InputColor.defaultProps = {
  width: "100%",
  height: "40px",
  color: null,
  cursor: null,
  changeHandler: ()=>{console.log("changeHandler")},
  innerRef: null
};
