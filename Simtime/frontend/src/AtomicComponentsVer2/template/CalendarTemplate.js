import React, {Fragment} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconButton from "../atom/buttons/IconButton"

const Wrap = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: 920px) {
    width: 100%;
    flex-direction: column;
  }
  overflow: hidden;
`;

const LeftSection = styled.section`
  width: 68.5%;
  height: 680px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 920px) {
    width: 100%;
  }
`
const RightSection = styled.section`
  width: 31%;
  height: 680px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 920px) {
    width: 100%;
  }
`

const Filters = styled.div`
  width: 100%;
  height: 80px;
  background: yellow;
`

const Calandar = styled.article`
  width: 100%;
  flex: 1;
  background: pink;
`

const WriteButton = styled.div`
  height: 80px;
  width: 100%;
  background: grey;
`

const Details = styled.article`
  width: 100%;
  flex: 1;
  background: pink;
`


const CalendarTemplate = ({children, ...props }) => {
  return (
    <Wrap>
      <LeftSection>
        <Filters id="filters"><IconButton /></Filters>
        <Calandar></Calandar>
      </LeftSection>
      <RightSection>
        <WriteButton></WriteButton>
        <Details></Details>
      </RightSection>
    </Wrap>
  );
};

CalendarTemplate.propTypes = {

};

CalendarTemplate.defaultProps = {

};

export default CalendarTemplate;
