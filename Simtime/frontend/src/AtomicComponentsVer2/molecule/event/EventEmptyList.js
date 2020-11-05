import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";

import HeartIcon from "../../atom/icons/HeartIcon"
import StatusButton from "../../atom/buttons/StatusButton"
import ImageUser from "../../../AtomicComponents/A-Atomics/ImageUser"
import Tag from "../../atom/fonts/Tag"

const EventList = styled.li`
    flex: 1;
`


const Header = styled.header`
    width: 96%; 
    height: 34px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;    
`

const Title = styled.strong`
    color: ${Colors.TEXT};
    flex: 1;
    font-size: 18px;
`

const Like = styled(StatusButton)`
    width: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Content = styled.a`
    flex: 1;
    width: 96%;
    padding-left: 10px;

    display: flex;
    flex-direction: row;
`

const Host = styled(ImageUser)`
    margin: auto 10px 1em 0px;
    max-width: 45px;
    max-height: 45px;
`

const EventDesc = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 15px;
    min-width: 0px;
`
const Address = styled.address`
    height: 20px;
    margin-bottom: 2px;
`

const Time = styled.time`
    height: 20px;
    margin-bottom: 2px;
`

const Tags = styled(Tag)`
    color: ${Colors.TEXT_TAG};
`

function EventListItem(props) {
    const {title, location, time, tags} = props;
    return (
        <EventList {...props} className='list-event-item'>
            <Header>
                <a href="#"><Title>{title}</Title></a>
                <Like color="ST_PINK"><HeartIcon /></Like>
            </Header>
            <Content href="#" className="event-list-content">
                <Host url="https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/group_basic.png"/>
                <EventDesc>
                    <Address>{location.name}</Address>
                    <Time>{time}</Time>
                    <Tags>{tags.map((tag)=> {return '#'+tag+" "})}</Tags>
                </EventDesc>
            </Content>
        </EventList>
    )
}

export default EventListItem

EventListItem.propTypes = {
    title: PropTypes.string,
    location: PropTypes.object,
    time: PropTypes.string,
    tags: PropTypes.array
  };

EventListItem.defaultProps = {
    title: "Simtime Test",
    location: {name:"작업실(우리집)", lat:"", lng:"", address:"경기도 부천시"},
    time: "PM 19:00",
    tags: ["개발","test", "simtime", "반달", "test", "simtime", "반달"]
  };
  