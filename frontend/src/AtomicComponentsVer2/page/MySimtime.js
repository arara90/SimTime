import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

//redux-actions
import { getEvents } from "../../redux/actions/events";
import {generate, getStrFullDate, addDate} from "../../util/calendar"

const Wrap = styled.div`
  overflow: hidden;

`;

const Unordered = styled.ul`
display: flex;
flex-direction: column;

`
const Listout = styled.li`
display: flex;
flex-direction: row;
`

const Listin = styled.div`
border: solid 1px black;
margin: 5px;
padding: 2px;
`

function MySimtime(props) {
  const { events, getEvents } = props;
  const [current, setCurrent] = useState(new Date()); 
  const [eventList, setEventList] = useState([]); 

  useEffect(() => {
    var {start, end, weeks} = generate(current, 6);
    // invitations 정보 받아오기
    getEvents(getStrFullDate(start, "yyyy-mm-dd"), getStrFullDate(end, "yyyy-mm-dd"));
  }, []);

  useEffect(() => {
    toArray()
  }, [events]);

  const toArray = () => {
    var list = []
    for(var item in events){
      list.push({date: item, event: events[item]})
      }
      setEventList(list)
  }

  function renderEvent(){
    return eventList.map((item)=>{
      return <Listout key={item.date}>{item.event.map((event)=>{
        return <Listin key={event.id}>{`${event.id} ${event.event_name} ${event.host.username} `}</Listin>
      })}</Listout>
    }

    )
  }
  

  return (
    <Wrap> 
      <Unordered>{Object.keys(events).length>0? renderEvent(events): null}</Unordered>
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  events: state.events.events,

});

const mapDispatchToProps = (dispatch) => {
  return {
    getEvents: (start, end)=>dispatch(getEvents(start, end)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MySimtime);
