import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";


//parent에서 max-width, max-height로 최대 값 지정 or width, height 전달하기
const Image = styled.div`
    background-size: cover;
    background-image: url("${(props) => props.url}");
    background-position: center center;
    border-radius: 50%;
    width: ${(props) => props.width};
    height: ${(props) => props.height};

`;

// const Image = styled.img.attrs(props => ({src: props.url}))`
//     width: ${(props) => props.width};
//     height: ${(props) => props.height};
//     border-radius: 50%;
// `;

function ImageUser(props) {
  return (
      <Image {...props} />
  );
}

export default ImageUser;

ImageUser.propTypes = {
  url: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

ImageUser.defaultProps = {
  url: "",
  width: "100%",
  height: "100%",
};
