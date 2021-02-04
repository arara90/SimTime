import React, {forwardRef , useRef , useImperativeHandle} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../../../Colors";


const MyInput = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 6px;
  color: ${(props) => Colors[props.color] || Colors["TEXT"]};
  border: solid 1px ${(props) => Colors[props.color] || Colors["ST_SEMI_YELLOW"]};

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
      border-color: ${(props) => Colors[props.color+"_DARK"] || Colors["MAIN_COLOR"]} transparent transparent transparent;
      position: absolute;
      top: 16px;
      right: 10px;
  }

  &:hover {
      border-color:  ${(props) => Colors[props.color+"_DARK"] || Colors["MAIN_COLOR"]};
  }

  &:active, &.active {
      background-color:  ${(props) => Colors[props.color+"_DARK"] || Colors["MAIN_COLOR"]};
      
      &:after {
          top: 9px;
          border-color: transparent transparent ${Colors["ST_WHITE"]} transparent;
      }
  }

  &.open{
    &:after {
      top: 9px;
      border-color: transparent transparent  ${(props) => Colors[props.color+"_DARK"] || Colors["MAIN_COLOR"]} transparent;
    }

    &:active, &.active {
      background-color:  ${(props) => Colors[props.color+"_DARK"] || Colors["MAIN_COLOR"]};
      
      &:after {
        top: 16px;
          border-color: ${Colors["ST_WHITE"]} transparent transparent transparent;
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
      close: () => {
        inputRef.current.classList.remove('open')
      },
      open: () => {
        inputRef.current.classList.add('open')
      },
      text: (option) => {
        inputRef.current.firstChild.data = option
      },
    }), [inputRef]);

    return (
      <MyInput ref={inputRef} {...props}></MyInput>)
  }
  
  export default SelectInput = forwardRef(SelectInput)

  SelectInput.propTypes = {
    colors: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    options: PropTypes.array,
    defaultOption: PropTypes.string,
  };
  
  SelectInput.defaultProps = {
    colors: null,
    width: "100%",
    height: "40px",
    options: ["option1", "option2","option3"],
    defaultOption: "--select--",
  };