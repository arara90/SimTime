import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ST_WHITE, ST_YELLOW_LIGHT, ST_SEMI_GRAY, ST_GRAY } from "../../Colors";
import SelectedItem from "../../A-Atomics/Filter/SelectedItem";

const Wrap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${ST_WHITE};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 3px 3px 3px;

  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${ST_SEMI_GRAY};
    border-radius: 5px;

    &:hover {
      background-color: ${ST_GRAY};
    }
  }

  &::-webkit-scrollbar-track {
    background-color: ${ST_YELLOW_LIGHT};
    border-radius: 5px;
    box-shadow: inset 0px 0px 3x white;
  }
`;

const StyledSelectedItem = styled(SelectedItem)``;

function DisplaySelections(props) {
  const { width, height, Items } = props;

  const renderItem = () => {
    return Items.map((item, index) => {
      return (
        <StyledSelectedItem key={"item" + index}>{item}</StyledSelectedItem>
      );
    });
  };

  return (
    <Wrap width={width} height={height}>
      {renderItem()}
    </Wrap>
  );
}

export default DisplaySelections;

DisplaySelections.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  Items: PropTypes.array,
};

DisplaySelections.defaultProps = {
  width: "246px",
  height: "30px",
  Items: ["ALL", "공파리", "이겟겟겟"],
};
