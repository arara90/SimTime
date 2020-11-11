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
  data.map((d)=>{
    var date = d.event_time.substr(0, 10)
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
      return {
        ...state,
        events: state.events.filter(event => event.id != action.payload)
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
