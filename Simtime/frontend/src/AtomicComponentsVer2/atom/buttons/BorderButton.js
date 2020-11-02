import React from 'react'
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors";

const Button = styled.button`
  border: solid 2px ${({color}) => Colors[color]};
  color: ${({color}) => Colors[color]};
  border-radius: 6px 6px 6px 6px;
  width: ${({width}) => width};
  height: ${({height}) => height};

  &:focus {
    outline: none;
    box-shadow: none;
    
  }

  &:hover {
    border: solid 2px ${({color}) => Colors[color + "_DARK"]};
    color: ${({color}) => Colors[color + "_DARK"]};  
}
`
function BorderButton(props) {
    const {color, width,height} = props;
    
    
    return (
        <Button {...props} 
            className={['btn', 'border-btn', props.className].join(' ')}
        >
            {props.children}
        </Button>
    )
}

export default BorderButton

BorderButton.propTypes = {
    type : PropTypes.string,
    color:PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};

BorderButton.defaultProps = {
    type : "button",
    color: "ST_YELLOW",
    width: "245px",
    height: "38px",
};