import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ST_WHITE, ST_GRAY } from "../../Colors";

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
  background-image: url("https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/search.png");
  background-position: center center;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

const SearchBox = styled.input`
  width: 118px;
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
  const { width, height, value } = props;
  return (
    <Wrap {...props}>
      <Icon size={height} />
      <SearchBox value={value}></SearchBox>
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
  width: "150px",
  height: "30px",
  value: "Search",
};
