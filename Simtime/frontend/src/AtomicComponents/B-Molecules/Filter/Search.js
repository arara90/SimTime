import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ST_WHITE, ST_GRAY } from "../../Colors";
import InputWrap from "../../A-Atomics/Filter/InputWrap";

const Wrap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${ST_WHITE};
  display: flex;
  flex-direction: row;
`;

const Icon = styled.div`
  background-size: 15px;
  background-repeat: no-repeat;
  background-image: url("https://simtime-bucket.s3.ap-northeast-2.amazonaws.com/static/img/icons/search.png");
  background-position: center center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

const MyInput = styled(InputWrap)`
  width: auto;
  height: 99%;
  color: ${ST_GRAY};

  border-width: 0px;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  font-size: 15px;
  font-weight: 400;

  select::--ms-expand {
    opacity: 0;
  }

  &:focus {
    border: none;
    outline: none;
  }
`;

function Search(props) {
  const { width, height, value, desc } = props;
  return (
    <Wrap {...props}>
      <MyInput desc={desc} height="24px"></MyInput>
      <Icon size={height} />
    </Wrap>
  );
}

export default Search;

Search.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  value: PropTypes.string,
};

Search.defaultProps = {
  width: "120px",
  height: "30px",
  value: "Search",
  desc: "Search",
};
