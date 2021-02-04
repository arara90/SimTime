import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {TEXT_TAG}  from "../../../Colors";

const StyledTags = styled.div`
    color: ${TEXT_TAG};
    width: 100%;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const StyledTag = styled.small`
    display: inline-block;
`

function Tag(props) {
    const {tags} = props;

  return (
      <StyledTags {...props}>
        {
        tags.map((tag)=> {
            return (
            <StyledTag key={tag}>
                {'#'+tag+" "}
            </StyledTag>)
            })
        }
      </StyledTags>
  );
}

export default Tag;

Tag.propTypes = {
    tags: PropTypes.array,

};

Tag.defaultProps = {
    tags: ["개발", "test", "반달","test", "simtime", "반달"]
};
