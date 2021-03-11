import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Paragraph from "../Font/Paragraph";
import * as Colors from "../../Colors";

// height: ${(props) =>
// toString(parseInt(props.height.replace(/[^0-9]/g, "")) / 7) + "px"};

const Wrap = styled.div`
  height: ${(props) => props.contentHeight}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  ${(props) => (props.isConfirmed ? `background-color: ${props.color}` : "")};
  border : solid 0px ${(props) => props.color}}
 `;

const TextWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

const Text = styled(Paragraph)`
  vertical-align: center;
  color: ${(props) => (props.isConfirmed ? Colors.ST_WHITE : props.color)};
  line-height: ${(props) => props.contentHeight}px;
`;

function CalContent(props) {
  return (
    <div>
      <Wrap {...props}>
        <TextWrap>
          <Text {...props}>{props.children}</Text>
        </TextWrap>
      </Wrap>
    </div>
  );
}

export default CalContent;

CalContent.propTypes = {
  height: PropTypes.string,
  color: PropTypes.string,
  isConfirmed: PropTypes.bool, //evnet확정여부
  isHost: PropTypes.bool,
  isParticipated: PropTypes.bool, //참석여부
};

CalContent.defaultProps = {
  height: "120px",
  // color: Colors.ST_PINK,
  isConfirmed: false,
  isHost: false,
  isParticipated: false,
};
