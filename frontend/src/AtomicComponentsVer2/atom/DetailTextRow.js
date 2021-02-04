import React from 'react';
import styled, {css} from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../Colors";

const style = css`
  display: block;
  width: 100%;  
  border-bottom: dashed 1px ${Colors.ST_SEMI_GRAY};

  padding: 0 1em 0 1em;
  margin: 0;
  height: 2em;
  line-height: 2em;
  
  color: ${Colors.TEXT};

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  cursor: default;
`

const Paragraph = styled.p`
${style}
`

const Address = styled.address`
  ${style}
`

const Time = styled.time`
  ${style}
`


function DetailTextRow(props) {
  const {as, color} = props;

  if (as=="address"){
    return <Address title={props.title}>{props.children}</Address>
  } else if (as=="time"){
    return <Time>{props.children}</Time>
  }else{
    return <Paragraph>{props.children}</Paragraph>
  }
  
}

export default DetailTextRow
