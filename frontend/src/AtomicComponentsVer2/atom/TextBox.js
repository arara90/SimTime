import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import {TEXT} from "../Colors";

const Paragraph = styled.p`
    width: 100%;
    max-height: ${({line})=>1.5*line}em;
    line-height: 1.5em;

    display:-webkit-box;
    word-break: normal;
    -webkit-line-clamp: ${({line})=>line};
    -webkit-box-orient:vertical;
    overflow:hidden;
    text-overflow:ellipsis;
    text-decoration:none;

    color: ${TEXT};
`

function TextBox(props) {
    return (
        <Paragraph {...props}></Paragraph>
    )
}

export default TextBox

TextBox.propTypes = {
    line: PropTypes.number
};

TextBox.defaultProps = {
    line: 3    
};
  