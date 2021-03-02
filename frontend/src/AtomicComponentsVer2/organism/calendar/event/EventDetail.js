import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deleteEvent } from "../../../../redux/actions/events"
import { toggleInvitations, deleteInvitation } from "../../../../redux/actions/invitations"

import {ModalContext} from "../../../../contexts/modalContext"

import EventDetailHeader from "../../../molecule/event/EventDetailHeader"
import EventDetailContent from "../../../molecule/event/EventDetailContent"
import EventMaker from "../../../../AtomicComponents/D-Templates/Event/EventMaker"
import SolidButton from "../../../atom/buttons/SolidButton"
import TextButton from "../../../atom/buttons/TextButton"

import * as Colors from "../../../Colors";


const Wrap = styled.article`
  width: 100%;
  min-width: 245px;
  border : solid 1px ${Colors.MAIN_COLOR};

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 0;

`

const Buttons = styled.footer`
  width: 96%;
  padding: 0.5em 1em 1em 1em;
  text-align: center;
`

const JoinButton = styled(SolidButton)`
  font-size: 1.5em;
  font-weight: bold;
  padding: 0;
`

const DeleteButton = styled(TextButton)``



function EventDetail(props) {
  const { handleContextModal, closeContextModal, setContextModalContent } = React.useContext(ModalContext);

  const {isHost, invitation, toggleInvitations} = props;
  const {id, attendance, show, like, event} = invitation;
  const {event_name, event_date, tags, host} = event;
  const [isEdit, setIsEdit] = useState(false)


  //// change modals
  useEffect(()=>{
    if(isEdit) handleContextModal(<EventMaker eventToEdit={event} isEdit eventSubmitHandler={eventSubmitHandler} closeModal={()=>setIsEdit(false)}/>)
  }, [isEdit])

  const eventSubmitHandler = (event, image) =>{
    console.log(event, image)

  }

  // //// submit new event
  // const eventSubmitHandler = async (event, image) =>{
  //   console.log('done')
  //   // try{
  //   //   //event  수정
  //   //   var res = await editEvent(event, image); 

  //   //   //modal 변경
  //   //   await closeContextModal()
  //   //   setIsEdit(false)
  //   // }catch(e){
  //   //   console.log("Error", e); 
  //   // }
  // }
    //// submit new event

  const deleteEventHandler=(eventId, date)=>{
    props.deleteEvent(eventId, date);
    props.backHandler();
  }


  const deleteInvitationHandler=(invitationId, date)=>{
    props.deleteInvitation(invitationId, date);
    props.backHandler();
  }


  return (
        <Wrap>
          <EventDetailHeader  host={host} event_name={event_name} tags={tags} backHandler={props.backHandler}/>
          <EventDetailContent {...event} like={like} likeBtnClick={()=>toggleInvitations(invitation,'like')}/>
          <Buttons>
            <JoinButton color={attendance? "ST_RED" :"ST_BLUE"} onClick={()=>toggleInvitations(invitation,'attendance')} > {attendance?"Cancel":"Join"} </JoinButton>
            {isHost && <DeleteButton color="ST_GRAY" onClick={() => deleteEventHandler(event.id, event_date)}>delete</DeleteButton>}
            {isHost && <DeleteButton color="ST_GRAY" onClick={()=>setIsEdit(true)}>edit</DeleteButton>}
            {!isHost && <DeleteButton color="ST_GRAY" onClick={()=>toggleInvitations(invitation,'show')}>{ show ?'hide':'show'}</DeleteButton>}
          </Buttons>
        </Wrap>
    )
}


const mapDispatchToProps = (dispatch) => {
  return {
    deleteEvent: (id,date) => dispatch(deleteEvent(id,date)),
    // editEvent: (event, image) => dispatch(editEvent(event, image)),
    // deleteInvitation: (id,date) => dispatch(deleteInvitation(id,date)),
    toggleInvitations: (invitation, key)=>dispatch(toggleInvitations(invitation, key))

  };
};

export default connect(null, mapDispatchToProps)(EventDetail);


EventDetail.propTypes = {
  invitation: PropTypes.object,
  };

EventDetail.defaultProps = {
  invitation: {
    id:null, 
    attendance: false, 
    show:true, 
    like:false,
    event: {
      id: "0",
      event_name: "Simtime Test",
      event_place: {name:"작업실(우리집)", address:"경기도 부천시"},
      event_time: "PM 19:00",
      tags: ["개발","test", "simtime", "반달", "test", "simtime", "반달"],
  
      host: {name:"arra", url:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/group_basic.png"},
    }


  },
 
  };
  