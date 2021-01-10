import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LoadingImage = styled.img.attrs({
  src:
    "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/loading-spinner-white.svg",
})`
  widht: 100px;
  height: 100px;
`;

function Loading(props) {
  return <LoadingImage {...props} />;
}

export default Loading;

Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Loading.defaultProps = {
  width: "100px",
  height: "100px",
};
