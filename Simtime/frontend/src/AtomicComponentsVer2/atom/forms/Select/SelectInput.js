import React, {forwardRef , useRef , useImperativeHandle} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  MAIN_COLOR,
  ST_SEMI_GRAY,
  ST_WHITE,
  MAIN_COLOR_DARK,
} from "../../../Colors";


const MyInput = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 6px;
  padding: 8px 15px;
  @include transition(all 0.2s ease-in);

  &:focus {
      border: none;
      outline:none;
    }

  &:after {
      content:"";
      width: 0;
      height: 0;
      border: 7px solid transparent;
      border-color: ${MAIN_COLOR} transparent transparent transparent;
      position: absolute;
      top: 16px;
      right: 10px;
  }

  &:hover {
      border-color: ${MAIN_COLOR_DARK};
  }

  &:active, &.active {
      background-color: ${MAIN_COLOR};
      
      &:after {
          top: 9px;
          border-color: transparent transparent ${ST_WHITE} transparent;
      }

  }

  &.open{
    &:after {
      top: 9px;
      border-color: transparent transparent ${MAIN_COLOR} transparent;
    }

    &:active, &.active {
      background-color: ${MAIN_COLOR};
      
      &:after {
        top: 16px;
          border-color: ${ST_WHITE} transparent transparent transparent;
      }

  }
  }
`

function SelectInput(props, ref) {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
      toggle: () => {
        inputRef.current.classList.toggle('open')
      },
      text: (option) => {
        inputRef.current.firstChild.data = option
      },
    }), [inputRef]);

    return (
      <MyInput ref={inputRef} {...props}></MyInput>)
  }
  
  export default SelectInput = forwardRef(SelectInput)