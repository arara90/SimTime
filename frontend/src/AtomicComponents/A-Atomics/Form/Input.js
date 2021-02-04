import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  ST_GRAY,
  ST_SEMI_GRAY,
  ST_SEMI_YELLOW,
  MAIN_COLOR,
} from "../../Colors";

const MyInput = styled.input`
  ::placeholder {
    color: ${ST_GRAY};
    font-size: 15px;
    font-weight: 300;
  }

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  border: solid 1px ${ST_SEMI_YELLOW};
  border-radius: 6px;
  padding-left: 5px;

  :focus {
    border: solid 1px ${MAIN_COLOR};
  }

  ${(props) => (props.cursor ? `cursor: ${props.cursor}` : null)}
`;

function Input(props) {
  const { width, height, name, desc, value, handleChange } = props;
  const [myValue, setMyValue] = useState(value);

  const myHandleChange = useCallback((e) => {
    setMyValue(e.target.value);
    // console.log(e.target.value)
  }, []);

  return (
    <MyInput
      {...props}
      placeholder={desc}
      onChange={handleChange ? handleChange : myHandleChange}
      {...props}
    ></MyInput>
  );
}

export default Input;

Input.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  width: "100%",
  height: "40px",
};
