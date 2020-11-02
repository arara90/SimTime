import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {TEXT_TAG}  from "../../Colors";

const StyledTag = styled.small`
    color: ${TEXT_TAG};
`

function Tag(props) {
  return (
      <StyledTag {...props}></StyledTag>
  );
}

export default Tag;

Tag.propTypes = {

};

Tag.defaultProps = {

};
