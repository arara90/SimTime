import {
  GET_EVENTS,
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  GET_EVENT
} from "../actions/types";

const initialState = {
  selectedEvent: {}
};


function transformEvents(events, data){
  console.log(events, data)
  data.map((d)=>{
    var date = d.event_date
    if( events[date]==undefined){
      events[date] = [d]
    }else{
      events[date] = [...events[date], d]
    }
  })
  return events
}


export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      var newEvent = action.payload
      return {
        ...state,
        events: {...state.events, ...newEvent }
      };
    case GET_EVENT:
      return {
        ...state,
        selectedEvent: state.events.filter(event => event.id == action.payload)
      };
    case ADD_EVENT:
      return {
        ...state,
        events: transformEvents(state.events, [action.payload])
      };
    case DELETE_EVENT:
      const {id, event_date} = action.payload
      const newEvents = state.events[event_date].filter(event => event.id != id)

      if(newEvents.length){
        return {
          ...state,
          events: { ...state.events, [event_date]: newEvents  }
        }
      }else{
        var nextEvents = {...state.events};
        delete nextEvents[event_date]
        return {...state, events: nextEvents }
      };
      
    case EDIT_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id == action.payload.id ? action.payload : event
        )
      };
    default:
      return state;
  }
}
