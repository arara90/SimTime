import React from 'react';
import styled, {css} from "styled-components";
import PropTypes from "prop-types";

import {MAIN_COLOR, TEXT, ST_BLUE} from "../../Colors";

import StatusButton from "../../atom/buttons/StatusButton"
import DetailTextRow from "../../atom/DetailTextRow"

import MapMarkerIcon from "../../atom/icons/MapMarkerIcon"
import ClockIcon from "../../atom/icons/ClockIcon"
import PeopleIcon from "../../atom/icons/PeopleIcon"
import HeartIcon from "../../atom/icons/HeartIcon"
import TextBox from "../../atom/TextBox"

import ImageUser from "../../atom/ImageUser"
import Map from "../../atom/Map"
import Tag from "../../atom/fonts/Tag"

import {getStringDate} from "../../../redux/actions/calendar"

const Wrap = styled.div`
    width: 100%;
    min-width: 245px;
    padding: 1em;
    color: ${MAIN_COLOR};
`

const Detail = styled.div`
    display: flex;
    height: 2em;

    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    strong{
        font-size: 1.15em;
    }
` 
const LikeButton = styled(StatusButton)`
  padding-right: 1px;
  padding-top: 0;

`

const Users = styled.ul`
    width: 100%;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    padding: 0 1em 2px 1em;
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    overflow-x: auto;       
    overflow-y: hidden;   

    &::-webkit-scrollbar {
        height: 6px;
      }
      

`
const UserList = styled.li`
    display: inline-block;
    margin-right: 0.5em;
    `
const StyledImageUser = styled(ImageUser)`
`

const IconStyle = css`
    color: ${MAIN_COLOR};
    margin-right: 1em;
`
const LocationIcon = styled(MapMarkerIcon)`${IconStyle}`
const TimeIcon = styled(ClockIcon)`${IconStyle}`
const ParticipantsIcon = styled(PeopleIcon)`${IconStyle}`


const Message = styled(TextBox)`
    margin-top: 1em;
`

const StyledTag = styled(Tag)``

function EventDetailContent(props) {
    const { host, event_place, event_date, event_time, participants, message, tags, like, likeBtnClick} = props;
    return (
        <Wrap className="event-detail">
            <Detail>
                <strong>Details</strong>
                <LikeButton color="ST_PINK" selected={like} onClick={likeBtnClick} ><HeartIcon /></LikeButton>
            </Detail> 
            <DetailTextRow as="time"><TimeIcon className="fa-fw"/>{getStringDate(event_date, 'day')+"  "+event_time}</DetailTextRow>
            <DetailTextRow as="address" title={event_place.address}><LocationIcon className="fa-fw"/>{event_place.name}</DetailTextRow>
            <Users className="participants">
                <ParticipantsIcon className="fa-fw" />
                {host?participants.map((p)=>{
                return (host.id==p.id?null:(
                    <UserList key={p.username}>
                        <StyledImageUser title={p.username} width="2em" height="2em" url={p.profile_image}/>
                    </UserList>)
                    )
                }):null}
            </Users>
            <Map mapId="event-detail-map" location={event_place} />
            <Message line={6}>{message}</Message>
            {tags ? <StyledTag multiple line={2}> {tags.map((tag)=> {return '#'+ tag+" "})}</StyledTag> : null}
        </Wrap>
    )
}

export default EventDetailContent

EventDetailContent.propTypes = {
    event_place : PropTypes.object,
    event_date: PropTypes.string,
    participants: PropTypes.array,
    message: PropTypes.string,
    tags: PropTypes.array,
    like: PropTypes.bool,
  };

EventDetailContent.defaultProps = {
    event_place : {name:"송내역 1호선", address:"부천시 송내대로39번길 14"},
    event_date: "2020/04/03 (월) PM 8:00 ",
    participants: [
        {name:"arara90", url:"https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg"}, 
        {name:"admin", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/media/user-basic.png"},
       ],
    message: "이것다.이것은 T니다.이것은 Test Message입니st MeMessage입니다.이것은 Test Message입니다.이것은 Test Message입니다.",
    tags: [],
    like: true
  };
