import React, { useState, useCallback, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  MAIN_COLOR,
  ST_GTAY,
  ST_SEMI_YELLOW,
  ST_YELLOW_LIGHT,
} from "../../Colors";

import Input from "../../A-Atomics/Form/Input";
import SearchBox from "../../A-Atomics/Filter/SearchBox";

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

const MyOptions = styled(SearchBox)`
  width: ${(props) => (props.name ? "72%" : "100%")};
`;

function SearchBar(props) {
  const { options, name, label, width, height, search, doAfterSelect } = props;

  return (
    <Wrap {...props}>
      <Input
        name={name}
        label={label}
        children={
          <MyOptions
            name={name}
            options={options}
            width={"100%"}
            height={height}
            arrow={false}
            cursor={"default"}
            defaultOption={{ id: 0, name: "" }}
            search={search}
            doAfterSelect={doAfterSelect}
          />
        }
      ></Input>
    </Wrap>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
};
SearchBar.defaultProps = {
  width: "100%",
  height: "40px",
  name: null,
  options: [],
};
