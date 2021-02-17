import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BG_INACTIVE_LIGHT} from "../Colors";

import SelectArrow from "../A-Atomics/Filter/SelectArrow"
import RadioText from "../A-Atomics/Filter/RadioText"
// import Search from "../A-Atomics/Filter/Search"
import Search from "../B-Molecules/Filter/Search";
import DisplaySelections from "../B-Molecules/Filter/DisplaySelections"

const Wrap = styled.div`
  background-color: ${BG_INACTIVE_LIGHT};

  width: ${props=> props.width};
  height: ${props=> props.height};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

`;

const ContentWrap = styled.div`
  width: 98%;
  height: 98%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  
`;

const StyledRadioText = styled(RadioText)`
`;

const StyledSelectArrow = styled(SelectArrow)`
`;

const StyledDisplaySelections= styled(DisplaySelections)`
  @media (max-width: 620px) {
    display: none;
  }
`;

const StyledSearch = styled(Search)`
`;



function Filter(props) {
  return (
    <Wrap {...props}>
      <ContentWrap>
        <StyledRadioText />
        <StyledSelectArrow />
        <StyledDisplaySelections />
        <StyledSearch />
        </ContentWrap>
    </Wrap>);
}

export default Filter;

Filter.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

Filter.defaultProps = {
  height: "46px",
  width: "100%",
};
