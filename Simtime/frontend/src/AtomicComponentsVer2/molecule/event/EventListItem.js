import React, { Fragment } from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../../Colors";

import HeartIcon from "../../atom/icons/HeartIcon"
import CheckCircleIcon from "../../atom/icons/CheckCircleIcon"
import ExclamationTriangleIcon from "../../atom/icons/ExclamationTriangleIcon"
import PlusCircleIcon from "../../atom/icons/PlusCircleIcon"

import StatusButton from "../../atom/buttons/StatusButton"
import ImageUser from "../../../AtomicComponents/A-Atomics/ImageUser"
import Tag from "../../atom/fonts/Tag"

import {getStringDate} from "../../../redux/actions/calendar"


const EventList = styled.li`
    list-style: none;
    min-width: 245px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    border-bottom: solid 1px ${Colors.MAIN_COLOR};
   
    &:hover{
        background-color: ${Colors.MAIN_COLOR_LIGHT}
    }
`

const Header = styled.header`
    width: 96%; 
    height: 34px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    padding-left: 1em;
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
    color: ${Colors.TEXT};
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

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const Time = styled.time`
    height: 20px;
    margin-bottom: 2px;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const Tags = styled(Tag)`
    color: ${Colors.TEXT_TAG};
`

const Empty = styled.li`
    list-style: none;
    width: 100%;
    flex: 1;
    font-size: 10em;
    color: ${Colors.ST_SEMI_GRAY}95;
    text-align: center;

    strong{
        display: block;
        font-size: 1.5rem;
        margin-bottom: 2em;
    }

`

function EventListItem(props) {
    const {id, like, join, event} = props.invitation;
    const {event_name, event_place, event_date, event_time} = event;
    if(id){
        return(
            <EventList {...props} className='list-event-item'>
                <Header>
                <a href="#"><Title> {join? <CheckCircleIcon />: null} {event_name} </Title></a>
                <Like selected={like} color="ST_PINK"><HeartIcon /></Like>
                </Header>
                <Content href="#" className="event-list-content">
                    <Host url={host.profile_image}/>
                    <EventDesc>
                        <Address>{event_place? event_place.name : null}</Address>
                        <Time>{getStringDate(event_date, 'day')+"  "+event_time}</Time>
                        {/* <Tags>{tags.map((tag)=> {return '#'+tag+" "})}</Tags> */}
                        {/* <Tags>{tags}</Tags> */}
                    </EventDesc>
                </Content>
            </EventList>)
    }else return <Empty > <ExclamationTriangleIcon /> <strong> No results :( </strong> </Empty>
}

export default EventListItem

EventListItem.propTypes = {
  };

EventListItem.defaultProps = {

  };
  
