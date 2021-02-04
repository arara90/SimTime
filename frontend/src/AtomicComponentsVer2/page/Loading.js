import React from "react";
import styled from "styled-components";

import EmptyTemplate from "../Template/EmptyTemplate";
import Image from "../Atom/Image";

function Result() {
  return (
    <EmptyTemplate>
      <Image width="50px" height="50px" icon="loading-spinner-white.gif" />
    </EmptyTemplate>
  );
}

export default Result;
