import React, { Component, Fragment, setState, forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Paragraph from "../../../AtomicComponents/A-Atomics/Font/Paragraph";
import {
  MAIN_COLOR,
  ST_YELLOW_LIGHT,
  ST_SEMI_YELLOW,
  ST_SEMI_GRAY,
  TEXT,
  ST_WHITE,
  MAIN_COLOR_DARK
} from "../../Colors";


const Wrap = styled.div`
  width: ${(props) => props.width};
  cursor: pointer;
  display: inline-block;
  position: relative;
  color:${TEXT};
  //   font-size: 16px;
`;

//SMNT - Hide(실제로 보여주지 않음) Symentic용
const SMNTSelect = styled.select`
    display: none;
    visibility: hidden;
    padding-right: 10px;
`;
const SMNTOption = styled.option`
`

//DSP - Display(실제 보여줌)
const StyledSelect = styled.div`
    position: absolute; 

    width: ${(props) => props.width};
    height: ${(props) => props.height};

    border-radius: 6px;
    padding: 8px 15px;

    @include transition(all 0.2s ease-in);

    &:focus {
        border: solid 1px red;
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
            border-color: transparent transparent ${MAIN_COLOR} transparent;
        }
    }
`;

const Options = styled.ul`
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: 99;
    margin-top: -3px;
    padding: 0;
    list-style: none;
    background-color: ${ST_WHITE};
    

    &[rel="hide"] {
        display: none;
    }
`
const Option = styled.li`
    margin: 0;
    padding: 12px 0;
    text-indent: 15px;
    
    @include transition(all 0.15s ease-in);

    &:hover {
        color:${ST_WHITE};
        background: ${MAIN_COLOR};
    }

`

function Select(props) {

    const mySpecialFunction = () => {
        console.log(this)
      }
      

    const clickHandler=()=>{
        // e.stopPropagation();
        // e.preventDefault();
        mySpecialFunction();
        console.log('this', this)

        
        // //선택한 아이 말고 다른 아이들이 active되어 있다면 다 비활성화시키자.
        // $('div.select-styled.active').not(this).each(function(){
        //     $(this).removeClass('active').next('ul.select-options').hide();
        // });

        // //선택한 아이의 activ를e toggle하고, options들도 토글
        // $(this).toggleClass('active').next('ul.select-options').toggle();
    }

    return (
    <Wrap {...props}>
        <SMNTSelect {...props}>
            <SMNTOption>option1</SMNTOption>
            <SMNTOption>option2</SMNTOption>
            <SMNTOption>option3</SMNTOption>
        </SMNTSelect>
        
        <StyledSelect 
            width={props.width} 
            height={props.height} 
            className="select-styled"
            onClick={clickHandler.bind(this)}>
            <Options className="select-options">
                <Option>option1</Option>
                <Option>option2</Option>
                <Option>option3</Option>
            </Options>
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
  arrow: PropTypes.bool,
  cursor: PropTypes.string,
};

Select.defaultProps = {
  width: "100%",
  height: "40px",
  options: ["AM", "PM"],
  defaultOption: "PM",
  arrow: true,
  cursor: "pointer",
};





    
    // // 옵션 선택시
    // $listItems.click(function(e) {
    //     e.stopPropagation();
        
    //     //selectBox의 텍스트를 해당 옵션으로 변경하고 비활성화 시키자
    //     $styledSelect.text($(this).text()).removeClass('active');

    //     //value는 rel 속성값을 갖는다.
    //     $this.val($(this).attr('rel'));

    //     //optionList는 지운다.
    //     $list.hide();
    //     //console.log($this.val());
    // });
  

    //빈 곳을 클릭했을 때, 모두 비활성화 시키고, 리스트는 닫는다.
// document.click(function() {
//         $styledSelect.removeClass('active');
//         $list.hide();
//     });

