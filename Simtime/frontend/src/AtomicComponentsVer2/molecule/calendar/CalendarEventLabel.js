import React from 'react'
import styled from "styled-components";
import PropTypes from "prop-types";

import CheckCircleIcon from "../../atom/icons/CheckCircleIcon"
import SolidButton from "../../atom/buttons/SolidButton"
import BorderButton from "../../atom/buttons/BorderButton"

import ImageUser from "../../atom/ImageUser"
import Tag from "../../atom/fonts/Tag"
import * as Colors from "../../Colors"

const palette = Colors.Palette;

const Wrap = styled.li`
    position: relative;
    width:100%;
    list-style-type : none;

`;

const Colored = styled(SolidButton)`
  border-radius: 0px;
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;
  line-height: 1em;

  padding: 2px 2px;
  width: 86px;
`

const Bordered = styled(BorderButton)`
  border-radius: 0px; 
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;
  line-height: 1em;

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
  min-width: 0px;
  margin-left: 4px;
  text-align: left;
  `

const Title = styled.strong`
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const StyledTag = styled(Tag)`
  display: block;
  font-size: 0.5em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${Colors.TEXT};
`

function CalendarEventLabel(props) {
  const {isSolid, join, fontColor, color} = props;
  console.log(isSolid)
  const Button = isSolid ? Colored: Bordered ; 
  return (
      <Wrap {...props}>
        <Checked size="lg" join={join ? 1 : 0}/>
        <Button fontColor={isSolid? fontColor: color} color={color}> 
          <Host url="https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg" />
          <Content>
            <Title>Chicken</Title>
            <StyledTag>#한강 #마스크</StyledTag>
          </Content>
        </Button>
      </Wrap>
  )
}

export default CalendarEventLabel

CalendarEventLabel.propTypes = {
  isSolid: PropTypes.bool,
  color: PropTypes.string,
  fontColor: PropTypes.string,
  join: PropTypes.bool,
  };
  
CalendarEventLabel.defaultProps = {
  isSolid: null,
  color: palette[Math.floor(Math.random() * palette.length)],
  fontColor: "ST_WHITE",
  join: false,
};