import React, {useEffect} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrap = styled.main`
  width:inherit;
  // display: flex;
  // flex-direction: row;

  // @media only screen and (max-width: 920px) {
  //   flex-direction: column;
  // }
`;

const Section = styled.section`
  width: 100%;  
  // display: flex;
  // flex-direction: column;
  
  // @media only screen and (max-width: 920px) {
  //   width: 100%;
  // }
  z-index: 1;
`


const BasicTemplate = (props) => {
  var headerHeight = ""
  useEffect(()=>{
    headerHeight = document.getElementById('simtime-header').getBoundingClientRect().height
  }, [])

  return (
    <Wrap id="simtime-page" headerHeight= {headerHeight} {...props} >
      <Section headerHeight={headerHeight}>
        {props.content}
      </Section>
    </Wrap>
  );
};

BasicTemplate.propTypes = {
  content: PropTypes.node
};

BasicTemplate.defaultProps = {
  content: "Basic Content"
};

export default BasicTemplate;
