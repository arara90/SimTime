import React from 'react'
import PropTypes from "prop-types";
import styled from "styled-components";
import * as Colors from "../../Colors";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${props=> props.selected ? Colors[props.color] : Colors.ST_GRAY};
  
  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    color: ${props=> props.selected ? Colors.ST_GRAY : Colors[props.color]};
  }

`
function StatusButton(props) {

    return (
        <Button {...props} className={['btn', 'status-btn', props.className].join(' ')} type={props.type} >
          {props.children}
        </Button>
    )
}

export default StatusButton

StatusButton.propTypes = {
  type : PropTypes.string,
  color: PropTypes.string,
  selected: PropTypes.bool,
};

StatusButton.defaultProps = {
  type : "button",
  color: "MAIN_COLOR",
  selected: false,
};