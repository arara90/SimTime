import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors  from "../../Colors"

const Input = styled.input`
  display: none;

  &:checked + label { 
    background-color: ${Colors.MAIN_COLOR};
  }

  &:checked + label div { 
    left: 17px;
    color: ${({color})=>Colors[color]};
    border: solid 1px ${Colors.MAIN_COLOR};
  }

  `
const Label = styled.label`
  // margin: 0;
  display: inline-block;
  width: 38px;
  height: 10px;
  cursor: pointer;
  position: relative;
  background-color: #ccc;
  transition: all .4s ease;
  border-radius: 20px;
`

const ToggleIcon = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 12px;
  left: 0px;
  top: -6px;
  position: absolute;
  transition: all .4s ease;
  background-color: white;
  border: solid 1px #ccc;

  color: #ccc;

  display: flex;
  justify-content: center;
  align-items: center;
`

function Toggle(props) {
  const [checked, setChecked] = useState(false);
  const {toggle} = props;

  // const toggleChecked=React.useCallback(()=>{
  //   toggle(!checked)
  //   setChecked(!checked)
  // }, [])

  const toggleChecked=()=>{
    toggle(!checked)
    setChecked(!checked)
  }

  return (
    <Fragment>
      <Input id={props.id} type="checkbox" defaultChecked={checked} onChange={toggleChecked} color={props.color}></Input>
      <Label htmlFor={props.id} {...props} >
        <ToggleIcon color={props.color}>
          {props.icon}
        </ToggleIcon>
      </Label>
    </Fragment>
  )
}

export default Toggle

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  toggle: PropTypes.func
};

Toggle.defaultProps = {
  color: "MAIN_COLOR",
  toggle: ()=>{
    console.log('toggled')
  }

};