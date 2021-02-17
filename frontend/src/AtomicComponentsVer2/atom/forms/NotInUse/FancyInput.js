import React, {forwardRef , useRef , useImperativeHandle} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";


const MyInput = styled.input`
    width: 100px;
    height: 40px;
    &:focus{
        border: solid 1px red;
    }
`


function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus()
      }
    }));

    return <MyInput ref={inputRef} />
  }
  
  export default FancyInput = forwardRef(FancyInput)