import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ST_GRAY } from "../../Colors";

const Wrap = styled.div`
  width: ${(props) => props.width};
  background-color: ${ST_GRAY};
  height: 4px;
  border-radius: 2px;
`;
const Bar = styled.div`
  width: inherit;
  background-color: ${ST_GRAY};
  height: 4px;
  border-radius: 2px;
`;
function ProgressBar(props) {
  return (
    <Wrap {...props}>
      <Bar></Bar>
    </Wrap>
  );
}
export default ProgressBar;

ProgressBar.propTypes = {
  width: PropTypes.string,
  steps: PropTypes.number,
};

ProgressBar.defaultProps = {
  width: "100%",
  steps: 3,
};
