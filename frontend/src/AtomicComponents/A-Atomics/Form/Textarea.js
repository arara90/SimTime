import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Paragraph from "../../A-Atomics/Font/Paragraph";
import { MAIN_COLOR, ST_GRAY, ST_SEMI_YELLOW } from "../../Colors";

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

const MyParagraph = styled(Paragraph)``;

const MyTextArea = styled.textarea`
  ::placeholder {
    color: ${ST_GRAY};
    font-size: 15px;
    font-weight: 300;
  }

  width: ${(props) => (props.name ? "72%" : "100%")};
  height: 100%;
  border: solid 1px ${ST_SEMI_YELLOW};
  border-radius: 6px;
  padding-left: 5px;

  :focus {
    border: solid 1px ${MAIN_COLOR};
  }

  ${(props) => (props.cursor ? `cursor: ${props.cursor}` : null)}
`;

function TextArea(props) {
  const { width, height, label, name, desc, value, readOnly, cursor } = props;
  const [myValue, setMyValue] = useState(value);

  const handleChange = useCallback((e) => {
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
        value={readOnly ? value : myValue}
        onChange={handleChange}
        cursor={cursor}
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
};

TextArea.defaultProps = {
  width: "100%",
  height: "40px",
  label: null,
  name: null,
  desc: null,
  value: "",
  readOnly: false,
  cursor: null,
};
