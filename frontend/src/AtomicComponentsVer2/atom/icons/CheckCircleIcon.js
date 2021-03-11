// Check-circle
import React from 'react'
import styled from "styled-components";
import PropTypes from "prop-types";

//fontAwesome
import { faCheckCircle as solid }  from "@fortawesome/free-solid-svg-icons"
import { faCheckCircle as regular } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as Colors   from "../../Colors"

const MyFontAwesomeIcon = styled(FontAwesomeIcon)`
  // color: ${({color})=>Colors[color]};
`

export default function CheckCircleIcon(props) {
    return (
        <MyFontAwesomeIcon {...props} icon={props.regular? regular: solid}></MyFontAwesomeIcon>
    )
}

//SIZES = ["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]; //em
CheckCircleIcon.propTypes = {
    regular: PropTypes.bool,
    color: PropTypes.string
  };
  
  CheckCircleIcon.defaultProps = {
    regular: null,
    color: "ST_GREEN_NEON"
  };