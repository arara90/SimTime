import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Img = styled.div`
    background-size: cover;
    background-image: url("${(props) => props.src}");
    background-position: center center;

    width: ${(props) => props.width};
    height: ${(props) => props.height};
`;

function Image(props) {
  return <Img {...props} />;
}

export default Image;

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Image.defaultProps = {
  src:
    "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/forbidden.png",
  width: "14px",
  height: "14px",
};
