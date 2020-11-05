import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../../Colors";

const StyledTag = styled.small`
  width: 100%;
  font-size: 0.8em;
  color: ${({color})=>Colors[color]};

  ${(props)=>
      props.multiple?`
      display:-webkit-box;
      -webkit-line-clamp:${props.line};
      -webkit-box-orient:vertical;
      overflow:hidden;
      text-overflow:ellipsis;
      text-decoration:none;`

      :`
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;`
  }

`

function Tag(props) {
  return (
      <StyledTag {...props}></StyledTag>
  );
}

export default Tag;

Tag.propTypes = {
  multiple: PropTypes.bool,
  line:PropTypes.number,
  color: PropTypes.string

};

Tag.defaultProps = {
  multiple: null,
  line: 2,
  color: "TEXT_TAG"
};
