import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ST_WHITE } from "../../Colors";
import PropTypes, { object } from "prop-types";

import Paragraph from "../Font/Paragraph";

const Wrap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${ST_WHITE};

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const OptionWrap = styled.div``;

const Option = styled(Paragraph)`
  ${(props) => (props.isSelected ? "font-weight: 700" : "")}
  cursor: pointer;
`;

function RadioText(props) {
  const [selectedId, setSelectedId] = useState(0);
  const { list, width, height } = props;

  const renderOption = () => {
    return list.map((option, index) => {
      const isSelected = index == selectedId;
      return (
        <OptionWrap key={option}>
          <Option
            isSelected={isSelected}
            color={isSelected ? "MAIN_COLOR" : "ST_GRAY"}
            fontSize="15px"
          >
            {option}
          </Option>
        </OptionWrap>
      );
    });
  };
  return (
    <Wrap width={width} height={height}>
      {renderOption()}
    </Wrap>
  );
}

export default RadioText;

RadioText.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  list: PropTypes.array,
};

RadioText.defaultProps = {
  width: "120px",
  height: "30px",
  list: ["ALL", "확정", "대기"],
};
