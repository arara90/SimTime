import React from 'react'
import styled from "styled-components";
import PropTypes from "prop-types";

import CheckCircleIcon from "../../atom/icons/CheckCircleIcon"
import HeartIcon from "../../atom/icons/HeartIcon"
import SolidButton from "../../atom/buttons/SolidButton"
import BorderButton from "../../atom/buttons/BorderButton"

import ImageUser from "../../atom/ImageUser"
import Tag from "../../atom/fonts/Tag"
import * as Colors from "../../Colors"


const Wrap = styled.li`
    position: relative;
    width:100%;
    list-style-type : none;
`;

const Colored = styled(SolidButton)`
  border-radius: 10px;
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;

  font-size: 0.9em;
  line-height: 1em;
  height: 2.25em;

  @media only screen and (max-width: 560px) {
    height: auto;
  }
`

const Bordered = styled(BorderButton)`
  border-radius: 8px;
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  align-items: center;

  font-size: 0.9em;
  border-width: thin;

  line-height: 1em;
  height: 2.25em;

  &:hover {
    // background-color: ${({color}) => Colors["MAIN_COLOR_LIGHT"]};
  }

  @media only screen and (max-width: 560px) {
    height: auto;
  }
`

const Badges = styled.div`
  line-height: 1.25em;
  position: absolute;
  right: 3px;
  top:3px;


  @media only screen and (max-width: 560px) {
    right: 1px;
    top: 0.5px;
  }
`

const Checked = styled(CheckCircleIcon)`
    border-radius: 50%;
    z-index: 2;
    color: ${Colors[ "ST_GREEN_NEON"]};
    background-color: white;

  `

  const Heart = styled(HeartIcon)`
    z-index: 2;
    color: ${Colors[ "ST_PINK"]};
    background-color: transparent;
  `

const Host = styled(ImageUser)`
  width: 1.7em;
  height: 1.7em;

  @media only screen and (max-width: 680px) {
    display: none;
  }

`

const Content = styled.div`
  flex: 1;
  min-width: 0px;
  margin-left: 2px;
  text-align: left;
`

const Title = styled.strong`
  font-size: 0.9em;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const StyledTag = styled(Tag)`
  display: block;
  font-size: 0.8em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media only screen and (max-width: 560px) {
    display: none;
  }

`

function CalendarEventLabel(props) {
  const {solid, attendance, like, fontColor, color, name, title, time, location, tags, host} = props;
  const Button = solid ? Colored : Bordered ; 


  return (
      <Wrap {...props}>
        <Badges>
        {like? <Heart className='check' color={color}/> : null}
        {attendance? <Checked className='check' color={color}/> : null}
        </Badges>
        {/* {attendance? <Checked className='check' color={color}/> : null} */}
        <Button fontColor={solid? fontColor: color} color={color} customColor > 
          <Host url={host.profile_image} />
          <Content>
            <Title>{name}</Title>
            <StyledTag color={solid ? fontColor : color+"_DARK"}>
              {/* {tags ? tags.map((tag)=> {return '#'+tag+" "}) : time + " | " + location} */}
              {time.split(' ')[0] + " | " + location}
            </StyledTag>
            {/* <StyledTag color={solid ? fontColor : color+"_DARK"}>{time} {location}</StyledTag> */}
          </Content>
        </Button>
      </Wrap>
  )
}

export default React.memo(CalendarEventLabel);

CalendarEventLabel.propTypes = {
  solid: PropTypes.bool,
  color: PropTypes.string,
  fontColor: PropTypes.string,
  join: PropTypes.bool,
  name : PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.array,
  time: PropTypes.string,
  location: PropTypes.string,
  host: PropTypes.object
  };
  
CalendarEventLabel.defaultProps = {
  solid: true,
  color: "#fff",
  fontColor: Colors["TEXT"],
  join: false,
  name: "Chickenkkkkk",
  title: "00:00 AM | 송내역",
  time: "00:00 AM",
  location: "",
  tags: [],
  host: {
    profile_image: "https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg",
    id: "arara90"
  }
};


// const Checked = styled(CheckCircleIcon)`
//     position: absolute;
//     top: 3px;
//     right: 3px;

//     border-radius: 50%;
//     z-index: 2;
//     color: ${Colors[ "ST_GREEN_NEON"]};
//     background-color: white;

    
//   @media only screen and (max-width: 560px) {
//     top: 1px;
//     right: 1px;
//   }
//   `


// const Checked = styled.div`
//   position: absolute;
//   width: 20px;
//   height: 20px;
//   top: 0;
//   right: 0;

//   z-index: 2;
//   background-color: white;

//   border: solid 5px ${({color})=>color};
//   border-top: solid 5px ${Colors["ST_WHITE"]};
//   border-right: solid 5px ${Colors["ST_WHITE"]};
//   `