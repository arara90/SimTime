import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import TS from "./TS"

const Wrap = styled.div`
  overflow: hidden;
  border: solid 1px black
;

`;

const Dd = styled.button`
    border: solid 1px red;
    width: 100px;
    height: 100px;
`


function Test(props) {
    var ref = React.createRef();

    var test = () => {
        console.log("test")
        props.fn(props.data)
    }

    var testFn = (keyword) => {
        console.log("test")
        props.testFn(props.data)
    }


  return (
  <Wrap>
      <Dd onClick={()=>test()}>

      </Dd>
      <Dd onClick={()=>testFn(ref.current.value)}></Dd>
      <input ref={ref}></input>
      <div>
        <TS testFn={testFn}> </TS>
      </div>
      </Wrap>
  );
}



export default Test

