import { createMessage, returnErrors } from "./messages";
import { axiosInstance, axiosFormInstance } from "./axiosApi";
import {getStrFullDate , getFullTime} from "./calendar"

import {
  GET_EVENTS,
  GET_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  EDIT_EVENT,
  GET_ERRORS,
  CREATE_MESSAGE,
} from "./types";

function separateEventTime(data){
  var event_at = new Date(Date.parse(data.event_time))
  data['event_date'] = getStrFullDate(event_at, "yyyy-mm-dd")
  data['event_time'] = getFullTime(event_at)
  return data
}

export const getEvents = (start, end) => (dispatch) => {
  console.log(start, end)
  axiosFormInstance
    .get(`/api/events/${start}/${end}`)
    .then((res={data:[]}) => {
      var transformed = {}
      res.data.map((d)=>{
        var separated = separateEventTime(d)
        var date = separated.event_date
        if( transformed[date]==undefined){
          transformed[date] = [d]
        }else{
          transformed[date] = [...transformed[date], d]
        }
      })

      dispatch({
        type: GET_EVENTS,
        payload: transformed,
      });
      // console.log(res)
    })
    .catch((err) =>{
      // dispatch(returnErrors(err.response.data, err.response.status))
      console.log(err)
    });
    
};

export const getEvent = (id) => (dispatch) => {
  dispatch({
    type: GET_EVENT,
    payload: id,
  });
};

export const addEvent = (event, img) => (dispatch) => {

  console.log(event)
  if(img) {
  const data = new FormData();
  data.append("photo", img);
  data.append("host", event.host);
  data.append("event_name", event.event_name);
  data.append("event_time", event.event_time);
  data.append("status", event.status);
  data.append("event_place", JSON.stringify(event.event_place) );
  data.append("message", event.message);

  axiosFormInstance
    .post("/api/events/create", data)
    .then((res) => {
      separateEventTime(res.data)
      dispatch({
        type: ADD_EVENT,
        payload: res,
      });

      dispatch(createMessage({ addEvent: "Event Added" }));
    })
    // .catch((err) => {
    //   dispatch(returnErrors(err.response.data, err.response.status));
    // });
  }else{
  axiosInstance
    .post("/api/events/create", event)
    .then((res) => {
      separateEventTime(res.data)
      dispatch({
        type: ADD_EVENT,
        payload: res.data,
      });

      dispatch(createMessage({ addEvent: "Event Added" }));
    })
    // .catch((err) => {
    //   dispatch(returnErrors(err.response.data, err.response.status));
    // });
  }
  
};

export const deleteEvent = (id, event_date) => (dispatch) => {
  console.log(event_date)
  axiosInstance
    .delete(`/api/events/${id}`)
    .then(() => {
      dispatch(createMessage({ deleteEvent: "Event Deleted" }));
      dispatch({
        type: DELETE_EVENT,
        payload: { id:id, event_date:event_date},
      });
    })
    .catch((err) => console.log(err));
};

export const editEvent = (event) => (dispatch) => {
  axiosFormInstance
    .put(`/api/events/${event.id}`, event)
    .then((res) => {
      dispatch({
        type: EDIT_EVENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};


