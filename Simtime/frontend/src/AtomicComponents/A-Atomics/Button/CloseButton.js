import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {MAIN_COLOR} from "../../Colors"

const Button = styled.div`
    background-color: ${MAIN_COLOR};    
    background-size: cover;
    background-image: url("${(props) => props.src}");
    background-position: center center;

    width: ${(props) => props.width};
    height: ${(props) => props.height};

    cursor: pointer;
    @media only screen and (max-width: 320px) {
        position: absolute;
        right: 6px;
  }
`;

function CloseButton(props) {
    return (
        <Button {...props} />
    )
}

export default CloseButton

CloseButton.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
    
}

CloseButton.defaultProps={
    width: "24px",
    height: "24px",
    src:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/close-wh.png"
}