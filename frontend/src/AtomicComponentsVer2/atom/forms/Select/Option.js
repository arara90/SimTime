import React, { Component, Fragment, setState, forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Paragraph from "../../../../AtomicComponents/A-Atomics/Font/Paragraph";

import * as Colors from "../../../Colors";



const OptionItem = styled.li`
    margin: 0;
    padding: 12px 0;
    text-indent: 15px;

    @include transition(all 0.15s ease-in);

    &:hover {
        color: ${Colors["MAIN_COLOR"]};
    }

    &.selected{
        color: ${Colors["MAIN_COLOR"]};
        &:after{
            
        }
    }
`


  
export default function Option(props) {
    return (
        <OptionItem {...props} className={props.selected && "selected"} ></OptionItem>
    )
}