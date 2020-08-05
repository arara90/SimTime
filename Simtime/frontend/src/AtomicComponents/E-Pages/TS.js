import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { connect } from "react-redux";


const Wrap = styled.div`
  overflow: hidden;
  border: solid 1px black
;

`;

const Dd = styled.button`
    border: solid 1px red;
    width: 40px;
    height: 40px;
`


function TS(props) {
    var ref = React.createRef();

    var myTest = () => {
        console.log("333myTest")
        props.testFn()
    }


  return (
  <Wrap>
      <Dd onClick={()=>myTest()}></Dd>
      </Wrap>
  );
}



export default TS

