import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Paragraph from "../../A-Atomics/Font/Paragraph";
import { MAIN_COLOR, ST_GRAY, ST_SEMI_YELLOW } from "../../Colors";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  height: auto;
  width: 100%;
`;

const MyParagraph = styled(Paragraph)``;

const MyTextArea = styled.textarea`
  ::placeholder {
    color: ${ST_GRAY};
    font-size: 15px;
    font-weight: 300;
  }
  resize: none;

  width: 100%;
  height: ${(props) => props.height};
  border: solid 1px ${ST_SEMI_YELLOW};
  border-radius: 6px;
  padding-left: 5px;

  :focus {
    border: solid 1px ${MAIN_COLOR};
  }

  ${(props) => (props.cursor ? `cursor: ${props.cursor}` : null)}
`;

function TextArea(props) {
  const {
    width,
    height,
    label,
    name,
    desc,
    value,
    readOnly,
    cursor,
    maxlength,
    handleChange,
  } = props;

  const [myValue, setMyValue] = useState(value);

  const MyHandleChange = useCallback((e) => {
    setMyValue(e.target.value);
  }, []);

  return (
    <Wrap {...props}>
      {label && (
        <MyParagraph fontSize="18px" color="MAIN_COLOR">
          {label}
        </MyParagraph>
      )}
      <MyTextArea
        name={name}
        placeholder={desc}
        readOnly={readOnly}
        value={readOnly || value ? value : myValue}
        onChange={handleChange ? handleChange : MyHandleChange}
        cursor={cursor}
        maxlength={maxlength}
        height={height}
      ></MyTextArea>
    </Wrap>
  );
}

export default TextArea;

TextArea.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  cursor: PropTypes.string,
  maxlength: PropTypes.number,
};

TextArea.defaultProps = {
  width: "100%",
  height: "140px",
  label: null,
  name: null,
  desc: "1000자 이내",
  value: "",
  readOnly: false,
  cursor: null,
  maxlength: 1000,
};
