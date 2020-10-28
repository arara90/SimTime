import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Option from "./Select/Option"
import Options from "./Select/Options"
import SelectInput from "./Select/SelectInput"

import {TEXT} from "../../Colors";


const Wrap = styled.div`
  width: ${(props) => props.width};
  cursor: pointer;
  display: inline-block;
  position: relative;
  color:${TEXT};
`;

//SMNT - Hide(실제로 보여주지 않음) Symentic용
const SMNTSelect = styled.select`
    display: none;
    visibility: hidden;
    padding-right: 10px;
`;
const SMNTOption = styled.option``

//DSP - Display(실제 보여줌)
const StyledSelect = styled(SelectInput)``;
const StyledOptions = styled(Options)``;
const StyledOption = styled(Option)``  


function Select(props) {
    //state
    const [selectedValue, setSelectedValue] = useState()

    //ref
    const selectedInputRef = useRef();
    const optionBoxRef = useRef();

    //hooks
    useEffect(() => {
        setSelectedValue(props.defaultOption);
    },[]);


    const toggleHandler= useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            optionBoxRef.current.toggle();
            selectedInputRef.current.toggle();
        },
        [optionBoxRef, selectedInputRef],
      );


    //reders
    const renderOptions= (options = []) => {
        return options.map((option) => {
          return (
            <StyledOption key={option} selected={selectedValue==option} onClick={()=>setSelectedValue(option)}>{option}</StyledOption>
          );
        });
      };


    return (
    <Wrap {...props}>
        <SMNTSelect value={selectedValue}>
            <SMNTOption>option1</SMNTOption>
            <SMNTOption>option2</SMNTOption>
            <SMNTOption>option3</SMNTOption>
        </SMNTSelect>
        <StyledSelect 
            {...props}
            width={props.width} 
            height={props.height} 
            className="select-styled"
            ref={selectedInputRef}
            onClick={toggleHandler}
            >
            {selectedValue}
            <StyledOptions ref={optionBoxRef}>
                {renderOptions(props.options)}
            </StyledOptions>
        </StyledSelect>
    </Wrap>
    );
}

export default Select;

export const SelectRef = React.forwardRef((props, ref) => (
  <Select selectRef={ref} {...props} />
));

Select.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  options: PropTypes.array,
  defaultOption: PropTypes.string,
};

Select.defaultProps = {
  width: "100%",
  height: "40px",
  options: ["option1", "option2","option3"],
  defaultOption: "--select--",
};
