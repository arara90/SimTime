import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {MAIN_COLOR, ST_BLUE} from "../../Colors"
import HeartIcon from "../../atom/icons/HeartIcon"


const Input = styled.input`
  display: none;


  &:checked + label { 
    background-color: ${MAIN_COLOR};
  }

  &:checked + label div { 
    left: 16px;
  }

  `
const Label = styled.label`
  margin: 0;
  display: inline-block;
  width: 34px;
  height: 20px;
  cursor: pointer;
  position: relative;
  background-color: #ccc;
  transition: all .4s ease;

  border-radius: 16px;
`

const ToggleIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 16px;
  left: 2px;
  top: 2px;
  position: absolute;
  transition: all .4s ease;
  background-color: white;

`

const Icon = styled(HeartIcon)`
  position: absolute;

`


function Toggle(props) {
  const [checked, setChecked] = useState(false);
  return (
    <Fragment>
      <Input id={props.id} type="checkbox" defaultChecked={checked} onChange={()=>setChecked(!checked)}></Input>
      <Label for={props.id} >
        <ToggleIcon>
          {/* <Icon id="toggle-icon" size="xs"></Icon> */}
        </ToggleIcon>
      </Label>
      


    </Fragment>
  )
}

export default Toggle

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
};

Toggle.defaultProps = {
};