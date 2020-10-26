// search
import React from 'react'
import PropTypes from "prop-types";

//fontAwesome
import { faSearch as solid}  from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function SearchIcon(props) {
    return (
        <FontAwesomeIcon {...props} icon={solid}></FontAwesomeIcon>
    )
}

//SIZES = ["xs", "sm", "lg", "1x", "2x", "3x", "5x", "7x", "10x"]; //em
SearchIcon.propTypes = {
};

SearchIcon.defaultProps = {
};