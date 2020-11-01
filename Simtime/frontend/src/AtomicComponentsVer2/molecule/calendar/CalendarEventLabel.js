import React from 'react'
import styled from "styled-components";
import PropTypes from "prop-types";

import CheckCircleIcon from "../../atom/icons/CheckCircleIcon"
import IconButton from "../../atom/buttons/IconButton"
import ImageUser from "../../atom/ImageUser"
import * as Colors from "../../Colors"

const palette = Colors.Palette;

const Wrap = styled.li`
    position: relative;
    width:100%;
    list-style-type : none;
    
    ${({type, color})=>type=="border"?`
      border: solid 1px ${Colors[color]};
      color:${Colors[color]};`
      :`
      background-color: ${Colors[color]};
      color:${Colors.ST_WHITE};
      `}
`;

const Label = styled(IconButton)`
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;

  padding: 2px 2px;
  width: 86px;

`

const Checked = styled(CheckCircleIcon)`
  ${({join})=>join==1?`
    background: ${Colors.ST_WHITE};
    position: absolute;
    top: -0.3em;
    right: -0.45em;
    border-radius: 50%;
    color: ${Colors.CHECK_GREEN};
    z-index: 99;
  `:   'display:none;'}
}
`

const Host = styled(ImageUser)`
  width: 1.7em;
  height: 1.7em;
`

const Content = styled.div`
  flex: 1;
  margin-left: 4px;
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;

  
`

function CalendarEventLabel(props) {
  const {color, join} = props;
  console.log(join)

  return (
      <Wrap {...props}>
        <Checked size="lg" join={join ? 1 : 0}/>
        <Label> 
          <Host url="https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg" />
          <Content>
            dd
          </Content>
        </Label>
      </Wrap>
  )
}

export default CalendarEventLabel

CalendarEventLabel.propTypes = {
  type: PropTypes.string, 
  color: PropTypes.string,
  join: PropTypes.bool,
  };
  
  CalendarEventLabel.defaultProps = {
  type: "color",
  color: palette[Math.floor(Math.random() * palette.length)],
  join: false
};

  // color: palette[Math.floor(Math.random() * palette.length)]
  
  