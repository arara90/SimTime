import React, { useRef, forwardRef,useImperativeHandle } from "react";
import styled from "styled-components";
import PropTypes, { checkPropTypes } from "prop-types";
import {
  MAIN_COLOR,
  ST_YELLOW_LIGHT,
  ST_SEMI_YELLOW,
  ST_SEMI_GRAY,
  TEXT,
  ST_WHITE,
  MAIN_COLOR_DARK
} from "../../../Colors";


const OptionsBox = styled.ul`
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: 99;
    margin-top: -6px;
    padding-top: 6px;
    padding: 0;
    list-style: none;
    background-color: ${ST_WHITE};

    &.hide{
        display: none;
    }
`

function Options(props, ref) {
    const optionsRef = useRef();
    useImperativeHandle(ref, () => ({
      toggle: () => {
        optionsRef.current.classList.toggle('hide')
      },
      hide: () => {
        optionsRef.current.classList.add('hide')
      },
      show: () => {
        optionsRef.current.classList.remove('hide')
      }
    }),[optionsRef]);

    return (
        <OptionsBox {...props} className="select-options hide"  ref={optionsRef}>
        </OptionsBox>
    )
  }
  
  export default Options = forwardRef(Options)